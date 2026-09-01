// services/geolocationService.js - Version HomeSherut Multi-Services
import { 
  getAllCities, 
  getCitiesByArea, 
  getNeighborhoodsByCity as getNeighborhoodsLocal,
  normalizeCity,
  cityExists,
  getCityInfo,
  searchCities,
  getLocationStats,
  israelCities,
  israelAreas 
} from '../data/israelLocations.js';

const BASE_URL = 'https://nominatim.openstreetmap.org';
const coordinatesCache = new Map();

// Configuration spécifique HomeSherut
const CONFIG = {
  useLocalDataFirst: true,           
  enableGPSEnrichment: true,         
  enableNominatimFallback: false,    
  cacheExpiry: 24 * 60 * 60 * 1000, 
  requestDelay: 1100,
  // Clés localStorage spécifiques HomeSherut
  COORDS_STORAGE_KEY: 'homesherut_city_coordinates',
  COORDS_EXPIRY_DAYS: 30
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// ====================================
// FONCTIONS DE CACHE LOCALSTORAGE
// ====================================

/**
 * Charger les coordonnées depuis localStorage
 */
const loadCoordinatesFromStorage = () => {
  try {
    const stored = localStorage.getItem(CONFIG.COORDS_STORAGE_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    const now = Date.now();
    
    if (data.expiry && data.expiry < now) {
      localStorage.removeItem(CONFIG.COORDS_STORAGE_KEY);
      return null;
    }
    
    console.log('[HomeSherut Storage] Coordonnées chargées depuis localStorage');
    return data.coordinates;
  } catch (error) {
    console.error('[HomeSherut Storage] Erreur lecture localStorage:', error);
    return null;
  }
};

/**
 * Sauvegarder les coordonnées dans localStorage
 */
const saveCoordinatesToStorage = (coordinates) => {
  try {
    const expiry = Date.now() + (CONFIG.COORDS_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    const data = {
      coordinates,
      expiry,
      savedAt: new Date().toISOString(),
      version: 'homesherut_v1.0'
    };
    
    localStorage.setItem(CONFIG.COORDS_STORAGE_KEY, JSON.stringify(data));
    console.log('[HomeSherut Storage] Coordonnées sauvegardées');
  } catch (error) {
    console.error('[HomeSherut Storage] Erreur écriture localStorage:', error);
  }
};

// ====================================
// API PRINCIPALE - VILLES
// ====================================

/**
 * Interface principale : Obtenir toutes les villes d'Israël
 * SYNCHRONE - Pour utilisation dans les composants React
 */
export const getIsraeliCities = () => {
  console.log('[HomeSherut] Chargement des villes depuis les données locales...');
  
  const cities = getAllCities().map((name, index) => ({
    name,
    area: israelCities.find(c => c.name === name)?.area || 'Non classé',
    lat: null,
    lon: null,
    type: 'local',
    importance: getAllCities().length - index,
    hasNeighborhoods: getNeighborhoodsLocal(name).length > 0,
    serviceTypes: ['babysitting', 'menage', 'jardinage', 'aide_personne_agee', 'soutien_scolaire', 'garde_animaux'] // Pour tous les services HomeSherut
  }));

  console.log(`[HomeSherut] ${cities.length} villes chargées`);
  return cities;
};

/**
 * Interface avec enrichissement GPS (asynchrone)
 */
export const getIsraeliCitiesWithGPS = async () => {
  const cities = getIsraeliCities();

  if (CONFIG.enableGPSEnrichment) {
    enrichCitiesWithGPSInBackground(cities);
  }

  return cities;
};

// ====================================
// API PRINCIPALE - QUARTIERS
// ====================================

/**
 * Interface principale : Obtenir les quartiers d'une ville
 * SYNCHRONE - Données locales prioritaires
 */
export const getNeighborhoodsByCity = (cityName) => {
  if (!cityName) return [];

  console.log(`[HomeSherut Quartiers] Recherche pour "${cityName}"...`);
  
  const normalizedCity = normalizeCity(cityName);
  if (!normalizedCity) {
    console.warn(`[HomeSherut] Ville non reconnue: "${cityName}"`);
    return [];
  }

  const localNeighborhoods = getNeighborhoodsLocal(normalizedCity);
  
  if (localNeighborhoods.length > 0) {
    const neighborhoods = localNeighborhoods.map(name => ({
      name,
      city: normalizedCity,
      lat: null,
      lon: null,
      type: 'local',
      serviceAvailability: {
        babysitting: true,
        menage: true,
        jardinage: true,
        aide_personne_agee: true,
        soutien_scolaire: true,
        garde_animaux: true
      }
    }));
    
    console.log(`[HomeSherut] ${neighborhoods.length} quartiers trouvés pour ${normalizedCity}`);
    return neighborhoods;
  }

  console.log(`[HomeSherut] Aucun quartier défini pour ${normalizedCity}`);
  return [];
};

// ====================================
// API RECHERCHE ET AUTOCOMPLÉTION
// ====================================

/**
 * Recherche de villes avec autocomplétion pour HomeSherut
 */
export const searchCitiesForHomeSherut = (query, serviceType = null) => {
  if (!query || query.length < 1) return getAllCities();
  
  const results = searchCities(query);
  console.log(`[HomeSherut Search] "${query}" -> ${results.length} résultats`);
  
  return results.map(name => ({
    name,
    area: israelCities.find(c => c.name === name)?.area,
    hasNeighborhoods: getNeighborhoodsLocal(name).length > 0,
    serviceType: serviceType,
    // Métadonnées pour l'affichage dans l'interface
    displayName: name,
    searchRelevance: calculateSearchRelevance(name, query)
  })).sort((a, b) => b.searchRelevance - a.searchRelevance);
};

/**
 * Recherche combinée villes + quartiers
 */
export const searchLocationsForHomeSherut = (query, cityFilter = null) => {
  const results = [];
  
  // Recherche dans les villes
  const cities = searchCitiesForHomeSherut(query);
  cities.forEach(city => {
    results.push({
      type: 'city',
      ...city,
      fullLocation: city.name
    });
  });
  
  // Recherche dans les quartiers si une ville est spécifiée
  if (cityFilter) {
    const neighborhoods = getNeighborhoodsByCity(cityFilter);
    const matchingNeighborhoods = neighborhoods.filter(n => 
      n.name.includes(query)
    );
    
    matchingNeighborhoods.forEach(neighborhood => {
      results.push({
        type: 'neighborhood',
        name: neighborhood.name,
        city: cityFilter,
        fullLocation: `${neighborhood.name}, ${cityFilter}`,
        searchRelevance: calculateSearchRelevance(neighborhood.name, query)
      });
    });
  }
  
  return results.sort((a, b) => b.searchRelevance - a.searchRelevance);
};

// ====================================
// API SPÉCIFIQUE SERVICES HOMESHERUT
// ====================================

/**
 * Obtenir les villes par région avec statistiques de services
 */
export const getCitiesByRegionForHomeSherut = (area, serviceType = null) => {
  const cities = getCitiesByArea(area);
  return cities.map(name => ({
    name,
    area,
    hasNeighborhoods: getNeighborhoodsLocal(name).length > 0,
    serviceType,
    // Simulation de données de services - à remplacer par vraies requêtes DB
    estimatedProviders: getEstimatedProviders(name, serviceType),
    averageRating: getEstimatedRating(name)
  }));
};

/**
 * Validation spécialisée pour HomeSherut
 */
export const validateLocationForHomeSherut = (cityName, neighborhoodName = null, serviceType = null) => {
  if (!cityName) return { valid: false, reason: 'Ville requise' };
  
  const normalized = normalizeCity(cityName);
  if (!normalized) return { valid: false, reason: 'Ville non reconnue' };
  
  const neighborhoods = getNeighborhoodsLocal(normalized);
  let neighborhoodValid = true;
  
  if (neighborhoodName) {
    neighborhoodValid = neighborhoods.some(n => n === neighborhoodName);
  }
  
  return {
    valid: neighborhoodValid,
    normalizedCity: normalized,
    hasNeighborhoods: neighborhoods.length > 0,
    neighborhoodCount: neighborhoods.length,
    serviceSupported: serviceType ? isServiceSupported(normalized, serviceType) : true,
    recommendedAlternatives: neighborhoodValid ? [] : getAlternativeNeighborhoods(neighborhoods, neighborhoodName)
  };
};

// ====================================
// ENRICHISSEMENT GPS EN ARRIÈRE-PLAN
// ====================================

/**
 * Enrichissement GPS optimisé pour HomeSherut
 */
async function enrichCitiesWithGPSInBackground(cities) {
  if (!CONFIG.enableGPSEnrichment) return;
  
  console.log('[HomeSherut GPS] Démarrage enrichissement GPS...');
  
  // Priorité aux villes avec le plus de services HomeSherut
  const priorityCities = [
    'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice',
    'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille',
    'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon'
  ];
  
  // Charger les coordonnées sauvegardées
  const savedCoords = loadCoordinatesFromStorage() || {};
  const newCoordinates = {};
  
  // Appliquer les coordonnées existantes
  Object.keys(savedCoords).forEach(cityName => {
    const city = cities.find(c => c.name === cityName);
    if (city && savedCoords[cityName]) {
      Object.assign(city, savedCoords[cityName]);
      coordinatesCache.set(cityName, savedCoords[cityName]);
    }
  });
  
  // Charger les coordonnées manquantes
  for (const cityName of priorityCities) {
    if (savedCoords[cityName]) continue;
    
    const city = cities.find(c => c.name === cityName);
    if (!city) continue;
    
    try {
      await delay(CONFIG.requestDelay);
      const coords = await getCoordinatesFromNominatim(cityName);
      
      if (coords) {
        Object.assign(city, coords);
        coordinatesCache.set(cityName, coords);
        newCoordinates[cityName] = coords;
        console.log(`[HomeSherut GPS] Coordonnées obtenues pour ${cityName}`);
      }
    } catch (error) {
      console.error(`[HomeSherut GPS] Erreur pour ${cityName}:`, error.message);
    }
  }
  
  // Sauvegarder les nouvelles coordonnées
  if (Object.keys(newCoordinates).length > 0) {
    const allCoordinates = { ...savedCoords, ...newCoordinates };
    saveCoordinatesToStorage(allCoordinates);
  }
  
  console.log('[HomeSherut GPS] Enrichissement terminé');
}

/**
 * Obtenir les coordonnées GPS depuis Nominatim
 */
async function getCoordinatesFromNominatim(cityName) {
  try {
    const response = await fetch(
      `${BASE_URL}/search?` +
      `q=${encodeURIComponent(cityName)}+Israel&` +
      `countrycodes=IL&` +
      `format=json&` +
      `limit=1&` +
      `accept-language=he`
    );
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    if (data.length === 0) return null;
    
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      osmId: data[0].osm_id,
      gpsLastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error(`[HomeSherut GPS] Erreur pour ${cityName}:`, error);
    return null;
  }
}

// ====================================
// FONCTIONS UTILITAIRES HOMESHERUT
// ====================================

/**
 * Calculer la pertinence de recherche
 */
function calculateSearchRelevance(text, query) {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  if (lowerText === lowerQuery) return 100;
  if (lowerText.startsWith(lowerQuery)) return 90;
  if (lowerText.includes(lowerQuery)) return 70;
  
  // Recherche floue simple
  let matches = 0;
  for (let i = 0; i < lowerQuery.length; i++) {
    if (lowerText.includes(lowerQuery[i])) matches++;
  }
  
  return (matches / lowerQuery.length) * 50;
}

/**
 * Simuler le nombre de prestataires (à remplacer par vraie requête DB)
 */
function getEstimatedProviders(cityName, serviceType) {
  const citySize = getNeighborhoodsLocal(cityName).length;
  const baseProviders = Math.max(1, Math.floor(citySize / 3));
  
  // Facteurs par type de service
  const serviceFactors = {
    babysitting: 1.0,
    menage: 0.8,
    jardinage: 0.6,
    aide_personne_agee: 0.4,
    soutien_scolaire: 0.7,
    garde_animaux: 0.3
  };
  
  const factor = serviceFactors[serviceType] || 0.5;
  return Math.floor(baseProviders * factor);
}

/**
 * Simuler la note moyenne (à remplacer par vraie requête DB)
 */
function getEstimatedRating(cityName) {
  const hash = cityName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 3.5 + (hash % 15) / 10; // Entre 3.5 et 4.9
}

/**
 * Vérifier si un service est supporté dans une ville
 */
function isServiceSupported(cityName, serviceType) {
  // Pour l'instant, tous les services sont supportés partout
  return true;
}

/**
 * Obtenir des alternatives de quartiers
 */
function getAlternativeNeighborhoods(allNeighborhoods, targetNeighborhood) {
  if (!targetNeighborhood || allNeighborhoods.length === 0) return [];
  
  // Recherche floue simple
  return allNeighborhoods
    .map(n => ({
      name: n,
      similarity: calculateSearchRelevance(n, targetNeighborhood)
    }))
    .filter(n => n.similarity > 30)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3)
    .map(n => n.name);
}

// ====================================
// API CONFIGURATION ET DIAGNOSTIC
// ====================================

/**
 * Configuration du service
 */
export const configureHomeSherutGeolocation = (options) => {
  Object.assign(CONFIG, options);
  console.log('[HomeSherut Config] Service configuré:', CONFIG);
};

/**
 * Statistiques spécifiques HomeSherut
 */
export const getHomeSherutLocationStats = () => {
  const baseStats = getLocationStats();
  
  return {
    ...baseStats,
    gpsCache: coordinatesCache.size,
    config: CONFIG,
    serviceTypes: ['babysitting', 'menage', 'jardinage', 'aide_personne_agee', 'soutien_scolaire', 'garde_animaux'],
    version: 'homesherut_v1.0'
  };
};

/**
 * Effacer le cache spécifique HomeSherut
 */
export const clearHomeSherutCache = () => {
  localStorage.removeItem(CONFIG.COORDS_STORAGE_KEY);
  coordinatesCache.clear();
  console.log('[HomeSherut] Cache géolocalisation vidé');
};

/**
 * Préchargement optimisé pour HomeSherut
 */
export const preloadHomeSherutData = async () => {
  console.log('[HomeSherut Preload] Démarrage préchargement...');
  
  // Charger les villes principales (synchrone)
  const cities = getIsraeliCities();
  
  // Précharger les quartiers des 10 plus grandes villes
  const majorCities = ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice',
                       'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille'];
  
  majorCities.forEach(city => {
    const neighborhoods = getNeighborhoodsByCity(city);
    console.log(`[HomeSherut Preload] ${city}: ${neighborhoods.length} quartiers`);
  });
  
  // Démarrer l'enrichissement GPS en arrière-plan
  if (CONFIG.enableGPSEnrichment) {
    enrichCitiesWithGPSInBackground(cities);
  }
  
  console.log('[HomeSherut Preload] Préchargement terminé');
  return cities;
};

// Export des fonctions de base réutilisées
export {
  getAllCities,
  getCitiesByArea,
  normalizeCity,
  cityExists,
  getCityInfo,
  searchCities,
  getLocationStats
};