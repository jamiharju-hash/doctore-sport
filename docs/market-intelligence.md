# DOCTORE AI — Market Intelligence Specification

**Document:** `docs/market-intelligence.md`  
**Status:** Planning baseline  
**Purpose:** Define the market coverage thesis, inefficiency criteria, validation rules, and implementation implications for DOCTORE AI's Market Intelligence layer.

---

## 1. Core Principle

```txt
Market Intelligence is not market coverage.

It is the disciplined selection of sports and leagues where pricing inefficiencies persist long enough to be measured, exploited, and validated through CLV.
```

The objective is not prediction volume.

The objective is repeatable pricing advantage.

DOCTORE AI should avoid broad market coverage unless coverage improves execution quality.

---

## 2. Strategic Positioning

Most betting products expand coverage to create more user engagement.

DOCTORE AI expands coverage only when a market can support a measurable edge thesis.

The system should prioritize:

```txt
persistent inefficiency
weaker pricing maturity
slower line correction
lower bookmaker attention
fragmented information
repeatable market behavior
CLV validation potential
```

The system should deprioritize:

```txt
highly efficient major markets without a clear edge mechanism
markets with unreliable odds data
markets without closing-line reference quality
markets where limits are too low for serious execution
markets where data latency destroys entry quality
```

---

## 3. Initial Market Coverage

Initial coverage should focus on markets where inefficiencies may persist:

```txt
MLB
KBO
NPB
Veikkausliiga
Nordic lower football divisions
```

This is not a prediction-volume roadmap.

It is a market-quality roadmap.

Each market must be treated as a hypothesis until validated by closing-line behavior.

---

## 4. Market Coverage Thesis

### 4.1 MLB

Primary reason for inclusion:

```txt
High data availability, strong modeling surface, frequent games, liquid enough closing reference, and meaningful feature depth.
```

Relevant inefficiency types:

```txt
starting pitcher mispricing
bullpen fatigue
lineup confirmation delay
weather effects
park factors
market overreaction to recent form
run total pricing errors
```

Best initial markets:

```txt
moneyline
run total
over/under
selected pitcher-sensitive derivatives later
```

Validation method:

```txt
CLV by market
CLV by model version
CLV by odds bucket
CLV by pitcher profile
CLV by weather bucket
CLV by lineup status
```

MVP status:

```txt
Active first market.
```

---

### 4.2 KBO

Primary reason for inclusion:

```txt
Less efficient than MLB, lower global attention, usable statistical structure, and potential bookmaker lag in team/pitcher adjustment.
```

Relevant inefficiency types:

```txt
foreign pitcher mispricing
bullpen depth gaps
travel/rest effects
team-level offensive volatility
bookmaker copy-pricing from weak references
```

Best initial markets:

```txt
moneyline
run total
over/under
```

Validation method:

```txt
CLV by bookmaker
CLV by market
CLV by favorite/underdog side
CLV by starting pitcher tier
CLV by odds bucket
```

MVP status:

```txt
Documented market.
Activate after MLB ledger, CLV, and market profile flow is stable.
```

---

### 4.3 NPB

Primary reason for inclusion:

```txt
Structured baseball market with different run environment, potential bookmaker inefficiencies, and useful model transfer from MLB/KBO with league-specific calibration.
```

Relevant inefficiency types:

```txt
low-scoring environment miscalibration
starting pitcher dominance
park-specific run suppression
travel/rest effects
bookmaker lag on lineup and pitcher context
```

Best initial markets:

```txt
moneyline
run total
under-focused totals segments
```

Validation method:

```txt
CLV by totals bucket
CLV by pitcher tier
CLV by park factor
CLV by league run environment
CLV by model version
```

MVP status:

```txt
Documented market.
Not active until league-specific calibration is defined.
```

---

### 4.4 Veikkausliiga

Primary reason for inclusion:

```txt
Lower market efficiency, limited global attention, potentially slower bookmaker adjustment, and local information advantages.
```

Relevant inefficiency types:

```txt
squad news delay
weather and pitch condition impact
travel/rest asymmetry
motivation and rotation effects
thin-liquidity price distortion
name-value bias on recognizable clubs
```

Best initial markets:

```txt
match result
Asian handicap
under/over goals
BTTS only after validation
```

Validation method:

```txt
CLV by bookmaker
CLV by kickoff timing
CLV by liquidity tier
CLV by home/away side
CLV by weather/pitch condition
CLV by public name-value bias
```

MVP status:

```txt
Strategic target.
Requires reliable fixture, lineup, weather, and bookmaker odds feeds before activation.
```

---

### 4.5 Nordic Lower Football Divisions

Primary reason for inclusion:

```txt
Lower bookmaker efficiency, thinner information coverage, local asymmetry, slower correction, and larger discrepancy potential across books.
```

Relevant inefficiency types:

```txt
team news opacity
semi-professional squad availability
travel constraints
weather and pitch quality
low liquidity distortion
bookmaker stale lines
copy-pricing errors
```

Best initial markets:

```txt
match result
Asian handicap where available
over/under goals where closing reference is reliable
```

Validation method:

```txt
CLV by bookmaker
CLV by liquidity tier
CLV by market open-to-close movement
CLV by stale-line age
CLV by league/division
CLV by team news availability
```

MVP status:

```txt
High-potential but not MVP.
Activate only after data quality and closing-line reference quality are proven.
```

---

## 5. Market Activation Rules

A market must pass three gates before becoming active in the decision engine.

### Gate 1 — Data Availability

Required:

```txt
fixtures
official start time
bookmaker odds
entry odds timestamp
closing odds reference
team/player context where relevant
settlement data
```

Fail state:

```txt
Market remains documented but inactive.
```

---

### Gate 2 — Pricing Reference Quality

Required:

```txt
reliable closing odds source
consistent bookmaker naming
stable odds format
known market close time
sufficient quote frequency
```

Fail state:

```txt
CLV cannot be trusted.
Market cannot be approved.
```

---

### Gate 3 — Edge Validation

Required:

```txt
minimum sample size
positive average CLV
acceptable CLV hit rate
risk-adjusted ROI not structurally negative
market behavior repeatability
```

Early approval rule:

```txt
sampleSize >= 100
avgClvPct > 0
clvHitRatePct >= 52%
roiPct > -2%
```

Mature approval rule:

```txt
sampleSize >= 250
avgClvPct > 0.25%
clvHitRatePct >= 53%
positive CLV across at least 2 model versions
max drawdown within configured risk limit
```

---

## 6. Market Status Model

Each market should have a system status.

```txt
documented
candidate
active_testing
approved
restricted
blocked
retired
```

### documented

Market exists in the strategic map but has no active decision output.

### candidate

Data source is being evaluated.

### active_testing

Market can log bets and calculate CLV but should not produce strong ACCEPT recommendations without restrictions.

### approved

Market has passed sample, CLV, and risk gates.

### restricted

Market shows partial edge but has size, timing, liquidity, or segment restrictions.

### blocked

Market failed CLV or risk validation.

### retired

Market is no longer supported or no longer viable.

---

## 7. Market Intelligence Data Model Additions

Add or extend `marketProfiles` with:

```txt
marketStatus
marketTier
coverageReason
activationGate
dataQualityScore
closingReferenceQuality
liquidityTier
staleLineRisk
lastValidationAt
```

Recommended market tier values:

```txt
core
expansion
local_edge
experimental
inactive
```

Recommended activation gate values:

```txt
data_required
closing_reference_required
sample_required
clv_validation_required
approved
blocked
```

---

## 8. Decision Engine Implications

The decision engine must not return `ACCEPT` for a market only because model edge exists.

It must check:

```txt
market status
market approval
closing reference quality
sample size
CLV history
liquidity tier
stale-line risk
risk exposure
```

Decision logic implication:

```txt
model edge without market validation = WAIT or REJECT
```

Approved market behavior:

```txt
Only approved or restricted markets can produce ACCEPT.
Restricted markets must apply tighter stake caps.
```

---

## 9. UI Implications

Market Intelligence must not become a raw market browser.

Primary UI remains:

```txt
ACCEPT
REJECT
WAIT
```

Market Intelligence should surface only decision-relevant states:

```txt
Market approved
Market under validation
Closing reference weak
Liquidity restricted
Stale-line risk elevated
Segment blocked
```

Avoid:

```txt
large league coverage tables
raw odds browsing
prediction-volume counters
all-market pick feeds
```

---

## 10. Implementation Priority

Recommended activation sequence:

```txt
1. MLB
2. KBO
3. NPB
4. Veikkausliiga
5. Nordic lower football divisions
```

Reason:

```txt
Start with the market that has the strongest data availability and validation surface.
Then expand toward less efficient markets only when the Market Intelligence layer can measure CLV reliably.
```

---

## 11. Final Lock

```txt
Market Intelligence exists to identify where pricing advantage can persist.

It does not exist to increase prediction volume.

A market is only valuable if DOCTORE AI can:
- price it
- risk-size it
- log it
- measure CLV
- validate repeatability
- restrict or block it when the edge disappears
```
