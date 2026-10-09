// Style
import "./StatBlock.css";

interface StatBlockProps {
  value: string;
  label: string;
  note?: string;
}

export function StatBlock({ value, label, note }: StatBlockProps) {
  return (
    <div className="stat-block">
      <p className="stat-block__value">{value}</p>
      <p className="stat-block__label">{label}</p>
      {note && <small className="stat-block__note">{note}</small>}
    </div>
  );
}
