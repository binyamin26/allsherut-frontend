import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  LayoutDashboard, 
  Edit3, 
  Eye, 
  Star, 
  Mail, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Users,
  Search,
  MessageSquare
} from 'lucide-react';
import AuthModal from '../components/auth/AuthModal';
import { useLanguage } from '../context/LanguageContext';
import Reveal from '../components/common/Reveal';

const HowItWorksPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { t, language } = useLanguage();

  return (
    <div className="how-it-works-page" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <div className="container">
        
        {/* Hero Section */}
        <section className="hero-section">
          <Reveal as="h1" onLoad delay={0} className="page-title">{t('howItWorks.title')}</Reveal>
          <Reveal as="p" onLoad delay={100} className="page-subtitle">
            {t('howItWorks.subtitle')}
          </Reveal>
        </section>

        {/* Provider Section */}
        <section id="providers" className="info-section provider-section">
          <div className="section-header">
            <Reveal as="div">
              <Users size={40} className="section-icon" />
              <h2 className="section-title">{t('howItWorks.provider.title')}</h2>
              <p className="section-description">
                {t('howItWorks.provider.description')}
              </p>
            </Reveal>
          </div>

          <div className="features-grid">

            {/* Feature 1: Registration */}
            <Reveal as="div" delay={0} className="feature-card">
              <div className="feature-icon">
                <UserPlus size={32} />
              </div>
              <h3 className="feature-title">{t('howItWorks.provider.registration.title')}</h3>
              <p className="feature-text">
                {t('howItWorks.provider.registration.text')}
              </p>
              <ul className="feature-list">
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.provider.registration.item1')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.provider.registration.item2')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.provider.registration.item3')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.provider.registration.item4')}</span>
                </li>
              </ul>
            </Reveal>

            {/* Feature 2: Dashboard */}
            <Reveal as="div" delay={100} className="feature-card">
              <div className="feature-icon">
                <LayoutDashboard size={32} />
              </div>
              <h3 className="feature-title">{t('howItWorks.provider.dashboard.title')}</h3>
              <p className="feature-text">
                {t('howItWorks.provider.dashboard.text')}
              </p>
              <ul className="feature-list">
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.provider.dashboard.item1')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.provider.dashboard.item2')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.provider.dashboard.item3')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.provider.dashboard.item4')}</span>
                </li>
              </ul>
            </Reveal>

            {/* Feature 3: Profile Management */}
            <Reveal as="div" delay={200} className="feature-card">
              <div className="feature-icon">
                <Edit3 size={32} />
              </div>
              <h3 className="feature-title">{t('howItWorks.provider.profile.title')}</h3>
              <p className="feature-text">
                {t('howItWorks.provider.profile.text')}
              </p>
              <ul className="feature-list">
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.provider.profile.item1')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.provider.profile.item2')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.provider.profile.item3')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.provider.profile.item4')}</span>
                </li>
              </ul>
            </Reveal>

          </div>

        </section>

        {/* Client Section */}
        <section className="info-section client-section">
          <div className="section-header">
            <Reveal as="div">
              <Search size={40} className="section-icon" />
              <h2 className="section-title">{t('howItWorks.client.title')}</h2>
              <p className="section-description">
                {t('howItWorks.client.description')}
              </p>
            </Reveal>
          </div>

          <div className="features-grid">

            {/* Feature 1: Free Access */}
            <Reveal as="div" delay={0} className="feature-card">
              <div className="feature-icon">
                <Eye size={32} />
              </div>
              <h3 className="feature-title">{t('howItWorks.client.freeAccess.title')}</h3>
              <p className="feature-text">
                {t('howItWorks.client.freeAccess.text')}
              </p>
              <ul className="feature-list">
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.client.freeAccess.item1')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.client.freeAccess.item2')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.client.freeAccess.item3')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.client.freeAccess.item4')}</span>
                </li>
              </ul>
            </Reveal>

            {/* Feature 2: Reviews */}
            <Reveal as="div" delay={100} className="feature-card">
              <div className="feature-icon">
                <Star size={32} />
              </div>
              <h3 className="feature-title">{t('howItWorks.client.reviews.title')}</h3>
              <p className="feature-text">
                {t('howItWorks.client.reviews.text')}
              </p>
              <ul className="feature-list">
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.client.reviews.item1')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.client.reviews.item2')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.client.reviews.item3')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.client.reviews.item4')}</span>
                </li>
              </ul>
            </Reveal>

            {/* Feature 3: Email Verification */}
            <Reveal as="div" delay={200} className="feature-card">
              <div className="feature-icon">
                <Mail size={32} />
              </div>
              <h3 className="feature-title">{t('howItWorks.client.emailVerification.title')}</h3>
              <p className="feature-text">
                {t('howItWorks.client.emailVerification.text')}
              </p>
              <ul className="feature-list">
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.client.emailVerification.item1')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.client.emailVerification.item2')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.client.emailVerification.item3')}</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>{t('howItWorks.client.emailVerification.item4')}</span>
                </li>
              </ul>
            </Reveal>

          </div>

          <Reveal as="div" className="info-box">
            <Shield size={32} />
            <div>
              <h3>{t('howItWorks.qualityAssurance.title')}</h3>
              <p>
                {t('howItWorks.qualityAssurance.text')}
              </p>
            </div>
          </Reveal>

        </section>

        {/* Final CTA Section */}
        <section className="final-cta-section">
          <Reveal as="div" className="cta-content">
            <MessageSquare size={48} />
            <h2>{t('howItWorks.cta.title')}</h2>
            <p>
              {t('howItWorks.cta.subtitle')}
            </p>
            <div className="cta-buttons">
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn btn-primary btn-large"
              >
                {t('howItWorks.cta.providerButton')}
              </button>
              <Link to="/#services" className="btn btn-outline btn-large">
                {t('howItWorks.cta.clientButton')}
              </Link>
            </div>
          </Reveal>
        </section>

      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="register"
      />
    </div>
  );
};

export default HowItWorksPage;