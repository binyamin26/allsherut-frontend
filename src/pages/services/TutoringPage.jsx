import { useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { useLocationFilter } from '../../hooks/useLocationFilter';
import { BookOpen, CheckCircle, Star, Phone, GraduationCap, Users, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import FilterBar from '../../components/filters/FilterBar';
import ReviewModal from '../../components/modals/ReviewModal';
import apiService from '../../services/api';
import ProviderCard from '../../components/cards/ProviderCard';
import { useSpecialtyFilter } from '../../hooks/useSpecialtyFilter';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ServiceBreadcrumb from '../../components/services/ServiceBreadcrumb';
import ServiceIntro from '../../components/services/ServiceIntro';
import ServiceHeaderSubtitle from '../../components/services/ServiceHeaderSubtitle';
import ServiceFaq from '../../components/services/ServiceFaq';
import { buildServicePageJsonLd } from '../../utils/seoJsonLd';
import { SERVICE_PAGE_META } from '../../data/servicePageMeta';
import { buildServicePath, serviceTypeToKey } from '../../utils/langUtils';

const TutoringPageClean = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  const [locationFilter, setLocationFilter] = useLocationFilter('tutoring');
  const [activeFilters, setActiveFilters] = useState({});
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  const [error, setError] = useState(null);
  const { filteredProviders, specialty } = useSpecialtyFilter(providers);

  // État pour la modale d’avis
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
        service: 'tutoring',
        ...locationFilter,
        ...activeFilters,
        page: 1,
        limit: 100
      };

      // Nettoyer les paramètres vides
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
       setError(t('services.tutoring.loadError'));
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

  // Fonction pour rafraîchir après création d’avis
  const handleReviewCreated = () => {
    loadProviders();
  };

  const getTeachingModeIcon = (mode) => {
    switch (mode) {
      case 'En présentiel uniquement': return '🏠';
      case 'En ligne uniquement': return '💻';
      case 'Les deux': return '📍';
      default: return '📖';
    }
  };

  return (
    <div className="service-page tutoring-page">
      <SEO
  title={t('services.tutoring.pageTitle', SERVICE_PAGE_META.tutoring.title)}
  description={t('services.tutoring.desc', SERVICE_PAGE_META.tutoring.description)}
  canonicalPath={buildServicePath(serviceTypeToKey('tutoring'), 'he')}
  jsonLd={buildServicePageJsonLd({ serviceId: 'tutoring', name: t('services.tutoring.pageTitle', SERVICE_PAGE_META.tutoring.title), description: t('services.tutoring.desc', SERVICE_PAGE_META.tutoring.description), t })}
      />
      <ServiceBreadcrumb serviceId="tutoring" />
      <section className="service-header">
        <div className="container">
          <div className="service-title-section">
            <div className="service-hero-icon">
              <img
                src={SERVICE_PAGE_META.tutoring.heroImage}
                alt={SERVICE_PAGE_META.tutoring.heroAlt}
              />
            </div>
            <h1 className="service-title">{t('services.tutoring.pageTitle')}</h1>
          </div>
          <ServiceHeaderSubtitle serviceId="tutoring" />
        </div>
      </section>

      <FilterBar 
        serviceType="tutoring"
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
             <div className="loading-text">{t('services.tutoring.searching')}</div>
              ) : error ? (
                <div className="error-text">{error}</div>
              ) : (
                <div className="results-count">
              <strong>{specialty ? filteredProviders.length : resultsCount}</strong> {t('services.tutoring.found')}
                  {locationFilter.neighborhood && <span> {t('common.in')} <strong style={{color:'#dc2626',fontSize:'1.15em'}}>{locationFilter.neighborhood}</strong></span>}
  {!locationFilter.neighborhood && locationFilter.city && <span> {t('common.in')} <strong style={{color:'#dc2626',fontSize:'1.15em'}}>{locationFilter.city}</strong></span>}
</div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="providers-loading">
              <div className="loading-spinner"></div>
          <p>{t('services.tutoring.loading')}</p>
            </div>
          ) : error ? (
            <div className="error-state">
           <h3>{t('common.dataLoadError')}</h3>
              <p>{error}</p>
            <button onClick={loadProviders} className="retry-btn">
  {t('common.tryAgain')}
</button>
            </div>
          ) : filteredProviders.length > 0 ? (
            <div className="providers-grid">
             {filteredProviders.map(provider => (
  <ProviderCard 
    key={provider.id}
    provider={provider}
    onOpenReviewModal={handleOpenReviewModal}
  />
))}
            </div>
          ) : (
            <div className="no-results">
            <h3>{t('services.tutoring.noResults')}</h3>
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

      <ServiceIntro serviceId="tutoring" />

      <ServiceFaq serviceId="tutoring" />

      <ReviewModal 
        isOpen={reviewModal.isOpen}
        onClose={handleCloseReviewModal}
        providerId={reviewModal.providerId}
        providerName={reviewModal.providerName}
        serviceType="tutoring"
        onReviewCreated={handleReviewCreated}
      />
    </div>
  );
};

export default TutoringPageClean;
