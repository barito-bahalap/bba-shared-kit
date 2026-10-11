// Style
import "./StatCard.css";

export type StatTone = "default" | "positive" | "warning";

export interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: StatTone;
}

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: StatCardProps) {
  return (
    <div className={`stat-card stat-card--${tone}`}>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {hint ? <p className="stat-card__hint">{hint}</p> : null}
    </div>
  );
}
