"use client";

import { useState, type KeyboardEvent } from "react";

type HandoffMode = "today" | "owned";

interface StageCopy {
  sits: string;
  accountable: string;
  human: string;
  body: string;
}

interface Stage {
  id: string;
  index: string;
  title: string;
  today: StageCopy;
  owned: StageCopy;
}

const stages: Stage[] = [
  {
    id: "inquiry",
    index: "01",
    title: "Inquiry arrives",
    today: {
      sits: "A shared inbox",
      accountable: "Whoever sees it",
      human: "Is this a fit?",
      body: "The ask arrives. Nobody owns the reply.",
    },
    owned: {
      sits: "One record",
      accountable: "A named owner",
      human: "Is this a fit?",
      body: "Captured once. A person is named.",
    },
  },
  {
    id: "estimate",
    index: "02",
    title: "Estimate goes out",
    today: {
      sits: "One sent mailbox",
      accountable: "Whoever priced it",
      human: "Price and scope",
      body: "Sent, if someone remembers to say so.",
    },
    owned: {
      sits: "A shared queue",
      accountable: "The estimator",
      human: "Price and scope",
      body: "Marked sent. The office can see it.",
    },
  },
  {
    id: "quiet",
    index: "03",
    title: "The quiet days",
    today: {
      sits: "Nowhere",
      accountable: "No one",
      human: "Noticing it",
      body: "No date. No owner. It just sits.",
    },
    owned: {
      sits: "A next step",
      accountable: "The named owner",
      human: "What the note says",
      body: "A date is set. It does not send itself.",
    },
  },
  {
    id: "reply",
    index: "04",
    title: "The reply",
    today: {
      sits: "The same thread",
      accountable: "Still unclear",
      human: "Whatever gets typed",
      body: "Yes, no, and silence look the same.",
    },
    owned: {
      sits: "A clear status",
      accountable: "The owner",
      human: "The company’s word",
      body: "A person still sends the reply.",
    },
  },
];

export function WorkflowTeardown() {
  const [mode, setMode] = useState<HandoffMode>("today");
  const [stageId, setStageId] = useState(stages[0].id);
  const stage = stages.find((item) => item.id === stageId) ?? stages[0];
  const copy = stage[mode];

  function onRailKeyDown(event: KeyboardEvent<HTMLOListElement>): void {
    const current = stages.findIndex((item) => item.id === stageId);
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = stages[(current + direction + stages.length) % stages.length];
    setStageId(next.id);
    const button = event.currentTarget.querySelector<HTMLButtonElement>(`#handoff-stage-${next.id}`);
    button?.focus();
  }

  return (
    <div className="handoff">
      <div className="handoff-switch" role="group" aria-label="How the handoff is shown">
        <button type="button" aria-pressed={mode === "today"} onClick={() => setMode("today")}>
          How it stalls today
        </button>
        <button type="button" aria-pressed={mode === "owned"} onClick={() => setMode("owned")}>
          With a named owner
        </button>
      </div>
      <ol className="handoff-rail" onKeyDown={onRailKeyDown}>
        {stages.map((item) => (
          <li key={item.id}>
            <button
              id={`handoff-stage-${item.id}`}
              type="button"
              aria-current={item.id === stage.id ? "step" : undefined}
              onClick={() => setStageId(item.id)}
            >
              <span>{item.index}</span>
              {item.title}
            </button>
          </li>
        ))}
      </ol>
      <div className="handoff-detail" key={`${mode}-${stage.id}`} aria-live="polite">
        <div>
          <p className="handoff-kicker">{mode === "today" ? "No owner" : "A named owner"}</p>
          <h3>{stage.title}</h3>
          <p>{copy.body}</p>
        </div>
        <dl>
          <div>
            <dt>Where it sits</dt>
            <dd>{copy.sits}</dd>
          </div>
          <div>
            <dt>Who is accountable</dt>
            <dd>{copy.accountable}</dd>
          </div>
          <div>
            <dt>What stays human</dt>
            <dd>{copy.human}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
