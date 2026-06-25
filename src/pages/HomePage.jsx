import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import {
  Search, Star, Users, Clock, Shield,
  CheckCircle, TrendingUp, Award,
} from 'lucide-react';
import AuthModal from '../components/auth/AuthModal';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ServiceSearchBar from '../components/common/ServiceSearchBar';
import { CATEGORY_DEFINITIONS } from '../data/categories';

const HomePage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { isAuthenticated } = useAuth();
  const { t, direction, currentLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#services') {
      setTimeout(() => {
        const element = document.getElementById('services');
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="homepage">
      <SEO
        title="כל השירותים לבית בישראל"
        description="חברו עם ספקי שירות מקצועיים בישראל - בייביסיטר, ניקיון, חשמלאי, אינסטלטור, גינון ועוד 23 קטגוריות שירות. השוו, בחרו, ובקשו הצעת מחיר."
        canonicalPath="/"
      />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title animate-fade-in-down">
                AllSherut – <span className="gradient-text">{t('homepage.hero.tagline')}</span>
              </h1>
              <p className="hero-description animate-fade-in-up delay-200" style={{ marginBottom: '0.5rem' }}>
                {t('homepage.hero.description1')}
              </p>
              {/* Search Bar */}
              <div className="animate-fade-in-up delay-300" style={{ marginBottom: '1rem' }}>
                <ServiceSearchBar style={{ maxWidth: '350px', margin: 0 }} />
              </div>
            </div>
            <div className="hero-visual animate-fade-in-up delay-200" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', overflow: 'visible' }}>
              <img
                src="/images/image-home-page.jpg"
                alt="AllSherut"
                style={{
                  width: '90%',
                  height: 'auto',
                  transform: 'translateX(18%)',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title animate-fade-in-down">{t('homepage.services.title')}</h2>
            <p className="hero-description text-center mb-16 animate-fade-in-up delay-100">
              {t('homepage.services.subtitle')}
            </p>
          </div>
        </div>

        <div className="services-carousel-container">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={4}
            slidesPerView={1}
            dir={direction === 'rtl' ? 'rtl' : 'ltr'}
            key={direction}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 4 },
            }}
          >
            {CATEGORY_DEFINITIONS.map((cat) => {
              const name = cat.names[currentLanguage] || cat.names.fr;
              return (
                <SwiperSlide key={cat.id}>
                  <Link to={`/categories/${cat.id}`} className="service-card-image">
                    <img
                      src={cat.image}
                      alt={name}
                      className="service-image"
                    />
                    <div className="service-name-overlay">
                      <h3>{name}</h3>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      {/* Section Clients */}
      <section className="section">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">
            {t('homepage.clients.title')}
          </h2>
          <p className="hero-description text-center mb-12 animate-fade-in-up delay-100">
            {t('homepage.clients.subtitle')}
          </p>

          <div className="features-grid">
            <div className="feature-card animate-fade-in delay-100">
              <div className="feature-icon">
                <Star size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.features.verified.title')}</h3>
              <p className="feature-description">
                {t('homepage.features.verified.description')}
              </p>
            </div>

            <div className="feature-card animate-fade-in delay-200">
              <div className="feature-icon">
                <Search size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.features.centralized.title')}</h3>
              <p className="feature-description">
                {t('homepage.features.centralized.description')}
              </p>
            </div>

            <div className="feature-card animate-fade-in delay-300">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.features.personal.title')}</h3>
              <p className="feature-description">
                {t('homepage.features.personal.description')}
              </p>
            </div>

            <div className="feature-card animate-fade-in delay-400">
              <div className="feature-icon">
                <Shield size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.features.transparency.title')}</h3>
              <p className="feature-description">
                {t('homepage.features.transparency.description')}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Section Prestataires */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--primary-25) 0%, var(--accent-25) 100%)' }}>
        <div className="container">
          <h2 className="section-title animate-fade-in-up">
            {t('homepage.providers.title')}
          </h2>
          <p className="hero-description text-center mb-12 animate-fade-in-up delay-100">
            {t('homepage.providers.subtitle')}
          </p>

          <div className="features-grid">
            <div className="feature-card animate-fade-in delay-100">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.providers.profile.title')}</h3>
              <p className="feature-description">
                {t('homepage.providers.profile.description')}
              </p>
            </div>

            <div className="feature-card animate-fade-in delay-200">
              <div className="feature-icon">
                <TrendingUp size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.providers.growth.title')}</h3>
              <p className="feature-description">
                {t('homepage.providers.growth.description')}
              </p>
            </div>

            <div className="feature-card animate-fade-in delay-300">
              <div className="feature-icon">
                <Award size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.providers.reputation.title')}</h3>
              <p className="feature-description">
                {t('homepage.providers.reputation.description')}
              </p>
            </div>

            <div className="feature-card animate-fade-in delay-400">
              <div className="feature-icon">
                <Clock size={24} />
              </div>
              <h3 className="feature-title">{t('homepage.providers.management.title')}</h3>
              <p className="feature-description">
                {t('homepage.providers.management.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-section" style={{ marginTop: 0, marginBottom: 0, paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)' }}>
        <div className="container">
          <div className="cta-content text-center">
            <h2 className="hero-title animate-fade-in-down">{t('homepage.cta.title')}</h2>
            <p className="hero-description animate-fade-in-up delay-200">
              {t('homepage.cta.description')}
            </p>

            {/* Boutons visibles UNIQUEMENT si NON connecté */}
            {!isAuthenticated && (
              <div className="cta-buttons animate-fade-in-up delay-300">
                <button
                  className="btn btn-primary btn-large"
                  onClick={() => openAuthModal('register')}
                >
                  {t('homepage.cta.register')}
                </button>
                <button
                  className="btn btn-primary btn-large"
                  onClick={() => openAuthModal('login')}
                >
                  {t('homepage.cta.login')}
                </button>
              </div>
            )}

            <div className="cta-features animate-fade-in-up delay-400">
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>{t('homepage.cta.features.free')}</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>{t('homepage.cta.features.verified')}</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>{t('homepage.cta.features.support')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default HomePage;