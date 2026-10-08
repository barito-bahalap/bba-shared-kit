export type FileKind = "pdf" | "image" | "video" | "other";

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
const VIDEO_EXTENSIONS = ["mp4", "webm", "mov"];

function getExtension(pathOrUrl: string): string {
  const clean = pathOrUrl.split("?")[0].split("#")[0];
  const parts = clean.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}

export function getFileKind(pathOrUrl: string): FileKind {
  const ext = getExtension(pathOrUrl);
  if (ext === "pdf") return "pdf";
  if (IMAGE_EXTENSIONS.includes(ext)) return "image";
  if (VIDEO_EXTENSIONS.includes(ext)) return "video";
  return "other";
}

export function getFileExtensionLabel(pathOrUrl: string): string {
  const ext = getExtension(pathOrUrl);
  return ext ? ext.toUpperCase() : "FILE";
}
