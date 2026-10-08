import React from "react";
import { Link } from "react-router-dom";
// Style
import "./Button.css";
// Components
import { Icon, Pill } from "@ampikalteng/components";
// Types
import type { IconsType } from "@ampikalteng/types";

export type ButtonVariants =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "safe"
  | "ink";

type ButtonProps = {
  label?: string;
  variant?: ButtonVariants;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  to?: string;
  href?: string;
  iconName?: IconsType;
  onClick?: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
  >;
  type?: "button" | "submit" | "reset";
  state?: unknown;
  tooltip?: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
  count?: number;
  iconSize?: number;
  iconAfter?: boolean;
  iconFill?: string;
  viewBox?: string;
} & React.HTMLAttributes<HTMLElement>;

export function Button({
  label = "Button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  to,
  href,
  iconName,
  onClick,
  type = "button",
  state,
  tooltip,
  className = "",
  bgColor = "var(--clr-ink)",
  textColor = "var(--clr-paper)",
  count = 0,
  iconSize = 16,
  iconAfter = false,
  iconFill = "currentColor",
  viewBox = "0 0 16 16",
  ...rest
}: ButtonProps) {
  const isIconOnly = !!iconName && label === "Button";

  // allow CSS variables
  const customStyle: React.CSSProperties | undefined =
    bgColor || textColor
      ? ({
          "--btn-bg": bgColor,
          "--btn-text": textColor,
          "--btn-border": bgColor,
          "--btn-bg-hover": bgColor,
        } as React.CSSProperties)
      : undefined;

  const hasCustomColors =
    bgColor !== "var(--clr-ink)" || textColor !== "var(--clr-paper)";

  const classes = [
    "btn",
    `btn-${variant}`,
    hasCustomColors ? "btn-custom" : "",
    size !== "md" ? `btn-${size}` : "",
    fullWidth ? "btn-full" : "",
    loading ? "btn-loading" : "",
    disabled ? "disabled" : "",
    isIconOnly ? "btn-icon-only" : "",
    iconName ? "has-icon" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconEl = iconName && (
    <Icon
      iconName={iconName}
      size={iconSize}
      fill={iconFill}
      viewBox={viewBox}
    />
  );

  const content = (
    <div className={`stack row middle center gap-2`}>
      {!iconAfter && iconEl}
      {!isIconOnly && <span className="button-label">{label}</span>}
      {iconAfter && iconEl}
      {!!count && <Pill count={count} />}
    </div>
  );

  // LINK
  if (to) {
    return (
      <Link
        to={disabled || loading ? "#" : to}
        state={disabled ? undefined : state}
        className={classes}
        onClick={(e) => {
          if (disabled || loading) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        aria-disabled={disabled || loading}
        title={tooltip}
        style={customStyle}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  // EXTERNAL LINK
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled || loading}
        title={tooltip}
        style={customStyle}
        onClick={onClick}
        {...rest}
      >
        {content}
      </a>
    );
  }

  // BUTTON
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      title={tooltip}
      style={customStyle}
      aria-label={label}
      {...rest}
    >
      {content}
    </button>
  );
}
