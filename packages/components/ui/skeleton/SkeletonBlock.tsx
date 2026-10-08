import React from "react";
// Style
import "./SkeletonBlock.css";

/**
SkeletonBlock: Base skeleton primitive. A single shimmer rectangle.
Compose this into higher-level skeletons.

Props:
  width   : CSS width string (default: "100%")
  height  : CSS height string (default: "16px")
  radius  : CSS border-radius string (default: var(--radius-xs))
  className : extra classes
*/
export function SkeletonBlock({
  width = "100%",
  height = "16px",
  radius = "var(--radius-xs)",
  minusPadding = "0px",
  className = "",
}: SkeletonBlockProps) {
  const style: React.CSSProperties = {
    ["--skl-w" as string | number]: width,
    ["--minus-padding" as string | number]: minusPadding,
    height,
    borderRadius: radius,
    flexShrink: 0,
  };

  return (
    <div
      className={`skeleton skel-block ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

type SkeletonBlockProps = {
  width?: string;
  height?: string;
  radius?: string;
  minusPadding?: string;
  className?: string;
};
