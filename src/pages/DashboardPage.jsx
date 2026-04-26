import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, 
  Star, 
  Clock, 
  Heart,
  Settings,
  MessageCircle,
  Calendar,
  TrendingUp,
  Award,
  Phone,
  Eye,
  Baby,
  Home,
  Scissors,
  PawPrint,
  BookOpen,
  Plus,
  Edit,
  BarChart3,
  Shield,
  Check,
  EyeOff,
  Lock,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  ThumbsUp,
  Mail,
  MapPin,
  X,
  Save,
  Trash2,
  Camera,
   LayoutGrid,
   Briefcase,
   Loader,
   Search,
   ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ResponseModal from '../components/modals/ResponseModal';
import { getAllCities, getNeighborhoodsByCity } from '../data/israelLocations.js';
import DeleteAccountModal from '../components/modals/DeleteAccountModal';
// PAIEMENT DÉSACTIVÉ - RÉACTIVER QUAND SITE PAYANT
// import CancelSubscriptionModal from '../components/modals/CancelSubscriptionModal';
import ServiceDetailsEditor from '../components/dashboard/ServiceDetailsEditor';
import DeleteServiceModal from '../components/modals/DeleteServiceModal';
import DeleteListingModal from '../components/modals/DeleteListingModal';
import { useLanguage } from '../context/LanguageContext';
import RecruitmentForm from '../components/recruitment/RecruitmentForm';
import CustomDropdown from '../components/common/CustomDropdown';

const ALL_SERVICE_KEYS = [
  'babysitting','cleaning','gardening','petcare','tutoring','eldercare','laundry',
  'property_management','electrician','plumbing','air_conditioning','gas_technician',
  'drywall','carpentry','home_organization','event_entertainment','private_chef',
  'painting','waterproofing','contractor','aluminum','glass_works','locksmith'
];

// Définition des icônes de services
const serviceIcons = {
  babysitting: Baby,
  cleaning: Home,
  gardening: Scissors,
  petcare: PawPrint,
  tutoring: BookOpen,
  eldercare: User
};

// Définition des images de services
const serviceImages = {
  babysitting: '/images/babysite.png',
  cleaning: '/images/nikayon.jpg',
  gardening: '/images/jardinage.jpg',
  petcare: '/images/chien.jpg',
  tutoring: '/images/tutoring.png',
  eldercare: '/images/eldercare.png',
  laundry: '/images/kvissa.jpg',
  property_management: '/images/nihoul-dirot.jpg',
  electrician: '/images/electrician.jpg',
  plumbing: '/images/plombier.jpg',
  air_conditioning: '/images/clim.png',
  gas_technician: '/images/gaz.jpg',
  drywall: '/images/guevess.png',
  carpentry: '/images/menuisier.png',
  home_organization: '/images/rangement.jpg',
  event_entertainment: '/images/fetes1.jpg',
  private_chef: '/images/traiteur.jpg',
  painting: '/images/peinture.jpg',
  waterproofing: '/images/itoum.jpg',
  contractor: '/images/kablan.png',
  aluminum: '/images/aluminium.png',
  glass_works: '/images/verre.png',
  locksmith: '/images/serrure.png',
  moving: '/images/demenagement.jpg'
};

const DashboardPage = () => {
const {user, isAuthenticated, isSubscriptionExpired, getMyReviews, apiCall, updateProfile, uploadProfileImage, deleteProfileImage, switchService, deleteService, changePassword, uploadGalleryImage, deleteGalleryImage} = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
const userData = useMemo(() => {
  if (!user) return null;
  
  const serviceDetails = user.providerProfile?.serviceDetails || {};
  
  return {
    ...user,
 serviceType: user.service_type || user.providerProfile?.service_type,
    serviceDetails: serviceDetails,
    workingAreas: user.providerProfile?.workingAreas || []
  };
}, [user]);

  
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') || 'overview');
  const [activeService, setActiveService] = useState(null);
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);

  const [myReviews, setMyReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Recrutement
  const [myListings, setMyListings] = useState([]);
  const [recruitmentLoading, setRecruitmentLoading] = useState(false);
  const [recruitmentSaving, setRecruitmentSaving] = useState(false);
  const [recruitmentDeleting, setRecruitmentDeleting] = useState(false);
  const [editingListing, setEditingListing] = useState(null); // null = no edit, {} = create new, {...} = edit existing
  const [listingServiceType, setListingServiceType] = useState('');
  const [recruitmentDetails, setRecruitmentDetails] = useState({});
  const [recruitmentErrors, setRecruitmentErrors] = useState({});
  const [recruitmentMsg, setRecruitmentMsg] = useState({ type: '', text: '' });
  const [responseModal, setResponseModal] = useState({
    isOpen: false,
    reviewData: null
  });

  const [deleteServiceModal, setDeleteServiceModal] = useState({
    isOpen: false,
    serviceType: null
  });

  // Suppression d'une offre de recrutement
  const [deleteListingModal, setDeleteListingModal] = useState({ isOpen: false, id: null });

  // Ajout d'un nouveau service
  const [addServiceModal, setAddServiceModal] = useState(false);
  const [addServiceStep, setAddServiceStep] = useState(1);
  const [addServiceType, setAddServiceType] = useState('');
  const [addServiceSeeking, setAddServiceSeeking] = useState('clients');
  const [addServiceDetails, setAddServiceDetails] = useState({});
  const [addServiceLoading, setAddServiceLoading] = useState(false);
  const [addServiceMsg, setAddServiceMsg] = useState({ type: '', text: '' });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
// PAIEMENT DÉSACTIVÉ - RÉACTIVER QUAND SITE PAYANT
// const [cancelSubscriptionModal, setCancelSubscriptionModal] = useState({ isOpen: false, serviceType: null });

  const [hasDeletionScheduled, setHasDeletionScheduled] = useState(false);
  const [deletionDate, setDeletionDate] = useState(null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameFormData, setNameFormData] = useState({ firstName: '', lastName: '' });
  const [nameEditLoading, setNameEditLoading] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    description: '',
    experienceYears: '',
    hourlyRate: '',
    availability: [],
    languages: [],
    workingAreas: [],
    serviceDetails: {}
  });
  const [editLoading, setEditLoading] = useState(false);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showAvatarActions, setShowAvatarActions] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
const [galleryError, setGalleryError] = useState('');

  const avatarRef = React.useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (avatarRef.current && !avatarRef.current.contains(e.target)) {
      setShowAvatarActions(false);
    }
  };
  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
}, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    console.log('🔍 user.providerProfile:', user?.providerProfile);
  console.log('🔍 profile_image:', user?.providerProfile?.profile_image);
  console.log('🔍 userData:', userData);
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const israeliCities = getAllCities();
    setCities(israeliCities);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const neighborhoods = getNeighborhoodsByCity(selectedCity);
      setAvailableNeighborhoods(neighborhoods);
    } else {
      setAvailableNeighborhoods([]);
    }
  }, [selectedCity]);

  const mockStats = {
    client: {
      totalContacts: 12,
      favoriteProviders: 5,
      reviewsGiven: 3
    },
    provider: {
      totalViews: 156,
      contactsReceived: 23,
      averageRating: 4.8,
      totalEarnings: 2340,
      completedJobs: 45,
      responseRate: 98
    }
  };

  const mockRecentActivity = {
    client: [
      { type: 'contact', provider: 'שרה כהן', service: 'בייביסיטר', date: '2025-08-22', status: 'completed' },
      { type: 'review', provider: 'מירי אבן', service: 'ניקיון', rating: 5, date: '2025-08-20' },
      { type: 'favorite', provider: 'אחמד מחמוד', service: 'גינון', date: '2025-08-18' }
    ],
    provider: [
      { type: 'contact_received', client: 'רות לוי', service: userData?.serviceType, date: '2025-08-23', status: 'responded' },
      { type: 'review_received', client: 'דוד כהן', rating: 5, date: '2025-08-21' },
      { type: 'profile_view', count: 12, date: '2025-08-20' }
    ]
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStats(userData?.role === 'provider' ? mockStats.provider : mockStats.client);
      setRecentActivity(userData?.role === 'provider' ? mockRecentActivity.provider : mockRecentActivity.client);
      setLoading(false);
    }, 500);
  }, [user]);

  useEffect(() => {
    if (userData?.scheduled_deletion_date) {
      setHasDeletionScheduled(true);
      setDeletionDate(new Date(userData.scheduled_deletion_date));
    } else {
      setHasDeletionScheduled(false);
      setDeletionDate(null);
    }
  }, [userData]);

const loadMyReviews = async () => {
    if (user?.role !== 'provider') return;
    
    setReviewsLoading(true);
    try {
      const serviceToLoad = activeService || user.service_type;
      console.log('📥 Chargement avis pour service:', serviceToLoad); // ← AJOUTER
      
      const result = await getMyReviews({
        page: 1,
        limit: 20,
        sort: 'createdAt',
        order: 'desc',
        service_type: serviceToLoad
      });
      
      console.log('📥 Résultat avis:', result); // ← AJOUTER
      
      if (result.success && result.data && result.data.reviews) {
        setMyReviews(result.data.reviews);
      } else if (result.success) {
        setMyReviews([]);
      } else {
        console.error('Erreur chargement avis:', result.message);
        setMyReviews([]);
      }
    } catch (error) {
      console.error('Erreur chargement avis:', error);
      setMyReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  const loadMyListings = async () => {
    if (user?.role !== 'provider') return;
    setRecruitmentLoading(true);
    try {
      const token = localStorage.getItem('homesherut_token');
      const res = await fetch('/api/recruitment/my/listings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setMyListings(data.data?.listings || []);
    } catch (err) {
      console.error('loadMyListings error:', err);
    } finally {
      setRecruitmentLoading(false);
    }
  };

  const handleSaveListing = async () => {
    const rd = recruitmentDetails;
    const errs = {};
    if (!rd.contract_type) errs['recruitment.contract_type'] = t('recruitment.error.contract_type');
    if (!rd.salary?.trim()) errs['recruitment.salary'] = t('recruitment.error.salary');
    if (!rd.payment_type) errs['recruitment.payment_type'] = t('recruitment.error.payment_type');
    if (!rd.availability_days?.length) errs['recruitment.availability_days'] = t('recruitment.error.availability_days');
    if (!rd.availability_hours?.length) errs['recruitment.availability_hours'] = t('recruitment.error.availability_hours');
    if (!rd.experience_required) errs['recruitment.experience_required'] = t('recruitment.error.experience_required');
    if (!rd.description?.trim()) errs['recruitment.description'] = t('recruitment.error.description');
    if (Object.keys(errs).length > 0) {
      setRecruitmentErrors(errs);
      setTimeout(() => {
        const firstError = document.querySelector('.error-text');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 80);
      return;
    }
    setRecruitmentErrors({});
    setRecruitmentSaving(true);
    try {
      const token = localStorage.getItem('homesherut_token');
      const isEdit = editingListing?.id;
      const url = isEdit ? `/api/recruitment/${editingListing.id}` : '/api/recruitment';
      const method = isEdit ? 'PUT' : 'POST';
      const serviceType = listingServiceType || activeService || userData?.serviceType || user?.service_type;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...rd, service_type: serviceType }),
      });
      const data = await res.json();
      if (data.success) {
        setRecruitmentMsg({ type: 'success', text: t('recruitment.dashboard.saveSuccess') });
        setEditingListing(null);
        setRecruitmentDetails({});
        loadMyListings();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setRecruitmentMsg({ type: 'error', text: data.message || 'שגיאה' });
      }
    } catch (err) {
      setRecruitmentMsg({ type: 'error', text: 'שגיאה בשמירה' });
    } finally {
      setRecruitmentSaving(false);
    }
  };

  const handleDeleteListing = async (id) => {
    setRecruitmentDeleting(true);
    try {
      const token = localStorage.getItem('homesherut_token');
      const res = await fetch(`/api/recruitment/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setRecruitmentMsg({ type: 'success', text: t('recruitment.dashboard.deleteSuccess') });
        loadMyListings();
      }
    } catch (err) {
      setRecruitmentMsg({ type: 'error', text: 'שגיאה במחיקה' });
    } finally {
      setRecruitmentDeleting(false);
    }
  };

  const handleOpenResponseModal = (reviewData) => {
  setResponseModal({
    isOpen: true,
    reviewData: {
      id: reviewData.id,
      reviewerName: reviewData.client_name,
      rating: reviewData.rating,
      createdAt: reviewData.created_at,
      title: reviewData.title,
      comment: reviewData.comment,
      onResponseSuccess: () => {
        loadMyReviews();
        setResponseModal({ isOpen: false, reviewData: null });
      }
    }
  });
};

  const handleCloseResponseModal = () => {
    setResponseModal({
      isOpen: false,
      reviewData: null
    });
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (activeTab === 'my-reviews' && user?.role === 'provider') {
      loadMyReviews();
    }
    if (activeTab === 'recruitment' && user?.role === 'provider') {
      loadMyListings();
    }
 }, [activeTab, user, activeService]);

useEffect(() => {
  // ✅ Restaurer le service actif depuis localStorage
  const savedService = localStorage.getItem('activeService');
  
  if (savedService && user?.services?.includes(savedService)) {
    setActiveService(savedService);
  } else if (user?.services && user.services.length > 0 && !activeService) {
    const firstService = user.services[0];
    setActiveService(firstService);
    localStorage.setItem('activeService', firstService);
  }
}, [user]);

useEffect(() => {
  const loadServiceData = async () => {
    if (activeService && user?.role === 'provider') {
      const currentServiceType = user.providerProfile?.service_type;
      
      // ✅ FIX : Ne recharger QUE si le service a vraiment changé
      if (currentServiceType !== activeService) {
        console.log('🔄 Rechargement données pour:', activeService);
        await switchService(activeService);
      }
    }
  };
  
  loadServiceData();
}, [activeService]); // ✅ Enlever user et switchService des dépendances

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
     newErrors.currentPassword = t('dashboard.errors.currentPasswordRequired');
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = t('dashboard.errors.newPasswordRequired');
   } else {
  const missing = [];
if (passwordData.newPassword.length < 8) missing.push(t('dashboard.errors.chars8'));
  if (!/[a-z]/.test(passwordData.newPassword)) missing.push(t('dashboard.errors.lowercase'));
  if (!/[A-Z]/.test(passwordData.newPassword)) missing.push(t('dashboard.errors.uppercase'));
  if (!/[0-9]/.test(passwordData.newPassword)) missing.push(t('dashboard.errors.digit'));
  if (missing.length > 0) {
newErrors.newPassword = `${t('dashboard.errors.passwordMustContain')}: ${missing.join(', ')}`;
  }
}
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = t('dashboard.errors.confirmPasswordRequired');
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
     newErrors.confirmPassword = t('dashboard.errors.passwordsNotMatch');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    setPasswordLoading(true);
    setMessage(null);
    
    try {
const response = await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      
      if (response.success) {
      setMessage({
          type: 'success',
          text: t('dashboard.messages.passwordChanged')
        });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setErrors({});
      } else {
     setMessage({
          type: 'error',
          text: response.message || t('dashboard.messages.passwordChangeError')
        });
      }
    } catch (err) {
      console.error('שגיאה בשינוי סיסמה:', err);
      setMessage({
        type: 'error',
        text: t('dashboard.messages.passwordChangeError')
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  // ✅ NOUVELLE FONCTION - Gérer les changements dans serviceDetails
  const handleServiceDetailChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        [field]: value
      }
    }));
  };

  // ✅ Gérer les tableaux (checkboxes multiples)
  const handleServiceDetailArrayChange = (field, value, checked) => {
    setEditFormData(prev => {
      const currentArray = prev.serviceDetails[field] || [];
      let newArray;
      
      if (checked) {
        newArray = [...currentArray, value];
      } else {
        newArray = currentArray.filter(item => item !== value);
      }
      
      return {
        ...prev,
        serviceDetails: {
          ...prev.serviceDetails,
          [field]: newArray
        }
      };
    });
  };

  const handleEditToggle = () => {
    if (!isEditMode) {
      setEditFormData({
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        phone: userData?.phone || '',
        email: userData?.email || '',
        description: userData?.serviceDetails?.description || '',
        experienceYears: userData?.serviceDetails?.experience_years || '',
        hourlyRate: userData?.serviceDetails?.hourly_rate || '',
        availability: userData?.serviceDetails?.availability || [],
        languages: userData?.serviceDetails?.languages || [],
        workingAreas: userData?.workingAreas || [],
        serviceDetails: userData?.serviceDetails || {}
      });
    }
    setIsEditMode(!isEditMode);
    setMessage(null);
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveNameOnly = async () => {
    if (!nameFormData.firstName.trim() || !nameFormData.lastName.trim()) return;
    setNameEditLoading(true);
    setMessage(null);
    try {
      const result = await updateProfile({
        firstName: nameFormData.firstName.trim(),
        lastName: nameFormData.lastName.trim()
      });
      if (result.success) {
        setMessage({ type: 'success', text: t('dashboard.messages.profileUpdated') });
        setIsEditingName(false);
      } else {
        setMessage({ type: 'error', text: result.message || t('dashboard.messages.profileUpdateError') });
      }
    } catch {
      setMessage({ type: 'error', text: t('dashboard.messages.profileUpdateError') });
    } finally {
      setNameEditLoading(false);
    }
  };

  const handleWorkingAreasChange = (neighborhood) => {
    setEditFormData(prev => {
      const currentAreas = prev.workingAreas || [];
      const isSelected = currentAreas.some(area => area.neighborhood === neighborhood && area.city === selectedCity);
      
      let newAreas;
      if (isSelected) {
        newAreas = currentAreas.filter(area => !(area.neighborhood === neighborhood && area.city === selectedCity));
      } else {
        newAreas = [...currentAreas, { city: selectedCity, neighborhood }];
      }
      
      return {
        ...prev,
        workingAreas: newAreas
      };
    });
  };

const cleanProfileData = (data) => {
  const cleaned = { ...data };
  
  if (cleaned.experienceYears === '' || cleaned.experienceYears === undefined) {
    cleaned.experienceYears = null;
  } else if (cleaned.experienceYears !== null) {
    cleaned.experienceYears = parseInt(cleaned.experienceYears) || 0;
  }
  
  if (cleaned.hourlyRate === '' || cleaned.hourlyRate === undefined) {
    cleaned.hourlyRate = null;
  } else if (cleaned.hourlyRate !== null) {
    cleaned.hourlyRate = parseFloat(cleaned.hourlyRate) || 0;
  }
  
  if (!Array.isArray(cleaned.availability)) {
    cleaned.availability = [];
  }
  
  if (!Array.isArray(cleaned.languages)) {
    if (typeof cleaned.languages === 'string') {
      cleaned.languages = cleaned.languages.split(',').map(l => l.trim()).filter(l => l);
    } else {
      cleaned.languages = [];
    }
  }
  
  if (!Array.isArray(cleaned.workingAreas)) {
    cleaned.workingAreas = [];
  }
  
  // ✅ Nettoyer les champs numériques dans serviceDetails
  if (cleaned.serviceDetails) {
    const numericKeys = ['hourlyRate', 'hourly_rate', 'rate', 'experience', 'experience_years', 'experienceYears', 'age'];
    Object.keys(cleaned.serviceDetails).forEach(key => {
      const isNumeric = numericKeys.includes(key) || key.includes('Rate') || key.includes('Years');
      if (isNumeric) {
        if (cleaned.serviceDetails[key] === '' || cleaned.serviceDetails[key] === undefined) {
          cleaned.serviceDetails[key] = null;
        } else if (cleaned.serviceDetails[key] !== null) {
          cleaned.serviceDetails[key] = parseFloat(cleaned.serviceDetails[key]) || 0;
        }
      }
    });
    // Supprimer les champs de tarif redondants pour éviter les conflits backend
    // hourlyRate est la source de vérité — hourly_rate et rate sont des alias stales
    delete cleaned.serviceDetails.hourly_rate;
    delete cleaned.serviceDetails.rate;
  }
  
  return cleaned;
};

const handleSaveProfile = async () => {
  setEditLoading(true);
  setMessage(null);
  
  try {  
    const cleanedData = cleanProfileData(editFormData);
    
    cleanedData.activeServiceType = activeService || userData?.serviceType;
    
    // ✅ Synchroniser les valeurs de serviceDetails vers le niveau root
    if (cleanedData.serviceDetails) {
      // Tarif horaire — hourlyRate est la seule source de vérité
      if (cleanedData.serviceDetails.hourlyRate !== undefined) {
        cleanedData.hourlyRate = cleanedData.serviceDetails.hourlyRate !== null
          ? parseFloat(cleanedData.serviceDetails.hourlyRate) || 0
          : null;
      }

      // Années d'expérience
      if (cleanedData.serviceDetails.experience !== undefined) {
        cleanedData.experienceYears = cleanedData.serviceDetails.experience !== null
          ? parseInt(cleanedData.serviceDetails.experience) || 0
          : null;
      } else if (cleanedData.serviceDetails.experience_years !== undefined) {
        cleanedData.experienceYears = cleanedData.serviceDetails.experience_years !== null
          ? parseInt(cleanedData.serviceDetails.experience_years) || 0
          : null;
      }

      // Description
      if (cleanedData.serviceDetails.description !== undefined) {
        cleanedData.description = cleanedData.serviceDetails.description;
      }

      // Supprimer les alias stales (déjà fait dans cleanProfileData, double sécurité)
      delete cleanedData.serviceDetails.hourly_rate;
      delete cleanedData.serviceDetails.rate;
      delete cleanedData.serviceDetails.experience_years;
      delete cleanedData.serviceDetails.experienceYears;
    }
    
    console.log('📤 Données envoyées:', cleanedData);
    
    const result = await updateProfile(cleanedData);
   
    
    if (result.success) {
    setMessage({
          type: 'success',
          text: t('dashboard.messages.profileUpdated')
        });
      setIsEditMode(false);
    } else {
     setMessage({
          type: 'error',
          text: result.message || t('dashboard.messages.profileUpdateError')
        });
    }
  } catch (err) {
    console.error('שגיאה בעדכון פרופיל:', err);
    setMessage({
      type: 'error',
      text: 'שגיאה בעדכון הפרופיל'
    });
  } finally {
    setEditLoading(false);
  }
};

const handleImageSelect = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: 'error',
        text: 'הקובץ גדול מדי (מקסימום 5MB)'
      });
      return;
    }
    
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      setMessage({
        type: 'error',
        text: 'פורמט קובץ לא נתמך (רק JPG, PNG, WebP)'
      });
      return;
    }
    
    setImageFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

const handleUploadImage = async () => {
  if (!imageFile) return;
  
  setUploadingImage(true);
  setMessage(null);
  
  try {
    const result = await uploadProfileImage(imageFile, activeService || userData?.serviceType);
    
    if (result.success) {
      setMessage({
        type: 'success',
        text: 'התמונה הועלתה בהצלחה'
      });
      setImageFile(null);
      setImagePreview(null);
      
      // ✅ Recharger automatiquement les données
      await switchService(activeService || userData?.serviceType);
    } else {
      setMessage({
        type: 'error',
        text: result.message || 'שגיאה בהעלאת התמונה'
      });
    }
  } catch (error) {
    console.error('שגיאה בהעלאת תמונה:', error);
    setMessage({
      type: 'error',
      text: 'שגיאה בהעלאת התמונה'
    });
  } finally {
    setUploadingImage(false);
  }
};

const handleCancelImageSelection = () => {
  setImageFile(null);
  setImagePreview(null);
};

const handleDeleteImage = async () => {
  console.log('🔴 1. FONCTION handleDeleteImage APPELÉE');
  
  if (!window.confirm('האם אתה בטוח שברצונך להסיר את התמונה?')) {
    console.log('🔴 2. Utilisateur a annulé');
    return;
  }
  
  console.log('🔴 3. Utilisateur a confirmé, début suppression');
  console.log('🔴 4. activeService:', activeService);
  console.log('🔴 5. userData?.serviceType:', userData?.serviceType);
  
  setUploadingImage(true);
  
  try {
    console.log('🔴 6. Appel deleteProfileImage...');
    const result = await deleteProfileImage(activeService || userData?.serviceType);
    
    console.log('🔴 7. Résultat deleteProfileImage:', result);
    
    if (result.success) {
      console.log('🔴 8. Succès, mise à jour message');
      setMessage({
        type: 'success',
        text: 'התמונה נמחקה בהצלחה'
      });
      
      console.log('🔴 9. Appel switchService...');
      await switchService(activeService || userData?.serviceType);
      console.log('🔴 10. switchService terminé');
    } else {
      console.log('🔴 11. Échec:', result.message);
      setMessage({
        type: 'error',
        text: result.message || 'שגיאה במחיקת התמונה'
      });
    }
  } catch (error) {
    console.error('🔴 12. ERREUR CATCHÉE:', error);
    setMessage({
      type: 'error',
      text: 'שגיאה במחיקת התמונה'
    });
  } finally {
    console.log('🔴 13. Finally - fin de la fonction');
    setUploadingImage(false);
  }
};

const handleGalleryImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const gallery = galleryImages || [];
  if (gallery.length >= 6) {
    setMessage({ type: 'error', text: 'מקסימום 6 תמונות בגלריה' });
    return;
  }

 if (file.size > 2 * 1024 * 1024) {
 setGalleryError(t('dashboard.gallery.errorSize'));
  return;
}
setGalleryError('');

  setGalleryUploading(true);
  try {
    const imageCompression = (await import('browser-image-compression')).default;
    const compressed = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1200, useWebWorker: true });
    const result = await uploadGalleryImage(compressed, activeService || userData?.serviceType);
    if (result.success) {
      setMessage({ type: 'success', text: 'התמונה הועלתה לגלריה' });
      await switchService(activeService || userData?.serviceType);
    } else {
      setMessage({ type: 'error', text: result.message || 'שגיאה בהעלאת התמונה' });
    }
  } catch (err) {
    setMessage({ type: 'error', text: 'שגיאה בהעלאת התמונה' });
  } finally {
    setGalleryUploading(false);
    e.target.value = '';
  }
};

const handleGalleryImageDelete = async (imageUrl) => {
  setGalleryUploading(true);
  try {
    const result = await deleteGalleryImage(imageUrl, activeService || userData?.serviceType);
    if (result.success) {
      setMessage({ type: 'success', text: 'התמונה נמחקה' });
      await switchService(activeService || userData?.serviceType);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  } catch (err) {
    setMessage({ type: 'error', text: 'שגיאה במחיקת התמונה' });
  } finally {
    setGalleryUploading(false);
  }
};

const handleDeleteAccount = async () => {
  try {
    const response = await apiCall('/auth/delete-account', 'DELETE');

    if (response.success) {
      // ✅ Nettoyer le localStorage IMMÉDIATEMENT
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('activeService');
      
      setMessage({
        type: 'success',
        text: 'החשבון נמחק בהצלחה. מעביר אותך לדף הבית...'
      });

      setTimeout(() => {
        window.location.href = '/'; // ✅ Utiliser href au lieu de navigate + reload
      }, 2000);
    } else {
      throw new Error(response.message || 'שגיאה במחיקת החשבון');
    }
  } catch (error) {
    console.error('שגיאה במחיקת חשבון:', error);
    setMessage({
      type: 'error',
      text: 'שגיאה במחיקת החשבון'
    });
  }
};

const handleDeleteService = async (serviceType) => {
  try {
    const result = await deleteService(serviceType);
    
    // Fermer le modal immédiatement
    setDeleteServiceModal({ isOpen: false, serviceType: null });
    
    if (result.accountDeleted) {
      setMessage({
        type: 'success',
        text: 'החשבון נמחק לצמיתות. מעביר לדף הבית...'
      });
      
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
} else {
  // Mettre à jour l'état local
  setActiveService(result.newActiveService);
  localStorage.setItem('activeService', result.newActiveService);
  
  // ✅ Forcer le refresh des données utilisateur
  await switchService(result.newActiveService);
  
  setMessage({
    type: 'success',
    text: `השירות נמחק בהצלחה`
  });
}
  } catch (error) {
    console.error('שגיאה במחיקת שירות:', error);
    setMessage({
      type: 'error',
      text: error.message || 'שגיאה במחיקת השירות'
    });
    setDeleteServiceModal({ isOpen: false, serviceType: null });
  }
};

const handleAddServiceFieldChange = (field, value) => {
  setAddServiceDetails(prev => ({ ...prev, [field]: value }));
};

const handleAddServiceArrayChange = (field, value, checked) => {
  setAddServiceDetails(prev => {
    const current = prev[field] || [];
    if (checked) {
      return { ...prev, [field]: current.includes(value) ? current : [...current, value] };
    } else {
      return { ...prev, [field]: current.filter(v => v !== value) };
    }
  });
};

const resetAddServiceModal = () => {
  setAddServiceModal(false);
  setAddServiceStep(1);
  setAddServiceType('');
  setAddServiceSeeking('clients');
  setAddServiceDetails({});
  setAddServiceMsg({ type: '', text: '' });
};

const handleAddService = async () => {
  if (!addServiceType) {
    setAddServiceMsg({ type: 'error', text: t('dashboard.addService.selectService') });
    return;
  }
  setAddServiceLoading(true);
  setAddServiceMsg({ type: '', text: '' });
  try {
    const token = localStorage.getItem('homesherut_token');

    if (addServiceSeeking === 'recruitment') {
      // Soumettre l'offre de recrutement
      const res = await fetch('/api/recruitment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...addServiceDetails, service_type: addServiceType }),
      });
      const data = await res.json();
      if (data.success) {
        setAddServiceMsg({ type: 'success', text: t('dashboard.addService.success') });
        loadMyListings();
        setTimeout(() => {
          resetAddServiceModal();
          setActiveTab('recruitment');
        }, 1200);
      } else {
        setAddServiceMsg({ type: 'error', text: data.message || 'שגיאה' });
      }
    } else {
      // Soumettre le service (chercher des clients)
      const res = await fetch('/api/services/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          serviceType: addServiceType,
          seekingType: addServiceSeeking,
          serviceDetails: addServiceDetails,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAddServiceMsg({ type: 'success', text: t('dashboard.addService.success') });
        await switchService(addServiceType);
        setActiveService(addServiceType);
        localStorage.setItem('activeService', addServiceType);
        setTimeout(() => resetAddServiceModal(), 1200);
      } else {
        setAddServiceMsg({ type: 'error', text: data.message || 'שגיאה' });
      }
    }
  } catch {
    setAddServiceMsg({ type: 'error', text: 'שגיאה בהוספת השירות' });
  } finally {
    setAddServiceLoading(false);
  }
};

/* PAIEMENT DÉSACTIVÉ - RÉACTIVER QUAND SITE PAYANT
const handleCancelSubscription = async (serviceType) => {
  try {
    const response = await apiCall('/subscriptions/cancel', 'POST', {
      serviceType: serviceType
    });
    
    if (response.success) {
      setMessage({
        type: 'success',
        text: `המנוי עבור ${getServiceName(serviceType)} בוטל בהצלחה.`
      });
      
      setCancelSubscriptionModal({ isOpen: false, serviceType: null });
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      throw new Error(response.message || 'שגיאה בביטול המנוי');
    }
  } catch (error) {
    console.error('שגיאה בביטול מנוי:', error);
    setMessage({
      type: 'error',
      text: error.message || 'שגיאה בביטול המנוי'
    });
    setCancelSubscriptionModal({ isOpen: false, serviceType: null });
  }
};
*/

const handleCancelDeletion = async () => {
  try {
    const response = await apiCall('/users/cancel-deletion', 'POST');
    
    if (response.success) {
      setMessage({
        type: 'success',
        text: 'בקשת המחיקה בוטלה בהצלחה. המנוי שלך ממשיך!'
      });
      setTimeout(() => window.location.reload(), 2000);
    } else {
      throw new Error(response.message || 'שגיאה בביטול בקשת המחיקה');
    }
  } catch (error) {
    console.error('שגיאה בביטול מחיקה:', error);
    setMessage({
      type: 'error',
      text: error.message || 'שגיאה בביטול בקשת המחיקה'
    });
  }
};

  const ServiceIcon = serviceIcons[userData?.serviceType] || User;
const getServiceName = (serviceType) => {
    const serviceKeys = {
      babysitting: 'services.babysitting',
      cleaning: 'services.cleaning',
      gardening: 'services.gardening',
      petcare: 'services.petcare',
      tutoring: 'services.tutoring',
      eldercare: 'services.eldercare',
      laundry: 'services.laundry',
      property_management: 'services.property_management',
      electrician: 'services.electrician',
      plumbing: 'services.plumbing',
      air_conditioning: 'services.air_conditioning',
      gas_technician: 'services.gas_technician',
      drywall: 'services.drywall',
      carpentry: 'services.carpentry',
      home_organization: 'services.home_organization',
      event_entertainment: 'services.event_entertainment',
      private_chef: 'services.private_chef',
      painting: 'services.painting',
      waterproofing: 'services.waterproofing',
      contractor: 'services.contractor',
      aluminum: 'services.aluminum',
      glass_works: 'services.glass_works',
      locksmith: 'services.locksmith'
    };
    return t(serviceKeys[serviceType], serviceType);
  };

  if (loading) {
return <LoadingSpinner size="large" overlay text={t('dashboard.loading')} />;
  }
console.log('🔍 Dashboard userData:', {
  profileImage: userData?.providerProfile?.profile_image,
  fullProviderProfile: userData?.providerProfile
});
console.log('🔍 DEBUG serviceDetails COMPLET:', JSON.stringify(userData?.serviceDetails, null, 2));

const galleryImages = (() => {
  const raw = user?.providerProfile?.profile_images;
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try { return JSON.parse(raw); } catch { return []; }
})();

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="dashboard-header-content">
            <div className="user-welcome">
              <h1 className="dashboard-title">
                {t('common.hello')} {userData?.firstName}!
              </h1>
              <p className="dashboard-subtitle">
                {userData?.role === 'provider' 
                 ? `${t('dashboard.providerDashboard')} ${getServiceName(activeService || userData?.service_type)}`
                  : t('dashboard.clientDashboard')
                }
              </p>
            </div>
            
            <div className="quick-actions">
              {userData?.role !== 'provider' && (
                <>
              <Link to="/search" className="btn btn-secondary">
                    <Plus size={18} />
                    {t('dashboard.searchServices')}
                  </Link>
                  <Link to="/favorites" className="btn btn-primary">
                    <Heart size={18} />
                    {t('dashboard.myFavorites')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

    {/* PAIEMENT DÉSACTIVÉ - RÉACTIVER QUAND SITE PAYANT
        {isSubscriptionExpired && userData?.role === 'provider' && (
       <div className="expired-banner">
            <div className="expired-banner-content">
              <AlertTriangle size={24} />
              <div>
                <h3>{t('dashboard.subscriptionExpired')}</h3>
                <p>{t('dashboard.subscriptionExpiredDesc')}</p>
              </div>
              <Link to="/billing" className="btn btn-primary">
                {t('dashboard.renewNow')}
              </Link>
            </div>
          </div>
        )}
        */}

        <div className="dashboard-tabs">
  {/* Mobile uniquement : barre de services séparée */}
  {userData?.role === 'provider' && userData?.services?.length > 1 && (
    <div className="service-tabs-mobile">
      {userData.services.map(service => (
        <button
          key={service}
          className={`service-tab-btn ${activeService === service ? 'active' : ''}`}
          onClick={() => {
            localStorage.setItem('activeService', service);
            setActiveService(service);
          }}
        >
          {getServiceName(service)}
        </button>
      ))}
    </div>
  )}
          <div className="tabs-nav-row">
            {/* Desktop uniquement : services intégrés dans la rangée des onglets */}
            {userData?.role === 'provider' && userData?.services?.length > 1 && (
              <div className="service-tabs-desktop">
                {userData.services.map(service => (
                  <button
                    key={service}
                    className={`tab-btn service-tab-btn ${activeService === service ? 'active' : ''}`}
                    onClick={() => {
                      localStorage.setItem('activeService', service);
                      setActiveService(service);
                    }}
                  >
                    {getServiceName(service)}
                  </button>
                ))}
                <div className="tabs-separator" />
              </div>
            )}
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <BarChart3 size={18} />
              {t('dashboard.tabs.profile')}
            </button>

            {userData?.role === 'provider' && (
              <button
                className={`tab-btn ${activeTab === 'my-reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('my-reviews')}
              >
                <Star size={18} />
                {t('dashboard.tabs.reviews')}
              </button>
            )}

            {userData?.role === 'provider' && (
              <button
                className={`tab-btn ${activeTab === 'recruitment' ? 'active' : ''}`}
                onClick={() => setActiveTab('recruitment')}
              >
                <Briefcase size={18} />
                {t('dashboard.tabs.recruitment')}
              </button>
            )}

            <button
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} />
              {t('dashboard.tabs.security')}
            </button>

            <button
              className={`tab-btn ${activeTab === 'account-management' ? 'active' : ''}`}
              onClick={() => setActiveTab('account-management')}
            >
              <Trash2 size={18} />
              {t('dashboard.tabs.accountManagement')}
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              
{userData?.role === 'provider' && (
  <div className="provider-info-card">
    
   <div className="provider-header-new">
      {/* DROITE - Avatar profil */}
    <div 
     ref={avatarRef}
        className={`provider-avatar ${showAvatarActions ? 'actions-visible' : ''}`}
        onClick={() => setShowAvatarActions(!showAvatarActions)}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" />
        ) : userData?.providerProfile?.profile_image ? (
          <img 
            src={
              userData.providerProfile.profile_image.startsWith('http') 
                ? userData.providerProfile.profile_image 
                : `https://homesherut-backend.onrender.com/${userData.providerProfile.profile_image.replace(/^\/+/, '')}`
            }
            alt={userData.firstName}
          />
        ) : (
          <User size={60} />
        )}
        
        <div className="avatar-actions">
          {!imagePreview ? (
            <>
              <input
                type="file"
                id="profileImageInput"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
                disabled={uploadingImage}
              />
              <label 
                htmlFor="profileImageInput" 
                className="btn btn-secondary btn-sm"
                style={{ cursor: uploadingImage ? 'not-allowed' : 'pointer' }}
              >
                <Edit size={14} />
               {userData?.providerProfile?.profile_image ? t('dashboard.gallery.changePhoto') : t('dashboard.gallery.addPhoto')}
              </label>
              
              {userData?.providerProfile?.profile_image && (
                <button
                  onClick={handleDeleteImage}
                  className="btn btn-danger btn-sm"
                  disabled={uploadingImage}
                >
                  <Trash2 size={14} />
                 {t('dashboard.gallery.removePhoto')}
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleUploadImage}
                className="btn btn-primary btn-sm"
                disabled={uploadingImage}
              >
                {uploadingImage ? (
                  <>
                    <LoadingSpinner size="small" />
                    {t('dashboard.uploading')}
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    {t('dashboard.savePhoto')}
                  </>
                )}
              </button>
              <button
                onClick={handleCancelImageSelection}
                className="btn btn-secondary btn-sm"
                disabled={uploadingImage}
              >
                <X size={14} />
                {t('common.cancel')}
              </button>
            </>
          )}
        </div>
      </div>

      {/* CENTRE - Nom + bouton éditer */}
      <div className="provider-center-info">
        {isEditMode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <input
              type="text"
              value={editFormData.firstName}
              onChange={(e) => handleEditInputChange('firstName', e.target.value)}
              className="form-input inline-edit"
              placeholder="שם פרטי"
            />
            <input
              type="text"
              value={editFormData.lastName}
              onChange={(e) => handleEditInputChange('lastName', e.target.value)}
              className="form-input inline-edit"
              placeholder="שם משפחה"
            />
          </div>
        ) : (
          <h2 className="provider-name">{userData?.firstName} {userData?.lastName}</h2>
        )}
        <span className="service-name-label">{getServiceName(activeService || userData?.serviceType)}</span>
        {userData?.verified && (
          <div className="verified-badge">
            <Shield size={14} />
            <span>{t('dashboard.verified')}</span>
          </div>
        )}
        <div className="provider-header-actions">
          {isEditMode ? (
            <>
              <button onClick={handleSaveProfile} className="btn btn-primary" disabled={editLoading}>
                {editLoading ? (
                  <><LoadingSpinner size="small" />{t('dashboard.saving')}</>
                ) : (
                  <><Save size={18} />{t('dashboard.saveChanges')}</>
                )}
              </button>
              <button onClick={handleEditToggle} className="btn btn-secondary" disabled={editLoading}>
                <X size={18} />{t('common.cancel')}
              </button>
            </>
          ) : (
            !isSubscriptionExpired && (
              <>
                <button onClick={handleEditToggle} className="btn btn-secondary">
                  <Edit size={18} />{t('dashboard.editProfile')}
                </button>
                <button
                  onClick={() => { setAddServiceModal(true); setAddServiceStep(1); setAddServiceMsg({ type: '', text: '' }); setAddServiceType(''); setAddServiceSeeking('clients'); setAddServiceDetails({}); }}
                  className="btn btn-secondary"
                  style={{ borderColor: '#2F80ED', color: '#2F80ED' }}
                >
                  {t('dashboard.addService.btn')}
                </button>
              </>
            )
          )}
        </div>
      </div>

      {/* GAUCHE - Icône service */}
      <div className="provider-service-icon">
        <img 
          src={serviceImages[activeService] || serviceImages[userData?.serviceType] || serviceImages[user?.service_type]} 
          alt=""
        />
      </div>
    </div>

    {/* Section contact */}
<div className="info-section">
      <h3 className="section-title">{t('dashboard.contactDetails')}</h3>
      <div className="contact-grid">
        
        <div className="provider-contact-item">
          <div className="provider-contact-icon">
            <Mail size={18} />
          </div>
          <div className="contact-details">
            <label>{t('dashboard.email')}:</label>
            {isEditMode ? (
              <input
                type="email"
                value={editFormData.email}
                onChange={(e) => handleEditInputChange('email', e.target.value)}
                className="form-input inline-edit"
                placeholder="exemple@email.com"
                autoComplete="off"
              />
            ) : (
              <span>{userData?.email}</span>
            )}
          </div>
        </div>
        
        <div className="provider-contact-item">
          <div className="provider-contact-icon">
            <Phone size={18} />
          </div>
        <div className="contact-details">
            <label>{t('dashboard.phone')}:</label>
            {isEditMode ? (
              <input
                type="tel"
                value={editFormData.phone}
                onChange={(e) => handleEditInputChange('phone', e.target.value)}
                className="form-input inline-edit"
                placeholder="050-1234567"
              />
            ) : (
              <span>{userData?.phone || t('dashboard.notSpecified')}</span>
            )}
          </div>
        </div>
        
        <div className="provider-contact-item">
          <div className="provider-contact-icon">
            <Clock size={18} />
          </div>
        <div className="contact-details">
            <label>{t('dashboard.joined')}:</label>
<span>{userData?.serviceCreatedAt ? new Date(userData.serviceCreatedAt).toLocaleDateString('he-IL') : userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('he-IL') : 'לא זמין'}</span>
          </div>
        </div>
      </div>
    </div>

    
{/* ✅ SERVICE DETAILS - COMPOSANT RÉUTILISABLE */}
<ServiceDetailsEditor 
  serviceType={activeService || userData?.serviceType}
  serviceDetails={isEditMode ? editFormData.serviceDetails : userData?.serviceDetails}
  isEditMode={isEditMode}
  onFieldChange={handleServiceDetailChange}
  onArrayChange={handleServiceDetailArrayChange}
/>

   {/* Section Zones de travail */}
 <div className="info-section">
      <h3 className="section-title">{t('dashboard.workingAreas')}</h3>
      
      {isEditMode ? (
        <>
          {/* Option כל ישראל */}
          <div className="form-group" style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#E8EEF5', borderRadius: '8px', border: '2px solid #2F80ED' }}>
            <label className="checkbox-item" style={{ fontWeight: '600', fontSize: '1.1rem' }}>
              <input
                type="checkbox"
                checked={editFormData.workingAreas?.some(area => area.neighborhood === 'כל ישראל')}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleEditInputChange('workingAreas', [{ city: 'ישראל', neighborhood: 'כל ישראל' }]);
                    setSelectedCity('');
                  } else {
                    handleEditInputChange('workingAreas', []);
                  }
                }}
              />
 {t('dashboard.allIsrael')} 
            </label>
          </div>

          {/* Si כל ישראל n'est PAS sélectionné */}
          {!editFormData.workingAreas?.some(area => area.neighborhood === 'כל ישראל') && (
            <>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
               <label>{t('dashboard.selectCity')}</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="form-input"
                >
                  <option value="">בחר עיר</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {selectedCity && (
                <>
                  {/* Option כל העיר */}
                  <div className="form-group" style={{ marginBottom: '0.5rem', padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px solid #22c55e' }}>
                    <label className="checkbox-item" style={{ fontWeight: '600' }}>
                      <input
                        type="checkbox"
                        checked={editFormData.workingAreas?.some(
                          area => area.city === selectedCity && area.neighborhood === 'כל העיר'
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            const otherCityAreas = editFormData.workingAreas?.filter(area => area.city !== selectedCity) || [];
                            handleEditInputChange('workingAreas', [...otherCityAreas, { city: selectedCity, neighborhood: 'כל העיר' }]);
                          } else {
                            const newAreas = editFormData.workingAreas?.filter(
                              area => !(area.city === selectedCity && area.neighborhood === 'כל העיר')
                            ) || [];
                            handleEditInputChange('workingAreas', newAreas);
                          }
                        }}
                      />
   🏙️ {t('dashboard.allCity', { city: selectedCity })}
                    </label>
                  </div>

                  {/* Quartiers - seulement si כל העיר n'est PAS coché */}
                  {!editFormData.workingAreas?.some(area => area.city === selectedCity && area.neighborhood === 'כל העיר') && 
                   availableNeighborhoods.length > 0 && (
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                     <label>{t('dashboard.neighborhoodsIn')} {selectedCity}:</label>
                      <div className="checkbox-grid">
                        {availableNeighborhoods.map(neighborhood => {
                          const isSelected = editFormData.workingAreas?.some(
                            area => area.neighborhood === neighborhood && area.city === selectedCity
                          );
                          
                          return (
                            <label key={neighborhood} className="checkbox-item">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleWorkingAreasChange(neighborhood)}
                              />
                              {neighborhood}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
   

          {editFormData.workingAreas && editFormData.workingAreas.length > 0 && (
            <div className="selected-areas">
             <h5>{t('dashboard.selectedAreas')}:</h5>
              <div className="working-areas-grid">
                {editFormData.workingAreas.map((area, index) => (
                  <div key={index} className="area-tag">
                    <MapPin size={14} />
                    <span>{area.neighborhood}, {area.city}</span>
                    <button 
                      type="button"
                      onClick={() => {
                        const newAreas = editFormData.workingAreas.filter((_, i) => i !== index);
                        handleEditInputChange('workingAreas', newAreas);
                      }}
                      className="remove-area-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {userData?.workingAreas && userData.workingAreas.length > 0 ? (
            <div className="working-areas-grid">
              {userData.workingAreas.map((area, index) => (
                <div key={index} className="area-tag">
                  <MapPin size={14} />
                  <span>{area.neighborhood}, {area.city}</span>
                </div>
              ))}
            </div>
          ) : (
          <p style={{ color: '#6b7280' }}>{t('dashboard.noWorkingAreas')}</p>
          )}
        </>
      )}
    </div>

    {/* ===== GALERIE DE SERVICES ===== */}
<div className="info-section">
  <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <LayoutGrid size={20} />
  {t('dashboard.gallery.title')}
  <span style={{ fontSize: '0.8rem', fontWeight: '400', color: '#6b7280' }}>
    ({galleryImages.length}/6 {t('dashboard.gallery.count')})
  </span>
</h3>
  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>
   {t('dashboard.gallery.description')}
  </p>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem'
  }}>
    {/* Images existantes */}
    {(galleryImages || []).map((url, index) => (
      <div key={index} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden', background: '#f3f4f6' }}>
        <img
          src={url}
          alt={`גלריה ${index + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <button
          onClick={() => handleGalleryImageDelete(url)}
          disabled={galleryUploading}
          style={{
            position: 'absolute', top: '6px', left: '6px',
            background: 'rgba(220,38,38,0.85)', border: 'none',
            borderRadius: '50%', width: '28px', height: '28px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white'
          }}
        >
          <X size={14} />
        </button>
      </div>
    ))}

    {/* Slot d'ajout */}
    {(galleryImages || []).length < 6 && (
      <label style={{
        aspectRatio: '4/3', border: '2px dashed #d1d5db', borderRadius: '8px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', cursor: galleryUploading ? 'not-allowed' : 'pointer',
        background: '#f9fafb', gap: '6px', color: '#9ca3af'
      }}>
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleGalleryImageUpload}
          style={{ display: 'none' }}
          disabled={galleryUploading}
        />
        {galleryUploading ? (
          <LoadingSpinner size="small" />
        ) : (
          <>
            <Camera size={24} />
           <span style={{ fontSize: '0.75rem', textAlign: 'center' }}>{t('dashboard.gallery.addPhoto')}<br/>{t('dashboard.gallery.maxSize')}</span>
          </>
        )}
      </label>
    )}
  </div>
</div>

{galleryError && (
  <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.5rem' }}>
    {galleryError}
  </p>
)}

    {isEditMode && (
      <div className="form-actions-bottom">
        <button 
          onClick={handleSaveProfile}
          className="btn btn-primary"
          disabled={editLoading}
        >
        {editLoading ? (
                <>
                  <LoadingSpinner size="small" />
                  {t('dashboard.savingChanges')}
                </>
              ) : (
                <>
                  <Check size={18} />
                  {t('dashboard.saveChanges')}
                </>
              )}
        </button>
        
        <button 
          onClick={handleEditToggle}
          className="btn btn-secondary"
          disabled={editLoading}
        >
          <X size={18} />
          ביטול
        </button>
      </div>
    )}
  </div>
)}

              {userData?.role === 'client' && (
                <div className="dashboard-grid">
                  <div className="dashboard-card stats-card">
                   <div className="dashboard-card-header">
                      <div className="dashboard-card-icon">
                        <Phone size={24} />
                      </div>
                      <h3>{t('dashboard.stats.weeklyContacts')}</h3>
                    </div>
                    <div className="stat-display">
                      <div className="stat-number">{stats.totalContacts}</div>
                    <div className="stat-trend positive">+3 {t('dashboard.stats.thisWeek')}</div>
                    </div>
                  </div>

                  <div className="dashboard-card stats-card">
                   <div className="dashboard-card-header">
                      <div className="dashboard-card-icon">
                        <Heart size={24} />
                      </div>
                      <h3>{t('dashboard.stats.favoriteProviders')}</h3>
                    </div>
                    <div className="stat-display">
                      <div className="stat-number">{stats.favoriteProviders}</div>
                    <div className="stat-trend neutral">{t('dashboard.stats.noChange')}</div>
                    </div>
                  </div>

                  <div className="dashboard-card stats-card">
                  <div className="dashboard-card-header">
                      <div className="dashboard-card-icon">
                        <Star size={24} />
                      </div>
                      <h3>{t('dashboard.stats.reviewsWritten')}</h3>
                    </div>
                    <div className="stat-display">
                      <div className="stat-number">{stats.reviewsGiven}</div>
                      <div className="stat-trend">{t('dashboard.stats.thisMonth')}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'my-reviews' && user?.role === 'provider' && (
          <div className="my-reviews-section">
              <h3 className="section-subtitle">{t('dashboard.reviews.title')}</h3>
              <p className="section-description">
                {t('dashboard.reviews.description')}
              </p>
              
             {reviewsLoading ? (
                <div className="reviews-loading">
                  <div className="loading-spinner"></div>
                  <p>{t('dashboard.reviews.loading')}</p>
                </div>
              ) : myReviews.length > 0 ? (
                <div className="reviews-list">
                {myReviews.map((review) => (
  <div key={review.id} className="review-card">
    <div className="review-header">
      <div className="review-author">
        <div className="author-info">
          <h4>{review.reviewerName || review.reviewer_name || 'לקוח'}</h4>
          <div className="review-date">
            <Clock size={14} />
            {new Date(review.createdAt || review.created_at).toLocaleDateString('he-IL')}
          </div>
        </div>
      </div>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={18} 
                              fill={i < review.rating ? '#fbbf24' : 'none'}
                              stroke={i < review.rating ? '#fbbf24' : '#cbd5e1'}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="review-content">
                        <p>{review.comment}</p>
                      </div>
{(review.providerResponse || review.provider_response) ? (
  <div className="provider-response" style={{ direction: 'rtl', textAlign: 'right' }}>
  <div className="response-header" style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      justifyContent: 'flex-start'
                    }}>
                      <MessageCircle size={16} />
                      <span>{t('dashboard.reviews.yourResponse')}:</span>
                    </div>
    <p style={{ textAlign: 'right', marginTop: '8px' }}>
      {review.providerResponse || review.provider_response}
    </p>
    <div className="response-date" style={{ textAlign: 'right', color: '#6b7280', fontSize: '12px' }}>
      {(review.responseCreatedAt || review.response_created_at) 
        ? new Date(review.responseCreatedAt || review.response_created_at).toLocaleDateString('he-IL')
        : ''}
    </div>
  </div>
) : (
     <button 
  onClick={() => handleOpenResponseModal(review)}
  className="btn btn-primary btn-sm"
  disabled={isSubscriptionExpired}
  style={{ 
    background: 'linear-gradient(135deg, #1A5490, #2F80ED)',
    border: 'none'
  }}
>
  <MessageCircle size={16} />
  {t('dashboard.reviews.respond')}
</button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
               <div className="empty-state">
                  <Star size={48} />
                  <h4>{t('dashboard.reviews.noReviews')}</h4>
                  <p>{t('dashboard.reviews.noReviewsDesc')}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'recruitment' && userData?.role === 'provider' && (
            <div className="overview-section">
              {/* En-tête avec bouton Créer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <h3 className="section-subtitle" style={{ margin: 0 }}>{t('recruitment.dashboard.title')}</h3>
                {!editingListing && (
                  <button
                    onClick={() => { setEditingListing({}); setRecruitmentDetails({}); setRecruitmentErrors({}); setListingServiceType(activeService || user?.services?.[0] || ''); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '0.55rem 1.2rem', borderRadius: '8px',
                      background: 'linear-gradient(135deg, #0F2A44, #2F80ED)',
                      color: '#fff', border: 'none', cursor: 'pointer',
                      fontWeight: 600, fontSize: '0.9rem',
                    }}
                  >
                    <Plus size={15} />
                    {t('recruitment.dashboard.createNew')}
                  </button>
                )}
              </div>

              {/* Message succès/erreur */}
              {recruitmentMsg.text && (
                <div style={{
                  padding: '0.75rem 1rem', marginBottom: '1rem', borderRadius: '8px',
                  background: recruitmentMsg.type === 'success' ? '#f0fdf4' : '#fef2f2',
                  color: recruitmentMsg.type === 'success' ? '#166534' : '#991b1b',
                  border: `1px solid ${recruitmentMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span>{recruitmentMsg.text}</span>
                  <button onClick={() => setRecruitmentMsg({ type: '', text: '' })}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1 }}>×</button>
                </div>
              )}

              {recruitmentLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>{t('recruitment.loading')}</div>
              ) : (
                <>
                  {/* État vide */}
                  {myListings.length === 0 && !editingListing && (
                    <div style={{
                      textAlign: 'center', padding: '3rem 2rem',
                      background: '#f9fafb', borderRadius: '14px',
                      border: '2px dashed #e5e7eb', marginBottom: '1.5rem',
                    }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💼</div>
                      <p style={{ color: '#6b7280', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                        {t('recruitment.dashboard.activateDesc')}
                      </p>
                    </div>
                  )}

                  {/* Liste des offres */}
                  {myListings.length > 0 && !editingListing && (() => {
                    const PAYMENT_MAP = { hourly: 'recruitment.card.hourly', daily: 'recruitment.card.daily', monthly: 'recruitment.card.monthly' };
                    const EXP_MAP = { beginner: 'recruitment.card.expBeginner', '1_year': 'recruitment.card.exp1year', '2_years': 'recruitment.card.exp2years', '3_plus_years': 'recruitment.card.exp3plus' };
                    const dayOrder = ['sunday','monday','tuesday','wednesday','thursday','friday'];

                    const handleEditClick = (listing) => {
                      setEditingListing(listing);
                      setListingServiceType(listing.service_type);
                      setRecruitmentDetails({
                        contract_type: listing.contract_type,
                        salary: listing.salary,
                        payment_type: listing.payment_type,
                        availability_days: listing.availability_days || [],
                        availability_hours: listing.availability_hours || [],
                        experience_required: listing.experience_required,
                        languages_required: listing.languages_required || [],
                        driving_license: listing.driving_license,
                        description: listing.description,
                        location_city: listing.location_city || '',
                        location_area: listing.location_area || '',
                      });
                      setRecruitmentErrors({});
                    };

                    if (isMobile) {
                      // ── MOBILE : cartes séparées ──
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                          {myListings.map(listing => {
                            const rawDaysM = listing.availability_days || [];
                            const daysDisplay = rawDaysM.includes('all_week')
                              ? t('days.allWeek')
                              : (() => {
                                  const s = [...rawDaysM].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
                                  return s.length === 0 ? '' : s.length === 1
                                    ? t(`recruitment.day.short.${s[0]}`, s[0])
                                    : `${t(`recruitment.day.short.${s[0]}`, s[0])} — ${t(`recruitment.day.short.${s[s.length - 1]}`, s[s.length - 1])}`;
                                })();
                            const hoursDisplay = (listing.availability_hours || []).includes('all')
                              ? t('recruitment.hour.all')
                              : (listing.availability_hours || []).map(h => t(`recruitment.hour.${h}`, h)).join(' / ');

                            return (
                              <div key={listing.id} style={{
                                background: 'white', border: '1px solid #e5e7eb',
                                borderRadius: '12px', padding: '1rem',
                              }}>
                                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0F2A44', marginBottom: '0.35rem' }}>
                                  {t(`services.${listing.service_type}`, listing.service_type)}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                                  <span style={{ fontWeight: 700, color: '#0F2A44' }}>{listing.salary} {t(PAYMENT_MAP[listing.payment_type] || '')}</span>
                                  <span style={{ color: '#9ca3af' }}>:</span>
                                  <span style={{ color: '#374151' }}>{t(EXP_MAP[listing.experience_required] || '')}</span>
                                </div>
                                {(daysDisplay || hoursDisplay) && (
                                  <div style={{ fontSize: '0.82rem', color: '#6b7280', marginBottom: '0.85rem' }}>
                                    {t('recruitment.daysTitle')} : {daysDisplay}{daysDisplay && hoursDisplay ? ' / ' : ''}{hoursDisplay}
                                  </div>
                                )}
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                  <button
                                    onClick={() => handleEditClick(listing)}
                                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '0.5rem 0.4rem', borderRadius: '8px', background: 'transparent', color: '#1A5490', border: '1.5px solid #1A5490', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
                                  >
                                    <Edit size={13} />{t('recruitment.dashboard.edit')}
                                  </button>
                                  <button
                                    onClick={() => setDeleteListingModal({ isOpen: true, id: listing.id })}
                                    disabled={recruitmentDeleting}
                                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '0.5rem 0.4rem', borderRadius: '8px', background: 'transparent', color: '#ef4444', border: '1.5px solid #ef4444', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
                                  >
                                    <Trash2 size={13} />{recruitmentDeleting ? '...' : t('recruitment.dashboard.delete')}
                                  </button>
                                  <button
                                    onClick={() => navigate(`/recruitment/${listing.service_type}`)}
                                    style={{ flex: 1.4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '0.5rem 0.4rem', borderRadius: '8px', background: '#0F2A44', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
                                  >
                                    <Search size={13} />{t('recruitment.dashboard.view')}<ChevronRight size={13} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }

                    // ── DESKTOP : lignes plates ──
                    return (
                      <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', background: 'white' }}>
                        {myListings.map((listing, index) => {
                          const rawDaysD = listing.availability_days || [];
                          const daysDisplay = rawDaysD.includes('all_week')
                            ? t('days.allWeek')
                            : (() => {
                                const s = [...rawDaysD].sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
                                return s.length === 0 ? '' : s.length === 1
                                  ? t(`recruitment.day.short.${s[0]}`, s[0])
                                  : `${t(`recruitment.day.short.${s[0]}`, s[0])} — ${t(`recruitment.day.short.${s[s.length - 1]}`, s[s.length - 1])}`;
                              })();
                          const hoursDisplay = (listing.availability_hours || []).includes('all')
                            ? t('recruitment.hour.all')
                            : (listing.availability_hours || []).map(h => t(`recruitment.hour.${h}`, h)).join(' / ');

                          return (
                            <div key={listing.id} style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '1rem 1.25rem',
                              borderBottom: index < myListings.length - 1 ? '1px solid #f0f0f0' : 'none',
                              borderLeft: '4px solid #1A5490',
                              gap: '1rem',
                            }}>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111827', marginBottom: '0.25rem' }}>
                                  {t(`services.${listing.service_type}`, listing.service_type)}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#374151', flexWrap: 'wrap' }}>
                                  <span style={{ fontWeight: 600 }}>{listing.salary} {t(PAYMENT_MAP[listing.payment_type] || '')}</span>
                                  <span style={{ color: '#d1d5db' }}>·</span>
                                  <span>{t(EXP_MAP[listing.experience_required] || '')}</span>
                                </div>
                                {(daysDisplay || hoursDisplay) && (
                                  <div style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '0.2rem' }}>
                                    {t('recruitment.daysTitle')} : {daysDisplay}{daysDisplay && hoursDisplay ? ' / ' : ''}{hoursDisplay}
                                  </div>
                                )}
                              </div>
                              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                                <button
                                  onClick={() => handleEditClick(listing)}
                                  style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.45rem 0.9rem', borderRadius: '8px', background: 'transparent', color: '#1A5490', border: '1.5px solid #1A5490', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                                >
                                  <Edit size={14} />{t('recruitment.dashboard.edit')}
                                </button>
                                <button
                                  onClick={() => setDeleteListingModal({ isOpen: true, id: listing.id })}
                                  disabled={recruitmentDeleting}
                                  style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.45rem 0.9rem', borderRadius: '8px', background: '#0F2A44', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                                >
                                  <Trash2 size={14} />
                                  {recruitmentDeleting ? t('recruitment.dashboard.deleting') : t('recruitment.dashboard.delete')}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* Formulaire création/édition */}
                  {editingListing !== null && (
                    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem' }}>

                      {/* Sélecteur de service — affiché en mode création */}
                      {!editingListing?.id && (
                        <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
                            {t('recruitment.forService')} *
                          </label>
                          <CustomDropdown
                            name="listingServiceType"
                            options={ALL_SERVICE_KEYS.map(k => ({ value: k, label: t(`services.${k}`, k) }))}
                            value={listingServiceType}
                            onChange={e => setListingServiceType(e.target.value)}
                            placeholder={t('recruitment.selectService')}
                          />
                        </div>
                      )}

                      <RecruitmentForm
                        details={recruitmentDetails}
                        errors={recruitmentErrors}
                        onChange={(field, value) => {
                          setRecruitmentDetails(prev => ({ ...prev, [field]: value }));
                          const key = `recruitment.${field}`;
                          if (recruitmentErrors[key]) setRecruitmentErrors(prev => ({ ...prev, [key]: '' }));
                        }}
                      />
                      {recruitmentMsg.text && !recruitmentSaving && (
                        <div style={{
                          marginTop: '0.75rem', padding: '0.6rem 0.9rem',
                          borderRadius: '8px', fontSize: '0.88rem',
                          background: recruitmentMsg.type === 'success' ? '#f0fdf4' : '#fef2f2',
                          color: recruitmentMsg.type === 'success' ? '#166534' : '#991b1b',
                          border: `1px solid ${recruitmentMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
                        }}>
                          {recruitmentMsg.text}
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => { setEditingListing(null); setRecruitmentDetails({}); setRecruitmentErrors({}); setRecruitmentMsg({ type: '', text: '' }); }}
                          style={{
                            padding: '0.6rem 1.2rem', borderRadius: '8px',
                            background: '#f3f4f6', color: '#374151',
                            border: 'none', cursor: 'pointer',
                          }}
                        >
                          {t('auth.back')}
                        </button>
                        <button
                          onClick={handleSaveListing}
                          disabled={recruitmentSaving}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '0.6rem 1.5rem', borderRadius: '8px',
                            background: 'linear-gradient(135deg, #0F2A44, #2F80ED)',
                            color: '#fff', border: 'none', cursor: 'pointer',
                          }}
                        >
                          {recruitmentSaving
                            ? <><Loader size={14} className="animate-spin" />{t('recruitment.dashboard.saving')}</>
                            : <><Save size={14} />{t('recruitment.dashboard.save')}</>
                          }
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
           <div className="settings-section">
              {/* Carte "Informations personnelles" - visible pour tous les rôles */}
              <div className="settings-card" style={{ marginBottom: '1.5rem' }}>
                <div className="settings-card-header">
                  <User size={24} />
                  <h4>פרטים אישיים</h4>
                </div>
                <div className="settings-content">
                  {isEditingName ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div className="form-group">
                        <label>שם פרטי</label>
                        <input
                          type="text"
                          value={nameFormData.firstName}
                          onChange={(e) => setNameFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="form-input"
                          placeholder="שם פרטי"
                        />
                      </div>
                      <div className="form-group">
                        <label>שם משפחה</label>
                        <input
                          type="text"
                          value={nameFormData.lastName}
                          onChange={(e) => setNameFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="form-input"
                          placeholder="שם משפחה"
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                          type="button"
                          onClick={handleSaveNameOnly}
                          disabled={nameEditLoading || !nameFormData.firstName.trim() || !nameFormData.lastName.trim()}
                          className="btn btn-primary"
                        >
                          {nameEditLoading ? <><LoadingSpinner size="small" />{t('dashboard.saving')}</> : <><Save size={16} />{t('dashboard.saveChanges')}</>}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingName(false)}
                          disabled={nameEditLoading}
                          className="btn btn-secondary"
                        >
                          <X size={16} />{t('common.cancel')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem' }}>
                          {userData?.firstName} {userData?.lastName}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setNameFormData({ firstName: userData?.firstName || '', lastName: userData?.lastName || '' });
                          setIsEditingName(true);
                          setMessage(null);
                        }}
                        className="btn btn-secondary"
                        style={{ flexShrink: 0 }}
                      >
                        <Edit size={16} />שנה שם
                      </button>
                    </div>
                  )}
                  {message && isEditingName === false && (
                    <div className={`message ${message.type}`} style={{ marginTop: '0.75rem' }}>
                      <div className="message-content">
                        {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span>{message.text}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="section-subtitle">{t('dashboard.security.title')}</h3>
              <p className="section-description">
                {t('dashboard.security.description')}
              </p>

              <div className="settings-card">
               <div className="settings-card-header">
                  <Lock size={24} />
                  <h4>{t('dashboard.security.changePassword')}</h4>
                </div>
                <div className="settings-content">
                  <form onSubmit={handlePasswordChange} className="settings-form">
                    
                    <div className="form-group">
                     <label htmlFor="currentPassword">{t('dashboard.security.currentPassword')}</label>
                      <div className="password-input-wrapper">
                        <input
                          type={showPasswords.current ? 'text' : 'password'}
                          id="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({...prev, currentPassword: e.target.value}))}
                          className={`form-input password-input ${errors.currentPassword ? 'error' : ''}`}
placeholder={t('dashboard.security.currentPasswordPlaceholder')}
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => togglePasswordVisibility('current')}
                          tabIndex="-1"
                        >
                          {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.currentPassword && (
                        <span className="error-text">{errors.currentPassword}</span>
                      )}
                    </div>

                    <div className="form-group">
<label htmlFor="newPassword">{t('dashboard.security.newPassword')}</label>
                      <div className="password-input-wrapper">
                        <input
                          type={showPasswords.new ? 'text' : 'password'}
                          id="newPassword"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({...prev, newPassword: e.target.value}))}
                          className={`form-input password-input ${errors.newPassword ? 'error' : ''}`}
placeholder={t('dashboard.security.newPasswordPlaceholder')}
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => togglePasswordVisibility('new')}
                          tabIndex="-1"
                        >
                          {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.newPassword && (
                        <span className="error-text">{errors.newPassword}</span>
                      )}
                    </div>

                    <div className="form-group">
<label htmlFor="confirmPassword">{t('dashboard.security.confirmPassword')}</label>
                      <div className="password-input-wrapper">
                        <input
                          type={showPasswords.confirm ? 'text' : 'password'}
                          id="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({...prev, confirmPassword: e.target.value}))}
                          className={`form-input password-input ${errors.confirmPassword ? 'error' : ''}`}
                          placeholder={t('dashboard.security.confirmPasswordPlaceholder')}
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => togglePasswordVisibility('confirm')}
                          tabIndex="-1"
                        >
                          {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <span className="error-text">{errors.confirmPassword}</span>
                      )}
                    </div>

                      {message && (
                      <div className={`message ${message.type}`} style={{ marginTop: '1rem' }}>
                        <div className="message-content">
                          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                          <span>{message.text}</span>
                        </div>
                      </div>
                    )}

                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={passwordLoading}
                    >
                    {passwordLoading ? (
                        <>
                          <LoadingSpinner size="small" />
                          {t('dashboard.security.changingPassword')}
                        </>
                      ) : (
                        <>
                          <Lock size={16} />
                          {t('dashboard.security.changePasswordBtn')}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

{activeTab === 'account-management' && (
  <div className="account-management-section">

    {hasDeletionScheduled && (
      <>
       <h3 className="section-subtitle">{t('dashboard.account.cancelDeletionTitle')}</h3>
        <p className="section-description">
          {t('dashboard.account.scheduledDeletionDesc', { date: deletionDate?.toLocaleDateString('he-IL') })}
        </p>

        <div className="settings-card">
          <div className="settings-card-header" style={{backgroundColor: '#10b981', color: 'white'}}>
            <CheckCircle size={24} />
            <h4>{t('dashboard.account.continueSubscription')}</h4>
          </div>
          <div className="settings-content">
            <div className="account-action-content">
              <div className="account-action-info">
           <h5>🎉 {t('dashboard.account.wantToStay')}</h5>
                <p>
                  {t('dashboard.account.cancelledSubscriptionDesc')}
                  <strong> {deletionDate?.toLocaleDateString('he-IL')}</strong>.
                </p>
                <p>
                  {t('dashboard.account.canCancelDeletion')}
                </p>
               <ul className="warning-list" style={{color: '#059669'}}>
                  <li>{t('dashboard.account.benefitProfileVisible')}</li>
                  <li>{t('dashboard.account.benefitReceiveContacts')}</li>
                  <li>{t('dashboard.account.benefitAllFeatures')}</li>
                  <li>{t('dashboard.account.benefitNoCosts')}</li>
                </ul>
              </div>
            <button 
                onClick={handleCancelDeletion}
                className="btn btn-success"
                style={{fontSize: '18px', padding: '15px 30px'}}
              >
                <Check size={20} />
                {t('dashboard.account.cancelDeletionBtn')}
              </button>
            </div>
          </div>
        </div>

        <div className="settings-card" style={{marginTop: '20px', borderColor: '#f59e0b'}}>
         <div className="settings-card-header" style={{backgroundColor: '#f59e0b', color: 'white'}}>
            <AlertTriangle size={24} />
            <h4>{t('dashboard.account.whatIfNotCancel')}</h4>
          </div>
          <div className="settings-content">
            <p>
              {t('dashboard.account.willBeDeletedOn', { date: deletionDate?.toLocaleDateString('he-IL') })}
            </p>
          </div>
        </div>
      </>
    )}

   {/* PAIEMENT DÉSACTIVÉ - RÉACTIVER QUAND SITE PAYANT
    {!hasDeletionScheduled && (
      <>
     <h3 className="section-subtitle">{t('dashboard.account.cancelSubscriptionTitle')}</h3>
        <p className="section-description">
          {t('dashboard.account.manageSubscriptions')}
        </p>

        {userData?.role === 'provider' && (
          <div className="settings-card">
       <div className="settings-card-header">
              <AlertCircle size={24} />
              <h4>{t('dashboard.account.cancelSubscriptionScheduled')}</h4>
            </div>
            <div className="settings-content">
              <div className="account-action-content">
                <div className="account-action-info">
               <h5>{t('dashboard.account.cancelWithScheduledDeletion')}</h5>
                  <p>
                    {t('dashboard.account.serviceWillContinue')}
                  </p>
                  <ul className="warning-list">
                    <li>{t('dashboard.account.warningProfileVisible')}</li>
                    <li>{t('dashboard.account.warningReceiveContacts')}</li>
                    <li>{t('dashboard.account.warningDeletedAtEnd')}</li>
                    <li>{t('dashboard.account.warningCanCancel')}</li>
                  </ul>
                </div>
                <div className="service-deletion-grid" style={{marginTop: '1rem'}}>
                  {userData.services?.map(service => (
                    <div key={service} className="service-deletion-card">
                      <div className="service-deletion-info">
                        <h5>{getServiceName(service)}</h5>
                        {activeService === service && (
                          <span className="active-badge">{t('dashboard.account.activeNow')}</span>
                        )}
                      </div>
                    <button
                        onClick={() => setCancelSubscriptionModal({
                          isOpen: true,
                          serviceType: service
                        })}
                        className="btn btn-warning btn-sm"
                      >
                        <X size={16} />
                        {t('dashboard.account.cancelSubscriptionBtn')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )}
    */}

    <div className="settings-card danger-zone" style={{marginTop: '20px'}}>
      <div className="settings-card-header">
        <Trash2 size={24} />
        <h4>{t('dashboard.account.immediateDeleteTitle')}</h4>
      </div>
      <div className="settings-content">
        <div className="account-action-content">
          <div className="account-action-info">
         <h5>{t('dashboard.account.deleteNowTitle')}</h5>
            <p>
              {t('dashboard.account.deleteNowDesc')}
            </p>
       {hasDeletionScheduled && (
              <p style={{color: '#dc2626', fontWeight: 'bold'}}>
                ⚠️ {t('dashboard.account.deleteInsteadOfWait', { date: deletionDate?.toLocaleDateString('he-IL') })}
              </p>
            )}
          <ul className="warning-list">
              <li>{t('dashboard.account.warningDataDeleted')}</li>
              <li>{t('dashboard.account.warningHistoryDeleted')}</li>
              <li>{t('dashboard.account.warningCantLogin')}</li>
              <li>{t('dashboard.account.warningIrreversible')}</li>
            </ul>
          </div>
         <div className="service-deletion-grid" style={{marginTop: '1rem'}}>
  {userData.services?.map(service => (
    <div key={service} className="service-deletion-card">
      <div className="service-deletion-info">
        <h5>{getServiceName(service)}</h5>
        {activeService === service && (
          <span className="active-badge">{t('dashboard.account.activeNow')}</span>
        )}
      </div>
    <button
        onClick={() => setDeleteServiceModal({
          isOpen: true,
          serviceType: service
        })}
        className="btn btn-danger btn-sm"
      >
        <Trash2 size={16} />
        {t('dashboard.account.deleteNowBtn')}
      </button>
    </div>
  ))}
</div>
        </div>
      </div>
    </div>
    
  </div>
)}
        </div>

        <ResponseModal 
          isOpen={responseModal.isOpen}
          onClose={handleCloseResponseModal}
          reviewData={responseModal.reviewData}
        />

        <DeleteAccountModal
          isOpen={deleteAccountModal}
          onClose={() => setDeleteAccountModal(false)}
          onConfirm={handleDeleteAccount}
        />
 
{/* PAIEMENT DÉSACTIVÉ - RÉACTIVER QUAND SITE PAYANT
 <CancelSubscriptionModal
  isOpen={cancelSubscriptionModal.isOpen}
  onClose={() => setCancelSubscriptionModal({ isOpen: false, serviceType: null })}
  onConfirm={() => handleCancelSubscription(cancelSubscriptionModal.serviceType)}
  serviceName={cancelSubscriptionModal.serviceType}
/>
*/}

 {/* Modal — Suppression offre recrutement */}
        <DeleteListingModal
          isOpen={deleteListingModal.isOpen}
          onClose={() => setDeleteListingModal({ isOpen: false, id: null })}
          onConfirm={() => handleDeleteListing(deleteListingModal.id)}
        />

 {/* Modal — Ajouter un nouveau service */}
        {addServiceModal && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
          }} onClick={resetAddServiceModal}>
            <div style={{
              background: 'white', borderRadius: '16px', padding: '2rem',
              width: '100%', maxWidth: addServiceStep === 2 ? '600px' : '440px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              maxHeight: '90vh', overflowY: 'auto'
            }} onClick={e => e.stopPropagation()}>

              {/* Header avec indicateur d'étape */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#0F2A44', fontSize: '1.15rem', fontWeight: 700 }}>
                  {t('dashboard.addService.title')}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 500 }}>
                  {addServiceStep} / 2
                </span>
              </div>

              {/* ÉTAPE 1 — Sélection du service et du type */}
              {addServiceStep === 1 && (
                <>
                  {/* Sélecteur de service */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>
                      {t('dashboard.addService.selectService')} *
                    </label>
                    <CustomDropdown
                      name="addServiceType"
                      options={ALL_SERVICE_KEYS.map(k => ({ value: k, label: t(`services.${k}`, k) }))}
                      value={addServiceType}
                      onChange={e => { setAddServiceType(e.target.value); setAddServiceDetails({}); }}
                      placeholder={t('dashboard.addService.selectService')}
                      searchable={true}
                    />
                  </div>

                  {/* Type de recherche */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>
                      {t('dashboard.addService.seekingType')}
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {[
                        { value: 'clients', label: t('dashboard.addService.seekingClients') },
                        { value: 'recruitment', label: t('dashboard.addService.seekingRecruitment') },
                      ].map(opt => (
                        <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                          <input type="radio" name="addServiceSeeking"
                            checked={addServiceSeeking === opt.value}
                            onChange={() => setAddServiceSeeking(opt.value)} />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Actions étape 1 */}
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={resetAddServiceModal}
                      style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', background: '#f3f4f6', color: '#374151', border: 'none', cursor: 'pointer' }}
                    >
                      {t('auth.back')}
                    </button>
                    <button
                      onClick={() => {
                        if (!addServiceType) {
                          setAddServiceMsg({ type: 'error', text: t('dashboard.addService.selectService') });
                          return;
                        }
                        setAddServiceMsg({ type: '', text: '' });
                        // Pré-remplir l'âge depuis le profil existant du prestataire
                        const existingAge = userData?.serviceDetails?.age;
                        if (existingAge) {
                          setAddServiceDetails(prev => ({ ...prev, age: existingAge }));
                        }
                        setAddServiceStep(2);
                      }}
                      disabled={!addServiceType}
                      style={{
                        padding: '0.6rem 1.5rem', borderRadius: '8px',
                        background: !addServiceType ? '#9ca3af' : 'linear-gradient(135deg, #0F2A44, #2F80ED)',
                        color: '#fff', border: 'none', cursor: !addServiceType ? 'not-allowed' : 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {t('common.next') || 'הבא'}
                    </button>
                  </div>
                </>
              )}

              {/* ÉTAPE 2 — Détails du service (cases à cocher) */}
              {addServiceStep === 2 && (
                <>
                  <div style={{ marginBottom: '1rem', padding: '0.6rem 0.9rem', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd', fontSize: '0.88rem', color: '#0369a1' }}>
                    {t(`services.${addServiceType}`, addServiceType)}
                  </div>

                  {addServiceSeeking === 'recruitment' ? (
                    <RecruitmentForm
                      details={addServiceDetails}
                      errors={recruitmentErrors}
                      onChange={(field, val) => setAddServiceDetails(prev => ({ ...prev, [field]: val }))}
                    />
                  ) : (
                    <ServiceDetailsEditor
                      serviceType={addServiceType}
                      serviceDetails={addServiceDetails}
                      isEditMode={true}
                      onFieldChange={handleAddServiceFieldChange}
                      onArrayChange={handleAddServiceArrayChange}
                      excludeFields={['age']}
                    />
                  )}

                  {/* Message */}
                  {addServiceMsg.text && (
                    <div style={{
                      padding: '0.6rem 0.9rem', borderRadius: '8px', margin: '1rem 0', fontSize: '0.88rem',
                      background: addServiceMsg.type === 'success' ? '#f0fdf4' : '#fef2f2',
                      color: addServiceMsg.type === 'success' ? '#166534' : '#991b1b',
                      border: `1px solid ${addServiceMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
                    }}>
                      {addServiceMsg.text}
                    </div>
                  )}

                  {/* Actions étape 2 */}
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <button
                      onClick={() => { setAddServiceStep(1); setAddServiceMsg({ type: '', text: '' }); }}
                      style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', background: '#f3f4f6', color: '#374151', border: 'none', cursor: 'pointer' }}
                    >
                      {t('auth.back')}
                    </button>
                    <button
                      onClick={handleAddService}
                      disabled={addServiceLoading}
                      style={{
                        padding: '0.6rem 1.5rem', borderRadius: '8px',
                        background: addServiceLoading ? '#9ca3af' : 'linear-gradient(135deg, #0F2A44, #2F80ED)',
                        color: '#fff', border: 'none', cursor: addServiceLoading ? 'not-allowed' : 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {addServiceLoading ? '...' : t('dashboard.addService.confirm')}
                    </button>
                  </div>
                </>
              )}

              {/* Message étape 1 */}
              {addServiceStep === 1 && addServiceMsg.text && (
                <div style={{
                  padding: '0.6rem 0.9rem', borderRadius: '8px', marginTop: '0.75rem', fontSize: '0.88rem',
                  background: '#fef2f2', color: '#991b1b', border: '1px solid #fca5a5',
                }}>
                  {addServiceMsg.text}
                </div>
              )}
            </div>
          </div>
        )}

 {/* 🆕 NOUVEAU MODAL - Suppression service spécifique */}
        <DeleteServiceModal
          isOpen={deleteServiceModal.isOpen}
          onClose={() => setDeleteServiceModal({ isOpen: false, serviceType: null })}
          onConfirm={() => handleDeleteService(deleteServiceModal.serviceType)}
          serviceName={deleteServiceModal.serviceType}
          hasOtherServices={userData?.services?.length > 1}
        />
        
      </div>
    </div>
  );
};

export default DashboardPage;