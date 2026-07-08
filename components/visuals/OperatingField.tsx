"use client";

import { useEffect, useRef } from "react";

/*
 * The Operating Field — Parkside's thesis rendered as physics.
 *
 * Thousands of gold particles enter in turbulent drift (scattered work) and
 * progressively resolve into laminar, ordered streamlines (the operating
 * layer). Long-exposure trails are produced by fading the framebuffer instead
 * of clearing it. The pointer introduces a vortex: touch the system and watch
 * it recover.
 *
 * Plain WebGL, zero dependencies. Honors prefers-reduced-motion by rendering
 * a single settled frame with no animation loop.
 */

const VERTEX_SHADER = `
attribute vec2 a_position;
attribute float a_kind;
attribute float a_shade;
uniform vec2 u_resolution;
uniform float u_dpr;
varying float v_kind;
varying float v_shade;
void main() {
  vec2 clip = (a_position / u_resolution) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = (a_kind > 0.5 ? 2.1 : 1.5) * u_dpr;
  v_kind = a_kind;
  v_shade = a_shade;
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
varying float v_kind;
varying float v_shade;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c);
  if (d > 0.25) discard;
  float glow = smoothstep(0.25, 0.0, d);
  vec3 gold = vec3(0.788, 0.655, 0.396);
  vec3 burgundy = vec3(0.573, 0.161, 0.196);
  vec3 color = mix(burgundy, gold, v_kind);
  gl_FragColor = vec4(color, glow * (0.20 + 0.34 * v_shade));
}
`;

const FADE_VERTEX = `
attribute vec2 a_corner;
void main() {
  gl_Position = vec4(a_corner, 0.0, 1.0);
}
`;

const FADE_FRAGMENT = `
precision mediump float;
uniform float u_fade;
void main() {
  gl_FragColor = vec4(0.0784, 0.0706, 0.0627, u_fade);
}
`;

interface FieldOptions {
  /** Particles per 10,000 css px² — density scales with canvas area. */
  density?: number;
}

function compileProgram(gl: WebGLRenderingContext, vertex: string, fragment: string): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error("WebGL program allocation failed");
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vertex],
    [gl.FRAGMENT_SHADER, fragment]
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("WebGL shader allocation failed");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) ?? "shader compile failed");
    }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "program link failed");
  }
  return program;
}

/* Cheap smooth value noise — enough turbulence for drift, far cheaper than simplex. */
function makeNoise(): (x: number, y: number) => number {
  const hash = (ix: number, iy: number) => {
    let h = ix * 374761393 + iy * 668265263;
    h = (h ^ (h >> 13)) * 1274126177;
    return ((h ^ (h >> 16)) >>> 0) / 4294967295;
  };
  return (x, y) => {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const a = hash(ix, iy);
    const b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1);
    const d = hash(ix + 1, iy + 1);
    return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
  };
}

export function OperatingField({ density = 26 }: FieldOptions) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const mountedCanvas = canvasRef.current;
    if (!mountedCanvas) return;
    const canvas: HTMLCanvasElement = mountedCanvas;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: true
    });
    if (!gl) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    let visible = true;
    let disposed = false;

    const noise = makeNoise();

    let count = 0;
    let positions: Float32Array = new Float32Array(0);
    let velocities: Float32Array = new Float32Array(0);
    let kinds: Float32Array = new Float32Array(0);
    let shades: Float32Array = new Float32Array(0);
    let attrs: Float32Array = new Float32Array(0);

    const pointer = { x: -1e5, y: -1e5, strength: 0 };

    const pointProgram = compileProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    const fadeProgram = compileProgram(gl, FADE_VERTEX, FADE_FRAGMENT);

    const positionBuffer = gl.createBuffer();
    const attrBuffer = gl.createBuffer();
    const fadeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, fadeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(pointProgram, "a_position");
    const aKind = gl.getAttribLocation(pointProgram, "a_kind");
    const aShade = gl.getAttribLocation(pointProgram, "a_shade");
    const uResolution = gl.getUniformLocation(pointProgram, "u_resolution");
    const uDpr = gl.getUniformLocation(pointProgram, "u_dpr");
    const aCorner = gl.getAttribLocation(fadeProgram, "a_corner");
    const uFade = gl.getUniformLocation(fadeProgram, "u_fade");

    function seedParticle(i: number, anywhere: boolean) {
      positions[i * 2] = anywhere ? Math.random() * width : -8 - Math.random() * 40;
      positions[i * 2 + 1] = Math.random() * height;
      velocities[i * 2] = 0;
      velocities[i * 2 + 1] = 0;
      kinds[i] = Math.random() < 0.86 ? 1 : 0;
      shades[i] = 0.25 + Math.random() * 0.75;
    }

    function rebuild() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl!.viewport(0, 0, canvas.width, canvas.height);

      count = Math.min(16000, Math.max(1200, Math.round(((width * height) / 10000) * density)));
      positions = new Float32Array(count * 2);
      velocities = new Float32Array(count * 2);
      kinds = new Float32Array(count);
      shades = new Float32Array(count);
      attrs = new Float32Array(count * 2);
      for (let i = 0; i < count; i++) {
        seedParticle(i, true);
        attrs[i * 2] = kinds[i];
        attrs[i * 2 + 1] = shades[i];
      }
      gl!.bindBuffer(gl!.ARRAY_BUFFER, attrBuffer);
      gl!.bufferData(gl!.ARRAY_BUFFER, attrs, gl!.STATIC_DRAW);

      gl!.disable(gl!.DEPTH_TEST);
      gl!.clearColor(0.0784, 0.0706, 0.0627, 1);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
    }

    /* Streamline bands the ordered flow settles into. */
    const BANDS = 7;
    function bandCenter(y: number): number {
      const band = Math.round((y / height) * (BANDS - 1));
      const spread = 0.62; // ordered bands occupy the middle of the panel
      const offset = (band / (BANDS - 1) - 0.5) * spread;
      return height * (0.5 + offset);
    }

    function step(time: number) {
      const t = time * 0.00009;
      for (let i = 0; i < count; i++) {
        const px = positions[i * 2];
        const py = positions[i * 2 + 1];
        const nx = px / width;

        // 0 → pure turbulence (left), 1 → pure laminar order (right)
        const orderRaw = (nx - 0.14) / 0.62;
        const order = orderRaw < 0 ? 0 : orderRaw > 1 ? 1 : orderRaw * orderRaw * (3 - 2 * orderRaw);

        // Turbulent component: curl-ish swirl from two noise taps
        const scale = 0.006;
        const n1 = noise(px * scale + t * 8, py * scale);
        const n2 = noise(px * scale, py * scale - t * 8);
        const angle = (n1 * 4 + n2 * 2 + t * 3) * Math.PI * 2;
        const turbulence = 0.85 + n2 * 0.9;
        let vx = Math.cos(angle) * turbulence;
        let vy = Math.sin(angle) * turbulence;

        // Laminar component: steady rightward flow pulled toward a band
        const target = bandCenter(py);
        const lamX = 1.35 + shades[i] * 0.5;
        const lamY = (target - py) * 0.012;

        vx = vx * (1 - order) + lamX * order + 0.32; // constant drift keeps flow left→right
        vy = vy * (1 - order) + lamY * order;

        // Pointer vortex — perturb, then let the system recover
        if (pointer.strength > 0.001) {
          const dx = px - pointer.x;
          const dy = py - pointer.y;
          const distSq = dx * dx + dy * dy;
          const radius = 150;
          if (distSq < radius * radius) {
            const dist = Math.sqrt(distSq) || 1;
            const falloff = (1 - dist / radius) * pointer.strength;
            vx += (-dy / dist) * falloff * 3.4 + (dx / dist) * falloff * 1.1;
            vy += (dx / dist) * falloff * 3.4 + (dy / dist) * falloff * 1.1;
          }
        }

        // Inertia
        velocities[i * 2] = velocities[i * 2] * 0.86 + vx * 0.14;
        velocities[i * 2 + 1] = velocities[i * 2 + 1] * 0.86 + vy * 0.14;
        positions[i * 2] += velocities[i * 2];
        positions[i * 2 + 1] += velocities[i * 2 + 1];

        if (positions[i * 2] > width + 12 || positions[i * 2 + 1] < -60 || positions[i * 2 + 1] > height + 60) {
          seedParticle(i, false);
        }
      }
      pointer.strength *= 0.96;
    }

    function draw() {
      // Fade pass — the long-exposure trail
      gl!.useProgram(fadeProgram);
      gl!.enable(gl!.BLEND);
      gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, fadeBuffer);
      gl!.enableVertexAttribArray(aCorner);
      gl!.vertexAttribPointer(aCorner, 2, gl!.FLOAT, false, 0, 0);
      gl!.uniform1f(uFade, 0.06);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      // Point pass — additive gold
      gl!.useProgram(pointProgram);
      gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE);
      gl!.uniform2f(uResolution, width, height);
      gl!.uniform1f(uDpr, dpr);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, positionBuffer);
      gl!.bufferData(gl!.ARRAY_BUFFER, positions, gl!.DYNAMIC_DRAW);
      gl!.enableVertexAttribArray(aPosition);
      gl!.vertexAttribPointer(aPosition, 2, gl!.FLOAT, false, 0, 0);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, attrBuffer);
      gl!.enableVertexAttribArray(aKind);
      gl!.vertexAttribPointer(aKind, 1, gl!.FLOAT, false, 8, 0);
      gl!.enableVertexAttribArray(aShade);
      gl!.vertexAttribPointer(aShade, 1, gl!.FLOAT, false, 8, 4);
      gl!.drawArrays(gl!.POINTS, 0, count);
    }

    let lastTime = performance.now();
    function frame(now: number) {
      if (disposed) return;
      if (running && visible) {
        // Fixed-ish timestep; skip catastrophic gaps after tab switches
        if (now - lastTime < 200) {
          step(now);
          draw();
        }
        lastTime = now;
      }
      raf = requestAnimationFrame(frame);
    }

    rebuild();

    if (reducedMotion) {
      // Settle the field into its resolved state and leave a single still frame.
      for (let i = 0; i < 420; i++) {
        step(i * 16.7);
        if (i > 300) draw();
      }
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.strength = 1;
    };
    const onPointerLeave = () => {
      pointer.strength = 0;
    };

    const parent = canvas.parentElement ?? canvas;
    parent.addEventListener("pointermove", onPointerMove);
    parent.addEventListener("pointerleave", onPointerLeave);

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        rebuild();
        if (reducedMotion) {
          for (let i = 0; i < 420; i++) {
            step(i * 16.7);
            if (i > 300) draw();
          }
        }
      }, 160);
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
      observer.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [density]);

  return <canvas ref={canvasRef} className="operating-field" aria-hidden="true" />;
}
