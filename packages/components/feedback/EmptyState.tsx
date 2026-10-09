import type { ReactNode } from "react";
// Style
import "./EmptyState.css";
// Utils
import { cx } from "@baritobahalap/components";

interface EmptyStateProps {
  title?: ReactNode;
  sub?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title = "Nothing to show yet.",
  sub,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cx("status", "empty-state", className)}>
      <h3 className="empty-state__title">{title}</h3>
      {sub && <p className="empty-state__sub">{sub}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
