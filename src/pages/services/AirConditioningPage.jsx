import { useNavigate } from 'react-router-dom';
import { Wind, CheckCircle, Star, Phone, Shield, Clock, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import FilterBar from '../../components/filters/FilterBar';
import ReviewModal from '../../components/modals/ReviewModal';
import apiService from '../../services/api';
import React, { useState, useEffect } from 'react';
import ProviderCard from '../../components/cards/ProviderCard';
import { useLanguage } from '../../context/LanguageContext';

const AirConditioningPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  const [locationFilter, setLocationFilter] = useState({
    city: 'ירושלים',
    neighborhood: '',
    fullLocation: ''
  });
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
        service: 'air_conditioning',
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
   setError(t('services.air_conditioning.loadError'));
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

  const handleReviewCreated = () => {
    loadProviders();
  };


  return (
    <div className="service-page air-conditioning-page">
      <section className="service-header">
        <div className="container">
          <div className="service-title-section">
            <div className="service-hero-icon">
              <img
                src="/images/logo clim.jpg"
                alt="Climatisation"
              />
            </div>
            <h1 className="service-title">{t('services.air_conditioning.pageTitle')}</h1>
          </div>
        </div>
      </section>

      <FilterBar 
        serviceType="air_conditioning"
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
            <div className="loading-text">{t('services.air_conditioning.searching')}</div>
              ) : error ? (
                <div className="error-text">{error}</div>
              ) : (
               <div className="results-count">
  <strong>{resultsCount}</strong> {t('services.air_conditioning.found')}
  {locationFilter.neighborhood && <span> {t('common.in')} {locationFilter.neighborhood}</span>}
  {!locationFilter.neighborhood && locationFilter.city && <span> {t('common.in')} {locationFilter.city}</span>}
</div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="providers-loading">
              <div className="loading-spinner"></div>
           <p>{t('services.air_conditioning.loading')}</p>
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
  <h3>{t('services.air_conditioning.noResults')}</h3>
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
        onClose={handleCloseReviewModal}
        providerId={reviewModal.providerId}
        providerName={reviewModal.providerName}
        serviceType="air_conditioning"
        onReviewCreated={handleReviewCreated}
      />
    </div>
  );
};

export default AirConditioningPage;
