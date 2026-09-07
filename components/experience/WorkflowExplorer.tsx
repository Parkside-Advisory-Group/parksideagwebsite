"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const workflows = [
  {
    name: "Follow-up that follows through",
    category: "CUSTOMER EXPERIENCE",
    pain: "The inquiry arrives. The day gets busy. The opportunity goes quiet.",
    title: "Every inquiry. A next step.",
    description:
      "Capture the request, give it an owner, and make follow-up part of the process.",
    input: "New inquiry",
    middle: "Right person",
    output: "Next step set",
    note: "A person owns the relationship. The system keeps it moving.",
  },
  {
    name: "Reporting without the rework",
    category: "OPERATIONAL VISIBILITY",
    pain: "Another Friday. Another spreadsheet rebuilt from the same scattered sources.",
    title: "Less assembling. More understanding.",
    description:
      "Bring recurring information into one clear view, with a human check before it goes out.",
    input: "Source data",
    middle: "Clear summary",
    output: "Human review",
    note: "One dependable view of what is open, changing, or stuck.",
  },
  {
    name: "Handoffs with nothing lost",
    category: "WORKFLOW AUTOMATION",
    pain: "The work is done. But who picks it up next? And where did the context go?",
    title: "A clear owner. At every turn.",
    description:
      "Connect the steps between your people and tools, with the context the next person needs.",
    input: "Work ready",
    middle: "Context carried",
    output: "Owner notified",
    note: "The next person starts with the full picture.",
  },
  {
    name: "AI with a useful job to do",
    category: "PRACTICAL AI",
    pain: "Powerful tools. Interesting experiments. But nothing your team can rely on yet.",
    title: "Intelligence with a purpose.",
    description:
      "Put AI to work on a defined task: summarize, draft, or qualify. Keep judgment with your team.",
    input: "Real context",
    middle: "AI-assisted draft",
    output: "Team approves",
    note: "Clear boundaries. Useful output. A person in control.",
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
          Explore our capabilities <span aria-hidden="true">↗</span>
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
