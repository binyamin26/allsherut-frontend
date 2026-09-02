// src/config/filterConfig.js
// Configuration centralisée de tous les filtres par service
// Les valeurs sont les clés de traduction

export const FILTER_CONFIG = {
  // ═══════════════════════════════════════════════════════════════
  // FILTRES COMMUNS À TOUS LES SERVICES
  // ═══════════════════════════════════════════════════════════════
  common: {
    days: [
      { value: 'sunday', key: 'days.sunday' },
      { value: 'monday', key: 'days.monday' },
      { value: 'tuesday', key: 'days.tuesday' },
      { value: 'wednesday', key: 'days.wednesday' },
      { value: 'thursday', key: 'days.thursday' },
      { value: 'friday', key: 'days.friday' },
      { value: 'allWeek', key: 'days.allWeek' }
    ],
    hours: [
      { value: 'morning', key: 'hours.morning' },
      { value: 'afternoon', key: 'hours.afternoon' },
      { value: 'evening', key: 'hours.evening' },
      { value: 'all', key: 'hours.all' }
    ],
    yesNoOptions: [
      { value: '', key: 'filters.noMatter' },
      { value: 'yes', key: 'common.yes' },
      { value: 'no', key: 'common.no' }
    ],
    languages: [
      { value: 'hebrew', key: 'languages.hebrew' },
      { value: 'russian', key: 'languages.russian' },
      { value: 'english', key: 'languages.english' },
      { value: 'french', key: 'languages.french' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // BABYSITTING
  // ═══════════════════════════════════════════════════════════════
  babysitting: {
    sectionTitles: {
      ageGroups: 'filters.babysitting.ageGroups',
      age: 'filters.babysitting.age',
      availabilityDays: 'filters.babysitting.availabilityDays',
      availabilityHours: 'filters.babysitting.availabilityHours',
      babysittingTypes: 'filters.babysitting.babysittingTypes',
      canTravelAlone: 'filters.babysitting.canTravelAlone',
      languages: 'filters.babysitting.languages',
      certifications: 'filters.babysitting.certifications',
      religiousLevel: 'filters.babysitting.religiousLevel'
    },
    ageGroups: [
      { value: 'age0to1', key: 'filters.babysitting.age0to1' },
      { value: 'age1to3', key: 'filters.babysitting.age1to3' },
      { value: 'age3to6', key: 'filters.babysitting.age3to6' },
      { value: 'age6plus', key: 'filters.babysitting.age6plus' }
    ],
    types: [
      { value: 'occasional', key: 'filters.babysitting.occasional' },
      { value: 'regular', key: 'filters.babysitting.regular' },
      { value: 'pickup', key: 'filters.babysitting.pickup' },
      { value: 'nightCare', key: 'filters.babysitting.nightCare' },
      { value: 'holidayCare', key: 'filters.babysitting.holidayCare' },
      { value: 'homework', key: 'filters.babysitting.homework' },
      { value: 'fullTime', key: 'filters.babysitting.fullTime' },
      { value: 'summerCamp', key: 'filters.babysitting.summerCamp' },
      { value: 'winterCamp', key: 'filters.babysitting.winterCamp' }
    ],
    languages: [
      { value: 'hebrew', key: 'languages.hebrew' },
      { value: 'russian', key: 'languages.russian' },
      { value: 'english', key: 'languages.english' },
      { value: 'spanish', key: 'languages.spanish' },
      { value: 'french', key: 'languages.french' }
    ],
    certifications: [
      { value: '', key: 'filters.noMatter' },
      { value: 'certSpecialEd', key: 'filters.babysitting.certSpecialEd' },
      { value: 'certFirstAid', key: 'filters.babysitting.certFirstAid' },
      { value: 'certKindergarten', key: 'filters.babysitting.certKindergarten' }
    ],
    religiousLevels: [
      { value: '', key: 'filters.noMatter' },
      { value: 'לא משנה', key: 'filters.noMatter' },
      { value: 'secular', key: 'filters.religious.secular' },
      { value: 'traditional', key: 'filters.religious.traditional' },
      { value: 'religious', key: 'filters.religious.religious' },
      { value: 'orthodox', key: 'filters.religious.orthodox' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // CLEANING
  // ═══════════════════════════════════════════════════════════════
 cleaning: {
    sectionTitles: {
      legalStatus: 'filters.cleaning.legalStatus',
      homeCleaning: 'filters.cleaning.homeCleaning',
      officeCleaning: 'filters.cleaning.officeCleaning',
      specialCleaning: 'filters.cleaning.specialCleaning',
      additionalServices: 'filters.cleaning.additionalServices',
      materialsProvided: 'filters.cleaning.materialsProvided',
      availableDays: 'filters.cleaning.availableDays',
      availableHours: 'filters.cleaning.availableHours'
    },
    legalStatus: [
      { value: '', key: 'filters.noMatter' },
      { value: 'company', key: 'filters.cleaning.company' },
      { value: 'independent', key: 'filters.cleaning.independent' }
    ],
    homeCleaning: [
      { value: 'regularCleaning', key: 'filters.cleaning.regularCleaning' },
      { value: 'passoverCleaning', key: 'filters.cleaning.passoverCleaning' },
      { value: 'postRenovation', key: 'filters.cleaning.postRenovation' },
      { value: 'airbnb', key: 'filters.cleaning.airbnb' }
    ],
    officeCleaning: [
      { value: 'offices', key: 'filters.cleaning.offices' },
      { value: 'stores', key: 'filters.cleaning.stores' },
      { value: 'buildings', key: 'filters.cleaning.buildings' },
      { value: 'educationalInstitutions', key: 'filters.cleaning.educationalInstitutions' },
      { value: 'factories', key: 'filters.cleaning.factories' }
    ],
    specialCleaning: [
      { value: 'highWindows', key: 'filters.cleaning.highWindows' },
      { value: 'carpets', key: 'filters.cleaning.carpets' },
      { value: 'sofas', key: 'filters.cleaning.sofas' },
      { value: 'curtains', key: 'filters.cleaning.curtains' },
      { value: 'pressureWashing', key: 'filters.cleaning.pressureWashing' },
      { value: 'damageCleanup', key: 'filters.cleaning.damageCleanup' },
      { value: 'acCleaning', key: 'filters.cleaning.acCleaning' },
      { value: 'roofCleaning', key: 'filters.cleaning.roofCleaning' },
      { value: 'aquariumCleaning', key: 'filters.cleaning.aquariumCleaning' }
    ],
    additionalServices: [
      { value: 'carCleaning', key: 'filters.cleaning.carCleaning' },
      { value: 'solarPanels', key: 'filters.cleaning.solarPanels' },
      { value: 'ironingAtHome', key: 'filters.cleaning.ironingAtHome' },
      { value: 'laundryFolding', key: 'filters.cleaning.laundryFolding' }
    ],
    materialsOptions: [
      { value: '', key: 'filters.cleaning.allOptions' },
      { value: 'yes', key: 'filters.cleaning.providesEquipment' },
      { value: 'no', key: 'filters.cleaning.noEquipment' },
      { value: 'partial', key: 'filters.cleaning.partialEquipment' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // GARDENING
  // ═══════════════════════════════════════════════════════════════
  gardening: {
    sectionTitles: {
      services: 'filters.gardening.serviceTypes',
      seasons: 'filters.gardening.availableSeasons',
      equipment: 'filters.gardening.ownedEquipment',
      specializations: 'filters.gardening.specializations',
      additionalServices: 'filters.gardening.additionalServices'
    },
    services: [
      { value: 'pruning', key: 'filters.gardening.pruning' },
      { value: 'design', key: 'filters.gardening.design' },
      { value: 'planting', key: 'filters.gardening.planting' },
      { value: 'irrigation', key: 'filters.gardening.irrigation' },
      { value: 'fertilizing', key: 'filters.gardening.fertilizing' },
      { value: 'weeding', key: 'filters.gardening.weeding' },
      { value: 'generalMaintenance', key: 'filters.gardening.generalMaintenance' }
    ],
    seasons: [
      { value: 'allYear', key: 'filters.gardening.allYear' },
      { value: 'spring', key: 'filters.gardening.spring' },
      { value: 'summer', key: 'filters.gardening.summer' },
      { value: 'autumn', key: 'filters.gardening.autumn' },
      { value: 'winter', key: 'filters.gardening.winter' }
    ],
    equipment: [
      { value: 'lawnMower', key: 'filters.gardening.lawnMower' },
      { value: 'pruningShears', key: 'filters.gardening.pruningShears' },
      { value: 'waterPump', key: 'filters.gardening.waterPump' },
      { value: 'handTools', key: 'filters.gardening.handTools' },
      { value: 'fertilizerSpreader', key: 'filters.gardening.fertilizerSpreader' },
      { value: 'irrigationSystem', key: 'filters.gardening.irrigationSystem' }
    ],
    specializations: [
      { value: 'gardenerTypeA', key: 'filters.gardening.gardenerTypeA' },
      { value: 'gardenerTypeB', key: 'filters.gardening.gardenerTypeB' },
      { value: 'agronomist', key: 'filters.gardening.agronomist' },
      { value: 'expertPruner', key: 'filters.gardening.expertPruner' }
    ],
    additionalServices: [
      { value: 'wasteRemoval', key: 'filters.gardening.wasteRemoval' },
      { value: 'landscapeConsulting', key: 'filters.gardening.landscapeConsulting' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // PETCARE
  // ═══════════════════════════════════════════════════════════════
  petcare: {
    sectionTitles: {
      animalTypes: 'filters.petcare.animalTypes',
      dogSizes: 'filters.petcare.dogSizes',
      careLocation: 'filters.petcare.location',  // ← corrigé
      additionalServices: 'filters.petcare.additionalServices',
      facilities: 'filters.petcare.facilities',
      veterinaryServices: 'filters.petcare.veterinaryServices'
    },
    animalTypes: [
      { value: 'dogs', key: 'filters.petcare.dogs' },
      { value: 'cats', key: 'filters.petcare.cats' },
      { value: 'birds', key: 'filters.petcare.birds' },
      { value: 'smallRodents', key: 'filters.petcare.smallRodents' },
      { value: 'fish', key: 'filters.petcare.fish' },
      { value: 'reptiles', key: 'filters.petcare.reptiles' }
    ],
    dogSizes: [
      { value: 'smallDog', key: 'filters.petcare.smallDog' },
      { value: 'mediumDog', key: 'filters.petcare.mediumDog' },
      { value: 'largeDog', key: 'filters.petcare.largeDog' },
      { value: 'giantDog', key: 'filters.petcare.giantDog' }
    ],
    locationOptions: [
      { value: '', key: 'filters.common.noMatter' },  // ← corrigé
      { value: 'clientHome', key: 'filters.petcare.clientHome' },
      { value: 'caregiverHome', key: 'filters.petcare.caregiverHome' },
      { value: 'both', key: 'filters.common.both' }  // ← corrigé
    ],
    additionalServices: [
      { value: 'dogWalking', key: 'filters.petcare.dogWalking' },
      { value: 'bathingGrooming', key: 'filters.petcare.bathingGrooming' },  // ← corrigé
      { value: 'basicTraining', key: 'filters.petcare.basicTraining' },
      { value: 'medication', key: 'filters.petcare.medicationAdmin' },  // ← corrigé
      { value: 'feeding', key: 'filters.petcare.feeding' },
      { value: 'cleaning', key: 'filters.petcare.cleaning' },
      { value: 'photoUpdates', key: 'filters.petcare.photoUpdates' },
      { value: 'daytimeOnly', key: 'filters.petcare.daytimeOnly' },  // ← corrigé
      { value: 'overnight', key: 'filters.petcare.overnight' }
    ],
    facilities: [
      { value: 'fencedGarden', key: 'filters.petcare.fencedGarden' },
      { value: 'largeYard', key: 'filters.petcare.largeYard' },
      { value: 'airConditioning', key: 'filters.petcare.airConditioning' }
    ],
    veterinaryServices: [
      { value: 'vetVisit', key: 'filters.petcare.vetVisit' },
      { value: 'basicCare', key: 'filters.petcare.basicCare' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // ELDERCARE
  // ═══════════════════════════════════════════════════════════════
eldercare: {
    sectionTitles: {
      careTypes: 'filters.eldercare.careTypes',
      availability: 'filters.eldercare.availability',
      specificConditions: 'filters.eldercare.specificConditions',
      certification: 'filters.eldercare.certification',
      languages: 'filters.eldercare.languages',
      administrativeHelp: 'filters.eldercare.administrativeHelp',
      medicalAccompaniment: 'filters.eldercare.medicalAccompaniment',
      vehicleForOutings: 'filters.eldercare.vehicleForOutings'
    },
    careTypes: [
      { value: 'companionship', key: 'filters.eldercare.companionship' },
      { value: 'houseCleaning', key: 'filters.eldercare.houseCleaning' },
      { value: 'cooking', key: 'filters.eldercare.cooking' },
      { value: 'errands', key: 'filters.eldercare.errands' },
      { value: 'medication', key: 'filters.eldercare.medication' },
      { value: 'doctorAccompaniment', key: 'filters.eldercare.doctorAccompaniment' }
    ],
    availability: [
      { value: 'morning', key: 'hours.morning' },
      { value: 'noon', key: 'hours.noon' },
      { value: 'afternoon', key: 'hours.afternoon' },
      { value: 'evening', key: 'hours.evening' },
      { value: 'night', key: 'hours.night' },
      { value: '24/7', key: 'hours.twentyFourSeven' }
    ],
    specificConditions: [
      { value: 'alzheimers', key: 'filters.eldercare.alzheimers' },
      { value: 'parkinsons', key: 'filters.eldercare.parkinsons' },
      { value: 'diabetes', key: 'filters.eldercare.diabetes' },
      { value: 'mobilityIssues', key: 'filters.eldercare.mobilityIssues' },
      { value: 'dementia', key: 'filters.eldercare.dementia' }
    ],
    languages: [
      { value: 'hebrew', key: 'languages.hebrew' },
      { value: 'russian', key: 'languages.russian' },
      { value: 'english', key: 'languages.english' },
      { value: 'spanish', key: 'languages.spanish' },
      { value: 'french', key: 'languages.french' }
    ],
    administrativeHelp: [
      { value: '', key: 'filters.noMatter' },
      { value: 'yes', key: 'common.yes' },
      { value: 'no', key: 'common.no' }
    ],
    medicalAccompaniment: [
      { value: '', key: 'filters.noMatter' },
      { value: 'yes', key: 'common.yes' },
      { value: 'no', key: 'common.no' }
    ],
    vehicleForOutings: [
      { value: '', key: 'filters.noMatter' },
      { value: 'yes', key: 'common.yes' },
      { value: 'no', key: 'common.no' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // DOULA
  // ═══════════════════════════════════════════════════════════════
  doula: {
    sectionTitles: {
      availability: 'serviceForm.common.availabilityHours',
      workTypes: 'serviceForm.common.workTypes'
    },
    availability: [
      { value: 'morning', key: 'hours.morning' },
      { value: 'afternoon', key: 'hours.afternoon' },
      { value: 'evening', key: 'hours.evening' },
      { value: 'night', key: 'hours.night' },
      { value: '24/7', key: 'hours.twentyFourSeven' }
    ],
    workTypes: [
      { value: 'הכנה ללידה', key: 'serviceForm.doula.workTypes.birthPreparation' },
      { value: 'ליווי בלידה', key: 'serviceForm.doula.workTypes.birthSupport' },
      { value: 'ליווי לאחר לידה', key: 'serviceForm.doula.workTypes.postpartumSupport' },
      { value: 'תמיכה בהנקה', key: 'serviceForm.doula.workTypes.breastfeedingSupport' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // TUTORING
  // ═══════════════════════════════════════════════════════════════
tutoring: {
    sectionTitles: {
      ageGroups: 'filters.sports_activities.ageGroups',
      levels: 'filters.tutoring.studyLevels',
      teachingMode: 'filters.tutoring.teachingMode',
      specializations: 'filters.tutoring.specializations',
      qualifications: 'filters.tutoring.qualifications'
    },
    ageGroups: [
      { value: 'ילדים', key: 'filters.sports_activities.children' },
      { value: 'נוער', key: 'filters.sports_activities.youth' },
      { value: 'adults', key: 'filters.sports_activities.adults' },
      { value: 'כל הגילאים', key: 'filters.sports_activities.allAges' }
    ],
    levels: [
      { value: 'elementary', key: 'filters.tutoring.elementary' },
      { value: 'middleSchool', key: 'filters.tutoring.middleSchool' },
      { value: 'highSchool', key: 'filters.tutoring.highSchool' },
      { value: 'matriculation', key: 'filters.tutoring.matriculation' },
      { value: 'preAcademic', key: 'filters.tutoring.preAcademic' },
      { value: 'academic', key: 'filters.tutoring.academic' },
      { value: 'adults', key: 'filters.tutoring.adults' }
    ],
    teachingModes: [
      { value: '', key: 'filters.tutoring.allOptions' },
      { value: 'inPersonOnly', key: 'filters.tutoring.inPersonOnly' },
      { value: 'onlineOnly', key: 'filters.tutoring.onlineOnly' },
      { value: 'both', key: 'filters.tutoring.both' }
    ],
    specializations: [
      { value: 'examPrep', key: 'filters.tutoring.examPrep' },
      { value: 'learningDisabilities', key: 'filters.tutoring.learningDisabilities' }
    ],
     qualifications: [
      { value: '', key: 'filters.common.noMatter' },
      { value: 'yes', key: 'filters.tutoring.hasQualifications' },
      { value: 'no', key: 'filters.tutoring.noQualifications' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // SPORTS & ACTIVITIES
  // ═══════════════════════════════════════════════════════════════
  sports_activities: {
    sectionTitles: {
      levels: 'filters.sports_activities.ageGroups',
      teachingMode: 'filters.sports_activities.activityMode',
    },
    levels: [
      { value: 'ילדים', key: 'filters.sports_activities.children' },
      { value: 'נוער', key: 'filters.sports_activities.youth' },
      { value: 'adults', key: 'filters.sports_activities.adults' },
      { value: 'כל הגילאים', key: 'filters.sports_activities.allAges' }
    ],
    teachingModes: [
      { value: '', key: 'filters.tutoring.allOptions' },
      { value: 'inPersonOnly', key: 'filters.tutoring.inPersonOnly' },
      { value: 'onlineOnly', key: 'filters.tutoring.onlineOnly' },
      { value: 'both', key: 'filters.tutoring.both' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // LAUNDRY
  // ═══════════════════════════════════════════════════════════════
laundry: {
    sectionTitles: {
      laundryTypes: 'filters.laundry.serviceTypes',
      availableDays: 'filters.laundry.availableDays',
      availableHours: 'filters.laundry.availableHours',
      pickupService: 'filters.laundry.pickupService'
    },
    types: [
      { value: 'pickupDelivery', key: 'filters.laundry.pickupDelivery' },
      { value: 'dryCleaning', key: 'filters.laundry.dryCleaning' },
      { value: 'linens', key: 'filters.laundry.linens' },  // ← corrigé (était beddingTowels)
      { value: 'industrial', key: 'filters.laundry.industrial' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // ELECTRICIAN
  // ═══════════════════════════════════════════════════════════════
  electrician: {
    sectionTitles: {
      workTypes: 'filters.electrician.workTypes',
      repairTypes: 'filters.electrician.repairTypes',
      installationTypes: 'filters.electrician.installationTypes',
      largeWorkTypes: 'filters.electrician.largeWorkTypes',
      availabilityDays: 'filters.common.availabilityDays',
      availabilityHours: 'filters.common.availabilityHours',
      age: 'filters.common.age'
    },
    workTypes: [
      { value: 'repairs', key: 'filters.electrician.repairs' },
      { value: 'installations', key: 'filters.electrician.installations' },
      { value: 'largeElectricalWork', key: 'filters.electrician.largeElectricalWork' }
    ],
  repairTypes: [
      { value: 'acRepair', key: 'filters.ac.acRepair' },
      { value: 'moldyAcRepair', key: 'filters.ac.moldyAcRepair' },
      { value: 'miniCentralRepair', key: 'filters.ac.miniCentralRepair' },
      { value: 'gasLeakRepair', key: 'filters.ac.gasLeakRepair' },
      { value: 'centralRepair', key: 'filters.ac.centralRepair' },
      { value: 'inverterRepair', key: 'filters.ac.inverterRepair' },
      { value: 'vrfRepair', key: 'filters.ac.vrfRepair' },
      { value: 'filterCleaning', key: 'filters.ac.filterCleaning' },
      { value: 'תיקון צ\'ילרים', key: 'filters.ac.chillerRepair' },
      { value: 'coldRoomTech', key: 'filters.ac.coldRoomTech' },
      { value: 'gasRefill', key: 'filters.ac.gasRefill' },
      { value: 'shortCircuitRepair', key: 'filters.electrician.shortCircuitRepair' },
      { value: 'timerRepair', key: 'filters.electrician.timerRepair' },
      { value: 'panelRepair', key: 'filters.electrician.panelRepair' },
      { value: 'outletReplacement', key: 'filters.electrician.outletReplacement' },
      { value: 'spotlightRepair', key: 'filters.electrician.spotlightRepair' },
      { value: 'otherRepairs', key: 'filters.electrician.otherRepairs' },
      { value: 'stairwaySwitch', key: 'filters.electrician.stairwaySwitch' }
    ],
    installationTypes: [
      { value: 'ceilingFan', key: 'filters.electrician.ceilingFan' },
      { value: 'outletInstall', key: 'filters.electrician.outletInstall' },
      { value: 'newOutlet', key: 'filters.electrician.newOutlet' },
      { value: 'waterHeater', key: 'filters.electrician.waterHeater' },
      { value: 'switchInstall', key: 'filters.electrician.switchInstall' },
      { value: 'evCharger', key: 'filters.electrician.evCharger' },
      { value: 'shabbatTimer', key: 'filters.electrician.shabbatTimer' },
      { value: 'otherInstall', key: 'filters.electrician.otherInstall' },
      { value: 'evMeter', key: 'filters.electrician.evMeter' },
      { value: 'inductionCooktop', key: 'filters.electrician.inductionCooktop' },
      { value: 'bathroomHeater', key: 'filters.electrician.bathroomHeater' },
      { value: 'generator', key: 'filters.electrician.generator' },
      { value: 'ventaInstall', key: 'filters.electrician.ventaInstall' },
      { value: 'evEdge', key: 'filters.electrician.evEdge' }
    ],
    largeWorkTypes: [
      { value: 'newInfrastructure', key: 'filters.electrician.newInfrastructure' },
      { value: 'replaceInfrastructure', key: 'filters.electrician.replaceInfrastructure' },
      { value: 'panelReplacement', key: 'filters.electrician.panelReplacement' },
      { value: 'grounding', key: 'filters.electrician.grounding' },
      { value: 'threePhase', key: 'filters.electrician.threePhase' },
      { value: 'inspection', key: 'filters.electrician.inspection' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // PLUMBING
  // ═══════════════════════════════════════════════════════════════
  plumbing: {
    sectionTitles: {
      workTypes: 'filters.plumbing.workTypes',
      blockageTypes: 'filters.plumbing.blockageTypes',
      pipeRepairTypes: 'filters.plumbing.pipeRepairTypes',
      largeWorkTypes: 'filters.plumbing.largeWorkTypes',
      fixtureTypes: 'filters.plumbing.fixtureTypes'
    },
    workTypes: [
      { value: 'blockages', key: 'filters.plumbing.blockages' },
      { value: 'pipeRepair', key: 'filters.plumbing.pipeRepair' },
      { value: 'largeWork', key: 'filters.plumbing.largeWork' },
      { value: 'fixtureRepair', key: 'filters.plumbing.fixtureRepair' }
    ],
    blockageTypes: [
      { value: 'homeBlockage', key: 'filters.plumbing.homeBlockage' },
      { value: 'submersiblePump', key: 'filters.plumbing.submersiblePump' },
      { value: 'buildingBlockage', key: 'filters.plumbing.buildingBlockage' }
    ],
    pipeRepairTypes: [
      { value: 'malePipeRepair', key: 'filters.plumbing.malePipeRepair' },
      { value: 'homePipeDamage', key: 'filters.plumbing.homePipeDamage' },
      { value: 'buildingPipeDamage', key: 'filters.plumbing.buildingPipeDamage' },
      { value: 'pressureBoost', key: 'filters.plumbing.pressureBoost' },
      { value: 'gardenPipes', key: 'filters.plumbing.gardenPipes' },
      { value: 'otherPipeRepairs', key: 'filters.plumbing.otherPipeRepairs' },
      { value: 'sewerNonDestructive', key: 'filters.plumbing.sewerNonDestructive' },
      { value: 'leakDetection', key: 'filters.plumbing.leakDetection' }
    ],
    largeWorkTypes: [
      { value: 'homePipeReplacement', key: 'filters.plumbing.homePipeReplacement' },
      { value: 'buildingPipeReplacement', key: 'filters.plumbing.buildingPipeReplacement' },
      { value: 'newWaterPoints', key: 'filters.plumbing.newWaterPoints' },
      { value: 'homeSewerReplacement', key: 'filters.plumbing.homeSewerReplacement' },
      { value: 'buildingSewerReplacement', key: 'filters.plumbing.buildingSewerReplacement' },
      { value: 'newSewerLine', key: 'filters.plumbing.newSewerLine' },
      { value: 'gardenPipeReplacement', key: 'filters.plumbing.gardenPipeReplacement' },
      { value: 'pierInstallation', key: 'filters.plumbing.pierInstallation' }
    ],
    fixtureTypes: [
      { value: 'waterBar', key: 'filters.plumbing.waterBar' },
      { value: 'concealedCistern', key: 'filters.plumbing.concealedCistern' },
      { value: 'faucets', key: 'filters.plumbing.faucets' },
      { value: 'toilets', key: 'filters.plumbing.toilets' },
      { value: 'waterFilters', key: 'filters.plumbing.waterFilters' },
      { value: 'garbageDisposal', key: 'filters.plumbing.garbageDisposal' },
      { value: 'disposalRepair', key: 'filters.plumbing.disposalRepair' },
      { value: 'sinks', key: 'filters.plumbing.sinks' },
      { value: 'dishwasherPrep', key: 'filters.plumbing.dishwasherPrep' },
      { value: 'showerBase', key: 'filters.plumbing.showerBase' },
      { value: 'otherFixtures', key: 'filters.plumbing.otherFixtures' },
      { value: 'toiletFlush', key: 'filters.plumbing.toiletFlush' },
      { value: 'bidet', key: 'filters.plumbing.bidet' },
      { value: 'wallMountedToilet', key: 'filters.plumbing.wallMountedToilet' },
      { value: 'checkValve', key: 'filters.plumbing.checkValve' },
      { value: 'underSinkSystems', key: 'filters.plumbing.underSinkSystems' },
      { value: 'solarHeaterInstall', key: 'filters.plumbing.solarHeaterInstall' },
      { value: 'solarHeaterRepair', key: 'filters.plumbing.solarHeaterRepair' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // AIR CONDITIONING
  // ═══════════════════════════════════════════════════════════════
  air_conditioning: {
    sectionTitles: {
      workTypes: 'filters.ac.workTypes',
      installationTypes: 'filters.ac.installationTypes',
      repairTypes: 'filters.ac.repairTypes',
      disassemblyTypes: 'filters.ac.disassemblyTypes'
    },
    workTypes: [
      { value: 'installation', key: 'filters.ac.installation' },
      { value: 'repair', key: 'filters.ac.repair' },
      { value: 'disassembly', key: 'filters.ac.disassembly' }
    ],
    installationTypes: [
      { value: 'acInstall', key: 'filters.ac.acInstall' },
      { value: 'miniCentralInstall', key: 'filters.ac.miniCentralInstall' },
      { value: 'centralInstall', key: 'filters.ac.centralInstall' },
      { value: 'inverterInstall', key: 'filters.ac.inverterInstall' },
      { value: 'multiInverterInstall', key: 'filters.ac.multiInverterInstall' },
      { value: 'vrfInstall', key: 'filters.ac.vrfInstall' }
    ],
    repairTypes: [
      { value: 'acRepair', key: 'filters.ac.acRepair' },
      { value: 'moldyAcRepair', key: 'filters.ac.moldyAcRepair' },
      { value: 'miniCentralRepair', key: 'filters.ac.miniCentralRepair' },
      { value: 'gasLeakRepair', key: 'filters.ac.gasLeakRepair' },
      { value: 'centralRepair', key: 'filters.ac.centralRepair' },
      { value: 'inverterRepair', key: 'filters.ac.inverterRepair' },
      { value: 'vrfRepair', key: 'filters.ac.vrfRepair' },
      { value: 'filterCleaning', key: 'filters.ac.filterCleaning' },
      { value: 'תיקון צ\'ילרים', key: 'filters.ac.chillerRepair' },
      { value: 'coldRoomTech', key: 'filters.ac.coldRoomTech' }
    ],
    disassemblyTypes: [
      { value: 'acDisassembly', key: 'filters.ac.acDisassembly' },
      { value: 'miniCentralDisassembly', key: 'filters.ac.miniCentralDisassembly' },
      { value: 'centralDisassembly', key: 'filters.ac.centralDisassembly' },
      { value: 'inverterDisassembly', key: 'filters.ac.inverterDisassembly' },
      { value: 'vrfDisassembly', key: 'filters.ac.vrfDisassembly' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // GAS TECHNICIAN
  // ═══════════════════════════════════════════════════════════════
  gas_technician: {
    sectionTitles: {
      workTypes: 'filters.gas.workTypes',
      installationTypes: 'filters.gas.installationTypes',
      repairTypes: 'filters.gas.repairTypes',
      licenseTypes: 'filters.gas.licenseTypes'
    },
    workTypes: [
      { value: 'pipeInstallation', key: 'filters.gas.pipeInstallation' },
      { value: 'repairs', key: 'filters.gas.repairs' }
    ],
    installationTypes: [
      { value: 'gasPointInstall', key: 'filters.gas.gasPointInstall' },
      { value: 'stovetopInstall', key: 'filters.gas.stovetopInstall' },
      { value: 'pipeInstall', key: 'filters.gas.pipeInstall' },
      { value: 'grillInstall', key: 'filters.gas.grillInstall' },
      { value: 'waterHeaterInstall', key: 'filters.gas.waterHeaterInstall' },
      { value: 'hagaz', key: 'filters.gas.hagaz' },
      { value: 'newBuildingInfra', key: 'filters.gas.newBuildingInfra' },
      { value: 'businessServices', key: 'filters.gas.businessServices' }
    ],
    repairTypes: [
      { value: 'stovetopRepair', key: 'filters.gas.stovetopRepair' },
      { value: 'pipeRepair', key: 'filters.gas.pipeRepair' }
    ],
    licenseTypes: [
      { value: 'licenseLevel1', key: 'filters.gas.licenseLevel1' },
      { value: 'licenseLevel2', key: 'filters.gas.licenseLevel2' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // DRYWALL (גבס)
  // ═══════════════════════════════════════════════════════════════
  drywall: {
    sectionTitles: {
      workTypes: 'filters.drywall.workTypes',
      designTypes: 'filters.drywall.designTypes',
      constructionTypes: 'filters.drywall.constructionTypes'
    },
    workTypes: [
      { value: 'design', key: 'filters.drywall.design' },
      { value: 'drywallWork', key: 'filters.drywall.construction' }
    ],
    designTypes: [
      { value: 'niches', key: 'filters.drywall.niches' },
      { value: 'tvUnit', key: 'filters.drywall.tvUnit' },
      { value: 'libraries', key: 'filters.drywall.libraries' },
      { value: 'shelves', key: 'filters.drywall.shelves' },
      { value: 'hiddenLighting', key: 'filters.drywall.hiddenLighting' },
      { value: 'roundedCornice', key: 'filters.drywall.roundedCornice' },
      { value: 'arches', key: 'filters.drywall.arches' },
      { value: 'floatingCeiling', key: 'filters.drywall.floatingCeiling' },
      { value: 'floatingWall', key: 'filters.drywall.floatingWall' }
    ],
    constructionTypes: [
      { value: 'walls', key: 'filters.drywall.walls' },
      { value: 'ceilings', key: 'filters.drywall.ceilings' },
      { value: 'shelfConstruction', key: 'filters.drywall.shelfConstruction' },
      { value: 'acDropCeiling', key: 'filters.drywall.acDropCeiling' },
      { value: 'pipeCovering', key: 'filters.drywall.pipeCovering' },
      { value: 'cornice', key: 'filters.drywall.cornice' },
      { value: 'acousticInsulation', key: 'filters.drywall.acousticInsulation' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // CARPENTRY
  // ═══════════════════════════════════════════════════════════════
 carpentry: {
    sectionTitles: {
      workTypes: 'filters.carpentry.workTypes',
      furnitureBuildingTypes: 'filters.carpentry.furnitureBuildingTypes',
      furnitureRepairTypes: 'filters.carpentry.furnitureRepairTypes',
      otherCarpentryTypes: 'filters.carpentry.otherCarpentryTypes',
      outdoorCarpentryTypes: 'filters.carpentry.outdoorCarpentryTypes',
      pergolaTypes: 'filters.carpentry.pergolaTypes',
      deckTypes: 'filters.carpentry.deckTypes',
      fenceTypes: 'filters.carpentry.fenceTypes'
    },
    workTypes: [
      { value: 'furnitureBuilding', key: 'filters.carpentry.furnitureBuilding' },
      { value: 'furnitureRepair', key: 'filters.carpentry.furnitureRepair' },
      { value: 'otherWork', key: 'filters.carpentry.otherWork' },
      { value: 'outdoorCarpentry', key: 'filters.carpentry.outdoorCarpentry' }
    ],
    furnitureBuildingTypes: [
      { value: 'wallClosets', key: 'filters.carpentry.wallClosets' },
      { value: 'slidingClosets', key: 'filters.carpentry.slidingClosets' },
      { value: 'bathroomCabinets', key: 'filters.carpentry.bathroomCabinets' },
      { value: 'bedroomFurniture', key: 'filters.carpentry.bedroomFurniture' },
      { value: 'tableBuilding', key: 'filters.carpentry.tableBuilding' },
      { value: 'chairBuilding', key: 'filters.carpentry.chairBuilding' },
      { value: 'tvUnitBuilding', key: 'filters.carpentry.tvUnitBuilding' },
      { value: 'libraryBuilding', key: 'filters.carpentry.libraryBuilding' },
      { value: 'customFurniture', key: 'filters.carpentry.customFurniture' },
      { value: 'shelfBuilding', key: 'filters.carpentry.shelfBuilding' },
      { value: 'walkInCloset', key: 'filters.carpentry.walkInCloset' },
      { value: 'woodenBed', key: 'filters.carpentry.woodenBed' },
      { value: 'kitchenFurniture', key: 'filters.carpentry.kitchenFurniture' }
    ],
    furnitureRepairTypes: [
      { value: 'repairWallClosets', key: 'filters.carpentry.repairWallClosets' },
      { value: 'repairTable', key: 'filters.carpentry.repairTable' },
      { value: 'repairChairs', key: 'filters.carpentry.repairChairs' },
      { value: 'repairSlidingClosets', key: 'filters.carpentry.repairSlidingClosets' },
      { value: 'repairBathroomCabinets', key: 'filters.carpentry.repairBathroomCabinets' },
      { value: 'repairBedroomFurniture', key: 'filters.carpentry.repairBedroomFurniture' },
      { value: 'repairTvUnit', key: 'filters.carpentry.repairTvUnit' },
      { value: 'repairLibrary', key: 'filters.carpentry.repairLibrary' },
      { value: 'repairOther', key: 'filters.carpentry.repairOther' }
    ],
    otherCarpentryTypes: [
      { value: 'wallCladding', key: 'filters.carpentry.wallCladding' },
      { value: 'disassembly', key: 'filters.carpentry.disassembly' },
      { value: 'doorFabrication', key: 'filters.carpentry.doorFabrication' },
      { value: 'doorRepair', key: 'filters.carpentry.doorRepair' },
      { value: 'doorRenovation', key: 'filters.carpentry.doorRenovation' },
      { value: 'loft', key: 'filters.carpentry.loft' },
      { value: 'stairs', key: 'filters.carpentry.stairs' },
      { value: 'lattice', key: 'filters.carpentry.lattice' },
      { value: 'בוצ\'ר עץ', key: 'filters.carpentry.butcher' }
    ],
    outdoorCarpentryTypes: [
      { value: 'pergolas', key: 'filters.carpentry.pergolas' },
      { value: 'decks', key: 'filters.carpentry.decks' },
      { value: 'fences', key: 'filters.carpentry.fences' }
    ],
    pergolaTypes: [
      { value: 'woodPergolas', key: 'filters.carpentry.woodPergolas' },
      { value: 'shadePergolas', key: 'filters.carpentry.shadePergolas' },
      { value: 'balconyEnclosure', key: 'filters.carpentry.balconyEnclosure' }
    ],
    deckTypes: [
      { value: 'naturalWoodDecks', key: 'filters.carpentry.naturalWoodDecks' },
      { value: 'compositeDecks', key: 'filters.carpentry.compositeDecks' },
      { value: 'deckRenovation', key: 'filters.carpentry.deckRenovation' }
    ],
    fenceTypes: [
      { value: 'woodFences', key: 'filters.carpentry.woodFences' },
      { value: 'gardenPartitions', key: 'filters.carpentry.gardenPartitions' },
      { value: 'woodGates', key: 'filters.carpentry.woodGates' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // PROPERTY MANAGEMENT
  // ═══════════════════════════════════════════════════════════════
  property_management: {
    sectionTitles: {
      fullYearRental: 'filters.property.fullYearRental',
      shortTermRental: 'filters.property.shortTermRental'
    },
    fullYearRental: [
      { value: 'tenantSearch', key: 'filters.property.tenantSearch' },
      { value: 'contractManagement', key: 'filters.property.contractManagement' },
      { value: 'rentCollection', key: 'filters.property.rentCollection' },
      { value: 'propertyInspection', key: 'filters.property.propertyInspection' },
      { value: 'utilityTransfer', key: 'filters.property.utilityTransfer' }
    ],
    shortTermRental: [
      { value: 'listingManagement', key: 'filters.property.listingManagement' },
      { value: 'guestCommunication', key: 'filters.property.guestCommunication' },
      { value: 'guestCheckin', key: 'filters.property.guestCheckin' },
      { value: 'turnaroundCleaning', key: 'filters.property.turnaroundCleaning' },
      { value: 'periodicInspection', key: 'filters.property.periodicInspection' },
      { value: 'generalRepairs', key: 'filters.property.generalRepairs' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // HOME ORGANIZATION
  // ═══════════════════════════════════════════════════════════════
  home_organization: {
    sectionTitles: {
      workTypes: 'filters.organization.workTypes',
      generalOrganizationTypes: 'filters.organization.generalTypes',
      sortingTypes: 'filters.organization.sortingTypes',
      professionalOrganizationTypes: 'filters.organization.professionalTypes'
    },
    workTypes: [
      { value: 'general', key: 'filters.organization.general' },
      { value: 'sorting', key: 'filters.organization.sorting' },
      { value: 'professional', key: 'filters.organization.professional' }
    ],
    generalOrganizationTypes: [
      { value: 'fullHouse', key: 'filters.organization.fullHouse' },
      { value: 'rooms', key: 'filters.organization.rooms' },
      { value: 'kitchen', key: 'filters.organization.kitchen' },
      { value: 'kidsRoom', key: 'filters.organization.kidsRoom' },
      { value: 'closets', key: 'filters.organization.closets' },
      { value: 'bathroom', key: 'filters.organization.bathroom' }
    ],
    sortingTypes: [
      { value: 'itemSorting', key: 'filters.organization.itemSorting' },
      { value: 'clothesSorting', key: 'filters.organization.clothesSorting' },
      { value: 'toySorting', key: 'filters.organization.toySorting' },
      { value: 'donation', key: 'filters.organization.donation' }
    ],
    professionalOrganizationTypes: [
      { value: 'storageSolutions', key: 'filters.organization.storageSolutions' },
      { value: 'smallSpaces', key: 'filters.organization.smallSpaces' },
      { value: 'shelfDesign', key: 'filters.organization.shelfDesign' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // PAINTING
  // ═══════════════════════════════════════════════════════════════
  painting: {
    sectionTitles: {
      workTypes: 'filters.painting.workTypes'
    },
    workTypes: [
      { value: 'generalPainting', key: 'filters.painting.generalPainting' },
      { value: 'wallRepairs', key: 'filters.painting.wallRepairs' },
      { value: 'wallSmoothing', key: 'filters.painting.wallSmoothing' },
     { value: 'moistureMold', key: 'filters.painting.moistureMold' },  // ← était moistureRepair
      { value: 'paintStripping', key: 'filters.painting.paintStripping' },
      { value: 'effectPainting', key: 'filters.painting.effectPainting' },
      { value: 'accentWall', key: 'filters.painting.accentWall' },
      { value: 'specialTextures', key: 'filters.painting.specialTextures' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // PRIVATE CHEF
  // ═══════════════════════════════════════════════════════════════
  private_chef: {
    sectionTitles: {
      eventType: 'filters.chef.eventType',
      workTypes: 'filters.chef.workTypes',
      cuisineTypes: 'filters.chef.cuisineType',
      kosherTypes: 'filters.chef.kosherTypes'
    },
    eventTypes: [
      { value: 'wedding', key: 'filters.chef.wedding' },
      { value: 'barMitsva', key: 'filters.chef.barMitsva' },
      { value: 'batMitsva', key: 'filters.chef.batMitsva' },
      { value: 'britMila', key: 'filters.chef.britMila' },
      { value: 'pidyonHaben', key: 'filters.chef.pidyonHaben' },
      { value: 'shevaBrahot', key: 'filters.chef.shevaBrahot' },
      { value: 'anniversary', key: 'filters.chef.anniversary' },
      { value: 'kiddouch', key: 'filters.chef.kiddouch' },
      { value: 'shabbatHatan', key: 'filters.chef.shabbatHatan' },
      { value: 'corporateEvent', key: 'filters.chef.corporateEvent' },
      { value: 'privateParty', key: 'filters.chef.privateParty' },
      { value: 'familyParty', key: 'filters.chef.familyParty' },
      { value: 'engagement', key: 'filters.chef.engagement' },
      { value: 'shabbatMeals', key: 'filters.chef.shabbatMeals' }
    ],
    workTypes: [
      { value: 'eventTypes', key: 'filters.chef.eventType' },
      { value: 'סוג המטבח', key: 'filters.chef.cuisineType' },
      { value: 'כשרות', key: 'filters.chef.kashrut' }
    ],
    cuisineTypes: [
      { value: 'pizza', key: 'filters.chef.pizza' },
      { value: 'sushi', key: 'filters.chef.sushi' },
      { value: 'salads', key: 'filters.chef.salads' },
      { value: 'asian', key: 'filters.chef.asian' },
      { value: 'pasta', key: 'filters.chef.pasta' },
      { value: 'meat', key: 'filters.chef.meat' },
      { value: 'vegan', key: 'filters.chef.vegan' },
      { value: 'glutenFree', key: 'filters.chef.glutenFree' },
      { value: 'desserts', key: 'filters.chef.desserts' },
      { value: 'shabbatSalads', key: 'filters.chef.shabbatSalads' },
      { value: 'halavi', key: 'filters.chef.halavi' },
      { value: 'shabbatChallah', key: 'filters.chef.shabbatChallah' },
      { value: 'smokedFish', key: 'filters.chef.smokedFish' },
      { value: 'herring', key: 'filters.chef.herring' }
    ],
    kosherTypes: [
    { value: 'badatzEdaChareidis', key: 'filters.chef.badatzEdaChareidis' },  // ← était badatzEdaCharedit
      { value: 'badatzBeitYosef', key: 'filters.chef.badatzBeitYosef' },
      { value: 'badatzYoreDea', key: 'filters.chef.badatzYoreDea' },
      { value: 'badatzBelz', key: 'filters.chef.badatzBelz' },
      { value: 'badatzSheerit', key: 'filters.chef.badatzSheerit' },
      { value: 'badatzNetivot', key: 'filters.chef.badatzNetivot' },
      { value: 'badatzChatamBB', key: 'filters.chef.badatzChatamBB' },
      { value: 'badatzChatamPT', key: 'filters.chef.badatzChatamPT' },
      { value: 'badatzMikveh', key: 'filters.chef.badatzMikveh' },
      { value: 'badatzTzfat', key: 'filters.chef.badatzTzfat' },
      { value: 'rabbiLanda', key: 'filters.chef.rabbiLanda' },
      { value: 'rabbiRubin', key: 'filters.chef.rabbiRubin' },
      { value: 'rabbinateMethadrin', key: 'filters.chef.rabbinateMethadrin' },
      { value: 'rabbinate', key: 'filters.chef.rabbinate' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // CATERING
  // ═══════════════════════════════════════════════════════════════
  catering: {
    sectionTitles: {
      eventType: 'filters.chef.eventType',
      workTypes: 'filters.chef.workTypes',
      cuisineTypes: 'filters.chef.cuisineType',
      kosherTypes: 'filters.chef.kosherTypes'
    },
    eventTypes: [
      { value: 'wedding', key: 'filters.chef.wedding' },
      { value: 'barMitsva', key: 'filters.chef.barMitsva' },
      { value: 'batMitsva', key: 'filters.chef.batMitsva' },
      { value: 'britMila', key: 'filters.chef.britMila' },
      { value: 'pidyonHaben', key: 'filters.chef.pidyonHaben' },
      { value: 'shevaBrahot', key: 'filters.chef.shevaBrahot' },
      { value: 'anniversary', key: 'filters.chef.anniversary' },
      { value: 'kiddouch', key: 'filters.chef.kiddouch' },
      { value: 'shabbatHatan', key: 'filters.chef.shabbatHatan' },
      { value: 'corporateEvent', key: 'filters.chef.corporateEvent' },
      { value: 'privateParty', key: 'filters.chef.privateParty' },
      { value: 'familyParty', key: 'filters.chef.familyParty' },
      { value: 'engagement', key: 'filters.chef.engagement' },
      { value: 'shabbatMeals', key: 'filters.chef.shabbatMeals' }
    ],
    workTypes: [
      { value: 'eventTypes', key: 'filters.chef.eventType' },
      { value: 'סוג המטבח', key: 'filters.chef.cuisineType' },
      { value: 'כשרות', key: 'filters.chef.kashrut' }
    ],
    cuisineTypes: [
      { value: 'pizza', key: 'filters.chef.pizza' },
      { value: 'sushi', key: 'filters.chef.sushi' },
      { value: 'salads', key: 'filters.chef.salads' },
      { value: 'asian', key: 'filters.chef.asian' },
      { value: 'pasta', key: 'filters.chef.pasta' },
      { value: 'meat', key: 'filters.chef.meat' },
      { value: 'vegan', key: 'filters.chef.vegan' },
      { value: 'glutenFree', key: 'filters.chef.glutenFree' },
      { value: 'shabbatSalads', key: 'filters.chef.shabbatSalads' },
      { value: 'halavi', key: 'filters.chef.halavi' },
      { value: 'shabbatChallah', key: 'filters.chef.shabbatChallah' },
      { value: 'smokedFish', key: 'filters.chef.smokedFish' },
      { value: 'herring', key: 'filters.chef.herring' }
    ],
    kosherTypes: [
      { value: 'badatzEdaChareidis', key: 'filters.chef.badatzEdaChareidis' },
      { value: 'badatzBeitYosef', key: 'filters.chef.badatzBeitYosef' },
      { value: 'badatzYoreDea', key: 'filters.chef.badatzYoreDea' },
      { value: 'badatzBelz', key: 'filters.chef.badatzBelz' },
      { value: 'badatzSheerit', key: 'filters.chef.badatzSheerit' },
      { value: 'badatzNetivot', key: 'filters.chef.badatzNetivot' },
      { value: 'badatzChatamBB', key: 'filters.chef.badatzChatamBB' },
      { value: 'badatzChatamPT', key: 'filters.chef.badatzChatamPT' },
      { value: 'badatzMikveh', key: 'filters.chef.badatzMikveh' },
      { value: 'badatzTzfat', key: 'filters.chef.badatzTzfat' },
      { value: 'rabbiLanda', key: 'filters.chef.rabbiLanda' },
      { value: 'rabbiRubin', key: 'filters.chef.rabbiRubin' },
      { value: 'rabbinateMethadrin', key: 'filters.chef.rabbinateMethadrin' },
      { value: 'rabbinate', key: 'filters.chef.rabbinate' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // PASTRY (GÂTEAUX & PÂTISSERIE)
  // ═══════════════════════════════════════════════════════════════
  pastry: {
    sectionTitles: {
      eventType: 'filters.chef.eventType',
      productTypes: 'serviceForm.pastry.productTypes',
      kosherTypes: 'filters.chef.kosherTypes'
    },
    eventTypes: [
      { value: 'wedding', key: 'filters.chef.wedding' },
      { value: 'barMitsva', key: 'filters.chef.barMitsva' },
      { value: 'batMitsva', key: 'filters.chef.batMitsva' },
      { value: 'britMila', key: 'filters.chef.britMila' },
      { value: 'pidyonHaben', key: 'filters.chef.pidyonHaben' },
      { value: 'shevaBrahot', key: 'filters.chef.shevaBrahot' },
      { value: 'anniversary', key: 'filters.chef.anniversary' },
      { value: 'kiddouch', key: 'filters.chef.kiddouch' },
      { value: 'shabbatHatan', key: 'filters.chef.shabbatHatan' },
      { value: 'corporateEvent', key: 'filters.chef.corporateEvent' },
      { value: 'privateParty', key: 'filters.chef.privateParty' },
      { value: 'familyParty', key: 'filters.chef.familyParty' },
      { value: 'engagement', key: 'filters.chef.engagement' },
      { value: 'shabbatMeals', key: 'filters.chef.shabbatMeals' }
    ],
    productTypes: [
      { value: 'cakes', key: 'filters.pastry.cakes' },
      { value: 'patisserie', key: 'filters.pastry.patisserie' },
      { value: 'chocolates', key: 'filters.pastry.chocolates' },
      { value: 'macarons', key: 'filters.pastry.macarons' },
      { value: 'cakeBox', key: 'filters.pastry.cakeBox' },
      { value: 'fruitArrangements', key: 'filters.pastry.fruitArrangements' },
      { value: 'fruitPlatters', key: 'filters.pastry.fruitPlatters' },
      { value: 'desserts', key: 'filters.pastry.desserts' }
    ],
    kosherTypes: [
      { value: 'badatzEdaChareidis', key: 'filters.chef.badatzEdaChareidis' },
      { value: 'badatzBeitYosef', key: 'filters.chef.badatzBeitYosef' },
      { value: 'badatzYoreDea', key: 'filters.chef.badatzYoreDea' },
      { value: 'badatzBelz', key: 'filters.chef.badatzBelz' },
      { value: 'badatzSheerit', key: 'filters.chef.badatzSheerit' },
      { value: 'badatzNetivot', key: 'filters.chef.badatzNetivot' },
      { value: 'badatzChatamBB', key: 'filters.chef.badatzChatamBB' },
      { value: 'badatzChatamPT', key: 'filters.chef.badatzChatamPT' },
      { value: 'badatzMikveh', key: 'filters.chef.badatzMikveh' },
      { value: 'badatzTzfat', key: 'filters.chef.badatzTzfat' },
      { value: 'rabbiLanda', key: 'filters.chef.rabbiLanda' },
      { value: 'rabbiRubin', key: 'filters.chef.rabbiRubin' },
      { value: 'rabbinateMethadrin', key: 'filters.chef.rabbinateMethadrin' },
      { value: 'rabbinate', key: 'filters.chef.rabbinate' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // EVENT ENTERTAINMENT (Animations & spectacles)
  // ═══════════════════════════════════════════════════════════════
  event_entertainment: {
    sectionTitles: {
      entertainmentTypes: 'filters.events.entertainmentTypes',
      otherTypes: 'filters.events.otherTypes'
    },
    entertainmentTypes: [
      { value: 'magician', key: 'filters.events.magician' },
      { value: 'magicianGeneral', key: 'filters.events.magicianGeneral' },
      { value: 'clown', key: 'filters.events.clown' },
      { value: 'balloonArt', key: 'filters.events.balloonArt' },
      { value: 'balloonInflation', key: 'filters.events.balloonInflation' },
      { value: 'costumes', key: 'filters.events.costumes' },
      { value: 'groupGames', key: 'filters.events.groupGames' },
      { value: 'bubbleShow', key: 'filters.events.bubbleShow' },
      { value: 'musicDancing', key: 'filters.events.musicDancing' }
    ],
    otherTypes: [
      { value: 'facePainting', key: 'filters.events.facePainting' },
      { value: 'photoMagnets', key: 'filters.events.photoMagnets' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // EVENT EQUIPMENT RENTAL (Location de matériel événementiel)
  // ═══════════════════════════════════════════════════════════════
  event_equipment_rental: {
    sectionTitles: {
      equipmentRentalTypes: 'filters.events.equipmentRentalTypes'
    },
    equipmentRentalCategories: [
      { value: 'foodMachines', key: 'filters.events.foodMachines' },
      { value: 'inflatables', key: 'filters.events.inflatables' },
      { value: 'effectMachines', key: 'filters.events.effectMachines' }
    ],
    foodMachineTypes: [
      { value: 'popcorn', key: 'filters.events.popcorn' },
      { value: 'cottonCandy', key: 'filters.events.cottonCandy' },
      { value: 'slushie', key: 'filters.events.slushie' },
      { value: 'waffle', key: 'filters.events.waffle' },
      { value: 'granita', key: 'filters.events.granita' },
      { value: 'softServe', key: 'filters.events.softServe' },
      { value: 'milkshake', key: 'filters.events.milkshake' },
      { value: 'juicer', key: 'filters.events.juicer' },
      { value: 'hotdog', key: 'filters.events.hotdog' },
      { value: 'crepe', key: 'filters.events.crepe' },
      { value: 'chocolateFountain', key: 'filters.events.chocolateFountain' }
    ],
    inflatableGameTypes: [
      { value: 'bouncyHouses', key: 'filters.events.bouncyHouses' },
      { value: 'ג\'ימבורי', key: 'filters.events.gymboree' },
      { value: 'gameStations', key: 'filters.events.gameStations' }
    ],
    effectMachineTypes: [
      { value: 'smokeMachine', key: 'filters.events.smokeMachine' },
      { value: 'snowMachine', key: 'filters.events.snowMachine' },
      { value: 'bubbleMachine', key: 'filters.events.bubbleMachine' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // EVENT FOOD STANDS (Stands de nourriture pour événements)
  // ═══════════════════════════════════════════════════════════════
  event_food_stands: {
    sectionTitles: {
      foodStandTypes: 'filters.events.foodStandTypes'
    },
    foodStandTypes: [
      { value: 'popcorn', key: 'filters.events.stand.popcorn' },
      { value: 'cottonCandy', key: 'filters.events.stand.cottonCandy' },
      { value: 'hotdog', key: 'filters.events.stand.hotdog' },
      { value: 'granita', key: 'filters.events.stand.granita' },
      { value: 'crepe', key: 'filters.events.stand.crepe' },
      { value: 'waffle', key: 'filters.events.stand.waffle' },
      { value: 'icecream', key: 'filters.events.stand.icecream' },
      { value: 'coffee', key: 'filters.events.stand.coffee' },
      { value: 'candy', key: 'filters.events.stand.candy' },
      { value: 'chocolate', key: 'filters.events.stand.chocolate' },
      { value: 'נאצ\'וס', key: 'filters.events.stand.nachos' },
      { value: 'burger', key: 'filters.events.stand.burger' },
      { value: 'pizza', key: 'filters.events.stand.pizza' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // WATERPROOFING
  // ═══════════════════════════════════════════════════════════════
  waterproofing: {
    sectionTitles: {
      workTypes: 'filters.waterproofing.workTypes',
      roofWaterproofingTypes: 'filters.waterproofing.roofTypes',
      wallWaterproofingTypes: 'filters.waterproofing.wallTypes',
      balconyWaterproofingTypes: 'filters.waterproofing.balconyTypes',
      wetRoomWaterproofingTypes: 'filters.waterproofing.wetRoomTypes',
      undergroundWaterproofingTypes: 'filters.waterproofing.undergroundTypes',
      inspectionEquipmentTypes: 'filters.waterproofing.inspectionTypes'
    },
    workTypes: [
      { value: 'roofWaterproofing', key: 'filters.waterproofing.roofs' },
      { value: 'wallWaterproofing', key: 'filters.waterproofing.externalWalls' },
      { value: 'balconyWaterproofing', key: 'filters.waterproofing.balconies' },
      { value: 'wetRoomWaterproofing', key: 'filters.waterproofing.wetRooms' },
      { value: 'undergroundWaterproofing', key: 'filters.waterproofing.underground' },
      { value: 'inspectionEquipment', key: 'filters.waterproofing.inspection' }
    ],
    roofWaterproofingTypes: [
      { value: 'bituminousSheets', key: 'filters.waterproofing.bituminousSheets' },
      { value: 'hotAsphalt', key: 'filters.waterproofing.hotAsphalt' },
      { value: 'polyurethane', key: 'filters.waterproofing.polyurethane' },
      { value: 'tileRoof', key: 'filters.waterproofing.tileRoof' },
      { value: 'maintenance', key: 'filters.waterproofing.maintenance' }
    ],
    wallWaterproofingTypes: [
      { value: 'waterPenetration', key: 'filters.waterproofing.waterPenetration' },
      { value: 'exteriorRestoration', key: 'filters.waterproofing.exteriorRestoration' },
      { value: 'crackSealing', key: 'filters.waterproofing.crackSealing' },
      { value: 'dampnessTreatment', key: 'filters.waterproofing.dampnessTreatment' }
    ],
    balconyWaterproofingTypes: [
      { value: 'beforeTiling', key: 'filters.waterproofing.beforeTiling' },
      { value: 'leakRepair', key: 'filters.waterproofing.leakRepair' },
      { value: 'tilingAndSealing', key: 'filters.waterproofing.tilingAndSealing' }
    ],
    wetRoomWaterproofingTypes: [
      { value: 'bathroom', key: 'filters.waterproofing.bathroom' },
      { value: 'shower', key: 'filters.waterproofing.shower' },
      { value: 'toilet', key: 'filters.waterproofing.toilet' },
      { value: 'beforeRenovation', key: 'filters.waterproofing.beforeRenovation' }
    ],
    undergroundWaterproofingTypes: [
      { value: 'basements', key: 'filters.waterproofing.basements' },
      { value: 'foundations', key: 'filters.waterproofing.foundations' },
      { value: 'undergroundWalls', key: 'filters.waterproofing.undergroundWalls' }
    ],
    inspectionEquipmentTypes: [
      { value: 'leakDetection', key: 'filters.waterproofing.leakDetection' },
      { value: 'moistureTests', key: 'filters.waterproofing.moistureTests' },
      { value: 'thermalImaging', key: 'filters.waterproofing.thermalImaging' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // CONTRACTOR
  // ═══════════════════════════════════════════════════════════════
contractor: {
    sectionTitles: {
      workTypes: 'filters.contractor.workTypes',
      structureWorkTypes: 'filters.contractor.structureWorkTypes',
      generalRenovationTypes: 'filters.contractor.generalRenovationTypes',
      electricPlumbingTypes: 'filters.contractor.electricPlumbingTypes',
      exteriorWorkTypes: 'filters.contractor.exteriorWorkTypes',
      facadeRepairTypes: 'filters.contractor.facadeRepairTypes'
    },
    workTypes: [
      { value: 'structureWork', key: 'filters.contractor.structureWork' },
      { value: 'generalRenovation', key: 'filters.contractor.generalRenovation' },
      { value: 'electricPlumbing', key: 'filters.contractor.electricPlumbing' },
      { value: 'exteriorWork', key: 'filters.contractor.exteriorWork' },
      { value: 'facadeRepair', key: 'filters.contractor.facadeRepair' }
    ],
    structureWorkTypes: [
      { value: 'buildingFrame', key: 'filters.contractor.buildingFrame' },
      { value: 'concretePours', key: 'filters.contractor.concretePours' },
      { value: 'formwork', key: 'filters.contractor.formwork' },
      { value: 'structuralReinforcement', key: 'filters.contractor.structuralReinforcement' },
      { value: 'blockWalls', key: 'filters.contractor.blockWalls' },
      { value: 'demolitionRebuild', key: 'filters.contractor.demolitionRebuild' }
    ],
    generalRenovationTypes: [
      { value: 'fullApartmentReno', key: 'filters.contractor.fullApartmentReno' },
      { value: 'roomRenovation', key: 'filters.contractor.roomRenovation' },
      { value: 'bathroomReno', key: 'filters.contractor.bathroomReno' },
      { value: 'kitchenReno', key: 'filters.contractor.kitchenReno' },
      { value: 'flooringReplacement', key: 'filters.contractor.flooringReplacement' },
      { value: 'drywallWork', key: 'filters.contractor.drywallWork' },
      { value: 'plasterWork', key: 'filters.contractor.plasterWork' },
      { value: 'balconyEnclosure', key: 'filters.contractor.balconyEnclosure' },
      { value: 'professionalPainting', key: 'filters.contractor.professionalPainting' },
      { value: 'doorFrameReplacement', key: 'filters.contractor.doorFrameReplacement' }
    ],
    electricPlumbingTypes: [
      { value: 'electricalWork', key: 'filters.contractor.electricalWork' },
      { value: 'panelReplacement', key: 'filters.contractor.panelReplacement' },
      { value: 'generalPlumbing', key: 'filters.contractor.generalPlumbing' },
      { value: 'pipeReplacement', key: 'filters.contractor.pipeReplacement' },
      { value: 'leakDetection', key: 'filters.contractor.leakDetection' }
    ],
    exteriorWorkTypes: [
      { value: 'exteriorFlooring', key: 'filters.contractor.exteriorFlooring' },
      { value: 'pergolaConstruction', key: 'filters.contractor.pergolaConstruction' },
      { value: 'stoneCladding', key: 'filters.contractor.stoneCladding' },
      { value: 'fencing', key: 'filters.contractor.fencing' },
      { value: 'gardenPathways', key: 'filters.contractor.gardenPathways' }
    ],
    facadeRepairTypes: [
      { value: 'exteriorPlasterRepair', key: 'filters.contractor.exteriorPlasterRepair' },
      { value: 'exteriorWallRestoration', key: 'filters.contractor.exteriorWallRestoration' },
      { value: 'wallCrackSealing', key: 'filters.contractor.wallCrackSealing' },
      { value: 'fallingPlasterTreatment', key: 'filters.contractor.fallingPlasterTreatment' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // ALUMINUM
  // ═══════════════════════════════════════════════════════════════
aluminum: {
    sectionTitles: {
      workTypes: 'filters.aluminum.workTypes',
      windowsDoorsTypes: 'filters.aluminum.windowsDoorsTypes',
      pergolasOutdoorTypes: 'filters.aluminum.pergolasOutdoorTypes',
      repairsServiceTypes: 'filters.aluminum.repairsServiceTypes',
      claddingTypes: 'filters.aluminum.claddingTypes'
    },
    workTypes: [
      { value: 'windowsDoors', key: 'filters.aluminum.windowsDoors' },
      { value: 'pergolas', key: 'filters.aluminum.pergolas' },
      { value: 'repairs', key: 'filters.aluminum.repairs' },
      { value: 'cladding', key: 'filters.aluminum.cladding' }
    ],
    windowsDoorsTypes: [
      { value: 'installWindows', key: 'filters.aluminum.installWindows' },
      { value: 'aluminumDoors', key: 'filters.aluminum.aluminumDoors' },
      { value: 'slidingDoors', key: 'filters.aluminum.slidingDoors' },
      { value: 'entryDoors', key: 'filters.aluminum.entryDoors' },
      { value: 'mosquitoNets', key: 'filters.aluminum.mosquitoNets' },
      { value: 'manualShutters', key: 'filters.aluminum.manualShutters' },
      { value: 'electricShutters', key: 'filters.aluminum.electricShutters' }
    ],
    pergolasOutdoorTypes: [
      { value: 'aluminumPergolas', key: 'filters.aluminum.aluminumPergolas' },
      { value: 'balconyEnclosure', key: 'filters.aluminum.balconyEnclosure' },
      { value: 'exteriorCladding', key: 'filters.aluminum.exteriorCladding' },
      { value: 'railings', key: 'filters.aluminum.railings' }
    ],
    repairsServiceTypes: [
      { value: 'repairShutterMotor', key: 'filters.aluminum.repairShutterMotor' },
      { value: 'repairTracks', key: 'filters.aluminum.repairTracks' },
      { value: 'repairWheels', key: 'filters.aluminum.repairWheels' },
      { value: 'replaceHandles', key: 'filters.aluminum.replaceHandles' },
      { value: 'sealingRenewal', key: 'filters.aluminum.sealingRenewal' },
      { value: 'repairManualShutters', key: 'filters.aluminum.repairManualShutters' }
    ],
    claddingTypes: [
      { value: 'pipeCovering', key: 'filters.aluminum.pipeCovering' },
      { value: 'meterCovering', key: 'filters.aluminum.meterCovering' },
      { value: 'decorativeBoxes', key: 'filters.aluminum.decorativeBoxes' },
      { value: 'acLineCovering', key: 'filters.aluminum.acLineCovering' },
      { value: 'acMotorProtection', key: 'filters.aluminum.acMotorProtection' },
      { value: 'wallCladding', key: 'filters.aluminum.wallCladding' },
      { value: 'decorativeCladding', key: 'filters.aluminum.decorativeCladding' },
      { value: 'shutterBoxCladding', key: 'filters.aluminum.shutterBoxCladding' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // GLASS WORKS
  // ═══════════════════════════════════════════════════════════════
glass_works: {
    sectionTitles: {
      workTypes: 'filters.glass.workTypes',
      showerGlassTypes: 'filters.glass.showerGlassTypes',
      windowsDoorGlassTypes: 'filters.glass.windowsDoorGlassTypes',
      kitchenHomeGlassTypes: 'filters.glass.kitchenHomeGlassTypes',
      specialSafetyGlassTypes: 'filters.glass.specialSafetyGlassTypes',
      repairCustomTypes: 'filters.glass.repairCustomTypes'
    },
    workTypes: [
      { value: 'showers', key: 'filters.glass.showers' },
      { value: 'homeGlass', key: 'filters.glass.homeGlass' },
      { value: 'furniture', key: 'filters.glass.furniture' },
      { value: 'partitions', key: 'filters.glass.partitions' },
      { value: 'repairs', key: 'filters.glass.repairs' }
    ],
    showerGlassTypes: [
      { value: 'showerInstall', key: 'filters.glass.showerInstall' },
      { value: 'showerRepair', key: 'filters.glass.showerRepair' },
      { value: 'showerGlassReplacement', key: 'filters.glass.showerGlassReplacement' },
      { value: 'showerDoors', key: 'filters.glass.showerDoors' }
    ],
    windowsDoorGlassTypes: [
      { value: 'windowReplacement', key: 'filters.glass.windowReplacement' },
      { value: 'doubleGlazing', key: 'filters.glass.doubleGlazing' },
      { value: 'reglazing', key: 'filters.glass.reglazing' },
      { value: 'interiorGlassDoors', key: 'filters.glass.interiorGlassDoors' },
      { value: 'glassPartitions', key: 'filters.glass.glassPartitions' }
    ],
    kitchenHomeGlassTypes: [
      { value: 'kitchenBacksplash', key: 'filters.glass.kitchenBacksplash' },
      { value: 'glassShelves', key: 'filters.glass.glassShelves' },
      { value: 'glassTables', key: 'filters.glass.glassTables' },
      { value: 'bathroomMirrors', key: 'filters.glass.bathroomMirrors' },
      { value: 'decorativeMirrors', key: 'filters.glass.decorativeMirrors' }
    ],
    specialSafetyGlassTypes: [
      { value: 'temperedGlass', key: 'filters.glass.temperedGlass' },
      { value: 'smartGlass', key: 'filters.glass.smartGlass' },
      { value: 'securityGlass', key: 'filters.glass.securityGlass' },
      { value: 'acousticGlass', key: 'filters.glass.acousticGlass' },
      { value: 'decorativeGlass', key: 'filters.glass.decorativeGlass' }
    ],
    repairCustomTypes: [
      { value: 'scratchRepair', key: 'filters.glass.scratchRepair' },
      { value: 'glassPolishing', key: 'filters.glass.glassPolishing' },
      { value: 'customCutting', key: 'filters.glass.customCutting' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // LOCKSMITH
  // ═══════════════════════════════════════════════════════════════
locksmith: {
    sectionTitles: {
      workTypes: 'filters.locksmith.workTypes',
      lockReplacementTypes: 'filters.locksmith.lockReplacementTypes',
      doorOpeningTypes: 'filters.locksmith.doorOpeningTypes',
      lockSystemInstallationTypes: 'filters.locksmith.lockSystemInstallationTypes',
      lockDoorRepairTypes: 'filters.locksmith.lockDoorRepairTypes',
      securityServicesTypes: 'filters.locksmith.securityServicesTypes'
    },
    workTypes: [
      { value: 'lockReplacement', key: 'filters.locksmith.lockReplacement' },
      { value: 'emergencyOpening', key: 'filters.locksmith.emergencyOpening' },
      { value: 'advancedSystems', key: 'filters.locksmith.advancedSystems' },
      { value: 'doorRepair', key: 'filters.locksmith.doorRepair' },
      { value: 'securityServices', key: 'serviceForm.locksmith.securityServices' }
    ],
    lockReplacementTypes: [
      { value: 'cylinderLock', key: 'filters.locksmith.cylinderLock' },
      { value: 'securityLock', key: 'filters.locksmith.securityLock' },
      { value: 'entranceLock', key: 'filters.locksmith.entranceLock' },
      { value: 'officeLock', key: 'filters.locksmith.officeLock' }
    ],
    doorOpeningTypes: [
      { value: 'noDamageOpening', key: 'filters.locksmith.noDamageOpening' },
      { value: 'emergency247', key: 'filters.locksmith.emergency247' },
      { value: 'safeOpening', key: 'filters.locksmith.safeOpening' },
      { value: 'keyDuplication', key: 'filters.locksmith.keyDuplication' }
    ],
    lockSystemInstallationTypes: [
      { value: 'smartLocks', key: 'filters.locksmith.smartLocks' },
      { value: 'intercom', key: 'filters.locksmith.intercom' },
      { value: 'accessCode', key: 'filters.locksmith.accessCode' },
      { value: 'electronicLock', key: 'filters.locksmith.electronicLock' }
    ],
    lockDoorRepairTypes: [
      { value: 'stuckLockRepair', key: 'filters.locksmith.stuckLockRepair' },
      { value: 'hingeRepair', key: 'filters.locksmith.hingeRepair' },
      { value: 'doorSanding', key: 'filters.locksmith.doorSanding' },
      { value: 'handleReplacement', key: 'filters.locksmith.handleReplacement' }
    ],
    securityServicesTypes: [
      { value: 'securityUpgrade', key: 'filters.locksmith.securityUpgrade' },
      { value: 'securityDoorInstall', key: 'filters.locksmith.securityDoorInstall' },
      { value: 'vulnerabilityCheck', key: 'filters.locksmith.vulnerabilityCheck' },
      { value: 'commercialLocksmith', key: 'filters.locksmith.commercialLocksmith' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MOVING
  // ═══════════════════════════════════════════════════════════════
  moving: {
    sectionTitles: {
      avodaIvrit: 'filters.moving.avodaIvrit',
      storage: 'filters.moving.storage'
    },
    avodaIvrit: [
      { value: 'עבודה עברית', key: 'filters.moving.avodaIvritLabel' }
    ],
    storage: [
      { value: 'כן', key: 'filters.moving.storageLabel' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // PHOTOGRAPHER
  // ═══════════════════════════════════════════════════════════════
  photographer: {
    sectionTitles: {
      workTypes: 'filters.photographer.workTypes',
      eventTypes: 'filters.photographer.eventTypesSection',
      languages: 'filters.photographer.languagesSection'
    },
    workTypes: [
      { value: 'eventTypes', key: 'filters.photographer.eventTypes' },
      { value: 'photoAlbum', key: 'filters.photographer.photoAlbum' },
      { value: 'magnet', key: 'filters.photographer.magnet' },
      { value: 'cameraman', key: 'filters.photographer.cameraman' }
    ],
    eventTypes: [
      { value: 'barMitsva', key: 'filters.photographer.barMitsva' },
      { value: 'batMitsva', key: 'filters.photographer.batMitsva' },
      { value: 'wedding', key: 'filters.photographer.wedding' },
      { value: 'engagement', key: 'filters.photographer.engagement' },
      { value: 'haircut', key: 'filters.photographer.haircut' },
      { value: 'photoShoot', key: 'filters.photographer.photoShoot' },
      { value: 'privateEvents', key: 'filters.photographer.privateEvents' },
      { value: 'britMila', key: 'filters.photographer.britMila' }
    ],
    languages: [
      { value: 'french', key: 'filters.photographer.languageFrench' },
      { value: 'russian', key: 'filters.photographer.languageRussian' },
      { value: 'spanish', key: 'filters.photographer.languageSpanish' },
      { value: 'hebrew', key: 'filters.photographer.languageHebrew' },
      { value: 'english', key: 'filters.photographer.languageEnglish' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // EVENT DECORATION
  // ═══════════════════════════════════════════════════════════════
  event_decoration: {
    sectionTitles: {
      decorationTypes: 'filters.event_decoration.decorationTypes',
      availabilityDays: 'filters.common.availabilityDays',
      availabilityHours: 'filters.common.availabilityHours',
      age: 'filters.common.age'
    },
    decorationTypes: [
      { value: 'archBalloon', key: 'filters.event_decoration.archBalloon' },
      { value: 'tableDeco', key: 'filters.event_decoration.tableDeco' },
      { value: 'hallDeco', key: 'filters.event_decoration.hallDeco' },
      { value: 'photoWall', key: 'filters.event_decoration.photoWall' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // HANDYMAN
  // ═══════════════════════════════════════════════════════════════
  handyman: {
    sectionTitles: {
      workTypes: 'filters.handyman.workTypes',
      generalRepairsTypes: 'filters.handyman.generalRepairs',
      installationsTypes: 'filters.handyman.installations',
      doorsFurnitureTypes: 'filters.handyman.doorsAndFurniture',
      lightWorkTypes: 'filters.handyman.lightWork',
      hangingTypes: 'filters.handyman.hangingAndOrganizing'
    },
    workTypes: [
      { value: 'תיקונים כלליים', key: 'serviceForm.handyman.generalRepairs' },
      { value: 'התקנות והרכבות', key: 'serviceForm.handyman.installations' },
      { value: 'דלתות ורהיטים', key: 'serviceForm.handyman.doorsAndFurniture' },
      { value: 'עבודות קלות בבית', key: 'serviceForm.handyman.lightWork' },
      { value: 'תליות וסידור', key: 'serviceForm.handyman.hangingAndOrganizing' }
    ],
    generalRepairsTypes: [
      { value: 'תיקונים קטנים בבית', key: 'serviceForm.handyman.smallRepairs' },
      { value: 'תחזוקה שוטפת', key: 'serviceForm.handyman.regularMaintenance' }
    ],
    installationsTypes: [
      { value: 'התקנת טלוויזיה', key: 'serviceForm.handyman.tvInstall' },
      { value: 'התקנת מדפים', key: 'serviceForm.handyman.shelvesInstall' },
      { value: 'התקנת וילונות', key: 'serviceForm.handyman.curtainsInstall' },
      { value: 'הרכבת רהיטים', key: 'serviceForm.handyman.furnitureAssembly' }
    ],
    doorsFurnitureTypes: [
      { value: 'doorRepair', key: 'serviceForm.handyman.doorRepair' },
      { value: 'furnitureRepair', key: 'serviceForm.handyman.furnitureRepair' }
    ],
    lightWorkTypes: [
      { value: 'החלפת מנורות', key: 'serviceForm.handyman.lampReplacement' },
      { value: 'תיקונים קלים', key: 'serviceForm.handyman.lightRepairs' }
    ],
    hangingTypes: [
      { value: 'תליית תמונות', key: 'serviceForm.handyman.pictureHanging' },
      { value: 'תליית אביזרים', key: 'serviceForm.handyman.accessoryHanging' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // PEST CONTROL
  // ═══════════════════════════════════════════════════════════════
  pest_control: {
    sectionTitles: {
      pestTypes: 'serviceForm.pest_control.pestTypes',
      insects: 'serviceForm.pest_control.insects',
      rodents: 'serviceForm.pest_control.rodents',
      birdsAnimals: 'serviceForm.pest_control.birdsAnimals',
      certification: 'serviceForm.pest_control.certification',
      certified: 'serviceForm.pest_control.certified',
      workAtHeight: 'serviceForm.pest_control.workAtHeight'
    },
    insects: [
      { value: 'cockroaches', key: 'filters.pest_control.cockroaches' },
      { value: 'ants', key: 'filters.pest_control.ants' },
      { value: 'bedbugs', key: 'filters.pest_control.bedbugs' },
      { value: 'fleas', key: 'filters.pest_control.fleas' },
      { value: 'mosquitoes', key: 'filters.pest_control.mosquitoes' }
    ],
    rodents: [
      { value: 'rats', key: 'filters.pest_control.rats' },
      { value: 'mice', key: 'filters.pest_control.mice' }
    ],
    birdsAnimals: [
      { value: 'pigeons', key: 'filters.pest_control.pigeons' },
      { value: 'pigeonNets', key: 'filters.pest_control.pigeonNets' },
      { value: 'bats', key: 'filters.pest_control.bats' },
      { value: 'snakes', key: 'filters.pest_control.snakes' }
    ],
    certifiedOptions: [
      { value: '', key: 'filters.noMatter' },
      { value: 'yes', key: 'common.yes' },
      { value: 'no', key: 'common.no' }
    ],
    workAtHeightOptions: [
      { value: '', key: 'filters.noMatter' },
      { value: 'yes', key: 'common.yes' },
      { value: 'no', key: 'common.no' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MECHANIC
  // ═══════════════════════════════════════════════════════════════
  mechanic: {
    sectionTitles: {
      workTypes: 'filters.mechanic.workTypes'
    },
    workTypes: [
      { value: 'carMechanics',   key: 'serviceForm.mechanic.carMechanics' },
      { value: 'testPrep',     key: 'serviceForm.mechanic.testPrep' },
      { value: 'routineMaintenance', key: 'serviceForm.mechanic.routineMaintenance' },
      { value: 'computerDiagnostics',   key: 'serviceForm.mechanic.computerDiagnostics' },
      { value: 'batteries',         key: 'serviceForm.mechanic.batteries' },
      { value: 'airConditioning',   key: 'serviceForm.mechanic.airConditioning' },
      { value: 'alternator',       key: 'serviceForm.mechanic.alternator' },
      { value: 'engineRepairs',   key: 'serviceForm.mechanic.engineRepairs' },
      { value: 'radiatorCooling', key: 'serviceForm.mechanic.radiatorCooling' },
      { value: 'vehicleInspection', key: 'serviceForm.mechanic.vehicleInspection' }
    ]
  },

  metalwork: {
    sectionTitles: {
      workTypes: 'filters.metalwork.workTypes'
    },
    workTypes: [
      { value: 'bars',        key: 'serviceForm.metalwork.bars' },
      { value: 'railings',         key: 'serviceForm.metalwork.railings' },
      { value: 'fences',         key: 'serviceForm.metalwork.fences' },
      { value: 'galleries',        key: 'serviceForm.metalwork.galleries' },
      { value: 'hangingBalconies', key: 'serviceForm.metalwork.hangingBalconies' },
      { value: 'stairs',        key: 'serviceForm.metalwork.stairs' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // DRIVER
  // ═══════════════════════════════════════════════════════════════
  driver: {
    sectionTitles: {
      serviceType: 'filters.driver.serviceType',
      transportationType: 'filters.driver.transportationType',
      vehicleType: 'filters.driver.vehicleType',
      availabilityHours: 'filters.driver.availabilityHours'
    },
    serviceType: [
      { value: 'privateDriver', key: 'serviceForm.driver.privateDriver' },
      { value: 'taxi',  key: 'serviceForm.driver.taxi' }
    ],
    transportationType: [
      { value: 'הסעות לאירועים', key: 'serviceForm.driver.eventTransport' },
      { value: 'הסעות תלמידים',  key: 'serviceForm.driver.studentTransport' },
      { value: 'הסעות טיולים',   key: 'serviceForm.driver.tripTransport' },
      { value: 'הסעות לנתב"ג',  key: 'serviceForm.driver.airportTransport' }
    ],
    vehicleType: [
      { value: '5 מקומות',           key: 'serviceForm.driver.seats5' },
      { value: '7 מקומות',           key: 'serviceForm.driver.seats7' },
      { value: '9 מקומות',           key: 'serviceForm.driver.seats9' },
      { value: 'מיניבוס (14-23 מושבים)', key: 'serviceForm.driver.minibus' },
      { value: 'אוטובוס (50-60 מושבים)', key: 'serviceForm.driver.bus' }
    ],
    availabilityHours: [
      { value: 'morning',        key: 'hours.morning' },
      { value: 'afternoon', key: 'hours.afternoon' },
      { value: 'evening',         key: 'hours.evening' },
      { value: 'night',        key: 'hours.night' },
      { value: '24/6',        key: 'hours.twentyFourSix' }
    ]
  }
};

// Fonction helper pour récupérer les traductions
export const getFilterOptions = (serviceType, filterKey, t) => {
  const config = FILTER_CONFIG[serviceType]?.[filterKey] || [];
  return config.map(item => ({
    value: item.value,
    label: t(item.key)
  }));
};

// Fonction pour récupérer le titre d'une section
export const getSectionTitle = (serviceType, sectionKey, t) => {
  const titleKey = FILTER_CONFIG[serviceType]?.sectionTitles?.[sectionKey];
  return titleKey ? t(titleKey) : sectionKey;
};

// Fonction pour récupérer les jours communs traduits
export const getCommonDays = (t, includeSaturday = false) => {
  const days = FILTER_CONFIG.common.days;
  if (!includeSaturday) {
    return days.filter(d => d.value !== 'saturday').map(d => ({
      value: d.value,
      label: t(d.key)
    }));
  }
  return days.map(d => ({
    value: d.value,
    label: t(d.key)
  }));
};

// Fonction pour récupérer les heures communes traduites
export const getCommonHours = (t) => {
  return FILTER_CONFIG.common.hours.map(h => ({
    value: h.value,
    label: t(h.key)
  }));
};