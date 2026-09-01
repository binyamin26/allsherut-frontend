import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getServiceFaqItems } from '../../utils/seoJsonLd';

// Reads services.<id>.faq{1..3}Question / Answer from i18n and renders them as an
// animated accordion. Returns null (renders nothing) when no FAQ content exists yet.
// (FAQ data-reading logic lives in ../../utils/seoJsonLd.js — kept out of this
// component so the plain-JS prerender script can reuse it without a JSX loader; the
// prerender script renders a plain <details> fallback using the same CSS classes,
// which is what crawlers/no-JS visitors see for the fraction of a second before this
// component takes over.)
const ServiceFaq = ({ serviceId }) => {
  const { t } = useLanguage();
  const items = getServiceFaqItems(serviceId, t);
  const [openIndex, setOpenIndex] = useState(-1);

  if (items.length === 0) return null;

  return (
    <section className="service-faq-section">
      <div className="container">
        <div className="service-faq-header">
          <h2 className="service-faq-title">{t('services.faqSectionTitle', 'Questions fréquentes')}</h2>
          <p className="service-faq-subtitle">
            {t('services.faqSectionSubtitle', 'Les réponses aux questions que se posent le plus les clients avant de contacter un prestataire')}
          </p>
        </div>
        <div className="service-faq-list">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`service-faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="service-faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span>{item.question}</span>
                  <ChevronDown size={18} className="service-faq-chevron" aria-hidden="true" />
                </button>
                <div className="service-faq-answer-wrap">
                  <div className="service-faq-answer-inner">
                    <p className="service-faq-answer">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFaq;
