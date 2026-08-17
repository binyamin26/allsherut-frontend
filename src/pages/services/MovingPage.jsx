import { useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { useAuth } from '../../context/AuthContext';
import FilterBar from '../../components/filters/FilterBar';
import ReviewModal from '../../components/modals/ReviewModal';
import apiService from '../../services/api';
import React, { useState, useEffect } from 'react';
import ProviderCard from '../../components/cards/ProviderCard';
import { useLanguage } from '../../context/LanguageContext';
import ServiceBreadcrumb from '../../components/services/ServiceBreadcrumb';
import ServiceIntro from '../../components/services/ServiceIntro';
import ServiceHeaderSubtitle from '../../components/services/ServiceHeaderSubtitle';
import ServiceFaq from '../../components/services/ServiceFaq';
import { buildServicePageJsonLd } from '../../utils/seoJsonLd';
import { SERVICE_PAGE_META } from '../../data/servicePageMeta';
import { buildServicePath, serviceTypeToKey } from '../../utils/langUtils';
import { useLocationFilter } from '../../hooks/useLocationFilter';

const MovingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const [locationFilter, setLocationFilter] = useLocationFilter('moving');
  const [activeFilters, setActiveFilters] = useState({});
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  const [error, setError] = useState(null);

  const [reviewModal, setReviewModal] = useState({
    isOpen: false,
    providerId: null,
    providerName: ''
  });

  const loadProviders = async () => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = {
        service: 'moving',
        ...locationFilter,
        ...activeFilters,
        page: 1,
        limit: 100
      };

      const cleanParams = Object.fromEntries(
        Object.entries(searchParams).filter(([key, value]) =>
          value !== '' && value !== null && value !== undefined
        )
      );

      const response = await apiService.searchProviders(cleanParams);

      if (response.success) {
        setProviders(response.data.providers || []);
        setResultsCount(response.data.pagination?.totalResults || response.data.providers?.length || 0);
      } else {
        setError(t('services.moving.loadError'));
        setProviders([]);
        setResultsCount(0);
      }
    } catch (error) {
      console.error('Erreur chargement providers:', error);
      setError(t('common.connectionError'));
      setProviders([]);
      setResultsCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProviders();
    }, 300);
    return () => clearTimeout(timer);
  }, [activeFilters, locationFilter]);

  const handleFiltersChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const handleLocationChange = (newLocation) => {
    setLocationFilter(newLocation);
  };

  const handleViewProfile = (providerId) => {
    navigate(`/provider/${providerId}`);
  };

  const handleOpenReviewModal = (providerId, providerName) => {
    setReviewModal({ isOpen: true, providerId, providerName });
  };

  const handleCloseReviewModal = () => {
    setReviewModal({ isOpen: false, providerId: null, providerName: '' });
  };

  const handleReviewCreated = () => {
    loadProviders();
  };

  return (
    <div className="service-page moving-page">
      <SEO
  title={t('services.moving.pageTitle', SERVICE_PAGE_META.moving.title)}
  description={t('services.moving.desc', SERVICE_PAGE_META.moving.description)}
  canonicalPath={buildServicePath(serviceTypeToKey('moving'), 'he')}
  jsonLd={buildServicePageJsonLd({ serviceId: 'moving', name: t('services.moving.pageTitle', SERVICE_PAGE_META.moving.title), description: t('services.moving.desc', SERVICE_PAGE_META.moving.description), t })}
      />
      <ServiceBreadcrumb serviceId="moving" />
      <section className="service-header">
        <div className="container">
          <div className="service-title-section">
            <div className="service-hero-icon">
              <img src={SERVICE_PAGE_META.moving.heroImage}
                alt={SERVICE_PAGE_META.moving.heroAlt} />
            </div>
            <h1 className="service-title">{t('services.moving.pageTitle')}</h1>
          </div>
          <ServiceHeaderSubtitle serviceId="moving" />
        </div>
      </section>

      <FilterBar
        serviceType="moving"
        onFiltersChange={handleFiltersChange}
        activeFilters={activeFilters}
        onLocationChange={handleLocationChange}
        selectedLocation={locationFilter}
      />

      <div className="results-section">
        <div className="results-container">
          <div className="results-summary">
            <div className="results-info">
              {loading ? (
                <div className="loading-text">{t('services.moving.searching')}</div>
              ) : error ? (
                <div className="error-text">{error}</div>
              ) : (
                <div className="results-count">
                  <strong>{resultsCount}</strong> {t('services.moving.found')}
                  {locationFilter.neighborhood && <span> {t('common.in')} <strong style={{color:'#dc2626',fontSize:'1.15em'}}>{locationFilter.neighborhood}</strong></span>}
                  {!locationFilter.neighborhood && locationFilter.city && <span> {t('common.in')} <strong style={{color:'#dc2626',fontSize:'1.15em'}}>{locationFilter.city}</strong></span>}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="providers-loading">
              <div className="loading-spinner"></div>
              <p>{t('services.moving.loading')}</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <h3>{t('common.dataLoadError')}</h3>
              <p>{error}</p>
              <button onClick={loadProviders} className="retry-btn">
                {t('common.tryAgain')}
              </button>
            </div>
          ) : providers.length > 0 ? (
            <div className="providers-grid">
              {providers.map(provider => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onOpenReviewModal={handleOpenReviewModal}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>{t('services.moving.noResults')}</h3>
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

      <ServiceIntro serviceId="moving" />

      <ServiceFaq serviceId="moving" />

      <ReviewModal
        isOpen={reviewModal.isOpen}
        onClose={handleCloseReviewModal}
        providerId={reviewModal.providerId}
        providerName={reviewModal.providerName}
        serviceType="moving"
        onReviewCreated={handleReviewCreated}
      />
    </div>
  );
};

export default MovingPage;

