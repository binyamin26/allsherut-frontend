// Noms de chaque service dans les 4 langues du site, pour permettre à la
// recherche du sélecteur de service (AuthModal) de matcher un mot tapé dans
// n'importe quelle langue, indépendamment de la langue active de l'interface.
// Ne pas importer les fichiers translation.json complets ici : ils sont
// chargés en lazy-loading (voir src/i18n.js) et les importer statiquement
// forcerait les 4 bundles de traduction à charger dès l'ouverture du modal.
export const SERVICE_SEARCH_TERMS = {
  plumbing: ['אינסטלציה', 'Plumbing', 'Plomberie', 'Сантехника'],
  electrician: ['חשמלאי', 'Electrician', 'Électricien', 'Электрик'],
  locksmith: ['מנעולן', 'Locksmith', 'Serrurier', 'Слесарь'],
  painting: ['צביעה', 'Painting', 'Peinture', 'Покраска'],
  air_conditioning: ['מיזוג אוויר', 'Air Conditioning', 'Climatisation', 'Кондиционеры'],
  drywall: ['גבס', 'Drywall', 'Plâtrerie (Placo)', 'Гипсокартон'],
  aluminum: ['אלומיניום', 'Aluminum', 'Aluminium', 'Алюминий'],
  metalwork: ['מסגרות', 'Metalwork', 'Ferronnerie', 'Металлоконструкции'],
  glass_works: ['זגגות', 'Glass Works', 'Vitrerie', 'Стекольные работы'],
  gas_technician: ['טכנאי גז', 'Gas Technician', 'Technicien gaz', 'Газовщик'],
  waterproofing: ['איטום', 'Waterproofing', 'Étanchéité', 'Гидроизоляция'],
  carpentry: ['נגרות', 'Carpentry', 'Menuiserie', 'Столярные работы'],
  handyman: ['הנדימן', 'תיקונים קטנים לבית', 'Small Jobs & Repairs', 'Petits travaux & réparations', 'Мелкие работы & ремонт'],
  contractor: ['קבלן שיפוצים', 'Contractor', 'Entrepreneur', 'Подрядчик'],
  moving: ['הובלות', 'Moving', 'Déménagement', 'Переезд'],
  gardening: ['גינון', 'Gardening', 'Jardinage', 'Садоводство'],
  pest_control: ['טיפול והדברה נגד מזיקים ומכרסמים', 'Pest & Rodent Control Treatment', 'Traitement & Élimination des nuisibles et rongeurs', 'Уничтожение вредителей и грызунов'],
  cleaning: ['ניקיון', 'Cleaning', 'Ménage', 'Уборка'],
  laundry: ['כביסה וגיהוץ', 'Laundry & Ironing', 'Blanchisserie', 'Стирка и глажка'],
  property_management: ['ניהול דירות', 'Property Management', 'Gestion immobilière', 'Управление недвижимостью'],
  home_organization: ['סידור ואירגון הבית', 'Home Organization', 'Organisation maison', 'Организация дома'],
  event_decoration: ['עיצוב אירועים', 'Event Decoration', "Décoration d'événements", 'Оформление мероприятий'],
  event_entertainment: ['הפעלות לאירועים', 'Event Entertainment', 'Animation événements', 'Развлечения для мероприятий'],
  dj: ['תקליטן', 'Disc Jockey', 'DJ', 'Диск-жокей'],
  private_chef: ['שף פרטי', 'Private Chef', 'Chef à domicile', 'Частный повар'],
  catering: ['קייטרינג', 'Catering', 'Traiteur', 'Кейтеринг'],
  pastry: ['עוגות ופטיסרי', 'Cakes & Pastry', 'Gâteaux & Pâtisserie', 'Торты и выпечка'],
  photographer: ['צלם', 'Photographer', 'Photographe', 'Фотограф'],
  tutoring: ['שיעורים פרטיים וקורסים', 'Private Tutoring & Courses', 'Cours particuliers', 'Репетиторство и курсы'],
  sports_activities: ['חוגים וספורט', 'Sports & Activities', 'Sports et activités', 'Спорт и занятия'],
  babysitting: ['טיפול בילדים', 'Childcare', "Garde d'enfants", 'Уход за детьми'],
  petcare: ['שירותים לבעלי חיים', 'Pet Services', 'Services pour animaux', 'Услуги для животных'],
  eldercare: ['עזרה לקשישים', 'Elder Care', 'Aide aux seniors', 'Уход за пожилыми'],
  mechanic: ['מכונאי רכב ביתי', 'Mobile Car Mechanic', 'Garagiste à Domicile', 'Автомеханик на дому'],
  driver: ['הסעות', 'Transportation', 'Transport', 'Перевозки']
};
