# DOCTORE AI — PRD Fixes Before Code

**Document:** `docs/prd-fixes-before-code.md`  
**Status:** Required PRD corrections  
**Purpose:** Close the product, data, security, plan, and QA gaps identified in PRD review before implementation proceeds.

---

## 1. Verdict After PRD Review

Current foundation is directionally strong but requires corrections before broad implementation.

```txt
Verdict: REQUEST CHANGES
```

Implementation may proceed only after the fixes in this document are reflected in `spec.md`, `tasks.md`, and related planning docs.

Allowed narrow next implementation after these fixes:

```txt
Milestone 2 — Firebase Server Auth
```

Do not start:

```txt
dashboard build
live signals
automation
autobet
social features
multi-sport model expansion
```

---

## 2. Fixed Phase 1 Pipeline

The mandatory Phase 1 pipeline is:

```txt
Ledger
→ Math Core
→ Bankroll
→ Risk Check
→ Decision Engine
→ Execution Flow
→ CLV
→ Market Approval
→ ACCEPT / REJECT / WAIT
```

Execution Flow is P0.

It is not a later P1 item.

Reason:

```txt
Accepted decisions must be converted into auditable ledger records with duplicate protection, bankroll exposure update, entry snapshot, CLV initialization, and audit event.
```

---

## 3. Decision Source and Record Source Lock

A bet must never lose its decision provenance.

Add these fields to `bets`:

```txt
decisionSource
recordSource
```

### decisionSource values

```txt
system_decision
manual_entry
csv_import
backfill
```

### recordSource values

```txt
system
authenticated_manual
csv_import
admin_backfill
```

### Rules

```txt
system_decision:
  Must link to DecisionRecord.
  Can produce ACCEPT / REJECT / WAIT execution audit.

manual_entry:
  Must create a manual DecisionRecord or manual audit event.
  Can be used for ledger completeness.
  Must not be treated as system-approved unless evaluated.

csv_import:
  Used for historical analysis.
  Must be flagged as imported.
  Must not affect market approval unless required CLV and model fields are verified.

backfill:
  Admin/system repair path.
  Requires audit event.
```

### Market approval data rule

Imported historical bets can affect market approval only if they include:

```txt
entry odds
closing odds
model probability
stake
settlement
bookmaker
market
placed timestamp
closing timestamp or closing source timestamp
```

Otherwise they remain useful for ledger and retrospective analytics but not for market approval.

---

## 4. Canonical CLV Contract

CLV is not optional.

It is the process-quality truth layer.

### Formula

```txt
clvPct = ((entryOddsDecimal / closingOddsDecimal) - 1) * 100
beatClose = clvPct > 0
```

### Odds format

```txt
Decimal odds only.
```

### Required CLV inputs

```txt
entryOddsDecimal
closingOddsDecimal
entrySnapshotId
closingSnapshotId
closingOddsSource
closingOddsCollectedAt
```

### CLV record creation rule

```txt
No CLV record may be created without both entry and closing market snapshots.
```

### Interpretation

```txt
Positive CLV = entry beat closing market.
Negative CLV = weak price, late entry, or process/model failure.
```

### Rounding

Persist raw calculation at full number precision.

Display rounded values only in UI:

```txt
CLV display precision: 2 decimals
```

---

## 5. Percentage and Unit Convention

To prevent mixed interpretations:

```txt
Percentages are stored as whole percentage values.
```

Examples:

```txt
1% stored as 1
2.5% stored as 2.5
-0.8% stored as -0.8
```

Probabilities are stored as decimals:

```txt
55% probability stored as 0.55
```

Stake and bankroll values are stored in units:

```txt
stakeUnits
currentBankrollUnits
openExposureUnits
dailyRiskUsedUnits
```

Currency conversion is outside Phase 1 unless explicitly required for reporting.

---

## 6. Canonical Edge and EV Contract

### Market implied probability

```txt
marketImpliedProbability = 1 / decimalOdds
```

### Fair odds

```txt
fairOddsDecimal = 1 / modelProbability
```

### Edge percentage

```txt
edgePct = ((modelProbability - marketImpliedProbability) / marketImpliedProbability) * 100
```

### EV percentage

```txt
evPct = (modelProbability * decimalOdds - 1) * 100
```

### Naming rule

Do not name expected profit as expected value unless normalized.

Use:

```txt
expectedProfitUnits
```

for stake-normalized currency/unit output.

Use:

```txt
evPct
```

for normalized expected value percentage.

---

## 7. Plan Boundary Lock

Plan limits must be server-enforced.

UI visibility is not authorization.

### Free

```txt
Surface only.
No decision execution.
No Kelly sizing.
No market approval.
No advanced CLV analytics.
```

### PRO — 49€/month

```txt
Ledger
CSV import/export
Bet history
Multi-book logging
ROI tracking
Yield tracking
Basic bankroll state
Basic CLV visibility if closing odds exist
Manual bet journal
```

PRO does not unlock full system-approved execution sizing unless explicitly allowed by server plan rules.

### SHARP — 199€/month

```txt
Everything in PRO
Decision evaluation
Kelly-based stake sizing
Fractional Kelly cap
Exposure enforcement
Market approval/rejection
Warning flags
Bookmaker-level performance
Model-level performance
ACCEPT / REJECT / WAIT execution flow
```

### INFRA — Custom / 1000€+/month

```txt
Realtime odds ingestion
Line movement tracking
Bookmaker discrepancy detection
Opening vs closing analysis
Automated market infrastructure
Custom integrations
Private model deployment
Advanced portfolio analytics
```

INFRA is not an MVP plan.

---

## 8. Endpoint-by-Plan Access Matrix

| Endpoint | Free | PRO | SHARP | INFRA | Notes |
|---|---:|---:|---:|---:|---|
| `GET /api/bets` | No | Yes | Yes | Yes | User-owned ledger only. |
| `POST /api/bets` | No | Yes | Yes | Yes | Manual ledger entry. |
| `GET /api/bets/:betId` | No | Yes | Yes | Yes | User-owned only. |
| `PATCH /api/bets/:betId/settle` | No | Yes | Yes | Yes | Must update bankroll/exposure. |
| `GET /api/bankroll` | No | Yes | Yes | Yes | User-owned only. |
| `PATCH /api/bankroll` | No | Limited | Yes | Yes | PRO limited to basic config. SHARP advanced risk config. |
| `POST /api/market-snapshots` | No | Yes | Yes | Yes | Manual/source-controlled snapshots. |
| `POST /api/decisions/evaluate` | No | No | Yes | Yes | Full decision engine requires SHARP. |
| `POST /api/executions` | No | No | Yes | Yes | Converts accepted decision into bet. |
| `POST /api/clv/calculate` | No | Yes | Yes | Yes | Requires valid bet ownership. |
| `GET /api/clv/summary` | No | Basic | Full | Full | PRO limited summary. SHARP segmented analytics. |
| `GET /api/market-profiles` | No | No | Yes | Yes | Market approval layer. |
| `POST /api/market-profiles/recalculate` | No | No | Yes | Yes | Server/admin controlled. |
| `PATCH /api/config/risk` | No | No | Yes | Yes | Audited. |
| `GET /api/admin/*` | No | No | Admin only | Admin only | Role-enforced. |

---

## 9. Endpoint-by-Role Access Matrix

| Role | Allowed Scope |
|---|---|
| `admin` | Full system access, plan control, payment verification, override access, all client data. |
| `project_manager` | Assigned clients only, onboarding/progress visibility, no payment override, no plan override, no system config. |
| `client` | Own account, own ledger, own bankroll, own decisions, own CLV, own settings within plan. |

Rules:

```txt
admin can access all protected resources.
project_manager can access only assigned clients and onboarding state.
client can access only own user-scoped resources.
```

---

## 10. Market Status Behavior Lock

Market status must directly affect decision output.

| Market Status | Decision Behavior |
|---|---|
| `documented` | No ACCEPT. Documentation only. |
| `candidate` | No ACCEPT. Data source under evaluation. |
| `active_testing` | WAIT or restricted test only. No full-size ACCEPT. |
| `restricted` | ACCEPT allowed only with reduced stake caps. |
| `approved` | ACCEPT allowed under normal risk caps. |
| `blocked` | REJECT. |
| `retired` | REJECT. |

Decision rule:

```txt
model edge without market validation = WAIT or REJECT
```

Market approval must check:

```txt
market status
activation gate
sample size
avg CLV
CLV hit rate
closing reference quality
liquidity tier
stale-line risk
risk exposure
```

---

## 11. CSV Import Rules

CSV import is mandatory for MVP because historical ledger analysis is an early value path.

### Required columns for ledger import

```txt
placedAt
sport
league
market
selection
bookmaker
entryOddsDecimal
stakeUnits
status
```

### Strongly recommended columns

```txt
modelProbability
closingOddsDecimal
closingOddsSource
closingOddsCollectedAt
profitLossUnits
settledAt
modelVersionId
```

### Invalid row handling

```txt
Import should be partial-success.
Valid rows are imported.
Invalid rows are rejected with row-level errors.
No silent coercion.
No invalid odds or missing stake rows.
```

### Imported data classification

```txt
recordSource = csv_import
decisionSource = csv_import
```

### Market approval eligibility

CSV rows are eligible for market approval only if they contain verified:

```txt
entry odds
closing odds
model probability
settlement
stake
market
bookmaker
placed timestamp
```

Rows missing those fields are excluded from approval calculations.

---

## 12. Execution Transaction Boundary

Execution must be atomic.

`POST /api/executions` must complete as one transaction or fail safely.

Required transaction operations:

```txt
1. Verify user and plan.
2. Load decision record.
3. Verify decision is ACCEPT and not expired.
4. Re-check market status and risk state.
5. Check idempotency key.
6. Create entry market snapshot if not already linked.
7. Create bet ledger record.
8. Update bankroll open exposure.
9. Initialize CLV tracking state.
10. Write audit event.
```

Failure rule:

```txt
No partial execution is allowed.
```

Duplicate rule:

```txt
Same idempotency key must return the existing execution result, not create a second bet.
```

---

## 13. Settlement Transaction Boundary

Settlement must be atomic.

`PATCH /api/bets/:betId/settle` must:

```txt
1. Verify user and ownership.
2. Verify bet is pending.
3. Validate settlement status.
4. Calculate or validate profitLossUnits.
5. Release open exposure.
6. Update current bankroll.
7. Set bet status.
8. Set settledAt.
9. Write audit event.
```

Settlement statuses:

```txt
won
lost
void
cashed_out
```

Rules:

```txt
won requires profitLossUnits > 0
lost requires profitLossUnits <= 0
void requires profitLossUnits = 0
cashed_out requires explicit profitLossUnits
```

---

## 14. QA Fixture Lock

Canonical test fixtures must exist before endpoint implementation.

### Decision fixtures

```txt
positive_edge_accepted
negative_edge_rejected
confidence_too_low_wait
market_under_validation_wait
market_blocked_reject
stale_price_wait
```

### Risk fixtures

```txt
risk_cap_reduces_stake
max_per_bet_rejects_or_caps
max_daily_risk_reached_reject
max_open_exposure_reached_reject
negative_bankroll_rejected
invalid_kelly_multiplier_rejected
```

### Ledger fixtures

```txt
manual_bet_creates_audit_event
system_decision_creates_ledger_entry
csv_import_valid_rows_inserted
csv_import_invalid_rows_rejected
imported_unverified_rows_excluded_from_market_approval
```

### CLV fixtures

```txt
positive_clv_beat_close_true
negative_clv_beat_close_false
missing_closing_snapshot_rejected
missing_entry_snapshot_rejected
```

### Security fixtures

```txt
client_cannot_read_other_client_bets
project_manager_cannot_override_plan
free_cannot_evaluate_decision
pro_cannot_execute_sharp_decision
sharp_can_execute_own_accepted_decision
admin_can_override_market_status
```

### Idempotency fixtures

```txt
duplicate_execution_key_returns_existing_result
duplicate_execution_does_not_create_second_bet
```

---

## 15. Final PRD Correction Lock

The PRD is fixed only when the following are true:

```txt
[x] Execution Flow is P0.
[x] Every bet has decisionSource and recordSource.
[x] CLV formula is canonical and mandatory.
[x] Percentage and probability units are locked.
[x] PRO / SHARP / INFRA boundaries are server-enforceable.
[x] Endpoint-by-plan access is defined.
[x] Endpoint-by-role access is defined.
[x] Market status directly controls ACCEPT / WAIT / REJECT behavior.
[x] CSV import rules are defined.
[x] Execution and settlement transaction boundaries are defined.
[x] QA fixtures are defined before implementation.
```

After this correction set is reflected in the main planning docs, implementation may proceed with:

```txt
Milestone 2 — Firebase Server Auth
```
