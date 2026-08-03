import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SUPPORTED_LANGS, getServiceKeyFromSlug } from './utils/langUtils';

// Layout components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import ServiceTitleFitter from "./components/common/ServiceTitleFitter";

// Import du Widget d'Accessibilité
import AccessibilityWidget from "./components/common/AccessibilityWidget";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp";

// Pages principales (chargées immédiatement : page d'accueil + 404 utilisées de façon synchrone ailleurs)
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

// Pages chargées à la demande (code-splitting par route)
const RecruitmentServicePage = lazy(() => import('./pages/recruitment/RecruitmentServicePage'));
const RecruitmentListingDetailPage = lazy(() => import('./pages/recruitment/RecruitmentListingDetailPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const AdminVerifyProviderPage = lazy(() => import('./pages/AdminVerifyProviderPage'));
// PAIEMENT DÉSACTIVÉ - RÉACTIVER QUAND SITE PAYANT
// import BillingPage from './pages/BillingPage';
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
// import PricingPage from './pages/PricingPage';
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// Pages de services
const BabysittingPage = lazy(() => import("./pages/services/BabysittingPage"));
const CleaningPage = lazy(() => import("./pages/services/CleaningPage"));
const GardeningPage = lazy(() => import("./pages/services/GardeningPage"));
const PetcarePage = lazy(() => import("./pages/services/PetcarePage"));
const TutoringPage = lazy(() => import("./pages/services/TutoringPage"));
const SportsActivitiesPage = lazy(() => import("./pages/services/SportsActivitiesPage"));
const EldercarePage = lazy(() => import("./pages/services/EldercarePage"));
const LaundryPage = lazy(() => import("./pages/services/LaundryPage"));
const PropertyManagementPage = lazy(() => import("./pages/services/PropertyManagementPage"));
const ElectricianPage = lazy(() => import('./pages/services/ElectricianPage'));
const PlumbingPage = lazy(() => import('./pages/services/PlumbingPage'));
const AirConditioningPage = lazy(() => import('./pages/services/AirConditioningPage'));
const GasTechnicianPage = lazy(() => import('./pages/services/GasTechnicianPage'));
const DrywallPage = lazy(() => import('./pages/services/DrywallPage'));
const CarpentryPage = lazy(() => import('./pages/services/CarpentryPage'));
const HomeOrganizationPage = lazy(() => import('./pages/services/HomeOrganizationPage'));
const EventEntertainmentPage = lazy(() => import('./pages/services/EventEntertainmentPage'));
const EventEquipmentRentalPage = lazy(() => import('./pages/services/EventEquipmentRentalPage'));
const EventFoodStandsPage = lazy(() => import('./pages/services/EventFoodStandsPage'));
const DJPage = lazy(() => import('./pages/services/DJPage'));
const PrivateChefPage = lazy(() => import('./pages/services/PrivateChefPage'));
const CateringPage = lazy(() => import('./pages/services/CateringPage'));
const PastryPage = lazy(() => import('./pages/services/PastryPage'));
const PaintingPage = lazy(() => import('./pages/services/PaintingPage'));
const WaterproofingPage = lazy(() => import('./pages/services/WaterproofingPage'));
const ContractorPage = lazy(() => import('./pages/services/ContractorPage'));
const AluminumPage = lazy(() => import('./pages/services/AluminumPage'));
const GlassWorksPage = lazy(() => import('./pages/services/GlassWorksPage'));
const LocksmithPage = lazy(() => import('./pages/services/LocksmithPage'));
const MovingPage = lazy(() => import('./pages/services/MovingPage'));
const PhotographerPage = lazy(() => import('./pages/services/PhotographerPage'));
const EventDecorationPage = lazy(() => import('./pages/services/EventDecorationPage'));
const PestControlPage = lazy(() => import('./pages/services/PestControlPage'));
const HandymanPage = lazy(() => import('./pages/services/HandymanPage'));
const MechanicPage = lazy(() => import('./pages/services/MechanicPage'));
const MetalworkPage = lazy(() => import('./pages/services/MetalworkPage'));
const DriverPage = lazy(() => import('./pages/services/DriverPage'));

// Page de détails provider
const ProviderDetailPage = lazy(() => import('./pages/ProviderDetailPage'));

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
          <a
            href="/"
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            {t('notFound.backHome')}
          </a>
        </div>
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