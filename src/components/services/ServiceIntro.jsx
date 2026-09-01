import { useLanguage } from '../../context/LanguageContext';
import { getServiceCards, getServiceChecklist, getServiceTransition } from '../../utils/serviceUsefulInfo';
import { getServiceCardIcon } from '../../data/serviceUsefulInfoIcons';

// "Informations utiles" — real, service-specific editorial content sitting between the
// provider results and the FAQ. Renders, in order: intro paragraph, intervention cards
// (or the legacy plain-bullet highlight list for services not yet migrated to cards),
// an optional pre-contact checklist, and an optional closing transition line back to
// the results. Any block with no content simply doesn't render — sections are never
// force-filled. Mirrored in scripts/prerender-static-pages.mjs for crawlers/no-JS.
const ServiceIntro = ({ serviceId }) => {
  const { t } = useLanguage();

  const intro = t(`services.${serviceId}.intro`, '');
  const cards = getServiceCards(serviceId, t);
  const legacyHighlights = cards.length === 0
    ? [1, 2, 3, 4].map(n => t(`services.${serviceId}.highlight${n}`, '')).filter(Boolean)
    : [];
  const checklist = getServiceChecklist(serviceId, t);
  const transition = getServiceTransition(serviceId, t);

  if (!intro && cards.length === 0 && legacyHighlights.length === 0) return null;

  return (
    <section className="service-intro-section">
      <div className="container">
        <span className="service-intro-eyebrow">{t('services.infoSectionTitle', 'Informations utiles')}</span>
        {intro && <p className="service-intro-text">{intro}</p>}

        {cards.length > 0 && (
          <>
            <h2 className="service-cards-title">{t('services.cardsSectionTitle', 'Services et prestations courants')}</h2>
            {/* At the desktop container width (820px), the base 220px-min auto-fit rule
               always resolves to 3 columns. That's exactly right for counts of 3 and 6
               (one or two full rows) but leaves a single orphaned card alone on its own
               row for the 15 services with exactly 4 cards. Widening the min-width just
               for that count forces a clean 2x2 grid instead, while still degrading to
               1 column on mobile via the existing media query. */}
            <div className={`service-cards-grid${cards.length === 4 ? ' service-cards-grid--four' : ''}`}>
              {cards.map((card, i) => {
                const Icon = getServiceCardIcon(serviceId, i);
                return (
                  <div className="service-card" key={i}>
                    <div className="service-card-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <h3 className="service-card-title">{card.title}</h3>
                    <p className="service-card-desc">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {legacyHighlights.length > 0 && (
          <ul className="service-highlights">
            {legacyHighlights.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {checklist.length > 0 && (
          <div className="service-checklist">
            <h3 className="service-checklist-title">{t('services.checklistSectionTitle', 'Avant de contacter un professionnel')}</h3>
            {/* Same orphan-row issue as the cards grid, same fix: the base 200px-min
               rule resolves to 3 columns at desktop width, which is exactly right for
               3 items (one row) and 5 (a 3+2 split most viewers read as intentional),
               but leaves a lone item on its own row for the ~24 services with exactly
               4 checklist items. Force a clean 2x2 there instead. */}
            <ul className={`service-checklist-list${checklist.length === 4 ? ' service-checklist-list--four' : checklist.length === 5 ? ' service-checklist-list--five' : ''}`}>
              {checklist.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {transition && <p className="service-intro-transition">{transition}</p>}
      </div>
    </section>
  );
};

export default ServiceIntro;
