"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

interface DiagnosticStage {
  label: string;
  status: string;
  state: "clear" | "leak";
}

// The workflow Parkside inspects, top to bottom. The follow-up stage is the
// characteristic failure point — where work is dropped between owners.
const stages: DiagnosticStage[] = [
  { label: "Lead intake", status: "Captured", state: "clear" },
  { label: "Triage", status: "Routed", state: "clear" },
  { label: "Follow-up", status: "No owner", state: "leak" },
  { label: "Owner handoff", status: "Recoverable", state: "clear" },
  { label: "Reporting", status: "Visible", state: "clear" }
];

const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

/*
 * Reduced-motion handling: the server cannot know the user's preference, so
 * the rendered tree and every `initial` prop must be identical on both sides.
 * Only transitions (a runtime concern that never reaches the HTML) vary via
 * the `custom` prop — reduced motion collapses them to duration 0.
 */
const panelVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: (reduce: boolean) => ({
    opacity: 1,
    y: 0,
    transition: reduce
      ? { duration: 0, when: "beforeChildren" }
      : { duration: 0.9, ease: EASE_CINEMATIC, when: "beforeChildren", staggerChildren: 0.14, delayChildren: 0.5 }
  })
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: 14 },
  shown: (reduce: boolean) => ({
    opacity: 1,
    x: 0,
    transition: { duration: reduce ? 0 : 0.55, ease: EASE_CINEMATIC }
  })
};

export function HomeHeroVisual() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className="home-hero-visual hhv"
      role="img"
      aria-label="Live workflow diagnostic showing five stages, with the follow-up stage flagged as the leak where work loses its owner."
      custom={reduceMotion}
      variants={panelVariants}
      initial="hidden"
      animate="shown"
    >
      <div className="hhv-panel" aria-hidden="true">
        <div className="hhv-header">
          <span className="hhv-kicker">
            {/* motion.css stills the pulse under prefers-reduced-motion */}
            <span className="hhv-dot hhv-dot-live" />
            Snapshot · Live diagnostic
          </span>
          <span className="hhv-ref">PS-01</span>
        </div>

        <p className="hhv-title">One workflow. Clear leaks. First useful system.</p>

        <div className="hhv-trace">
          <motion.span
            className="hhv-trace-line"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 1.1, ease: EASE_CINEMATIC, delay: 0.6 }}
          />
          <ul className="hhv-stages">
            {stages.map((stage) => (
              <motion.li
                key={stage.label}
                className={stage.state === "leak" ? "hhv-stage hhv-stage-leak" : "hhv-stage"}
                custom={reduceMotion}
                variants={rowVariants}
              >
                <span className="hhv-node">
                  {stage.state === "leak" ? (
                    <motion.span
                      className="hhv-node-ring"
                      initial={{ opacity: 0.7, scale: 0.7 }}
                      animate={
                        reduceMotion
                          ? { opacity: 0.7, scale: 0.7 }
                          : { opacity: [0.7, 0, 0.7], scale: [0.7, 1.9, 0.7] }
                      }
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 2.4, ease: "easeOut", repeat: Infinity, delay: 1.8 }
                      }
                    />
                  ) : null}
                </span>
                <span className="hhv-stage-body">
                  <span className="hhv-stage-label">{stage.label}</span>
                  <span className="hhv-stage-status">{stage.status}</span>
                </span>
                {stage.state === "leak" ? <span className="hhv-flag">Leak</span> : null}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="hhv-readouts">
          <div className="hhv-readout">
            <span className="hhv-readout-label">Signal</span>
            <span className="hhv-meter">
              <motion.span
                className="hhv-meter-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0.82 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 1, ease: EASE_CINEMATIC, delay: 1.6 }}
              />
            </span>
          </div>
          <div className="hhv-readout">
            <span className="hhv-readout-label">Recoverable</span>
            <span className="hhv-readout-value">High</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
