class ApiService {
  constructor() {
    this.baseURL = 'https://homesherut-backend.onrender.com/api';
  }

  getAuthToken() {
    return localStorage.getItem('homesherut_token');
  }

  async request(endpoint, options = {}) {
    const fullURL = "https://homesherut-backend.onrender.com/api" + endpoint;
    console.log("FINAL URL:", fullURL);

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
        console.error("ERROR: HTML instead of JSON");
        return { success: false, providers: [] };
      }

      const data = await response.json();
      return {
        success: data.success || response.ok,
        providers: data.providers || (Array.isArray(data) ? data : []),
        ...data
      };
    } catch (error) {
      console.error("Fetch error:", error);
      return { success: false, providers: [], message: 'Error' };
    }
  }

  async searchProviders(filters) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request("/search/providers?" + queryParams);
  }

  async getProvider(id) {
    return this.request("/providers/" + id);
  }

  async getProviderReviews(id) {
    return this.request("/providers/" + id + "/reviews");
  }

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

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('profileImage', file);
    return this.request('/upload', {
      method: 'POST',
      body: formData,
    });
  }

  async testConnection() {
    return this.request('/health');
  }
}

const apiService = new ApiService();
export default apiService;
