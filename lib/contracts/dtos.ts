import { z } from 'zod'

import {
  BetStatusSchema,
  DecisionReasonSchema,
  DecisionStateSchema,
  LeagueSchema,
  MarketSchema,
  PlanSchema,
  RoleSchema,
  SnapshotPhaseSchema,
  SportSchema,
} from './enums'
import {
  ConfidenceScoreSchema,
  DecimalOddsSchema,
  EntityIdSchema,
  IsoDateTimeSchema,
  NonNegativeUnitAmountSchema,
  PercentageSchema,
  ProbabilitySchema,
  UnitAmountSchema,
  UserIdSchema,
} from './primitives'

export const AppUserDtoSchema = z.object({
  id: UserIdSchema,
  email: z.string().email(),
  role: RoleSchema,
  plan: PlanSchema,
  assignedManagerId: UserIdSchema.optional(),
})
export type AppUserDto = z.infer<typeof AppUserDtoSchema>

export const BankrollDtoSchema = z.object({
  currentBankrollUnits: NonNegativeUnitAmountSchema,
  startingBankrollUnits: NonNegativeUnitAmountSchema,
  maxRiskPerBetPct: PercentageSchema.min(0).max(100),
  maxDailyRiskPct: PercentageSchema.min(0).max(100),
  maxOpenExposurePct: PercentageSchema.min(0).max(100),
  kellyMultiplier: z.number().finite().min(0).max(1),
  openExposureUnits: NonNegativeUnitAmountSchema,
  dailyRiskUsedUnits: NonNegativeUnitAmountSchema,
  updatedAt: IsoDateTimeSchema,
})
export type BankrollDto = z.infer<typeof BankrollDtoSchema>

export const UpdateBankrollRequestSchema = z.object({
  currentBankrollUnits: NonNegativeUnitAmountSchema.optional(),
  startingBankrollUnits: NonNegativeUnitAmountSchema.optional(),
  maxRiskPerBetPct: PercentageSchema.min(0).max(100).optional(),
  maxDailyRiskPct: PercentageSchema.min(0).max(100).optional(),
  maxOpenExposurePct: PercentageSchema.min(0).max(100).optional(),
  kellyMultiplier: z.number().finite().min(0).max(1).optional(),
})
export type UpdateBankrollRequest = z.infer<typeof UpdateBankrollRequestSchema>

export const CreateBetRequestSchema = z.object({
  sport: SportSchema,
  league: LeagueSchema,
  gameId: EntityIdSchema,
  market: MarketSchema,
  selection: z.string().min(1),
  bookmaker: z.string().min(1),
  entryOddsDecimal: DecimalOddsSchema,
  stakeUnits: NonNegativeUnitAmountSchema,
  modelProbability: ProbabilitySchema,
  placedAt: IsoDateTimeSchema,
  decisionId: EntityIdSchema.optional(),
})
export type CreateBetRequest = z.infer<typeof CreateBetRequestSchema>

export const BetSummaryDtoSchema = z.object({
  id: EntityIdSchema,
  sport: SportSchema,
  league: LeagueSchema,
  market: MarketSchema,
  selection: z.string().min(1),
  bookmaker: z.string().min(1),
  entryOddsDecimal: DecimalOddsSchema,
  stakeUnits: NonNegativeUnitAmountSchema,
  modelProbability: ProbabilitySchema,
  fairOddsDecimal: DecimalOddsSchema,
  edgePct: PercentageSchema,
  status: BetStatusSchema,
  profitLossUnits: UnitAmountSchema.optional(),
  clvPct: PercentageSchema.optional(),
  beatClose: z.boolean().optional(),
  placedAt: IsoDateTimeSchema,
  settledAt: IsoDateTimeSchema.optional(),
})
export type BetSummaryDto = z.infer<typeof BetSummaryDtoSchema>

export const BetDetailDtoSchema = BetSummaryDtoSchema.extend({
  entrySnapshotId: EntityIdSchema,
  closingSnapshotId: EntityIdSchema.optional(),
  decisionId: EntityIdSchema.optional(),
  clvRecordId: EntityIdSchema.optional(),
  kellyFraction: z.number().finite().min(0),
  kellyMultiplier: z.number().finite().min(0).max(1),
  recommendedStakeUnits: NonNegativeUnitAmountSchema,
})
export type BetDetailDto = z.infer<typeof BetDetailDtoSchema>

export const ListBetsResponseSchema = z.object({
  items: z.array(BetSummaryDtoSchema),
  nextCursor: z.string().optional(),
})
export type ListBetsResponse = z.infer<typeof ListBetsResponseSchema>

export const SettleBetRequestSchema = z.object({
  status: z.enum(['won', 'lost', 'void', 'cashed_out']),
  profitLossUnits: UnitAmountSchema.optional(),
  settledAt: IsoDateTimeSchema,
})
export type SettleBetRequest = z.infer<typeof SettleBetRequestSchema>

export const CreateMarketSnapshotRequestSchema = z.object({
  sport: SportSchema,
  league: LeagueSchema,
  gameId: EntityIdSchema,
  market: MarketSchema,
  selection: z.string().min(1),
  phase: SnapshotPhaseSchema,
  bookmaker: z.string().min(1),
  oddsDecimal: DecimalOddsSchema,
  source: z.string().min(1),
  collectedAt: IsoDateTimeSchema,
})
export type CreateMarketSnapshotRequest = z.infer<
  typeof CreateMarketSnapshotRequestSchema
>

export const EvaluateDecisionRequestSchema = z.object({
  gameId: EntityIdSchema,
  sport: SportSchema,
  league: LeagueSchema,
  market: MarketSchema,
  selection: z.string().min(1),
  bookmaker: z.string().min(1),
  oddsDecimal: DecimalOddsSchema,
  modelProbability: ProbabilitySchema,
  confidenceScore: ConfidenceScoreSchema,
})
export type EvaluateDecisionRequest = z.infer<typeof EvaluateDecisionRequestSchema>

export const EvaluateDecisionResponseSchema = z.object({
  decisionId: EntityIdSchema,
  decision: DecisionStateSchema,
  edgePct: PercentageSchema,
  fairOddsDecimal: DecimalOddsSchema,
  confidenceScore: ConfidenceScoreSchema,
  stakeUnits: NonNegativeUnitAmountSchema,
  riskPct: PercentageSchema.min(0).max(100),
  reasons: z.array(DecisionReasonSchema).min(1),
  expiresAt: IsoDateTimeSchema,
})
export type EvaluateDecisionResponse = z.infer<
  typeof EvaluateDecisionResponseSchema
>

export const ExecuteDecisionRequestSchema = z.object({
  decisionId: EntityIdSchema,
  idempotencyKey: z.string().min(16),
  placedAt: IsoDateTimeSchema,
})
export type ExecuteDecisionRequest = z.infer<typeof ExecuteDecisionRequestSchema>

export const ExecuteDecisionResponseSchema = z.object({
  betId: EntityIdSchema,
  entrySnapshotId: EntityIdSchema,
  decisionId: EntityIdSchema,
  status: BetStatusSchema,
})
export type ExecuteDecisionResponse = z.infer<typeof ExecuteDecisionResponseSchema>

export const CalculateClvRequestSchema = z.object({
  betId: EntityIdSchema,
  closingOddsDecimal: DecimalOddsSchema,
  bookmaker: z.string().min(1),
  source: z.string().min(1),
  collectedAt: IsoDateTimeSchema,
})
export type CalculateClvRequest = z.infer<typeof CalculateClvRequestSchema>

export const CalculateClvResponseSchema = z.object({
  clvRecordId: EntityIdSchema,
  betId: EntityIdSchema,
  entryOddsDecimal: DecimalOddsSchema,
  closingOddsDecimal: DecimalOddsSchema,
  clvPct: PercentageSchema,
  beatClose: z.boolean(),
})
export type CalculateClvResponse = z.infer<typeof CalculateClvResponseSchema>

export const MarketProfileDtoSchema = z.object({
  id: EntityIdSchema,
  sport: SportSchema,
  league: LeagueSchema,
  market: MarketSchema,
  segmentKey: z.string().min(1),
  sampleSize: z.number().finite().min(0),
  avgClvPct: PercentageSchema,
  clvHitRatePct: PercentageSchema.min(0).max(100),
  roiPct: PercentageSchema,
  isApproved: z.boolean(),
  rejectionReason: z.string().min(1).optional(),
})
export type MarketProfileDto = z.infer<typeof MarketProfileDtoSchema>
