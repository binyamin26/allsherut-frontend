import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AuthModal from '../components/auth/AuthModal';
import ReviewModal from '../components/modals/ReviewModal';
import apiService from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { translateValue, translateAndJoin, translateArrayFromMultipleCategories } from '../utils/translationMapper';
import { TUTORING_SUBCATEGORIES } from '../data/subcategoriesData';
import {
  MapPin, Clock, Phone, Mail, CheckCircle, Award,
  Calendar, MessageCircle, ThumbsUp, User, Shield, Heart,
  ChevronLeft, Send, AlertCircle,
  Wrench, HardHat, Snowflake, Palette, RotateCcw, Sofa,
  TreePine, Home, Package, Sparkles, Headphones, Wind, Star,
  Gift, ChefHat, Paintbrush, Hammer, Zap, Trees, Building2,
  Leaf, Droplets, ArrowDown, Search, Square, Lock, DoorOpen,
  Settings, Flame, ClipboardList, Bug, BookOpen, Trophy, Sun
} from 'lucide-react';

const AVATAR_GRADIENTS = [
  'linear-gradient(145deg, #2563EB 0%, #1E3A8A 100%)',
  'linear-gradient(145deg, #0D9488 0%, #0F766E 100%)',
  'linear-gradient(145deg, #EA580C 0%, #C2410C 100%)',
  'linear-gradient(145deg, #7C3AED 0%, #5B21B6 100%)',
  'linear-gradient(145deg, #BE185D 0%, #9D174D 100%)',
  'linear-gradient(145deg, #0369A1 0%, #075985 100%)',
];

const getAvatarGradient = (name) => {
  if (!name) return AVATAR_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

const getInitial = (name) => {
  if (!name) return '?';
  return name.trim()[0] || '?';
};

const IconLabel = ({ icon: Icon, color, bg, children }) => (
  <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: '26px', height: '26px', borderRadius: '7px', background: bg, flexShrink: 0,
    }}>
      <Icon size={14} color={color} strokeWidth={2.5} />
    </span>
    {children}
  </strong>
);

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
  const [pricing, setPricing] = useState([]);
  const [activeSection, setActiveSection] = useState('details');

  // Scroll-spy refs
  const detailsRef = useRef(null);
  const galleryRef = useRef(null);
  const pricingRef = useRef(null);
  const reviewsRef = useRef(null);
  const navRef = useRef(null);

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
    cleaning: '/images/logo nikayon.jpg',
    gardening: '/images/logo jardinage.jpg',
    petcare: '/images/logo chien.jpg',
    tutoring: '/images/logo cours particulier.jpg',
    sports_activities: '/images/logo sport.jpg',
    eldercare: '/images/logo kachich.png',
    laundry: '/images/logo kvissa.png',
    electrician: '/images/logo electricien.jpg',
    plumbing: '/images/logo plomberie.jpg',
    air_conditioning: '/images/logo clim.jpg',
    gas_technician: '/images/logo gaz.jpg',
    drywall: '/images/logo placo.jpg',
    carpentry: '/images/logo menuisier.jpg',
    property_management: '/images/logo nihoul dirot.jpg',
    home_organization: '/images/logo rangement.jpg',
    painting: '/images/logo peinture.jpg',
    private_chef: '/images/logo chef.jpg',
    event_entertainment: '/images/logo event.png',
    dj: '/images/logo DJ.jpg',
    waterproofing: '/images/logo itoum.jpg',
    contractor: '/images/logo kablan.jpg',
    aluminum: '/images/logo aluminium.jpg',
    glass_works: '/images/logo verre.jpg',
    locksmith: '/images/logo serrure.jpg',
    moving: '/images/logo d.jpg',
    event_decoration: '/images/logo deco.jpg',
    pest_control: '/images/logo desinctisation.jpg',
    handyman: '/images/logo indimane.jpg',
    photographer: '/images/logo photographe.jpg',
    mechanic: '/images/logo garagiste.jpg',
    metalwork: '/images/logo fer.jpg',
    driver: '/images/logo driver.jpg'
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

  // Scroll-spy: highlight active nav tab based on visible section
  useEffect(() => {
    if (!provider) return;
    const sections = [
      { ref: detailsRef, id: 'details' },
      { ref: galleryRef, id: 'gallery' },
      { ref: pricingRef, id: 'pricing' },
      { ref: reviewsRef, id: 'reviews' },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, [provider]);

  const scrollToSection = (ref) => {
    if (!ref.current) return;
    const navHeight = (navRef.current?.offsetHeight || 56) + 80 + 8;
    const top = ref.current.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  };

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
      // Charger les tarifs du prestataire
      if (providerResponse.data?.id) {
        fetch(`/api/pricing/provider/${providerResponse.data.id}`)
          .then(r => r.json())
          .then(d => { if (d.success) setPricing(d.data || []); })
          .catch(() => {});
      }
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
        {['tutoring', 'sports_activities', 'babysitting', 'petcare', 'eldercare', 'event_entertainment', 'dj'].includes(provider.serviceType) && (details.availableDays || details.availability_days) && (details.availableDays?.length > 0 || details.availability_days?.length > 0) && (
          <div className="detail-item">
           <strong>{t('provider.details.availableDays')}:</strong>
        <span>{translateAndJoin(sortDays(details.availableDays || details.availability_days), 'days', t)}</span>
          </div>
        )}

        {/* Disponibilité heures */}
        {['tutoring', 'sports_activities', 'babysitting', 'petcare', 'eldercare', 'event_entertainment', 'dj'].includes(provider.serviceType) && (details.availableHours || details.availability_hours) && (details.availableHours?.length > 0 || details.availability_hours?.length > 0) && (
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
                <IconLabel icon={Snowflake} color="#0891B2" bg="#ECFEFF">{t('provider.details.acInstallation')}:</IconLabel>
             <span>{translateAndJoin(details.installation_types, 'acInstallation', t)}</span>
              </div>
            )}
            {details.repair_types && details.repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Wrench} color="#2563EB" bg="#EFF6FF">{t('provider.details.acRepair')}:</IconLabel>
             <span>{translateAndJoin(details.repair_types, 'acRepair', t)}</span>
              </div>
            )}
            {details.disassembly_types && details.disassembly_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={RotateCcw} color="#6366F1" bg="#EEF2FF">{t('provider.details.acDisassembly')}:</IconLabel>
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
                <IconLabel icon={Palette} color="#BE185D" bg="#FDF2F8">{t('provider.details.drywallDesigns')}:</IconLabel>
             <span>{translateAndJoin(details.design_types, 'drywallDesign', t)}</span>
              </div>
            )}
            {details.construction_types && details.construction_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={HardHat} color="#7C3AED" bg="#F5F3FF">{t('provider.details.drywallConstruction')}:</IconLabel>
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
                <IconLabel icon={Sofa} color="#92400E" bg="#FFFBEB">{t('provider.details.furnitureBuilding')}:</IconLabel>
               <span>{translateAndJoin(details.furniture_building_types, 'carpentryFurnitureBuilding', t)}</span>
              </div>
            )}
            {details.furniture_repair_types && details.furniture_repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Wrench} color="#2563EB" bg="#EFF6FF">{t('provider.details.furnitureRepair')}:</IconLabel>
               <span>{translateAndJoin(details.furniture_repair_types, 'carpentryFurnitureRepair', t)}</span>
              </div>
            )}
            {details.other_carpentry_types && details.other_carpentry_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={TreePine} color="#059669" bg="#ECFDF5">{t('provider.details.otherCarpentry')}:</IconLabel>
               <span>{translateAndJoin(details.other_carpentry_types, 'carpentryOther', t)}</span>
              </div>
            )}
            {details.pergola_types && details.pergola_types.length > 0 && (
                  <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <IconLabel icon={TreePine} color="#059669" bg="#ECFDF5">{t('provider.details.pergolas')}:</IconLabel>
                    <span>{translateAndJoin(details.pergola_types, 'carpentryPergolas', t)}</span>
                  </div>
                )}
                {details.deck_types && details.deck_types.length > 0 && (
                  <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <IconLabel icon={TreePine} color="#059669" bg="#ECFDF5">{t('provider.details.decks')}:</IconLabel>
                   <span>{translateAndJoin(details.deck_types, 'carpentryDecks', t)}</span>
                  </div>
                )}
                {details.fence_types && details.fence_types.length > 0 && (
                  <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <IconLabel icon={Hammer} color="#7C3AED" bg="#F5F3FF">{t('provider.details.fences')}:</IconLabel>
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
                <IconLabel icon={Home} color="#2563EB" bg="#EFF6FF">{t('provider.details.generalOrganization')}:</IconLabel>
              <span>{translateAndJoin(details.general_organization_types, 'homeOrgGeneral', t)}</span>
              </div>
            )}
            {details.sorting_types && details.sorting_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Package} color="#7C3AED" bg="#F5F3FF">{t('provider.details.sortingOrganization')}:</IconLabel>
              <span>{translateAndJoin(details.sorting_types, 'homeOrgSorting', t)}</span>
              </div>
            )}
            {details.professional_organization_types && details.professional_organization_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Sparkles} color="#BE185D" bg="#FDF2F8">{t('provider.details.professionalOrganization')}:</IconLabel>
               <span>{translateAndJoin(details.professional_organization_types, 'homeOrgProfessional', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === EVENT_ENTERTAINMENT === */}
        {['event_entertainment', 'dj'].includes(provider.serviceType) && (
          <>
            {details.dj_event_types && details.dj_event_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Headphones} color="#2563EB" bg="#EFF6FF">{t('serviceFields.dj.dj_event_types')}:</IconLabel>
                <span>{translateAndJoin(details.dj_event_types, 'chefEventType', t)}</span>
              </div>
            )}
            {details.food_machine_types && details.food_machine_types.length > 0 && (
                  <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <IconLabel icon={ChefHat} color="#EA580C" bg="#FFF7ED">{t('provider.details.foodMachines')}:</IconLabel>
                <span>{translateAndJoin(details.food_machine_types, 'eventFoodMachines', t)}</span>
                  </div>
                )}
                {details.inflatable_game_types && details.inflatable_game_types.length > 0 && (
                  <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <IconLabel icon={Star} color="#D97706" bg="#FFFBEB">{t('provider.details.inflatables')}:</IconLabel>
                    <span>{translateAndJoin(details.inflatable_game_types, 'eventInflatableGames', t)}</span>
                  </div>
                )}
                {details.effect_machine_types && details.effect_machine_types.length > 0 && (
                  <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                    <IconLabel icon={Wind} color="#0891B2" bg="#ECFEFF">{t('provider.details.effectMachines')}:</IconLabel>
<span>{translateAndJoin(details.effect_machine_types, 'eventEffectMachines', t)}</span>
                  </div>
                )}
            {details.entertainment_types && details.entertainment_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Star} color="#BE185D" bg="#FDF2F8">{t('provider.details.entertainmentTypes')}:</IconLabel>
               <span>{translateAndJoin(details.entertainment_types, 'eventEntertainment', t)}</span>
              </div>
            )}
            {details.other_types && details.other_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Gift} color="#BE185D" bg="#FDF2F8">{t('provider.details.otherEventServices')}:</IconLabel>
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
                <IconLabel icon={Gift} color="#BE185D" bg="#FDF2F8">{t('provider.details.eventTypes')}:</IconLabel>
                <span>{translateAndJoin(details.event_types, 'chefEventType', t)}</span>
              </div>
            )}
            {details.cuisine_types && details.cuisine_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={ChefHat} color="#EA580C" bg="#FFF7ED">{t('provider.details.cuisineTypes')}:</IconLabel>
              <span>{translateAndJoin(details.cuisine_types, 'chefCuisine', t)}</span>
              </div>
            )}
            {details.kosher_types && details.kosher_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Star} color="#EA580C" bg="#FFF7ED">{t('provider.details.kosherTypes')}:</IconLabel>
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
                <IconLabel icon={Paintbrush} color="#BE185D" bg="#FDF2F8">{t('provider.details.paintingServices')}:</IconLabel>
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
                <IconLabel icon={HardHat} color="#7C3AED" bg="#F5F3FF">{t('provider.details.structureWork')}:</IconLabel>
               <span>{translateAndJoin(details.structure_work_types, 'contractorStructure', t)}</span>
              </div>
            )}
            {details.general_renovation_types && details.general_renovation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Hammer} color="#7C3AED" bg="#F5F3FF">{t('provider.details.generalRenovation')}:</IconLabel>
               <span>{translateAndJoin(details.general_renovation_types, 'contractorRenovation', t)}</span>
              </div>
            )}
            {details.electric_plumbing_types && details.electric_plumbing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Zap} color="#D97706" bg="#FFFBEB">{t('provider.details.electricPlumbing')}:</IconLabel>
<span>{translateAndJoin(details.electric_plumbing_types, 'contractorElectricPlumbing', t)}</span>
              </div>
            )}
            {details.exterior_work_types && details.exterior_work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Trees} color="#059669" bg="#ECFDF5">{t('provider.details.exteriorWork')}:</IconLabel>
               <span>{translateAndJoin(details.exterior_work_types, 'contractorExterior', t)}</span>
              </div>
            )}
            {details.facade_repair_types && details.facade_repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Building2} color="#6366F1" bg="#EEF2FF">{t('provider.details.facadeRepair')}:</IconLabel>
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
                <IconLabel icon={Home} color="#0D9488" bg="#F0FDFA">{t('provider.details.roofWaterproofing')}:</IconLabel>
               <span>{translateAndJoin(details.roof_waterproofing_types, 'waterproofingRoof', t)}</span>
              </div>
            )}
            {details.wall_waterproofing_types && details.wall_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Building2} color="#0D9488" bg="#F0FDFA">{t('provider.details.wallWaterproofing')}:</IconLabel>
               <span>{translateAndJoin(details.wall_waterproofing_types, 'waterproofingWall', t)}</span>
              </div>
            )}
            {details.balcony_waterproofing_types && details.balcony_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Leaf} color="#059669" bg="#ECFDF5">{t('provider.details.balconyWaterproofing')}:</IconLabel>
               <span>{translateAndJoin(details.balcony_waterproofing_types, 'waterproofingBalcony', t)}</span>
              </div>
            )}
            {details.wet_room_waterproofing_types && details.wet_room_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Droplets} color="#0D9488" bg="#F0FDFA">{t('provider.details.wetRoomWaterproofing')}:</IconLabel>
              <span>{translateAndJoin(details.wet_room_waterproofing_types, 'waterproofingWetRoom', t)}</span>
              </div>
            )}
            {details.underground_waterproofing_types && details.underground_waterproofing_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={ArrowDown} color="#6366F1" bg="#EEF2FF">{t('provider.details.undergroundWaterproofing')}:</IconLabel>
               <span>{translateAndJoin(details.underground_waterproofing_types, 'waterproofingUnderground', t)}</span>
              </div>
            )}
            {details.inspection_equipment_types && details.inspection_equipment_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Search} color="#6366F1" bg="#EEF2FF">{t('provider.details.inspectionEquipment')}:</IconLabel>
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
                <IconLabel icon={Square} color="#2563EB" bg="#EFF6FF">{t('provider.details.aluminumWindowsDoors')}:</IconLabel>
               <span>{translateAndJoin(details.windows_doors_types, 'aluminumWindowsDoors', t)}</span>
              </div>
            )}
            {details.pergolas_outdoor_types && details.pergolas_outdoor_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={TreePine} color="#059669" bg="#ECFDF5">{t('provider.details.aluminumPergolas')}:</IconLabel>
                <span>{translateAndJoin(details.pergolas_outdoor_types, 'aluminumPergolas', t)}</span>
              </div>
            )}
            {details.repairs_service_types && details.repairs_service_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Wrench} color="#2563EB" bg="#EFF6FF">{t('provider.details.aluminumRepairs')}:</IconLabel>
               <span>{translateAndJoin(details.repairs_service_types, 'aluminumRepairs', t)}</span>
              </div>
            )}
            {details.cladding_types && details.cladding_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={HardHat} color="#7C3AED" bg="#F5F3FF">{t('provider.details.aluminumCladding')}:</IconLabel>
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
                <IconLabel icon={Droplets} color="#0D9488" bg="#F0FDFA">{t('provider.details.showerGlass')}:</IconLabel>
                <span>{translateAndJoin(details.shower_glass_types, 'glassShower', t)}</span>
              </div>
            )}
            {details.windows_doors_glass_types && details.windows_doors_glass_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Square} color="#2563EB" bg="#EFF6FF">{t('provider.details.windowsDoorsGlass')}:</IconLabel>
               <span>{translateAndJoin(details.windows_doors_glass_types, 'glassWindowsDoors', t)}</span>
              </div>
            )}
            {details.kitchen_home_glass_types && details.kitchen_home_glass_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Home} color="#2563EB" bg="#EFF6FF">{t('provider.details.kitchenHomeGlass')}:</IconLabel>
               <span>{translateAndJoin(details.kitchen_home_glass_types, 'glassKitchenHome', t)}</span>
              </div>
            )}
            {details.special_safety_glass_types && details.special_safety_glass_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Shield} color="#2563EB" bg="#EFF6FF">{t('provider.details.specialSafetyGlass')}:</IconLabel>
               <span>{translateAndJoin(details.special_safety_glass_types, 'glassSpecialSafety', t)}</span>
              </div>
            )}
            {details.repair_custom_types && details.repair_custom_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Wrench} color="#2563EB" bg="#EFF6FF">{t('provider.details.glassRepairCustom')}:</IconLabel>
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
                <IconLabel icon={Lock} color="#7C3AED" bg="#F5F3FF">{t('provider.details.lockReplacement')}:</IconLabel>
               <span>{translateAndJoin(details.lock_replacement_types, 'locksmithLockReplacement', t)}</span>
              </div>
            )}
            {details.door_opening_types && details.door_opening_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={DoorOpen} color="#6366F1" bg="#EEF2FF">{t('provider.details.doorOpening')}:</IconLabel>
                <span>{translateAndJoin(details.door_opening_types, 'locksmithDoorOpening', t)}</span>
              </div>
            )}
            {details.lock_system_installation_types && details.lock_system_installation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Settings} color="#6366F1" bg="#EEF2FF">{t('provider.details.lockSystemInstallation')}:</IconLabel>
                <span>{translateAndJoin(details.lock_system_installation_types, 'locksmithSystems', t)}</span>
              </div>
            )}
            {details.lock_door_repair_types && details.lock_door_repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Wrench} color="#2563EB" bg="#EFF6FF">{t('provider.details.lockDoorRepair')}:</IconLabel>
                <span>{translateAndJoin(details.lock_door_repair_types, 'locksmithRepairs', t)}</span>
              </div>
            )}
            {details.security_services_types && details.security_services_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Shield} color="#2563EB" bg="#EFF6FF">{t('provider.details.securityServices')}:</IconLabel>
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
                <IconLabel icon={Flame} color="#EA580C" bg="#FFF7ED">{t('provider.details.gasInstallation')}:</IconLabel>
               <span>{translateAndJoin(details.installation_types, 'gasInstallation', t)}</span>
              </div>
            )}
            {details.repair_types && details.repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Wrench} color="#2563EB" bg="#EFF6FF">{t('provider.details.gasRepairs')}:</IconLabel>
              <span>{translateAndJoin(details.repair_types, 'gasRepair', t)}</span>
              </div>
            )}
            {details.license_type && details.license_type.length > 0 && (
              <div className="detail-item">
                <IconLabel icon={ClipboardList} color="#6366F1" bg="#EEF2FF">{t('provider.details.gasLicenseType')}:</IconLabel>
                <span>{translateAndJoin(details.license_type, 'gasLicenseTypes', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === MECHANIC === */}
        {provider.serviceType === 'mechanic' && (
          <>
            {details.work_types && details.work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Wrench} color="#2563EB" bg="#EFF6FF">{t('provider.details.mechanicWorkTypes')}:</IconLabel>
                <span>{translateAndJoin(details.work_types, 'mechanicWorkTypes', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === METALWORK === */}
        {provider.serviceType === 'metalwork' && (
          <>
            {details.work_types && details.work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Settings} color="#78350F" bg="#FEF3C7">{t('filters.metalwork.workTypes')}:</IconLabel>
                <span>{translateAndJoin(details.work_types, 'metalworkWorkTypes', t)}</span>
              </div>
            )}
            {details.availability_hours && details.availability_hours.length > 0 && (
              <div className="detail-item">
                <IconLabel icon={Clock} color="#78350F" bg="#FEF3C7">{t('serviceFields.metalwork.availability_hours')}:</IconLabel>
                <span>{translateAndJoin(details.availability_hours, 'hours', t)}</span>
              </div>
            )}
          </>
        )}

        {/* === DRIVER === */}
        {provider.serviceType === 'driver' && (
          <>
            {details.transportation_type && details.transportation_type.length > 0 && (
              <div className="detail-item">
                <strong>{t('serviceFields.driver.transportation_type')}:</strong>
                <span>{details.transportation_type.join(', ')}</span>
              </div>
            )}
            {details.vehicle_type && details.vehicle_type.length > 0 && (
              <div className="detail-item">
                <strong>{t('serviceForm.driver.vehicleType')}:</strong>
                <span>{translateAndJoin(details.vehicle_type, 'vehicleType', t)}</span>
              </div>
            )}
            {details.availability_hours && details.availability_hours.length > 0 && (
              <div className="detail-item">
                <strong>{t('filters.driver.availabilityHours')}:</strong>
                <span>{translateAndJoin(details.availability_hours, 'hours', t)}</span>
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
                <IconLabel icon={Bug} color="#059669" bg="#ECFDF5">{t('serviceForm.pest_control.pestTypes')}:</IconLabel>
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
                    <IconLabel icon={BookOpen} color="#2563EB" bg="#EFF6FF">{t('serviceForm.tutoring.subjectsLabel')}:</IconLabel>
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
                      <IconLabel icon={BookOpen} color="#2563EB" bg="#EFF6FF">{t('filters.tutoring.other')}:</IconLabel>
                      <span>{others.map((s, i) => <span key={i}>{cleanName(s)}{i < others.length - 1 ? ', ' : ''}</span>)}</span>
                    </div>
                  );
                }
                return <>{elements}</>;
              }
              return (
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <IconLabel icon={Trophy} color="#D97706" bg="#FFFBEB">{t('serviceForm.sports_activities.subjectsLabel')}:</IconLabel>
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
                  <IconLabel icon={Home} color="#2563EB" bg="#EFF6FF">{t('provider.details.longTermRental')}:</IconLabel>
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
                  <IconLabel icon={Sun} color="#EA580C" bg="#FFF7ED">{t('provider.details.shortTermRental')}:</IconLabel>
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
                <IconLabel icon={Wrench} color="#2563EB" bg="#EFF6FF">{t('provider.details.electricianRepairs')}:</IconLabel>
               <span>{translateAndJoin(details.repair_types, 'electricianRepairs', t)}</span>
              </div>
            )}
            
            {/* Installations */}
            {details.installation_types && details.installation_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Zap} color="#D97706" bg="#FFFBEB">{t('provider.details.electricianInstallations')}:</IconLabel>
             <span>{translateAndJoin(details.installation_types, 'electricianInstallations', t)}</span>
              </div>
            )}
            
            {/* Gros travaux */}
            {details.large_work_types && details.large_work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={HardHat} color="#7C3AED" bg="#F5F3FF">{t('provider.details.electricianLargeWork')}:</IconLabel>
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
                <IconLabel icon={Droplets} color="#0D9488" bg="#F0FDFA">{t('provider.details.plumbingBlockages')}:</IconLabel>
          <span>{translateAndJoin(details.blockage_types, 'plumbingBlockages', t)}</span>
              </div>
            )}
            
            {/* Réparation tuyauterie */}
            {details.pipe_repair_types && details.pipe_repair_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Wrench} color="#2563EB" bg="#EFF6FF">{t('provider.details.plumbingPipeRepair')}:</IconLabel>
             <span>{translateAndJoin(details.pipe_repair_types, 'plumbingPipeRepair', t)}</span>
              </div>
            )}
            
            {/* Gros travaux */}
            {details.large_work_types && details.large_work_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={HardHat} color="#7C3AED" bg="#F5F3FF">{t('provider.details.plumbingLargeWork')}:</IconLabel>
            <span>{translateAndJoin(details.large_work_types, 'plumbingLargeWork', t)}</span>
              </div>
            )}
            
            {/* Équipements sanitaires */}
            {details.fixture_types && details.fixture_types.length > 0 && (
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <IconLabel icon={Droplets} color="#0D9488" bg="#F0FDFA">{t('provider.details.plumbingFixtures')}:</IconLabel>
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

  const serviceNameHe = {
    babysitting: 'בייביסיטר', cleaning: 'ניקיון', gardening: 'גינון',
    petcare: 'שמירת חיות', tutoring: 'שיעורים פרטיים', eldercare: 'עזרה לקשישים',
    electrician: 'חשמלאי', plumbing: 'אינסטלטור', airconditioning: 'מזגן',
    carpentry: 'נגר', painting: 'צבעי', locksmith: 'מנעולן',
    moving: 'הובלות', driver: 'הסעות', handyman: 'עבודות כלליות',
  }[provider?.service_type] || provider?.service_type || '';

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0) / reviews.length).toFixed(1)
    : null;

  const providerJsonLd = provider ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${provider.first_name} ${provider.last_name}`,
    description: provider.description || serviceNameHe,
    url: `https://www.allsherut.com/provider/${provider.id}`,
    ...(provider.profile_images?.[0] && { image: provider.profile_images[0] }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: provider.location_city || 'ישראל',
      addressCountry: 'IL',
    },
    ...(avgRating && reviews.length >= 2 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating,
        reviewCount: String(reviews.length),
        bestRating: '5',
        worstRating: '1',
      },
    }),
  } : null;

  return (
    <>
      {provider && (
        <SEO
          title={`${provider.first_name} ${provider.last_name} - ${serviceNameHe}${provider.location_city ? ` ב${provider.location_city}` : ''}`}
          description={provider.description || `${provider.first_name} ${provider.last_name} - ${serviceNameHe} מקצועי${provider.location_city ? ` ב${provider.location_city}` : ''} | AllSherut`}
          canonicalPath={`/provider/${provider.id}`}
          image={provider.profile_images?.[0] || undefined}
          jsonLd={providerJsonLd}
        />
      )}
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
        {(() => {
          const avg = provider.rating?.average
            ? parseFloat(provider.rating.average)
            : reviews.length > 0
              ? reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0) / reviews.length
              : 0;
          const count = provider.rating?.count ?? reviews.length;
          const formatted = formatRating(avg);
          if (!formatted) return <span className="reviews-count">{count} {t('provider.reviews')}</span>;
          return (
            <div className="text-hero-rating-row">
              <Star size={18} fill="#dc2626" color="#dc2626" strokeWidth={0} />
              <span className="text-hero-score">{formatted}</span>
              <span className="text-hero-divider">·</span>
              <span className="text-hero-count">{count} {t('provider.reviews')}</span>
            </div>
          );
        })()}
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
      <div className="hero-buttons-grid">
        <button onClick={() => { const phone = provider.phone; apiService.logContactClick(provider.id, 'call').then(r => console.log('📞 click logged:', r)).catch(e => console.error('📞 click error:', e)).finally(() => { window.location.href = `tel:${phone}`; }); }} className="btn btn-primary btn-large hero-btn">
          <Phone size={18} />
          {t('provider.callNow')}
        </button>
        <button className="review-action-btn hero-btn" onClick={handleOpenReviewModal}>
          <MessageCircle size={16} />
          <span>{t('card.leaveReview')}</span>
        </button>
        <button onClick={() => { apiService.logContactClick(provider.id, 'whatsapp').then(r => console.log('💬 click logged:', r)).catch(e => console.error('💬 click error:', e)); setTimeout(() => window.open(`https://wa.me/972${provider.phone?.replace(/^0/, '')}`, '_blank'), 300); }} className="btn btn-success btn-large hero-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
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
            const src = img.startsWith('http') ? img : `${(import.meta.env.VITE_API_URL || 'https://homesherut-backend.fly.dev').replace('/api', '')}/${img.replace(/\\/g, '/').replace(/^\/+/, '')}`;
            return src;
          })()}
          alt={provider.name}
          className="provider-image"
          onError={(e) => {
            setProfileImageError(true);
          }}
        />
      ) : (
        <div
          className="text-detail-avatar"
          style={{ background: getAvatarGradient(provider.name) }}
        >
          {getInitial(provider.name)}
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

{/* Sticky section nav — Airbnb style */}
      <div className="provider-section-nav" ref={navRef}>
        <div className="container">
          <nav className="section-nav-tabs" dir="rtl">
            <button
              className={`section-nav-tab${activeSection === 'details' ? ' active' : ''}`}
              onClick={() => scrollToSection(detailsRef)}
            >{t('provider.navDetails')}</button>
            <button
              className={`section-nav-tab${activeSection === 'gallery' ? ' active' : ''}`}
              onClick={() => scrollToSection(galleryRef)}
            >{t('provider.navGallery')}</button>
            <button
              className={`section-nav-tab${activeSection === 'pricing' ? ' active' : ''}`}
              onClick={() => scrollToSection(pricingRef)}
            >{t('provider.navPricing')}</button>
            <button
              className={`section-nav-tab${activeSection === 'reviews' ? ' active' : ''}`}
              onClick={() => scrollToSection(reviewsRef)}
            >{t('provider.navReviews')}</button>
          </nav>
        </div>
      </div>

{/* Main Content — all sections on one page */}
      <div className="provider-content">
        <div className="container">
          <div className="main-content">

            {/* Section: פרטים */}
            <div ref={detailsRef} data-section="details">
              {renderServiceDetails()}
              {provider.certifications && provider.certifications.length > 0 && provider.serviceType !== 'eldercare' && provider.serviceType !== 'laundry' && (
                <div className="certifications-section" style={{ marginTop: 'var(--space-8)' }}>
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
            </div>

            {/* Section: תמונות */}
            <div ref={galleryRef} data-section="gallery" className="service-details-section">
              <h3 className="details-title" style={{ textAlign: 'start' }}>{t('provider.navGallery')}</h3>
              {provider.media?.gallery?.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {provider.media.gallery.map((url, i) => (
                    <img key={i} src={url} alt={`תמונה ${i + 1}`} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '8px' }} />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9ca3af' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🖼️</div>
                  <p style={{ margin: 0 }}>{t('provider.galleryEmpty')}</p>
                </div>
              )}
            </div>

            {/* Section: מחירים */}
            <div ref={pricingRef} data-section="pricing" className="service-details-section">
              <h3 className="details-title" style={{ textAlign: 'start' }}>{t('provider.navPricing')}</h3>
              {pricing.length > 0 ? (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr auto',
                    background: 'linear-gradient(135deg, #0F2A44, #2F80ED)',
                    color: '#fff', padding: '0.6rem 1rem', fontWeight: 600, fontSize: '0.85rem', gap: '1rem'
                  }}>
                    <span>{t('pricing.serviceNameLabel')}</span>
                    <span>{t('pricing.priceLabel')}</span>
                  </div>
                  {pricing.map((item, idx) => (
                    <div key={item.id} style={{
                      display: 'grid', gridTemplateColumns: '1fr auto',
                      padding: '0.65rem 1rem', gap: '1rem', alignItems: 'center',
                      borderBottom: idx < pricing.length - 1 ? '1px solid #f3f4f6' : 'none',
                      background: idx % 2 === 0 ? '#fff' : '#fafafa',
                    }}>
                      <span style={{ fontSize: '0.92rem', color: '#374151' }}>{item.service_name}</span>
                      <span style={{ fontSize: '0.92rem', color: '#0F2A44', fontWeight: 600, whiteSpace: 'nowrap' }}>₪{item.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9ca3af' }}>
                  <p style={{ margin: 0 }}>{t('pricing.empty')}</p>
                </div>
              )}
            </div>

            {/* Section: ביקורות */}
                  <div ref={reviewsRef} data-section="reviews" className="reviews-section-enhanced">
                    <div className="reviews-header">
                   <h3 className="section-title">{t('provider.reviews.title')}</h3>
                      <div className="reviews-summary">
                        <div className="rating-overview">
                          {reviews.length > 0 ? (() => {
                            const avg = reviews.reduce((sum, r) => sum + parseFloat(r.rating || 0), 0) / reviews.length;
                            return (
                              <div className="text-overall-rating-block">
                                <div className="text-overall-score-row">
                                  <Star size={28} fill="#dc2626" color="#dc2626" strokeWidth={0} />
                                  <span className="text-overall-score">{formatRating(avg)}</span>
                                </div>
                                <span className="text-overall-count">{reviews.length} {t('provider.reviews')}</span>
                              </div>
                            );
                          })() : null}
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
                                            <div className="text-review-cats">
                                              {[
                                                { key: 'quality', score: review.quality_rating },
                                                { key: 'price', score: review.price_rating },
                                                { key: 'availability', score: review.availability_rating },
                                                { key: 'professionalism', score: review.professionalism_rating },
                                              ].map(({ key, score }) => (
                                                <span key={key} className="text-cat-badge">
                                                  <span className="text-cat-score">{score}</span>
                                                  <span className="text-cat-label">{t(`review.categories.${key}`)}</span>
                                                </span>
                                              ))}
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
      {(() => {
        const img = provider.media?.profileImage || provider.profile_image;
        const src = img
          ? (img.startsWith('http') ? img : `${ (import.meta.env.VITE_API_URL || 'https://homesherut-backend.fly.dev').replace('/api', '') }/${img.replace(/\\/g, '/').replace(/^\/+/, '')}`)
          : null;
        if (src) {
          return (
            <img
              src={src}
              alt={provider.name}
              className="provider-response-avatar-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
          );
        }
        return null;
      })()}
      <div className="provider-response-avatar-img" style={{
        display: (provider.media?.profileImage || provider.profile_image) ? 'none' : 'flex',
        background: 'linear-gradient(145deg, #e8eef5 0%, #d1dbe8 100%)',
        alignItems: 'center', justifyContent: 'center', borderRadius: '50%', flexShrink: 0
      }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="50" fill="#d1dbe8"/>
          <circle cx="50" cy="38" r="18" fill="#8a9ab5"/>
          <ellipse cx="50" cy="85" rx="32" ry="28" fill="#8a9ab5"/>
        </svg>
      </div>
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
                  {t('provider.callNow')}
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
    </>
  );
};

export default ProviderDetailPage;