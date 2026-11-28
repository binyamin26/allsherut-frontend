// Nombre max de photos en galerie par service.
// A garder synchronise avec backend/utils/galleryLimits.js
export const DEFAULT_GALLERY_LIMIT = 15;
export const LARGE_GALLERY_LIMIT = 50;

// Metiers tres visuels (portfolio) : limite elargie
export const LARGE_GALLERY_SERVICES = [
  'contractor', 'painting', 'carpentry', 'drywall', 'aluminum', 'glass_works', 'metalwork',
  'gardening', 'cleaning', 'event_decoration', 'photographer', 'pastry', 'catering', 'private_chef',
  'waterproofing', 'handyman', 'event_equipment_rental', 'event_food_stands', 'event_entertainment',
  'dj', 'security_cameras', 'smart_home', 'audio_systems', 'networking', 'home_organization', 'moving',
];

export const getGalleryLimit = (serviceType) =>
  LARGE_GALLERY_SERVICES.includes(serviceType) ? LARGE_GALLERY_LIMIT : DEFAULT_GALLERY_LIMIT;
