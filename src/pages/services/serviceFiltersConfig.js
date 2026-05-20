// services/serviceFiltersConfig.js
// ✅ MISE À JOUR COMPLÈTE - Configuration synchronisée avec l'inscription
// Configuration des filtres par service - SYNCHRONISÉE avec la BDD service_providers

export const serviceFiltersConfig = {
  babysitting: {
  required: {
    ageGroups: {
      label: 'קבוצות גיל מתאימות',
      type: 'checkbox',
      options: ['0-1 שנה', '1-3 שנים', '3-6 שנים', '6+ שנים'],
      dbField: 'service_details->>"$.ageGroups"'
    },
    availability_days: {
      label: 'ימי זמינות',
      type: 'checkbox',
      options: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'כל השבוע'],
      dbField: 'availability_days'
    },
    availability_hours: {
      label: 'שעות זמינות',
      type: 'checkbox',
      options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל'],
      dbField: 'availability_hours'
    },
    babysitting_types: {
      label: 'סוגי שמרטפות',
      type: 'checkbox',
      options: [
        'שמרטפות מזדמנת',
        'שמרטפות קבועה בבית הלקוח',
        'הוצאה מהגן / מבית-הספר',
        'שמירה בלילה',
        'שמירה בזמן חופשות',
        'עזרה בשיעורי בית',
        'מטפלת במשרה מלאה',
        'קייטנת קיץ',
        'קייטנת חורף'
      ],
      dbField: 'babysitting_types'
    },
    experience_level: {
      label: 'רמת ניסיון',
      type: 'select',
      options: [
        { value: '', label: 'הכל' },
        { value: 'מתחיל', label: 'מתחיל' },
        { value: 'מנוסה', label: 'מנוסה' }
      ],
      dbField: 'experience_level'
    },
    hourlyRate: {
      label: 'תעריף שעתי (₪)',
      type: 'range',
      min: 20,
      max: 100,
      unit: '₪/שעה',
      dbField: 'hourly_rate'
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
      options: ['עברית', 'ערבית', 'רוסית', 'אנגלית', 'ספרדית', 'צרפתית'],
      dbField: 'languages'
    },
    religiousLevel: {
      label: 'רמה דתית',
      type: 'select',
      options: [
        { value: 'חילוני', label: 'חילוני' },
        { value: 'מסורתי', label: 'מסורתי' },
        { value: 'דתי', label: 'דתי' },
        { value: 'חרדי', label: 'חרדי' }
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
          { value: '', label: 'הכל' },
          { value: 'חברה', label: 'חברה' },
          { value: 'עצמאי', label: 'עצמאי' }
        ],
        dbField: 'availability->>"$.legalStatus"'
      },
      // ✅ NOUVEAU - Système de catégories avec sous-catégories
      cleaningTypes: {
        label: 'סוגי ניקיון',
        type: 'checkbox-categorized', // ✅ Nouveau type pour gérer les catégories
        categories: {
          'ניקיון ביתי': [
            'ניקיון שוטף',
            'ניקיון פסח',
            'ניקיון אחרי שיפוץ',
            'ניקיון לדירות Airbnb'
          ],
          'ניקיון משרדים ומבנים': [
            'משרדים',
            'חנויות',
            'בניינים',
            'מוסדות חינוך',
            'מפעלים'
          ],
          'ניקיון מיוחד': [
            'ניקוי חלונות',
            'ניקוי שטיחים',
            'ניקוי ספות',
            'ניקוי וילונות',
            'ניקוי בלחץ מים (טרסות, חזיתות)',
            'ניקוי מזגן',
'ריסוס (נגד חרקים)',
'ניקיון גגות רעפים',
            'חיטוי וניקיון אחרי נזק (שריפה / הצפה)'
          ],
          'שירותים נוספים': [
            'ניקוי רכב בבית הלקוח',
            'ניקוי פאנלים סולאריים',
            'גיהוץ בבית הלקוח',
            'קיפול כביסה'
          ]
        },
        dbField: 'availability->>"$.cleaningTypes"'
      },
      frequency: {
        label: 'תדירות זמינה',
        type: 'checkbox',
        options: ['חד פעמי', 'שבועי', 'דו שבועי', 'חודשי'],
        dbField: 'availability->>"$.frequency"'
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
        options: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'כל השבוע'],
        dbField: 'availability->>"$.availableDays"'
      },
      // ✅ NOUVEAU - Disponibilité (heures)
      availableHours: {
        label: 'שעות זמינות',
        type: 'checkbox',
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל'],
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
          'גיזום עצים ושיחים',
          'עיצוב גינה',
          'שתילת צמחים',
          'השקיה',
          'דישון',
          'ניכוש עשבים',
          'תחזוקה כללית'
        ],
        dbField: 'availability->>"$.services"'
      },
      seasons: {
        label: 'עונות זמינות',
        type: 'checkbox',
        options: [
          'כל השנה',    // ✅ En premier
          'אביב',       // Printemps
          'קיץ',        // Été  
          'סתיו',       // Automne
          'חורף'       // Hiver
        ],
        dbField: 'availability->>"$.seasons"'
      },
      // ✅ CORRIGÉ - Equipment de l'inscription
      equipment: {
        label: 'ציוד בבעלותי',
        type: 'checkbox',
        options: [
          'מכסחת דשא',
          'מזמרות גיזום',
          'משאבת מים',
          'כלים ידניים',
          'מפזר דשן',
          'מערכת השקיה'
        ],
        dbField: 'availability->>"$.equipment"'
      }
    },
    optional: {
      specializations: {
        label: 'התמחויות',
        type: 'checkbox',
       options: ['הכשרה גנן סוג א', 'הכשרה גנן סוג ב', 'אילני אגרונום', 'גוזם מומחה'],
        dbField: 'availability->>"$.specializations"'
      },
      additionalServices: {
        label: 'שירותים נוספים',
        type: 'checkbox',
        options: ['פינוי פסולת גינה', 'ייעוץ עיצוב נוף'],
        dbField: 'availability->>"$.additionalServices"'
      }
    }
  },

  petcare: {
    required: {
      // ✅ CORRIGÉ - "מכרסמים קטנים" au lieu de "מכרסמים"
      animalTypes: {
        label: 'סוגי חיות מתאימות',
        type: 'checkbox',
        options: ['כלבים', 'חתולים', 'ציפורים', 'מכרסמים קטנים', 'דגים', 'זוחלים'],
        dbField: 'availability->>"$.animalTypes"'
      },
      dogSizes: {
        label: 'גודל כלבים מתאים',
        type: 'checkbox',
        options: ['קטן', 'בינוני', 'גדול', 'ענק'],
        dbField: 'availability->>"$.dogSizes"'
      },
      experienceLevel: {
        label: 'רמת ניסיון',
        type: 'select',
        options: [
          { value: '', label: 'הכל' },
          { value: 'מתחיל', label: 'מתחיל' },
          { value: 'מנוסה', label: 'מנוסה' }
        ],
        dbField: 'availability->>"$.experienceLevel"'
      },
      location: {
        label: 'מקום השמירה',
        type: 'select',
        options: [
          { value: '', label: 'הכל' },
       { value: 'בבית הלקוח', label: 'בבית הלקוח' },
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
        label: 'מתן תרופות',
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
       options: ['הליכת כלבים', 'רחצה וטיפוח', 'אילוף בסיסי', 'מתן תרופות', 'האכלה בזמן השמירה', 'ניקוי ארגז חול / כלוב / אקווריום', 'עדכון תמונות לבעלים', 'שהייה לילה / יום בלבד'],
        dbField: 'availability->>"$.additionalServices"'
      },
      // ✅ NOUVEAU - Installations à la maison
      facilities: {
        label: 'מתקנים בבית',
        type: 'checkbox',
       options: ['גינה מגודרת', 'חצר גדולה', 'מזגן'],
        dbField: 'availability->>"$.facilities"'
      },
        // ✅ NOUVEAU - Services vétérinaires
      veterinaryServices: {
        label: 'שירותים וטרינריים',
        type: 'checkbox',
        options: ['ביקור וטרינר', 'מתן תרופות', 'טיפול בסיסי'],
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
        options: ['יסודי', 'חטיבת ביניים', 'תיכון', 'בגרות', 'מכינה', 'אקדמי', 'מבוגרים'],
        dbField: 'availability->>"$.levels"'
      },
      // ✅ CORRIGÉ - Options alignées avec l'inscription
      teachingMode: {
        label: 'אופן הוראה',
        type: 'select',
        options: [
          { value: '', label: 'הכל' },
          { value: 'פרונטלי בלבד', label: 'פרונטלי בלבד' },
          { value: 'אונליין בלבד', label: 'אונליין בלבד' },
          { value: 'שניהם', label: 'שניהם' }
        ],
        dbField: 'availability->>"$.teachingMode"'
      }
    },
    optional: {
      specializations: {
        label: 'התמחויות',
        type: 'checkbox',
        options: ['הכנה לבחינות', 'הפרעות למידה'],
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
          'ליווי ותמיכה',
          'עזרה בניקיון הבית',
          'בישול והכנת אוכל',
          'קניות ומשימות',
          'מתן תרופות',
          'ליווי לרופאים'
        ],
        dbField: 'availability->>"$.careTypes"'
      },
      // ✅ CORRIGÉ - 6 options horaires détaillées
      availability: {
        label: 'זמינות',
        type: 'checkbox',
        options: ['בוקר', 'צהריים', 'אחר הצהריים', 'ערב', 'לילה', '24/7'],
        dbField: 'availability->>"$.timeSlots"'
      }
    },
    optional: {
      // ✅ CORRIGÉ - 5 conditions avec noms corrects
      specificConditions: {
        label: 'נסיון עם מחלות ספציפיות',
        type: 'checkbox',
        options: ['אלצהיימר', 'פרקינסון', 'סוכרת', 'בעיות ניידות', 'דמנציה'],
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
        'איסוף והחזרת כביסה (שירות משלוחים)',
        'ניקוי יבש / שירות מכבסה',
        'כביסת מצעים, מגבות, וילונות',
        'כביסה תעשייתית (מלונות, מסעדות)'
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
      options: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'כל השבוע'],
      dbField: 'availability->>"$.availableDays"'
    },
    // 🆕 NOUVEAU - Heures disponibles
    availableHours: {
      label: 'זמינות - שעות',
      type: 'checkbox',
      options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל'],
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
            'חיפוש ובדיקת שוכרים מתאימים',
            'חתימה על חוזה וניהול ערבויות',
            'גביית שכ"ד והעברת תשלומים לבעל הדירה',
            'בדיקת מצב הנכס לפני ואחרי תקופת השכירות',
            'העברת חשבונות השירותים (מים, חשמל, גז) על שם השוכר החדש'
          ],
          '🏖️ השכרה לטווח קצר (Airbnb / Booking)': [
            'פרסום וניהול מודעות באתרים',
            'ניהול הזמנות ותקשורת עם אורחים',
            'קבלת אורחים / מסירת מפתחות',
            'ניקיון בין השהיות',
            'בדיקה תקופתית של הנכס',
            'תיקונים כלליים (חשמל, אינסטלציה, מזגן וכו׳)'
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
        options: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'כל השבוע'],
        dbField: 'availability_days'
      },
      availability_hours: {
        label: 'שעות זמינות',
        type: 'checkbox',
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל'],
        dbField: 'availability_hours'
      },
      dj_event_types: {
        label: 'סוגי אירועים',
        type: 'checkbox',
        options: [
          'חתונה',
          'בר מצווה',
          'בת מצווה',
          'ברית מילה',
          'שבע ברכות',
          'יום הולדת / יום שנה',
          'אירוע עסקי',
          'מסיבה פרטית',
          'חגיגה משפחתית',
          'אירוסין'
        ],
        dbField: 'service_details->>"$.dj_event_types"'
      }
    },
    optional: {
      languages: {
        label: 'שפות מדוברות',
        type: 'checkbox',
        options: ['עברית', 'ערבית', 'רוסית', 'אנגלית', 'צרפתית'],
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
            'הדברת תיקנים',
            'הדברת נמלים',
            'הדברת פשפשים',
            'הדברת פרעושים',
            'הדברת יתושים'
          ],
          '🐭 מכרסמים': [
            'הדברת חולדות',
            'הדברת עכברים'
          ],
          '🐦 יונים ובעלי חיים': [
            'הרחקת יונים',
            'הרחקת עטלפים',
            'הרחקת נחשים'
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