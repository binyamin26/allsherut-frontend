import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AuthModal from '../components/auth/AuthModal';
import ReviewModal from '../components/modals/ReviewModal';
import apiService from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { translateValue, translateAndJoin, translateArrayFromMultipleCategories } from '../utils/translationMapper';
import { TUTORING_SUBCATEGORIES } from '../data/subcategoriesData';
import { 
  Star, MapPin, Clock, Phone, Mail, CheckCircle, Award, 
  Calendar, MessageCircle, ThumbsUp, User, Shield, Heart,
  ChevronLeft, Send, AlertCircle
} from 'lucide-react';

const DAY_ORDER = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'כל השבוע'];
const sortDays = (days) => {
  if (!Array.isArray(days)) return days;
  return [...days].sort((a, b) => {
    const ia = DAY_ORDER.indexOf(a);
    const ib = DAY_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
};

const ProviderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, apiCall } = useAuth();
  const { t } = useLanguage();
  
 // Fonction détection hébreu
  const isHebrew = (text) => {
    if (!text) return false;
    const hebrewRegex = /[\u0590-\u05FF]/;
    return hebrewRegex.test(text);
  };

  const formatRating = (val) => {
    const num = parseFloat(val);
    if (!val || isNaN(num) || num === 0) return null;
    const rounded = Math.round(num * 100) / 100;
    if (rounded % 1 === 0) return String(rounded);
    return rounded.toFixed(2).replace(/0+$/, '');
  };

  // États
  const [provider, setProvider] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [tutoringSubcats, setTutoringSubcats] = useState([]);
  const [sportsSubcats, setSportsSubcats] = useState([]);
  const [profileImageError, setProfileImageError] = useState(false);

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
    gardening: '/images/logo jardinage.jpg',
    petcare: '/images/logo chien.png',
    tutoring: '/images/logo cours particulier.jpg',
    sports_activities: '/images/logo sport.jpg',
    eldercare: '/images/logo kachich.png',
    laundry: '/images/logo kvissa.png',
    electrician: '/images/logo electricien.jpg',
    plumbing: '/images/logo plomberie.jpg',
    air_conditioning: '/images/logo clim.png',
    gas_technician: '/images/logo gaz.png',
    drywall: '/images/logo placo.png',
    carpentry: '/images/logo menuisier.png',
    property_management: '/images/logo nihoul dirot.png',
    home_organization: '/images/logo rangement.jpg',
    painting: '/images/logo peinture.png',
    private_chef: '/images/logo chef.png',
    event_entertainment: '/images/logo event.png',
    waterproofing: '/images/logo itoum.jpg',
    contractor: '/images/logo kablan.png',
    aluminum: '/images/logo aluminium.png',
    glass_works: '/images/logo verre.png',
    locksmith: '/images/logo serrure.png',
    moving: '/images/logo demenagement.jpg',
    event_decoration: '/images/logo deco.jpg',
    pest_control: '/images/logo desinctisation.jpg',
    handyman: '/images/logo indimane.jpg',
    photographer: '/images/logo photographe.jpg',
    mechanic: '/images/logo garagiste.jpg'
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
      sports_activities: 'from-green-500 to-teal-600',
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

  // Charger les sous-catégories tutoring
  useEffect(() => {
    if (provider?.serviceType !== 'tutoring') return;
    const load = async () => {
      try {
        const response = await apiCall('/services/5/subcategories', 'GET');
        if (response.success && response.data.subcategories) {
          setTutoringSubcats(response.data.subcategories);
        }
      } catch (err) {
        console.error('Error loading tutoring subcategories:', err);
      }
    };
    load();
  }, [provider?.serviceType, apiCall]);

  // Charger les sous-catégories sports_activities
  useEffect(() => {
    if (provider?.serviceType !== 'sports_activities') return;
    const load = async () => {
      try {
        const response = await apiCall('/services/sports_activities/subcategories', 'GET');
        if (response.success && response.data.subcategories) {
          setSportsSubcats(response.data.subcategories);
        }
      } catch (err) {
        console.error('Error loading sports_activities subcategories:', err);
      }
    };
    load();
  }, [provider?.serviceType, apiCall]);

 const loadProviderData = async () => {
  console.log('🔍 Provider ID:', id);
  
  try {
    setLoading(true);
    console.log('🔍 Loading provider with ID:', id);
    
    const providerResponse = await apiService.getProvider(id);
    if (providerResponse.success) {
      console.log('✅ Provider data:', providerResponse.data);
      console.log('📸 FULL RESPONSE DATA:', providerResponse.data);
      console.log('📸 MEDIA OBJECT:', providerResponse.data.media);
      
      // ⬇️ AJOUTE CETTE LIGNE ICI ⬇️
      console.log('📋 SERVICE DETAILS:', JSON.stringify(providerResponse.data.serviceDetails, null, 2));
      
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
        {['babysitting', 'cleaning', 'gardening', 'tutoring', 'sports_activities'].includes(provider.serviceType) && (
          <div className="detail-item">
            <strong>{t('provider.details.hourlyRate')}:</strong>
            {parseFloat(provider.hourlyRate) > 0 || parseFloat(details.hourlyRate) > 0 || parseFloat(details.rate) > 0
              ? <span className="price-highlight">₪{parseFloat(provider.hourlyRate) > 0 ? provider.hourlyRate : (parseFloat(details.hourlyRate) > 0 ? details.hourlyRate : details.rate)}/שעה</span>
              : <span>{t('dashboard.notSpecified')}</span>
            }
          </div>
        )}
        
        {/* Expérience */}
        {(provider.experienceYears || details.experience || details.experienceYears) && (
          <div className="detail-item">
           <strong>{t('provider.details.experience')}:</strong>
            <span>{provider.experienceYears || details.experience || details.experienceYears} {t('provider.details.years')}</span>
          </div>
        )}

        {/* Spécialisation = nom du service traduit */}
        {provider.serviceType && (
          <div className="detail-item">
            <strong>{t('provider.details.specialization')}:</strong>
            <span>{t(`services.${provider.serviceType}`, provider.serviceType)}</span>
          </div>
        )}

        {/* Langues */}
        {(details.languages && details.languages.length > 0) && (
          <div className="detail-item">
            <strong>{t('provider.details.languages')}:</strong>
         <span>{Array.isArray(details.languages) ? translateAndJoin(details.languages, 'languages', t) : translateValue(details.languages, 'languages', t)}</span>
          </div>
        )}

        {/* Types de travaux — affiché pour tous les services sauf painting (qui l'a déjà dans sa section) */}
        {details.work_types && details.work_types.length > 0 && provider.serviceType !== 'painting' && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>🔧 {t('serviceForm.common.workTypes')}:</strong>
            <span>{details.work_types.map((w, i) => (
              <span key={i}><bdi>{w}</bdi>{i < details.work_types.length - 1 ? ', ' : ''}</span>
            ))}</span>
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
             <span>{translateValue(details.religiosity, 'religiousLevels', t)}</span>
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
             <span>{translateValue(details.legalStatus, 'cleaningLegalStatus', t)}</span>
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
               <span>{translateAndJoin(details.seasons, 'gardeningSeasons', t)}</span>
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
            <span>{translateValue(details.location, 'petcareLocation', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === TUTORING / SPORTS_ACTIVITIES - CHAMPS COMPACTS === */}
        {(provider.serviceType === 'tutoring' || provider.serviceType === 'sports_activities') && (
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
{details.administrativeHelp && details.administrativeHelp !== 'not_specified' && (
  <div className="detail-item">
   <strong>{t('provider.details.adminHelp')}:</strong>
<span>{details.administrativeHelp === 'yes' ? t('common.yes') : t('common.no')}</span>
  </div>
)}
{details.medicalAccompaniment && details.medicalAccompaniment !== 'not_specified' && (
  <div className="detail-item">
  <strong>{t('provider.details.medicalAccompaniment')}:</strong>
<span>{details.medicalAccompaniment === 'yes' ? t('common.yes') : t('common.no')}</span>
  </div>
)}
{details.vehicleForOutings && details.vehicleForOutings !== 'not_specified' && (
  <div className="detail-item">
   <strong>{t('provider.details.vehicleForOutings')}:</strong>
<span>{details.vehicleForOutings === 'yes' ? t('common.yes') : t('common.no')}</span>
  </div>
)}
          </>
        )}

        {/* === LAUNDRY - CHAMPS COMPACTS === */}
        {provider.serviceType === 'laundry' && (
          <>
            {details.pickupService && (
              <div className="detail-item">
                <strong>{t('provider.details.pickupService')}:</strong>
                <span>{details.pickupService === 'yes' ? t('common.yes') : t('common.no')}</span>
              </div>
            )}
          </>
        )}
        
{/* === AGE pour services manquants === */}
        {['tutoring', 'sports_activities', 'petcare', 'eldercare'].includes(provider.serviceType) && details.age && (
          <div className="detail-item">
            <strong>{t('provider.details.age')}:</strong>
            <span>{details.age} {t('provider.details.years')}</span>
          </div>
        )}
        {/* Disponibilité jours */}
        {['tutoring', 'sports_activities', 'babysitting', 'petcare', 'eldercare', 'event_entertainment'].includes(provider.serviceType) && (details.availableDays || details.availability_days) && (details.availableDays?.length > 0 || details.availability_days?.length > 0) && (
          <div className="detail-item">
           <strong>{t('provider.details.availableDays')}:</strong>
        <span>{translateAndJoin(sortDays(details.availableDays || details.availability_days), 'days', t)}</span>
          </div>
        )}

        {/* Disponibilité heures */}
        {['tutoring', 'sports_activities', 'babysitting', 'petcare', 'eldercare', 'event_entertainment'].includes(provider.serviceType) && (details.availableHours || details.availability_hours) && (details.availableHours?.length > 0 || details.availability_hours?.length > 0) && (
          <div className="detail-item">
           <strong>{t('provider.details.availableHours')}:</strong>
         <span>{translateAndJoin(details.availableHours || details.availability_hours, 'hours', t)}</span>
          </div>
        )}

{/* Certifications */}
{details.certifications && details.certifications.length > 0 && provider.serviceType !== 'cleaning' && provider.serviceType !== 'eldercare' && provider.serviceType !== 'laundry' && (
  <div className="detail-item">
   <strong>{t('provider.details.certifications')}:</strong>
    <span>{Array.isArray(details.certifications) ? translateAndJoin(details.certifications, 'babysittingCertifications', t) : translateValue(details.certifications, 'babysittingCertifications', t)}</span>
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
       <span>{translateArrayFromMultipleCategories(details.cleaningTypes, ['cleaningHome', 'cleaningOffice', 'cleaningSpecial', 'cleaningAdditional'], t).join(', ')}</span>
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

        {/* GARDENING - Additional Services */}
        {provider.serviceType === 'gardening' && details.additionalServices && details.additionalServices.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>{t('provider.details.additionalServices')}:</strong>
          <span>{translateAndJoin(details.additionalServices, 'gardeningAdditional', t)}</span>
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

        {/* PETCARE - Dog sizes */}
        {provider.serviceType === 'petcare' && details.dogSizes && details.dogSizes.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>{t('provider.details.dogSizes')}:</strong>
          <span>{translateAndJoin(details.dogSizes, 'petcareDogSizes', t)}</span>
          </div>
        )}

        {/* PETCARE - Additional Services */}
        {provider.serviceType === 'petcare' && details.additionalServices && details.additionalServices.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>{t('provider.details.additionalServices')}:</strong>
          <span>{translateAndJoin(details.additionalServices, 'petcareServices', t)}</span>
          </div>
        )}

        {/* PETCARE - Veterinary Services */}
        {provider.serviceType === 'petcare' && details.veterinaryServices && details.veterinaryServices.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>{t('provider.details.veterinaryServices')}:</strong>
       <span>{translateAndJoin(details.veterinaryServices, 'petcareVeterinary', t)}</span>
          </div>
        )}

        {/* === AIR_CONDITIONING === */}
        {provider.serviceType === 'air_conditioning' && (
          <>
            {details.installation_types && details.installation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>❄️ {t('provider.details.acInstallation')}:</strong>
             <span>{translateAndJoin(details.installation_types, 'acInstallation', t)}</span>
              </div>
            )}
            {details.repair_types && details.repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.acRepair')}:</strong>
             <span>{translateAndJoin(details.repair_types, 'acRepair', t)}</span>
              </div>
            )}
            {details.disassembly_types && details.disassembly_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔄 {t('provider.details.acDisassembly')}:</strong>
             <span>{translateAndJoin(details.disassembly_types, 'acDisassembly', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === DRYWALL === */}
        {provider.serviceType === 'drywall' && (
          <>
            {details.design_types && details.design_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🎨 {t('provider.details.drywallDesigns')}:</strong>
             <span>{translateAndJoin(details.design_types, 'drywallDesign', t)}</span>
              </div>
            )}
            {details.construction_types && details.construction_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏗️ {t('provider.details.drywallConstruction')}:</strong>
               <span>{translateAndJoin(details.construction_types, 'drywallConstruction', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === CARPENTRY === */}
        {provider.serviceType === 'carpentry' && (
          <>
            {details.furniture_building_types && details.furniture_building_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🪑 {t('provider.details.furnitureBuilding')}:</strong>
               <span>{translateAndJoin(details.furniture_building_types, 'carpentryFurnitureBuilding', t)}</span>
              </div>
            )}
            {details.furniture_repair_types && details.furniture_repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.furnitureRepair')}:</strong>
               <span>{translateAndJoin(details.furniture_repair_types, 'carpentryFurnitureRepair', t)}</span>
              </div>
            )}
            {details.other_carpentry_types && details.other_carpentry_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🪵 {t('provider.details.otherCarpentry')}:</strong>
               <span>{translateAndJoin(details.other_carpentry_types, 'carpentryOther', t)}</span>
              </div>
            )}
            {details.pergola_types && details.pergola_types.length > 0 && (
                  <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <strong>🏕️ {t('provider.details.pergolas')}:</strong>
                    <span>{translateAndJoin(details.pergola_types, 'carpentryPergolas', t)}</span>
                  </div>
                )}
                {details.deck_types && details.deck_types.length > 0 && (
                  <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <strong>🪵 {t('provider.details.decks')}:</strong>
                   <span>{translateAndJoin(details.deck_types, 'carpentryDecks', t)}</span>
                  </div>
                )}
                {details.fence_types && details.fence_types.length > 0 && (
                  <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <strong>🚧 {t('provider.details.fences')}:</strong>
                 <span>{translateAndJoin(details.fence_types, 'carpentryFences', t)}</span>
                  </div>
                )}
          </>
        )}

        {/* === HOME_ORGANIZATION === */}
        {provider.serviceType === 'home_organization' && (
          <>
            <div className="detail-item">
              <strong>{t('provider.details.hourlyRate')}:</strong>
              {parseFloat(details.hourlyRate) > 0
                ? <span className="price-highlight">₪{details.hourlyRate}/שעה</span>
                : <span>{t('dashboard.notSpecified')}</span>
              }
            </div>
            {details.general_organization_types && details.general_organization_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏠 {t('provider.details.generalOrganization')}:</strong>
              <span>{translateAndJoin(details.general_organization_types, 'homeOrgGeneral', t)}</span>
              </div>
            )}
            {details.sorting_types && details.sorting_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>📦 {t('provider.details.sortingOrganization')}:</strong>
              <span>{translateAndJoin(details.sorting_types, 'homeOrgSorting', t)}</span>
              </div>
            )}
            {details.professional_organization_types && details.professional_organization_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>✨ {t('provider.details.professionalOrganization')}:</strong>
               <span>{translateAndJoin(details.professional_organization_types, 'homeOrgProfessional', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === EVENT_ENTERTAINMENT === */}
        {provider.serviceType === 'event_entertainment' && (
          <>
            {details.food_machine_types && details.food_machine_types.length > 0 && (
                  <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <strong>🍿 {t('provider.details.foodMachines')}:</strong>
                <span>{translateAndJoin(details.food_machine_types, 'eventFoodMachines', t)}</span>
                  </div>
                )}
                {details.inflatable_game_types && details.inflatable_game_types.length > 0 && (
                  <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <strong>🎪 {t('provider.details.inflatables')}:</strong>
                    <span>{translateAndJoin(details.inflatable_game_types, 'eventInflatableGames', t)}</span>
                  </div>
                )}
                {details.effect_machine_types && details.effect_machine_types.length > 0 && (
                  <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <strong>💨 {t('provider.details.effectMachines')}:</strong>
<span>{translateAndJoin(details.effect_machine_types, 'eventEffectMachines', t)}</span>
                  </div>
                )}
            {details.entertainment_types && details.entertainment_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🎭 {t('provider.details.entertainmentTypes')}:</strong>
               <span>{translateAndJoin(details.entertainment_types, 'eventEntertainment', t)}</span>
              </div>
            )}
            {details.other_types && details.other_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🎉 {t('provider.details.otherEventServices')}:</strong>
              <span>{translateAndJoin(details.other_types, 'eventOther', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === PRIVATE_CHEF === */}
        {provider.serviceType === 'private_chef' && (
          <>
            {details.provider_type && details.provider_type.length > 0 && (
              <div className="detail-item">
                <strong>{t('provider.details.providerType')}:</strong>
                <span>{translateAndJoin(details.provider_type, 'chefProviderType', t)}</span>
              </div>
            )}
            {details.event_types && details.event_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🎉 {t('provider.details.eventTypes')}:</strong>
                <span>{translateAndJoin(details.event_types, 'chefEventType', t)}</span>
              </div>
            )}
            {details.cuisine_types && details.cuisine_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🍳 {t('provider.details.cuisineTypes')}:</strong>
              <span>{translateAndJoin(details.cuisine_types, 'chefCuisine', t)}</span>
              </div>
            )}
            {details.kosher_types && details.kosher_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>✡️ {t('provider.details.kosherTypes')}:</strong>
                <span>{translateAndJoin(details.kosher_types, 'chefKosher', t)}</span>
                {details.kosher_types.includes('אחר') && details.kosher_other && (
                  <span> ({details.kosher_other})</span>
                )}
              </div>
            )}
          </>
        )}

        {/* === PAINTING === */}
        {provider.serviceType === 'painting' && (
          <>
            {details.work_types && details.work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🎨 {t('provider.details.paintingServices')}:</strong>
               <span>{translateAndJoin(details.work_types, 'paintingWorkTypes', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === CONTRACTOR === */}
        {provider.serviceType === 'contractor' && (
          <>
            {details.structure_work_types && details.structure_work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏗️ {t('provider.details.structureWork')}:</strong>
               <span>{translateAndJoin(details.structure_work_types, 'contractorStructure', t)}</span>
              </div>
            )}
            {details.general_renovation_types && details.general_renovation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔨 {t('provider.details.generalRenovation')}:</strong>
               <span>{translateAndJoin(details.general_renovation_types, 'contractorRenovation', t)}</span>
              </div>
            )}
            {details.electric_plumbing_types && details.electric_plumbing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>⚡ {t('provider.details.electricPlumbing')}:</strong>
<span>{translateAndJoin(details.electric_plumbing_types, 'contractorElectricPlumbing', t)}</span>
              </div>
            )}
            {details.exterior_work_types && details.exterior_work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🌳 {t('provider.details.exteriorWork')}:</strong>
               <span>{translateAndJoin(details.exterior_work_types, 'contractorExterior', t)}</span>
              </div>
            )}
            {details.facade_repair_types && details.facade_repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🧱 {t('provider.details.facadeRepair')}:</strong>
                <span>{translateAndJoin(details.facade_repair_types, 'contractorFacade', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === WATERPROOFING === */}
        {provider.serviceType === 'waterproofing' && (
          <>
            {details.roof_waterproofing_types && details.roof_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏠 {t('provider.details.roofWaterproofing')}:</strong>
               <span>{translateAndJoin(details.roof_waterproofing_types, 'waterproofingRoof', t)}</span>
              </div>
            )}
            {details.wall_waterproofing_types && details.wall_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🧱 {t('provider.details.wallWaterproofing')}:</strong>
               <span>{translateAndJoin(details.wall_waterproofing_types, 'waterproofingWall', t)}</span>
              </div>
            )}
            {details.balcony_waterproofing_types && details.balcony_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🌿 {t('provider.details.balconyWaterproofing')}:</strong>
               <span>{translateAndJoin(details.balcony_waterproofing_types, 'waterproofingBalcony', t)}</span>
              </div>
            )}
            {details.wet_room_waterproofing_types && details.wet_room_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🚿 {t('provider.details.wetRoomWaterproofing')}:</strong>
              <span>{translateAndJoin(details.wet_room_waterproofing_types, 'waterproofingWetRoom', t)}</span>
              </div>
            )}
            {details.underground_waterproofing_types && details.underground_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>⬇️ {t('provider.details.undergroundWaterproofing')}:</strong>
               <span>{translateAndJoin(details.underground_waterproofing_types, 'waterproofingUnderground', t)}</span>
              </div>
            )}
            {details.inspection_equipment_types && details.inspection_equipment_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔍 {t('provider.details.inspectionEquipment')}:</strong>
               <span>{translateAndJoin(details.inspection_equipment_types, 'waterproofingInspection', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === ALUMINUM === */}
        {provider.serviceType === 'aluminum' && (
          <>
            {details.windows_doors_types && details.windows_doors_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🪟 {t('provider.details.aluminumWindowsDoors')}:</strong>
               <span>{translateAndJoin(details.windows_doors_types, 'aluminumWindowsDoors', t)}</span>
              </div>
            )}
            {details.pergolas_outdoor_types && details.pergolas_outdoor_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏕️ {t('provider.details.aluminumPergolas')}:</strong>
                <span>{translateAndJoin(details.pergolas_outdoor_types, 'aluminumPergolas', t)}</span>
              </div>
            )}
            {details.repairs_service_types && details.repairs_service_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.aluminumRepairs')}:</strong>
               <span>{translateAndJoin(details.repairs_service_types, 'aluminumRepairs', t)}</span>
              </div>
            )}
            {details.cladding_types && details.cladding_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏗️ {t('provider.details.aluminumCladding')}:</strong>
                <span>{translateAndJoin(details.cladding_types, 'aluminumCladding', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === GLASS_WORKS === */}
        {provider.serviceType === 'glass_works' && (
          <>
            {details.shower_glass_types && details.shower_glass_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🚿 {t('provider.details.showerGlass')}:</strong>
                <span>{translateAndJoin(details.shower_glass_types, 'glassShower', t)}</span>
              </div>
            )}
            {details.windows_doors_glass_types && details.windows_doors_glass_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🪟 {t('provider.details.windowsDoorsGlass')}:</strong>
               <span>{translateAndJoin(details.windows_doors_glass_types, 'glassWindowsDoors', t)}</span>
              </div>
            )}
            {details.kitchen_home_glass_types && details.kitchen_home_glass_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏠 {t('provider.details.kitchenHomeGlass')}:</strong>
               <span>{translateAndJoin(details.kitchen_home_glass_types, 'glassKitchenHome', t)}</span>
              </div>
            )}
            {details.special_safety_glass_types && details.special_safety_glass_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🛡️ {t('provider.details.specialSafetyGlass')}:</strong>
               <span>{translateAndJoin(details.special_safety_glass_types, 'glassSpecialSafety', t)}</span>
              </div>
            )}
            {details.repair_custom_types && details.repair_custom_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.glassRepairCustom')}:</strong>
               <span>{translateAndJoin(details.repair_custom_types, 'glassRepairCustom', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === LOCKSMITH === */}
        {provider.serviceType === 'locksmith' && (
          <>
            {details.lock_replacement_types && details.lock_replacement_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔐 {t('provider.details.lockReplacement')}:</strong>
               <span>{translateAndJoin(details.lock_replacement_types, 'locksmithLockReplacement', t)}</span>
              </div>
            )}
            {details.door_opening_types && details.door_opening_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🚪 {t('provider.details.doorOpening')}:</strong>
                <span>{translateAndJoin(details.door_opening_types, 'locksmithDoorOpening', t)}</span>
              </div>
            )}
            {details.lock_system_installation_types && details.lock_system_installation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>⚙️ {t('provider.details.lockSystemInstallation')}:</strong>
                <span>{translateAndJoin(details.lock_system_installation_types, 'locksmithSystems', t)}</span>
              </div>
            )}
            {details.lock_door_repair_types && details.lock_door_repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.lockDoorRepair')}:</strong>
                <span>{translateAndJoin(details.lock_door_repair_types, 'locksmithRepairs', t)}</span>
              </div>
            )}
            {details.security_services_types && details.security_services_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🛡️ {t('provider.details.securityServices')}:</strong>
                <span>{translateAndJoin(details.security_services_types, 'locksmithSecurity', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === GAS_TECHNICIAN === */}
        {provider.serviceType === 'gas_technician' && (
          <>
            {details.installation_types && details.installation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔥 {t('provider.details.gasInstallation')}:</strong>
               <span>{translateAndJoin(details.installation_types, 'gasInstallation', t)}</span>
              </div>
            )}
            {details.repair_types && details.repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.gasRepairs')}:</strong>
              <span>{translateAndJoin(details.repair_types, 'gasRepair', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === PEST_CONTROL === */}
        {provider.serviceType === 'pest_control' && (
          <>
            {details.certified !== undefined && details.certified !== null && (
              <div className="detail-item">
                <strong>{t('serviceForm.pest_control.certification')}:</strong>
                <span>{details.certified === 'yes' || details.certified === true ? t('common.yes') : t('common.no')}</span>
              </div>
            )}
            {details.worksAtHeight !== undefined && details.worksAtHeight !== null && (
              <div className="detail-item">
                <strong>{t('serviceForm.pest_control.workAtHeight')}:</strong>
                <span>{details.worksAtHeight === 'yes' || details.worksAtHeight === true ? t('common.yes') : t('common.no')}</span>
              </div>
            )}
            {details.pestTypes && details.pestTypes.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🐛 {t('serviceForm.pest_control.pestTypes')}:</strong>
                <span>{translateAndJoin(details.pestTypes, 'pestTypes', t)}</span>
              </div>
            )}
          </>
        )}

    {/* TUTORING - Subjects grouped from frontend data (source of truth) */}
        {provider.serviceType === 'tutoring' && details.subjects && details.subjects.length > 0 && (
          <>
            {(() => {
              const cleanName = (name) => (name || '').replace(/[​-‏‪-‮﻿]/g, '');
              const groups = [
                { key: 'music',    emoji: '🎵', label: t('filters.tutoring.music'),           min: 1,   max: 7   },
                { key: 'art',      emoji: '🎨', label: t('filters.tutoring.art'),             min: 10,  max: 16  },
                { key: 'dance',    emoji: '💃', label: t('filters.tutoring.dance'),           min: 20,  max: 24  },
                { key: 'theater',  emoji: '🎭', label: t('filters.tutoring.theater'),         min: 30,  max: 33  },
                { key: 'languages',emoji: '🌍', label: t('filters.tutoring.languages'),       min: 40,  max: 47  },
                { key: 'crafts',   emoji: '✂️', label: t('filters.tutoring.crafts'),          min: 50,  max: 56  },
                { key: 'tech',     emoji: '💻', label: t('filters.tutoring.tech'),            min: 60,  max: 64  },
                { key: 'cooking',  emoji: '🍳', label: t('filters.tutoring.cooking'),         min: 70,  max: 74  },
                { key: 'personal', emoji: '🧘', label: t('filters.tutoring.personal'),        min: 80,  max: 89  },
                { key: 'sports',   emoji: '⚽', label: t('filters.tutoring.sports'),          min: 90,  max: 119 },
                { key: 'academic', emoji: '📚', label: t('filters.tutoring.academicSubjects'),min: 200, max: 223 },
              ];
              const categorized = new Set();
              const elements = groups.map(group => {
                const groupSubcats = TUTORING_SUBCATEGORIES.filter(s => s.display_order >= group.min && s.display_order <= group.max);
                const selected = details.subjects.filter(subj =>
                  groupSubcats.some(s => cleanName(s.name_he) === cleanName(subj))
                );
                if (!selected.length) return null;
                selected.forEach(s => categorized.add(s));
                return (
                  <div key={group.key} className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <strong>{group.emoji} {group.label}:</strong>
                    <span>{selected.map((s, i) => <React.Fragment key={i}><bdi>{cleanName(s)}</bdi>{i < selected.length - 1 ? ', ' : ''}</React.Fragment>)}</span>
                  </div>
                );
              }).filter(Boolean);
              const others = details.subjects.filter(s => !categorized.has(s));
              if (others.length) {
                elements.push(
                  <div key="other" className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <strong>📖 {t('serviceForm.tutoring.subjectsLabel')}:</strong>
                    <span>{others.map((s, i) => <React.Fragment key={i}><bdi>{cleanName(s)}</bdi>{i < others.length - 1 ? ', ' : ''}</React.Fragment>)}</span>
                  </div>
                );
              }
              return <>{elements}</>;
            })()}
          </>
        )}

        {/* TUTORING - Levels */}
        {provider.serviceType === 'tutoring' && details.levels && details.levels.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
           <strong>{t('provider.details.levels')}:</strong>
          <span>{translateAndJoin(details.levels, 'tutoringLevels', t)}</span>
          </div>
        )}

{/* TUTORING - Specializations */}
        {provider.serviceType === 'tutoring' && details.specializations && details.specializations.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>{t('provider.details.specializations')}:</strong>
         <span>{translateAndJoin(details.specializations, 'tutoringSpecializations', t)}</span>
          </div>
        )}

        {/* TUTORING - Qualifications */}
        {provider.serviceType === 'tutoring' && details.qualifications && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>{t('provider.details.qualifications')}:</strong>
            <span>{details.qualifications}</span>
          </div>
        )}

        {/* SPORTS_ACTIVITIES - Subjects */}
        {provider.serviceType === 'sports_activities' && details.subjects && details.subjects.length > 0 && (
          <>
            {(() => {
              const cleanName = (name) => (name || '').replace(/‏/g, '');
              const subcats = sportsSubcats.length > 0 ? sportsSubcats : tutoringSubcats;
              const groups = [
                { key: 'music',    emoji: '🎵', label: t('filters.tutoring.music'),    min: 1,   max: 7   },
                { key: 'art',      emoji: '🎨', label: t('filters.tutoring.art'),      min: 10,  max: 16  },
                { key: 'dance',    emoji: '💃', label: t('filters.tutoring.dance'),    min: 20,  max: 24  },
                { key: 'theater',  emoji: '🎭', label: t('filters.tutoring.theater'),  min: 30,  max: 33  },
                { key: 'crafts',   emoji: '✂️', label: t('filters.tutoring.crafts'),   min: 50,  max: 54  },
                { key: 'cooking',  emoji: '👨‍🍳', label: t('filters.tutoring.cooking'),  min: 70,  max: 74  },
                { key: 'personal', emoji: '🧘', label: t('filters.tutoring.personal'), min: 80,  max: 89  },
                { key: 'sports',   emoji: '⚽', label: t('filters.tutoring.sports'),   min: 90,  max: 119 },
              ];
              if (subcats.length > 0) {
                const categorized = new Set();
                const elements = groups.map(group => {
                  const groupSubcats = subcats.filter(s => s.display_order >= group.min && s.display_order <= group.max);
                  const selected = details.subjects.filter(subj =>
                    groupSubcats.some(s => cleanName(s.name_he) === cleanName(subj))
                  );
                  if (!selected.length) return null;
                  selected.forEach(s => categorized.add(s));
                  return (
                    <div key={group.key} className="detail-item" style={{ gridColumn: '1 / -1' }}>
                      <strong>{group.emoji} {group.label}:</strong>
                      <span>{selected.map((s, i) => <span key={i}>{cleanName(s)}{i < selected.length - 1 ? ', ' : ''}</span>)}</span>
                    </div>
                  );
                }).filter(Boolean);
                const others = details.subjects.filter(s => !categorized.has(s));
                if (others.length) {
                  elements.push(
                    <div key="other" className="detail-item" style={{ gridColumn: '1 / -1' }}>
                      <strong>📖 {t('filters.tutoring.other')}:</strong>
                      <span>{others.map((s, i) => <span key={i}>{cleanName(s)}{i < others.length - 1 ? ', ' : ''}</span>)}</span>
                    </div>
                  );
                }
                return <>{elements}</>;
              }
              return (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>⚽ {t('serviceForm.sports_activities.subjectsLabel')}:</strong>
                  <span>{details.subjects.map((s, i) => <span key={i}>{cleanName(s)}{i < details.subjects.length - 1 ? ', ' : ''}</span>)}</span>
                </div>
              );
            })()}
          </>
        )}

        {/* SPORTS_ACTIVITIES - Levels (groupes d'âge) */}
        {provider.serviceType === 'sports_activities' && details.levels && details.levels.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>{t('filters.sports_activities.ageGroups')}:</strong>
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

        {/* LAUNDRY - Types */}
        {provider.serviceType === 'laundry' && details.laundryTypes && details.laundryTypes.length > 0 && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <strong>{t('provider.details.laundryTypes')}:</strong>
         <span>{translateAndJoin(details.laundryTypes, 'laundryServices', t)}</span>
          </div>
        )}

     {/* PROPERTY_MANAGEMENT - Types groupés par catégorie */}
        {provider.serviceType === 'property_management' && details.management_type && details.management_type.length > 0 && (
          <>
            {/* Long term */}
            {(() => {
              const longTermOptions = [
                'חיפוש ובדיקת שוכרים מתאימים',
                'חתימה על חוזה וניהול ערבויות',
                'גביית שכ"ד והעברת תשלומים לבעל הדירה',
                'בדיקת מצב הנכס לפני ואחרי תקופת השכירות',
                'העברת חשבונות השירותים (מים, חשמל, גז) על שם השוכר החדש'
              ];
              const selectedLongTerm = details.management_type.filter(t => longTermOptions.includes(t));
              
              return selectedLongTerm.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>🏠 {t('provider.details.longTermRental')}:</strong>
                 <span>{translateAndJoin(selectedLongTerm, 'propertyFullYear', t)}</span>
                </div>
              );
            })()}
            
            {/* Short term */}
            {(() => {
              const shortTermOptions = [
                'פרסום וניהול מודעות באתרים',
                'ניהול הזמנות ותקשורת עם אורחים',
                'קבלת אורחים / מסירת מפתחות',
                'ניקיון בין השהיות',
                'בדיקה תקופתית של הנכס',
                'תיקונים כלליים (חשמל, אינסטלציה, מזגן וכו׳)'
              ];
              const selectedShortTerm = details.management_type.filter(t => shortTermOptions.includes(t));
              
              return selectedShortTerm.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>🏖️ {t('provider.details.shortTermRental')}:</strong>
                <span>{translateAndJoin(selectedShortTerm, 'propertyShortTerm', t)}</span>
                </div>
              );
            })()}
          </>
        )}

        {/* === ELECTRICIAN - CHAMPS COMPACTS === */}

        {/* ELECTRICIAN - Types groupés par catégorie */}
        {provider.serviceType === 'electrician' && (
          <>
            {/* Réparations */}
            {details.repair_types && details.repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.electricianRepairs')}:</strong>
               <span>{translateAndJoin(details.repair_types, 'electricianRepairs', t)}</span>
              </div>
            )}
            
            {/* Installations */}
            {details.installation_types && details.installation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>⚡ {t('provider.details.electricianInstallations')}:</strong>
             <span>{translateAndJoin(details.installation_types, 'electricianInstallations', t)}</span>
              </div>
            )}
            
            {/* Gros travaux */}
            {details.large_work_types && details.large_work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏗️ {t('provider.details.electricianLargeWork')}:</strong>
            <span>{translateAndJoin(details.large_work_types, 'electricianLargeWork', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === PLUMBING - CHAMPS COMPACTS === */}

        {/* PLUMBING - Types groupés par catégorie */}
        {provider.serviceType === 'plumbing' && (
          <>
            {/* Bouchons/Blocages */}
            {details.blockage_types && details.blockage_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🚿 {t('provider.details.plumbingBlockages')}:</strong>
          <span>{translateAndJoin(details.blockage_types, 'plumbingBlockages', t)}</span>
              </div>
            )}
            
            {/* Réparation tuyauterie */}
            {details.pipe_repair_types && details.pipe_repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.plumbingPipeRepair')}:</strong>
             <span>{translateAndJoin(details.pipe_repair_types, 'plumbingPipeRepair', t)}</span>
              </div>
            )}
            
            {/* Gros travaux */}
            {details.large_work_types && details.large_work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏗️ {t('provider.details.plumbingLargeWork')}:</strong>
            <span>{translateAndJoin(details.large_work_types, 'plumbingLargeWork', t)}</span>
              </div>
            )}
            
            {/* Équipements sanitaires */}
            {details.fixture_types && details.fixture_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🚽 {t('provider.details.plumbingFixtures')}:</strong>
           <span>{translateAndJoin(details.fixture_types, 'plumbingFixtures', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === EVENT DECORATION === */}
        {provider.serviceType === 'event_decoration' && (
          <>
            {details.decoration_types && details.decoration_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>{t('serviceFields.event_decoration.decoration_types')}:</strong>
                <span>{translateAndJoin(details.decoration_types, 'decorationTypes', t)}</span>
              </div>
            )}
            {details.magnets && (
              <div className="detail-item">
                <strong>{t('serviceFields.event_decoration.magnets')}:</strong>
                <span>{t('common.yes')}</span>
              </div>
            )}
          </>
        )}

        {/* === MOVING === */}
        {provider.serviceType === 'moving' && (
          <>
            {(details.avoda_ivrit === 'עבודה עברית' || (Array.isArray(details.avoda_ivrit) && details.avoda_ivrit.includes('עבודה עברית'))) && (
              <div className="detail-item">
                <strong>{t('provider.details.avodaIvrit')}:</strong>
                <span>{t('common.yes')}</span>
              </div>
            )}
            {(details.packing_materials === 'כן' || (Array.isArray(details.packing_materials) && details.packing_materials.includes('כן'))) && (
              <div className="detail-item">
                <strong>{t('provider.details.packingMaterials')}:</strong>
                <span>{t('common.yes')}</span>
              </div>
            )}
            {(details.crane_services === 'כן' || (Array.isArray(details.crane_services) && details.crane_services.includes('כן'))) && (
              <div className="detail-item">
                <strong>{t('provider.details.craneServices')}:</strong>
                <span>{t('common.yes')}</span>
              </div>
            )}
            {(details.cardboard_supply === 'כן' || (Array.isArray(details.cardboard_supply) && details.cardboard_supply.includes('כן'))) && (
              <div className="detail-item">
                <strong>{t('provider.details.cardboardSupply')}:</strong>
                <span>{t('common.yes')}</span>
              </div>
            )}
          </>
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
          <div className="provider-hero-content">
          <div className="provider-main-info">
  {/* Logo service - à droite */}
  <div className="hero-service-logo">
    <div className="hero-logo-wrapper">
      <img src={serviceIconUrl} alt={provider.serviceType} />
    </div>
    <span>{t(`services.${provider.serviceType}`)}</span>
  </div>

  {/* Contenu central */}
  <div className="hero-center-content">
    <h1 className="provider-name">{provider.name}</h1>

    <div className="provider-rating-location">
      <div className="rating">
        <Star fill="#fbbf24" color="#fbbf24" size={20} />
        {reviews.length > 0 && formatRating(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) ? (
          <>
            <span className="rating-score">{formatRating(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)}</span>
            <span className="reviews-count">({reviews.length} {t('provider.reviews')})</span>
          </>
        ) : (
          <span className="reviews-count">{reviews.length} {t('provider.reviews')}</span>
        )}
      </div>
    </div>

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

    <div className="hero-actions-wrapper">
      {provider.phone && (
        <div className="contact-info">
          <Phone size={16} />
          <span className="phone-number">{provider.phone}</span>
        </div>
      )}
      <div className="hero-buttons-grid">
        <button onClick={() => window.location.href = `tel:${provider.phone}`} className="btn btn-primary btn-large hero-btn">
          <Phone size={18} />
          {t('provider.callNow')}
        </button>
        <button className="review-action-btn hero-btn" onClick={handleOpenReviewModal}>
          <MessageCircle size={16} />
          <span>{t('card.leaveReview')}</span>
        </button>
        <button onClick={() => window.open(`https://wa.me/972${provider.phone?.replace(/^0/, '')}`, '_blank')} className="btn btn-success btn-large hero-btn">
          <MessageCircle size={18} />
          {t('provider.sendWhatsapp')}
        </button>
      </div>
    </div>
  </div>

  {/* Photo de profil - à gauche */}
  <div className="provider-image-section">
    <div className="image-wrapper">
      {(provider.media?.profileImage || provider.profile_image) && !profileImageError ? (
        <img
          src={(() => {
            const img = provider.media?.profileImage || provider.profile_image;
            const src = img.startsWith('http') ? img : `${(import.meta.env.VITE_API_URL || 'https://homesherut-backend.onrender.com').replace('/api', '')}/${img.replace(/\\/g, '/').replace(/^\/+/, '')}`;
            return src;
          })()}
          alt={provider.name}
          className="provider-image"
          onError={(e) => {
            setProfileImageError(true);
          }}
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

{provider.media?.gallery?.length > 0 && (
  <div className="service-details-section">
  <h3 className="details-title" style={{ textAlign: 'start' }}>{t('provider.gallery')}</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
      {provider.media.gallery.map((url, i) => (
        <img key={i} src={url} alt={`תמונה ${i + 1}`} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '8px' }} />
      ))}
    </div>
  </div>
)}
               {/* Certifications */}
{provider.certifications && provider.certifications.length > 0 && provider.serviceType !== 'eldercare' && provider.serviceType !== 'laundry' && (
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
                            {reviews.length > 0 && formatRating(reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0) / reviews.length) ? (
                              <>
                                <span className="rating-number">{formatRating(reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0) / reviews.length)}</span>
                                <span className="rating-out-of">/10</span>
                              </>
                            ) : null}
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
                                          {review.quality_rating ? (
                                            <div className="review-categories-inline">
                                              <span className="cat-score">{t('review.categories.quality')}: <strong>{review.quality_rating}/10</strong></span>
                                              <span className="cat-score">{t('review.categories.price')}: <strong>{review.price_rating}/10</strong></span>
                                              <span className="cat-score">{t('review.categories.availability')}: <strong>{review.availability_rating}/10</strong></span>
                                              <span className="cat-score">{t('review.categories.professionalism')}: <strong>{review.professionalism_rating}/10</strong></span>
                                            </div>
                                          ) : null}
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
                                  <div className="review-content">
                                    <p>{review.comment}</p>
                                  </div>
                                  </div>
                                </div>

{/* Réponse prestataire */}
{(review.provider_response || review.providerResponse) && (
  <div className="provider-response">
    <div className="provider-response-header">
      <img
        src={(() => {
          const img = provider.media?.profileImage || provider.profile_image;
          if (!img) return null;
          if (img.startsWith('http')) return img;
          const base = (import.meta.env.VITE_API_URL || 'https://homesherut-backend.onrender.com').replace('/api', '');
          return `${base}/${img.replace(/\\/g, '/').replace(/^\/+/, '')}`;
        })()}
        alt={provider.name}
        className="provider-response-avatar-img"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <div className="provider-response-meta">
        <span className="provider-response-name">
          {t('provider.reviews.responseFrom')} {provider.name}
        </span>
        <span className="provider-response-date">
          {new Date(
            review.provider_response?.createdAt ||
            review.provider_response?.created_at ||
            review.providerResponse?.createdAt
          ).toLocaleDateString('he-IL')}
        </span>
      </div>
      <div className="response-badge">
        <MessageCircle size={12} />
        <span>{t('provider.reviews.providerResponse')}</span>
      </div>
    </div>
    <p className="provider-response-text">
      {review.provider_response?.responseText ||
       review.provider_response?.response_text ||
       review.providerResponse?.responseText ||
       review.providerResponse}
    </p>
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