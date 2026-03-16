// scripts/translate-new-keys.mjs
// Usage : DEEPL_API_KEY=xxx node scripts/translate-new-keys.mjs
//
// Workflow pour ajouter de nouvelles traductions :
// 1. Ajouter les nouvelles clés en hébreu dans public/locales/he/translation.json
// 2. Lancer : DEEPL_API_KEY=xxx npm run translate
// 3. Commiter les 4 fichiers JSON
// 4. Pusher sur GitHub → Vercel déploie automatiquement

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCALES_DIR = join(__dirname, '..', 'public', 'locales');

const DEEPL_KEY = process.env.DEEPL_API_KEY;
if (!DEEPL_KEY) {
  console.error('❌ DEEPL_API_KEY env var is required');
  console.error('   Usage: DEEPL_API_KEY=your-key node scripts/translate-new-keys.mjs');
  process.exit(1);
}

// Utilise l'API gratuite DeepL (api-free.deepl.com).
// Si tu as un plan payant, remplace par api.deepl.com
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

const TARGET_LANGS = {
  en: 'EN-US',
  ru: 'RU',
  fr: 'FR',
};

async function deeplTranslate(text, targetLang) {
  // Protège les placeholders {varName} contre la traduction par DeepL
  const protectedText = text.replace(/\{([^}]+)\}/g, (_, name) => `<x id="${name}"/>`);

  const res = await fetch(DEEPL_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${DEEPL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [protectedText],
      target_lang: targetLang,
      source_lang: 'HE',
      tag_handling: 'xml',
      ignore_tags: ['x'],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepL API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const translated = data.translations?.[0]?.text ?? text;
  // Restaure les placeholders {varName}
  return translated.replace(/<x id="([^"]+)"\/>/g, '{$1}');
}

async function main() {
  const hePath = join(LOCALES_DIR, 'he', 'translation.json');
  const heKeys = JSON.parse(readFileSync(hePath, 'utf-8'));

  let totalTranslated = 0;

  for (const [targetCode, deeplCode] of Object.entries(TARGET_LANGS)) {
    const targetPath = join(LOCALES_DIR, targetCode, 'translation.json');
    const existing = JSON.parse(readFileSync(targetPath, 'utf-8'));

    const missingKeys = Object.keys(heKeys).filter(k => !(k in existing));

    if (missingKeys.length === 0) {
      console.log(`[${targetCode}] ✓ No missing keys`);
      continue;
    }

    console.log(`[${targetCode}] Translating ${missingKeys.length} missing keys...`);

    // Traduction par lots de 50 pour respecter les limites DeepL
    for (let i = 0; i < missingKeys.length; i += 50) {
      const batch = missingKeys.slice(i, i + 50);
      for (const key of batch) {
        const heValue = heKeys[key];
        if (typeof heValue !== 'string') {
          existing[key] = heValue;
          continue;
        }
        try {
          existing[key] = await deeplTranslate(heValue, deeplCode);
        } catch (err) {
          console.warn(`  ⚠ Could not translate key "${key}": ${err.message}`);
          existing[key] = heValue; // fallback vers l'hébreu
        }
      }
      // Pause entre les lots
      if (i + 50 < missingKeys.length) {
        await new Promise(r => setTimeout(r, 300));
      }
    }

    writeFileSync(targetPath, JSON.stringify(existing, null, 2), 'utf-8');
    console.log(`[${targetCode}] ✓ ${missingKeys.length} keys translated and saved`);
    totalTranslated += missingKeys.length;
  }

  console.log(`\nDone! ${totalTranslated} translations added total.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
