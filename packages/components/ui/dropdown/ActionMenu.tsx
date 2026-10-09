import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
// Style
import "./ActionMenu.css";
// Components
import { Icon } from "@baritobahalap/components";
import type { IconsType } from "@baritobahalap/types";

const POPOVER_W = 170;
const POPOVER_H = 220; // generous estimate
const GAP = 4;

export function ActionMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<PopoverPos>({});
  const triggerRef = useRef<HTMLButtonElement>(null);

  const popoverRef = useRef<HTMLDivElement>(null);

  const calcPos = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    // const vw = window.innerWidth;
    const vh = window.innerHeight;
    const next: PopoverPos = {};
    // Horizontal: prefer right-aligned to trigger, flip left if overflow
    if (rect.right - POPOVER_W >= 0) {
      next.left = rect.right - POPOVER_W;
    } else {
      next.left = rect.left;
    }
    // Clamp so it never goes off left edge
    next.left = Math.max(8, next.left);
    // Vertical: prefer below, flip above if not enough space
    const spaceBelow = vh - rect.bottom;
    const spaceAbove = rect.top;
    if (spaceBelow >= POPOVER_H || spaceBelow >= spaceAbove) {
      next.top = rect.bottom + GAP;
    } else {
      next.top = rect.top - POPOVER_H - GAP;
    }
    // Clamp top
    next.top = Math.max(8, next.top);
    setPos(next);
  }, []);

  useEffect(() => {
    if (!open) return;
    calcPos();
    function onClose(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }
    document.addEventListener("mousedown", onClose);
    window.addEventListener("resize", calcPos);
    window.addEventListener("scroll", calcPos, true);
    return () => {
      document.removeEventListener("mousedown", onClose);
      window.removeEventListener("resize", calcPos);
      window.removeEventListener("scroll", calcPos, true);
    };
  }, [open, calcPos]);

  const visible = items.filter((item) => !item.hidden);

  return (
    <div className="action-menu">
      <button
        ref={triggerRef}
        className="action-menu__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label="Actions"
      >
        <Icon
          iconName="threeDotsVertical"
          size={12}
          fill="var(--clr-ink-muted)"
        />
      </button>

      {open &&
        createPortal(
          <div
            ref={popoverRef}
            className="action-menu__popover"
            style={{ top: pos.top, left: pos.left, width: POPOVER_W }}
          >
            {visible.map((item, i) =>
              item.to ? (
                <Link
                  key={i}
                  to={item.to}
                  className="action-menu__item"
                  onClick={() => setOpen(false)}
                >
                  {item.icon && (
                    <Icon
                      iconName={item.icon}
                      size={13}
                      fill="var(--clr-ink-soft)"
                    />
                  )}
                  <span className="text eyebrow">{item.label}</span>
                </Link>
              ) : (
                <div className="stack col gap-0">
                  {item.danger && <div className="divider" />}
                  <button
                    key={i}
                    className={`action-menu__item${item.danger ? " action-menu__item--danger" : item.safe ? " action-menu__item--safe" : ""}`}
                    onClick={() => {
                      setOpen(false);
                      item.onClick?.();
                    }}
                    disabled={item.disabled}
                  >
                    {item.icon && (
                      <Icon
                        iconName={item.icon}
                        size={13}
                        fill={
                          item.danger
                            ? "var(--clr-danger)"
                            : item.safe
                              ? "var(--clr-safe)"
                              : "var(--clr-ink-soft)"
                        }
                      />
                    )}
                    <span className="text eyebrow">{item.label}</span>
                  </button>
                </div>
              ),
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}

type ActionItem = {
  label: string;
  icon?: IconsType;
  onClick?: () => void;
  to?: string;
  safe?: boolean;
  danger?: boolean;
  disabled?: boolean;
  hidden?: boolean;
};

type Props = {
  items: ActionItem[];
};

type PopoverPos = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};
