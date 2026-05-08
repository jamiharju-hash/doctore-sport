import { z } from 'zod'

export const RoleSchema = z.enum(['admin', 'project_manager', 'client'])
export type Role = z.infer<typeof RoleSchema>

export const PlanSchema = z.enum(['free', 'pro', 'sharp', 'infra'])
export type Plan = z.infer<typeof PlanSchema>

export const SportSchema = z.enum(['mlb', 'kbo', 'npb', 'football'])
export type Sport = z.infer<typeof SportSchema>

export const LeagueSchema = z.enum([
  'mlb',
  'kbo',
  'npb',
  'veikkausliiga',
  'nordic_lower_football',
])
export type League = z.infer<typeof LeagueSchema>

export const MarketSchema = z.enum([
  'moneyline',
  'spread',
  'total',
  'run_total',
  'player_prop',
  'match_result',
  'asian_handicap',
  'btts',
  'over_under_goals',
])
export type Market = z.infer<typeof MarketSchema>

export const BetStatusSchema = z.enum([
  'pending',
  'won',
  'lost',
  'void',
  'cashed_out',
])
export type BetStatus = z.infer<typeof BetStatusSchema>

export const SnapshotPhaseSchema = z.enum([
  'open',
  'entry',
  'close',
  'intermediate',
])
export type SnapshotPhase = z.infer<typeof SnapshotPhaseSchema>

export const DecisionStateSchema = z.enum(['accept', 'reject', 'wait'])
export type DecisionState = z.infer<typeof DecisionStateSchema>

export const DecisionReasonSchema = z.enum([
  'edge_valid',
  'edge_too_low',
  'market_not_approved',
  'risk_too_high',
  'confidence_too_low',
  'exposure_limit_reached',
  'lineup_pending',
  'price_stale',
  'closing_value_negative',
  'market_under_validation',
  'closing_reference_weak',
  'stale_line_risk_elevated',
  'liquidity_restricted',
  'market_blocked',
  'market_not_active',
  'decision_expired',
  'duplicate_execution',
])
export type DecisionReason = z.infer<typeof DecisionReasonSchema>

export const MarketStatusSchema = z.enum([
  'documented',
  'candidate',
  'active_testing',
  'approved',
  'restricted',
  'blocked',
  'retired',
])
export type MarketStatus = z.infer<typeof MarketStatusSchema>

export const MarketTierSchema = z.enum([
  'core',
  'expansion',
  'local_edge',
  'experimental',
  'inactive',
])
export type MarketTier = z.infer<typeof MarketTierSchema>

export const ActivationGateSchema = z.enum([
  'data_required',
  'closing_reference_required',
  'sample_required',
  'clv_validation_required',
  'approved',
  'blocked',
])
export type ActivationGate = z.infer<typeof ActivationGateSchema>

export const LiquidityTierSchema = z.enum(['high', 'medium', 'low', 'unknown'])
export type LiquidityTier = z.infer<typeof LiquidityTierSchema>

export const StaleLineRiskSchema = z.enum(['low', 'medium', 'high', 'unknown'])
export type StaleLineRisk = z.infer<typeof StaleLineRiskSchema>

export const AuditEventTypeSchema = z.enum([
  'bankroll_created',
  'bankroll_updated',
  'risk_config_updated',
  'bet_created',
  'bet_settled',
  'bet_voided',
  'market_snapshot_created',
  'decision_created',
  'execution_created',
  'clv_created',
  'market_profile_recalculated',
  'market_approval_overridden',
  'model_activated',
  'model_retired',
  'plan_changed',
  'role_changed',
])
export type AuditEventType = z.infer<typeof AuditEventTypeSchema>

export const AuditEntityTypeSchema = z.enum([
  'user',
  'bankroll_state',
  'bet',
  'market_snapshot',
  'model_prediction',
  'decision_record',
  'clv_record',
  'market_profile',
  'model_version',
  'system_config',
])
export type AuditEntityType = z.infer<typeof AuditEntityTypeSchema>
