"""
DOCTORE AI — DoctoreEvolver

A CLV-first market/model evaluation utility.

This module does not place bets, generate picks, or automate execution.
It evaluates whether historical betting records show repeatable pricing
advantage by segment.

Core principle:
    model edge without market validation = WAIT or REJECT

The objective is not prediction volume.
The objective is repeatable pricing advantage.

Usage:
    python DoctoreEvolver.py --input ledger.csv
    python DoctoreEvolver.py --input ledger.csv --group-by sport,league,market,bookmaker,model_version
    python DoctoreEvolver.py --input ledger.csv --output report.json

Expected CSV columns, flexible aliases supported:
    betId / id
    sport
    league
    market
    bookmaker
    modelVersion / model_version
    entryOddsDecimal / entry_odds_decimal
    closingOddsDecimal / closing_odds_decimal
    stakeUnits / stake_units
    profitLossUnits / profit_loss_units
    edgePct / edge_pct

Minimum useful input:
    sport, market, entryOddsDecimal, closingOddsDecimal

Recommended input:
    sport, league, market, bookmaker, modelVersion,
    entryOddsDecimal, closingOddsDecimal, stakeUnits, profitLossUnits, edgePct
"""

from __future__ import annotations

import argparse
import csv
import json
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Iterable, Mapping, Sequence


DEFAULT_GROUP_BY = (
    "sport",
    "league",
    "market",
    "bookmaker",
    "model_version",
)

COLUMN_ALIASES: dict[str, tuple[str, ...]] = {
    "bet_id": ("bet_id", "betId", "id"),
    "sport": ("sport",),
    "league": ("league",),
    "market": ("market",),
    "bookmaker": ("bookmaker", "book"),
    "model_version": ("model_version", "modelVersion", "modelVersionId", "model_version_id"),
    "entry_odds_decimal": ("entry_odds_decimal", "entryOddsDecimal", "entry_odds", "odds"),
    "closing_odds_decimal": (
        "closing_odds_decimal",
        "closingOddsDecimal",
        "closing_odds",
        "closeOddsDecimal",
    ),
    "stake_units": ("stake_units", "stakeUnits", "stake"),
    "profit_loss_units": (
        "profit_loss_units",
        "profitLossUnits",
        "pnl_units",
        "pl_units",
        "profitLoss",
    ),
    "edge_pct": ("edge_pct", "edgePct", "model_edge_pct"),
}


@dataclass(frozen=True)
class BetRecord:
    """Normalized historical bet record used for CLV and market validation."""

    bet_id: str
    sport: str
    league: str
    market: str
    bookmaker: str
    model_version: str
    entry_odds_decimal: float
    closing_odds_decimal: float
    stake_units: float | None = None
    profit_loss_units: float | None = None
    edge_pct: float | None = None

    @property
    def entry_implied_probability(self) -> float:
        return 1.0 / self.entry_odds_decimal

    @property
    def closing_implied_probability(self) -> float:
        return 1.0 / self.closing_odds_decimal

    @property
    def clv_pct(self) -> float:
        return ((self.entry_odds_decimal / self.closing_odds_decimal) - 1.0) * 100.0

    @property
    def beat_close(self) -> bool:
        return self.clv_pct > 0

    @property
    def roi_pct(self) -> float | None:
        if self.stake_units is None or self.profit_loss_units is None:
            return None
        if self.stake_units <= 0:
            return None
        return (self.profit_loss_units / self.stake_units) * 100.0


@dataclass(frozen=True)
class EvolverPolicy:
    """Threshold policy for market and model approval decisions."""

    early_min_sample_size: int = 100
    early_min_avg_clv_pct: float = 0.0
    early_min_clv_hit_rate_pct: float = 52.0
    early_min_roi_pct: float = -2.0

    mature_min_sample_size: int = 250
    mature_min_avg_clv_pct: float = 0.25
    mature_min_clv_hit_rate_pct: float = 53.0
    mature_min_model_versions: int = 2

    restricted_min_sample_size: int = 50
    restricted_min_avg_clv_pct: float = 0.0
    restricted_min_clv_hit_rate_pct: float = 50.0

    block_max_avg_clv_pct: float = -0.25
    block_max_clv_hit_rate_pct: float = 48.0


@dataclass(frozen=True)
class SegmentMetrics:
    """Aggregated metrics for one market/model segment."""

    segment_key: str
    group: dict[str, str]
    sample_size: int
    avg_clv_pct: float
    clv_hit_rate_pct: float
    avg_roi_pct: float | None
    total_staked_units: float | None
    total_profit_loss_units: float | None
    avg_edge_pct: float | None
    model_versions: list[str]


@dataclass(frozen=True)
class EvolutionDecision:
    """System decision for a segment after CLV-first validation."""

    segment_key: str
    status: str
    reasons: list[str]
    recommended_action: str
    metrics: SegmentMetrics


@dataclass(frozen=True)
class EvolutionReport:
    """Full evolver output."""

    policy: EvolverPolicy
    group_by: list[str]
    total_records: int
    analyzed_segments: int
    decisions: list[EvolutionDecision] = field(default_factory=list)

    def to_json_dict(self) -> dict[str, object]:
        return {
            "policy": asdict(self.policy),
            "group_by": self.group_by,
            "total_records": self.total_records,
            "analyzed_segments": self.analyzed_segments,
            "decisions": [
                {
                    "segment_key": decision.segment_key,
                    "status": decision.status,
                    "reasons": decision.reasons,
                    "recommended_action": decision.recommended_action,
                    "metrics": asdict(decision.metrics),
                }
                for decision in self.decisions
            ],
        }


class DoctoreEvolver:
    """
    CLV-first market/model evaluator.

    Status meanings:
        approved:
            Segment has enough sample and positive enough CLV profile.

        restricted:
            Segment shows early signal but not enough proof for full sizing.

        watch:
            Segment lacks evidence or has mixed results. It should not return
            strong ACCEPT decisions.

        blocked:
            Segment shows structurally poor pricing quality and should be
            rejected until revalidated.
    """

    def __init__(self, policy: EvolverPolicy | None = None) -> None:
        self.policy = policy or EvolverPolicy()

    def analyze(
        self,
        records: Sequence[BetRecord],
        group_by: Sequence[str] = DEFAULT_GROUP_BY,
    ) -> EvolutionReport:
        grouped_records = self._group_records(records, group_by)
        decisions = [
            self._evaluate_segment(segment_key, group, segment_records)
            for segment_key, group, segment_records in grouped_records
        ]

        decisions = sorted(
            decisions,
            key=lambda item: (
                self._status_rank(item.status),
                item.metrics.avg_clv_pct,
                item.metrics.clv_hit_rate_pct,
                item.metrics.sample_size,
            ),
            reverse=True,
        )

        return EvolutionReport(
            policy=self.policy,
            group_by=list(group_by),
            total_records=len(records),
            analyzed_segments=len(decisions),
            decisions=decisions,
        )

    def _group_records(
        self,
        records: Sequence[BetRecord],
        group_by: Sequence[str],
    ) -> list[tuple[str, dict[str, str], list[BetRecord]]]:
        groups: dict[str, tuple[dict[str, str], list[BetRecord]]] = {}

        for record in records:
            group = {field_name: self._field_value(record, field_name) for field_name in group_by}
            key = "|".join(f"{name}={value}" for name, value in group.items())

            if key not in groups:
                groups[key] = (group, [])

            groups[key][1].append(record)

        return [(key, group, items) for key, (group, items) in groups.items()]

    def _evaluate_segment(
        self,
        segment_key: str,
        group: dict[str, str],
        records: Sequence[BetRecord],
    ) -> EvolutionDecision:
        metrics = self._calculate_metrics(segment_key, group, records)
        status, reasons, recommended_action = self._decide(metrics)

        return EvolutionDecision(
            segment_key=segment_key,
            status=status,
            reasons=reasons,
            recommended_action=recommended_action,
            metrics=metrics,
        )

    def _calculate_metrics(
        self,
        segment_key: str,
        group: dict[str, str],
        records: Sequence[BetRecord],
    ) -> SegmentMetrics:
        clv_values = [record.clv_pct for record in records]
        edge_values = [record.edge_pct for record in records if record.edge_pct is not None]
        roi_values = [record.roi_pct for record in records if record.roi_pct is not None]
        stake_values = [record.stake_units for record in records if record.stake_units is not None]
        pnl_values = [record.profit_loss_units for record in records if record.profit_loss_units is not None]
        model_versions = sorted({record.model_version for record in records if record.model_version})

        sample_size = len(records)
        avg_clv_pct = average(clv_values)
        clv_hit_rate_pct = percentage(sum(1 for value in clv_values if value > 0), sample_size)

        total_staked_units = sum(stake_values) if stake_values else None
        total_profit_loss_units = sum(pnl_values) if pnl_values else None

        return SegmentMetrics(
            segment_key=segment_key,
            group=group,
            sample_size=sample_size,
            avg_clv_pct=round(avg_clv_pct, 4),
            clv_hit_rate_pct=round(clv_hit_rate_pct, 2),
            avg_roi_pct=round(average(roi_values), 4) if roi_values else None,
            total_staked_units=round(total_staked_units, 4) if total_staked_units is not None else None,
            total_profit_loss_units=round(total_profit_loss_units, 4)
            if total_profit_loss_units is not None
            else None,
            avg_edge_pct=round(average(edge_values), 4) if edge_values else None,
            model_versions=model_versions,
        )

    def _decide(self, metrics: SegmentMetrics) -> tuple[str, list[str], str]:
        reasons: list[str] = []
        policy = self.policy

        if metrics.sample_size < policy.restricted_min_sample_size:
            reasons.append("sample_size_insufficient")
            return (
                "watch",
                reasons,
                "Keep logging only. Do not approve market until sample size improves.",
            )

        if (
            metrics.avg_clv_pct <= policy.block_max_avg_clv_pct
            and metrics.clv_hit_rate_pct < policy.block_max_clv_hit_rate_pct
        ):
            reasons.extend(["negative_avg_clv", "weak_clv_hit_rate"])
            return (
                "blocked",
                reasons,
                "Block segment from ACCEPT decisions until pricing process is revalidated.",
            )

        if metrics.sample_size < policy.early_min_sample_size:
            if (
                metrics.avg_clv_pct > policy.restricted_min_avg_clv_pct
                and metrics.clv_hit_rate_pct >= policy.restricted_min_clv_hit_rate_pct
            ):
                reasons.extend(["early_positive_clv", "sample_size_below_approval"])
                return (
                    "restricted",
                    reasons,
                    "Allow testing only with reduced stake caps. Continue CLV collection.",
                )

            reasons.append("sample_size_below_approval")
            return (
                "watch",
                reasons,
                "Keep segment under observation. Do not return strong ACCEPT decisions.",
            )

        if metrics.avg_clv_pct <= policy.early_min_avg_clv_pct:
            reasons.append("avg_clv_not_positive")
            return (
                "blocked",
                reasons,
                "Reject segment until average CLV turns positive over a fresh sample.",
            )

        if metrics.clv_hit_rate_pct < policy.early_min_clv_hit_rate_pct:
            reasons.append("clv_hit_rate_below_threshold")
            return (
                "restricted",
                reasons,
                "Keep segment active only with reduced stake caps and additional validation.",
            )

        if metrics.avg_roi_pct is not None and metrics.avg_roi_pct < policy.early_min_roi_pct:
            reasons.append("roi_structurally_negative")
            return (
                "restricted",
                reasons,
                "CLV is positive but ROI profile is weak. Reduce exposure and continue validation.",
            )

        if (
            metrics.sample_size >= policy.mature_min_sample_size
            and metrics.avg_clv_pct > policy.mature_min_avg_clv_pct
            and metrics.clv_hit_rate_pct >= policy.mature_min_clv_hit_rate_pct
            and len(metrics.model_versions) >= policy.mature_min_model_versions
        ):
            reasons.extend(["mature_sample", "positive_avg_clv", "strong_clv_hit_rate"])
            return (
                "approved",
                reasons,
                "Segment can produce ACCEPT decisions under standard risk caps.",
            )

        reasons.extend(["positive_avg_clv", "approval_threshold_met"])
        return (
            "approved",
            reasons,
            "Segment can produce ACCEPT decisions. Continue monitoring for mature validation.",
        )

    @staticmethod
    def _field_value(record: BetRecord, field_name: str) -> str:
        value = getattr(record, field_name, "")
        if value is None:
            return "unknown"
        text = str(value).strip()
        return text if text else "unknown"

    @staticmethod
    def _status_rank(status: str) -> int:
        return {
            "approved": 4,
            "restricted": 3,
            "watch": 2,
            "blocked": 1,
        }.get(status, 0)


def average(values: Sequence[float]) -> float:
    if not values:
        return 0.0
    return sum(values) / len(values)


def percentage(part: int, total: int) -> float:
    if total <= 0:
        return 0.0
    return (part / total) * 100.0


def parse_float(value: str | None, *, field_name: str, required: bool) -> float | None:
    if value is None or value == "":
        if required:
            raise ValueError(f"Missing required numeric field: {field_name}")
        return None

    try:
        parsed = float(value)
    except ValueError as error:
        raise ValueError(f"Invalid numeric field {field_name}: {value}") from error

    return parsed


def require_positive(value: float, *, field_name: str) -> float:
    if value <= 0:
        raise ValueError(f"{field_name} must be positive")
    return value


def get_alias_value(row: Mapping[str, str], canonical_name: str) -> str | None:
    aliases = COLUMN_ALIASES[canonical_name]
    for alias in aliases:
        if alias in row:
            value = row[alias]
            if value is not None and str(value).strip() != "":
                return str(value).strip()
    return None


def normalize_text(value: str | None, fallback: str = "unknown") -> str:
    if value is None:
        return fallback
    normalized = value.strip()
    return normalized if normalized else fallback


def bet_record_from_row(row: Mapping[str, str], row_number: int) -> BetRecord:
    entry_odds = parse_float(
        get_alias_value(row, "entry_odds_decimal"),
        field_name="entry_odds_decimal",
        required=True,
    )
    closing_odds = parse_float(
        get_alias_value(row, "closing_odds_decimal"),
        field_name="closing_odds_decimal",
        required=True,
    )

    if entry_odds is None or closing_odds is None:
        raise ValueError("Entry odds and closing odds are required")

    entry_odds = require_positive(entry_odds, field_name="entry_odds_decimal")
    closing_odds = require_positive(closing_odds, field_name="closing_odds_decimal")

    stake_units = parse_float(
        get_alias_value(row, "stake_units"),
        field_name="stake_units",
        required=False,
    )
    profit_loss_units = parse_float(
        get_alias_value(row, "profit_loss_units"),
        field_name="profit_loss_units",
        required=False,
    )
    edge_pct = parse_float(
        get_alias_value(row, "edge_pct"),
        field_name="edge_pct",
        required=False,
    )

    if stake_units is not None and stake_units <= 0:
        raise ValueError("stake_units must be positive when provided")

    return BetRecord(
        bet_id=normalize_text(get_alias_value(row, "bet_id"), fallback=f"row_{row_number}"),
        sport=normalize_text(get_alias_value(row, "sport")),
        league=normalize_text(get_alias_value(row, "league")),
        market=normalize_text(get_alias_value(row, "market")),
        bookmaker=normalize_text(get_alias_value(row, "bookmaker")),
        model_version=normalize_text(get_alias_value(row, "model_version")),
        entry_odds_decimal=entry_odds,
        closing_odds_decimal=closing_odds,
        stake_units=stake_units,
        profit_loss_units=profit_loss_units,
        edge_pct=edge_pct,
    )


def load_records_from_csv(path: Path) -> list[BetRecord]:
    if not path.exists():
        raise FileNotFoundError(f"Input file does not exist: {path}")

    records: list[BetRecord] = []
    errors: list[str] = []

    with path.open("r", encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        for row_number, row in enumerate(reader, start=2):
            try:
                records.append(bet_record_from_row(row, row_number))
            except ValueError as error:
                errors.append(f"Row {row_number}: {error}")

    if errors:
        joined_errors = "\n".join(errors[:25])
        suffix = "" if len(errors) <= 25 else f"\n...and {len(errors) - 25} more errors"
        raise ValueError(f"CSV validation failed:\n{joined_errors}{suffix}")

    return records


def parse_group_by(raw_value: str | None) -> list[str]:
    if raw_value is None or raw_value.strip() == "":
        return list(DEFAULT_GROUP_BY)

    allowed_fields = set(BetRecord.__dataclass_fields__.keys())
    group_by = [item.strip() for item in raw_value.split(",") if item.strip()]

    invalid_fields = [field_name for field_name in group_by if field_name not in allowed_fields]
    if invalid_fields:
        raise ValueError(
            "Invalid group-by field(s): "
            + ", ".join(invalid_fields)
            + f". Allowed: {', '.join(sorted(allowed_fields))}"
        )

    return group_by


def write_json_report(report: EvolutionReport, output_path: Path | None) -> None:
    payload = json.dumps(report.to_json_dict(), ensure_ascii=False, indent=2)

    if output_path is None:
        print(payload)
        return

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(payload + "\n", encoding="utf-8")


def build_argument_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Evaluate DOCTORE AI market/model segments through CLV-first validation."
    )
    parser.add_argument(
        "--input",
        required=True,
        help="Path to ledger CSV containing entry and closing odds.",
    )
    parser.add_argument(
        "--output",
        required=False,
        help="Optional output JSON path. Prints to stdout if omitted.",
    )
    parser.add_argument(
        "--group-by",
        required=False,
        default=",".join(DEFAULT_GROUP_BY),
        help=(
            "Comma-separated BetRecord fields used for segment grouping. "
            f"Default: {','.join(DEFAULT_GROUP_BY)}"
        ),
    )
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    parser = build_argument_parser()
    args = parser.parse_args(argv)

    input_path = Path(args.input)
    output_path = Path(args.output) if args.output else None
    group_by = parse_group_by(args.group_by)

    records = load_records_from_csv(input_path)
    evolver = DoctoreEvolver()
    report = evolver.analyze(records, group_by=group_by)
    write_json_report(report, output_path)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
