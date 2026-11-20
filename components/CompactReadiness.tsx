"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { track } from "@vercel/analytics";
import {
  type EstimatorOption,
  type EstimatorState,
  buildEstimatorHref,
  buildIntakeHref,
  calculateEstimatorResult,
  frequencyOptions,
  impactOptions,
  initialEstimatorState,
  ownershipOptions,
  workflowOptions,
} from "../lib/opportunity/estimator";

interface CompactQuestion {
  key: "workflowType" | "frequency" | "ownership" | "impact";
  legend: string;
  options: EstimatorOption[];
}

const questions: CompactQuestion[] = [
  {
    key: "workflowType",
    legend: "Which workflow should we look at first?",
    options: workflowOptions,
  },
  {
    key: "frequency",
    legend: "How often does it happen?",
    options: frequencyOptions,
  },
  {
    key: "ownership",
    legend: "Who owns the next step today?",
    options: ownershipOptions,
  },
  {
    key: "impact",
    legend: "What does the stall cost?",
    options: impactOptions,
  },
];

export function CompactReadiness() {
  const [state, setState] = useState<EstimatorState>(initialEstimatorState);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[step];
  const result = useMemo(() => calculateEstimatorResult(state), [state]);

  function choose(value: string): void {
    const nextState = { ...state, [question.key]: value };
    setState(nextState);
    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }
    setFinished(true);
    const scored = calculateEstimatorResult(nextState);
    track("opportunity_estimator_result_view", {
      band: scored.band,
      score: scored.score,
      workflowType: nextState.workflowType || "unset",
      location: "home_compact",
    });
  }

  function back(): void {
    if (finished) {
      setFinished(false);
      return;
    }
    setStep((current) => Math.max(0, current - 1));
  }

  return (
    <div className="readiness">
      <div className="readiness-progress" aria-hidden="true">
        {questions.map((item, index) => (
          <span key={item.key} className={index <= step || finished ? "is-on" : undefined} />
        ))}
      </div>
      {finished ? (
        <div className="readiness-result" aria-live="polite">
          <p className="readiness-band">{result.band}</p>
          <h3>{result.headline}</h3>
          <p>
            This short check leaves team size, tools, examples, and timing open, so it uses the same weights without
            calling the workflow a strong starting point on its own. Finish the full check before booking time.
          </p>
          <div className="readiness-actions">
            <Link className="btn" href={buildEstimatorHref(state)}>
              Finish the full check <span aria-hidden="true">↗</span>
            </Link>
            <Link className="btn ghost" href={buildIntakeHref(state)}>
              Get the free Snapshot <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <button className="readiness-back" type="button" onClick={back}>
            Revise an answer
          </button>
        </div>
      ) : (
        <fieldset className="readiness-question">
          <legend>
            <span>
              {step + 1} of {questions.length}
            </span>
            {question.legend}
          </legend>
          <div className="readiness-options">
            {question.options.map((option) => (
              <button key={option.value} type="button" onClick={() => choose(option.value)}>
                {option.label}
              </button>
            ))}
          </div>
          {step > 0 ? (
            <button className="readiness-back" type="button" onClick={back}>
              Back
            </button>
          ) : null}
        </fieldset>
      )}
    </div>
  );
}
