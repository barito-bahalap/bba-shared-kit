// Style
import "./KeyValueList.css";

export interface KeyValueItem {
  label: string;
  value: string;
}

export interface KeyValueListProps {
  items: KeyValueItem[];
  className?: string;
}

export function KeyValueList({ items, className }: KeyValueListProps) {
  return (
    <dl className={["key-value-list", className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <div className="key-value-list__row" key={item.label}>
          <dt className="key-value-list__label">{item.label}</dt>
          <dd className="key-value-list__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
