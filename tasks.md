# DOCTORE AI — Implementation Backlog

**Document:** `tasks.md`  
**Purpose:** Break `spec.md` into bite-sized implementation tasks.  
**Rule:** Complete planning, contracts, and server-side infrastructure before dashboard polish.

---

## 0. Build Order

Use this exact order:

```txt
1. spec.md
2. domain contracts
3. server auth helper
4. Firestore server repositories
5. calculation functions
6. bet ledger endpoints
7. bankroll endpoints
8. market snapshot endpoints
9. decision evaluate endpoint
10. CLV endpoint
11. market profile recalculation
12. minimal decision UI
13. ledger/admin review UI
14. landing/pricing sync
15. onboarding
```

Do not start from the dashboard.

Start from the system of record.

---

## Milestone 1 — Specification Lock

### Goal

Create the canonical planning baseline before implementation.

### Tasks

- [ ] Add `spec.md` to project root.
- [ ] Add `tasks.md` to project root.
- [ ] Lock product definition.
- [ ] Lock MVP scope.
- [ ] Lock plan names.
- [ ] Lock plan prices.
- [ ] Decide which plan the current Stripe link maps to.
- [ ] Confirm MVP sport scope.
- [ ] Confirm active MVP models.
- [ ] Mark dependent models inactive until required external feeds exist.

### Acceptance Criteria

- [ ] No conflicting plan prices.
- [ ] No unclear MVP scope.
- [ ] No implementation code exists before system boundaries are clear.
- [ ] Project language does not describe DOCTORE AI as a tipster app, pick feed, sportsbook, or social betting product.

---

## Milestone 2 — Project Structure Baseline

### Goal

Prepare the folder structure before domain implementation.

### Recommended Structure

```txt
app/
  api/
  (marketing)/
  (app)/
components/
  app/
  marketing/
  ui/
hooks/
lib/
  contracts/
  domain/
  server/
    auth/
    firebase/
    repositories/
    services/
  utils/
tests/
  unit/
  integration/
  e2e/
```

### Tasks

- [ ] Confirm Next.js App Router structure.
- [ ] Create `lib/contracts`.
- [ ] Create `lib/domain`.
- [ ] Create `lib/server`.
- [ ] Create `lib/server/auth`.
- [ ] Create `lib/server/firebase`.
- [ ] Create `lib/server/repositories`.
- [ ] Create `lib/server/services`.
- [ ] Create `tests/unit`.
- [ ] Create `tests/integration`.
- [ ] Create `tests/e2e`.

### Acceptance Criteria

- [ ] Domain logic has a dedicated location.
- [ ] Server-only logic has a dedicated location.
- [ ] UI components do not contain betting math.
- [ ] Page/layout shells do not contain domain logic.

---

## Milestone 3 — Domain Contracts

### Goal

Define all persisted and API-facing structures before repositories or endpoints.

### Tasks

- [ ] Define role contract.
- [ ] Define plan contract.
- [ ] Define user contract.
- [ ] Define bankroll state contract.
- [ ] Define bet contract.
- [ ] Define market snapshot contract.
- [ ] Define model prediction contract.
- [ ] Define decision record contract.
- [ ] Define CLV record contract.
- [ ] Define risk exposure contract.
- [ ] Define market profile contract.
- [ ] Define model version contract.
- [ ] Define audit event contract.
- [ ] Define request/response DTO conventions.
- [ ] Separate persistence models from DTOs where shapes differ.
- [ ] Add Zod schemas for persisted data.
- [ ] Add Zod schemas for API requests.
- [ ] Add Zod schemas for API responses where useful.

### Acceptance Criteria

- [ ] All persisted data structures are defined.
- [ ] DTOs are separated from persistence models where needed.
- [ ] No endpoint can accept unvalidated request data.
- [ ] No `any` types are used without explicit justification.

---

## Milestone 4 — Firebase Server Foundation

### Goal

Set up server-only Firebase access.

### Tasks

- [ ] Add Firebase Admin initialization module.
- [ ] Validate required Firebase Admin environment variables.
- [ ] Prevent Firebase Admin import from client code.
- [ ] Add typed Firestore instance export for server use.
- [ ] Add Firebase Auth Admin export.
- [ ] Document server-only import rules.

### Acceptance Criteria

- [ ] Firebase Admin is never imported in Client Components.
- [ ] Protected Firestore access is server-only.
- [ ] Environment variables are validated at startup or access time.
- [ ] Missing env configuration fails explicitly.

---

## Milestone 5 — Server Auth Helper

### Goal

Centralize role, plan, and session authorization.

### Tasks

- [ ] Implement session cookie verification helper.
- [ ] Parse Firebase custom claims.
- [ ] Validate role claim.
- [ ] Validate plan claim.
- [ ] Add `requireAppUser` helper.
- [ ] Add role guard.
- [ ] Add plan guard.
- [ ] Add ownership guard.
- [ ] Add authorization error mapping.
- [ ] Add tests for missing session.
- [ ] Add tests for invalid role.
- [ ] Add tests for insufficient plan.
- [ ] Add tests for insufficient role.

### Acceptance Criteria

- [ ] Every protected endpoint can verify user identity.
- [ ] Every protected endpoint can enforce role.
- [ ] Every protected endpoint can enforce plan.
- [ ] UI visibility is not treated as authorization.

---

## Milestone 6 — Firestore Security Rules Baseline

### Goal

Block unauthorized direct client access.

### Tasks

- [ ] Write baseline Firestore rules.
- [ ] Allow users to read only permitted own data where appropriate.
- [ ] Block direct writes to protected collections.
- [ ] Restrict admin-only collections.
- [ ] Restrict project manager permissions.
- [ ] Add rules tests if emulator is configured.
- [ ] Document that protected data must go through API endpoints.

### Protected Collections

```txt
bets
bankrollStates
marketSnapshots
modelPredictions
decisionRecords
clvRecords
riskExposure
marketProfiles
auditEvents
systemConfigs
```

### Acceptance Criteria

- [ ] Client cannot directly write protected betting data.
- [ ] Client cannot read another user’s protected data.
- [ ] Admin-only data is not accessible to non-admin users.
- [ ] Firestore rules match server authorization assumptions.

---

## Milestone 7 — Calculation Functions

### Goal

Create deterministic betting math.

### Tasks

- [ ] Implement implied probability calculation.
- [ ] Implement fair odds calculation.
- [ ] Implement edge calculation.
- [ ] Implement Kelly fraction calculation.
- [ ] Implement Fractional Kelly cap.
- [ ] Implement CLV calculation.
- [ ] Implement market approval rule.
- [ ] Implement risk-cap decision helper.
- [ ] Add rounding policy.
- [ ] Add invalid-input behavior.
- [ ] Add unit tests for normal cases.
- [ ] Add unit tests for boundary cases.
- [ ] Add unit tests for invalid odds.
- [ ] Add unit tests for invalid probability.
- [ ] Add unit tests for risk caps.

### Acceptance Criteria

- [ ] All betting math has unit tests.
- [ ] No UI performs betting math.
- [ ] All functions are deterministic.
- [ ] All invalid inputs fail safely.
- [ ] Kelly output cannot produce negative stake.

---

## Milestone 8 — Firestore Server Repositories

### Goal

Create server-only persistence access.

### Repositories

- [ ] Users repository.
- [ ] Bankroll repository.
- [ ] Bets repository.
- [ ] Market snapshots repository.
- [ ] Model predictions repository.
- [ ] Decision records repository.
- [ ] CLV records repository.
- [ ] Risk exposure repository.
- [ ] Market profiles repository.
- [ ] Model versions repository.
- [ ] Audit events repository.
- [ ] System configs repository.

### Required Repository Behavior

- [ ] Create record.
- [ ] Read by ID.
- [ ] Query by user ID where needed.
- [ ] Paginate lists.
- [ ] Validate persistence shape before write.
- [ ] Map Firestore data to domain model.
- [ ] Avoid unbounded queries.
- [ ] Add composite index notes where needed.

### Acceptance Criteria

- [ ] All protected Firestore reads/writes are server-side only.
- [ ] Repository functions do not accept unvalidated raw data.
- [ ] Repository functions return typed domain objects.
- [ ] Large lists are paginated or bounded.

---

## Milestone 9 — Audit Event Service

### Goal

Create append-only audit logging for sensitive operations.

### Tasks

- [ ] Define audit event types.
- [ ] Create audit event writer.
- [ ] Add audit events for bankroll config changes.
- [ ] Add audit events for role changes.
- [ ] Add audit events for plan changes.
- [ ] Add audit events for manual bet deletion or voiding.
- [ ] Add audit events for manual CLV override.
- [ ] Add audit events for model activation.
- [ ] Add audit events for market approval override.
- [ ] Add tests for audit event creation.

### Acceptance Criteria

- [ ] Sensitive changes are never silent.
- [ ] Audit events include entity type and entity ID.
- [ ] Audit events include before/after where relevant.
- [ ] Audit events are append-only.

---

## Milestone 10 — Bankroll Service

### Goal

Manage bankroll state and exposure safely.

### Tasks

- [ ] Create default bankroll state initializer.
- [ ] Read current bankroll.
- [ ] Update bankroll configuration.
- [ ] Apply open bet exposure.
- [ ] Release exposure on settlement.
- [ ] Track daily risk used.
- [ ] Track open exposure.
- [ ] Validate max risk per bet.
- [ ] Validate max daily risk.
- [ ] Validate max open exposure.
- [ ] Audit bankroll config changes.
- [ ] Add tests for exposure increase.
- [ ] Add tests for exposure release.
- [ ] Add tests for daily cap reached.
- [ ] Add tests for open exposure cap reached.

### Acceptance Criteria

- [ ] Bankroll state is always consistent with open exposure.
- [ ] Risk config changes are audited.
- [ ] Exposure cannot exceed configured caps.
- [ ] Bankroll updates are server-side only.

---

## Milestone 11 — Bet Ledger Endpoints

### Goal

Allow a user to log and read bets.

### Endpoints

- [ ] `GET /api/bets`
- [ ] `POST /api/bets`
- [ ] `GET /api/bets/:betId`
- [ ] `PATCH /api/bets/:betId/settle`
- [ ] `POST /api/bets/import`
- [ ] `GET /api/bets/export`

### Required Create-Bet Fields

```txt
odds
stake
market
selection
bookmaker
model probability
timestamp
```

### Tasks

- [ ] Validate request with Zod.
- [ ] Verify session.
- [ ] Verify plan access.
- [ ] Calculate implied probability.
- [ ] Calculate fair odds.
- [ ] Calculate edge.
- [ ] Create entry snapshot.
- [ ] Create bet record.
- [ ] Update exposure.
- [ ] Create audit event.
- [ ] Return DTO.
- [ ] Add integration tests.

### Acceptance Criteria

- [ ] A user can log a bet.
- [ ] Bet includes odds, stake, market, model probability, and timestamp.
- [ ] Bet is persisted server-side.
- [ ] Invalid bet request is rejected.
- [ ] Created bet is visible in Bet Journal.

---

## Milestone 12 — Market Snapshot Endpoints

### Goal

Store odds at open, entry, close, and intermediate phases.

### Endpoints

- [ ] `POST /api/market-snapshots`
- [ ] `GET /api/market-snapshots/:snapshotId`
- [ ] `POST /api/bets/:betId/closing-snapshot`

### Tasks

- [ ] Validate snapshot request.
- [ ] Normalize bookmaker name.
- [ ] Normalize odds format to decimal odds.
- [ ] Calculate implied probability.
- [ ] Store source.
- [ ] Store collected timestamp.
- [ ] Link entry snapshot to bet.
- [ ] Link closing snapshot to bet.
- [ ] Add tests for snapshot creation.
- [ ] Add tests for close snapshot linkage.

### Acceptance Criteria

- [ ] Every bet can be tied to entry market state.
- [ ] Every completed bet can later be tied to closing market state.
- [ ] Snapshot phase is explicit.
- [ ] Odds are normalized before persistence.

---

## Milestone 13 — Decision Evaluation Endpoint

### Goal

Return `ACCEPT`, `REJECT`, or `WAIT` from validated inputs.

### Endpoint

- [ ] `POST /api/decisions/evaluate`

### Tasks

- [ ] Validate request with Zod.
- [ ] Verify session.
- [ ] Load bankroll state.
- [ ] Load market profile.
- [ ] Load or receive model prediction.
- [ ] Calculate market implied probability.
- [ ] Calculate fair odds.
- [ ] Calculate edge.
- [ ] Check minimum edge threshold.
- [ ] Check confidence threshold.
- [ ] Check market approval.
- [ ] Check risk exposure.
- [ ] Calculate Kelly stake.
- [ ] Apply Fractional Kelly cap.
- [ ] Generate decision reasons.
- [ ] Write decision record.
- [ ] Return decision DTO.
- [ ] Add unit tests for decision branches.
- [ ] Add integration tests for endpoint.

### Acceptance Criteria

- [ ] Endpoint returns only `ACCEPT`, `REJECT`, or `WAIT`.
- [ ] Every response includes reasons.
- [ ] Every accepted response includes stake sizing.
- [ ] Every decision is auditable.
- [ ] No frontend math is required.

---

## Milestone 14 — Execution Endpoint

### Goal

Convert an accepted decision into an immutable bet ledger entry.

### Endpoint

- [ ] `POST /api/executions`

### Tasks

- [ ] Validate execution request.
- [ ] Verify session.
- [ ] Load decision record.
- [ ] Verify decision is still active.
- [ ] Verify decision belongs to user.
- [ ] Verify decision state is `ACCEPT`.
- [ ] Re-run risk validation.
- [ ] Require idempotency key.
- [ ] Prevent duplicate execution.
- [ ] Create bet record.
- [ ] Link entry snapshot.
- [ ] Update bankroll exposure.
- [ ] Initialize CLV tracking placeholder.
- [ ] Write audit event.
- [ ] Return execution result.
- [ ] Add duplicate execution tests.
- [ ] Add risk revalidation tests.

### Acceptance Criteria

- [ ] Duplicate execution requests do not create duplicate bets.
- [ ] Expired decisions cannot be executed.
- [ ] Rejected or wait decisions cannot be executed.
- [ ] Execution updates ledger and exposure atomically where possible.

---

## Milestone 15 — CLV Endpoint

### Goal

Calculate and store closing-line value.

### Endpoints

- [ ] `POST /api/clv/calculate`
- [ ] `GET /api/clv/summary`

### Tasks

- [ ] Validate closing odds input.
- [ ] Load bet.
- [ ] Load entry snapshot.
- [ ] Load or create closing snapshot.
- [ ] Calculate entry implied probability.
- [ ] Calculate closing implied probability.
- [ ] Calculate CLV percentage.
- [ ] Determine beat-close boolean.
- [ ] Write CLV record.
- [ ] Link CLV record to bet.
- [ ] Trigger market profile update or queue recalculation.
- [ ] Add tests for positive CLV.
- [ ] Add tests for negative CLV.
- [ ] Add tests for missing closing odds.
- [ ] Add tests for invalid bet status.

### Acceptance Criteria

- [ ] Every completed bet can receive CLV measurement.
- [ ] CLV is calculated from entry vs close.
- [ ] Bet-level CLV is persisted.
- [ ] CLV summary can be returned by user.

---

## Milestone 16 — Market Profile Recalculation

### Goal

Approve or reject market segments based on realized evidence.

### Endpoint

- [ ] `POST /api/market-profiles/recalculate`
- [ ] `GET /api/market-profiles`

### Tasks

- [ ] Create segment key generator.
- [ ] Aggregate bets by segment.
- [ ] Calculate sample size.
- [ ] Calculate average CLV.
- [ ] Calculate CLV hit rate.
- [ ] Calculate ROI.
- [ ] Calculate win rate.
- [ ] Calculate average edge.
- [ ] Calculate average odds.
- [ ] Apply early approval rule.
- [ ] Add rejection reason.
- [ ] Store market profile.
- [ ] Add tests for insufficient sample.
- [ ] Add tests for positive CLV approval.
- [ ] Add tests for negative CLV rejection.
- [ ] Add tests for ROI not overriding CLV.

### Acceptance Criteria

- [ ] Markets are not approved without sample size.
- [ ] Negative CLV markets are blocked.
- [ ] ROI alone cannot approve a market.
- [ ] Decision engine checks market approval before returning `ACCEPT`.

---

## Milestone 17 — Risk Exposure API

### Goal

Make current exposure visible system-wide.

### Endpoints

- [ ] `GET /api/risk`
- [ ] `PATCH /api/risk/config`

### Tasks

- [ ] Return current bankroll.
- [ ] Return open exposure.
- [ ] Return daily risk used.
- [ ] Return remaining risk capacity.
- [ ] Return max risk per bet.
- [ ] Return max daily risk.
- [ ] Return max open exposure.
- [ ] Return exposure by market.
- [ ] Return exposure by bookmaker.
- [ ] Audit risk config changes.
- [ ] Add authorization checks for SHARP-only features.

### Acceptance Criteria

- [ ] Risk visibility is accessible in app shell.
- [ ] Risk config is not editable without permission.
- [ ] SHARP features are gated server-side.
- [ ] Risk config updates are audited.

---

## Milestone 18 — Dashboard API

### Goal

Return bounded data for dashboard without raw market table clutter.

### Endpoint

- [ ] `GET /api/dashboard`

### Tasks

- [ ] Return top 3 actionable decisions.
- [ ] Return bankroll summary.
- [ ] Return exposure summary.
- [ ] Return CLV summary.
- [ ] Return recent ledger activity.
- [ ] Return blocked market warnings.
- [ ] Avoid returning raw unfiltered opportunities.
- [ ] Add tests for response shape.
- [ ] Add tests for plan-gated fields.

### Acceptance Criteria

- [ ] Dashboard API returns decision-ready data.
- [ ] Response is bounded.
- [ ] No raw unfiltered market feed is returned.
- [ ] Plan restrictions are enforced server-side.

---

## Milestone 19 — Minimal Decision UI

### Goal

Create a controlled decision interface.

### Components

- [ ] App shell.
- [ ] Sidebar navigation.
- [ ] Dashboard page.
- [ ] Decision card.
- [ ] Risk status strip.
- [ ] CLV summary card.
- [ ] Bet Journal preview.
- [ ] Manual bet form.
- [ ] Empty states.
- [ ] Error states.
- [ ] Loading states.

### Decision Card Requirements

- [ ] Show decision state.
- [ ] Show edge.
- [ ] Show confidence.
- [ ] Show risk.
- [ ] Show reasons.
- [ ] Show no more than 3 decisions.
- [ ] Do not show decorative icons.
- [ ] Do not require table scanning.
- [ ] Do not use sportsbook language.

### Acceptance Criteria

- [ ] User never needs to calculate.
- [ ] User never scans a raw table to decide.
- [ ] UI exposes only actionable decisions.
- [ ] Maximum visible decisions is 3.

---

## Milestone 20 — Bet Journal UI

### Goal

Allow user to review execution history without turning UI into clutter.

### Tasks

- [ ] Create Bet Journal page.
- [ ] Add paginated ledger list.
- [ ] Add bet detail view.
- [ ] Add manual bet logging form.
- [ ] Add settlement form.
- [ ] Add CSV import entry point.
- [ ] Add CSV export action.
- [ ] Show entry odds.
- [ ] Show closing odds where available.
- [ ] Show stake.
- [ ] Show model probability.
- [ ] Show CLV.
- [ ] Show P/L.
- [ ] Add filters by market, bookmaker, status.
- [ ] Keep default view minimal.

### Acceptance Criteria

- [ ] Bet history is available.
- [ ] Ledger is paginated.
- [ ] User can log a manual bet.
- [ ] User can settle a bet.
- [ ] Ledger does not become the primary decision interface.

---

## Milestone 21 — CLV Analytics UI

### Goal

Expose process quality, not emotional outcome review.

### Tasks

- [ ] Create CLV Analytics page.
- [ ] Show average CLV.
- [ ] Show CLV hit rate.
- [ ] Show CLV by market.
- [ ] Show CLV by bookmaker.
- [ ] Show CLV by model version.
- [ ] Show CLV by odds bucket.
- [ ] Show recent CLV records.
- [ ] Add warnings for negative CLV segments.
- [ ] Keep win rate secondary.
- [ ] Keep P/L secondary.

### Acceptance Criteria

- [ ] CLV is the primary process-quality metric.
- [ ] ROI is not presented as the primary validation signal.
- [ ] User can identify weak market segments.
- [ ] UI supports market rejection decisions.

---

## Milestone 22 — Models Page

### Goal

Expose model context without turning decision flow into analysis clutter.

### Tasks

- [ ] Create Models page.
- [ ] List active model versions.
- [ ] List inactive model versions.
- [ ] Show model type.
- [ ] Show sport.
- [ ] Show market coverage.
- [ ] Show validation status.
- [ ] Show data dependency warnings.
- [ ] Mark external-feed-dependent models inactive if feed missing.
- [ ] Show CLV by model version.
- [ ] Show sample size by model version.

### Acceptance Criteria

- [ ] Multiple model versions can coexist.
- [ ] User can see which models are active.
- [ ] Data dependency gaps are visible.
- [ ] Models do not clutter decision UI.

---

## Milestone 23 — Landing Page

### Goal

Create a conversion page consistent with product doctrine.

### Sections

- [ ] Hero.
- [ ] Dashboard preview.
- [ ] Problem definition.
- [ ] Ledger import → betting math workflow.
- [ ] Feature validation.
- [ ] PRO/SHARP/INFRA pricing.
- [ ] Stripe CTA.
- [ ] Dashboard CTA after settings verification.
- [ ] Final positioning section.

### Copy Rules

- [ ] No picks-selling language.
- [ ] No guaranteed win claims.
- [ ] No sportsbook framing.
- [ ] No casino aesthetics.
- [ ] No artificial urgency.
- [ ] Emphasize CLV, risk, execution, process quality.

### Acceptance Criteria

- [ ] Hero includes real dashboard UI preview.
- [ ] Pricing matches `/pricing`.
- [ ] CTA is neutral.
- [ ] Landing page explains what the system does with user input/import.
- [ ] Product is positioned as execution infrastructure.

---

## Milestone 24 — Pricing Page Sync

### Goal

Ensure pricing does not contradict landing page.

### Tasks

- [ ] Create or update `/pricing`.
- [ ] Sync PRO price.
- [ ] Sync SHARP price.
- [ ] Sync INFRA price.
- [ ] Remove conflicting `149€–499€/month` unless used as custom add-on range.
- [ ] Add clear feature comparison.
- [ ] Avoid upgrade-pressure language.
- [ ] Link Stripe checkout to correct plan.
- [ ] Add plan access rules to technical config.

### Acceptance Criteria

- [ ] No conflicting prices.
- [ ] No contradictory feature claims.
- [ ] Stripe link maps to one plan.
- [ ] Plan copy uses system-status framing, not hype.

---

## Milestone 25 — SEO Metadata

### Goal

Make the landing page indexable and technically correct.

### Tasks

- [ ] Add metadata title.
- [ ] Add metadata description.
- [ ] Add canonical URL.
- [ ] Add Open Graph title.
- [ ] Add Open Graph description.
- [ ] Add Open Graph image.
- [ ] Add Twitter card metadata.
- [ ] Use one clear H1.
- [ ] Use semantic page sections.
- [ ] Confirm no accidental `noindex`.

### Target Terms

```txt
professional betting infrastructure
sports betting execution system
CLV betting software
Kelly staking betting tool
bet journal with CLV tracking
```

### Acceptance Criteria

- [ ] Landing page has complete metadata.
- [ ] Canonical URL is set.
- [ ] Open Graph preview is controlled.
- [ ] Page is indexable.

---

## Milestone 26 — Onboarding

### Goal

Get the user from account creation to usable dashboard state.

### Tasks

- [ ] Confirm account settings.
- [ ] Set bankroll units.
- [ ] Set risk configuration defaults.
- [ ] Select plan.
- [ ] Verify plan access.
- [ ] Ask whether user wants manual ledger or CSV import.
- [ ] Import CSV if provided.
- [ ] Validate imported rows.
- [ ] Show import summary.
- [ ] Route user to Dashboard only after required settings exist.

### Required Settings

```txt
bankroll
max risk per bet
Kelly multiplier
preferred unit size
plan
```

### Acceptance Criteria

- [ ] User cannot enter execution flow without bankroll state.
- [ ] Invalid CSV rows are rejected with clear errors.
- [ ] Imported bets receive normalized odds.
- [ ] Imported bets can later receive CLV.

---

## Milestone 27 — CSV Import/Export

### Goal

Support ledger migration without compromising data quality.

### Tasks

- [ ] Define CSV import template.
- [ ] Define required columns.
- [ ] Define optional columns.
- [ ] Validate CSV headers.
- [ ] Validate odds.
- [ ] Validate stake.
- [ ] Validate market.
- [ ] Validate timestamp.
- [ ] Validate model probability if present.
- [ ] Normalize bookmaker names.
- [ ] Create row-level error report.
- [ ] Import valid rows.
- [ ] Reject invalid rows.
- [ ] Export ledger to CSV.

### Required CSV Columns

```txt
placedAt
sport
league
market
selection
bookmaker
entryOddsDecimal
stakeUnits
modelProbability
```

### Acceptance Criteria

- [ ] User can import valid ledger rows.
- [ ] User receives row-level errors for invalid rows.
- [ ] Import does not bypass validation.
- [ ] Export includes enough data for audit.

---

## Milestone 28 — Admin Review UI

### Goal

Give admin visibility without vanity dashboards.

### Tasks

- [ ] Create admin clients page.
- [ ] Create admin ledger review page.
- [ ] Create plan access review.
- [ ] Create audit event view.
- [ ] Create market override view.
- [ ] Create model activation view.
- [ ] Restrict access to admin role.
- [ ] Add tests for non-admin access denial.

### Acceptance Criteria

- [ ] Admin can review critical system integrity metrics.
- [ ] Admin can inspect audit events.
- [ ] Admin-only controls are server-gated.
- [ ] No operational clutter unless it affects revenue, activation, or system integrity.

---

## Milestone 29 — Test Coverage Pass

### Goal

Ensure core system behavior is protected before production deployment.

### Required Unit Tests

- [ ] Implied probability.
- [ ] Fair odds.
- [ ] Edge.
- [ ] Kelly fraction.
- [ ] Fractional Kelly cap.
- [ ] CLV.
- [ ] Market approval.
- [ ] Decision reasons.
- [ ] Risk caps.

### Required Integration Tests

- [ ] Manual bet creation.
- [ ] Bankroll update.
- [ ] Decision evaluation.
- [ ] Bet execution.
- [ ] Duplicate execution prevention.
- [ ] CLV record creation.
- [ ] Market profile recalculation.
- [ ] Role/plan authorization.

### Required E2E Tests

- [ ] User logs in.
- [ ] User configures bankroll.
- [ ] User logs manual bet.
- [ ] User sees bet in journal.
- [ ] System calculates risk.
- [ ] System creates decision.
- [ ] User accepts decision.
- [ ] Bet appears in ledger.
- [ ] CLV is calculated later.

### Security Tests

- [ ] Client cannot read another user’s bets.
- [ ] Client cannot write protected collections directly.
- [ ] Free user cannot access SHARP risk tools.
- [ ] Client cannot override CLV without admin role.
- [ ] Project manager cannot change payment status.

### Acceptance Criteria

- [ ] Tests cover all critical calculation branches.
- [ ] Tests cover role/plan restrictions.
- [ ] Tests cover duplicate execution prevention.
- [ ] Tests cover CLV and market approval.

---

## Milestone 30 — Production Readiness

### Goal

Prepare deployable Phase 1.

### Tasks

- [ ] Validate environment variables.
- [ ] Confirm Firebase project.
- [ ] Confirm Firestore indexes.
- [ ] Confirm Firestore rules.
- [ ] Confirm Vercel project settings.
- [ ] Confirm Cloud Run sidecar is not required for Phase 1 unless model inference is active.
- [ ] Confirm Stripe link.
- [ ] Confirm plan gates.
- [ ] Confirm SEO metadata.
- [ ] Run test suite.
- [ ] Run Playwright smoke tests.
- [ ] Review bundle size.
- [ ] Review server-only imports.
- [ ] Review protected routes.

### Acceptance Criteria

- [ ] Phase 1 can deploy without live autobet.
- [ ] No protected data is exposed client-side.
- [ ] No raw unfiltered feed appears in primary UI.
- [ ] No pricing conflicts exist.
- [ ] Core ledger → risk → CLV path works.

---

## Final Phase 1 Definition of Done

Phase 1 is complete only when:

```txt
A user can log a bet.
Bet includes odds, stake, market, model probability, and timestamp.
System calculates implied probability.
System calculates fair odds.
System calculates edge.
System calculates Kelly fraction.
System applies Fractional Kelly cap.
System updates bankroll state.
System creates market snapshots.
System calculates CLV.
System can approve or reject market segments.
User never needs to calculate.
User never scans a raw table to decide.
UI exposes only actionable decisions.
```

Out of scope until later:

```txt
automated betting
social feed
leaderboards
engagement loops
raw market table exploration
public betting feed dependent models
full model retraining console
```
