"use client";
import { useEffect, useState } from "react";

export function MotionToggle() {
  const [paused, setPaused] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(media.matches);
    const frame = requestAnimationFrame(() => {
      setPaused(document.documentElement.dataset.motionPaused === "true");
      update();
    });
    media.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", update);
    };
  }, []);
  return (
    <button
      type="button"
      className="atelier-motion-toggle"
      aria-pressed={paused || systemReduced}
      disabled={systemReduced}
      title={
        systemReduced
          ? "Following your device’s reduced-motion preference"
          : undefined
      }
      onClick={() => {
        const next = !paused;
        setPaused(next);
        document.documentElement.dataset.motionPaused = String(next);
        document.dispatchEvent(
          new CustomEvent("parkside-motion-change", {
            detail: { paused: next },
          }),
        );
      }}
    >
      <span aria-hidden="true">{paused || systemReduced ? "▷" : "Ⅱ"}</span>
      {systemReduced
        ? "Reduced motion"
        : paused
          ? "Motion paused"
          : "Pause motion"}
    </button>
  );
}
