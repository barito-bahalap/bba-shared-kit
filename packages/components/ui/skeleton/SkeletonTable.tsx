// Style
import "./SkeletonTable.css";
// Components
import { SkeletonBlock } from "./SkeletonBlock";

/**
SkeletonTable: Matches DataTable shape.
Renders N rows of M column-width blocks.

Props:
  rows    : number of skeleton rows (default: 5)
  cols    : column width array e.g. ["40%","20%","15%","15%","10%"]
            defaults to 5 equal cols if not provided
*/
export function SkeletonTable({
  rows = 5,
  cols = ["35%", "25%", "15%", "15%", "10%"],
}) {
  return (
    <div className="dt-wrap skel-table-wrap">
      {/* Header row */}
      <div className="skel-table-head">
        {cols.map((w, i) => (
          <SkeletonBlock
            key={i}
            width={w}
            height="10px"
            minusPadding="var(--space-5)"
          />
        ))}
      </div>
      <div className="divider" />

      {/* Data rows */}
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="skel-table-row">
          {cols.map((w, i) => (
            <SkeletonBlock
              key={i}
              width={w}
              height="14px"
              minusPadding="var(--space-5)"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
