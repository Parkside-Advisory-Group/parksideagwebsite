/**
 * The Ledger That Moves.
 * One illustrative job changes from quiet to owned. The change plays once.
 * prefers-reduced-motion shows the owned job immediately and stays still.
 */
export function LedgerMotion() {
  return (
    <figure
      className="ledger"
      aria-label="Illustrative example, not a client result. Estimate EST-1842 for a commercial roof repair moves from quiet and unassigned to owned by the office lead, with the next action to call the customer today."
    >
      <figcaption className="ledger-caption">
        <span>Illustrative example</span>
        <span>Not a client result</span>
      </figcaption>
      <div className="ledger-sheet" aria-hidden="true">
        <div className="ledger-rule" />
        <div className="ledger-head">
          <span>Job ledger</span>
          <span>EST-1842</span>
        </div>
        <p className="ledger-job">Commercial roof repair</p>
        <dl className="ledger-rows">
          <div>
            <dt>Status</dt>
            <dd className="ledger-line">
              <span className="ledger-before">Quiet · 11 days</span>
              <span className="ledger-after">Owned</span>
            </dd>
          </div>
          <div>
            <dt>Owner</dt>
            <dd className="ledger-line">
              <span className="ledger-before">Unassigned</span>
              <span className="ledger-after">Office lead</span>
            </dd>
          </div>
          <div>
            <dt>Next action</dt>
            <dd className="ledger-line">
              <span className="ledger-before">None</span>
              <span className="ledger-after">Call the customer today</span>
            </dd>
          </div>
        </dl>
      </div>
    </figure>
  );
}
