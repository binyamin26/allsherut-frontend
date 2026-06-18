import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FilterBar from '../../components/filters/FilterBar';
import ReviewModal from '../../components/modals/ReviewModal';
import apiService from '../../services/api';
import ProviderCard from '../../components/cards/ProviderCard';
import { useLanguage } from '../../context/LanguageContext';
import React, { useState, useEffect } from 'react';

const MetalworkPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const [locationFilter, setLocationFilter] = useState({ city: 'ירושלים', neighborhood: '', fullLocation: '' });
  const [activeFilters, setActiveFilters] = useState({});
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  const [error, setError] = useState(null);

  const [reviewModal, setReviewModal] = useState({ isOpen: false, providerId: null, providerName: '' });

  const loadProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const searchParams = { service: 'metalwork', ...locationFilter, ...activeFilters, page: 1, limit: 100 };
      const cleanParams = Object.fromEntries(
        Object.entries(searchParams).filter(([, value]) => value !== '' && value !== null && value !== undefined)
      );
      const response = await apiService.searchProviders(cleanParams);
      if (response.success) {
        setProviders(response.data.providers || []);
        setResultsCount(response.data.pagination?.totalResults || response.data.providers?.length || 0);
      } else {
        setError(t('services.metalwork.loadError'));
        setProviders([]);
        setResultsCount(0);
      }
    } catch (err) {
      console.error('Erreur chargement providers:', err);
      setError(t('common.connectionError'));
      setProviders([]);
      setResultsCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadProviders, 300);
    return () => clearTimeout(timer);
  }, [activeFilters, locationFilter]);

  return (
    <div className="service-page metalwork-page">
      <SEO title="עבודות מתכת בישראל" description="מצאו בעל מקצוע לעבודות מתכת בישראל - ברזל, נירוסטה ושערים." canonicalPath="/services/metalwork" noindex={!loading && providers.length === 0} />
      <section className="service-header">
        <div className="container">
          <div className="service-title-section">
            <div className="service-hero-icon">
              <img src="/images/logo fer.jpg" alt="מסגרות" />
            </div>
            <h1 className="service-title">{t('services.metalwork.pageTitle')}</h1>
          </div>
        </div>
      </section>

      <FilterBar
        serviceType="metalwork"
        onFiltersChange={setActiveFilters}
        activeFilters={activeFilters}
        onLocationChange={setLocationFilter}
        selectedLocation={locationFilter}
      />

      <div className="results-section">
        <div className="results-container">
          <div className="results-summary">
            <div className="results-info">
              {loading ? (
                <div className="loading-text">{t('services.metalwork.searching')}</div>
              ) : error ? (
                <div className="error-text">{error}</div>
              ) : (
                <div className="results-count">
                  <strong>{resultsCount}</strong> {t('services.metalwork.found')}
                  {locationFilter.neighborhood && <span> {t('common.in')} <strong style={{color:'#dc2626',fontSize:'1.15em'}}>{locationFilter.neighborhood}</strong></span>}
                  {!locationFilter.neighborhood && locationFilter.city && <span> {t('common.in')} <strong style={{color:'#dc2626',fontSize:'1.15em'}}>{locationFilter.city}</strong></span>}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="providers-loading">
              <div className="loading-spinner"></div>
              <p>{t('services.metalwork.loading')}</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <h3>{t('common.dataLoadError')}</h3>
              <p>{error}</p>
              <button onClick={loadProviders} className="retry-btn">{t('common.tryAgain')}</button>
            </div>
          ) : providers.length > 0 ? (
            <div className="providers-grid">
              {providers.map(provider => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onOpenReviewModal={(id, name) => setReviewModal({ isOpen: true, providerId: id, providerName: name })}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>{t('services.metalwork.noResults')}</h3>
              {(locationFilter.city || locationFilter.neighborhood) && (
                <button
                  onClick={() => setLocationFilter({ city: '', neighborhood: '', fullLocation: '' })}
                  className="expand-search-btn"
                >
                  {t('common.searchAllCountry')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <ReviewModal
        isOpen={reviewModal.isOpen}
        onClose={() => setReviewModal({ isOpen: false, providerId: null, providerName: '' })}
        providerId={reviewModal.providerId}
        providerName={reviewModal.providerName}
        serviceType="metalwork"
        onReviewCreated={loadProviders}
      />
    </div>
  );
};

export default MetalworkPage;
