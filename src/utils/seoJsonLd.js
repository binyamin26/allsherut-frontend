// Plain-JS (no JSX) service SEO data helpers. Deliberately dependency-free from any
// React component so this file can be imported both by the live app AND by the
// build-time prerender script (scripts/prerender-static-pages.mjs) — one source of
// truth for breadcrumb / FAQ / JSON-LD content, so the two can never drift apart.
import { getCategoryForService } from '../data/categories.js';
import { buildServicePath, serviceTypeToKey } from './langUtils.js';

// Absolute-URL breadcrumb data for JSON-LD BreadcrumbList, shared with the visible
// breadcrumb rendered by <ServiceBreadcrumb>.
export function buildServiceBreadcrumbItems(serviceId, serviceName) {
  const category = getCategoryForService(serviceId);
  const items = [
    { '@type': 'ListItem', position: 1, name: 'AllSherut', item: 'https://allsherut.com/' },
  ];
  if (category) {
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: category.names?.fr,
      item: `https://allsherut.com/categories/${category.id}`,
    });
  }
  items.push({
    '@type': 'ListItem',
    position: items.length + 1,
    name: serviceName,
    item: `https://allsherut.com${buildServicePath(serviceTypeToKey(serviceId), 'fr')}`,
  });
  return items;
}

// Reads services.<id>.faq{1..3}Question / Answer from the given translate function.
// `t` must behave like i18next's t(key, fallback) — used identically by the live
// useLanguage() hook and by the Node-side translation.json lookup in the prerender script.
export function getServiceFaqItems(serviceId, t) {
  return [1, 2, 3]
    .map(n => ({
      question: t(`services.${serviceId}.faq${n}Question`, ''),
      answer: t(`services.${serviceId}.faq${n}Answer`, ''),
    }))
    .filter(item => item.question && item.answer);
}

// Builds the combined Service + BreadcrumbList (+ FAQPage when FAQ content exists)
// JSON-LD graph for a /services/:slug page.
export function buildServicePageJsonLd({ serviceId, name, description, t }) {
  const faqItems = getServiceFaqItems(serviceId, t);

  const graph = [
    {
      '@type': 'Service',
      name,
      description,
      serviceType: name,
      areaServed: { '@type': 'Country', name: 'France' },
      provider: { '@type': 'Organization', name: 'AllSherut', url: 'https://allsherut.com' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: buildServiceBreadcrumbItems(serviceId, name),
    },
  ];

  if (faqItems.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
