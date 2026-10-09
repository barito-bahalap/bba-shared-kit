// Style
import "./ErrorMessage.css";
// Utils
import { cx } from "@baritobahalap/components";

interface ErrorMessageProps {
  message?: string;
  hint?: string;
  block?: boolean;
  className?: string;
}

export function ErrorMessage({
  message = "Something went wrong.",
  hint,
  block = false,
  className,
}: ErrorMessageProps) {
  if (block) {
    return (
      <div
        className={cx("status", "error-msg", "error-msg--block", className)}
        role="alert"
      >
        <h3 className="error-msg__title">{message}</h3>
        {hint && <p className="error-msg__hint">{hint}</p>}
      </div>
    );
  }

  return (
    <p className={cx("error-msg", className)} role="alert">
      {message}
    </p>
  );
}
