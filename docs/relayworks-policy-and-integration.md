# RelayWorks: 4-4-1, PAR, and payment safety

## Status
Policy contract and utility functions only. RelayWorks does not yet integrate with a PAR ledger, wallet, payment provider, or live RAMS feed. No policy function mints or transfers value.

## Voluntary 4-4-1
- 4 hours primary work.
- 4 hours secondary work or education.
- 1 hour transit/intake/logistics.
- Participation is voluntary, never a compulsory schedule.
- 9 hours is a universal shift ceiling, not a target or required shift.
- Plans require explicit opt-in and must total no more than 9 hours.

## PAR policy parameters
- Candidate target float: population × 1.35 × R*, where R* is resource availability normalized to [0,1]; higher availability expands the target and scarcity contracts it.
- If RAMS supplies scarcity S* instead, use population × 1.35 × (1 − S*); never apply both transformations.
- Suggested smoothing: R*_t = alpha × R_t + (1 − alpha) × R*_(t−1). Alpha, cadence, rate limits, missing-data policy, and provenance must be configured before live use.
- Transaction fee: 0.0002 × amount (0.02%).
- Marketplace ceiling: salePrice ≤ 1.15 × verifiedNetCost. Verified net cost includes documented legitimate costs/overhead.
- Qualifying low-to-medium PAR accounts: 8-year demurrage exemption. Eligibility thresholds, privacy/Sybil safeguards, appeal, exemption end-state, and interaction with older demurrage policy remain unresolved; do not guess or automatically apply the exemption.
- Target float is a soft peg. Target changes do not mint currency. Keep target float, outstanding supply, and issuance authorization separate.

## Payment safety
Task status PAID must not be treated as proof of settlement. Before real payment flows, introduce an immutable payout/ledger record, provider reference, idempotency key, reconciliation, and role/tenant authorization. There is no payment-provider integration yet.

## Engineering invariants
- Task access is scoped by operatorId; worker access is additionally scoped by workerId.
- Only legal task transitions are accepted.
- JWT_SECRET must be configured and high-entropy; never fall back to a known development secret.
- Browser CORS origins are explicit and allow-listed.
- Never commit real environment files or credentials.
- Build and policy tests are required before merge.
