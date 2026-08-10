import { useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { useLocationFilter } from '../../hooks/useLocationFilter';
import { Home, CheckCircle, Star, Phone, Sparkles, Clock, Shield, MessageCircle } from 'lucide-react';
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

const CleaningPageClean = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  const [locationFilter, setLocationFilter] = useLocationFilter('cleaning');
  const [activeFilters, setActiveFilters] = useState({});
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  const [error, setError] = useState(null);
  
  // ֳ‰tat pour modal d'avis
  const [reviewModal, setReviewModal] = useState({
    isOpen: false,
    providerId: null,
    providerName: ''
  });

  // Fonction pour charger les prestataires depuis l'API
  const loadProviders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const searchParams = {
        service: 'cleaning',
        ...locationFilter,
        ...activeFilters,
        page: 1,
        limit: 100
      };

      // Nettoyer les paramֳ¨tres vides
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
     setError(t('services.cleaning.loadError'));
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

  // Charger les prestataires au montage et quand les filtres changent
// Ajouter en haut avec les autres useState 

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

  // Gestion modal d'avis
  const handleOpenReviewModal = (providerId, providerName) => {
    setReviewModal({
      isOpen: true,
      providerId,
      providerName
    });
  };

  const handleCloseReviewModal = () => {
    setReviewModal({
      isOpen: false,
      providerId: null,
      providerName: ''
    });
  };

  // Fonction pour rafraֳ®chir aprֳ¨s crֳ©ation d'avis
  const handleReviewCreated = () => {
    loadProviders();
  };

  return (
    <div className="service-page cleaning-page">
      <SEO
  title={SERVICE_PAGE_META.cleaning.title}
  description={SERVICE_PAGE_META.cleaning.description}
  canonicalPath={buildServicePath(serviceTypeToKey('cleaning'), 'he')}
  jsonLd={buildServicePageJsonLd({ serviceId: 'cleaning', name: SERVICE_PAGE_META.cleaning.title, description: SERVICE_PAGE_META.cleaning.description, t })}
      />
      <ServiceBreadcrumb serviceId="cleaning" />
      <section className="service-header">
        <div className="container">
          <div className="service-title-section">
            <div className="service-hero-icon">
              <img
                src={SERVICE_PAGE_META.cleaning.heroImage}
                alt={SERVICE_PAGE_META.cleaning.heroAlt}
              />
            </div>
            <h1 className="service-title">{t('services.cleaning.pageTitle')}</h1>
          </div>
          <ServiceHeaderSubtitle serviceId="cleaning" />
        </div>
      </section>

      <FilterBar 
        serviceType="cleaning"
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
           <div className="loading-text">{t('services.cleaning.searching')}</div>
              ) : error ? (
                <div className="error-text">{error}</div>
              ) : (
                <div className="results-count">
                  <strong>{resultsCount}</strong> {t('services.cleaning.found')}
                  {locationFilter.neighborhood && <span> {t('common.in')} <strong style={{color:'#dc2626',fontSize:'1.15em'}}>{locationFilter.neighborhood}</strong></span>}
  {!locationFilter.neighborhood && locationFilter.city && <span> {t('common.in')} <strong style={{color:'#dc2626',fontSize:'1.15em'}}>{locationFilter.city}</strong></span>}
</div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="providers-loading">
              <div className="loading-spinner"></div>
            <p>{t('services.cleaning.loading')}</p>
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
             <h3>{t('services.cleaning.noResults')}</h3>
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

      <ServiceIntro serviceId="cleaning" />

      <ServiceFaq serviceId="cleaning" />

      <ReviewModal 
        isOpen={reviewModal.isOpen}
        onClose={handleCloseReviewModal}
        providerId={reviewModal.providerId}
        providerName={reviewModal.providerName}
        serviceType="cleaning"
        onReviewCreated={handleReviewCreated}
      />
    </div>
  );
};

export default CleaningPageClean;
