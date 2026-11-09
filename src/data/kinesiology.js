// Kinésiologie (service_type: kinesiology) — options des cases à cocher, partagées entre
// le formulaire d'inscription, les filtres, la fiche prestataire et la validation.
// `value` = valeur hébraïque stockée en base (stable) ; `key` = clé de traduction.
// Les noms de champs finissent par "_types" : le filtre générique de backend/routes/search.js
// les gère sans cas particulier.
// Public / type de séances / lieu : mêmes champs, valeurs et traductions que l'art-thérapie
// (données réutilisées de ART_THERAPY_GROUPS, ce qui garde ServiceDetailsEditor et
// translationMapper fonctionnels sans cas particulier). Seuls techniques et objectifs sont propres
// à la kinésiologie, avec des noms de champs préfixés "kine_" pour ne pas entrer en collision.

import { ART_THERAPY_GROUPS } from './artTherapy';

const shared = (field) => ART_THERAPY_GROUPS.find(g => g.field === field);

export const KINESIOLOGY_GROUPS = [
  {
    field: 'kine_technique_types',
    titleKey: 'serviceForm.kinesiology.techniquesTitle',
    required: true,
    options: [
      { value: 'קינזיולוגיה יישומית (בדיקת שרירים)', key: 'serviceForm.kinesiology.technique.applied' },
      { value: 'קינזיולוגיה רגשית', key: 'serviceForm.kinesiology.technique.emotional' },
      { value: 'Touch for Health', key: 'serviceForm.kinesiology.technique.touchForHealth' },
      { value: 'Brain Gym / Edu-K (למידה ותיאום)', key: 'serviceForm.kinesiology.technique.brainGym' },
      { value: 'קינזיולוגיה מתמחה', key: 'serviceForm.kinesiology.technique.specialized' },
      { value: 'טכניקות משולבות', key: 'serviceForm.kinesiology.technique.mixed' },
    ],
  },
  shared('audience_types'),
  {
    field: 'kine_goal_types',
    titleKey: 'serviceForm.kinesiology.goalsTitle',
    required: false,
    options: [
      { value: 'התמודדות עם לחץ וחרדה', key: 'serviceForm.kinesiology.goal.stress' },
      { value: 'שינה והתאוששות', key: 'serviceForm.kinesiology.goal.sleep' },
      { value: 'קשיי למידה וריכוז', key: 'serviceForm.kinesiology.goal.learning' },
      { value: 'ביטחון עצמי', key: 'serviceForm.kinesiology.goal.selfEsteem' },
      { value: 'חסימות רגשיות', key: 'serviceForm.kinesiology.goal.emotionalBlocks' },
      { value: 'מתחים ואי-נוחות בגוף', key: 'serviceForm.kinesiology.goal.bodyTension' },
      { value: 'איזון כללי ורווחה', key: 'serviceForm.kinesiology.goal.wellbeing' },
    ],
  },
  shared('session_types'),
  shared('location_types'),
];

// Horaires (facultatifs) — mêmes options que l'art-thérapie
export { ART_THERAPY_HOURS as KINESIOLOGY_HOURS } from './artTherapy';

export const KINESIOLOGY_QUALIFICATIONS_MAX = 300;
