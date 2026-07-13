export const SUPPORTED_LANGS = ['he', 'en', 'fr', 'ru'];
export const DEFAULT_LANG = 'he';

// Internal key → slug per language (Hebrew uses the same English slugs as the root routes)
export const SERVICE_SLUGS = {
  babysitting:            { he: 'babysitting',          en: 'babysitting',          fr: 'baby-sitting',             ru: 'babysitter' },
  cleaning:               { he: 'cleaning',             en: 'cleaning',             fr: 'menage',                   ru: 'uborka' },
  gardening:              { he: 'gardening',            en: 'gardening',            fr: 'jardinage',                ru: 'sadovodstvo' },
  petcare:                { he: 'petcare',              en: 'petcare',              fr: 'garde-animaux',            ru: 'zashchita-zhivotnykh' },
  tutoring:               { he: 'tutoring',             en: 'tutoring',             fr: 'cours-particuliers',       ru: 'repetitorstvo' },
  'sports-activities':    { he: 'sports-activities',    en: 'sports-activities',    fr: 'activites-sportives',      ru: 'sportivnye-zanyatiya' },
  eldercare:              { he: 'eldercare',            en: 'eldercare',            fr: 'aide-personnes-agees',     ru: 'ukhod-za-pozhilymi' },
  laundry:                { he: 'laundry',              en: 'laundry',              fr: 'laverie',                  ru: 'stirka' },
  'property-management':  { he: 'property-management',  en: 'property-management',  fr: 'gestion-propriete',        ru: 'upravlenie-nedvizhimostyu' },
  electrician:            { he: 'electrician',          en: 'electrician',          fr: 'electricien',              ru: 'elektrik' },
  plumbing:               { he: 'plumbing',             en: 'plumbing',             fr: 'plombier',                 ru: 'santekh' },
  'air-conditioning':     { he: 'air-conditioning',     en: 'air-conditioning',     fr: 'climatisation',            ru: 'konditsioner' },
  'gas-technician':       { he: 'gas-technician',       en: 'gas-technician',       fr: 'technicien-gaz',           ru: 'gazovik' },
  drywall:                { he: 'drywall',              en: 'drywall',              fr: 'placoplatre',              ru: 'gipsokarton' },
  carpentry:              { he: 'carpentry',            en: 'carpentry',            fr: 'menuiserie',               ru: 'plotnik' },
  'home-organization':    { he: 'home-organization',    en: 'home-organization',    fr: 'organisation-maison',      ru: 'organizatsiya-doma' },
  'event-entertainment':  { he: 'event-entertainment',  en: 'event-entertainment',  fr: 'animation-evenements',     ru: 'animatsiya-meropriyatiy' },
  dj:                     { he: 'dj',                   en: 'dj',                   fr: 'dj',                       ru: 'dj' },
  'private-chef':         { he: 'private-chef',         en: 'private-chef',         fr: 'chef-prive',               ru: 'chastnyy-povar' },
  catering:               { he: 'catering',             en: 'catering',             fr: 'traiteur',                 ru: 'keytering' },
  pastry:                 { he: 'pastry',               en: 'pastry',               fr: 'patisserie',               ru: 'konditerskaya' },
  painting:               { he: 'painting',             en: 'painting',             fr: 'peinture',                 ru: 'pokraska' },
  waterproofing:          { he: 'waterproofing',        en: 'waterproofing',        fr: 'etancheite',               ru: 'gidroizolyatsiya' },
  contractor:             { he: 'contractor',           en: 'contractor',           fr: 'entrepreneur',             ru: 'podryadchik' },
  aluminum:               { he: 'aluminum',             en: 'aluminum',             fr: 'aluminium',                ru: 'alyuminiy' },
  'glass-works':          { he: 'glass-works',          en: 'glass-works',          fr: 'vitrerie',                 ru: 'steklyannye-raboty' },
  locksmith:              { he: 'locksmith',            en: 'locksmith',            fr: 'serrurier',                ru: 'slesar' },
  moving:                 { he: 'moving',               en: 'moving',               fr: 'demenagement',             ru: 'pereezd' },
  photographer:           { he: 'photographer',         en: 'photographer',         fr: 'photographe',              ru: 'fotograf' },
  'event-decoration':     { he: 'event-decoration',     en: 'event-decoration',     fr: 'decoration-evenements',    ru: 'dekor-meropriyatiy' },
  'pest-control':         { he: 'pest-control',         en: 'pest-control',         fr: 'desinsectisation',         ru: 'dezinsektsiya' },
  handyman:               { he: 'handyman',             en: 'handyman',             fr: 'bricoleur',                ru: 'master-na-vse-ruki' },
  mechanic:               { he: 'mechanic',             en: 'mechanic',             fr: 'mecanicien',               ru: 'mekhanik' },
  metalwork:              { he: 'metalwork',            en: 'metalwork',            fr: 'ferronnerie',              ru: 'metalloraboty' },
  driver:                 { he: 'driver',               en: 'transportation',       fr: 'transport',                ru: 'perevozki' },
};

// Build the path for a service in a given language
// Hebrew uses root /services/:slug, others use /:lang/services/:slug
export function buildServicePath(serviceKey, lang) {
  const slug = SERVICE_SLUGS[serviceKey]?.[lang] ?? serviceKey;
  if (!lang || lang === 'he') return `/services/${slug}`;
  return `/${lang}/services/${slug}`;
}

// Reverse lookup: slug + lang → internal service key
export function getServiceKeyFromSlug(slug, lang) {
  if (!slug || !lang) return null;
  return (
    Object.entries(SERVICE_SLUGS).find(([, slugs]) => slugs[lang] === slug)?.[0] ?? null
  );
}

// Build any generic path with language prefix
export function buildPath(path, lang) {
  if (!lang || lang === 'he') return path;
  return `/${lang}${path}`;
}

// Extract language code from a URL pathname (/fr/... → 'fr', /services/... → 'he')
export function getLangFromPath(pathname) {
  if (!pathname) return DEFAULT_LANG;
  const seg = pathname.split('/')[1];
  return SUPPORTED_LANGS.includes(seg) && seg !== 'he' ? seg : DEFAULT_LANG;
}
