const workflowSteps = [
  {
    label: "Capture",
    eyebrow: "Intake",
    detail: "Signal from the market"
  },
  {
    label: "Route",
    eyebrow: "System",
    detail: "Qualified work goes where it belongs"
  },
  {
    label: "Follow up",
    eyebrow: "Operator",
    detail: "Next action stays visible"
  },
  {
    label: "Report",
    eyebrow: "Proof",
    detail: "Progress becomes a decision record"
  }
];

export function HomeHeroVisual() {
  return (
    <div className="home-hero-visual" aria-label="A calm operating-system workflow from capture to reporting" role="img">
      <div className="home-hero-visual-panel" aria-hidden="true">
        <div className="home-hero-visual-kicker">Parkside OS</div>
        <div className="home-hero-visual-rule" />
        <div className="home-hero-visual-grid">
          {workflowSteps.map((step, index) => (
            <div className="home-hero-visual-card" key={step.label}>
              <span className="home-hero-visual-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="home-hero-visual-eyebrow">{step.eyebrow}</span>
              <strong>{step.label}</strong>
              <span>{step.detail}</span>
            </div>
          ))}
        </div>
        <div className="home-hero-visual-footer">
          <span>Lead</span>
          <span>Audit</span>
          <span>Blueprint</span>
        </div>
      </div>
    </div>
  );
}
