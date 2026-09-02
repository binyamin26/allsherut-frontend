// Configuration des champs spécifiques pour chaque service
// Source de vérité : Les fichiers ServiceDetailsForm (XXXForm.jsx)
// ✅ VERSION MODIFIÉE - Labels remplacés par clés de traduction

const serviceFieldsConfig = {
  babysitting: {
    fields: [
      { name: 'age', label: 'serviceFields.babysitting.age', type: 'number' },
      { name: 'experience', label: 'serviceFields.babysitting.experience', type: 'number' },
      { 
        name: 'ageGroups', 
        label: 'serviceFields.babysitting.ageGroups', 
        type: 'checkbox',
        options: ['age0to1', 'age1to3', 'age3to6', 'age6plus']
      },
      { 
        name: 'availability_days', 
        label: 'serviceFields.babysitting.availability_days', 
        type: 'checkbox',
        options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'allWeek']
      },
      { 
        name: 'availability_hours', 
        label: 'serviceFields.babysitting.availability_hours', 
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'babysitting_types', 
        label: 'serviceFields.babysitting.babysitting_types', 
        type: 'checkbox',
        options: ['occasional', 'regular', 'pickup', 'nightCare', 'holidayCare', 'homework', 'fullTime', 'summerCamp', 'winterCamp']
      },
      { 
        name: 'can_travel_alone', 
        label: 'serviceFields.babysitting.can_travel_alone', 
      type: 'boolean-select',
        options: ['כן', 'לא']
      },
      { 
        name: 'languages', 
        label: 'serviceFields.babysitting.languages', 
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      },
      {
        name: 'certifications',
        label: 'serviceFields.babysitting.certifications',
        type: 'select',
        options: ['certSpecialEd', 'certFirstAid', 'certKindergarten']
      },
      { 
        name: 'religiosity', 
        label: 'serviceFields.babysitting.religiosity', 
        type: 'select',
        options: ['לא משנה', 'secular', 'traditional', 'religious', 'orthodox']
      }
    ]
  },

  cleaning: {
    fields: [
      {
        name: 'legalStatus',
        label: 'serviceFields.cleaning.legalStatus', 
        type: 'select',
        options: ['company', 'independent']
      },
      { 
        name: 'cleaningTypes', 
        label: 'serviceFields.cleaning.cleaningTypes', 
        type: 'checkbox',
        options: [
          'regularCleaning', 'passoverCleaning', 'postRenovation', 'airbnb',
          'offices', 'stores', 'buildings', 'educationalInstitutions', 'factories',
          'highWindows', 'acCleaning', 'roofCleaning',
          'carpets', 'sofas', 'curtains', 'pressureWashing',
          'damageCleanup', 'aquariumCleaning',
          'carCleaning', 'solarPanels',
          'ironingAtHome', 'laundryFolding'
        ]
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.cleaning.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { name: 'experience', label: 'serviceFields.cleaning.experienceYears', type: 'number' },
      {
        name: 'materialsProvided',
        label: 'serviceFields.cleaning.materialsProvided',
        type: 'select',
        options: ['yes', 'no', 'partial']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  gardening: {
    fields: [
      {
        name: 'services',
        label: 'serviceFields.gardening.services', 
        type: 'checkbox',
        options: ['pruning', 'design', 'planting', 'irrigation', 'fertilizing', 'weeding', 'generalMaintenance']
      },
      { 
        name: 'seasons', 
        label: 'serviceFields.gardening.seasons', 
        type: 'checkbox',
        options: ['allYear', 'spring', 'summer', 'autumn', 'winter']
      },
      { 
        name: 'equipment', 
        label: 'serviceFields.gardening.equipment', 
        type: 'checkbox',
        options: ['lawnMower', 'pruningShears', 'waterPump', 'handTools', 'fertilizerSpreader', 'irrigationSystem']
      },
      { 
        name: 'specializations', 
        label: 'serviceFields.gardening.specializations', 
        type: 'checkbox',
        options: ['gardenerTypeA', 'gardenerTypeB', 'agronomist', 'expertPruner']
      },
      { 
        name: 'additionalServices', 
        label: 'serviceFields.gardening.additionalServices', 
        type: 'checkbox',
        options: ['wasteRemoval', 'landscapeConsulting']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.gardening.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { name: 'experience', label: 'serviceFields.gardening.experienceYears', type: 'number' },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  petcare: {
    fields: [
      { name: 'age', label: 'serviceForm.common.age', type: 'number' },
      {
        name: 'availability_days',
        label: 'serviceFields.petcare.availability_days',
        type: 'checkbox',
        options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.petcare.availability_hours',
        type: 'checkbox',
        options: ['morning', 'noon', 'afternoon', 'evening', 'night']
      },
      {
        name: 'animalTypes',
        label: 'serviceFields.petcare.animalTypes', 
        type: 'checkbox',
        options: ['dogs', 'cats', 'birds', 'smallRodents', 'fish', 'reptiles']
      },
      { 
        name: 'dogSizes', 
        label: 'serviceFields.petcare.dogSizes', 
        type: 'checkbox',
        options: ['smallDog', 'mediumDog', 'largeDog', 'giantDog']
      },
      { 
        name: 'location', 
        label: 'serviceFields.petcare.location', 
        type: 'select',
        options: ['clientHome', 'בבית המטפל', 'פנסיון לבעלי חיים']
      },
      { 
        name: 'experience', 
        label: 'serviceFields.petcare.experience', 
        type: 'number' 
      },
      { 
        name: 'additionalServices', 
        label: 'serviceFields.petcare.additionalServices', 
        type: 'checkbox',
        options: [
          'dogWalking', 
          'bathingGrooming', 
          'basicTraining', 
          'medication',
          'feeding', 
          'cleaning',
          'photoUpdates', 
          'daytimeOnly', 
          'overnight'
        ]
      },
      { 
        name: 'facilities', 
        label: 'serviceFields.petcare.facilities', 
        type: 'checkbox',
        options: ['fencedGarden', 'largeYard', 'airConditioning']
      },
      {
        name: 'veterinaryServices',
        label: 'serviceFields.petcare.veterinaryServices',
        type: 'checkbox',
        options: ['vetVisit', 'basicCare']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  tutoring: {
    fields: [
      { name: 'age', label: 'serviceForm.common.age', type: 'number' },
      { name: 'experience', label: 'serviceFields.tutoring.experienceYears', type: 'number' },
      {
        name: 'availability_days',
        label: 'serviceFields.tutoring.availability_days',
        type: 'checkbox',
        options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.tutoring.availability_hours',
        type: 'checkbox',
        options: ['morning', 'noon', 'afternoon', 'evening', 'night']
      },
      {
        name: 'subjects',
        label: 'serviceFields.tutoring.subjects',
        type: 'checkbox',
        options: ['מתמטיקה', 'english', 'hebrew', 'פיזיקה', 'כימיה', 'ביולוגיה', 'היסטוריה', 'ספורט', 'מוזיקה', 'אומנות']
      },
      {
        name: 'ageGroups',
        label: 'filters.sports_activities.ageGroups',
        type: 'checkbox',
        options: ['ילדים', 'נוער', 'adults', 'כל הגילאים']
      },
      {
        name: 'levels',
        label: 'serviceFields.tutoring.levels',
        type: 'checkbox',
        options: ['elementary', 'middleSchool', 'highSchool', 'matriculation', 'preAcademic', 'academic', 'adults']
      },
      {
        name: 'teachingMode',
        label: 'serviceFields.tutoring.teachingMode',
        type: 'select',
        options: ['inPersonOnly', 'onlineOnly', 'both']
      },
      {
        name: 'specializations',
        label: 'serviceFields.tutoring.specializations',
        type: 'checkbox',
        options: ['examPrep', 'learningDisabilities']
      },
      { name: 'qualifications', label: 'serviceFields.tutoring.qualifications', type: 'text' },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  sports_activities: {
    fields: [
      { name: 'age', label: 'serviceForm.common.age', type: 'number' },
      { name: 'experience', label: 'serviceFields.tutoring.experienceYears', type: 'number' },
      {
        name: 'availability_days',
        label: 'serviceFields.tutoring.availability_days',
        type: 'checkbox',
        options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.tutoring.availability_hours',
        type: 'checkbox',
        options: ['morning', 'noon', 'afternoon', 'evening', 'night']
      },
      {
        name: 'subjects',
        label: 'serviceForm.sports_activities.subjectsLabel',
        type: 'checkbox',
        options: []
      },
      {
        name: 'levels',
        label: 'filters.sports_activities.ageGroups',
        type: 'checkbox',
        options: ['ילדים', 'נוער', 'adults', 'כל הגילאים']
      },
      {
        name: 'teachingMode',
        label: 'serviceForm.sports_activities.activityMode',
        type: 'select',
        options: ['inPersonOnly', 'onlineOnly', 'both']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  doula: {
    fields: [
      {
        name: 'availability_hours',
        label: 'serviceForm.common.availabilityHours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'night', '24/7']
      },
      {
        name: 'work_types',
        label: 'serviceForm.common.workTypes',
        type: 'checkbox',
        options: ['הכנה ללידה', 'ליווי בלידה', 'ליווי לאחר לידה', 'תמיכה בהנקה']
      },
      { name: 'experience', label: 'serviceForm.common.experience', type: 'number' },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  eldercare: {
    fields: [
      { name: 'age', label: 'serviceForm.common.age', type: 'number' },
      {
        name: 'careTypes',
        label: 'serviceFields.eldercare.careTypes',
        type: 'checkbox',
        keyPrefix: 'serviceForm.eldercare.careTypes.',
        options: ['companionship', 'houseCleaning', 'cooking', 'shopping', 'medication', 'doctorVisits']
      },
      { name: 'certification', label: 'serviceFields.eldercare.certification', type: 'text' },
      {
        name: 'availability_days',
        label: 'serviceFields.eldercare.availability_days',
        type: 'checkbox',
        options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.eldercare.availability',
        type: 'checkbox',
        options: ['morning', 'noon', 'afternoon', 'evening', 'night', '24/7']
      },
      { name: 'experience', label: 'serviceFields.eldercare.experience', type: 'number' },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      },
      {
        name: 'administrativeHelp',
        label: 'serviceFields.eldercare.administrativeHelp',
        type: 'select',
        options: [
          { value: 'not_specified', labelKey: 'filters.noMatter' },
          { value: 'yes', labelKey: 'common.yes' },
          { value: 'no', labelKey: 'common.no' }
        ]
      },
      {
        name: 'medicalAccompaniment',
        label: 'serviceFields.eldercare.medicalAccompaniment',
        type: 'select',
        options: [
          { value: 'not_specified', labelKey: 'filters.noMatter' },
          { value: 'yes', labelKey: 'common.yes' },
          { value: 'no', labelKey: 'common.no' }
        ]
      },
      {
        name: 'vehicleForOutings',
        label: 'serviceFields.eldercare.vehicleForOutings',
        type: 'select',
        options: [
          { value: 'not_specified', labelKey: 'filters.noMatter' },
          { value: 'yes', labelKey: 'common.yes' },
          { value: 'no', labelKey: 'common.no' }
        ]
      },
      {
        name: 'specialConditions',
        label: 'serviceFields.eldercare.specialConditions',
        type: 'checkbox',
        keyPrefix: 'serviceForm.eldercare.conditions.',
        options: ['alzheimer', 'parkinson', 'diabetes', 'mobility', 'dementia']
      }
    ]
  },


 laundry: {
    fields: [
      { name: 'experience', label: 'serviceFields.laundry.experienceYears', type: 'number' },
      { 
        name: 'laundryTypes', 
        label: 'serviceFields.laundry.laundryTypes', 
        type: 'checkbox',
        options: [
          'pickupDelivery',
          'dryCleaning',
          'linens',
          'industrial'
        ]
      },
    {
      name: 'availability_hours',
      label: 'serviceFields.laundry.availableHours',
      type: 'checkbox',
      options: ['morning', 'afternoon', 'evening', 'all']
    },
      {
        name: 'pickupService',
        label: 'serviceFields.laundry.pickupService',
        type: 'select',
        options: [
          { value: 'yes', label: 'מספק שירות איסוף' },
          { value: 'no', label: 'לא מספק שירות איסוף' }
        ]
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },
  
  property_management: {
    fields: [
      { name: 'experience', label: 'serviceFields.property_management.experienceYears', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.property_management.availability_hours',
        type: 'checkbox',
        options: ['morning', 'noon', 'afternoon', 'evening', 'all']
      },
      {
        name: 'management_type',
        label: 'serviceFields.property_management.management_type',
        type: 'checkbox',
        options: [
          'tenantSearch',
          'contractManagement',
          'rentCollection',
          'propertyInspection',
          'utilityTransfer',
          'listingManagement',
          'guestCommunication',
          'guestCheckin',
          'turnaroundCleaning',
          'periodicInspection',
          'generalRepairs'
        ]
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  electrician: {
    fields: [
      { name: 'experience', label: 'serviceFields.electrician.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.electrician.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.electrician.work_types', 
        type: 'checkbox',
        options: ['repairs', 'installations', 'largeElectricalWork']
      },
      { 
        name: 'repair_types', 
        label: 'serviceFields.electrician.repair_types', 
        type: 'checkbox',
        options: ['shortCircuitRepair', 'timerRepair', 'panelRepair', 'outletReplacement', 'spotlightRepair', 'otherRepairs', 'stairwaySwitch']
      },
      { 
        name: 'installation_types', 
        label: 'serviceFields.electrician.installation_types', 
        type: 'checkbox',
        options: ['ceilingFan', 'outletInstall', 'newOutlet', 'waterHeater', 'switchInstall', 'evCharger', 'shabbatTimer', 'otherInstall', 'evMeter', 'inductionCooktop', 'bathroomHeater', 'generator', 'ventaInstall', 'evEdge']
      },
      { 
        name: 'large_work_types', 
        label: 'serviceFields.electrician.large_work_types', 
        type: 'checkbox',
        options: ['newInfrastructure', 'replaceInfrastructure', 'panelReplacement', 'grounding', 'threePhase', 'inspection']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  plumbing: {
    fields: [
      { name: 'experience', label: 'serviceFields.plumbing.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.plumbing.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.plumbing.work_types', 
        type: 'checkbox',
        options: ['blockages', 'pipeRepair', 'largeWork', 'fixtureRepair']
      },
      { 
        name: 'blockage_types', 
        label: 'serviceFields.plumbing.blockage_types', 
        type: 'checkbox',
        options: ['homeBlockage', 'submersiblePump', 'buildingBlockage']
      },
      { 
        name: 'pipe_repair_types', 
        label: 'serviceFields.plumbing.pipe_repair_types', 
        type: 'checkbox',
        options: ['malePipeRepair', 'homePipeDamage', 'buildingPipeDamage', 'pressureBoost', 'gardenPipes', 'otherPipeRepairs', 'sewerNonDestructive']
      },
      { 
        name: 'large_work_types', 
        label: 'serviceFields.plumbing.large_work_types', 
        type: 'checkbox',
        options: ['homePipeReplacement', 'buildingPipeReplacement', 'newWaterPoints', 'homeSewerReplacement', 'buildingSewerReplacement', 'newSewerLine', 'gardenPipeReplacement', 'pierInstallation']
      },
      { 
        name: 'fixture_types', 
        label: 'serviceFields.plumbing.fixture_types', 
        type: 'checkbox',
        options: ['waterBar', 'concealedCistern', 'faucets', 'toilets', 'waterFilters', 'garbageDisposal', 'disposalRepair', 'sinks', 'dishwasherPrep', 'showerBase', 'otherFixtures', 'toiletFlush', 'bidet', 'wallMountedToilet', 'checkValve', 'underSinkSystems']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  air_conditioning: {
    fields: [
      { name: 'experience', label: 'serviceFields.air_conditioning.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.air_conditioning.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.air_conditioning.work_types', 
        type: 'checkbox',
        options: ['installation', 'repair', 'disassembly']
      },
      { 
        name: 'installation_types', 
        label: 'serviceFields.air_conditioning.installation_types', 
        type: 'checkbox',
        options: ['acInstall', 'miniCentralInstall', 'centralInstall', 'inverterInstall', 'multiInverterInstall', 'vrfInstall']
      },
      { 
        name: 'repair_types', 
        label: 'serviceFields.air_conditioning.repair_types', 
        type: 'checkbox',
        options: ['acRepair', 'gasRefill', 'moldyAcRepair', 'miniCentralRepair', 'gasLeakRepair', 'centralRepair', 'inverterRepair', 'vrfRepair', 'filterCleaning', 'תיקון צ\'ילרים', 'coldRoomTech']
      },
      { 
        name: 'disassembly_types', 
        label: 'serviceFields.air_conditioning.disassembly_types', 
        type: 'checkbox',
        options: ['acDisassembly', 'miniCentralDisassembly', 'centralDisassembly', 'inverterDisassembly', 'vrfDisassembly']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  gas_technician: {
    fields: [
      { name: 'experience', label: 'serviceFields.gas_technician.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.gas_technician.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.gas_technician.work_types', 
        type: 'checkbox',
        options: ['pipeInstallation', 'repairs']
      },
      { 
        name: 'installation_types', 
        label: 'serviceFields.gas_technician.installation_types', 
        type: 'checkbox',
        options: ['gasPointInstall', 'stovetopInstall', 'pipeInstall', 'grillInstall', 'waterHeaterInstall', 'hagaz', 'newBuildingInfra', 'businessServices']
      },
      {
        name: 'repair_types',
        label: 'serviceFields.gas_technician.repair_types',
        type: 'checkbox',
        options: ['stovetopRepair', 'pipeRepair']
      },
      {
        name: 'license_type',
        label: 'serviceFields.gas_technician.license_type',
        type: 'checkbox',
        options: ['licenseLevel1', 'licenseLevel2']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  drywall: {
    fields: [
      { name: 'experience', label: 'serviceFields.drywall.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.drywall.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.drywall.work_types', 
        type: 'checkbox',
        options: ['design', 'drywallWork']
      },
      { 
        name: 'design_types', 
        label: 'serviceFields.drywall.design_types', 
        type: 'checkbox',
        options: ['niches', 'tvUnit', 'libraries', 'shelves', 'hiddenLighting', 'roundedCornice', 'arches', 'floatingCeiling', 'floatingWall']
      },
      { 
        name: 'construction_types', 
        label: 'serviceFields.drywall.construction_types', 
        type: 'checkbox',
        options: ['walls', 'ceilings', 'shelfConstruction', 'acDropCeiling', 'pipeCovering', 'cornice', 'acousticInsulation']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  carpentry: {
    fields: [
      { name: 'experience', label: 'serviceFields.carpentry.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.carpentry.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.carpentry.work_types', 
        type: 'checkbox',
        options: ['furnitureBuilding', 'furnitureRepair', 'otherWork', 'outdoorCarpentry']
      },
      { 
        name: 'furniture_building_types', 
        label: 'serviceFields.carpentry.furniture_building_types', 
        type: 'checkbox',
        options: ['wallClosets', 'slidingClosets', 'bathroomCabinets', 'bedroomFurniture', 'tableBuilding', 'chairBuilding', 'tvUnitBuilding', 'libraryBuilding', 'customFurniture', 'shelfBuilding', 'walkInCloset', 'woodenBed', 'kitchenFurniture']
      },
      { 
        name: 'furniture_repair_types', 
        label: 'serviceFields.carpentry.furniture_repair_types', 
        type: 'checkbox',
        options: ['repairWallClosets', 'repairTable', 'repairChairs', 'repairSlidingClosets', 'repairBathroomCabinets', 'repairBedroomFurniture', 'repairTvUnit', 'repairLibrary', 'repairOther']
      },
      { 
        name: 'other_carpentry_types', 
        label: 'serviceFields.carpentry.other_carpentry_types', 
        type: 'checkbox',
        options: ['wallCladding', 'disassembly', 'doorFabrication', 'doorRepair', 'doorRenovation', 'loft', 'stairs', 'lattice', 'בוצ\'ר עץ']
      },
      { 
        name: 'outdoor_carpentry_types', 
        label: 'serviceFields.carpentry.outdoor_carpentry_types', 
        type: 'checkbox',
        options: ['pergolas', 'decks', 'fences']
      },
      { 
        name: 'pergola_types', 
        label: 'serviceFields.carpentry.pergola_types', 
        type: 'checkbox',
        options: ['woodPergolas', 'shadePergolas', 'balconyEnclosure']
      },
      { 
        name: 'deck_types', 
        label: 'serviceFields.carpentry.deck_types', 
        type: 'checkbox',
        options: ['naturalWoodDecks', 'compositeDecks', 'deckRenovation']
      },
      { 
        name: 'fence_types', 
        label: 'serviceFields.carpentry.fence_types', 
        type: 'checkbox',
        options: ['woodFences', 'gardenPartitions', 'woodGates']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  home_organization: {
    fields: [
      { name: 'experience', label: 'serviceFields.home_organization.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.home_organization.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.home_organization.work_types', 
        type: 'checkbox',
        options: ['general', 'sorting', 'professional']
      },
      { 
        name: 'general_organization_types', 
        label: 'serviceFields.home_organization.general_organization_types', 
        type: 'checkbox',
        options: ['fullHouse', 'rooms', 'kitchen', 'kidsRoom', 'closets', 'bathroom']
      },
      { 
        name: 'sorting_types', 
        label: 'serviceFields.home_organization.sorting_types', 
        type: 'checkbox',
        options: ['itemSorting', 'clothesSorting', 'toySorting', 'donation']
      },
      { 
        name: 'professional_organization_types', 
        label: 'serviceFields.home_organization.professional_organization_types', 
        type: 'checkbox',
        options: ['storageSolutions', 'smallSpaces', 'shelfDesign']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  event_entertainment: {
    fields: [
      { name: 'experience', label: 'serviceFields.event_entertainment.experience', type: 'number' },
      {
        name: 'availability_days',
        label: 'serviceFields.event_entertainment.availability_days',
        type: 'checkbox',
        options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'allWeek']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.event_entertainment.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      {
        name: 'entertainment_types',
        label: 'serviceFields.event_entertainment.entertainment_types',
        type: 'checkbox',
        options: ['magician', 'magicianGeneral', 'clown', 'balloonArt', 'balloonInflation', 'costumes', 'groupGames', 'bubbleShow', 'musicDancing']
      },
      {
        name: 'other_types',
        label: 'serviceFields.event_entertainment.other_types',
        type: 'checkbox',
        options: ['facePainting', 'photoMagnets']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  event_equipment_rental: {
    fields: [
      { name: 'experience', label: 'serviceFields.event_equipment_rental.experience', type: 'number' },
      {
        name: 'availability_days',
        label: 'serviceFields.event_equipment_rental.availability_days',
        type: 'checkbox',
        options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'allWeek']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.event_equipment_rental.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      {
        name: 'equipment_rental_types',
        label: 'serviceFields.event_equipment_rental.equipment_rental_types',
        type: 'checkbox',
        options: ['foodMachines', 'inflatables', 'effectMachines']
      },
      {
        name: 'food_machine_types',
        label: 'serviceFields.event_equipment_rental.food_machine_types',
        type: 'checkbox',
        options: ['popcorn', 'cottonCandy', 'slushie', 'waffle', 'granita', 'softServe', 'milkshake', 'juicer', 'hotdog', 'crepe', 'chocolateFountain']
      },
      {
        name: 'inflatable_game_types',
        label: 'serviceFields.event_equipment_rental.inflatable_game_types',
        type: 'checkbox',
        options: ['bouncyHouses', 'ג\'ימבורי', 'gameStations']
      },
      {
        name: 'effect_machine_types',
        label: 'serviceFields.event_equipment_rental.effect_machine_types',
        type: 'checkbox',
        options: ['smokeMachine', 'snowMachine', 'bubbleMachine']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  event_food_stands: {
    fields: [
      { name: 'experience', label: 'serviceFields.event_food_stands.experience', type: 'number' },
      {
        name: 'availability_days',
        label: 'serviceFields.event_food_stands.availability_days',
        type: 'checkbox',
        options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'allWeek']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.event_food_stands.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      {
        name: 'food_stand_types',
        label: 'serviceFields.event_food_stands.food_stand_types',
        type: 'checkbox',
        options: ['popcorn', 'cottonCandy', 'hotdog', 'granita', 'crepe', 'waffle', 'icecream', 'coffee', 'candy', 'chocolate', 'נאצ\'וס', 'burger', 'pizza']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  dj: {
    fields: [
      { name: 'experience', label: 'serviceFields.dj.experience', type: 'number' },
      {
        name: 'availability_days',
        label: 'serviceFields.dj.availability_days',
        type: 'checkbox',
        options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'allWeek']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.dj.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      {
        name: 'dj_event_types',
        label: 'serviceFields.dj.dj_event_types',
        type: 'checkbox',
        options: ['wedding', 'barMitsva', 'batMitsva', 'britMila', 'shevaBrahot', 'anniversary', 'corporateEvent', 'privateParty', 'familyParty', 'engagement']
      },
      {
        name: 'languages',
        label: 'serviceFields.dj.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      },
      {
        name: 'separated_dancing',
        label: 'serviceFields.dj.separated_dancing',
        type: 'boolean-select'
      }
    ]
  },

  private_chef: {
    fields: [
      { name: 'experience', label: 'serviceFields.private_chef.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.private_chef.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      {
        name: 'work_types',
        label: 'serviceFields.private_chef.work_types',
        type: 'checkbox',
        options: ['eventTypes', 'סוג המטבח', 'כשרות']
      },
      {
        name: 'event_types',
        label: 'serviceFields.private_chef.event_types',
        type: 'checkbox',
        options: [
          'wedding', 'barMitsva', 'batMitsva', 'britMila', 'pidyonHaben',
          'shevaBrahot', 'anniversary', 'kiddouch', 'shabbatHatan',
          'corporateEvent', 'privateParty', 'familyParty', 'engagement', 'shabbatMeals'
        ]
      },
      {
        name: 'cuisine_types',
        label: 'serviceFields.private_chef.cuisine_types',
        type: 'checkbox',
        options: ['pizza', 'sushi', 'salads', 'asian', 'pasta', 'meat', 'vegan', 'glutenFree', 'desserts', 'shabbatSalads', 'halavi', 'shabbatChallah', 'smokedFish', 'herring']
      },
      {
        name: 'kosher_types',
        label: 'serviceFields.private_chef.kosher_types',
        type: 'checkbox',
        options: [
          'badatzEdaChareidis', 'badatzBeitYosef', 'badatzYoreDea',
          'badatzBelz', 'badatzSheerit', 'badatzNetivot',
          'badatzChatamBB', 'badatzChatamPT', 'badatzMikveh',
          'badatzTzfat', 'rabbiLanda', 'rabbiRubin', 'rabbinateMethadrin', 'rabbinate', 'other'
        ]
      },
      { name: 'kosher_other', label: 'serviceFields.private_chef.kosher_other', type: 'text' },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  catering: {
    fields: [
      { name: 'experience', label: 'serviceFields.catering.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.catering.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      {
        name: 'work_types',
        label: 'serviceFields.catering.work_types',
        type: 'checkbox',
        options: ['eventTypes', 'סוג המטבח', 'כשרות']
      },
      {
        name: 'event_types',
        label: 'serviceFields.catering.event_types',
        type: 'checkbox',
        options: [
          'wedding', 'barMitsva', 'batMitsva', 'britMila', 'pidyonHaben',
          'shevaBrahot', 'anniversary', 'kiddouch', 'shabbatHatan',
          'corporateEvent', 'privateParty', 'familyParty', 'engagement', 'shabbatMeals'
        ]
      },
      {
        name: 'cuisine_types',
        label: 'serviceFields.catering.cuisine_types',
        type: 'checkbox',
        options: ['pizza', 'sushi', 'salads', 'asian', 'pasta', 'meat', 'vegan', 'glutenFree', 'shabbatSalads', 'halavi', 'shabbatChallah', 'smokedFish', 'herring']
      },
      {
        name: 'kosher_types',
        label: 'serviceFields.catering.kosher_types',
        type: 'checkbox',
        options: [
          'badatzEdaChareidis', 'badatzBeitYosef', 'badatzYoreDea',
          'badatzBelz', 'badatzSheerit', 'badatzNetivot',
          'badatzChatamBB', 'badatzChatamPT', 'badatzMikveh',
          'badatzTzfat', 'rabbiLanda', 'rabbiRubin', 'rabbinateMethadrin', 'rabbinate', 'other'
        ]
      },
      { name: 'kosher_other', label: 'serviceFields.catering.kosher_other', type: 'text' },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  pastry: {
    fields: [
      { name: 'experience', label: 'serviceFields.pastry.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.pastry.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      {
        name: 'product_types',
        label: 'serviceFields.pastry.product_types',
        type: 'checkbox',
        options: ['cakes', 'patisserie', 'chocolates', 'macarons', 'cakeBox', 'fruitArrangements', 'fruitPlatters', 'desserts']
      },
      {
        name: 'event_types',
        label: 'serviceFields.pastry.event_types',
        type: 'checkbox',
        options: [
          'wedding', 'barMitsva', 'batMitsva', 'britMila', 'pidyonHaben',
          'shevaBrahot', 'anniversary', 'kiddouch', 'shabbatHatan',
          'corporateEvent', 'privateParty', 'familyParty', 'engagement', 'shabbatMeals'
        ]
      },
      {
        name: 'kosher_types',
        label: 'serviceFields.pastry.kosher_types',
        type: 'checkbox',
        options: [
          'badatzEdaChareidis', 'badatzBeitYosef', 'badatzYoreDea',
          'badatzBelz', 'badatzSheerit', 'badatzNetivot',
          'badatzChatamBB', 'badatzChatamPT', 'badatzMikveh',
          'badatzTzfat', 'rabbiLanda', 'rabbiRubin', 'rabbinateMethadrin', 'rabbinate', 'other'
        ]
      },
      { name: 'kosher_other', label: 'serviceFields.pastry.kosher_other', type: 'text' },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  photographer: {
    fields: [
      { name: 'experience', label: 'serviceFields.photographer.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.photographer.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      {
        name: 'work_types',
        label: 'serviceFields.photographer.work_types',
        type: 'checkbox',
        options: ['eventTypes']
      },
      {
        name: 'event_types',
        label: 'serviceFields.photographer.event_types',
        type: 'checkbox',
        options: ['barMitsva', 'batMitsva', 'wedding', 'engagement', 'haircut', 'photoShoot', 'privateEvents']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  event_decoration: {
    fields: [
      { name: 'magnets', label: 'serviceFields.event_decoration.magnets', type: 'boolean-select' },
      { name: 'experience', label: 'serviceFields.event_decoration.experience', type: 'number' },
      {
        name: 'decoration_types',
        label: 'serviceFields.event_decoration.decoration_types',
        type: 'checkbox',
        options: ['archBalloon', 'tableDeco', 'hallDeco', 'photoWall']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.event_decoration.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  moving: {
    fields: [
      { name: 'experience', label: 'serviceFields.moving.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.moving.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      {
        name: 'avoda_ivrit',
        label: 'serviceFields.moving.avoda_ivrit',
        type: 'checkbox',
        options: ['עבודה עברית']
      },
      {
        name: 'moving_flags',
        label: 'serviceFields.moving.extras',
        type: 'boolean-group',
        options: [
          { value: 'packing_materials', labelKey: 'serviceFields.moving.packing_materials' },
          { value: 'crane_services',    labelKey: 'serviceFields.moving.crane_services' },
          { value: 'cardboard_supply',  labelKey: 'serviceFields.moving.cardboard_supply' },
          { value: 'storage',           labelKey: 'serviceFields.moving.storage' }
        ]
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  painting: {
    fields: [
      { name: 'experience', label: 'serviceFields.painting.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.painting.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.painting.work_types', 
        type: 'checkbox',
        options: ['generalPainting', 'wallRepairs', 'wallSmoothing', 'moistureMold', 'paintStripping', 'effectPainting', 'accentWall', 'specialTextures']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  waterproofing: {
    fields: [
      { name: 'experience', label: 'serviceFields.waterproofing.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.waterproofing.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      {
        name: 'work_types',
        label: 'serviceFields.waterproofing.work_types',
        type: 'checkbox',
        options: ['roofWaterproofing', 'wallWaterproofing', 'balconyWaterproofing', 'wetRoomWaterproofing', 'undergroundWaterproofing', 'inspectionEquipment']
      },
      {
        name: 'roof_waterproofing_types',
        label: 'serviceFields.waterproofing.roof_waterproofing_types',
        type: 'checkbox',
        options: ['bituminousSheets', 'hotAsphalt', 'polyurethane', 'tileRoof', 'maintenance']
      },
      {
        name: 'wall_waterproofing_types',
        label: 'serviceFields.waterproofing.wall_waterproofing_types',
        type: 'checkbox',
        options: ['waterPenetration', 'exteriorRestoration', 'crackSealing', 'dampnessTreatment']
      },
      {
        name: 'balcony_waterproofing_types',
        label: 'serviceFields.waterproofing.balcony_waterproofing_types',
        type: 'checkbox',
        options: ['beforeTiling', 'leakRepair', 'tilingAndSealing']
      },
      {
        name: 'wet_room_waterproofing_types',
        label: 'serviceFields.waterproofing.wet_room_waterproofing_types',
        type: 'checkbox',
        options: ['bathroom', 'shower', 'toilet', 'beforeRenovation']
      },
      {
        name: 'underground_waterproofing_types',
        label: 'serviceFields.waterproofing.underground_waterproofing_types',
        type: 'checkbox',
        options: ['basements', 'foundations', 'undergroundWalls']
      },
      {
        name: 'inspection_equipment_types',
        label: 'serviceFields.waterproofing.inspection_equipment_types',
        type: 'checkbox',
        options: ['leakDetection', 'moistureTests', 'thermalImaging']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  contractor: {
    fields: [
      { name: 'experience', label: 'serviceFields.contractor.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.contractor.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.contractor.work_types', 
        type: 'checkbox',
        options: ['structureWork', 'generalRenovation', 'electricPlumbing', 'exteriorWork', 'facadeRepair']
      },
      { 
        name: 'structure_work_types', 
        label: 'serviceFields.contractor.structure_work_types', 
        type: 'checkbox',
        options: ['buildingFrame', 'concretePours', 'formwork', 'structuralReinforcement', 'blockWalls', 'demolitionRebuild']
      },
      { 
        name: 'general_renovation_types', 
        label: 'serviceFields.contractor.general_renovation_types', 
        type: 'checkbox',
        options: ['fullApartmentReno', 'roomRenovation', 'bathroomReno', 'kitchenReno', 'flooringReplacement', 'drywallWork', 'plasterWork', 'balconyEnclosure', 'professionalPainting', 'doorFrameReplacement']
      },
      { 
        name: 'electric_plumbing_types', 
        label: 'serviceFields.contractor.electric_plumbing_types', 
        type: 'checkbox',
        options: ['electricalWork', 'panelReplacement', 'generalPlumbing', 'pipeReplacement', 'leakDetection']
      },
      { 
        name: 'exterior_work_types', 
        label: 'serviceFields.contractor.exterior_work_types', 
        type: 'checkbox',
        options: ['exteriorFlooring', 'pergolaConstruction', 'stoneCladding', 'fencing', 'gardenPathways']
      },
      { 
        name: 'facade_repair_types', 
        label: 'serviceFields.contractor.facade_repair_types', 
        type: 'checkbox',
        options: ['exteriorPlasterRepair', 'exteriorWallRestoration', 'wallCrackSealing', 'fallingPlasterTreatment']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  aluminum: {
    fields: [
      { name: 'experience', label: 'serviceFields.aluminum.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.aluminum.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.aluminum.work_types', 
        type: 'checkbox',
        options: ['windowsDoors', 'pergolas', 'repairs', 'cladding']
      },
      { 
        name: 'windows_doors_types', 
        label: 'serviceFields.aluminum.windows_doors_types', 
        type: 'checkbox',
        options: ['installWindows', 'aluminumDoors', 'slidingDoors', 'entryDoors', 'mosquitoNets', 'manualShutters', 'electricShutters']
      },
      { 
        name: 'pergolas_outdoor_types', 
        label: 'serviceFields.aluminum.pergolas_outdoor_types', 
        type: 'checkbox',
        options: ['aluminumPergolas', 'balconyEnclosure', 'exteriorCladding', 'railings']
      },
      { 
        name: 'repairs_service_types', 
        label: 'serviceFields.aluminum.repairs_service_types', 
        type: 'checkbox',
        options: ['repairShutterMotor', 'repairTracks', 'repairWheels', 'replaceHandles', 'sealingRenewal', 'repairManualShutters']
      },
      { 
        name: 'cladding_types', 
        label: 'serviceFields.aluminum.cladding_types', 
        type: 'checkbox',
        options: ['pipeCovering', 'meterCovering', 'decorativeBoxes', 'acLineCovering', 'acMotorProtection', 'wallCladding', 'decorativeCladding', 'shutterBoxCladding']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  glass_works: {
    fields: [
      { name: 'experience', label: 'serviceFields.glass_works.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.glass_works.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.glass_works.work_types', 
        type: 'checkbox',
        options: ['showers', 'homeGlass', 'furniture', 'partitions', 'repairs']
      },
      { 
        name: 'shower_glass_types', 
        label: 'serviceFields.glass_works.shower_glass_types', 
        type: 'checkbox',
        options: ['showerInstall', 'showerRepair', 'showerGlassReplacement', 'showerDoors']
      },
      { 
        name: 'windows_doors_glass_types', 
        label: 'serviceFields.glass_works.windows_doors_glass_types', 
        type: 'checkbox',
        options: ['windowReplacement', 'doubleGlazing', 'reglazing', 'interiorGlassDoors', 'glassPartitions']
      },
      { 
        name: 'kitchen_home_glass_types', 
        label: 'serviceFields.glass_works.kitchen_home_glass_types', 
        type: 'checkbox',
        options: ['kitchenBacksplash', 'glassShelves', 'glassTables', 'bathroomMirrors', 'decorativeMirrors']
      },
      { 
        name: 'special_safety_glass_types', 
        label: 'serviceFields.glass_works.special_safety_glass_types', 
        type: 'checkbox',
        options: ['temperedGlass', 'smartGlass', 'securityGlass', 'acousticGlass', 'decorativeGlass']
      },
      { 
        name: 'repair_custom_types', 
        label: 'serviceFields.glass_works.repair_custom_types', 
        type: 'checkbox',
        options: ['scratchRepair', 'glassPolishing', 'customCutting']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  locksmith: {
    fields: [
      { name: 'experience', label: 'serviceFields.locksmith.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.locksmith.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.locksmith.work_types', 
        type: 'checkbox',
        options: ['lockReplacement', 'emergencyOpening', 'advancedSystems', 'doorRepair', 'securityServices']
      },
      { 
        name: 'lock_replacement_types', 
        label: 'serviceFields.locksmith.lock_replacement_types', 
        type: 'checkbox',
        options: ['cylinderLock', 'securityLock', 'entranceLock', 'officeLock']
      },
      { 
        name: 'door_opening_types', 
        label: 'serviceFields.locksmith.door_opening_types', 
        type: 'checkbox',
        options: ['noDamageOpening', 'emergency247', 'safeOpening', 'keyDuplication']
      },
      { 
        name: 'lock_system_installation_types', 
        label: 'serviceFields.locksmith.lock_system_installation_types', 
        type: 'checkbox',
        options: ['smartLocks', 'intercom', 'accessCode', 'electronicLock']
      },
      { 
        name: 'lock_door_repair_types', 
        label: 'serviceFields.locksmith.lock_door_repair_types', 
        type: 'checkbox',
        options: ['stuckLockRepair', 'hingeRepair', 'doorSanding', 'handleReplacement']
      },
      {
        name: 'security_services_types',
        label: 'serviceFields.locksmith.security_services_types',
        type: 'checkbox',
        options: ['securityUpgrade', 'securityDoorInstall', 'vulnerabilityCheck', 'commercialLocksmith']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  handyman: {
    fields: [
      {
        name: 'availability_hours',
        label: 'serviceFields.handyman.availability_hours',
        type: 'checkbox',
        options: ['morning', 'noon', 'evening', '24/7']
      },
      { name: 'experience', label: 'serviceForm.common.experience', type: 'number' },
      {
        name: 'work_types',
        label: 'serviceFields.handyman.work_types',
        type: 'checkbox',
        options: ['תיקונים כלליים', 'התקנות והרכבות', 'דלתות ורהיטים', 'עבודות קלות בבית', 'תליות וסידור']
      },
      {
        name: 'general_repairs_types',
        label: 'serviceFields.handyman.general_repairs_types',
        type: 'checkbox',
        options: ['תיקונים קטנים בבית', 'תחזוקה שוטפת']
      },
      {
        name: 'installations_types',
        label: 'serviceFields.handyman.installations_types',
        type: 'checkbox',
        options: ['התקנת טלוויזיה', 'התקנת מדפים', 'התקנת וילונות', 'הרכבת רהיטים']
      },
      {
        name: 'doors_furniture_types',
        label: 'serviceFields.handyman.doors_furniture_types',
        type: 'checkbox',
        options: ['doorRepair', 'furnitureRepair']
      },
      {
        name: 'light_work_types',
        label: 'serviceFields.handyman.light_work_types',
        type: 'checkbox',
        options: ['החלפת מנורות', 'תיקונים קלים']
      },
      {
        name: 'hanging_types',
        label: 'serviceFields.handyman.hanging_types',
        type: 'checkbox',
        options: ['תליית תמונות', 'תליית אביזרים']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  pest_control: {
    fields: [
      {
        name: 'availability_hours',
        label: 'serviceFields.electrician.availability_hours',
        type: 'checkbox',
        options: ['morning', 'noon', 'evening', '24/7']
      },
      { name: 'experience', label: 'serviceForm.common.experience', type: 'number' },
      {
        name: 'pestTypes',
        label: 'serviceForm.pest_control.pestTypes',
        type: 'checkbox',
        options: [
          'cockroaches', 'ants', 'bedbugs', 'fleas', 'mosquitoes',
          'rats', 'mice',
          'pigeons', 'pigeonNets', 'bats', 'snakes'
        ]
      },
      {
        name: 'certified',
        label: 'serviceForm.pest_control.certification',
        type: 'boolean-select'
      },
      {
        name: 'worksAtHeight',
        label: 'serviceForm.pest_control.workAtHeight',
        type: 'boolean-select'
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  metalwork: {
    fields: [
      { name: 'experience', label: 'serviceFields.metalwork.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.metalwork.availability_hours',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all']
      },
      {
        name: 'work_types',
        label: 'serviceFields.metalwork.work_types',
        type: 'checkbox',
        options: [
          { value: 'bars',         labelKey: 'serviceForm.metalwork.bars' },
          { value: 'railings',          labelKey: 'serviceForm.metalwork.railings' },
          { value: 'fences',          labelKey: 'serviceForm.metalwork.fences' },
          { value: 'galleries',         labelKey: 'serviceForm.metalwork.galleries' },
          { value: 'hangingBalconies',  labelKey: 'serviceForm.metalwork.hangingBalconies' },
          { value: 'stairs',         labelKey: 'serviceForm.metalwork.stairs' },
        ]
      }
    ]
  },

  mechanic: {
    fields: [
      { name: 'experience', label: 'serviceFields.mechanic.experience', type: 'number' },
      {
        name: 'work_types',
        label: 'serviceFields.mechanic.work_types',
        type: 'checkbox',
        options: [
          { value: 'carMechanics',    labelKey: 'serviceForm.mechanic.carMechanics' },
          { value: 'testPrep',      labelKey: 'serviceForm.mechanic.testPrep' },
          { value: 'routineMaintenance', labelKey: 'serviceForm.mechanic.routineMaintenance' },
          { value: 'computerDiagnostics',    labelKey: 'serviceForm.mechanic.computerDiagnostics' },
          { value: 'batteries',          labelKey: 'serviceForm.mechanic.batteries' },
          { value: 'airConditioning',    labelKey: 'serviceForm.mechanic.airConditioning' },
          { value: 'alternator',        labelKey: 'serviceForm.mechanic.alternator' },
          { value: 'engineRepairs',    labelKey: 'serviceForm.mechanic.engineRepairs' },
          { value: 'radiatorCooling',  labelKey: 'serviceForm.mechanic.radiatorCooling' },
          { value: 'vehicleInspection', labelKey: 'serviceForm.mechanic.vehicleInspection' }
        ]
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'spanish', 'russian']
      }
    ]
  },

  driver: {
    fields: [
      { name: 'experience', label: 'serviceFields.driver.experience', type: 'number' },
      {
        name: 'availability_hours',
        label: 'serviceFields.driver.availability_hours',
        type: 'checkbox',
        options: [
          { value: 'morning',        labelKey: 'hours.morning' },
          { value: 'afternoon', labelKey: 'hours.afternoon' },
          { value: 'evening',         labelKey: 'hours.evening' },
          { value: 'night',        labelKey: 'hours.night' },
          { value: '24/6',         labelKey: 'hours.twentyFourSix' }
        ]
      },
      {
        name: 'service_type',
        label: 'serviceForm.driver.serviceType',
        type: 'radio',
        options: [
          { value: 'privateDriver', labelKey: 'serviceForm.driver.privateDriver' },
          { value: 'taxi',  labelKey: 'serviceForm.driver.taxi' }
        ]
      },
      {
        name: 'transportation_type',
        label: 'serviceFields.driver.transportation_type',
        type: 'checkbox',
        options: [
          { value: 'הסעות לאירועים', labelKey: 'serviceForm.driver.eventTransport' },
          { value: 'הסעות תלמידים',  labelKey: 'serviceForm.driver.studentTransport' },
          { value: 'הסעות טיולים',   labelKey: 'serviceForm.driver.tripTransport' },
          { value: 'הסעות לנתב"ג',  labelKey: 'serviceForm.driver.airportTransport' }
        ]
      },
      {
        name: 'vehicle_type',
        label: 'serviceFields.driver.vehicle_type',
        type: 'checkbox',
        options: [
          { value: '5 מקומות',           labelKey: 'serviceForm.driver.seats5' },
          { value: '7 מקומות',           labelKey: 'serviceForm.driver.seats7' },
          { value: '9 מקומות',           labelKey: 'serviceForm.driver.seats9' },
          { value: 'מיניבוס (14-23 מושבים)', labelKey: 'serviceForm.driver.minibus' },
          { value: 'אוטובוס (50-60 מושבים)', labelKey: 'serviceForm.driver.bus' }
        ]
      },
      {
        name: 'languages',
        label: 'serviceFields.driver.languages',
        type: 'checkbox',
        options: ['hebrew', 'english', 'french', 'russian']
      }
    ]
  }
};

export default serviceFieldsConfig;