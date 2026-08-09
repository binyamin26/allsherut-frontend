// Mapping des valeurs hébreues (stockées en BDD) vers les clés de traduction
// SYNCHRONISÉ AVEC filterConfig.js

const translationMappings = {
  // ═══════════════════════════════════════════════════════════════
  // JOURS (common.days)
  // ═══════════════════════════════════════════════════════════════
  days: {
    'ראשון': 'days.sunday',
    'שני': 'days.monday',
    'שלישי': 'days.tuesday',
    'רביעי': 'days.wednesday',
    'חמישי': 'days.thursday',
    'שישי': 'days.friday',
    'שבת': 'days.saturday',
    'כל השבוע': 'days.allWeek',
  },

  // ═══════════════════════════════════════════════════════════════
  // HEURES (common.hours)
  // ═══════════════════════════════════════════════════════════════
  hours: {
    'בוקר': 'hours.morning',
    'צהריים': 'hours.noon',
    'אחר הצהריים': 'hours.afternoon',
    'ערב': 'hours.evening',
    'לילה': 'hours.night',
    'הכל': 'hours.all',
    '24/7': 'hours.twentyFourSeven',
    '24/6': 'hours.twentyFourSix',
  },

  // ═══════════════════════════════════════════════════════════════
  // LANGUES (common)
  // ═══════════════════════════════════════════════════════════════
  languages: {
    'עברית': 'languages.hebrew',
    'רוסית': 'languages.russian',
    'אנגלית': 'languages.english',
    'ספרדית': 'languages.spanish',
    'צרפתית': 'languages.french',
  },

  // ═══════════════════════════════════════════════════════════════
  // NIVEAUX RELIGIEUX
  // ═══════════════════════════════════════════════════════════════
  religiousLevels: {
    'חילוני': 'filters.religious.secular',
    'מסורתי': 'filters.religious.traditional',
    'דתי': 'filters.religious.religious',
    'חרדי': 'filters.religious.orthodox',
  },

  // ═══════════════════════════════════════════════════════════════
  // BABYSITTING
  // ═══════════════════════════════════════════════════════════════
  babysittingAgeGroups: {
    '0-1 שנה': 'filters.babysitting.age0to1',
    '1-3 שנים': 'filters.babysitting.age1to3',
    '3-6 שנים': 'filters.babysitting.age3to6',
    '6+ שנים': 'filters.babysitting.age6plus',
  },
  babysittingTypes: {
    'שמרטפות מזדמנת': 'filters.babysitting.occasional',
    'שמרטפות קבועה בבית הלקוח': 'filters.babysitting.regular',
    'הוצאה מהגן / מבית-הספר': 'filters.babysitting.pickup',
    'שמירה בלילה': 'filters.babysitting.nightCare',
    'שמירה בזמן חופשות': 'filters.babysitting.holidayCare',
    'עזרה בשיעורי בית': 'filters.babysitting.homework',
    'מטפלת במשרה מלאה': 'filters.babysitting.fullTime',
    'קייטנת קיץ': 'filters.babysitting.summerCamp',
    'קייטנת חורף': 'filters.babysitting.winterCamp',
  },
  babysittingCertifications: {
    'הכשרה בתחום החינוך המיוחד': 'filters.babysitting.certSpecialEd',
    'קורס עזרה ראשונה': 'filters.babysitting.certFirstAid',
    'ניסיון בגני ילדים או מעונות': 'filters.babysitting.certKindergarten',
  },

  // ═══════════════════════════════════════════════════════════════
  // TUTORING
  // ═══════════════════════════════════════════════════════════════
  tutoringLevels: {
    'יסודי': 'filters.tutoring.elementary',
    'חטיבת ביניים': 'filters.tutoring.middleSchool',
    'תיכון': 'filters.tutoring.highSchool',
    'בגרות': 'filters.tutoring.matriculation',
    'מכינה': 'filters.tutoring.preAcademic',
    'אקדמי': 'filters.tutoring.academic',
    'מבוגרים': 'filters.tutoring.adults',
  },
  tutoringMode: {
    'פרונטלי בלבד': 'filters.tutoring.inPersonOnly',
    'אונליין בלבד': 'filters.tutoring.onlineOnly',
    'שניהם': 'filters.tutoring.both',
  },
  tutoringSpecializations: {
    'הכנה לבחינות': 'filters.tutoring.examPrep',
    'הפרעות למידה': 'filters.tutoring.learningDisabilities',
  },

  // ═══════════════════════════════════════════════════════════════
  // CLEANING
  // ═══════════════════════════════════════════════════════════════
  cleaningLegalStatus: {
    'חברה': 'filters.cleaning.company',
    'עצמאי': 'filters.cleaning.independent',
  },
  cleaningHome: {
    'ניקיון שוטף': 'filters.cleaning.regularCleaning',
    'ניקיון פסח': 'filters.cleaning.passoverCleaning',
    'ניקיון אחרי שיפוץ': 'filters.cleaning.postRenovation',
    'ניקיון לדירות Airbnb': 'filters.cleaning.airbnb',
  },
  cleaningOffice: {
    'משרדים': 'filters.cleaning.offices',
    'חנויות': 'filters.cleaning.stores',
    'בניינים': 'filters.cleaning.buildings',
    'מוסדות חינוך': 'filters.cleaning.educationalInstitutions',
    'מפעלים': 'filters.cleaning.factories',
  },
  cleaningSpecial: {
    'ניקוי חלונות בגובה ': 'filters.cleaning.highWindows',
    'ניקוי חלונות': 'filters.cleaning.highWindows',
    'ניקוי שטיחים': 'filters.cleaning.carpets',
    'ניקוי ספות': 'filters.cleaning.sofas',
    'ניקוי וילונות': 'filters.cleaning.curtains',
    'ניקוי בלחץ מים (טרסות, חזיתות)': 'filters.cleaning.pressureWashing',
    'חיטוי וניקיון אחרי נזק (שריפה / הצפה)': 'filters.cleaning.damageCleanup',
    'ניקוי מזגן': 'filters.cleaning.acCleaning',
    'ניקיון גגות רעפים': 'filters.cleaning.roofCleaning',
  },
  cleaningAdditional: {
    'ניקוי רכב בבית הלקוח': 'filters.cleaning.carCleaning',
    'ניקוי פאנלים סולאריים': 'filters.cleaning.solarPanels',
    'גיהוץ בבית הלקוח': 'filters.cleaning.ironingAtHome',
    'קיפול כביסה': 'filters.cleaning.laundryFolding',
  },
  cleaningMaterials: {
    'yes': 'filters.cleaning.providesEquipment',
    'no': 'filters.cleaning.noEquipment',
    'partial': 'filters.cleaning.partialEquipment',
  },

  // ═══════════════════════════════════════════════════════════════
  // ELDERCARE
  // ═══════════════════════════════════════════════════════════════
  eldercareTypes: {
    'ליווי ותמיכה': 'filters.eldercare.companionship',
    'עזרה בניקיון הבית': 'filters.eldercare.houseCleaning',
    'בישול והכנת אוכל': 'filters.eldercare.cooking',
    'קניות ומשימות': 'filters.eldercare.errands',
    'מתן תרופות': 'filters.eldercare.medication',
    'ליווי לרופאים': 'filters.eldercare.doctorAccompaniment',
    // Clés anglaises (format alternatif)
    'companionship': 'filters.eldercare.companionship',
    'houseCleaning': 'filters.eldercare.houseCleaning',
    'cooking': 'filters.eldercare.cooking',
    'errands': 'filters.eldercare.errands',
    'medication': 'filters.eldercare.medication',
    'doctorAccompaniment': 'filters.eldercare.doctorAccompaniment',
  },
  eldercareConditions: {
    'אלצהיימר': 'filters.eldercare.alzheimers',
    'פרקינסון': 'filters.eldercare.parkinsons',
    'סוכרת': 'filters.eldercare.diabetes',
    'בעיות ניידות': 'filters.eldercare.mobilityIssues',
    'דמנציה': 'filters.eldercare.dementia',
  },

  // ═══════════════════════════════════════════════════════════════
  // PETCARE
  // ═══════════════════════════════════════════════════════════════
  petcareAnimals: {
    'כלבים': 'filters.petcare.dogs',
    'חתולים': 'filters.petcare.cats',
    'ציפורים': 'filters.petcare.birds',
    'מכרסמים קטנים': 'filters.petcare.smallRodents',
    'דגים': 'filters.petcare.fish',
    'זוחלים': 'filters.petcare.reptiles',
  },
  petcareDogSizes: {
    'קטן / עד 10 ק״ג': 'filters.petcare.smallDog',
    'בינוני / 10–25 ק״ג': 'filters.petcare.mediumDog',
    'גדול / 25–40 ק״ג': 'filters.petcare.largeDog',
    'ענק / מעל 40 ק״ג': 'filters.petcare.giantDog',
    // Versions courtes (legacy)
    'קטן': 'filters.petcare.smallDog',
    'בינוני': 'filters.petcare.mediumDog',
    'גדול': 'filters.petcare.largeDog',
    'ענק': 'filters.petcare.giantDog',
  },
  petcareLocation: {
    'בבית הלקוח': 'filters.petcare.clientHome',
    'בביתי': 'filters.petcare.caregiverHome',
    'שניהם': 'filters.common.both',
  },
  petcareServices: {
    'הליכת כלבים': 'filters.petcare.dogWalking',
    'רחצה וטיפוח': 'filters.petcare.bathingGrooming',
    'אילוף בסיסי': 'filters.petcare.basicTraining',
    'מתן תרופות': 'filters.petcare.medicationAdmin',
    'האכלה בזמן השמירה': 'filters.petcare.feeding',
    'ניקוי ארגז חול / כלוב / אקווריום': 'filters.petcare.cleaning',
    'עדכון תמונות לבעלים': 'filters.petcare.photoUpdates',
    'שהייה ביום בלבד': 'filters.petcare.daytimeOnly',
    'לינה ללילה': 'filters.petcare.overnight',
  },
  petcareFacilities: {
    'גינה מגודרת': 'filters.petcare.fencedGarden',
    'חצר גדולה': 'filters.petcare.largeYard',
    'מזגן': 'filters.petcare.airConditioning',
  },
  petcareVeterinary: {
    'ביקור וטרינר': 'filters.petcare.vetVisit',
    'טיפול בסיסי': 'filters.petcare.basicCare',
  },

  // ═══════════════════════════════════════════════════════════════
  // GARDENING
  // ═══════════════════════════════════════════════════════════════
  gardeningServices: {
    'גיזום עצים ושיחים': 'filters.gardening.pruning',
    'עיצוב גינה': 'filters.gardening.design',
    'שתילת צמחים': 'filters.gardening.planting',
    'השקיה': 'filters.gardening.irrigation',
    'דישון': 'filters.gardening.fertilizing',
    'ניכוש עשבים': 'filters.gardening.weeding',
    'תחזוקה כללית': 'filters.gardening.generalMaintenance',
  },
  gardeningSeasons: {
    'כל השנה': 'filters.gardening.allYear',
    'אביב': 'filters.gardening.spring',
    'קיץ': 'filters.gardening.summer',
    'סתיו': 'filters.gardening.autumn',
    'חורף': 'filters.gardening.winter',
  },
  gardeningEquipment: {
    'מכסחת דשא': 'filters.gardening.lawnMower',
    'מזמרות גיזום': 'filters.gardening.pruningShears',
    'משאבת מים': 'filters.gardening.waterPump',
    'כלים ידניים': 'filters.gardening.handTools',
    'מפזר דשן': 'filters.gardening.fertilizerSpreader',
    'מערכת השקיה': 'filters.gardening.irrigationSystem',
  },
  gardeningSpecializations: {
    'הכשרה גנן סוג א': 'filters.gardening.gardenerTypeA',
    'הכשרה גנן סוג ב': 'filters.gardening.gardenerTypeB',
    'אילני אגרונום': 'filters.gardening.agronomist',
    'גוזם מומחה': 'filters.gardening.expertPruner',
  },
  gardeningAdditional: {
    'פינוי פסולת גינה': 'filters.gardening.wasteRemoval',
    'ייעוץ עיצוב נוף': 'filters.gardening.landscapeConsulting',
  },

  // ═══════════════════════════════════════════════════════════════
  // LAUNDRY
  // ═══════════════════════════════════════════════════════════════
  laundryServices: {
    'איסוף והחזרת כביסה (שירות משלוחים)': 'filters.laundry.pickupDelivery',
    'ניקוי יבש / שירות מכבסה': 'filters.laundry.dryCleaning',
    'כביסת מצעים, מגבות, וילונות': 'filters.laundry.linens',
    'כביסה תעשייתית (מלונות, מסעדות)': 'filters.laundry.industrial',
  },

  // ═══════════════════════════════════════════════════════════════
  // ELECTRICIAN
  // ═══════════════════════════════════════════════════════════════
  electricianWorkTypes: {
    'תיקונים': 'filters.electrician.repairs',
    'התקנות': 'filters.electrician.installations',
    'עבודות חשמל גדולות': 'filters.electrician.largeElectricalWork',
  },
  electricianRepairs: {
    'תיקון מזגן': 'filters.ac.acRepair',
    'תיקון מזגן מעובש': 'filters.ac.moldyAcRepair',
    'תיקון מיזוג מיני מרכזי': 'filters.ac.miniCentralRepair',
    'תיקון דליפת גז במזגן': 'filters.ac.gasLeakRepair',
    'תיקון מיזוג מרכזי': 'filters.ac.centralRepair',
    'תיקון מזגן אינוורטר': 'filters.ac.inverterRepair',
    'תיקון מזגן VRF': 'filters.ac.vrfRepair',
    'ניקוי יסודי': 'filters.ac.filterCleaning',
    "תיקון צ'ילרים": 'filters.ac.chillerRepair',
    'טכנאי חדרי קירור': 'filters.ac.coldRoomTech',
    'מילוי גז': 'filters.ac.gasRefill',
    'תיקון קצר': 'filters.electrician.shortCircuitRepair',
    'תיקון טיימר': 'filters.electrician.timerRepair',
    'תיקון לוח חשמל': 'filters.electrician.panelRepair',
    'החלפת שקעים': 'filters.electrician.outletReplacement',
    'תיקון\\החלפת ספוטים': 'filters.electrician.spotlightRepair',
    'תיקונים אחרים': 'filters.electrician.otherRepairs',
    'החלפת אוטומט חדר מדרגות': 'filters.electrician.stairwaySwitch',
  },
  electricianInstallations: {
    'התקנת מאוורר תקרה': 'filters.electrician.ceilingFan',
    'התקנת שקע חשמל': 'filters.electrician.outletInstall',
    'התקנת נקודת חשמל חדשה': 'filters.electrician.newOutlet',
    'התקנת אטמור': 'filters.electrician.waterHeater',
    'התקנת מתג': 'filters.electrician.switchInstall',
    'עמדת טעינה לרכב חשמלי': 'filters.electrician.evCharger',
    'התקנת שעון שבת': 'filters.electrician.shabbatTimer',
    'התקנות אחרות': 'filters.electrician.otherInstall',
    'עמדת טעינה לרכב חשמלי של חברת EV-Meter': 'filters.electrician.evMeter',
    'התקנות כיריים אינדוקציה': 'filters.electrician.inductionCooktop',
    'התקנת תנור אמבטיה': 'filters.electrician.bathroomHeater',
    'התקנת גנרטור לבית פרטי': 'filters.electrician.generator',
    'התקנת ונטה': 'filters.electrician.ventaInstall',
    'עמדת טעינה לרכב חשמלי EV-EDGE': 'filters.electrician.evEdge',
  },
  electricianLargeWork: {
    'בניית תשתית חשמל בכל הבית': 'filters.electrician.newInfrastructure',
    'החלפת תשתית חשמל בכל הבית': 'filters.electrician.replaceInfrastructure',
    'החלפת לוח חשמל': 'filters.electrician.panelReplacement',
    'הארקה': 'filters.electrician.grounding',
    'החלפה לתלת פאזי': 'filters.electrician.threePhase',
    'הכנה לביקורת עבור חברת חשמל': 'filters.electrician.inspection',
  },

  // ═══════════════════════════════════════════════════════════════
  // PLUMBING
  // ═══════════════════════════════════════════════════════════════
  plumbingWorkTypes: {
    'סתימות': 'filters.plumbing.blockages',
    'תיקון צנרת': 'filters.plumbing.pipeRepair',
    'עבודות גדולות': 'filters.plumbing.largeWork',
    'תיקון והתקנת אביזרי אינסטלציה': 'filters.plumbing.fixtureRepair',
  },
  plumbingBlockages: {
    'פתיחת סתימה בבית': 'filters.plumbing.homeBlockage',
    'משאבה טבולה': 'filters.plumbing.submersiblePump',
    'פתיחת סתימה בבנין': 'filters.plumbing.buildingBlockage',
  },
  plumbingPipeRepair: {
    'תיקון צנרת גברית': 'filters.plumbing.malePipeRepair',
    'תיקון נזקי צנרת בבית': 'filters.plumbing.homePipeDamage',
    'תיקון נזקי צנרת בבניין': 'filters.plumbing.buildingPipeDamage',
    'הגברת לחץ מים': 'filters.plumbing.pressureBoost',
    'תיקון צנרת בגינה': 'filters.plumbing.gardenPipes',
    'תיקוני צנרת אחרים': 'filters.plumbing.otherPipeRepairs',
    'תיקון צנרת ביוב ללא הרס': 'filters.plumbing.sewerNonDestructive',
    'איתור נזילות': 'filters.plumbing.leakDetection',
  },
  plumbingLargeWork: {
    'החלפת צנרת בבית': 'filters.plumbing.homePipeReplacement',
    'החלפת צנרת בבניין': 'filters.plumbing.buildingPipeReplacement',
    'התקנת נקודות מים חדשות': 'filters.plumbing.newWaterPoints',
    'החלפת קו ביוב בבית': 'filters.plumbing.homeSewerReplacement',
    'החלפת קו ביוב בבניין': 'filters.plumbing.buildingSewerReplacement',
    'הקמת קו ביוב חדש': 'filters.plumbing.newSewerLine',
    'החלפת צנרת בגינה': 'filters.plumbing.gardenPipeReplacement',
    'התקנת מזח': 'filters.plumbing.pierInstallation',
  },
  plumbingFixtures: {
    'התקנת בר מים': 'filters.plumbing.waterBar',
    'ניאגרה סמויה': 'filters.plumbing.concealedCistern',
    'ברזים': 'filters.plumbing.faucets',
    'ניאגרות ואסלות': 'filters.plumbing.toilets',
    'מסנני מים': 'filters.plumbing.waterFilters',
    'התקנת טוחן אשפה': 'filters.plumbing.garbageDisposal',
    'תיקון טוחן אשפה': 'filters.plumbing.disposalRepair',
    'כיורים': 'filters.plumbing.sinks',
    'הכנה למדיח כלים': 'filters.plumbing.dishwasherPrep',
    'אגנית למקלחון': 'filters.plumbing.showerBase',
    'אביזרים אחרים': 'filters.plumbing.otherFixtures',
    'סילוקית לאסלה': 'filters.plumbing.toiletFlush',
    'התקנת בידה': 'filters.plumbing.bidet',
    'אסלה תלויה': 'filters.plumbing.wallMountedToilet',
    'אל חוזר לשעון מים': 'filters.plumbing.checkValve',
    'התקנת מערכות מים תת כיוריות': 'filters.plumbing.underSinkSystems',
    'התקנת דוד שמש': 'filters.plumbing.solarHeaterInstall',
    'תיקון דוד שמש': 'filters.plumbing.solarHeaterRepair',
  },

  // ═══════════════════════════════════════════════════════════════
  // AIR CONDITIONING
  // ═══════════════════════════════════════════════════════════════
  acWorkTypes: {
    'התקנת מזגנים': 'filters.ac.installation',
    'תיקון מזגנים': 'filters.ac.repair',
    'פירוק והרכבת מזגנים': 'filters.ac.disassembly',
  },
  acInstallation: {
    'התקנת מזגן': 'filters.ac.acInstall',
    'התקנת מיזוג מיני מרכזי': 'filters.ac.miniCentralInstall',
    'התקנת מיזוג מרכזי': 'filters.ac.centralInstall',
    'התקנת מזגן אינוורטר': 'filters.ac.inverterInstall',
    'התקנת מזגן מולטי אינוורטר': 'filters.ac.multiInverterInstall',
    'התקנת מזגן VRF': 'filters.ac.vrfInstall',
  },
  acRepair: {
    'תיקון מזגן': 'filters.ac.acRepair',
    'תיקון מזגן מעובש': 'filters.ac.moldyAcRepair',
    'תיקון מיזוג מיני מרכזי': 'filters.ac.miniCentralRepair',
    'תיקון דליפת גז במזגן': 'filters.ac.gasLeakRepair',
    'תיקון מיזוג מרכזי': 'filters.ac.centralRepair',
    'תיקון מזגן אינוורטר': 'filters.ac.inverterRepair',
    'תיקון מזגן VRF': 'filters.ac.vrfRepair',
    'ניקוי יסודי': 'filters.ac.filterCleaning',
    "תיקון צ'ילרים": 'filters.ac.chillerRepair',
    'טכנאי חדרי קירור': 'filters.ac.coldRoomTech',
    'מילוי גז': 'filters.ac.gasRefill',
  },
  acDisassembly: {
    'פירוק והרכבת מזגן': 'filters.ac.acDisassembly',
    'פירוק מיזוג מיני מרכזי': 'filters.ac.miniCentralDisassembly',
    'פירוק מיזוג מרכזי': 'filters.ac.centralDisassembly',
    'פירוק מזגן אינוורטר': 'filters.ac.inverterDisassembly',
    'פירוק מזגן VRF': 'filters.ac.vrfDisassembly',
  },

  // ═══════════════════════════════════════════════════════════════
  // GAS TECHNICIAN
  // ═══════════════════════════════════════════════════════════════
  gasWorkTypes: {
    'התקנת צנרת גז בבית': 'filters.gas.pipeInstallation',
    'תיקוני גז בבית': 'filters.gas.repairs',
  },
  gasInstallation: {
    'הזזת\\התקנת נקודת גז': 'filters.gas.gasPointInstall',
    'התקנת כיריים גז': 'filters.gas.stovetopInstall',
    'התקנת צינור גז': 'filters.gas.pipeInstall',
    'התקנת גריל גז': 'filters.gas.grillInstall',
    'התקנת חימום מים בגז': 'filters.gas.waterHeaterInstall',
    'התקנת חגז': 'filters.gas.hagaz',
    'בניית תשתית גז במבנה חדש': 'filters.gas.newBuildingInfra',
    'שירותי גז לעסקים': 'filters.gas.businessServices',
  },
  gasRepair: {
    'תיקון כיריים גז': 'filters.gas.stovetopRepair',
    'תיקון צנרת גז': 'filters.gas.pipeRepair',
  },
  gasLicenseTypes: {
    'רמה 1': 'filters.gas.licenseLevel1',
    'רמה 2': 'filters.gas.licenseLevel2',
  },

  // ═══════════════════════════════════════════════════════════════
  // DRIVER
  // ═══════════════════════════════════════════════════════════════
  driverServiceType: {
    'דרייבר': 'serviceForm.driver.privateDriver',
    'מונית': 'serviceForm.driver.taxi',
  },

  // ═══════════════════════════════════════════════════════════════
  // MECHANIC
  // ═══════════════════════════════════════════════════════════════
  mechanicWorkTypes: {
    'מכונאות רכב':    'serviceForm.mechanic.carMechanics',
    'הכנה לטסט':     'serviceForm.mechanic.testPrep',
    'טיפולים שוטפים': 'serviceForm.mechanic.routineMaintenance',
    'בדיקות מחשב':   'serviceForm.mechanic.computerDiagnostics',
    'מצברים':         'serviceForm.mechanic.batteries',
    'מיזוג אוויר':   'serviceForm.mechanic.airConditioning',
    'אלטרנטור':       'serviceForm.mechanic.alternator',
    'תיקוני מנוע':   'serviceForm.mechanic.engineRepairs',
    'רדיאטור וקירור': 'serviceForm.mechanic.radiatorCooling',
    'לקיחת רכב לטסט': 'serviceForm.mechanic.vehicleInspection',
  },

  // ═══════════════════════════════════════════════════════════════
  // DRYWALL
  // ═══════════════════════════════════════════════════════════════
  drywallWorkTypes: {
    'עיצובים בגבס': 'filters.drywall.design',
    'עבודות גבס': 'filters.drywall.construction',
  },
  drywallDesign: {
    'נישות גבס': 'filters.drywall.niches',
    'מזנון גבס': 'filters.drywall.tvUnit',
    'ספריות גבס': 'filters.drywall.libraries',
    'כוורות גבס': 'filters.drywall.shelves',
    'תאורה נסתרת בגבס': 'filters.drywall.hiddenLighting',
    'קרניז גבס מעוגל': 'filters.drywall.roundedCornice',
    'קשתות גבס': 'filters.drywall.arches',
    'תקרה צפה': 'filters.drywall.floatingCeiling',
    'קיר צף': 'filters.drywall.floatingWall',
  },
  drywallConstruction: {
    'בניית קירות גבס': 'filters.drywall.walls',
    'בניית תקרות גבס': 'filters.drywall.ceilings',
    'בניית מדפי גבס': 'filters.drywall.shelfConstruction',
    'הנמכת תקרה למזגן': 'filters.drywall.acDropCeiling',
    'חיפוי גבס לצנרת': 'filters.drywall.pipeCovering',
    'בניית סינר\\קרניז גבס': 'filters.drywall.cornice',
    'בידוד אקוסטי': 'filters.drywall.acousticInsulation',
  },

  // ═══════════════════════════════════════════════════════════════
  // CARPENTRY
  // ═══════════════════════════════════════════════════════════════
  carpentryWorkTypes: {
    'בניית רהיטים': 'filters.carpentry.furnitureBuilding',
    'תיקון רהיטים': 'filters.carpentry.furnitureRepair',
    'עבודות נגרות אחרות': 'filters.carpentry.otherWork',
    'נגרות חוץ': 'filters.carpentry.outdoorCarpentry',
  },
  carpentryFurnitureBuilding: {
    'בניית ארונות קיר': 'filters.carpentry.wallClosets',
    'בניית ארונות הזזה': 'filters.carpentry.slidingClosets',
    'בניית ארונות אמבטיה': 'filters.carpentry.bathroomCabinets',
    'בניית חדר שינה': 'filters.carpentry.bedroomFurniture',
    'בניית שולחן': 'filters.carpentry.tableBuilding',
    'בניית כסאות': 'filters.carpentry.chairBuilding',
    'בניית מזנון': 'filters.carpentry.tvUnitBuilding',
    'בניית ספריה': 'filters.carpentry.libraryBuilding',
    'בניית רהיטים ייחודים': 'filters.carpentry.customFurniture',
    'בניית מדפים': 'filters.carpentry.shelfBuilding',
    'בניית חדר ארונות': 'filters.carpentry.walkInCloset',
    'בניית מיטה מעץ': 'filters.carpentry.woodenBed',
    'בניית ארונות מטבח': 'filters.carpentry.kitchenFurniture',
  },
  carpentryFurnitureRepair: {
    'תיקון ארונות קיר': 'filters.carpentry.repairWallClosets',
    'תיקון שולחן': 'filters.carpentry.repairTable',
    'תיקון כסאות': 'filters.carpentry.repairChairs',
    'תיקון ארונות הזזה': 'filters.carpentry.repairSlidingClosets',
    'תיקון ארונות אמבטיה': 'filters.carpentry.repairBathroomCabinets',
    'תיקון חדר שינה': 'filters.carpentry.repairBedroomFurniture',
    'תיקון מזנון': 'filters.carpentry.repairTvUnit',
    'תיקון ספרייה': 'filters.carpentry.repairLibrary',
    'תיקון רהיטים אחרים': 'filters.carpentry.repairOther',
  },
  carpentryOther: {
    'חיפוי עץ לקיר': 'filters.carpentry.wallCladding',
    'פירוק והרכבת רהיטים': 'filters.carpentry.disassembly',
    'בניית דלתות': 'filters.carpentry.doorFabrication',
    'תיקון דלתות': 'filters.carpentry.doorRepair',
    'חידוש דלתות כניסה מעץ': 'filters.carpentry.doorRenovation',
    'בניית קומת גלריה': 'filters.carpentry.loft',
    'מדרגות עץ לבית': 'filters.carpentry.stairs',
    'משרביות מעץ': 'filters.carpentry.lattice',
    "בוצ'ר עץ": 'filters.carpentry.butcher',
  },
  carpentryOutdoor: {
    'פרגולות': 'filters.carpentry.pergolas',
    'דקים': 'filters.carpentry.decks',
    'גדרות ומחיצות עץ': 'filters.carpentry.fences',
  },
  carpentryPergolas: {
    'פרגולות עץ': 'filters.carpentry.woodPergolas',
    'פרגולות הצללה': 'filters.carpentry.shadePergolas',
    'סגירת מרפסת': 'filters.carpentry.balconyEnclosure',
  },
  carpentryDecks: {
    'דקים מעץ טבעי': 'filters.carpentry.naturalWoodDecks',
    'דק סינטטי (קומפוזיט)': 'filters.carpentry.compositeDecks',
    'שיקום / חידוש דקים': 'filters.carpentry.deckRenovation',
  },
  carpentryFences: {
    'גדרות עץ': 'filters.carpentry.woodFences',
    'מחיצות עץ לגינה': 'filters.carpentry.gardenPartitions',
    'שערי עץ': 'filters.carpentry.woodGates',
  },

  // ═══════════════════════════════════════════════════════════════
  // HOME ORGANIZATION
  // ═══════════════════════════════════════════════════════════════
  homeOrgWorkTypes: {
    'סידור כללי': 'filters.organization.general',
    'סידור + מיון': 'filters.organization.sorting',
    'ארגון מקצועי': 'filters.organization.professional',
  },
  homeOrgGeneral: {
    'סידור בית מלא': 'filters.organization.fullHouse',
    'סידור חדרים': 'filters.organization.rooms',
    'סידור מטבח': 'filters.organization.kitchen',
    'סידור חדר ילדים': 'filters.organization.kidsRoom',
    'סידור חדר ארונות / ארונות בגדים': 'filters.organization.closets',
    'סידור חדר אמבטיה': 'filters.organization.bathroom',
  },
  homeOrgSorting: {
    'מיון חפצים': 'filters.organization.itemSorting',
    'מיון בגדים': 'filters.organization.clothesSorting',
    'מיון צעצועים': 'filters.organization.toySorting',
    'הכנת חפצים למסירה / תרומה': 'filters.organization.donation',
  },
  homeOrgProfessional: {
    'יצירת פתרונות אחסון': 'filters.organization.storageSolutions',
    'אופטימיזציה של חללים קטנים': 'filters.organization.smallSpaces',
    'עיצוב וסידור מדפים': 'filters.organization.shelfDesign',
  },

  // ═══════════════════════════════════════════════════════════════
  // PAINTING
  // ═══════════════════════════════════════════════════════════════
 paintingWorkTypes: {
    'צביעה כללית של דירה': 'filters.painting.generalPainting',
    'תיקוני קירות – חורים, סדקים, שפכטל': 'filters.painting.wallRepairs',
    'החלקת קירות (שפכטל מלא)': 'filters.painting.wallSmoothing',
    'תיקון רטיבות / עובש': 'filters.painting.moistureMold',
    'קילופי צבע ישן': 'filters.painting.paintStripping',
    'צביעת אפקטים – בטון, משי, אומבר': 'filters.painting.effectPainting',
    'צביעת קיר דקורטיבי / Accent Wall': 'filters.painting.accentWall',
    'טקסטורות מיוחדות': 'filters.painting.specialTextures',
  },

  // ═══════════════════════════════════════════════════════════════
  // PRIVATE CHEF
  // ═══════════════════════════════════════════════════════════════
  chefProviderType: {
    'קייטרינג': 'filters.chef.caterer',
    'שף פרטי': 'filters.chef.homeChef',
  },
  chefEventType: {
    'חתונה': 'filters.chef.wedding',
    'בר מצווה': 'filters.chef.barMitsva',
    'בת מצווה': 'filters.chef.batMitsva',
    'ברית מילה': 'filters.chef.britMila',
    'פדיון הבן': 'filters.chef.pidyonHaben',
    'שבע ברכות': 'filters.chef.shevaBrahot',
    'יום הולדת / יום שנה': 'filters.chef.anniversary',
    'קידוש': 'filters.chef.kiddouch',
    'שבת חתן': 'filters.chef.shabbatHatan',
    'אירוע עסקי': 'filters.chef.corporateEvent',
    'מסיבה פרטית': 'filters.chef.privateParty',
    'חגיגה משפחתית': 'filters.chef.familyParty',
    'אירוסין': 'filters.chef.engagement',
    'סעודות שבת': 'filters.chef.shabbatMeals',
  },
  chefCuisine: {
    'פיצות': 'filters.chef.pizza',
    'סושי': 'filters.chef.sushi',
    'סלטים': 'filters.chef.salads',
    'אסייתי': 'filters.chef.asian',
    'פסטות': 'filters.chef.pasta',
    'בשרי': 'filters.chef.meat',
    'טבעוני / צמחוני': 'filters.chef.vegan',
    'לא גלוטן': 'filters.chef.glutenFree',
    'קינוחים': 'filters.chef.desserts',
    'סלטי שבת': 'filters.chef.shabbatSalads',
    'חלבי': 'filters.chef.halavi',
    'מגשי פירות': 'filters.chef.fruitPlatters',
    'חלות שבת': 'filters.chef.shabbatChallah',
    'שוקולדים': 'filters.chef.chocolates',
    'מקרון': 'filters.chef.macarons',
    'פטיסרי': 'filters.chef.patisserie',
    'קופסת עוגות': 'filters.chef.cakeBox',
    'דגים מעושנים': 'filters.chef.smokedFish',
    'הרינג': 'filters.chef.herring',
    'עיצובי פירות': 'filters.chef.fruitArrangements',
  },
  chefKosher: {
    'בד"ץ העדה החרדית': 'filters.chef.badatzEdaChareidis',
    'בד"ץ בית יוסף': 'filters.chef.badatzBeitYosef',
    'בד"ץ יורה דעה (ר׳ שלמה מחפוד)': 'filters.chef.badatzYoreDea',
    'בד"ץ מחזיקי הדת – בעלז': 'filters.chef.badatzBelz',
    'בד"ץ שארית ישראל': 'filters.chef.badatzSheerit',
    'בד"ץ נתיבות כשרות': 'filters.chef.badatzNetivot',
    'בד"ץ חוג חתם סופר בני ברק': 'filters.chef.badatzChatamBB',
    'בד"ץ חוג חתם סופר פ״ת': 'filters.chef.badatzChatamPT',
    'בד"ץ מקווה ישראל': 'filters.chef.badatzMikveh',
    'בד"ץ רבני צפת': 'filters.chef.badatzTzfat',
    'כשרות הרב לנדא': 'filters.chef.rabbiLanda',
    'כשרות הרב רובין': 'filters.chef.rabbiRubin',
    'רבנות מהדרין': 'filters.chef.rabbinateMethadrin',
    'רבנות': 'filters.chef.rabbinate',
    'אחר': 'filters.chef.otherKosher',
  },

  // ═══════════════════════════════════════════════════════════════
  // PHOTOGRAPHER
  // ═══════════════════════════════════════════════════════════════
  photographerEventTypes: {
    'בר מצווה': 'filters.photographer.barMitsva',
    'בת מצווה': 'filters.photographer.batMitsva',
    'חתונה': 'filters.photographer.wedding',
    'אירוסין': 'filters.photographer.engagement',
    'תספורת': 'filters.photographer.haircut',
    'שוטינג פוטו': 'filters.photographer.photoShoot',
    'אירועים פרטיים': 'filters.photographer.privateEvents',
    'ברית מילה': 'filters.photographer.britMila',
  },
  photographerWorkTypes: {
    'סוג האירוע': 'filters.photographer.eventTypes',
    'אלבום צילום': 'filters.photographer.photoAlbum',
    'מגנט': 'filters.photographer.magnet',
    'קמרמן': 'filters.photographer.cameraman',
  },

  // ═══════════════════════════════════════════════════════════════
  // PASTRY (GÂTEAUX & PÂTISSERIE)
  // ═══════════════════════════════════════════════════════════════
  pastryProducts: {
    'עוגות': 'filters.pastry.cakes',
    'פטיסרי': 'filters.pastry.patisserie',
    'שוקולדים': 'filters.pastry.chocolates',
    'מקרון': 'filters.pastry.macarons',
    'קופסת עוגות': 'filters.pastry.cakeBox',
    'עיצובי פירות': 'filters.pastry.fruitArrangements',
    'מגשי פירות': 'filters.pastry.fruitPlatters',
    'קינוחים': 'filters.pastry.desserts',
  },

  // ═══════════════════════════════════════════════════════════════
  // EVENT ENTERTAINMENT
  // ═══════════════════════════════════════════════════════════════
  eventWorkTypes: {
    'השכרת ציוד לאירועים': 'filters.events.equipmentRental',
    'סוגי ההפעלה': 'filters.events.entertainmentServices',
    'אחר': 'filters.events.other',
  },
  eventEquipmentRentalCategories: {
    '🍿 מכונות מזון': 'filters.events.foodMachines',
    '🎪 השכרת מתנפחים ומשחקים': 'filters.events.inflatables',
    '💨 מכונות אפקטים להשכרה': 'filters.events.effectMachines',
  },
  eventFoodMachines: {
    'מכונת פופקורן': 'filters.events.popcorn',
    'מכונת סוכר-בורי': 'filters.events.cottonCandy',
    'מכונת ברד': 'filters.events.slushie',
    'מכונת וופל בלגי': 'filters.events.waffle',
    'מכונת גרניטה וקפה בר': 'filters.events.granita',
    'מכונת גלידה אמריקאית': 'filters.events.softServe',
    'מכונת מילקשייק': 'filters.events.milkshake',
    'מסחטת מיצים טריים': 'filters.events.juicer',
    'מכונת נקניקיות': 'filters.events.hotdog',
    'מחבת קרפים': 'filters.events.crepe',
    'מזרקת שוקולד': 'filters.events.chocolateFountain',
  },
  eventInflatableGames: {
    'מתנפחים': 'filters.events.bouncyHouses',
    "ג'ימבורי": 'filters.events.gymboree',
    'עמדות משחק': 'filters.events.gameStations',
  },
  eventEffectMachines: {
    'מכונת עשן': 'filters.events.smokeMachine',
    'מכונת שלג': 'filters.events.snowMachine',
    'מכונת בועות': 'filters.events.bubbleMachine',
  },
  eventEntertainment: {
    'קוסם ילדים': 'filters.events.magician',
    'קוסם': 'filters.events.magicianGeneral',
    'ליצן ילדים': 'filters.events.clown',
    'בלוני צורות': 'filters.events.balloonArt',
    'הפרחת בלונים / ניפוח בלונים במקום': 'filters.events.balloonInflation',
    'דמויות ותחפושות': 'filters.events.costumes',
    'שעשועונים ומשחקי קבוצה': 'filters.events.groupGames',
    'מופע בועות סבון': 'filters.events.bubbleShow',
    'הפעלה מוזיקלית / ריקודים': 'filters.events.musicDancing',
  },
  eventOther: {
    'איפור פנים מקצועי': 'filters.events.facePainting',
    'צילום מגנטים': 'filters.events.photoMagnets',
  },
  eventFoodStands: {
    'פופקורן': 'filters.events.stand.popcorn',
    'ברבה פאפא': 'filters.events.stand.cottonCandy',
    'הוט דוג': 'filters.events.stand.hotdog',
    'גרניטה / סלאש': 'filters.events.stand.granita',
    'קרפים': 'filters.events.stand.crepe',
    'וופלים': 'filters.events.stand.waffle',
    'גלידה': 'filters.events.stand.icecream',
    'קפה': 'filters.events.stand.coffee',
    'סוכריות': 'filters.events.stand.candy',
    'שוקולד': 'filters.events.stand.chocolate',
    "נאצ'וס": 'filters.events.stand.nachos',
    'המבורגרים': 'filters.events.stand.burger',
    'פיצה': 'filters.events.stand.pizza',
  },

  // ═══════════════════════════════════════════════════════════════
  // WATERPROOFING
  // ═══════════════════════════════════════════════════════════════
  waterproofingWorkTypes: {
    'roofWaterproofing': 'filters.waterproofing.roofs',
    'wallWaterproofing': 'filters.waterproofing.externalWalls',
    'balconyWaterproofing': 'filters.waterproofing.balconies',
    'wetRoomWaterproofing': 'filters.waterproofing.wetRooms',
    'undergroundWaterproofing': 'filters.waterproofing.underground',
    'inspectionEquipment': 'filters.waterproofing.inspection',
  },
  waterproofingRoof: {
    'bituminousSheets': 'filters.waterproofing.bituminousSheets',
    'hotAsphalt': 'filters.waterproofing.hotAsphalt',
    'polyurethane': 'filters.waterproofing.polyurethane',
    'tileRoof': 'filters.waterproofing.tileRoof',
    'maintenance': 'filters.waterproofing.maintenance',
  },
  waterproofingWall: {
    'waterPenetration': 'filters.waterproofing.waterPenetration',
    'exteriorRestoration': 'filters.waterproofing.exteriorRestoration',
    'crackSealing': 'filters.waterproofing.crackSealing',
    'dampnessTreatment': 'filters.waterproofing.dampnessTreatment',
  },
  waterproofingBalcony: {
    'beforeTiling': 'filters.waterproofing.beforeTiling',
    'leakRepair': 'filters.waterproofing.leakRepair',
    'tilingAndSealing': 'filters.waterproofing.tilingAndSealing',
  },
  waterproofingWetRoom: {
    'bathroom': 'filters.waterproofing.bathroom',
    'shower': 'filters.waterproofing.shower',
    'toilet': 'filters.waterproofing.toilet',
    'beforeRenovation': 'filters.waterproofing.beforeRenovation',
  },
  waterproofingUnderground: {
    'basements': 'filters.waterproofing.basements',
    'foundations': 'filters.waterproofing.foundations',
    'undergroundWalls': 'filters.waterproofing.undergroundWalls',
  },
  waterproofingInspection: {
    'leakDetection': 'filters.waterproofing.leakDetection',
    'moistureTests': 'filters.waterproofing.moistureTests',
    'thermalImaging': 'filters.waterproofing.thermalImaging',
  },

  // ═══════════════════════════════════════════════════════════════
  // CONTRACTOR
  // ═══════════════════════════════════════════════════════════════
  contractorWorkTypes: {
    'עבודות שלד': 'filters.contractor.structureWork',
    'שיפוצים כלליים': 'filters.contractor.generalRenovation',
    'חשמל ואינסטלציה': 'filters.contractor.electricPlumbing',
    'עבודות חוץ': 'filters.contractor.exteriorWork',
    'שיקום ותיקון חוץ': 'filters.contractor.facadeRepair',
  },
  contractorStructure: {
    'בניית שלד': 'filters.contractor.buildingFrame',
    'יציקות בטון': 'filters.contractor.concretePours',
    'טפסנות': 'filters.contractor.formwork',
    'חיזוק מבנים': 'filters.contractor.structuralReinforcement',
    'בניית קירות בלוקים': 'filters.contractor.blockWalls',
    'הריסה ובנייה מחדש': 'filters.contractor.demolitionRebuild',
  },
  contractorRenovation: {
    'שיפוץ דירה מלא': 'filters.contractor.fullApartmentReno',
    'שיפוץ חדרים': 'filters.contractor.roomRenovation',
    'שיפוץ חדרי רחצה': 'filters.contractor.bathroomReno',
    'שיפוץ מטבח': 'filters.contractor.kitchenReno',
    'החלפת ריצוף': 'filters.contractor.flooringReplacement',
    'עבודות גבס': 'filters.contractor.drywallWork',
    'טיח ושפכטל': 'filters.contractor.plasterWork',
    'סגירת מרפסת': 'filters.contractor.balconyEnclosure',
    'צביעה מקצועית': 'filters.contractor.professionalPainting',
    'החלפת דלתות ומשקופים': 'filters.contractor.doorFrameReplacement',
  },
  contractorElectricPlumbing: {
    'עבודות חשמל': 'filters.contractor.electricalWork',
    'החלפת לוח חשמל': 'filters.contractor.panelReplacement',
    'אינסטלציה כללית': 'filters.contractor.generalPlumbing',
    'החלפת צנרת': 'filters.contractor.pipeReplacement',
    'איתור ותיקון נזילות': 'filters.contractor.leakDetection',
  },
  contractorExterior: {
    'ריצוף חוץ': 'filters.contractor.exteriorFlooring',
    'בניית פרגולה': 'filters.contractor.pergolaConstruction',
    'חיפויי אבן / חיפויי קירות חוץ': 'filters.contractor.stoneCladding',
    'גידור': 'filters.contractor.fencing',
    'בניית שבילים בגינה': 'filters.contractor.gardenPathways',
  },
  contractorFacade: {
    'תיקון טיח חוץ': 'filters.contractor.exteriorPlasterRepair',
    'שיקום קירות חיצוניים': 'filters.contractor.exteriorWallRestoration',
    'איטום סדקים בקירות': 'filters.contractor.wallCrackSealing',
    'טיפול בנפילת טיח': 'filters.contractor.fallingPlasterTreatment',
  },

  // ═══════════════════════════════════════════════════════════════
  // ALUMINUM
  // ═══════════════════════════════════════════════════════════════
  aluminumWorkTypes: {
    'חלונות ודלתות': 'filters.aluminum.windowsDoors',
    'פרגולות ואלומיניום חוץ': 'filters.aluminum.pergolas',
    'תיקונים ושירות': 'filters.aluminum.repairs',
    'חיפויי אלומיניום': 'filters.aluminum.cladding',
  },
  aluminumWindowsDoors: {
    'התקנת חלונות אלומיניום': 'filters.aluminum.installWindows',
    'דלתות אלומיניום': 'filters.aluminum.aluminumDoors',
    'דלתות הזזה (ויטרינות)': 'filters.aluminum.slidingDoors',
    'דלתות כניסה מאלומיניום': 'filters.aluminum.entryDoors',
    'רשתות נגד יתושים': 'filters.aluminum.mosquitoNets',
    'תריסים ידניים': 'filters.aluminum.manualShutters',
    'תריסים חשמליים': 'filters.aluminum.electricShutters',
  },
  aluminumPergolas: {
    'פרגולות אלומיניום': 'filters.aluminum.aluminumPergolas',
    'סגירת מרפסות': 'filters.aluminum.balconyEnclosure',
    'חיפויי אלומיניום חיצוניים': 'filters.aluminum.exteriorCladding',
    'מעקות אלומיניום לגינה / מרפסות': 'filters.aluminum.railings',
  },
  aluminumRepairs: {
    'תיקון מנועי תריס חשמלי': 'filters.aluminum.repairShutterMotor',
    'תיקון מסילות': 'filters.aluminum.repairTracks',
    'תיקון גלגלים בחלונות': 'filters.aluminum.repairWheels',
    'החלפת ידיות / צירים': 'filters.aluminum.replaceHandles',
    'איטום וחידוש מסביב לחלונות': 'filters.aluminum.sealingRenewal',
    'תיקון תריסים ידניים': 'filters.aluminum.repairManualShutters',
  },
  aluminumCladding: {
    'חיפוי צנרת / כיסוי צינורות': 'filters.aluminum.pipeCovering',
    'חיפוי מונים (חשמל / מים / גז)': 'filters.aluminum.meterCovering',
    'ארגזים דקורטיביים מאלומיניום': 'filters.aluminum.decorativeBoxes',
    'חיפוי קווי מזגן': 'filters.aluminum.acLineCovering',
    'הגנה למנוע מזגן חיצוני': 'filters.aluminum.acMotorProtection',
    'חיפוי קירות חוץ מאלומיניום': 'filters.aluminum.wallCladding',
    'חיפויים דקורטיביים': 'filters.aluminum.decorativeCladding',
    'חיפוי וארגזי תריס': 'filters.aluminum.shutterBoxCladding',
  },

  // ═══════════════════════════════════════════════════════════════
  // GLASS WORKS
  // ═══════════════════════════════════════════════════════════════
  glassWorkTypes: {
    'זכוכית למקלחונים': 'filters.glass.showers',
    'זכוכית לחלונות ודלתות': 'filters.glass.homeGlass',
    'זכוכית למטבח ובית': 'filters.glass.furniture',
    'זכוכית מיוחדת ובטיחות': 'filters.glass.partitions',
    'שירותי תיקון והתאמה אישית': 'filters.glass.repairs',
  },
  glassShower: {
    'התקנת מקלחון זכוכית': 'filters.glass.showerInstall',
    'תיקון מקלחון': 'filters.glass.showerRepair',
    'החלפת זכוכית במקלחון': 'filters.glass.showerGlassReplacement',
    'דלתות מקלחת': 'filters.glass.showerDoors',
  },
  glassWindowsDoors: {
    'החלפת זכוכית בחלון': 'filters.glass.windowReplacement',
    'זכוכית מבודדת (Double)': 'filters.glass.doubleGlazing',
    'זיגוג מחדש': 'filters.glass.reglazing',
    'דלתות זכוכית פנימיות': 'filters.glass.interiorGlassDoors',
    'מחיצות זכוכית': 'filters.glass.glassPartitions',
  },
  glassKitchenHome: {
    'זכוכית למטבח (Backsplash)': 'filters.glass.kitchenBacksplash',
    'מדפי זכוכית': 'filters.glass.glassShelves',
    'שולחנות זכוכית': 'filters.glass.glassTables',
    'מראות לחדר אמבטיה': 'filters.glass.bathroomMirrors',
    'מראות דקורטיביות': 'filters.glass.decorativeMirrors',
  },
  glassSpecialSafety: {
    'זכוכית מחוסמת (בטיחותית)': 'filters.glass.temperedGlass',
    'זכוכית חכמה': 'filters.glass.smartGlass',
    'זכוכית עמידה לפריצה': 'filters.glass.securityGlass',
    'זכוכית אקוסטית (בידוד רעש)': 'filters.glass.acousticGlass',
    'זכוכית צבעונית / מעוצבת': 'filters.glass.decorativeGlass',
  },
  glassRepairCustom: {
    'תיקון שריטות וסדקים': 'filters.glass.scratchRepair',
    'ליטוש זכוכית': 'filters.glass.glassPolishing',
    'חיתוך זכוכית לפי מידה': 'filters.glass.customCutting',
  },

  // ═══════════════════════════════════════════════════════════════
  // LOCKSMITH
  // ═══════════════════════════════════════════════════════════════
  locksmithWorkTypes: {
    'החלפת מנעולים': 'filters.locksmith.lockReplacement',
    'פתיחת דלתות': 'filters.locksmith.emergencyOpening',
    'התקנת מערכות נעילה': 'filters.locksmith.advancedSystems',
    'תיקון מנעולים ודלתות': 'filters.locksmith.doorRepair',
    'שירותי ביטחון': 'serviceForm.locksmith.securityServices',
  },
  locksmithLockReplacement: {
    'מנעול צילינדר': 'filters.locksmith.cylinderLock',
    'מנעול ביטחון': 'filters.locksmith.securityLock',
    'מנעול דלת כניסה': 'filters.locksmith.entranceLock',
    'מנעול למשרד / חנות': 'filters.locksmith.officeLock',
  },
  locksmithDoorOpening: {
    'פתיחת דלת ללא נזק': 'filters.locksmith.noDamageOpening',
    'פתיחה חירום 24/7': 'filters.locksmith.emergency247',
    'פתיחת כספת': 'filters.locksmith.safeOpening',
    'שכפול מפתחות במקום': 'filters.locksmith.keyDuplication',
  },
  locksmithSystems: {
    'מנעולים חכמים': 'filters.locksmith.smartLocks',
    'מערכת אינטרקום': 'filters.locksmith.intercom',
    'קוד כניסה למשרדים': 'filters.locksmith.accessCode',
    'מנעול אלקטרוני': 'filters.locksmith.electronicLock',
  },
  locksmithRepairs: {
    'תיקון מנעול תקוע': 'filters.locksmith.stuckLockRepair',
    'תיקון ציר דלת': 'filters.locksmith.hingeRepair',
    'שיוף דלת שלא נסגרת': 'filters.locksmith.doorSanding',
    'החלפת ידית דלת': 'filters.locksmith.handleReplacement',
  },
  locksmithSecurity: {
    'שדרוג מערכת ביטחון': 'filters.locksmith.securityUpgrade',
    'התקנת דלת ביטחון': 'filters.locksmith.securityDoorInstall',
    'בדיקת פגיעות דלת': 'filters.locksmith.vulnerabilityCheck',
    'שירות מסגרות מסחרי': 'filters.locksmith.commercialLocksmith',
  },

  // ═══════════════════════════════════════════════════════════════
  // PROPERTY MANAGEMENT
  // ═══════════════════════════════════════════════════════════════
  propertyFullYear: {
    'חיפוש ובדיקת שוכרים מתאימים': 'filters.property.tenantSearch',
    'חתימה על חוזה וניהול ערבויות': 'filters.property.contractManagement',
    'גביית שכ"ד והעברת תשלומים לבעל הדירה': 'filters.property.rentCollection',
    'בדיקת מצב הנכס לפני ואחרי תקופת השכירות': 'filters.property.propertyInspection',
    'העברת חשבונות השירותים (מים, חשמל, גז) על שם השוכר החדש': 'filters.property.utilityTransfer',
  },
  propertyShortTerm: {
    'פרסום וניהול מודעות באתרים': 'filters.property.listingManagement',
    'ניהול הזמנות ותקשורת עם אורחים': 'filters.property.guestCommunication',
    'קבלת אורחים / מסירת מפתחות': 'filters.property.guestCheckin',
    'ניקיון בין השהיות': 'filters.property.turnaroundCleaning',
    'בדיקה תקופתית של הנכס': 'filters.property.periodicInspection',
    'תיקונים כלליים (חשמל, אינסטלציה, מזגן וכו׳)': 'filters.property.generalRepairs',
  },

  // ═══════════════════════════════════════════════════════════════
  // EVENT DECORATION
  // ═══════════════════════════════════════════════════════════════
  decorationTypes: {
    'קשתות ועיצוב בלונים': 'filters.event_decoration.archBalloon',
    'עיצוב שולחנות': 'filters.event_decoration.tableDeco',
    'עיצוב אולמות': 'filters.event_decoration.hallDeco',
    'קירות צילום ופינות צילום': 'filters.event_decoration.photoWall',
  },

  // ═══════════════════════════════════════════════════════════════
  // PEST CONTROL
  // ═══════════════════════════════════════════════════════════════
  pestTypes: {
    'הדברת תיקנים': 'filters.pest_control.cockroaches',
    'הדברת נמלים': 'filters.pest_control.ants',
    'הדברת פשפשים': 'filters.pest_control.bedbugs',
    'הדברת פרעושים': 'filters.pest_control.fleas',
    'הדברת יתושים': 'filters.pest_control.mosquitoes',
    'הדברת חולדות': 'filters.pest_control.rats',
    'הדברת עכברים': 'filters.pest_control.mice',
    'הרחקת יונים': 'filters.pest_control.pigeons',
    'רשתות נגד יונים': 'filters.pest_control.pigeonNets',
    'הרחקת עטלפים': 'filters.pest_control.bats',
    'הרחקת נחשים': 'filters.pest_control.snakes',
  },

  // ═══════════════════════════════════════════════════════════════
  // METALWORK
  // ═══════════════════════════════════════════════════════════════
  metalworkWorkTypes: {
    'סורגים':         'serviceForm.metalwork.bars',
    'מעקות':          'serviceForm.metalwork.railings',
    'גדרות':          'serviceForm.metalwork.fences',
    'גלריות':         'serviceForm.metalwork.galleries',
    'מרפסות תלויות':  'serviceForm.metalwork.hangingBalconies',
    'מדרגות':         'serviceForm.metalwork.stairs',
  },
};

/**
 * Traduit une valeur hébreue vers la langue courante
 */
export const translateValue = (value, category, t) => {
  if (!value || !category || !t) return value;
  
  const mapping = translationMappings[category];
  if (!mapping) return value;
  
  const translationKey = mapping[value];
  if (!translationKey) return value;
  
  const translated = t(translationKey);
  // Si la traduction retourne la clé elle-même, retourner la valeur originale
  return translated === translationKey ? value : translated;
};

/**
 * Traduit un tableau de valeurs hébreues
 */
export const translateArray = (values, category, t) => {
  if (!Array.isArray(values)) return values;
  return values.map(value => translateValue(value, category, t));
};

/**
 * Traduit et joint un tableau en string
 */
export const translateAndJoin = (values, category, t, separator = ', ') => {
  if (!Array.isArray(values)) return values;
  return translateArray(values, category, t).join(separator);
};

/**
 * Cherche dans plusieurs catégories pour trouver la traduction
 */
export const translateFromMultipleCategories = (value, categories, t) => {
  if (!value || !categories || !t) return value;
  
  for (const category of categories) {
    const translated = translateValue(value, category, t);
    if (translated !== value) return translated;
  }
  return value;
};

/**
 * Traduit un tableau en cherchant dans plusieurs catégories
 */
export const translateArrayFromMultipleCategories = (values, categories, t) => {
  if (!Array.isArray(values)) return values;
  return values.map(value => translateFromMultipleCategories(value, categories, t));
};

export default translationMappings;