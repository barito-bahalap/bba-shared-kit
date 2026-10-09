import type { ReactNode } from "react";
// Style
import "./Field.css";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

export function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: FieldProps) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
        {required && (
          <span className="field__required" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <small id={`${id}-hint`} className="field__hint">
          {hint}
        </small>
      )}
      {error && (
        <p id={`${id}-error`} className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
