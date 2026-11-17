// Acupuncteur / דיקור סיני (service_type: acupuncture) — options des cases à cocher, partagées entre
// le formulaire d'inscription, les filtres, la fiche prestataire et la validation.
// `value` = valeur hébraïque stockée en base (stable) ; `key` = clé de traduction.
// Les noms de champs finissent par "_types" : le filtre générique de backend/routes/search.js
// les gère sans cas particulier. Champs préfixés "acu_" pour éviter toute collision.
// Le tuina (massage chinois) figure ici comme technique complémentaire ; un futur service
// "Massage" pourra l'accueillir comme type de massage.

export const ACUPUNCTURE_GROUPS = [
  {
    field: 'acu_condition_types',
    titleKey: 'serviceForm.acupuncture.conditionsTitle',
    required: true,
    options: [
      { value: 'כאבי גב וצוואר', key: 'serviceForm.acupuncture.conditions.backNeck' },
      { value: 'כאבי ראש ומיגרנות', key: 'serviceForm.acupuncture.conditions.headache' },
      { value: 'כאבי מפרקים ושרירים', key: 'serviceForm.acupuncture.conditions.jointsMuscles' },
      { value: 'לחץ וחרדה', key: 'serviceForm.acupuncture.conditions.stressAnxiety' },
      { value: 'הפרעות שינה ונדודי שינה', key: 'serviceForm.acupuncture.conditions.sleep' },
      { value: 'בעיות עיכול', key: 'serviceForm.acupuncture.conditions.digestive' },
      { value: 'פוריות ותמיכה בטיפולי הפריה', key: 'serviceForm.acupuncture.conditions.fertility' },
      { value: 'הריון ואחרי לידה', key: 'serviceForm.acupuncture.conditions.pregnancy' },
      { value: 'גיל המעבר ובעיות הורמונליות', key: 'serviceForm.acupuncture.conditions.hormonal' },
      { value: 'אלרגיות ובעיות נשימה', key: 'serviceForm.acupuncture.conditions.allergiesRespiratory' },
      { value: 'גמילה מעישון והתמכרויות', key: 'serviceForm.acupuncture.conditions.addictions' },
      { value: 'פציעות ספורט', key: 'serviceForm.acupuncture.conditions.sports' },
    ],
  },
  {
    field: 'acu_technique_types',
    titleKey: 'serviceForm.acupuncture.techniquesTitle',
    required: true,
    options: [
      { value: 'דיקור סיני מסורתי', key: 'serviceForm.acupuncture.techniques.traditional' },
      { value: 'דיקור חשמלי', key: 'serviceForm.acupuncture.techniques.electro' },
      { value: 'דיקור אוזן', key: 'serviceForm.acupuncture.techniques.auricular' },
      { value: 'מוקסה (חימום)', key: 'serviceForm.acupuncture.techniques.moxibustion' },
      { value: 'כוסות רוח', key: 'serviceForm.acupuncture.techniques.cupping' },
      { value: 'דיקור יבש (Dry Needling)', key: 'serviceForm.acupuncture.techniques.dryNeedling' },
      { value: 'לחיצות דיקור (אקופרסורה)', key: 'serviceForm.acupuncture.techniques.acupressure' },
      { value: 'טווינא (עיסוי סיני)', key: 'serviceForm.acupuncture.techniques.tuina' },
      { value: 'צמחי מרפא סיניים', key: 'serviceForm.acupuncture.techniques.herbs' },
    ],
  },
  {
    field: 'acu_audience_types',
    titleKey: 'serviceForm.acupuncture.audienceTitle',
    required: true,
    options: [
      { value: 'ילדים', key: 'serviceForm.acupuncture.audience.children' },
      { value: 'בני נוער', key: 'serviceForm.acupuncture.audience.teens' },
      { value: 'מבוגרים', key: 'serviceForm.acupuncture.audience.adults' },
      { value: 'נשים בהריון', key: 'serviceForm.acupuncture.audience.pregnant' },
      { value: 'קשישים', key: 'serviceForm.acupuncture.audience.seniors' },
      { value: 'ספורטאים', key: 'serviceForm.acupuncture.audience.athletes' },
      { value: 'גברים בלבד', key: 'serviceForm.acupuncture.audience.menOnly' },
      { value: 'נשים בלבד', key: 'serviceForm.acupuncture.audience.womenOnly' },
    ],
  },
  {
    field: 'acu_location_types',
    titleKey: 'serviceForm.acupuncture.locationsTitle',
    required: true,
    options: [
      { value: 'בקליניקה שלי', key: 'serviceForm.acupuncture.locations.clinic' },
      { value: 'בבית הלקוח', key: 'serviceForm.acupuncture.locations.clientHome' },
    ],
  },
];

// Horaires
export { ART_THERAPY_HOURS as ACUPUNCTURE_HOURS } from './artTherapy';

export const ACUPUNCTURE_QUALIFICATIONS_MAX = 300;
