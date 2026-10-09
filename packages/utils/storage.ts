// Config
import { supabase } from "@barito-bahalap/supabase";

// file_path may be a Storage object path relative to `bucket` (real uploads,
// e.g. 'kalteng/logo-utama.svg'), or already a full external URL (seed /
// placeholder rows, or any content not yet migrated into Storage). Both are
// valid `text` values in the column, this just normalizes either into a
// URL a browser can load directly.
export function resolveFileUrl(path: string, bucket = "documents"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
