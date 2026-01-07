import { useNavigate } from 'react-router-dom';
import { Hammer, CheckCircle, Star, Phone, Shield, Clock, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import FilterBar from '../../components/filters/FilterBar';
import ReviewModal from '../../components/modals/ReviewModal';
import apiService from '../../services/api';
import React, { useState, useEffect, useRef } from 'react';
import ProviderCard from '../../components/cards/ProviderCard';
import { useLanguage } from '../../context/LanguageContext';

const CarpentryPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  const [locationFilter, setLocationFilter] = useState({
    city: '',
    neighborhood: '',
    fullLocation: ''
  });
  const [activeFilters, setActiveFilters] = useState({});
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  const [error, setError] = useState(null);
  const isFirstLoad = useRef(true);

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
        service: 'carpentry',
        ...locationFilter,
        ...activeFilters,
        page: 1,
        limit: 20
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
       setError(t('services.carpentry.loadError'));
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
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      loadProviders();
      return;
    }

    const timer = setTimeout(() => {
      loadProviders();
    }, 500);

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
    <div className="service-page carpentry-page">
      <section className="service-header">
        <div className="container">
         <div className="service-title-section" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <h1 className="service-title" style={{ textAlign: 'center', margin: '0 auto' }}>{t('services.carpentry.pageTitle')}</h1>
<div style={{ 
  position: 'absolute', 
  right: '0',
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  overflow: 'hidden',
  background: '#f0f0f0'
}}>
  <img 
    src="/images/logo menuisier.png" 
    alt="menuiserie" 
    style={{ 
      width: '100%', 
      height: '100%',
      objectFit: 'cover',
        transform: 'scale(1.3)'
    }}
  />
</div>
</div>
        </div>
      </section>

      <FilterBar 
        serviceType="carpentry"
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
            <div className="loading-text">{t('services.carpentry.searching')}</div>
              ) : error ? (
                <div className="error-text">{error}</div>
              ) : (
                <div className="results-count">
               <strong>{resultsCount}</strong> {t('services.carpentry.found')}
                 {locationFilter.neighborhood && <span> {t('common.in')} {locationFilter.neighborhood}</span>}
  {!locationFilter.neighborhood && locationFilter.city && <span> {t('common.in')} {locationFilter.city}</span>}
</div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="providers-loading">
              <div className="loading-spinner"></div>
            <p>{t('services.carpentry.loading')}</p>
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
            <h3>{t('services.carpentry.noResults')}</h3>
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
        serviceType="carpentry"
        onReviewCreated={handleReviewCreated}
      />
    </div>
  );
};

export default CarpentryPage;