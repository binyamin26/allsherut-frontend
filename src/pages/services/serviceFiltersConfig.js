// services/serviceFiltersConfig.js
// ✅ MISE À JOUR COMPLÈTE - Configuration synchronisée avec l'inscription
// Configuration des filtres par service - SYNCHRONISÉE avec la BDD service_providers

export const serviceFiltersConfig = {
  babysitting: {
  required: {
    ageGroups: {
      label: 'קבוצות גיל מתאימות',
      type: 'checkbox',
      options: ['age0to1', 'age1to3', 'age3to6', 'age6plus'],
      dbField: 'service_details->>"$.ageGroups"'
    },
    availability_days: {
      label: 'ימי זמינות',
      type: 'checkbox',
      options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'allWeek'],
      dbField: 'availability_days'
    },
    availability_hours: {
      label: 'שעות זמינות',
      type: 'checkbox',
      options: ['morning', 'afternoon', 'evening', 'all'],
      dbField: 'availability_hours'
    },
    babysitting_types: {
      label: 'סוגי שמרטפות',
      type: 'checkbox',
      options: [
        'occasional',
        'regular',
        'pickup',
        'nightCare',
        'holidayCare',
        'homework',
        'fullTime',
        'summerCamp',
        'winterCamp'
      ],
      dbField: 'babysitting_types'
    },
    experience_level: {
      label: 'רמת ניסיון',
      type: 'select',
      options: [
        { value: '', label: 'all' },
        { value: 'מתחיל', label: 'מתחיל' },
        { value: 'מנוסה', label: 'מנוסה' }
      ],
      dbField: 'experience_level'
    }
  },
  optional: {
    can_travel_alone: {
      label: 'יכול להגיע ולחזור לבד',
      type: 'select',
      options: [
        { value: '', label: 'לא משנה' },
        { value: 'yes', label: 'כן' },
        { value: 'no', label: 'לא' }
      ],
      dbField: 'can_travel_alone'
    },
    languages: {
      label: 'שפות',
      type: 'checkbox',
      options: ['hebrew', 'russian', 'english', 'spanish', 'french'],
      dbField: 'languages'
    },
    religiousLevel: {
      label: 'רמה דתית',
      type: 'select',
      options: [
        { value: 'secular', label: 'secular' },
        { value: 'traditional', label: 'traditional' },
        { value: 'religious', label: 'religious' },
        { value: 'orthodox', label: 'orthodox' }
      ],
      dbField: 'service_details->>"$.religiosity"'
    }
  }
},
  cleaning: {
    required: {
      legalStatus: {
        label: 'סטטוס משפטי',
        type: 'select',
        options: [
          { value: '', label: 'all' },
          { value: 'company', label: 'company' },
          { value: 'independent', label: 'independent' }
        ],
        dbField: 'availability->>"$.legalStatus"'
      },
      // ✅ NOUVEAU - Système de catégories avec sous-catégories
      cleaningTypes: {
        label: 'סוגי ניקיון',
        type: 'checkbox-categorized', // ✅ Nouveau type pour gérer les catégories
        categories: {
          'ניקיון ביתי': [
            'regularCleaning',
            'passoverCleaning',
            'postRenovation',
            'airbnb'
          ],
          'ניקיון משרדים ומבנים': [
            'offices',
            'stores',
            'buildings',
            'educationalInstitutions',
            'factories'
          ],
          'ניקיון מיוחד': [
            'highWindows',
            'carpets',
            'sofas',
            'curtains',
            'pressureWashing',
            'acCleaning',
            'roofCleaning',
            'damageCleanup'
          ],
          'שירותים נוספים': [
            'carCleaning',
            'solarPanels',
            'ironingAtHome',
            'laundryFolding'
          ]
        },
        dbField: 'availability->>"$.cleaningTypes"'
      },
      materialsProvided: {
        label: 'אספקת ציוד',
        type: 'select',
        options: [
          { value: '', label: 'לא משנה' },
          { value: 'yes', label: 'מספק ציוד' },
          { value: 'no', label: 'לא מספק ציוד' },
          { value: 'partial', label: 'ציוד חלקי' }
        ],
        dbField: 'availability->>"$.materialsProvided"'
      },
      // ✅ NOUVEAU - Disponibilité (jours)
      availableDays: {
        label: 'ימים זמינים',
        type: 'checkbox',
        options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'allWeek'],
        dbField: 'availability->>"$.availableDays"'
      },
      // ✅ NOUVEAU - Disponibilité (heures)
      availableHours: {
        label: 'שעות זמינות',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all'],
        dbField: 'availability->>"$.availableHours"'
      }
    },
    optional: {
      experienceYears: {
        label: 'שנות נסיון',
        type: 'range',
        min: 0,
        max: 20,
        unit: 'שנים',
        dbField: 'experience_years'
      },
      // ✅ NOUVEAU - Niveau d'expérience
      experienceLevel: {
        label: 'רמת ניסיון',
        type: 'select',
        options: [
          { value: '', label: 'לא משנה' },
          { value: 'מתחיל', label: 'מתחיל' },
          { value: 'מנוסה', label: 'מנוסה' }
        ],
        dbField: 'availability->>"$.experienceLevel"'
      },
      additionalServices: {
        label: 'שירותים נוספים',
        type: 'checkbox',
        options: ['חלונות', 'תנור', 'מקרר', 'בלקונים'],
        dbField: 'availability->>"$.additionalServices"'
      }
    }
  },

  gardening: {
    required: {
      // ✅ CORRIGÉ - Options complètes de l'inscription
      services: {
        label: 'סוגי שירותים',
        type: 'checkbox',
        options: [
          'pruning',
          'design',
          'planting',
          'irrigation',
          'fertilizing',
          'weeding',
          'generalMaintenance'
        ],
        dbField: 'availability->>"$.services"'
      },
      seasons: {
        label: 'עונות זמינות',
        type: 'checkbox',
        options: [
          'allYear',    // ✅ En premier
          'spring',       // Printemps
          'summer',        // Été  
          'autumn',       // Automne
          'winter'       // Hiver
        ],
        dbField: 'availability->>"$.seasons"'
      },
      // ✅ CORRIGÉ - Equipment de l'inscription
      equipment: {
        label: 'ציוד בבעלותי',
        type: 'checkbox',
        options: [
          'lawnMower',
          'pruningShears',
          'waterPump',
          'handTools',
          'fertilizerSpreader',
          'irrigationSystem'
        ],
        dbField: 'availability->>"$.equipment"'
      }
    },
    optional: {
      specializations: {
        label: 'התמחויות',
        type: 'checkbox',
       options: ['gardenerTypeA', 'gardenerTypeB', 'agronomist', 'expertPruner'],
        dbField: 'availability->>"$.specializations"'
      },
      additionalServices: {
        label: 'שירותים נוספים',
        type: 'checkbox',
        options: ['wasteRemoval', 'landscapeConsulting'],
        dbField: 'availability->>"$.additionalServices"'
      }
    }
  },

  petcare: {
    required: {
      // ✅ CORRIGÉ - "smallRodents" au lieu de "מכרסמים"
      animalTypes: {
        label: 'סוגי חיות מתאימות',
        type: 'checkbox',
        options: ['dogs', 'cats', 'birds', 'smallRodents', 'fish', 'reptiles'],
        dbField: 'availability->>"$.animalTypes"'
      },
      dogSizes: {
        label: 'גודל כלבים מתאים',
        type: 'checkbox',
        options: ['smallDog', 'mediumDog', 'largeDog', 'giantDog'],
        dbField: 'availability->>"$.dogSizes"'
      },
      experienceLevel: {
        label: 'רמת ניסיון',
        type: 'select',
        options: [
          { value: '', label: 'all' },
          { value: 'מתחיל', label: 'מתחיל' },
          { value: 'מנוסה', label: 'מנוסה' }
        ],
        dbField: 'availability->>"$.experienceLevel"'
      },
      location: {
        label: 'מקום השמירה',
        type: 'select',
        options: [
          { value: '', label: 'all' },
       { value: 'clientHome', label: 'clientHome' },
{ value: 'בבית המטפל', label: 'בבית המטפל' },
{ value: 'פנסיון לבעלי חיים', label: 'פנסיון לבעלי חיים' }
        ],
        dbField: 'availability->>"$.careLocation"'
      }
    },
    optional: {
      vetServices: {
        label: 'שירותים וטרינריים בסיסיים',
        type: 'select',
        options: [
          { value: '', label: 'לא משנה' },
          { value: 'yes', label: 'כן' },
          { value: 'no', label: 'לא' }
        ],
        dbField: 'availability->>"$.vetServices"'
      },
      walkExercise: {
        label: 'טיולים/פעילות גופנית',
        type: 'select',
        options: [
          { value: '', label: 'לא משנה' },
          { value: 'yes', label: 'כן' },
          { value: 'no', label: 'לא' }
        ],
        dbField: 'availability->>"$.walkExercise"'
      },
      medicationAdmin: {
        label: 'medication',
        type: 'select',
        options: [
          { value: '', label: 'לא משנה' },
          { value: 'yes', label: 'כן' },
          { value: 'no', label: 'לא' }
        ],
        dbField: 'availability->>"$.medicationAdmin"'
      },
      maxAnimals: {
        label: 'מספר מקסימלי של חיות',
        type: 'range',
        min: 1,
        max: 10,
        unit: 'חיות',
        dbField: 'availability->>"$.maxAnimals"'
      },
      outdoorSpace: {
        label: 'גינה/שטח חיצוני זמין',
        type: 'select',
        options: [
          { value: '', label: 'לא משנה' },
          { value: 'yes', label: 'כן' },
          { value: 'no', label: 'לא' }
        ],
        dbField: 'availability->>"$.outdoorSpace"'
      },
      // ✅ NOUVEAU - Services additionnels
      additionalServices: {
        label: 'שירותים נוספים',
        type: 'checkbox',
       options: ['dogWalking', 'bathingGrooming', 'basicTraining', 'medication', 'feeding', 'cleaning', 'photoUpdates', 'שהייה לילה / יום בלבד'],
        dbField: 'availability->>"$.additionalServices"'
      },
      // ✅ NOUVEAU - Installations à la maison
      facilities: {
        label: 'מתקנים בבית',
        type: 'checkbox',
       options: ['fencedGarden', 'largeYard', 'airConditioning'],
        dbField: 'availability->>"$.facilities"'
      },
        // ✅ NOUVEAU - Services vétérinaires
      veterinaryServices: {
        label: 'שירותים וטרינריים',
        type: 'checkbox',
        options: ['vetVisit', 'medication', 'basicCare'],
        dbField: 'availability->>"$.veterinaryServices"'
      }
    }
  },

  tutoring: {
    required: {
      // ✅ NOTE : Les 69 sous-catégories sont chargées dynamiquement depuis l'API
      // dans le composant TutoringServicePanel (voir FilterBar.jsx lignes 689-901)
      // Ce champ sert de placeholder pour la configuration
      subjects: {
        label: 'מקצועות הוראה',
        type: 'checkbox-dynamic', // ✅ Type spécial pour chargement API
        apiEndpoint: '/services/5/subcategories', // ✅ Endpoint pour charger les 69 sous-catégories
        groupBy: 'display_order', // ✅ Groupement par thèmes
        dbField: 'availability->>"$.subjects"'
      },
      // ✅ CORRIGÉ - 7 niveaux comme dans l'inscription
      levels: {
        label: 'רמות לימוד',
        type: 'checkbox',
        options: ['elementary', 'middleSchool', 'highSchool', 'matriculation', 'preAcademic', 'academic', 'adults'],
        dbField: 'availability->>"$.levels"'
      },
      // ✅ CORRIGÉ - Options alignées avec l'inscription
      teachingMode: {
        label: 'אופן הוראה',
        type: 'select',
        options: [
          { value: '', label: 'all' },
          { value: 'inPersonOnly', label: 'inPersonOnly' },
          { value: 'onlineOnly', label: 'onlineOnly' },
          { value: 'both', label: 'both' }
        ],
        dbField: 'availability->>"$.teachingMode"'
      }
    },
    optional: {
      specializations: {
        label: 'התמחויות',
        type: 'checkbox',
        options: ['examPrep', 'learningDisabilities'],
        dbField: 'availability->>"$.specializations"'
      },
      teachingLanguages: {
        label: 'שפות הוראה',
        type: 'text',
        placeholder: 'עברית, אנגלית, רוסית וכו\'',
        dbField: 'languages'
      }
    }
  },

  eldercare: {
    required: {
      // ✅ CORRIGÉ - 6 options complètes de l'inscription
      careTypes: {
        label: 'סוגי טיפול מוצעים',
        type: 'checkbox',
        options: [
          'companionship',
          'houseCleaning',
          'cooking',
          'errands',
          'medication',
          'doctorAccompaniment'
        ],
        dbField: 'availability->>"$.careTypes"'
      },
      // ✅ CORRIGÉ - 6 options horaires détaillées
      availability: {
        label: 'זמינות',
        type: 'checkbox',
        options: ['morning', 'noon', 'afternoon', 'evening', 'night', '24/7'],
        dbField: 'availability->>"$.timeSlots"'
      }
    },
    optional: {
      // ✅ CORRIGÉ - 5 conditions avec noms corrects
      specificConditions: {
        label: 'נסיון עם מחלות ספציפיות',
        type: 'checkbox',
        options: ['alzheimers', 'parkinsons', 'diabetes', 'mobilityIssues', 'dementia'],
        dbField: 'availability->>"$.specificConditions"'
      },
      administrativeHelp: {
        label: 'עזרה אדמיניסטרטיבית',
        type: 'select',
        options: [
          { value: '', label: 'לא משנה' },
          { value: 'yes', label: 'כן' },
          { value: 'no', label: 'לא' }
        ],
        dbField: 'availability->>"$.administrativeHelp"'
      },
      medicalAccompaniment: {
        label: 'ליווי רפואי',
        type: 'select',
        options: [
          { value: '', label: 'לא משנה' },
          { value: 'yes', label: 'כן' },
          { value: 'no', label: 'לא' }
        ],
        dbField: 'availability->>"$.medicalAccompaniment"'
      },
      vehicleForOutings: {
        label: 'רכב לטיולים',
        type: 'select',
        options: [
          { value: '', label: 'לא משנה' },
          { value: 'yes', label: 'כן' },
          { value: 'no', label: 'לא' }
        ],
        dbField: 'availability->>"$.vehicleForOutings"'
      },
      languages: {
        label: 'שפות מדוברות',
        type: 'text',
        placeholder: 'עברית, אנגלית, רוסית וכו\'',
        dbField: 'languages'
      }
    }
  },

  laundry: {
  required: {
    laundryTypes: {
      label: 'סוגי שירותים',
      type: 'checkbox',
      options: [
        'pickupDelivery',
        'dryCleaning',
        'linens',
        'industrial'
      ],
      dbField: 'availability->>"$.laundryTypes"'
    },
    rate: {
      label: 'תעריף (₪)',
      type: 'range',
      min: 30,
      max: 100,
      unit: '₪',
      dbField: 'hourly_rate'
    }
  },
  optional: {
    // 🆕 NOUVEAU - Niveau d'expérience
    experienceLevel: {
      label: 'רמת ניסיון',
      type: 'select',
      options: [
        { value: '', label: 'כל האפשרויות' },
        { value: 'מתחיל', label: 'מתחיל' },
        { value: 'מנוסה', label: 'מנוסה' }
      ],
      dbField: 'availability->>"$.experienceLevel"'
    },
    // 🆕 NOUVEAU - Jours disponibles
    availableDays: {
      label: 'זמינות - ימים',
      type: 'checkbox',
      options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'allWeek'],
      dbField: 'availability->>"$.availableDays"'
    },
    // 🆕 NOUVEAU - Heures disponibles
    availableHours: {
      label: 'זמינות - שעות',
      type: 'checkbox',
      options: ['morning', 'afternoon', 'evening', 'all'],
      dbField: 'availability->>"$.availableHours"'
    },
    pickupService: {
      label: 'שירות איסוף והחזרה',
      type: 'select',
      options: [
        { value: '', label: 'לא משנה' },
        { value: 'yes', label: 'כן' },
        { value: 'no', label: 'לא' }
      ],
      dbField: 'availability->>"$.pickupService"'
    },
    experienceYears: {
      label: 'שנות ניסיון',
      type: 'range',
      min: 0,
      max: 15,
      unit: 'שנים',
      dbField: 'experience_years'
    }
  }
},
// 🏢 GESTION D'APPARTEMENT
  property_management: {
    required: {
      management_type: {
        type: 'checkbox-categorized',
        label: 'סוג הניהול',
        categories: {
          '🏠 ניהול השכרה לשנה מלאה': [
            'tenantSearch',
            'contractManagement',
            'rentCollection',
            'propertyInspection',
            'utilityTransfer'
          ],
          '🏖️ השכרה לטווח קצר (Airbnb / Booking)': [
            'listingManagement',
            'guestCommunication',
            'guestCheckin',
            'turnaroundCleaning',
            'periodicInspection',
            'generalRepairs'
          ]
        }
      }
    },
optional: {
  experienceYears: {
    label: 'שנות ניסיון',
    type: 'range',
    min: 0,
    max: 20,
    unit: 'שנים',
    dbField: 'experience_years'
  }
}
  },

  dj: {
    required: {
      availability_days: {
        label: 'ימי זמינות',
        type: 'checkbox',
        options: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'allWeek'],
        dbField: 'availability_days'
      },
      availability_hours: {
        label: 'שעות זמינות',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all'],
        dbField: 'availability_hours'
      },
      dj_event_types: {
        label: 'סוגי אירועים',
        type: 'checkbox',
        options: [
          'wedding',
          'barMitsva',
          'batMitsva',
          'britMila',
          'shevaBrahot',
          'anniversary',
          'corporateEvent',
          'privateParty',
          'familyParty',
          'engagement'
        ],
        dbField: 'service_details->>"$.dj_event_types"'
      }
    },
    optional: {
      languages: {
        label: 'שפות מדוברות',
        type: 'checkbox',
        options: ['hebrew', 'russian', 'english', 'french'],
        dbField: 'languages'
      },
      experienceYears: {
        label: 'שנות ניסיון',
        type: 'range',
        min: 0,
        max: 30,
        unit: 'שנים',
        dbField: 'experience_years'
      }
    }
  },

  pest_control: {
    required: {
      pestTypes: {
        label: 'סוגי מזיקים',
        type: 'checkbox-categorized',
        categories: {
          'חרקים': [
            'cockroaches',
            'ants',
            'bedbugs',
            'fleas',
            'mosquitoes'
          ],
          '🐭 מכרסמים': [
            'rats',
            'mice'
          ],
          '🐦 יונים ובעלי חיים': [
            'pigeons',
            'bats',
            'snakes'
          ]
        },
        dbField: 'availability->>"$.pestTypes"'
      },
      certified: {
        label: 'הסמכה - מדביר מוסמך',
        type: 'select',
        options: [
          { value: '', label: 'לא משנה' },
          { value: 'yes', label: '✔️ מוסמך' },
          { value: 'no', label: '❌ לא מוסמך' }
        ],
        dbField: 'availability->>"$.certified"'
      },
      worksAtHeight: {
        label: 'עבודה בגובה',
        type: 'select',
        options: [
          { value: '', label: 'לא משנה' },
          { value: 'yes', label: 'כן' },
          { value: 'no', label: 'לא' }
        ],
        dbField: 'availability->>"$.worksAtHeight"'
      }
    },
    optional: {
      experienceYears: {
        label: 'שנות ניסיון',
        type: 'range',
        min: 0,
        max: 30,
        unit: 'שנים',
        dbField: 'experience_years'
      }
    }
  },

  metalwork: {
    required: {
      work_types: {
        label: 'סוג עבודה',
        type: 'checkbox',
        options: ['bars', 'railings', 'fences'],
        dbField: 'service_details->>"$.work_types"'
      },
      availability_hours: {
        label: 'שעות זמינות',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'all'],
        dbField: 'availability_hours'
      }
    },
    optional: {
      languages: {
        label: 'שפות מדוברות',
        type: 'checkbox',
        options: ['hebrew', 'russian', 'english', 'french'],
        dbField: 'languages'
      },
      experienceYears: {
        label: 'שנות ניסיון',
        type: 'range',
        min: 0,
        max: 40,
        unit: 'שנים',
        dbField: 'experience_years'
      }
    }
  },

  driver: {
    required: {
      transportation_type: {
        label: 'סוג הסעות',
        type: 'checkbox',
        options: ['הסעות לאירועים', 'הסעות תלמידים', 'הסעות טיולים', 'הסעות לנתב"ג'],
        dbField: 'service_details->>"$.transportation_type"'
      },
      vehicle_type: {
        label: 'סוג רכב',
        type: 'checkbox',
        options: ['5 מקומות', '7 מקומות', '9 מקומות', 'מיניבוס (14-23 מושבים)', 'אוטובוס (50-60 מושבים)'],
        dbField: 'service_details->>"$.vehicle_type"'
      },
      availability_hours: {
        label: 'שעות זמינות',
        type: 'checkbox',
        options: ['morning', 'afternoon', 'evening', 'night', '24/6'],
        dbField: 'availability_hours'
      }
    },
    optional: {
      languages: {
        label: 'שפות מדוברות',
        type: 'checkbox',
        options: ['hebrew', 'russian', 'english', 'french'],
        dbField: 'languages'
      },
      experienceYears: {
        label: 'שנות ניסיון',
        type: 'range',
        min: 0,
        max: 30,
        unit: 'שנים',
        dbField: 'experience_years'
      },
      hourlyRate: {
        label: 'תעריף לשעה (₪)',
        type: 'range',
        min: 30,
        max: 200,
        unit: '₪/שעה',
        dbField: 'hourly_rate'
      }
    }
  }
};

// Fonction utilitaire pour obtenir tous les filtres d'un service
export const getServiceFilters = (serviceType) => {
  const config = serviceFiltersConfig[serviceType];
  if (!config) return { required: {}, optional: {} };
  
  return {
    required: config.required || {},
    optional: config.optional || {}
  };
};

// Fonction pour obtenir les options d'un filtre spécifique
export const getFilterOptions = (serviceType, filterKey) => {
  const filters = getServiceFilters(serviceType);
  const filter = filters.required[filterKey] || filters.optional[filterKey];
  return filter?.options || [];
};

// Fonction pour valider les filtres reçus
export const validateServiceFilters = (serviceType, filters) => {
  const config = serviceFiltersConfig[serviceType];
  if (!config) return false;
  
  const allFilterKeys = {
    ...config.required,
    ...config.optional
  };
  
  return Object.keys(filters).every(key =>
    Object.prototype.hasOwnProperty.call(allFilterKeys, key)
  );
};

// ✅ CORRIGÉ - Mapping pour requêtes SQL avec vrais champs BDD
export const buildSQLFilters = (serviceType, filters) => {
  const config = serviceFiltersConfig[serviceType];
  if (!config) return { conditions: [], params: [] };
  
  const conditions = [];
  const params = [];
  
  const allFilters = { ...config.required, ...config.optional };
  
  Object.entries(filters).forEach(([filterKey, value]) => {
    const filterConfig = allFilters[filterKey];
    if (!filterConfig || !value) return;
    
    const dbField = filterConfig.dbField;
    if (!dbField) return;
    
    // Gestion selon le type de filtre
    switch (filterConfig.type) {
      case 'checkbox':
      case 'checkbox-categorized': // ✅ Nouveau type pour cleaning
        if (Array.isArray(value) && value.length > 0) {
          if (dbField.includes('JSON_EXTRACT') || dbField.includes('->>')) {
            // Pour les champs JSON
            const placeholders = value.map(() => '?').join(',');
            conditions.push(`JSON_OVERLAPS(${dbField}, JSON_ARRAY(${placeholders}))`);
            params.push(...value);
          } else {
            // Pour les colonnes normales
            const placeholders = value.map(() => '?').join(',');
            conditions.push(`${dbField} IN (${placeholders})`);
            params.push(...value);
          }
        }
        break;
        
      case 'select':
        if (value && value !== '') {
          if (dbField.includes('JSON_EXTRACT') || dbField.includes('->>')) {
            conditions.push(`${dbField} = ?`);
          } else {
            conditions.push(`${dbField} = ?`);
          }
          params.push(value);
        }
        break;
        
      case 'range':
        if (typeof value === 'object') {
          if (value.min && !isNaN(value.min)) {
            conditions.push(`${dbField} >= ?`);
            params.push(parseFloat(value.min));
          }
          if (value.max && !isNaN(value.max)) {
            conditions.push(`${dbField} <= ?`);
            params.push(parseFloat(value.max));
          }
        }
        break;
        
      case 'text':
        if (value && value.trim()) {
          if (dbField.includes('JSON')) {
            conditions.push(`JSON_SEARCH(${dbField}, 'one', ?) IS NOT NULL`);
          } else {
            conditions.push(`${dbField} LIKE ?`);
          }
          params.push(`%${value.trim()}%`);
        }
        break;
    }
  });
  
  return { conditions, params };
};