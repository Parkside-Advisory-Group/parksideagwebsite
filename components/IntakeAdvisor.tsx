"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BookingLink } from "./BookingLink";
import { contactEmail } from "../lib/content";
import { STRONG_STARTING_SCORE, readEstimatorContext } from "../lib/opportunity/estimator";

interface IntakeFormState {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  website: string;
  industry: string;
  primaryPain: string;
  frequencyOfIssue: string;
  currentProcess: string;
  peopleInvolved: string;
  toolsUsed: string;
  estimatedTimeLost: string;
  estimatedBusinessImpact: string;
  desiredOutcome: string;
  urgency: string;
  permissionToFollowUp: boolean;
}

const initialState: IntakeFormState = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  website: "",
  industry: "",
  primaryPain: "",
  frequencyOfIssue: "",
  currentProcess: "",
  peopleInvolved: "",
  toolsUsed: "",
  estimatedTimeLost: "",
  estimatedBusinessImpact: "",
  desiredOutcome: "",
  urgency: "",
  permissionToFollowUp: false,
};

type IntakePhase = "idle" | "analyzing" | "received" | "error";

interface Diagnostics {
  completeness: number;
  depth: number;
  readiness: number;
  readinessLabel: string;
  signals: string[];
}

// Fields that meaningfully describe a workflow, used to score intake completeness.
const scoredFields: (keyof IntakeFormState)[] = [
  "name",
  "email",
  "businessName",
  "industry",
  "primaryPain",
  "currentProcess",
  "frequencyOfIssue",
  "peopleInvolved",
  "toolsUsed",
  "estimatedBusinessImpact",
  "desiredOutcome",
  "urgency",
];

// Depth is a proxy for how much narrative context the operator has shared.
const DEPTH_TARGET_CHARS = 480;

const analyzingSteps = [
  "Reading the workflow",
  "Mapping the handoffs",
  "Locating the likely leak",
  "Scoring readiness",
];

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

// Presentation-only. None of this is sent to the API — the payload stays exactly formState.
function computeDiagnostics(formState: IntakeFormState): Diagnostics {
  const filled = scoredFields.filter(
    (field) => String(formState[field]).trim().length > 0,
  ).length;
  const completeness = clamp01(filled / scoredFields.length);

  const narrative =
    formState.primaryPain +
    formState.currentProcess +
    formState.estimatedBusinessImpact +
    formState.desiredOutcome;
  const depth = clamp01(narrative.trim().length / DEPTH_TARGET_CHARS);

  const readiness = clamp01(completeness * 0.55 + depth * 0.45);
  const readinessLabel =
    readiness < 0.34 ? "Early" : readiness < 0.68 ? "Forming" : "Strong";

  const signals: string[] = [];
  if (formState.primaryPain.trim().length > 40)
    signals.push("Bottleneck described");
  if (formState.currentProcess.trim().length > 40)
    signals.push("Current path traced");
  if (formState.frequencyOfIssue.trim().length > 0)
    signals.push("Recurrence noted");
  if (formState.peopleInvolved.trim().length > 0)
    signals.push("Owners identified");
  if (formState.toolsUsed.trim().length > 0) signals.push("Tooling mapped");
  if (formState.estimatedBusinessImpact.trim().length > 20)
    signals.push("Impact framed");
  if (formState.desiredOutcome.trim().length > 20)
    signals.push("Target outcome set");

  return { completeness, depth, readiness, readinessLabel, signals };
}

export function IntakeAdvisor() {
  const searchParams = useSearchParams();
  const estimatorContext = useMemo(
    () => readEstimatorContext(searchParams),
    [searchParams],
  );
  const [formState, setFormState] = useState<IntakeFormState>({
    ...initialState,
    toolsUsed: estimatorContext?.state.tools.join(", ") ?? "",
  });
  const [status, setStatus] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [phase, setPhase] = useState<IntakePhase>("idle");
  const [stepIndex, setStepIndex] = useState<number>(0);
  const reduceMotion = useReducedMotion();

  const diagnostics = useMemo(() => computeDiagnostics(formState), [formState]);

  // Cinematic "processing" micro-states while the request is in flight. Cosmetic only —
  // the fetch below drives the real result and is never delayed by this.
  useEffect(() => {
    if (phase !== "analyzing") return;
    const interval = setInterval(() => {
      setStepIndex((current) => (current + 1) % analyzingSteps.length);
    }, 900);
    return () => clearInterval(interval);
  }, [phase]);

  function updateField<T extends keyof IntakeFormState>(
    field: T,
    value: IntakeFormState[T],
  ): void {
    setFormState((currentState) => ({ ...currentState, [field]: value }));
  }

  async function submitIntake(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const source = estimatorContext ? "opportunity-estimator" : "intake";
    track("snapshot_form_submit_attempt", { source });
    setStepIndex(0);
    setPhase("analyzing");
    setStatus("Preparing the Snapshot intake...");
    setSummary("");

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          source,
          ...(estimatorContext?.state.teamSize
            ? { teamSize: estimatorContext.state.teamSize }
            : {}),
          ...(estimatorContext
            ? { growthContext: estimatorContext.summary }
            : {}),
        }),
      });
      const payload: unknown = await response.json();
      if (
        typeof payload !== "object" ||
        payload === null ||
        Array.isArray(payload)
      ) {
        throw new Error("Unexpected intake response");
      }

      if (!response.ok) {
        const errors =
          "errors" in payload && Array.isArray(payload.errors)
            ? payload.errors.filter(
                (error): error is string => typeof error === "string",
              )
            : [];
        track("snapshot_form_submit_error", {
          source,
          reason: "api_validation",
        });
        setPhase("error");
        setStatus(
          errors.join(" ") ||
            "The intake could not be submitted. Please try again.",
        );
        return;
      }

      track("snapshot_form_submit_success", { source });
      setPhase("received");
      setStatus(
        "Snapshot request received. Parkside will review the workflow and follow up with the report or next question.",
      );
      const record = "record" in payload ? payload.record : undefined;
      setSummary(
        typeof record === "object" &&
          record !== null &&
          "internal_summary" in record &&
          typeof record.internal_summary === "string"
          ? record.internal_summary
          : "",
      );
    } catch {
      track("snapshot_form_submit_error", {
        source,
        reason: "network_or_response",
      });
      setPhase("error");
      setStatus(
        `We could not confirm your request. Your answers are still here. Please try again or email ${contactEmail}.`,
      );
    }
  }

  return (
    <form
      className="intake-form"
      onSubmit={submitIntake}
      aria-label="Parkside Intake Advisor"
    >
      <IntakeDiagnostic
        diagnostics={diagnostics}
        phase={phase}
        stepLabel={analyzingSteps[stepIndex]}
        reduceMotion={Boolean(reduceMotion)}
      />

      <div className="notice">
        The free Snapshot starts with how work moves today. Do not submit
        passwords, private credentials, or confidential access details.
      </div>

      {estimatorContext ? (
        <div className="estimator-context" role="status">
          <p>From your readiness check</p>
          <p>{estimatorContext.summary}</p>
          {estimatorContext.result.score >= STRONG_STARTING_SCORE ? (
            <BookingLink className="btn ghost" />
          ) : null}
        </div>
      ) : null}

      <FormSection
        step="Step 1 of 4"
        title="Business Basics"
        description="Share who should be contacted and enough context to understand the business."
      >
        <Field id="name" label="Name" required>
          <input
            id="name"
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
          />
        </Field>
        <Field id="email" label="Email" required>
          <input
            id="email"
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
        </Field>
        <Field id="phone" label="Phone (optional)">
          <input
            id="phone"
            value={formState.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </Field>
        <Field id="business-name" label="Business name" required>
          <input
            id="business-name"
            value={formState.businessName}
            onChange={(event) =>
              updateField("businessName", event.target.value)
            }
            required
          />
        </Field>
        <Field id="website" label="Website">
          <input
            id="website"
            value={formState.website}
            onChange={(event) => updateField("website", event.target.value)}
          />
        </Field>
        <Field id="industry" label="Industry or business type" required>
          <input
            id="industry"
            value={formState.industry}
            onChange={(event) => updateField("industry", event.target.value)}
            required
          />
        </Field>
      </FormSection>

      <FormSection
        step="Step 2 of 4"
        title="Current Bottlenecks"
        description="Point to the repeated work, missed handoffs, or slow response points that need a clearer system."
      >
        <Field
          id="primary-pain"
          label="What process feels most manual, repetitive, or hard to keep up with?"
          required
          full
        >
          <textarea
            id="primary-pain"
            value={formState.primaryPain}
            onChange={(event) => updateField("primaryPain", event.target.value)}
            required
          />
        </Field>
        <Field id="frequency-of-issue" label="How often does this happen?" full>
          <input
            id="frequency-of-issue"
            value={formState.frequencyOfIssue}
            onChange={(event) =>
              updateField("frequencyOfIssue", event.target.value)
            }
            placeholder="Daily, weekly, during busy season, after every new lead..."
          />
        </Field>
        <Field
          id="current-process"
          label="How is the process handled today?"
          required
          full
        >
          <textarea
            id="current-process"
            value={formState.currentProcess}
            onChange={(event) =>
              updateField("currentProcess", event.target.value)
            }
            required
          />
        </Field>
        <Field id="people-involved" label="Who is involved?" full>
          <input
            id="people-involved"
            value={formState.peopleInvolved}
            onChange={(event) =>
              updateField("peopleInvolved", event.target.value)
            }
          />
        </Field>
      </FormSection>

      <FormSection
        step="Step 3 of 4"
        title="Systems & Tools"
        description="List the tools and rough impact so the Snapshot can separate quick wins from deeper implementation work."
      >
        <Field id="tools-used" label="What tools or systems are involved?" full>
          <input
            id="tools-used"
            value={formState.toolsUsed}
            onChange={(event) => updateField("toolsUsed", event.target.value)}
            placeholder="CRM, inbox, calendar, spreadsheets, phone system..."
          />
        </Field>
        <Field id="estimated-time-lost" label="Estimated time lost" full>
          <input
            id="estimated-time-lost"
            value={formState.estimatedTimeLost}
            onChange={(event) =>
              updateField("estimatedTimeLost", event.target.value)
            }
          />
        </Field>
        <Field
          id="estimated-business-impact"
          label="Estimated revenue, customer, delay, or follow-up impact"
          full
        >
          <textarea
            id="estimated-business-impact"
            value={formState.estimatedBusinessImpact}
            onChange={(event) =>
              updateField("estimatedBusinessImpact", event.target.value)
            }
          />
        </Field>
      </FormSection>

      <FormSection
        step="Step 4 of 4"
        title="Desired Outcomes"
        description="Describe what should be more repeatable after the Snapshot and how soon the issue matters."
      >
        <Field
          id="desired-outcome"
          label="What would a better outcome look like?"
          full
        >
          <textarea
            id="desired-outcome"
            value={formState.desiredOutcome}
            onChange={(event) =>
              updateField("desiredOutcome", event.target.value)
            }
          />
        </Field>
        <Field id="urgency" label="Timeline or urgency" full>
          <input
            id="urgency"
            value={formState.urgency}
            onChange={(event) => updateField("urgency", event.target.value)}
          />
        </Field>
      </FormSection>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={formState.permissionToFollowUp}
          onChange={(event) =>
            updateField("permissionToFollowUp", event.target.checked)
          }
          required
        />
        <span>
          I give Parkside permission to follow up about this workflow.
        </span>
      </label>

      <button
        className="btn intake-submit"
        type="submit"
        disabled={phase === "analyzing"}
      >
        {phase === "analyzing"
          ? "Analyzing workflow…"
          : "Request the Free Snapshot"}
      </button>
      {status ? (
        <p className="notice" role="status">
          {status}
        </p>
      ) : null}
      {phase === "received" ? <BookingLink className="btn ghost" /> : null}
      {summary ? <pre className="result-box">{summary}</pre> : null}
    </form>
  );
}

function FormSection({
  step,
  title,
  description,
  children,
}: Readonly<{
  step: string;
  title: string;
  description: string;
  children: React.ReactNode;
}>) {
  return (
    <section
      className="form-section"
      aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}
    >
      <div className="form-section-header">
        <span className="meta">{step}</span>
        <h2 id={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}>
          {title}
        </h2>
        <p>{description}</p>
      </div>
      <div className="field-grid">{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  full,
  children,
}: Readonly<{
  id: string;
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}>) {
  return (
    <div className={full ? "field full" : "field"}>
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}

const DIAG_EASE = [0.16, 1, 0.3, 1] as const;

function IntakeDiagnostic({
  diagnostics,
  phase,
  stepLabel,
  reduceMotion,
}: Readonly<{
  diagnostics: Diagnostics;
  phase: IntakePhase;
  stepLabel: string;
  reduceMotion: boolean;
}>) {
  const meters = [
    {
      label: "Intake completeness",
      value: diagnostics.completeness,
      note: `${Math.round(diagnostics.completeness * 100)}%`,
    },
    {
      label: "Detail depth",
      value: diagnostics.depth,
      note: `${Math.round(diagnostics.depth * 100)}%`,
    },
    {
      label: "Readiness signal",
      value: diagnostics.readiness,
      note: diagnostics.readinessLabel,
    },
  ];

  const refLabel =
    phase === "received"
      ? "Queued"
      : phase === "analyzing"
        ? "Analyzing"
        : "Draft";

  return (
    <div className="intake-diag" data-phase={phase} aria-hidden="true">
      <div className="intake-diag-header">
        <span className="intake-diag-kicker">
          {/* motion.css stills the pulse under prefers-reduced-motion */}
          <span className="intake-diag-dot intake-diag-dot-live" />
          Live Snapshot diagnostic
        </span>
        <span className="intake-diag-ref">{refLabel}</span>
      </div>

      <div className="intake-diag-meters">
        {meters.map((meter) => (
          <div className="intake-diag-meter" key={meter.label}>
            <div className="intake-diag-meter-top">
              <span className="intake-diag-meter-label">{meter.label}</span>
              <span className="intake-diag-meter-note">{meter.note}</span>
            </div>
            <span className="intake-diag-track">
              <motion.span
                className="intake-diag-fill"
                initial={false}
                animate={{ width: `${Math.max(3, meter.value * 100)}%` }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.6, ease: DIAG_EASE }
                }
              />
            </span>
          </div>
        ))}
      </div>

      <div className="intake-diag-signals">
        <AnimatePresence initial={false}>
          {diagnostics.signals.map((signal) => (
            <motion.span
              className="intake-diag-signal"
              key={signal}
              initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: DIAG_EASE }}
            >
              {signal}
            </motion.span>
          ))}
        </AnimatePresence>
        {diagnostics.signals.length === 0 ? (
          <span className="intake-diag-empty">
            Signals surface here as you describe the workflow.
          </span>
        ) : null}
      </div>

      <AnimatePresence>
        {phase === "analyzing" ? (
          <motion.div
            className="intake-diag-scan"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: DIAG_EASE }}
          >
            <span className="intake-diag-scan-label">{stepLabel}…</span>
            <span
              className={
                reduceMotion
                  ? "intake-diag-scan-bar"
                  : "intake-diag-scan-bar intake-diag-scan-bar-live"
              }
            >
              <span />
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
