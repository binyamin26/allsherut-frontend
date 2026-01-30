class ApiService {
  constructor() {
    // Base URL components split to avoid Vite minifier optimization
    this.protocol = "https://";
    this.domain = "homesherut-backend.onrender.com";
    this.basePath = "/api";
  }

  getAuthToken() {
    return localStorage.getItem('homesherut_token');
  }

  buildURL(endpoint) {
    return this.protocol + this.domain + this.basePath + endpoint;
  }

  async request(endpoint, options = {}) {
    const fullURL = this.buildURL(endpoint);

    const token = this.getAuthToken();
    const headers = {
      'Accept': 'application/json',
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    };

    try {
      const response = await fetch(fullURL, { ...options, headers });
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("text/html")) {
        console.error("❌ Erreur: Reçu HTML au lieu de JSON");
        return { success: false, message: 'Erreur serveur' };
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          message: errorData.message || 'Erreur de connexion',
          ...errorData
        };
      }

      const data = await response.json();
      return {
        success: true,
        ...data
      };
    } catch (error) {
      console.error("❌ Erreur réseau:", error);
      return { 
        success: false, 
        message: 'Erreur de connexion au serveur'
      };
    }
  }

  async searchProviders(filters) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = "/search/providers?" + queryParams;
    const fullURL = this.buildURL(endpoint);

    try {
      const response = await fetch(fullURL);
      
      if (!response.ok) {
        return { success: false, providers: [] };
      }

      const data = await response.json();
      return {
        success: true,
        providers: data.providers || [],
        ...data
      };
    } catch (error) {
      console.error("❌ Erreur recherche providers:", error);
      return { success: false, providers: [] };
    }
  }

  async getProvider(id) {
    return this.request("/providers/" + id);
  }

  async getProviderReviews(id) {
    return this.request("/providers/" + id + "/reviews");
  }

  async submitReview(providerId, reviewData) {
    return this.request("/providers/" + providerId + "/reviews", {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  }

  async respondToReview(reviewId, responseText) {
    return this.request("/reviews/" + reviewId + "/response", {
      method: 'POST',
      body: JSON.stringify({ response: responseText })
    });
  }

  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }

  async resetPassword(token, newPassword) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword })
    });
  }

  async getProfile() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  async deleteAccount() {
    return this.request('/auth/delete-account', {
      method: 'DELETE'
    });
  }

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('profileImage', file);
    return this.request('/upload', {
      method: 'POST',
      body: formData
    });
  }

  async createService(serviceData) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(serviceData)
    });
  }

  async updateService(serviceId, serviceData) {
    return this.request('/services/' + serviceId, {
      method: 'PUT',
      body: JSON.stringify(serviceData)
    });
  }

  async deleteService(serviceId) {
    return this.request('/services/' + serviceId, {
      method: 'DELETE'
    });
  }

  async getSubscriptionStatus() {
    return this.request('/subscription/status');
  }

  async cancelSubscription() {
    return this.request('/subscription/cancel', {
      method: 'POST'
    });
  }

  async testConnection() {
    return this.request('/health');
  }
}

const apiService = new ApiService();
export default apiService;