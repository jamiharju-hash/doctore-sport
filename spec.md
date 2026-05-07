# DOCTORE AI — Product & Technical Specification

**Document:** `spec.md`  
**Purpose:** Define DOCTORE AI before implementation.  
**Status:** Planning baseline  
**Build principle:** Plan first, code second.

---

## 0. Executive Summary

DOCTORE AI is not a betting app.

It is a controlled exposure system for sports betting markets.

It logs every decision, prices every market, measures closing-line quality, sizes risk through Fractional Kelly, approves only proven market segments, and presents the user with one action:

```txt
ACCEPT
REJECT
WAIT
```

Short positioning:

```txt
Betting infrastructure for disciplined execution.
```

Expanded positioning:

```txt
Doctore is execution infrastructure for sports betting markets, built around CLV validation, Kelly-based risk management, and structured decision workflows.

Most betting products optimize engagement.
Doctore optimizes process quality.
```

Primary build objective:

```txt
Ledger
→ snapshots
→ model price
→ risk sizing
→ CLV
→ market approval
→ decision-only UI
```

---

## 1. Product Doctrine

### 1.1 What DOCTORE AI Is

```txt
Trading infrastructure for sports markets.
A Betting Operations System.
A probabilistic execution system.
A controlled exposure engine.
A process-quality platform.
```

### 1.2 What DOCTORE AI Is Not

```txt
not a tipster app
not a sportsbook
not a pick feed
not a prediction marketplace
not a social betting network
not a gamified dashboard
not an odds comparison table
not an entertainment betting product
```

### 1.3 Core Principle

```txt
Filtering is more valuable than prediction volume.
```

Example system output:

```txt
127 available bets filtered to 4 valid executions.
```

or:

```txt
1000 raw betting options
→ 50 edges
→ 10 qualified bets
→ 3 optimal executions
```

### 1.4 Product Promise

The system exists to reduce weak exposure before capital is committed.

It does not create more action.

It removes bad action.

---

## 2. Problem Definition

### 2.1 Industry Flaw

Existing analytics tools, prediction sites, and tipster platforms often make the user worse.

They provide:

```txt
raw statistics
complex tables
endless picks
subjective confidence
short-term P/L screenshots
sportsbook-style urgency
```

This pushes the user into:

```txt
cognitive overload
overtrading
manual probability calculation
emotional staking
uncontrolled variance
poor bankroll protection
```

### 2.2 The Real Problem

Most bettors focus on predicting games.

Professional bettors focus on:

```txt
price
risk
execution
closing-line quality
portfolio exposure
market inefficiency
```

The market does not need more bets.

The market does not need more raw data tables.

The market needs infrastructure that prevents mathematically weak decisions before capital is committed.

### 2.3 Design Consequence

The interface must not ask the user to interpret large tables.

The system must compute:

```txt
implied probability
fair odds
edge
risk size
Kelly stake
exposure impact
CLV
market approval
```

The user should only decide:

```txt
ACCEPT
REJECT
WAIT
```

---

## 3. User & Market Analysis

### 3.1 Primary User

```txt
Disciplined bettor, sharp bettor, semi-professional operator, analyst, or model-driven bettor treating sports markets like financial markets.
```

### 3.2 Likely Acquisition Sources

```txt
Product Hunt
Twitter / X
referral
direct landing page
private betting communities
operator networks
```

### 3.3 User Mindset

The target user is not asking:

```txt
Who will win?
What is today’s best pick?
How many bets can I place?
```

The target user is asking:

```txt
Is this price inefficient?
Is this exposure justified?
How much should I risk?
Did I beat the closing market?
Which markets should I stop betting?
Is my process improving?
```

### 3.4 Core User Job

```txt
Help me avoid bad betting exposure before capital is committed.
```

### 3.5 Supporting User Jobs

```txt
Log every bet without spreadsheets.
Calculate implied probability automatically.
Calculate fair odds automatically.
Calculate edge automatically.
Generate Kelly-based stake sizing.
Track closing-line value.
Identify profitable market segments.
Reject unproven or overexposed markets.
Measure process quality, not short-term outcomes.
```

### 3.6 Customer Fit

| Segment | Fit | Reason |
|---|---:|---|
| Sharp bettor | High | Values CLV, pricing, bankroll discipline |
| Semi-pro bettor | High | Needs structure and execution control |
| Data-driven hobbyist | Medium | Useful, but may need education |
| Tipster follower | Low | Wants picks, not process |
| Sportsbook/casino user | Wrong | Entertainment-driven, not process-driven |

---

## 4. Product Positioning

### 4.1 Recommended Category

```txt
Betting Operations System
```

Secondary framing:

```txt
probabilistic execution system
sports market execution infrastructure
controlled exposure system
professional betting infrastructure
structured betting decision system
```

### 4.2 Best One-Liner

```txt
A trading-style operating system for disciplined sports betting execution.
```

### 4.3 Strong Landing Copy

```txt
Most bettors focus on predicting games.

Professional bettors focus on price, risk, and execution.
```

```txt
Doctore provides the infrastructure required to identify inefficiencies, manage variance, and measure execution quality.
```

```txt
Closing Line Value is the primary metric of edge quality.
```

```txt
Capital allocation is treated as a portfolio problem, not a betting decision.
```

### 4.4 Avoided Language

Do not use:

```txt
premium picks
guaranteed winners
beat the books
daily locks
best bets
hot picks
AI predictions that win
```

---

## 5. Landing Page Specification

### 5.1 Funnel

```txt
Landing
↓
Dashboard preview
↓
Feature validation
↓
Pricing
↓
Stripe checkout
↓
Onboarding
↓
Account settings verification
↓
Dashboard
```

### 5.2 Hero Section

Purpose: establish the category immediately.

Required content:

```txt
headline
subheadline
real dashboard UI preview
neutral CTA
secondary proof statement
```

Recommended headline:

```txt
Professional betting infrastructure for disciplined execution.
```

Recommended subheadline:

```txt
Doctore logs every decision, prices every market, measures CLV, controls exposure through Fractional Kelly, and filters raw betting options into actionable executions.
```

Neutral CTA options:

```txt
View Dashboard Preview
Continue to Dashboard
```

Use `Continue to Dashboard` only after account settings have been verified.

### 5.3 Problem Section

Core message:

```txt
The market does not need more bets.
It needs fewer bad decisions.
```

Supporting points:

```txt
Raw odds tables create overload.
Prediction feeds encourage action.
Short-term P/L hides poor process.
Uncontrolled staking destroys bankrolls.
```

### 5.4 Ledger Import → Betting Math Section

Required section:

```txt
Ledger import
↓
Odds normalization
↓
Model probability
↓
Betting math
↓
Risk sizing
↓
CLV tracking
↓
Market validation
```

Plain-language explanation:

```txt
When a user logs or imports a bet, Doctore converts odds into implied probability, compares market price against model probability, calculates edge, applies Fractional Kelly risk caps, stores the execution record, tracks closing odds, and validates whether the decision beat the market.
```

### 5.5 Dashboard Preview

The hero must include a real dashboard UI preview.

Preview should show:

```txt
ACCEPT / REJECT / WAIT card
edge %
confidence
risk units
reason labels
bankroll exposure
CLV status
```

Do not show a giant table in the hero.

### 5.6 Feature Validation Section

Structure features by system layer:

```txt
Bet Journal
Market Snapshots
Model Probability
Kelly Risk Control
CLV Validation
Market Approval
Decision UI
```

### 5.7 Pricing Section

Pricing must be synced between landing and `/pricing`.

Recommended plan lock:

| Plan | Price | Role |
|---|---:|---|
| PRO | 49€/month | Ledger, tracking, import/export, ROI/yield, manual execution |
| SHARP | 199€/month | CLV, Kelly sizing, market approval, exposure controls |
| INFRA | 1000€+/month | Automated odds infrastructure, realtime ingestion, custom integrations |

Avoid showing `149€–499€/month` unless explicitly positioned as custom add-ons.

### 5.8 Stripe Link

Current Stripe URL:

```txt
https://buy.stripe.com/28E14feK0gOp3ewfhS8ww0C
```

Decision required before production:

```txt
Map this link to exactly one plan.
```

Do not attach one Stripe checkout link to multiple pricing claims.

### 5.9 SEO Requirements

Landing page must include:

```txt
metadata title
metadata description
canonical URL
Open Graph title
Open Graph description
Open Graph image
Twitter card metadata
indexable page structure
clear H1
semantic sections
```

Target phrases:

```txt
professional betting infrastructure
sports betting execution system
CLV betting software
Kelly staking betting tool
bet journal with CLV tracking
```

---

## 6. Plan & Access Model

### 6.1 PRO — 49€/month

Included:

```txt
Unlimited bets
Bet history
CSV export/import
Multi-book logging
ROI tracking
Yield tracking
Manual bet journal
Basic bankroll state
Basic P/L reporting
```

Plan role:

```txt
Structured execution history and process tracking.
```

### 6.2 SHARP — 199€/month

Included:

```txt
Everything in PRO
CLV tracking
Kelly Criterion tools
Fractional Kelly cap
Risk exposure monitoring
Market segment tracking
Market approval / rejection
Warning flags
Bookmaker-level performance
Model-level performance
```

Plan role:

```txt
Risk-controlled execution and market validation.
```

### 6.3 INFRA — 1000€+/month

Included:

```txt
Realtime odds ingestion
Line movement tracking
Bookmaker discrepancy detection
Opening vs closing analysis
Automated market infrastructure
Custom data feeds
Private model deployment
Advanced portfolio analytics
```

Plan role:

```txt
Automated market infrastructure for serious operators.
```

---

## 7. Core Product Architecture

### 7.1 System Layers

```txt
1. Data Ingestion Layer
2. Market Intelligence Layer
3. Modeling Layer
4. Decision Engine Layer
5. Risk Engine Layer
6. Execution Layer
7. Tracking & Analytics Layer
8. Interface Layer
```

### 7.2 Core Loop

```txt
Model
→ Market
→ Decision
→ Execution
→ CLV
→ Market profile
→ Model adjustment
```

### 7.3 Canonical Pipeline

```txt
Odds ingestion
→ Market snapshots
→ Model prediction
→ Edge calculation
→ Risk validation
→ Opportunity object
→ Frontend display
→ Execution request
→ Ledger write
→ CLV tracking
→ Bankroll update
→ Analytics layer
```

### 7.4 Foundation Rule

```txt
If it cannot be reconstructed later, it should not be trusted now.
```

### 7.5 Technical Stack

```txt
Frontend: Next.js App Router, TypeScript, Tailwind
Server state: TanStack Query
Global state: Zustand where necessary
Validation: Zod
Auth: Firebase Auth
Database: Firestore
Server access: Firebase Admin
ML: Python, FastAPI, XGBoost, Cloud Run
Hosting: Vercel + Cloud Run
Testing: Vitest, Testing Library, Playwright
```

### 7.6 Architecture Rules

```txt
Server Components by default.
Client Components only for interaction.
Firestore access is server-only for protected product data.
Client components call typed API endpoints.
All request/response/env/persisted data is validated.
Domain logic does not live in page/layout shells.
Use named exports except framework-required files.
No any without a same-line justification.
No useEffect for data fetching; use TanStack Query.
Use semantic interactive elements.
```

---

## 8. Information Architecture

### 8.1 Main Navigation

```txt
Dashboard
Opportunities
Bet Journal
Risk
CLV Analytics
Models
Settings
```

### 8.2 Page Purpose

| Page | Question answered |
|---|---|
| Dashboard | What should I do now? |
| Opportunities | What filtered executions are available? |
| Bet Journal | What has been logged? |
| Risk | What exposure am I carrying? |
| CLV Analytics | Was the process good? |
| Models | Which models are active and reliable? |
| Settings | How should the system behave? |

### 8.3 UI Rule

Information is only shown when it improves decision quality at that moment.

No raw unfiltered bets are shown in the primary UI.

---

## 9. User Flows

### 9.1 Daily Market Scan Flow

```txt
1. System ingests odds.
2. Reference prices are normalized.
3. Model probabilities are generated.
4. Edge detection runs.
5. Bets below threshold are removed.
6. Risk constraints are checked.
7. Remaining opportunities are ranked.
8. Top 3 are shown.
```

Output:

```txt
ACCEPT
REJECT
WAIT
```

### 9.2 Bet Decision Flow

```txt
1. User opens filtered opportunity.
2. System displays decision state.
3. System shows edge, confidence, risk, reason.
4. User accepts, rejects or waits.
5. If accepted, execution flow begins.
```

The user does not manually calculate:

```txt
implied probability
fair odds
edge
Kelly stake
exposure impact
CLV expectation
```

### 9.3 Kelly Sizing Flow

```txt
1. Load bankroll state.
2. Load open exposure.
3. Calculate raw Kelly.
4. Apply Fractional Kelly multiplier.
5. Apply max risk per bet cap.
6. Apply daily risk and open exposure caps.
7. Return stake recommendation.
```

Default risk config:

```txt
Kelly multiplier: 0.25
Max risk per bet: 1%
Max daily risk: 3%
Max open exposure: 6%
```

### 9.4 Bet Execution Flow

```txt
1. User confirms bet.
2. System validates request.
3. System checks duplicate execution key.
4. System locks bankroll state.
5. System creates bet ledger entry.
6. System links entry market snapshot.
7. System initializes CLV tracking.
8. System updates exposure.
9. System writes audit event.
```

Critical rule:

```txt
Duplicate execution requests must never create duplicate bets.
```

### 9.5 CLV Validation Flow

```txt
1. System captures closing odds.
2. Entry odds are compared to closing odds.
3. CLV% is calculated.
4. CLV record is stored.
5. Bet is updated with CLV reference.
6. Market profile aggregates update.
7. Model feedback loop receives result.
```

### 9.6 Portfolio Review Flow

```txt
1. User reviews CLV trend.
2. User reviews exposure by market.
3. User reviews rejected markets.
4. User reviews model-level performance.
5. System highlights process quality issues.
```

Focus:

```txt
process quality
not emotional result review
```

### 9.7 Model Feedback Loop

```txt
1. Compare model probability vs CLV.
2. Identify systematic bias.
3. Segment by market, bookmaker, model version.
4. Adjust model weights.
5. Track future performance by model version.
```

---

## 10. Database & Data Model Specification

### 10.1 Collections

```txt
users
bankrollStates
bets
marketSnapshots
modelPredictions
decisionRecords
clvRecords
riskExposure
marketProfiles
modelVersions
auditEvents
systemConfigs
```

### 10.2 User

Purpose:

```txt
Identity, role, plan, and system access.
```

Fields:

```txt
id
email
role
plan
createdAt
updatedAt
```

Roles:

```txt
admin
project_manager
client
```

Plans:

```txt
free
pro
sharp
infra
```

### 10.3 Bankroll State

Purpose:

```txt
Current bankroll, risk constraints, and exposure controls.
```

Fields:

```txt
userId
currentBankrollUnits
startingBankrollUnits
maxRiskPerBetPct
maxDailyRiskPct
maxOpenExposurePct
kellyMultiplier
openExposureUnits
dailyRiskUsedUnits
updatedAt
```

### 10.4 Bets

Purpose:

```txt
Immutable execution ledger.
```

Fields:

```txt
id
userId
sport
league
gameId
market
selection
bookmaker
entryOddsDecimal
stakeUnits
modelProbability
fairOddsDecimal
edgePct
kellyFraction
kellyMultiplier
recommendedStakeUnits
status
profitLossUnits
decisionId
entrySnapshotId
closingSnapshotId
placedAt
settledAt
createdAt
updatedAt
```

Rule:

```txt
A bet cannot exist without:
entry odds
stake
market
model probability
timestamp
decision reference
```

### 10.5 Market Snapshots

Purpose:

```txt
Store odds state at open, entry, close, and intermediate phases.
```

Fields:

```txt
id
sport
league
gameId
market
selection
phase
bookmaker
oddsDecimal
impliedProbability
source
collectedAt
createdAt
```

Phases:

```txt
open
entry
close
intermediate
```

### 10.6 Model Predictions

Purpose:

```txt
Store model probability outputs and version context.
```

Fields:

```txt
id
modelVersionId
modelName
sport
league
gameId
market
selection
probability
fairOddsDecimal
confidenceScore
featureBreakdown
generatedAt
createdAt
```

### 10.7 Decision Records

Purpose:

```txt
Audit why the system returned ACCEPT, REJECT, or WAIT.
```

Fields:

```txt
id
userId
gameId
market
selection
decision
modelProbability
marketOddsDecimal
edgePct
confidenceScore
stakeUnits
riskPct
reasons
createdAt
expiresAt
```

Decision reasons:

```txt
edge_valid
edge_too_low
market_not_approved
risk_too_high
confidence_too_low
exposure_limit_reached
lineup_pending
price_stale
closing_value_negative
```

### 10.8 CLV Records

Purpose:

```txt
Measure execution quality.
```

Fields:

```txt
id
betId
userId
entryOddsDecimal
closingOddsDecimal
entryImpliedProbability
closingImpliedProbability
clvPct
beatClose
calculatedAt
```

Interpretation:

```txt
Positive CLV = entry beat closing market.
Negative CLV = weak price, late entry, or model/process failure.
```

### 10.9 Risk Exposure

Purpose:

```txt
Represent current exposure across open bets and market segments.
```

Fields:

```txt
id
userId
openExposureUnits
openExposurePct
dailyRiskUsedUnits
dailyRiskUsedPct
exposureByMarket
exposureByBookmaker
exposureBySport
updatedAt
```

### 10.10 Market Profiles

Purpose:

```txt
Approve or reject market segments based on realized evidence.
```

Fields:

```txt
id
sport
league
market
segmentKey
sampleSize
betCount
avgClvPct
clvHitRatePct
roiPct
winRatePct
avgEdgePct
avgOddsDecimal
profitLossUnits
isApproved
rejectionReason
updatedAt
```

### 10.11 Model Versions

Purpose:

```txt
Allow multiple model versions to coexist for backtesting and comparison.
```

Fields:

```txt
id
name
sport
modelType
status
trainingWindow
features
createdAt
retiredAt
```

### 10.12 Audit Events

Purpose:

```txt
Track sensitive changes and execution decisions.
```

Fields:

```txt
id
userId
eventType
entityType
entityId
before
after
createdAt
```

Audit events required for:

```txt
risk config change
bankroll adjustment
bet deletion or voiding
manual CLV override
plan access change
role change
market approval override
model activation change
```

---

## 11. Betting Math Specification

No implementation code in this file. This section defines required behavior.

### 11.1 Implied Probability

Input:

```txt
decimal odds
```

Output:

```txt
market-implied probability
```

Formula:

```txt
1 / decimal odds
```

### 11.2 Fair Odds

Input:

```txt
model probability
```

Output:

```txt
fair decimal odds
```

Formula:

```txt
1 / model probability
```

### 11.3 Edge Calculation

Input:

```txt
model probability
market odds
```

Output:

```txt
edge percentage
```

Concept:

```txt
compare model probability against market-implied probability
```

### 11.4 Kelly Fraction

Input:

```txt
probability
decimal odds
```

Output:

```txt
raw Kelly fraction
```

Purpose:

```txt
estimate optimal stake before risk reduction
```

### 11.5 Fractional Kelly Cap

Input:

```txt
raw Kelly
bankroll
Kelly multiplier
max risk per bet
daily exposure
open exposure
```

Output:

```txt
recommended stake units
```

Purpose:

```txt
reduce volatility and prevent overbetting
```

### 11.6 CLV Calculation

Input:

```txt
entry odds
closing odds
```

Output:

```txt
CLV percentage
beat close boolean
```

Purpose:

```txt
validate whether the execution beat the market.
```

### 11.7 Bankroll State Updates

Triggered by:

```txt
bet accepted
bet settled
manual bankroll correction
voided bet
risk config change
```

Must update:

```txt
current bankroll
open exposure
daily risk used
available risk capacity
audit event
```

---

## 12. Market Approval Engine

### 12.1 Purpose

A market is only approved when evidence shows the model can beat it.

### 12.2 Early Approval Rule

```txt
sampleSize >= 100
avgClvPct > 0
clvHitRatePct >= 52%
roiPct > -2%
```

### 12.3 Mature Approval Rule

```txt
sampleSize >= 250
avgClvPct > 0.25%
clvHitRatePct >= 53%
maxDrawdown within configured threshold
positive CLV across at least 2 model versions
```

### 12.4 Metric Priority

```txt
CLV first
risk-adjusted ROI second
win rate last
```

ROI must not be the primary approval signal.

---

## 13. Model System Specification

### 13.1 Model Types

Performance-driven models:

```txt
Value Betting Model
Ensemble V10
Hard-Hit Volcano
xG vs Surface Regression
```

Validation requirement:

```txt
100+ bets minimum before CLV conclusions become meaningful.
```

Condition-driven models:

```txt
Cold Weather Tax
Madrid Altitude Synergy
Goalkeeper God Mirage
Set-Piece Floor & Name Value Tax
High-Variance Strategy
```

Validation requirement:

```txt
condition trigger accuracy
market reaction timing
CLV impact
outcome impact
sample-size threshold by condition frequency
```

### 13.2 Ensemble V10

Type:

```txt
Meta-model / stacking layer
```

Sports:

```txt
MLB
KBO
Football
```

Markets:

```txt
All markets
```

Mechanism:

```txt
Stacks outputs of individual models as features alongside raw stats.
XGBoost classifier trained on historical bet-level outcomes.
Learns which sub-models are reliable in which contexts.
```

Input features:

```txt
Value Betting Model probability
Hard-Hit Volcano probability
Cold Weather Tax adjustment
xG Surface Regression output
raw xFIP
raw wOBA
league
park factor
temperature
Pinnacle implied probability
line movement delta
```

Training policy:

```txt
retrain monthly
rolling 180-day window
track model version
compare CLV by version
```

### 13.3 Hard-Hit Volcano

Type:

```txt
MLB run total model
```

Markets:

```txt
Over / Under
Run total
```

Mechanism:

```txt
Identifies games where fly-ball pitchers face high hard-contact teams in hitter-friendly parks.
```

Key features:

```txt
team HardHit%
starting pitcher HR/FB%
park HR factor
temperature
```

Validation:

```txt
CLV on totals
run total closing movement
actual total vs projected uplift
```

### 13.4 Cold Weather Tax

Type:

```txt
MLB weather condition model
```

Markets:

```txt
Under
Run total
```

Mechanism:

```txt
Cold temperatures suppress fly ball carry and reduce offensive output.
```

Applies to:

```txt
outdoor parks
low temperature
wind-in conditions
```

Validation:

```txt
condition frequency
market adjustment speed
closing total movement
under CLV
```

### 13.5 Goalkeeper God Mirage

Type:

```txt
Football regression model
```

Markets:

```txt
BTTS
Clean sheet
Over / Under goals
```

Mechanism:

```txt
Short-term elite goalkeeper form regresses toward expected save performance.
```

Key features:

```txt
PSxG against
goals conceded
recent save overperformance
opponent xG
```

### 13.6 Madrid Altitude Synergy

Type:

```txt
Football altitude condition model
```

Markets:

```txt
Match result
Asian handicap
Late goals
```

Mechanism:

```txt
Altitude above 1,500m degrades aerobic performance for sea-level-based teams, especially in the second half.
```

### 13.7 Set-Piece Floor & Name Value Tax

Type:

```txt
Football hybrid model
```

Markets:

```txt
Asian handicap
BTTS
Match result
```

Mechanism:

```txt
Elite dead-ball execution creates scoring floor.
High-profile clubs may be overpriced due to public/name bias.
```

Dependency warning:

```txt
name_value_score requires reliable external input.
```

### 13.8 High-Variance Strategy

Type:

```txt
Multi-sport Kelly amplifier
```

Markets:

```txt
moneyline underdog
double chance
high-odds selections
```

Mechanism:

```txt
Targets high-odds scenarios where public money inflates the favorite and residual value appears on the underdog.
```

Dependency warning:

```txt
public_pct_fav requires external public betting percentage feed.
Do not activate this gate until the data feed is live.
```

### 13.9 xG vs Surface Results Regression

Type:

```txt
Football surface regression model
```

Markets:

```txt
Asian handicap
Match result
Over / Under goals
```

Mechanism:

```txt
Teams over- or under-perform xG depending on pitch surface.
Artificial turf and degraded surfaces create systematic deviations.
```

---

## 14. API Design Specification

### 14.1 API Principle

The API does not merely transfer data.

It enforces structured execution logic.

### 14.2 API Groups

```txt
Authentication API
Dashboard API
Opportunities API
Decision Evaluation API
Execution API
Bet Journal API
Risk Exposure API
CLV Analytics API
Market Profile API
Config API
```

### 14.3 Authentication API

Purpose:

```txt
verify identity
issue session
enforce role
enforce plan
```

Required behavior:

```txt
Firebase Auth session cookie
custom claims
server-side verification
```

### 14.4 Opportunities API

Purpose:

```txt
return filtered opportunities, not raw market data
```

Output:

```txt
top 3 actionable decisions
decision state
edge
confidence
risk
reason
expiry
```

### 14.5 Decision Evaluation API

Purpose:

```txt
calculate whether a market should be accepted, rejected or waited on
```

Must perform:

```txt
validate request
load bankroll
load market profile
load model prediction
calculate edge
calculate risk
check exposure
return decision
write decision record
```

### 14.6 Execution API

Purpose:

```txt
convert accepted decision into ledger entry
```

Must perform:

```txt
validate decision still active
validate risk again
prevent duplicate execution
lock bankroll state
create bet
create audit event
initialize CLV tracking
update exposure
```

### 14.7 Bet Journal API

Purpose:

```txt
read and manage execution ledger
```

Must support:

```txt
list bets
create manual bet
read bet detail
settle bet
import CSV
export CSV
```

### 14.8 Risk Exposure API

Purpose:

```txt
make risk visible system-wide
```

Must return:

```txt
current bankroll
open exposure
risk used today
remaining risk capacity
risk caps
active exposures by market
```

### 14.9 CLV Analytics API

Purpose:

```txt
return process-quality metrics
```

Must return:

```txt
avg CLV
CLV hit rate
CLV by market
CLV by bookmaker
CLV by model version
CLV by odds bucket
bet-level CLV
```

### 14.10 Config API

Purpose:

```txt
manage risk, model and system behavior
```

Must audit:

```txt
risk config changes
plan changes
model activation changes
market approval overrides
```

---

## 15. Frontend System Design

### 15.1 Design Principle

```txt
Controlled decision interface for probabilistic execution.
```

### 15.2 Visual References

```txt
Bloomberg Terminal
TradingView dark mode
institutional sportsbook tooling
quantitative dashboards
```

### 15.3 Interface Tone

```txt
clinical
minimal
high contrast
number-first
decision-first
quiet authority
```

### 15.4 Dashboard Layout

```txt
Sidebar Navigation
+
Main Decision Panel
+
Risk Status Strip
+
CLV / Process Quality Summary
```

### 15.5 Dashboard Must Answer

```txt
What can I bet right now?
What risk am I taking?
What should I do next?
Was the decision correct?
What has happened over time?
```

### 15.6 Decision Card Hierarchy

```txt
Decision
↓
Edge
↓
Confidence
↓
Risk
↓
Reason
```

### 15.7 Decision States

ACCEPT:

```txt
ACCEPT

+4.8%
EDGE

72
CONFIDENCE

0.38u
RISK

Edge valid
Market approved
Sizing reduced
```

REJECT:

```txt
REJECT

-1.2%
EDGE

Market not approved
Risk blocked
No closing value
```

WAIT:

```txt
WAIT

Lineup pending
Price unstable
Confidence incomplete
```

### 15.8 Hard Rule

```txt
Maximum visible decisions: 3
```

---

## 16. Security & Permissions

### 16.1 Enforcement Layers

```txt
1. Firebase Auth custom claims
2. Firestore security rules
3. Server-side Route Handler authorization
4. UI visibility
```

### 16.2 Required Roles

```txt
admin
project_manager
client
```

### 16.3 Access Principle

```txt
No protected application data is accessed directly from client-side Firestore SDK.
```

### 16.4 Protected Resources

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

### 16.5 Audit Required

```txt
role change
plan change
bankroll correction
risk setting update
manual bet deletion
manual CLV override
model activation
market override
```

---

## 17. Scaling & Performance

### 17.1 Near-Term

```txt
Firestore for operational data
Server-side repositories
Typed API contracts
TanStack Query for client server-state
Server Components by default
Minimal client components
```

### 17.2 Later

```txt
Cloud Run FastAPI sidecar
XGBoost model inference
scheduled odds ingestion
market snapshot compression
batch CLV recalculation
model version backtesting
```

### 17.3 Performance Risks

```txt
too many market snapshots
large bet history queries
unbounded analytics aggregation
client-side filtering of large datasets
unindexed Firestore queries
```

### 17.4 Mitigation

```txt
precomputed market profiles
paginated bet ledger
bounded dashboard queries
server-side filtering
Firestore composite indexes
daily aggregate jobs
```

---

## 18. Testing Strategy

### 18.1 Unit Tests

Must cover:

```txt
implied probability
fair odds
edge calculation
Kelly fraction
Fractional Kelly cap
CLV calculation
market approval rule
risk cap behavior
decision reason generation
```

### 18.2 Integration Tests

Must cover:

```txt
manual bet creation
bankroll update
decision evaluation
bet execution
duplicate execution prevention
CLV record creation
market profile recalculation
role/plan authorization
```

### 18.3 E2E Tests

Must cover:

```txt
user logs in
user configures bankroll
user logs manual bet
user sees bet in journal
system calculates risk
system creates decision
user accepts decision
bet appears in ledger
CLV is calculated later
```

### 18.4 Security Tests

Must cover:

```txt
client cannot read another user’s bets
client cannot write protected collections directly
Free user cannot access SHARP risk tools
client cannot override CLV without admin role
project_manager cannot change payment status
```

---

## 19. MVP Scope Definition

### 19.1 Phase 1 Goal

```txt
Build the audited betting decision infrastructure first.

Not picks.
Not social.
Not automation.
Not dashboards.

Ledger
→ snapshots
→ model price
→ risk sizing
→ CLV
→ market approval
→ decision-only UI
```

### 19.2 Phase 1 Must Include

```txt
A user can log a bet.
Bet includes odds, stake, market, model probability and timestamp.
System calculates implied probability.
System calculates fair odds.
System calculates edge.
System calculates Kelly fraction.
System applies Fractional Kelly cap.
System updates bankroll state.
User never needs to calculate.
User never scans a raw table to decide.
UI exposes only actionable decisions.
```

### 19.3 Phase 1 Excludes

```txt
automated betting
social features
leaderboards
complex dashboards
live notification loops
public betting feed dependency
full model retraining UI
```

---

## 20. Decisions To Lock Before Code

### 20.1 Pricing

Recommended lock:

```txt
PRO: 49€/month
SHARP: 199€/month
INFRA: 1000€+/month
```

Remove or defer:

```txt
149€–499€/month
```

unless explicitly used for custom add-ons.

### 20.2 Stripe

Decide which plan this link maps to:

```txt
https://buy.stripe.com/28E14feK0gOp3ewfhS8ww0C
```

### 20.3 MVP Sport Scope

Recommended:

```txt
MLB first
Football models documented but inactive
KBO optional later
```

Reason:

```txt
Reducing sport scope lowers model validation complexity.
```

### 20.4 Active MVP Models

Recommended active MVP models:

```txt
Value Betting Model
Hard-Hit Volcano
Cold Weather Tax
Ensemble V10 as logged model output only
```

Recommended inactive until data dependencies exist:

```txt
High-Variance Strategy
Set-Piece Floor Name Value Tax
```

Reason:

```txt
They require external public betting or name-value data.
```

---

## 21. Final Spec Lock

```txt
DOCTORE AI is not a betting app.

It is a controlled exposure system for sports betting markets.

Its value is not more predictions.
Its value is disciplined execution.

The system logs every decision,
prices every market,
sizes risk through Fractional Kelly,
tracks closing-line value,
approves only proven market segments,
and exposes only actionable decisions.

The first build phase is audited betting infrastructure:

Ledger
→ snapshots
→ model price
→ risk sizing
→ CLV
→ market approval
→ decision-only UI
```
