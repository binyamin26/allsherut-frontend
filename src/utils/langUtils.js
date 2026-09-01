export const SUPPORTED_LANGS = ['fr', 'en'];
export const DEFAULT_LANG = 'fr';

// Internal key → slug per language (French is the root language, no URL prefix)
export const SERVICE_SLUGS = {
  babysitting:            { en: 'babysitting',          fr: 'baby-sitting' },
  cleaning:               { en: 'cleaning',             fr: 'menage' },
  gardening:              { en: 'gardening',            fr: 'jardinage' },
  petcare:                { en: 'petcare',              fr: 'garde-animaux' },
  tutoring:               { en: 'tutoring',             fr: 'cours-particuliers' },
  'sports-activities':    { en: 'sports-activities',    fr: 'activites-sportives' },
  eldercare:              { en: 'eldercare',            fr: 'aide-personnes-agees' },
  laundry:                { en: 'laundry',              fr: 'laverie' },
  'property-management':  { en: 'property-management',  fr: 'gestion-propriete' },
  electrician:            { en: 'electrician',          fr: 'electricien' },
  plumbing:               { en: 'plumbing',             fr: 'plombier' },
  'air-conditioning':     { en: 'air-conditioning',     fr: 'climatisation' },
  'gas-technician':       { en: 'gas-technician',       fr: 'technicien-gaz' },
  drywall:                { en: 'drywall',              fr: 'placoplatre' },
  carpentry:              { en: 'carpentry',            fr: 'menuiserie' },
  'home-organization':    { en: 'home-organization',    fr: 'organisation-maison' },
  'event-entertainment':  { en: 'event-entertainment',  fr: 'animation-evenements' },
  'event-equipment-rental': { en: 'event-equipment-rental', fr: 'location-materiel-evenementiel' },
  'event-food-stands':    { en: 'event-food-stands',    fr: 'stands-nourriture-evenementiels' },
  dj:                     { en: 'dj',                   fr: 'dj' },
  'private-chef':         { en: 'private-chef',         fr: 'chef-prive' },
  catering:               { en: 'catering',             fr: 'traiteur' },
  pastry:                 { en: 'pastry',               fr: 'patisserie' },
  painting:               { en: 'painting',             fr: 'peinture' },
  waterproofing:          { en: 'waterproofing',        fr: 'etancheite' },
  contractor:             { en: 'contractor',           fr: 'entrepreneur' },
  aluminum:               { en: 'aluminum',             fr: 'aluminium' },
  'glass-works':          { en: 'glass-works',          fr: 'vitrerie' },
  locksmith:              { en: 'locksmith',            fr: 'serrurier' },
  moving:                 { en: 'moving',               fr: 'demenagement' },
  photographer:           { en: 'photographer',         fr: 'photographe' },
  'event-decoration':     { en: 'event-decoration',     fr: 'decoration-evenements' },
  'pest-control':         { en: 'pest-control',         fr: 'desinsectisation' },
  handyman:               { en: 'handyman',             fr: 'bricoleur' },
  mechanic:               { en: 'mechanic',             fr: 'mecanicien' },
  metalwork:              { en: 'metalwork',            fr: 'ferronnerie' },
  driver:                 { en: 'transportation',       fr: 'transport' },
  doula:                  { en: 'doula',                fr: 'doula' },
};

// Normalize a raw API service_type (snake_case, e.g. "event_decoration") into the
// internal SERVICE_SLUGS key (hyphenated, e.g. "event-decoration")
export function serviceTypeToKey(serviceType) {
  return serviceType ? serviceType.replace(/_/g, '-') : serviceType;
}

// Build the path for a service in a given language
// French uses root /services/:slug, English uses /en/services/:slug
export function buildServicePath(serviceKey, lang) {
  const slug = SERVICE_SLUGS[serviceKey]?.[lang] ?? SERVICE_SLUGS[serviceKey]?.fr ?? serviceKey;
  if (!lang || lang === 'fr') return `/services/${slug}`;
  return `/${lang}/services/${slug}`;
}

// Reverse lookup: slug + lang → internal service key
export function getServiceKeyFromSlug(slug, lang) {
  if (!slug) return null;
  const l = lang || 'fr';
  return (
    Object.entries(SERVICE_SLUGS).find(([, slugs]) => slugs[l] === slug)?.[0] ??
    // Fallback: match on any language slug (handles legacy prefix-less URLs)
    Object.entries(SERVICE_SLUGS).find(([, slugs]) => Object.values(slugs).includes(slug))?.[0] ??
    null
  );
}

// Build any generic path with language prefix (French = root, no prefix)
export function buildPath(path, lang) {
  if (!lang || lang === 'fr') return path;
  return `/${lang}${path}`;
}

// Extract language code from a URL pathname (/en/... → 'en', everything else → 'fr')
export function getLangFromPath(pathname) {
  if (!pathname) return DEFAULT_LANG;
  const seg = pathname.split('/')[1];
  return SUPPORTED_LANGS.includes(seg) ? seg : DEFAULT_LANG;
}
