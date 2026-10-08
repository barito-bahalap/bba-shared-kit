import { useState } from "react";
// Style
import "./Input.css";
// Components
import { Icon } from "@ampikalteng/components";

type InputProps = {
  id?: string;
  label?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled?: boolean;
  error?: string | null;
  textarea?: boolean;
  resizable?: boolean;
  rows?: number;
  className?: string;
  obscurial?: boolean;
  iconPath?: string | null;
  iconSize?: number;
  iconFill?: string;
  iconPosition?: "left" | "right";
  iconViewBox?: string;
  ref?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "ref"> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "ref">;

export function Input({
  id,
  label,
  required = false,
  type = "text",
  placeholder = "",
  value,
  onChange,
  ref,
  disabled = false,
  error,
  textarea = false,
  resizable = false,
  rows = 6,
  className = "",
  obscurial = false,
  iconPath = null,
  iconSize = 14,
  iconFill = "var(--clr-ink-muted)",
  iconPosition = "left",
  iconViewBox = "0 0 16 16",
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password" && obscurial;
  const resolvedType = isPassword && showPassword ? "text" : type;
  const hasIcon = !!iconPath;
  const needsWrap = isPassword || hasIcon;
  const errorId = id ? `${id}-error` : undefined;

  const inputClasses = [
    "input",
    isPassword ? "input-has-eye" : "",
    hasIcon && iconPosition === "left" ? "input-has-icon-left" : "",
    hasIcon && iconPosition === "right" ? "input-has-icon-right" : "",
    textarea ? "input-textarea" : "",
    error ? "input-error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="input-group">
      {label && (
        <label className="input-label" htmlFor={id}>
          {label}
          {required && (
            <span className="input-label__required" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      <div className={needsWrap ? "input-wrap" : undefined}>
        {hasIcon && iconPosition === "left" && (
          <span className="input-icon input-icon-left">
            <Icon
              path={iconPath}
              size={iconSize}
              fill={iconFill}
              viewBox={iconViewBox}
            />
          </span>
        )}

        {textarea || resizable ? (
          <textarea
            id={id}
            ref={ref as React.RefObject<HTMLTextAreaElement> | undefined}
            className={inputClasses}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            rows={rows}
            required={required}
            aria-required={required}
            aria-describedby={errorId}
            aria-invalid={!!error}
            style={{
              resize: resizable ? "vertical" : "none",
              overflow: "auto",
            }}
            {...rest}
          />
        ) : (
          <input
            id={id}
            ref={ref as React.RefObject<HTMLInputElement> | undefined}
            type={resolvedType}
            className={inputClasses}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            aria-required={required}
            aria-describedby={errorId}
            aria-invalid={!!error}
            {...rest}
          />
        )}

        {hasIcon && iconPosition === "right" && (
          <span className="input-icon input-icon-right">
            <Icon
              path={iconPath}
              size={iconSize}
              fill={iconFill}
              viewBox={iconViewBox}
            />
          </span>
        )}

        {isPassword && (
          <button
            type="button"
            className="input-eye"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon
              iconName={showPassword ? "eyeSlashFill" : "eye"}
              size={16}
              fill={iconFill}
            />
          </button>
        )}
      </div>
      {error && (
        <div
          id={errorId}
          role="alert"
          className="stack row middle start gap-1 fit"
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
