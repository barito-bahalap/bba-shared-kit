import React from "react";
// Style
import "./DataTable.css";
// Components
import {
  SkeletonTable,
  ErrorMessage,
  EmptyState,
} from "@barito-bahalap/components";

/**
DataTable: Dumb table component. Driven by columns config.
Page handles filtering/sorting and passes processed data down.

Column shape:
  {
    key       : string → unique, maps to row[key] for default render
    label     : string → header text ("" for no label)
    align     : "left" | "center" | "right" (default: "left")
    width     : CSS width string e.g. "120px" (optional)
    className : extra class on th and td (optional)
    render    : (row) => ReactNode → custom cell (optional, falls back to row[key])
  }

Props:
  columns  : column config array
  data     : row data array
  keyField : row unique key field (default: "id")
  rowClass : (row) => string → extra class per row (optional)
  empty    : ReactNode → rendered when data is empty
  footer   : ReactNode → rendered below table
*/
export function DataTable<T extends Record<string, any>>({
  loading,
  error,
  errMsg = "Failed to load.",
  errHint = "Check your connection and try again.",
  emptyTitle = "No data found.",
  emptySub = null,
  columns = [],
  data = [],
  keyField = "id" as keyof T & string,
  rowClass,
  footer,
}: DataTableProps<T>) {
  if (loading) return <SkeletonTable rows={7} />;

  if (error) {
    return (
      <div className="dt-wrap status">
        <ErrorMessage block message={errMsg} hint={errHint} />
      </div>
    );
  }

  if (data.length === 0 && !loading) {
    return (
      <div className="dt-wrap status">
        <EmptyState title={emptyTitle} sub={emptySub} />
      </div>
    );
  }

  return (
    <div className="dt-wrap">
      <div className="dt-scroll">
        <table className="dt-table">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={`th-${col.key}-${i}`}
                  className={[
                    "dt-th",
                    col.align === "right" && "dt-th--right",
                    col.align === "center" && "dt-th--center",
                    col.className,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={row[keyField] ?? `row-${rowIndex}`}
                className={["dt-row", rowClass?.(row)]
                  .filter(Boolean)
                  .join(" ")}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={`td-${row[keyField] ?? rowIndex}-${col.key}-${colIndex}`}
                    className={[
                      "dt-td",
                      col.align === "right" && "dt-td--right",
                      col.align === "center" && "dt-td--center",
                      col.className,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {col.render
                      ? col.render(row)
                      : ((row[col.key] as React.ReactNode) ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {footer && <div className="dt-footer">{footer}</div>}
    </div>
  );
}

type Column<T> = {
  key: keyof T & string;
  label?: string;
  align?: "left" | "center" | "right";
  width?: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T extends Record<string, any>> = {
  loading?: boolean;
  error?: boolean;
  errMsg?: string;
  errHint?: string;
  emptyTitle?: string;
  emptySub?: React.ReactNode;
  columns?: Column<T>[];
  data?: T[];
  keyField?: keyof T & string;
  rowClass?: (row: T) => string;
  footer?: React.ReactNode;
};
