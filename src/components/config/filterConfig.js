// src/config/filterConfig.js
// Configuration centralisée de tous les filtres par service
// Les valeurs sont les clés de traduction

export const FILTER_CONFIG = {
  // ═══════════════════════════════════════════════════════════════
  // FILTRES COMMUNS À TOUS LES SERVICES
  // ═══════════════════════════════════════════════════════════════
  common: {
    days: [
      { value: 'ראשון', key: 'days.sunday' },
      { value: 'שני', key: 'days.monday' },
      { value: 'שלישי', key: 'days.tuesday' },
      { value: 'רביעי', key: 'days.wednesday' },
      { value: 'חמישי', key: 'days.thursday' },
      { value: 'שישי', key: 'days.friday' },
      { value: 'כל השבוע', key: 'days.allWeek' }
    ],
    hours: [
      { value: 'בוקר', key: 'hours.morning' },
      { value: 'אחר הצהריים', key: 'hours.afternoon' },
      { value: 'ערב', key: 'hours.evening' },
      { value: 'הכל', key: 'hours.all' }
    ],
    yesNoOptions: [
      { value: '', key: 'filters.noMatter' },
      { value: 'yes', key: 'common.yes' },
      { value: 'no', key: 'common.no' }
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
      { value: '0-1 שנה', key: 'filters.babysitting.age0to1' },
      { value: '1-3 שנים', key: 'filters.babysitting.age1to3' },
      { value: '3-6 שנים', key: 'filters.babysitting.age3to6' },
      { value: '6+ שנים', key: 'filters.babysitting.age6plus' }
    ],
    types: [
      { value: 'שמרטפות מזדמנת', key: 'filters.babysitting.occasional' },
      { value: 'שמרטפות קבועה בבית הלקוח', key: 'filters.babysitting.regular' },
      { value: 'הוצאה מהגן / מבית-הספר', key: 'filters.babysitting.pickup' },
      { value: 'שמירה בלילה', key: 'filters.babysitting.nightCare' },
      { value: 'שמירה בזמן חופשות', key: 'filters.babysitting.holidayCare' },
      { value: 'עזרה בשיעורי בית', key: 'filters.babysitting.homework' },
      { value: 'מטפלת במשרה מלאה', key: 'filters.babysitting.fullTime' },
      { value: 'קייטנת קיץ', key: 'filters.babysitting.summerCamp' },
      { value: 'קייטנת חורף', key: 'filters.babysitting.winterCamp' }
    ],
    languages: [
      { value: 'עברית', key: 'languages.hebrew' },
      { value: 'ערבית', key: 'languages.arabic' },
      { value: 'רוסית', key: 'languages.russian' },
      { value: 'אנגלית', key: 'languages.english' },
      { value: 'ספרדית', key: 'languages.spanish' },
      { value: 'צרפתית', key: 'languages.french' }
    ],
    certifications: [
      { value: '', key: 'filters.noMatter' },
      { value: 'הכשרה בתחום החינוך המיוחד', key: 'filters.babysitting.certSpecialEd' },
      { value: 'קורס עזרה ראשונה', key: 'filters.babysitting.certFirstAid' },
      { value: 'ניסיון בגני ילדים או מעונות', key: 'filters.babysitting.certKindergarten' }
    ],
    religiousLevels: [
      { value: '', key: 'filters.noMatter' },
      { value: 'לא משנה', key: 'filters.noMatter' },
      { value: 'חילוני', key: 'filters.religious.secular' },
      { value: 'מסורתי', key: 'filters.religious.traditional' },
      { value: 'דתי', key: 'filters.religious.religious' },
      { value: 'חרדי', key: 'filters.religious.orthodox' }
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
      frequency: 'filters.cleaning.frequency',
      materialsProvided: 'filters.cleaning.materialsProvided',
      availableDays: 'filters.cleaning.availableDays',
      availableHours: 'filters.cleaning.availableHours'
    },
    legalStatus: [
      { value: '', key: 'filters.noMatter' },
      { value: 'חברה', key: 'filters.cleaning.company' },
      { value: 'עצמאי', key: 'filters.cleaning.independent' }
    ],
    homeCleaning: [
      { value: 'ניקיון שוטף', key: 'filters.cleaning.regularCleaning' },
      { value: 'ניקיון פסח', key: 'filters.cleaning.passoverCleaning' },
      { value: 'ניקיון אחרי שיפוץ', key: 'filters.cleaning.postRenovation' },
      { value: 'ניקיון לדירות Airbnb', key: 'filters.cleaning.airbnb' }
    ],
    officeCleaning: [
      { value: 'משרדים', key: 'filters.cleaning.offices' },
      { value: 'חנויות', key: 'filters.cleaning.stores' },
      { value: 'בניינים', key: 'filters.cleaning.buildings' },
      { value: 'מוסדות חינוך', key: 'filters.cleaning.educationalInstitutions' },
      { value: 'מפעלים', key: 'filters.cleaning.factories' }
    ],
    specialCleaning: [
      { value: 'ניקוי חלונות בגובה ', key: 'filters.cleaning.highWindows' },
      { value: 'ניקוי שטיחים וספות', key: 'filters.cleaning.carpetsSofas' },
      { value: 'ניקוי וילונות', key: 'filters.cleaning.curtains' },
      { value: 'ניקוי בלחץ מים (טרסות, חזיתות)', key: 'filters.cleaning.pressureWashing' },
      { value: 'חיטוי וניקיון אחרי נזק (שריפה / הצפה)', key: 'filters.cleaning.damageCleanup' },
      { value: 'ניקוי מזגן', key: 'filters.cleaning.acCleaning' },
      { value: 'ריסוס (נגד חרקים)', key: 'filters.cleaning.pestControl' },
      { value: 'ניקיון גגות רעפים', key: 'filters.cleaning.roofCleaning' }
    ],
    additionalServices: [
      { value: 'ניקוי רכב בבית הלקוח', key: 'filters.cleaning.carCleaning' },
      { value: 'ניקוי פאנלים סולאריים', key: 'filters.cleaning.solarPanels' },
      { value: 'גיהוץ בבית הלקוח', key: 'filters.cleaning.ironingAtHome' },
      { value: 'קיפול כביסה', key: 'filters.cleaning.laundryFolding' }
    ],
    frequency: [
      { value: 'חד פעמי', key: 'filters.cleaning.oneTime' },
      { value: 'שבועי', key: 'filters.cleaning.weekly' },
      { value: 'דו שבועי', key: 'filters.cleaning.biweekly' },
      { value: 'חודשי', key: 'filters.cleaning.monthly' }
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
      { value: 'גיזום עצים ושיחים', key: 'filters.gardening.pruning' },
      { value: 'עיצוב גינה', key: 'filters.gardening.design' },
      { value: 'שתילת צמחים', key: 'filters.gardening.planting' },
      { value: 'השקיה', key: 'filters.gardening.irrigation' },
      { value: 'דישון', key: 'filters.gardening.fertilizing' },
      { value: 'ניכוש עשבים', key: 'filters.gardening.weeding' },
      { value: 'תחזוקה כללית', key: 'filters.gardening.generalMaintenance' }
    ],
    seasons: [
      { value: 'כל השנה', key: 'filters.gardening.allYear' },
      { value: 'אביב', key: 'filters.gardening.spring' },
      { value: 'קיץ', key: 'filters.gardening.summer' },
      { value: 'סתיו', key: 'filters.gardening.autumn' },
      { value: 'חורף', key: 'filters.gardening.winter' }
    ],
    equipment: [
      { value: 'מכסחת דשא', key: 'filters.gardening.lawnMower' },
      { value: 'מזמרות גיזום', key: 'filters.gardening.pruningShears' },
      { value: 'משאבת מים', key: 'filters.gardening.waterPump' },
      { value: 'כלים ידניים', key: 'filters.gardening.handTools' },
      { value: 'מפזר דשן', key: 'filters.gardening.fertilizerSpreader' },
      { value: 'מערכת השקיה', key: 'filters.gardening.irrigationSystem' }
    ],
    specializations: [
      { value: 'הכשרה גנן סוג א', key: 'filters.gardening.gardenerTypeA' },
      { value: 'הכשרה גנן סוג ב', key: 'filters.gardening.gardenerTypeB' },
      { value: 'אילני אגרונום', key: 'filters.gardening.agronomist' },
      { value: 'גוזם מומחה', key: 'filters.gardening.expertPruner' }
    ],
    additionalServices: [
      { value: 'פינוי פסולת גינה', key: 'filters.gardening.wasteRemoval' },
      { value: 'ייעוץ עיצוב נוף', key: 'filters.gardening.landscapeConsulting' }
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
      { value: 'כלבים', key: 'filters.petcare.dogs' },
      { value: 'חתולים', key: 'filters.petcare.cats' },
      { value: 'ציפורים', key: 'filters.petcare.birds' },
      { value: 'מכרסמים קטנים', key: 'filters.petcare.smallRodents' },
      { value: 'דגים', key: 'filters.petcare.fish' },
      { value: 'זוחלים', key: 'filters.petcare.reptiles' }
    ],
    dogSizes: [
      { value: 'קטן / עד 10 ק״ג', key: 'filters.petcare.smallDog' },
      { value: 'בינוני / 10–25 ק״ג', key: 'filters.petcare.mediumDog' },
      { value: 'גדול / 25–40 ק״ג', key: 'filters.petcare.largeDog' },
      { value: 'ענק / מעל 40 ק״ג', key: 'filters.petcare.giantDog' }
    ],
    locationOptions: [
      { value: '', key: 'filters.common.noMatter' },  // ← corrigé
      { value: 'בבית הלקוח', key: 'filters.petcare.clientHome' },
      { value: 'בביתי', key: 'filters.petcare.caregiverHome' },
      { value: 'שניהם', key: 'filters.common.both' }  // ← corrigé
    ],
    additionalServices: [
      { value: 'הליכת כלבים', key: 'filters.petcare.dogWalking' },
      { value: 'רחצה וטיפוח', key: 'filters.petcare.bathingGrooming' },  // ← corrigé
      { value: 'אילוף בסיסי', key: 'filters.petcare.basicTraining' },
      { value: 'מתן תרופות', key: 'filters.petcare.medicationAdmin' },  // ← corrigé
      { value: 'האכלה בזמן השמירה', key: 'filters.petcare.feeding' },
      { value: 'ניקוי ארגז חול / כלוב / אקווריום', key: 'filters.petcare.cleaning' },
      { value: 'עדכון תמונות לבעלים', key: 'filters.petcare.photoUpdates' },
      { value: 'שהייה ביום בלבד', key: 'filters.petcare.daytimeOnly' },  // ← corrigé
      { value: 'לינה ללילה', key: 'filters.petcare.overnight' }
    ],
    facilities: [
      { value: 'גינה מגודרת', key: 'filters.petcare.fencedGarden' },
      { value: 'חצר גדולה', key: 'filters.petcare.largeYard' },
      { value: 'מזגן', key: 'filters.petcare.airConditioning' }
    ],
    veterinaryServices: [
      { value: 'ביקור וטרינר', key: 'filters.petcare.vetVisit' },
      { value: 'טיפול בסיסי', key: 'filters.petcare.basicCare' }
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
      { value: 'ליווי ותמיכה', key: 'filters.eldercare.companionship' },
      { value: 'עזרה בניקיון הבית', key: 'filters.eldercare.houseCleaning' },
      { value: 'בישול והכנת אוכל', key: 'filters.eldercare.cooking' },
      { value: 'קניות ומשימות', key: 'filters.eldercare.errands' },
      { value: 'מתן תרופות', key: 'filters.eldercare.medication' },
      { value: 'ליווי לרופאים', key: 'filters.eldercare.doctorAccompaniment' }
    ],
    availability: [
      { value: 'בוקר', key: 'hours.morning' },
      { value: 'צהריים', key: 'hours.noon' },
      { value: 'אחר הצהריים', key: 'hours.afternoon' },
      { value: 'ערב', key: 'hours.evening' },
      { value: 'לילה', key: 'hours.night' },
      { value: '24/7', key: 'hours.twentyFourSeven' }
    ],
    specificConditions: [
      { value: 'אלצהיימר', key: 'filters.eldercare.alzheimers' },
      { value: 'פרקינסון', key: 'filters.eldercare.parkinsons' },
      { value: 'סוכרת', key: 'filters.eldercare.diabetes' },
      { value: 'בעיות ניידות', key: 'filters.eldercare.mobilityIssues' },
      { value: 'דמנציה', key: 'filters.eldercare.dementia' }
    ],
    languages: [
      { value: 'עברית', key: 'languages.hebrew' },
      { value: 'ערבית', key: 'languages.arabic' },
      { value: 'רוסית', key: 'languages.russian' },
      { value: 'אנגלית', key: 'languages.english' },
      { value: 'ספרדית', key: 'languages.spanish' },
      { value: 'צרפתית', key: 'languages.french' }
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
  // TUTORING
  // ═══════════════════════════════════════════════════════════════
tutoring: {
    sectionTitles: {
      levels: 'filters.tutoring.studyLevels',
      teachingMode: 'filters.tutoring.teachingMode',
      specializations: 'filters.tutoring.specializations',
      qualifications: 'filters.tutoring.qualifications'
    },
    levels: [
      { value: 'יסודי', key: 'filters.tutoring.elementary' },
      { value: 'חטיבת ביניים', key: 'filters.tutoring.middleSchool' },
      { value: 'תיכון', key: 'filters.tutoring.highSchool' },
      { value: 'בגרות', key: 'filters.tutoring.matriculation' },
      { value: 'מכינה', key: 'filters.tutoring.preAcademic' },
      { value: 'אקדמי', key: 'filters.tutoring.academic' },
      { value: 'מבוגרים', key: 'filters.tutoring.adults' }
    ],
    teachingModes: [
      { value: '', key: 'filters.tutoring.allOptions' },
      { value: 'פרונטלי בלבד', key: 'filters.tutoring.inPersonOnly' },
      { value: 'אונליין בלבד', key: 'filters.tutoring.onlineOnly' },
      { value: 'שניהם', key: 'filters.tutoring.both' }
    ],
    specializations: [
      { value: 'הכנה לבחינות', key: 'filters.tutoring.examPrep' },
      { value: 'הפרעות למידה', key: 'filters.tutoring.learningDisabilities' }
    ],
     qualifications: [
      { value: '', key: 'filters.common.noMatter' },
      { value: 'yes', key: 'filters.tutoring.hasQualifications' },
      { value: 'no', key: 'filters.tutoring.noQualifications' }
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
      { value: 'איסוף והחזרת כביסה (שירות משלוחים)', key: 'filters.laundry.pickupDelivery' },
      { value: 'ניקוי יבש / שירות מכבסה', key: 'filters.laundry.dryCleaning' },
      { value: 'כביסת מצעים, מגבות, וילונות', key: 'filters.laundry.linens' },  // ← corrigé (était beddingTowels)
      { value: 'כביסה תעשייתית (מלונות, מסעדות)', key: 'filters.laundry.industrial' }
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
      { value: 'תיקונים', key: 'filters.electrician.repairs' },
      { value: 'התקנות', key: 'filters.electrician.installations' },
      { value: 'עבודות חשמל גדולות', key: 'filters.electrician.largeElectricalWork' }
    ],
  repairTypes: [
      { value: 'תיקון מזגן', key: 'filters.ac.acRepair' },
      { value: 'תיקון מזגן מעובש', key: 'filters.ac.moldyAcRepair' },
      { value: 'תיקון מיזוג מיני מרכזי', key: 'filters.ac.miniCentralRepair' },
      { value: 'תיקון דליפת גז במזגן', key: 'filters.ac.gasLeakRepair' },
      { value: 'תיקון מיזוג מרכזי', key: 'filters.ac.centralRepair' },
      { value: 'תיקון מזגן אינוורטר', key: 'filters.ac.inverterRepair' },
      { value: 'תיקון מזגן VRF', key: 'filters.ac.vrfRepair' },
      { value: 'ניקוי יסודי', key: 'filters.ac.filterCleaning' },
      { value: 'תיקון צ\'ילרים', key: 'filters.ac.chillerRepair' },
      { value: 'טכנאי חדרי קירור', key: 'filters.ac.coldRoomTech' },
      { value: 'מילוי גז', key: 'filters.ac.gasRefill' },
      { value: 'תיקון קצר', key: 'filters.electrician.shortCircuitRepair' }
    ],
    installationTypes: [
      { value: 'התקנת מאוורר תקרה', key: 'filters.electrician.ceilingFan' },
      { value: 'התקנת שקע חשמל', key: 'filters.electrician.outletInstall' },
      { value: 'התקנת נקודת חשמל חדשה', key: 'filters.electrician.newOutlet' },
      { value: 'התקנת אטמור', key: 'filters.electrician.waterHeater' },
      { value: 'התקנת מתג', key: 'filters.electrician.switchInstall' },
      { value: 'עמדת טעינה לרכב חשמלי', key: 'filters.electrician.evCharger' },
      { value: 'התקנת שעון שבת', key: 'filters.electrician.shabbatTimer' },
      { value: 'התקנות אחרות', key: 'filters.electrician.otherInstall' },
      { value: 'עמדת טעינה לרכב חשמלי של חברת EV-Meter', key: 'filters.electrician.evMeter' },
      { value: 'התקנות כיריים אינדוקציה', key: 'filters.electrician.inductionCooktop' },
      { value: 'התקנת תנור אמבטיה', key: 'filters.electrician.bathroomHeater' },
      { value: 'התקנת גנרטור לבית פרטי', key: 'filters.electrician.generator' },
      { value: 'התקנת ונטה', key: 'filters.electrician.ventaInstall' },
      { value: 'עמדת טעינה לרכב חשמלי EV-EDGE', key: 'filters.electrician.evEdge' }
    ],
    largeWorkTypes: [
      { value: 'בניית תשתית חשמל בכל הבית', key: 'filters.electrician.newInfrastructure' },
      { value: 'החלפת תשתית חשמל בכל הבית', key: 'filters.electrician.replaceInfrastructure' },
      { value: 'החלפת לוח חשמל', key: 'filters.electrician.panelReplacement' },
      { value: 'הארקה', key: 'filters.electrician.grounding' },
      { value: 'החלפה לתלת פאזי', key: 'filters.electrician.threePhase' },
      { value: 'הכנה לביקורת עבור חברת חשמל', key: 'filters.electrician.inspection' }
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
      { value: 'סתימות', key: 'filters.plumbing.blockages' },
      { value: 'תיקון צנרת', key: 'filters.plumbing.pipeRepair' },
      { value: 'עבודות גדולות', key: 'filters.plumbing.largeWork' },
      { value: 'תיקון והתקנת אביזרי אינסטלציה', key: 'filters.plumbing.fixtureRepair' }
    ],
    blockageTypes: [
      { value: 'פתיחת סתימה בבית', key: 'filters.plumbing.homeBlockage' },
      { value: 'משאבה טבולה', key: 'filters.plumbing.submersiblePump' },
      { value: 'פתיחת סתימה בבנין', key: 'filters.plumbing.buildingBlockage' }
    ],
    pipeRepairTypes: [
      { value: 'תיקון צנרת גברית', key: 'filters.plumbing.malePipeRepair' },
      { value: 'תיקון נזקי צנרת בבית', key: 'filters.plumbing.homePipeDamage' },
      { value: 'תיקון נזקי צנרת בבניין', key: 'filters.plumbing.buildingPipeDamage' },
      { value: 'הגברת לחץ מים', key: 'filters.plumbing.pressureBoost' },
      { value: 'תיקון צנרת בגינה', key: 'filters.plumbing.gardenPipes' },
      { value: 'תיקוני צנרת אחרים', key: 'filters.plumbing.otherPipeRepairs' },
      { value: 'תיקון צנרת ביוב ללא הרס', key: 'filters.plumbing.sewerNonDestructive' }
    ],
    largeWorkTypes: [
      { value: 'החלפת צנרת בבית', key: 'filters.plumbing.homePipeReplacement' },
      { value: 'החלפת צנרת בבניין', key: 'filters.plumbing.buildingPipeReplacement' },
      { value: 'התקנת נקודות מים חדשות', key: 'filters.plumbing.newWaterPoints' },
      { value: 'החלפת קו ביוב בבית', key: 'filters.plumbing.homeSewerReplacement' },
      { value: 'החלפת קו ביוב בבניין', key: 'filters.plumbing.buildingSewerReplacement' },
      { value: 'הקמת קו ביוב חדש', key: 'filters.plumbing.newSewerLine' },
      { value: 'החלפת צנרת בגינה', key: 'filters.plumbing.gardenPipeReplacement' },
      { value: 'התקנת מזח', key: 'filters.plumbing.pierInstallation' }
    ],
    fixtureTypes: [
      { value: 'התקנת בר מים', key: 'filters.plumbing.waterBar' },
      { value: 'ניאגרה סמויה', key: 'filters.plumbing.concealedCistern' },
      { value: 'ברזים', key: 'filters.plumbing.faucets' },
      { value: 'ניאגרות ואסלות', key: 'filters.plumbing.toilets' },
      { value: 'מסנני מים', key: 'filters.plumbing.waterFilters' },
      { value: 'התקנת טוחן אשפה', key: 'filters.plumbing.garbageDisposal' },
      { value: 'תיקון טוחן אשפה', key: 'filters.plumbing.disposalRepair' },
      { value: 'כיורים', key: 'filters.plumbing.sinks' },
      { value: 'הכנה למדיח כלים', key: 'filters.plumbing.dishwasherPrep' },
      { value: 'אגנית למקלחון', key: 'filters.plumbing.showerBase' },
      { value: 'אביזרים אחרים', key: 'filters.plumbing.otherFixtures' },
      { value: 'סילוקית לאסלה', key: 'filters.plumbing.toiletFlush' },
      { value: 'התקנת בידה', key: 'filters.plumbing.bidet' },
      { value: 'אסלה תלויה', key: 'filters.plumbing.wallMountedToilet' },
      { value: 'אל חוזר לשעון מים', key: 'filters.plumbing.checkValve' },
      { value: 'התקנת מערכות מים תת כיוריות', key: 'filters.plumbing.underSinkSystems' }
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
      { value: 'התקנת מזגנים', key: 'filters.ac.installation' },
      { value: 'תיקון מזגנים', key: 'filters.ac.repair' },
      { value: 'פירוק והרכבת מזגנים', key: 'filters.ac.disassembly' }
    ],
    installationTypes: [
      { value: 'התקנת מזגן', key: 'filters.ac.acInstall' },
      { value: 'התקנת מיזוג מיני מרכזי', key: 'filters.ac.miniCentralInstall' },
      { value: 'התקנת מיזוג מרכזי', key: 'filters.ac.centralInstall' },
      { value: 'התקנת מזגן אינוורטר', key: 'filters.ac.inverterInstall' },
      { value: 'התקנת מזגן מולטי אינוורטר', key: 'filters.ac.multiInverterInstall' },
      { value: 'התקנת מזגן VRF', key: 'filters.ac.vrfInstall' }
    ],
    repairTypes: [
      { value: 'תיקון מזגן', key: 'filters.ac.acRepair' },
      { value: 'תיקון מזגן מעובש', key: 'filters.ac.moldyAcRepair' },
      { value: 'תיקון מיזוג מיני מרכזי', key: 'filters.ac.miniCentralRepair' },
      { value: 'תיקון דליפת גז במזגן', key: 'filters.ac.gasLeakRepair' },
      { value: 'תיקון מיזוג מרכזי', key: 'filters.ac.centralRepair' },
      { value: 'תיקון מזגן אינוורטר', key: 'filters.ac.inverterRepair' },
      { value: 'תיקון מזגן VRF', key: 'filters.ac.vrfRepair' },
      { value: 'ניקוי יסודי', key: 'filters.ac.filterCleaning' },
      { value: 'תיקון צ\'ילרים', key: 'filters.ac.chillerRepair' },
      { value: 'טכנאי חדרי קירור', key: 'filters.ac.coldRoomTech' }
    ],
    disassemblyTypes: [
      { value: 'פירוק והרכבת מזגן', key: 'filters.ac.acDisassembly' },
      { value: 'פירוק מיזוג מיני מרכזי', key: 'filters.ac.miniCentralDisassembly' },
      { value: 'פירוק מיזוג מרכזי', key: 'filters.ac.centralDisassembly' },
      { value: 'פירוק מזגן אינוורטר', key: 'filters.ac.inverterDisassembly' },
      { value: 'פירוק מזגן VRF', key: 'filters.ac.vrfDisassembly' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // GAS TECHNICIAN
  // ═══════════════════════════════════════════════════════════════
  gas_technician: {
    sectionTitles: {
      workTypes: 'filters.gas.workTypes',
      installationTypes: 'filters.gas.installationTypes',
      repairTypes: 'filters.gas.repairTypes'
    },
    workTypes: [
      { value: 'התקנת צנרת גז בבית', key: 'filters.gas.pipeInstallation' },
      { value: 'תיקוני גז בבית', key: 'filters.gas.repairs' }
    ],
    installationTypes: [
      { value: 'הזזת\\התקנת נקודת גז', key: 'filters.gas.gasPointInstall' },
      { value: 'התקנת כיריים גז', key: 'filters.gas.stovetopInstall' },
      { value: 'התקנת צינור גז', key: 'filters.gas.pipeInstall' },
      { value: 'התקנת גריל גז', key: 'filters.gas.grillInstall' },
      { value: 'התקנת חימום מים בגז', key: 'filters.gas.waterHeaterInstall' },
      { value: 'התקנת חגז', key: 'filters.gas.hagaz' },
      { value: 'בניית תשתית גז במבנה חדש', key: 'filters.gas.newBuildingInfra' },
      { value: 'שירותי גז לעסקים', key: 'filters.gas.businessServices' }
    ],
    repairTypes: [
      { value: 'תיקון כיריים גז', key: 'filters.gas.stovetopRepair' },
      { value: 'תיקון צנרת גז', key: 'filters.gas.pipeRepair' }
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
      { value: 'עיצובים בגבס', key: 'filters.drywall.design' },
      { value: 'עבודות גבס', key: 'filters.drywall.construction' }
    ],
    designTypes: [
      { value: 'נישות גבס', key: 'filters.drywall.niches' },
      { value: 'מזנון גבס', key: 'filters.drywall.tvUnit' },
      { value: 'ספריות גבס', key: 'filters.drywall.libraries' },
      { value: 'כוורות גבס', key: 'filters.drywall.shelves' },
      { value: 'תאורה נסתרת בגבס', key: 'filters.drywall.hiddenLighting' },
      { value: 'קרניז גבס מעוגל', key: 'filters.drywall.roundedCornice' },
      { value: 'קשתות גבס', key: 'filters.drywall.arches' },
      { value: 'תקרה צפה', key: 'filters.drywall.floatingCeiling' },
      { value: 'קיר צף', key: 'filters.drywall.floatingWall' }
    ],
    constructionTypes: [
      { value: 'בניית קירות גבס', key: 'filters.drywall.walls' },
      { value: 'בניית תקרות גבס', key: 'filters.drywall.ceilings' },
      { value: 'בניית מדפי גבס', key: 'filters.drywall.shelfConstruction' },
      { value: 'הנמכת תקרה למזגן', key: 'filters.drywall.acDropCeiling' },
      { value: 'חיפוי גבס לצנרת', key: 'filters.drywall.pipeCovering' },
      { value: 'בניית סינר\\קרניז גבס', key: 'filters.drywall.cornice' },
      { value: 'בידוד אקוסטי', key: 'filters.drywall.acousticInsulation' }
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
      { value: 'בניית רהיטים', key: 'filters.carpentry.furnitureBuilding' },
      { value: 'תיקון רהיטים', key: 'filters.carpentry.furnitureRepair' },
      { value: 'עבודות נגרות אחרות', key: 'filters.carpentry.otherWork' },
      { value: 'נגרות חוץ', key: 'filters.carpentry.outdoorCarpentry' }
    ],
    furnitureBuildingTypes: [
      { value: 'בניית ארונות קיר', key: 'filters.carpentry.wallClosets' },
      { value: 'בניית ארונות הזזה', key: 'filters.carpentry.slidingClosets' },
      { value: 'בניית ארונות אמבטיה', key: 'filters.carpentry.bathroomCabinets' },
      { value: 'בניית חדר שינה', key: 'filters.carpentry.bedroomFurniture' },
      { value: 'בניית שולחן', key: 'filters.carpentry.tableBuilding' },
      { value: 'בניית כסאות', key: 'filters.carpentry.chairBuilding' },
      { value: 'בניית מזנון', key: 'filters.carpentry.tvUnitBuilding' },
      { value: 'בניית ספריה', key: 'filters.carpentry.libraryBuilding' },
      { value: 'בניית רהיטים ייחודים', key: 'filters.carpentry.customFurniture' },
      { value: 'בניית מדפים', key: 'filters.carpentry.shelfBuilding' },
      { value: 'בניית חדר ארונות', key: 'filters.carpentry.walkInCloset' },
      { value: 'בניית מיטה מעץ', key: 'filters.carpentry.woodenBed' }
    ],
    furnitureRepairTypes: [
      { value: 'תיקון ארונות קיר', key: 'filters.carpentry.repairWallClosets' },
      { value: 'תיקון שולחן', key: 'filters.carpentry.repairTable' },
      { value: 'תיקון כסאות', key: 'filters.carpentry.repairChairs' },
      { value: 'תיקון ארונות הזזה', key: 'filters.carpentry.repairSlidingClosets' },
      { value: 'תיקון ארונות אמבטיה', key: 'filters.carpentry.repairBathroomCabinets' },
      { value: 'תיקון חדר שינה', key: 'filters.carpentry.repairBedroomFurniture' },
      { value: 'תיקון מזנון', key: 'filters.carpentry.repairTvUnit' },
      { value: 'תיקון ספרייה', key: 'filters.carpentry.repairLibrary' },
      { value: 'תיקון רהיטים אחרים', key: 'filters.carpentry.repairOther' }
    ],
    otherCarpentryTypes: [
      { value: 'חיפוי עץ לקיר', key: 'filters.carpentry.wallCladding' },
      { value: 'פירוק והרכבת רהיטים', key: 'filters.carpentry.disassembly' },
      { value: 'תיקון ובניית דלתות', key: 'filters.carpentry.doorRepair' },
      { value: 'חידוש דלתות כניסה מעץ', key: 'filters.carpentry.doorRenovation' },
      { value: 'בניית קומת גלריה', key: 'filters.carpentry.loft' },
      { value: 'מדרגות עץ לבית', key: 'filters.carpentry.stairs' },
      { value: 'משרביות מעץ', key: 'filters.carpentry.lattice' },
      { value: 'בוצ\'ר עץ', key: 'filters.carpentry.butcher' }
    ],
    outdoorCarpentryTypes: [
      { value: 'פרגולות', key: 'filters.carpentry.pergolas' },
      { value: 'דקים', key: 'filters.carpentry.decks' },
      { value: 'גדרות ומחיצות עץ', key: 'filters.carpentry.fences' }
    ],
    pergolaTypes: [
      { value: 'פרגולות עץ', key: 'filters.carpentry.woodPergolas' },
      { value: 'פרגולות הצללה', key: 'filters.carpentry.shadePergolas' },
      { value: 'סגירת מרפסת', key: 'filters.carpentry.balconyEnclosure' }
    ],
    deckTypes: [
      { value: 'דקים מעץ טבעי', key: 'filters.carpentry.naturalWoodDecks' },
      { value: 'דק סינטטי (קומפוזיט)', key: 'filters.carpentry.compositeDecks' },
      { value: 'שיקום / חידוש דקים', key: 'filters.carpentry.deckRenovation' }
    ],
    fenceTypes: [
      { value: 'גדרות עץ', key: 'filters.carpentry.woodFences' },
      { value: 'מחיצות עץ לגינה', key: 'filters.carpentry.gardenPartitions' },
      { value: 'שערי עץ', key: 'filters.carpentry.woodGates' }
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
      { value: 'חיפוש ובדיקת שוכרים מתאימים', key: 'filters.property.tenantSearch' },
      { value: 'חתימה על חוזה וניהול ערבויות', key: 'filters.property.contractManagement' },
      { value: 'גביית שכ"ד והעברת תשלומים לבעל הדירה', key: 'filters.property.rentCollection' },
      { value: 'בדיקת מצב הנכס לפני ואחרי תקופת השכירות', key: 'filters.property.propertyInspection' },
      { value: 'העברת חשבונות השירותים (מים, חשמל, גז) על שם השוכר החדש', key: 'filters.property.utilityTransfer' }
    ],
    shortTermRental: [
      { value: 'פרסום וניהול מודעות באתרים', key: 'filters.property.listingManagement' },
      { value: 'ניהול הזמנות ותקשורת עם אורחים', key: 'filters.property.guestCommunication' },
      { value: 'קבלת אורחים / מסירת מפתחות', key: 'filters.property.guestCheckin' },
      { value: 'ניקיון בין השהיות', key: 'filters.property.turnaroundCleaning' },
      { value: 'בדיקה תקופתית של הנכס', key: 'filters.property.periodicInspection' },
      { value: 'תיקונים כלליים (חשמל, אינסטלציה, מזגן וכו׳)', key: 'filters.property.generalRepairs' }
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
      { value: 'סידור כללי', key: 'filters.organization.general' },
      { value: 'סידור + מיון', key: 'filters.organization.sorting' },
      { value: 'ארגון מקצועי', key: 'filters.organization.professional' }
    ],
    generalOrganizationTypes: [
      { value: 'סידור בית מלא', key: 'filters.organization.fullHouse' },
      { value: 'סידור חדרים', key: 'filters.organization.rooms' },
      { value: 'סידור מטבח', key: 'filters.organization.kitchen' },
      { value: 'סידור חדר ילדים', key: 'filters.organization.kidsRoom' },
      { value: 'סידור חדר ארונות / ארונות בגדים', key: 'filters.organization.closets' },
      { value: 'סידור חדר אמבטיה', key: 'filters.organization.bathroom' }
    ],
    sortingTypes: [
      { value: 'מיון חפצים', key: 'filters.organization.itemSorting' },
      { value: 'מיון בגדים', key: 'filters.organization.clothesSorting' },
      { value: 'מיון צעצועים', key: 'filters.organization.toySorting' },
      { value: 'הכנת חפצים למסירה / תרומה', key: 'filters.organization.donation' }
    ],
    professionalOrganizationTypes: [
      { value: 'יצירת פתרונות אחסון', key: 'filters.organization.storageSolutions' },
      { value: 'אופטימיזציה של חללים קטנים', key: 'filters.organization.smallSpaces' },
      { value: 'עיצוב וסידור מדפים', key: 'filters.organization.shelfDesign' }
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
      { value: 'צביעה כללית של דירה', key: 'filters.painting.generalPainting' },
      { value: 'תיקוני קירות – חורים, סדקים, שפכטל', key: 'filters.painting.wallRepairs' },
      { value: 'החלקת קירות (שפכטל מלא)', key: 'filters.painting.wallSmoothing' },
     { value: 'תיקון רטיבות / עובש', key: 'filters.painting.moistureMold' },  // ← était moistureRepair
      { value: 'קילופי צבע ישן', key: 'filters.painting.paintStripping' },
      { value: 'צביעת אפקטים – בטון, משי, אומבר', key: 'filters.painting.effectPainting' },
      { value: 'צביעת קיר דקורטיבי / Accent Wall', key: 'filters.painting.accentWall' },
      { value: 'טקסטורות מיוחדות', key: 'filters.painting.specialTextures' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // PRIVATE CHEF
  // ═══════════════════════════════════════════════════════════════
  private_chef: {
    sectionTitles: {
      providerType: 'filters.chef.providerType',
      eventType: 'filters.chef.eventType',
      workTypes: 'filters.chef.workTypes',
      cuisineTypes: 'filters.chef.cuisineType',
      kosherTypes: 'filters.chef.kosherTypes'
    },
    providerTypes: [
      { value: 'קייטרינג', key: 'filters.chef.caterer' },
      { value: 'שף פרטי', key: 'filters.chef.homeChef' }
    ],
    eventTypes: [
      { value: 'חתונה', key: 'filters.chef.wedding' },
      { value: 'בר מצווה', key: 'filters.chef.barMitsva' },
      { value: 'בת מצווה', key: 'filters.chef.batMitsva' },
      { value: 'ברית מילה', key: 'filters.chef.britMila' },
      { value: 'פדיון הבן', key: 'filters.chef.pidyonHaben' },
      { value: 'שבע ברכות', key: 'filters.chef.shevaBrahot' },
      { value: 'יום הולדת / יום שנה', key: 'filters.chef.anniversary' },
      { value: 'קידוש', key: 'filters.chef.kiddouch' },
      { value: 'שבת חתן', key: 'filters.chef.shabbatHatan' },
      { value: 'אירוע עסקי', key: 'filters.chef.corporateEvent' },
      { value: 'מסיבה פרטית', key: 'filters.chef.privateParty' },
      { value: 'חגיגה משפחתית', key: 'filters.chef.familyParty' },
      { value: 'אירוסין', key: 'filters.chef.engagement' }
    ],
    workTypes: [
      { value: 'סוג האירוע', key: 'filters.chef.eventType' },
      { value: 'סוג המטבח', key: 'filters.chef.cuisineType' },
      { value: 'כשרות', key: 'filters.chef.kashrut' }
    ],
    cuisineTypes: [
      { value: 'פיצות', key: 'filters.chef.pizza' },
      { value: 'סושי', key: 'filters.chef.sushi' },
      { value: 'סלטים', key: 'filters.chef.salads' },
      { value: 'אסייתי', key: 'filters.chef.asian' },
      { value: 'פסטות', key: 'filters.chef.pasta' },
      { value: 'בשרי', key: 'filters.chef.meat' },
      { value: 'טבעוני / צמחוני', key: 'filters.chef.vegan' },
      { value: 'לא גלוטן', key: 'filters.chef.glutenFree' },
      { value: 'קינוחים', key: 'filters.chef.desserts' }
    ],
    kosherTypes: [
    { value: 'בד"ץ העדה החרדית', key: 'filters.chef.badatzEdaChareidis' },  // ← était badatzEdaCharedit
      { value: 'בד"ץ בית יוסף', key: 'filters.chef.badatzBeitYosef' },
      { value: 'בד"ץ יורה דעה (ר׳ שלמה מחפוד)', key: 'filters.chef.badatzYoreDea' },
      { value: 'בד"ץ מחזיקי הדת – בעלז', key: 'filters.chef.badatzBelz' },
      { value: 'בד"ץ שארית ישראל', key: 'filters.chef.badatzSheerit' },
      { value: 'בד"ץ נתיבות כשרות', key: 'filters.chef.badatzNetivot' },
      { value: 'בד"ץ חוג חתם סופר בני ברק', key: 'filters.chef.badatzChatamBB' },
      { value: 'בד"ץ חוג חתם סופר פ״ת', key: 'filters.chef.badatzChatamPT' },
      { value: 'בד"ץ מקווה ישראל', key: 'filters.chef.badatzMikveh' },
      { value: 'בד"ץ רבני צפת', key: 'filters.chef.badatzTzfat' },
      { value: 'כשרות הרב לנדא', key: 'filters.chef.rabbiLanda' },
      { value: 'כשרות הרב רובין', key: 'filters.chef.rabbiRubin' },
      { value: 'רבנות מהדרין', key: 'filters.chef.rabbinateMethadrin' },
      { value: 'רבנות', key: 'filters.chef.rabbinate' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // EVENT ENTERTAINMENT
  // ═══════════════════════════════════════════════════════════════
  event_entertainment: {
    sectionTitles: {
      workTypes: 'filters.events.workTypes',
      equipmentRentalTypes: 'filters.events.equipmentRentalTypes',
      entertainmentTypes: 'filters.events.entertainmentTypes',
      otherTypes: 'filters.events.otherTypes'
    },
    workTypes: [
      { value: 'השכרת ציוד לאירועים', key: 'filters.events.equipmentRental' },
      { value: 'סוגי ההפעלה', key: 'filters.events.entertainmentServices' },
      { value: 'אחר', key: 'filters.events.other' }
    ],
    equipmentRentalCategories: [
      { value: '🍿 מכונות מזון', key: 'filters.events.foodMachines' },
      { value: '🎪 השכרת מתנפחים ומשחקים', key: 'filters.events.inflatables' },
      { value: '💨 מכונות אפקטים להשכרה', key: 'filters.events.effectMachines' }
    ],
    foodMachineTypes: [
      { value: 'מכונת פופקורן', key: 'filters.events.popcorn' },
      { value: 'מכונת סוכר-בורי', key: 'filters.events.cottonCandy' },
      { value: 'מכונת ברד', key: 'filters.events.slushie' },
      { value: 'מכונת וופל בלגי', key: 'filters.events.waffle' },
      { value: 'מכונת גרניטה וקפה בר', key: 'filters.events.granita' },
      { value: 'מכונת גלידה אמריקאית', key: 'filters.events.softServe' },
      { value: 'מכונת מילקשייק', key: 'filters.events.milkshake' },
      { value: 'מסחטת מיצים טריים', key: 'filters.events.juicer' },
      { value: 'מכונת נקניקיות', key: 'filters.events.hotdog' },
      { value: 'מחבת קרפים', key: 'filters.events.crepe' },
      { value: 'מזרקת שוקולד', key: 'filters.events.chocolateFountain' }
    ],
    inflatableGameTypes: [
      { value: 'מתנפחים', key: 'filters.events.bouncyHouses' },
      { value: 'ג\'ימבורי', key: 'filters.events.gymboree' },
      { value: 'עמדות משחק', key: 'filters.events.gameStations' }
    ],
    effectMachineTypes: [
      { value: 'מכונת עשן', key: 'filters.events.smokeMachine' },
      { value: 'מכונת שלג', key: 'filters.events.snowMachine' },
      { value: 'מכונת בועות', key: 'filters.events.bubbleMachine' }
    ],
    entertainmentTypes: [
      { value: 'קוסם ילדים', key: 'filters.events.magician' },
      { value: 'ליצן ילדים', key: 'filters.events.clown' },
      { value: 'בלוני צורות', key: 'filters.events.balloonArt' },
      { value: 'הפרחת בלונים / ניפוח בלונים במקום', key: 'filters.events.balloonInflation' },
      { value: 'דמויות ותחפושות', key: 'filters.events.costumes' },
      { value: 'שעשועונים ומשחקי קבוצה', key: 'filters.events.groupGames' },
      { value: 'מופע בועות סבון', key: 'filters.events.bubbleShow' },
      { value: 'הפעלה מוזיקלית / ריקודים', key: 'filters.events.musicDancing' }
    ],
    otherTypes: [
      { value: 'איפור פנים מקצועי', key: 'filters.events.facePainting' },
      { value: 'בלוני קשת', key: 'filters.events.balloonArch' },
      { value: 'צילום מגנטים', key: 'filters.events.photoMagnets' }
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
      { value: 'עבודות שלד', key: 'filters.contractor.structureWork' },
      { value: 'שיפוצים כלליים', key: 'filters.contractor.generalRenovation' },
      { value: 'חשמל ואינסטלציה', key: 'filters.contractor.electricPlumbing' },
      { value: 'עבודות חוץ', key: 'filters.contractor.exteriorWork' },
      { value: 'שיקום ותיקון חוץ', key: 'filters.contractor.facadeRepair' }
    ],
    structureWorkTypes: [
      { value: 'בניית שלד', key: 'filters.contractor.buildingFrame' },
      { value: 'יציקות בטון', key: 'filters.contractor.concretePours' },
      { value: 'טפסנות', key: 'filters.contractor.formwork' },
      { value: 'חיזוק מבנים', key: 'filters.contractor.structuralReinforcement' },
      { value: 'בניית קירות בלוקים', key: 'filters.contractor.blockWalls' },
      { value: 'הריסה ובנייה מחדש', key: 'filters.contractor.demolitionRebuild' }
    ],
    generalRenovationTypes: [
      { value: 'שיפוץ דירה מלא', key: 'filters.contractor.fullApartmentReno' },
      { value: 'שיפוץ חדרים', key: 'filters.contractor.roomRenovation' },
      { value: 'שיפוץ חדרי רחצה', key: 'filters.contractor.bathroomReno' },
      { value: 'שיפוץ מטבח', key: 'filters.contractor.kitchenReno' },
      { value: 'החלפת ריצוף', key: 'filters.contractor.flooringReplacement' },
      { value: 'עבודות גבס', key: 'filters.contractor.drywallWork' },
      { value: 'טיח ושפכטל', key: 'filters.contractor.plasterWork' },
      { value: 'סגירת מרפסת', key: 'filters.contractor.balconyEnclosure' },
      { value: 'צביעה מקצועית', key: 'filters.contractor.professionalPainting' },
      { value: 'החלפת דלתות ומשקופים', key: 'filters.contractor.doorFrameReplacement' }
    ],
    electricPlumbingTypes: [
      { value: 'עבודות חשמל', key: 'filters.contractor.electricalWork' },
      { value: 'החלפת לוח חשמל', key: 'filters.contractor.panelReplacement' },
      { value: 'אינסטלציה כללית', key: 'filters.contractor.generalPlumbing' },
      { value: 'החלפת צנרת', key: 'filters.contractor.pipeReplacement' },
      { value: 'איתור ותיקון נזילות', key: 'filters.contractor.leakDetection' }
    ],
    exteriorWorkTypes: [
      { value: 'ריצוף חוץ', key: 'filters.contractor.exteriorFlooring' },
      { value: 'בניית פרגולה', key: 'filters.contractor.pergolaConstruction' },
      { value: 'חיפויי אבן / חיפויי קירות חוץ', key: 'filters.contractor.stoneCladding' },
      { value: 'גידור', key: 'filters.contractor.fencing' },
      { value: 'בניית שבילים בגינה', key: 'filters.contractor.gardenPathways' }
    ],
    facadeRepairTypes: [
      { value: 'תיקון טיח חוץ', key: 'filters.contractor.exteriorPlasterRepair' },
      { value: 'שיקום קירות חיצוניים', key: 'filters.contractor.exteriorWallRestoration' },
      { value: 'איטום סדקים בקירות', key: 'filters.contractor.wallCrackSealing' },
      { value: 'טיפול בנפילת טיח', key: 'filters.contractor.fallingPlasterTreatment' }
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
      { value: 'חלונות ודלתות', key: 'filters.aluminum.windowsDoors' },
      { value: 'פרגולות ואלומיניום חוץ', key: 'filters.aluminum.pergolas' },
      { value: 'תיקונים ושירות', key: 'filters.aluminum.repairs' },
      { value: 'חיפויי אלומיניום', key: 'filters.aluminum.cladding' }
    ],
    windowsDoorsTypes: [
      { value: 'התקנת חלונות אלומיניום', key: 'filters.aluminum.installWindows' },
      { value: 'דלתות אלומיניום', key: 'filters.aluminum.aluminumDoors' },
      { value: 'דלתות הזזה (ויטרינות)', key: 'filters.aluminum.slidingDoors' },
      { value: 'דלתות כניסה מאלומיניום', key: 'filters.aluminum.entryDoors' },
      { value: 'רשתות נגד יתושים', key: 'filters.aluminum.mosquitoNets' },
      { value: 'תריסים ידניים', key: 'filters.aluminum.manualShutters' },
      { value: 'תריסים חשמליים', key: 'filters.aluminum.electricShutters' }
    ],
    pergolasOutdoorTypes: [
      { value: 'פרגולות אלומיניום', key: 'filters.aluminum.aluminumPergolas' },
      { value: 'סגירת מרפסות', key: 'filters.aluminum.balconyEnclosure' },
      { value: 'חיפויי אלומיניום חיצוניים', key: 'filters.aluminum.exteriorCladding' },
      { value: 'מעקות אלומיניום לגינה / מרפסות', key: 'filters.aluminum.railings' }
    ],
    repairsServiceTypes: [
      { value: 'תיקון מנועי תריס חשמלי', key: 'filters.aluminum.repairShutterMotor' },
      { value: 'תיקון מסילות', key: 'filters.aluminum.repairTracks' },
      { value: 'תיקון גלגלים בחלונות', key: 'filters.aluminum.repairWheels' },
      { value: 'החלפת ידיות / צירים', key: 'filters.aluminum.replaceHandles' },
      { value: 'איטום וחידוש מסביב לחלונות', key: 'filters.aluminum.sealingRenewal' },
      { value: 'תיקון תריסים ידניים', key: 'filters.aluminum.repairManualShutters' }
    ],
    claddingTypes: [
      { value: 'חיפוי צנרת / כיסוי צינורות', key: 'filters.aluminum.pipeCovering' },
      { value: 'חיפוי מונים (חשמל / מים / גז)', key: 'filters.aluminum.meterCovering' },
      { value: 'ארגזים דקורטיביים מאלומיניום', key: 'filters.aluminum.decorativeBoxes' },
      { value: 'חיפוי קווי מזגן', key: 'filters.aluminum.acLineCovering' },
      { value: 'הגנה למנוע מזגן חיצוני', key: 'filters.aluminum.acMotorProtection' },
      { value: 'חיפוי קירות חוץ מאלומיניום', key: 'filters.aluminum.wallCladding' },
      { value: 'חיפויים דקורטיביים', key: 'filters.aluminum.decorativeCladding' },
      { value: 'חיפוי וארגזי תריס', key: 'filters.aluminum.shutterBoxCladding' }
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
      { value: 'זכוכית למקלחונים', key: 'filters.glass.showers' },
      { value: 'זכוכית לחלונות ודלתות', key: 'filters.glass.homeGlass' },
      { value: 'זכוכית למטבח ובית', key: 'filters.glass.furniture' },
      { value: 'זכוכית מיוחדת ובטיחות', key: 'filters.glass.partitions' },
      { value: 'שירותי תיקון והתאמה אישית', key: 'filters.glass.repairs' }
    ],
    showerGlassTypes: [
      { value: 'התקנת מקלחון זכוכית', key: 'filters.glass.showerInstall' },
      { value: 'תיקון מקלחון', key: 'filters.glass.showerRepair' },
      { value: 'החלפת זכוכית במקלחון', key: 'filters.glass.showerGlassReplacement' },
      { value: 'דלתות מקלחת', key: 'filters.glass.showerDoors' }
    ],
    windowsDoorGlassTypes: [
      { value: 'החלפת זכוכית בחלון', key: 'filters.glass.windowReplacement' },
      { value: 'זכוכית מבודדת (Double)', key: 'filters.glass.doubleGlazing' },
      { value: 'זיגוג מחדש', key: 'filters.glass.reglazing' },
      { value: 'דלתות זכוכית פנימיות', key: 'filters.glass.interiorGlassDoors' },
      { value: 'מחיצות זכוכית', key: 'filters.glass.glassPartitions' }
    ],
    kitchenHomeGlassTypes: [
      { value: 'זכוכית למטבח (Backsplash)', key: 'filters.glass.kitchenBacksplash' },
      { value: 'מדפי זכוכית', key: 'filters.glass.glassShelves' },
      { value: 'שולחנות זכוכית', key: 'filters.glass.glassTables' },
      { value: 'מראות לחדר אמבטיה', key: 'filters.glass.bathroomMirrors' },
      { value: 'מראות דקורטיביות', key: 'filters.glass.decorativeMirrors' }
    ],
    specialSafetyGlassTypes: [
      { value: 'זכוכית מחוסמת (בטיחותית)', key: 'filters.glass.temperedGlass' },
      { value: 'זכוכית חכמה', key: 'filters.glass.smartGlass' },
      { value: 'זכוכית עמידה לפריצה', key: 'filters.glass.securityGlass' },
      { value: 'זכוכית אקוסטית (בידוד רעש)', key: 'filters.glass.acousticGlass' },
      { value: 'זכוכית צבעונית / מעוצבת', key: 'filters.glass.decorativeGlass' }
    ],
    repairCustomTypes: [
      { value: 'תיקון שריטות וסדקים', key: 'filters.glass.scratchRepair' },
      { value: 'ליטוש זכוכית', key: 'filters.glass.glassPolishing' },
      { value: 'חיתוך זכוכית לפי מידה', key: 'filters.glass.customCutting' }
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
      { value: 'החלפת מנעולים', key: 'filters.locksmith.lockReplacement' },
      { value: 'פתיחת דלתות', key: 'filters.locksmith.emergencyOpening' },
      { value: 'התקנת מערכות נעילה', key: 'filters.locksmith.advancedSystems' },
      { value: 'תיקון מנעולים ודלתות', key: 'filters.locksmith.doorRepair' },
      { value: 'שירותי ביטחון', key: 'serviceForm.locksmith.securityServices' }
    ],
    lockReplacementTypes: [
      { value: 'מנעול צילינדר', key: 'filters.locksmith.cylinderLock' },
      { value: 'מנעול ביטחון', key: 'filters.locksmith.securityLock' },
      { value: 'מנעול דלת כניסה', key: 'filters.locksmith.entranceLock' },
      { value: 'מנעול למשרד / חנות', key: 'filters.locksmith.officeLock' }
    ],
    doorOpeningTypes: [
      { value: 'פתיחת דלת ללא נזק', key: 'filters.locksmith.noDamageOpening' },
      { value: 'פתיחה חירום 24/7', key: 'filters.locksmith.emergency247' },
      { value: 'פתיחת כספת', key: 'filters.locksmith.safeOpening' },
      { value: 'שכפול מפתחות במקום', key: 'filters.locksmith.keyDuplication' }
    ],
    lockSystemInstallationTypes: [
      { value: 'מנעולים חכמים', key: 'filters.locksmith.smartLocks' },
      { value: 'מערכת אינטרקום', key: 'filters.locksmith.intercom' },
      { value: 'קוד כניסה למשרדים', key: 'filters.locksmith.accessCode' },
      { value: 'מנעול אלקטרוני', key: 'filters.locksmith.electronicLock' }
    ],
    lockDoorRepairTypes: [
      { value: 'תיקון מנעול תקוע', key: 'filters.locksmith.stuckLockRepair' },
      { value: 'תיקון ציר דלת', key: 'filters.locksmith.hingeRepair' },
      { value: 'שיוף דלת שלא נסגרת', key: 'filters.locksmith.doorSanding' },
      { value: 'החלפת ידית דלת', key: 'filters.locksmith.handleReplacement' }
    ],
    securityServicesTypes: [
      { value: 'שדרוג מערכת ביטחון', key: 'filters.locksmith.securityUpgrade' },
      { value: 'התקנת דלת ביטחון', key: 'filters.locksmith.securityDoorInstall' },
      { value: 'בדיקת פגיעות דלת', key: 'filters.locksmith.vulnerabilityCheck' },
      { value: 'שירות מסגרות מסחרי', key: 'filters.locksmith.commercialLocksmith' }
    ]
  },
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
    return days.filter(d => d.value !== 'שבת').map(d => ({
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