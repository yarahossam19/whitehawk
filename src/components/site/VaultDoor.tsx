"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * VaultDoor — GRC hero visual (light mode).
 * Rings misalign, rotate & lock green one by one, then the seal check flips to green. Loops.
 * Cursor parallax; click to re-run. Self-contained (no assets). Needs: npm i three
 *
 * Place it where the hero visual should sit, e.g. the right column of a GRC hero:
 *   <div className="relative h-[420px] md:h-[520px]">
 *     <VaultDoor className="absolute inset-0 h-full w-full" />
 *   </div>
 */
export function VaultDoor({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;

    // light studio env for metal reflections
    (function () {
      const w = 512,
        h = 256,
        cv = document.createElement("canvas");
      cv.width = w;
      cv.height = h;
      const x = cv.getContext("2d")!;
      const g = x.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#eef3fb");
      g.addColorStop(0.5, "#cdd9f0");
      g.addColorStop(1, "#9db4dd");
      x.fillStyle = g;
      x.fillRect(0, 0, w, h);
      const b = x.createRadialGradient(w * 0.32, h * 0.24, 0, w * 0.32, h * 0.24, 130);
      b.addColorStop(0, "rgba(255,255,255,1)");
      b.addColorStop(1, "rgba(255,255,255,0)");
      x.fillStyle = b;
      x.fillRect(0, 0, w, h);
      const t = new THREE.CanvasTexture(cv);
      t.mapping = THREE.EquirectangularReflectionMapping;
      t.colorSpace = THREE.SRGBColorSpace;
      scene.environment = t;
    })();

    scene.add(new THREE.AmbientLight(0xdfe8f6, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.25);
    key.position.set(-6, 8, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.radius = 8;
    key.shadow.bias = -0.0004;
    key.shadow.camera.left = -8;
    key.shadow.camera.right = 8;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -8;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xcfe0ff, 0.45);
    fill.position.set(6, -1, 5);
    scene.add(fill);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.25);
    rimLight.position.set(0, -4, -6);
    scene.add(rimLight);

    const root = new THREE.Group();
    root.position.set(0, 0, 0);
    scene.add(root);

    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ opacity: 0.18, color: 0x14224a })
    );
    wall.position.set(0, 0, -1.6);
    wall.receiveShadow = true;
    root.add(wall);

    // vibrant palette
    const BLUE = 0x1e40af,
      BLUE_D = 0x152f7a,
      GREEN = 0x0a4d1e,
      GREEN_D = 0x042610,
      ACC = 0x3b82f6,
      FRAME = 0x27408c;
    const ringMat = () =>
      new THREE.MeshStandardMaterial({
        color: BLUE,
        metalness: 0.35,
        roughness: 0.34,
        emissive: 0x0a1c4a,
        emissiveIntensity: 0.22,
        envMapIntensity: 0.7,
      });

    const frame = new THREE.Mesh(
      new THREE.TorusGeometry(3.15, 0.06, 16, 90),
      new THREE.MeshStandardMaterial({ color: FRAME, metalness: 0.45, roughness: 0.4, emissive: 0x152f7a, emissiveIntensity: 0.25, envMapIntensity: 0.8 })
    );
    frame.castShadow = true;
    root.add(frame);
    const refTick = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.44, 0.18),
      new THREE.MeshStandardMaterial({ color: ACC, metalness: 0.3, roughness: 0.35, emissive: 0x1d4ed8, emissiveIntensity: 0.8 })
    );
    refTick.position.set(0, 3.15, 0.06);
    root.add(refTick);

    type Ring = {
      grp: THREE.Group;
      torus: THREE.Mesh<THREE.TorusGeometry, THREE.MeshStandardMaterial>;
      notches: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>[];
      idx: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
      target: number;
      locked: boolean;
    };
    const rings: Ring[] = [];
    [2.55, 1.9, 1.25].forEach((rad, i) => {
      const grp = new THREE.Group();
      root.add(grp);
      const torus = new THREE.Mesh(new THREE.TorusGeometry(rad, 0.2, 20, 96), ringMat());
      torus.castShadow = true;
      torus.receiveShadow = true;
      grp.add(torus);
      const notches: Ring["notches"] = [];
      const NN = 10 + i * 2;
      for (let k = 0; k < NN; k++) {
        const a = (k / NN) * Math.PI * 2;
        const nb = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 0.34, 0.3),
          new THREE.MeshStandardMaterial({ color: BLUE_D, metalness: 0.4, roughness: 0.4, emissive: 0x0b2358, emissiveIntensity: 0.25, envMapIntensity: 0.8 })
        );
        nb.position.set(Math.cos(a) * rad, Math.sin(a) * rad, 0);
        nb.rotation.z = a;
        nb.castShadow = true;
        grp.add(nb);
        notches.push(nb as Ring["notches"][number]);
      }
      const idx = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.54, 0.36),
        new THREE.MeshStandardMaterial({ color: ACC, metalness: 0.3, roughness: 0.32, emissive: 0x1d4ed8, emissiveIntensity: 0.7 })
      );
      idx.position.set(0, rad, 0.03);
      idx.castShadow = true;
      grp.add(idx);
      grp.rotation.z = 0.7 + Math.random() * 1.9;
      rings.push({ grp, torus, notches, idx, target: 0, locked: false });
    });

    // recessed seal
    const well = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 0.2, 48),
      new THREE.MeshStandardMaterial({ color: 0x2b4c8f, metalness: 0.5, roughness: 0.5, emissive: 0x162f63, emissiveIntensity: 0.4, envMapIntensity: 0.8 })
    );
    well.rotation.x = Math.PI / 2;
    well.position.z = -0.18;
    root.add(well);
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.82, 0.82, 0.16, 48),
      new THREE.MeshStandardMaterial({ color: 0x143a7a, metalness: 0.4, roughness: 0.5, emissive: 0x0d2a5e, emissiveIntensity: 0.5 })
    );
    hub.rotation.x = Math.PI / 2;
    hub.position.z = -0.05;
    hub.receiveShadow = true;
    root.add(hub);
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.88, 0.1, 18, 60),
      new THREE.MeshStandardMaterial({ color: FRAME, metalness: 0.6, roughness: 0.3, emissive: 0x2a468f, emissiveIntensity: 0.4, envMapIntensity: 1.1 })
    );
    rim.position.z = 0.02;
    rim.castShadow = true;
    root.add(rim);

    const checkTex = (() => {
      const s = 128,
        cv = document.createElement("canvas");
      cv.width = cv.height = s;
      const x = cv.getContext("2d")!;
      x.strokeStyle = "#fff";
      x.lineWidth = 16;
      x.lineCap = "round";
      x.lineJoin = "round";
      x.beginPath();
      x.moveTo(34, 68);
      x.lineTo(58, 92);
      x.lineTo(98, 40);
      x.stroke();
      return new THREE.CanvasTexture(cv);
    })();
    const check = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ map: checkTex, transparent: true, color: 0x1e3a8a })
    );
    check.position.z = 0.12;
    root.add(check);

    // interactivity
    let px = 0,
      py = 0,
      tx = 0,
      ty = 0,
      camDolly = 0;
    const onMove = (e: PointerEvent) => {
      px = e.clientX / window.innerWidth - 0.5;
      py = e.clientY / window.innerHeight - 0.5;
    };
    const onClick = () => {
      restart();
      camDolly = 1;
    };
    window.addEventListener("pointermove", onMove);
    canvas.addEventListener("click", onClick);

    let phase: "align" | "pause" | "seal" | "hold" = "align";
    let cur = 0,
      pause = 0,
      sealT = 0;
    const smooth = (t: number) => t * t * (3 - 2 * t);
    function restart() {
      rings.forEach((r) => {
        r.locked = false;
        r.grp.rotation.z = 0.7 + Math.random() * 1.9;
        r.torus.material.color.setHex(BLUE);
        r.torus.material.emissive.setHex(0x0a1c4a);
        r.torus.material.emissiveIntensity = 0.22;
        r.notches.forEach((n) => {
          n.material.color.setHex(BLUE_D);
          n.material.emissive.setHex(0x0b2358);
          n.material.emissiveIntensity = 0.25;
        });
        r.idx.material.color.setHex(ACC);
        r.idx.material.emissive.setHex(0x1d4ed8);
      });
      cur = 0;
      pause = 0;
      sealT = 0;
      phase = "align";
      (check.material as THREE.MeshBasicMaterial).color.setHex(0x1e3a8a);
    }
    function lockRing(r: Ring) {
      r.locked = true;
      r.torus.material.color.setHex(GREEN);
      r.torus.material.emissive.setHex(0x000000);
      r.torus.material.emissiveIntensity = 0;
      r.torus.material.metalness = 0.1;
      r.torus.material.roughness = 0.68;
      r.torus.material.envMapIntensity = 0.15;
      r.notches.forEach((n) => {
        n.material.color.setHex(GREEN);
        n.material.emissive.setHex(0x000000);
        n.material.emissiveIntensity = 0;
        n.material.metalness = 0.1;
        n.material.roughness = 0.68;
        n.material.envMapIntensity = 0.15;
      });
      r.idx.material.color.setHex(0x15803d);
      r.idx.material.emissive.setHex(0x000000);
    }

    function resize() {
      const w = canvas?.clientWidth || 1;
      const h = canvas?.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    const clock = new THREE.Clock();
    let raf = 0;
    function loop() {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      tx += (px * 0.35 - tx) * 0.06;
      ty += (py * 0.22 - ty) * 0.06;
      root.rotation.y = tx;
      root.rotation.x = ty;
      camDolly *= 0.92;
      camera.position.z = 10 - camDolly * 0.5;
      camera.lookAt(0, 0, 0);

      if (!reduced) {
        if (phase === "align") {
          const r = rings[cur];
          r.grp.rotation.z += (r.target - r.grp.rotation.z) * Math.min(1, dt * 5.5);
          if (Math.abs(r.grp.rotation.z - r.target) < 0.02 && !r.locked) {
            r.grp.rotation.z = r.target;
            lockRing(r);
            pause = 0.35;
            phase = "pause";
          }
        } else if (phase === "pause") {
          pause -= dt;
          if (pause <= 0) {
            cur++;
            phase = cur >= rings.length ? "seal" : "align";
          }
        } else if (phase === "seal") {
          sealT += dt;
          const e = smooth(Math.min(1, sealT * 1.4));
          (check.material as THREE.MeshBasicMaterial).color.copy(
            new THREE.Color(0x1e3a8a).lerp(new THREE.Color(0x137a37), e)
          );
          check.scale.setScalar(1 + Math.sin(Math.min(sealT * 6, Math.PI)) * 0.14);
          if (sealT > 2.8) phase = "hold";
        } else if (phase === "hold") {
          sealT += dt;
          if (sealT > 4.6) restart();
        }
        rings.forEach((r) => {
          if (r.locked) r.torus.material.emissiveIntensity = 0;
        });
      }
      renderer.render(scene, camera);
    }
    resize();
    window.addEventListener("resize", resize);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", onClick);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
