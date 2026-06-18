import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://allsherut.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/og-image.jpg`;

export default function SEO({ title, description, canonicalPath, image }) {
  const fullTitle = title ? `${title} | AllSherut` : 'AllSherut - כל השירותים לבית בישראל';
  const fullDescription = description || 'חברו עם ספקי שירות מקצועיים בישראל - בייביסיטר, ניקיון, חשמלאי, אינסטלטור, גינון ועוד 23 קטגוריות שירות.';
  const canonical = canonicalPath ? `${BASE_URL}${canonicalPath}` : BASE_URL;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
