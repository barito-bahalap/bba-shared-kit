import type { ContentStatus } from "./enums";
import type { MediaCategory, MediaSectionTag } from "./media";

export interface News {
  id: string;
  organization_id: string;
  author_id: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_path: string | null;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category: MediaCategory | null;
  section_tags: MediaSectionTag[];
  byline_name: string | null;
  byline_avatar_path: string | null;
}
