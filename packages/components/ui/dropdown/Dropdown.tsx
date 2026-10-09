// Style
import "./Dropdown.css";
// Components
import { Icon } from "@barito-bahalap/components";

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type DropdownProps = {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  options?: readonly DropdownOption[];
  placeholder?: string;
  required?: boolean;
  lockPlaceholderAfterSelect?: boolean; // for required fields where re-selecting "choose one" shouldn't be possible once answered
  wide?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  full?: boolean;
  error?: string;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange">;

export function Dropdown({
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
  lockPlaceholderAfterSelect = false,
  wide = false,
  className = "",
  disabled = false,
  id,
  label,
  full = false,
  error,
  ...rest
}: DropdownProps) {
  const errorId = id ? `${id}-error` : undefined;
  const classes = [
    "dropdown",
    wide ? "dropdown-wide" : "",
    disabled ? "dropdown-disabled" : "",
    error ? "dropdown-error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`dropdown-group ${full ? "full" : ""}`}>
      {label && (
        <label className="dropdown-label" htmlFor={id}>
          {label}
          {required && (
            <span className="dropdown-label__required" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      <select
        id={id}
        className={classes}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-required={required}
        aria-describedby={errorId}
        aria-invalid={!!error}
        {...rest}
      >
        {placeholder && (
          <option
            value=""
            disabled={lockPlaceholderAfterSelect && value !== ""}
          >
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <div
          id={errorId}
          role="alert"
          className="stack row middle start gap-0 fit"
        >
          <Icon
            iconName="exclamationTriangleFill"
            fill="var(--clr-danger)"
            size={12}
          />
          <p className="input-error-msg">{error}</p>
        </div>
      )}
    </div>
  );
}
