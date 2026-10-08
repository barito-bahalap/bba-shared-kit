// Style
import "./EmptyState.css";

/**
EmptyState: Centered placeholder for no-data / no-results scenarios.

Props: 
  title   : heading text
  sub     : supporting description
  action  : optional JSX, usually a <Button> to take action
*/

type EmptyStateProps = {
  className?: string;
  title?: React.ReactNode;
  sub?: React.ReactNode;
  action?: React.ReactNode;
  full?: boolean;
};

export function EmptyState({
  className,
  title = "Nothing to see here.",
  sub,
  action,
  full = false,
}: EmptyStateProps) {
  return (
    <div
      className={`empty-state ${full ? "empty-state--full" : ""} ${className}`}
    >
      <h6 className="empty-state-title">{title}</h6>
      {sub && <small className="empty-state-sub">{sub}</small>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}

/** Usage

    // No search results
    <EmptyState 
      title="No properties found."
      sub="Try adjusting your filters or search a different location."
    /> 

    // With action button
    <EmptyState 
      title="No properties listed."
      sub="Add your first property to get started."
      action={<Button label="Add Property" to="/staff/properties/new" />}
    />

    // Typical query pattern
    if (!data.length) return <EmptyState title="No results." sub="Try different filters." />;

*/
