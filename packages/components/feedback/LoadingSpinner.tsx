// Style
import "./LoadingSpinner.css";

/**
LoadingSpinner: Animated spinner for loading states.
Props:
  size  : "sm" | "md" | "lg"  (default: "md")
  block : centers in container with padding
  full  : fixed full-viewport overlay
*/
export function LoadingSpinner({
  size = "md",
  message = "",
  block = false,
  full = false,
  backgroundColor = "transparent",
}) {
  const spinner = (
    <span
      className={`stack col center gap-4 spinner-${size}`}
      style={{ backgroundColor }}>
      <span className="spinner-ring" aria-hidden="true" />
      {message != "" && <small className="spinner-text">{message}</small>}
    </span>
  );

  if (full)
    return (
      <div className="spinner-full" role="status" aria-label="Loading">
        {spinner}
      </div>
    );
  if (block)
    return (
      <div className="spinner-block" role="status" aria-label="Loading">
        {spinner}
      </div>
    );

  return (
    <span role="status" aria-label="Loading">
      {spinner}
    </span>
  );
}

/** Usage

    // Full page (auth check, initial load)
    <LoadingSpinner full />

    // Centered in a content area
    <LoadingSpinner block />

    // Inline inside a button
    <LoadingSpinner size="sm" />

    // Typical query pattern
    if (isLoading) return <LoadingSpinner block />;

*/
