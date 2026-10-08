import type { MediaType } from "./enums";

export interface Media {
  id: string;
  organization_id: string;
  uploaded_by: string | null;
  file_path: string;
  media_type: MediaType;
  caption: string | null;
  created_at: string;
}

export type MediaCategory =
  | "internasional"
  | "komunitas"
  | "ulasan"
  | "analisis"
  | "wawancara";

export type MediaSectionTag = "utama" | "terbaru" | "wajib-dibaca" | "sorotan";

export type MediaArticle = {
  key: string;
  title: string;
  excerpt: string;
  category: MediaCategory;
  author: string;
  publishedAt: string; // ISO 8601
  image?: string; // omit to use auto-generated placeholder
  avatar?: string; // omit to use auto-generated placeholder
  content: readonly string[];
};

export interface OrgMedia {
  id: string;
  organization_id: string;
  uploaded_by: string | null;
  file_path: string;
  media_type: "image" | "video";
  caption: string | null;
  created_at: string;
}
