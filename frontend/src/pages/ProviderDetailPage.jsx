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
         <span>{Array.isArray(details.languages) ? translateAndJoin(details.languages, 'languages', t) : translateValue(details.languages, 'languages', t)}</span>
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
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
            {details.work_types?.includes('התקנת מזגנים') && details.installation_types && details.installation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>❄️ {t('provider.details.acInstallation')}:</strong>
             <span>{translateAndJoin(details.installation_types, 'acInstallation', t)}</span>
              </div>
            )}
            {details.work_types?.includes('תיקון מזגנים') && details.repair_types && details.repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.acRepair')}:</strong>
             <span>{translateAndJoin(details.repair_types, 'acRepair', t)}</span>
              </div>
            )}
            {details.work_types?.includes('פירוק והרכבת מזגנים') && details.disassembly_types && details.disassembly_types.length > 0 && (
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
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
            {details.work_types?.includes('עיצובים בגבס') && details.design_types && details.design_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🎨 {t('provider.details.drywallDesigns')}:</strong>
             <span>{translateAndJoin(details.design_types, 'drywallDesign', t)}</span>
              </div>
            )}
            {details.work_types?.includes('עבודות גבס') && details.construction_types && details.construction_types.length > 0 && (
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
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
            {details.work_types?.includes('בניית רהיטים') && details.furniture_building_types && details.furniture_building_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🪑 {t('provider.details.furnitureBuilding')}:</strong>
               <span>{translateAndJoin(details.furniture_building_types, 'carpentryFurnitureBuilding', t)}</span>
              </div>
            )}
            {details.work_types?.includes('תיקון רהיטים') && details.furniture_repair_types && details.furniture_repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.furnitureRepair')}:</strong>
               <span>{translateAndJoin(details.furniture_repair_types, 'carpentryFurnitureRepair', t)}</span>
              </div>
            )}
            {details.work_types?.includes('עבודות נגרות אחרות') && details.other_carpentry_types && details.other_carpentry_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🪵 {t('provider.details.otherCarpentry')}:</strong>
               <span>{translateAndJoin(details.other_carpentry_types, 'carpentryOther', t)}</span>
              </div>
            )}
            {details.work_types?.includes('נגרות חוץ') && (
              <>
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
          </>
        )}

        {/* === HOME_ORGANIZATION === */}
        {provider.serviceType === 'home_organization' && (
          <>
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
            {details.hourlyRate && (
              <div className="detail-item">
                <strong>{t('provider.details.hourlyRate')}:</strong>
                <span className="price-highlight">₪{details.hourlyRate}/שעה</span>
              </div>
            )}
            {details.work_types?.includes('סידור כללי') && details.general_organization_types && details.general_organization_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏠 {t('provider.details.generalOrganization')}:</strong>
              <span>{translateAndJoin(details.general_organization_types, 'homeOrgGeneral', t)}</span>
              </div>
            )}
            {details.work_types?.includes('סידור + מיון') && details.sorting_types && details.sorting_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>📦 {t('provider.details.sortingOrganization')}:</strong>
              <span>{translateAndJoin(details.sorting_types, 'homeOrgSorting', t)}</span>
              </div>
            )}
            {details.work_types?.includes('ארגון מקצועי') && details.professional_organization_types && details.professional_organization_types.length > 0 && (
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
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
            {details.work_types?.includes('השכרת ציוד לאירועים') && (
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
              </>
            )}
            {details.work_types?.includes('סוגי ההפעלה') && details.entertainment_types && details.entertainment_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🎭 {t('provider.details.entertainmentTypes')}:</strong>
               <span>{translateAndJoin(details.entertainment_types, 'eventEntertainment', t)}</span>
              </div>
            )}
            {details.work_types?.includes('אחר') && details.other_types && details.other_types.length > 0 && (
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
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
            {details.work_types?.includes('סוג המטבח') && details.cuisine_types && details.cuisine_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🍳 {t('provider.details.cuisineTypes')}:</strong>
              <span>{translateAndJoin(details.cuisine_types, 'chefCuisine', t)}</span>
              </div>
            )}
            {details.work_types?.includes('כשרות') && details.kosher_types && details.kosher_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>✡️ {t('provider.details.kosherTypes')}:</strong>
<span>{translateAndJoin(details.kosher_types, 'chefKosher', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === PAINTING === */}
        {provider.serviceType === 'painting' && (
          <>
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
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
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
            {details.work_types?.includes('עבודות שלד') && details.structure_work_types && details.structure_work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏗️ {t('provider.details.structureWork')}:</strong>
               <span>{translateAndJoin(details.structure_work_types, 'contractorStructure', t)}</span>
              </div>
            )}
            {details.work_types?.includes('שיפוצים כלליים') && details.general_renovation_types && details.general_renovation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔨 {t('provider.details.generalRenovation')}:</strong>
               <span>{translateAndJoin(details.general_renovation_types, 'contractorRenovation', t)}</span>
              </div>
            )}
            {details.work_types?.includes('חשמל ואינסטלציה') && details.electric_plumbing_types && details.electric_plumbing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>⚡ {t('provider.details.electricPlumbing')}:</strong>
<span>{translateAndJoin(details.electric_plumbing_types, 'contractorElectricPlumbing', t)}</span>
              </div>
            )}
            {details.work_types?.includes('עבודות חוץ') && details.exterior_work_types && details.exterior_work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🌳 {t('provider.details.exteriorWork')}:</strong>
               <span>{translateAndJoin(details.exterior_work_types, 'contractorExterior', t)}</span>
              </div>
            )}
            {details.work_types?.includes('שיקום ותיקון חוץ') && details.facade_repair_types && details.facade_repair_types.length > 0 && (
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
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
            {details.work_types?.includes('roofWaterproofing') && details.roof_waterproofing_types && details.roof_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏠 {t('provider.details.roofWaterproofing')}:</strong>
               <span>{translateAndJoin(details.roof_waterproofing_types, 'waterproofingRoof', t)}</span>
              </div>
            )}
            {details.work_types?.includes('wallWaterproofing') && details.wall_waterproofing_types && details.wall_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🧱 {t('provider.details.wallWaterproofing')}:</strong>
               <span>{translateAndJoin(details.wall_waterproofing_types, 'waterproofingWall', t)}</span>
              </div>
            )}
            {details.work_types?.includes('balconyWaterproofing') && details.balcony_waterproofing_types && details.balcony_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🌿 {t('provider.details.balconyWaterproofing')}:</strong>
               <span>{translateAndJoin(details.balcony_waterproofing_types, 'waterproofingBalcony', t)}</span>
              </div>
            )}
            {details.work_types?.includes('wetRoomWaterproofing') && details.wet_room_waterproofing_types && details.wet_room_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🚿 {t('provider.details.wetRoomWaterproofing')}:</strong>
              <span>{translateAndJoin(details.wet_room_waterproofing_types, 'waterproofingWetRoom', t)}</span>
              </div>
            )}
            {details.work_types?.includes('undergroundWaterproofing') && details.underground_waterproofing_types && details.underground_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>⬇️ {t('provider.details.undergroundWaterproofing')}:</strong>
               <span>{translateAndJoin(details.underground_waterproofing_types, 'waterproofingUnderground', t)}</span>
              </div>
            )}
            {details.work_types?.includes('inspectionEquipment') && details.inspection_equipment_types && details.inspection_equipment_types.length > 0 && (
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
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
            {details.work_types?.includes('חלונות ודלתות') && details.windows_doors_types && details.windows_doors_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🪟 {t('provider.details.aluminumWindowsDoors')}:</strong>
               <span>{translateAndJoin(details.windows_doors_types, 'aluminumWindowsDoors', t)}</span>
              </div>
            )}
            {details.work_types?.includes('פרגולות ואלומיניום חוץ') && details.pergolas_outdoor_types && details.pergolas_outdoor_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏕️ {t('provider.details.aluminumPergolas')}:</strong>
                <span>{translateAndJoin(details.pergolas_outdoor_types, 'aluminumPergolas', t)}</span>
              </div>
            )}
            {details.work_types?.includes('תיקונים ושירות') && details.repairs_service_types && details.repairs_service_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.aluminumRepairs')}:</strong>
               <span>{translateAndJoin(details.repairs_service_types, 'aluminumRepairs', t)}</span>
              </div>
            )}
            {details.work_types?.includes('חיפויי אלומיניום') && details.cladding_types && details.cladding_types.length > 0 && (
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
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
            {details.work_types?.includes('זכוכית למקלחונים') && details.shower_glass_types && details.shower_glass_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🚿 {t('provider.details.showerGlass')}:</strong>
                <span>{translateAndJoin(details.shower_glass_types, 'glassShower', t)}</span>
              </div>
            )}
            {details.work_types?.includes('זכוכית לחלונות ודלתות') && details.windows_doors_glass_types && details.windows_doors_glass_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🪟 {t('provider.details.windowsDoorsGlass')}:</strong>
               <span>{translateAndJoin(details.windows_doors_glass_types, 'glassWindowsDoors', t)}</span>
              </div>
            )}
            {details.work_types?.includes('זכוכית למטבח ובית') && details.kitchen_home_glass_types && details.kitchen_home_glass_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏠 {t('provider.details.kitchenHomeGlass')}:</strong>
               <span>{translateAndJoin(details.kitchen_home_glass_types, 'glassKitchenHome', t)}</span>
              </div>
            )}
            {details.work_types?.includes('זכוכית מיוחדת ובטיחות') && details.special_safety_glass_types && details.special_safety_glass_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🛡️ {t('provider.details.specialSafetyGlass')}:</strong>
               <span>{translateAndJoin(details.special_safety_glass_types, 'glassSpecialSafety', t)}</span>
              </div>
            )}
            {details.work_types?.includes('שירותי תיקון והתאמה אישית') && details.repair_custom_types && details.repair_custom_types.length > 0 && (
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
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
            {details.work_types?.includes('החלפת מנעולים') && details.lock_replacement_types && details.lock_replacement_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔐 {t('provider.details.lockReplacement')}:</strong>
               <span>{translateAndJoin(details.lock_replacement_types, 'locksmithLockReplacement', t)}</span>
              </div>
            )}
            {details.work_types?.includes('פתיחת דלתות') && details.door_opening_types && details.door_opening_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🚪 {t('provider.details.doorOpening')}:</strong>
                <span>{translateAndJoin(details.door_opening_types, 'locksmithDoorOpening', t)}</span>
              </div>
            )}
            {details.work_types?.includes('התקנת מערכות נעילה') && details.lock_system_installation_types && details.lock_system_installation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>⚙️ {t('provider.details.lockSystemInstallation')}:</strong>
                <span>{translateAndJoin(details.lock_system_installation_types, 'locksmithSystems', t)}</span>
              </div>
            )}
            {details.work_types?.includes('תיקון מנעולים ודלתות') && details.lock_door_repair_types && details.lock_door_repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.lockDoorRepair')}:</strong>
                <span>{translateAndJoin(details.lock_door_repair_types, 'locksmithRepairs', t)}</span>
              </div>
            )}
            {details.work_types?.includes('שירותי ביטחון') && details.security_services_types && details.security_services_types.length > 0 && (
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
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
            {details.work_types?.includes('התקנת צנרת גז בבית') && details.installation_types && details.installation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔥 {t('provider.details.gasInstallation')}:</strong>
               <span>{translateAndJoin(details.installation_types, 'gasInstallation', t)}</span>
              </div>
            )}
            {details.work_types?.includes('תיקוני גז בבית') && details.repair_types && details.repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.gasRepairs')}:</strong>
              <span>{translateAndJoin(details.repair_types, 'gasRepair', t)}</span>
              </div>
            )}
          </>
        )}

    {/* TUTORING - Subjects groupés par catégorie */}
        {provider.serviceType === 'tutoring' && details.subjects && details.subjects.length > 0 && (
          <>
            {/* Musique */}
            {(() => {
              const musicSubjects = ['פסנתר', 'גיטרה', 'כינור / ויולה / צ׳לו', 'תופים / כלי הקשה', 'חליל, קלרינט, סקסופון, חצוצרה', 'נבל', 'פיתוח קול / שירה'];
              const selected = details.subjects.filter(s => musicSubjects.includes(s));
              return selected.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>🎵 {t('filters.tutoring.music')}:</strong>
                  <span>{selected.join(', ')}</span>
                </div>
              );
            })()}
            
            {/* Art */}
            {(() => {
              const artSubjects = ['ציור (שמן, אקריליק, צבעי מים)', 'רישום', 'פיסול', 'צילום', 'גרפיקה / עיצוב חזותי', 'קליגרפיה', 'קרמיקה / פסיפס'];
              const selected = details.subjects.filter(s => artSubjects.includes(s));
              return selected.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>🎨 {t('filters.tutoring.art')}:</strong>
                  <span>{selected.join(', ')}</span>
                </div>
              );
            })()}
            
            {/* Danse */}
            {(() => {
              const danceSubjects = ['בלט קלאסי', 'מחול מודרני / עכשווי', 'מחול עממי', 'ג׳אז / היפ הופ', 'ריקודים סלוניים'];
              const selected = details.subjects.filter(s => danceSubjects.includes(s));
              return selected.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>💃 {t('filters.tutoring.dance')}:</strong>
                  <span>{selected.join(', ')}</span>
                </div>
              );
            })()}
            
            {/* Théâtre */}
            {(() => {
              const theaterSubjects = ['משחק', 'אילתור / מִים', 'מחזות זמר', 'דיבור בפני קהל / דקלום'];
              const selected = details.subjects.filter(s => theaterSubjects.includes(s));
              return selected.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>🎭 {t('filters.tutoring.theater')}:</strong>
                  <span>{selected.join(', ')}</span>
                </div>
              );
            })()}
            
            {/* Langues */}
            {(() => {
              const languageSubjects = ['אנגלית', 'צרפתית', 'ספרדית', 'רוסית', 'ערבית', 'סדנאות שיחה', 'ספרות ותרבות'];
              const selected = details.subjects.filter(s => languageSubjects.includes(s));
              return selected.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>🌍 {t('filters.tutoring.languages')}:</strong>
                  <span>{selected.join(', ')}</span>
                </div>
              );
            })()}
            
            {/* Artisanat */}
            {(() => {
              const craftsSubjects = ['תפירה / סריגה / קרושה', 'רקמה', 'תכשיטנות', 'עץ / נגרות', 'יצירה חופשית'];
              const selected = details.subjects.filter(s => craftsSubjects.includes(s));
              return selected.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>✂️ {t('filters.tutoring.crafts')}:</strong>
                  <span>{selected.join(', ')}</span>
                </div>
              );
            })()}
            
            {/* Tech */}
            {(() => {
              const techSubjects = ['מחשבים / קידוד', 'רובוטיקה', 'הדפסה תלת־ממדית', 'אלקטרוניקה בסיסית', 'ניסויים מדעיים לילדים'];
              const selected = details.subjects.filter(s => techSubjects.includes(s));
              return selected.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>💻 {t('filters.tutoring.tech')}:</strong>
                  <span>{selected.join(', ')}</span>
                </div>
              );
            })()}
            
            {/* Cuisine */}
            {(() => {
              const cookingSubjects = ['בישול', 'אפייה', 'קונדיטוריה', 'עיצוב עוגות'];
              const selected = details.subjects.filter(s => cookingSubjects.includes(s));
              return selected.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>👨‍🍳 {t('filters.tutoring.cooking')}:</strong>
                  <span>{selected.join(', ')}</span>
                </div>
              );
            })()}
            
            {/* Développement personnel */}
            {(() => {
              const personalSubjects = ['דיבור מול קהל', 'מנהיגות / העצמה אישית', 'מיינדפולנס / מדיטציה', 'ארגון וניהול זמן', 'טכניקות למידה'];
              const selected = details.subjects.filter(s => personalSubjects.includes(s));
              return selected.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>🧘 {t('filters.tutoring.personal')}:</strong>
                  <span>{selected.join(', ')}</span>
                </div>
              );
            })()}
            
            {/* Sports */}
            {(() => {
              const sportsSubjects = ['כדורגל', 'כדורסל', 'כדורעף', 'טניס', 'טניס שולחן', 'סקווש / בדמינטון', 'שחייה', 'אתלטיקה', 'התעמלות קרקע / מכשירים', 'רכיבה על אופניים', 'ג׳ודו', 'קראטה', 'טאקוונדו', 'אייקידו', 'היאבקות', 'אומנויות לחימה משולבות', 'קרב מגע', 'קפוארה', 'טיפוס קירות', 'סקייטבורד / גלגיליות'];
              const selected = details.subjects.filter(s => sportsSubjects.includes(s));
              return selected.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>⚽ {t('filters.tutoring.sports')}:</strong>
                  <span>{selected.join(', ')}</span>
                </div>
              );
            })()}
            
            {/* Matières académiques */}
            {(() => {
              const academicSubjects = ['מתמטיקה', 'פיזיקה', 'כימיה', 'ביולוגיה', 'מדעי המחשב', 'סטטיסטיקה והסתברות', 'גיאומטריה', 'היסטוריה', 'גיאוגרפיה', 'אזרחות', 'כלכלה', 'פסיכולוגיה', 'סוציולוגיה', 'פילוסופיה', 'עברית / ספרות', 'תנ״ך', 'ערבית', 'לשון עברית'];
              const selected = details.subjects.filter(s => academicSubjects.includes(s));
              return selected.length > 0 && (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <strong>📚 {t('filters.tutoring.academicSubjects')}:</strong>
                  <span>{selected.join(', ')}</span>
                </div>
              );
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
        {provider.serviceType === 'electrician' && (
          <>
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
          </>
        )}

        {/* ELECTRICIAN - Types groupés par catégorie */}
        {provider.serviceType === 'electrician' && (
          <>
            {/* Réparations */}
            {details.work_types?.includes('תיקונים') && details.repair_types && details.repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.electricianRepairs')}:</strong>
               <span>{translateAndJoin(details.repair_types, 'electricianRepairs', t)}</span>
              </div>
            )}
            
            {/* Installations */}
            {details.work_types?.includes('התקנות') && details.installation_types && details.installation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>⚡ {t('provider.details.electricianInstallations')}:</strong>
             <span>{translateAndJoin(details.installation_types, 'electricianInstallations', t)}</span>
              </div>
            )}
            
            {/* Gros travaux */}
            {details.work_types?.includes('עבודות חשמל גדולות') && details.large_work_types && details.large_work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏗️ {t('provider.details.electricianLargeWork')}:</strong>
            <span>{translateAndJoin(details.large_work_types, 'electricianLargeWork', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === PLUMBING - CHAMPS COMPACTS === */}
        {provider.serviceType === 'plumbing' && (
          <>
            {details.age && (
              <div className="detail-item">
                <strong>{t('provider.details.age')}:</strong>
                <span>{details.age} {t('provider.details.years')}</span>
              </div>
            )}
          </>
        )}

        {/* PLUMBING - Types groupés par catégorie */}
        {provider.serviceType === 'plumbing' && (
          <>
            {/* Bouchons/Blocages */}
            {details.work_types?.includes('סתימות') && details.blockage_types && details.blockage_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🚿 {t('provider.details.plumbingBlockages')}:</strong>
          <span>{translateAndJoin(details.blockage_types, 'plumbingBlockages', t)}</span>
              </div>
            )}
            
            {/* Réparation tuyauterie */}
            {details.work_types?.includes('תיקון צנרת') && details.pipe_repair_types && details.pipe_repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🔧 {t('provider.details.plumbingPipeRepair')}:</strong>
             <span>{translateAndJoin(details.pipe_repair_types, 'plumbingPipeRepair', t)}</span>
              </div>
            )}
            
            {/* Gros travaux */}
            {details.work_types?.includes('עבודות גדולות') && details.large_work_types && details.large_work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🏗️ {t('provider.details.plumbingLargeWork')}:</strong>
            <span>{translateAndJoin(details.large_work_types, 'plumbingLargeWork', t)}</span>
              </div>
            )}
            
            {/* Équipements sanitaires */}
            {details.work_types?.includes('תיקון והתקנת אביזרי אינסטלציה') && details.fixture_types && details.fixture_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <strong>🚽 {t('provider.details.plumbingFixtures')}:</strong>
           <span>{translateAndJoin(details.fixture_types, 'plumbingFixtures', t)}</span>
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