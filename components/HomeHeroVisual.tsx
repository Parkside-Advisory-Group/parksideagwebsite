"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface WorkflowCard {
  mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;
  start: THREE.Vector3;
  end: THREE.Vector3;
  startRotation: THREE.Euler;
  endRotation: THREE.Euler;
}

interface StatusNode {
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  end: THREE.Vector3;
}

const cardLabels = ["Capture", "Route", "Follow up", "Report"];

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - value, 3);
}

function createCardMaterial(color: string, opacity = 1): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: 0.18,
    opacity,
    roughness: 0.62,
    transparent: opacity < 1
  });
}

export function HomeHeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const shell = shellRef.current;
    if (!canvas || !shell) {
      return undefined;
    }
    const shellElement = shell;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 1.6, 8.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      preserveDrawingBuffer: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const group = new THREE.Group();
    group.rotation.x = -0.1;
    scene.add(group);

    scene.add(new THREE.AmbientLight(0xf6f1e8, 0.68));
    const keyLight = new THREE.DirectionalLight(0xf6f1e8, 1.6);
    keyLight.position.set(3.2, 5.2, 4.6);
    scene.add(keyLight);
    const goldLight = new THREE.PointLight(0xc9a765, 1.8, 10);
    goldLight.position.set(-3.4, 1.6, 3.2);
    scene.add(goldLight);

    const baseMaterial = createCardMaterial("#f6f1e8", 0.92);
    const burgundyMaterial = createCardMaterial("#7a1f2b", 0.9);
    const goldMaterial = createCardMaterial("#b08a3e", 0.95);
    const laneMaterial = createCardMaterial("#f6f1e8", 0.16);
    const nodeMaterial = createCardMaterial("#c9a765", 1);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#c9a765",
      opacity: 0,
      transparent: true
    });

    const laneGeometry = new THREE.BoxGeometry(5.15, 0.035, 0.96);
    const lanePositions = [-0.9, 0, 0.9];
    const lanes = lanePositions.map((yPosition, index) => {
      const lane = new THREE.Mesh(laneGeometry, laneMaterial.clone());
      lane.position.set(0.2, yPosition, -0.24 * index);
      lane.rotation.x = -0.52;
      lane.visible = !reducedMotion;
      group.add(lane);
      return lane;
    });

    const cardGeometry = new THREE.BoxGeometry(1.58, 0.84, 0.11);
    const cards: WorkflowCard[] = [
      {
        mesh: new THREE.Mesh(cardGeometry, baseMaterial.clone()),
        start: new THREE.Vector3(-2.1, 0.94, 0.22),
        end: new THREE.Vector3(-2.04, 0.74, 0.12),
        startRotation: new THREE.Euler(0.02, -0.02, -0.18),
        endRotation: new THREE.Euler(-0.5, 0.04, 0)
      },
      {
        mesh: new THREE.Mesh(cardGeometry, burgundyMaterial.clone()),
        start: new THREE.Vector3(0.12, 1.34, -0.04),
        end: new THREE.Vector3(-0.68, 0, 0.06),
        startRotation: new THREE.Euler(-0.04, 0.05, 0.16),
        endRotation: new THREE.Euler(-0.5, 0.04, 0)
      },
      {
        mesh: new THREE.Mesh(cardGeometry, baseMaterial.clone()),
        start: new THREE.Vector3(1.88, 0.58, 0.26),
        end: new THREE.Vector3(0.72, -0.74, 0),
        startRotation: new THREE.Euler(0.04, -0.04, -0.12),
        endRotation: new THREE.Euler(-0.5, 0.04, 0)
      },
      {
        mesh: new THREE.Mesh(cardGeometry, goldMaterial.clone()),
        start: new THREE.Vector3(-0.54, -0.7, 0.16),
        end: new THREE.Vector3(2.08, 0, -0.08),
        startRotation: new THREE.Euler(0.02, 0.02, 0.22),
        endRotation: new THREE.Euler(-0.5, 0.04, 0)
      }
    ];

    cards.forEach((card) => {
      card.mesh.position.copy(reducedMotion ? card.end : card.start);
      card.mesh.rotation.copy(reducedMotion ? card.endRotation : card.startRotation);
      group.add(card.mesh);
    });

    const nodeGeometry = new THREE.SphereGeometry(0.08, 24, 16);
    const nodes: StatusNode[] = [
      { mesh: new THREE.Mesh(nodeGeometry, nodeMaterial.clone()), end: new THREE.Vector3(-2.84, 0.74, 0.28) },
      { mesh: new THREE.Mesh(nodeGeometry, nodeMaterial.clone()), end: new THREE.Vector3(-1.48, 0, 0.2) },
      { mesh: new THREE.Mesh(nodeGeometry, nodeMaterial.clone()), end: new THREE.Vector3(0.02, -0.74, 0.12) },
      { mesh: new THREE.Mesh(nodeGeometry, nodeMaterial.clone()), end: new THREE.Vector3(1.36, 0, 0.04) },
      { mesh: new THREE.Mesh(nodeGeometry, nodeMaterial.clone()), end: new THREE.Vector3(2.84, 0.72, -0.06) }
    ];

    nodes.forEach((node) => {
      node.mesh.position.copy(node.end);
      node.mesh.scale.setScalar(reducedMotion ? 1 : 0.001);
      group.add(node.mesh);
    });

    const linePoints = [
      -2.76, 0.74, 0.22, -1.48, 0, 0.16,
      -1.34, 0, 0.16, 0.02, -0.74, 0.1,
      0.16, -0.74, 0.1, 1.34, 0, 0.02,
      1.5, 0, 0.02, 2.76, 0.72, -0.08
    ];
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePoints, 3));
    const connectors = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(connectors);

    const pointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };
    let scrollProgress = reducedMotion ? 1 : 0;
    let animationFrame = 0;

    function resizeRenderer(): void {
      const { width, height } = shellElement.getBoundingClientRect();
      const safeWidth = Math.max(1, width);
      const safeHeight = Math.max(1, height);
      renderer.setSize(safeWidth, safeHeight, false);
      camera.aspect = safeWidth / safeHeight;
      camera.updateProjectionMatrix();
    }

    function updateProgress(): void {
      if (reducedMotion) {
        scrollProgress = 1;
        shellElement.dataset.sceneProgress = "1";
        return;
      }
      const viewportHeight = window.innerHeight || 1;
      scrollProgress = clamp(window.scrollY / (viewportHeight * 0.58), 0, 1);
      shellElement.dataset.sceneProgress = scrollProgress.toFixed(3);
    }

    function handlePointerMove(event: PointerEvent): void {
      if (reducedMotion) {
        return;
      }
      const bounds = shellElement.getBoundingClientRect();
      pointer.x = clamp((event.clientX - bounds.left) / bounds.width - 0.5, -0.5, 0.5);
      pointer.y = clamp((event.clientY - bounds.top) / bounds.height - 0.5, -0.5, 0.5);
    }

    function handlePointerLeave(): void {
      pointer.x = 0;
      pointer.y = 0;
    }

    function animate(): void {
      updateProgress();
      const easedProgress = easeOutCubic(scrollProgress);
      currentPointer.x = lerp(currentPointer.x, pointer.x, 0.07);
      currentPointer.y = lerp(currentPointer.y, pointer.y, 0.07);

      group.rotation.x = lerp(-0.08, -0.24, easedProgress) + currentPointer.y * 0.08;
      group.rotation.y = lerp(-0.08, 0.22, easedProgress) + currentPointer.x * 0.12;
      group.rotation.z = lerp(0.02, -0.04, easedProgress);
      group.position.y = lerp(-0.02, 0.18, easedProgress);

      cards.forEach((card) => {
        card.mesh.position.lerpVectors(card.start, card.end, easedProgress);
        card.mesh.rotation.x = lerp(card.startRotation.x, card.endRotation.x, easedProgress);
        card.mesh.rotation.y = lerp(card.startRotation.y, card.endRotation.y, easedProgress);
        card.mesh.rotation.z = lerp(card.startRotation.z, card.endRotation.z, easedProgress);
      });

      lanes.forEach((lane, index) => {
        lane.visible = easedProgress > 0.06;
        lane.scale.x = lerp(0.38, 1, easedProgress);
        lane.scale.z = lerp(0.5, 1, easedProgress);
        lane.material.opacity = lerp(0, 0.18 - index * 0.02, easedProgress);
      });

      nodes.forEach((node) => {
        node.mesh.scale.setScalar(lerp(0.001, 1, easedProgress));
      });

      lineMaterial.opacity = lerp(0, 0.72, easedProgress);
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(() => resizeRenderer());
    resizeObserver.observe(shellElement);
    resizeRenderer();
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    shellElement.addEventListener("pointermove", handlePointerMove);
    shellElement.addEventListener("pointerleave", handlePointerLeave);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateProgress);
      shellElement.removeEventListener("pointermove", handlePointerMove);
      shellElement.removeEventListener("pointerleave", handlePointerLeave);
      resizeObserver.disconnect();
      cardGeometry.dispose();
      laneGeometry.dispose();
      nodeGeometry.dispose();
      lineGeometry.dispose();
      baseMaterial.dispose();
      burgundyMaterial.dispose();
      goldMaterial.dispose();
      laneMaterial.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
      cards.forEach((card) => card.mesh.material.dispose());
      lanes.forEach((lane) => lane.material.dispose());
      nodes.forEach((node) => node.mesh.material.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="home-hero-visual" ref={shellRef} aria-label="Scattered workflow cards becoming a clear operating system" role="img">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="home-hero-visual-labels" aria-hidden="true">
        {cardLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
