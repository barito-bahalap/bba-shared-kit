import type { ReactNode } from "react";
// Style
import "./Callout.css";

interface CalloutProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function Callout({ title, children, action, className }: CalloutProps) {
  return (
    <aside className={["callout", className].filter(Boolean).join(" ")}>
      <h3 className="callout__title">{title}</h3>
      <div className="callout__body">{children}</div>
      {action && <div className="callout__action">{action}</div>}
    </aside>
  );
}
