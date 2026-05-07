# DOCTORE AI — tasks.md

## Build Principle

Start from the system of record.

Do not start from dashboards, visual polish, automation, social features, or model complexity.

Canonical build order:

Ledger
→ snapshots
→ model price
→ risk sizing
→ CLV
→ market approval
→ decision-only UI

---

# Milestone 0 — Project Lock

## Tasks

- [ ] Commit `spec.md`
- [ ] Commit `tasks.md`
- [ ] Lock pricing:
  - PRO: 49€/month
  - SHARP: 199€/month
  - INFRA: custom / 1000€+
- [ ] Decide which plan the Stripe link maps to
- [ ] Lock MVP sport scope:
  - MLB first
  - Football documented only
  - KBO later
- [ ] Lock MVP model scope:
  - manual model probability input
  - model version logging
  - no retraining UI
  - no public betting percentage dependency

## Definition of Done

- No conflicting pricing exists
- No unclear MVP scope remains
- No implementation starts before data ownership and flows are clear

---

# Milestone 1 — Domain Contracts

## Goal

Define all persisted data structures and request/response contracts before building endpoints.

## Tasks

- [ ] Create `User` contract
- [ ] Create `BankrollState` contract
- [ ] Create `Bet` contract
- [ ] Create `MarketSnapshot` contract
- [ ] Create `ModelPrediction` contract
- [ ] Create `DecisionRecord` contract
- [ ] Create `ClvRecord` contract
- [ ] Create `MarketProfile` contract
- [ ] Create `AuditEvent` contract
- [ ] Define enums:
  - role
  - plan
  - sport
  - league
  - market
  - bet status
  - snapshot phase
  - decision state
  - decision reason
- [ ] Separate persistence models from DTOs where needed

## Definition of Done

- All collections have a typed contract
- All endpoint payloads have a planned DTO
- No `any` is required for domain data

---

# Milestone 2 — Firebase Server Auth

## Goal

Create the server-side access layer.

## Tasks

- [ ] Configure Firebase Admin server-only initialization
- [ ] Create session cookie verification helper
- [ ] Parse custom claims:
  - role
  - plan
  - assignedManagerId
- [ ] Create `requireAppUser`
- [ ] Create `assertRole`
- [ ] Create `assertPlan`
- [ ] Create error mapping:
  - `UNAUTHORIZED`
  - `FORBIDDEN`
  - `PLAN_REQUIRED`
- [ ] Add baseline Firestore security rules
- [ ] Block protected client-side Firestore reads/writes

## Definition of Done

- Protected endpoints can verify identity
- Role and plan checks are server-side
- UI visibility is not treated as security

---

# Milestone 3 — Firestore Server Repositories

## Goal

Centralize all protected database access server-side.

## Tasks

- [ ] Create `bets` repository
- [ ] Create `bankrollStates` repository
- [ ] Create `marketSnapshots` repository
- [ ] Create `modelPredictions` repository
- [ ] Create `decisionRecords` repository
- [ ] Create `clvRecords` repository
- [ ] Create `marketProfiles` repository
- [ ] Create `auditEvents` repository
- [ ] Add pagination support for bet ledger
- [ ] Add user ownership filters
- [ ] Add server timestamp handling
- [ ] Add transaction support for execution flow

## Definition of Done

- No protected Firestore operation is performed from a Client Component
- All reads/writes go through server repositories
- Execution-critical writes can run transactionally

---

# Milestone 4 — Betting Math Core

## Goal

Implement deterministic, tested betting math.

## Tasks

- [ ] Implement implied probability calculation
- [ ] Implement fair odds calculation
- [ ] Implement edge calculation
- [ ] Implement Kelly fraction calculation
- [ ] Implement Fractional Kelly cap
- [ ] Implement max risk per bet cap
- [ ] Implement max daily risk cap
- [ ] Implement max open exposure cap
- [ ] Implement CLV calculation
- [ ] Implement market approval calculation
- [ ] Add unit tests for all functions

## Definition of Done

- UI does not calculate betting math
- All formulas are server-safe and deterministic
- Edge, Kelly, and CLV behavior is unit-tested

---

# Milestone 5 — Bankroll System

## Goal

Make bankroll and exposure state reliable before execution.

## Tasks

- [ ] Create `GET /api/bankroll`
- [ ] Create `PATCH /api/bankroll`
- [ ] Initialize default bankroll state
- [ ] Validate risk config changes
- [ ] Audit bankroll changes
- [ ] Track open exposure
- [ ] Track daily risk used
- [ ] Release exposure on settlement
- [ ] Prevent invalid risk config:
  - negative bankroll
  - Kelly multiplier above allowed cap
  - max risk per bet above system limit

## Definition of Done

- User has a valid bankroll state
- Risk config changes are audited
- Open exposure can be derived from active bets

---

# Milestone 6 — Bet Ledger

## Goal

Allow a user to log a bet with all required pricing and risk fields.

## Tasks

- [ ] Create `POST /api/bets`
- [ ] Create `GET /api/bets`
- [ ] Create `GET /api/bets/:betId`
- [ ] Create `PATCH /api/bets/:betId/settle`
- [ ] Validate required bet fields:
  - sport
  - league
  - market
  - selection
  - bookmaker
  - entry odds
  - stake
  - model probability
  - placed timestamp
- [ ] Calculate fair odds on creation
- [ ] Calculate edge on creation
- [ ] Link bet to decision record where applicable
- [ ] Create audit event for manual bet creation
- [ ] Support paginated ledger reads

## Definition of Done

- A user can log a bet
- Bet includes odds, stake, market, model probability, and timestamp
- Bet is stored server-side only
- Invalid bet payloads are rejected

---

# Milestone 7 — Market Snapshots

## Goal

Create auditable entry and closing price records.

## Tasks

- [ ] Create `POST /api/market-snapshots`
- [ ] Support snapshot phases:
  - open
  - entry
  - close
  - intermediate
- [ ] Calculate implied probability for each snapshot
- [ ] Link entry snapshot to bet
- [ ] Link closing snapshot to bet
- [ ] Store source/bookmaker
- [ ] Add validation for odds format
- [ ] Add snapshot audit metadata

## Definition of Done

- Every bet can have an entry snapshot
- Every bet can later receive a close snapshot
- Entry and close prices are independently reconstructable

---

# Milestone 8 — Decision Evaluation

## Goal

Return ACCEPT / REJECT / WAIT from controlled server logic.

## Tasks

- [ ] Create `POST /api/decisions/evaluate`
- [ ] Validate input:
  - game
  - market
  - selection
  - bookmaker
  - odds
  - model probability
  - confidence score
- [ ] Load bankroll state
- [ ] Load market profile
- [ ] Calculate implied probability
- [ ] Calculate fair odds
- [ ] Calculate edge
- [ ] Calculate Fractional Kelly stake
- [ ] Check exposure limits
- [ ] Check confidence threshold
- [ ] Check market approval status
- [ ] Return:
  - decision
  - edge
  - confidence
  - risk
  - stake
  - reasons
  - expiry
- [ ] Write decision record

## Definition of Done

- Endpoint returns only ACCEPT, REJECT, or WAIT
- Every decision has reasons
- Every accepted decision has stake sizing
- Decision is persisted for audit

---

# Milestone 9 — Execution Flow

## Goal

Convert an accepted decision into a ledger entry safely.

## Tasks

- [ ] Create `POST /api/executions`
- [ ] Validate decision exists
- [ ] Validate decision has not expired
- [ ] Re-check risk before execution
- [ ] Re-check duplicate execution key
- [ ] Create bet record
- [ ] Create entry snapshot
- [ ] Update bankroll exposure
- [ ] Initialize CLV tracking
- [ ] Write audit event
- [ ] Return execution result

## Definition of Done

- Duplicate execution requests cannot create duplicate bets
- Bet creation and exposure update are transaction-safe
- Execution is auditable

---

# Milestone 10 — CLV Engine

## Goal

Measure whether execution beat the closing market.

## Tasks

- [ ] Create `POST /api/clv/calculate`
- [ ] Accept closing odds input
- [ ] Validate bet exists
- [ ] Validate entry odds exist
- [ ] Create closing snapshot if needed
- [ ] Calculate entry implied probability
- [ ] Calculate closing implied probability
- [ ] Calculate CLV %
- [ ] Determine `beatClose`
- [ ] Create CLV record
- [ ] Link CLV record to bet
- [ ] Trigger or queue market profile recalculation

## Definition of Done

- Every completed bet can receive CLV
- CLV is stored as first-class data
- CLV is not treated as secondary analytics

---

# Milestone 11 — Market Profile Recalculation

## Goal

Approve or reject markets using realized evidence.

## Tasks

- [ ] Create segment key generator
- [ ] Define segment dimensions:
  - sport
  - league
  - market
  - bookmaker
  - favorite/underdog
  - odds bucket
  - confidence bucket
  - model version
- [ ] Aggregate:
  - sample size
  - bet count
  - avg CLV
  - CLV hit rate
  - ROI
  - win rate
  - profit/loss
- [ ] Apply early approval rule
- [ ] Apply rejection reasons
- [ ] Create `POST /api/market-profiles/recalculate`
- [ ] Create `GET /api/market-profiles`
- [ ] Audit manual overrides

## Definition of Done

- Market segments can be approved or blocked
- Approval does not rely on ROI alone
- Negative CLV markets can be rejected

---

# Milestone 12 — CLV Analytics

## Goal

Expose process-quality metrics without creating dashboard clutter.

## Tasks

- [ ] Create `GET /api/clv/summary`
- [ ] Return:
  - average CLV
  - CLV hit rate
  - CLV by market
  - CLV by bookmaker
  - CLV by model version
  - CLV by odds bucket
- [ ] Add bounded query ranges
- [ ] Add pagination or aggregation guardrails
- [ ] Avoid raw unbounded analytics reads

## Definition of Done

- User can evaluate process quality
- CLV is visible as core product metric
- Analytics queries are bounded and performant

---

# Milestone 13 — Minimal App Shell

## Goal

Create the protected product shell.

## Tasks

- [ ] Create app shell layout
- [ ] Add sidebar navigation:
  - Dashboard
  - Opportunities
  - Bet Journal
  - Risk
  - CLV Analytics
  - Models
  - Settings
- [ ] Add server-side auth gate
- [ ] Add plan-aware UI state
- [ ] Add empty states
- [ ] Add loading states
- [ ] Add error states

## Definition of Done

- Authenticated user can access app shell
- Unauthorized users are blocked
- Plan limitations are shown as system state, not sales pressure

---

# Milestone 14 — Decision UI

## Goal

Expose only actionable decisions.

## Tasks

- [ ] Create Decision Card component
- [ ] Support ACCEPT state
- [ ] Support REJECT state
- [ ] Support WAIT state
- [ ] Show:
  - edge
  - confidence
  - risk
  - stake
  - reason labels
- [ ] Enforce maximum 3 visible decisions
- [ ] Hide or defer lower-ranked opportunities
- [ ] Avoid raw comparison tables
- [ ] Avoid sportsbook-style UI

## Definition of Done

- User never needs to calculate
- User never scans raw odds tables to decide
- UI shows only actionable decisions

---

# Milestone 15 — Bet Journal UI

## Goal

Provide ledger visibility without turning the product into a spreadsheet.

## Tasks

- [ ] Create Bet Journal page
- [ ] Add manual bet form
- [ ] Add bet history list
- [ ] Add status labels:
  - pending
  - won
  - lost
  - void
- [ ] Add CLV status indicator
- [ ] Add export placeholder
- [ ] Add import placeholder
- [ ] Avoid table-first decision UI

## Definition of Done

- User can log and review bets
- Ledger supports operational review
- Decision flow remains separate from history review

---

# Milestone 16 — Risk UI

## Goal

Make exposure visible and controlled.

## Tasks

- [ ] Create Risk page
- [ ] Show current bankroll
- [ ] Show open exposure
- [ ] Show daily risk used
- [ ] Show remaining risk capacity
- [ ] Show active exposure by market
- [ ] Show risk config
- [ ] Allow SHARP users to adjust risk config
- [ ] Audit risk config updates

## Definition of Done

- Risk visibility is system-wide
- Risk config is protected by plan and audit logging
- Exposure limits are understandable without manual calculation

---

# Milestone 17 — Landing Page

## Goal

Position the product correctly before acquisition starts.

## Tasks

- [ ] Create landing page
- [ ] Add hero section
- [ ] Add real dashboard preview
- [ ] Add problem section
- [ ] Add system workflow:
  - Ledger import
  - Odds normalization
  - Model probability
  - Betting math
  - Risk sizing
  - CLV tracking
  - Market validation
- [ ] Add feature validation section
- [ ] Add PRO vs SHARP comparison
- [ ] Add INFRA as custom/future tier if needed
- [ ] Add neutral CTA
- [ ] Add Stripe CTA
- [ ] Remove picks-selling language
- [ ] Remove hype language

## Definition of Done

- Landing positions Doctore as infrastructure
- No sportsbook/casino framing exists
- Pricing is synced with `/pricing`

---

# Milestone 18 — SEO + Metadata

## Goal

Make the landing page indexable and correctly described.

## Tasks

- [ ] Add metadata title
- [ ] Add metadata description
- [ ] Add canonical URL
- [ ] Add Open Graph title
- [ ] Add Open Graph description
- [ ] Add Open Graph image
- [ ] Add Twitter card metadata
- [ ] Ensure one clear H1
- [ ] Use semantic sections

## Definition of Done

- Landing page has production-ready metadata
- SEO language matches product positioning
- No conflicting product category appears

---

# Milestone 19 — Pricing Page Sync

## Goal

Remove pricing and plan ambiguity.

## Tasks

- [ ] Create or update `/pricing`
- [ ] Sync plan names with landing
- [ ] Sync PRO price
- [ ] Sync SHARP price
- [ ] Define INFRA as custom / future
- [ ] Attach correct Stripe link
- [ ] Remove `149€–499€` unless used as explicit custom add-on range
- [ ] Avoid “upgrade now” language
- [ ] Use system-state phrasing:
  - PRO keeps the filter active
  - SHARP controls exposure
  - Sizing unavailable
  - Exposure layer inactive

## Definition of Done

- Landing and pricing do not contradict each other
- Stripe mapping is clear
- Plan limitations are framed as system state

---

# Milestone 20 — Phase 1 Validation

## Goal

Confirm the product works as audited betting infrastructure.

## Tasks

- [ ] Create test dataset of 100 manual bets
- [ ] Log all 100 bets through the ledger
- [ ] Attach entry odds
- [ ] Attach model probabilities
- [ ] Calculate edge
- [ ] Calculate Kelly sizing
- [ ] Settle bets
- [ ] Attach closing odds
- [ ] Calculate CLV
- [ ] Recalculate market profiles
- [ ] Confirm no direct Firestore protected writes from client
- [ ] Confirm user never calculates manually

## Definition of Done

- 100+ bets can be processed end-to-end
- CLV can be calculated at bet and market level
- Risk sizing is enforced server-side
- Market approval can block weak segments
- UI remains decision-first
