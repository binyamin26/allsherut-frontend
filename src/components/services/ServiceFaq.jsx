import { useLanguage } from '../../context/LanguageContext';
import { getServiceFaqItems } from '../../utils/seoJsonLd';

// Reads services.<id>.faq{1..3}Question / Answer from i18n and renders them as a
// simple accordion. Returns null (renders nothing) when no FAQ content exists yet.
// (FAQ data-reading logic lives in ../../utils/seoJsonLd.js — kept out of this
// component so the plain-JS prerender script can reuse it without a JSX loader.)
const ServiceFaq = ({ serviceId }) => {
  const { t } = useLanguage();
  const items = getServiceFaqItems(serviceId, t);

  if (items.length === 0) return null;

  return (
    <section className="service-faq-section">
      <div className="container">
        <h2 className="service-faq-title">{t('services.faqSectionTitle', 'שאלות נפוצות')}</h2>
        <div className="service-faq-list">
          {items.map((item, i) => (
            <details key={i} className="service-faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFaq;
