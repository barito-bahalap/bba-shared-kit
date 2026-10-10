import type { HTMLAttributes, MouseEvent, CSSProperties } from "react";
// Style
import "./Button.css";
// Components
import { SmartLink, Icon } from "@barito-bahalap/components";
// Utils
import { cx } from "@barito-bahalap/components";
// Types
import type { Brand, IconsType } from "@barito-bahalap/types";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "outline"
  | "ghost"
  | "ink"
  | "light"
  | "outline-light";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  label?: string;
  variant?: ButtonVariant;
  iconFill?: string;
  iconFillHover?: string;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  to?: string; // alias of href (old API)
  iconName?: IconsType;
  iconSize?: number;
  iconAfter?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  tooltip?: string;
  ariaLabel?: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
  brand?: Brand;
  children?: React.ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "onClick" | "children">;

const ICON_SIZE: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20 };

export function Button({
  label,
  variant = "primary",
  iconFill = "var(--clr-ink-on-dark)",
  iconFillHover = "var(--clr-ink-on-dark)",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  href,
  to,
  iconName,
  iconSize,
  iconAfter = false,
  onClick,
  type = "button",
  tooltip,
  ariaLabel,
  className,
  bgColor,
  textColor,
  brand,
  children,
  ...rest
}: ButtonProps) {
  const text = label ?? children;
  const iconOnly = !!iconName && !text;
  const inactive = disabled || loading;
  const link = to ?? href;

  const customStyle: CSSProperties | undefined =
    bgColor || textColor
      ? ({
          ...(bgColor && {
            "--btn-bg": bgColor,
            "--btn-border": bgColor,
            "--btn-bg-hover": bgColor,
            "--btn-border-hover": bgColor,
          }),
          ...(textColor && { "--btn-fg": textColor }),
        } as CSSProperties)
      : undefined;

  const classes = cx(
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && "btn--full",
    iconOnly && "btn--icon-only",
    loading && "btn--loading",
    inactive && "is-inactive",
    className,
  );

  const icon = iconName ? (
    <Icon
      iconName={iconName}
      fill={iconFill}
      fillHover={iconFillHover}
      size={iconSize ?? ICON_SIZE[size]}
    />
  ) : null;

  const content = (
    <>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!iconAfter && icon}
      {!iconOnly && text && <span className="btn__label">{text}</span>}
      {iconAfter && icon}
    </>
  );

  const shared = {
    className: classes,
    style: customStyle,
    title: tooltip,
    "data-brand": brand,
    "aria-label": ariaLabel ?? (iconOnly ? tooltip : undefined),
    ...rest,
  };

  if (link) {
    return (
      <SmartLink
        href={link}
        {...shared}
        aria-disabled={inactive || undefined}
        tabIndex={inactive ? -1 : undefined}
        onClick={(event) => {
          if (inactive) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
      >
        {content}
      </SmartLink>
    );
  }

  return (
    <button
      type={type}
      {...shared}
      aria-busy={loading || undefined}
      disabled={inactive}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
