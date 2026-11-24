export interface EstimatorState {
  teamSize: string;
  workflowType: string;
  frequency: string;
  tools: string[];
  ownership: string;
  examples: string;
  impact: string;
  urgency: string;
}

export interface EstimatorOption {
  label: string;
  value: string;
  score: number;
}

export interface EstimatorResult {
  score: number;
  band: string;
  headline: string;
  recommendation: string;
  nextStep: string;
  signals: string[];
}

export const STRONG_STARTING_SCORE = 18;
export const PROMISING_SCORE = 12;
export const ESTIMATOR_MAX_SCORE = 23;

export const initialEstimatorState: EstimatorState = {
  teamSize: "",
  workflowType: "",
  frequency: "",
  tools: [],
  ownership: "",
  examples: "",
  impact: "",
  urgency: "",
};

export const teamSizeOptions: EstimatorOption[] = [
  { label: "1–5", value: "1-5", score: 1 },
  { label: "6–20", value: "6-20", score: 2 },
  { label: "21–75", value: "21-75", score: 3 },
  { label: "76+", value: "76-plus", score: 3 },
];

export const workflowOptions: EstimatorOption[] = [
  { label: "Lead intake or missed calls", value: "lead-intake", score: 3 },
  { label: "Estimate or proposal follow-up", value: "estimate-follow-up", score: 3 },
  { label: "Customer updates", value: "customer-updates", score: 2 },
  { label: "Manual reporting", value: "manual-reporting", score: 2 },
  { label: "Internal handoffs", value: "internal-handoffs", score: 2 },
  { label: "Broad AI adoption / not sure yet", value: "broad-ai", score: 0 },
];

export const frequencyOptions: EstimatorOption[] = [
  { label: "Several times a day", value: "daily-multiple", score: 3 },
  { label: "Daily", value: "daily", score: 3 },
  { label: "Weekly", value: "weekly", score: 2 },
  { label: "Monthly or occasional", value: "occasional", score: 0 },
];

export const toolOptions = ["Email", "Spreadsheets", "CRM", "Calendar", "Phone/text", "Project or task tool"];

export const ownershipOptions: EstimatorOption[] = [
  { label: "One clear owner", value: "clear-owner", score: 3 },
  { label: "Shared ownership", value: "shared-owner", score: 1 },
  { label: "No clear owner", value: "no-owner", score: 0 },
];

export const examplesOptions: EstimatorOption[] = [
  { label: "Yes, recent examples are available", value: "examples-ready", score: 3 },
  { label: "Some examples, but scattered", value: "examples-scattered", score: 1 },
  { label: "Not yet", value: "no-examples", score: 0 },
];

export const impactOptions: EstimatorOption[] = [
  { label: "Revenue, response time, or customer trust", value: "high-impact", score: 3 },
  { label: "Management visibility or team capacity", value: "medium-impact", score: 2 },
  { label: "Mostly convenience", value: "low-impact", score: 0 },
];

export const urgencyOptions: EstimatorOption[] = [
  { label: "This quarter", value: "this-quarter", score: 2 },
  { label: "Soon, but not urgent", value: "soon", score: 1 },
  { label: "Exploring", value: "exploring", score: 0 },
];

type ParamSource = { get(name: string): string | null };

function getScore(options: EstimatorOption[], value: string): number {
  return options.find((option) => option.value === value)?.score ?? 0;
}

function optionLabel(options: EstimatorOption[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? "";
}

function pickOption(params: ParamSource, key: string, options: EstimatorOption[]): string {
  const value = params.get(key) ?? "";
  return options.some((option) => option.value === value) ? value : "";
}

/** Scores a workflow the same way on the homepage check and the full estimator. */
export function calculateEstimatorResult(state: EstimatorState): EstimatorResult {
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
    state.workflowType === "broad-ai"
      ? "The request is still broad; Parkside will need to narrow it to one workflow."
      : "There is a named workflow to inspect.",
    state.frequency === "occasional"
      ? "Low repeat volume may reduce the case for automation."
      : "The work repeats often enough to study.",
    state.ownership === "no-owner"
      ? "Ownership needs to be clarified before implementation."
      : "There is at least some owner path to validate.",
    state.examples === "no-examples"
      ? "Examples should be gathered before a deeper Blueprint."
      : "Real examples can anchor the review.",
    state.tools.length > 0 ? `Current tools named: ${state.tools.join(", ")}.` : "Current tools still need to be named.",
  ];

  if (score >= STRONG_STARTING_SCORE) {
    return {
      score,
      band: "Strong starting point",
      headline: "Ready for a Snapshot.",
      recommendation: "The work repeats, and someone can own the next step.",
      nextStep: "Book a free Snapshot",
      signals,
    };
  }

  if (score >= PROMISING_SCORE) {
    return {
      score,
      band: "Promising but needs focus",
      headline: "Promising. Narrow it first.",
      recommendation: "Name the owner and the workflow before you build.",
      nextStep: "Book a free Snapshot",
      signals,
    };
  }

  return {
    score,
    band: "Prepare before automating",
    headline: "Not ready to automate.",
    recommendation: "Pick one repeated workflow and a named owner.",
    nextStep: "Book a free Snapshot",
    signals,
  };
}

export function estimatorStateFromParams(params: ParamSource): EstimatorState {
  const tools = (params.get("tools") ?? "")
    .split(",")
    .map((tool) => tool.trim())
    .filter((tool) => toolOptions.includes(tool));

  return {
    teamSize: pickOption(params, "team", teamSizeOptions),
    workflowType: pickOption(params, "workflow", workflowOptions),
    frequency: pickOption(params, "frequency", frequencyOptions),
    tools,
    ownership: pickOption(params, "ownership", ownershipOptions),
    examples: pickOption(params, "examples", examplesOptions),
    impact: pickOption(params, "impact", impactOptions),
    urgency: pickOption(params, "urgency", urgencyOptions),
  };
}

export function estimatorStateHasAnswers(state: EstimatorState): boolean {
  return Boolean(
    state.teamSize ||
      state.workflowType ||
      state.frequency ||
      state.tools.length ||
      state.ownership ||
      state.examples ||
      state.impact ||
      state.urgency,
  );
}

function appendState(params: URLSearchParams, state: EstimatorState): void {
  const entries: Array<[string, string]> = [
    ["team", state.teamSize],
    ["workflow", state.workflowType],
    ["frequency", state.frequency],
    ["ownership", state.ownership],
    ["examples", state.examples],
    ["impact", state.impact],
    ["urgency", state.urgency],
  ];

  for (const [key, value] of entries) {
    if (value) params.set(key, value);
  }
  if (state.tools.length > 0) params.set("tools", state.tools.join(","));
}

/** Full estimator URL, carrying answers from the short homepage check. */
export function buildEstimatorHref(state: EstimatorState): string {
  const params = new URLSearchParams();
  appendState(params, state);
  const query = params.toString();
  return query ? `/opportunity-estimator?${query}` : "/opportunity-estimator";
}

/** Intake URL whose answers are recomputed on arrival, not trusted from a score parameter. */
export function buildIntakeHref(state: EstimatorState): string {
  const params = new URLSearchParams();
  params.set("source", "opportunity-estimator");
  appendState(params, state);
  return `/intake?${params.toString()}`;
}

export interface EstimatorContext {
  state: EstimatorState;
  result: EstimatorResult;
  workflowLabel: string;
  summary: string;
}

/** Rebuilds estimator context from a query string. Unknown values are dropped. */
export function readEstimatorContext(params: ParamSource): EstimatorContext | null {
  if (params.get("source") !== "opportunity-estimator") return null;
  const state = estimatorStateFromParams(params);
  if (!estimatorStateHasAnswers(state)) return null;
  const result = calculateEstimatorResult(state);
  const workflowLabel = optionLabel(workflowOptions, state.workflowType) || "One workflow";
  const parts = [
    workflowLabel,
    optionLabel(frequencyOptions, state.frequency),
    optionLabel(ownershipOptions, state.ownership),
    optionLabel(impactOptions, state.impact),
    state.tools.length > 0 ? `Tools: ${state.tools.join(", ")}` : "",
  ].filter(Boolean);

  return {
    state,
    result,
    workflowLabel,
    summary: `${result.band} (${result.score} of ${ESTIMATOR_MAX_SCORE}). ${parts.join(" · ")}`,
  };
}
