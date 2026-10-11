import { useState } from "react";
import type {
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  Ref,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
// Style
import "./Input.css";
// Components
import { Field, describedBy } from "@barito-bahalap/components";
// Utils
import { cx } from "@barito-bahalap/components";

type FieldOwnProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

function joinIds(...ids: Array<string | undefined>) {
  const joined = ids.filter(Boolean).join(" ");
  return joined || undefined;
}

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off ? <path d="M4 4l16 16" /> : null}
    </svg>
  );
}

export type InputProps = FieldOwnProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
    obscurial?: boolean;
    leading?: ReactNode;
    trailing?: ReactNode;
    ref?: Ref<HTMLInputElement>;
  };

export function Input({
  id,
  label,
  error,
  hint,
  required,
  className,
  type = "text",
  obscurial = false,
  leading,
  trailing,
  ref,
  onKeyDown,
  onKeyUp,
  onBlur,
  ...rest
}: InputProps) {
  const [revealed, setRevealed] = useState(false);
  const [capsOn, setCapsOn] = useState(false);

  const resolvedType = obscurial ? (revealed ? "text" : "password") : type;
  const trailCount = (trailing ? 1 : 0) + (obscurial ? 1 : 0);
  const adorned = Boolean(leading) || trailCount > 0;
  const capsId = `${id}-caps`;

  const syncCaps = (e: KeyboardEvent<HTMLInputElement>) => {
    if (obscurial && !revealed) setCapsOn(e.getModifierState("CapsLock"));
  };

  const control = (
    <input
      id={id}
      ref={ref}
      type={resolvedType}
      className={cx(
        "field__control",
        error && "is-invalid",
        Boolean(leading) && "field__control--lead",
        trailCount === 1 && "field__control--trail-1",
        trailCount === 2 && "field__control--trail-2",
        className,
      )}
      required={required}
      aria-invalid={error ? true : undefined}
      aria-describedby={joinIds(
        describedBy(id, error, hint),
        capsOn ? capsId : undefined,
      )}
      spellCheck={obscurial ? false : undefined}
      autoCapitalize={obscurial ? "off" : undefined}
      onKeyDown={(e) => {
        syncCaps(e);
        onKeyDown?.(e);
      }}
      onKeyUp={(e) => {
        syncCaps(e);
        onKeyUp?.(e);
      }}
      onBlur={(e) => {
        setCapsOn(false);
        onBlur?.(e);
      }}
      {...rest}
    />
  );

  return (
    <Field id={id} label={label} required={required} error={error} hint={hint}>
      {adorned ? (
        <div className="field__wrap">
          {leading ? (
            <span className="field__adornment field__adornment--lead">
              {leading}
            </span>
          ) : null}
          {control}
          <span className="field__trail">
            {trailing ? (
              <span className="field__adornment">{trailing}</span>
            ) : null}
            {obscurial ? (
              <button
                type="button"
                className="field__toggle"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setRevealed((v) => !v)}
                disabled={rest.disabled}
                aria-pressed={revealed}
                aria-label={revealed ? "Hide password" : "Show password"}
              >
                <EyeIcon off={revealed} />
              </button>
            ) : null}
          </span>
        </div>
      ) : (
        control
      )}
      {capsOn ? (
        <span id={capsId} className="field__note" role="status">
          Caps Lock is on
        </span>
      ) : null}
    </Field>
  );
}

export type TextareaProps = FieldOwnProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
    showCount?: boolean;
    ref?: Ref<HTMLTextAreaElement>;
  };

export function Textarea({
  id,
  label,
  error,
  hint,
  required,
  className,
  rows = 5,
  showCount = false,
  ref,
  ...rest
}: TextareaProps) {
  const counting = showCount && typeof rest.maxLength === "number";
  const length = typeof rest.value === "string" ? rest.value.length : 0;
  const countId = `${id}-count`;

  return (
    <Field id={id} label={label} required={required} error={error} hint={hint}>
      <textarea
        id={id}
        ref={ref}
        rows={rows}
        className={cx("field__control", error && "is-invalid", className)}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={joinIds(
          describedBy(id, error, hint),
          counting ? countId : undefined,
        )}
        {...rest}
      />
      {counting ? (
        <span id={countId} className="field__count">
          {length}/{rest.maxLength}
        </span>
      ) : null}
    </Field>
  );
}

export interface SelectOption {
  value: string;
  label: string;
}

export type SelectProps = FieldOwnProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
    options: readonly SelectOption[];
    placeholder?: string;
  };

export function Select({
  id,
  label,
  error,
  hint,
  required,
  className,
  options,
  placeholder,
  ...rest
}: SelectProps) {
  const uncontrolled =
    rest.value === undefined && rest.defaultValue === undefined;

  return (
    <Field id={id} label={label} required={required} error={error} hint={hint}>
      <select
        id={id}
        className={cx("field__control", error && "is-invalid", className)}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        defaultValue={uncontrolled && placeholder ? "" : undefined}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
