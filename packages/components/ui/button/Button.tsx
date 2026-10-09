import type { MouseEvent, ReactNode } from "react";
// Style
import "./Button.css";
// Components
import { SmartLink, Icon, type IconName } from "@baritobahalap/components";
// Utils
import { cx } from "@baritobahalap/components";
// Types
import type { Brand } from "@baritobahalap/types";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "outline"
  | "ghost"
  | "ink"
  | "light"
  | "outline-light";

export type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  iconName?: IconName;
  iconAfter?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  brand?: Brand;
  className?: string;
  children?: ReactNode;
};

type LabeledProps = CommonProps & { iconOnly?: false; ariaLabel?: string };
type IconOnlyProps = CommonProps & { iconOnly: true; ariaLabel: string };

export type ButtonProps = LabeledProps | IconOnlyProps;

const ICON_SIZE: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20 };

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    href,
    onClick,
    type = "button",
    iconName,
    iconAfter = false,
    loading = false,
    disabled = false,
    fullWidth = false,
    brand,
    className,
    children,
    ariaLabel,
  } = props;
  const iconOnly = props.iconOnly === true;
  const inactive = disabled || loading;

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
    <Icon name={iconName} size={ICON_SIZE[size]} />
  ) : null;

  const content = (
    <>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!iconAfter && icon}
      {!iconOnly && children && <span className="btn__label">{children}</span>}
      {iconAfter && icon}
    </>
  );

  if (href) {
    return (
      <SmartLink
        href={href}
        className={classes}
        data-brand={brand}
        aria-label={ariaLabel}
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
      className={classes}
      data-brand={brand}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      disabled={inactive}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
