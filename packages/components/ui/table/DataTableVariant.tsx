// Style
import "./DataTableVariant.css";

export interface DataTableVariantProps {
  caption?: string;
  columns: string[];
  rows: string[][];
  className?: string;
}

export function DataTableVariant({
  caption,
  columns,
  rows,
  className,
}: DataTableVariantProps) {
  return (
    <div
      className={["dt-variant", className].filter(Boolean).join(" ")}
      role="region"
      aria-label={caption}
      tabIndex={0}
    >
      <table className="dt-variant__table">
        {caption && (
          <caption className="dt-variant__caption">{caption}</caption>
        )}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={`${row[0]}-${index}`} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={`${row[0]}-${index}`}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
