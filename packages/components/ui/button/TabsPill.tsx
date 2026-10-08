// Style
import "./TabsPill.css";

type TabsPillProps = {
  label: string;
  count: number;
  active?: boolean;
  onClick: () => void;
};

export function TabsPill({
  label,
  count,
  active = false,
  onClick,
}: TabsPillProps) {
  return (
    <button
      type="button"
      className={`tabs__pill ${active ? "is-active" : ""}`}
      role="tab"
      aria-selected={active}
      onClick={onClick}
    >
      {label}
      <span className="tabs__count">{count}</span>
    </button>
  );
}
