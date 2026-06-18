import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://allsherut.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/og-image.jpg`;

export default function SEO({ title, description, canonicalPath, image, noindex = false, jsonLd = null }) {
  const fullTitle = title ? `${title} | AllSherut` : 'AllSherut - כל השירותים לבית בישראל';
  const fullDescription = description || 'חברו עם ספקי שירות מקצועיים בישראל - בייביסיטר, ניקיון, חשמלאי, אינסטלטור, גינון ועוד 23 קטגוריות שירות.';
  const canonical = canonicalPath ? `${BASE_URL}${canonicalPath}` : BASE_URL;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={canonical} />

      {/* hreflang — toutes les versions pointent vers la même URL (SPA monolingue par URL) */}
      <link rel="alternate" hreflang="he-IL" href={`${BASE_URL}${canonicalPath || '/'}`} />
      <link rel="alternate" hreflang="fr-IL" href={`${BASE_URL}${canonicalPath || '/'}`} />
      <link rel="alternate" hreflang="en-IL" href={`${BASE_URL}${canonicalPath || '/'}`} />
      <link rel="alternate" hreflang="ru-IL" href={`${BASE_URL}${canonicalPath || '/'}`} />
      <link rel="alternate" hreflang="x-default" href={`${BASE_URL}${canonicalPath || '/'}`} />

      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
