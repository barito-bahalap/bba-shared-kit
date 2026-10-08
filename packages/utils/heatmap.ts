export type DateCell = {
  date: Date;
  iso: string;
  inCurrentMonth: boolean;
  isToday: boolean;
};

export const WEEKDAY_LABELS_ID = [
  "Sen",
  "Sel",
  "Rab",
  "Kam",
  "Jum",
  "Sab",
  "Min",
];

// Local-time formatting: NOT date.toISOString(), which shifts by UTC offset
// and would silently roll back to the previous calendar day for UTC+7 users.
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function mondayFirstDay(date: Date): number {
  return (date.getDay() + 6) % 7; // JS: Sun=0..Sat=6 -> Mon=0..Sun=6
}

export function getMonthMatrix(year: number, monthIndex: number): DateCell[][] {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const startOffset = mondayFirstDay(firstOfMonth);
  const gridStart = new Date(year, monthIndex, 1 - startOffset);
  const todayIso = toISODate(new Date());

  const weeks: DateCell[][] = [];
  for (let w = 0; w < 6; w++) {
    const week: DateCell[] = [];
    for (let d = 0; d < 7; d++) {
      const cellDate = new Date(gridStart);
      cellDate.setDate(gridStart.getDate() + w * 7 + d);
      const iso = toISODate(cellDate);
      week.push({
        date: cellDate,
        iso,
        inCurrentMonth: cellDate.getMonth() === monthIndex,
        isToday: iso === todayIso,
      });
    }
    weeks.push(week);
  }

  const lastWeek = weeks[weeks.length - 1];
  if (lastWeek.every((cell) => !cell.inCurrentMonth)) {
    weeks.pop();
  }

  return weeks;
}
export function getIntensityLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count <= 4) return 3;
  return 4;
}

export function formatMonthLabelID(year: number, monthIndex: number): string {
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, monthIndex, 1));
}
