/**
 * Codemod — migration des valeurs canoniques hébraïques -> slugs stables (option 1).
 *
 * Source de vérité : src/utils/translationMapper.js. Pour chaque entrée
 *   'valeur hébraïque': 'namespace.i18nKey'
 * le nouveau slug canonique = dernier segment de la clé i18n
 *   'ראשון' -> 'days.sunday'                 -> 'sunday'
 *   'שמרטפות מזדמנת' -> 'filters.babysitting.occasional' -> 'occasional'
 *   'תיקון מזגן' -> 'filters.ac.acRepair'    -> 'acRepair'
 *
 * Seules les chaînes contenant au moins un caractère hébreu sont remplacées
 * (les clés déjà anglaises comme 'yes'/'companionship'/'24/7' sont laissées telles quelles).
 * Le remplacement est délimité par des quotes ('X' et "X") pour éviter les
 * correspondances partielles.
 *
 * Usage :  node scripts/migrate-canonical-values.mjs [--write]
 *   sans --write : dry-run, affiche seulement le rapport.
 */
import { readFileSync, writeFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const HEB = /[֐-׿]/;

// --- 1. Charger le mapper et construire heb -> slug -------------------------
const mapper = (await import(pathToFileURL(path.join(ROOT, 'src/utils/translationMapper.js')).href)).default;

// Conflits connus (même chaîne hébraïque -> 2 clés i18n selon le service).
// On force UN slug unique, appliqué partout (valeur = jeton opaque, le label
// reste traduit via t() avec sa propre clé dans chaque formulaire).
const OVERRIDES = {
  'מתן תרופות': 'medication',   // petcare + eldercare
  'אחר': 'other',               // chef(kosher, retiré) + events
  'עבודות גבס': 'drywallWork',  // drywall + contractor
};

const hebToSlug = new Map();
const conflicts = [];
for (const [category, entries] of Object.entries(mapper)) {
  for (const [heb, i18nKey] of Object.entries(entries)) {
    if (!HEB.test(heb)) continue; // clé déjà non-hébraïque : on ne touche pas
    const slug = OVERRIDES[heb] || String(i18nKey).split('.').pop();
    if (hebToSlug.has(heb) && hebToSlug.get(heb) !== slug) {
      conflicts.push({ heb, a: hebToSlug.get(heb), b: slug, category });
      continue;
    }
    hebToSlug.set(heb, slug);
  }
}

// Trier par longueur décroissante : remplacer les chaînes longues d'abord
const pairs = [...hebToSlug.entries()].sort((a, b) => b[0].length - a[0].length);

// --- 2. Fichiers cibles ---------------------------------------------------
const targets = [
  ...globSync('src/components/services/**/*Form.jsx', { cwd: ROOT }),
  'src/components/config/filterConfig.js',
  'src/components/config/serviceFieldsConfig.js',
  'src/pages/services/serviceFiltersConfig.js',
  'src/components/filters/FilterBar.jsx',
  'src/pages/ProviderDetailPage.jsx',
  'src/utils/serviceDetailsValidation.js',
  'src/components/dashboard/ServiceDetailsEditor.jsx',
];

// --- translationMapper.js : régénéré (clés = slugs, dédupliquées) ---------
{
  const rel = 'src/utils/translationMapper.js';
  const lines = ['// Mapping valeurs canoniques (slugs stables, stockés en BDD) -> clés i18n',
    '// Généré/migré par scripts/migrate-canonical-values.mjs (migration option 1).',
    '// SYNCHRONISÉ AVEC filterConfig.js', '', 'const translationMappings = {'];
  for (const [category, entries] of Object.entries(mapper)) {
    lines.push(`  ${category}: {`);
    const seen = new Set();
    for (const [heb, i18nKey] of Object.entries(entries)) {
      const key = HEB.test(heb) ? (OVERRIDES[heb] || String(i18nKey).split('.').pop()) : heb;
      if (seen.has(key)) continue;
      seen.add(key);
      lines.push(`    ${/^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key)}: '${i18nKey}',`);
    }
    lines.push('  },');
  }
  lines.push('};', '');
  const orig = readFileSync(path.join(ROOT, rel), 'utf8');
  const hIdx = orig.indexOf('export const translateValue');
  const helpers = orig.slice(orig.lastIndexOf('/**', hIdx));
  const rebuilt = lines.join('\n') + '\n' + helpers;
  if (WRITE) writeFileSync(path.join(ROOT, rel), rebuilt);
  console.log(`  (mapper régénéré : ${rebuilt.split('\n').length} lignes)`);
}

// --- 3. Appliquer -------------------------------------------------------
let totalRepl = 0;
const perFile = [];
for (const rel of targets) {
  const abs = path.join(ROOT, rel);
  let src;
  try { src = readFileSync(abs, 'utf8'); } catch { perFile.push([rel, 'ABSENT']); continue; }
  let out = src;
  let n = 0;
  for (const [heb, slug] of pairs) {
    // le source échappe les backslashes ('a\\b') alors que la chaîne runtime
    // n'en a qu'un ('a\b') : on tente les deux formes
    const hebForms = heb.includes('\\') ? [heb, heb.replace(/\\/g, '\\\\')] : [heb];
    for (const hf of hebForms) {
      for (const q of ["'", '"']) {
        const from = q + hf + q;
        const to = q + slug + q;
        if (out.includes(from)) { n += out.split(from).length - 1; out = out.split(from).join(to); }
      }
    }
  }
  if (n > 0) { perFile.push([rel, n]); totalRepl += n; if (WRITE) writeFileSync(abs, out); }
  else perFile.push([rel, 0]);

  // Hébreu résiduel dans une position "valeur" (heuristique : ' ... ' ou " ... " purement hébraïque)
  const leftover = [...out.matchAll(/(['"])([^'"]*[֐-׿][^'"]*)\1/g)]
    .map((m) => m[2])
    .filter((s) => !s.includes('t(') );
  if (leftover.length) perFile.push([`  ↳ résiduel ${rel}`, [...new Set(leftover)].slice(0, 12).join(' | ')]);
}

// --- 4. Rapport --------------------------------------------------------
console.log(`\n=== heb -> slug : ${hebToSlug.size} valeurs canoniques ===`);
console.log(`=== ${WRITE ? 'ÉCRIT' : 'DRY-RUN'} — ${totalRepl} remplacements sur ${targets.length} fichiers ===\n`);
for (const [f, n] of perFile) console.log(typeof n === 'number' ? `  ${String(n).padStart(4)}  ${f}` : `  ${f}\n        ${n}`);
if (conflicts.length) {
  console.log(`\n!!! ${conflicts.length} CONFLITS (même hébreu -> slugs différents) — à traiter à la main :`);
  for (const c of conflicts) console.log(`  "${c.heb}"  ${c.a} != ${c.b}  (${c.category})`);
}
console.log('');
