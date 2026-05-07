# DOCTORE AI — Market Intelligence Implementation Tasks

**Document:** `docs/market-intelligence-tasks.md`  
**Status:** Planning baseline  
**Related spec:** `docs/market-intelligence.md`

---

## Build Principle

Market Intelligence is not market coverage.

It is the system layer that determines whether a sport, league, bookmaker, market, or segment is worth exposing capital to.

The objective is not prediction volume.

The objective is repeatable pricing advantage.

---

## Milestone MI-1 — Market Coverage Registry

### Goal

Create a canonical registry of supported, candidate, and inactive markets.

### Tasks

- [ ] Define market coverage contract.
- [ ] Add supported sports:
  - MLB
  - KBO
  - NPB
  - Veikkausliiga
  - Nordic lower football divisions
- [ ] Add market status enum:
  - documented
  - candidate
  - active_testing
  - approved
  - restricted
  - blocked
  - retired
- [ ] Add market tier enum:
  - core
  - expansion
  - local_edge
  - experimental
  - inactive
- [ ] Add activation gate enum:
  - data_required
  - closing_reference_required
  - sample_required
  - clv_validation_required
  - approved
  - blocked
- [ ] Add coverage reason field.
- [ ] Add data quality score field.
- [ ] Add closing reference quality field.
- [ ] Add liquidity tier field.
- [ ] Add stale-line risk field.

### Acceptance Criteria

- [ ] Every covered market has a status.
- [ ] Every covered market has a documented edge thesis.
- [ ] No market is treated as approved by default.
- [ ] Coverage is framed as edge validation, not prediction volume.

---

## Milestone MI-2 — Market Intelligence Data Model

### Goal

Extend market profiles with intelligence fields needed by the decision engine.

### Tasks

- [ ] Extend `marketProfiles` with `marketStatus`.
- [ ] Extend `marketProfiles` with `marketTier`.
- [ ] Extend `marketProfiles` with `coverageReason`.
- [ ] Extend `marketProfiles` with `activationGate`.
- [ ] Extend `marketProfiles` with `dataQualityScore`.
- [ ] Extend `marketProfiles` with `closingReferenceQuality`.
- [ ] Extend `marketProfiles` with `liquidityTier`.
- [ ] Extend `marketProfiles` with `staleLineRisk`.
- [ ] Extend `marketProfiles` with `lastValidationAt`.
- [ ] Add Zod schema validation.
- [ ] Add Firestore persistence validation.

### Acceptance Criteria

- [ ] Market status can be stored and queried.
- [ ] Market activation gate can be evaluated server-side.
- [ ] Decision engine can distinguish documented, testing, approved, restricted, and blocked markets.

---

## Milestone MI-3 — Market Activation Gates

### Goal

Prevent unvalidated markets from producing unrestricted ACCEPT decisions.

### Tasks

- [ ] Implement Gate 1: Data Availability.
- [ ] Implement Gate 2: Pricing Reference Quality.
- [ ] Implement Gate 3: Edge Validation.
- [ ] Define required data fields:
  - fixtures
  - start time
  - bookmaker odds
  - entry odds timestamp
  - closing odds reference
  - settlement data
- [ ] Define closing reference checks:
  - source reliability
  - quote frequency
  - market close timestamp
  - bookmaker normalization
- [ ] Define edge validation checks:
  - sample size
  - average CLV
  - CLV hit rate
  - risk-adjusted ROI
  - repeatability
- [ ] Return explicit gate failure reasons.

### Acceptance Criteria

- [ ] A market without data quality cannot become active.
- [ ] A market without closing reference quality cannot calculate trusted CLV.
- [ ] A market without CLV validation cannot be approved.

---

## Milestone MI-4 — Decision Engine Integration

### Goal

Make Market Intelligence mandatory for decision approval.

### Tasks

- [ ] Load market profile during decision evaluation.
- [ ] Check market status before returning ACCEPT.
- [ ] Check activation gate before returning ACCEPT.
- [ ] Check closing reference quality.
- [ ] Check stale-line risk.
- [ ] Check liquidity tier.
- [ ] Apply tighter stake caps for restricted markets.
- [ ] Return WAIT for markets under validation.
- [ ] Return REJECT for blocked markets.
- [ ] Add decision reasons:
  - market_under_validation
  - closing_reference_weak
  - stale_line_risk_elevated
  - liquidity_restricted
  - market_blocked
  - market_not_active

### Acceptance Criteria

- [ ] Model edge alone cannot produce ACCEPT.
- [ ] Unapproved markets return WAIT or REJECT.
- [ ] Restricted markets apply tighter exposure rules.
- [ ] Blocked markets cannot be executed.

---

## Milestone MI-5 — Initial Market Registry Seed

### Goal

Seed the initial market intelligence map.

### Tasks

- [ ] Add MLB as `core` / `active_testing` or `approved` depending on available data.
- [ ] Add KBO as `expansion` / `documented`.
- [ ] Add NPB as `expansion` / `documented`.
- [ ] Add Veikkausliiga as `local_edge` / `candidate`.
- [ ] Add Nordic lower football divisions as `local_edge` / `candidate`.
- [ ] Add edge thesis for every market.
- [ ] Add data dependency notes for every market.
- [ ] Add activation gate status for every market.

### Acceptance Criteria

- [ ] Initial markets are documented.
- [ ] Only markets with validated data can become active.
- [ ] Football/local markets are not prematurely treated as approved.

---

## Milestone MI-6 — Market Intelligence UI States

### Goal

Expose only decision-relevant market intelligence to users.

### Tasks

- [ ] Add reason label: Market approved.
- [ ] Add reason label: Market under validation.
- [ ] Add reason label: Closing reference weak.
- [ ] Add reason label: Liquidity restricted.
- [ ] Add reason label: Stale-line risk elevated.
- [ ] Add reason label: Segment blocked.
- [ ] Add market intelligence section to admin/model review UI.
- [ ] Avoid raw market coverage tables in primary decision UI.

### Acceptance Criteria

- [ ] User sees market intelligence only when it affects decision quality.
- [ ] Primary UI remains ACCEPT / REJECT / WAIT.
- [ ] No market browser or pick feed is introduced.

---

## Milestone MI-7 — Tests

### Goal

Protect the market intelligence logic from bypassing validation.

### Unit Tests

- [ ] Market status transitions.
- [ ] Activation gate logic.
- [ ] Data availability gate.
- [ ] Closing reference quality gate.
- [ ] Edge validation gate.
- [ ] Restricted market stake cap.
- [ ] Blocked market rejection.

### Integration Tests

- [ ] Decision evaluation with approved market.
- [ ] Decision evaluation with documented market.
- [ ] Decision evaluation with active_testing market.
- [ ] Decision evaluation with restricted market.
- [ ] Decision evaluation with blocked market.
- [ ] Market profile recalculation updates market status.

### Acceptance Criteria

- [ ] Unvalidated markets cannot return ACCEPT.
- [ ] Blocked markets cannot create executions.
- [ ] Restricted markets reduce stake sizing.
- [ ] Market profile recalculation affects future decisions.

---

## Final Definition of Done

Market Intelligence is complete when:

```txt
Every covered market has a thesis.
Every covered market has a status.
Every covered market has activation gates.
Every market decision checks data quality, closing reference quality, CLV history, liquidity, and stale-line risk.
No market can return ACCEPT only because prediction edge exists.
```
