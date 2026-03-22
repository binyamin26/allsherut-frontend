// scripts/translate-with-deepl.mjs
// Translates missing keys from Hebrew (source) to EN, FR, RU via DeepL API.
//
// Setup:
//   1. Get a free API key at https://www.deepl.com/pro-api (500k chars/month free)
//   2. Add DEEPL_API_KEY=your_key to the root .env file
//   3. Run: node scripts/translate-with-deepl.mjs
//
// Options:
//   --lang=fr          Translate only one language
//   --force            Re-translate all keys (not just missing ones)
//   --dry-run          Show what would be translated without writing files

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// ─── Load .env manually (no dotenv dependency needed) ───────────────────────
const loadEnv = () => {
  try {
    const raw = readFileSync('.env', 'utf-8');
    for (const line of raw.split('\n')) {
      const match = line.match(/^([^#=\s]+)\s*=\s*(.*)$/);
      if (match) process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  } catch {
    // .env not found — rely on actual environment variables
  }
};
loadEnv();

// ─── Config ─────────────────────────────────────────────────────────────────
const API_KEY = process.env.DEEPL_API_KEY;
if (!API_KEY) {
  console.error('❌  DEEPL_API_KEY not found. Add it to your .env file:');
  console.error('    DEEPL_API_KEY=your_deepl_key_here');
  process.exit(1);
}

// DeepL free tier uses api-free.deepl.com, pro uses api.deepl.com
const API_URL = API_KEY.endsWith(':fx')
  ? 'https://api-free.deepl.com/v2/translate'
  : 'https://api.deepl.com/v2/translate';

const TARGET_LANGS = { en: 'EN-US', fr: 'FR', ru: 'RU' };
const BATCH_SIZE = 50; // keys per API call

// ─── CLI args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const onlyLang = args.find(a => a.startsWith('--lang='))?.split('=')[1];
const force = args.includes('--force');
const dryRun = args.includes('--dry-run');

if (dryRun) console.log('🔍  Dry run — no files will be written\n');

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Protect {varname} interpolation variables from being translated by DeepL
const protectVars = (str) =>
  str.replace(/\{(\w+)\}/g, (_, name) => `<keep id="${name}"/>`);

// Restore protected variables
const restoreVars = (str) =>
  str.replace(/<keep id="(\w+)"\/>/g, (_, name) => `{${name}}`);

// Translate an array of strings via DeepL
const translateBatch = async (texts, targetLang) => {
  const body = new URLSearchParams();
  body.append('source_lang', 'HE');
  body.append('target_lang', targetLang);
  body.append('tag_handling', 'xml');
  body.append('ignore_tags', 'keep');
  for (const text of texts) body.append('text', protectVars(text));

  const res = await fetch(API_URL, {
    method: 'POST',
    body,
    headers: { 'Authorization': `DeepL-Auth-Key ${API_KEY}` },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepL API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.translations.map(t => restoreVars(t.text));
};

// Process in batches to respect API limits
const translateAll = async (pairs, targetLang) => {
  const results = [];
  for (let i = 0; i < pairs.length; i += BATCH_SIZE) {
    const batch = pairs.slice(i, i + BATCH_SIZE);
    process.stdout.write(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(pairs.length / BATCH_SIZE)}...`);
    const translated = await translateBatch(batch.map(p => p.value), targetLang);
    for (let j = 0; j < batch.length; j++) {
      results.push({ key: batch[j].key, value: translated[j] });
    }
    console.log(' ✓');
  }
  return results;
};

// ─── Main ────────────────────────────────────────────────────────────────────
const heJson = JSON.parse(readFileSync('src/locales/he/translation.json', 'utf-8'));
const langs = onlyLang ? { [onlyLang]: TARGET_LANGS[onlyLang] } : TARGET_LANGS;

let totalTranslated = 0;

for (const [lang, deeplCode] of Object.entries(langs)) {
  if (!deeplCode) {
    console.warn(`⚠️  Unknown language: ${lang}. Supported: en, fr, ru`);
    continue;
  }

  console.log(`\n🌐  ${lang.toUpperCase()} (${deeplCode})`);

  const path = resolve(`src/locales/${lang}/translation.json`);
  let existing = {};
  try {
    existing = JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    console.log('  No existing file — will create it.');
  }

  // Find keys to translate
  const missing = Object.entries(heJson).filter(([key, value]) => {
    if (force) return true;
    if (!existing[key]) return true;           // missing
    if (existing[key] === value) return true;  // same as Hebrew (not translated)
    return false;
  }).map(([key, value]) => ({ key, value }));

  if (missing.length === 0) {
    console.log('  ✅  All keys already translated — nothing to do.');
    continue;
  }

  console.log(`  ${missing.length} key(s) to translate...`);

  if (dryRun) {
    console.log(`  Would translate: ${missing.slice(0, 3).map(p => p.key).join(', ')}${missing.length > 3 ? '...' : ''}`);
    continue;
  }

  const translated = await translateAll(missing, deeplCode);

  // Merge: preserve existing, add/overwrite translated
  const updated = { ...existing };
  for (const { key, value } of translated) {
    updated[key] = value;
  }

  writeFileSync(path, JSON.stringify(updated, null, 2), 'utf-8');
  console.log(`  ✅  ${translated.length} key(s) written to src/locales/${lang}/translation.json`);
  totalTranslated += translated.length;
}

console.log(`\n🎉  Done! ${totalTranslated} key(s) translated total.`);
if (totalTranslated > 0 && !dryRun) {
  console.log('   Run `npm run build` to bundle the updated translations.');
}
