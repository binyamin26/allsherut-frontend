import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';
import { SERVICE_SLUGS, buildServicePath } from '../../utils/langUtils';

const BASE_URL = 'https://allsherut.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/og-image.jpg`;

// Derive service key from a root (prefix-less) canonical path like /services/electrician
function serviceKeyFromCanonical(canonicalPath) {
  if (!canonicalPath?.startsWith('/services/')) return null;
  const slug = canonicalPath.replace('/services/', '');
  return Object.keys(SERVICE_SLUGS).includes(slug) ? slug : null;
}

// Google truncates titles/descriptions past these lengths in the SERP — keep our own
// tags under the limit rather than let Google rewrite them unpredictably.
const MAX_TITLE_LENGTH = 65;
const MAX_DESCRIPTION_LENGTH = 160;

function truncate(str, maxLength) {
  if (!str || str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 1).trimEnd()}…`;
}

export default function SEO({ title, description, canonicalPath, image, noindex = false, jsonLd = null, sameUrlForAllLangs = false }) {
  const { currentLanguage } = useLanguage();

  const rawTitle = title ? `${title} | AllSherut` : 'AllSherut - Tous les services à domicile en France';
  const fullTitle = truncate(rawTitle, MAX_TITLE_LENGTH);
  const fullDescription = truncate(
    description || 'Trouvez des prestataires de services professionnels en France - baby-sitting, ménage, électricien, plombier, jardinage et plus de 23 catégories de services.',
    MAX_DESCRIPTION_LENGTH
  );
  const ogImage = image || DEFAULT_IMAGE;

  // Build hreflang URLs
  const serviceKey = serviceKeyFromCanonical(canonicalPath);
  const sameUrl = `${BASE_URL}${canonicalPath || '/'}`;
  const hreflang = serviceKey
    ? {
        fr: `${BASE_URL}${buildServicePath(serviceKey, 'fr')}`,
        en: `${BASE_URL}${buildServicePath(serviceKey, 'en')}`,
      }
    : sameUrlForAllLangs
    ? { fr: sameUrl, en: sameUrl }
    : {
        fr: `${BASE_URL}${canonicalPath || '/'}`,
        en: `${BASE_URL}/en${canonicalPath || '/'}`,
      };

  // Canonical URL reflects the current language version
  let canonical;
  if (serviceKey) {
    canonical = `${BASE_URL}${buildServicePath(serviceKey, currentLanguage)}`;
  } else if (currentLanguage !== 'fr' && canonicalPath) {
    canonical = `${BASE_URL}/${currentLanguage}${canonicalPath}`;
  } else {
    canonical = canonicalPath ? `${BASE_URL}${canonicalPath}` : BASE_URL;
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={canonical} />

      <link rel="alternate" hrefLang="fr-FR" href={hreflang.fr} />
      <link rel="alternate" hrefLang="en" href={hreflang.en} />
      <link rel="alternate" hrefLang="x-default" href={hreflang.fr} />

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
