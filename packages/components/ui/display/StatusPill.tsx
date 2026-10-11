// Style
import "./StatusPill.css";

export type PillTone = "neutral" | "positive" | "warning" | "negative";

export interface StatusPillProps {
  label: string;
  tone?: PillTone;
}

export function StatusPill({ label, tone = "neutral" }: StatusPillProps) {
  return <span className={`status-pill status-pill--${tone}`}>{label}</span>;
}
