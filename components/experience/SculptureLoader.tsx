"use client";

import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import type { SculptureProps } from "./Sculpture";

const Sculpture = dynamic(() => import("./Sculpture"), { ssr: false });

/** Touch screens start with the artwork; the expensive renderer is opt-in. */
export default function SculptureLoader(props: SculptureProps) {
  const [enabled, setEnabled] = useState(false);
  const [controls, setControls] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    const lightweight = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches || connection?.saveData;
    const frame = requestAnimationFrame(() => {
      if (lightweight) setControls(document.getElementById("sculpture-control"));
      setEnabled(!lightweight);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (enabled) return <Sculpture {...props} />;
  if (!controls) return null;
  return createPortal(
    <button className="sculpture-enable" onClick={() => setEnabled(true)}>
      Explore in 3D <span aria-hidden="true">↗</span>
    </button>,
    controls,
  );
}
