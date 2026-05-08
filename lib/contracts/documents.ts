import { z } from 'zod'

import {
  ActivationGateSchema,
  AuditEntityTypeSchema,
  AuditEventTypeSchema,
  BetStatusSchema,
  DecisionReasonSchema,
  DecisionStateSchema,
  LeagueSchema,
  LiquidityTierSchema,
  MarketSchema,
  MarketStatusSchema,
  MarketTierSchema,
  PlanSchema,
  RoleSchema,
  SnapshotPhaseSchema,
  SportSchema,
  StaleLineRiskSchema,
} from './enums'
import {
  ConfidenceScoreSchema,
  DataQualityScoreSchema,
  DecimalOddsSchema,
  EntityIdSchema,
  IsoDateTimeSchema,
  JsonRecordSchema,
  NonNegativeNumberSchema,
  NonNegativeUnitAmountSchema,
  PercentageSchema,
  ProbabilitySchema,
  UnitAmountSchema,
  UserIdSchema,
} from './primitives'

export const UserDocumentSchema = z.object({
  id: UserIdSchema,
  email: z.string().email(),
  role: RoleSchema,
  plan: PlanSchema,
  assignedManagerId: UserIdSchema.optional(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
})
export type UserDocument = z.infer<typeof UserDocumentSchema>

export const BankrollStateDocumentSchema = z.object({
  userId: UserIdSchema,
  currentBankrollUnits: NonNegativeUnitAmountSchema,
  startingBankrollUnits: NonNegativeUnitAmountSchema,
  maxRiskPerBetPct: PercentageSchema.min(0).max(100),
  maxDailyRiskPct: PercentageSchema.min(0).max(100),
  maxOpenExposurePct: PercentageSchema.min(0).max(100),
  kellyMultiplier: NonNegativeNumberSchema.max(1),
  openExposureUnits: NonNegativeUnitAmountSchema,
  dailyRiskUsedUnits: NonNegativeUnitAmountSchema,
  updatedAt: IsoDateTimeSchema,
})
export type BankrollStateDocument = z.infer<typeof BankrollStateDocumentSchema>

export const BetDocumentSchema = z.object({
  id: EntityIdSchema,
  userId: UserIdSchema,
  sport: SportSchema,
  league: LeagueSchema,
  gameId: EntityIdSchema,
  market: MarketSchema,
  selection: z.string().min(1),
  bookmaker: z.string().min(1),
  entryOddsDecimal: DecimalOddsSchema,
  entryImpliedProbability: ProbabilitySchema,
  stakeUnits: NonNegativeUnitAmountSchema,
  modelProbability: ProbabilitySchema,
  fairOddsDecimal: DecimalOddsSchema,
  edgePct: PercentageSchema,
  kellyFraction: NonNegativeNumberSchema,
  kellyMultiplier: NonNegativeNumberSchema.max(1),
  recommendedStakeUnits: NonNegativeUnitAmountSchema,
  status: BetStatusSchema,
  profitLossUnits: UnitAmountSchema.optional(),
  decisionId: EntityIdSchema.optional(),
  entrySnapshotId: EntityIdSchema,
  closingSnapshotId: EntityIdSchema.optional(),
  clvRecordId: EntityIdSchema.optional(),
  placedAt: IsoDateTimeSchema,
  settledAt: IsoDateTimeSchema.optional(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
})
export type BetDocument = z.infer<typeof BetDocumentSchema>

export const MarketSnapshotDocumentSchema = z.object({
  id: EntityIdSchema,
  sport: SportSchema,
  league: LeagueSchema,
  gameId: EntityIdSchema,
  market: MarketSchema,
  selection: z.string().min(1),
  phase: SnapshotPhaseSchema,
  bookmaker: z.string().min(1),
  oddsDecimal: DecimalOddsSchema,
  impliedProbability: ProbabilitySchema,
  source: z.string().min(1),
  collectedAt: IsoDateTimeSchema,
  createdAt: IsoDateTimeSchema,
})
export type MarketSnapshotDocument = z.infer<typeof MarketSnapshotDocumentSchema>

export const ModelPredictionDocumentSchema = z.object({
  id: EntityIdSchema,
  modelVersionId: EntityIdSchema,
  modelName: z.string().min(1),
  sport: SportSchema,
  league: LeagueSchema,
  gameId: EntityIdSchema,
  market: MarketSchema,
  selection: z.string().min(1),
  probability: ProbabilitySchema,
  fairOddsDecimal: DecimalOddsSchema,
  confidenceScore: ConfidenceScoreSchema,
  featureBreakdown: JsonRecordSchema,
  generatedAt: IsoDateTimeSchema,
  createdAt: IsoDateTimeSchema,
})
export type ModelPredictionDocument = z.infer<typeof ModelPredictionDocumentSchema>

export const DecisionRecordDocumentSchema = z.object({
  id: EntityIdSchema,
  userId: UserIdSchema,
  gameId: EntityIdSchema,
  market: MarketSchema,
  selection: z.string().min(1),
  decision: DecisionStateSchema,
  modelProbability: ProbabilitySchema,
  marketOddsDecimal: DecimalOddsSchema,
  edgePct: PercentageSchema,
  confidenceScore: ConfidenceScoreSchema,
  stakeUnits: NonNegativeUnitAmountSchema,
  riskPct: PercentageSchema.min(0).max(100),
  reasons: z.array(DecisionReasonSchema).min(1),
  createdAt: IsoDateTimeSchema,
  expiresAt: IsoDateTimeSchema,
})
export type DecisionRecordDocument = z.infer<typeof DecisionRecordDocumentSchema>

export const ClvRecordDocumentSchema = z.object({
  id: EntityIdSchema,
  betId: EntityIdSchema,
  userId: UserIdSchema,
  entryOddsDecimal: DecimalOddsSchema,
  closingOddsDecimal: DecimalOddsSchema,
  entryImpliedProbability: ProbabilitySchema,
  closingImpliedProbability: ProbabilitySchema,
  clvPct: PercentageSchema,
  beatClose: z.boolean(),
  calculatedAt: IsoDateTimeSchema,
})
export type ClvRecordDocument = z.infer<typeof ClvRecordDocumentSchema>

export const MarketProfileDocumentSchema = z.object({
  id: EntityIdSchema,
  sport: SportSchema,
  league: LeagueSchema,
  market: MarketSchema,
  segmentKey: z.string().min(1),
  sampleSize: NonNegativeNumberSchema,
  betCount: NonNegativeNumberSchema,
  avgClvPct: PercentageSchema,
  clvHitRatePct: PercentageSchema.min(0).max(100),
  roiPct: PercentageSchema,
  winRatePct: PercentageSchema.min(0).max(100),
  avgEdgePct: PercentageSchema,
  avgOddsDecimal: DecimalOddsSchema.optional(),
  profitLossUnits: UnitAmountSchema,
  isApproved: z.boolean(),
  rejectionReason: z.string().min(1).optional(),
  marketStatus: MarketStatusSchema.default('documented'),
  marketTier: MarketTierSchema.default('inactive'),
  coverageReason: z.string().min(1).optional(),
  activationGate: ActivationGateSchema.default('data_required'),
  dataQualityScore: DataQualityScoreSchema.default(0),
  closingReferenceQuality: DataQualityScoreSchema.default(0),
  liquidityTier: LiquidityTierSchema.default('unknown'),
  staleLineRisk: StaleLineRiskSchema.default('unknown'),
  lastValidationAt: IsoDateTimeSchema.optional(),
  updatedAt: IsoDateTimeSchema,
})
export type MarketProfileDocument = z.infer<typeof MarketProfileDocumentSchema>

export const AuditEventDocumentSchema = z.object({
  id: EntityIdSchema,
  userId: UserIdSchema.optional(),
  eventType: AuditEventTypeSchema,
  entityType: AuditEntityTypeSchema,
  entityId: EntityIdSchema,
  before: JsonRecordSchema.optional(),
  after: JsonRecordSchema.optional(),
  createdAt: IsoDateTimeSchema,
})
export type AuditEventDocument = z.infer<typeof AuditEventDocumentSchema>
