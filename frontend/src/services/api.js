// src/services/api.js
class ApiService {
  constructor() {
    // URL forcée pour éviter les erreurs 404 sur Vercel
    this.baseURL = 'https://homesherut-backend.onrender.com/api';
  }

  // Récupération du token pour les zones connectées
  getAuthToken() {
    return localStorage.getItem('homesherut_token');
  }

  // Méthode de requête universelle et ultra-robuste
 async request(endpoint, options = {}) {
  const fullURL = this.baseURL + endpoint;
  const token = this.getAuthToken();
  
  const headers = {
    'Accept': 'application/json',
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  try {
    const response = await fetch(fullURL, { ...options, headers });

    // Si le serveur répond, on essaie de lire le JSON quoi qu'il arrive
    const data = await response.json();
    
    // On s'assure que 'success' et 'providers' existent pour éviter le crash du frontend
    return {
      success: data.success || response.ok,
      providers: data.providers || (Array.isArray(data) ? data : []),
      ...data
    };
  } catch (error) {
    console.error(`❌ Échec sur ${fullURL}:`, error);
    // Retourne un objet vide au lieu de 'undefined' pour empêcher le crash
    return { success: false, providers: [], message: 'שגיאה בחיבור לשרת' };
  }
}

  // =============================================
  // SERVICES ET RECHERCHE (Ce qui te manquait !)
  // =============================================

async searchProviders(filters) {
    const queryParams = new URLSearchParams(filters).toString();
    const result = await this.request(`/search/providers?${queryParams}`);
    
    // Si le serveur renvoie directement la liste au lieu de {providers: []}
    if (Array.isArray(result)) {
      return { success: true, providers: result };
    }
    
    // Si le serveur renvoie une erreur, on garantit que 'providers' existe
    if (!result || !result.providers) {
      return { ...result, providers: result?.providers || [] };
    }
    
    return result;
  }

  async getProvider(id) {
    // Répare l'erreur "apiService.getProvider is not a function"
    return this.request(`/providers/${id}`);
  }

  async getProviderReviews(id) {
    // Route backend pour les avis
    return this.request(`/providers/${id}/reviews`);
  }

  // =============================================
  // AUTHENTIFICATION
  // =============================================

  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    return this.request('/auth/me');
  }

  // =============================================
  // AUTRES MÉTHODES (Upload, Dashboard, etc.)
  // =============================================

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('profileImage', file);
    return this.request('/upload', {
      method: 'POST',
      body: formData,
    });
  }

  async getSubscriptionInfo() {
    return this.request('/subscriptions/info');
  }

  async testConnection() {
    return this.request('/health');
  }
}

const apiService = new ApiService();
export default apiService;