// Build-time static prerendering for the 37 /services/:slug pages and the 6
// /categories/:slug pages.
//
// WHY: the app is a client-rendered SPA (see src/main.jsx — ReactDOM.createRoot
// renders after an async i18n fetch resolves), so the very first HTML byte Vercel
// serves for these routes is an empty <div id="root"></div>. Search engines that
// don't run JS, and the first "crawl" pass of ones that do, see no title, no H1, no
// text, no structured data. This script fixes that for the pages that matter most
// (service + category listing pages) WITHOUT any SSR framework, WITHOUT touching how
// the app runs for real users, and WITHOUT prerendering provider pages (too many, too
// volatile — see the constraint note below).
//
// HOW IT WORKS (no headless browser, no network calls — pure, deterministic,
// build-reproducible string generation):
//   1. Run *after* `vite build` (wired as `npm run build`'s second step — see
//      package.json). It reads the just-built dist/index.html to grab the CURRENT
//      hashed <script>/<link> tags Vite generated for this exact build. This is why
//      it must run after vite build, every time: those hashes change on every build,
//      and hardcoding them anywhere else would go stale immediately.
//   2. It imports the exact same plain-JS data modules the live React pages import
//      (SERVICE_PAGE_META, SERVICE_SLUGS, CATEGORY_DEFINITIONS, buildServicePageJsonLd,
//      etc.) and reads src/locales/he/translation.json directly — the SAME sources of
//      truth, so the prerendered HTML can never say something different from what
//      React itself will render a moment later (no cloaking).
//   3. For each route, it clones dist/index.html, swaps in the page-specific
//      <title>/meta description/canonical/hreflang/OG/Twitter/JSON-LD tags, and fills
//      <div id="root"> with the static parts of the page (breadcrumb, hero, H1, intro,
//      highlights, FAQ) using the exact same CSS classes the React components use —
//      so it's already correctly styled via the same stylesheet link, before any JS runs.
//   4. It deliberately does NOT prerender the filter widget or the provider results
//      grid (those need live API data and change constantly) — those areas stay empty
//      in the static file and get filled in by the app within a fraction of a second,
//      exactly like every other page today. This keeps the script simple and avoids
//      ever shipping stale provider listings.
//   5. React mounts via `ReactDOM.createRoot(...).render(...)` (not `hydrateRoot`), so
//      it does a full clean re-render of #root rather than reconciling with the
//      prerendered markup — there is no hydration-mismatch risk. The static content is
//      a pure "first paint for crawlers and humans", fully replaced by the normal SPA
//      a moment later.
//
// PROVIDER PAGES: intentionally NOT prerendered here. There are hundreds of them, they
// change whenever a provider edits their profile, and prerendering them would mean
// serving a stale snapshot until the next deploy. Left as-is (client-rendered, same as
// today) per explicit instruction.

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import { CATEGORY_DEFINITIONS, SERVICES_META, getCategoryForService } from '../src/data/categories.js';
import { buildServicePath, serviceTypeToKey } from '../src/utils/langUtils.js';
import { SERVICE_PAGE_META } from '../src/data/servicePageMeta.js';
import { buildServicePageJsonLd, getServiceFaqItems } from '../src/utils/seoJsonLd.js';
import { getFirstSentence } from '../src/utils/textUtils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const BASE_URL = 'https://allsherut.com';

const translations = JSON.parse(readFileSync(resolve(ROOT, 'src/locales/he/translation.json'), 'utf-8'));
const t = (key, fallback = '') => translations[key] ?? fallback;

const baseHtml = readFileSync(resolve(DIST, 'index.html'), 'utf-8');

// Sanity check: every prerendered page starts from this exact file (including its
// hashed <script>/<link> tags for the CURRENT build), so if Vite's output shape ever
// changes, fail loudly here instead of silently shipping a broken page.
if (!baseHtml.includes('<script type="module"') || !baseHtml.includes('<div id="root"></div>')) {
  console.error('✗ dist/index.html does not look like a fresh Vite build output — aborting prerender.');
  process.exit(1);
}

// --- 1. Small helpers to swap page-specific tags into the base template ------------
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str = '') {
  return escapeHtml(str);
}

// hreflangPaths: { he, fr, en, ru } absolute *paths* (no domain) — for service pages
// these differ per language (SERVICE_SLUGS has a distinct slug per language, e.g.
// electrician/electricien/elektrik); for category pages they're all the same path
// (categories use sameUrlForAllLangs in the live <SEO> too). Passing the wrong one
// here is exactly the hreflang-404 bug already fixed once on ProviderDetailPage —
// this mirrors SEO.jsx's real per-language logic instead of naively prefixing
// /fr, /en, /ru onto the Hebrew path.
function buildHead({ title, description, canonicalPath, jsonLd, hreflangPaths }) {
  const fullTitle = `${title} | AllSherut`;
  const canonical = `${BASE_URL}${canonicalPath}`;
  const paths = hreflangPaths || { he: canonicalPath, fr: canonicalPath, en: canonicalPath, ru: canonicalPath };
  const hreflangLinks = [
    `<link rel="alternate" hreflang="he-IL" href="${BASE_URL}${paths.he}" />`,
    `<link rel="alternate" hreflang="fr-IL" href="${BASE_URL}${paths.fr}" />`,
    `<link rel="alternate" hreflang="en-IL" href="${BASE_URL}${paths.en}" />`,
    `<link rel="alternate" hreflang="ru-IL" href="${BASE_URL}${paths.ru}" />`,
    `<link rel="alternate" hreflang="x-default" href="${BASE_URL}${paths.he}" />`,
  ].join('\n    ');

  let html = baseHtml;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeAttr(description)}" />`
  );
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttr(fullTitle)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttr(description)}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeAttr(fullTitle)}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeAttr(description)}" />`);

  // Insert canonical + hreflang right after the robots meta tag.
  html = html.replace(
    /(<meta name="robots" content="index, follow" \/>)/,
    `$1\n    <link rel="canonical" href="${canonical}" />\n    ${hreflangLinks}`
  );

  // Insert the page-specific JSON-LD right after the sitewide Organization JSON-LD.
  if (jsonLd) {
    html = html.replace(
      /(<!-- JSON-LD Structured Data -->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>)/,
      `$1\n    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
    );
  }

  return html;
}

function writePage(routePath, headHtml, bodyInnerHtml) {
  const finalHtml = headHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${bodyInnerHtml}</div>`
  );
  const outDir = resolve(DIST, routePath.replace(/^\//, ''));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'index.html'), finalHtml, 'utf-8');
}

// --- 2. Service pages ----------------------------------------------------------------
function renderServiceBody(serviceId) {
  const meta = SERVICE_PAGE_META[serviceId];
  const pageTitle = t(`services.${serviceId}.pageTitle`, meta.title);
  const category = getCategoryForService(serviceId);
  const intro = t(`services.${serviceId}.intro`, '');
  const highlights = [1, 2, 3, 4].map(n => t(`services.${serviceId}.highlight${n}`, '')).filter(Boolean);
  const faqItems = getServiceFaqItems(serviceId, t);

  const breadcrumb = `
    <div class="breadcrumb service-page-breadcrumb">
      <a href="/">${escapeHtml(t('provider.home', 'בית'))}</a>
      <span>/</span>
      ${category ? `<a href="/categories/${category.id}">${escapeHtml(category.names.he)}</a><span>/</span>` : ''}
      <span>${escapeHtml(pageTitle)}</span>
    </div>`;

  const hero = `
    <section class="service-header">
      <div class="container">
        <div class="service-title-section">
          <div class="service-hero-icon">
            <img src="${escapeAttr(meta.heroImage)}" alt="${escapeAttr(meta.heroAlt)}" />
          </div>
          <h1 class="service-title">${escapeHtml(pageTitle)}</h1>
        </div>
        ${intro ? `<p class="service-header-subtitle">${escapeHtml(getFirstSentence(intro))}</p>` : ''}
      </div>
    </section>`;

  const introSection = (intro || highlights.length > 0) ? `
    <section class="service-intro-section">
      <div class="container">
        <span class="service-intro-eyebrow">${escapeHtml(t('services.infoSectionTitle', 'מידע שימושי'))}</span>
        ${intro ? `<p class="service-intro-text">${escapeHtml(intro)}</p>` : ''}
        ${highlights.length > 0 ? `<ul class="service-highlights">${highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}</ul>` : ''}
      </div>
    </section>` : '';

  const faqSection = faqItems.length > 0 ? `
    <section class="service-faq-section">
      <div class="container">
        <div class="service-faq-header">
          <h2 class="service-faq-title">${escapeHtml(t('services.faqSectionTitle', 'שאלות נפוצות'))}</h2>
          <p class="service-faq-subtitle">${escapeHtml(t('services.faqSectionSubtitle', 'התשובות לשאלות שהכי מטרידות לקוחות לפני שהם פונים לספק'))}</p>
        </div>
        <div class="service-faq-list">
          ${faqItems.map(item => `
          <details class="service-faq-item">
            <summary>${escapeHtml(item.question)}</summary>
            <p>${escapeHtml(item.answer)}</p>
          </details>`).join('')}
        </div>
      </div>
    </section>` : '';

  return `<div class="service-page ${serviceId.replace(/_/g, '-')}-page">${breadcrumb}${hero}${introSection}${faqSection}</div>`;
}

let serviceCount = 0;
for (const serviceId of Object.keys(SERVICE_PAGE_META)) {
  const meta = SERVICE_PAGE_META[serviceId];
  const key = serviceTypeToKey(serviceId);
  const canonicalPath = buildServicePath(key, 'he');
  const hreflangPaths = {
    he: buildServicePath(key, 'he'),
    fr: buildServicePath(key, 'fr'),
    en: buildServicePath(key, 'en'),
    ru: buildServicePath(key, 'ru'),
  };
  const jsonLd = buildServicePageJsonLd({ serviceId, name: meta.title, description: meta.description, t });

  const head = buildHead({
    title: meta.title,
    description: meta.description,
    canonicalPath,
    jsonLd,
    hreflangPaths,
  });
  const body = renderServiceBody(serviceId);
  writePage(canonicalPath, head, body);
  serviceCount++;
}

// --- 3. Category pages -----------------------------------------------------------------
function renderCategoryBody(category) {
  const services = category.serviceIds.map(id => ({ id, ...SERVICES_META[id] })).filter(Boolean);
  const cards = services.map(service => {
    const servicePath = buildServicePath(serviceTypeToKey(service.id), 'he');
    const name = t(service.nameKey, service.id);
    return `
        <a href="${servicePath}" class="service-card-image" style="display:block;border-radius:12px;overflow:hidden">
          <img src="${escapeAttr(service.image)}" alt="${escapeAttr(name)}" class="service-image" />
          <div class="service-name-overlay"><h3>${escapeHtml(name)}</h3></div>
        </a>`;
  }).join('');

  return `
    <div class="homepage">
      <section class="services-section" style="background:transparent">
        <div class="container">
          <div class="section-header">
            <h1 class="section-title">${escapeHtml(category.names.he)}</h1>
            <p class="hero-description text-center mb-16">${services.length} ${escapeHtml(t('homepage.services.subtitle', ''))}</p>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:1.25rem;max-width:1200px;margin:0 auto;padding:0 1.5rem 3rem">${cards}
        </div>
      </section>
    </div>`;
}

let categoryCount = 0;
for (const category of CATEGORY_DEFINITIONS) {
  const canonicalPath = `/categories/${category.id}`;
  const head = buildHead({
    title: category.names.he,
    description: category.descriptions.he,
    canonicalPath,
    jsonLd: null,
  });
  const body = renderCategoryBody(category);
  writePage(canonicalPath, head, body);
  categoryCount++;
}

console.log(`✓ Prerendered ${serviceCount} service pages + ${categoryCount} category pages into dist/`);
