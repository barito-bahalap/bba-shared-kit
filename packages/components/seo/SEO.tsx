import { Helmet } from "react-helmet-async";

const BASE_URL = "https://ibb-opsfin.com";
const DEFAULT_IMAGE = `${BASE_URL}/favicon.webp`;
const SITE_NAME = "IBB Dashboard";

export function SEO({
  title = "",
  description = "View today's latest report with ease.",
  path = "/",
  image = DEFAULT_IMAGE,
  noIndex = false,
  type = "website",
  structuredData = null,
}) {
  const fullTitle = noIndex ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@btengang" />
      <meta name="twitter:creator" content="@btengang" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
