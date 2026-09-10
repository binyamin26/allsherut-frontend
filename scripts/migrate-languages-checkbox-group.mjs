/**
 * Codemod — remplace le bloc de cases à cocher « langues parlées » dupliqué dans
 * les ~38 formulaires de service par le composant partagé <LanguagesCheckboxGroup>
 * (qui ajoute l'option « Autre » + champ libre stocké dans serviceDetails.languages_other).
 *
 * Idempotent : ne touche pas un fichier déjà migré. Conservé pour re-run / review.
 *
 *   node scripts/migrate-languages-checkbox-group.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SERVICES_DIR = 'src/components/services';
const IMPORT_LINE = "import LanguagesCheckboxGroup from '../common/LanguagesCheckboxGroup';";
// Formulaires qui proposaient aussi l'espagnol
const SPANISH_FORMS = new Set(['babysitting', 'doula', 'eldercare', 'photographer']);

const START_RE = /^(\s*)<div className="checkbox-group" data-field="languages">\s*$/;
const ERROR_RE = /errors\['serviceDetails\.languages'\]/;

let changed = 0;

for (const dir of readdirSync(SERVICES_DIR, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const actualPath = resolveFormFile(dir.name);
  if (!actualPath) continue; // dossier sans *Form.jsx

  const src = readFileSync(actualPath, 'utf8');
  if (src.includes('LanguagesCheckboxGroup')) continue; // déjà migré

  const lines = src.split('\n');
  const startIdx = lines.findIndex((l) => START_RE.test(l));
  if (startIdx === -1) continue;

  const indent = lines[startIdx].match(START_RE)[1];

  // Trouver le </div> fermant en comptant la profondeur des <div>
  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx; i < lines.length; i++) {
    const opens = (lines[i].match(/<div(\s|>)/g) || []).length;
    const closes = (lines[i].match(/<\/div>/g) || []).length;
    depth += opens - closes;
    if (depth === 0) {
      endIdx = i;
      break;
    }
  }
  if (endIdx === -1) {
    console.warn(`!! ${actualPath} : </div> fermant introuvable, ignoré`);
    continue;
  }

  // Absorber la ligne d'erreur qui suit immédiatement
  let lastIdx = endIdx;
  if (endIdx + 1 < lines.length && ERROR_RE.test(lines[endIdx + 1])) {
    lastIdx = endIdx + 1;
  }

  const spanish = SPANISH_FORMS.has(dir.name) ? `\n${indent}  includeSpanish` : '';
  const replacement = [
    `${indent}<LanguagesCheckboxGroup`,
    `${indent}  serviceDetails={serviceDetails}`,
    `${indent}  handleServiceDetailsChange={handleServiceDetailsChange}`,
    `${indent}  errors={errors}${spanish}`,
    `${indent}/>`,
  ].join('\n');

  lines.splice(startIdx, lastIdx - startIdx + 1, replacement);

  // Ajouter l'import juste après l'import de useLanguage
  const ulIdx = lines.findIndex((l) => l.includes("from '../../../context/LanguageContext'"));
  if (ulIdx !== -1 && !lines.some((l) => l.includes(IMPORT_LINE))) {
    lines.splice(ulIdx + 1, 0, IMPORT_LINE);
  }

  let out = lines.join('\n');

  // driver : si la const LANGUAGES_OPTIONS n'est plus référencée que par sa
  // propre définition, la retirer (sinon eslint no-unused-vars, max-warnings 0)
  if ((out.match(/\bLANGUAGES_OPTIONS\b/g) || []).length === 1) {
    out = out.replace(/const LANGUAGES_OPTIONS = \[[\s\S]*?\];\r?\n\r?\n?/, '');
  }

  writeFileSync(actualPath, out);
  changed++;
  console.log(`✓ ${actualPath}${spanish ? '  (+espagnol)' : ''}`);
}

console.log(`\n${changed} formulaire(s) migré(s).`);

function resolveFormFile(dirName) {
  const d = join(SERVICES_DIR, dirName);
  const hit = readdirSync(d).find((f) => /Form\.jsx$/.test(f));
  return hit ? join(d, hit) : null;
}
