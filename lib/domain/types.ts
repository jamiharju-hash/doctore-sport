export type ISODateTime = string;
export type CurrencyCode = 'EUR';

export type PlanCode = 'PRO' | 'SHARP' | 'INFRA';
export type UserRole = 'user' | 'admin' | 'project_manager';

export type DecisionStatus = 'ACCEPT' | 'REJECT' | 'WAIT';
export type BetStatus = 'pending' | 'won' | 'lost' | 'void';
export type MarketProfileStatus = 'approved' | 'watch' | 'blocked';
export type AuditAction =
  | 'bet.created'
  | 'bet.updated'
  | 'bet.settled'
  | 'bankroll.created'
  | 'bankroll.updated'
  | 'market_snapshot.created'
  | 'decision.evaluated'
  | 'clv.created'
  | 'market_profile.recalculated'
  | 'model_version.created';

export interface UserContext {
  userId: string;
  role: UserRole;
  plan: PlanCode;
}

export interface Bet {
  id: string;
  userId: string;
  sport: string;
  league: string;
  event: string;
  market: string;
  selection: string;
  bookmaker: string;
  oddsTaken: number;
  closingOdds: number | null;
  modelProbability: number;
  impliedProbability: number;
  fairOdds: number;
  edge: number;
  bankrollBefore: number;
  bankrollAfter: number | null;
  stakeEur: number;
  stakePercent: number;
  kellyFull: number;
  kellyFractional: number;
  kellyCapped: number;
  status: BetStatus;
  profitLossEur: number | null;
  modelVersionId: string;
  marketSnapshotId: string | null;
  decisionRecordId: string | null;
  clvRecordId: string | null;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  settledAt: ISODateTime | null;
}

export interface BankrollState {
  id: string;
  userId: string;
  currency: CurrencyCode;
  currentBankrollEur: number;
  startingBankrollEur: number;
  reservedExposureEur: number;
  maxStakePercent: number;
  fractionalKellyMultiplier: number;
  dailyLossLimitPercent: number;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface MarketSnapshot {
  id: string;
  userId: string;
  betId: string | null;
  sport: string;
  league: string;
  event: string;
  market: string;
  selection: string;
  bookmaker: string;
  odds: number;
  snapshotType: 'entry' | 'closing';
  source: 'manual' | 'import' | 'worker';
  capturedAt: ISODateTime;
  createdAt: ISODateTime;
}

export interface DecisionRecord {
  id: string;
  userId: string;
  betId: string | null;
  status: DecisionStatus;
  reasons: string[];
  suggestedStakeEur: number;
  edge: number;
  kellyFull: number;
  kellyFractional: number;
  kellyCapped: number;
  marketProfileStatus: MarketProfileStatus;
  inputHash: string;
  createdAt: ISODateTime;
}

export interface CLVRecord {
  id: string;
  userId: string;
  betId: string;
  entryOdds: number;
  closingOdds: number;
  entryImpliedProbability: number;
  closingImpliedProbability: number;
  clvPercent: number;
  createdAt: ISODateTime;
}

export interface MarketProfile {
  id: string;
  userId: string;
  segmentKey: string;
  sport: string;
  league: string;
  market: string;
  status: MarketProfileStatus;
  sampleSize: number;
  averageClvPercent: number;
  roiPercent: number;
  hitRatePercent: number;
  rationale: string;
  recalculatedAt: ISODateTime;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface ModelVersion {
  id: string;
  userId: string;
  name: string;
  version: string;
  type: 'manual_probability' | 'value_betting_placeholder' | 'future_model';
  isActive: boolean;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface AuditEvent {
  id: string;
  userId: string;
  actorUserId: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateTime;
}
