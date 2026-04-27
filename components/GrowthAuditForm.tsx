"use client";

import { FormEvent, useState } from "react";
import { IntakeSubmission } from "../lib/schemas/intake.schema";

interface GrowthAuditFormState {
  name: string;
  email: string;
  businessName: string;
  website: string;
  industry: string;
  teamSize: string;
  currentBottleneck: string;
  growthContext: string;
  currentTools: string;
  desiredOutcome: string;
  permissionToFollowUp: boolean;
}

const initialState: GrowthAuditFormState = {
  name: "",
  email: "",
  businessName: "",
  website: "",
  industry: "",
  teamSize: "",
  currentBottleneck: "",
  growthContext: "",
  currentTools: "",
  desiredOutcome: "",
  permissionToFollowUp: false
};

type SubmitPhase = "idle" | "submitting" | "success" | "error";

export function GrowthAuditForm() {
  const [formState, setFormState] = useState<GrowthAuditFormState>(initialState);
  const [phase, setPhase] = useState<SubmitPhase>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function updateField<K extends keyof GrowthAuditFormState>(
    field: K,
    value: GrowthAuditFormState[K]
  ): void {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setPhase("submitting");
    setErrorMessage("");

    const submission: IntakeSubmission = {
      name: formState.name,
      email: formState.email,
      businessName: formState.businessName,
      website: formState.website || undefined,
      industry: formState.industry,
      // Map Growth Audit fields onto the shared schema
      primaryPain: formState.currentBottleneck,
      currentProcess: formState.currentBottleneck,
      toolsUsed: formState.currentTools,
      desiredOutcome: formState.desiredOutcome,
      // Growth Audit-specific optional fields
      teamSize: formState.teamSize || undefined,
      growthContext: formState.growthContext || undefined,
      source: "growth-audit-page",
      // Unused by this form; included to satisfy the schema
      frequencyOfIssue: "",
      peopleInvolved: "",
      estimatedTimeLost: "",
      estimatedBusinessImpact: "",
      urgency: "",
      permissionToFollowUp: formState.permissionToFollowUp
    };

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission)
      });

      const payload = (await response.json()) as { errors?: string[] };

      if (!response.ok) {
        setErrorMessage(payload.errors?.join(" ") ?? "The submission could not be completed. Please try again.");
        setPhase("error");
        return;
      }

      setPhase("success");
    } catch {
      setErrorMessage("Something went wrong. Please try again or email info@parksideag.com.");
      setPhase("error");
    }
  }

  if (phase === "success") {
    return (
      <div className="notice" role="status" aria-live="polite">
        <strong>Your Growth Audit request has been received.</strong> We&apos;ll review your answers and follow up
        with next steps.
      </div>
    );
  }

  return (
    <form className="intake-form" onSubmit={handleSubmit} aria-label="Growth Audit Intake Form" noValidate>
      <div className="notice">
        Share the honest picture of your business. Do not submit passwords, private credentials, or confidential
        system access.
      </div>

      <FormSection
        step="Step 1 of 3"
        title="About Your Business"
        description="Contact details and enough context to understand what you operate."
      >
        <Field id="ga-name" label="Your name" required>
          <input
            id="ga-name"
            type="text"
            value={formState.name}
            onChange={(e) => updateField("name", e.target.value)}
            autoComplete="name"
            required
          />
        </Field>

        <Field id="ga-email" label="Email" required>
          <input
            id="ga-email"
            type="email"
            value={formState.email}
            onChange={(e) => updateField("email", e.target.value)}
            autoComplete="email"
            required
          />
        </Field>

        <Field id="ga-business-name" label="Business name" required>
          <input
            id="ga-business-name"
            type="text"
            value={formState.businessName}
            onChange={(e) => updateField("businessName", e.target.value)}
            required
          />
        </Field>

        <Field id="ga-website" label="Website (optional)">
          <input
            id="ga-website"
            type="url"
            value={formState.website}
            onChange={(e) => updateField("website", e.target.value)}
            placeholder="https://"
            autoComplete="url"
          />
        </Field>

        <Field id="ga-industry" label="Industry or business type" required>
          <input
            id="ga-industry"
            type="text"
            value={formState.industry}
            onChange={(e) => updateField("industry", e.target.value)}
            placeholder="e.g. HVAC, legal, marketing agency, medical practice…"
            required
          />
        </Field>

        <Field id="ga-team-size" label="Team size">
          <input
            id="ga-team-size"
            type="text"
            value={formState.teamSize}
            onChange={(e) => updateField("teamSize", e.target.value)}
            placeholder="e.g. 1, 3–5, 10–25…"
          />
        </Field>
      </FormSection>

      <FormSection
        step="Step 2 of 3"
        title="Where the Work Breaks Down"
        description="Describe the bottleneck, what triggered the search for a better system, and what tools are already in play."
      >
        <Field id="ga-bottleneck" label="What is your biggest operational bottleneck right now?" required full>
          <textarea
            id="ga-bottleneck"
            value={formState.currentBottleneck}
            onChange={(e) => updateField("currentBottleneck", e.target.value)}
            placeholder="Describe the process, task, or gap that costs you the most time or causes the most friction."
            required
          />
        </Field>

        <Field
          id="ga-growth-context"
          label="What prompted you to explore AI or better systems now?"
          full
        >
          <textarea
            id="ga-growth-context"
            value={formState.growthContext}
            onChange={(e) => updateField("growthContext", e.target.value)}
            placeholder="A recent miss, a growth moment, a team problem, a new competitor — whatever made this urgent."
          />
        </Field>

        <Field id="ga-tools" label="What tools does your business currently use?" full>
          <input
            id="ga-tools"
            type="text"
            value={formState.currentTools}
            onChange={(e) => updateField("currentTools", e.target.value)}
            placeholder="CRM, email, scheduling, invoicing, project management, phone system…"
          />
        </Field>
      </FormSection>

      <FormSection
        step="Step 3 of 3"
        title="Where You Want to Go"
        description="Define the outcome that would make this worth doing."
      >
        <Field
          id="ga-outcome"
          label="What does a better-operating business look like for you in the next 6–12 months?"
          full
        >
          <textarea
            id="ga-outcome"
            value={formState.desiredOutcome}
            onChange={(e) => updateField("desiredOutcome", e.target.value)}
            placeholder="More revenue, fewer manual steps, a team that can operate without you in the loop, faster follow-up…"
          />
        </Field>
      </FormSection>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={formState.permissionToFollowUp}
          onChange={(e) => updateField("permissionToFollowUp", e.target.checked)}
          required
        />
        <span>I give Parkside permission to follow up about this request.</span>
      </label>

      <button className="btn" type="submit" disabled={phase === "submitting"}>
        {phase === "submitting" ? "Submitting…" : "Request the Growth Audit"}
      </button>

      {phase === "error" && errorMessage ? (
        <p className="notice" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}

function FormSection({
  step,
  title,
  description,
  children
}: Readonly<{ step: string; title: string; description: string; children: React.ReactNode }>) {
  const headingId = `ga-section-${title.toLowerCase().replaceAll(/\s+/g, "-")}`;
  return (
    <section className="form-section" aria-labelledby={headingId}>
      <div className="form-section-header">
        <span className="meta">{step}</span>
        <h2 id={headingId}>{title}</h2>
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
  children
}: Readonly<{ id: string; label: string; required?: boolean; full?: boolean; children: React.ReactNode }>) {
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
