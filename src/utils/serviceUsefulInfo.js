// Plain-JS (no JSX) reader for the "Informations utiles" content of a service page:
// intervention cards, the optional pre-contact checklist, and the closing transition
// line. Kept dependency-free from React, same reason as getServiceFaqItems in
// seoJsonLd.js — the build-time prerender script (scripts/prerender-static-pages.mjs)
// needs the exact same data the live page renders, with no risk of drifting apart.
//
// Cards use services.<id>.card{1..6}Title / card{1..6}Desc. A card only counts once
// both its title AND description are present, so partially-filled slots never render
// a broken card. Services not yet migrated to the card system simply return an empty
// array — callers fall back to the legacy highlight1..4 bullet list.
export function getServiceCards(serviceId, t) {
  return [1, 2, 3, 4, 5, 6]
    .map(n => ({
      title: t(`services.${serviceId}.card${n}Title`, ''),
      desc: t(`services.${serviceId}.card${n}Desc`, ''),
    }))
    .filter(card => card.title && card.desc);
}

// services.<id>.checklist{1..5} — optional "before you contact a pro" bullet points.
// Most services won't have these; that's expected, not a gap to fill.
export function getServiceChecklist(serviceId, t) {
  return [1, 2, 3, 4, 5]
    .map(n => t(`services.${serviceId}.checklist${n}`, ''))
    .filter(Boolean);
}

// services.<id>.transition — one short closing sentence pointing back at the provider
// results above. Optional; not every service needs one.
export function getServiceTransition(serviceId, t) {
  return t(`services.${serviceId}.transition`, '');
}
