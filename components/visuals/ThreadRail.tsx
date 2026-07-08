"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/*
 * The survey rail — a fixed left-margin instrument on wide screens.
 *
 * A hairline track runs the full viewport height; a gold plotted line fills it
 * with scroll progress (the page literally draws its operating line as you
 * read). Below the line, a mono register names the section currently in view,
 * read from [data-register] attributes on the page's sections.
 */
export function ThreadRail() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const [register, setRegister] = useState<string>("");
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-register]"));
    if (sections.length === 0) return;

    const visibility = new Map<HTMLElement, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target as HTMLElement, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: HTMLElement | null = null;
        let bestRatio = 0;
        for (const [element, ratio] of visibility) {
          if (ratio > bestRatio) {
            best = element;
            bestRatio = ratio;
          }
        }
        setRegister(best?.dataset.register ?? "");
      },
      { threshold: [0, 0.2, 0.4, 0.6] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="thread-rail" ref={railRef} aria-hidden="true">
      <div className="thread-rail-track">
        <motion.div className="thread-rail-line" style={{ scaleY: progress }} />
      </div>
      <div className="thread-rail-register" data-live={register ? "true" : "false"}>
        {register}
      </div>
    </div>
  );
}
