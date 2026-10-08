// Style
import "./Pagination.css";
// Components
import { Button } from "@ampikalteng/components";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
  pageLabel?: string;
  ofLabel?: string;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  prevLabel = "Sebelumnya",
  nextLabel = "Berikutnya",
  pageLabel = "Halaman",
  ofLabel = "dari",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination stack row middle between">
      <Button
        variant="outline"
        label={prevLabel}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      />
      <span className="text sm muted">
        {pageLabel} {page} {ofLabel} {totalPages}
      </span>
      <Button
        variant="outline"
        label={nextLabel}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      />
    </div>
  );
}
