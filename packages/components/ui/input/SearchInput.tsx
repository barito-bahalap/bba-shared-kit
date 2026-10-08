import React, { useEffect, useRef } from "react";
// Style
import "./SearchInput.css";
// Components
import { Icon } from "@ampikalteng/components";

// Types
interface SearchInputProps {
  value: string; /** Controlled value: caller owns the state. */
  onChange: (value: string) => void;
  placeholder?: string;
  rounded?: boolean; /** Use pill border-radius. */
  radius?: number; /** Border-radius in px. Ignored when rounded=true. */
  fullWidth?: boolean;
  width?: string; /** Explicit width e.g. "300px". Ignored when fullWidth=true. */
  disabled?: boolean;
  className?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
}

// Component
export function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  rounded = false,
  radius = 6,
  fullWidth = false,
  width,
  disabled = false,
  className = "",
  onFocus,
  onBlur,
  autoFocus = false,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValue = value.length > 0;

  useEffect(() => {
    if (autoFocus) {
      // slight delay so it focuses after the width transition starts,
      // avoiding a jarring snap-then-grow
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [autoFocus]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  function handleClear() {
    onChange("");
    inputRef.current?.focus();
  }

  const borderRadius = rounded ? "var(--radius-circle)" : `${radius}px`;
  const style: React.CSSProperties = {
    borderRadius,
    width: fullWidth ? "100%" : (width ?? undefined),
  };
  const wrapperClasses = [
    "search-input",
    fullWidth ? "search-input--full" : "",
    disabled ? "search-input--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses} style={style}>
      {/* Search icon: decorative, left side */}
      <span
        className="search-input__icon search-input__icon--left"
        aria-hidden="true"
      >
        <Icon
          iconName="search"
          fill="var(--clr-ink-on-dark)"
          bgColor="transparent"
        />
      </span>

      <input
        ref={inputRef}
        type="search"
        className="search-input__field"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        aria-label={placeholder}
        /* Suppress browser default clear button: we render our own */
        style={{ "--webkit-appearance": "none" } as React.CSSProperties}
      />

      {/* Clear button: only visible when there is a value */}
      {hasValue && (
        <button
          type="button"
          className="search-input__clear"
          onClick={handleClear}
          tabIndex={-1}
          aria-label="Clear search"
        >
          <Icon
            iconName="xLg"
            size={12}
            fill="var(--clr-ink-on-dark)"
            bgColor="transparent"
          />
        </button>
      )}
    </div>
  );
}

/**
 * Usage:
 *
 * Basic (caller owns state)
 *   const [q, setQ] = useState("");
 *   <SearchInput value={q} onChange={setQ} />
 *
 * Full width
 *   <SearchInput value={q} onChange={setQ} fullWidth />
 *
 * Pill shape
 *   <SearchInput value={q} onChange={setQ} rounded />
 *
 * Fixed width
 *   <SearchInput value={q} onChange={setQ} width="320px" />
 */
