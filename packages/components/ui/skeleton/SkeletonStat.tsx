import React from "react";
// Style
import "./SkeletonStat.css";
// Components
import { SkeletonBlock } from "./SkeletonBlock";

/**
SkeletonStat: Matches StatCard shape.
Supports both simple mode (accent bar) and rich mode (icon + label top row).

Props:
  rich  : mirrors StatCard rich mode with icon row (default: false)
  count : how many to render in a row (default: 1)
*/
export function SkeletonStat({
  rich = false,
  count = 1,
  statHeight = "16px",
}: SkeletonStatProps) {
  const card = (
    <div className={`card skel-stat ${rich ? "skel-stat-rich" : ""}`}>
      {rich && (
        <div className="skel-stat-top">
          <SkeletonBlock width="24px" height="24px" />
          <SkeletonBlock width="50%" height="10px" />
        </div>
      )}

      <div className="skel-stat-mid">
        <SkeletonBlock width="48px" height="28px" />
      </div>

      {!rich && <SkeletonBlock width="55%" height="10px" />}
      {rich && <SkeletonBlock width="65%" height="10px" />}
    </div>
  );

  if (count === 1) return card;

  // define style OUTSIDE JSX
  const rowStyle: CSSVars = {
    "--count": count,
    height: statHeight,
  };

  return (
    <div className="skel-stat-row" style={rowStyle}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`card skel-stat ${rich ? "skel-stat-rich" : ""}`}
        >
          {rich && (
            <div className="skel-stat-top">
              <SkeletonBlock width="24px" height="24px" />
              <SkeletonBlock width="50%" height="10px" />
            </div>
          )}

          <div className="skel-stat-mid">
            <SkeletonBlock width="48px" height="28px" />
          </div>

          {!rich && <SkeletonBlock width="55%" height="10px" />}
          {rich && <SkeletonBlock width="65%" height="10px" />}
        </div>
      ))}
    </div>
  );
}

type SkeletonStatProps = {
  rich?: boolean;
  count?: number;
  statHeight?: string;
};

type CSSVars = React.CSSProperties & {
  [key: `--${string}`]: string | number | undefined;
};
