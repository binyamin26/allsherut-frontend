import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FilterBar from '../../components/filters/FilterBar';
import ReviewModal from '../../components/modals/ReviewModal';
import apiService from '../../services/api';
import React, { useState, useEffect } from 'react';
import ProviderCard from '../../components/cards/ProviderCard';
import { useLanguage } from '../../context/LanguageContext';

const EventDecorationPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const [locationFilter, setLocationFilter] = useState({ city: '', neighborhood: '', fullLocation: '' });
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
      const searchParams = { service: 'event_decoration', ...locationFilter, ...activeFilters, page: 1, limit: 20 };
      const cleanParams = Object.fromEntries(Object.entries(searchParams).filter(([, v]) => v !== '' && v !== null && v !== undefined));
      const response = await apiService.searchProviders(cleanParams);
      if (response.success) {
        setProviders(response.data.providers || []);
        setResultsCount(response.data.pagination?.totalResults || response.data.providers?.length || 0);
      } else {
        setError(t('services.event_decoration.loadError'));
        setProviders([]);
        setResultsCount(0);
      }
    } catch {
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
    <div className="service-page event-decoration-page">
      <section className="service-header">
        <div className="container">
          <section className="service-header">
            <div className="container">
              <div className="service-title-section">
                <div className="service-hero-icon">
                  <img src="/images/fetes1.jpg" alt="Event Decoration" />
                </div>
                <h1 className="service-title">{t('services.event_decoration.pageTitle')}</h1>
              </div>
            </div>
          </section>
        </div>
      </section>

      <FilterBar
        serviceType="event_decoration"
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
                <div className="loading-text">{t('services.event_decoration.searching')}</div>
              ) : error ? (
                <div className="error-text">{error}</div>
              ) : (
                <div className="results-count">
                  <strong>{resultsCount}</strong> {t('services.event_decoration.found')}
                  {locationFilter.neighborhood && <span> {t('common.in')} {locationFilter.neighborhood}</span>}
                  {!locationFilter.neighborhood && locationFilter.city && <span> {t('common.in')} {locationFilter.city}</span>}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="providers-loading">
              <div className="loading-spinner"></div>
              <p>{t('services.event_decoration.loading')}</p>
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
                <ProviderCard key={provider.id} provider={provider} onOpenReviewModal={(id, name) => setReviewModal({ isOpen: true, providerId: id, providerName: name })} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>{t('services.event_decoration.noResults')}</h3>
              {(locationFilter.city || locationFilter.neighborhood) && (
                <button onClick={() => setLocationFilter({ city: '', neighborhood: '', fullLocation: '' })} className="expand-search-btn">
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
        onReviewCreated={loadProviders}
      />
    </div>
  );
};

export default EventDecorationPage;
