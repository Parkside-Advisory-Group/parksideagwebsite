"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import { BookingLink } from "./BookingLink";
import {
  STRONG_STARTING_SCORE,
  type EstimatorOption,
  type EstimatorState,
  buildIntakeHref,
  calculateEstimatorResult,
  estimatorStateFromParams,
  estimatorStateHasAnswers,
  examplesOptions,
  frequencyOptions,
  impactOptions,
  initialEstimatorState,
  ownershipOptions,
  teamSizeOptions,
  toolOptions,
  urgencyOptions,
  workflowOptions,
} from "../lib/opportunity/estimator";

function EstimatorSection({
  eyebrow,
  title,
  children,
}: Readonly<{ eyebrow: string; title: string; children: ReactNode }>) {
  return (
    <section className="estimator-section">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <div className="estimator-section-fields">{children}</div>
    </section>
  );
}

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
}: Readonly<{
  label: string;
  name: string;
  options: EstimatorOption[];
  value: string;
  onChange: (value: string) => void;
}>) {
  return (
    <fieldset className="estimator-fieldset">
      <legend>{label}</legend>
      <div className="option-grid">
        {options.map((option) => (
          <label className="option-card" key={option.value}>
            <input
              checked={value === option.value}
              name={name}
              type="radio"
              value={option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function OpportunityEstimator() {
  const searchParams = useSearchParams();
  const carried = useMemo(() => estimatorStateFromParams(searchParams), [searchParams]);
  const [state, setState] = useState<EstimatorState>(
    estimatorStateHasAnswers(carried) ? carried : initialEstimatorState,
  );
  const [hasViewedResult, setHasViewedResult] = useState(false);
  const result = useMemo(() => calculateEstimatorResult(state), [state]);
  const carriedAnswers = estimatorStateHasAnswers(carried);

  function updateField<T extends keyof EstimatorState>(field: T, value: EstimatorState[T]): void {
    setState((currentState) => ({ ...currentState, [field]: value }));
  }

  function toggleTool(tool: string): void {
    setState((currentState) => ({
      ...currentState,
      tools: currentState.tools.includes(tool)
        ? currentState.tools.filter((currentTool) => currentTool !== tool)
        : [...currentState.tools, tool],
    }));
  }

  function viewResult(): void {
    setHasViewedResult(true);
    track("opportunity_estimator_result_view", {
      band: result.band,
      score: result.score,
      workflowType: state.workflowType || "unset",
    });
  }

  return (
    <div className="estimator-shell">
      <form className="estimator-form" aria-label="Parkside opportunity estimator">
        {carriedAnswers ? (
          <p className="estimator-carried">
            Some answers are filled in. Finish the rest.
          </p>
        ) : null}
        <EstimatorSection eyebrow="Business shape" title="How much repeated work is there?">
          <RadioGroup
            label="Team size"
            name="team-size"
            options={teamSizeOptions}
            value={state.teamSize}
            onChange={(value) => updateField("teamSize", value)}
          />
          <RadioGroup
            label="Workflow to inspect first"
            name="workflow-type"
            options={workflowOptions}
            value={state.workflowType}
            onChange={(value) => updateField("workflowType", value)}
          />
          <RadioGroup
            label="How often does this happen?"
            name="frequency"
            options={frequencyOptions}
            value={state.frequency}
            onChange={(value) => updateField("frequency", value)}
          />
        </EstimatorSection>

        <EstimatorSection eyebrow="Readiness" title="Can the workflow be mapped?">
          <fieldset className="estimator-fieldset">
            <legend>Current tools involved</legend>
            <div className="option-grid checkbox-grid">
              {toolOptions.map((tool) => (
                <label className="option-card" key={tool}>
                  <input checked={state.tools.includes(tool)} type="checkbox" onChange={() => toggleTool(tool)} />
                  <span>{tool}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <RadioGroup
            label="Who owns the process today?"
            name="ownership"
            options={ownershipOptions}
            value={state.ownership}
            onChange={(value) => updateField("ownership", value)}
          />
          <RadioGroup
            label="Can you provide recent examples?"
            name="examples"
            options={examplesOptions}
            value={state.examples}
            onChange={(value) => updateField("examples", value)}
          />
        </EstimatorSection>

        <EstimatorSection eyebrow="Business case" title="Is the pain worth a first system?">
          <RadioGroup
            label="Main business impact"
            name="impact"
            options={impactOptions}
            value={state.impact}
            onChange={(value) => updateField("impact", value)}
          />
          <RadioGroup
            label="When does this matter?"
            name="urgency"
            options={urgencyOptions}
            value={state.urgency}
            onChange={(value) => updateField("urgency", value)}
          />
        </EstimatorSection>

        <button className="btn" type="button" onClick={viewResult}>
          See the recommendation
        </button>
      </form>

      <aside className="estimator-result" aria-live="polite">
        <p className="eyebrow">Estimator Result</p>
        {hasViewedResult ? (
          <>
            <div className="estimator-score">
              <span>{result.score}</span>
              <strong>{result.band}</strong>
            </div>
            <h2>{result.headline}</h2>
            <p>{result.recommendation}</p>
            <ul>
              {result.signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
            <div className="button-row">
              <Link className="btn" href={buildIntakeHref(state)}>
                {result.nextStep}
              </Link>
              {result.score >= STRONG_STARTING_SCORE ? (
                <BookingLink className="btn ghost" />
              ) : null}
              <Link className="btn ghost" href="/blueprint">
                Read about the Snapshot
              </Link>
            </div>
            <p className="estimator-disclaimer">
              This is a directional self-check, not a savings guarantee, feasibility promise, or final scope.
              {result.score >= STRONG_STARTING_SCORE
                ? " A 20-minute conversation is optional, and only after this result."
                : ""}
            </p>
          </>
        ) : (
          <div className="estimator-placeholder">
            <h2>A few questions. A clear next step.</h2>
            <p>
              Parkside is looking for a repeated workflow with business impact, examples, current tools, and a human
              owner. If those pieces exist, the Snapshot has something real to inspect.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
