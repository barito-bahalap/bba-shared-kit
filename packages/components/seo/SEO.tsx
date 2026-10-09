import { useEffect } from "react";
// Config
import { siteConfig } from "@barito-bahalap/config";

type SeoType = "website" | "article";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: SeoType;
  structuredData?: Record<string, unknown> | null;
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
}: SEOProps) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;
  const jsonLd = structuredData ? JSON.stringify(structuredData) : null;

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
      { content: siteConfig.name },
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
      { content: siteConfig.locale },
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
  }, [fullTitle, description, url, ogImage, noIndex, type]);

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
