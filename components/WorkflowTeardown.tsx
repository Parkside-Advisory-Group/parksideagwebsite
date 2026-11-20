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
      sits: "A shared inbox, a voicemail, or a text",
      accountable: "Whoever happens to see it",
      human: "Deciding whether the work is a fit",
      body: "A call, web form, or email asks for an estimate. The job type and site address live in the message. Nobody has written down who answers.",
    },
    owned: {
      sits: "One intake record",
      accountable: "A named office owner",
      human: "Deciding whether the work is a fit, before any date is promised",
      body: "The same inquiry is captured once: source, job type, site, and the question they asked. A person is named before the company promises anything.",
    },
  },
  {
    id: "estimate",
    index: "02",
    title: "Estimate goes out",
    today: {
      sits: "One person’s sent mail",
      accountable: "The person who built the number",
      human: "Price, scope, and what the company will commit to",
      body: "Someone builds the estimate and sends it from their own email. “Sent” is a status only if they remember to say so.",
    },
    owned: {
      sits: "A queue the office can see",
      accountable: "The estimator, with the record updated",
      human: "Price, scope, and what the company will commit to",
      body: "The estimate is marked sent, with the customer and the date. The rest of the office can see it without opening that person’s inbox.",
    },
  },
  {
    id: "quiet",
    index: "03",
    title: "The quiet days",
    today: {
      sits: "Nowhere. It ages in place.",
      accountable: "No one",
      human: "Noticing, which only happens by accident",
      body: "There is no follow-up date and no owner. The estimate sits until the customer calls someone else, or the office stumbles on the thread.",
    },
    owned: {
      sits: "A dated next step",
      accountable: "The named owner",
      human: "Whether this customer should hear from you, and what the note should say",
      body: "A next follow-up date is on the record. A reminder is prepared. It does not send itself.",
    },
  },
  {
    id: "reply",
    index: "04",
    title: "The reply",
    today: {
      sits: "The same thread, unread or half-read",
      accountable: "Still unclear",
      human: "Whatever someone types when they finally look",
      body: "A yes, a no, or silence all look the same until someone happens to check. The next promise is whatever that person improvises.",
    },
    owned: {
      sits: "Accepted, declined, paused, or back with the owner",
      accountable: "The owner, for anything the customer will read",
      human: "The commitment. The queue can be automatic. The company’s word cannot.",
      body: "Accepted, declined, or paused leaves the queue. An unclear reply returns to the owner. Customer-facing words stay with a person.",
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
          <p className="handoff-kicker">{mode === "today" ? "No owner, no next step" : "A person still decides"}</p>
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
