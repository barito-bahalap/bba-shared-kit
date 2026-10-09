import type { ReactNode } from "react";
// Style
import "./Badge.css";
// Components
import { cx } from "@barito-bahalap/components";
// Type
import type { Brand } from "@barito-bahalap/types";

export type BadgeVariant = "neutral" | "primary" | "accent" | "danger" | "safe";

interface BadgeProps {
  variant?: BadgeVariant;
  dot?: boolean;
  brand?: Brand;
  className?: string;
  children: ReactNode;
}

export function Badge({
  variant = "neutral",
  dot = false,
  brand,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cx(
        "badge",
        `badge--${variant}`,
        dot && "badge--dot",
        className,
      )}
      data-brand={brand}
    >
      {children}
    </span>
  );
}
