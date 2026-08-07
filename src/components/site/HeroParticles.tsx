"use client";

import { useEffect, useRef } from "react";
// Type-only: the library itself is loaded through the dynamic import in the
// effect below, so it stays out of the home page's initial JS bundle. A static
// `import * as THREE` here put the whole of three.js in the first-load chunk of
// the site's highest-traffic page, for a decorative background — Hero3D already
// imports it dynamically, and now both share the same lazy chunk.
import type * as THREE from "three";

// Eagle-eye mark embedded so the component needs no external asset.
const MARK_SRC =
  "data:image/png;base64,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";

/**
 * Ambient particle background for the home hero.
 * Renders the WhiteHawk eagle-eye mark out of drifting particles,
 * biased to the right so hero copy stays readable on the left.
 * Drop behind your hero content: <HeroParticles className="absolute inset-0 -z-10" />
 */
export function HeroParticles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
    const THREE = await import("three");
    if (disposed) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    group.position.set(2.6, 0, 0); // bias mark to the right
    scene.add(group);

    function glowTex() {
      const s = 64;
      const cv = document.createElement("canvas");
      cv.width = cv.height = s;
      const x = cv.getContext("2d")!;
      const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(cv);
    }

    let geom: THREE.BufferGeometry | null = null;
    let target: number[][] = [];
    let cloud: number[][] = [];
    let N = 0;
    let raf = 0;

    function resize() {
      const w = canvas!.clientWidth || canvas!.offsetWidth || 1;
      const h = canvas!.clientHeight || canvas!.offsetHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    function build(img: HTMLImageElement) {
      const w = img.naturalWidth,
        h = img.naturalHeight;
      const cv = document.createElement("canvas");
      cv.width = w;
      cv.height = h;
      const x = cv.getContext("2d")!;
      x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, w, h).data;
      const marks: number[][] = [];
      for (let py = 0; py < h; py++)
        for (let px = 0; px < w; px++) {
          const i = (py * w + px) * 4;
          const near = d[i] > 232 && d[i + 1] > 232 && d[i + 2] > 232;
          if (d[i + 3] > 128 && !near) marks.push([px, py, d[i], d[i + 1], d[i + 2]]);
        }
      N = 3600;
      const scale = w / 6.2;
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);
      target = [];
      cloud = [];
      for (let k = 0; k < N; k++) {
        const s = marks[(Math.random() * marks.length) | 0];
        target.push([(s[0] - w / 2) / scale, -(s[1] - h / 2) / scale, (Math.random() - 0.5) * 0.35]);
        const r = 4 + Math.random() * 5,
          a = Math.random() * Math.PI * 2,
          e = Math.acos(2 * Math.random() - 1);
        cloud.push([r * Math.sin(e) * Math.cos(a), r * Math.sin(e) * Math.sin(a) * 0.6, r * Math.cos(e)]);
        pos[k * 3] = cloud[k][0];
        pos[k * 3 + 1] = cloud[k][1];
        pos[k * 3 + 2] = cloud[k][2];
        col[k * 3] = Math.min(1, (s[2] / 255) * 1.2 + 0.05);
        col[k * 3 + 1] = Math.min(1, (s[3] / 255) * 1.15 + 0.1);
        col[k * 3 + 2] = Math.min(1, (s[4] / 255) * 1.1 + 0.2);
      }
      geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geom.setAttribute("color", new THREE.BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.07,
        map: glowTex(),
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.92,
      });
      group.add(new THREE.Points(geom, mat));
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!disposed) build(img);
    };
    img.src = MARK_SRC;

    let t = 0;
    function loop() {
      raf = requestAnimationFrame(loop);
      if (geom) {
        t += prefersReduced ? 0 : 0.006;
        // stay mostly formed but breathe gently (background, not a full reveal)
        const mt = 0.9 + Math.sin(t) * 0.1;
        const P = geom.attributes.position.array as Float32Array;
        for (let k = 0; k < N; k++) {
          const c = cloud[k],
            tg = target[k],
            dr = Math.sin(t * 3 + k) * 0.03;
          P[k * 3] = c[0] + (tg[0] - c[0]) * mt + dr * (1 - mt);
          P[k * 3 + 1] = c[1] + (tg[1] - c[1]) * mt + dr * (1 - mt);
          P[k * 3 + 2] = c[2] + (tg[2] - c[2]) * mt;
        }
        geom.attributes.position.needsUpdate = true;
        group.rotation.y = Math.sin(t * 1.2) * 0.06;
      }
      renderer.render(scene, camera);
    }
    resize();
    window.addEventListener("resize", resize);
    loop();

    cleanup = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      geom?.dispose();
    };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
