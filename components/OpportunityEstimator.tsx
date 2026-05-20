"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { track } from "@vercel/analytics";

interface EstimatorState {
  teamSize: string;
  workflowType: string;
  frequency: string;
  tools: string[];
  ownership: string;
  examples: string;
  impact: string;
  urgency: string;
}

interface Option {
  label: string;
  value: string;
  score: number;
}

interface Result {
  score: number;
  band: string;
  headline: string;
  recommendation: string;
  nextStep: string;
  signals: string[];
}

const initialState: EstimatorState = {
  teamSize: "",
  workflowType: "",
  frequency: "",
  tools: [],
  ownership: "",
  examples: "",
  impact: "",
  urgency: ""
};

const teamSizeOptions: Option[] = [
  { label: "1–5", value: "1-5", score: 1 },
  { label: "6–20", value: "6-20", score: 2 },
  { label: "21–75", value: "21-75", score: 3 },
  { label: "76+", value: "76-plus", score: 3 }
];

const workflowOptions: Option[] = [
  { label: "Lead intake or missed calls", value: "lead-intake", score: 3 },
  { label: "Estimate or proposal follow-up", value: "estimate-follow-up", score: 3 },
  { label: "Customer updates", value: "customer-updates", score: 2 },
  { label: "Manual reporting", value: "manual-reporting", score: 2 },
  { label: "Internal handoffs", value: "internal-handoffs", score: 2 },
  { label: "Broad AI adoption / not sure yet", value: "broad-ai", score: 0 }
];

const frequencyOptions: Option[] = [
  { label: "Several times a day", value: "daily-multiple", score: 3 },
  { label: "Daily", value: "daily", score: 3 },
  { label: "Weekly", value: "weekly", score: 2 },
  { label: "Monthly or occasional", value: "occasional", score: 0 }
];

const toolOptions = ["Email", "Spreadsheets", "CRM", "Calendar", "Phone/text", "Project or task tool"];

const ownershipOptions: Option[] = [
  { label: "One clear owner", value: "clear-owner", score: 3 },
  { label: "Shared ownership", value: "shared-owner", score: 1 },
  { label: "No clear owner", value: "no-owner", score: 0 }
];

const examplesOptions: Option[] = [
  { label: "Yes, recent examples are available", value: "examples-ready", score: 3 },
  { label: "Some examples, but scattered", value: "examples-scattered", score: 1 },
  { label: "Not yet", value: "no-examples", score: 0 }
];

const impactOptions: Option[] = [
  { label: "Revenue, response time, or customer trust", value: "high-impact", score: 3 },
  { label: "Management visibility or team capacity", value: "medium-impact", score: 2 },
  { label: "Mostly convenience", value: "low-impact", score: 0 }
];

const urgencyOptions: Option[] = [
  { label: "This quarter", value: "this-quarter", score: 2 },
  { label: "Soon, but not urgent", value: "soon", score: 1 },
  { label: "Exploring", value: "exploring", score: 0 }
];

function getScore(options: Option[], value: string): number {
  return options.find((option) => option.value === value)?.score ?? 0;
}

function calculateResult(state: EstimatorState): Result {
  const score =
    getScore(teamSizeOptions, state.teamSize) +
    getScore(workflowOptions, state.workflowType) +
    getScore(frequencyOptions, state.frequency) +
    Math.min(state.tools.length, 3) +
    getScore(ownershipOptions, state.ownership) +
    getScore(examplesOptions, state.examples) +
    getScore(impactOptions, state.impact) +
    getScore(urgencyOptions, state.urgency);

  const signals = [
    state.workflowType === "broad-ai" ? "The request is still broad; Parkside will need to narrow it to one workflow." : "There is a named workflow to inspect.",
    state.frequency === "occasional" ? "Low repeat volume may reduce the case for automation." : "The work repeats often enough to study.",
    state.ownership === "no-owner" ? "Ownership needs to be clarified before implementation." : "There is at least some owner path to validate.",
    state.examples === "no-examples" ? "Examples should be gathered before a deeper Blueprint." : "Real examples can anchor the review.",
    state.tools.length > 0 ? `Current tools named: ${state.tools.join(", ")}.` : "Current tools still need to be named."
  ];

  if (score >= 18) {
    return {
      score,
      band: "Strong starting point",
      headline: "This looks ready for a Snapshot and likely Blueprint discussion.",
      recommendation:
        "The workflow appears repeated, visible, and important enough to inspect. Parkside should start by mapping where work stalls, then decide whether the next step is a Blueprint or a narrow build.",
      nextStep: "Request the Free Snapshot",
      signals
    };
  }

  if (score >= 12) {
    return {
      score,
      band: "Promising but needs focus",
      headline: "This could be a good Parkside fit after one round of clarification.",
      recommendation:
        "The opportunity is there, but the first review should clarify ownership, examples, current tools, or impact before scoping implementation.",
      nextStep: "Use the Snapshot to narrow it",
      signals
    };
  }

  return {
    score,
    band: "Prepare before automating",
    headline: "Do not buy another tool yet. Tighten the workflow first.",
    recommendation:
      "The current signal is too broad or too occasional for a useful build recommendation. Gather examples, name the owner, and choose one repeated workflow before moving into implementation.",
    nextStep: "Gather examples, then request the Snapshot",
    signals
  };
}

export function OpportunityEstimator() {
  const [state, setState] = useState<EstimatorState>(initialState);
  const [hasViewedResult, setHasViewedResult] = useState(false);
  const result = useMemo(() => calculateResult(state), [state]);

  function updateField<T extends keyof EstimatorState>(field: T, value: EstimatorState[T]): void {
    setState((currentState) => ({ ...currentState, [field]: value }));
  }

  function toggleTool(tool: string): void {
    setState((currentState) => ({
      ...currentState,
      tools: currentState.tools.includes(tool)
        ? currentState.tools.filter((currentTool) => currentTool !== tool)
        : [...currentState.tools, tool]
    }));
  }

  function viewResult(): void {
    setHasViewedResult(true);
    track("opportunity_estimator_result_view", {
      band: result.band,
      score: result.score,
      workflowType: state.workflowType || "unset"
    });
  }

  return (
    <div className="estimator-shell">
      <form className="estimator-form" aria-label="Parkside opportunity estimator">
        <EstimatorSection eyebrow="Business shape" title="How much repeated work is there?">
          <RadioGroup label="Team size" name="team-size" options={teamSizeOptions} value={state.teamSize} onChange={(value) => updateField("teamSize", value)} />
          <RadioGroup label="Workflow to inspect first" name="workflow-type" options={workflowOptions} value={state.workflowType} onChange={(value) => updateField("workflowType", value)} />
          <RadioGroup label="How often does this happen?" name="frequency" options={frequencyOptions} value={state.frequency} onChange={(value) => updateField("frequency", value)} />
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
          <RadioGroup label="Who owns the process today?" name="ownership" options={ownershipOptions} value={state.ownership} onChange={(value) => updateField("ownership", value)} />
          <RadioGroup label="Can you provide recent examples?" name="examples" options={examplesOptions} value={state.examples} onChange={(value) => updateField("examples", value)} />
        </EstimatorSection>

        <EstimatorSection eyebrow="Business case" title="Is the pain worth a first system?">
          <RadioGroup label="Main business impact" name="impact" options={impactOptions} value={state.impact} onChange={(value) => updateField("impact", value)} />
          <RadioGroup label="When does this matter?" name="urgency" options={urgencyOptions} value={state.urgency} onChange={(value) => updateField("urgency", value)} />
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
              <Link className="btn" href="/intake">
                {result.nextStep}
              </Link>
              <Link className="btn ghost" href="/blueprint">
                Read about the Snapshot
              </Link>
            </div>
            <p className="estimator-disclaimer">
              This is a directional self-check, not a savings guarantee, feasibility promise, or final scope.
            </p>
          </>
        ) : (
          <div className="estimator-placeholder">
            <h2>Answer the questions to get a practical next-step recommendation.</h2>
            <p>
              Parkside is looking for a repeated workflow with business impact, examples, current tools, and a human owner.
              If those pieces exist, the Snapshot has something real to inspect.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

function EstimatorSection({ eyebrow, title, children }: Readonly<{ eyebrow: string; title: string; children: React.ReactNode }>) {
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
  onChange
}: Readonly<{ label: string; name: string; options: Option[]; value: string; onChange: (value: string) => void }>) {
  return (
    <fieldset className="estimator-fieldset">
      <legend>{label}</legend>
      <div className="option-grid">
        {options.map((option) => (
          <label className="option-card" key={option.value}>
            <input checked={value === option.value} name={name} type="radio" value={option.value} onChange={() => onChange(option.value)} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
