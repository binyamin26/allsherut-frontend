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
        options: ['0-1 שנה', '1-3 שנים', '3-6 שנים', '6+ שנים']
      },
      { 
        name: 'availability_days', 
        label: 'serviceFields.babysitting.availability_days', 
        type: 'checkbox',
        options: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'כל השבוע']
      },
      { 
        name: 'availability_hours', 
        label: 'serviceFields.babysitting.availability_hours', 
        type: 'checkbox',
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'babysitting_types', 
        label: 'serviceFields.babysitting.babysitting_types', 
        type: 'checkbox',
        options: ['שמרטפות מזדמנת', 'שמרטפות קבועה בבית הלקוח', 'הוצאה מהגן / מבית-הספר', 'שמירה בלילה', 'שמירה בזמן חופשות', 'עזרה בשיעורי בית', 'מטפלת במשרה מלאה', 'קייטנת קיץ', 'קייטנת חורף']
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
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
      },
      { name: 'hourlyRate', label: 'serviceFields.babysitting.hourlyRate', type: 'number' },
      { 
        name: 'certifications', 
        label: 'serviceFields.babysitting.certifications', 
        type: 'select',
        options: ['הכשרה בתחום החינוך המיוחד', 'קורס עזרה ראשונה', 'ניסיון בגני ילדים או מעונות']
      },
      { 
        name: 'religiosity', 
        label: 'serviceFields.babysitting.religiosity', 
        type: 'select',
        options: ['לא משנה', 'חילוני', 'מסורתי', 'דתי', 'חרדי']
      }
    ]
  },

  cleaning: {
    fields: [
      {
        name: 'legalStatus',
        label: 'serviceFields.cleaning.legalStatus', 
        type: 'select',
        options: ['חברה', 'עצמאי']
      },
      { 
        name: 'cleaningTypes', 
        label: 'serviceFields.cleaning.cleaningTypes', 
        type: 'checkbox',
        options: [
          'ניקיון שוטף', 'ניקיון פסח', 'ניקיון אחרי שיפוץ', 'ניקיון לדירות Airbnb',
          'משרדים', 'חנויות', 'בניינים', 'מוסדות חינוך', 'מפעלים',
          'ניקוי חלונות', 'ניקוי מזגן', 'ריסוס (נגד חרקים)', 'ניקיון גגות רעפים', 
          'ניקוי שטיחים', 'ניקוי ספות', 'ניקוי וילונות', 'ניקוי בלחץ מים (טרסות, חזיתות)', 
          'חיטוי וניקיון אחרי נזק (שריפה / הצפה)',
          'ניקוי רכב בבית הלקוח', 'ניקוי פאנלים סולאריים',
          'גיהוץ בבית הלקוח', 'קיפול כביסה'
        ]
      },
      { 
        name: 'frequency', 
        label: 'serviceFields.cleaning.frequency', 
        type: 'select',
        options: ['חד פעמי', 'שבועי', 'דו-שבועי', 'חודשי']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.cleaning.availability_hours',
        type: 'checkbox',
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { name: 'experience', label: 'serviceFields.cleaning.experienceYears', type: 'number' },
      { name: 'hourlyRate', label: 'serviceFields.cleaning.hourlyRate', type: 'number' },
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
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
      }
    ]
  },

  gardening: {
    fields: [
      {
        name: 'services',
        label: 'serviceFields.gardening.services', 
        type: 'checkbox',
        options: ['גיזום עצים ושיחים', 'עיצוב גינה', 'שתילת צמחים', 'השקיה', 'דישון', 'ניכוש עשבים', 'תחזוקה כללית']
      },
      { 
        name: 'seasons', 
        label: 'serviceFields.gardening.seasons', 
        type: 'checkbox',
        options: ['כל השנה', 'אביב', 'קיץ', 'סתיו', 'חורף']
      },
      { 
        name: 'equipment', 
        label: 'serviceFields.gardening.equipment', 
        type: 'checkbox',
        options: ['מכסחת דשא', 'מזמרות גיזום', 'משאבת מים', 'כלים ידניים', 'מפזר דשן', 'מערכת השקיה']
      },
      { 
        name: 'specializations', 
        label: 'serviceFields.gardening.specializations', 
        type: 'checkbox',
        options: ['הכשרה גנן סוג א', 'הכשרה גנן סוג ב', 'אילני אגרונום', 'גוזם מומחה']
      },
      { 
        name: 'additionalServices', 
        label: 'serviceFields.gardening.additionalServices', 
        type: 'checkbox',
        options: ['פינוי פסולת גינה', 'ייעוץ עיצוב נוף']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.gardening.availability_hours',
        type: 'checkbox',
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { name: 'experience', label: 'serviceFields.gardening.experienceYears', type: 'number' },
      { name: 'rate', label: 'serviceFields.gardening.hourlyRate', type: 'number' },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.petcare.availability_hours',
        type: 'checkbox',
        options: ['בוקר', 'צהריים', 'אחר הצהריים', 'ערב', 'לילה']
      },
      {
        name: 'animalTypes',
        label: 'serviceFields.petcare.animalTypes', 
        type: 'checkbox',
        options: ['כלבים', 'חתולים', 'ציפורים', 'מכרסמים קטנים', 'דגים', 'זוחלים']
      },
      { 
        name: 'dogSizes', 
        label: 'serviceFields.petcare.dogSizes', 
        type: 'checkbox',
        options: ['קטן', 'בינוני', 'גדול', 'ענק']
      },
      { 
        name: 'location', 
        label: 'serviceFields.petcare.location', 
        type: 'select',
        options: ['בבית הלקוח', 'בבית המטפל', 'פנסיון לבעלי חיים']
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
          'הליכת כלבים', 
          'רחצה וטיפוח', 
          'אילוף בסיסי', 
          'מתן תרופות',
          'האכלה בזמן השמירה', 
          'ניקוי ארגז חול / כלוב / אקווריום',
          'עדכון תמונות לבעלים', 
          'שהייה ביום בלבד', 
          'לינה ללילה'
        ]
      },
      { 
        name: 'facilities', 
        label: 'serviceFields.petcare.facilities', 
        type: 'checkbox',
        options: ['גינה מגודרת', 'חצר גדולה', 'מזגן']
      },
      {
        name: 'veterinaryServices',
        label: 'serviceFields.petcare.veterinaryServices',
        type: 'checkbox',
        options: ['ביקור וטרינר', 'טיפול בסיסי']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.tutoring.availability_hours',
        type: 'checkbox',
        options: ['בוקר', 'צהריים', 'אחר הצהריים', 'ערב', 'לילה']
      },
      {
        name: 'subjects',
        label: 'serviceFields.tutoring.subjects',
        type: 'checkbox',
        options: ['מתמטיקה', 'אנגלית', 'עברית', 'פיזיקה', 'כימיה', 'ביולוגיה', 'היסטוריה', 'ספורט', 'מוזיקה', 'אומנות']
      },
      {
        name: 'ageGroups',
        label: 'filters.sports_activities.ageGroups',
        type: 'checkbox',
        options: ['ילדים', 'נוער', 'מבוגרים', 'כל הגילאים']
      },
      {
        name: 'levels',
        label: 'serviceFields.tutoring.levels',
        type: 'checkbox',
        options: ['יסודי', 'חטיבת ביניים', 'תיכון', 'בגרות', 'מכינה', 'אקדמי', 'מבוגרים']
      },
      {
        name: 'teachingMode',
        label: 'serviceFields.tutoring.teachingMode',
        type: 'select',
        options: ['פרונטלי בלבד', 'אונליין בלבד', 'שניהם']
      },
      { name: 'hourlyRate', label: 'serviceFields.tutoring.hourlyRate', type: 'number' },
      {
        name: 'specializations',
        label: 'serviceFields.tutoring.specializations',
        type: 'checkbox',
        options: ['הכנה לבחינות', 'הפרעות למידה']
      },
      { name: 'qualifications', label: 'serviceFields.tutoring.qualifications', type: 'text' },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.tutoring.availability_hours',
        type: 'checkbox',
        options: ['בוקר', 'צהריים', 'אחר הצהריים', 'ערב', 'לילה']
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
        options: ['ילדים', 'נוער', 'מבוגרים', 'כל הגילאים']
      },
      {
        name: 'teachingMode',
        label: 'serviceForm.sports_activities.activityMode',
        type: 'select',
        options: ['פרונטלי בלבד', 'אונליין בלבד', 'שניהם']
      },
      { name: 'hourlyRate', label: 'serviceFields.tutoring.hourlyRate', type: 'number' },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.eldercare.availability',
        type: 'checkbox',
        options: ['בוקר', 'צהריים', 'אחר הצהריים', 'ערב', 'לילה', '24/7']
      },
      { name: 'experience', label: 'serviceFields.eldercare.experience', type: 'number' },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
          'איסוף והחזרת כביסה (שירות משלוחים)',
          'ניקוי יבש / שירות מכבסה',
          'כביסת מצעים, מגבות, וילונות',
          'כביסה תעשייתית (מלונות, מסעדות)'
        ]
      },
    {
      name: 'availability_hours',
      label: 'serviceFields.laundry.availableHours',
      type: 'checkbox',
      options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
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
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'צהריים', 'אחר הצהריים', 'ערב', 'הכל']
      },
      {
        name: 'management_type',
        label: 'serviceFields.property_management.management_type',
        type: 'checkbox',
        options: [
          'חיפוש ובדיקת שוכרים מתאימים',
          'חתימה על חוזה וניהול ערבויות',
          'גביית שכ"ד והעברת תשלומים לבעל הדירה',
          'בדיקת מצב הנכס לפני ואחרי תקופת השכירות',
          'העברת חשבונות השירותים (מים, חשמל, גז) על שם השוכר החדש',
          'פרסום וניהול מודעות באתרים',
          'ניהול הזמנות ותקשורת עם אורחים',
          'קבלת אורחים / מסירת מפתחות',
          'ניקיון בין השהיות',
          'בדיקה תקופתית של הנכס',
          'תיקונים כלליים (חשמל, אינסטלציה, מזגן וכו׳)'
        ]
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.electrician.work_types', 
        type: 'checkbox',
        options: ['תיקונים', 'התקנות', 'עבודות חשמל גדולות']
      },
      { 
        name: 'repair_types', 
        label: 'serviceFields.electrician.repair_types', 
        type: 'checkbox',
        options: ['תיקון קצר', 'תיקון טיימר', 'תיקון לוח חשמל', 'החלפת שקעים', 'תיקון\\החלפת ספוטים', 'תיקונים אחרים', 'החלפת אוטומט חדר מדרגות']
      },
      { 
        name: 'installation_types', 
        label: 'serviceFields.electrician.installation_types', 
        type: 'checkbox',
        options: ['התקנת מאוורר תקרה', 'התקנת שקע חשמל', 'התקנת נקודת חשמל חדשה', 'התקנת אטמור', 'התקנת מתג', 'עמדת טעינה לרכב חשמלי', 'התקנת שעון שבת', 'התקנות אחרות', 'עמדת טעינה לרכב חשמלי של חברת EV-Meter', 'התקנות כיריים אינדוקציה', 'התקנת תנור אמבטיה', 'התקנת גנרטור לבית פרטי', 'התקנת ונטה', 'עמדת טעינה לרכב חשמלי EV-EDGE']
      },
      { 
        name: 'large_work_types', 
        label: 'serviceFields.electrician.large_work_types', 
        type: 'checkbox',
        options: ['בניית תשתית חשמל בכל הבית', 'החלפת תשתית חשמל בכל הבית', 'החלפת לוח חשמל', 'הארקה', 'החלפה לתלת פאזי', 'הכנה לביקורת עבור חברת חשמל']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.plumbing.work_types', 
        type: 'checkbox',
        options: ['סתימות', 'תיקון צנרת', 'עבודות גדולות', 'תיקון והתקנת אביזרי אינסטלציה']
      },
      { 
        name: 'blockage_types', 
        label: 'serviceFields.plumbing.blockage_types', 
        type: 'checkbox',
        options: ['פתיחת סתימה בבית', 'משאבה טבולה', 'פתיחת סתימה בבנין']
      },
      { 
        name: 'pipe_repair_types', 
        label: 'serviceFields.plumbing.pipe_repair_types', 
        type: 'checkbox',
        options: ['תיקון צנרת גברית', 'תיקון נזקי צנרת בבית', 'תיקון נזקי צנרת בבניין', 'הגברת לחץ מים', 'תיקון צנרת בגינה', 'תיקוני צנרת אחרים', 'תיקון צנרת ביוב ללא הרס']
      },
      { 
        name: 'large_work_types', 
        label: 'serviceFields.plumbing.large_work_types', 
        type: 'checkbox',
        options: ['החלפת צנרת בבית', 'החלפת צנרת בבניין', 'התקנת נקודות מים חדשות', 'החלפת קו ביוב בבית', 'החלפת קו ביוב בבניין', 'הקמת קו ביוב חדש', 'החלפת צנרת בגינה', 'התקנת מזח']
      },
      { 
        name: 'fixture_types', 
        label: 'serviceFields.plumbing.fixture_types', 
        type: 'checkbox',
        options: ['התקנת בר מים', 'ניאגרה סמויה', 'ברזים', 'ניאגרות ואסלות', 'מסנני מים', 'התקנת טוחן אשפה', 'תיקון טוחן אשפה', 'כיורים', 'הכנה למדיח כלים', 'אגנית למקלחון', 'אביזרים אחרים', 'סילוקית לאסלה', 'התקנת בידה', 'אסלה תלויה', 'אל חוזר לשעון מים', 'התקנת מערכות מים תת כיוריות']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.air_conditioning.work_types', 
        type: 'checkbox',
        options: ['התקנת מזגנים', 'תיקון מזגנים', 'פירוק והרכבת מזגנים']
      },
      { 
        name: 'installation_types', 
        label: 'serviceFields.air_conditioning.installation_types', 
        type: 'checkbox',
        options: ['התקנת מזגן', 'התקנת מיזוג מיני מרכזי', 'התקנת מיזוג מרכזי', 'התקנת מזגן אינוורטר', 'התקנת מזגן מולטי אינוורטר', 'התקנת מזגן VRF']
      },
      { 
        name: 'repair_types', 
        label: 'serviceFields.air_conditioning.repair_types', 
        type: 'checkbox',
        options: ['תיקון מזגן', 'מילוי גז', 'תיקון מזגן מעובש', 'תיקון מיזוג מיני מרכזי', 'תיקון דליפת גז במזגן', 'תיקון מיזוג מרכזי', 'תיקון מזגן אינוורטר', 'תיקון מזגן VRF', 'ניקוי יסודי', 'תיקון צ\'ילרים', 'טכנאי חדרי קירור']
      },
      { 
        name: 'disassembly_types', 
        label: 'serviceFields.air_conditioning.disassembly_types', 
        type: 'checkbox',
        options: ['פירוק והרכבת מזגן', 'פירוק מיזוג מיני מרכזי', 'פירוק מיזוג מרכזי', 'פירוק מזגן אינוורטר', 'פירוק מזגן VRF']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.gas_technician.work_types', 
        type: 'checkbox',
        options: ['התקנת צנרת גז בבית', 'תיקוני גז בבית']
      },
      { 
        name: 'installation_types', 
        label: 'serviceFields.gas_technician.installation_types', 
        type: 'checkbox',
        options: ['הזזת\\התקנת נקודת גז', 'התקנת כיריים גז', 'התקנת צינור גז', 'התקנת גריל גז', 'התקנת חימום מים בגז', 'התקנת חגז', 'בניית תשתית גז במבנה חדש', 'שירותי גז לעסקים']
      },
      { 
        name: 'repair_types', 
        label: 'serviceFields.gas_technician.repair_types', 
        type: 'checkbox',
        options: ['תיקון כיריים גז', 'תיקון צנרת גז']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.drywall.work_types', 
        type: 'checkbox',
        options: ['עיצובים בגבס', 'עבודות גבס']
      },
      { 
        name: 'design_types', 
        label: 'serviceFields.drywall.design_types', 
        type: 'checkbox',
        options: ['נישות גבס', 'מזנון גבס', 'ספריות גבס', 'כוורות גבס', 'תאורה נסתרת בגבס', 'קרניז גבס מעוגל', 'קשתות גבס', 'תקרה צפה', 'קיר צף']
      },
      { 
        name: 'construction_types', 
        label: 'serviceFields.drywall.construction_types', 
        type: 'checkbox',
        options: ['בניית קירות גבס', 'בניית תקרות גבס', 'בניית מדפי גבס', 'הנמכת תקרה למזגן', 'חיפוי גבס לצנרת', 'בניית סינר\\קרניז גבס', 'בידוד אקוסטי']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.carpentry.work_types', 
        type: 'checkbox',
        options: ['בניית רהיטים', 'תיקון רהיטים', 'עבודות נגרות אחרות', 'נגרות חוץ']
      },
      { 
        name: 'furniture_building_types', 
        label: 'serviceFields.carpentry.furniture_building_types', 
        type: 'checkbox',
        options: ['בניית ארונות קיר', 'בניית ארונות הזזה', 'בניית ארונות אמבטיה', 'בניית חדר שינה', 'בניית שולחן', 'בניית כסאות', 'בניית מזנון', 'בניית ספריה', 'בניית רהיטים ייחודים', 'בניית מדפים', 'בניית חדר ארונות', 'בניית מיטה מעץ', 'בניית ארונות מטבח']
      },
      { 
        name: 'furniture_repair_types', 
        label: 'serviceFields.carpentry.furniture_repair_types', 
        type: 'checkbox',
        options: ['תיקון ארונות קיר', 'תיקון שולחן', 'תיקון כסאות', 'תיקון ארונות הזזה', 'תיקון ארונות אמבטיה', 'תיקון חדר שינה', 'תיקון מזנון', 'תיקון ספרייה', 'תיקון רהיטים אחרים']
      },
      { 
        name: 'other_carpentry_types', 
        label: 'serviceFields.carpentry.other_carpentry_types', 
        type: 'checkbox',
        options: ['חיפוי עץ לקיר', 'פירוק והרכבת רהיטים', 'בניית דלתות', 'תיקון דלתות', 'חידוש דלתות כניסה מעץ', 'בניית קומת גלריה', 'מדרגות עץ לבית', 'משרביות מעץ', 'בוצ\'ר עץ']
      },
      { 
        name: 'outdoor_carpentry_types', 
        label: 'serviceFields.carpentry.outdoor_carpentry_types', 
        type: 'checkbox',
        options: ['פרגולות', 'דקים', 'גדרות ומחיצות עץ']
      },
      { 
        name: 'pergola_types', 
        label: 'serviceFields.carpentry.pergola_types', 
        type: 'checkbox',
        options: ['פרגולות עץ', 'פרגולות הצללה', 'סגירת מרפסת']
      },
      { 
        name: 'deck_types', 
        label: 'serviceFields.carpentry.deck_types', 
        type: 'checkbox',
        options: ['דקים מעץ טבעי', 'דק סינטטי (קומפוזיט)', 'שיקום / חידוש דקים']
      },
      { 
        name: 'fence_types', 
        label: 'serviceFields.carpentry.fence_types', 
        type: 'checkbox',
        options: ['גדרות עץ', 'מחיצות עץ לגינה', 'שערי עץ']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.home_organization.work_types', 
        type: 'checkbox',
        options: ['סידור כללי', 'סידור + מיון', 'ארגון מקצועי']
      },
      { 
        name: 'general_organization_types', 
        label: 'serviceFields.home_organization.general_organization_types', 
        type: 'checkbox',
        options: ['סידור בית מלא', 'סידור חדרים', 'סידור מטבח', 'סידור חדר ילדים', 'סידור חדר ארונות / ארונות בגדים', 'סידור חדר אמבטיה']
      },
      { 
        name: 'sorting_types', 
        label: 'serviceFields.home_organization.sorting_types', 
        type: 'checkbox',
        options: ['מיון חפצים', 'מיון בגדים', 'מיון צעצועים', 'הכנת חפצים למסירה / תרומה']
      },
      { 
        name: 'professional_organization_types', 
        label: 'serviceFields.home_organization.professional_organization_types', 
        type: 'checkbox',
        options: ['יצירת פתרונות אחסון', 'אופטימיזציה של חללים קטנים', 'עיצוב וסידור מדפים']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
      }
    ]
  },

  event_entertainment: {
    fields: [
      { name: 'age', label: 'serviceFields.event_entertainment.age', type: 'number' },
      { name: 'experience', label: 'serviceFields.event_entertainment.experience', type: 'number' },
      { 
        name: 'availability_days', 
        label: 'serviceFields.event_entertainment.availability_days', 
        type: 'checkbox',
        options: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'כל השבוע']
      },
      { 
        name: 'availability_hours', 
        label: 'serviceFields.event_entertainment.availability_hours', 
        type: 'checkbox',
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      {
        name: 'work_types',
        label: 'serviceFields.event_entertainment.work_types',
        type: 'checkbox',
        options: ['השכרת ציוד לאירועים', 'סוגי ההפעלה', 'דוכני מזון לאירועים', 'אחר', 'DJ']
      },
      { 
        name: 'equipment_rental_types', 
        label: 'serviceFields.event_entertainment.equipment_rental_types', 
        type: 'checkbox',
        options: ['🍿 מכונות מזון', '🎪 השכרת מתנפחים ומשחקים', '💨 מכונות אפקטים להשכרה']
      },
      { 
        name: 'food_machine_types', 
        label: 'serviceFields.event_entertainment.food_machine_types', 
        type: 'checkbox',
        options: ['מכונת פופקורן', 'מכונת סוכר-בורי', 'מכונת ברד', 'מכונת וופל בלגי', 'מכונת גרניטה וקפה בר', 'מכונת גלידה אמריקאית', 'מכונת מילקשייק', 'מסחטת מיצים טריים', 'מכונת נקניקיות', 'מחבת קרפים', 'מזרקת שוקולד']
      },
      { 
        name: 'inflatable_game_types', 
        label: 'serviceFields.event_entertainment.inflatable_game_types', 
        type: 'checkbox',
        options: ['מתנפחים', 'ג\'ימבורי', 'עמדות משחק']
      },
      { 
        name: 'effect_machine_types', 
        label: 'serviceFields.event_entertainment.effect_machine_types', 
        type: 'checkbox',
        options: ['מכונת עשן', 'מכונת שלג', 'מכונת בועות']
      },
      { 
        name: 'entertainment_types', 
        label: 'serviceFields.event_entertainment.entertainment_types', 
        type: 'checkbox',
        options: ['קוסם ילדים', 'קוסם', 'ליצן ילדים', 'בלוני צורות', 'הפרחת בלונים / ניפוח בלונים במקום', 'דמויות ותחפושות', 'שעשועונים ומשחקי קבוצה', 'מופע בועות סבון', 'הפעלה מוזיקלית / ריקודים']
      },
      {
        name: 'food_stand_types',
        label: 'serviceFields.event_entertainment.food_stand_types',
        type: 'checkbox',
        options: ['פופקורן', 'ברבה פאפא', 'הוט דוג', 'גרניטה / סלאש', 'קרפים', 'וופלים', 'גלידה', 'קפה', 'סוכריות', 'שוקולד', 'נאצ\'וס', 'המבורגרים', 'פיצה']
      },
      {
        name: 'other_types',
        label: 'serviceFields.event_entertainment.other_types',
        type: 'checkbox',
        options: ['איפור פנים מקצועי', 'בלוני קשת', 'צילום מגנטים']
      },
      {
        name: 'dj_event_types',
        label: 'serviceFields.event_entertainment.dj_event_types',
        type: 'checkbox',
        options: ['חתונה', 'בר מצווה', 'בת מצווה', 'ברית מילה', 'שבע ברכות', 'יום הולדת / יום שנה', 'אירוע עסקי', 'מסיבה פרטית', 'חגיגה משפחתית', 'אירוסין']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
      }
    ]
  },

  private_chef: {
    fields: [
      { name: 'experience', label: 'serviceFields.private_chef.experience', type: 'number' },
      {
        name: 'provider_type',
        label: 'serviceFields.private_chef.provider_type',
        type: 'checkbox',
        options: ['קייטרינג', 'שף פרטי']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.private_chef.availability_hours',
        type: 'checkbox',
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      {
        name: 'work_types',
        label: 'serviceFields.private_chef.work_types',
        type: 'checkbox',
        options: ['סוג האירוע', 'סוג המטבח', 'כשרות']
      },
      {
        name: 'event_types',
        label: 'serviceFields.private_chef.event_types',
        type: 'checkbox',
        options: [
          'חתונה', 'בר מצווה', 'בת מצווה', 'ברית מילה', 'פדיון הבן',
          'שבע ברכות', 'יום הולדת / יום שנה', 'קידוש', 'שבת חתן',
          'אירוע עסקי', 'מסיבה פרטית', 'חגיגה משפחתית', 'אירוסין', 'סעודות שבת'
        ]
      },
      {
        name: 'cuisine_types',
        label: 'serviceFields.private_chef.cuisine_types',
        type: 'checkbox',
        options: ['פיצות', 'סושי', 'סלטים', 'אסייתי', 'פסטות', 'בשרי', 'טבעוני / צמחוני', 'לא גלוטן', 'קינוחים', 'סלטי שבת', 'חלבי', 'מגשי פירות', 'חלות שבת', 'שוקולדים', 'מקרון', 'פטיסרי', 'קופסת עוגות']
      },
      {
        name: 'kosher_types',
        label: 'serviceFields.private_chef.kosher_types',
        type: 'checkbox',
        options: [
          'בד"ץ העדה החרדית', 'בד"ץ בית יוסף', 'בד"ץ יורה דעה (ר׳ שלמה מחפוד)',
          'בד"ץ מחזיקי הדת – בעלז', 'בד"ץ שארית ישראל', 'בד"ץ נתיבות כשרות',
          'בד"ץ חוג חתם סופר בני ברק', 'בד"ץ חוג חתם סופר פ״ת', 'בד"ץ מקווה ישראל',
          'בד"ץ רבני צפת', 'כשרות הרב לנדא', 'כשרות הרב רובין', 'רבנות מהדרין', 'רבנות', 'אחר'
        ]
      },
      { name: 'kosher_other', label: 'serviceFields.private_chef.kosher_other', type: 'text' },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      {
        name: 'work_types',
        label: 'serviceFields.photographer.work_types',
        type: 'checkbox',
        options: ['סוג האירוע']
      },
      {
        name: 'event_types',
        label: 'serviceFields.photographer.event_types',
        type: 'checkbox',
        options: ['בר מצווה', 'בת מצווה', 'חתונה', 'אירוסין', 'תספורת', 'שוטינג פוטו', 'אירועים פרטיים']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['קשתות ועיצוב בלונים', 'עיצוב שולחנות', 'עיצוב אולמות', 'קירות צילום ופינות צילום']
      },
      {
        name: 'availability_hours',
        label: 'serviceFields.event_decoration.availability_hours',
        type: 'checkbox',
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      {
        name: 'avoda_ivrit',
        label: 'serviceFields.moving.avoda_ivrit',
        type: 'checkbox',
        options: ['עבודה עברית']
      },
      {
        name: 'packing_materials',
        label: 'serviceFields.moving.packing_materials',
        type: 'checkbox',
        options: ['כן']
      },
      {
        name: 'crane_services',
        label: 'serviceFields.moving.crane_services',
        type: 'checkbox',
        options: ['כן']
      },
      {
        name: 'cardboard_supply',
        label: 'serviceFields.moving.cardboard_supply',
        type: 'checkbox',
        options: ['כן']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.painting.work_types', 
        type: 'checkbox',
        options: ['צביעה כללית של דירה', 'תיקוני קירות – חורים, סדקים, שפכטל', 'החלקת קירות (שפכטל מלא)', 'תיקון רטיבות / עובש', 'קילופי צבע ישן', 'צביעת אפקטים – בטון, משי, אומבר', 'צביעת קיר דקורטיבי / Accent Wall', 'טקסטורות מיוחדות']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
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
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.contractor.work_types', 
        type: 'checkbox',
        options: ['עבודות שלד', 'שיפוצים כלליים', 'חשמל ואינסטלציה', 'עבודות חוץ', 'שיקום ותיקון חוץ']
      },
      { 
        name: 'structure_work_types', 
        label: 'serviceFields.contractor.structure_work_types', 
        type: 'checkbox',
        options: ['בניית שלד', 'יציקות בטון', 'טפסנות', 'חיזוק מבנים', 'בניית קירות בלוקים', 'הריסה ובנייה מחדש']
      },
      { 
        name: 'general_renovation_types', 
        label: 'serviceFields.contractor.general_renovation_types', 
        type: 'checkbox',
        options: ['שיפוץ דירה מלא', 'שיפוץ חדרים', 'שיפוץ חדרי רחצה', 'שיפוץ מטבח', 'החלפת ריצוף', 'עבודות גבס', 'טיח ושפכטל', 'סגירת מרפסת', 'צביעה מקצועית', 'החלפת דלתות ומשקופים']
      },
      { 
        name: 'electric_plumbing_types', 
        label: 'serviceFields.contractor.electric_plumbing_types', 
        type: 'checkbox',
        options: ['עבודות חשמל', 'החלפת לוח חשמל', 'אינסטלציה כללית', 'החלפת צנרת', 'איתור ותיקון נזילות']
      },
      { 
        name: 'exterior_work_types', 
        label: 'serviceFields.contractor.exterior_work_types', 
        type: 'checkbox',
        options: ['ריצוף חוץ', 'בניית פרגולה', 'חיפויי אבן / חיפויי קירות חוץ', 'גידור', 'בניית שבילים בגינה']
      },
      { 
        name: 'facade_repair_types', 
        label: 'serviceFields.contractor.facade_repair_types', 
        type: 'checkbox',
        options: ['תיקון טיח חוץ', 'שיקום קירות חיצוניים', 'איטום סדקים בקירות', 'טיפול בנפילת טיח']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.aluminum.work_types', 
        type: 'checkbox',
        options: ['חלונות ודלתות', 'פרגולות ואלומיניום חוץ', 'תיקונים ושירות', 'חיפויי אלומיניום']
      },
      { 
        name: 'windows_doors_types', 
        label: 'serviceFields.aluminum.windows_doors_types', 
        type: 'checkbox',
        options: ['התקנת חלונות אלומיניום', 'דלתות אלומיניום', 'דלתות הזזה (ויטרינות)', 'דלתות כניסה מאלומיניום', 'רשתות נגד יתושים', 'תריסים ידניים', 'תריסים חשמליים']
      },
      { 
        name: 'pergolas_outdoor_types', 
        label: 'serviceFields.aluminum.pergolas_outdoor_types', 
        type: 'checkbox',
        options: ['פרגולות אלומיניום', 'סגירת מרפסות', 'חיפויי אלומיניום חיצוניים', 'מעקות אלומיניום לגינה / מרפסות']
      },
      { 
        name: 'repairs_service_types', 
        label: 'serviceFields.aluminum.repairs_service_types', 
        type: 'checkbox',
        options: ['תיקון מנועי תריס חשמלי', 'תיקון מסילות', 'תיקון גלגלים בחלונות', 'החלפת ידיות / צירים', 'איטום וחידוש מסביב לחלונות', 'תיקון תריסים ידניים']
      },
      { 
        name: 'cladding_types', 
        label: 'serviceFields.aluminum.cladding_types', 
        type: 'checkbox',
        options: ['חיפוי צנרת / כיסוי צינורות', 'חיפוי מונים (חשמל / מים / גז)', 'ארגזים דקורטיביים מאלומיניום', 'חיפוי קווי מזגן', 'הגנה למנוע מזגן חיצוני', 'חיפוי קירות חוץ מאלומיניום', 'חיפויים דקורטיביים', 'חיפוי וארגזי תריס']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.glass_works.work_types', 
        type: 'checkbox',
        options: ['זכוכית למקלחונים', 'זכוכית לחלונות ודלתות', 'זכוכית למטבח ובית', 'זכוכית מיוחדת ובטיחות', 'שירותי תיקון והתאמה אישית']
      },
      { 
        name: 'shower_glass_types', 
        label: 'serviceFields.glass_works.shower_glass_types', 
        type: 'checkbox',
        options: ['התקנת מקלחון זכוכית', 'תיקון מקלחון', 'החלפת זכוכית במקלחון', 'דלתות מקלחת']
      },
      { 
        name: 'windows_doors_glass_types', 
        label: 'serviceFields.glass_works.windows_doors_glass_types', 
        type: 'checkbox',
        options: ['החלפת זכוכית בחלון', 'זכוכית מבודדת (Double)', 'זיגוג מחדש', 'דלתות זכוכית פנימיות', 'מחיצות זכוכית']
      },
      { 
        name: 'kitchen_home_glass_types', 
        label: 'serviceFields.glass_works.kitchen_home_glass_types', 
        type: 'checkbox',
        options: ['זכוכית למטבח (Backsplash)', 'מדפי זכוכית', 'שולחנות זכוכית', 'מראות לחדר אמבטיה', 'מראות דקורטיביות']
      },
      { 
        name: 'special_safety_glass_types', 
        label: 'serviceFields.glass_works.special_safety_glass_types', 
        type: 'checkbox',
        options: ['זכוכית מחוסמת (בטיחותית)', 'זכוכית חכמה', 'זכוכית עמידה לפריצה', 'זכוכית אקוסטית (בידוד רעש)', 'זכוכית צבעונית / מעוצבת']
      },
      { 
        name: 'repair_custom_types', 
        label: 'serviceFields.glass_works.repair_custom_types', 
        type: 'checkbox',
        options: ['תיקון שריטות וסדקים', 'ליטוש זכוכית', 'חיתוך זכוכית לפי מידה']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
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
        options: ['בוקר', 'אחר הצהריים', 'ערב', 'הכל']
      },
      { 
        name: 'work_types', 
        label: 'serviceFields.locksmith.work_types', 
        type: 'checkbox',
        options: ['החלפת מנעולים', 'פתיחת דלתות', 'התקנת מערכות נעילה', 'תיקון מנעולים ודלתות', 'שירותי ביטחון']
      },
      { 
        name: 'lock_replacement_types', 
        label: 'serviceFields.locksmith.lock_replacement_types', 
        type: 'checkbox',
        options: ['מנעול צילינדר', 'מנעול ביטחון', 'מנעול דלת כניסה', 'מנעול למשרד / חנות']
      },
      { 
        name: 'door_opening_types', 
        label: 'serviceFields.locksmith.door_opening_types', 
        type: 'checkbox',
        options: ['פתיחת דלת ללא נזק', 'פתיחה חירום 24/7', 'פתיחת כספת', 'שכפול מפתחות במקום']
      },
      { 
        name: 'lock_system_installation_types', 
        label: 'serviceFields.locksmith.lock_system_installation_types', 
        type: 'checkbox',
        options: ['מנעולים חכמים', 'מערכת אינטרקום', 'קוד כניסה למשרדים', 'מנעול אלקטרוני']
      },
      { 
        name: 'lock_door_repair_types', 
        label: 'serviceFields.locksmith.lock_door_repair_types', 
        type: 'checkbox',
        options: ['תיקון מנעול תקוע', 'תיקון ציר דלת', 'שיוף דלת שלא נסגרת', 'החלפת ידית דלת']
      },
      {
        name: 'security_services_types',
        label: 'serviceFields.locksmith.security_services_types',
        type: 'checkbox',
        options: ['שדרוג מערכת ביטחון', 'התקנת דלת ביטחון', 'בדיקת פגיעות דלת', 'שירות מסגרות מסחרי']
      },
      {
        name: 'languages',
        label: 'serviceFields.eldercare.languages',
        type: 'checkbox',
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
      }
    ]
  },

  handyman: {
    fields: [
      {
        name: 'availability_hours',
        label: 'serviceFields.handyman.availability_hours',
        type: 'checkbox',
        options: ['בוקר', 'צהריים', 'ערב', '24/7']
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
        options: ['תיקון דלתות', 'תיקון רהיטים']
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
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
      }
    ]
  },

  pest_control: {
    fields: [
      {
        name: 'availability_hours',
        label: 'serviceFields.electrician.availability_hours',
        type: 'checkbox',
        options: ['בוקר', 'צהריים', 'ערב', '24/7']
      },
      { name: 'experience', label: 'serviceForm.common.experience', type: 'number' },
      {
        name: 'pestTypes',
        label: 'serviceForm.pest_control.pestTypes',
        type: 'checkbox',
        options: [
          'הדברת תיקנים', 'הדברת נמלים', 'הדברת פשפשים', 'הדברת פרעושים', 'הדברת יתושים',
          'הדברת חולדות', 'הדברת עכברים',
          'הרחקת יונים', 'רשתות נגד יונים', 'הרחקת עטלפים', 'הרחקת נחשים'
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
        options: ['עברית', 'אנגלית', 'צרפתית', 'ספרדית', 'ערבית', 'רוסית']
      }
    ]
  }
};

export default serviceFieldsConfig;