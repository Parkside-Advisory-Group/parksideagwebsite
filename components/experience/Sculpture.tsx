"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export interface SculptureProps {
  className?: string;
}

const FRAME_INTERVAL = 1000 / 45;
const RIBBON_SEGMENTS = 420;
const CAMERA_DISTANCE = 8.4;

class KnotCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }

  getPoint(position: number, target = new THREE.Vector3()) {
    const angle = position * Math.PI * 2;
    const radius = 1.52 + 0.48 * Math.cos(3 * angle);
    return target.set(
      radius * Math.cos(2 * angle),
      radius * Math.sin(2 * angle),
      0.68 * Math.sin(3 * angle),
    );
  }
}

/** Closed, beveled ribbons keep their gold edges visible from every angle. */
function createRibbon(track: number) {
  const curve = new KnotCurve();
  const frames = curve.computeFrenetFrames(RIBBON_SEGMENTS, true);
  const vertices: number[] = [];
  const indices: number[] = [];
  const width = 0.205;
  const depth = 0.021;
  const bevel = 0.009;
  const section = [
    [-width + bevel, -depth],
    [width - bevel, -depth],
    [width, -depth + bevel],
    [width, depth - bevel],
    [width - bevel, depth],
    [-width + bevel, depth],
    [-width, depth - bevel],
    [-width, -depth + bevel],
  ];

  for (let step = 0; step <= RIBBON_SEGMENTS; step += 1) {
    const position = step / RIBBON_SEGMENTS;
    const point = curve.getPointAt(position);
    const twist =
      position * Math.PI * 4 + 0.35 * Math.sin(position * Math.PI * 4);
    const normal = frames.normals[step]
      .clone()
      .multiplyScalar(Math.cos(twist))
      .addScaledVector(frames.binormals[step], Math.sin(twist));
    const binormal = frames.binormals[step]
      .clone()
      .multiplyScalar(Math.cos(twist))
      .addScaledVector(frames.normals[step], -Math.sin(twist));
    point.addScaledVector(normal, track * 0.45);

    for (const [across, thickness] of section) {
      const vertex = point
        .clone()
        .addScaledVector(normal, across)
        .addScaledVector(binormal, thickness);
      vertices.push(vertex.x, vertex.y, vertex.z);
    }
    if (step < RIBBON_SEGMENTS) {
      for (let side = 0; side < section.length; side += 1) {
        const a = step * section.length + side;
        const b = step * section.length + ((side + 1) % section.length);
        const c = b + section.length;
        const d = a + section.length;
        indices.push(a, b, d, b, c, d);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** Decorative WebGL sculpture. Its parent supplies the always-available image fallback. */
export default function Sculpture({ className }: SculptureProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      host.dataset.webglState = "unavailable";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 40);
    camera.position.z = CAMERA_DISTANCE;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio || 1,
        window.innerWidth < 768 ? 1.25 : 1.5,
      ),
    );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.cssText =
      "display:block;width:100%;height:100%;opacity:0;transition:opacity 900ms ease;pointer-events:none";
    host.appendChild(renderer.domElement);

    const environment = new RoomEnvironment();
    const environmentGenerator = new THREE.PMREMGenerator(renderer);
    let environmentTarget: THREE.WebGLRenderTarget;
    try {
      environmentTarget = environmentGenerator.fromScene(environment, 0.035);
    } catch {
      environment.dispose();
      environmentGenerator.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
      host.dataset.webglState = "unavailable";
      return;
    }
    scene.environment = environmentTarget.texture;
    environment.dispose();
    environmentGenerator.dispose();

    const sculpture = new THREE.Group();
    scene.add(sculpture);
    const materials = [-1, 0, 1].map(
      (track) =>
        new THREE.MeshPhysicalMaterial({
          color: track === 0 ? 0xc9a765 : 0xb08a3e,
          metalness: 1,
          roughness: track === 0 ? 0.21 : 0.28,
          clearcoat: 0.35,
          clearcoatRoughness: 0.2,
          envMapIntensity: 1.3,
          side: THREE.DoubleSide,
        }),
    );
    const geometries = [-1, 0, 1].map(createRibbon);
    const ribbons = geometries.map(
      (geometry, index) => new THREE.Mesh(geometry, materials[index]),
    );
    ribbons.forEach((ribbon) => sculpture.add(ribbon));

    const creamLight = new THREE.DirectionalLight(0xf6f1e8, 3.6);
    creamLight.position.set(-3, 5, 5);
    scene.add(creamLight);
    const burgundyLight = new THREE.DirectionalLight(0x7a1f2b, 2.4);
    burgundyLight.position.set(4, -2, -2);
    scene.add(burgundyLight);
    const edgeLight = new THREE.DirectionalLight(0xf6f1e8, 3);
    edgeLight.position.set(3, 2, -4);
    scene.add(edgeLight);

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reducedMotion = motionPreference.matches;
    let motionPaused = document.documentElement.dataset.motionPaused === "true";
    renderer.domElement.style.transition = reducedMotion
      ? "none"
      : "opacity 900ms ease";
    let visible = false;
    let contextAvailable = true;
    let frame = 0;
    let lastFrame = 0;
    let elapsed = 0;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let disposed = false;

    function draw() {
      if (!contextAvailable || disposed) return;
      sculpture.rotation.set(
        -0.3 + currentY * 0.16 + Math.sin(elapsed * 0.16) * 0.09,
        -0.46 + currentX * 0.23 + elapsed * 0.065 + scrollProgress * 0.35,
        -0.23 + Math.sin(elapsed * 0.12) * 0.06,
      );
      sculpture.position.y = Math.sin(elapsed * 0.5) * 0.07;
      // As the opening chapter leaves the viewport, the interwoven tracks
      // separate into three legible systems. Geometry stays unchanged.
      const opening = THREE.MathUtils.smootherstep(scrollProgress, 0.05, 0.95);
      ribbons.forEach((ribbon, index) => {
        const track = index - 1;
        ribbon.position.set(
          track * opening * 0.36,
          track * opening * 0.2,
          track * opening * 0.58,
        );
        ribbon.rotation.set(
          track * opening * 0.11,
          track * opening * 0.14,
          track * opening * -0.08,
        );
      });
      try {
        renderer.render(scene, camera);
        host!.dataset.webglState = "ready";
        renderer.domElement.style.opacity = "1";
      } catch {
        contextAvailable = false;
        host!.dataset.webglState = "unavailable";
        renderer.domElement.style.opacity = "0";
      }
    }

    function tick(time: number) {
      frame = 0;
      if (
        disposed ||
        !visible ||
        document.hidden ||
        reducedMotion ||
        motionPaused ||
        !contextAvailable
      )
        return;
      if (time - lastFrame >= FRAME_INTERVAL) {
        const delta = lastFrame ? Math.min((time - lastFrame) / 1000, 0.08) : 0;
        lastFrame = time;
        elapsed += delta;
        currentX += (pointerX - currentX) * 0.045;
        currentY += (pointerY - currentY) * 0.045;
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.065;
        draw();
      }
      frame = window.requestAnimationFrame(tick);
    }

    function synchronizeAnimation() {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
      if (visible && !document.hidden && contextAvailable) {
        if (reducedMotion || motionPaused) draw();
        else frame = window.requestAnimationFrame(tick);
      }
    }

    function resize() {
      const bounds = host!.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      camera.aspect = bounds.width / bounds.height;
      camera.position.z = CAMERA_DISTANCE * Math.max(1, 0.92 / camera.aspect);
      camera.updateProjectionMatrix();
      renderer.setSize(bounds.width, bounds.height, false);
      draw();
    }

    function pointerMove(event: PointerEvent) {
      if (
        event.pointerType === "touch" ||
        reducedMotion ||
        motionPaused ||
        !visible
      )
        return;
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    }
    function updateScroll() {
      if (reducedMotion || motionPaused || !visible) return;
      targetScrollProgress = Math.min(window.scrollY / window.innerHeight, 1);
    }
    function pauseChange(event: Event) {
      const detail = (event as CustomEvent<{ paused: boolean }>).detail;
      motionPaused =
        detail?.paused ??
        document.documentElement.dataset.motionPaused === "true";
      if (!motionPaused) updateScroll();
      synchronizeAnimation();
    }
    function motionChange() {
      reducedMotion = motionPreference.matches;
      renderer.domElement.style.transition = reducedMotion
        ? "none"
        : "opacity 900ms ease";
      if (reducedMotion) {
        elapsed = 0;
        currentX = 0;
        currentY = 0;
        scrollProgress = 0;
        targetScrollProgress = 0;
      }
      synchronizeAnimation();
    }
    function contextLost(event: Event) {
      event.preventDefault();
      contextAvailable = false;
      host!.dataset.webglState = "unavailable";
      renderer.domElement.style.opacity = "0";
      synchronizeAnimation();
    }
    function contextRestored() {
      contextAvailable = true;
      draw();
      synchronizeAnimation();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        updateScroll();
        synchronizeAnimation();
      },
      { rootMargin: "80px" },
    );
    intersectionObserver.observe(host);
    window.addEventListener("pointermove", pointerMove, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("visibilitychange", synchronizeAnimation);
    document.addEventListener("parkside-motion-change", pauseChange);
    motionPreference.addEventListener("change", motionChange);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    renderer.domElement.addEventListener(
      "webglcontextrestored",
      contextRestored,
    );
    resize();

    return () => {
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("scroll", updateScroll);
      document.removeEventListener("visibilitychange", synchronizeAnimation);
      document.removeEventListener("parkside-motion-change", pauseChange);
      motionPreference.removeEventListener("change", motionChange);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        contextRestored,
      );
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      environmentTarget.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={className}
      data-webgl-state="loading"
      aria-hidden="true"
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
