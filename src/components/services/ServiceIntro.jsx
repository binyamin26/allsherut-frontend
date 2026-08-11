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
        <span className="service-intro-eyebrow">{t('services.infoSectionTitle', 'מידע שימושי')}</span>
        {intro && <p className="service-intro-text">{intro}</p>}

        {cards.length > 0 && (
          <>
            <h2 className="service-cards-title">{t('services.cardsSectionTitle', 'שירותים ופעולות נפוצות')}</h2>
            <div className="service-cards-grid">
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
            <h3 className="service-checklist-title">{t('services.checklistSectionTitle', 'לפני שפונים לבעל מקצוע')}</h3>
            <ul className="service-checklist-list">
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
