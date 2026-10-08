import { useState } from "react";
import type { ChangeEvent, FocusEvent } from "react";
// Style
import "./Checkbox.css";

interface CheckboxProps {
  id?: string;
  label: string;
  onChange?: (checked: boolean) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  reverse?: boolean;
  checked?: boolean;
  disabled?: boolean;
  "aria-describedby"?: string;
}

export function Checkbox({
  id,
  label,
  onChange,
  onBlur,
  reverse = false,
  checked: controlledChecked,
  disabled = false,
  "aria-describedby": ariaDescribedBy,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState<boolean>(false);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    if (!isControlled) setInternalChecked(value);
    onChange?.(value);
  };

  return (
    <label className="checkbox text sm muted" htmlFor={id}>
      {reverse && <span dangerouslySetInnerHTML={{ __html: label }} />}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onBlur={onBlur}
        aria-describedby={ariaDescribedBy}
      />
      {!reverse && <span dangerouslySetInnerHTML={{ __html: label }} />}
    </label>
  );
}
