import type { HTMLAttributes, ReactNode } from "react";
// Style
import "./Badge.css";
// Components
import { cx } from "@barito-bahalap/components";
// Type
import type { Brand } from "@barito-bahalap/types";

export type BadgeVariant = "neutral" | "primary" | "accent" | "danger" | "safe";

export type BadgeProps = {
  label?: string;
  variant?: BadgeVariant;
  dot?: boolean;
  brand?: Brand;
  className?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLSpanElement>, "children">;

export function Badge({
  label,
  variant = "neutral",
  dot = false,
  brand,
  className,
  children,
  ...rest
}: BadgeProps) {
  const text = label ?? children;

  return (
    <span
      className={cx(
        "badge",
        `badge--${variant}`,
        dot && "badge--dot",
        className,
      )}
      data-brand={brand}
      {...rest}
    >
      {text}
    </span>
  );
}
