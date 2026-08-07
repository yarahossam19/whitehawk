"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lockpick — Offensive hero visual.
 * A probe (brand accent blue) tests each pin in turn; the instant a pin
 * gives it glows brand-success green and seats. Once all six have given,
 * the shackle springs open in a green burst, then everything resets and
 * loops. Palette mirrors VaultDoor so both hero visuals read as one system
 * against the light hero background. Self-contained (no assets).
 *
 * Place it where the hero visual should sit, e.g. the right column of the
 * Offensive hero:
 *   <div className="relative h-[380px] md:h-[500px]">
 *     <Lockpick className="absolute inset-0 h-full w-full" />
 *   </div>
 */
export function Lockpick({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    // Fog tuned to the light hero background (#F4F7FC) so depth fades
    // seamlessly into the page instead of muddying toward a dark navy.
    scene.fog = new THREE.FogExp2(0xeef3fb, 0.018);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;

    // light studio env — without this, metallic PBR materials render near-black
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

    scene.add(new THREE.AmbientLight(0xdfe8f6, 0.8));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(3, 5, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xcfe0ff, 0.45);
    fill.position.set(-4, -1, 4);
    scene.add(fill);

    function glowTex(col: string) {
      const s = 64;
      const cv = document.createElement("canvas");
      cv.width = cv.height = s;
      const x = cv.getContext("2d")!;
      const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, col);
      g.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(cv);
    }

    const root = new THREE.Group();
    root.position.set(0, 0, 0);
    scene.add(root);

    // brand palette — mirrors VaultDoor so the two hero visuals read as one system
    const BLUE_D = 0x152f7a;
    const FRAME = 0x27408c;
    const ACCENT = 0x2563eb;
    const SUCCESS = 0x16a34a;
    const STEEL = 0x9fb3d6;

    // lock body — a rounded cylinder barrel seen from the side
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 2.4, 1.4, 48),
      new THREE.MeshStandardMaterial({ color: FRAME, metalness: 0.4, roughness: 0.42, envMapIntensity: 0.85 })
    );
    barrel.rotation.x = Math.PI / 2;
    root.add(barrel);
    const face = new THREE.Mesh(
      new THREE.CircleGeometry(2.1, 48),
      new THREE.MeshStandardMaterial({ color: BLUE_D, metalness: 0.35, roughness: 0.45, envMapIntensity: 0.85 })
    );
    face.position.z = 0.71;
    root.add(face);
    // keyway slit
    const keyway = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 2.6),
      new THREE.MeshBasicMaterial({ color: 0x0a1a3a })
    );
    keyway.position.z = 0.72;
    root.add(keyway);
    const keytop = new THREE.Mesh(
      new THREE.CircleGeometry(0.55, 32),
      new THREE.MeshBasicMaterial({ color: 0x0a1a3a })
    );
    keytop.position.set(0, 0.9, 0.72);
    root.add(keytop);

    // pins across the top — the ones being picked
    type Pin = {
      pin: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshStandardMaterial>;
      gl: THREE.Sprite;
      x: number;
      set: boolean;
    };
    const NP = 6;
    const pins: Pin[] = [];
    for (let i = 0; i < NP; i++) {
      const x = (i - (NP - 1) / 2) * 0.62;
      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.11, 1.4, 16),
        new THREE.MeshStandardMaterial({ color: STEEL, metalness: 0.5, roughness: 0.35, envMapIntensity: 0.85 })
      );
      pin.position.set(x, 1.7, 0.4);
      root.add(pin);
      // success glow — brand green, matching VaultDoor's "locked" cue
      const gl = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex("rgba(34,197,94,0.95)"),
          color: SUCCESS,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      gl.scale.set(0.9, 0.9, 1);
      gl.position.copy(pin.position);
      root.add(gl);
      pins.push({ pin, gl, x, set: false });
    }

    // probe (pick) — a thin bright bar that moves under each pin, in the brand accent
    const probe = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.08, 0.2),
      new THREE.MeshBasicMaterial({ color: ACCENT })
    );
    probe.position.set(pins[0].x, 0.95, 0.5);
    root.add(probe);

    // shackle (opens on success)
    const shackle = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.22, 16, 40, Math.PI),
      new THREE.MeshStandardMaterial({ color: STEEL, metalness: 0.5, roughness: 0.35, envMapIntensity: 0.85 })
    );
    shackle.position.set(0, 2.0, 0);
    root.add(shackle);
    const openGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex("rgba(34,197,94,0.9)"),
        color: SUCCESS,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    openGlow.scale.set(6, 6, 1);
    openGlow.position.z = 0.5;
    root.add(openGlow);

    let cur = 0;
    let tImer = 0;
    let phase: "pick" | "open" | "wait" = "pick";
    let openT = 0;
    let t = 0;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    function resetAll() {
      pins.forEach((p) => {
        p.set = false;
        p.gl.material.opacity = 0;
        p.pin.position.y = 1.7;
        p.pin.material.color.setHex(STEEL);
        p.pin.material.metalness = 0.5;
        p.pin.material.roughness = 0.35;
      });
      cur = 0;
      phase = "pick";
      openT = 0;
      shackle.position.y = 2.0;
      openGlow.material.opacity = 0;
    }

    function resize() {
      const w = canvas?.clientWidth || 1;
      const h = canvas?.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    let raf = 0;
    function loop() {
      raf = requestAnimationFrame(loop);
      t += 0.016;
      root.rotation.y = Math.sin(t * 0.3) * 0.12;

      if (!reduced) {
        if (phase === "pick") {
          tImer += 0.016;
          probe.position.x += (pins[cur].x - probe.position.x) * 0.2;
          // "testing" jitter
          pins[cur].pin.position.y = 1.7 + Math.sin(t * 30) * 0.04;
          if (tImer > 0.6) {
            // pin gives
            pins[cur].set = true;
            pins[cur].gl.material.opacity = 1;
            pins[cur].pin.material.color.setHex(SUCCESS);
            pins[cur].pin.material.metalness = 0.1;
            pins[cur].pin.material.roughness = 0.6;
            pins[cur].pin.position.y = 1.55;
            tImer = 0;
            cur++;
            if (cur >= NP) phase = "open";
          }
        } else if (phase === "open") {
          openT += 0.02;
          shackle.position.y = 2.0 + Math.min(1.4, openT * 1.4);
          openGlow.material.opacity = Math.max(0, 0.9 - openT * 0.3);
          pins.forEach((p) => (p.gl.material.opacity = Math.max(0, 1 - openT * 0.4)));
          if (openT > 3.2) {
            resetTimer = setTimeout(resetAll, 300);
            phase = "wait";
          }
        }
      }
      renderer.render(scene, camera);
    }

    resize();
    window.addEventListener("resize", resize);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      if (resetTimer) clearTimeout(resetTimer);
      window.removeEventListener("resize", resize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
