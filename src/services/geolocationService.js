// services/geolocationService.js - Version corrigée sans conflits + Aliases pour LocationSearchComponent

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

// Cache pour les coordonnées GPS (optionnel)
const coordinatesCache = new Map();

// Délai entre les requêtes API
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Configuration du service
 */
const CONFIG = {
  useLocalDataFirst: true,           // Privilégier les données locales
  enableGPSEnrichment: true,         // Enrichir avec les coordonnées GPS
  enableNominatimFallback: false,    // Désactiver le fallback Nominatim par défaut
  cacheExpiry: 24 * 60 * 60 * 1000, // 24 heures
  requestDelay: 1100                 // Délai entre requêtes Nominatim (ms)
};

/**
 * Interface principale : Obtenir toutes les villes d'Israël
 * SYNCHRONE - Utilise UNIQUEMENT les données locales
 */
export const getIsraeliCities = () => {
  console.log('[Service] Chargement des villes depuis les données locales...');
  
  const cities = getAllCities().map((name, index) => ({
    name,
    area: israelCities.find(c => c.name === name)?.area || 'Non classé',
    lat: null,
    lon: null,
    type: 'local',
    importance: getAllCities().length - index,
    hasNeighborhoods: getNeighborhoodsLocal(name).length > 0
  }));

  console.log(`[Service] ${cities.length} villes chargées depuis les données locales`);
  console.log(`[Service] ${cities.filter(c => c.hasNeighborhoods).length} villes avec quartiers définis`);

  return cities;
};

/**
 * Interface principale : Obtenir toutes les villes d'Israël avec enrichissement GPS
 * ASYNCHRONE - Avec coordonnées GPS optionnelles
 */
export const getIsraeliCitiesWithGPS = async () => {
  const cities = getIsraeliCities();

  // Optionnel : enrichir avec coordonnées GPS en arrière-plan
  if (CONFIG.enableGPSEnrichment) {
    enrichCitiesWithGPS(cities);
  }

  return cities;
};

/**
 * Interface principale : Obtenir les quartiers d'une ville
 * SYNCHRONE - Utilise PRIORITAIREMENT les données locales
 */
export const getNeighborhoodsByCity = (cityName) => {
  if (!cityName) return [];

  console.log(`[Quartiers] Recherche pour "${cityName}"...`);
  
  // Normaliser le nom de la ville
  const normalizedCity = normalizeCity(cityName);
  if (!normalizedCity) {
    console.warn(`[Quartiers] Ville non reconnue: "${cityName}"`);
    return [];
  }

  // Obtenir les quartiers depuis les données locales
  const localNeighborhoods = getNeighborhoodsLocal(normalizedCity);
  
  if (localNeighborhoods.length > 0) {
    const neighborhoods = localNeighborhoods.map(name => ({
      name,
      city: normalizedCity,
      lat: null,
      lon: null,
      type: 'local'
    }));
    
    console.log(`[Quartiers] ${neighborhoods.length} quartiers trouvés localement pour ${normalizedCity}`);
    return neighborhoods;
  }

  console.log(`[Quartiers] Aucun quartier défini pour ${normalizedCity}`);
  return [];
};

/**
 * Interface ASYNCHRONE pour les quartiers avec fallback Nominatim
 */
export const getNeighborhoodsByCityAsync = async (cityName) => {
  // D'abord essayer la version synchrone
  const localResults = getNeighborhoodsByCity(cityName);
  if (localResults.length > 0) {
    return localResults;
  }

  // Si pas de données locales ET fallback activé
  if (CONFIG.enableNominatimFallback) {
    console.log(`[Quartiers] Pas de données locales pour ${cityName}, tentative Nominatim...`);
    return await getNeighborhoodsFromNominatim(cityName);
  }

  return [];
};

/**
 * Recherche de villes avec autocomplétion
 */
export const searchCitiesWithAutoComplete = (query) => {
  if (!query || query.length < 1) return getAllCities();
  
  const results = searchCities(query);
  console.log(`[Search] "${query}" -> ${results.length} résultats`);
  
  return results.map(name => ({
    name,
    area: israelCities.find(c => c.name === name)?.area,
    hasNeighborhoods: getNeighborhoodsLocal(name).length > 0
  }));
};

/**
 * Obtenir les villes par région
 */
export const getCitiesByRegion = (area) => {
  const cities = getCitiesByArea(area);
  return cities.map(name => ({
    name,
    area,
    hasNeighborhoods: getNeighborhoodsLocal(name).length > 0
  }));
};

/**
 * Obtenir toutes les régions avec statistiques
 */
export const getRegionsWithStats = () => {
  return israelAreas.map(area => {
    const cities = getCitiesByArea(area);
    const citiesWithNeighborhoods = cities.filter(city => 
      getNeighborhoodsLocal(city).length > 0
    );
    
    return {
      area,
      totalCities: cities.length,
      citiesWithNeighborhoods: citiesWithNeighborhoods.length,
      coverage: cities.length > 0 ? 
        Math.round((citiesWithNeighborhoods.length / cities.length) * 100) : 0
    };
  });
};

/**
 * Vérifier la validité d'une ville
 */
export const validateCity = (cityName) => {
  if (!cityName) return { valid: false, reason: 'Nom vide' };
  
  const normalized = normalizeCity(cityName);
  if (!normalized) return { valid: false, reason: 'Ville non reconnue' };
  
  const neighborhoods = getNeighborhoodsLocal(normalized);
  
  return {
    valid: true,
    normalizedName: normalized,
    hasNeighborhoods: neighborhoods.length > 0,
    neighborhoodCount: neighborhoods.length
  };
};

/**
 * Obtenir des informations complètes sur une ville
 */
export const getCityDetails = (cityName) => {
  const cityInfo = getCityInfo(cityName);
  if (!cityInfo) return null;
  
  return {
    ...cityInfo,
    neighborhoodCount: cityInfo.neighborhoods.length,
    hasGPS: coordinatesCache.has(cityInfo.name)
  };
};

/**
 * Enrichissement GPS en arrière-plan (optionnel)
 */
async function enrichCitiesWithGPS(cities) {
  if (!CONFIG.enableGPSEnrichment) return;
  
  console.log('[GPS] Démarrage enrichissement GPS en arrière-plan...');
  
  // Priorité aux grandes villes
  const priorityCities = [
    'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice',
    'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille'
  ];
  
  for (const cityName of priorityCities) {
    const city = cities.find(c => c.name === cityName);
    if (!city || coordinatesCache.has(cityName)) continue;
    
    try {
      await delay(CONFIG.requestDelay);
      const coords = await getCoordinatesFromNominatim(cityName);
      
      if (coords) {
        city.lat = coords.lat;
        city.lon = coords.lon;
        coordinatesCache.set(cityName, coords);
        console.log(`[GPS] Coordonnées obtenues pour ${cityName}`);
      }
    } catch (error) {
      console.error(`[GPS] Erreur pour ${cityName}:`, error.message);
    }
  }
  
  console.log('[GPS] Enrichissement GPS terminé');
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
      osmId: data[0].osm_id
    };
  } catch (error) {
    console.error(`[GPS] Erreur Nominatim pour ${cityName}:`, error);
    return null;
  }
}

/**
 * Fallback Nominatim pour les quartiers (désactivé par défaut)
 */
async function getNeighborhoodsFromNominatim(cityName) {
  try {
    await delay(CONFIG.requestDelay);
    
    const response = await fetch(
      `${BASE_URL}/search?` +
      `q=neighborhood+${encodeURIComponent(cityName)}+Israel&` +
      `format=json&` +
      `limit=20&` +
      `accept-language=he`
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    const neighborhoods = [];
    const seen = new Set();
    
    data.forEach(place => {
      if ((place.type === 'neighbourhood' || 
           place.type === 'suburb' || 
           place.type === 'quarter') &&
          place.class === 'place') {
        
        const name = place.display_name.split(',')[0].trim();
        if (!seen.has(name) && name !== cityName && name.length > 0) {
          seen.add(name);
          neighborhoods.push({
            name,
            city: cityName,
            lat: parseFloat(place.lat),
            lon: parseFloat(place.lon),
            type: 'nominatim'
          });
        }
      }
    });
    
    console.log(`[Quartiers] ${neighborhoods.length} quartiers trouvés via Nominatim pour ${cityName}`);
    return neighborhoods;
  } catch (error) {
    console.error('[Quartiers] Erreur Nominatim:', error);
    return [];
  }
}

/**
 * Utilitaires de configuration
 */
export const configureService = (options) => {
  Object.assign(CONFIG, options);
  console.log('[Config] Service configuré:', CONFIG);
};

export const getServiceConfig = () => ({ ...CONFIG });

/**
 * Utilitaires de diagnostic
 */
export const getServiceStats = () => {
  const stats = getLocationStats();
  
  return {
    ...stats,
    gpsCache: coordinatesCache.size,
    config: CONFIG
  };
};

/**
 * Réinitialiser le cache GPS
 */
export const clearGPSCache = () => {
  coordinatesCache.clear();
  console.log('[Cache] Cache GPS vidé');
};

/**
 * Préchargement des données importantes
 */
export const preloadImportantData = () => {
  console.log('[Preload] Préchargement des données...');
  
  // Charger les villes principales (synchrone)
  const cities = getIsraeliCities();
  
  // Les quartiers sont déjà chargés instantanément depuis les données locales
  const majorCities = ['Paris', 'Marseille', 'Lyon'];
  majorCities.forEach(city => {
    const neighborhoods = getNeighborhoodsByCity(city);
    console.log(`[Preload] ${city}: ${neighborhoods.length} quartiers`);
  });
  
  console.log('[Preload] Préchargement terminé');
  return cities;
};

// =============================================================================
// ALIASES POUR COMPATIBILITÉ AVEC LocationSearchComponent
// =============================================================================

/**
 * Recherche de villes pour HomeSherut
 */
export const searchCitiesForHomeSherut = (query, serviceType) => {
  if (!query || query.length < 1) return [];
  
  const results = searchCities(query);
  return results;
};

/**
 * Recherche de localisations (villes + quartiers) pour HomeSherut
 */
export const searchLocationsForHomeSherut = (query, selectedCity) => {
  const suggestions = [];
  
  if (!query || query.length < 2) return suggestions;
  
  // Recherche dans les villes
  const cities = searchCitiesWithAutoComplete(query);
  cities.forEach(city => {
    suggestions.push({
      type: 'city',
      name: city.name,
      fullLocation: `${city.name}, ${city.area}`,
      serviceCount: Math.floor(Math.random() * 20) + 5,
      area: city.area
    });
  });
  
  // Recherche dans les quartiers
  const allCities = getIsraeliCities();
  allCities.forEach(city => {
    const neighborhoods = getNeighborhoodsByCity(city.name);
    const matching = neighborhoods.filter(n => 
      n.name.includes(query) || n.name.toLowerCase().includes(query.toLowerCase())
    );
    matching.forEach(neighborhood => {
      suggestions.push({
        type: 'neighborhood',
        name: neighborhood.name,
        city: city.name,
        fullLocation: `${neighborhood.name}, ${city.name}`,
        serviceCount: Math.floor(Math.random() * 10) + 1
      });
    });
  });
  
  return suggestions.slice(0, 10);
};

/**
 * Validation de localisation pour HomeSherut
 */
export const validateLocationForHomeSherut = (city, neighborhood, serviceType) => {
  const validation = validateCity(city);
  
  if (!validation.valid) {
    return {
      valid: false,
      reason: validation.reason,
      normalizedCity: city
    };
  }
  
  if (neighborhood) {
    const neighborhoods = getNeighborhoodsByCity(city);
    const neighborhoodExists = neighborhoods.some(n => n.name === neighborhood);
    
    if (!neighborhoodExists) {
      return {
        valid: false,
        reason: `Le quartier "${neighborhood}" est introuvable à ${city}`,
        normalizedCity: validation.normalizedName,
        recommendedAlternatives: neighborhoods.slice(0, 3).map(n => n.name)
      };
    }
  }
  
  return {
    valid: true,
    normalizedCity: validation.normalizedName,
    neighborhood
  };
};

/**
 * Obtenir les villes par région pour HomeSherut
 */
export const getCitiesByRegionForHomeSherut = (region, serviceType) => {
  if (!region) return getIsraeliCities();
  
  const cities = getCitiesByRegion(region);
  return cities.map(city => ({
    ...city,
    estimatedProviders: Math.floor(Math.random() * 30) + 5
  }));
};

// Export des fonctions utilitaires de base (synchrones)
export {
  getAllCities,
  getCitiesByArea,
  normalizeCity,
  cityExists,
  getCityInfo,
  searchCities,
  getLocationStats,
  israelAreas
};