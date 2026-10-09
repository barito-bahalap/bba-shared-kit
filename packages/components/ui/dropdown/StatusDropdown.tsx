import { useState, useRef, useEffect } from "react";
// Style
import "./StatusDropdown.css";
// Components
import { Badge, Icon, type BadgeVariant } from "@barito-bahalap/components";

type StatusItem = {
  label: string;
  variant?: BadgeVariant;
};

type StatusConfig = Record<string, StatusItem>;

type StatusDropdownProps = {
  id?: string;
  current?: string;
  config?: StatusConfig;
  onChange?: (id?: string, value?: string) => void;
};

export function StatusDropdown({
  id,
  current,
  config = {},
  onChange,
}: StatusDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const currentItem = current ? config[current] : undefined;

  function handleSelect(value: string) {
    setOpen(false);
    if (value !== current) {
      onChange?.(id, value);
    }
  }

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="status-dd" ref={ref}>
      {/* Trigger */}
      <button
        type="button"
        className="status-dd-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
      >
        <Badge variant={currentItem?.variant}>{currentItem?.label}</Badge>
        <Icon iconName="chevronDown" size={12} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="status-dd-menu">
          {Object.entries(config).map(([key, item]) => (
            <button
              type="button"
              key={key}
              className={`status-dd-item ${key === current ? "active" : ""}`}
              onClick={() => handleSelect(key)}
            >
              <Badge variant={item.variant}>{item.label}</Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
