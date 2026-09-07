"use client";

import { useEffect } from "react";

/** Choreographs discrete reveals and scroll-linked composition without React frame updates. */
export function ExperienceMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".atelier-home");
    if (!root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let statementRead = false;
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-seen");
            reveal.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    root
      .querySelectorAll("[data-reveal]")
      .forEach((element) => reveal.observe(element));
    const statement = root.querySelector<HTMLElement>(".atelier-statement");
    const words = statement?.querySelectorAll<HTMLElement>(".statement-word");
    const hero = root.querySelector<HTMLElement>(".atelier-hero");
    const portal = root.querySelector<HTMLElement>(".atelier-portal");
    function paint() {
      frame = 0;
      if (!root) return;
      const reduced =
        media.matches ||
        document.documentElement.dataset.motionPaused === "true";
      root.classList.toggle("motion-enabled", !reduced);
      const heroProgress = Math.min(
        1,
        window.scrollY / (hero?.offsetHeight || window.innerHeight),
      );
      root.style.setProperty(
        "--hero-progress",
        reduced ? "0" : String(heroProgress),
      );
      if (statement && words) {
        const rect = statement.getBoundingClientRect();
        const progress =
          reduced || statementRead
            ? 1
            : Math.max(
                0,
                Math.min(
                  1,
                  (window.innerHeight * 0.9 - rect.top) /
                    (window.innerHeight * 0.6),
                ),
              );
        if (progress === 1) statementRead = true;
        words.forEach((word, index) =>
          word.style.setProperty(
            "--word-opacity",
            String(
              0.24 +
                0.76 *
                  Math.max(
                    0,
                    Math.min(1, progress * (words.length + 3) - index),
                  ),
            ),
          ),
        );
      }
      if (portal) {
        const rect = portal.getBoundingClientRect();
        const progress = Math.max(
          -1,
          Math.min(
            1,
            (rect.top + rect.height / 2 - window.innerHeight / 2) /
              window.innerHeight,
          ),
        );
        portal.style.setProperty(
          "--portal-shift",
          reduced ? "0px" : `${progress * -65}px`,
        );
      }
    }
    function requestPaint() {
      if (!frame) frame = window.requestAnimationFrame(paint);
    }
    paint();
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", requestPaint, { passive: true });
    media.addEventListener("change", requestPaint);
    document.addEventListener("parkside-motion-change", requestPaint);
    return () => {
      reveal.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", requestPaint);
      media.removeEventListener("change", requestPaint);
      document.removeEventListener("parkside-motion-change", requestPaint);
      root.classList.remove("motion-enabled");
    };
  }, []);
  return null;
}
