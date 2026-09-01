import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProviderRegistration.css';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getAllCities, getNeighborhoodsByCity } from '../data/israelLocations';
import CustomDropdown from '../components/common/CustomDropdown';

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
import CateringForm from '../components/services/catering/CateringForm';
import PastryForm from '../components/services/pastry/PastryForm';
import PaintingForm from '../components/services/painting/PaintingForm';
import WaterproofingForm from '../components/services/waterproofing/WaterproofingForm';
import ContractorForm from '../components/services/contractor/ContractorForm';
import AluminumForm from '../components/services/aluminum/AluminumForm';
import GlassWorksForm from '../components/services/glass_works/GlassWorksForm';
import LocksmithForm from '../components/services/locksmith/LocksmithForm';
import PestControlForm from '../components/services/pest_control/PestControlForm';

const ProviderRegistration = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const allCities = getAllCities();

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
    babysitting: 'Baby-sitting',
    cleaning: 'Ménage',
    gardening: 'Jardinage',
    petcare: 'Garde d’animaux',
    tutoring: 'Cours particuliers',
    eldercare: 'Aide aux personnes âgées',
    laundry: 'Blanchisserie et repassage',
    property_management: 'Gestion locative',
    electrician: 'Électriciens',
    plumbing: 'Plomberie',
    air_conditioning: 'Climatisation',
    gas_technician: 'Technicien gaz',
    drywall: 'Travaux de placo',
    carpentry: 'Menuiserie',
    home_organization: 'Organisation de la maison',
    event_entertainment: 'Animations et attractions pour événements',
    private_chef: 'Chef privé',
    catering: 'Traiteur',
    pastry: 'Pâtisserie',
    painting: 'Peinture',
    waterproofing: 'Étanchéité',
    contractor: 'Entrepreneur',
    aluminum: 'Travaux aluminium',
    glass_works: 'Vitrerie',
    locksmith: 'Serrurerie',
    pest_control: 'Désinsectisation, pulvérisation et élimination des nuisibles'
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
    catering: CateringForm,
    pastry: PastryForm,
    painting: PaintingForm,
    waterproofing: WaterproofingForm,
    contractor: ContractorForm,
    aluminum: AluminumForm,
    glass_works: GlassWorksForm,
    locksmith: LocksmithForm,
    pest_control: PestControlForm
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

  // Gestion des checkboxes exclusives (comme "toute la semaine")
  const handleExclusiveCheckbox = (field, value, exclusiveValue, otherValues) => {
    const currentValues = formData.serviceDetails[field] || [];
    
    if (value === exclusiveValue) {
      // Si on coche "toute la semaine", on décoche les autres
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
        // Cocher et retirer "toute la semaine" si présent
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

    if (!formData.firstName.trim()) newErrors.firstName = t('auth.validation.firstNameRequired');
    if (!formData.lastName.trim()) newErrors.lastName = t('auth.validation.lastNameRequired');
    if (!formData.email.trim()) {
      newErrors.email = t('auth.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.validation.emailInvalid');
    }
    if (!formData.password) {
      newErrors.password = t('auth.validation.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('auth.validation.passwordTooShort');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.validation.passwordMismatch');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('auth.validation.phoneRequired');
    } else if (!/^05\d{8}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = t('auth.validation.phoneInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation de l'étape 2
  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.city.trim()) newErrors.city = t('auth.validation.cityRequired');
    if (!formData.neighborhood.trim()) newErrors.neighborhood = t('auth.validation.neighborhoodRequired');
    if (!formData.street.trim()) newErrors.street = t('auth.validation.streetRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation de l'étape 3
  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.serviceType) {
      newErrors.serviceType = t('auth.validation.serviceRequired');
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
      newErrors.termsAccepted = t('auth.validation.termsRequired');
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
// REMPLACEZ l'URL fixe par la variable Vite
const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register/provider`, formDataToSend, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

if (response.data.success) {
  // ✅ Stocker le token
  localStorage.setItem('homesherut_token', response.data.data.token);
  
  // ✅ Récupérer le profil COMPLET depuis le serveur
  const serviceType = formData.serviceType;
// ✅ Utilisation de la variable d'environnement configurée sur Vercel
const meResponse = await axios.get(
  `${import.meta.env.VITE_API_URL}/auth/me?service_type=${serviceType}`,
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
  
  alert('L’inscription a été effectuée avec succès !');
  navigate('/dashboard');
}
    } catch (error) {
      console.error('Error:', error);
      
      if (error.response?.data?.error === 'NAME_MISMATCH') {
        alert('Le nom saisi ne correspond pas au compte existant. Veuillez saisir le nom complet enregistré sur le compte.');
      } else if (error.response?.data?.error === 'INVALID_PASSWORD') {
        alert('Le mot de passe saisi ne correspond pas au compte existant. Veuillez saisir le mot de passe correct.');
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
        } else if (error.response?.data?.error === 'PHONE_ALREADY_USED_FOR_SERVICE') {
        alert('Ce numéro de téléphone est déjà enregistré pour ce service. Avez-vous déjà un compte ?');
      } else if (error.response?.data?.error === 'EMAIL_ALREADY_USED_FOR_SERVICE') {
        alert('Cette adresse e-mail est déjà enregistrée pour ce service. Avez-vous déjà un compte ?');
      } else {
        alert('Erreur lors de l’inscription. Veuillez réessayer.');
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
        <h1>Inscription en tant que prestataire</h1>
        
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
              <h2>Informations personnelles</h2>
              
              <div className="input-group">
                <label>Prénom *</label>
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
                <label>Nom *</label>
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
                <label>E-mail *</label>
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
                <label>Mot de passe *</label>
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
                <label>Confirmation du mot de passe *</label>
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
                <label>Téléphone *</label>
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
              <h2>Adresse</h2>
              
              {/* Ville */}
              <div className="input-group">
                <label>Ville *</label>
                <CustomDropdown
                  name="city"
                  options={allCities}
                  value={formData.city}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, city: e.target.value, neighborhood: '' }));
                    if (errors.city) setErrors(prev => ({ ...prev, city: '' }));
                    if (errors.neighborhood) setErrors(prev => ({ ...prev, neighborhood: '' }));
                  }}
                  placeholder="Choisissez une ville..."
                  error={!!errors.city}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>

              {/* Quartier */}
              <div className="input-group">
                <label>Quartier *</label>
                {getNeighborhoodsByCity(formData.city).length > 0 ? (
                  <CustomDropdown
                    name="neighborhood"
                    options={getNeighborhoodsByCity(formData.city)}
                    value={formData.neighborhood}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, neighborhood: e.target.value }));
                      if (errors.neighborhood) setErrors(prev => ({ ...prev, neighborhood: '' }));
                    }}
                    placeholder={formData.city ? `Choisissez un quartier à ${formData.city}...` : 'Choisissez d’abord une ville'}
                    disabled={!formData.city}
                    error={!!errors.neighborhood}
                  />
                ) : (
                  <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    placeholder="Saisissez un nom de quartier..."
                    className={errors.neighborhood ? 'error' : ''}
                  />
                )}
                {errors.neighborhood && <span className="error-text">{errors.neighborhood}</span>}
              </div>

              <div className="input-group">
                <label>Rue *</label>
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
              <h2>Type de service</h2>
              
              <div className="input-group">
                <label>Choisissez un type de service *</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={errors.serviceType ? 'error' : ''}
                >
                  <option value="">Choisissez un service</option>
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
              <h2>Détails du service</h2>
              {renderServiceForm()}
            </div>
          )}

          {/* Étape 5: Documents et confirmation */}
          {currentStep === 5 && (
            <div className="form-step">
              <h2>Documents et validation</h2>
              
              <div className="input-group">
                <label>Pièce d’identité</label>
                <input
                  type="file"
                  name="idCard"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
              </div>

              <div className="input-group">
                <label>Licence professionnelle (le cas échéant)</label>
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
                  J’accepte les conditions d’utilisation *
                </label>
                {errors.termsAccepted && <span className="error-text">{errors.termsAccepted}</span>}
              </div>
            </div>
          )}

          {/* Boutons de navigation */}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn-secondary">
                Retour
              </button>
            )}
            
            {currentStep < 5 ? (
              <button type="button" onClick={nextStep} className="btn-primary">
                Continuer
              </button>
            ) : (
              <button type="submit" className="btn-primary">
                Finaliser l’inscription
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderRegistration;