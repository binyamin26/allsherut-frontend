// Champs obligatoires des détails de service, communs aux deux points d'entrée
// d'inscription à un service : le AuthModal (première inscription, page d'accueil)
// et le modal "Ajouter un service" du dashboard (prestataire déjà inscrit).
// Garder cette logique dans un seul endroit évite que les deux formulaires
// divergent sur ce qui est réellement obligatoire.
//
// Retourne un objet { [nomDuChamp]: messageErreur }, avec des clés SANS le
// préfixe "serviceDetails." (à ajouter par l'appelant si besoin, comme le
// fait AuthModal pour namespacer ses erreurs de compte + service).
export const getServiceDetailsErrors = (serviceType, serviceDetails, t) => {
  const errors = {};

  // Langues parlées : obligatoire pour s'inscrire (au moins une langue)
  if (!serviceDetails.languages || serviceDetails.languages.length === 0) {
    errors.languages = t('validation.selectAtLeastOne');
  }

  // Années d'expérience : obligatoire pour s'inscrire
  if (!serviceDetails.experience) {
    errors.experience = t('validation.experienceRequired');
  }

  switch (serviceType) {
    case 'babysitting':
      if (!serviceDetails.age) {
        errors.age = t('validation.ageRequired');
      } else if (parseInt(serviceDetails.age) < 15) {
        errors.age = t('validation.ageMin15');
      }
      if (!serviceDetails.ageGroups || serviceDetails.ageGroups.length === 0) errors.ageGroups = t('validation.selectAtLeastOne');
      if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) errors.availability_days = t('validation.availabilityDaysRequired');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.babysitting_types || serviceDetails.babysitting_types.length === 0) errors.babysitting_types = t('validation.selectAtLeastOne');
      if (serviceDetails.can_travel_alone === undefined) errors.can_travel_alone = t('validation.canTravelAloneRequired');
      if (!serviceDetails.languages || serviceDetails.languages.length === 0) errors.languages = t('validation.selectAtLeastOne');
      break;

    case 'cleaning':
      if (!serviceDetails.legalStatus) errors.legalStatus = t('validation.legalStatusRequired');
      if (!serviceDetails.cleaningTypes || serviceDetails.cleaningTypes.length === 0) errors.cleaningTypes = t('validation.selectAtLeastOne');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      break;

    case 'gardening':
      if (!serviceDetails.services || serviceDetails.services.length === 0) errors.services = t('validation.selectAtLeastOne');
      if (!serviceDetails.seasons || serviceDetails.seasons.length === 0) errors.seasons = t('validation.selectAtLeastOne');
      if (!serviceDetails.equipment || serviceDetails.equipment.length === 0) errors.equipment = t('validation.selectAtLeastOne');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      break;

    case 'petcare':
      if (!serviceDetails.animalTypes || serviceDetails.animalTypes.length === 0) errors.animalTypes = t('validation.selectAtLeastOne');
      if (serviceDetails.animalTypes?.includes('כלבים') && (!serviceDetails.dogSizes || serviceDetails.dogSizes.length === 0)) {
        errors.dogSizes = t('validation.selectAtLeastOne');
      }
      if (!serviceDetails.location) errors.location = t('validation.locationRequired');
      if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) errors.availability_days = t('validation.availabilityDaysRequired');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      break;

    case 'tutoring':
      if (!serviceDetails.subjects || serviceDetails.subjects.length === 0) errors.subjects = t('validation.selectAtLeastOne');
      if (!serviceDetails.teachingMode) errors.teachingMode = t('validation.teachingModeRequired');
      if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) errors.availability_days = t('validation.availabilityDaysRequired');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      break;

    case 'sports_activities':
      if (!serviceDetails.subjects || serviceDetails.subjects.length === 0) errors.subjects = t('validation.selectAtLeastOne');
      if (!serviceDetails.teachingMode) errors.teachingMode = t('validation.teachingModeRequired');
      if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) errors.availability_days = t('validation.availabilityDaysRequired');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      break;

    case 'eldercare':
      if (!serviceDetails.careTypes || serviceDetails.careTypes.length === 0) errors.careTypes = t('validation.selectAtLeastOne');
      if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) errors.availability_days = t('validation.availabilityDaysRequired');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.age) errors.age = t('validation.ageRequired');
      if (!serviceDetails.languages || serviceDetails.languages.length === 0) errors.languages = t('validation.selectAtLeastOne');
      break;

    case 'electrician':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('תיקונים') && (!serviceDetails.repair_types || serviceDetails.repair_types.length === 0)) errors.repair_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('התקנות') && (!serviceDetails.installation_types || serviceDetails.installation_types.length === 0)) errors.installation_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('עבודות חשמל גדולות') && (!serviceDetails.large_work_types || serviceDetails.large_work_types.length === 0)) errors.large_work_types = t('validation.selectAtLeastOne');
      break;

    case 'plumbing':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('סתימות') && (!serviceDetails.blockage_types || serviceDetails.blockage_types.length === 0)) errors.blockage_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('תיקון צנרת') && (!serviceDetails.pipe_repair_types || serviceDetails.pipe_repair_types.length === 0)) errors.pipe_repair_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('עבודות גדולות') && (!serviceDetails.large_work_types || serviceDetails.large_work_types.length === 0)) errors.large_work_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('תיקון והתקנת אביזרי אינסטלציה') && (!serviceDetails.fixture_types || serviceDetails.fixture_types.length === 0)) errors.fixture_types = t('validation.selectAtLeastOne');
      break;

    case 'laundry':
      if (!serviceDetails.laundryTypes || serviceDetails.laundryTypes.length === 0) errors.laundryTypes = t('validation.selectAtLeastOne');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      break;

    case 'property_management':
      if (!serviceDetails.management_type || serviceDetails.management_type.length === 0) errors.management_type = t('validation.selectAtLeastOne');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      break;

    case 'air_conditioning':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('התקנת מזגנים') && (!serviceDetails.installation_types || serviceDetails.installation_types.length === 0)) errors.installation_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('תיקון מזגנים') && (!serviceDetails.repair_types || serviceDetails.repair_types.length === 0)) errors.repair_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('פירוק והרכבת מזגנים') && (!serviceDetails.disassembly_types || serviceDetails.disassembly_types.length === 0)) errors.disassembly_types = t('validation.selectAtLeastOne');
      break;

    case 'gas_technician':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('התקנת צנרת גז בבית') && (!serviceDetails.installation_types || serviceDetails.installation_types.length === 0)) errors.installation_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('תיקוני גז בבית') && (!serviceDetails.repair_types || serviceDetails.repair_types.length === 0)) errors.repair_types = t('validation.selectAtLeastOne');
      if (!serviceDetails.license_type || serviceDetails.license_type.length === 0) errors.license_type = t('validation.selectAtLeastOne');
      break;

    case 'drywall':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('עיצובים בגבס') && (!serviceDetails.design_types || serviceDetails.design_types.length === 0)) errors.design_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('עבודות גבס') && (!serviceDetails.construction_types || serviceDetails.construction_types.length === 0)) errors.construction_types = t('validation.selectAtLeastOne');
      break;

    case 'carpentry':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('בניית רהיטים') && (!serviceDetails.furniture_building_types || serviceDetails.furniture_building_types.length === 0)) errors.furniture_building_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('תיקון רהיטים') && (!serviceDetails.furniture_repair_types || serviceDetails.furniture_repair_types.length === 0)) errors.furniture_repair_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('עבודות נגרות אחרות') && (!serviceDetails.other_carpentry_types || serviceDetails.other_carpentry_types.length === 0)) errors.other_carpentry_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('נגרות חוץ')) {
        if (serviceDetails.outdoor_carpentry_types?.includes('פרגולות') && (!serviceDetails.pergola_types || serviceDetails.pergola_types.length === 0)) errors.pergola_types = t('validation.selectAtLeastOne');
        if (serviceDetails.outdoor_carpentry_types?.includes('דקים') && (!serviceDetails.deck_types || serviceDetails.deck_types.length === 0)) errors.deck_types = t('validation.selectAtLeastOne');
        if (serviceDetails.outdoor_carpentry_types?.includes('גדרות ומחיצות עץ') && (!serviceDetails.fence_types || serviceDetails.fence_types.length === 0)) errors.fence_types = t('validation.selectAtLeastOne');
      }
      break;

    case 'home_organization':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('סידור כללי') && (!serviceDetails.general_organization_types || serviceDetails.general_organization_types.length === 0)) errors.general_organization_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('סידור + מיון') && (!serviceDetails.sorting_types || serviceDetails.sorting_types.length === 0)) errors.sorting_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('ארגון מקצועי') && (!serviceDetails.professional_organization_types || serviceDetails.professional_organization_types.length === 0)) errors.professional_organization_types = t('validation.selectAtLeastOne');
      break;

    case 'event_entertainment':
      if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) errors.availability_days = t('validation.availabilityDaysRequired');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.entertainment_types || serviceDetails.entertainment_types.length === 0) errors.entertainment_types = t('validation.selectAtLeastOne');
      break;

    case 'event_equipment_rental':
      if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) errors.availability_days = t('validation.availabilityDaysRequired');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.equipment_rental_types || serviceDetails.equipment_rental_types.length === 0) errors.equipment_rental_types = t('validation.selectAtLeastOne');
      if (serviceDetails.equipment_rental_types?.includes('🍿 מכונות מזון') && (!serviceDetails.food_machine_types || serviceDetails.food_machine_types.length === 0)) errors.food_machine_types = t('validation.selectAtLeastOne');
      if (serviceDetails.equipment_rental_types?.includes('🎪 השכרת מתנפחים ומשחקים') && (!serviceDetails.inflatable_game_types || serviceDetails.inflatable_game_types.length === 0)) errors.inflatable_game_types = t('validation.selectAtLeastOne');
      if (serviceDetails.equipment_rental_types?.includes('💨 מכונות אפקטים להשכרה') && (!serviceDetails.effect_machine_types || serviceDetails.effect_machine_types.length === 0)) errors.effect_machine_types = t('validation.selectAtLeastOne');
      break;

    case 'event_food_stands':
      if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) errors.availability_days = t('validation.availabilityDaysRequired');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.food_stand_types || serviceDetails.food_stand_types.length === 0) errors.food_stand_types = t('validation.selectAtLeastOne');
      break;

    case 'dj':
      if (!serviceDetails.availability_days || serviceDetails.availability_days.length === 0) errors.availability_days = t('validation.availabilityDaysRequired');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.dj_event_types || serviceDetails.dj_event_types.length === 0) errors.dj_event_types = t('validation.selectAtLeastOne');
      break;

    case 'private_chef':
    case 'catering':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('סוג המטבח') && (!serviceDetails.cuisine_types || serviceDetails.cuisine_types.length === 0)) errors.cuisine_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('כשרות') && (!serviceDetails.kosher_types || serviceDetails.kosher_types.length === 0)) errors.kosher_types = t('validation.selectAtLeastOne');
      break;

    case 'pastry':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.product_types || serviceDetails.product_types.length === 0) errors.product_types = t('validation.selectAtLeastOne');
      break;

    case 'painting':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      break;

    case 'waterproofing':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('roofWaterproofing') && (!serviceDetails.roof_waterproofing_types || serviceDetails.roof_waterproofing_types.length === 0)) errors.roof_waterproofing_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('wallWaterproofing') && (!serviceDetails.wall_waterproofing_types || serviceDetails.wall_waterproofing_types.length === 0)) errors.wall_waterproofing_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('balconyWaterproofing') && (!serviceDetails.balcony_waterproofing_types || serviceDetails.balcony_waterproofing_types.length === 0)) errors.balcony_waterproofing_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('wetRoomWaterproofing') && (!serviceDetails.wet_room_waterproofing_types || serviceDetails.wet_room_waterproofing_types.length === 0)) errors.wet_room_waterproofing_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('undergroundWaterproofing') && (!serviceDetails.underground_waterproofing_types || serviceDetails.underground_waterproofing_types.length === 0)) errors.underground_waterproofing_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('inspectionEquipment') && (!serviceDetails.inspection_equipment_types || serviceDetails.inspection_equipment_types.length === 0)) errors.inspection_equipment_types = t('validation.selectAtLeastOne');
      break;

    case 'contractor':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('עבודות שלד') && (!serviceDetails.structure_work_types || serviceDetails.structure_work_types.length === 0)) errors.structure_work_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('שיפוצים כלליים') && (!serviceDetails.general_renovation_types || serviceDetails.general_renovation_types.length === 0)) errors.general_renovation_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('חשמל ואינסטלציה') && (!serviceDetails.electric_plumbing_types || serviceDetails.electric_plumbing_types.length === 0)) errors.electric_plumbing_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('עבודות חוץ') && (!serviceDetails.exterior_work_types || serviceDetails.exterior_work_types.length === 0)) errors.exterior_work_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('שיקום ותיקון חוץ') && (!serviceDetails.facade_repair_types || serviceDetails.facade_repair_types.length === 0)) errors.facade_repair_types = t('validation.selectAtLeastOne');
      break;

    case 'aluminum':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('חלונות ודלתות') && (!serviceDetails.windows_doors_types || serviceDetails.windows_doors_types.length === 0)) errors.windows_doors_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('פרגולות ואלומיניום חוץ') && (!serviceDetails.pergolas_outdoor_types || serviceDetails.pergolas_outdoor_types.length === 0)) errors.pergolas_outdoor_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('תיקונים ושירות') && (!serviceDetails.repairs_service_types || serviceDetails.repairs_service_types.length === 0)) errors.repairs_service_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('חיפויי אלומיניום') && (!serviceDetails.cladding_types || serviceDetails.cladding_types.length === 0)) errors.cladding_types = t('validation.selectAtLeastOne');
      break;

    case 'glass_works':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('זכוכית למקלחונים') && (!serviceDetails.shower_glass_types || serviceDetails.shower_glass_types.length === 0)) errors.shower_glass_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('זכוכית לחלונות ודלתות') && (!serviceDetails.windows_doors_glass_types || serviceDetails.windows_doors_glass_types.length === 0)) errors.windows_doors_glass_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('זכוכית למטבח ובית') && (!serviceDetails.kitchen_home_glass_types || serviceDetails.kitchen_home_glass_types.length === 0)) errors.kitchen_home_glass_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('זכוכית מיוחדת ובטיחות') && (!serviceDetails.special_safety_glass_types || serviceDetails.special_safety_glass_types.length === 0)) errors.special_safety_glass_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('שירותי תיקון והתאמה אישית') && (!serviceDetails.repair_custom_types || serviceDetails.repair_custom_types.length === 0)) errors.repair_custom_types = t('validation.selectAtLeastOne');
      break;

    case 'locksmith':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('החלפת מנעולים') && (!serviceDetails.lock_replacement_types || serviceDetails.lock_replacement_types.length === 0)) errors.lock_replacement_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('פתיחת דלתות') && (!serviceDetails.door_opening_types || serviceDetails.door_opening_types.length === 0)) errors.door_opening_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('התקנת מערכות נעילה') && (!serviceDetails.lock_system_installation_types || serviceDetails.lock_system_installation_types.length === 0)) errors.lock_system_installation_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('תיקון מנעולים ודלתות') && (!serviceDetails.lock_door_repair_types || serviceDetails.lock_door_repair_types.length === 0)) errors.lock_door_repair_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('שירותי ביטחון') && (!serviceDetails.security_services_types || serviceDetails.security_services_types.length === 0)) errors.security_services_types = t('validation.selectAtLeastOne');
      break;

    case 'moving':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      break;

    case 'photographer':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      break;

    case 'event_decoration':
      if (!serviceDetails.decoration_types || serviceDetails.decoration_types.length === 0) errors.decoration_types = t('validation.selectAtLeastOne');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      break;

    case 'handyman':
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (serviceDetails.work_types?.includes('תיקונים כלליים') && (!serviceDetails.general_repairs_types || serviceDetails.general_repairs_types.length === 0)) errors.general_repairs_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('התקנות והרכבות') && (!serviceDetails.installations_types || serviceDetails.installations_types.length === 0)) errors.installations_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('דלתות ורהיטים') && (!serviceDetails.doors_furniture_types || serviceDetails.doors_furniture_types.length === 0)) errors.doors_furniture_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('עבודות קלות בבית') && (!serviceDetails.light_work_types || serviceDetails.light_work_types.length === 0)) errors.light_work_types = t('validation.selectAtLeastOne');
      if (serviceDetails.work_types?.includes('תליות וסידור') && (!serviceDetails.hanging_types || serviceDetails.hanging_types.length === 0)) errors.hanging_types = t('validation.selectAtLeastOne');
      break;

    case 'mechanic':
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      break;

    case 'metalwork':
      if (!serviceDetails.work_types || serviceDetails.work_types.length === 0) errors.work_types = t('validation.workTypesRequired');
      if (!serviceDetails.availability_hours || serviceDetails.availability_hours.length === 0) errors.availability_hours = t('validation.availabilityHoursRequired');
      break;

    default:
      break;
  }

  return errors;
};
