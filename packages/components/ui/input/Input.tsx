import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
// Components
import { Field, describedBy } from "@baritobahalap/components";
// Utils
import { cx } from "@baritobahalap/components";

type FieldOwnProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

export type InputProps = FieldOwnProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

export function Input({
  id,
  label,
  error,
  hint,
  required,
  className,
  ...rest
}: InputProps) {
  return (
    <Field id={id} label={label} required={required} error={error} hint={hint}>
      <input
        id={id}
        className={cx("field__control", error && "is-invalid", className)}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...rest}
      />
    </Field>
  );
}

export type TextareaProps = FieldOwnProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

export function Textarea({
  id,
  label,
  error,
  hint,
  required,
  className,
  rows = 5,
  ...rest
}: TextareaProps) {
  return (
    <Field id={id} label={label} required={required} error={error} hint={hint}>
      <textarea
        id={id}
        rows={rows}
        className={cx("field__control", error && "is-invalid", className)}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...rest}
      />
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
  };

export function Select({
  id,
  label,
  error,
  hint,
  required,
  className,
  options,
  ...rest
}: SelectProps) {
  return (
    <Field id={id} label={label} required={required} error={error} hint={hint}>
      <select
        id={id}
        className={cx("field__control", error && "is-invalid", className)}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
