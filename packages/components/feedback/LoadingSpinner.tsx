// Style
import "./LoadingSpinner.css";
// Utils
import { cx } from "@barito-bahalap/components";

type SpinnerSize = "sm" | "md" | "lg";

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  message?: string;
  block?: boolean;
  full?: boolean;
}

export function LoadingSpinner({
  size = "md",
  message,
  block = false,
  full = false,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cx(
        "spinner",
        `spinner--${size}`,
        block && "spinner--block",
        full && "spinner--full",
      )}
      role="status"
      aria-live="polite"
    >
      <span className="spinner__ring" aria-hidden="true" />
      {message ? (
        <small className="spinner__text">{message}</small>
      ) : (
        <span className="spinner__sr">Loading</span>
      )}
    </div>
  );
}
