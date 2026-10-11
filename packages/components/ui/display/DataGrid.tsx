// Style
import "./DataGrid.css";
// Components
import { StatusPill, type PillTone } from "./StatusPill";

export type GridKind =
  | "text"
  | "idr"
  | "date"
  | "datetime"
  | "pct"
  | "pill"
  | "link"
  | "bool";

export interface GridColumn {
  key: string;
  header: string;
  kind?: GridKind;
  align?: "left" | "right";
}

export type GridRow = Record<string, unknown>;

export interface DataGridProps {
  columns: GridColumn[];
  rows: GridRow[];
  keyField: string;
  loading?: boolean;
  error?: string | null;
  emptyTitle?: string;
  toneMap?: Record<string, PillTone>;
  onRowSelect?: (row: GridRow) => void;
}

const idr = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});
const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const dateTimeFmt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function humanize(value: string): string {
  return value.replace(/_/g, " ");
}

function renderCell(
  col: GridColumn,
  row: GridRow,
  toneMap?: Record<string, PillTone>,
) {
  const value = row[col.key];
  if (value === null || value === undefined || value === "") return "-";
  switch (col.kind) {
    case "idr":
      return idr.format(Number(value));
    case "pct":
      return `${Number(value)}%`;
    case "date":
      return dateFmt.format(new Date(String(value)));
    case "datetime":
      return dateTimeFmt.format(new Date(String(value)));
    case "bool":
      return value ? "Yes" : "No";
    case "pill": {
      const text = String(value);
      return (
        <StatusPill
          label={humanize(text)}
          tone={toneMap?.[text] ?? "neutral"}
        />
      );
    }
    case "link":
      return (
        <a href={String(value)} target="_blank" rel="noopener noreferrer">
          Open
        </a>
      );
    default:
      return String(value);
  }
}

export function DataGrid({
  columns,
  rows,
  keyField,
  loading,
  error,
  emptyTitle = "No records",
  toneMap,
  onRowSelect,
}: DataGridProps) {
  if (loading) return <p className="data-grid__state">Loading...</p>;
  if (error)
    return <p className="data-grid__state data-grid__state--error">{error}</p>;
  if (rows.length === 0)
    return <p className="data-grid__state">{emptyTitle}</p>;

  return (
    <div className="data-grid">
      <table className="data-grid__table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={
                  col.align === "right" ||
                  col.kind === "idr" ||
                  col.kind === "pct"
                    ? "is-right"
                    : undefined
                }
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={String(row[keyField])}
              className={onRowSelect ? "is-clickable" : undefined}
              tabIndex={onRowSelect ? 0 : undefined}
              onClick={onRowSelect ? () => onRowSelect(row) : undefined}
              onKeyDown={
                onRowSelect
                  ? (e) => {
                      if (e.key === "Enter") onRowSelect(row);
                    }
                  : undefined
              }
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={
                    col.align === "right" ||
                    col.kind === "idr" ||
                    col.kind === "pct"
                      ? "is-right"
                      : undefined
                  }
                >
                  {renderCell(col, row, toneMap)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
