"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const workflows = [
  {
    name: "Follow-up",
    category: "CUSTOMERS",
    title: "Every inquiry. A next step.",
    description: "An owner. A next step.",
    input: "New inquiry",
    middle: "Right person",
    output: "Next step set",
    note: "A person owns the relationship.",
  },
  {
    name: "Reporting",
    category: "VISIBILITY",
    title: "Less assembling. More understanding.",
    description: "One view. A person checks it.",
    input: "Source data",
    middle: "Clear summary",
    output: "Human review",
    note: "Open, changing, or stuck.",
  },
  {
    name: "Handoffs",
    category: "HANDOFFS",
    title: "A clear owner. At every turn.",
    description: "Context moves with the work.",
    input: "Work ready",
    middle: "Context carried",
    output: "Owner notified",
    note: "The next person can start.",
  },
  {
    name: "A useful AI job",
    category: "AI",
    title: "Intelligence with a purpose.",
    description: "Draft or summarize. A person decides.",
    input: "Real context",
    middle: "A draft",
    output: "Team approves",
    note: "A person stays in control.",
  },
];

export function WorkflowExplorer() {
  const [active, setActive] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  function selectWorkflow(index: number) {
    setActive(index);
    if (window.matchMedia("(max-width: 760px)").matches) {
      const reduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.documentElement.dataset.motionPaused === "true";
      requestAnimationFrame(() =>
        detailRef.current?.scrollIntoView({
          behavior: reduced ? "instant" : "smooth",
          block: "start",
        }),
      );
    }
  }
  const workflow = workflows[active];
  return (
    <div className="workflow-explorer">
      <div className="workflow-options" aria-label="Explore a workflow">
        {workflows.map((item, index) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={active === index}
            aria-controls="workflow-detail"
            onClick={() => selectWorkflow(index)}
            className={active === index ? "is-active" : ""}
          >
            <span className="workflow-option-number">0{index + 1}</span>
            <span>{item.name}</span>
            <span className="workflow-option-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
        <Link className="atelier-text-link" href="/services">
          See the work <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div
        ref={detailRef}
        className="workflow-stage"
        id="workflow-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="workflow-detail" key={active}>
          <span className="atelier-label">{workflow.category}</span>
          <h3>{workflow.title}</h3>
          <p>{workflow.description}</p>
          <div
            className="workflow-model"
            aria-label={`${workflow.input} to ${workflow.middle} to ${workflow.output}`}
          >
            <div className="model-orbit orbit-one" />
            <div className="model-orbit orbit-two" />
            <div className="model-path" />
            <div className="model-node node-first">
              <span className="node-small">01 / CAPTURE</span>
              <strong>{workflow.input}</strong>
              <span className="node-dot" />
            </div>
            <div className="model-node node-second">
              <span className="node-small">02 / CONNECT</span>
              <strong>{workflow.middle}</strong>
              <span className="node-dot" />
            </div>
            <div className="model-node node-third">
              <span className="node-small">03 / CONTINUE</span>
              <strong>{workflow.output}</strong>
              <span className="node-dot" />
            </div>
            <span className="model-particle" aria-hidden="true" />
          </div>
          <p className="workflow-note">
            <span aria-hidden="true">↳</span> {workflow.note}
          </p>
        </div>
      </div>
    </div>
  );
}
