// Style
import "./Icon.css";
// Utils
import { cx } from "../../utils/cx";
import { ICON_PATHS, type IconName } from "./paths";

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  label,
  className,
}: IconProps) {
  return (
    <svg
      className={cx("icon", className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {ICON_PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
