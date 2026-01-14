class ApiService {
  async request(endpoint) {
    // URL en dur sans aucune variable pour forcer le système
    const forceURL = "https://homesherut-backend.onrender.com/api" + endpoint;
    console.log("🔥 URL FINALE UTILISÉE :", forceURL);
    
    try {
      const r = await fetch(forceURL, {
        headers: { 'Content-Type': 'application/json' }
      });
      return await r.json();
    } catch (e) {
      console.error("Erreur:", e);
      throw e;
    }
  }

  async searchProviders(filters) {
    return this.request('/search/providers?service=' + (filters.service || ''));
  }
}
export default new ApiService();