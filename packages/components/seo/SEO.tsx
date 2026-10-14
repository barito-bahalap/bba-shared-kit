import { useEffect } from "react";
// Config
import { siteConfig } from "@barito-bahalap/config";

type SeoType = "website" | "article";

export interface SeoAlternate {
  hrefLang: string;
  path: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: SeoType;
  structuredData?: Record<string, unknown> | null;
  siteName?: string;
  siteUrl?: string;
  locale?: string;
  alternates?: readonly SeoAlternate[];
}

function upsert(
  tag: "meta" | "link",
  match: { attr: string; value: string },
  props: Record<string, string>,
) {
  const selector = `${tag}[${match.attr}="${match.value}"]`;
  let element = document.head.querySelector<HTMLElement>(selector);
  if (!element) {
    element = document.createElement(tag);
    element.setAttribute(match.attr, match.value);
    document.head.appendChild(element);
  }
  Object.entries(props).forEach(([key, value]) =>
    element.setAttribute(key, value),
  );
}

function remove(tag: "meta" | "link", attr: string, value: string) {
  document.head.querySelector(`${tag}[${attr}="${value}"]`)?.remove();
}

export function SEO({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  noIndex = false,
  type = "website",
  structuredData = null,
  siteName = siteConfig.name,
  siteUrl = siteConfig.url,
  locale = siteConfig.locale,
  alternates = [],
}: SEOProps) {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const url = `${siteUrl}${path}`;
  const ogImage = image ?? siteConfig.ogImage;
  const jsonLd = structuredData ? JSON.stringify(structuredData) : null;
  const alternatesKey = JSON.stringify(alternates);

  useEffect(() => {
    document.title = fullTitle;

    upsert(
      "meta",
      { attr: "name", value: "description" },
      { content: description },
    );
    upsert("link", { attr: "rel", value: "canonical" }, { href: url });

    upsert(
      "meta",
      { attr: "property", value: "og:site_name" },
      { content: siteName },
    );
    upsert("meta", { attr: "property", value: "og:type" }, { content: type });
    upsert(
      "meta",
      { attr: "property", value: "og:title" },
      { content: fullTitle },
    );
    upsert(
      "meta",
      { attr: "property", value: "og:description" },
      { content: description },
    );
    upsert("meta", { attr: "property", value: "og:url" }, { content: url });
    upsert(
      "meta",
      { attr: "property", value: "og:locale" },
      { content: locale },
    );

    upsert(
      "meta",
      { attr: "name", value: "twitter:title" },
      { content: fullTitle },
    );
    upsert(
      "meta",
      { attr: "name", value: "twitter:description" },
      { content: description },
    );

    if (ogImage) {
      upsert(
        "meta",
        { attr: "property", value: "og:image" },
        { content: ogImage },
      );
      upsert(
        "meta",
        { attr: "name", value: "twitter:image" },
        { content: ogImage },
      );
      upsert(
        "meta",
        { attr: "name", value: "twitter:card" },
        { content: "summary_large_image" },
      );
    } else {
      remove("meta", "property", "og:image");
      remove("meta", "name", "twitter:image");
      upsert(
        "meta",
        { attr: "name", value: "twitter:card" },
        { content: "summary" },
      );
    }

    if (noIndex) {
      upsert(
        "meta",
        { attr: "name", value: "robots" },
        { content: "noindex, nofollow" },
      );
    } else {
      remove("meta", "name", "robots");
    }
  }, [fullTitle, siteName, description, url, ogImage, noIndex, type, locale]);

  useEffect(() => {
    const list = JSON.parse(alternatesKey) as SeoAlternate[];
    const created = list.map(({ hrefLang, path: alternatePath }) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hrefLang;
      link.href = `${siteUrl}${alternatePath}`;
      document.head.appendChild(link);
      return link;
    });
    return () => created.forEach((link) => link.remove());
  }, [alternatesKey, siteUrl]);

  useEffect(() => {
    const id = "seo-jsonld";
    document.getElementById(id)?.remove();
    if (!jsonLd) return;
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = jsonLd;
    document.head.appendChild(script);
    return () => script.remove();
  }, [jsonLd]);

  return null;
}
