import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORY_DEFINITIONS, SERVICES_META } from '../data/categories';
import SEO from '../components/common/SEO';

const CategoryPage = () => {
  const { slug } = useParams();
  const { t, currentLanguage, direction } = useLanguage();
  const navigate = useNavigate();

  const category = CATEGORY_DEFINITIONS.find((c) => c.id === slug);

  if (!category) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <p>Catégorie introuvable.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  const categoryName = category.names[currentLanguage] || category.names.fr;
  const categoryDescription = category.descriptions?.[currentLanguage] || category.descriptions?.fr || categoryName;
  const BackIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;

  const services = category.serviceIds
    .map((id) => ({ id, ...SERVICES_META[id] }))
    .filter(Boolean);

  return (
    <div
      className="homepage"
      style={{
        background: `
          radial-gradient(at 0% 0%, rgba(15, 42, 68, 0.12) 0px, transparent 55%),
          radial-gradient(at 100% 0%, rgba(47, 128, 237, 0.18) 0px, transparent 55%),
          radial-gradient(at 100% 100%, rgba(26, 84, 144, 0.12) 0px, transparent 55%),
          radial-gradient(at 0% 100%, rgba(47, 128, 237, 0.10) 0px, transparent 55%),
          #ffffff`,
        minHeight: '100vh',
      }}
    >
      <SEO
        title={categoryName}
        description={categoryDescription}
        canonicalPath={`/categories/${slug}`}
        sameUrlForAllLangs
      />

      <section className="services-section" style={{ background: 'transparent' }}>
        <div className="container">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '0.25rem 0',
              fontSize: '0.95rem',
            }}
          >
            <BackIcon size={18} />
            {t('common.back', 'Retour')}
          </button>

          <div className="section-header">
            <h1 className="section-title animate-fade-in-down">{categoryName}</h1>
            <p className="hero-description text-center mb-16 animate-fade-in-up delay-100">
              {services.length} {t('homepage.services.subtitle', 'services disponibles')}
            </p>
          </div>
        </div>

        {/* Service cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.25rem',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem 3rem',
          }}
        >
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.href}
              className="service-card-image"
              style={{ display: 'block', borderRadius: '12px', overflow: 'hidden' }}
            >
              {service.image ? (
                <img
                  src={service.image}
                  alt={t(service.nameKey)}
                  className="service-image"
                />
              ) : (
                <div
                  className={`service-icon-fallback bg-gradient-to-br ${category.gradient}`}
                  style={{ height: '180px' }}
                />
              )}
              <div className="service-name-overlay">
                <h3>{t(service.nameKey)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
