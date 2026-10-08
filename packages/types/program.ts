import type { IconsType, ContentStatus } from ".";

export type ProgramActivity = {
  date: string; // YYYY-MM-DD
  programKey: string;
};

export type ProgramStatus = "berjalan" | "akan-datang" | "selesai";

export type ProgramCategory =
  | "konsolidasi"
  | "pelatihan"
  | "media-komunikasi"
  | "partisipasi-publik";

export type ProgramItem = {
  key: string;
  iconName: IconsType;
  title: string;
  description: string;
  status: ProgramStatus;
  category: ProgramCategory;
};

export interface Program {
  id: string;
  organization_id: string;
  title: string;
  description: string | null;
  icon_path: IconsType;
  category: ProgramCategory;
  program_status: ProgramStatus;
  order_index: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}
