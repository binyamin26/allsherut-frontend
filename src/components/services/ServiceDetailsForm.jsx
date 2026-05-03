import React from 'react';

// Import tous les 23 formulaires
import BabysittingForm from './babysitting/BabysittingForm';
import CleaningForm from './cleaning/CleaningForm';
import GardeningForm from './gardening/GardeningForm';
import PetcareForm from './petcare/PetcareForm';
import TutoringForm from './tutoring/TutoringForm';
import EldercareForm from './eldercare/EldercareForm';
import LaundryForm from './laundry/LaundryForm';
import PropertyManagementForm from './property_management/PropertyManagementForm';
import ElectricianForm from './electrician/ElectricianForm';
import PlumbingForm from './plumbing/PlumbingForm';
import AirConditioningForm from './air_conditioning/AirConditioningForm';
import GasTechnicianForm from './gas_technician/GasTechnicianForm';
import DrywallForm from './drywall/DrywallForm';
import CarpentryForm from './carpentry/CarpentryForm';
import HomeOrganizationForm from './home_organization/HomeOrganizationForm';
import EventEntertainmentForm from './event_entertainment/EventEntertainmentForm';
import PrivateChefForm from './private_chef/PrivateChefForm';
import PaintingForm from './painting/PaintingForm';
import WaterproofingForm from './waterproofing/WaterproofingForm';
import ContractorForm from './contractor/ContractorForm';
import AluminumForm from './aluminum/AluminumForm';
import GlassWorksForm from './glass_works/GlassWorksForm';
import LocksmithForm from './locksmith/LocksmithForm';
import MovingForm from './moving/MovingForm';
import PhotographerForm from './photographer/PhotographerForm';
import EventDecorationForm from './event_decoration/EventDecorationForm';
import PestControlForm from './pest_control/PestControlForm';

const ServiceDetailsForm = ({ 
  serviceType, 
  serviceDetails, 
  errors, 
  handleServiceDetailsChange,
  handleExclusiveCheckbox 
}) => {
  
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
    locksmith: LocksmithForm,
    moving: MovingForm,
    photographer: PhotographerForm,
    event_decoration: EventDecorationForm,
    pest_control: PestControlForm
  };

  // Récupérer le bon composant
  const FormComponent = serviceFormComponents[serviceType];

  // Si pas de formulaire trouvé
  if (!FormComponent) {
    return (
      <div className="service-details-form">
        <p>אנא בחר סוג שירות</p>
      </div>
    );
  }

  // Rendre le formulaire approprié
  return (
    <FormComponent
      serviceDetails={serviceDetails}
      errors={errors}
      handleServiceDetailsChange={handleServiceDetailsChange}
      handleExclusiveCheckbox={handleExclusiveCheckbox}
    />
  );
};

export default ServiceDetailsForm;