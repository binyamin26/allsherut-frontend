import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const API_BASE = import.meta.env.VITE_API_URL || '/api';

  const checkSubscriptionExpired = (user) => {
  if (user?.role === 'provider' && user?.premium_until) {
    return new Date(user.premium_until) < new Date();
  }
  return false;
};

  // Headers avec authentification
  const getHeaders = (isMultipart = false) => {
    const headers = {};
    
    // Ne pas définir Content-Type pour FormData (le navigateur le fait automatiquement)
    if (!isMultipart) {
      headers['Content-Type'] = 'application/json';
    }
    
    const token = localStorage.getItem('homesherut_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  };

  // Vérifier l'authentification au démarrage
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('homesherut_token');
      if (token) {
        try {
          const response = await fetch(`${API_BASE}/auth/me`, {
            headers: getHeaders()
          });
          
          if (response.ok) {
            const data = await response.json();
         if (data.success) {
setUser({ 
  ...data.data.user, 
  services: data.data.user.services || [data.data.user.service_type], 
  token 
});
            } else {
              // Token invalide
              localStorage.removeItem('homesherut_token');
            }
          } else {
            // Token invalide
            localStorage.removeItem('homesherut_token');
          }
        } catch (error) {
          console.error('Erreur lors de la vérification de l’authentification :', error);
          localStorage.removeItem('homesherut_token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Connexion
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        const userData = { ...data.data.user, token: data.data.token };
        localStorage.setItem('homesherut_token', data.data.token);
        setUser({ ...userData, services: userData.services || [userData.service_type] });
        return { success: true };
      } else {
        setError(data.message || 'Erreur de connexion');
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
      const errorMessage = 'Erreur de connexion au serveur';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Inscription - CORRIGÉE pour supporter FormData
  const register = async (userData, isMultipart = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const config = {
        method: 'POST',
        headers: getHeaders(isMultipart)
      };

      // Si c'est FormData (pour upload d'images), on l'envoie directement
      // Sinon on convertit en JSON
      if (isMultipart) {
        config.body = userData; // FormData
      } else {
        config.body = JSON.stringify(userData); // JSON normal
      }
      
    const response = await fetch(`${API_BASE}/auth/register`, config);
      const data = await response.json();
      console.log(data)

      // ✅ CORRIGÉ - Gestion des erreurs améliorée
      if (response.ok && data.success) {
        const userDataWithToken = { ...data.data.user, token: data.data.token };
        localStorage.setItem('homesherut_token', data.data.token);
      setUser({ ...userDataWithToken, services: userDataWithToken.services || [userDataWithToken.service_type] });
        return { success: true };
      } else {
        // Gestion des erreurs (409, 500, etc.)
        const errorMessage = data.message || 'Erreur lors de l’inscription';
        setError(errorMessage);
        return { success: false, message: errorMessage, errors: data.errors };
      }
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
      const errorMessage = 'Erreur de connexion au serveur';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // ✅ CORRIGÉ - Complétion profil provider
  const completeProviderProfile = async (serviceDetails, workingAreas, profileImage = null) => {
    try {
      setLoading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('serviceDetails', JSON.stringify(serviceDetails));
      formData.append('workingAreas', JSON.stringify(workingAreas));
      
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      
      const response = await fetch(`${API_BASE}/auth/complete-provider-profile`, {
        method: 'POST',
        headers: getHeaders(true), // isMultipart = true
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Mettre à jour l'utilisateur avec les nouvelles données
        const updatedUser = { ...user, ...data.data.user };
        setUser(updatedUser);
        return { success: true, data: data.data };
      } else {
        const errorMessage = data.message || 'Erreur lors de la finalisation du profil';
        setError(errorMessage);
        return { success: false, message: errorMessage, errors: data.errors };
      }

    } catch (error) {
      console.error('Erreur lors de la finalisation du profil :', error);
      const errorMessage = 'Erreur lors de la finalisation du profil';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // ✅ NOUVEAU - Vérifier si le profil provider est complet
  const checkProviderProfileComplete = async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/provider-profile-complete`, {
        headers: getHeaders()
      });

      const data = await response.json();
      
      if (data.success) {
        return { success: true, isComplete: data.data.isComplete, profile: data.data.profile };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du profil :', error);
      return { success: false, message: 'Erreur lors de la vérification du profil' };
    }
  };

  // ✅ NOUVEAU - Vérifier si téléphone déjà utilisé pour ce service
const checkPhoneExists = async (phone, serviceType) => {
  try {
    const response = await fetch(`${API_BASE}/auth/check-phone`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, serviceType })
    });

    const data = await response.json();
    
    if (data.success) {
      return data.phoneExists;
    }
    return false;
  } catch (error) {
    console.error('Erreur lors de la vérification du téléphone :', error);
    return false;
  }
};

  // Déconnexion
  const logout = async () => {
    try {
      if (user?.token) {
        await fetch(`${API_BASE}/auth/logout`, {
          method: 'POST',
          headers: getHeaders()
        });
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    } finally {
      setUser(null);
      localStorage.removeItem('homesherut_token');
      setError(null);
    }
  };

// ✅ AMÉLIORATION - Mise à jour du profil complet
const updateProfile = async (profileData) => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await fetch(`${API_BASE}/auth/update-full-profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(profileData)
    });

    const data = await response.json();

    if (data.success) {
      // Mettre à jour l'utilisateur dans le state
      const updatedUser = { ...user, ...data.data.user };
      setUser(updatedUser);
      return { success: true, data: data.data };
    } else {
      setError(data.message || 'Erreur lors de la mise à jour du profil');
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil :', error);
    const errorMessage = 'Erreur lors de la mise à jour du profil';
    setError(errorMessage);
    return { success: false, message: errorMessage };
  } finally {
    setLoading(false);
  }
};

// Upload d'image de profil
const uploadProfileImage = async (imageFile, serviceType = null) => {
  try {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    // ✅ AJOUTER le service_type au FormData
    formData.append('serviceType', serviceType || user?.service_type);
    
    const response = await fetch(`${API_BASE}/upload/profile-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('homesherut_token')}`
      },
      body: formData
    });

    const data = await response.json();

    if (data.success) {

 // ✅ Le backend renvoie déjà l'URL complète, ne rien rajouter si elle commence par http
const imageFullUrl = data.data.imageUrl.startsWith('http') 
  ? data.data.imageUrl 
  : `https://homesherut-backend.fly.dev${data.data.imageUrl.startsWith('/') ? '' : '/'}${data.data.imageUrl}`;

const updatedUser = {
  ...user,
  profileImage: imageFullUrl,
  profile_image: imageFullUrl,
        providerProfile: user.providerProfile ? {
          ...user.providerProfile,
          profile_image: imageFullUrl,
          ...(data.data.verificationStatus ? { verification_status: data.data.verificationStatus } : {})
        } : null
      };
      setUser(updatedUser);
      return { success: true, imageUrl: data.data.imageUrl };
    } else {
      setError(data.message || 'Erreur lors du téléchargement de la photo');
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Erreur lors du téléchargement de la photo :', error);
    const errorMessage = 'Erreur lors du téléchargement de la photo';
    setError(errorMessage);
    return { success: false, message: errorMessage };
  } finally {
    setLoading(false);
  }
};

// Supprimer l'image de profil
const deleteProfileImage = async (serviceType = null) => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await apiCall('/upload/profile-image', 'DELETE', {
      serviceType: serviceType || user?.service_type
    });

    if (response.success) {
      const updatedUser = { 
        ...user, 
        profileImage: null,
        providerProfile: user.providerProfile ? {
          ...user.providerProfile,
          profile_image: null
        } : null
      };
      setUser(updatedUser);
      return { success: true };
    } else {
      setError(response.message || 'Erreur lors de la suppression de la photo');
      return { success: false, message: response.message };
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la photo :', error);
    const errorMessage = 'Erreur lors de la suppression de la photo';
    setError(errorMessage);
    return { success: false, message: errorMessage };
  } finally {
    setLoading(false);
  }
};

// Upload image galerie
const uploadGalleryImage = async (imageFile, serviceType = null) => {
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append('galleryImage', imageFile);
    formData.append('serviceType', serviceType || user?.service_type);

    const response = await fetch(`${API_BASE}/upload/gallery-image`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('homesherut_token')}` },
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      const updatedUser = {
        ...user,
        providerProfile: user.providerProfile ? {
          ...user.providerProfile,
          profile_images: data.data.gallery,
          ...(data.data.verificationStatus ? { verification_status: data.data.verificationStatus } : {})
        } : null
      };
      setUser(updatedUser);
      return { success: true, gallery: data.data.gallery };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: 'Erreur lors du téléchargement de la photo' };
  } finally {
    setLoading(false);
  }
};

// Supprimer image galerie
const deleteGalleryImage = async (imageUrl, serviceType = null) => {
  try {
    setLoading(true);
    const response = await apiCall('/upload/gallery-image', 'DELETE', {
      imageUrl,
      serviceType: serviceType || user?.service_type
    });

    if (response.success) {
      const updatedUser = {
        ...user,
        providerProfile: user.providerProfile ? {
          ...user.providerProfile,
          profile_images: response.data.gallery
        } : null
      };
      setUser(updatedUser);
      return { success: true, gallery: response.data.gallery };
    }
    return { success: false, message: response.message };
  } catch (error) {
    return { success: false, message: 'Erreur lors de la suppression de la photo' };
  } finally {
    setLoading(false);
  }
};

  // Changement de mot de passe
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/auth/change-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await response.json();

      if (data.success) {
        return { success: true };
      } else {
        setError(data.message || 'Erreur lors du changement de mot de passe');
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe :', error);
      const errorMessage = 'Erreur lors du changement de mot de passe';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // ✅ CORRIGÉ - Appel API générique avec gestion des vrais messages d'erreur
  const apiCall = async (endpoint, method = 'GET', data = null, isMultipart = false) => {
    try {
      const config = {
        method,
        headers: getHeaders(isMultipart)
      };
if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE')) {
        if (isMultipart) {
          config.body = data; // FormData
        } else {
          config.body = JSON.stringify(data); // JSON
        }
      }

      const response = await fetch(`${API_BASE}${endpoint}`, config);
      
      if (response.status === 401) {
        // Session expirée
        await logout();
        throw new Error('Session expirée');
      }

      if (!response.ok) {
        // ✅ NOUVEAU : Récupérer le vrai message d'erreur du serveur
        let errorMessage = 'Erreur de connexion au serveur'; // Message par défaut
        
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message; // Utiliser le message du serveur
          }
        } catch (parseError) {
          // Si on ne peut pas parser la réponse, utiliser le message par défaut
          console.error('Erreur parsing response:', parseError);
        }
        
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erreur API ${endpoint}:`, error);
      throw error;
    }
  };

  // ✅ NOUVEAU - Rafraîchir les données utilisateur
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('homesherut_token');
      if (!token) return false;

      const response = await fetch(`${API_BASE}/auth/me`, {
        headers: getHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser({ ...data.data.user, token });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Erreur lors de l’actualisation de l’utilisateur :', error);
      return false;
    }
  };

  // ✅ NOUVEAU - Vérifier si token valide
  const validateToken = async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/check`, {
        headers: getHeaders()
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // ==========================================
  // 🆕 NOUVELLES MÉTHODES - SYSTÈME D'ABONNEMENTS
  // ==========================================

  // Obtenir le statut d'abonnement du prestataire connecté
  const getSubscriptionStatus = async () => {
    try {
      setError(null);
      
      const response = await apiCall('/subscriptions/status', 'GET');
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération du statut de l’abonnement :', error);
      return { success: false, message: error.message };
    }
  };

  // Obtenir les tarifs disponibles
  const getSubscriptionPricing = async () => {
    try {
      setError(null);
      
      const response = await apiCall('/subscriptions/pricing', 'GET');
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des tarifs d’abonnement :', error);
      return { success: false, message: error.message };
    }
  };

  // Passer du trial au plan payant
  const upgradeSubscription = async (planType, paymentMethodId, stripeSubscriptionId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall('/subscriptions/upgrade', 'POST', {
        planType,
        paymentMethodId,
        stripeSubscriptionId
      });

      if (response.success) {
        // Rafraîchir les données utilisateur pour inclure le nouvel abonnement
        await refreshUser();
      }

      return response;
    } catch (error) {
      console.error('Erreur lors de la mise à niveau de l’abonnement :', error);
      const errorMessage = error.message || 'Erreur lors de la mise à niveau de l’abonnement';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Annuler l'abonnement
  const cancelSubscription = async (reason = 'user_request') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall('/subscriptions/cancel', 'POST', {
        reason
      });

      if (response.success) {
        // Rafraîchir les données utilisateur
        await refreshUser();
      }

      return response;
    } catch (error) {
      console.error('Erreur lors de l’annulation de l’abonnement :', error);
      const errorMessage = error.message || 'Erreur lors de l’annulation de l’abonnement';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Réactiver un abonnement annulé
  const reactivateSubscription = async (paymentMethodId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall('/subscriptions/reactivate', 'POST', {
        paymentMethodId
      });

      if (response.success) {
        // Rafraîchir les données utilisateur
        await refreshUser();
      }

      return response;
    } catch (error) {
      console.error('Erreur lors de la réactivation de l’abonnement :', error);
      const errorMessage = error.message || 'Erreur lors de la réactivation de l’abonnement';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Obtenir l'historique de facturation
  const getBillingHistory = async () => {
    try {
      setError(null);
      
      const response = await apiCall('/subscriptions/billing-history', 'GET');
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération de l’historique des paiements :', error);
      return { success: false, message: error.message };
    }
  };

  // =============================================
  // SYSTÈME RÉPONSES PRESTATAIRES (existant)
  // =============================================

  // Créer une réponse prestataire à un avis (AUTHENTIFICATION REQUISE)
  const createProviderResponse = async (reviewId, responseText) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall(`/reviews/${reviewId}/respond`, 'POST', {
        responseText: responseText.trim()
      });

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Erreur lors de la création de la réponse';
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error('Erreur lors de la création de la réponse :', error);
      const errorMessage = 'Erreur de connexion au serveur';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Dashboard prestataire - Récupérer mes avis avec statuts réponse (AUTHENTIFICATION REQUISE)
  const getMyReviews = async (options = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Construire query string si options fournis
      const queryParams = new URLSearchParams(options);
      const endpoint = `/reviews/my-reviews${queryParams.toString() ? `?${queryParams}` : ''}`;
      
      const response = await apiCall(endpoint, 'GET');
      
      console.log('📥 API Response brute:', response); // ← AJOUTER

      if (response.success) {
        // ✅ CORRIGÉ - La réponse peut avoir reviews directement ou dans data
        const reviews = response.data?.reviews || response.reviews || [];
        return { success: true, data: { reviews } };
      } else {
        const errorMessage = response.message || 'Erreur lors du chargement des avis';
        setError(errorMessage);
        return { success: false, message: errorMessage, data: { reviews: [] } };
      }
    } catch (error) {
      console.error('Erreur lors du chargement des avis :', error);
      const errorMessage = 'Erreur de connexion au serveur';
      setError(errorMessage);
      return { success: false, message: errorMessage, data: { reviews: [] } };
    } finally {
      setLoading(false);
    }
  };

  // Récupérer un avis spécifique avec réponse (AUTHENTIFICATION REQUISE)
  const getSingleReview = async (reviewId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall(`/reviews/${reviewId}`, 'GET');

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.message || 'Erreur lors du chargement de l’avis';
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l’avis :', error);
      const errorMessage = 'Erreur de connexion au serveur';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

    // 🆕 Changer de service actif
const switchService = async (serviceType) => {
  try {
    setLoading(true);
    const response = await fetch(`${API_BASE}/auth/me?service_type=${serviceType}`, {
      headers: getHeaders()
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        setUser({ 
          ...data.data.user, 
          services: data.data.user.services || [data.data.user.service_type], 
          token: localStorage.getItem('homesherut_token') 
        });
        return { success: true };
      }
    }
    return { success: false, message: 'Erreur lors du changement de service' };
  } catch (error) {
    console.error('Erreur lors du changement de service:', error);
    return { success: false, message: 'Erreur lors du changement de service' };
  } finally {
    setLoading(false);
  }
};

// 🆕 NOUVEAU - Supprimer un service spécifique
  const deleteService = async (serviceType) => {
    try {
      const response = await apiCall(`/services/${serviceType}`, 'DELETE');
      
      if (response.success) {
        // Si le compte entier a été supprimé
        if (response.accountDeleted) {
          localStorage.removeItem('homesherut_token');
          localStorage.removeItem('user');
          localStorage.removeItem('activeService');
          setUser(null);
          
          return {
            success: true,
            accountDeleted: true,
            message: 'Compte définitivement supprimé'
          };
        }
        
        // Sinon, mettre à jour l'utilisateur avec les services restants
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('activeService', response.data.newActiveService);
        
        return {
          success: true,
          accountDeleted: false,
          remainingServices: response.data.remainingServices,
          newActiveService: response.data.newActiveService,
          message: 'Service supprimé avec succès'
        };
      } else {
        throw new Error(response.message || 'Erreur lors de la suppression du service');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du service :', error);
      throw error;
    }
  };

  // ✅ MODIFIÉ - Modifier le const value pour inclure les nouvelles méthodes d'abonnements :
  const value = {
    // État
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isSubscriptionExpired: checkSubscriptionExpired(user),
    
    // Authentification
    login,
    register,
    logout,
    
    // Profil
    updateProfile,
    changePassword,
    refreshUser,
    uploadProfileImage,     // ← AJOUTER
  deleteProfileImage,

  uploadGalleryImage,
deleteGalleryImage,
    
    // Provider spécifique
    completeProviderProfile,
    checkProviderProfileComplete,
      checkPhoneExists,
    
    // Réponses prestataires (existant)
    createProviderResponse,
    getMyReviews,
    getSingleReview,
    
    // 🆕 NOUVEAU - Système d'abonnements
    getSubscriptionStatus,
    getSubscriptionPricing,
    upgradeSubscription,
    cancelSubscription,
    reactivateSubscription,
    getBillingHistory,
    
    // Utilitaires
    apiCall,
    clearError,
    validateToken,
    switchService,
    deleteService,
    setUser
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};