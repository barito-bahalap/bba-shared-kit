// Style
import "./Pill.css";

/**
Props:
  count      : items qty indicator
  variant    : "primary" | "secondary" | "ghost" | "safe" | "danger"
 */
export function Pill({ variant = "primary", count = 0 }) {
  if (count < 1) return null;
  return <span className={`pill-count ${variant}`}>{count}</span>;
}
