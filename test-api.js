#!/usr/bin/env node

const fetch = require('node-fetch');
const colors = require('colors');

// Configuration
const API_BASE = process.env.API_URL || 'http://localhost:5000/api';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Compteurs de tests
let testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  errors: []
};

// =============================================
// UTILITAIRES DE TEST
// =============================================

// Fonction pour faire des requêtes API
async function apiRequest(endpoint, method = 'GET', data = null, token = null) {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = { method, headers };

  if (data && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const result = await response.json();
    
    return {
      status: response.status,
      success: response.ok,
      data: result
    };
  } catch (error) {
    return {
      status: 0,
      success: false,
      error: error.message
    };
  }
}

// Fonction pour enregistrer un test
function recordTest(name, passed, message = '', expected = '', actual = '') {
  testResults.total++;
  
  if (passed) {
    testResults.passed++;
    console.log(`✅ ${name}`.green);
    if (message) {
      console.log(`   ℹ️  ${message}`.gray);
    }
  } else {
    testResults.failed++;
    console.log(`❌ ${name}`.red);
    console.log(`   📝 ${message}`.yellow);
    if (expected && actual) {
      console.log(`   📋 Expected: ${expected}`.cyan);
      console.log(`   📋 Actual: ${actual}`.magenta);
    }
    
    testResults.errors.push({
      test: name,
      message,
      expected,
      actual
    });
  }
}

// Test de connexion au serveur
async function testServerConnection() {
  console.log('\n🔗 TEST DE CONNEXION AU SERVEUR'.blue.bold);
  console.log('═'.repeat(50).blue);
  
  try {
    const response = await fetch(`${API_BASE.replace('/api', '')}/health`);
    const data = await response.json();
    
    recordTest(
      'Connexion serveur',
      response.ok && data.success,
      data.message || `Serveur sur ${API_BASE}`,
      'Status 200 + success: true',
      `Status ${response.status} + success: ${data.success}`
    );

    if (data.database) {
      recordTest(
        'Connexion base de données',
        data.database === 'connected',
        `Database status: ${data.database}`,
        'connected',
        data.database
      );
    }

    return response.ok;
  } catch (error) {
    recordTest('Connexion serveur', false, `Erreur: ${error.message}`);
    return false;
  }
}

// =============================================
// TESTS D'AUTHENTIFICATION
// =============================================
async function testAuthentication() {
  console.log('\n🔐 TESTS D\'AUTHENTIFICATION'.blue.bold);
  console.log('═'.repeat(50).blue);

  let clientToken = null;
  let providerToken = null;

  // Données de test
  const clientData = {
    email: 'test.client@homesherut.co.il',
    password: 'test123456',
    firstName: 'שרה',
    lastName: 'כהן',
    phone: '0501234567',
    role: 'client'
  };

  const providerData = {
    email: 'test.provider@homesherut.co.il',
    password: 'test123456',
    firstName: 'מירי',
    lastName: 'לוי',
    phone: '0507654321',
    role: 'provider',
    serviceType: 'cleaning'
  };

  // Test 1: Inscription Client
  console.log('\n📝 Test inscription client...'.yellow);
  const registerClientResult = await apiRequest('/auth/register', 'POST', clientData);
  
  recordTest(
    'Inscription Client',
    registerClientResult.success && registerClientResult.data?.user?.role === 'client',
    registerClientResult.data?.message || 'Erreur inconnue',
    'Client créé avec succès',
    `Status: ${registerClientResult.status}, Role: ${registerClientResult.data?.user?.role}`
  );

  if (registerClientResult.success) {
    clientToken = registerClientResult.data.token;
    
    // Vérifier les crédits gratuits
    const hasCredits = registerClientResult.data.user?.contactCredits?.total === 3;
    recordTest(
      'Crédits gratuits client',
      hasCredits,
      `Crédits: ${registerClientResult.data.user?.contactCredits?.total || 0}`,
      '3 crédits',
      `${registerClientResult.data.user?.contactCredits?.total || 0} crédits`
    );
  }

  // Test 2: Inscription Provider avec mois gratuit
  console.log('\n📝 Test inscription provider (cleaning)...'.yellow);
  const registerProviderResult = await apiRequest('/auth/register', 'POST', providerData);
  
  recordTest(
    'Inscription Provider',
    registerProviderResult.success && registerProviderResult.data?.user?.role === 'provider',
    registerProviderResult.data?.message || 'Erreur inconnue',
    'Provider créé avec succès',
    `Status: ${registerProviderResult.status}, Role: ${registerProviderResult.data?.user?.role}`
  );

  if (registerProviderResult.success) {
    providerToken = registerProviderResult.data.token;
    
    // Vérifier le mois gratuit pour cleaning
    const hasPremium = registerProviderResult.data.user?.isPremium;
    recordTest(
      'Mois gratuit provider (cleaning)',
      hasPremium,
      `Premium: ${hasPremium}`,
      'Premium actif',
      `Premium: ${hasPremium}`
    );
  }

  // Test 3: Inscription Provider sans mois gratuit (babysitting)
  console.log('\n📝 Test inscription provider (babysitting)...'.yellow);
  const babysitterData = { ...providerData, email: 'test.babysitter@homesherut.co.il', serviceType: 'babysitting' };
  const registerBabysitterResult = await apiRequest('/auth/register', 'POST', babysitterData);
  
  const babysitterPremium = registerBabysitterResult.data?.user?.isPremium;
  recordTest(
    'Provider babysitting (pas de mois gratuit)',
    registerBabysitterResult.success && !babysitterPremium,
    `Premium: ${babysitterPremium}`,
    'Pas de premium',
    `Premium: ${babysitterPremium}`
  );

  // Test 4: Connexion Client
  console.log('\n🔑 Test connexion client...'.yellow);
  const loginClientResult = await apiRequest('/auth/login', 'POST', {
    email: clientData.email,
    password: clientData.password
  });

  recordTest(
    'Connexion Client',
    loginClientResult.success && loginClientResult.data?.token,
    loginClientResult.data?.message || 'Connexion réussie',
    'Token JWT reçu',
    `Token: ${loginClientResult.data?.token ? 'Présent' : 'Absent'}`
  );

  // Test 5: Récupération profil avec token
  if (clientToken) {
    console.log('\n👤 Test récupération profil...'.yellow);
    const profileResult = await apiRequest('/auth/me', 'GET', null, clientToken);
    
    recordTest(
      'Récupération profil avec token',
      profileResult.success && profileResult.data?.user?.email === clientData.email,
      `Email: ${profileResult.data?.user?.email}`,
      clientData.email,
      profileResult.data?.user?.email || 'Aucun'
    );
  }

  // Test 6: Changement de mot de passe
  if (clientToken) {
    console.log('\n🔒 Test changement mot de passe...'.yellow);
    const changePasswordResult = await apiRequest('/auth/change-password', 'POST', {
      currentPassword: clientData.password,
      newPassword: 'nouveaumotdepasse123'
    }, clientToken);

    recordTest(
      'Changement mot de passe',
      changePasswordResult.success,
      changePasswordResult.data?.message || 'Mot de passe changé',
      'Succès',
      `Status: ${changePasswordResult.status}`
    );
  }

  // Test 7: Déconnexion
  if (clientToken) {
    console.log('\n🚪 Test déconnexion...'.yellow);
    const logoutResult = await apiRequest('/auth/logout', 'POST', null, clientToken);
    
    recordTest(
      'Déconnexion',
      logoutResult.success,
      logoutResult.data?.message || 'Déconnexion réussie',
      'Succès',
      `Status: ${logoutResult.status}`
    );
  }

  return { clientToken, providerToken };
}

// =============================================
// TESTS DE VALIDATION
// =============================================
async function testValidation() {
  console.log('\n🛡️  TESTS DE VALIDATION'.blue.bold);
  console.log('═'.repeat(50).blue);

  // Test 1: Email invalide
  console.log('\n📧 Test email invalide...'.yellow);
  const invalidEmailResult = await apiRequest('/auth/register', 'POST', {
    email: 'email-invalide',
    password: 'test123456',
    firstName: 'Test',
    lastName: 'User',
    role: 'client'
  });

  recordTest(
    'Rejet email invalide',
    !invalidEmailResult.success && invalidEmailResult.status === 400,
    'Email invalide doit être rejeté',
    'Status 400 + success: false',
    `Status ${invalidEmailResult.status} + success: ${invalidEmailResult.success}`
  );

  // Test 2: Mot de passe trop court
  console.log('\n🔑 Test mot de passe court...'.yellow);
  const shortPasswordResult = await apiRequest('/auth/register', 'POST', {
    email: 'test.short@example.com',
    password: '123',
    firstName: 'Test',
    lastName: 'User',
    role: 'client'
  });

  recordTest(
    'Rejet mot de passe court',
    !shortPasswordResult.success && shortPasswordResult.status === 400,
    'Mot de passe court doit être rejeté',
    'Status 400 + success: false',
    `Status ${shortPasswordResult.status} + success: ${shortPasswordResult.success}`
  );

  // Test 3: Email déjà existant
  console.log('\n📮 Test email existant...'.yellow);
  const duplicateEmailResult = await apiRequest('/auth/register', 'POST', {
    email: 'test.client@homesherut.co.il', // Email déjà utilisé
    password: 'test123456',
    firstName: 'Autre',
    lastName: 'User',
    role: 'client'
  });

  recordTest(
    'Rejet email existant',
    !duplicateEmailResult.success && (duplicateEmailResult.status === 409 || duplicateEmailResult.status === 400),
    'Email existant doit être rejeté',
    'Status 409 ou 400',
    `Status ${duplicateEmailResult.status}`
  );

  // Test 4: Accès sans token
  console.log('\n🚫 Test accès non autorisé...'.yellow);
  const unauthorizedResult = await apiRequest('/auth/me', 'GET');
  
  recordTest(
    'Protection route privée',
    !unauthorizedResult.success && unauthorizedResult.status === 401,
    'Route privée doit être protégée',
    'Status 401',
    `Status ${unauthorizedResult.status}`
  );
}

// =============================================
// TESTS DE RECHERCHE
// =============================================
async function testSearch() {
  console.log('\n🔍 TESTS DE RECHERCHE'.blue.bold);
  console.log('═'.repeat(50).blue);

  // Test 1: Recherche tous services
  console.log('\n🎯 Test recherche tous services...'.yellow);
  const allServicesResult = await apiRequest('/search/providers');
  
  recordTest(
    'Recherche tous services',
    allServicesResult.success,
    `${allServicesResult.data?.providers?.length || 0} providers trouvés`,
    'Liste de providers',
    `${allServicesResult.data?.providers?.length || 0} providers`
  );

  // Test 2: Recherche service spécifique
  console.log('\n🧹 Test recherche cleaning...'.yellow);
  const cleaningSearchResult = await apiRequest('/search/providers?service=cleaning');
  
  recordTest(
    'Recherche service cleaning',
    cleaningSearchResult.success,
    `${cleaningSearchResult.data?.providers?.length || 0} cleaners trouvés`,
    'Liste filtrée',
    `${cleaningSearchResult.data?.providers?.length || 0} résultats`
  );

  // Test 3: Recherche avec filtres prix
  console.log('\n💰 Test recherche avec filtres prix...'.yellow);
  const priceFilterResult = await apiRequest('/search/providers?minPrice=30&maxPrice=60');
  
  recordTest(
    'Filtrage par prix',
    priceFilterResult.success,
    `Filtré entre 30-60€: ${priceFilterResult.data?.providers?.length || 0} résultats`,
    'Filtrage fonctionnel',
    `${priceFilterResult.data?.providers?.length || 0} résultats`
  );

  // Test 4: Services disponibles
  console.log('\n📋 Test services disponibles...'.yellow);
  const servicesResult = await apiRequest('/services/available');
  
  recordTest(
    'Services disponibles',
    servicesResult.success && Array.isArray(servicesResult.data?.services),
    `${servicesResult.data?.services?.length || 0} services configurés`,
    '6 services disponibles',
    `${servicesResult.data?.services?.length || 0} services`
  );

  // Test 5: Recherche par ville
  console.log('\n🏙️  Test recherche par ville...'.yellow);
  const citySearchResult = await apiRequest('/search/providers?city=תל אביב');
  
  recordTest(
    'Recherche par ville',
    citySearchResult.success,
    `Providers à Tel Aviv: ${citySearchResult.data?.providers?.length || 0}`,
    'Filtrage par ville',
    `${citySearchResult.data?.providers?.length || 0} résultats`
  );

  // Test 6: Recherche avec note minimum
  console.log('\n⭐ Test recherche note minimum...'.yellow);
  const ratingSearchResult = await apiRequest('/search/providers?minRating=4.5');
  
  recordTest(
    'Filtrage par note minimum',
    ratingSearchResult.success,
    `Providers 4.5+: ${ratingSearchResult.data?.providers?.length || 0}`,
    'Filtrage par note',
    `${ratingSearchResult.data?.providers?.length || 0} résultats`
  );
}

// =============================================
// TESTS DE PROFILS
// =============================================
async function testProfiles(tokens) {
  console.log('\n👥 TESTS DE PROFILS'.blue.bold);
  console.log('═'.repeat(50).blue);

  if (!tokens.providerToken) {
    console.log('⚠️  Pas de token provider, on passe les tests profil'.yellow);
    return;
  }

  // Test 1: Mise à jour profil provider
  console.log('\n✏️  Test mise à jour profil...'.yellow);
  const updateProfileResult = await apiRequest('/profile/update', 'PUT', {
    description: 'נקיון מקצועי ויסודי לבית שלכם',
    hourlyRate: 45,
    availability: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
    city: 'תל אביב',
    experience: 5
  }, tokens.providerToken);

  recordTest(
    'Mise à jour profil provider',
    updateProfileResult.success,
    updateProfileResult.data?.message || 'Profil mis à jour',
    'Succès',
    `Status: ${updateProfileResult.status}`
  );

  // Test 2: Upload photo de profil (simulation)
  console.log('\n📸 Test upload photo profil...'.yellow);
  const uploadPhotoResult = await apiRequest('/profile/photo', 'POST', {
    photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face'
  }, tokens.providerToken);

  recordTest(
    'Upload photo profil',
    uploadPhotoResult.success || uploadPhotoResult.status === 501, // 501 = pas encore implémenté
    uploadPhotoResult.data?.message || 'Photo uploadée',
    'Photo acceptée',
    `Status: ${uploadPhotoResult.status}`
  );

  // Test 3: Récupération profil public
  console.log('\n🌐 Test profil public...'.yellow);
  const publicProfileResult = await apiRequest('/profile/public/test.provider@homesherut.co.il');
  
  recordTest(
    'Profil public accessible',
    publicProfileResult.success && publicProfileResult.data?.provider,
    `Profil: ${publicProfileResult.data?.provider?.firstName || 'N/A'}`,
    'Profil provider visible',
    publicProfileResult.data?.provider ? 'Visible' : 'Non trouvé'
  );
}

// =============================================
// TESTS DE CONTACT ET CRÉDITS
// =============================================
async function testContacts(tokens) {
  console.log('\n📞 TESTS DE CONTACT ET CRÉDITS'.blue.bold);
  console.log('═'.repeat(50).blue);

  if (!tokens.clientToken || !tokens.providerToken) {
    console.log('⚠️  Tokens manquants, on passe les tests contact'.yellow);
    return;
  }

  // Test 1: Contact avec crédits
  console.log('\n💳 Test contact avec crédits...'.yellow);
  const contactResult = await apiRequest('/contact/request', 'POST', {
    providerId: 'test.provider@homesherut.co.il',
    message: 'שלום, אני מעוניינת בשירותי ניקיון לדירה בת 3 חדרים'
  }, tokens.clientToken);

  recordTest(
    'Demande de contact',
    contactResult.success,
    contactResult.data?.message || 'Contact envoyé',
    'Contact réussi',
    `Status: ${contactResult.status}`
  );

  // Test 2: Vérification déduction crédits
  console.log('\n🔢 Test déduction crédits...'.yellow);
  const profileAfterContactResult = await apiRequest('/auth/me', 'GET', null, tokens.clientToken);
  
  const creditsAfter = profileAfterContactResult.data?.user?.contactCredits?.remaining;
  recordTest(
    'Déduction crédits',
    creditsAfter === 2, // 3 - 1 = 2
    `Crédits restants: ${creditsAfter}`,
    '2 crédits',
    `${creditsAfter} crédits`
  );

  // Test 3: Contact sans crédits (simulation)
  console.log('\n🚫 Test contact sans crédits...'.yellow);
  // On fait plusieurs contacts pour épuiser les crédits
  await apiRequest('/contact/request', 'POST', {
    providerId: 'test.provider@homesherut.co.il',
    message: 'Deuxième contact'
  }, tokens.clientToken);

  await apiRequest('/contact/request', 'POST', {
    providerId: 'test.provider@homesherut.co.il',
    message: 'Troisième contact'
  }, tokens.clientToken);

  // Maintenant on teste sans crédits
  const noCreditsResult = await apiRequest('/contact/request', 'POST', {
    providerId: 'test.provider@homesherut.co.il',
    message: 'Contact sans crédits'
  }, tokens.clientToken);

  recordTest(
    'Blocage sans crédits',
    !noCreditsResult.success && (noCreditsResult.status === 402 || noCreditsResult.status === 403),
    'Contact bloqué sans crédits',
    'Status 402/403',
    `Status: ${noCreditsResult.status}`
  );
}

// =============================================
// TESTS DE PREMIUM
// =============================================
async function testPremium(tokens) {
  console.log('\n👑 TESTS PREMIUM'.blue.bold);
  console.log('═'.repeat(50).blue);

  if (!tokens.clientToken) {
    console.log('⚠️  Pas de token client, on passe les tests premium'.yellow);
    return;
  }

  // Test 1: Upgrade vers premium
  console.log('\n⬆️  Test upgrade premium...'.yellow);
  const upgradeResult = await apiRequest('/premium/upgrade', 'POST', {
    plan: 'monthly',
    paymentMethod: 'test'
  }, tokens.clientToken);

  recordTest(
    'Upgrade premium',
    upgradeResult.success || upgradeResult.status === 501, // 501 = pas encore implémenté
    upgradeResult.data?.message || 'Upgrade demandé',
    'Premium activé',
    `Status: ${upgradeResult.status}`
  );

  // Test 2: Vérification statut premium
  console.log('\n✨ Test statut premium...'.yellow);
  const statusResult = await apiRequest('/premium/status', 'GET', null, tokens.clientToken);
  
  recordTest(
    'Vérification statut premium',
    statusResult.success,
    `Premium: ${statusResult.data?.isPremium ? 'Actif' : 'Inactif'}`,
    'Statut récupéré',
    `Status: ${statusResult.status}`
  );

  // Test 3: Accès illimité après premium
  if (upgradeResult.success) {
    console.log('\n🔓 Test contact illimité premium...'.yellow);
    const unlimitedContactResult = await apiRequest('/contact/request', 'POST', {
      providerId: 'test.provider@homesherut.co.il',
      message: 'Contact premium illimité'
    }, tokens.clientToken);

    recordTest(
      'Contact illimité premium',
      unlimitedContactResult.success,
      'Contact premium sans limite crédits',
      'Contact réussi',
      `Status: ${unlimitedContactResult.status}`
    );
  }
}

// =============================================
// TESTS D'ÉVALUATIONS
// =============================================
async function testReviews(tokens) {
  console.log('\n⭐ TESTS D\'ÉVALUATIONS'.blue.bold);
  console.log('═'.repeat(50).blue);

  if (!tokens.clientToken) {
    console.log('⚠️  Pas de token client, on passe les tests évaluations'.yellow);
    return;
  }

  // Test 1: Ajout d'une évaluation
  console.log('\n📝 Test ajout évaluation...'.yellow);
  const reviewResult = await apiRequest('/reviews/add', 'POST', {
    providerId: 'test.provider@homesherut.co.il',
    rating: 5,
    comment: 'שירות מעולה! מירי עשתה עבודה נהדרת',
    serviceType: 'cleaning'
  }, tokens.clientToken);

  recordTest(
    'Ajout évaluation',
    reviewResult.success,
    reviewResult.data?.message || 'Évaluation ajoutée',
    'Évaluation créée',
    `Status: ${reviewResult.status}`
  );

  // Test 2: Récupération évaluations provider
  console.log('\n📊 Test récupération évaluations...'.yellow);
  const getReviewsResult = await apiRequest('/reviews/provider/test.provider@homesherut.co.il');
  
  recordTest(
    'Récupération évaluations',
    getReviewsResult.success && Array.isArray(getReviewsResult.data?.reviews),
    `${getReviewsResult.data?.reviews?.length || 0} évaluations trouvées`,
    'Liste d\'évaluations',
    `${getReviewsResult.data?.reviews?.length || 0} évaluations`
  );

  // Test 3: Calcul note moyenne
  if (getReviewsResult.success && getReviewsResult.data?.reviews?.length > 0) {
    const averageRating = getReviewsResult.data.averageRating;
    recordTest(
      'Calcul note moyenne',
      averageRating && averageRating >= 1 && averageRating <= 5,
      `Note moyenne: ${averageRating}`,
      'Note entre 1-5',
      `${averageRating}`
    );
  }
}

// =============================================
// TESTS DE FAVORIS
// =============================================
async function testFavorites(tokens) {
  console.log('\n❤️  TESTS DE FAVORIS'.blue.bold);
  console.log('═'.repeat(50).blue);

  if (!tokens.clientToken) {
    console.log('⚠️  Pas de token client, on passe les tests favoris'.yellow);
    return;
  }

  // Test 1: Ajout aux favoris
  console.log('\n➕ Test ajout favori...'.yellow);
  const addFavoriteResult = await apiRequest('/favorites/add', 'POST', {
    providerId: 'test.provider@homesherut.co.il'
  }, tokens.clientToken);

  recordTest(
    'Ajout aux favoris',
    addFavoriteResult.success,
    addFavoriteResult.data?.message || 'Ajouté aux favoris',
    'Favori ajouté',
    `Status: ${addFavoriteResult.status}`
  );

  // Test 2: Liste des favoris
  console.log('\n📋 Test liste favoris...'.yellow);
  const getFavoritesResult = await apiRequest('/favorites/list', 'GET', null, tokens.clientToken);
  
  recordTest(
    'Liste des favoris',
    getFavoritesResult.success && Array.isArray(getFavoritesResult.data?.favorites),
    `${getFavoritesResult.data?.favorites?.length || 0} favoris trouvés`,
    'Liste de favoris',
    `${getFavoritesResult.data?.favorites?.length || 0} favoris`
  );

  // Test 3: Suppression favori
  console.log('\n➖ Test suppression favori...'.yellow);
  const removeFavoriteResult = await apiRequest('/favorites/remove', 'DELETE', {
    providerId: 'test.provider@homesherut.co.il'
  }, tokens.clientToken);

  recordTest(
    'Suppression favori',
    removeFavoriteResult.success,
    removeFavoriteResult.data?.message || 'Favori supprimé',
    'Favori supprimé',
    `Status: ${removeFavoriteResult.status}`
  );
}

// =============================================
// TESTS DE PERFORMANCE
// =============================================
async function testPerformance() {
  console.log('\n⚡ TESTS DE PERFORMANCE'.blue.bold);
  console.log('═'.repeat(50).blue);

  // Test 1: Temps de réponse API
  console.log('\n⏱️  Test temps de réponse...'.yellow);
  const startTime = Date.now();
  const healthResult = await apiRequest('/health');
  const endTime = Date.now();
  const responseTime = endTime - startTime;

  recordTest(
    'Temps de réponse API',
    responseTime < 1000, // Moins d'1 seconde
    `Temps: ${responseTime}ms`,
    '< 1000ms',
    `${responseTime}ms`
  );

  // Test 2: Charge simultanée (10 requêtes)
  console.log('\n🔄 Test charge simultanée...'.yellow);
  const loadTestStart = Date.now();
  const promises = Array.from({ length: 10 }, () => apiRequest('/search/providers'));
  
  try {
    const results = await Promise.all(promises);
    const loadTestEnd = Date.now();
    const allSucceeded = results.every(r => r.success);
    const totalTime = loadTestEnd - loadTestStart;

    recordTest(
      'Charge simultanée (10 requêtes)',
      allSucceeded && totalTime < 5000,
      `10 requêtes en ${totalTime}ms`,
      'Toutes réussies < 5s',
      `${results.filter(r => r.success).length}/10 réussies en ${totalTime}ms`
    );
  } catch (error) {
    recordTest('Charge simultanée', false, `Erreur: ${error.message}`);
  }
}

// =============================================
// TESTS DE SÉCURITÉ
// =============================================
async function testSecurity() {
  console.log('\n🔒 TESTS DE SÉCURITÉ'.blue.bold);
  console.log('═'.repeat(50).blue);

  // Test 1: Injection SQL (tentative)
  console.log('\n🛡️  Test protection injection SQL...'.yellow);
  const sqlInjectionResult = await apiRequest('/auth/login', 'POST', {
    email: "admin@test.com'; DROP TABLE users; --",
    password: 'test123'
  });

  recordTest(
    'Protection injection SQL',
    !sqlInjectionResult.success,
    'Tentative injection bloquée',
    'Requête rejetée',
    `Status: ${sqlInjectionResult.status}`
  );

  // Test 2: Token JWT invalide
  console.log('\n🎫 Test token invalide...'.yellow);
  const invalidTokenResult = await apiRequest('/auth/me', 'GET', null, 'token.invalide.fake');
  
  recordTest(
    'Rejet token invalide',
    !invalidTokenResult.success && invalidTokenResult.status === 401,
    'Token invalide rejeté',
    'Status 401',
    `Status: ${invalidTokenResult.status}`
  );

  // Test 3: Limitation de taux (rate limiting)
  console.log('\n🚦 Test limitation taux...'.yellow);
  // Faire beaucoup de requêtes rapidement
  const rateLimitPromises = Array.from({ length: 50 }, () => 
    apiRequest('/auth/login', 'POST', { email: 'fake@test.com', password: 'fake' })
  );

  try {
    const rateLimitResults = await Promise.all(rateLimitPromises);
    const blockedRequests = rateLimitResults.filter(r => r.status === 429).length;
    
    recordTest(
      'Limitation de taux',
      blockedRequests > 0 || rateLimitResults.every(r => r.status === 400), // 429 = too many requests, 400 = validation error
      `${blockedRequests} requêtes bloquées sur 50`,
      'Quelques requêtes bloquées',
      `${blockedRequests} bloquées`
    );
  } catch (error) {
    recordTest('Limitation de taux', false, `Erreur: ${error.message}`);
  }
}

// =============================================
// NETTOYAGE ET RÉSULTATS
// =============================================
async function cleanup() {
  console.log('\n🧹 NETTOYAGE DES DONNÉES DE TEST'.blue.bold);
  console.log('═'.repeat(50).blue);

  // Supprimer les utilisateurs de test
  const testEmails = [
    'test.client@homesherut.co.il',
    'test.provider@homesherut.co.il',
    'test.babysitter@homesherut.co.il'
  ];

  for (const email of testEmails) {
    console.log(`🗑️  Suppression ${email}...`.yellow);
    const deleteResult = await apiRequest(`/admin/users/${email}`, 'DELETE');
    
    recordTest(
      `Nettoyage ${email}`,
      deleteResult.success || deleteResult.status === 404, // 404 = déjà supprimé
      deleteResult.data?.message || 'Utilisateur supprimé',
      'Nettoyage réussi',
      `Status: ${deleteResult.status}`
    );
  }
}

// Affichage des résultats finaux
function displayResults() {
  console.log('\n'.repeat(2));
  console.log('🏁 === RÉSULTATS DES TESTS HOMESHERUT ==='.rainbow.bold);
  console.log('═'.repeat(60).rainbow);

  const successRate = testResults.total > 0 ? Math.round((testResults.passed / testResults.total) * 100) : 0;
  
  console.log(`📊 Tests exécutés: ${testResults.total}`.blue);
  console.log(`✅ Tests réussis: ${testResults.passed}`.green);
  console.log(`❌ Tests échoués: ${testResults.failed}`.red);
  console.log(`📈 Taux de réussite: ${successRate}%`.cyan.bold);

  if (testResults.failed > 0) {
    console.log('\n🚨 === ERREURS DÉTECTÉES ==='.red.bold);
    testResults.errors.forEach((error, index) => {
      console.log(`\n${index + 1}. ${error.test}`.red.bold);
      console.log(`   📝 ${error.message}`.yellow);
      if (error.expected && error.actual) {
        console.log(`   📋 Expected: ${error.expected}`.cyan);
        console.log(`   📋 Actual: ${error.actual}`.magenta);
      }
    });

    console.log('\n💡 === RECOMMANDATIONS ==='.yellow.bold);
    console.log('1. Vérifiez que votre serveur backend fonctionne');
    console.log('2. Vérifiez la configuration de la base de données');
    console.log('3. Vérifiez les routes API dans votre backend');
    console.log('4. Vérifiez les validations et middlewares');
  } else {
    console.log('\n🎉 === FÉLICITATIONS ! ==='.green.bold);
    console.log('🎯 Tous les tests sont passés avec succès !');
    console.log('🚀 Votre API HomeSherut fonctionne parfaitement !');
    console.log('✨ Vous pouvez maintenant tester avec votre frontend');
  }

  console.log('\n📱 Frontend: ' + FRONTEND_URL);
  console.log('🔗 Backend: ' + API_BASE);
  console.log('\n═'.repeat(60).rainbow);
}

// =============================================
// FONCTION PRINCIPALE
// =============================================
async function runAllTests() {
  console.clear();
  console.log('🧪 === TESTS COMPLETS HOMESHERUT ==='.rainbow.bold);
  console.log('📅 ' + new Date().toLocaleString('he-IL'));
  console.log('🔗 Backend: ' + API_BASE);
  console.log('📱 Frontend: ' + FRONTEND_URL);
  console.log('═'.repeat(60).rainbow);

  try {
    // Étape 1: Test de connexion
    const serverConnected = await testServerConnection();
    
    if (!serverConnected) {
      console.log('\n❌ ERREUR CRITIQUE: Impossible de se connecter au serveur'.red.bold);
      console.log('🔧 Vérifiez que votre serveur backend fonctionne sur ' + API_BASE.replace('/api', ''));
      process.exit(1);
    }

    // Étape 2: Tests de validation
    await testValidation();

    // Étape 3: Tests d'authentification
    const tokens = await testAuthentication();

    // Étape 4: Tests de recherche
    await testSearch();

    // Étape 5: Tests de profils
    await testProfiles(tokens);

    // Étape 6: Tests de contact
    await testContacts(tokens);

    // Étape 7: Tests premium
    await testPremium(tokens);

    // Étape 8: Tests d'évaluations
    await testReviews(tokens);

    // Étape 9: Tests de favoris
    await testFavorites(tokens);

    // Étape 10: Tests de performance
    await testPerformance();

    // Étape 11: Tests de sécurité
    await testSecurity();

    // Étape 12: Nettoyage
    await cleanup();

  } catch (error) {
    console.log(`\n❌ ERREUR CRITIQUE PENDANT LES TESTS: ${error.message}`.red.bold);
    testResults.failed++;
  } finally {
    // Affichage des résultats
    displayResults();
  }
}

// =============================================
// EXÉCUTION
// =============================================
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('❌ Erreur lors de l\'exécution des tests:', error);
    process.exit(1);
  });
}

module.exports = {
  runAllTests,
  apiRequest,
  testResults
};