import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Home, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/common/SEO';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ReviewModal from '../components/modals/ReviewModal';

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
          setModalOpen(true);
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
      <div dir={direction} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SEO title={t('reviewRequest.loading')} noindex sameUrlForAllLangs />
        <LoadingSpinner size="large" text={t('reviewRequest.loading')} />
      </div>
    );
  }

  if (notFound) {
    return (
      <div dir={direction} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)' }}>
        <SEO title={t('reviewRequest.notFoundTitle')} noindex sameUrlForAllLangs />
        <div style={{ textAlign: 'center', maxWidth: '440px' }}>
          <AlertTriangle size={56} strokeWidth={1.5} color="var(--neutral-400)" style={{ marginBottom: 'var(--space-4)' }} />
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
            {t('reviewRequest.notFoundTitle')}
          </h1>
          <p style={{ color: 'var(--neutral-600)', marginBottom: 'var(--space-6)' }}>
            {t('reviewRequest.notFoundMessage')}
          </p>
          <Link to="/" className="btn btn-primary btn-large">
            <Home size={20} />
            <span>{t('reviewRequest.backHome')}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div dir={direction} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)' }}>
      <SEO title={t('reviewRequest.heading', { name: provider?.displayName })} noindex sameUrlForAllLangs />
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div style={{
          width: '72px',
          height: '72px',
          margin: '0 auto var(--space-4)',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Star size={32} color="white" fill="white" />
        </div>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
          {t('reviewRequest.heading', { name: provider?.displayName })}
        </h1>
        <p style={{ color: 'var(--neutral-600)', marginBottom: 'var(--space-6)' }}>
          {t('reviewRequest.subtitle')}
        </p>
        <button className="btn-primary btn-full" onClick={() => setModalOpen(true)}>
          {t('reviewRequest.cta')}
        </button>
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
