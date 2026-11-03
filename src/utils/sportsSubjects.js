import { SPORTS_SUBCATEGORIES } from '../data/subcategoriesData';

// Anciennes saisies : certains prestataires ont des noms de langues mêlés à leurs disciplines,
// ou des mots hébreux enregistrés à l'envers (« ףורגא » au lieu de « אגרוף »).
const LANGUAGE_NAMES = new Set([
  'עברית', 'אנגלית', 'צרפתית', 'רוסית', 'ספרדית', 'ערבית', 'אמהרית', 'גרמנית',
  'איטלקית', 'פורטוגזית', 'יידיש', 'רומנית', 'פולנית', 'אוקראינית', 'טורקית', 'הונגרית'
]);

const clean = (s) => (s || '').replace(/[‎‏]/g, '').trim();
const reverse = (s) => Array.from(s).reverse().join('');
const findSub = (name) => SPORTS_SUBCATEGORIES.find(x => clean(x.name_he) === name);

// Retourne une liste de { he, sub } : he = nom hébreu corrigé, sub = sous-catégorie connue (ou undefined)
export const normalizeSportsSubjects = (subjects, languages = []) => {
  if (!Array.isArray(subjects)) return [];
  const langs = new Set([...LANGUAGE_NAMES, ...(Array.isArray(languages) ? languages.map(clean) : [])]);
  const seen = new Set();
  const out = [];
  for (const raw of subjects) {
    let he = clean(raw);
    if (!he || langs.has(he)) continue;
    let sub = findSub(he);
    if (!sub) {
      const rev = reverse(he);
      const revSub = findSub(rev);
      if (revSub) { he = rev; sub = revSub; }
    }
    if (seen.has(he)) continue;
    seen.add(he);
    out.push({ he, sub });
  }
  return out;
};

export const localizedSportName = ({ he, sub }, lang) => clean(sub ? (sub[`name_${lang}`] || sub.name_he) : he);
