# Milestone 1 — Domain Contracts Complete

## Status

Milestone 1 is implemented as the initial `lib/contracts` layer.

## Added files

```txt
lib/contracts/enums.ts
lib/contracts/primitives.ts
lib/contracts/documents.ts
lib/contracts/dtos.ts
lib/contracts/index.ts
```

## Coverage

### Persisted document contracts

Implemented in `lib/contracts/documents.ts`:

```txt
UserDocument
BankrollStateDocument
BetDocument
MarketSnapshotDocument
ModelPredictionDocument
DecisionRecordDocument
ClvRecordDocument
MarketProfileDocument
AuditEventDocument
```

### API DTO contracts

Implemented in `lib/contracts/dtos.ts`:

```txt
AppUserDto
BankrollDto
UpdateBankrollRequest
CreateBetRequest
BetSummaryDto
BetDetailDto
ListBetsResponse
SettleBetRequest
CreateMarketSnapshotRequest
EvaluateDecisionRequest
EvaluateDecisionResponse
ExecuteDecisionRequest
ExecuteDecisionResponse
CalculateClvRequest
CalculateClvResponse
MarketProfileDto
```

### Enums

Implemented in `lib/contracts/enums.ts`:

```txt
role
plan
sport
league
market
bet status
snapshot phase
decision state
decision reason
market status
market tier
activation gate
liquidity tier
stale-line risk
audit event type
audit entity type
```

### Shared primitives

Implemented in `lib/contracts/primitives.ts`:

```txt
EntityId
UserId
ISO datetime
Decimal odds
Probability
Percentage
Unit amounts
Confidence score
Data quality score
JSON record
```

## Design decisions

- Zod schemas are the source of runtime validation.
- TypeScript types are inferred from schemas.
- Persistence models are separated from API DTOs.
- Market Intelligence fields are included in `MarketProfileDocument`.
- No `any` is used in domain contracts.
- Protected data shapes are ready for server-only Firestore repositories.

## Definition of Done Check

```txt
[x] All collections have a typed contract
[x] All endpoint payloads have a planned DTO
[x] No any is required for domain data
```

## Next technical milestone

```txt
Milestone 2 — Firebase Server Auth
```
