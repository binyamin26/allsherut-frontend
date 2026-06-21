import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';
import { SERVICE_SLUGS, buildServicePath } from '../../utils/langUtils';

const BASE_URL = 'https://allsherut.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/og-image.jpg`;

// Derive service key from a Hebrew canonical path like /services/electrician
function serviceKeyFromCanonical(canonicalPath) {
  if (!canonicalPath?.startsWith('/services/')) return null;
  const slug = canonicalPath.replace('/services/', '');
  return Object.keys(SERVICE_SLUGS).includes(slug) ? slug : null;
}

export default function SEO({ title, description, canonicalPath, image, noindex = false, jsonLd = null }) {
  const { currentLanguage } = useLanguage();

  const fullTitle = title ? `${title} | AllSherut` : 'AllSherut - כל השירותים לבית בישראל';
  const fullDescription = description || 'חברו עם ספקי שירות מקצועיים בישראל - בייביסיטר, ניקיון, חשמלאי, אינסטלטור, גינון ועוד 23 קטגוריות שירות.';
  const ogImage = image || DEFAULT_IMAGE;

  // Build hreflang URLs
  const serviceKey = serviceKeyFromCanonical(canonicalPath);
  const hreflang = serviceKey
    ? {
        he: `${BASE_URL}${buildServicePath(serviceKey, 'he')}`,
        fr: `${BASE_URL}${buildServicePath(serviceKey, 'fr')}`,
        en: `${BASE_URL}${buildServicePath(serviceKey, 'en')}`,
        ru: `${BASE_URL}${buildServicePath(serviceKey, 'ru')}`,
      }
    : {
        he: `${BASE_URL}${canonicalPath || '/'}`,
        fr: `${BASE_URL}/fr${canonicalPath || '/'}`,
        en: `${BASE_URL}/en${canonicalPath || '/'}`,
        ru: `${BASE_URL}/ru${canonicalPath || '/'}`,
      };

  // Canonical URL reflects the current language version
  let canonical;
  if (serviceKey) {
    canonical = `${BASE_URL}${buildServicePath(serviceKey, currentLanguage)}`;
  } else if (currentLanguage !== 'he' && canonicalPath) {
    canonical = `${BASE_URL}/${currentLanguage}${canonicalPath}`;
  } else {
    canonical = canonicalPath ? `${BASE_URL}${canonicalPath}` : BASE_URL;
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={canonical} />

      <link rel="alternate" hrefLang="he-IL" href={hreflang.he} />
      <link rel="alternate" hrefLang="fr-IL" href={hreflang.fr} />
      <link rel="alternate" hrefLang="en-IL" href={hreflang.en} />
      <link rel="alternate" hrefLang="ru-IL" href={hreflang.ru} />
      <link rel="alternate" hrefLang="x-default" href={hreflang.he} />

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
