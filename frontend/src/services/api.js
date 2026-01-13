class ApiService {
  constructor() {
    // On s'assure que VITE_API_URL est la priorité absolue
    this.baseURL = import.meta.env.VITE_API_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }


  // Récupération du token depuis localStorage
  getAuthToken() {
    return localStorage.getItem('homesherut_token');
  }

  // Headers avec authentification
  getAuthHeaders() {
    const token = this.getAuthToken();
    return {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Méthode générique pour les requêtes
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Gestion automatique de la déconnexion si token expiré
      if (response.status === 401) {
        localStorage.removeItem('homesherut_token');
        window.location.href = '/';
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`❌ Erreur API ${endpoint}:`, error);
      throw new Error('שגיאת חיבור לשרת');
    }
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

  async logout() {
    const result = await this.request('/auth/logout', {
      method: 'POST',
    });
    localStorage.removeItem('homesherut_token');
    return result;
  }

  async getProfile() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData) {
    return this.request('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  async checkToken() {
    return this.request('/auth/check');
  }

  // =============================================
  // STATISTIQUES UTILISATEUR
  // =============================================

  async getUserStats() {
    return this.request('/users/stats');
  }

  async getDashboardStats(serviceType) {
    try {
      const userProfile = await this.getProfile();
      if (!userProfile.success) {
        throw new Error('Impossible de récupérer le profil');
      }

      // Simulation de stats basées sur les données utilisateur réelles
      const user = userProfile.data.user;
      const mockStats = {
        totalContacts: Math.floor(Math.random() * 50) + 10,
        activeConversations: Math.floor(Math.random() * 8) + 2,
        rating: (Math.random() * 2 + 3).toFixed(1), // Entre 3.0 et 5.0
        reviewsCount: Math.floor(Math.random() * 25) + 5,
        completedServices: Math.floor(Math.random() * 100) + 20,
        earnings: Math.floor(Math.random() * 5000) + 1000,
        monthlyContacts: Math.floor(Math.random() * 15) + 3,
        monthlyServices: Math.floor(Math.random() * 20) + 5,
        earningsGrowth: Math.floor(Math.random() * 30) + 5,
        favorites: Math.floor(Math.random() * 15) + 2,
        reviewsGiven: Math.floor(Math.random() * 10) + 1
      };

      return {
        success: true,
        data: mockStats
      };
    } catch (error) {
      console.error('Erreur stats dashboard:', error);
      return {
        success: false,
        message: 'שגיאה בטעינת סטטיסטיקות'
      };
    }
  }

  // =============================================
  // SERVICES ET RECHERCHE
  // =============================================

  async getServices() {
    return this.request('/services/available');
  }

  async searchProviders(searchParams) {
    const queryParams = new URLSearchParams(searchParams).toString();
    return this.request(`/search/providers?${queryParams}`);
  }

  async getServiceProvider(providerId) {
    return this.request(`/providers/${providerId}`);
  }

  async getProvider(providerId) {
  return this.request(`/providers/${providerId}`);
}

  // =============================================
  // AVIS ET ÉVALUATIONS (Système simplifié)
  // =============================================

  // Envoyer un code de vérification par email pour créer un avis
  async sendReviewVerification(data) {
    return this.request('/reviews/send-verification', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Vérifier le code de vérification reçu par email
  async verifyReviewCode(data) {
    return this.request('/reviews/verify-code', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Créer un avis après vérification du code (PUBLICATION IMMÉDIATE)
  async createReview(data) {
    return this.request('/reviews/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Récupérer les avis d'un provider avec pagination et tri (AVEC RÉPONSES)
async getProviderReviews(providerId, options = {}) {
  const params = new URLSearchParams(options);
  const queryString = params.toString();
  const url = queryString ? `/reviews/provider/${providerId}?${queryString}` : `/reviews/provider/${providerId}`;
  return this.request(url);
}


  // Récupérer les statistiques d'avis d'un provider
  async getProviderReviewStats(providerId) {
    return this.request(`/reviews/provider/${providerId}/stats`);
  }

  // Marquer un avis comme utile
  async markReviewHelpful(reviewId) {
    return this.request(`/reviews/${reviewId}/helpful`, {
      method: 'POST',
    });
  }

  // Vérifier si un email a déjà laissé un avis pour ce provider
  async checkExistingReview(providerId, email) {
    return this.request(`/reviews/check-existing/${providerId}?email=${encodeURIComponent(email)}`);
  }

  // =============================================
  // 🆕 NOUVEAU - SYSTÈME RÉPONSES PRESTATAIRES
  // =============================================

  // Créer une réponse prestataire à un avis (AUTHENTIFICATION REQUISE)
  async createProviderResponse(reviewId, responseText) {
    return this.request(`/reviews/${reviewId}/respond`, {
      method: 'POST',
      body: JSON.stringify({ responseText }),
    });
  }

  // Dashboard prestataire - Récupérer mes avis avec statuts réponse (AUTHENTIFICATION REQUISE)
  async getMyReviews(options = {}) {
    const params = new URLSearchParams(options);
    return this.request(`/reviews/my-reviews?${params}`);
  }

  // Récupérer un avis spécifique avec réponse (AUTHENTIFICATION REQUISE)
  async getSingleReview(reviewId) {
    return this.request(`/reviews/${reviewId}`);
  }

  // Récupérer les avis récents (pour debug/admin)
  async getRecentReviews(limit = 20) {
    return this.request(`/reviews/recent?limit=${limit}`);
  }

  // =============================================
  // UPLOAD D'IMAGES
  // =============================================

  async uploadImage(file, type = 'profile') {
    const formData = new FormData();
    formData.append('profileImage', file);
    formData.append('type', type);

    return this.request('/upload', {
      method: 'POST',
      headers: {
        // Ne pas définir Content-Type pour FormData
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
      body: formData,
    });
  }

  async uploadMultipleImages(files, type = 'profile') {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });
    formData.append('type', type);

    return this.request('/upload/multiple', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
      body: formData,
    });
  }

  // =============================================
  // GÉOLOCALISATION
  // =============================================

  async getLocationSuggestions(query, serviceType = null) {
    let endpoint = `/location/suggestions?q=${encodeURIComponent(query)}`;
    if (serviceType) endpoint += `&serviceType=${serviceType}`;
    return this.request(endpoint);
  }

  async searchServicesByLocation(serviceType, city, neighborhood = null) {
    let endpoint = `/location/search/${serviceType}?city=${encodeURIComponent(city)}`;
    if (neighborhood) endpoint += `&neighborhood=${encodeURIComponent(neighborhood)}`;
    return this.request(endpoint);
  }

  async getLocationStats(city) {
    return this.request(`/location/stats/${encodeURIComponent(city)}`);
  }

  // =============================================
  // PROFIL PROVIDER
  // =============================================

  async getProviderProfile() {
    try {
      const userProfile = await this.getProfile();
      if (!userProfile.success || userProfile.data.user.role !== 'provider') {
        return {
          success: false,
          message: 'Profil provider non trouvé'
        };
      }

      const user = userProfile.data.user;
      
      // Simulation d'un profil provider basé sur les vraies données
      const mockProviderProfile = {
        id: user.id,
        userId: user.id,
        serviceType: user.serviceType,
        title: `ספק ${user.serviceType} מקצועי`,
        description: `ספק שירותי ${user.serviceType} עם ניסיון מקצועי`,
        experienceYears: Math.floor(Math.random() * 8) + 2,
        hourlyRate: Math.floor(Math.random() * 100) + 50,
        profileCompleted: true,
        workingAreas: [
          { city: 'תל אביב', neighborhood: 'מרכז העיר' },
          { city: 'רמת גן', neighborhood: 'הברזל' }
        ],
        createdAt: user.createdAt,
        isActive: true,
        verificationStatus: 'verified'
      };

      return {
        success: true,
        data: mockProviderProfile
      };
    } catch (error) {
      console.error('Erreur profil provider:', error);
      return {
        success: false,
        message: 'שגיאה בטעינת פרופיל ספק'
      };
    }
  }

  async getContactCredits() {
    try {
      const userProfile = await this.getProfile();
      if (!userProfile.success) {
        throw new Error('Impossible de récupérer le profil');
      }

      const user = userProfile.data.user;
      
      // Si c'est un client, retourner ses crédits réels ou simulés
      if (user.role === 'client') {
        const credits = user.contactCredits || {
          total: 3,
          used: Math.floor(Math.random() * 2),
          remaining: 3 - Math.floor(Math.random() * 2)
        };

        return {
          success: true,
          data: credits
        };
      }

      return {
        success: false,
        message: 'Non disponible pour ce type de compte'
      };
    } catch (error) {
      console.error('Erreur crédits contact:', error);
      return {
        success: false,
        message: 'שגיאה בטעינת קרדיטים'
      };
    }
  }

  // =============================================
  // CONTACTS ET MESSAGES
  // =============================================

  async contactProvider(contactData) {
    return this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async getMyContacts() {
    return this.request('/contacts/my');
  }

  // =============================================
  // ABONNEMENTS PREMIUM
  // =============================================

  async getSubscriptionInfo() {
    return this.request('/subscriptions/info');
  }

  async createSubscription(subscriptionData) {
    return this.request('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  // =============================================
  // PAIEMENTS
  // =============================================

  async createPayment(paymentData) {
    return this.request('/payments/create', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async verifyPayment(paymentId) {
    return this.request(`/payments/verify/${paymentId}`);
  }

  // =============================================
  // MÉTHODES UTILITAIRES
  // =============================================

  async testConnection() {
    try {
      const response = await fetch(`${this.baseURL.replace('/api', '')}/health`);
      return await response.json();
    } catch (error) {
      console.error('Test connexion échoué:', error);
      return { success: false, message: 'Connexion échouée' };
    }
  }

  // Méthode générique pour appels custom
  async apiCall(endpoint, method = 'GET', data = null) {
    const config = { method };
    
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(data);
    }
    
    return this.request(endpoint, config);
  }
}

// Instance singleton de l'API
const apiService = new ApiService();
export default apiService;