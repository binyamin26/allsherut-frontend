import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/common/SEO';

const NotFoundPage = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'he';

  return (
    <div className="not-found-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEO title={t('notFound.title')} description={t('notFound.message')} noindex sameUrlForAllLangs />
      <div className="container">
        <div className="not-found-content">
          {/* Icône d'erreur */}
          <div className="not-found-icon">
            <AlertTriangle size={80} strokeWidth={1.5} />
          </div>

          {/* Code 404 */}
          <h1 className="not-found-code">404</h1>

          {/* Message */}
          <h2 className="not-found-title">{t('notFound.title')}</h2>
          <p className="not-found-message">{t('notFound.message')}</p>

          {/* Boutons d'action */}
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-large">
              <Home size={20} />
              <span>{t('notFound.backHome')}</span>
            </Link>
            <Link to="/#services" className="btn btn-secondary btn-large">
              <Search size={20} />
              <span>{t('notFound.browseServices')}</span>
            </Link>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;