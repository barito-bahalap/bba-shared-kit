import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
// Style
import "./LanguageSwitcher.css";
// Utils
import { cx } from "@barito-bahalap/components/utils";

export interface LanguageSwitcherItem {
  code: string;
  short: string;
  label: string;
  lang: string;
  href: string;
  active: boolean;
}

interface LanguageSwitcherProps {
  items: readonly LanguageSwitcherItem[];
  label: string;
  onDark?: boolean;
  className?: string;
}

export function LanguageSwitcher({
  items,
  label,
  onDark = false,
  className,
}: LanguageSwitcherProps) {
  if (items.length < 2) return null;

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.active),
  );
  const style = {
    "--lang-index": activeIndex,
    "--lang-count": items.length,
  } as CSSProperties;

  return (
    <nav
      className={cx("lang-switch", onDark && "lang-switch--on-dark", className)}
      aria-label={label}
      style={style}
    >
      {items.map((item) => (
        <Link
          key={item.code}
          to={item.href}
          lang={item.lang}
          hrefLang={item.lang}
          title={item.label}
          aria-current={item.active ? "true" : undefined}
          className={cx(
            "lang-switch__item",
            item.active && "lang-switch__item--active",
          )}
        >
          {item.short}
        </Link>
      ))}
    </nav>
  );
}
