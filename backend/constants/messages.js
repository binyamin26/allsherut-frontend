// constants/messages.js - Messages unifiés en hébreu
/**
 * Messages système unifiés pour HomeSherut
 * Tous les messages utilisateur en hébreu, logs développeur en français
 */

const MESSAGES = {
  
  // =============================================
  // SUCCÈS - Actions réussies
  // =============================================
  SUCCESS: {
    AUTH: {
      LOGIN: 'Connexion réussie !',
      LOGOUT: 'Déconnexion réussie',
      REGISTER: 'Inscription réussie !',
      PASSWORD_CHANGED: 'Mot de passe modifié avec succès',
      PASSWORD_RESET: 'Mot de passe modifié avec succès',
      PROFILE_UPDATED: 'Profil mis à jour avec succès',
      EMAIL_SENT: 'Si cette adresse e-mail existe, un lien de réinitialisation du mot de passe lui a été envoyé'
    },
    
    PROVIDER: {
      PROFILE_COMPLETED: 'Profil du service complété avec succès !',
      PROFILE_UPDATED: 'Profil du service mis à jour avec succès',
      FREE_MONTH_GRANTED: 'Vous avez reçu un mois premium gratuit !',
      DETAILS_SAVED: 'Détails du service enregistrés avec succès'
    },
    
    CLIENT: {
      CONTACT_SENT: 'Message envoyé au prestataire',
      CREDITS_GRANTED: 'Vous avez reçu 3 consultations gratuites !',
      FAVORITE_ADDED: 'Ajouté aux favoris',
      FAVORITE_REMOVED: 'Retiré des favoris'
    },
    
    UPLOAD: {
      IMAGE_UPLOADED: 'Photo de profil téléchargée avec succès',
      IMAGE_DELETED: 'Photo de profil supprimée avec succès',
      FILE_PROCESSED: 'Fichier traité avec succès'
    },
    
    SYSTEM: {
      DATA_LOADED: 'Données chargées avec succès',
      SEARCH_COMPLETED: 'Recherche effectuée avec succès',
      FILTERS_APPLIED: 'Filtres appliqués avec succès',
      STATS_LOADED: 'Statistiques chargées avec succès'
    }
  },

  // =============================================
  // ERREURS - Messages d'erreur utilisateur
  // =============================================
  ERROR: {
    AUTH: {
      INVALID_CREDENTIALS: 'E-mail ou mot de passe incorrect',
      EMAIL_EXISTS: 'Cette adresse e-mail est déjà utilisée',
      PASSWORD_TOO_WEAK: 'Le mot de passe doit contenir au moins 8 caractères',
      PASSWORD_MISMATCH: 'Le mot de passe actuel est incorrect',
      TOKEN_EXPIRED: 'Session expirée. Veuillez vous reconnecter',
      TOKEN_INVALID: 'Jeton de réinitialisation invalide ou expiré',
      ACCESS_DENIED: 'Vous n’avez pas l’autorisation d’effectuer cette action',
      LOGIN_REQUIRED: 'Connexion requise',
      RATE_LIMITED: 'Trop de tentatives de connexion. Réessayez dans 15 minutes'
    },
    
    VALIDATION: {
      REQUIRED_FIELD: 'Champ obligatoire manquant',
      INVALID_EMAIL: 'Adresse e-mail invalide',
      INVALID_PHONE: 'Numéro de téléphone invalide (0X XX XX XX XX)',
      INVALID_FORMAT: 'Format invalide',
      DATA_INVALID: 'Données invalides',
      PASSWORD_COMPLEXITY: 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre',
      COMMON_PASSWORD: 'Le mot de passe ne peut pas contenir de mots courants'
    },
    
    RESOURCE: {
      USER_NOT_FOUND: 'Utilisateur introuvable',
      PROVIDER_NOT_FOUND: 'Prestataire introuvable ou indisponible',
      PROFILE_NOT_FOUND: 'Profil introuvable',
      RESOURCE_NOT_FOUND: 'Ressource introuvable',
      PROFILE_INCOMPLETE: 'Profil incomplet'
    },
    
    BUSINESS: {
      CREDITS_INSUFFICIENT: 'Crédits insuffisants. Passez au premium',
      PREMIUM_REQUIRED: 'Compte premium requis',
      SERVICE_UNAVAILABLE: 'Le service n’est pas disponible pour le moment',
      ALREADY_CONTACTED: 'Vous avez déjà contacté ce prestataire ce mois-ci',
      MAX_CONTACTS_REACHED: 'Vous avez atteint le maximum de consultations ce mois-ci (3)'
    },
    
    UPLOAD: {
      FILE_TOO_LARGE: 'Fichier trop volumineux. Maximum 5 Mo',
      INVALID_FILE_TYPE: 'Seules les images sont autorisées (JPEG, PNG, WebP)',
      UPLOAD_FAILED: 'Erreur lors du téléchargement de la photo',
      NO_FILE_SELECTED: 'Aucun fichier sélectionné'
    },
    
    SYSTEM: {
      SERVER_ERROR: 'Erreur interne du serveur',
      DATABASE_ERROR: 'Erreur de base de données',
      EXTERNAL_SERVICE: 'Erreur de service externe',
      CONFIGURATION_ERROR: 'Erreur de configuration du système',
      NETWORK_ERROR: 'Erreur réseau. Vérifiez votre connexion internet',
      MAINTENANCE: 'Système en maintenance. Réessayez plus tard'
    },
    
    EMAIL: {
      SEND_FAILED: 'Erreur lors de l’envoi de l’e-mail',
      SERVICE_UNAVAILABLE: 'Le service d’e-mail n’est pas disponible',
      INVALID_TEMPLATE: 'Modèle d’e-mail invalide',
      RATE_LIMITED: 'Vous pouvez demander une réinitialisation du mot de passe jusqu’à 3 fois par tranche de 15 minutes'
    }
  },

  // =============================================
  // INFORMATIONS - Messages informatifs
  // =============================================
  INFO: {
    SEARCH: {
      NO_RESULTS: 'Aucun résultat ne correspond à votre recherche',
      REFINE_SEARCH: 'Essayez de modifier les termes de recherche ou de retirer des filtres',
      RESULTS_FOUND: '{count} résultats trouvés',
      LOADING: 'Chargement des résultats...'
    },
    
    PROVIDER: {
      VERIFICATION_PENDING: 'Votre profil est en attente de validation',
      PROFILE_VIEWED: 'Votre profil a été vu {count} fois cette semaine',
      NEW_CONTACT: 'Vous avez un nouveau message d’un client',
      PREMIUM_EXPIRES: 'Le compte premium expire dans {days} jours'
    },
    
    CLIENT: {
      CREDITS_REMAINING: 'Il vous reste {count} consultations gratuites ce mois-ci',
      PREMIUM_BENEFITS: 'Avec le premium, consultations illimitées',
      CONTACT_SENT: 'Message envoyé. Le prestataire vous recontactera bientôt',
      SAVE_FAVORITE: 'Ajoutez aux favoris pour ne pas perdre ce prestataire'
    },
    
    GENERAL: {
      WELCOME: 'Bienvenue sur AllSherut !',
      LOADING: 'Chargement...',
      PROCESSING: 'Traitement...',
      SAVING: 'Enregistrement...',
      SUCCESS: 'Action effectuée avec succès',
      PLEASE_WAIT: 'Veuillez patienter...'
    }
  },

  // =============================================
  // LABELS - Étiquettes interface
  // =============================================
  LABELS: {
    SERVICES: {
      babysitting: 'Baby-sitting',
      cleaning: 'Ménage',
      gardening: 'Jardinage', 
      petcare: 'Garde d’animaux',
      tutoring: 'Cours particuliers',
      eldercare: 'Aide aux personnes âgées',
      pest_control: 'Désinsectisation, pulvérisation et élimination des nuisibles'
    },
    
    ROLES: {
      client: 'Client',
      provider: 'Prestataire',
      admin: 'Administrateur'
    },
    
    STATUS: {
      active: 'Actif',
      inactive: 'Inactif',
      pending: 'En attente',
      verified: 'Vérifié',
      suspended: 'Suspendu'
    },
    
    CONTACT: {
      phone: 'Téléphone',
      email: 'E-mail',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram'
    }
  }
};

// =============================================
// LOGS DÉVELOPPEUR (français)
// =============================================
const DEV_LOGS = {
  AUTH: {
    LOGIN_ATTEMPT: 'Tentative de connexion pour email:',
    LOGIN_SUCCESS: 'Connexion réussie pour utilisateur ID:',
    LOGIN_FAILED: 'Échec connexion pour email:',
    TOKEN_GENERATED: 'Token JWT généré pour utilisateur:',
    TOKEN_VERIFIED: 'Token vérifié avec succès:',
    PASSWORD_RESET_REQUESTED: 'Reset password demandé pour:',
    PASSWORD_RESET_COMPLETED: 'Reset password complété pour:'
  },
  
  DATABASE: {
    QUERY_EXECUTED: 'Requête exécutée:',
    QUERY_ERROR: 'Erreur requête SQL:',
    CONNECTION_ERROR: 'Erreur connexion DB:',
    TRANSACTION_START: 'Transaction démarrée',
    TRANSACTION_COMMIT: 'Transaction commitée',
    TRANSACTION_ROLLBACK: 'Transaction rollback'
  },
  
  API: {
    REQUEST_RECEIVED: 'Requête reçue:',
    RESPONSE_SENT: 'Réponse envoyée:',
    ERROR_OCCURRED: 'Erreur survenue dans:',
    VALIDATION_FAILED: 'Validation échouée:',
    UPLOAD_STARTED: 'Upload démarré:',
    UPLOAD_COMPLETED: 'Upload terminé:'
  },
  
  BUSINESS: {
    PROVIDER_CREATED: 'Provider créé avec ID:',
    PROFILE_COMPLETED: 'Profil provider complété:',
    CONTACT_ATTEMPT: 'Tentative contact client vers provider:',
    CREDIT_USED: 'Crédit utilisé par client:',
    PREMIUM_GRANTED: 'Premium accordé à utilisateur:'
  }
};

// =============================================
// HELPERS
// =============================================
const formatMessage = (template, variables = {}) => {
  let message = template;
  Object.keys(variables).forEach(key => {
    message = message.replace(`{${key}}`, variables[key]);
  });
  return message;
};

const getServiceLabel = (serviceType) => {
  return MESSAGES.LABELS.SERVICES[serviceType] || serviceType;
};

const getRoleLabel = (role) => {
  return MESSAGES.LABELS.ROLES[role] || role;
};

module.exports = {
  MESSAGES,
  DEV_LOGS,
  formatMessage,
  getServiceLabel,
  getRoleLabel
};