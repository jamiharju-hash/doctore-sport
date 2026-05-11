# DOCTORE AI — Problem, Requirements & Prioritization

**Document:** `docs/problem-requirements-prioritization.md`  
**Status:** Phase 1 planning baseline  
**Purpose:** Define the core problem, collect product and technical requirements, and prioritize implementation based on impact and effort.

---

## 1. Problem Definition

### Core Problem

Most betting tools help users place more bets.

DOCTORE AI must do the opposite.

```txt
The user is exposed to too many betting decisions, weak pricing signals, emotional staking, and post-result bias.
```

The product must reduce this into a controlled execution system where every decision is:

```txt
logged
priced
risk-sized
validated by CLV
auditable
reduced to ACCEPT / REJECT / WAIT
```

### Problem Statement

```txt
Model-driven bettors lack a reliable operating system for turning probabilities into disciplined execution.

They may have odds, predictions, spreadsheets, and bet history, but they do not have a controlled system that enforces price quality, bankroll risk, CLV validation, and market approval before capital is committed.
```

### Consequence

Without DOCTORE AI, the user is likely to suffer from:

```txt
manual spreadsheet drift
untracked execution quality
oversized bets
false confidence from short-term P/L
weak CLV visibility
unvalidated market expansion
decision overload
inconsistent staking discipline
```

### Product Response

DOCTORE AI must behave as:

```txt
Betting Operations System
Controlled exposure engine
Probabilistic execution system
CLV-first process quality layer
```

Not as:

```txt
tipster app
pick feed
sportsbook UI
social betting product
manual odds comparison table
```

---

## 2. User Definition

### Primary User

```txt
Disciplined bettor / sharp bettor / model-driven operator treating sports markets like financial markets.
```

### User Job

```txt
Help me avoid bad betting exposure before capital is committed.
```

### User Questions

The product must answer:

```txt
Is this price inefficient?
Is this market approved?
How much should I risk?
Did I beat the closing line?
Which market segments should be blocked?
Is my process improving?
```

The product must not force the user to answer:

```txt
Which table row should I compare?
What is the implied probability?
How much should I stake manually?
Was this loss bad process or variance?
Which markets should I trust?
```

---

## 3. Requirement Collection

## 3.1 Product Requirements

### P0 — Must Have

```txt
User can log a bet.
Bet includes odds, stake, market, model probability, and timestamp.
System calculates implied probability.
System calculates fair odds.
System calculates edge.
System calculates Kelly fraction.
System applies Fractional Kelly cap.
System updates bankroll state.
System creates entry market snapshot.
System can attach closing market snapshot.
System calculates CLV.
System writes decision records.
System can approve or block market segments.
User sees ACCEPT / REJECT / WAIT.
User never performs manual betting math.
```

### P1 — Should Have

```txt
CSV import/export.
Paginated bet ledger.
CLV summary by market.
CLV summary by bookmaker.
Risk exposure summary.
Decision reason labels.
Market profile recalculation.
Audit events for sensitive actions.
Plan-aware access control.
```

### P2 — Nice To Have Later

```txt
Live odds ingestion.
Line movement tracking.
Automated repricing.
Notification loop.
Cloud Run model inference.
Multi-sport expansion.
Advanced model comparison.
```

### Wrong Priority

```txt
social feed
leaderboard
public picks page
sportsbook-style bet slip
gamified streaks
raw market browsing
large comparison tables
full autobet before CLV proof
```

---

## 3.2 Technical Requirements

### P0 — Foundation

```txt
Next.js App Router
TypeScript
Zod validation
Firebase Auth
Firebase custom claims
Firebase Admin
Firestore server repositories
Server-side Route Handlers
No protected client-side Firestore access
```

### P0 — Data Contracts

```txt
User
BankrollState
Bet
MarketSnapshot
ModelPrediction
DecisionRecord
ClvRecord
MarketProfile
AuditEvent
```

### P0 — Server Behavior

```txt
Every endpoint validates request payloads.
Every protected endpoint verifies session.
Every protected endpoint checks role and plan where needed.
Every protected Firestore operation happens server-side.
Every execution-critical write is auditable.
Duplicate execution must not create duplicate bets.
```

### P0 — Calculation Behavior

```txt
Betting math must not live in UI components.
Formulas must be deterministic.
Invalid odds/probability input must fail safely.
Kelly stake must never become negative.
Risk caps must override raw Kelly.
CLV must be stored as first-class data.
```

---

## 3.3 UX Requirements

### P0 — Decision Interface

```txt
Show maximum 3 visible decisions.
Show ACCEPT / REJECT / WAIT first.
Show edge, confidence, risk, and reasons.
Do not show raw odds tables as the primary decision UI.
Do not require manual probability interpretation.
Do not use sportsbook language.
```

### P1 — Operational UI

```txt
Bet Journal for history review.
Risk page for exposure state.
CLV Analytics for process quality.
Models page for validation status.
Settings for risk configuration.
```

---

## 4. Prioritization Model

### Scoring

Impact:

```txt
5 = critical to product promise
4 = strongly supports retention / correctness
3 = useful but not core
2 = secondary improvement
1 = low leverage
```

Effort:

```txt
1 = small
2 = moderate
3 = medium
4 = large
5 = very large
```

Priority Score:

```txt
Impact / Effort
```

Interpretation:

```txt
>= 2.50 = build now
1.50–2.49 = build after core path
< 1.50 = defer
```

---

## 5. Impact / Effort Matrix

| Item | Impact | Effort | Score | Priority | Reason |
|---|---:|---:|---:|---|---|
| Domain contracts | 5 | 1 | 5.00 | P0 | Required before safe implementation. |
| Firebase server auth | 5 | 2 | 2.50 | P0 | Permissions must not rely on UI visibility. |
| Firestore server repositories | 5 | 3 | 1.67 | P0 | System of record requires server-only access. |
| Betting math core | 5 | 2 | 2.50 | P0 | Product cannot function without implied probability, edge, Kelly, CLV. |
| Bankroll system | 5 | 3 | 1.67 | P0 | Exposure control is core product value. |
| Bet ledger endpoints | 5 | 3 | 1.67 | P0 | No product without auditable bet log. |
| Market snapshots | 5 | 3 | 1.67 | P0 | CLV requires entry and close price records. |
| Decision evaluation endpoint | 5 | 3 | 1.67 | P0 | ACCEPT / REJECT / WAIT requires server-side decision logic. |
| Execution flow | 5 | 4 | 1.25 | P0 | Critical but should come after decision records and ledger. |
| CLV engine | 5 | 3 | 1.67 | P0 | Primary process-quality metric. |
| Market profile recalculation | 4 | 3 | 1.33 | P1 | Needed for market approval but depends on CLV data. |
| CLV analytics | 4 | 2 | 2.00 | P1 | High visibility value after CLV exists. |
| Minimal app shell | 3 | 2 | 1.50 | P1 | Needed for usage, but not before system of record. |
| Decision UI | 4 | 2 | 2.00 | P1 | Strong product value once decision API exists. |
| Bet Journal UI | 3 | 2 | 1.50 | P1 | Useful for review, not core calculation. |
| Risk UI | 3 | 2 | 1.50 | P1 | Important but depends on bankroll and risk API. |
| Landing page | 3 | 2 | 1.50 | P1 | Commercial value, but product foundation first. |
| SEO metadata | 2 | 1 | 2.00 | P1 | Low effort, useful when landing exists. |
| Pricing sync | 4 | 1 | 4.00 | P0 | Prevents commercial confusion. |
| Phase 1 validation dataset | 5 | 2 | 2.50 | P0 | Confirms end-to-end infrastructure works. |
| Live odds ingestion | 4 | 5 | 0.80 | P2 | Valuable later, too early before CLV proof. |
| Notifications | 3 | 4 | 0.75 | P2 | Needs reliable decision quality first. |
| Autobet | 5 | 5 | 1.00 | Defer | Too risky before CLV and risk enforcement. |
| Social / leaderboard | 1 | 3 | 0.33 | Reject | Conflicts with product doctrine. |

---

## 6. Prioritized Build Plan

## Build Now — P0

```txt
1. Domain contracts
2. Firebase server auth
3. Firestore server repositories
4. Betting math core
5. Bankroll system
6. Bet ledger endpoints
7. Market snapshot endpoints
8. Decision evaluation endpoint
9. CLV engine
10. Pricing sync
11. Phase 1 validation dataset
```

Reason:

```txt
These items create the system of record and enforce the product promise.
```

---

## Build Next — P1

```txt
1. Execution flow
2. Market profile recalculation
3. CLV analytics
4. Minimal app shell
5. Decision UI
6. Bet Journal UI
7. Risk UI
8. Landing page
9. SEO metadata
```

Reason:

```txt
These items expose the system safely after core logic exists.
```

---

## Defer — P2

```txt
1. Live odds ingestion
2. Repricing
3. Notifications
4. Cloud Run model inference
5. Multi-sport automation
6. Advanced model retraining
```

Reason:

```txt
These increase complexity before the ledger → risk → CLV path is proven.
```

---

## Reject / Do Not Build

```txt
social feed
leaderboard
picks marketplace
sportsbook-style bet slip
casino-style engagement loops
raw endless opportunity feed
```

Reason:

```txt
These increase action volume instead of reducing weak exposure.
```

---

## 7. Requirement Decisions

### Decision 1 — Start from system of record

```txt
Decision: Build ledger, snapshots, bankroll, decisions, CLV, and market profiles before dashboards.
Reason: If it cannot be reconstructed later, it cannot be trusted now.
```

### Decision 2 — Use Firebase enforcement

```txt
Decision: Enforce access through Firebase Auth, custom claims, Firestore rules, Firebase Admin, and Route Handlers.
Reason: UI visibility is not security.
```

### Decision 3 — Keep Phase 1 manual-first

```txt
Decision: Support manual bet logging and manual model probability input first.
Reason: Infrastructure validation matters more than model complexity.
```

### Decision 4 — Do not approve markets from prediction edge alone

```txt
Decision: Market approval requires CLV evidence.
Reason: Model edge without market validation equals WAIT or REJECT.
```

### Decision 5 — No autobet before proof

```txt
Decision: Automated execution is out of scope for Phase 1.
Reason: Autobet without CLV and risk enforcement creates capital risk.
```

---

## 8. Current Status

Completed:

```txt
Milestone 1 — Domain Contracts
```

Next:

```txt
Milestone 2 — Firebase Server Auth
```

Milestone 2 should create:

```txt
lib/server/firebase/admin.ts
lib/server/auth/app-user.ts
lib/server/auth/require-app-user.ts
lib/server/auth/assert-role.ts
lib/server/auth/assert-plan.ts
firestore.rules
.env.example
```

---

## 9. Final Priority Lock

```txt
The next highest-impact work is Firebase Server Auth.

Reason:
Domain contracts now exist, but no protected route should be built until identity, role, plan, and ownership enforcement are centralized.
```
