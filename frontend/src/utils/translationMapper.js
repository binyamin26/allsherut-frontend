// Mapping des valeurs hébreues (stockées en BDD) vers les clés de traduction

const translationMappings = {
  // ═══════════════════════════════════════════════════════════════
  // JOURS
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
  // HEURES
  // ═══════════════════════════════════════════════════════════════
  hours: {
    'בוקר': 'hours.morning',
    'צהריים': 'hours.noon',
    'אחר הצהריים': 'hours.afternoon',
    'ערב': 'hours.evening',
    'לילה': 'hours.night',
    'הכל': 'hours.all',
    '24/7': 'hours.twentyFourSeven',
  },

  // ═══════════════════════════════════════════════════════════════
  // BABYSITTING
  // ═══════════════════════════════════════════════════════════════
  babysittingAgeGroups: {
    '0-1': 'filters.babysitting.age0to1',
    '1-3': 'filters.babysitting.age1to3',
    '3-6': 'filters.babysitting.age3to6',
    '6+': 'filters.babysitting.age6plus',
  },
  babysittingTypes: {
    'שמרטפות מזדמנת': 'filters.babysitting.occasional',
    'שמרטפות קבועה בבית הלקוח': 'filters.babysitting.regular',
    'איסוף מבית ספר / גן': 'filters.babysitting.pickup',
    'שמירה בלילה': 'filters.babysitting.nightCare',
    'שמירה בחגים': 'filters.babysitting.holidayCare',
    'עזרה בשיעורי בית': 'filters.babysitting.homework',
    'מטפלת צמודה': 'filters.babysitting.fullTime',
    'קייטנת קיץ': 'filters.babysitting.summerCamp',
    'קייטנת חורף': 'filters.babysitting.winterCamp',
  },
  babysittingCertifications: {
    'הכשרה בחינוך מיוחד': 'filters.babysitting.certSpecialEd',
    'קורס עזרה ראשונה': 'filters.babysitting.certFirstAid',
    'ניסיון בגן ילדים': 'filters.babysitting.certKindergarten',
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

  // ═══════════════════════════════════════════════════════════════
  // CLEANING
  // ═══════════════════════════════════════════════════════════════
  cleaningHome: {
    'ניקיון שוטף': 'filters.cleaning.regularCleaning',
    'ניקיון פסח': 'filters.cleaning.passoverCleaning',
    'ניקיון לאחר שיפוץ': 'filters.cleaning.postRenovation',
    'ניקיון אירביאנבי': 'filters.cleaning.airbnb',
  },
  cleaningOffice: {
    'משרדים': 'filters.cleaning.offices',
    'חנויות': 'filters.cleaning.stores',
    'בניינים': 'filters.cleaning.buildings',
    'מוסדות חינוך': 'filters.cleaning.educationalInstitutions',
    'מפעלים': 'filters.cleaning.factories',
  },
  cleaningSpecial: {
    'ניקוי חלונות גבוהים': 'filters.cleaning.highWindows',
    'ניקוי שטיחים וספות': 'filters.cleaning.carpetsSofas',
    'ניקוי וילונות': 'filters.cleaning.curtains',
    'שטיפת לחץ': 'filters.cleaning.pressureWashing',
    'ניקיון לאחר נזק': 'filters.cleaning.damageCleanup',
    'ניקוי מזגנים': 'filters.cleaning.acCleaning',
    'הדברה': 'filters.cleaning.pestControl',
    'ניקוי גגות': 'filters.cleaning.roofCleaning',
    'ניקוי רכב בבית': 'filters.cleaning.carCleaning',
    'ניקוי פאנלים סולאריים': 'filters.cleaning.solarPanels',
  },
  cleaningFrequency: {
    'חד פעמי': 'filters.cleaning.oneTime',
    'שבועי': 'filters.cleaning.weekly',
    'דו-שבועי': 'filters.cleaning.biweekly',
    'חודשי': 'filters.cleaning.monthly',
    'הכל': 'filters.cleaning.allOptions',
  },
  cleaningMaterials: {
    'מביא ציוד': 'filters.cleaning.providesEquipment',
    'לא מביא ציוד': 'filters.cleaning.noEquipment',
    'ציוד חלקי': 'filters.cleaning.partialEquipment',
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
    'בישול והכנת ארוחות': 'filters.eldercare.cooking',
    'קניות וסידורים': 'filters.eldercare.errands',
    'מתן תרופות': 'filters.eldercare.medication',
    'ליווי לרופא': 'filters.eldercare.doctorAccompaniment',
  },
  eldercareConditions: {
    'אלצהיימר': 'filters.eldercare.alzheimers',
    'פרקינסון': 'filters.eldercare.parkinsons',
    'סוכרת': 'filters.eldercare.diabetes',
    'מוגבלות ניידות': 'filters.eldercare.mobilityIssues',
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
    'כלב קטן': 'filters.petcare.smallDog',
    'כלב בינוני': 'filters.petcare.mediumDog',
    'כלב גדול': 'filters.petcare.largeDog',
    'כלב ענק': 'filters.petcare.giantDog',
  },
  petcareLocation: {
    'בבית הלקוח': 'filters.petcare.clientHome',
    'בבית המטפל': 'filters.petcare.caregiverHome',
    'פנסיון': 'filters.petcare.petBoarding',
  },
  petcareServices: {
    'הליכת כלבים': 'filters.petcare.dogWalking',
    'רחצה וטיפוח': 'filters.petcare.bathingGrooming',
    'אילוף בסיסי': 'filters.petcare.basicTraining',
    'מתן תרופות': 'filters.petcare.medicationAdmin',
    'האכלה': 'filters.petcare.feeding',
    'ניקוי ארגז חול / כלוב / אקווריום': 'filters.petcare.cleaning',
    'שליחת תמונות לבעלים': 'filters.petcare.photoUpdates',
    'שעות יום בלבד': 'filters.petcare.daytimeOnly',
    'לינה': 'filters.petcare.overnight',
  },
  petcareFacilities: {
    'גינה מגודרת': 'filters.petcare.fencedGarden',
    'חצר גדולה': 'filters.petcare.largeYard',
    'מיזוג אוויר': 'filters.petcare.airConditioning',
  },

  // ═══════════════════════════════════════════════════════════════
  // GARDENING
  // ═══════════════════════════════════════════════════════════════
  gardeningServices: {
    'גיזום עצים ושיחים': 'filters.gardening.pruning',
    'עיצוב גינות': 'filters.gardening.design',
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
    'מזמרה': 'filters.gardening.pruningShears',
    'משאבת מים': 'filters.gardening.waterPump',
    'כלי עבודה ידניים': 'filters.gardening.handTools',
    'מפזר דשן': 'filters.gardening.fertilizerSpreader',
    'מערכת השקיה': 'filters.gardening.irrigationSystem',
  },
  gardeningSpecializations: {
    'גנן מוסמך סוג א': 'filters.gardening.gardenerTypeA',
    'גנן מוסמך סוג ב': 'filters.gardening.gardenerTypeB',
    'אגרונום': 'filters.gardening.agronomist',
    'מומחה גיזום': 'filters.gardening.expertPruner',
  },
  gardeningAdditional: {
    'פינוי פסולת גינה': 'filters.gardening.wasteRemoval',
    'ייעוץ נוף': 'filters.gardening.landscapeConsulting',
  },

  // ═══════════════════════════════════════════════════════════════
  // PLUMBING
  // ═══════════════════════════════════════════════════════════════
  plumbingWorkTypes: {
    'סתימות': 'serviceForm.plumbing.blockages',
    'תיקון צנרת': 'serviceForm.plumbing.pipeRepair',
    'עבודות גדולות': 'serviceForm.plumbing.largeWork',
    'תיקון והתקנת אביזרי אינסטלציה': 'serviceForm.plumbing.fixtureInstallation',
  },
  plumbingBlockages: {
    'פתיחת סתימה בבית': 'filters.plumbing.homeBlockage',
    'משאבה טבולה': 'filters.plumbing.submersiblePump',
    'פתיחת סתימה בבנין': 'filters.plumbing.buildingBlockage',
  },
  plumbingPipeRepair: {
    'תיקון צנרת גברית': 'filters.plumbing.roughPlumbing',
    'תיקון נזקי צנרת בבית': 'filters.plumbing.homePipeDamage',
    'תיקון נזקי צנרת בבניין': 'filters.plumbing.buildingPipeDamage',
    'הגברת לחץ מים': 'filters.plumbing.waterPressure',
    'תיקון צנרת בגינה': 'filters.plumbing.gardenPipes',
    'תיקוני צנרת אחרים': 'filters.plumbing.otherPipeRepairs',
    'תיקון צנרת ביוב ללא הרס': 'filters.plumbing.noDigSewer',
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
    'התקנת טוחן אשפה': 'filters.plumbing.garbageDisposalInstall',
    'תיקון טוחן אשפה': 'filters.plumbing.garbageDisposalRepair',
    'כיורים': 'filters.plumbing.sinks',
    'הכנה למדיח כלים': 'filters.plumbing.dishwasherPrep',
    'אגנית למקלחון': 'filters.plumbing.showerBase',
    'אביזרים אחרים': 'filters.plumbing.otherFixtures',
    'סילוקית לאסלה': 'filters.plumbing.toiletHandle',
    'התקנת בידה': 'filters.plumbing.bidetInstall',
    'אסלה תלויה': 'filters.plumbing.wallHungToilet',
    'אל חוזר לשעון מים': 'filters.plumbing.backflowPreventer',
    'התקנת מערכות מים תת כיוריות': 'filters.plumbing.underSinkSystems',
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
    'מילוי גז': 'serviceForm.airConditioning.gasRefill',
    'תיקון מזגן מעובש': 'filters.ac.moldyAcRepair',
    'תיקון מיזוג מיני מרכזי': 'filters.ac.miniCentralRepair',
    'תיקון דליפת גז במזגן': 'filters.ac.gasLeakRepair',
    'תיקון מיזוג מרכזי': 'filters.ac.centralRepair',
    'תיקון מזגן אינוורטר': 'filters.ac.inverterRepair',
    'תיקון מזגן VRF': 'filters.ac.vrfRepair',
    'ניקוי פילטרים': 'filters.ac.filterCleaning',
    "תיקון צ'ילרים": 'filters.ac.chillerRepair',
    'טכנאי חדרי קירור': 'filters.ac.coldRoomTech',
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
    'התקנת צנרת גז ביתית': 'filters.gas.pipeInstallation',
    'תיקוני גז ביתיים': 'filters.gas.repairs',
  },
  gasInstallation: {
    'התקנה / העברת נקודת גז': 'filters.gas.gasPointInstall',
    'התקנת כיריים גז': 'filters.gas.stovetopInstall',
    'התקנת צנרת גז': 'filters.gas.pipeInstall',
    'התקנת גריל גז': 'filters.gas.grillInstall',
    'התקנת דוד גז': 'filters.gas.waterHeaterInstall',
    'התקנת הגז': 'filters.gas.hagaz',
    'תשתית גז לבניין חדש': 'filters.gas.newBuildingInfra',
    'שירותי גז לעסקים': 'filters.gas.businessServices',
  },
  gasRepair: {
    'תיקון כיריים גז': 'filters.gas.stovetopRepair',
    'תיקון צנרת גז': 'filters.gas.pipeRepair',
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
    'תיקון קצר': 'filters.electrician.shortCircuitRepair',
    'תיקון שעון שבת': 'filters.electrician.timerRepair',
    'תיקון לוח חשמל': 'filters.electrician.panelRepair',
    'החלפת שקע': 'filters.electrician.outletReplacement',
    'תיקון / החלפת ספוטים': 'filters.electrician.spotlightRepair',
    'תיקונים אחרים': 'filters.electrician.otherRepairs',
  },
  electricianInstallations: {
    'החלפת מפסק מדרגות': 'filters.electrician.stairwaySwitch',
    'התקנת מאוורר תקרה': 'filters.electrician.ceilingFan',
    'התקנת שקע': 'filters.electrician.outletInstall',
    'נקודת שקע חדשה': 'filters.electrician.newOutlet',
    'התקנת דוד חשמלי': 'filters.electrician.waterHeater',
    'התקנת מפסק': 'filters.electrician.switchInstall',
    'עמדת טעינה לרכב חשמלי': 'filters.electrician.evCharger',
    'התקנת שעון שבת': 'filters.electrician.shabbatTimer',
    'התקנות אחרות': 'filters.electrician.otherInstall',
    'עמדת טעינה EV-Meter': 'filters.electrician.evMeter',
    'התקנת כיריים אינדוקציה': 'filters.electrician.inductionCooktop',
    'התקנת מפזר חום לאמבטיה': 'filters.electrician.bathroomHeater',
    'התקנת גנרטור ביתי': 'filters.electrician.generator',
    'התקנת ונטה': 'filters.electrician.ventaInstall',
    'עמדת טעינה EV-EDGE': 'filters.electrician.evEdge',
  },
  electricianLargeWork: {
    'תשתית חשמל חדשה': 'filters.electrician.newInfrastructure',
    'החלפת תשתית חשמל': 'filters.electrician.replaceInfrastructure',
    'החלפת לוח חשמל': 'filters.electrician.panelReplacement',
    'הארקה': 'filters.electrician.grounding',
    'הסבה לתלת פאזי': 'filters.electrician.threePhase',
    'הכנה לבדיקת חשמלאי': 'filters.electrician.inspection',
  },

  // ═══════════════════════════════════════════════════════════════
  // DRYWALL
  // ═══════════════════════════════════════════════════════════════
  drywallWorkTypes: {
    'עיצובי גבס': 'filters.drywall.design',
    'בניית גבס': 'filters.drywall.construction',
  },
  drywallDesign: {
    'נישות גבס': 'filters.drywall.niches',
    'מזנון גבס': 'filters.drywall.tvUnit',
    'ספריות גבס': 'filters.drywall.libraries',
    'מדפי גבס': 'filters.drywall.shelves',
    'תאורה נסתרת': 'filters.drywall.hiddenLighting',
    'קרניז מעוגל': 'filters.drywall.roundedCornice',
    'קשתות גבס': 'filters.drywall.arches',
  },
  drywallConstruction: {
    'תקרה צפה': 'filters.drywall.floatingCeiling',
    'קיר צף': 'filters.drywall.floatingWall',
    'קירות גבס': 'filters.drywall.walls',
    'תקרות גבס': 'filters.drywall.ceilings',
    'בניית מדפים מגבס': 'filters.drywall.shelfConstruction',
    'תקרה נמוכה למזגן': 'filters.drywall.acDropCeiling',
    'חיפוי צנרת': 'filters.drywall.pipeCovering',
    'בניית קרניז': 'filters.drywall.cornice',
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
    'בניית רהיטי חדר שינה': 'filters.carpentry.bedroomFurniture',
    'בניית שולחנות': 'filters.carpentry.tableBuilding',
    'בניית כיסאות': 'filters.carpentry.chairBuilding',
    'בניית מזנונים': 'filters.carpentry.tvUnitBuilding',
    'בניית ספריות': 'filters.carpentry.libraryBuilding',
    'בניית רהיטים בהתאמה אישית': 'filters.carpentry.customFurniture',
    'בניית מדפים': 'filters.carpentry.shelfBuilding',
    'בניית חדר ארונות': 'filters.carpentry.walkInCloset',
    'בניית מיטת עץ': 'filters.carpentry.woodenBed',
  },
  carpentryOutdoor: {
    'פרגולות': 'filters.carpentry.pergolas',
    'דקים': 'filters.carpentry.decks',
    'גדרות ומחיצות עץ': 'filters.carpentry.fences',
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
  // EVENT ENTERTAINMENT
  // ═══════════════════════════════════════════════════════════════
  eventWorkTypes: {
    'השכרת ציוד לאירועים': 'filters.events.equipmentRental',
    'סוגי ההפעלה': 'filters.events.entertainmentServices',
    'אחר': 'filters.events.other',
  },
  eventEquipmentRental: {
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
  eventInflatables: {
    'מתנפחים': 'filters.events.inflatables',
    "ג'ימבורי": 'filters.events.inflatables',
    'עמדות משחק': 'filters.events.inflatables',
  },
  eventEffects: {
    'מכונת עשן': 'filters.events.effectMachines',
    'מכונת שלג': 'filters.events.effectMachines',
    'מכונת בועות': 'filters.events.effectMachines',
  },
  eventEntertainment: {
    'קוסם ילדים': 'filters.events.magician',
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
    'בלוני קשת': 'filters.events.balloonArch',
    'צילום מגנטים': 'filters.events.photoMagnets',
  },

  // ═══════════════════════════════════════════════════════════════
  // PRIVATE CHEF
  // ═══════════════════════════════════════════════════════════════
  chefCuisine: {
    'פיצה': 'filters.chef.pizza',
    'סושי': 'filters.chef.sushi',
    'סלטים': 'filters.chef.salads',
    'אסייתי': 'filters.chef.asian',
    'פסטה': 'filters.chef.pasta',
    'בשרים': 'filters.chef.meat',
    'טבעוני / צמחוני': 'filters.chef.vegan',
    'ללא גלוטן': 'filters.chef.glutenFree',
    'קינוחים': 'filters.chef.desserts',
  },
  chefKosher: {
    'בד"ץ העדה החרדית': 'filters.chef.badatzEdaChareidis',
    'בד"ץ בית יוסף': 'filters.chef.badatzBeitYosef',
    'בד"ץ יורה דעה': 'filters.chef.badatzYoreDea',
    'בד"ץ בעלז': 'filters.chef.badatzBelz',
    'בד"ץ שארית ישראל': 'filters.chef.badatzSheerit',
    'בד"ץ נתיבות הכשרות': 'filters.chef.badatzNetivot',
    'בד"ץ חתם סופר בני ברק': 'filters.chef.badatzChatamBB',
    'בד"ץ חתם סופר פתח תקווה': 'filters.chef.badatzChatamPT',
    'בד"ץ מקווה ישראל': 'filters.chef.badatzMikveh',
    'בד"ץ רבני צפת': 'filters.chef.badatzTzfat',
    'כשרות הרב לנדא': 'filters.chef.rabbiLanda',
    'כשרות הרב רובין': 'filters.chef.rabbiRubin',
  },

  // ═══════════════════════════════════════════════════════════════
  // PAINTING
  // ═══════════════════════════════════════════════════════════════
  paintingWorkTypes: {
    'צביעת דירה כללית': 'filters.painting.generalPainting',
    'תיקוני קירות - חורים, סדקים, שפכטל': 'filters.painting.wallRepairs',
    'החלקת קירות (שפכטל מלא)': 'filters.painting.wallSmoothing',
    'תיקון רטיבות / עובש': 'filters.painting.moistureMold',
    'הסרת צבע ישן': 'filters.painting.paintStripping',
    'צביעת אפקטים - בטון, משי, אומבר': 'filters.painting.effectPainting',
    'קיר דקורטיבי / אקסנט': 'filters.painting.accentWall',
    'טקסטורות מיוחדות': 'filters.painting.specialTextures',
  },

  // ═══════════════════════════════════════════════════════════════
  // WATERPROOFING
  // ═══════════════════════════════════════════════════════════════
  waterproofingWorkTypes: {
    'איטום גגות': 'filters.waterproofing.roofs',
    'איטום קירות חיצוניים': 'filters.waterproofing.externalWalls',
    'איטום מרפסות': 'filters.waterproofing.balconies',
    'איטום חדרים רטובים': 'filters.waterproofing.wetRooms',
    'איטום תת קרקעי': 'filters.waterproofing.underground',
    'בדיקה, אבחון וציוד': 'filters.waterproofing.inspection',
  },

  // ═══════════════════════════════════════════════════════════════
  // CONTRACTOR
  // ═══════════════════════════════════════════════════════════════
  contractorWorkTypes: {
    'עבודות שלד': 'filters.contractor.structureWork',
    'שיפוצים כלליים': 'filters.contractor.generalRenovation',
    'חשמל ואינסטלציה': 'filters.contractor.electricPlumbing',
    'עבודות חוץ': 'filters.contractor.exteriorWork',
    'שיקום ותיקון חזיתות': 'filters.contractor.facadeRepair',
  },

  // ═══════════════════════════════════════════════════════════════
  // ALUMINUM
  // ═══════════════════════════════════════════════════════════════
  aluminumWorkTypes: {
    'חלונות ודלתות': 'filters.aluminum.windowsDoors',
    'פרגולות ואלומיניום חוץ': 'filters.aluminum.pergolas',
    'תיקונים ושירות': 'filters.aluminum.repairs',
    'חיפוי אלומיניום': 'filters.aluminum.cladding',
  },

  // ═══════════════════════════════════════════════════════════════
  // GLASS WORKS
  // ═══════════════════════════════════════════════════════════════
  glassWorkTypes: {
    'זכוכית ביתית': 'filters.glass.homeGlass',
    'מקלחונים': 'filters.glass.showers',
    'מחיצות וקירות זכוכית': 'filters.glass.partitions',
    'מעקות זכוכית': 'filters.glass.railings',
    'רהיטים וזכוכית דקורטיבית': 'filters.glass.furniture',
    'תיקונים ושירות': 'filters.glass.repairs',
  },

  // ═══════════════════════════════════════════════════════════════
  // LOCKSMITH
  // ═══════════════════════════════════════════════════════════════
  locksmithWorkTypes: {
    '🔐 פתיחת דלתות בחירום': 'filters.locksmith.emergencyOpening',
    '🔑 החלפת מנעולים': 'filters.locksmith.lockReplacement',
    '🚪 תיקון דלתות ובטיחות': 'filters.locksmith.doorRepair',
    '📡 מערכות מתקדמות': 'filters.locksmith.advancedSystems',
  },
  locksmithLockReplacement: {
    'מנעול צילינדר': 'filters.locksmith.cylinderLock',
    'מנעול אבטחה': 'filters.locksmith.securityLock',
    'מנעול דלת כניסה': 'filters.locksmith.entranceLock',
    'מנעול משרד / חנות': 'filters.locksmith.officeLock',
  },
  locksmithDoorOpening: {
    'פתיחת דלת ללא נזק': 'filters.locksmith.noDamageOpening',
    'פתיחת חירום 24/7': 'filters.locksmith.emergency247',
    'פתיחת כספות': 'filters.locksmith.safeOpening',
    'שכפול מפתחות במקום': 'filters.locksmith.keyDuplication',
  },
  locksmithSystems: {
    'מנעולים חכמים': 'filters.locksmith.smartLocks',
    'מערכת אינטרקום': 'filters.locksmith.intercom',
    'קוד כניסה למשרד': 'filters.locksmith.accessCode',
    'מנעול אלקטרוני': 'filters.locksmith.electronicLock',
  },
  locksmithRepairs: {
    'תיקון מנעול תקוע': 'filters.locksmith.stuckLockRepair',
    'תיקון צירי דלת': 'filters.locksmith.hingeRepair',
    'שיוף דלת (לא נסגרת)': 'filters.locksmith.doorSanding',
    'החלפת ידית דלת': 'filters.locksmith.handleReplacement',
  },
  locksmithSecurity: {
    'שדרוג מערכת אבטחה': 'filters.locksmith.securityUpgrade',
    'התקנת דלת ביטחון': 'filters.locksmith.securityDoorInstall',
    'בדיקת פרצות בדלתות': 'filters.locksmith.vulnerabilityCheck',
    'מסגרות לעסקים': 'filters.locksmith.commercialLocksmith',
  },

  // ═══════════════════════════════════════════════════════════════
  // PROPERTY MANAGEMENT
  // ═══════════════════════════════════════════════════════════════
  propertyWorkTypes: {
    '🏠 ניהול השכרה לשנה': 'filters.property.fullYearRental',
    '🏖️ השכרה לטווח קצר': 'filters.property.shortTermRental',
  },
  propertyFullYear: {
    'חיפוש וסינון דיירים': 'filters.property.tenantSearch',
    'ניהול חוזה וערבויות': 'filters.property.contractManagement',
    'גביית שכירות והעברה לבעלים': 'filters.property.rentCollection',
    'בדיקת מצב הנכס': 'filters.property.propertyInspection',
    'העברת חשבונות לדייר חדש': 'filters.property.utilityTransfer',
  },
  propertyShortTerm: {
    'ניהול מודעות ופרסום': 'filters.property.listingManagement',
    'תקשורת והזמנות מאורחים': 'filters.property.guestCommunication',
    'צ׳ק-אין / מסירת מפתחות': 'filters.property.guestCheckin',
    'ניקיון בין אורחים': 'filters.property.turnaroundCleaning',
    'בדיקת נכס תקופתית': 'filters.property.periodicInspection',
    'תיקונים כלליים (חשמל, אינסטלציה, מזגן)': 'filters.property.generalRepairs',
  },

  // ═══════════════════════════════════════════════════════════════
  // LAUNDRY
  // ═══════════════════════════════════════════════════════════════
  laundryServices: {
    'גיהוץ בבית הלקוח': 'filters.laundry.ironingAtHome',
    'איסוף ומשלוח כביסה': 'filters.laundry.pickupDelivery',
    'ניקוי יבש / מכבסה': 'filters.laundry.dryCleaning',
    'מצעים, מגבות, וילונות': 'filters.laundry.linens',
    'כביסה תעשייתית (מלונות, מסעדות)': 'filters.laundry.industrial',
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