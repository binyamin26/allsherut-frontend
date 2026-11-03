// Art-thérapie (service_type: art_therapy) — options des cases à cocher, partagées entre
// le formulaire d'inscription, les filtres, la fiche prestataire et la validation.
// `value` = valeur hébraïque stockée en base (stable) ; `key` = clé de traduction.
// Les noms de champs finissent par "_types" : le filtre générique de backend/routes/search.js
// les gère sans cas particulier.

export const ART_THERAPY_GROUPS = [
  {
    field: 'technique_types',
    titleKey: 'serviceForm.art_therapy.techniquesTitle',
    required: true,
    options: [
      { value: 'ציור וצביעה', key: 'serviceForm.art_therapy.technique.drawing' },
      { value: 'פיסול ויצירה בחומר', key: 'serviceForm.art_therapy.technique.sculpture' },
      { value: 'קולאז׳ ואמנות פלסטית', key: 'serviceForm.art_therapy.technique.collage' },
      { value: 'יצירה חופשית', key: 'serviceForm.art_therapy.technique.freeCreation' },
      { value: 'טכניקות משולבות', key: 'serviceForm.art_therapy.technique.mixed' },
    ],
  },
  {
    field: 'audience_types',
    titleKey: 'serviceForm.art_therapy.audienceTitle',
    required: true,
    options: [
      { value: 'ילדים צעירים', key: 'serviceForm.art_therapy.audience.youngChildren' },
      { value: 'ילדים', key: 'serviceForm.art_therapy.audience.children' },
      { value: 'בני נוער', key: 'serviceForm.art_therapy.audience.teens' },
      { value: 'מבוגרים', key: 'serviceForm.art_therapy.audience.adults' },
      { value: 'קשישים', key: 'serviceForm.art_therapy.audience.seniors' },
      { value: 'כל הגילאים', key: 'serviceForm.art_therapy.audience.allAges' },
    ],
  },
  {
    field: 'goal_types',
    titleKey: 'serviceForm.art_therapy.goalsTitle',
    required: false,
    options: [
      { value: 'הבעה וויסות רגשות', key: 'serviceForm.art_therapy.goal.expression' },
      { value: 'התמודדות עם לחץ וחרדה', key: 'serviceForm.art_therapy.goal.stress' },
      { value: 'ביטחון עצמי וערך עצמי', key: 'serviceForm.art_therapy.goal.selfEsteem' },
      { value: 'תמיכה רגשית לאחר אירוע קשה', key: 'serviceForm.art_therapy.goal.emotionalSupport' },
      { value: 'התפתחות אישית ובין-אישית', key: 'serviceForm.art_therapy.goal.personalGrowth' },
      { value: 'קשיים רגשיים והתנהגותיים', key: 'serviceForm.art_therapy.goal.behavioral' },
    ],
  },
  {
    field: 'session_types',
    titleKey: 'serviceForm.art_therapy.sessionsTitle',
    required: true,
    options: [
      { value: 'טיפול פרטני', key: 'serviceForm.art_therapy.session.individual' },
      { value: 'טיפול קבוצתי', key: 'serviceForm.art_therapy.session.group' },
      { value: 'מפגשי הורה-ילד', key: 'serviceForm.art_therapy.session.parentChild' },
    ],
  },
  {
    field: 'location_types',
    titleKey: 'serviceForm.art_therapy.locationsTitle',
    required: true,
    options: [
      { value: 'בקליניקה שלי', key: 'serviceForm.art_therapy.location.clinic' },
      { value: 'בבית הלקוח', key: 'serviceForm.art_therapy.location.clientHome' },
      { value: 'אונליין', key: 'serviceForm.art_therapy.location.online' },
    ],
  },
];

// Horaires (facultatifs)
export const ART_THERAPY_HOURS = [
  { value: 'בוקר', key: 'hours.morning' },
  { value: 'אחר הצהריים', key: 'hours.afternoon' },
  { value: 'ערב', key: 'hours.evening' },
  { value: 'הכל', key: 'hours.all' },
];

export const ART_THERAPY_QUALIFICATIONS_MAX = 300;
