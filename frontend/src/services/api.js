class ApiService {
  constructor() {
    this.baseURL = 'https://homesherut-backend.onrender.com/api';
  }

  getAuthHeaders() {
    const token = localStorage.getItem('homesherut_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  async request(endpoint, options = {}) {
    // Utilisation d'une concaténation simple pour éviter les erreurs de template string
    const url = 'https://homesherut-backend.onrender.com/api' + endpoint;
    
    console.log("🚀 APPEL RÉEL VERS :", url);

    try {
      const response = await fetch(url, {
        ...options,
        headers: this.getAuthHeaders(),
      });

      if (response.status === 401) {
        localStorage.removeItem('homesherut_token');
        return null;
      }

      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error("❌ Le serveur n'a pas renvoyé de JSON valide:", text);
        throw new Error('Réponse serveur invalide');
      }
    } catch (error) {
      console.error("❌ Erreur de connexion au serveur:", error);
      throw new Error('שגיאת חיבור לשרת');
    }
  }

  async searchProviders(filters) {
    const params = new URLSearchParams();
    if (filters.service) params.append('service', filters.service);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return this.request('/search/providers?' + params.toString());
  }
}

export default new ApiService();