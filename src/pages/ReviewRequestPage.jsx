import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Home, AlertTriangle, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/common/SEO';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ReviewModal from '../components/modals/ReviewModal';
import '../styles/pages/review-request.css';

const resolveImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `https://homesherut-backend.fly.dev/${path.replace(/\\/g, '/').replace(/^\/+/, '')}`;
};

const ReviewRequestPage = () => {
  const { id } = useParams();
  const { apiCall } = useAuth();
  const { t, direction } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadProvider = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const response = await apiCall(`/providers/${id}/review-info`, 'GET');
        if (cancelled) return;

        if (response.success && response.data) {
          setProvider(response.data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadProvider();
    return () => { cancelled = true; };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="review-request-page" dir={direction}>
        <SEO title={t('reviewRequest.loading')} noindex sameUrlForAllLangs />
        <div className="review-request-hero review-request-hero--center">
          <LoadingSpinner size="large" text={t('reviewRequest.loading')} />
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="review-request-page" dir={direction}>
        <SEO title={t('reviewRequest.notFoundTitle')} noindex sameUrlForAllLangs />
        <div className="review-request-hero review-request-hero--center">
          <div className="review-request-card review-request-card--notfound">
            <AlertTriangle size={48} strokeWidth={1.5} className="review-request-notfound-icon" />
            <h1 className="review-request-heading">{t('reviewRequest.notFoundTitle')}</h1>
            <p className="review-request-subtitle">{t('reviewRequest.notFoundMessage')}</p>
            <Link to="/" className="review-request-cta review-request-cta--outline">
              <Home size={20} />
              <span>{t('reviewRequest.backHome')}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = resolveImageUrl(provider?.profileImage);
  const serviceLabel = provider?.serviceType
    ? t(`services.${provider.serviceType}.pageTitle`, '')
    : '';

  return (
    <div className="review-request-page" dir={direction}>
      <SEO title={t('reviewRequest.heading', { name: provider?.displayName })} noindex sameUrlForAllLangs />

      <div className="review-request-hero">
        <div className="review-request-blob review-request-blob--a" aria-hidden="true" />
        <div className="review-request-blob review-request-blob--b" aria-hidden="true" />

        <div className="review-request-card">
          <div className="review-request-avatar">
            {imageUrl ? (
              <img src={imageUrl} alt={provider?.displayName} className="review-request-avatar-img" />
            ) : (
              <div className="review-request-avatar-fallback">
                <User size={34} />
              </div>
            )}
            <span className="review-request-avatar-badge" aria-hidden="true">
              <Star size={14} fill="currentColor" />
            </span>
          </div>

          {serviceLabel && <p className="review-request-eyebrow">{serviceLabel}</p>}

          <h1 className="review-request-heading">
            {t('reviewRequest.heading', { name: provider?.displayName })}
          </h1>
          <p className="review-request-subtitle">{t('reviewRequest.subtitle')}</p>

          <div className="review-request-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={22} fill="currentColor" style={{ animationDelay: `${i * 60}ms` }} />
            ))}
          </div>

          <button type="button" className="review-request-cta" onClick={() => setModalOpen(true)}>
            <Star size={18} fill="currentColor" />
            <span>{t('reviewRequest.cta')}</span>
          </button>
        </div>
      </div>

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        providerId={provider?.id}
        providerName={provider?.displayName}
        serviceType={provider?.serviceType}
      />
    </div>
  );
};

export default ReviewRequestPage;
