// Style
import "./Calendar.css";
// Components
import { Icon } from "@ampikalteng/components";

/**
Calendar: Styled date input. Use for date range filters and form date fields.

Props:
  value       : controlled value "YYYY-MM-DD" string
  onChange    : change handler
  label       : label above (form mode, optional)
  placeholder : not shown by browsers for date inputs, kept for API consistency
  min         : min date string "YYYY-MM-DD"
  max         : max date string "YYYY-MM-DD"
  disabled    : disabled state
  id          : for label linkage
  className   : extra classes
*/
export function Calendar({
  value,
  onChange,
  label,
  min,
  max,
  disabled = false,
  id,
  className = "",
  error,
  ...rest
}: CalendarProps) {
  const classes = [
    "calendar-input",
    disabled ? "calendar-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="calendar-group">
      {label && (
        <label className="calendar-label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type="date"
        className={classes}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        disabled={disabled}
        {...rest}
      />

      {error && (
        <div className="stack row middle start gap-0 fit">
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

type CalendarProps = {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

/** Usage

    // Toolbar date range
    <Calendar
      value={dateFrom}
      onChange={(e) => setDateFrom(e.target.value)}
      title="From date"
      max={dateTo || undefined}
    />
    <Calendar
      value={dateTo}
      onChange={(e) => setDateTo(e.target.value)}
      title="To date"
      min={dateFrom || undefined}
    />

    // Form mode with label
    <Calendar
      id="visit-date"
      label="Visit Date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      min={today}
    />

*/
