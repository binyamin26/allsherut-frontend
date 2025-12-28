import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AuthModal from '../components/auth/AuthModal';
import ReviewModal from '../components/modals/ReviewModal';
import apiService from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { translateValue, translateAndJoin, translateArrayFromMultipleCategories } from '../utils/translationMapper';
import { 
  Star, MapPin, Clock, Phone, Mail, CheckCircle, Award, 
  Calendar, MessageCircle, ThumbsUp, User, Shield, Heart,
  ChevronLeft, Send, AlertCircle
} from 'lucide-react';

const ProviderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
 // Fonction détection hébreu
  const isHebrew = (text) => {
    if (!text) return false;
    const hebrewRegex = /[\u0590-\u05FF]/;
    return hebrewRegex.test(text);
  };

  // États
  const [provider, setProvider] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  

  // État pour ReviewModal
  const [reviewModal, setReviewModal] = useState({
    isOpen: false,
    providerId: null,
    providerName: ''
  });

  // Configuration paiement par service
  const getPaymentConfig = (serviceKey) => {
    const clientPayingServices = ['babysitting', 'eldercare'];
    
    return {
      showPhone: !clientPayingServices.includes(serviceKey),
      contactMethod: clientPayingServices.includes(serviceKey) ? 'platform' : 'direct',
      payingRole: clientPayingServices.includes(serviceKey) ? 'client' : 'provider'
    };
  };

  const getServiceIcon = (serviceType) => {
  const icons = {
    babysitting: '/images/logo bébé.png',
    cleaning: '/images/logo nikayon.png',
    gardening: '/images/logo jardinage.png',
    petcare: '/images/logo chien.png',
    tutoring: '/images/logo cours particulier.png',
    eldercare: '/images/logo kachich.png',
    laundry: '/images/logo kvissa.png',
    electrician: '/images/logo electricien.png',
    plumbing: '/images/logo plomberie.png',
    air_conditioning: '/images/logo clim.png',
    gas_technician: '/images/logo gaz.png',
    drywall: '/images/logo placo.png',
    carpentry: '/images/logo menuisier.png',
    property_management: '/images/logo nihoul dirot.png',
    home_organization: '/images/logo rangement.png',
    painting: '/images/logo peinture.png',
    private_chef: '/images/logo chef.png',
    event_entertainment: '/images/logo event.png',
    waterproofing: '/images/logo itoum.png',
    contractor: '/images/logo kablan.png',
    aluminum: '/images/logo aluminium.png',
    glass_works: '/images/logo verre.png',
    locksmith: '/images/logo serrure.png'
  };
  return icons[serviceType] || '/images/logo-default.png';
};

  // Couleurs des services
  const getServiceColors = (serviceType) => {
    const colors = {
      babysitting: 'from-pink-500 to-rose-600',
      cleaning: 'from-cyan-500 to-blue-600',
      gardening: 'from-green-500 to-emerald-600',
      petcare: 'from-orange-500 to-amber-600',
      tutoring: 'from-blue-500 to-indigo-600',
      eldercare: 'from-purple-500 to-violet-600'
    };
    return colors[serviceType] || 'from-gray-500 to-gray-600';
  };

  // Charger les données du provider
  useEffect(() => {
    if (id) {
      loadProviderData();
    }
  }, [id]);

 const loadProviderData = async () => {
  console.log('🔍 Provider ID:', id);
  
  try {
    setLoading(true);
    console.log('🔍 Loading provider with ID:', id);
    
    const providerResponse = await apiService.getProvider(id);
    if (providerResponse.success) {
      console.log('✅ Provider data:', providerResponse.data);
console.log('📸 FULL RESPONSE DATA:', providerResponse.data); // ← AJOUTE CETTE LIGNE
  console.log('📸 MEDIA OBJECT:', providerResponse.data.media);
      setProvider(providerResponse.data);
        loadReviews();
      } else {
        console.error('❌ Provider API failed:', providerResponse);
        setError('ספק השירות לא נמצא');
      }
      
    } catch (error) {
      console.error('❌ Erreur chargement provider:', error);
      setError('שגיאה בטעינת פרטי הספק');
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      setReviewsLoading(true);
      
      // Extraire l'ID numérique pour les reviews
      let reviewsId = id;
      if (typeof id === 'string' && id.includes('-')) {
        reviewsId = id.split('-')[1];
      }
      
      console.log('🔍 Loading reviews for provider ID:', reviewsId);
      
      const reviewsResponse = await apiService.getProviderReviews(reviewsId);
      if (reviewsResponse.success) {
        console.log('✅ Reviews loaded successfully:', reviewsResponse.reviews?.length);
        setReviews(reviewsResponse.reviews || []);
      } else {
        console.error('❌ Erreur chargement avis:', reviewsResponse);
        setReviews([]);
      }
    } catch (error) {
      console.error('❌ Erreur chargement avis:', error);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

const handleContact = () => {
  const paymentConfig = getPaymentConfig(provider.serviceType);
  
  // ✅ Si le numéro est affiché, appeler directement sans vérifier l'authentification
  if (paymentConfig.showPhone && provider.phone) {
    window.location.href = `tel:${provider.phone}`;
    return;
  }

  // Logique existante pour les autres cas
  if (!isAuthenticated) {
    setShowAuthModal(true);
    return;
  }

  if (paymentConfig.contactMethod === 'direct') {
    setShowContactModal(true);
  } else {
    if (user?.role === 'client') {
      if (user?.contactCredits?.remaining > 0 || user?.isPremium) {
        setShowContactModal(true);
      } else {
        navigate('/premium?reason=contact');
      }
    } else {
      setShowContactModal(true);
    }
  }
};

  // Gestion ReviewModal
  const handleOpenReviewModal = () => {
    setReviewModal({
      isOpen: true,
      providerId: id,
      providerName: provider?.name || ''
    });
  };

  const handleCloseReviewModal = () => {
    setReviewModal({
      isOpen: false,
      providerId: null,
      providerName: ''
    });
    loadReviews(); // Recharger les avis après création
  };

  // Rendu des détails de service basés sur les vraies données
 const renderServiceDetails = () => {
  if (!provider || !provider.serviceDetails) return null;

  const details = provider.serviceDetails;

  return (
    <div className="service-details-section">
     <h3 className="details-title">{t('provider.details.title')}</h3>
      
      <div className="details-grid">
        {/* === CHAMPS COMPACTS D'ABORD === */}
        
        {/* Taux horaire */}
        {(provider.hourlyRate || details.hourlyRate || details.rate) && (
          <div className="detail-item">
            <strong>{t('provider.details.hourlyRate')}:</strong>
            <span className="price-highlight">₪{provider.hourlyRate || details.hourlyRate || details.rate}/שעה</span>
          </div>
        )}
        
        {/* Expérience */}
        {(provider.experienceYears || details.experience || details.experienceYears) && (
          <div className="detail-item">
           <strong>{t('provider.details.experience')}:</strong>
            <span>{provider.experienceYears || details.experience || details.experienceYears} {t('provider.details.years')}</span>
          </div>
        )}

        {/* Titre/spécialisation */}
        {provider.title && (
          <div className="detail-item">
           <strong>{t('provider.details.specialization')}:</strong>
            <span>{provider.title}</span>
          </div>
        )}

        {/* Langues */}
        {(details.languages && details.languages.length > 0) && (
          <div className="detail-item">
            <strong>{t('provider.details.languages')}:</strong>
            <span>{Array.isArray(details.languages) ? details.languages.join(', ') : details.languages}</span>
          </div>
        )}

        {/* === BABYSITTING - CHAMPS COMPACTS === */}
        {provider.serviceType === 'babysitting' && (
          <>
            {details.age && (
              <div className="detail-item">
               <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} שנים</span>
              </div>
            )}
            {details.religiosity && (
              <div className="detail-item">
               <strong>{t('provider.details.religiosity')}:</strong>
                <span>{details.religiosity}</span>
              </div>
            )}
            {details.can_travel_alone !== undefined && (
              <div className="detail-item">
               <strong>{t('provider.details.canTravelAlone')}:</strong>
<span>{details.can_travel_alone ? t('common.yes') : t('common.no')}</span>
              </div>
            )}
          </>
        )}

        {/* === CLEANING - CHAMPS COMPACTS === */}
        {provider.serviceType === 'cleaning' && (
          <>
            {details.legalStatus && (
              <div className="detail-item">
              <strong>{t('provider.details.legalStatus')}:</strong>
                <span>{details.legalStatus}</span>
              </div>
            )}
            {details.materialsProvided && (
              <div className="detail-item">
                <strong>{t('provider.details.equipment')}:</strong>
<span>{details.materialsProvided === 'yes' ? t('provider.details.bringsEquipment') : details.materialsProvided === 'no' ? t('provider.details.noEquipment') : t('provider.details.partialEquipment')}</span>
              </div>
            )}
            {details.frequency && (
              <div className="detail-item">
                <strong>{t('provider.details.frequency')}:</strong>
               <span>{translateValue(details.frequency, 'cleaningFrequency', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === GARDENING - CHAMPS COMPACTS === */}
        {provider.serviceType === 'gardening' && (
          <>
            {details.seasons && details.seasons.length > 0 && (
              <div className="detail-item">
                <strong>{t('provider.details.seasons')}:</strong>
                <span>{details.seasons.join(', ')}</span>
              </div>
            )}
          </>
        )}

        {/* === PETCARE - CHAMPS COMPACTS === */}
        {provider.serviceType === 'petcare' && (
          <>
            {details.location && (
              <div className="detail-item">
               <strong>{t('provider.details.careLocation')}:</strong>
                <span>{details.location}</span>
              </div>
            )}
          </>
        )}

        {/* === TUTORING - CHAMPS COMPACTS === */}
        {provider.serviceType === 'tutoring' && (
          <>
            {details.teachingMode && (
              <div className="detail-item">
                <strong>{t('provider.details.teachingMode')}:</strong>
               <span>{translateValue(details.teachingMode, 'tutoringMode', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === ELDERCARE - CHAMPS COMPACTS === */}
        {provider.serviceType === 'eldercare' && (
          <>
            {details.certification && (
              <div className="detail-item">
               <strong>{t('provider.details.certification')}:</strong>
                <span>{details.certification}</span>
              </div>
            )}
            {details.administrativeHelp && (
              <div className="detail-item">
               <strong>{t('provider.details.adminHelp')}:</strong>
<span>{details.administrativeHelp === 'yes' ? t('common.yes') : t('common.no')}</span>
              </div>
            )}
            {details.medicalAccompaniment && (
              <div className="detail-item">
              <strong>{t('provider.details.medicalAccompaniment')}:</strong>
<span>{details.medicalAccompaniment === 'yes' ? t('common.yes') : t('common.no')}</span>
              </div>
            )}
            {details.vehicleForOutings && (
              <div className="detail-item">
               <strong>{t('provider.details.vehicleForOutings')}:</strong>
<span>{details.vehicleForOutings === 'yes' ? t('common.yes') : t('common.no')}</span>
              </div>
            )}
          </>
        )}

        {/* Disponibilité jours */}
        {(details.availableDays || details.availability_days) && (details.availableDays?.length > 0 || details.availability_days?.length > 0) && (
          <div className="detail-item">
           <strong>{t('provider.details.availableDays')}:</strong>
        <span>{translateAndJoin(details.availableDays || details.availability_days, 'days', t)}</span>
          </div>
        )}

        {/* Disponibilité heures */}
        {(details.availableHours || details.availability_hours) && (details.availableHours?.length > 0 || details.availability_hours?.length > 0) && (
          <div className="detail-item">
           <strong>{t('provider.details.availableHours')}:</strong>
         <span>{translateAndJoin(details.availableHours || details.availability_hours, 'hours', t)}</span>
          </div>
        )}

        {/* Certifications */}
{details.certifications && provider.serviceType !== 'cleaning' && (
  <div className="detail-item">
   <strong>{t('provider.details.certifications')}:</strong>
    <span>{Array.isArray(details.certifications) ? details.certifications.join(', ') : details.certifications}</span>
  </div>
)}

        {/* === CHAMPS PLEINE LARGEUR EN BAS === */}

        {/* BABYSITTING - Types */}
        {provider.serviceType === 'babysitting' && details.babysitting_types && details.babysitting_types.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
           <strong>{t('provider.details.babysittingTypes')}:</strong>
          <span>{translateAndJoin(details.babysitting_types, 'babysittingTypes', t)}</span>
          </div>
        )}

        {/* BABYSITTING - Age groups */}
        {provider.serviceType === 'babysitting' && details.ageGroups && details.ageGroups.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>{t('provider.details.ageGroups')}:</strong>
         <span>{translateAndJoin(details.ageGroups, 'babysittingAgeGroups', t)}</span>
          </div>
        )}

        {/* CLEANING - Types */}
        {provider.serviceType === 'cleaning' && details.cleaningTypes && details.cleaningTypes.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
          <strong>{t('provider.details.cleaningTypes')}:</strong>
         <span>{translateArrayFromMultipleCategories(details.cleaningTypes, ['cleaningHome', 'cleaningOffice', 'cleaningSpecial'], t).join(', ')}</span>
          </div>
        )}

        {/* GARDENING - Services */}
        {provider.serviceType === 'gardening' && details.services && details.services.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
           <strong>{t('provider.details.gardeningServices')}:</strong>
       <span>{translateAndJoin(details.services, 'gardeningServices', t)}</span>
          </div>
        )}

        {/* GARDENING - Equipment */}
        {provider.serviceType === 'gardening' && details.equipment && details.equipment.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
          <strong>{t('provider.details.equipment')}:</strong>
         <span>{translateAndJoin(details.equipment, 'gardeningEquipment', t)}</span>
          </div>
        )}

        {/* PETCARE - Animal types */}
        {provider.serviceType === 'petcare' && details.animalTypes && details.animalTypes.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
           <strong>{t('provider.details.pets')}:</strong>
       <span>{translateAndJoin(details.animalTypes, 'petcareAnimals', t)}</span>
          </div>
        )}

        {/* PETCARE - Facilities */}
        {provider.serviceType === 'petcare' && details.facilities && details.facilities.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
          <strong>{t('provider.details.facilities')}:</strong>
         <span>{translateAndJoin(details.facilities, 'petcareFacilities', t)}</span>
          </div>
        )}

        {/* TUTORING - Subjects */}
        {provider.serviceType === 'tutoring' && details.subjects && details.subjects.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
        <span>{details.subjects.join(', ')}</span>
          </div>
        )}

        {/* TUTORING - Levels */}
        {provider.serviceType === 'tutoring' && details.levels && details.levels.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
           <strong>{t('provider.details.levels')}:</strong>
          <span>{translateAndJoin(details.levels, 'tutoringLevels', t)}</span>
          </div>
        )}

        {/* ELDERCARE - Care types */}
        {provider.serviceType === 'eldercare' && details.careTypes && details.careTypes.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>{t('provider.details.careTypes')}:</strong>
          <span>{translateAndJoin(details.careTypes, 'eldercareTypes', t)}</span>
          </div>
        )}

        {/* ELDERCARE - Specific conditions */}
        {provider.serviceType === 'eldercare' && details.specificConditions && details.specificConditions.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
          <strong>{t('provider.details.specificConditions')}:</strong>
           <span>{translateAndJoin(details.specificConditions, 'eldercareConditions', t)}</span>
          </div>
        )}

        {/* Services additionnels (tous services) */}
        {details.additionalServices && details.additionalServices.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>{t('provider.details.additionalServices')}:</strong>
            <span>{details.additionalServices.join(', ')}</span>
          </div>
        )}

        {/* === ZONES DE TRAVAIL - TOUJOURS EN DERNIER === */}
        {provider.workingAreas && provider.workingAreas.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
          <strong>{t('provider.details.workingAreas')}:</strong>
            <div className="working-areas-list">
              {provider.workingAreas.map((area, idx) => (
                <span key={idx} className="area-tag">
                  {area.city}{area.neighborhood ? ` - ${area.neighborhood}` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

  if (loading) {
    return (
      <div className="provider-detail-loading">
<LoadingSpinner size="large" text={t('provider.loading')} />
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="provider-detail-error">
        <div className="error-content">
          <AlertCircle size={48} />
         <h2>{t('provider.notFound')}</h2>
<p>{t('provider.notFoundDesc')}</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button 
              onClick={() => navigate(-1)} 
              className="btn btn-primary"
            >{t('provider.backToSearch')}</button>
          </div>
        </div>
      </div>
    );
  }

 
  const serviceColors = getServiceColors(provider.serviceType);
  const paymentConfig = getPaymentConfig(provider.serviceType);
  const serviceIconUrl = getServiceIcon(provider.serviceType);

  return (
    <div className="provider-detail-page">
      {/* Header Navigation */}
      <div className="provider-nav">
        <div className="container">
          <button 
            onClick={() => navigate(-1)}
            className="back-btn"
          >
            <ChevronLeft size={20} />
           {t('provider.back')}</button>
          
          <div className="breadcrumb">
           <Link to="/">{t('provider.home')}</Link>
            <span>/</span>
            <Link to={`/services/${provider.serviceType}`}>
              {t(`services.${provider.serviceType}`)}
            </Link>
            <span>/</span>
            <span>{provider.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="provider-hero">
        <div className="container">
          <div className="hero-content">
            <div className="provider-main-info">
              <div className="provider-image-section">
              <div className="image-wrapper">
  {provider.media?.profileImage ? (
    <img 
      src={`http://localhost:5000/${provider.media.profileImage.replace(/\\/g, '/').replace(/^\/+/, '')}`}
      alt={provider.name}
      className="provider-image"
    />
  ) : (
    <div style={{
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      background: 'linear-gradient(145deg, #e8eef5 0%, #d1dbe8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a0aec0"/>
            <stop offset="100%" stopColor="#718096"/>
          </linearGradient>
          <clipPath id="circleClip">
            <circle cx="50" cy="50" r="48"/>
          </clipPath>
        </defs>
        <g clipPath="url(#circleClip)">
          <circle cx="50" cy="38" r="18" fill="url(#avatarGradient)"/>
          <ellipse cx="50" cy="85" rx="32" ry="28" fill="url(#avatarGradient)"/>
        </g>
      </svg>
    </div>
  )}

                  {provider.verified && (
                    <div className="verified-badge">
                      <CheckCircle size={20} />
                    </div>
                  )}
                </div>
              </div>

              <div className="provider-info">
            <div className="service-badge">
  <div className="service-icon">
    <img 
      src={serviceIconUrl}
      alt={provider.serviceType}
    />
  </div>

                  <span>
                  {t(`services.${provider.serviceType}`)}
                  </span>
                </div>

                <h1 className="provider-name">{provider.name}</h1>

                <div className="provider-rating-location">
                  <div className="rating">
                    <Star fill="#fbbf24" color="#fbbf24" size={20} />
<span className="rating-score">{reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0}</span>
<span className="reviews-count">({reviews.length} {t('provider.reviews')})</span>
                  </div>
  
                </div>

                <p className="provider-description">{provider.description || provider.title}</p>

                <div className="provider-highlights">
                  {provider.experience && (
                    <div className="highlight">
                      <Award size={16} />
                     <span>{provider.experience} {t('provider.yearsExperience')}</span>
                    </div>
                  )}
                  
                  {provider.languages && (
                    <div className="highlight">
                      <MessageCircle size={16} />
                      <span>שפות: {Array.isArray(provider.languages) ? provider.languages.join(', ') : provider.languages}</span>
                    </div>
                  )}
                </div>


{provider.phone && (
  <div className="contact-info">
    <Phone size={16} />
    <span className="phone-number">{provider.phone}</span>
  </div>
)}

<div className="contact-actions">
  <button 
    onClick={() => window.location.href = `tel:${provider.phone}`}
    className="btn btn-primary btn-large"
  >
    <Phone size={18} />
    {t('provider.callNow')}</button>
  
  <button 
    onClick={() => window.open(`https://wa.me/972${provider.phone?.replace(/^0/, '')}`, '_blank')}
    className="btn btn-success btn-large"
  >
    <MessageCircle size={18} />
  {t('provider.sendWhatsapp')}</button>
</div>

              </div>
            </div>
          </div>
        </div>
      </section>

{/* Main Content */}
      <div className="provider-content">
        <div className="container">
          <div className="content-grid">
            <div className="main-content">
              
                {/* Colonne gauche - פרטי השירות */}
              
                  {renderServiceDetails()}

                  {/* Certifications */}
                  {provider.certifications && provider.certifications.length > 0 && (
                    <div className="certifications-section">
                      <h3 className="section-title">הכשרות ותעודות</h3>
                      <div className="certifications-list">
                        {provider.certifications.map((cert, index) => (
                          <div key={index} className="certification-item">
                            <Award size={16} />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
             

                {/* Colonne droite - ביקורות */}
             
                  {/* Section avis */}
                  <div className="reviews-section-enhanced">
                    <div className="reviews-header">
                   <h3 className="section-title">{t('provider.reviews.title')}</h3>
                      <div className="reviews-summary">
                        <div className="rating-overview">
                          <div className="overall-rating">
                            <Star fill="#fbbf24" color="#fbbf24" size={24} />
                            <span className="rating-number">{reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0}</span>
                          </div>
                          <div className="rating-details">
                         <span className="rating-text">{t('provider.reviews.overallRating')}</span>
<span className="reviews-total">{reviews.length} {t('provider.reviews')}</span>
                          </div>
                        </div>
                        
                        {isAuthenticated && user?.role === 'client' && (
                          <button 
                            className="btn btn-primary write-review-btn"
                            onClick={handleOpenReviewModal}
                          >
                            <MessageCircle size={18} />
                          {t('provider.reviews.writeReview')}</button>
                        )}
                      </div>
                    </div>

                    {/* Liste des avis */}
                    <div className="reviews-list-enhanced">
                      {reviewsLoading ? (
                       <LoadingSpinner text={t('provider.loadingReviews')} />
                      ) : (
                        <>
                          {reviews.length > 0 ? (
                            reviews.map((review) => (
                              <div 
                                key={review.id} 
                                className="review-item-enhanced"
                                style={{ direction: isHebrew(review.comment) ? 'rtl' : 'ltr' }}
                              >
                                <div className="review-main-horizontal">
                                  <div className="reviewer-avatar">
                                    <User size={20} />
                                  </div>
                                  
                                  <div className="review-content-wrapper">
                                    <div className="review-header-horizontal">
                                      <div className="reviewer-info-horizontal">
                                  <h5 className="reviewer-name">{review.reviewerName || t('provider.reviews.customer')}</h5>
                                        <div className="review-rating">
                                          {[...Array(5)].map((_, i) => (
                                            <Star 
                                              key={i} 
                                              size={14} 
                                              fill={i < review.rating ? "#fbbf24" : "none"}
                                              color="#fbbf24"
                                            />
                                          ))}
                                          <span className="rating-text">({review.rating}/5)</span>
                                        </div>
                                      </div>
                                    </div>
                              <div className="review-meta">
  <span className="review-date">
    {review.formatted_date || 
     (review.createdAt || review.created_at 
       ? new Date(review.createdAt || review.created_at).toLocaleDateString('he-IL', {
           day: '2-digit',
           month: '2-digit',
           year: 'numeric'
         }) 
       : '')}
  </span>
</div>
                                  </div>

                                  <div className="review-content">
                                    <p>{review.comment}</p>
                                  </div>
                                </div>

{/* Réponse prestataire */}
{(review.provider_response || review.providerResponse) && (
  <div className="provider-response" style={{ direction: 'rtl' }}>
    <div className="response-header" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      direction: 'rtl'
    }}>
      <div className="provider-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
  <div className="provider-avatar">
    <img 
      src={provider.media?.profileImage 
        ? `http://localhost:5000/${provider.media.profileImage.replace(/\\/g, '/').replace(/^\/+/, '')}`
        : '/api/placeholder/40/40'
      }
      alt={provider.name}
      className="provider-response-image"
    />
  </div>
  <div className="response-details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
 <h6 className="provider-response-name">{t('provider.reviews.responseFrom')}{provider.name}</h6>
    <span className="response-date" style={{ color: '#6b7280', fontSize: '12px' }}>
      {new Date(
        review.provider_response?.createdAt || 
        review.provider_response?.created_at ||
        review.providerResponse?.createdAt
      ).toLocaleDateString('he-IL')}
    </span>
  </div>
</div>
      <div className="response-badge">
        <MessageCircle size={14} />
      <span>{t('provider.reviews.providerResponse')}</span>
      </div>
    </div>
    
    <div className="response-content" style={{ textAlign: 'right', marginTop: '12px' }}>
      <p>{
        review.provider_response?.responseText || 
        review.provider_response?.response_text ||
        review.providerResponse?.responseText ||
        review.providerResponse
      }</p>
    </div>
  </div>
)}
                              </div>
                            ))
                          ) : (
                            <div className="no-reviews-enhanced">
                              <div className="no-reviews-icon">
                                <MessageCircle size={48} />
                              </div>
                              <div className="no-reviews-content">
                              <h4>{t('provider.reviews.noReviews')}</h4>
<p>{t('provider.reviews.beFirst')} {provider.name}</p>
                                {isAuthenticated && user?.role === 'client' && (
                                  <button 
                                    className="btn btn-primary"
                                    onClick={handleOpenReviewModal}
                                  >
                                    <MessageCircle size={18} />
                                 {t('provider.reviews.writeFirst')}</button>
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />

      <ReviewModal 
        isOpen={reviewModal.isOpen}
        onClose={handleCloseReviewModal}
        providerId={reviewModal.providerId}
        providerName={reviewModal.providerName}
        serviceType={provider?.serviceType || 'eldercare'}
      />

      {showContactModal && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal-content contact-modal" onClick={e => e.stopPropagation()}>
         <h3>{t('provider.contact.title')} {provider.name}</h3>
            
            {paymentConfig.showPhone ? (
              <div className="direct-contact">
             <p>{t('provider.contact.directContact')}</p>
                <a href={`tel:${provider.phone}`} className="btn btn-primary btn-large">
                  <Phone size={18} />
                  התקשר עכשיו: {provider.phone}
                </a>
              </div>
            ) : (
              <div className="platform-contact">
              <p>{t('provider.contact.requiresCredits')}</p>
                <div className="contact-options">
                  <Link to="/premium" className="btn btn-primary">
                   {t('provider.contact.buyCredits')}</Link>
                  <button 
                    onClick={() => setShowContactModal(false)}
                    className="btn btn-secondary"
                  >
                    ביטול
                  </button>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setShowContactModal(false)}
              className="modal-close-btn"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDetailPage;