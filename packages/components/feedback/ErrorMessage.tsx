// Style
import "./ErrorMessage.css";

interface ErrorMessageProps {
  className?: string;
  message?: string;
  hint?: string | null;
  block?: boolean;
  backgroundColor?: string;
  noBorder?: boolean;
  full?: boolean;
}

/**
ErrorMessage: Displays an error string, inline or block-centered.

Props:
  message : error text to display
  hint    : optional secondary line (block mode only)
  block   : centered layout with padding, for section-level errors
*/
export function ErrorMessage({
  className = "",
  message = "Something went wrong.",
  hint = "",
  block = false,
  backgroundColor = "var(--clr-danger-soft)",
  noBorder = false,
  full = false,
}: ErrorMessageProps) {
  const classes = [
    noBorder ? "no-border" : "",
    full ? "error-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (block) {
    return (
      <div
        className={`error-msg error-msg-block ${classes}`}
        role="alert"
        style={{ background: backgroundColor }}
      >
        <h6 className="error-msg-text">{message}</h6>
        {hint && <span className="error-msg-hint">{hint}</span>}
      </div>
    );
  }

  return (
    <div className={`error-msg ${classes}`} role="alert">
      <span className="error-msg-text">{message}</span>
    </div>
  );
}

/** Usage

    // Inline (below a field)
    <ErrorMessage message="Phone number is required" />

    // Section-level
    <ErrorMessage block message="Failed to load properties." hint="Check your connection and try again." />

    // Typical query pattern
    if (error) return <ErrorMessage block message="Failed to load properties." />;

*/
