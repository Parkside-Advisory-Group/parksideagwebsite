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
        Parkside Intake Advisor will clarify the workflow, score fit, and create an internal lead summary. Do not submit
        passwords, private credentials, or confidential access details.
      </div>

      <div className="field-grid">
        <Field label="Name" required>
          <input value={formState.name} onChange={(event) => updateField("name", event.target.value)} required />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
        </Field>
        <Field label="Phone (optional)">
          <input value={formState.phone} onChange={(event) => updateField("phone", event.target.value)} />
        </Field>
        <Field label="Business name" required>
          <input
            value={formState.businessName}
            onChange={(event) => updateField("businessName", event.target.value)}
            required
          />
        </Field>
        <Field label="Website">
          <input value={formState.website} onChange={(event) => updateField("website", event.target.value)} />
        </Field>
        <Field label="Industry or business type" required>
          <input
            value={formState.industry}
            onChange={(event) => updateField("industry", event.target.value)}
            required
          />
        </Field>
        <Field label="What process feels most manual, repetitive, or hard to keep up with?" required full>
          <textarea
            value={formState.primaryPain}
            onChange={(event) => updateField("primaryPain", event.target.value)}
            required
          />
        </Field>
        <Field label="How often does this happen?" full>
          <input
            value={formState.frequencyOfIssue}
            onChange={(event) => updateField("frequencyOfIssue", event.target.value)}
            placeholder="Daily, weekly, during busy season, after every new lead..."
          />
        </Field>
        <Field label="How is the process handled today?" required full>
          <textarea
            value={formState.currentProcess}
            onChange={(event) => updateField("currentProcess", event.target.value)}
            required
          />
        </Field>
        <Field label="Who is involved?" full>
          <input
            value={formState.peopleInvolved}
            onChange={(event) => updateField("peopleInvolved", event.target.value)}
          />
        </Field>
        <Field label="What tools or systems are involved?" full>
          <input
            value={formState.toolsUsed}
            onChange={(event) => updateField("toolsUsed", event.target.value)}
            placeholder="CRM, inbox, calendar, spreadsheets, phone system..."
          />
        </Field>
        <Field label="Estimated time lost" full>
          <input
            value={formState.estimatedTimeLost}
            onChange={(event) => updateField("estimatedTimeLost", event.target.value)}
          />
        </Field>
        <Field label="Estimated revenue, customer, delay, or follow-up impact" full>
          <textarea
            value={formState.estimatedBusinessImpact}
            onChange={(event) => updateField("estimatedBusinessImpact", event.target.value)}
          />
        </Field>
        <Field label="What would a better outcome look like?" full>
          <textarea
            value={formState.desiredOutcome}
            onChange={(event) => updateField("desiredOutcome", event.target.value)}
          />
        </Field>
        <Field label="Timeline or urgency" full>
          <input value={formState.urgency} onChange={(event) => updateField("urgency", event.target.value)} />
        </Field>
      </div>

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
        Start an AI Operations Blueprint
      </button>
      {status ? <p className="notice" role="status">{status}</p> : null}
      {summary ? <pre className="result-box">{summary}</pre> : null}
    </form>
  );
}

function Field({
  label,
  required,
  full,
  children
}: Readonly<{ label: string; required?: boolean; full?: boolean; children: React.ReactNode }>) {
  return (
    <div className={full ? "field full" : "field"}>
      <label>
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}
