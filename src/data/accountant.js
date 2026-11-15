// Expert-comptable / רואה חשבון (service_type: accountant) — options des cases à cocher, partagées entre
// le formulaire d'inscription, les filtres, la fiche prestataire et la validation.
// `value` = valeur hébraïque stockée en base (stable) ; `key` = clé de traduction.
// Les noms de champs finissent par "_types" : le filtre générique de backend/routes/search.js
// les gère sans cas particulier. Champs préfixés "accountant_" pour éviter toute collision.

export const ACCOUNTANT_GROUPS = [
  {
    field: 'accountant_service_types',
    titleKey: 'serviceForm.accountant.servicesTitle',
    required: true,
    options: [
      { value: "ניהול ספרים והנהלת חשבונות", key: 'serviceForm.accountant.services.bookkeeping' },
      { value: "דוחות כספיים שנתיים", key: 'serviceForm.accountant.services.annualStatements' },
      { value: "דוחות מס הכנסה", key: 'serviceForm.accountant.services.incomeTax' },
      { value: "דיווחי מע\"מ", key: 'serviceForm.accountant.services.vat' },
      { value: "ייעוץ ותכנון מס", key: 'serviceForm.accountant.services.taxPlanning' },
      { value: "הנהלת שכר", key: 'serviceForm.accountant.services.payroll' },
      { value: "פתיחת עסק או חברה", key: 'serviceForm.accountant.services.businessSetup' },
      { value: "החזרי מס", key: 'serviceForm.accountant.services.taxRefund' },
      { value: "ליווי מול רשויות המס", key: 'serviceForm.accountant.services.taxAuthority' },
      { value: "ייעוץ עסקי וליווי פיננסי", key: 'serviceForm.accountant.services.businessAdvisory' },
    ],
  },
  {
    field: 'accountant_client_types',
    titleKey: 'serviceForm.accountant.clientsTitle',
    required: true,
    options: [
      { value: "עצמאים ועוסקים", key: 'serviceForm.accountant.clients.selfEmployed' },
      { value: "חברות בע\"מ", key: 'serviceForm.accountant.clients.companies' },
      { value: "עמותות ומלכ\"רים", key: 'serviceForm.accountant.clients.nonprofits' },
      { value: "שכירים ופרטיים", key: 'serviceForm.accountant.clients.individuals' },
      { value: "עולים חדשים ותושבים חוזרים", key: 'serviceForm.accountant.clients.newImmigrants' },
      { value: "ישראלים בחו\"ל ותושבי חוץ", key: 'serviceForm.accountant.clients.nonResidents' },
    ],
  },
  {
    field: 'accountant_specialty_types',
    titleKey: 'serviceForm.accountant.specialtiesTitle',
    required: false,
    options: [
      { value: "הייטק וסטארט-אפים", key: 'serviceForm.accountant.specialties.hightech' },
      { value: "נדל\"ן", key: 'serviceForm.accountant.specialties.realEstate' },
      { value: "מסחר אלקטרוני", key: 'serviceForm.accountant.specialties.ecommerce' },
      { value: "מקצועות חופשיים", key: 'serviceForm.accountant.specialties.liberal' },
      { value: "בנייה וקבלנים", key: 'serviceForm.accountant.specialties.construction' },
      { value: "מסעדות ועסקי מזון", key: 'serviceForm.accountant.specialties.food' },
    ],
  },
  {
    field: 'accountant_meeting_types',
    titleKey: 'serviceForm.accountant.meetingsTitle',
    required: true,
    options: [
      { value: "במשרד", key: 'serviceForm.accountant.meetings.office' },
      { value: "אצל הלקוח או בעסק", key: 'serviceForm.accountant.meetings.onsite' },
      { value: "אונליין או בטלפון", key: 'serviceForm.accountant.meetings.online' },
    ],
  },
];

// Horaires (facultatifs)
export { ART_THERAPY_HOURS as ACCOUNTANT_HOURS } from './artTherapy';

export const ACCOUNTANT_QUALIFICATIONS_MAX = 300;
