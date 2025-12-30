import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProviderRegistration.css';
import { useAuth } from '../context/AuthContext';

// Import tous les formulaires de services
import BabysittingForm from '../components/services/babysitting/BabysittingForm';
import CleaningForm from '../components/services/cleaning/CleaningForm';
import GardeningForm from '../components/services/gardening/GardeningForm';
import PetcareForm from '../components/services/petcare/PetcareForm';
import TutoringForm from '../components/services/tutoring/TutoringForm';
import EldercareForm from '../components/services/eldercare/EldercareForm';
import LaundryForm from '../components/services/laundry/LaundryForm';
import PropertyManagementForm from '../components/services/property_management/PropertyManagementForm';
import ElectricianForm from '../components/services/electrician/ElectricianForm';
import PlumbingForm from '../components/services/plumbing/PlumbingForm';
import AirConditioningForm from '../components/services/air_conditioning/AirConditioningForm';
import GasTechnicianForm from '../components/services/gas_technician/GasTechnicianForm';
import DrywallForm from '../components/services/drywall/DrywallForm';
import CarpentryForm from '../components/services/carpentry/CarpentryForm';
import HomeOrganizationForm from '../components/services/home_organization/HomeOrganizationForm';
import EventEntertainmentForm from '../components/services/event_entertainment/EventEntertainmentForm';
import PrivateChefForm from '../components/services/private_chef/PrivateChefForm';
import PaintingForm from '../components/services/painting/PaintingForm';
import WaterproofingForm from '../components/services/waterproofing/WaterproofingForm';
import ContractorForm from '../components/services/contractor/ContractorForm';
import AluminumForm from '../components/services/aluminum/AluminumForm';
import GlassWorksForm from '../components/services/glass_works/GlassWorksForm';
import LocksmithForm from '../components/services/locksmith/LocksmithForm';

const ProviderRegistration = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  // État du formulaire
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Adresse
    city: '',
    neighborhood: '',
    street: '',
    
    // Service
    serviceType: '',
    serviceDetails: {},
    
    // Documents
    idCard: null,
    professionalLicense: null,
    
    // Conditions
    termsAccepted: false
  });

  // Liste des types de services avec leurs noms en hébreu
  const serviceTypes = {
    babysitting: 'בייביסיטר',
    cleaning: 'ניקיון',
    gardening: 'גינון',
    petcare: 'שמירה על חיות מחמד',
    tutoring: 'שיעורים פרטיים',
    eldercare: 'טיפול בקשישים',
    laundry: 'מכבסה וגיהוץ',
    property_management: 'ניהול דירות',
    electrician: 'חשמלאים',
    plumbing: 'אינסטלציה',
    air_conditioning: 'מיזוג אוויר',
    gas_technician: 'טכנאי גז',
    drywall: 'עבודות גבס',
    carpentry: 'נגרות',
    home_organization: 'סידור בית',
    event_entertainment: 'הפעלות ואטרקציות לאירועים',
    private_chef: 'שף פרטי',
    painting: 'עבודות צבע',
    waterproofing: 'איטום',
    contractor: 'קבלן',
    aluminum: 'עבודות אלומיניום',
    glass_works: 'עבודות זכוכית',
    locksmith: 'מסגרות'
  };

  // Mapping des formulaires
  const serviceFormComponents = {
    babysitting: BabysittingForm,
    cleaning: CleaningForm,
    gardening: GardeningForm,
    petcare: PetcareForm,
    tutoring: TutoringForm,
    eldercare: EldercareForm,
    laundry: LaundryForm,
    property_management: PropertyManagementForm,
    electrician: ElectricianForm,
    plumbing: PlumbingForm,
    air_conditioning: AirConditioningForm,
    gas_technician: GasTechnicianForm,
    drywall: DrywallForm,
    carpentry: CarpentryForm,
    home_organization: HomeOrganizationForm,
    event_entertainment: EventEntertainmentForm,
    private_chef: PrivateChefForm,
    painting: PaintingForm,
    waterproofing: WaterproofingForm,
    contractor: ContractorForm,
    aluminum: AluminumForm,
    glass_works: GlassWorksForm,
    locksmith: LocksmithForm
  };

  // Gestion des changements dans les champs normaux
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Gestion des changements dans serviceDetails
  const handleServiceDetailsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        [field]: value
      }
    }));
    // Effacer l'erreur pour ce champ
    const errorKey = `serviceDetails.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  // Gestion des checkboxes exclusives (comme "כל השבוע")
  const handleExclusiveCheckbox = (field, value, exclusiveValue, otherValues) => {
    const currentValues = formData.serviceDetails[field] || [];
    
    if (value === exclusiveValue) {
      // Si on coche "כל השבוע", on décoche les autres
      if (currentValues.includes(exclusiveValue)) {
        handleServiceDetailsChange(field, []);
      } else {
        handleServiceDetailsChange(field, [exclusiveValue]);
      }
    } else {
      // Si on coche un jour spécifique
      let newValues;
      if (currentValues.includes(value)) {
        // Décocher
        newValues = currentValues.filter(v => v !== value);
      } else {
        // Cocher et retirer "כל השבוע" si présent
        newValues = [...currentValues.filter(v => v !== exclusiveValue), value];
      }
      handleServiceDetailsChange(field, newValues);
    }
  };

  // Gestion des fichiers
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  // Validation de l'étape 1
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'שם פרטי חובה';
    if (!formData.lastName.trim()) newErrors.lastName = 'שם משפחה חובה';
    if (!formData.email.trim()) {
      newErrors.email = 'אימייל חובה';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'אימייל לא תקין';
    }
    if (!formData.password) {
      newErrors.password = 'סיסמה חובה';
    } else if (formData.password.length < 6) {
      newErrors.password = 'הסיסמה חייבת להכיל לפחות 6 תווים';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'הסיסמאות לא תואמות';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'מספר טלפון חובה';
    } else if (!/^05\d{8}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'מספר טלפון לא תקין';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation de l'étape 2
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.city.trim()) newErrors.city = 'עיר חובה';
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'שכונה חובה';
    if (!formData.street.trim()) newErrors.street = 'רחוב חובה';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation de l'étape 3
  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.serviceType) {
      newErrors.serviceType = 'יש לבחור סוג שירות';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation de l'étape 4 (détails du service)
  const validateStep4 = () => {
    const newErrors = {};
    
    // Validation spécifique selon le type de service
    // Tu peux ajouter ici des validations personnalisées
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation de l'étape 5
  const validateStep5 = () => {
    const newErrors = {};
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'יש לאשר את התנאים';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation entre les étapes
  const nextStep = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        break;
      case 5:
        isValid = validateStep5();
        break;
      default:
        isValid = true;
    }
    
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

 // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep5()) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Ajouter les données du formulaire
      Object.keys(formData).forEach(key => {
        if (key === 'serviceDetails') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === 'idCard' || key === 'professionalLicense') {
          if (formData[key]) {
            formDataToSend.append(key, formData[key]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      console.log('📤 DONNÉES ENVOYÉES:', {
  experience: formData.serviceDetails.experience,
  hourlyRate: formData.serviceDetails.hourlyRate,
  can_travel_alone: formData.serviceDetails.can_travel_alone
});

      const response = await axios.post('http://localhost:5000/api/auth/register/provider', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
if (response.data.success) {
  // ✅ Stocker le token
  localStorage.setItem('homesherut_token', response.data.data.token);
  
  // ✅ Récupérer le profil COMPLET depuis le serveur
  const serviceType = formData.serviceType;
  const meResponse = await axios.get(
    `http://localhost:5000/api/auth/me?service_type=${serviceType}`,
    {
      headers: {
        'Authorization': `Bearer ${response.data.data.token}`
      }
    }
  );
  
  if (meResponse.data.success) {
    const fullUserData = meResponse.data.data;
    setUser({
      ...fullUserData,
      services: fullUserData.services || [fullUserData.serviceType],
      token: response.data.data.token
    });
  }
  
  alert('ההרשמה הושלמה בהצלחה!');
  navigate('/dashboard');
}
    } catch (error) {
      console.error('Error:', error);
      
      if (error.response?.data?.error === 'NAME_MISMATCH') {
        alert('השם שהזנת אינו תואם לחשבון הקיים. אנא הזן את השם המלא שרשום בחשבון.');
      } else if (error.response?.data?.error === 'INVALID_PASSWORD') {
        alert('הסיסמה שהזנת אינה תואמת לחשבון הקיים. אנא הזן את הסיסמה הנכונה.');
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
        } else if (error.response?.data?.error === 'PHONE_ALREADY_USED_FOR_SERVICE') {
        alert('מספר הטלפון הזה כבר נרשם לשירות זה. האם יש לך כבר חשבון?');
      } else if (error.response?.data?.error === 'EMAIL_ALREADY_USED_FOR_SERVICE') {
        alert('כתובת האימייל הזו כבר נרשמה לשירות זה. האם יש לך כבר חשבון?');
      } else {
        alert('שגיאה בהרשמה. אנא נסה שוב.');
      }
    }
  };
 
  // Rendu du formulaire de service approprié
  const renderServiceForm = () => {
    if (!formData.serviceType) return null;
    
    const FormComponent = serviceFormComponents[formData.serviceType];
    if (!FormComponent) return null;
    
    return (
      <FormComponent
        serviceDetails={formData.serviceDetails}
        errors={errors}
        handleServiceDetailsChange={handleServiceDetailsChange}
        handleExclusiveCheckbox={handleExclusiveCheckbox}
      />
    );
  };

  return (
    <div className="provider-registration-container">
      <div className="registration-card">
        <h1>הרשמה כנותן שירות</h1>
        
        {/* Indicateur de progression */}
        <div className="progress-indicator">
          {[1, 2, 3, 4, 5].map(step => (
            <div 
              key={step}
              className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
            >
              {step}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Étape 1: Informations personnelles */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>מידע אישי</h2>
              
              <div className="input-group">
                <label>שם פרטי *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="input-group">
                <label>שם משפחה *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>

              <div className="input-group">
                <label>אימייל *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="input-group">
                <label>סיסמה *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="input-group">
                <label>אימות סיסמה *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>

              <div className="input-group">
                <label>טלפון *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="05X-XXX-XXXX"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>
          )}

          {/* Étape 2: Adresse */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>כתובת</h2>
              
              <div className="input-group">
                <label>עיר *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>

              <div className="input-group">
                <label>שכונה *</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className={errors.neighborhood ? 'error' : ''}
                />
                {errors.neighborhood && <span className="error-text">{errors.neighborhood}</span>}
              </div>

              <div className="input-group">
                <label>רחוב *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={errors.street ? 'error' : ''}
                />
                {errors.street && <span className="error-text">{errors.street}</span>}
              </div>
            </div>
          )}

          {/* Étape 3: Choix du service */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>סוג השירות</h2>
              
              <div className="input-group">
                <label>בחר סוג שירות *</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={errors.serviceType ? 'error' : ''}
                >
                  <option value="">בחר שירות</option>
                  {Object.entries(serviceTypes).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                {errors.serviceType && <span className="error-text">{errors.serviceType}</span>}
              </div>
            </div>
          )}

          {/* Étape 4: Détails du service */}
          {currentStep === 4 && (
            <div className="form-step">
              <h2>פרטי השירות</h2>
              {renderServiceForm()}
            </div>
          )}

          {/* Étape 5: Documents et confirmation */}
          {currentStep === 5 && (
            <div className="form-step">
              <h2>מסמכים ואישור</h2>
              
              <div className="input-group">
                <label>תעודת זהות</label>
                <input
                  type="file"
                  name="idCard"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
              </div>

              <div className="input-group">
                <label>רישיון מקצועי (אם רלוונטי)</label>
                <input
                  type="file"
                  name="professionalLicense"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
              </div>

              <div className="input-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                  />
                  אני מאשר/ת את תנאי השימוש *
                </label>
                {errors.termsAccepted && <span className="error-text">{errors.termsAccepted}</span>}
              </div>
            </div>
          )}

          {/* Boutons de navigation */}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn-secondary">
                חזור
              </button>
            )}
            
            {currentStep < 5 ? (
              <button type="button" onClick={nextStep} className="btn-primary">
                המשך
              </button>
            ) : (
              <button type="submit" className="btn-primary">
                השלם הרשמה
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderRegistration;