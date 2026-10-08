import React from "react";
// Style
import "./Badge.css";

export type BadgeVariants =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "safe";

type BadgeProps = {
  variant?: BadgeVariants;
  label?: string;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

/**
Badge: Small status chip / label.

Variants (token-driven):
  - primary   → brand emphasis
  - secondary → accent
  - outline   → transparent bordered
  - ghost     → subtle low-emphasis
  - danger    → destructive / warning state
  - safe      → success / positive state

Props:
  variant   : visual style
  label     : text content
  className : extra classes
*/
export function Badge({
  variant = "primary",
  label = "",
  className = "",
  ...rest
}: BadgeProps) {
  const classes = ["badge", `badge-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {label}
    </span>
  );
}
