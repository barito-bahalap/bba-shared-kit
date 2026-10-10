// Style
import "./Checklist.css";

export interface ChecklistProps {
  items: string[];
  className?: string;
}

export function Checklist({ items, className }: ChecklistProps) {
  return (
    <ul className={["checklist", className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <li className="checklist__item" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
