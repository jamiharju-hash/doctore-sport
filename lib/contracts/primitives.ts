import { z } from 'zod'

export const EntityIdSchema = z.string().min(1)
export type EntityId = z.infer<typeof EntityIdSchema>

export const UserIdSchema = z.string().min(1)
export type UserId = z.infer<typeof UserIdSchema>

export const IsoDateTimeSchema = z.string().datetime({ offset: true })
export type IsoDateTime = z.infer<typeof IsoDateTimeSchema>

export const DecimalOddsSchema = z.number().finite().gt(1)
export type DecimalOdds = z.infer<typeof DecimalOddsSchema>

export const ProbabilitySchema = z.number().finite().gt(0).lt(1)
export type Probability = z.infer<typeof ProbabilitySchema>

export const PercentageSchema = z.number().finite()
export type Percentage = z.infer<typeof PercentageSchema>

export const NonNegativeNumberSchema = z.number().finite().min(0)
export type NonNegativeNumber = z.infer<typeof NonNegativeNumberSchema>

export const PositiveNumberSchema = z.number().finite().gt(0)
export type PositiveNumber = z.infer<typeof PositiveNumberSchema>

export const UnitAmountSchema = z.number().finite()
export type UnitAmount = z.infer<typeof UnitAmountSchema>

export const NonNegativeUnitAmountSchema = z.number().finite().min(0)
export type NonNegativeUnitAmount = z.infer<typeof NonNegativeUnitAmountSchema>

export const ConfidenceScoreSchema = z.number().finite().min(0).max(100)
export type ConfidenceScore = z.infer<typeof ConfidenceScoreSchema>

export const DataQualityScoreSchema = z.number().finite().min(0).max(100)
export type DataQualityScore = z.infer<typeof DataQualityScoreSchema>

export const JsonRecordSchema = z.record(z.string(), z.unknown())
export type JsonRecord = z.infer<typeof JsonRecordSchema>
