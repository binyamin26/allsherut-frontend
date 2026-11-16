// Ostéopathe / אוסטאופת (service_type: osteopath) — options des cases à cocher, partagées entre
// le formulaire d'inscription, les filtres, la fiche prestataire et la validation.
// `value` = valeur hébraïque stockée en base (stable) ; `key` = clé de traduction.
// Les noms de champs finissent par "_types" : le filtre générique de backend/routes/search.js
// les gère sans cas particulier. Champs préfixés "osteo_" pour éviter toute collision.

export const OSTEOPATH_GROUPS = [
  {
    field: 'osteo_condition_types',
    titleKey: 'serviceForm.osteopath.conditionsTitle',
    required: true,
    options: [
      { value: 'כאבי גב וצוואר', key: 'serviceForm.osteopath.conditions.backNeck' },
      { value: 'כאבי ראש ומיגרנות', key: 'serviceForm.osteopath.conditions.headache' },
      { value: 'כאבי מפרקים (כתף, ברך, ירך)', key: 'serviceForm.osteopath.conditions.joints' },
      { value: 'פציעות ספורט', key: 'serviceForm.osteopath.conditions.sports' },
      { value: 'בעיות יציבה', key: 'serviceForm.osteopath.conditions.posture' },
      { value: 'בעיות לסת (TMJ)', key: 'serviceForm.osteopath.conditions.jaw' },
      { value: 'הריון ואחרי לידה', key: 'serviceForm.osteopath.conditions.pregnancy' },
      { value: 'מתחים בשרירים', key: 'serviceForm.osteopath.conditions.muscleTension' },
    ],
  },
  {
    field: 'osteo_technique_types',
    titleKey: 'serviceForm.osteopath.techniquesTitle',
    required: true,
    options: [
      { value: 'אוסטאופתיה מבנית (מפרקים ושרירים)', key: 'serviceForm.osteopath.techniques.structural' },
      { value: 'אוסטאופתיה קרניאלית', key: 'serviceForm.osteopath.techniques.cranial' },
      { value: 'אוסטאופתיה ויסצרלית (איברים פנימיים)', key: 'serviceForm.osteopath.techniques.visceral' },
      { value: 'טיפול בפאשיה', key: 'serviceForm.osteopath.techniques.fascial' },
      { value: 'טכניקות אנרגיית שריר', key: 'serviceForm.osteopath.techniques.muscleEnergy' },
      { value: 'טכניקות משולבות', key: 'serviceForm.osteopath.techniques.mixed' },
    ],
  },
  {
    field: 'osteo_audience_types',
    titleKey: 'serviceForm.osteopath.audienceTitle',
    required: true,
    options: [
      { value: 'תינוקות', key: 'serviceForm.osteopath.audience.babies' },
      { value: 'ילדים', key: 'serviceForm.osteopath.audience.children' },
      { value: 'בני נוער', key: 'serviceForm.osteopath.audience.teens' },
      { value: 'מבוגרים', key: 'serviceForm.osteopath.audience.adults' },
      { value: 'נשים בהריון', key: 'serviceForm.osteopath.audience.pregnant' },
      { value: 'קשישים', key: 'serviceForm.osteopath.audience.seniors' },
      { value: 'ספורטאים', key: 'serviceForm.osteopath.audience.athletes' },
      { value: 'גברים בלבד', key: 'serviceForm.osteopath.audience.menOnly' },
      { value: 'נשים בלבד', key: 'serviceForm.osteopath.audience.womenOnly' },
    ],
  },
  {
    field: 'osteo_location_types',
    titleKey: 'serviceForm.osteopath.locationsTitle',
    required: true,
    options: [
      { value: 'בקליניקה שלי', key: 'serviceForm.osteopath.locations.clinic' },
      { value: 'בבית הלקוח', key: 'serviceForm.osteopath.locations.clientHome' },
    ],
  },
];

// Horaires
export { ART_THERAPY_HOURS as OSTEOPATH_HOURS } from './artTherapy';

export const OSTEOPATH_QUALIFICATIONS_MAX = 300;
