import React from 'react';

// Import tous les 23 formulaires
import BabysittingForm from './babysitting/BabysittingForm';
import CleaningForm from './cleaning/CleaningForm';
import GardeningForm from './gardening/GardeningForm';
import PetcareForm from './petcare/PetcareForm';
import TutoringForm from './tutoring/TutoringForm';
import SportsActivitiesForm from './sports_activities/SportsActivitiesForm';
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
import EventEquipmentRentalForm from './event_equipment_rental/EventEquipmentRentalForm';
import EventFoodStandsForm from './event_food_stands/EventFoodStandsForm';
import PrivateChefForm from './private_chef/PrivateChefForm';
import CateringForm from './catering/CateringForm';
import PastryForm from './pastry/PastryForm';
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
import HandymanForm from './handyman/HandymanForm';
import DJForm from './dj/DJForm';
import MechanicForm from './mechanic/MechanicForm';
import MetalworkForm from './metalwork/MetalworkForm';
import DriverForm from './driver/DriverForm';

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
    sports_activities: SportsActivitiesForm,
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
    event_equipment_rental: EventEquipmentRentalForm,
    event_food_stands: EventFoodStandsForm,
    private_chef: PrivateChefForm,
    catering: CateringForm,
    pastry: PastryForm,
    painting: PaintingForm,
    waterproofing: WaterproofingForm,
    contractor: ContractorForm,
    aluminum: AluminumForm,
    glass_works: GlassWorksForm,
    locksmith: LocksmithForm,
    moving: MovingForm,
    photographer: PhotographerForm,
    event_decoration: EventDecorationForm,
    pest_control: PestControlForm,
    handyman: HandymanForm,
    dj: DJForm,
    mechanic: MechanicForm,
    metalwork: MetalworkForm,
    driver: DriverForm
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

  // Rendre le formulaire approprié (chaque formulaire gère ses propres champs, y compris langues)
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