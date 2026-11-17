// Massage / עיסוי (service_type: massage) — options des cases à cocher, partagées entre
// le formulaire d'inscription, les filtres, la fiche prestataire et la validation.
// `value` = valeur hébraïque stockée en base (stable) ; `key` = clé de traduction.
// Les noms de champs finissent par "_types" : le filtre générique de backend/routes/search.js
// les gère sans cas particulier. Champs préfixés "mas_" pour éviter toute collision.
// Le tuina (massage chinois) est un type de massage ici ; l'acupuncture (service séparé)
// le propose aussi comme technique complémentaire.

export const MASSAGE_GROUPS = [
  {
    field: 'mas_massage_types',
    titleKey: 'serviceForm.massage.typesTitle',
    required: true,
    options: [
      { value: 'עיסוי שוודי (רגיעה)', key: 'serviceForm.massage.types.swedish' },
      { value: 'עיסוי רקמות עמוק', key: 'serviceForm.massage.types.deepTissue' },
      { value: 'עיסוי ספורטיבי', key: 'serviceForm.massage.types.sports' },
      { value: 'טווינא (עיסוי סיני)', key: 'serviceForm.massage.types.tuina' },
      { value: 'שיאצו', key: 'serviceForm.massage.types.shiatsu' },
      { value: 'רפלקסולוגיה', key: 'serviceForm.massage.types.reflexology' },
      { value: 'עיסוי תאילנדי', key: 'serviceForm.massage.types.thai' },
      { value: 'עיסוי באבנים חמות', key: 'serviceForm.massage.types.hotStones' },
      { value: 'עיסוי ארומתרפי', key: 'serviceForm.massage.types.aromatherapy' },
      { value: 'עיסוי איורוודי', key: 'serviceForm.massage.types.ayurvedic' },
      { value: 'ניקוז לימפתי', key: 'serviceForm.massage.types.lymphatic' },
      { value: 'עיסוי הריון', key: 'serviceForm.massage.types.prenatal' },
    ],
  },
  {
    field: 'mas_condition_types',
    titleKey: 'serviceForm.massage.conditionsTitle',
    required: true,
    options: [
      { value: 'הרפיה והפגת מתחים', key: 'serviceForm.massage.conditions.relaxation' },
      { value: 'כאבי גב וצוואר', key: 'serviceForm.massage.conditions.backNeck' },
      { value: 'מתחים בשרירים', key: 'serviceForm.massage.conditions.muscleTension' },
      { value: 'התאוששות מפעילות ספורטיבית', key: 'serviceForm.massage.conditions.sportsRecovery' },
      { value: 'כאבי ראש', key: 'serviceForm.massage.conditions.headache' },
      { value: 'כבדות ברגליים וזרימת דם', key: 'serviceForm.massage.conditions.legsCirculation' },
      { value: 'הריון ואחרי לידה', key: 'serviceForm.massage.conditions.pregnancy' },
      { value: 'שיקום אחרי פציעה', key: 'serviceForm.massage.conditions.injuryRecovery' },
    ],
  },
  {
    field: 'mas_audience_types',
    titleKey: 'serviceForm.massage.audienceTitle',
    required: true,
    options: [
      { value: 'תינוקות', key: 'serviceForm.massage.audience.babies' },
      { value: 'ילדים', key: 'serviceForm.massage.audience.children' },
      { value: 'בני נוער', key: 'serviceForm.massage.audience.teens' },
      { value: 'מבוגרים', key: 'serviceForm.massage.audience.adults' },
      { value: 'נשים בהריון', key: 'serviceForm.massage.audience.pregnant' },
      { value: 'קשישים', key: 'serviceForm.massage.audience.seniors' },
      { value: 'ספורטאים', key: 'serviceForm.massage.audience.athletes' },
      { value: 'גברים בלבד', key: 'serviceForm.massage.audience.menOnly' },
      { value: 'נשים בלבד', key: 'serviceForm.massage.audience.womenOnly' },
    ],
  },
  {
    field: 'mas_location_types',
    titleKey: 'serviceForm.massage.locationsTitle',
    required: true,
    options: [
      { value: 'בקליניקה שלי', key: 'serviceForm.massage.locations.clinic' },
      { value: 'בבית הלקוח', key: 'serviceForm.massage.locations.clientHome' },
      { value: 'במקום העבודה', key: 'serviceForm.massage.locations.workplace' },
    ],
  },
];

// Horaires
export { ART_THERAPY_HOURS as MASSAGE_HOURS } from './artTherapy';

export const MASSAGE_QUALIFICATIONS_MAX = 300;
