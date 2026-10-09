import type { ReactNode } from "react";
// Style
import "./Checkbox.css";

interface CheckboxProps {
  id: string;
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  disabled?: boolean;
}

export function Checkbox({
  id,
  label,
  checked,
  onChange,
  error,
  disabled,
}: CheckboxProps) {
  return (
    <div className="checkbox">
      <label className="checkbox__label" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          className="checkbox__input"
          checked={checked}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="checkbox__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
