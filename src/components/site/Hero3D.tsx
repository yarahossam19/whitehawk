"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

export type Hero3DVariant =
  | "offensive"
  | "defensive"
  | "grc"
  | "asset"
  | "platform";

interface Hero3DProps {
  variant: Hero3DVariant;
  className?: string;
}

/**
 * Purpose-built Three.js hero scenes. Each variant is a named concept:
 *   platform   — "The Connected Core"   : WHITEHAWK hub, four programs feeding signals in
 *   offensive  — "The Exposed Firewall" : identical to Defensive, but each hit blooms RED
 *   defensive  — "The Aegis"               : detect & contain
 *   grc        — "The Audit Checklist"     : controls draw in, tick off, certificate spins
 *   asset      — "The Living Constellation": orbiting category shells that never stop growing
 *
 * The home page uses a lighter, standalone particle component (HeroWordmark)
 * instead of this file, to keep the highest-traffic page's JS/GPU cost down.
 *
 * Shared: 3-point rig + ACES filmic tone mapping + soft fog + cursor parallax.
 * Three.js is dynamically imported so SSR stays safe.
 */
export function Hero3D({ variant, className }: Hero3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  /**
   * Gate on the canvas actually being on screen before the ~600 KB `three`
   * chunk is fetched and a WebGL context is built.
   *
   * The scene is decorative (the wrapper is aria-hidden), but it used to start
   * unconditionally on mount, so its import, shader compilation and first
   * frames all landed inside the window that decides LCP and Total Blocking
   * Time — on the one element of the page that no visitor is waiting to read.
   * `rootMargin` starts the work slightly before the hero scrolls in, so the
   * scene is already running by the time it's visible.
   */
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // No IntersectionObserver (very old browsers) — don't hide the visual,
    // just fall back to the previous eager behavior.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(mount);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (disposed || !mount) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const width = mount.clientWidth || 600;
      const height = mount.clientHeight || 480;

      // ---------- Scene / camera / renderer ----------
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x081a3a, 6, 18);

      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0.4, 6.2);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.localClippingEnabled = true; // harmless; kept for any clip-based scene
      mount.appendChild(renderer.domElement);

      const disposables: Array<{ dispose: () => void }> = [];

      // ---------- Lighting rig ----------
      const key = new THREE.DirectionalLight(0xbfd5ff, 1.7);
      key.position.set(4, 5, 4);
      scene.add(key);
      const fill = new THREE.PointLight(0x2563eb, 1.8, 22);
      fill.position.set(-3.5, -2, 2);
      scene.add(fill);
      const rim = new THREE.PointLight(0x8bb4ff, 1.2, 20);
      rim.position.set(0, 0, -5);
      scene.add(rim);
      scene.add(new THREE.AmbientLight(0x1a2a4a, 0.7));

      // ---------- Background: distant particle field ----------
      const bgCount = 240;
      const bgPos = new Float32Array(bgCount * 3);
      for (let i = 0; i < bgCount; i++) {
        const r = 6 + Math.random() * 6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        bgPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        bgPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
        bgPos[i * 3 + 2] = r * Math.cos(phi) - 3;
      }
      const bgGeo = new THREE.BufferGeometry();
      bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPos, 3));
      const bgMat = new THREE.PointsMaterial({
        color: 0x9bb4e6,
        size: 0.022,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      });
      const bgField = new THREE.Points(bgGeo, bgMat);
      scene.add(bgField);
      disposables.push(bgGeo, bgMat);

      const stage = new THREE.Group();
      scene.add(stage);

      type Step = (t: number, dt: number) => void;

      // =====================================================================
      // 2) PLATFORM — The Connected Core
      // WHITEHAWK at the centre with the four programs orbiting it. A signal
      // dot runs each dashed spoke in to the core and back; the wordmark
      // flashes brighter the instant a dot reaches it. Sonar rings pulse out
      // from every program icon. Recreates the connected-platform diagram.
      // =====================================================================
      const buildPlatform = (): Step => {
        const grp = new THREE.Group();
        grp.scale.setScalar(0.72);
        stage.add(grp);

        const CENTER = new THREE.Vector3(0, 0, 0);
        const DIM = new THREE.Color(0x8fa6cf);   // resting wordmark tint
        const BRIGHT = new THREE.Color(0xffffff); // lit on hit

        // ---------- WHITEHAWK wordmark (canvas → sprite) ----------
        const makeWordTex = () => {
          const w = 1024, h = 256;
          const cv = document.createElement("canvas");
          cv.width = w; cv.height = h;
          const x = cv.getContext("2d")!;
          x.clearRect(0, 0, w, h);
          x.fillStyle = "#ffffff";
          x.font = "800 150px Manrope, Inter, Arial, sans-serif";
          x.textAlign = "center";
          x.textBaseline = "middle";
          try { (x as unknown as { letterSpacing: string }).letterSpacing = "10px"; } catch { /* older canvas */ }
          x.fillText("WHITEHAWK", w / 2, h / 2);
          const tex = new THREE.CanvasTexture(cv);
          tex.colorSpace = THREE.SRGBColorSpace;
          return tex;
        };
        const wordTex = makeWordTex();
        const WORD_W = 3.6, WORD_H = WORD_W * (256 / 1024);
        const wordMat = new THREE.SpriteMaterial({ map: wordTex, transparent: true, depthWrite: false, color: DIM.clone() });
        const word = new THREE.Sprite(wordMat);
        word.scale.set(WORD_W, WORD_H, 1);
        grp.add(word);
        const glowMat = new THREE.SpriteMaterial({ map: wordTex, transparent: true, depthWrite: false, color: 0x9fc2ff, opacity: 0, blending: THREE.AdditiveBlending });
        const wordGlow = new THREE.Sprite(glowMat);
        wordGlow.scale.set(WORD_W * 1.06, WORD_H * 1.45, 1);
        grp.add(wordGlow);
        disposables.push(wordTex, wordMat, glowMat);

        // ---------- program icons (white line icons on canvas) ----------
        const iconTex = (draw: (x: CanvasRenderingContext2D, s: number) => void) => {
          const s = 128;
          const cv = document.createElement("canvas");
          cv.width = cv.height = s;
          const x = cv.getContext("2d")!;
          x.strokeStyle = "#ffffff"; x.fillStyle = "#ffffff";
          x.lineWidth = 7; x.lineJoin = "round"; x.lineCap = "round";
          draw(x, s);
          const tex = new THREE.CanvasTexture(cv);
          tex.colorSpace = THREE.SRGBColorSpace;
          return tex;
        };
        const drawAsset = (x: CanvasRenderingContext2D, s: number) => {
          const r = (a: number) => s * a;
          x.strokeRect(r(0.2), r(0.24), r(0.6), r(0.2));
          x.strokeRect(r(0.2), r(0.56), r(0.6), r(0.2));
          x.beginPath(); x.arc(r(0.3), r(0.34), r(0.02), 0, Math.PI * 2); x.arc(r(0.3), r(0.66), r(0.02), 0, Math.PI * 2); x.fill();
        };
        const drawGrc = (x: CanvasRenderingContext2D, s: number) => {
          const r = (a: number) => s * a;
          x.strokeRect(r(0.28), r(0.2), r(0.44), r(0.64));
          x.strokeRect(r(0.4), r(0.12), r(0.2), r(0.12));
          x.beginPath(); x.moveTo(r(0.38), r(0.42)); x.lineTo(r(0.62), r(0.42)); x.moveTo(r(0.38), r(0.56)); x.lineTo(r(0.56), r(0.56)); x.stroke();
        };
        const drawDef = (x: CanvasRenderingContext2D, s: number) => {
          const r = (a: number) => s * a;
          x.beginPath();
          x.moveTo(r(0.5), r(0.14)); x.lineTo(r(0.8), r(0.26)); x.lineTo(r(0.8), r(0.5));
          x.quadraticCurveTo(r(0.8), r(0.78), r(0.5), r(0.9));
          x.quadraticCurveTo(r(0.2), r(0.78), r(0.2), r(0.5));
          x.lineTo(r(0.2), r(0.26)); x.closePath(); x.stroke();
          x.beginPath(); x.moveTo(r(0.38), r(0.5)); x.lineTo(r(0.47), r(0.6)); x.lineTo(r(0.64), r(0.4)); x.stroke();
        };
        const drawOff = (x: CanvasRenderingContext2D, s: number) => {
          const r = (a: number) => s * a;
          x.beginPath(); x.arc(r(0.5), r(0.5), r(0.3), 0, Math.PI * 2); x.stroke();
          x.beginPath();
          x.moveTo(r(0.5), r(0.08)); x.lineTo(r(0.5), r(0.2));
          x.moveTo(r(0.5), r(0.8)); x.lineTo(r(0.5), r(0.92));
          x.moveTo(r(0.08), r(0.5)); x.lineTo(r(0.2), r(0.5));
          x.moveTo(r(0.8), r(0.5)); x.lineTo(r(0.92), r(0.5));
          x.stroke();
          x.beginPath(); x.arc(r(0.5), r(0.5), r(0.06), 0, Math.PI * 2); x.fill();
        };

        const BLUE = 0x2563eb;
        const defs = [
          { color: BLUE, pos: new THREE.Vector3(-2.7, 1.35, 0), draw: drawAsset, label: "Asset Management" },
          { color: BLUE, pos: new THREE.Vector3(2.7, 1.35, 0), draw: drawGrc, label: "GRC" },
          { color: BLUE, pos: new THREE.Vector3(-2.7, -1.35, 0), draw: drawDef, label: "Defensive" },
          { color: BLUE, pos: new THREE.Vector3(2.7, -1.35, 0), draw: drawOff, label: "Offensive" },
        ];

        // ---------- program name labels (canvas → sprite, under each icon) ----------
        const labelTex = (text: string) => {
          const w = 1024, h = 192;
          const cv = document.createElement("canvas");
          cv.width = w; cv.height = h;
          const x = cv.getContext("2d")!;
          x.clearRect(0, 0, w, h);
          // light slate — this scene sits on a light background, not a dark one
          x.fillStyle = "#94a3b8";
          x.font = "800 84px Manrope, Inter, Arial, sans-serif";
          x.textAlign = "center";
          x.textBaseline = "middle";
          try { (x as unknown as { letterSpacing: string }).letterSpacing = "2px"; } catch { /* older canvas */ }
          x.fillText(text.toUpperCase(), w / 2, h / 2);
          const tex = new THREE.CanvasTexture(cv);
          tex.colorSpace = THREE.SRGBColorSpace;
          return tex;
        };

        // bright round sprite for the travelling dot — a solid opaque core
        // (not just a single center pixel) so it reads clearly, with a soft
        // halo fading out around it.
        const glowTex = (() => {
          const s = 64;
          const cv = document.createElement("canvas");
          cv.width = cv.height = s;
          const x = cv.getContext("2d")!;
          const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
          g.addColorStop(0, "rgba(255,255,255,1)");
          g.addColorStop(0.4, "rgba(255,255,255,1)");
          g.addColorStop(1, "rgba(255,255,255,0)");
          x.fillStyle = g; x.fillRect(0, 0, s, s);
          const tex = new THREE.CanvasTexture(cv);
          tex.colorSpace = THREE.SRGBColorSpace;
          return tex;
        })();
        disposables.push(glowTex);

        const ringGeo = new THREE.TorusGeometry(0.46, 0.014, 8, 48);
        const sonarGeo = new THREE.RingGeometry(0.92, 1.0, 48);
        disposables.push(ringGeo, sonarGeo);

        type Node = {
          pos: THREE.Vector3;
          A: THREE.Vector3;
          B: THREE.Vector3;
          dot: THREE.Sprite;
          sonar: Array<{ mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial }>;
          phase: number;
          arrived: boolean;
        };
        const nodes: Node[] = [];

        defs.forEach((d, i) => {
          // outline circle
          const ringMat = new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.55 });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.position.copy(d.pos);
          grp.add(ring);
          disposables.push(ringMat);

          // icon
          const tex = iconTex(d.draw);
          const iconMat = new THREE.SpriteMaterial({ map: tex, color: d.color, transparent: true, depthWrite: false });
          const icon = new THREE.Sprite(iconMat);
          icon.scale.set(0.5, 0.5, 1);
          icon.position.copy(d.pos);
          icon.position.z = 0.02;
          grp.add(icon);
          disposables.push(tex, iconMat);

          // program name, under the icon — dark ink baked into the texture,
          // neutral (white) tint so it isn't recolored, fog-immune
          const labelTexture = labelTex(d.label);
          const labelMat = new THREE.SpriteMaterial({
            map: labelTexture,
            color: 0xffffff,
            transparent: true,
            opacity: 1,
            depthWrite: false,
            depthTest: false,
            fog: false,
          });
          const LABEL_W = 1.7, LABEL_H = LABEL_W * (192 / 1024);
          const label = new THREE.Sprite(labelMat);
          label.scale.set(LABEL_W, LABEL_H, 1);
          label.position.copy(d.pos);
          label.position.y -= 0.64;
          label.position.z = 0.05;
          label.renderOrder = 10;
          grp.add(label);
          disposables.push(labelTexture, labelMat);

          // sonar rings
          const sonar: Node["sonar"] = [];
          for (let k = 0; k < 2; k++) {
            const mat = new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
            const mesh = new THREE.Mesh(sonarGeo, mat);
            mesh.position.copy(d.pos);
            mesh.scale.setScalar(0.46);
            grp.add(mesh);
            sonar.push({ mesh, mat });
            disposables.push(mat);
          }

          // dashed connector icon → core
          const dir = d.pos.clone().sub(CENTER).normalize();
          const A = d.pos.clone().addScaledVector(dir, -0.52); // just off the icon
          const B = CENTER.clone().addScaledVector(dir, 1.15); // just off the wordmark
          const lineGeo = new THREE.BufferGeometry().setFromPoints([A, B]);
          const lineMat = new THREE.LineDashedMaterial({ color: d.color, transparent: true, opacity: 0.5, dashSize: 0.07, gapSize: 0.07 });
          const line = new THREE.Line(lineGeo, lineMat);
          line.computeLineDistances();
          grp.add(line);
          disposables.push(lineGeo, lineMat);

          // travelling dot — solid white, always. NormalBlending (not
          // Additive) so it composites as an actual opaque circle against a
          // light page background rather than a faint glow that only reads
          // over a dark one.
          const dotMat = new THREE.SpriteMaterial({
            map: glowTex,
            color: 0xffffff,
            transparent: true,
            opacity: 1,
            depthWrite: false,
            depthTest: false,
            fog: false,
          });
          const dot = new THREE.Sprite(dotMat);
          dot.renderOrder = 10;
          dot.scale.set(0.34, 0.34, 1);
          grp.add(dot);
          disposables.push(dotMat);

          nodes.push({ pos: d.pos, A, B, dot, sonar, phase: i * 0.25, arrived: false });
        });

        let flash = 0;

        return (t, dt) => {
          grp.rotation.y = Math.sin(t * 0.15) * 0.04;
          grp.rotation.x = Math.sin(t * 0.11) * 0.02;

          nodes.forEach((nd, i) => {
            const period = 10.5; // slower signal travel along each spoke
            const ph = ((t / period) + nd.phase) % 1;
            const u = ph < 0.5 ? ph * 2 : 2 - ph * 2; // icon → core → icon
            nd.dot.position.lerpVectors(nd.A, nd.B, u);
            if (u > 0.965 && !nd.arrived) { nd.arrived = true; flash = 1; }
            if (u < 0.6) nd.arrived = false;

            nd.sonar.forEach((sr, k) => {
              const sp = ((t * 0.35) + k * 0.5 + i * 0.13) % 1;
              sr.mesh.scale.setScalar(0.46 * (1 + sp * 1.7));
              sr.mat.opacity = 0.5 * (1 - sp);
            });
          });

          // wordmark: a slow, gentle glow when a dot arrives — decays smoothly
          // (eased, not linear) so it reads as a soft shine, not a flicker.
          flash = Math.max(0, flash - dt * 0.7);
          const shine = flash * flash * (3 - 2 * flash); // smoothstep
          wordMat.color.copy(DIM).lerp(BRIGHT, shine * 0.45);
          glowMat.opacity = shine * 0.22;
          const pulse = 1 + shine * 0.025;
          word.scale.set(WORD_W * pulse, WORD_H * pulse, 1);
        };
      };


      // =====================================================================
      // 3) OFFENSIVE — The Exposed Firewall
      // Identical to Defensive (the invisible firewall): attack particles
      // fly in and detonate on the unseen shield, blooming a hexagonal
      // ripple — but here the ripple is RED, marking the weak point our
      // offensive testing just found. Same motion, same style, red palette.
      // =====================================================================
      const buildOffensive = (): Step => {
        const SHIELD_R = 1.7;

        // Invisible shield surface — used only for math + as an occasional
        // faint reveal patch on impact. Kept fully transparent by default.
        const shieldGeo = new THREE.IcosahedronGeometry(SHIELD_R, 3);

        // Facet reveal — a soft hex patch that briefly flashes at impact,
        // built as a hexagonal ring facing outward from the impact point.
        const makeHex = (radius: number, thickness: number) => {
          const shape = new THREE.Shape();
          for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
            const x = Math.cos(a) * radius;
            const y = Math.sin(a) * radius;
            if (i === 0) shape.moveTo(x, y);
            else shape.lineTo(x, y);
          }
          shape.closePath();
          const hole = new THREE.Path();
          for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
            const x = Math.cos(a) * (radius - thickness);
            const y = Math.sin(a) * (radius - thickness);
            if (i === 0) hole.moveTo(x, y);
            else hole.lineTo(x, y);
          }
          hole.closePath();
          shape.holes.push(hole);
          return new THREE.ShapeGeometry(shape, 1);
        };

        const hexRingGeo = makeHex(0.32, 0.04);
        const hexFillGeo = makeHex(0.32, 0.32); // solid hex
        disposables.push(hexRingGeo, hexFillGeo, shieldGeo);

        const rand = (min: number, max: number) => min + Math.random() * (max - min);

        // Shatter cracks — jagged fracture lines that flash across the shell
        // from the impact point, as if the beam actually broke through it
        // rather than just lighting it up. Pre-allocated buffers, refilled
        // procedurally on each impact.
        const CRACK_LINES = 9;
        const CRACK_MAX_SEGS = 4;
        const CRACK_MAX_POINTS = CRACK_LINES * CRACK_MAX_SEGS * 2;

        // Pool of impact reveals — each spawns a hex ring (expanding) + hex fill (glowing) + shatter cracks.
        type Reveal = {
          ring: THREE.Mesh;
          ringMat: THREE.MeshBasicMaterial;
          fill: THREE.Mesh;
          fillMat: THREE.MeshBasicMaterial;
          neighbors: THREE.Mesh[];
          neighborMats: THREE.MeshBasicMaterial[];
          crack: THREE.LineSegments;
          crackMat: THREE.LineBasicMaterial;
          crackPos: THREE.BufferAttribute;
          birth: number;
          alive: boolean;
        };
        const reveals: Reveal[] = [];
        const REVEAL_POOL = 10;
        for (let i = 0; i < REVEAL_POOL; i++) {
          const ringMat = new THREE.MeshBasicMaterial({
            color: 0xff8f8f,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          const ring = new THREE.Mesh(hexRingGeo, ringMat);
          ring.visible = false;
          stage.add(ring);

          const fillMat = new THREE.MeshBasicMaterial({
            color: 0xe5484d,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          const fill = new THREE.Mesh(hexFillGeo, fillMat);
          fill.visible = false;
          stage.add(fill);

          // 6 neighbor hexes that briefly light up around the impact
          const neighbors: THREE.Mesh[] = [];
          const neighborMats: THREE.MeshBasicMaterial[] = [];
          for (let n = 0; n < 6; n++) {
            const nm = new THREE.MeshBasicMaterial({
              color: 0xc23b3b,
              transparent: true,
              opacity: 0,
              side: THREE.DoubleSide,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            });
            const nmesh = new THREE.Mesh(hexFillGeo, nm);
            nmesh.visible = false;
            stage.add(nmesh);
            neighbors.push(nmesh);
            neighborMats.push(nm);
            disposables.push(nm);
          }

          // Hot white-red fracture lines — the "shattered" tell
          const crackGeo = new THREE.BufferGeometry();
          const crackPosAttr = new THREE.BufferAttribute(new Float32Array(CRACK_MAX_POINTS * 3), 3);
          crackGeo.setAttribute("position", crackPosAttr);
          crackGeo.setDrawRange(0, 0);
          const crackMat = new THREE.LineBasicMaterial({
            color: 0xfff0ea,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          const crack = new THREE.LineSegments(crackGeo, crackMat);
          crack.visible = false;
          stage.add(crack);
          disposables.push(crackGeo, crackMat);

          reveals.push({
            ring,
            ringMat,
            fill,
            fillMat,
            neighbors,
            neighborMats,
            crack,
            crackMat,
            crackPos: crackPosAttr,
            birth: 0,
            alive: false,
          });
          disposables.push(ringMat, fillMat);
        }

        // Incoming "attack" particles — bright, streaking toward center
        const threatCount = 10;
        const threatGeo = new THREE.SphereGeometry(0.05, 10, 10);
        const threatMat = new THREE.MeshBasicMaterial({
          color: 0xffe08a,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
        });
        disposables.push(threatGeo, threatMat);
        // Trailing streak — a stretched sprite behind each threat
        const trailGeo = new THREE.CylinderGeometry(0.008, 0.03, 0.6, 8, 1, true);
        trailGeo.translate(0, 0.3, 0);
        const trailMat = new THREE.MeshBasicMaterial({
          color: 0xffb347,
          transparent: true,
          opacity: 0.55,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        disposables.push(trailGeo, trailMat);

        type Threat = {
          mesh: THREE.Mesh;
          trail: THREE.Mesh;
          dir: THREE.Vector3;
          pos: THREE.Vector3;
          state: "idle" | "in";
          nextT: number;
        };
        const threats: Threat[] = [];
        for (let i = 0; i < threatCount; i++) {
          const m = new THREE.Mesh(threatGeo, threatMat);
          m.visible = false;
          stage.add(m);
          const tr = new THREE.Mesh(trailGeo, trailMat);
          tr.visible = false;
          stage.add(tr);
          threats.push({
            mesh: m,
            trail: tr,
            dir: new THREE.Vector3(),
            pos: new THREE.Vector3(),
            state: "idle",
            nextT: 0.4 + i * 0.35,
          });
        }

        const spawnReveal = (t: number, hit: THREE.Vector3) => {
          const slot = reveals.find((r) => !r.alive);
          if (!slot) return;
          const normal = hit.clone().normalize();
          const outward = hit.clone().addScaledVector(normal, 0.001);

          slot.ring.position.copy(outward);
          slot.ring.lookAt(normal.clone().multiplyScalar(10));
          slot.ring.visible = true;
          slot.ringMat.opacity = 0.95;
          slot.ring.scale.setScalar(0.6);

          slot.fill.position.copy(outward);
          slot.fill.lookAt(normal.clone().multiplyScalar(10));
          slot.fill.visible = true;
          slot.fillMat.opacity = 0.55;
          slot.fill.scale.setScalar(0.9);

          // Place 6 neighbor hexes tangentially around the impact
          const up = Math.abs(normal.y) > 0.95
            ? new THREE.Vector3(1, 0, 0)
            : new THREE.Vector3(0, 1, 0);
          const tangent = new THREE.Vector3().crossVectors(normal, up).normalize();
          const bitangent = new THREE.Vector3().crossVectors(normal, tangent).normalize();
          const hexStep = 0.56; // spacing between neighbor centers
          for (let n = 0; n < 6; n++) {
            const a = (n / 6) * Math.PI * 2 + Math.PI / 6;
            const offset = tangent
              .clone()
              .multiplyScalar(Math.cos(a) * hexStep)
              .addScaledVector(bitangent, Math.sin(a) * hexStep);
            const p = hit.clone().add(offset).normalize().multiplyScalar(SHIELD_R + 0.002);
            slot.neighbors[n].position.copy(p);
            slot.neighbors[n].lookAt(p.clone().multiplyScalar(10));
            slot.neighbors[n].visible = true;
            slot.neighbors[n].scale.setScalar(0.7);
            slot.neighborMats[n].opacity = 0.35;
          }

          // Shatter cracks — jagged lines radiating from the impact across
          // the tangent plane, as if the beam physically broke the shell
          // open right here rather than just lighting it up.
          const cPos = slot.crackPos;
          let cIdx = 0;
          for (let i = 0; i < CRACK_LINES; i++) {
            let lx = 0;
            let ly = 0;
            let angle = (i / CRACK_LINES) * Math.PI * 2 + rand(-0.35, 0.35);
            const segCount = 2 + Math.floor(Math.random() * (CRACK_MAX_SEGS - 1));
            for (let s = 0; s < segCount; s++) {
              const len = rand(0.12, 0.3);
              const nx = lx + Math.cos(angle) * len;
              const ny = ly + Math.sin(angle) * len;
              const p0 = outward.clone().addScaledVector(tangent, lx).addScaledVector(bitangent, ly);
              const p1 = outward.clone().addScaledVector(tangent, nx).addScaledVector(bitangent, ny);
              cPos.setXYZ(cIdx++, p0.x, p0.y, p0.z);
              cPos.setXYZ(cIdx++, p1.x, p1.y, p1.z);
              lx = nx;
              ly = ny;
              angle += rand(-0.9, 0.9);
            }
          }
          cPos.needsUpdate = true;
          slot.crack.geometry.setDrawRange(0, cIdx);
          slot.crack.visible = true;
          slot.crackMat.opacity = 1;

          slot.alive = true;
          slot.birth = t;
        };

        return (t) => {
          // Threats loop: idle → fly in → detonate on shield surface → idle
          threats.forEach((tr) => {
            if (tr.state === "idle" && t > tr.nextT) {
              const theta = Math.random() * Math.PI * 2;
              const phi = Math.acos(2 * Math.random() - 1);
              const from = new THREE.Vector3(
                Math.sin(phi) * Math.cos(theta),
                Math.sin(phi) * Math.sin(theta),
                Math.cos(phi),
              ).multiplyScalar(4.5);
              tr.pos.copy(from);
              tr.dir.copy(from).negate().normalize().multiplyScalar(2.6);
              tr.state = "in";
              tr.mesh.visible = true;
              tr.trail.visible = true;
            }
            if (tr.state === "in") {
              tr.pos.addScaledVector(tr.dir, 0.035);
              tr.mesh.position.copy(tr.pos);
              // Orient trail along travel direction (points from tail into head)
              const travel = tr.dir.clone().normalize();
              tr.trail.position.copy(tr.pos);
              tr.trail.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), travel.clone().negate());

              if (tr.pos.length() < SHIELD_R) {
                const hit = tr.pos.clone().normalize().multiplyScalar(SHIELD_R);
                spawnReveal(t, hit);
                tr.state = "idle";
                tr.nextT = t + 1.1 + Math.random() * 1.5;
                tr.mesh.visible = false;
                tr.trail.visible = false;
              }
            }
          });

          // Reveals: expand + fade the ring, hex fill flashes then fades,
          // neighbors briefly ripple in a staggered pattern, cracks flash
          // and linger a beat longer than the glow — the shell reads as
          // shattered, not just lit.
          reveals.forEach((r) => {
            if (!r.alive) return;
            const age = t - r.birth;
            const life = 1.1;
            const p = age / life;

            // Ring: expands aggressively, fades fast
            const rScale = 0.6 + p * 3.2;
            r.ring.scale.setScalar(rScale);
            r.ringMat.opacity = Math.max(0, 0.95 * (1 - p));

            // Center hex fill: quick flash
            const flash = Math.max(0, 1 - age / 0.35);
            r.fillMat.opacity = 0.75 * flash;
            r.fill.scale.setScalar(0.9 + (1 - flash) * 0.3);

            // Neighbor hexes: staggered pulse
            r.neighbors.forEach((n, idx) => {
              const delay = 0.05 + idx * 0.04;
              const nAge = age - delay;
              if (nAge < 0) {
                r.neighborMats[idx].opacity = 0;
                return;
              }
              const nLife = 0.6;
              const np = Math.min(1, nAge / nLife);
              r.neighborMats[idx].opacity = 0.55 * (1 - np);
              n.scale.setScalar(0.7 + np * 0.4);
            });

            // Cracks: instant hot flash, fading slightly slower than the
            // ring — reads as light still bleeding through the fracture.
            r.crackMat.opacity = Math.max(0, 1 - Math.pow(p, 1.6));

            if (p >= 1) {
              r.alive = false;
              r.ring.visible = false;
              r.fill.visible = false;
              r.neighbors.forEach((n) => (n.visible = false));
              r.crack.visible = false;
            }
          });
        };
      };





      // =====================================================================
      // 4) DEFENSIVE — The Invisible Firewall
      // Empty navy space. Nothing visibly there — until particle "attacks"
      // detonate on an unseen curved wall, blooming a hexagonal ripple of
      // blue light that reveals the wall for a split second, then fades.
      // =====================================================================
      const buildDefensive = (): Step => {
        const SHIELD_R = 1.7;

        // Invisible shield surface — used only for math + as an occasional
        // faint reveal patch on impact. Kept fully transparent by default.
        const shieldGeo = new THREE.IcosahedronGeometry(SHIELD_R, 3);

        // Facet reveal — a soft hex patch that briefly flashes at impact,
        // built as a hexagonal ring facing outward from the impact point.
        const makeHex = (radius: number, thickness: number) => {
          const shape = new THREE.Shape();
          for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
            const x = Math.cos(a) * radius;
            const y = Math.sin(a) * radius;
            if (i === 0) shape.moveTo(x, y);
            else shape.lineTo(x, y);
          }
          shape.closePath();
          const hole = new THREE.Path();
          for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
            const x = Math.cos(a) * (radius - thickness);
            const y = Math.sin(a) * (radius - thickness);
            if (i === 0) hole.moveTo(x, y);
            else hole.lineTo(x, y);
          }
          hole.closePath();
          shape.holes.push(hole);
          return new THREE.ShapeGeometry(shape, 1);
        };

        const hexRingGeo = makeHex(0.32, 0.04);
        const hexFillGeo = makeHex(0.32, 0.32); // solid hex
        disposables.push(hexRingGeo, hexFillGeo, shieldGeo);

        // Pool of impact reveals — each spawns a hex ring (expanding) + hex fill (glowing).
        type Reveal = {
          ring: THREE.Mesh;
          ringMat: THREE.MeshBasicMaterial;
          fill: THREE.Mesh;
          fillMat: THREE.MeshBasicMaterial;
          neighbors: THREE.Mesh[];
          neighborMats: THREE.MeshBasicMaterial[];
          birth: number;
          alive: boolean;
        };
        const reveals: Reveal[] = [];
        const REVEAL_POOL = 10;
        for (let i = 0; i < REVEAL_POOL; i++) {
          const ringMat = new THREE.MeshBasicMaterial({
            color: 0x8bb4ff,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          const ring = new THREE.Mesh(hexRingGeo, ringMat);
          ring.visible = false;
          stage.add(ring);

          const fillMat = new THREE.MeshBasicMaterial({
            color: 0x2563eb,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          const fill = new THREE.Mesh(hexFillGeo, fillMat);
          fill.visible = false;
          stage.add(fill);

          // 6 neighbor hexes that briefly light up around the impact
          const neighbors: THREE.Mesh[] = [];
          const neighborMats: THREE.MeshBasicMaterial[] = [];
          for (let n = 0; n < 6; n++) {
            const nm = new THREE.MeshBasicMaterial({
              color: 0x3d6ed8,
              transparent: true,
              opacity: 0,
              side: THREE.DoubleSide,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            });
            const nmesh = new THREE.Mesh(hexFillGeo, nm);
            nmesh.visible = false;
            stage.add(nmesh);
            neighbors.push(nmesh);
            neighborMats.push(nm);
            disposables.push(nm);
          }

          reveals.push({
            ring,
            ringMat,
            fill,
            fillMat,
            neighbors,
            neighborMats,
            birth: 0,
            alive: false,
          });
          disposables.push(ringMat, fillMat);
        }

        // Incoming "attack" particles — bright, streaking toward center
        const threatCount = 10;
        const threatGeo = new THREE.SphereGeometry(0.05, 10, 10);
        const threatMat = new THREE.MeshBasicMaterial({
          color: 0xffe08a,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
        });
        disposables.push(threatGeo, threatMat);
        // Trailing streak — a stretched sprite behind each threat
        const trailGeo = new THREE.CylinderGeometry(0.008, 0.03, 0.6, 8, 1, true);
        trailGeo.translate(0, 0.3, 0);
        const trailMat = new THREE.MeshBasicMaterial({
          color: 0xffb347,
          transparent: true,
          opacity: 0.55,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        disposables.push(trailGeo, trailMat);

        type Threat = {
          mesh: THREE.Mesh;
          trail: THREE.Mesh;
          dir: THREE.Vector3;
          pos: THREE.Vector3;
          state: "idle" | "in";
          nextT: number;
        };
        const threats: Threat[] = [];
        for (let i = 0; i < threatCount; i++) {
          const m = new THREE.Mesh(threatGeo, threatMat);
          m.visible = false;
          stage.add(m);
          const tr = new THREE.Mesh(trailGeo, trailMat);
          tr.visible = false;
          stage.add(tr);
          threats.push({
            mesh: m,
            trail: tr,
            dir: new THREE.Vector3(),
            pos: new THREE.Vector3(),
            state: "idle",
            nextT: 0.4 + i * 0.35,
          });
        }

        const spawnReveal = (t: number, hit: THREE.Vector3) => {
          const slot = reveals.find((r) => !r.alive);
          if (!slot) return;
          const normal = hit.clone().normalize();
          const outward = hit.clone().addScaledVector(normal, 0.001);

          slot.ring.position.copy(outward);
          slot.ring.lookAt(normal.clone().multiplyScalar(10));
          slot.ring.visible = true;
          slot.ringMat.opacity = 0.95;
          slot.ring.scale.setScalar(0.6);

          slot.fill.position.copy(outward);
          slot.fill.lookAt(normal.clone().multiplyScalar(10));
          slot.fill.visible = true;
          slot.fillMat.opacity = 0.55;
          slot.fill.scale.setScalar(0.9);

          // Place 6 neighbor hexes tangentially around the impact
          const up = Math.abs(normal.y) > 0.95
            ? new THREE.Vector3(1, 0, 0)
            : new THREE.Vector3(0, 1, 0);
          const tangent = new THREE.Vector3().crossVectors(normal, up).normalize();
          const bitangent = new THREE.Vector3().crossVectors(normal, tangent).normalize();
          const hexStep = 0.56; // spacing between neighbor centers
          for (let n = 0; n < 6; n++) {
            const a = (n / 6) * Math.PI * 2 + Math.PI / 6;
            const offset = tangent
              .clone()
              .multiplyScalar(Math.cos(a) * hexStep)
              .addScaledVector(bitangent, Math.sin(a) * hexStep);
            const p = hit.clone().add(offset).normalize().multiplyScalar(SHIELD_R + 0.002);
            slot.neighbors[n].position.copy(p);
            slot.neighbors[n].lookAt(p.clone().multiplyScalar(10));
            slot.neighbors[n].visible = true;
            slot.neighbors[n].scale.setScalar(0.7);
            slot.neighborMats[n].opacity = 0.35;
          }

          slot.alive = true;
          slot.birth = t;
        };

        return (t) => {
          // Threats loop: idle → fly in → detonate on shield surface → idle
          threats.forEach((tr) => {
            if (tr.state === "idle" && t > tr.nextT) {
              const theta = Math.random() * Math.PI * 2;
              const phi = Math.acos(2 * Math.random() - 1);
              const from = new THREE.Vector3(
                Math.sin(phi) * Math.cos(theta),
                Math.sin(phi) * Math.sin(theta),
                Math.cos(phi),
              ).multiplyScalar(4.5);
              tr.pos.copy(from);
              tr.dir.copy(from).negate().normalize().multiplyScalar(2.6);
              tr.state = "in";
              tr.mesh.visible = true;
              tr.trail.visible = true;
            }
            if (tr.state === "in") {
              tr.pos.addScaledVector(tr.dir, 0.035);
              tr.mesh.position.copy(tr.pos);
              // Orient trail along travel direction (points from tail into head)
              const travel = tr.dir.clone().normalize();
              tr.trail.position.copy(tr.pos);
              tr.trail.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), travel.clone().negate());

              if (tr.pos.length() < SHIELD_R) {
                const hit = tr.pos.clone().normalize().multiplyScalar(SHIELD_R);
                spawnReveal(t, hit);
                tr.state = "idle";
                tr.nextT = t + 1.1 + Math.random() * 1.5;
                tr.mesh.visible = false;
                tr.trail.visible = false;
              }
            }
          });

          // Reveals: expand + fade the ring, hex fill flashes then fades,
          // neighbors briefly ripple in a staggered pattern.
          reveals.forEach((r) => {
            if (!r.alive) return;
            const age = t - r.birth;
            const life = 1.1;
            const p = age / life;

            // Ring: expands aggressively, fades fast
            const rScale = 0.6 + p * 3.2;
            r.ring.scale.setScalar(rScale);
            r.ringMat.opacity = Math.max(0, 0.95 * (1 - p));

            // Center hex fill: quick flash
            const flash = Math.max(0, 1 - age / 0.35);
            r.fillMat.opacity = 0.75 * flash;
            r.fill.scale.setScalar(0.9 + (1 - flash) * 0.3);

            // Neighbor hexes: staggered pulse
            r.neighbors.forEach((n, idx) => {
              const delay = 0.05 + idx * 0.04;
              const nAge = age - delay;
              if (nAge < 0) {
                r.neighborMats[idx].opacity = 0;
                return;
              }
              const nLife = 0.6;
              const np = Math.min(1, nAge / nLife);
              r.neighborMats[idx].opacity = 0.55 * (1 - np);
              n.scale.setScalar(0.7 + np * 0.4);
            });

            if (p >= 1) {
              r.alive = false;
              r.ring.visible = false;
              r.fill.visible = false;
              r.neighbors.forEach((n) => (n.visible = false));
            }
          });
        };
      };


      // =====================================================================
      // 5) GRC — The Audit Checklist
      // A clipboard of controls that certifies itself: each requirement line
      // draws itself in left-to-right, gets ticked, and the next one follows.
      // Once all four are signed off the list holds, then re-draws.
      //
      // Pure function of elapsed time, so the loop and the reduced-motion
      // resting frame both fall out of the same timeline: the list completes
      // at 2.4s, well before FIXED_T (3s), so the reduced-motion frame lands
      // on a fully-checked board.
      // =====================================================================
      const buildGRC = (): Step => {
        const root = new THREE.Group();
        // Designed in "icon units" (the board is 3.2 x 4.4) then scaled to fit
        // the shared 42° / z=6.2 camera framing used by all five variants.
        root.scale.setScalar(0.68);
        stage.add(root);

        // -------------------------------------------------------------------
        // DEPTH LAYERS
        // Every sticker below is built so its FRONT FACE sits at local z = 0
        // and the body extrudes BACKWARD. Callers then place the group at the
        // layer z listed here. Keeping one direction of extrusion is what
        // stops content from ending up buried inside the board slab.
        // -------------------------------------------------------------------
        const Z = {
          boardFace: 0.0,   // white paper surface — the reference plane
          content: 0.1,     // control lines + ticks sit ON the paper
          clipFace: 0.32,
        };

        // -------------------------------------------------------------------
        // PALETTE — straight off the design tokens in styles/globals.scss.
        // The hero band behind this scene is #f4f7fc, and the rest of the site
        // states its surfaces as white cards on that wash with an #e3e8ef edge.
        // This scene is that same card, extruded: PAPER is --background, the
        // extrusion walls are --line, outlines are --ink and the clip is
        // --accent — the same blue the GRC page sets its headline in.
        // Nothing here is an eyeballed off-brand tint.
        // -------------------------------------------------------------------
        const INK = 0x0f172a;        // --ink        outlines, rules, ticks
        const INK_SIDE = 0x0a0f1d;   //              their extrusion walls
        const PAPER = 0xffffff;      // --background the card face
        const PAPER_SIDE = 0xe3e8ef; // --line       the card edge, as everywhere else
        const BLUE = 0x2563eb;       // --accent     the clipboard clip
        const BLUE_SIDE = 0x1d4fd7;  // --accent-600 its extrusion walls

        // Flat, unlit, tone-mapping-exempt materials.
        //
        // The shared renderer runs ACES filmic tone mapping, which is right for
        // the four dark-background scenes but rolls this scene's highlights off
        // hard: authored #ffffff paper came out around #c9ced3, a dirty grey
        // that sank into the #f4f7fc hero instead of sitting on it. MeshBasic +
        // toneMapped:false makes every surface render as EXACTLY the token hex
        // above, so the board matches the site's card white to the byte.
        //
        // Depth then comes from the black outline offsets and darker extrusion
        // walls rather than from shading — the flat-illustration language this
        // scene was already drawn in. fog is off for the same reason it always
        // was: the shared fog is dark navy and hazes over a light-background
        // scene.
        const flat = (color: number) => {
          const m = new THREE.MeshBasicMaterial({ color, fog: false, toneMapped: false });
          disposables.push(m);
          return m;
        };

        const matInk = flat(INK);
        const matInkSide = flat(INK_SIDE);
        const matPaper = flat(PAPER);
        const matPaperSide = flat(PAPER_SIDE);
        const matClip = flat(BLUE);
        const matClipSide = flat(BLUE_SIDE);

        // Soft contact shadow — on a light background depth comes from shadow,
        // not bloom — no additive glow anywhere in this scene. Tinted with
        // --navy so the shadow reads as part of the same blue-grey family as
        // the hero wash rather than a neutral grey smudge over it.
        const shadowTex = (() => {
          const s = 128;
          const cv = document.createElement("canvas");
          cv.width = cv.height = s;
          const x = cv.getContext("2d")!;
          const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
          g.addColorStop(0, "rgba(11,42,91,0.20)");
          g.addColorStop(0.65, "rgba(11,42,91,0.07)");
          g.addColorStop(1, "rgba(11,42,91,0)");
          x.fillStyle = g;
          x.fillRect(0, 0, s, s);
          return new THREE.CanvasTexture(cv);
        })();
        const shadowMat = new THREE.SpriteMaterial({
          map: shadowTex, transparent: true, depthWrite: false, fog: false,
        });
        const contactShadow = new THREE.Sprite(shadowMat);
        contactShadow.scale.set(5.4, 5.4, 1);
        contactShadow.position.set(0.1, -0.1, -0.6);
        root.add(contactShadow);
        disposables.push(shadowTex, shadowMat);

        // -------------------------------------------------------------------
        // SHAPE BUILDERS
        // Every shape here is a simple closed polygon with no self-crossing
        // edges, and NO bevels are used anywhere — bevelling these flat
        // stickers produces self-intersecting bevel geometry that renders as
        // a melted blob.
        // -------------------------------------------------------------------
        const roundedRect = (w: number, h: number, r: number): THREE.Shape => {
          const s = new THREE.Shape();
          const x = -w / 2;
          const y = -h / 2;
          s.moveTo(x, y + r);
          s.lineTo(x, y + h - r);
          s.quadraticCurveTo(x, y + h, x + r, y + h);
          s.lineTo(x + w - r, y + h);
          s.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
          s.lineTo(x + w, y + r);
          s.quadraticCurveTo(x + w, y, x + w - r, y);
          s.lineTo(x + r, y);
          s.quadraticCurveTo(x, y, x, y + r);
          s.closePath();
          return s;
        };

        // A face/wall material pair. ExtrudeGeometry emits exactly two groups —
        // 0 for the front+back caps, 1 for the side walls — so handing it
        // [face, wall] is what gives these flat stickers their edge without any
        // lighting involved.
        type Skin = [THREE.Material, THREE.Material];
        const inkSkin: Skin = [matInk, matInkSide];

        type StickerOpts = {
          fillDepth?: number;
          outlineDepth?: number;
          outlineGap?: number;
          outlineSkin?: Skin;
        };

        /** Flat icon sticker: black outline showing behind a colored fill.
         *  Front face of the fill lands at the group's local z = 0. */
        const sticker = (
          fillShape: THREE.Shape,
          outlineShape: THREE.Shape,
          fillSkin: Skin,
          opts: StickerOpts = {},
        ): THREE.Group => {
          const fillDepth = opts.fillDepth ?? 0.22;
          const outlineDepth = opts.outlineDepth ?? 0.3;
          const outlineGap = opts.outlineGap ?? 0.05;
          const g = new THREE.Group();

          const fillGeo = new THREE.ExtrudeGeometry(fillShape, {
            depth: fillDepth, bevelEnabled: false, curveSegments: 16,
          });
          fillGeo.translate(0, 0, -fillDepth); // front face -> local 0
          g.add(new THREE.Mesh(fillGeo, fillSkin));

          const outGeo = new THREE.ExtrudeGeometry(outlineShape, {
            depth: outlineDepth, bevelEnabled: false, curveSegments: 16,
          });
          outGeo.translate(0, 0, -outlineDepth - outlineGap);
          g.add(new THREE.Mesh(outGeo, opts.outlineSkin ?? inkSkin));

          disposables.push(fillGeo, outGeo);
          return g;
        };

        /** Tick from two precisely-joined boxes. Angles and lengths come from
         *  real endpoints, and each stroke overshoots slightly so the elbow
         *  never shows a seam. Front face at the group's local z = 0. */
        const tick = (mat: THREE.Material, scale = 1): THREE.Group => {
          const g = new THREE.Group();
          const thickness = 0.14 * scale;
          const depth = 0.15;
          const L = { x: -0.3 * scale, y: 0.02 * scale };
          const V = { x: -0.05 * scale, y: -0.22 * scale };
          const R = { x: 0.34 * scale, y: 0.28 * scale };
          const EXT = 0.1 * scale;

          const stroke = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const geo = new THREE.BoxGeometry(Math.hypot(dx, dy) + EXT, thickness, depth);
            disposables.push(geo);
            const m = new THREE.Mesh(geo, mat);
            m.position.set((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, -depth / 2);
            m.rotation.z = Math.atan2(dy, dx);
            return m;
          };

          g.add(stroke(L, V), stroke(V, R));
          return g;
        };

        // -------------------------------------------------------------------
        // BUILD
        // -------------------------------------------------------------------
        const board = sticker(
          roundedRect(3.2, 4.4, 0.26),
          roundedRect(3.37, 4.57, 0.345),
          [matPaper, matPaperSide],
          { fillDepth: 0.24, outlineDepth: 0.34 },
        );
        board.position.set(0, 0.28, Z.boardFace);
        root.add(board);

        const clipBase = sticker(
          roundedRect(1.08, 0.5, 0.13),
          roundedRect(1.26, 0.68, 0.21),
          [matClip, matClipSide],
          { fillDepth: 0.2, outlineDepth: 0.26 },
        );
        clipBase.position.set(0, 2.48, Z.clipFace);
        root.add(clipBase);

        const clipNub = sticker(
          roundedRect(0.44, 0.34, 0.1),
          roundedRect(0.62, 0.52, 0.18),
          [matClip, matClipSide],
          { fillDepth: 0.2, outlineDepth: 0.26 },
        );
        clipNub.position.set(0, 2.76, Z.clipFace + 0.02);
        root.add(clipNub);

        // Static header rules at the top of the page
        const headerBar = (w: number, x: number, y: number) => {
          const depth = 0.14;
          const geo = new THREE.BoxGeometry(w, 0.155, depth);
          disposables.push(geo);
          const m = new THREE.Mesh(geo, matInk);
          m.position.set(x, y, Z.content - depth / 2);
          return m;
        };
        root.add(headerBar(1.5, -0.02, 1.78));
        root.add(headerBar(1.94, 0.06, 1.44));

        // Animated control rows.
        // These four numbers are solved together, not eyeballed: with the tick at
        // scale 0.9 its bounding box is 0.73 wide, which leaves the 0.98 of paper
        // between the left edge (-1.60) and the line's left end (-0.62) split into
        // equal 0.125 margins either side of the tick.
        const ROW_Y = [0.8, 0.18, -0.44, -1.06];
        const TICK_SCALE = 0.9;
        const TICK_X = -1.128;
        const BAR_X1 = 1.18; // right edge — lines are anchored here and grow LEFT
        const BAR_W = 1.8;
        const BAR_DEPTH = 0.14;

        type Row = { pivot: THREE.Group; mark: THREE.Group };
        const rows: Row[] = ROW_Y.map((y) => {
          // Right-anchored pivot: scaling x draws the line leftward, so its
          // growing end travels toward the tick and lands right beside it.
          const pivot = new THREE.Group();
          pivot.position.set(BAR_X1, y, Z.content - BAR_DEPTH / 2);
          pivot.scale.x = 0.001;
          const geo = new THREE.BoxGeometry(BAR_W, 0.165, BAR_DEPTH);
          disposables.push(geo);
          const bar = new THREE.Mesh(geo, matInk);
          bar.position.x = -BAR_W / 2;
          pivot.add(bar);
          root.add(pivot);

          const mark = tick(matInk, TICK_SCALE);
          mark.position.set(TICK_X, y, Z.content);
          mark.scale.setScalar(0.001);
          mark.visible = false;
          root.add(mark);

          return { pivot, mark };
        });

        // -------------------------------------------------------------------
        // TIMELINE
        // -------------------------------------------------------------------
        const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
        const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
        const easeOutBack = (x: number) => {
          const c1 = 1.70158;
          const c3 = c1 + 1;
          return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        };

        const LINE_DUR = 0.32;
        const PAUSE = 0.06;
        const MARK_DUR = 0.16;
        const ITEM = LINE_DUR + PAUSE + MARK_DUR + PAUSE; // 0.60
        const DONE_AT = ROW_Y.length * ITEM;              // 2.40 — before FIXED_T
        const CYCLE = DONE_AT + 3.0;                      // 5.40

        return (t) => {
          root.rotation.y = Math.sin(t * 0.25) * 0.06;

          const cp = t % CYCLE;

          for (let i = 0; i < rows.length; i++) {
            const start = i * ITEM;

            const lineP = clamp01((cp - start) / LINE_DUR);
            rows[i].pivot.visible = lineP > 0;
            rows[i].pivot.scale.x = Math.max(0.001, easeOutCubic(lineP));

            const markP = clamp01((cp - (start + LINE_DUR + PAUSE)) / MARK_DUR);
            rows[i].mark.visible = markP > 0;
            rows[i].mark.scale.setScalar(Math.max(0.001, easeOutBack(markP)));
          }
        };
      };
      // =====================================================================
      // 6) ASSET — The Living Constellation
      // 9 asset categories as 9 inclined orbital shells (an atom-model read),
      // each holding a small cluster of nodes that keep orbiting forever —
      // never settling into a static graph. Every few seconds a new bright
      // particle streaks in from far away and joins a shell, dramatizing
      // continuous asset discovery rather than a one-time inventory sweep.
      // =====================================================================
      const buildAsset = (): Step => {
        const categories = [
          0x1e3a8a, 0x2563eb, 0x8bb4ff, 0x1e3a8a, 0x2563eb, 0x8bb4ff,
        ];

        // --- Asset icon textures — simple line icons drawn once on canvas,
        // then tinted per node via the sprite material color. Assigned
        // randomly per node (not per category), so each shell shows a mix
        // of device types rather than one icon repeated.
        function iconTex(draw: (x: CanvasRenderingContext2D, s: number) => void) {
          const s = 64;
          const cv = document.createElement("canvas");
          cv.width = cv.height = s;
          const x = cv.getContext("2d")!;
          x.strokeStyle = "#ffffff";
          x.fillStyle = "#ffffff";
          x.lineWidth = 4;
          x.lineJoin = "round";
          x.lineCap = "round";
          draw(x, s);
          return new THREE.CanvasTexture(cv);
        }
        const ICONS: Array<(x: CanvasRenderingContext2D, s: number) => void> = [
          // PC / monitor
          (x, s) => {
            x.strokeRect(s * 0.14, s * 0.16, s * 0.72, s * 0.5);
            x.beginPath();
            x.moveTo(s * 0.5, s * 0.66);
            x.lineTo(s * 0.5, s * 0.78);
            x.moveTo(s * 0.32, s * 0.86);
            x.lineTo(s * 0.68, s * 0.86);
            x.stroke();
          },
          // Laptop
          (x, s) => {
            x.strokeRect(s * 0.22, s * 0.16, s * 0.56, s * 0.42);
            x.beginPath();
            x.moveTo(s * 0.1, s * 0.82);
            x.lineTo(s * 0.9, s * 0.82);
            x.stroke();
          },
          // Router
          (x, s) => {
            x.strokeRect(s * 0.16, s * 0.5, s * 0.68, s * 0.28);
            x.beginPath();
            x.moveTo(s * 0.36, s * 0.5);
            x.lineTo(s * 0.28, s * 0.2);
            x.moveTo(s * 0.64, s * 0.5);
            x.lineTo(s * 0.72, s * 0.2);
            x.moveTo(s * 0.3, s * 0.64);
            x.lineTo(s * 0.36, s * 0.64);
            x.moveTo(s * 0.46, s * 0.64);
            x.lineTo(s * 0.52, s * 0.64);
            x.moveTo(s * 0.62, s * 0.64);
            x.lineTo(s * 0.68, s * 0.64);
            x.stroke();
          },
          // Switch
          (x, s) => {
            x.strokeRect(s * 0.14, s * 0.36, s * 0.72, s * 0.3);
            for (let i = 0; i < 6; i++) {
              const px = s * 0.22 + i * s * 0.1;
              x.beginPath();
              x.moveTo(px, s * 0.42);
              x.lineTo(px, s * 0.6);
              x.stroke();
            }
          },
          // Server rack
          (x, s) => {
            x.strokeRect(s * 0.2, s * 0.14, s * 0.6, s * 0.2);
            x.strokeRect(s * 0.2, s * 0.4, s * 0.6, s * 0.2);
            x.strokeRect(s * 0.2, s * 0.66, s * 0.6, s * 0.2);
            x.beginPath();
            x.arc(s * 0.3, s * 0.24, s * 0.02, 0, Math.PI * 2);
            x.arc(s * 0.3, s * 0.5, s * 0.02, 0, Math.PI * 2);
            x.arc(s * 0.3, s * 0.76, s * 0.02, 0, Math.PI * 2);
            x.fill();
          },
          // Mobile
          (x, s) => {
            x.strokeRect(s * 0.32, s * 0.12, s * 0.36, s * 0.76);
            x.beginPath();
            x.arc(s * 0.5, s * 0.78, s * 0.03, 0, Math.PI * 2);
            x.fill();
          },
          // Firewall / shield
          (x, s) => {
            x.beginPath();
            x.moveTo(s * 0.5, s * 0.12);
            x.lineTo(s * 0.82, s * 0.24);
            x.lineTo(s * 0.82, s * 0.5);
            x.quadraticCurveTo(s * 0.82, s * 0.78, s * 0.5, s * 0.9);
            x.quadraticCurveTo(s * 0.18, s * 0.78, s * 0.18, s * 0.5);
            x.lineTo(s * 0.18, s * 0.24);
            x.closePath();
            x.stroke();
          },
          // Database
          (x, s) => {
            x.beginPath();
            x.ellipse(s * 0.5, s * 0.24, s * 0.32, s * 0.1, 0, 0, Math.PI * 2);
            x.stroke();
            x.beginPath();
            x.moveTo(s * 0.18, s * 0.24);
            x.lineTo(s * 0.18, s * 0.72);
            x.moveTo(s * 0.82, s * 0.24);
            x.lineTo(s * 0.82, s * 0.72);
            x.stroke();
            x.beginPath();
            x.ellipse(s * 0.5, s * 0.72, s * 0.32, s * 0.1, 0, 0, Math.PI);
            x.stroke();
          },
          // Cloud
          (x, s) => {
            x.beginPath();
            x.arc(s * 0.36, s * 0.56, s * 0.18, 0, Math.PI * 2);
            x.arc(s * 0.56, s * 0.44, s * 0.22, 0, Math.PI * 2);
            x.arc(s * 0.74, s * 0.56, s * 0.16, 0, Math.PI * 2);
            x.fill();
          },
        ];
        const iconTextures = ICONS.map((draw) => iconTex(draw));
        iconTextures.forEach((tex) => disposables.push(tex));

        type Shell = {
          group: THREE.Group;
          speed: number;
          nodeAngles: number[];
          nodeRadii: number[];
          nodes: THREE.Sprite[];
          color: THREE.Color;
        };
        const shells: Shell[] = [];
        const perShellNodes = 6;

        categories.forEach((hex, i) => {
          const group = new THREE.Group();
          // Distinct, fixed orbital plane per category — like electron shells
          group.rotation.x = (i * 0.71) % Math.PI;
          group.rotation.z = (i * 1.13) % Math.PI;
          stage.add(group);

          const radius = 1.1 + (i % 3) * 0.35;
          const color = new THREE.Color(hex);

          // Faint ring showing the orbital plane
          const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
          const ringGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64));
          const ringMat = new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.18 });
          group.add(new THREE.LineLoop(ringGeo, ringMat));
          disposables.push(ringGeo, ringMat);

          // Nodes on this shell — each a randomly chosen asset icon (PC,
          // router, switch, server, ...), tinted to the shell's category
          // color. Sprites always face the camera, so icons stay readable
          // as the shell orbits.
          const nodeAngles: number[] = [];
          const nodeRadii: number[] = [];
          const nodes: THREE.Sprite[] = [];
          for (let n = 0; n < perShellNodes; n++) {
            nodeAngles.push((n / perShellNodes) * Math.PI * 2 + Math.random() * 0.3);
            nodeRadii.push(radius + (Math.random() - 0.5) * 0.08);

            const tex = iconTextures[Math.floor(Math.random() * iconTextures.length)];
            const nodeMat = new THREE.SpriteMaterial({
              map: tex,
              color: hex,
              transparent: true,
              depthWrite: false,
            });
            const sprite = new THREE.Sprite(nodeMat);
            sprite.scale.set(0.22, 0.22, 1);
            group.add(sprite);
            nodes.push(sprite);
            disposables.push(nodeMat);
          }

          shells.push({ group, speed: 0.15 + (i % 4) * 0.06, nodeAngles, nodeRadii, nodes, color });
        });

        // --- Occasional "new asset discovered" arrivals ---
        type Arrival = {
          mesh: THREE.Mesh;
          mat: THREE.MeshBasicMaterial;
          from: THREE.Vector3;
          to: THREE.Vector3;
          start: number;
          life: number;
          active: boolean;
        };
        const arrivalPool: Arrival[] = [];
        const arrivalGeo = new THREE.SphereGeometry(0.06, 12, 12);
        for (let i = 0; i < 6; i++) {
          const mat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          const mesh = new THREE.Mesh(arrivalGeo, mat);
          mesh.visible = false;
          stage.add(mesh);
          arrivalPool.push({ mesh, mat, from: new THREE.Vector3(), to: new THREE.Vector3(), start: 0, life: 1.4, active: false });
          disposables.push(mat);
        }
        disposables.push(arrivalGeo);
        let nextArrival = 1.5;

        return (t) => {
          shells.forEach((s) => {
            s.group.rotation.y = t * s.speed;
            for (let n = 0; n < perShellNodes; n++) {
              const ang = s.nodeAngles[n] + t * (0.25 + (n % 3) * 0.05);
              const r = s.nodeRadii[n];
              const bob = 1 + Math.sin(t * 2 + n) * 0.15;
              s.nodes[n].position.set(Math.cos(ang) * r, Math.sin(ang) * r, 0);
              s.nodes[n].scale.set(0.22 * bob, 0.22 * bob, 1);
            }
          });

          // Spawn a new arrival periodically
          if (t > nextArrival) {
            const slot = arrivalPool.find((a) => !a.active);
            if (slot) {
              const targetShell = shells[Math.floor(Math.random() * shells.length)];
              const ang = Math.random() * Math.PI * 2;
              const localTarget = new THREE.Vector3(
                Math.cos(ang) * (1.1 + Math.random() * 0.8),
                Math.sin(ang) * (1.1 + Math.random() * 0.8),
                0,
              );
              slot.to.copy(localTarget).applyEuler(targetShell.group.rotation);
              slot.from.copy(slot.to).normalize().multiplyScalar(6 + Math.random() * 2);
              slot.mat.color.copy(targetShell.color);
              slot.start = t;
              slot.active = true;
              slot.mesh.visible = true;
            }
            nextArrival = t + 1.4 + Math.random() * 1.6;
          }

          arrivalPool.forEach((a) => {
            if (!a.active) return;
            const age = t - a.start;
            const p = THREE.MathUtils.clamp(age / a.life, 0, 1);
            a.mesh.position.lerpVectors(a.from, a.to, 1 - Math.pow(1 - p, 3));
            a.mat.opacity = p < 0.85 ? 0.95 : 0.95 * (1 - (p - 0.85) / 0.15);
            if (p >= 1) {
              a.active = false;
              a.mesh.visible = false;
            }
          });

          stage.rotation.y = Math.sin(t * 0.06) * 0.15;
        };
      };

      const builders: Record<Hero3DVariant, () => Step> = {
        platform: buildPlatform,
        offensive: buildOffensive,
        defensive: buildDefensive,
        grc: buildGRC,
        asset: buildAsset,
      };
      const step = builders[variant]();

      // ---------- Cursor parallax ----------
      const target = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.4;
        target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
      };
      mount.addEventListener("pointermove", onPointer);

      // ---------- Render loop ----------
      let last = performance.now();
      const start = last;
      let raf = 0;
      // Reduced motion: never advance simulated time. Instead of freezing
      // mid-animation at an arbitrary point, step the scene forward once to
      // a fixed, hand-picked "resting" instant (t = 3s) that lands each of
      // the 5 variants in a visually settled state — e.g. the Offensive
      // vault sealed (its 4.2s cycle is 70% sweep / 30% pause, and 3s falls
      // in the pause window), GRC with all four controls drawn and ticked
      // (its list completes at 2.4s and then holds), and Asset's shells
      // fully formed on their orbits. Subsequent frames
      // re-render that same frame without calling step again, so nothing
      // keeps animating.
      const FIXED_T = 3;
      let steppedOnce = false;
      const tick = () => {
        const now = performance.now();
        const t = prefersReduced ? FIXED_T : (now - start) / 1000;
        const dt = prefersReduced ? 0 : (now - last) / 1000;
        last = now;
        if (!prefersReduced || !steppedOnce) {
          step(t, dt);
          steppedOnce = true;
        }
        camera.position.x += (target.x * 0.9 - camera.position.x) * 0.05;
        camera.position.y += (0.4 + -target.y * 0.7 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
        bgField.rotation.y = prefersReduced ? 0 : t * 0.02;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      tick();

      const onResize = () => {
        if (!mount) return;
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        mount.removeEventListener("pointermove", onPointer);
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [variant, inView]);

  return (
    <div
      ref={mountRef}
      className={className}
      aria-hidden
      style={{ position: "absolute", inset: 0 }}
    />
  );
}