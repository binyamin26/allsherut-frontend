import { useLanguage } from '../../context/LanguageContext';

// Real, service-specific intro copy + "what this covers" bullets — replaces the
// previous thin-content layout (H1 + filter widget + grid, no actual text).
const ServiceIntro = ({ serviceId }) => {
  const { t } = useLanguage();

  const intro = t(`services.${serviceId}.intro`, '');
  const highlights = [1, 2, 3, 4]
    .map(n => t(`services.${serviceId}.highlight${n}`, ''))
    .filter(Boolean);

  if (!intro && highlights.length === 0) return null;

  return (
    <section className="service-intro-section">
      <div className="container">
        {intro && <p className="service-intro-text">{intro}</p>}
        {highlights.length > 0 && (
          <ul className="service-highlights">
            {highlights.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ServiceIntro;
