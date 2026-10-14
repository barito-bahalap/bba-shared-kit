export type ConfigLocale = "id" | "en";

export function resolveLocale(locale: string): ConfigLocale {
  return locale === "en" ? "en" : "id";
}
