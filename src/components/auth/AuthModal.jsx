import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Loader, Upload, CheckCircle, AlertCircle, Zap,
  Wrench, Sparkles, Users, Briefcase, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCities, getNeighborhoodsByCity } from '../../data/israelLocations.js';
import SuccessModal from '../SuccessModal';
import imageCompression from 'browser-image-compression';
import ServiceDetailsForm from '../services/ServiceDetailsForm';
import RecruitmentForm from '../recruitment/RecruitmentForm';
import { useLanguage } from '../../context/LanguageContext';
import CustomDropdown from '../common/CustomDropdown';

// Fonction de scroll automatique vers le premier champ en erreur
const scrollToFirstError = (errors, currentStep = 1) => {
  const errorFields = Object.keys(errors);
  if (errorFields.length === 0) return;

  const firstErrorField = errorFields[0];
  let targetElement = null;

  if (currentStep === 2) {
    switch (firstErrorField) {
      case 'name':
        targetElement = document.querySelector('input[name="name"]');
        break;
      case 'email':
        targetElement = document.querySelector('input[name="email"]');
        break;
      case 'phone':
        targetElement = document.querySelector('input[name="phone"]');
        break;
      case 'password':
        targetElement = document.querySelector('input[name="password"]');
        break;
      case 'confirmPassword':
        targetElement = document.querySelector('input[name="confirmPassword"]');
        break;
      case 'workingAreas':
        targetElement = document.querySelector('.city-selector select');
        break;
      default:
        if (firstErrorField.startsWith('serviceDetails.')) {
          const fieldName = firstErrorField.replace('serviceDetails.', '');
          targetElement = document.querySelector(`[data-field="${fieldName}"]`) ||
                         document.querySelector('.service-details-form');
        }
    }
  }

  if (targetElement) {
    targetElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
    
    setTimeout(() => {
      if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'SELECT') {
        targetElement.focus();
      }
    }, 500);
  }
};

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mode, setMode] = useState(initialMode);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'provider',
    serviceType: '',
    seekingType: 'clients',
    profileImage: null,
    profileImagePreview: null,
    workingAreas: [],
    serviceDetails: {},
    recruitmentDetails: {},
    // tranziliaToken: null,
    // acceptAutoRenewal: false,
    // cardNumber: '',
    // cardExpiry: '',
    // cardCvv: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [fieldValidation, setFieldValidation] = useState({
    email: { status: 'idle', message: '' },
    phone: { status: 'idle', message: '' },
    password: { status: 'idle', message: '' },
    confirmPassword: { status: 'idle', message: '' }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState({});
  const [imageError, setImageError] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);
  const [locationMode, setLocationMode] = useState(''); // 'israel' | 'ezor' | 'city' | 'neighborhood'
  const [selectedEzor, setSelectedEzor] = useState('');
  
  const [neighborhoodInput, setNeighborhoodInput] = useState('');
  const [showNeighborhoodSuggestions, setShowNeighborhoodSuggestions] = useState(false);
  const modalRef = useRef(null);

  // Fonction pour gérer les checkboxes "Tout" vs options spécifiques
  const handleExclusiveCheckbox = (field, value, allValue, allOptions) => {
    const current = formData.serviceDetails[field] || [];
    
    if (value === allValue) {
      // Si on coche "Tout" → garder seulement "Tout"
      if (!current.includes(allValue)) {
        handleServiceDetailsChange(field, [allValue]);
      } else {
        // Si on décoche "Tout" → vider
        handleServiceDetailsChange(field, []);
      }
    } else {
      // Si on coche une option spécifique
      let newValues;
      if (current.includes(value)) {
        // Décocher cette option
        newValues = current.filter(v => v !== value);
      } else {
        // Cocher cette option et retirer "Tout" si présent
        newValues = [...current.filter(v => v !== allValue), value];
      }
      handleServiceDetailsChange(field, newValues);
    }
  };

  const emailCheckTimeout = useRef(null);
  const phoneCheckTimeout = useRef(null);
  const passwordCheckTimeout = useRef(null);

  const { login, register, loading, error, clearError, apiCall } = useAuth();


  const API_BASE = import.meta.env.VITE_API_URL || '/api';

const services = [
  { key: 'plumbing', name: t('services.plumbing'), image: '/images/plombier.jpg', gradient: 'plumbing-gradient' },
  { key: 'electrician', name: t('services.electrician'), image: '/images/electrician.jpg', gradient: 'electrician-gradient' },
  { key: 'locksmith', name: t('services.locksmith'), image: '/images/serrure.png', gradient: 'locksmith-gradient' },
  { key: 'painting', name: t('services.painting'), image: '/images/peinture.jpg', gradient: 'painting-gradient' },
  { key: 'air_conditioning', name: t('services.air_conditioning'), image: '/images/clim.png', gradient: 'air_conditioning-gradient' },
  { key: 'drywall', name: t('services.drywall'), image: '/images/guevess.jpg', gradient: 'drywall-gradient' },
  { key: 'aluminum', name: t('services.aluminum'), image: '/images/aluminium.png', gradient: 'aluminum-gradient' },
  { key: 'metalwork', name: t('services.metalwork'), image: '/images/fer.jpg', gradient: 'metalwork-gradient' },
  { key: 'glass_works', name: t('services.glass_works'), image: '/images/verre.png', gradient: 'glass_works-gradient' },
  { key: 'gas_technician', name: t('services.gas_technician'), image: '/images/gaz.jpg', gradient: 'gas_technician-gradient' },
  { key: 'waterproofing', name: t('services.waterproofing'), image: '/images/itoum.jpg', gradient: 'waterproofing-gradient' },
  { key: 'carpentry', name: t('services.carpentry'), image: '/images/menuisier.png', gradient: 'carpentry-gradient' },
  { key: 'handyman', name: t('services.handyman'), image: '/images/indimane.jpg', gradient: 'handyman-gradient' },
  { key: 'contractor', name: t('services.contractor'), image: '/images/kablan.jpg', gradient: 'contractor-gradient' },
  { key: 'moving', name: t('services.moving'), image: '/images/demenagement.jpg', gradient: 'moving-gradient' },
  { key: 'gardening', name: t('services.gardening'), image: '/images/jardinage.jpg', gradient: 'gardening-gradient' },
  { key: 'pest_control', name: t('services.pest_control'), image: '/images/desinctisation.jpg', gradient: 'pest_control-gradient' },
  { key: 'cleaning', name: t('services.cleaning'), image: '/images/nikayon.jpg', gradient: 'cleaning-gradient' },
  { key: 'laundry', name: t('services.laundry'), image: '/images/kvissa.jpg', gradient: 'laundry-gradient' },
  { key: 'property_management', name: t('services.property_management'), image: '/images/nihoul-dirot.jpg', gradient: 'property_management-gradient' },
  { key: 'home_organization', name: t('services.home_organization'), image: '/images/rangement.jpg', gradient: 'home_organization-gradient' },
  { key: 'event_decoration', name: t('services.event_decoration'), image: '/images/deco.jpg', gradient: 'event_decoration-gradient' },
  { key: 'event_entertainment', name: t('services.event_entertainment'), image: '/images/fetes1.jpg', gradient: 'event_entertainment-gradient' },
  { key: 'dj', name: t('services.dj'), image: '/images/DJ.jpg', gradient: 'event_entertainment-gradient' },
  { key: 'private_chef', name: t('services.private_chef'), image: '/images/traiteur.jpg', gradient: 'private_chef-gradient' },
  { key: 'photographer', name: t('services.photographer'), image: '/images/photographe.jpg', gradient: 'photographer-gradient' },
  { key: 'tutoring', name: t('services.tutoring'), icon: '📚', image: '/images/tutoring.png', gradient: 'tutoring-gradient' },
  { key: 'sports_activities', name: t('services.sports_activities'), icon: '⚽', image: '/images/sport.jpg', gradient: 'sports_activities-gradient' },
  { key: 'babysitting', name: t('services.babysitting'), icon: '👶', image: '/images/babysite.jpg', gradient: 'babysitting-gradient' },
  { key: 'petcare', name: t('services.petcare'), image: '/images/chien.jpg', gradient: 'petcare-gradient' },
  { key: 'eldercare', name: t('services.eldercare'), icon: '👵', image: '/images/eldercare.jpg', gradient: 'eldercare-gradient' },
  { key: 'mechanic', name: t('services.mechanic'), image: '/images/garagiste.jpg', gradient: 'mechanic-gradient' },
  { key: 'driver', name: t('services.driver'), image: '/images/driver.jpg', gradient: 'driver-gradient' }
];


  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setStep(initialMode === 'login' ? 1 : 1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'provider',
        serviceType: '',
        seekingType: 'clients',
        profileImage: null,
        profileImagePreview: null,
        workingAreas: [],
        serviceDetails: {},
        recruitmentDetails: {},
      });
      setErrors({});
      setSubmitError('');
      clearError();
      setFieldValidation({
        email: { status: 'idle', message: '' },
        phone: { status: 'idle', message: '' },
        password: { status: 'idle', message: '' },
        confirmPassword: { status: 'idle', message: '' }
      });
      setShowPassword(false);
      setShowConfirmPassword(false);
      setSelectedCity('');
      setAvailableNeighborhoods([]);
      setLocationMode('');
      setSelectedEzor('');
      setImageError('');
    }
  }, [isOpen, initialMode, clearError]);

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

  useEffect(() => {
    const authForm = document.querySelector('.auth-modal .auth-form');
if (authForm) {
  authForm.scrollTop = 0;
}
  }, [step]);

  useEffect(() => {
    if (mode === 'register' && step === 1 && formData.serviceType) {
      setTimeout(() => {
       const authForm = document.querySelector('.auth-modal .auth-form');
if (authForm) {
  authForm.scrollTo({ 
    top: authForm.scrollHeight,
    behavior: 'smooth'
  });
}
      }, 300);
    }
  }, [mode, step, formData.serviceType]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    const domain = email.split('@')[1];
    const invalidDomains = ['example.com', 'test.com', 'fake.com'];
    return !invalidDomains.includes(domain);
  };

  const validatePhone = (phone) => {
    return true;
  };

  const validatePasswordStrength = (password) => {
    const requirements = [];
    if (password.length < 6) requirements.push(t('auth.validation.min6chars'));
    return requirements;
  };

  const checkEmailExists = async (email) => {
    setFieldValidation(prev => ({ 
      ...prev, 
      email: { status: 'checking', message: '' } 
    }));

    try {
      const response = await fetch(`${API_BASE}/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          serviceType: formData.serviceType
        })
      });

      const data = await response.json();

  if (data.forThisService) {
  setFieldValidation(prev => ({ 
    ...prev, 
    email: { status: 'invalid', message: t('auth.validation.emailAlreadyRegistered') } 
  }));
} else if (data.available) {
  setFieldValidation(prev => ({ 
    ...prev, 
    email: { status: 'valid', message: '' } 
  }));
} else {
  setFieldValidation(prev => ({ 
    ...prev, 
    email: { status: 'invalid', message: data.message || t('auth.validation.emailExists') } 
  }));
}
    } catch (error) {
      console.error('Error checking email:', error);
      setFieldValidation(prev => ({ 
        ...prev, 
        email: { status: 'idle', message: '' } 
      }));
    }
  };

  const checkPhoneExists = async (phone, serviceType) => {
    if (!phone || !serviceType) return;
    
    setFieldValidation(prev => ({ 
      ...prev, 
      phone: { status: 'checking', message: '' } 
    }));

    try {
      const response = await fetch(`${API_BASE}/auth/check-phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone,
          serviceType
        })
      });

      const data = await response.json();

     if (data.phoneExists) {
  setFieldValidation(prev => ({ 
    ...prev, 
    phone: { status: 'invalid', message: t('auth.validation.phoneExists') } 
  }));
} else {
  setFieldValidation(prev => ({ 
    ...prev, 
    phone: { status: 'valid', message: '' } 
  }));
}
    } catch (error) {
      console.error('Error checking phone:', error);
      setFieldValidation(prev => ({ 
        ...prev, 
        phone: { status: 'idle', message: '' } 
      }));
    }
  };

 const checkPasswordForExistingAccount = async (email, password) => {
  console.log('🔍 checkPasswordForExistingAccount called');
  console.log('Email:', email, 'Password:', password, 'Length:', password?.length);
  console.log('Email validation status:', fieldValidation.email.status);
  
  if (!email || !password || password.length < 6) {
    console.log('❌ Condition non remplie - return early');
    return;
  }
  
  if (fieldValidation.email.status !== 'valid') {
    console.log('❌ Email status not valid:', fieldValidation.email.status);
    return;
  }
  
  try {
    console.log('📧 Checking if email exists for another service...');
    const response = await fetch(`${API_BASE}/auth/check-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, serviceType: formData.serviceType })
    });
    const emailData = await response.json();
    console.log('📧 Email check response:', emailData);
    
  if (!emailData.exists) {
  console.log('✅ Nouveau compte - pas besoin de vérifier le mot de passe');
  return;
}
    
    if (emailData.forThisService) {
      console.log('⚠️ Déjà inscrit pour ce service');
      return;
    }
    
    console.log('🔐 Compte existe pour autre service - vérification mot de passe...');
    setFieldValidation(prev => ({ 
  ...prev, 
  password: { status: 'checking', message: t('auth.validation.checkingPassword') } 
}));
    
    const passResponse = await fetch(`${API_BASE}/auth/verify-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const passData = await passResponse.json();
    console.log('🔐 Password check response:', passData);
    
if (passData.accountExists && !passData.valid) {
  console.log('❌ Mot de passe incorrect!');
  setFieldValidation(prev => ({ 
    ...prev, 
    password: { status: 'invalid', message: t('auth.validation.passwordNotMatch') } 
  }));
} else {
  console.log('✅ Mot de passe correct ou nouveau compte');
  setFieldValidation(prev => ({ 
    ...prev, 
    password: { status: 'valid', message: passData.accountExists ? t('auth.validation.passwordMatch') : t('auth.validation.strongPassword') } 
  }));
}
    
  } catch (error) {
    console.error('❌ Error checking password:', error);
  }
};

const checkIdentityConflict = async (phone, email, fullName) => {
  if (!fullName || fullName.trim().length < 2) return;
  
  try {
    const response = await fetch(`${API_BASE}/auth/check-identity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        phone: phone?.replace(/[\s-]/g, ''), 
        email, 
        fullName 
      })
    });
    
    const data = await response.json();
    
    if (!data.valid) {
      if (data.field === 'phone') {
        setFieldValidation(prev => ({ 
          ...prev, 
          phone: { status: 'invalid', message: data.message } 
        }));
      } else if (data.field === 'email') {
        setFieldValidation(prev => ({ 
          ...prev, 
          email: { status: 'invalid', message: data.message } 
        }));
      }
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error checking identity:', error);
    return true;
  }
};

  const validatePhoneField = (phone) => {
    if (!phone) {
      setFieldValidation(prev => ({ 
        ...prev, 
        phone: { status: 'idle', message: '' } 
      }));
      return;
    }

  if (validatePhone(phone)) {
  setFieldValidation(prev => ({ 
    ...prev, 
    phone: { status: 'valid', message: t('auth.validation.validPhone') } 
  }));
} else {
  setFieldValidation(prev => ({ 
    ...prev, 
    phone: { status: 'invalid', message: t('auth.validation.phoneInvalid') } 
  }));
}
  };

  const validatePasswordField = (password) => {
    const missingRequirements = validatePasswordStrength(password);
    
  if (missingRequirements.length === 0) {
  setFieldValidation(prev => ({ 
    ...prev, 
    password: { status: 'valid', message: t('auth.validation.strongPassword') } 
  }));
} else {
  setFieldValidation(prev => ({ 
    ...prev, 
    password: { status: 'invalid', message: `${t('auth.validation.missing')}: ${missingRequirements.join(', ')}` } 
  }));
}
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) {
      setFieldValidation(prev => ({ 
        ...prev, 
        confirmPassword: { status: 'idle', message: '' } 
      }));
      return;
    }

   if (confirmPassword === formData.password) {
  setFieldValidation(prev => ({ 
    ...prev, 
    confirmPassword: { status: 'valid', message: t('auth.validation.passwordsMatch') } 
  }));
} else {
  setFieldValidation(prev => ({ 
    ...prev, 
    confirmPassword: { status: 'invalid', message: t('auth.validation.passwordMismatch') } 
  }));
}
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (mode === 'register' && !formData.serviceType) {
  newErrors.serviceType = t('auth.validation.serviceRequired');
}

if (mode === 'login') {
  if (!formData.email.trim()) {
    newErrors.email = t('auth.validation.emailRequired');
  }

  if (!formData.password) {
    newErrors.password = t('auth.validation.passwordRequired');
  }
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    const { serviceDetails } = formData;

    if (fieldValidation.email.status === 'checking') {
  newErrors.email = t('auth.validation.waitingEmail');
  setErrors(newErrors);
  
  return false;
}

if (!formData.name.trim()) {
  newErrors.name = t('auth.validation.nameRequired');
}

if (!formData.email.trim()) {
  newErrors.email = t('auth.validation.emailRequired');
} else if (!validateEmail(formData.email)) {
  newErrors.email = t('auth.validation.emailInvalid');
} else if (fieldValidation.email.status === 'invalid') {
  newErrors.email = fieldValidation.email.message;
}

if (!formData.phone.trim()) {
  newErrors.phone = t('auth.validation.phoneRequired');
} else if (!validatePhone(formData.phone)) {
  newErrors.phone = t('auth.validation.phoneInvalid');
} else if (fieldValidation.phone.status === 'invalid') {
  newErrors.phone = fieldValidation.phone.message;
}

if (!formData.password) {
  newErrors.password = t('auth.validation.passwordRequired');
} else if (validatePasswordStrength(formData.password).length > 0) {
  newErrors.password = t('auth.validation.passwordWeak');
}

if (!formData.confirmPassword) {
  newErrors.confirmPassword = t('auth.validation.confirmPasswordRequired');
} else if (formData.password !== formData.confirmPassword) {
  newErrors.confirmPassword = t('auth.validation.passwordMismatch');
}

if (!formData.workingAreas || formData.workingAreas.length === 0) {
  newErrors.workingAreas = t('auth.validation.workingAreasRequired');
  console.log('⚠️ ERREUR workingAreas ajoutée:', newErrors.workingAreas); 
}
console.log('🔍 AVANT SWITCH - serviceType:', formData.serviceType);
console.log('🔍 serviceDetails object:', serviceDetails);

    // Si recrutement seul → pas besoin de valider les détails de service
    if (formData.seekingType === 'recruitment') {
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    switch (formData.serviceType) {
      case 'babysitting':
        if (!serviceDetails.age) {
          newErrors['serviceDetails.age'] = t('validation.ageRequired');
        } else if (parseInt(serviceDetails.age) < 15) {
          newErrors['serviceDetails.age'] = t('validation.ageMin15');
        }        if (!serviceDetails.ageGroups || serviceDetails.ageGroups.length === 0) newErrors['serviceDetails.ageGroups'] = t('validation.selectAtLeastOne');
        if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) newErrors['serviceDetails.availability_days'] = t('validation.availabilityDaysRequired');
        if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
        if (!serviceDetails.babysitting_types || serviceDetails.babysitting_types.length === 0) newErrors['serviceDetails.babysitting_types'] = t('validation.selectAtLeastOne');
        if (serviceDetails.can_travel_alone === undefined) newErrors['serviceDetails.can_travel_alone'] = t('validation.canTravelAloneRequired');
        if (!serviceDetails.languages || serviceDetails.languages.length === 0) newErrors['serviceDetails.languages'] = t('validation.selectAtLeastOne');
        break;

case 'cleaning':
  if (!serviceDetails.legalStatus) newErrors['serviceDetails.legalStatus'] = t('validation.legalStatusRequired');  if (!serviceDetails.cleaningTypes || serviceDetails.cleaningTypes.length === 0) newErrors['serviceDetails.cleaningTypes'] = t('validation.selectAtLeastOne');
if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  break;
case 'gardening':  if (!serviceDetails.services || serviceDetails.services.length === 0) newErrors['serviceDetails.services'] = t('validation.selectAtLeastOne');
  if (!serviceDetails.seasons || serviceDetails.seasons.length === 0) newErrors['serviceDetails.seasons'] = t('validation.selectAtLeastOne');
  if (!serviceDetails.equipment || serviceDetails.equipment.length === 0) newErrors['serviceDetails.equipment'] = t('validation.selectAtLeastOne');
  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  break;

case 'petcare':
  if (!serviceDetails.animalTypes || serviceDetails.animalTypes.length === 0) newErrors['serviceDetails.animalTypes'] = t('validation.selectAtLeastOne');
  if (serviceDetails.animalTypes?.includes('כלבים') && (!serviceDetails.dogSizes || serviceDetails.dogSizes.length === 0)) {
    newErrors['serviceDetails.dogSizes'] = t('validation.selectAtLeastOne');
  }
  if (!serviceDetails.location) newErrors['serviceDetails.location'] = t('validation.locationRequired');  if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) {
    newErrors['serviceDetails.availability_days'] = t('validation.availabilityDaysRequired');
  }
  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  break;

   case 'tutoring':        if (!serviceDetails.subjects || serviceDetails.subjects.length === 0) newErrors['serviceDetails.subjects'] = t('validation.selectAtLeastOne');
        // levels is optional
        // qualifications is optional
        if (!serviceDetails.teachingMode) newErrors['serviceDetails.teachingMode'] = t('validation.teachingModeRequired');
        if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) {
  newErrors['serviceDetails.availability_days'] = t('validation.availabilityDaysRequired');
}
if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
  newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
}
        break;

      case 'sports_activities':
        if (!serviceDetails.subjects || serviceDetails.subjects.length === 0) newErrors['serviceDetails.subjects'] = t('validation.selectAtLeastOne');
        if (!serviceDetails.teachingMode) newErrors['serviceDetails.teachingMode'] = t('validation.teachingModeRequired');
        if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) newErrors['serviceDetails.availability_days'] = t('validation.availabilityDaysRequired');
        if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
        break;

     case 'eldercare':
        if (!serviceDetails.careTypes || serviceDetails.careTypes.length === 0) newErrors['serviceDetails.careTypes'] = t('validation.selectAtLeastOne');
        if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) newErrors['serviceDetails.availability_days'] = t('validation.availabilityDaysRequired');
        if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');        if (!serviceDetails.age) newErrors['serviceDetails.age'] = t('validation.ageRequired');
        if (!serviceDetails.languages || serviceDetails.languages.length === 0) newErrors['serviceDetails.languages'] = t('validation.selectAtLeastOne');
        break;

case 'electrician':  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
    newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
  }
  if (serviceDetails.work_types?.includes('תיקונים') && (!serviceDetails.repair_types || serviceDetails.repair_types.length === 0)) {
    newErrors['serviceDetails.repair_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('התקנות') && (!serviceDetails.installation_types || serviceDetails.installation_types.length === 0)) {
    newErrors['serviceDetails.installation_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('עבודות חשמל גדולות') && (!serviceDetails.large_work_types || serviceDetails.large_work_types.length === 0)) {
    newErrors['serviceDetails.large_work_types'] = t('validation.selectAtLeastOne');
  }
  break;

case 'plumbing':  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
    newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
  }
  if (serviceDetails.work_types?.includes('סתימות') && (!serviceDetails.blockage_types || serviceDetails.blockage_types.length === 0)) {
    newErrors['serviceDetails.blockage_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('תיקון צנרת') && (!serviceDetails.pipe_repair_types || serviceDetails.pipe_repair_types.length === 0)) {
    newErrors['serviceDetails.pipe_repair_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('עבודות גדולות') && (!serviceDetails.large_work_types || serviceDetails.large_work_types.length === 0)) {
    newErrors['serviceDetails.large_work_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('תיקון והתקנת אביזרי אינסטלציה') && (!serviceDetails.fixture_types || serviceDetails.fixture_types.length === 0)) {
    newErrors['serviceDetails.fixture_types'] = t('validation.selectAtLeastOne');
  }
  break

case 'laundry':  if (!serviceDetails.laundryTypes || serviceDetails.laundryTypes.length === 0) newErrors['serviceDetails.laundryTypes'] = t('validation.selectAtLeastOne');
  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  break;

   case 'property_management':        if (!serviceDetails.management_type || serviceDetails.management_type.length === 0) {
          newErrors['serviceDetails.management_type'] = t('validation.selectAtLeastOne');
        }
        if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
          newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
        }
        break;

        case 'air_conditioning':        if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
          newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
        }
        if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
          newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
        }
        if (serviceDetails.work_types?.includes('התקנת מזגנים') && (!serviceDetails.installation_types || serviceDetails.installation_types.length === 0)) {
          newErrors['serviceDetails.installation_types'] = t('validation.selectAtLeastOne');
        }
        if (serviceDetails.work_types?.includes('תיקון מזגנים') && (!serviceDetails.repair_types || serviceDetails.repair_types.length === 0)) {
          newErrors['serviceDetails.repair_types'] = t('validation.selectAtLeastOne');
        }
        if (serviceDetails.work_types?.includes('פירוק והרכבת מזגנים') && (!serviceDetails.disassembly_types || serviceDetails.disassembly_types.length === 0)) {
          newErrors['serviceDetails.disassembly_types'] = t('validation.selectAtLeastOne');
        }
        break;

       case 'gas_technician':        if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
          newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
        }
        if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
          newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
        }
        if (serviceDetails.work_types?.includes('התקנת צנרת גז בבית') && (!serviceDetails.installation_types || serviceDetails.installation_types.length === 0)) {
          newErrors['serviceDetails.installation_types'] = t('validation.selectAtLeastOne');
        }
        if (serviceDetails.work_types?.includes('תיקוני גז בבית') && (!serviceDetails.repair_types || serviceDetails.repair_types.length === 0)) {
          newErrors['serviceDetails.repair_types'] = t('validation.selectAtLeastOne');
        }
        if (!serviceDetails.license_type || serviceDetails.license_type.length === 0) {
          newErrors['serviceDetails.license_type'] = t('validation.selectAtLeastOne');
        }
      break;

     case 'drywall':  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
    newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
  }
  if (serviceDetails.work_types?.includes('עיצובים בגבס') && (!serviceDetails.design_types || serviceDetails.design_types.length === 0)) {
    newErrors['serviceDetails.design_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('עבודות גבס') && (!serviceDetails.construction_types || serviceDetails.construction_types.length === 0)) {
    newErrors['serviceDetails.construction_types'] = t('validation.selectAtLeastOne');
  }
  break;

case 'carpentry':  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
    newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
  }
  if (serviceDetails.work_types?.includes('בניית רהיטים') && (!serviceDetails.furniture_building_types || serviceDetails.furniture_building_types.length === 0)) {
    newErrors['serviceDetails.furniture_building_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('תיקון רהיטים') && (!serviceDetails.furniture_repair_types || serviceDetails.furniture_repair_types.length === 0)) {
    newErrors['serviceDetails.furniture_repair_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('עבודות נגרות אחרות') && (!serviceDetails.other_carpentry_types || serviceDetails.other_carpentry_types.length === 0)) {
    newErrors['serviceDetails.other_carpentry_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('נגרות חוץ')) {
  if (serviceDetails.outdoor_carpentry_types?.includes('פרגולות') && (!serviceDetails.pergola_types || serviceDetails.pergola_types.length === 0)) {
    newErrors['serviceDetails.pergola_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.outdoor_carpentry_types?.includes('דקים') && (!serviceDetails.deck_types || serviceDetails.deck_types.length === 0)) {
    newErrors['serviceDetails.deck_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.outdoor_carpentry_types?.includes('גדרות ומחיצות עץ') && (!serviceDetails.fence_types || serviceDetails.fence_types.length === 0)) {
    newErrors['serviceDetails.fence_types'] = t('validation.selectAtLeastOne');
  }
}
 break;

case 'home_organization':  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
    newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
  }
  if (serviceDetails.work_types?.includes('סידור כללי') && (!serviceDetails.general_organization_types || serviceDetails.general_organization_types.length === 0)) {
    newErrors['serviceDetails.general_organization_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('סידור + מיון') && (!serviceDetails.sorting_types || serviceDetails.sorting_types.length === 0)) {
    newErrors['serviceDetails.sorting_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('ארגון מקצועי') && (!serviceDetails.professional_organization_types || serviceDetails.professional_organization_types.length === 0)) {
    newErrors['serviceDetails.professional_organization_types'] = t('validation.selectAtLeastOne');
  }
  break;

  case 'event_entertainment':
  if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) {
    newErrors['serviceDetails.availability_days'] = t('validation.availabilityDaysRequired');
  }
  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
    newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
  }

  // Validation השכרת ציוד לאירועים
  if (serviceDetails.work_types?.includes('השכרת ציוד לאירועים') && (!serviceDetails.equipment_rental_types || serviceDetails.equipment_rental_types.length === 0)) {
    newErrors['serviceDetails.equipment_rental_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.equipment_rental_types?.includes('🍿 מכונות מזון') && (!serviceDetails.food_machine_types || serviceDetails.food_machine_types.length === 0)) {
    newErrors['serviceDetails.food_machine_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.equipment_rental_types?.includes('🎪 השכרת מתנפחים ומשחקים') && (!serviceDetails.inflatable_game_types || serviceDetails.inflatable_game_types.length === 0)) {
    newErrors['serviceDetails.inflatable_game_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.equipment_rental_types?.includes('💨 מכונות אפקטים להשכרה') && (!serviceDetails.effect_machine_types || serviceDetails.effect_machine_types.length === 0)) {
    newErrors['serviceDetails.effect_machine_types'] = t('validation.selectAtLeastOne');
  }

  // Validation סוגי ההפעלה
  if (serviceDetails.work_types?.includes('סוגי ההפעלה') && (!serviceDetails.entertainment_types || serviceDetails.entertainment_types.length === 0)) {
    newErrors['serviceDetails.entertainment_types'] = t('validation.selectAtLeastOne');
  }

  // Validation אחר
  if (serviceDetails.work_types?.includes('אחר') && (!serviceDetails.other_types || serviceDetails.other_types.length === 0)) {
    newErrors['serviceDetails.other_types'] = t('validation.selectAtLeastOne');
  }
  break;

  case 'dj':
    if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) {
      newErrors['serviceDetails.availability_days'] = t('validation.availabilityDaysRequired');
    }
    if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
      newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
    }
    if (!serviceDetails.dj_event_types || serviceDetails.dj_event_types.length === 0) {
      newErrors['serviceDetails.dj_event_types'] = t('validation.selectAtLeastOne');
    }
  break;

case 'private_chef':    if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
      newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
    }
    if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
      newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
    }
    if (serviceDetails.work_types?.includes('סוג המטבח') && (!serviceDetails.cuisine_types || serviceDetails.cuisine_types.length === 0)) {
      newErrors['serviceDetails.cuisine_types'] = t('validation.selectAtLeastOne');
    }
    if (serviceDetails.work_types?.includes('כשרות') && (!serviceDetails.kosher_types || serviceDetails.kosher_types.length === 0)) {
      newErrors['serviceDetails.kosher_types'] = t('validation.selectAtLeastOne');
    }
    break;

case 'painting':  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
    newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
  }
  break;

 case 'waterproofing':  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
    newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
  }
  if (serviceDetails.work_types?.includes('roofWaterproofing') && (!serviceDetails.roof_waterproofing_types || serviceDetails.roof_waterproofing_types.length === 0)) {
    newErrors['serviceDetails.roof_waterproofing_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('wallWaterproofing') && (!serviceDetails.wall_waterproofing_types || serviceDetails.wall_waterproofing_types.length === 0)) {
    newErrors['serviceDetails.wall_waterproofing_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('balconyWaterproofing') && (!serviceDetails.balcony_waterproofing_types || serviceDetails.balcony_waterproofing_types.length === 0)) {
    newErrors['serviceDetails.balcony_waterproofing_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('wetRoomWaterproofing') && (!serviceDetails.wet_room_waterproofing_types || serviceDetails.wet_room_waterproofing_types.length === 0)) {
    newErrors['serviceDetails.wet_room_waterproofing_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('undergroundWaterproofing') && (!serviceDetails.underground_waterproofing_types || serviceDetails.underground_waterproofing_types.length === 0)) {
    newErrors['serviceDetails.underground_waterproofing_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('inspectionEquipment') && (!serviceDetails.inspection_equipment_types || serviceDetails.inspection_equipment_types.length === 0)) {
    newErrors['serviceDetails.inspection_equipment_types'] = t('validation.selectAtLeastOne');
  }
  break;

case 'contractor':  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
    newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
  }
  if (serviceDetails.work_types?.includes('עבודות שלד') && (!serviceDetails.structure_work_types || serviceDetails.structure_work_types.length === 0)) {
    newErrors['serviceDetails.structure_work_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('שיפוצים כלליים') && (!serviceDetails.general_renovation_types || serviceDetails.general_renovation_types.length === 0)) {
    newErrors['serviceDetails.general_renovation_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('חשמל ואינסטלציה') && (!serviceDetails.electric_plumbing_types || serviceDetails.electric_plumbing_types.length === 0)) {
    newErrors['serviceDetails.electric_plumbing_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('עבודות חוץ') && (!serviceDetails.exterior_work_types || serviceDetails.exterior_work_types.length === 0)) {
    newErrors['serviceDetails.exterior_work_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('שיקום ותיקון חוץ') && (!serviceDetails.facade_repair_types || serviceDetails.facade_repair_types.length === 0)) {
    newErrors['serviceDetails.facade_repair_types'] = t('validation.selectAtLeastOne');
  }
 break;

case 'aluminum':  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
    newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
  }
  if (serviceDetails.work_types?.includes('חלונות ודלתות') && (!serviceDetails.windows_doors_types || serviceDetails.windows_doors_types.length === 0)) {
    newErrors['serviceDetails.windows_doors_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('פרגולות ואלומיניום חוץ') && (!serviceDetails.pergolas_outdoor_types || serviceDetails.pergolas_outdoor_types.length === 0)) {
    newErrors['serviceDetails.pergolas_outdoor_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('תיקונים ושירות') && (!serviceDetails.repairs_service_types || serviceDetails.repairs_service_types.length === 0)) {
    newErrors['serviceDetails.repairs_service_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('חיפויי אלומיניום') && (!serviceDetails.cladding_types || serviceDetails.cladding_types.length === 0)) {
  newErrors['serviceDetails.cladding_types'] = t('validation.selectAtLeastOne');
}
  break;

case 'glass_works':  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
    newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
  }
  if (serviceDetails.work_types?.includes('זכוכית למקלחונים') && (!serviceDetails.shower_glass_types || serviceDetails.shower_glass_types.length === 0)) {
    newErrors['serviceDetails.shower_glass_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('זכוכית לחלונות ודלתות') && (!serviceDetails.windows_doors_glass_types || serviceDetails.windows_doors_glass_types.length === 0)) {
    newErrors['serviceDetails.windows_doors_glass_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('זכוכית למטבח ובית') && (!serviceDetails.kitchen_home_glass_types || serviceDetails.kitchen_home_glass_types.length === 0)) {
    newErrors['serviceDetails.kitchen_home_glass_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('זכוכית מיוחדת ובטיחות') && (!serviceDetails.special_safety_glass_types || serviceDetails.special_safety_glass_types.length === 0)) {
    newErrors['serviceDetails.special_safety_glass_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('שירותי תיקון והתאמה אישית') && (!serviceDetails.repair_custom_types || serviceDetails.repair_custom_types.length === 0)) {
    newErrors['serviceDetails.repair_custom_types'] = t('validation.selectAtLeastOne');
  }
  break;

 case 'locksmith':  if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) {
    newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
  }
  if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) {
    newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
  }
  if (serviceDetails.work_types?.includes('החלפת מנעולים') && (!serviceDetails.lock_replacement_types || serviceDetails.lock_replacement_types.length === 0)) {
    newErrors['serviceDetails.lock_replacement_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('פתיחת דלתות') && (!serviceDetails.door_opening_types || serviceDetails.door_opening_types.length === 0)) {
    newErrors['serviceDetails.door_opening_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('התקנת מערכות נעילה') && (!serviceDetails.lock_system_installation_types || serviceDetails.lock_system_installation_types.length === 0)) {
    newErrors['serviceDetails.lock_system_installation_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('תיקון מנעולים ודלתות') && (!serviceDetails.lock_door_repair_types || serviceDetails.lock_door_repair_types.length === 0)) {
    newErrors['serviceDetails.lock_door_repair_types'] = t('validation.selectAtLeastOne');
  }
  if (serviceDetails.work_types?.includes('שירותי ביטחון') && (!serviceDetails.security_services_types || serviceDetails.security_services_types.length === 0)) {
    newErrors['serviceDetails.security_services_types'] = t('validation.selectAtLeastOne');
  }
  break;

  case 'moving':    if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0)
      newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
    break;

  case 'photographer':    if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0)
      newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
    if (!serviceDetails.work_types || serviceDetails.work_types.length === 0)
      newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
    break;

  case 'event_decoration':    if (!serviceDetails.decoration_types || serviceDetails.decoration_types.length === 0)
      newErrors['serviceDetails.decoration_types'] = t('validation.selectAtLeastOne');
    if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0)
      newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
    break;

  case 'handyman':
    if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0)
      newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
    if (!serviceDetails.work_types || serviceDetails.work_types.length === 0)
      newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
    if (serviceDetails.work_types?.includes('תיקונים כלליים') && (!serviceDetails.general_repairs_types || serviceDetails.general_repairs_types.length === 0))
      newErrors['serviceDetails.general_repairs_types'] = t('validation.selectAtLeastOne');
    if (serviceDetails.work_types?.includes('התקנות והרכבות') && (!serviceDetails.installations_types || serviceDetails.installations_types.length === 0))
      newErrors['serviceDetails.installations_types'] = t('validation.selectAtLeastOne');
    if (serviceDetails.work_types?.includes('דלתות ורהיטים') && (!serviceDetails.doors_furniture_types || serviceDetails.doors_furniture_types.length === 0))
      newErrors['serviceDetails.doors_furniture_types'] = t('validation.selectAtLeastOne');
    if (serviceDetails.work_types?.includes('עבודות קלות בבית') && (!serviceDetails.light_work_types || serviceDetails.light_work_types.length === 0))
      newErrors['serviceDetails.light_work_types'] = t('validation.selectAtLeastOne');
    if (serviceDetails.work_types?.includes('תליות וסידור') && (!serviceDetails.hanging_types || serviceDetails.hanging_types.length === 0))
      newErrors['serviceDetails.hanging_types'] = t('validation.selectAtLeastOne');
    break;

  case 'mechanic':
    if (!serviceDetails.work_types || serviceDetails.work_types.length === 0)
      newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
    break;

  case 'metalwork':
    if (!serviceDetails.work_types || serviceDetails.work_types.length === 0)
      newErrors['serviceDetails.work_types'] = t('validation.workTypesRequired');
    if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0)
      newErrors['serviceDetails.availability_hours'] = t('validation.availabilityHoursRequired');
    break;

    }

// Juste avant setErrors(newErrors);
console.log('📋 VRAIES ERREURS newErrors:', JSON.stringify(newErrors));
setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        scrollToFirstError(newErrors, 2);
      }, 100);
      return false;  // ← AJOUTE CETTE LIGNE ICI
    }
    
    return true;  // ← CHANGE CETTE LIGNE (au lieu de Object.keys...)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'email' && mode === 'register' && step === 2) {
      clearTimeout(emailCheckTimeout.current);
      
      if (fieldValidation.email.status !== 'invalid') {
        setFieldValidation(prev => ({ 
          ...prev, 
          email: { status: 'idle', message: '' } 
        }));
      }

      if (validateEmail(value)) {
        emailCheckTimeout.current = setTimeout(() => {
          checkEmailExists(value);
        }, 1000);
      } else if (value.trim()) {
  setFieldValidation(prev => ({ 
    ...prev, 
    email: { status: 'invalid', message: t('auth.validation.emailInvalid') } 
  }));
} else {
        setFieldValidation(prev => ({ 
          ...prev, 
          email: { status: 'idle', message: '' } 
        }));
      }
    }

 if (name === 'password' && mode === 'register' && step === 2) {
  clearTimeout(passwordCheckTimeout.current);
  if (value.trim()) {
    const missingRequirements = validatePasswordStrength(value);
    
    if (missingRequirements.length > 0) {
  setFieldValidation(prev => ({ 
    ...prev, 
    password: { status: 'invalid', message: `${t('auth.validation.missing')}: ${missingRequirements.join(', ')}` } 
  }));
} else {
  setFieldValidation(prev => ({ 
    ...prev, 
    password: { status: 'valid', message: t('auth.validation.strongPassword') } 
  }));
      
      // Puis vérifier si le compte existe
      passwordCheckTimeout.current = setTimeout(() => {
        checkPasswordForExistingAccount(formData.email, value);
      }, 800);
    }
  } else {
    setFieldValidation(prev => ({ 
      ...prev, 
      password: { status: 'idle', message: '' } 
    }));
  }
}

    if (name === 'confirmPassword' && mode === 'register' && step === 2) {
      validateConfirmPassword(value);
    }

    if (name === 'name' && mode === 'register' && step === 2) {
  clearTimeout(window.identityCheckTimeout);
  window.identityCheckTimeout = setTimeout(() => {
    if (formData.phone || formData.email) {
      checkIdentityConflict(formData.phone, formData.email, value);
    }
  }, 1000);
}

    if (name === 'phone' && mode === 'register' && step === 2) {
      clearTimeout(phoneCheckTimeout.current);
      
      if (!value.trim()) {
        setFieldValidation(prev => ({ 
          ...prev, 
          phone: { status: 'idle', message: '' } 
        }));
        return;
      }
      
      if (validatePhone(value)) {
        phoneCheckTimeout.current = setTimeout(() => {
          checkPhoneExists(value, formData.serviceType);
        }, 1000);
      } else {
  setFieldValidation(prev => ({ 
    ...prev, 
    phone: { status: 'invalid', message: t('auth.validation.phoneInvalid') } 
  }));
}
    }
  };

  const handlePhoneBlur = () => {
    if (mode === 'register' && step === 2) {
      validatePhoneField(formData.phone);
    }
  };

  const handleServiceDetailsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        [field]: value
      }
    }));

    const errorKey = `serviceDetails.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const handleRecruitmentDetailsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      recruitmentDetails: { ...prev.recruitmentDetails, [field]: value }
    }));
    const key = `recruitment.${field}`;
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const handleServiceChange = (serviceType) => {
    setFormData(prev => ({
      ...prev,
      serviceType,
      serviceDetails: {}
    }));
    
    if (errors.serviceType) {
      setErrors(prev => ({ ...prev, serviceType: '' }));
    }
  };

  const handleWorkingAreasChange = (neighborhood) => {
    setFormData(prev => {
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

    if (errors.workingAreas) {
      setErrors(prev => ({ ...prev, workingAreas: '' }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
   if (!allowedFormats.includes(file.type)) {
  setImageError(t('auth.validation.imageFormatError'));
  e.target.value = '';
  return;
}

const MAX_SIZE = 5 * 1024 * 1024;

if (file.size > MAX_SIZE) {
  setImageError(t('auth.validation.imageSizeError'));
  e.target.value = '';
  return;
}

    setImageError('');

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: file.type
      };

      const compressedFile = await imageCompression(file, options);
      const previewUrl = URL.createObjectURL(compressedFile);
      
      setFormData(prev => ({
        ...prev,
        profileImage: compressedFile,
        profileImagePreview: previewUrl
      }));

      console.log(`✅ Image compressée: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);

    } catch (error) {
      console.error('Erreur compression:', error);
     setImageError(t('auth.validation.imageCompressionError'));
      e.target.value = '';
    }
  };

  useEffect(() => {
    return () => {
      if (formData.profileImagePreview) {
        URL.revokeObjectURL(formData.profileImagePreview);
      }
    };
  }, [formData.profileImagePreview]);

  const handleStep1Submit = (e) => {
    e.preventDefault();
    
    if (!validateStep1()) return;

    if (mode === 'login') {
      handleFinalSubmit();
    } else {
      setStep(2);
    }
  };

const handleStep2Submit = (e) => {
  e.preventDefault();
  
  console.log('🚀 handleStep2Submit appelé');
  
  // ✅ LIRE LES VALEURS DIRECTEMENT DU DOM AVANT VALIDATION
  if (formData.serviceType === 'babysitting') {
    const ageInput = document.querySelector('[data-field="age"]');
    const experienceInput = document.querySelector('[data-field="experience"]');
    const hourlyRateInput = document.querySelector('[data-field="hourlyRate"]');
    const canTravelSelect = document.querySelector('[data-field="can_travel_alone"]');
    
    console.log('🎯 LECTURE DIRECTE DU DOM:', {
      age: ageInput?.value,
      experience: experienceInput?.value,
      hourlyRate: hourlyRateInput?.value,
      can_travel_alone: canTravelSelect?.value,
      can_travel_alone_raw: canTravelSelect
    });
    
    // Mettre à jour formData.serviceDetails avec les VRAIES valeurs du DOM
    setFormData(prev => {
      const newServiceDetails = {
        ...prev.serviceDetails,
        age: ageInput?.value || prev.serviceDetails.age,
        experience: experienceInput?.value || prev.serviceDetails.experience,
        hourlyRate: hourlyRateInput?.value || prev.serviceDetails.hourlyRate
      };
      
      // ✅ Gérer can_travel_alone séparément
      if (canTravelSelect && canTravelSelect.value !== '') {
        newServiceDetails.can_travel_alone = canTravelSelect.value === 'yes';
      } else if (prev.serviceDetails.can_travel_alone !== undefined) {
        // Garder la valeur existante si le select est vide mais qu'on a déjà une valeur
        newServiceDetails.can_travel_alone = prev.serviceDetails.can_travel_alone;
      }
      
      console.log('📝 NEW serviceDetails:', newServiceDetails);
      
      return {
        ...prev,
        serviceDetails: newServiceDetails
      };
    });
    
    // Attendre que l'état soit mis à jour avant de valider
    setTimeout(() => {
      const isValid = validateStep2();
      console.log('✅ Validation result:', isValid);
      console.log('❌ Errors après validation:', errors);
      console.log('❌ Errors après validation:', JSON.stringify(errors));
      
      if (!isValid) {
        console.log('❌ Validation échouée - arrêt');
        return;
      }

      if (formData.seekingType !== 'clients') {
        setStep(3);
        return;
      }
      handleFinalSubmit();
    }, 50);
    
    return;
  }
  
  // Pour les autres services, validation normale
  const isValid = validateStep2();
  console.log('✅ Validation result:', isValid);
  console.log('❌ Errors après validation:', errors);
  
if (!isValid) {
    console.log('❌ Validation échouée - arrêt');
    return;
  }
  
  // Si recrutement → step 3
  if (formData.seekingType !== 'clients') {
    setStep(3);
    return;
  }

  handleFinalSubmit();
};

  const validateStep3 = () => {
    const newErrors = {};
    const rd = formData.recruitmentDetails;
    if (!rd.contract_type) newErrors['recruitment.contract_type'] = t('recruitment.error.contract_type');
    if (!rd.salary?.trim()) newErrors['recruitment.salary'] = t('recruitment.error.salary');
    if (!rd.payment_type) newErrors['recruitment.payment_type'] = t('recruitment.error.payment_type');
    if (!rd.availability_days || rd.availability_days.length === 0) newErrors['recruitment.availability_days'] = t('recruitment.error.availability_days');
    if (!rd.availability_hours || rd.availability_hours.length === 0) newErrors['recruitment.availability_hours'] = t('recruitment.error.availability_hours');
    if (!rd.experience_required) newErrors['recruitment.experience_required'] = t('recruitment.error.experience_required');
    if (!rd.description?.trim()) newErrors['recruitment.description'] = t('recruitment.error.description');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep3Submit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) {
      setTimeout(() => {
        const firstError = document.querySelector('.auth-form .error-text');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }
    handleFinalSubmit();
  };

 const handleFinalSubmit = async () => {
  setIsSubmitting(true);
  setSubmitError('');

  try {
    let result;
    
    if (mode === 'login') {
      result = await login(formData.email, formData.password);
    } else {
      const registrationFormData = new FormData();
      
      registrationFormData.append('name', formData.name);
      registrationFormData.append('email', formData.email);
      registrationFormData.append('phone', formData.phone.replace(/[\s\-(). /]/g, ''));
      registrationFormData.append('password', formData.password);
      registrationFormData.append('role', 'provider');
      console.log('serviceType:', formData.serviceType);
      registrationFormData.append('serviceType', formData.serviceType);
      registrationFormData.append('seekingType', formData.seekingType);
      
      if (formData.profileImage) {
        registrationFormData.append('profileImage', formData.profileImage);
      }
      
      if (formData.serviceDetails && Object.keys(formData.serviceDetails).length > 0) {
        console.log('📤 ENVOI serviceDetails:', formData.serviceDetails);
        registrationFormData.append('serviceDetails', JSON.stringify(formData.serviceDetails));
      }
      
      if (formData.workingAreas && formData.workingAreas.length > 0) {
        registrationFormData.append('workingAreas', JSON.stringify(formData.workingAreas));
      }

      if (formData.tranziliaToken) {
        registrationFormData.append('tranziliaToken', formData.tranziliaToken);
      }

      result = await register(registrationFormData, true);
    }

    if (!result?.success) {
      console.error(`❌ ${mode === 'login' ? 'Login' : 'Registration'} error:`, result);
      const firstFieldError = result?.errors?.[0]?.message;
      setSubmitError(firstFieldError || result?.message || t('auth.errors.serverError'));
      return;
    }

    if (result.success) {
      if (mode === 'register') {
        localStorage.setItem('activeService', formData.serviceType);

        // Si recrutement → créer le job listing
        if (formData.seekingType !== 'clients' && Object.keys(formData.recruitmentDetails).length > 0) {
          try {
            const token = result.data?.token || localStorage.getItem('homesherut_token');
            await fetch('/api/recruitment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ ...formData.recruitmentDetails, service_type: formData.serviceType }),
            });
          } catch (err) {
            console.error('Erreur création job listing:', err);
          }
        }

        setSuccessData({
          userRole: 'provider',
          userName: formData.name,
          serviceType: formData.serviceType,
          seekingType: formData.seekingType,
          isPremium: result.data?.user?.isPremium || false
        });
        setShowSuccess(true);
      } else {
        onClose();
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      }
    }

  } catch (error) {
    console.error('Auth error:', error);
    setSubmitError(error?.message || t('auth.errors.serverError'));
  } finally {
    setIsSubmitting(false);
  }
};

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setStep(1);
    setErrors({});
    setSubmitError('');
    setFieldValidation({
      email: { status: 'idle', message: '' },
      phone: { status: 'idle', message: '' },
      password: { status: 'idle', message: '' },
      confirmPassword: { status: 'idle', message: '' }
    });
    clearError();
  };

  const getValidationIcon = (field) => {
    const validation = fieldValidation[field];
    if (validation.status === 'checking') {
      return <Loader className="animate-spin text-blue-500" size={16} />;
    }
    if (validation.status === 'valid') {
      return <CheckCircle className="text-green-500" size={16} />;
    }
    if (validation.status === 'invalid') {
      return <AlertCircle className="text-red-500" size={16} />;
    }
    return null;
  };

const renderWorkingAreasSection = () => {
  if (mode !== 'register' || step !== 2) return null;

  const handleLocationModeChange = (newMode) => {
    setLocationMode(newMode);
    setSelectedEzor('');
    setSelectedCity('');
    setAvailableNeighborhoods([]);
    if (errors.workingAreas) setErrors(prev => ({ ...prev, workingAreas: '' }));

    if (newMode === 'israel') {
      setFormData(prev => ({ ...prev, workingAreas: [{ city: 'ישראל', neighborhood: 'כל ישראל' }] }));
    } else {
      setFormData(prev => ({ ...prev, workingAreas: [] }));
    }
  };

  const locationModes = [
    { value: 'israel',       label: 'כל ישראל' },
    { value: 'ezor',         label: 'לפי אזור' },
    { value: 'city',         label: 'לפי עיר' },
    { value: 'neighborhood', label: 'לפי שכונה' },
  ];

  const ezorim = ['מרכז', 'שרון', 'שפלה', 'ירושלים', 'צפון', 'חיפה', 'דרום', 'יהודה ושומרון'];

  return (
    <div className="input-group">
      <label className="auth-form-label required">{t('auth.workingAreas')}</label>

      {/* שלב 1: בחירת רמה */}
      <div className="location-mode-selector">
        {locationModes.map(({ value, label }) => (
          <label key={value} className={`location-mode-option${locationMode === value ? ' selected' : ''}`}>
            <input
              type="radio"
              name="locationMode"
              value={value}
              checked={locationMode === value}
              onChange={() => handleLocationModeChange(value)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      {/* Cas 1: לפי אזור */}
      {locationMode === 'ezor' && (
        <div className="ezor-grid">
          {ezorim.map(ezor => {
            const isChecked = formData.workingAreas.some(a => a.city === ezor && a.neighborhood === 'כל האזור');
            return (
              <label key={ezor} className={`ezor-option${isChecked ? ' selected' : ''}`}>
                <input
                  type="checkbox"
                  value={ezor}
                  checked={isChecked}
                  onChange={() => {
                    setFormData(prev => {
                      const alreadySelected = prev.workingAreas.some(a => a.city === ezor && a.neighborhood === 'כל האזור');
                      if (alreadySelected) {
                        return { ...prev, workingAreas: prev.workingAreas.filter(a => !(a.city === ezor && a.neighborhood === 'כל האזור')) };
                      }
                      return { ...prev, workingAreas: [...prev.workingAreas, { city: ezor, neighborhood: 'כל האזור' }] };
                    });
                    if (errors.workingAreas) setErrors(prev => ({ ...prev, workingAreas: '' }));
                  }}
                />
                {ezor}
              </label>
            );
          })}
        </div>
      )}

      {/* Cas 2: לפי עיר */}
      {locationMode === 'city' && (
        <div className="city-selector">
          <CustomDropdown
            name="city"
            options={cities}
            value=""
            onChange={(e) => {
              const city = e.target.value;
              setSelectedCity(city);
              if (city) {
                const other = formData.workingAreas.filter(a => a.city !== city);
                setFormData(prev => ({ ...prev, workingAreas: [...other, { city, neighborhood: 'כל העיר' }] }));
              } else {
                setFormData(prev => ({ ...prev, workingAreas: [] }));
              }
              if (errors.workingAreas) setErrors(prev => ({ ...prev, workingAreas: '' }));
            }}
            placeholder={formData.workingAreas.length > 0 ? t('auth.selectAnotherCity') : t('auth.selectCity')}
            error={errors.workingAreas}
          />
          {selectedCity && (
            <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #22c55e' }}>
              <label className="checkbox-item" style={{ fontWeight: '600' }}>
                <input
                  type="checkbox"
                  checked={formData.workingAreas?.some(a => a.city === selectedCity && a.neighborhood === 'כל העיר')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const other = formData.workingAreas.filter(a => a.city !== selectedCity);
                      setFormData(prev => ({ ...prev, workingAreas: [...other, { city: selectedCity, neighborhood: 'כל העיר' }] }));
                    } else {
                      setFormData(prev => ({ ...prev, workingAreas: formData.workingAreas.filter(a => !(a.city === selectedCity && a.neighborhood === 'כל העיר')) }));
                    }
                    if (errors.workingAreas) setErrors(prev => ({ ...prev, workingAreas: '' }));
                  }}
                />
                {t('auth.allCity', { city: selectedCity })}
              </label>
            </div>
          )}
        </div>
      )}

      {/* Cas 3: לפי שכונה */}
      {locationMode === 'neighborhood' && (
        <div>
          <div className="city-selector">
            <CustomDropdown
              name="city"
              options={cities}
              value=""
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setFormData(prev => ({ ...prev, workingAreas: prev.workingAreas.filter(a => a.city !== e.target.value) }));
                if (errors.workingAreas) setErrors(prev => ({ ...prev, workingAreas: '' }));
              }}
              placeholder={formData.workingAreas.length > 0 ? t('auth.selectAnotherCity') : t('auth.selectCity')}
              error={errors.workingAreas}
            />
          </div>

          {selectedCity && (
            <>
              <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem', padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #22c55e' }}>
                <label className="checkbox-item" style={{ fontWeight: '600' }}>
                  <input
                    type="checkbox"
                    checked={formData.workingAreas?.some(a => a.city === selectedCity && a.neighborhood === 'כל השכונות')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        const other = formData.workingAreas.filter(a => a.city !== selectedCity);
                        setFormData(prev => ({ ...prev, workingAreas: [...other, { city: selectedCity, neighborhood: 'כל השכונות' }] }));
                      } else {
                        setFormData(prev => ({ ...prev, workingAreas: formData.workingAreas.filter(a => !(a.city === selectedCity && a.neighborhood === 'כל השכונות')) }));
                      }
                      if (errors.workingAreas) setErrors(prev => ({ ...prev, workingAreas: '' }));
                    }}
                  />
                  כל השכונות ב{selectedCity}
                </label>
              </div>

              {!formData.workingAreas?.some(a => a.city === selectedCity && a.neighborhood === 'כל השכונות') && (
                <div style={{ marginTop: '0.5rem' }}>
                  <CustomDropdown
                    name="neighborhood"
                    options={availableNeighborhoods.filter(n =>
                      !formData.workingAreas.some(a => a.city === selectedCity && a.neighborhood === n)
                    )}
                    value=""
                    onChange={(e) => {
                      const n = e.target.value;
                      if (n) {
                        setFormData(prev => ({ ...prev, workingAreas: [...prev.workingAreas, { city: selectedCity, neighborhood: n }] }));
                        if (errors.workingAreas) setErrors(prev => ({ ...prev, workingAreas: '' }));
                      }
                    }}
                    placeholder={t('auth.typeNeighborhood', 'בחר שכונה...')}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* תגיות אזורים שנבחרו */}
      {formData.workingAreas.length > 0 && (
        <div className="selected-areas">
          <h5>{t('auth.selectedAreas')} ({formData.workingAreas.length})</h5>
          <div className="selected-areas-list">
            {formData.workingAreas.map((area, index) => (
              <span key={index} className="area-tag">
                <button
                  type="button"
                  onClick={() => {
                    if (area.neighborhood === 'כל ישראל') {
                      setFormData(prev => ({ ...prev, workingAreas: [] }));
                      setLocationMode('');
                    } else if (area.neighborhood === 'כל האזור') {
                      setFormData(prev => ({ ...prev, workingAreas: [] }));
                      setSelectedEzor('');
                    } else if (area.neighborhood === 'כל העיר' || area.neighborhood === 'כל השכונות') {
                      setFormData(prev => ({ ...prev, workingAreas: prev.workingAreas.filter((_, i) => i !== index) }));
                    } else {
                      handleWorkingAreasChange(area.neighborhood);
                    }
                  }}
                  aria-label="הסר אזור"
                >
                  ×
                </button>
                {area.neighborhood === 'כל ישראל'   ? t('auth.allIsrael') :
                 area.neighborhood === 'כל האזור'   ? `כל אזור ${area.city}` :
                 area.neighborhood === 'כל העיר'    ? t('auth.allCityShort', { city: area.city }) :
                 area.neighborhood === 'כל השכונות' ? `כל שכונות ${area.city}` :
                 `${area.city} - ${area.neighborhood}`}
              </span>
            ))}
          </div>
        </div>
      )}

      {errors.workingAreas && <span className="error-text">{errors.workingAreas}</span>}
    </div>
  );
};

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay">
        <div
          ref={modalRef}
          className="modal-content auth-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>

          <div className="modal-header">
            <h2>{mode === 'login' ? t('auth.modal.loginTitle') : t('auth.modal.registerTitle')}</h2>
            <p className="modal-subtitle">
              {mode === 'login'
                ? t('auth.modal.loginSubtitle')
                : step === 2
                  ? t('auth.modal.step2Subtitle')
                  : ''}
            </p>
          </div>

          {mode === 'register' && step === 1 && (
            <form onSubmit={handleStep1Submit} className="auth-form" autoComplete="off">
              <div className="input-group">
               <label className="auth-form-label required">{t('auth.selectService')}</label>
                <div className="service-selection">
                  {services.map(service => (
                    <button
                      key={service.key}
                      type="button"
                      className={`service-btn ${formData.serviceType === service.key ? 'active' : ''}`}
                      onClick={() => handleServiceChange(service.key)}
                    >
  {service.image ? (
  <div className="service-card-image-wrapper">
    <img src={service.image} alt={service.name} className="service-image" loading="lazy" />
  </div>
) : (
  <div className={`service-icon-fallback ${service.gradient}`}>
    <span style={{ fontSize: '48px' }}>{service.icon}</span>
  </div>
)}
<div className="service-card-label">
  <h3>{service.name}</h3>
</div>
                    </button>
                  ))}
                </div>
                {errors.serviceType && <span className="error-text">{errors.serviceType}</span>}
              </div>

              {/* Seeking type — visible after service is chosen */}
              {formData.serviceType && (
                <div className="input-group">
                  <label className="auth-form-label required">{t('seekingType.title')}</label>
                  <div className="seeking-type-options">
                    {[
                      { value: 'clients',     label: t('seekingType.clients'),     desc: t('seekingType.clientsDesc'),     Icon: Users },
                      { value: 'recruitment', label: t('seekingType.recruitment'), desc: t('seekingType.recruitmentDesc'), Icon: Briefcase },
                    ].map(({ value, label, desc, Icon }) => (
                      <button
                        key={value}
                        type="button"
                        className={`seeking-type-btn ${formData.seekingType === value ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, seekingType: value }))}
                      >
                        <div className="seeking-type-icon-wrap">
                          <Icon size={20} className="seeking-type-icon" />
                        </div>
                        <div className="seeking-type-body">
                          <span className="seeking-type-label">{label}</span>
                          <span className="seeking-type-desc">{desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(error || submitError) && (
                <div className="error-message">
                  <AlertCircle size={20} />
                  <span>{submitError || error}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
               {loading ? (
  <>
    <Loader className="animate-spin" size={18} />
    {t('auth.processing')}
  </>
) : (
  t('auth.continue')
)}
              </button>

              <div className="auth-switch">
                <p>
  {t('auth.alreadyHaveAccount')}{' '}
  <button type="button" onClick={toggleMode} className="link-btn">
    {t('auth.loginHere')}
  </button>
</p>
              </div>
            </form>
          )}

          {mode === 'login' && (
            <form onSubmit={handleStep1Submit} className="auth-form">
              <div className="input-group">
              <label className="auth-form-label required">{t('auth.email')}</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="text"
                    name="email"
                   placeholder={t('auth.emailPlaceholder')}
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`standard-input ${errors.email ? 'error' : ''}`}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="input-group">
                <label className="auth-form-label required">{t('auth.password')}</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                  placeholder={t('auth.passwordPlaceholder')}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`standard-input ${errors.password ? 'error' : ''}`}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="forgot-password-section">
           <Link to="/forgot-password" className="forgot-password-link" onClick={onClose}>
               {t('auth.forgotPassword')}
                </Link>
              </div>

              {(error || submitError) && (
                <div className="error-message">
                  <AlertCircle size={20} />
                  <span>{submitError || error}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
             {loading ? (
  <>
    <Loader className="animate-spin" size={18} />
    {t('auth.loggingIn')}
  </>
) : (
  t('auth.login')
)}
              </button>

              <div className="auth-switch">
               <p>
  {t('auth.noAccount')}{' '}
  <button type="button" onClick={toggleMode} className="link-btn">
    {t('auth.registerHere')}
  </button>
</p>
              </div>
            </form>
          )}

{mode === 'register' && step === 2 && (
  <form onSubmit={handleStep2Submit} className="auth-form" autoComplete="off">
              {/* PARTIE Step 2 - Identique à ton fichier actuel, je n'ai pas modifié cette partie car elle est trop longue */}
              {/* Je peux la compléter si tu veux, mais elle prend beaucoup de place */}
              
              {/* Pour gagner de la place, je te mets juste le début */}
              <div className="input-group">
              <label className="auth-form-label required">{t('auth.fullName')}</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    name="name"
                   placeholder={t('auth.fullNamePlaceholder')}
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`standard-input ${errors.name ? 'error' : ''}`}
                  />
                </div>
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              {/* ... Reste du Step 2 identique à ton fichier ... */}
              {/* Tu peux garder tout le reste de ton Step 2 tel quel */}

              {renderWorkingAreasSection()}
<div className="input-group">
<label className="auth-form-label required">{t('auth.email')}</label>
  <div className="input-wrapper">
    <Mail className="input-icon" size={20} />
    <input
      type="email"
      name="email"
   placeholder={t('auth.emailPlaceholder')}
      value={formData.email}
      onChange={handleInputChange}
      className={`standard-input ${errors.email ? 'error' : ''}`}
    />
    {getValidationIcon('email')}
  </div>
  {fieldValidation.email.message && (
    <span className={`validation-message ${fieldValidation.email.status}`}>
      {fieldValidation.email.message}
    </span>
  )}
  {errors.email && <span className="error-text">{errors.email}</span>}
</div>

<div className="input-group">
 <label className="auth-form-label required">{t('auth.phone')}</label>
  <div className="input-wrapper">
    <Phone className="input-icon" size={20} />
    <input
      type="tel"
      name="phone"
      placeholder="05X-XXXXXXX"
      value={formData.phone}
      onChange={handleInputChange}
      onBlur={handlePhoneBlur}
      className={`standard-input ${errors.phone ? 'error' : ''}`}
    />
    {getValidationIcon('phone')}
  </div>
  {fieldValidation.phone.message && (
    <span className={`validation-message ${fieldValidation.phone.status}`}>
      {fieldValidation.phone.message}
    </span>
  )}
  {errors.phone && <span className="error-text">{errors.phone}</span>}
</div>

<div className="input-group">
<label className="auth-form-label required">{t('auth.password')}</label>
  <div className="input-wrapper">
    <Lock className="input-icon" size={20} />
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder={t('auth.passwordPlaceholder')}
      value={formData.password}
      onChange={handleInputChange}
      className={`standard-input ${errors.password ? 'error' : ''}`}
    />
    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
    {getValidationIcon('password')}
  </div>
  {fieldValidation.password.message && (
    <span className={`validation-message ${fieldValidation.password.status}`}>
      {fieldValidation.password.message}
    </span>
  )}
  {errors.password && <span className="error-text">{errors.password}</span>}
</div>

<div className="input-group">
 <label className="auth-form-label required">{t('auth.confirmPassword')}</label>
  <div className="input-wrapper">
    <Lock className="input-icon" size={20} />
    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
    placeholder={t('auth.confirmPasswordPlaceholder')}
      value={formData.confirmPassword}
      onChange={handleInputChange}
      className={`standard-input ${errors.confirmPassword ? 'error' : ''}`}
    />
    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    >
      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
    {getValidationIcon('confirmPassword')}
  </div>
  {fieldValidation.confirmPassword.message && (
    <span className={`validation-message ${fieldValidation.confirmPassword.status}`}>
      {fieldValidation.confirmPassword.message}
    </span>
  )}
  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
</div>

<div className="input-group">
<label className="auth-form-label">{t('auth.profileImage')}</label>
  <div className="image-upload-container">
    <input
      type="file"
      id="profileImageUpload"
      accept="image/jpeg,image/jpg,image/png,image/webp"
      onChange={handleImageUpload}
      style={{ display: 'none' }}
    />
    <label htmlFor="profileImageUpload" className="image-upload-label">
      {formData.profileImagePreview ? (
        <div className="image-preview">
          <img src={formData.profileImagePreview} alt="Profile preview" />
          <div className="image-overlay">
            <Upload size={24} />
          <span>{t('auth.changeImage')}</span>
          </div>
        </div>
      ) : (
        <div className="image-upload-placeholder">
          <Upload size={32} />
        <span>{t('auth.clickToUpload')}</span>
<small>{t('auth.imageFormats')}</small>
        </div>
      )}
    </label>
  </div>
  {imageError && <span className="error-text">{imageError}</span>}
</div>

             {formData.seekingType !== 'recruitment' && (
               <ServiceDetailsForm
                 serviceType={formData.serviceType}
                 serviceDetails={formData.serviceDetails}
                 errors={errors}
                 handleServiceDetailsChange={handleServiceDetailsChange}
                 handleExclusiveCheckbox={handleExclusiveCheckbox}
               />
             )}

              {(error || submitError) && (
                <div className="error-message">
                  <AlertCircle size={20} />
                  <span>{submitError || error}</span>
                </div>
              )}

              <div className="step-navigation">
                <button
                  type="button"
                  className="btn btn-primary btn-secondary-style"
                  onClick={() => setStep(1)}
                >
                {t('auth.back')}
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    loading ||
                    isSubmitting ||
                    fieldValidation.email.status === 'checking' ||
                    fieldValidation.email.status === 'invalid'
                  }
                >
                {loading || isSubmitting ? (
  <>
    <Loader className="animate-spin" size={18} />
    {t('auth.registering')}
  </>
) : fieldValidation.email.status === 'checking' ? (
  <>
    <Loader className="animate-spin" size={18} />
    {t('auth.checkingEmail')}
  </>
) : formData.seekingType !== 'clients' ? (
  t('auth.continue')
) : (
  t('auth.completeRegistration')
)}
                </button>
              </div>
            </form>
          )}

          {mode === 'register' && step === 3 && formData.seekingType !== 'clients' && (
            <form onSubmit={handleStep3Submit} className="auth-form" autoComplete="off">
              <RecruitmentForm
                details={formData.recruitmentDetails}
                errors={errors}
                onChange={handleRecruitmentDetailsChange}
              />
              <div className="step-navigation">
                <button type="button" onClick={() => setStep(2)} className="btn btn-primary btn-secondary-style">
                  {t('auth.back')}
                </button>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  {isSubmitting ? (
                    <><Loader className="animate-spin" size={18} /> {t('auth.registering')}</>
                  ) : t('auth.completeRegistration')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {showSuccess && (
        <SuccessModal 
          isOpen={showSuccess}
          onClose={() => {
            setShowSuccess(false);
            onClose();
            if (successData.seekingType === 'recruitment') {
              navigate('/dashboard?tab=recruitment');
            } else {
              navigate('/dashboard');
            }
          }}
          userRole={successData.userRole}
          userName={successData.userName}
          serviceType={successData.serviceType}
          seekingType={successData.seekingType}
          isPremium={successData.isPremium}
        />
      )}
    </>
  );
};

export default AuthModal;