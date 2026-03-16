// scripts/extract-translations.mjs
// Exécuter une seule fois : node scripts/extract-translations.mjs
// Extrait l'objet translations de LanguageContext.jsx vers public/locales/<lang>/translation.json

import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const raw = readFileSync('src/context/LanguageContext.jsx', 'utf-8');

const start = raw.indexOf('const translations = {');
if (start === -1) throw new Error('Cannot find "const translations = {" in LanguageContext.jsx');

// Find the closing }; before the LanguageProvider definition
const providerIndex = raw.indexOf('export const LanguageProvider');
const end = raw.lastIndexOf('};', providerIndex);
if (end === -1) throw new Error('Cannot find end of translations object');

const objectStr = raw.slice(start + 'const translations = '.length, end + 1);

// eslint-disable-next-line no-new-func
const translations = new Function(`return ${objectStr}`)();

const langs = ['he', 'en', 'ru', 'fr'];
for (const lang of langs) {
  mkdirSync(`public/locales/${lang}`, { recursive: true });
  writeFileSync(
    `public/locales/${lang}/translation.json`,
    JSON.stringify(translations[lang], null, 2),
    'utf-8'
  );
  console.log(`✓ public/locales/${lang}/translation.json — ${Object.keys(translations[lang]).length} keys`);
}

console.log('\nExtraction complete!');
