"use client";

import { FormEvent, useState } from "react";

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
  permissionToFollowUp: false
};

export function IntakeAdvisor() {
  const [formState, setFormState] = useState<IntakeFormState>(initialState);
  const [status, setStatus] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  function updateField<T extends keyof IntakeFormState>(field: T, value: IntakeFormState[T]): void {
    setFormState((currentState) => ({ ...currentState, [field]: value }));
  }

  async function submitIntake(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setStatus("Reviewing the workflow details...");
    setSummary("");

    const response = await fetch("/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState)
    });
    const payload = (await response.json()) as { errors?: string[]; record?: { internal_summary: string } };

    if (!response.ok) {
      setStatus(payload.errors?.join(" ") ?? "The intake could not be submitted.");
      return;
    }

    setStatus("Intake received. Recommended next step: AI Operations Blueprint.");
    setSummary(payload.record?.internal_summary ?? "");
  }

  return (
    <form className="intake-form" onSubmit={submitIntake} aria-label="Parkside Intake Advisor">
      <div className="notice">
        The Blueprint review starts with how work moves today. Do not submit passwords, private credentials, or
        confidential access details.
      </div>

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
          <input id="phone" value={formState.phone} onChange={(event) => updateField("phone", event.target.value)} />
        </Field>
        <Field id="business-name" label="Business name" required>
          <input
            id="business-name"
            value={formState.businessName}
            onChange={(event) => updateField("businessName", event.target.value)}
            required
          />
        </Field>
        <Field id="website" label="Website">
          <input id="website" value={formState.website} onChange={(event) => updateField("website", event.target.value)} />
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
        <Field id="primary-pain" label="What process feels most manual, repetitive, or hard to keep up with?" required full>
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
            onChange={(event) => updateField("frequencyOfIssue", event.target.value)}
            placeholder="Daily, weekly, during busy season, after every new lead..."
          />
        </Field>
        <Field id="current-process" label="How is the process handled today?" required full>
          <textarea
            id="current-process"
            value={formState.currentProcess}
            onChange={(event) => updateField("currentProcess", event.target.value)}
            required
          />
        </Field>
        <Field id="people-involved" label="Who is involved?" full>
          <input
            id="people-involved"
            value={formState.peopleInvolved}
            onChange={(event) => updateField("peopleInvolved", event.target.value)}
          />
        </Field>
      </FormSection>

      <FormSection
        step="Step 3 of 4"
        title="Systems & Tools"
        description="List the tools and rough impact so the audit can separate quick wins from deeper implementation work."
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
            onChange={(event) => updateField("estimatedTimeLost", event.target.value)}
          />
        </Field>
        <Field id="estimated-business-impact" label="Estimated revenue, customer, delay, or follow-up impact" full>
          <textarea
            id="estimated-business-impact"
            value={formState.estimatedBusinessImpact}
            onChange={(event) => updateField("estimatedBusinessImpact", event.target.value)}
          />
        </Field>
      </FormSection>

      <FormSection
        step="Step 4 of 4"
        title="Desired Outcomes"
        description="Describe what should be more repeatable after the Blueprint Audit and how soon the issue matters."
      >
        <Field id="desired-outcome" label="What would a better outcome look like?" full>
          <textarea
            id="desired-outcome"
            value={formState.desiredOutcome}
            onChange={(event) => updateField("desiredOutcome", event.target.value)}
          />
        </Field>
        <Field id="urgency" label="Timeline or urgency" full>
          <input id="urgency" value={formState.urgency} onChange={(event) => updateField("urgency", event.target.value)} />
        </Field>
      </FormSection>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={formState.permissionToFollowUp}
          onChange={(event) => updateField("permissionToFollowUp", event.target.checked)}
          required
        />
        <span>I give Parkside permission to follow up about this workflow.</span>
      </label>

      <button className="btn" type="submit">
        Submit for Blueprint Review
      </button>
      {status ? <p className="notice" role="status">{status}</p> : null}
      {summary ? <pre className="result-box">{summary}</pre> : null}
    </form>
  );
}

function FormSection({
  step,
  title,
  description,
  children
}: Readonly<{ step: string; title: string; description: string; children: React.ReactNode }>) {
  return (
    <section className="form-section" aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}>
      <div className="form-section-header">
        <span className="meta">{step}</span>
        <h2 id={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}>{title}</h2>
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
