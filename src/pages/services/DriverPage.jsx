import FilterBar from '../../components/filters/FilterBar';
import SEO from '../../components/common/SEO';
import { useLocationFilter } from '../../hooks/useLocationFilter';
import ReviewModal from '../../components/modals/ReviewModal';
import apiService from '../../services/api';
import ProviderCard from '../../components/cards/ProviderCard';
import { useSpecialtyFilter } from '../../hooks/useSpecialtyFilter';
import { useLanguage } from '../../context/LanguageContext';
import ServiceBreadcrumb from '../../components/services/ServiceBreadcrumb';
import ServiceIntro from '../../components/services/ServiceIntro';
import ServiceHeaderSubtitle from '../../components/services/ServiceHeaderSubtitle';
import ServiceFaq from '../../components/services/ServiceFaq';
import { buildServicePageJsonLd } from '../../utils/seoJsonLd';
import { SERVICE_PAGE_META } from '../../data/servicePageMeta';
import { buildServicePath, serviceTypeToKey } from '../../utils/langUtils';
import React, { useState, useEffect } from 'react';

const DriverPage = () => {
  const { t } = useLanguage();

  const [locationFilter, setLocationFilter] = useLocationFilter('driver');
  const [activeFilters, setActiveFilters] = useState({});
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  const [error, setError] = useState(null);
  const { filteredProviders, specialty } = useSpecialtyFilter(providers);

  const [reviewModal, setReviewModal] = useState({ isOpen: false, providerId: null, providerName: '' });

  const loadProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const searchParams = { service: 'driver', ...locationFilter, ...activeFilters, page: 1, limit: 100 };
      const cleanParams = Object.fromEntries(
        Object.entries(searchParams).filter(([, value]) => value !== '' && value !== null && value !== undefined)
      );
      const response = await apiService.searchProviders(cleanParams);
      if (response.success) {
        setProviders(response.data.providers || []);
        setResultsCount(response.data.pagination?.totalResults || response.data.providers?.length || 0);
      } else {
        setError(t('services.driver.loadError'));
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
    <div className="service-page driver-page">
      <SEO
  title={t('services.driver.pageTitle', SERVICE_PAGE_META.driver.title)}
  description={t('services.driver.desc', SERVICE_PAGE_META.driver.description)}
  canonicalPath={buildServicePath(serviceTypeToKey('driver'), 'he')}
  jsonLd={buildServicePageJsonLd({ serviceId: 'driver', name: t('services.driver.pageTitle', SERVICE_PAGE_META.driver.title), description: t('services.driver.desc', SERVICE_PAGE_META.driver.description), t })}
      />
      <ServiceBreadcrumb serviceId="driver" />
      <section className="service-header">
        <div className="container">
          <div className="service-title-section">
            <div className="service-hero-icon">
              <img src={SERVICE_PAGE_META.driver.heroImage}
                alt={SERVICE_PAGE_META.driver.heroAlt} />
            </div>
            <h1 className="service-title">{t('services.driver.pageTitle')}</h1>
          </div>
          <ServiceHeaderSubtitle serviceId="driver" />
        </div>
      </section>

      <FilterBar
        serviceType="driver"
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
                <div className="loading-text">{t('services.driver.searching')}</div>
              ) : error ? (
                <div className="error-text">{error}</div>
              ) : (
                <div className="results-count">
                  <strong>{specialty ? filteredProviders.length : resultsCount}</strong> {t('services.driver.found')}
                  {locationFilter.neighborhood && <span> {t('common.in')} <strong style={{color:'#dc2626',fontSize:'1.15em'}}>{locationFilter.neighborhood}</strong></span>}
                  {!locationFilter.neighborhood && locationFilter.city && <span> {t('common.in')} <strong style={{color:'#dc2626',fontSize:'1.15em'}}>{locationFilter.city}</strong></span>}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="providers-loading">
              <div className="loading-spinner"></div>
              <p>{t('services.driver.loading')}</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <h3>{t('common.dataLoadError')}</h3>
              <p>{error}</p>
              <button onClick={loadProviders} className="retry-btn">{t('common.tryAgain')}</button>
            </div>
          ) : filteredProviders.length > 0 ? (
            <div className="providers-grid">
              {filteredProviders.map(provider => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onOpenReviewModal={(id, name) => setReviewModal({ isOpen: true, providerId: id, providerName: name })}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>{t('services.driver.noResults')}</h3>
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

      <ServiceIntro serviceId="driver" />

      <ServiceFaq serviceId="driver" />

      <ReviewModal
        isOpen={reviewModal.isOpen}
        onClose={() => setReviewModal({ isOpen: false, providerId: null, providerName: '' })}
        providerId={reviewModal.providerId}
        providerName={reviewModal.providerName}
        serviceType="driver"
        onReviewCreated={loadProviders}
      />
    </div>
  );
};

export default DriverPage;
