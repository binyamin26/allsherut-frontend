import { useEffect, useState, Suspense } from 'react';
import lazyWithRetry from './utils/lazyWithRetry';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SUPPORTED_LANGS, getServiceKeyFromSlug } from './utils/langUtils';
import { HIDDEN_SERVICE_IDS } from './data/categories';

// Layout components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import ServiceTitleFitter from "./components/common/ServiceTitleFitter";

// Import du Widget d'Accessibilité
import AccessibilityWidget from "./components/common/AccessibilityWidget";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp";
import AuthModal from "./components/auth/AuthModal";

// Pages principales (chargées immédiatement : page d'accueil + 404 utilisées de façon synchrone ailleurs)
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

// Pages chargées à la demande (code-splitting par route)
const RecruitmentServicePage = lazyWithRetry(() => import('./pages/recruitment/RecruitmentServicePage'));
const RecruitmentListingDetailPage = lazyWithRetry(() => import('./pages/recruitment/RecruitmentListingDetailPage'));
const ForgotPasswordPage = lazyWithRetry(() => import('./pages/ForgotPasswordPage'));
const DashboardPage = lazyWithRetry(() => import('./pages/DashboardPage'));
const CategoryPage = lazyWithRetry(() => import('./pages/CategoryPage'));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage'));
const ResetPasswordPage = lazyWithRetry(() => import('./pages/ResetPasswordPage'));
const AdminVerifyProviderPage = lazyWithRetry(() => import('./pages/AdminVerifyProviderPage'));
// PAIEMENT DÉSACTIVÉ - RÉACTIVER QUAND SITE PAYANT
// import BillingPage from './pages/BillingPage';
const HowItWorksPage = lazyWithRetry(() => import('./pages/HowItWorksPage'));
// import PricingPage from './pages/PricingPage';
const TermsOfService = lazyWithRetry(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazyWithRetry(() => import('./pages/PrivacyPolicy'));

// Pages de services
const BabysittingPage = lazyWithRetry(() => import("./pages/services/BabysittingPage"));
const CleaningPage = lazyWithRetry(() => import("./pages/services/CleaningPage"));
const GardeningPage = lazyWithRetry(() => import("./pages/services/GardeningPage"));
const PetcarePage = lazyWithRetry(() => import("./pages/services/PetcarePage"));
const TutoringPage = lazyWithRetry(() => import("./pages/services/TutoringPage"));
const SportsActivitiesPage = lazyWithRetry(() => import("./pages/services/SportsActivitiesPage"));
const EldercarePage = lazyWithRetry(() => import("./pages/services/EldercarePage"));
const LaundryPage = lazyWithRetry(() => import("./pages/services/LaundryPage"));
const PropertyManagementPage = lazyWithRetry(() => import("./pages/services/PropertyManagementPage"));
const ElectricianPage = lazyWithRetry(() => import('./pages/services/ElectricianPage'));
const PlumbingPage = lazyWithRetry(() => import('./pages/services/PlumbingPage'));
const AirConditioningPage = lazyWithRetry(() => import('./pages/services/AirConditioningPage'));
const GasTechnicianPage = lazyWithRetry(() => import('./pages/services/GasTechnicianPage'));
const DrywallPage = lazyWithRetry(() => import('./pages/services/DrywallPage'));
const CarpentryPage = lazyWithRetry(() => import('./pages/services/CarpentryPage'));
const HomeOrganizationPage = lazyWithRetry(() => import('./pages/services/HomeOrganizationPage'));
const EventEntertainmentPage = lazyWithRetry(() => import('./pages/services/EventEntertainmentPage'));
const EventEquipmentRentalPage = lazyWithRetry(() => import('./pages/services/EventEquipmentRentalPage'));
const EventFoodStandsPage = lazyWithRetry(() => import('./pages/services/EventFoodStandsPage'));
const DJPage = lazyWithRetry(() => import('./pages/services/DJPage'));
const PrivateChefPage = lazyWithRetry(() => import('./pages/services/PrivateChefPage'));
const CateringPage = lazyWithRetry(() => import('./pages/services/CateringPage'));
const PastryPage = lazyWithRetry(() => import('./pages/services/PastryPage'));
const PaintingPage = lazyWithRetry(() => import('./pages/services/PaintingPage'));
const WaterproofingPage = lazyWithRetry(() => import('./pages/services/WaterproofingPage'));
const ContractorPage = lazyWithRetry(() => import('./pages/services/ContractorPage'));
const AluminumPage = lazyWithRetry(() => import('./pages/services/AluminumPage'));
const GlassWorksPage = lazyWithRetry(() => import('./pages/services/GlassWorksPage'));
const LocksmithPage = lazyWithRetry(() => import('./pages/services/LocksmithPage'));
const MovingPage = lazyWithRetry(() => import('./pages/services/MovingPage'));
const PhotographerPage = lazyWithRetry(() => import('./pages/services/PhotographerPage'));
const EventDecorationPage = lazyWithRetry(() => import('./pages/services/EventDecorationPage'));
const PestControlPage = lazyWithRetry(() => import('./pages/services/PestControlPage'));
const HandymanPage = lazyWithRetry(() => import('./pages/services/HandymanPage'));
const MechanicPage = lazyWithRetry(() => import('./pages/services/MechanicPage'));
const MetalworkPage = lazyWithRetry(() => import('./pages/services/MetalworkPage'));
const DriverPage = lazyWithRetry(() => import('./pages/services/DriverPage'));
const DoulaPage = lazyWithRetry(() => import('./pages/services/DoulaPage'));

// Page de détails provider
const ProviderDetailPage = lazyWithRetry(() => import('./pages/ProviderDetailPage'));

// Page de demande d'avis (lien public indépendant de la visibilité du profil)
const ReviewRequestPage = lazyWithRetry(() => import('./pages/ReviewRequestPage'));

// Fallback affiché pendant le chargement d'une page en lazy-loading
const RouteLoadingFallback = () => (
  <div className="provider-detail-loading">
    <div className="spinner spinner-lg spinner-primary"></div>
  </div>
);

// Mapping interne: clé de service → composant de page
const SERVICE_PAGE_MAP = {
  babysitting:           BabysittingPage,
  cleaning:              CleaningPage,
  gardening:             GardeningPage,
  petcare:               PetcarePage,
  tutoring:              TutoringPage,
  'sports-activities':   SportsActivitiesPage,
  eldercare:             EldercarePage,
  laundry:               LaundryPage,
  'property-management': PropertyManagementPage,
  electrician:           ElectricianPage,
  plumbing:              PlumbingPage,
  'air-conditioning':    AirConditioningPage,
  'gas-technician':      GasTechnicianPage,
  drywall:               DrywallPage,
  carpentry:             CarpentryPage,
  'home-organization':   HomeOrganizationPage,
  'event-entertainment': EventEntertainmentPage,
  'event-equipment-rental': EventEquipmentRentalPage,
  'event-food-stands':   EventFoodStandsPage,
  dj:                    DJPage,
  'private-chef':        PrivateChefPage,
  catering:              CateringPage,
  pastry:                PastryPage,
  painting:              PaintingPage,
  waterproofing:         WaterproofingPage,
  contractor:            ContractorPage,
  aluminum:              AluminumPage,
  'glass-works':         GlassWorksPage,
  locksmith:             LocksmithPage,
  moving:                MovingPage,
  photographer:          PhotographerPage,
  'event-decoration':    EventDecorationPage,
  'pest-control':        PestControlPage,
  handyman:              HandymanPage,
  mechanic:              MechanicPage,
  metalwork:             MetalworkPage,
  driver:                DriverPage,
  doula:                 DoulaPage,
};

// Route universelle pour les pages de service (Hebrew root + /:lang/services/:slug)
const ServiceRouter = () => {
  const { lang, slug } = useParams();
  const { changeLanguage, currentLanguage } = useLanguage();
  const effectiveLang = (lang && SUPPORTED_LANGS.includes(lang)) ? lang : 'he';

  useEffect(() => {
    // Only override language when the URL explicitly carries a lang prefix
    if (lang && effectiveLang !== currentLanguage) changeLanguage(effectiveLang);
  }, [effectiveLang]); // eslint-disable-line react-hooks/exhaustive-deps

  const serviceKey = getServiceKeyFromSlug(slug, effectiveLang);
  // Service rattaché à une catégorie masquée → 404 (masqué jusqu'à nouvel ordre).
  if (serviceKey && HIDDEN_SERVICE_IDS.includes(serviceKey.replace(/-/g, '_'))) return <NotFoundPage />;
  const PageComponent = serviceKey ? SERVICE_PAGE_MAP[serviceKey] : null;
  if (!PageComponent) return <NotFoundPage />;
  return <PageComponent />;
};

// Page d'accueil pour les URLs avec préfixe de langue (/fr, /en, /ru)
const LangHomePage = () => {
  const { lang } = useParams();
  const { changeLanguage, currentLanguage } = useLanguage();

  useEffect(() => {
    if (SUPPORTED_LANGS.includes(lang) && lang !== currentLanguage) changeLanguage(lang);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!SUPPORTED_LANGS.includes(lang) || lang === 'he') return <NotFoundPage />;
  return <HomePage />;
};

// Routes recrutement avec préfixe de langue (/fr/recruitment/babysitting)
const LangRecruitmentRoute = () => {
  const { lang } = useParams();
  const { changeLanguage, currentLanguage } = useLanguage();
  useEffect(() => {
    if (SUPPORTED_LANGS.includes(lang) && lang !== currentLanguage) changeLanguage(lang);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!SUPPORTED_LANGS.includes(lang) || lang === 'he') return <NotFoundPage />;
  return <RecruitmentServicePage />;
};

const LangRecruitmentListingRoute = () => {
  const { lang } = useParams();
  const { changeLanguage, currentLanguage } = useLanguage();
  useEffect(() => {
    if (SUPPORTED_LANGS.includes(lang) && lang !== currentLanguage) changeLanguage(lang);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!SUPPORTED_LANGS.includes(lang) || lang === 'he') return <NotFoundPage />;
  return <RecruitmentListingDetailPage />;
};

// Composant de protection des routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Si pas connecté, affiche un message d'erreur
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: '#dc2626',
          margin: 0
        }}>
          {t('auth.accessDenied')}
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: '#6b7280',
          margin: 0
        }}>
          {t('auth.loginRequired')}
        </p>
        <div style={{
          display: 'flex',
          gap: '15px',
          marginTop: '20px'
        }}>
          <button
            onClick={() => setShowAuthModal(true)}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            {t('auth.login')}
          </button>
          <a
            href="/"
            style={{
              padding: '12px 24px',
              background: '#e5e7eb',
              color: '#111827',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            {t('notFound.backHome')}
          </a>
        </div>
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            initialMode="login"
          />
        )}
      </div>
    );
  }

  // Si connecté, affiche la page
  return children;
};

function App() {
  return (
    <HelmetProvider>
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <ServiceTitleFitter />
          <div className="app-container">
            <Header />
            
            <main className="main-content">
              <Suspense fallback={<RouteLoadingFallback />}>
              <Routes>
                {/* Page d'accueil */}
                <Route path="/" element={<HomePage />} />
                <Route path="/categories/:slug" element={<CategoryPage />} />

                {/* Pages de services (hébreu — routes racine inchangées) */}
                <Route path="/services/:slug" element={<ServiceRouter />} />

                {/* Pages de services avec préfixe de langue (/fr/services/electricien, etc.) */}
                <Route path="/:lang/services/:slug" element={<ServiceRouter />} />

                {/* Pages d'accueil avec préfixe de langue (/fr, /en, /ru) */}
                <Route path="/:lang" element={<LangHomePage />} />


                {/* Pages recrutement (hébreu) */}
                <Route path="/recruitment/listing/:id" element={<RecruitmentListingDetailPage />} />
                <Route path="/recruitment/:service" element={<RecruitmentServicePage />} />

                {/* Pages recrutement avec préfixe de langue (/fr/recruitment/babysitting) */}
                <Route path="/:lang/recruitment/listing/:id" element={<LangRecruitmentListingRoute />} />
                <Route path="/:lang/recruitment/:service" element={<LangRecruitmentRoute />} />

                {/* Pages d'authentification */}
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="/admin/verify-provider/:token" element={<AdminVerifyProviderPage />} />
             
              
                {/* Page de détails provider */}
                <Route path="/provider/:id" element={<ProviderDetailPage />} />

                {/* Page de demande d'avis - fonctionne même si le profil n'est pas encore publié */}
                <Route path="/review/:id" element={<ReviewRequestPage />} />
            
             {/* Pages informatives */}
                {/* PAIEMENT DÉSACTIVÉ - RÉACTIVER QUAND SITE PAYANT
                <Route path="/billing" element={<BillingPage />} />
                */}
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                {/* PAIEMENT DÉSACTIVÉ - RÉACTIVER QUAND SITE PAYANT
                <Route path="/pricing" element={<PricingPage />} />
                */}  
                <Route path="/terms" element={<TermsOfService />} />
<Route path="/privacy" element={<PrivacyPolicy />} />               
                
                {/* Routes protégées */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Pages utilitaires */}
                <Route path="/contact" element={<ContactPage />} />
                
                {/* Page 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              </Suspense>
            </main>
            
            <Footer />
            
            {/* Widget d'accessibilité */}
            <AccessibilityWidget />
            <FloatingWhatsApp />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;