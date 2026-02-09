import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Trash2
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
import { useLanguage } from '../context/LanguageContext';

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
  private_chef: '/images/pizza.png',
  painting: '/images/peinture.jpg',
  waterproofing: '/images/itoum.jpg',
  contractor: '/images/kablan.png',
  aluminum: '/images/aluminium.png',
  glass_works: '/images/verre.png',
  locksmith: '/images/serrure.png'
};

const DashboardPage = () => {
const {user, isAuthenticated, isSubscriptionExpired, getMyReviews, apiCall, updateProfile, uploadProfileImage, deleteProfileImage, switchService, deleteService, changePassword} = useAuth();
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

  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeService, setActiveService] = useState(null);
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);

  const [myReviews, setMyReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [responseModal, setResponseModal] = useState({
    isOpen: false,
    reviewData: null
  });

  const [deleteServiceModal, setDeleteServiceModal] = useState({
    isOpen: false,
    serviceType: null
  });

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
    if (activeTab === 'my-reviews' && user?.role === 'provider') {
      loadMyReviews();
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
    Object.keys(cleaned.serviceDetails).forEach(key => {
      if (key.includes('Years') || key.includes('Rate') || key === 'rate' || key === 'hourlyRate' || key === 'experience' || key === 'age') {
        if (cleaned.serviceDetails[key] === '' || cleaned.serviceDetails[key] === undefined) {
          cleaned.serviceDetails[key] = null;
        } else if (cleaned.serviceDetails[key] !== null) {
          cleaned.serviceDetails[key] = parseFloat(cleaned.serviceDetails[key]) || 0;
        }
      }
    });
  }
  
  return cleaned;
};

const handleSaveProfile = async () => {
  setEditLoading(true);
  setMessage(null);
  
  try {  
    const cleanedData = cleanProfileData(editFormData);
    
    cleanedData.activeServiceType = activeService || userData?.serviceType;
    
    // ✅ AJOUTER : Synchroniser les valeurs de serviceDetails vers le niveau root
    if (cleanedData.serviceDetails) {
      // Tarif horaire
      if (cleanedData.serviceDetails.hourlyRate !== undefined) {
        cleanedData.hourlyRate = cleanedData.serviceDetails.hourlyRate;
      } else if (cleanedData.serviceDetails.hourly_rate !== undefined) {
        cleanedData.hourlyRate = cleanedData.serviceDetails.hourly_rate;
      } else if (cleanedData.serviceDetails.rate !== undefined) {
        cleanedData.hourlyRate = cleanedData.serviceDetails.rate;
      }
      
      // Années d'expérience  
      if (cleanedData.serviceDetails.experience !== undefined) {
        cleanedData.experienceYears = cleanedData.serviceDetails.experience;
      } else if (cleanedData.serviceDetails.experience_years !== undefined) {
        cleanedData.experienceYears = cleanedData.serviceDetails.experience_years;
      }
      
      // Description
      if (cleanedData.serviceDetails.description !== undefined) {
        cleanedData.description = cleanedData.serviceDetails.description;
      }
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
  {userData?.role === 'provider' && userData?.services?.length > 1 && (
    <div className="service-tabs" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
      {userData.services.map(service => (
        <button
          key={service}
          className={`service-tab-btn ${activeService === service ? 'active' : ''}`}
       onClick={async () => {
        localStorage.setItem('activeService', service);
  setActiveService(service);
  await switchService(service);
}}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            background: activeService === service ? '#4F46E5' : 'white',
            color: activeService === service ? 'white' : '#666',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
         {getServiceName(service)}
        </button>
      ))}
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

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              
{userData?.role === 'provider' && (
  <div className="provider-info-card">
    
    <div className="provider-header" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '2rem' }}>
        
    <div className="provider-avatar" style={{ width: '100px', height: '100px' }}>
  {imagePreview ? (
    <img 
      src={imagePreview} 
      alt="Preview" 
    />
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
        {userData?.providerProfile?.profile_image ? 'שנה תמונה' : 'הוסף תמונה'}
      </label>
      
      {userData?.providerProfile?.profile_image && (
        <button
          onClick={handleDeleteImage}
          className="btn btn-danger btn-sm"
          disabled={uploadingImage}
        >
          <Trash2 size={14} />
          הסר תמונה
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
        <div className="provider-main-info">
          <h2 className="provider-name">{userData?.firstName} {userData?.lastName}</h2>
          <div className="service-badge">
     <div style={{ 
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  overflow: 'hidden',
  background: '#f0f0f0',
  flexShrink: 0
}}>
  <img 
    src={serviceImages[activeService] || serviceImages[userData?.serviceType] || serviceImages[user?.service_type]} 
    alt=""
    style={{ 
      width: '100%', 
      height: '100%',
      objectFit: 'cover',
      transform: 'scale(1.3)'
    }}
  />
</div>
           <span className="service-name">{getServiceName(activeService || userData?.serviceType)}</span>
          </div>
        {userData?.verified && (
            <div className="verified-badge">
              <Shield size={14} />
              <span>{t('dashboard.verified')}</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        {isEditMode ? (
          <>
        <button 
              onClick={handleSaveProfile}
              className="btn btn-primary"
              disabled={editLoading}
            >
              {editLoading ? (
                <>
                  <LoadingSpinner size="small" />
                  {t('dashboard.saving')}
                </>
              ) : (
                <>
                  <Save size={18} />
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
              {t('common.cancel')}
            </button>
          </>
        ) : (
          !isSubscriptionExpired && (
        <button 
  onClick={handleEditToggle}
  className="btn btn-secondary"
>
  <Edit size={18} />
  {t('dashboard.editProfile')}
</button>
          )
        )}
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
            <span>{userData?.email}</span>
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
          <div className="form-group" style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '2px solid #3b82f6' }}>
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
    background: 'linear-gradient(135deg, #3b82f6, #10b981)',
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

          {activeTab === 'settings' && (
           <div className="settings-section">
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