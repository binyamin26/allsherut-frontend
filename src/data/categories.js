export const CATEGORY_DEFINITIONS = [
  {
    id: 'maison-travaux',
    names: {
      fr: 'Maison & Travaux',
      he: 'בית ושיפוץ',
      en: 'Home Repair',
      ru: 'Дом Ремонт',
    },
    descriptions: {
      fr: 'Trouvez des artisans et techniciens à domicile en Israël : électricien, plombier, climatisation, serrurerie, peinture et bien plus.',
      he: 'מצאו בעלי מקצוע לבית בישראל: חשמלאי, אינסטלטור, מיזוג אוויר, מנעולן, צביעה ועוד.',
      en: 'Find home repair professionals in Israel: electrician, plumber, AC technician, locksmith, painter and more.',
      ru: 'Найдите мастеров для ремонта дома в Израиле: электрик, сантехник, кондиционер, слесарь, маляр и другие.',
    },
    image: '/images/Espace de travail rénovation moderne.png',
    gradient: 'from-orange-500 to-amber-600',
    serviceIds: [
      'electrician', 'plumbing', 'air_conditioning', 'gas_technician',
      'drywall', 'carpentry', 'painting', 'waterproofing', 'contractor',
      'aluminum', 'glass_works', 'locksmith', 'metalwork', 'handyman',
    ],
  },
  {
    id: 'nettoyage-entretien',
    names: {
      fr: 'Nettoyage & Entretien',
      he: 'ניקיון',
      en: 'Cleaning',
      ru: 'Уборка',
    },
    descriptions: {
      fr: 'Services de nettoyage et entretien à domicile en Israël : ménage, jardinage, blanchisserie, désinsectisation et organisation.',
      he: 'שירותי ניקיון ותחזוקה לבית בישראל: ניקיון, גינון, כביסה, הדברה וארגון הבית.',
      en: 'Home cleaning and maintenance services in Israel: cleaning, gardening, laundry, pest control and organization.',
      ru: 'Услуги уборки и обслуживания дома в Израиле: уборка, садоводство, стирка, дезинсекция и организация.',
    },
    image: '/images/kit-nettoyage-bleu-lumineux.png',
    gradient: 'from-cyan-500 to-blue-600',
    serviceIds: [
      'cleaning', 'laundry', 'gardening',
      'home_organization', 'property_management', 'pest_control',
    ],
  },
  {
    id: 'famille-assistance',
    names: {
      fr: 'Famille & Aide à domicile',
      he: 'סיוע משפחתי',
      en: 'Family Care',
      ru: 'Помощь',
    },
    descriptions: {
      fr: 'Services d\'aide à la famille en Israël : baby-sitting, garde d\'animaux et aide aux personnes âgées.',
      he: 'שירותי סיוע משפחתי בישראל: בייביסיטר, טיפול בחיות מחמד וסיוע לקשישים.',
      en: 'Family care services in Israel: babysitting, pet care and elder care.',
      ru: 'Семейные услуги в Израиле: няня, уход за животными и уход за пожилыми.',
    },
    image: '/images/nature-morte-soins-familiaux.png',
    gradient: 'from-pink-500 to-rose-600',
    serviceIds: ['babysitting', 'petcare', 'eldercare'],
  },
  {
    id: 'medecine-soins',
    names: {
      fr: 'Médecine & Soins',
      he: 'רפואה וטיפול',
      en: 'Medicine & Care',
      ru: 'Медицина и уход',
    },
    descriptions: {
      fr: 'Services médicaux et de soins à domicile en Israël.',
      he: 'שירותי רפואה וטיפול בבית בישראל.',
      en: 'Medical and care services at home in Israel.',
      ru: 'Медицинские услуги и уход на дому в Израиле.',
    },
    image: '/images/catégorie médecine et soins.jpg',
    gradient: 'from-teal-500 to-cyan-600',
    serviceIds: ['doula'],
  },
  {
    id: 'evenements-creation',
    names: {
      fr: 'Événements & Services créatifs',
      he: 'אירועים',
      en: 'Events',
      ru: 'События',
    },
    descriptions: {
      fr: 'Organisez vos événements en Israël : DJ, animation, décoration, photographe, traiteur, chef privé et pâtisserie.',
      he: 'ארגנו את האירועים שלכם בישראל: DJ, הפקות, קישוטים, צלם, קייטרינג, שף פרטי ועוגות.',
      en: 'Event services in Israel: DJ, entertainment, decoration, photographer, catering, private chef and pastry.',
      ru: 'Услуги для мероприятий в Израиле: DJ, развлечения, декор, фотограф, кейтеринг, частный повар и кондитерские изделия.',
    },
    image: '/images/reception-estivale-fleurs-douceurs.png',
    gradient: 'from-purple-500 to-violet-600',
    serviceIds: ['dj', 'event_entertainment', 'event_equipment_rental', 'event_food_stands', 'event_decoration', 'photographer', 'private_chef', 'catering', 'pastry'],
  },
  {
    id: 'apprentissage-sport',
    names: {
      fr: 'Cours & Sport',
      he: 'לימוד וספורט',
      en: 'Learning',
      ru: 'Обучение',
    },
    descriptions: {
      fr: 'Cours particuliers et activités sportives en Israël : soutien scolaire et entraînement sportif à domicile.',
      he: 'שיעורים פרטיים ופעילות ספורט בישראל: חונכות אקדמית ואימון גופני.',
      en: 'Tutoring and sports activities in Israel: private lessons and physical training.',
      ru: 'Репетиторство и спортивные занятия в Израиле: частные уроки и физическая подготовка.',
    },
    image: '/images/catégorie sport et cours.jpg',
    gradient: 'from-green-500 to-emerald-600',
    serviceIds: ['tutoring', 'sports_activities'],
  },
  {
    id: 'transport-services-mobiles',
    names: {
      fr: 'Transport & Déplacements',
      he: 'תחבורה',
      en: 'Transport',
      ru: 'Транспорт',
    },
    descriptions: {
      fr: 'Services de transport et déménagement en Israël : déménagement, chauffeur privé et mécanicien à domicile.',
      he: 'שירותי תחבורה ומעבר דירה בישראל: הובלות, נהג פרטי ומכונאי.',
      en: 'Transport and moving services in Israel: moving, private driver and mobile mechanic.',
      ru: 'Транспортные услуги в Израиле: переезд, частный водитель и автомеханик.',
    },
    image: '/images/catégorie ovalotes.jpg',
    gradient: 'from-blue-500 to-indigo-600',
    serviceIds: ['moving', 'driver', 'mechanic'],
  },
  {
    id: 'securite-reseaux-maison-intelligente',
    names: {
      fr: 'Sécurité, Réseaux & Maison intelligente',
      he: 'אבטחה, תקשורת ובית חכם',
      en: 'Security, Networking & Smart Home',
      ru: 'Системы безопасности, сети и умный дом',
    },
    descriptions: {
      fr: 'Sécurité et technologie pour la maison en Israël : caméras de surveillance, alarmes, interphones, réseaux, sonorisation et domotique.',
      he: 'אבטחה וטכנולוגיה לבית בישראל: מצלמות אבטחה, אזעקות, אינטרקום, רשתות תקשורת, מערכות שמע ובית חכם.',
      en: 'Home security and technology in Israel: security cameras, alarms, intercoms, networking, audio systems and smart home.',
      ru: 'Безопасность и технологии для дома в Израиле: камеры видеонаблюдения, сигнализация, домофоны, сети, аудиосистемы и умный дом.',
    },
    image: '/images/Maison connectée et sécurisée.png',
    gradient: 'from-slate-600 to-blue-700',
    serviceIds: ['security_cameras', 'security_alarms', 'intercom_access', 'networking', 'audio_systems', 'smart_home'],
  },
];

// Find the parent category definition for a given service id (e.g. 'electrician')
export function getCategoryForService(serviceId) {
  return CATEGORY_DEFINITIONS.find(cat => cat.serviceIds.includes(serviceId)) || null;
}

// Catégories/services masqués (flag `hidden: true` sur la catégorie).
// Rien n'est supprimé : ces listes servent juste à filtrer l'affichage partout.
export const HIDDEN_CATEGORY_IDS = CATEGORY_DEFINITIONS
  .filter(cat => cat.hidden)
  .map(cat => cat.id);

export const HIDDEN_SERVICE_IDS = CATEGORY_DEFINITIONS
  .filter(cat => cat.hidden)
  .flatMap(cat => cat.serviceIds);

// Catégories visibles uniquement (à utiliser pour tout affichage public).
export const VISIBLE_CATEGORY_DEFINITIONS = CATEGORY_DEFINITIONS.filter(cat => !cat.hidden);

// All individual services with their metadata
export const SERVICES_META = {
  plumbing:           { image: '/images/plombier.jpg',        href: '/services/plumbing',           nameKey: 'services.plumbing' },
  electrician:        { image: '/images/electrician.jpg',     href: '/services/electrician',        nameKey: 'services.electrician' },
  locksmith:          { image: '/images/serrure.png',         href: '/services/locksmith',          nameKey: 'services.locksmith' },
  painting:           { image: '/images/peinture.jpg',        href: '/services/painting',           nameKey: 'services.painting' },
  air_conditioning:   { image: '/images/clim.png',            href: '/services/air-conditioning',   nameKey: 'services.air_conditioning' },
  drywall:            { image: '/images/guevess.jpg',         href: '/services/drywall',            nameKey: 'services.drywall' },
  aluminum:           { image: '/images/aluminium.png',       href: '/services/aluminum',           nameKey: 'services.aluminum' },
  metalwork:          { image: '/images/fer.jpg',             href: '/services/metalwork',          nameKey: 'services.metalwork' },
  glass_works:        { image: '/images/verre.png',           href: '/services/glass-works',        nameKey: 'services.glass_works' },
  gas_technician:     { image: '/images/gaz.jpg',             href: '/services/gas-technician',     nameKey: 'services.gas_technician' },
  waterproofing:      { image: '/images/itoum.jpg',           href: '/services/waterproofing',      nameKey: 'services.waterproofing' },
  carpentry:          { image: '/images/menuisier.png',       href: '/services/carpentry',          nameKey: 'services.carpentry' },
  handyman:           { image: '/images/indimane.jpg',        href: '/services/handyman',           nameKey: 'services.handyman' },
  mechanic:           { image: '/images/garagiste.jpg',       href: '/services/mechanic',           nameKey: 'services.mechanic' },
  contractor:         { image: '/images/kablan.jpg',          href: '/services/contractor',         nameKey: 'services.contractor' },
  moving:             { image: '/images/demenagement.jpg',    href: '/services/moving',             nameKey: 'services.moving' },
  gardening:          { image: '/images/jardinage.jpg',       href: '/services/gardening',          nameKey: 'services.gardening' },
  pest_control:       { image: '/images/desinctisation.jpg',  href: '/services/pest-control',       nameKey: 'services.pest_control' },
  cleaning:           { image: '/images/nikayon.jpg',         href: '/services/cleaning',           nameKey: 'services.cleaning' },
  laundry:            { image: '/images/kvissa.jpg',          href: '/services/laundry',            nameKey: 'services.laundry' },
  property_management:{ image: '/images/nihoul-dirot.jpg',    href: '/services/property-management',nameKey: 'services.property_management' },
  home_organization:  { image: '/images/rangement.jpg',       href: '/services/home-organization',  nameKey: 'services.home_organization' },
  event_decoration:   { image: '/images/deco.jpg',            href: '/services/event-decoration',   nameKey: 'services.event_decoration' },
  event_entertainment:{ image: '/images/animations et spectacles.jpg', href: '/services/event-entertainment',nameKey: 'services.event_entertainment' },
  event_equipment_rental: { image: '/images/loc materiel animation.jpg', icon: '🎊', href: '/services/event-equipment-rental', nameKey: 'services.event_equipment_rental' },
  event_food_stands:  { image: '/images/stands de nourriture.jpg', icon: '🍿', href: '/services/event-food-stands',  nameKey: 'services.event_food_stands' },
  dj:                 { image: '/images/DJ.jpg',              href: '/services/dj',                 nameKey: 'services.dj' },
  private_chef:       { image: '/images/chef prati.jpg',      href: '/services/private-chef',       nameKey: 'services.private_chef' },
  catering:           { image: '/images/traiteur.jpg',        href: '/services/catering',            nameKey: 'services.catering' },
  pastry:             { image: '/images/p et f.jpg',          href: '/services/pastry',              nameKey: 'services.pastry' },
  photographer:       { image: '/images/photographe1.jpg',    href: '/services/photographer',       nameKey: 'services.photographer' },
  tutoring:           { image: '/images/tutoring.png',        href: '/services/tutoring',           nameKey: 'services.tutoring' },
  sports_activities:  { image: '/images/sport.jpg',           href: '/services/sports-activities',  nameKey: 'services.sports_activities' },
  babysitting:        { image: '/images/babysite.jpg',        href: '/services/babysitting',        nameKey: 'services.babysitting' },
  petcare:            { image: '/images/chien.jpg',           href: '/services/petcare',            nameKey: 'services.petcare' },
  eldercare:          { image: '/images/eldercare.jpg',       href: '/services/eldercare',          nameKey: 'services.eldercare' },
  driver:             { image: '/images/driver.jpg',          href: '/services/driver',             nameKey: 'services.driver' },
  // Catégorie Sécurité : pas d'image dédiée pour l'instant → emoji (SECURITY_SERVICES[key].icon)
  security_cameras:   { image: '/images/Sécurité connectée pour maison moderne.jpg', href: '/services/security-cameras', nameKey: 'services.security_cameras' },
  security_alarms:    { image: '/images/Maison connectée, sécurité intelligente.jpg', href: '/services/security-alarms', nameKey: 'services.security_alarms' },
  intercom_access:    { image: '/images/Gemini_Generated_Image_roj2chroj2chroj2 (1).jpg', href: '/services/intercom-access', nameKey: 'services.intercom_access' },
  networking:         { image: '/images/Atelier réseau moderne et organisé.jpg', href: '/services/networking', nameKey: 'services.networking' },
  audio_systems:      { icon: '🔊', href: '/services/audio-systems',    nameKey: 'services.audio_systems' },
  smart_home:         { icon: '🏠', href: '/services/smart-home',       nameKey: 'services.smart_home' },
  doula:              { image: '/images/doula.jpeg',           href: '/services/doula',              nameKey: 'services.doula' },
};
