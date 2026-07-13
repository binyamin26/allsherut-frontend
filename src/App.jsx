import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import RecruitmentServicePage from './pages/recruitment/RecruitmentServicePage';
import RecruitmentListingDetailPage from './pages/recruitment/RecruitmentListingDetailPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { SUPPORTED_LANGS, getServiceKeyFromSlug } from './utils/langUtils';

// Layout components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import ServiceTitleFitter from "./components/common/ServiceTitleFitter";

// Import du Widget d'Accessibilité
import AccessibilityWidget from "./components/common/AccessibilityWidget";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp";

// Pages principales
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import BecomeProviderPage from "./pages/BecomeProviderPage";
import CategoryPage from "./pages/CategoryPage";

// Pages utilitaires
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import ResetPasswordPage from './pages/ResetPasswordPage';
// PAIEMENT DÉSACTIVÉ - RÉACTIVER QUAND SITE PAYANT
// import BillingPage from './pages/BillingPage';
import HowItWorksPage from './pages/HowItWorksPage';
// import PricingPage from './pages/PricingPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Pages de services
import BabysittingPage from "./pages/services/BabysittingPage";
import CleaningPage from "./pages/services/CleaningPage";
import GardeningPage from "./pages/services/GardeningPage";
import PetcarePage from "./pages/services/PetcarePage";
import TutoringPage from "./pages/services/TutoringPage";
import SportsActivitiesPage from "./pages/services/SportsActivitiesPage";
import EldercarePage from "./pages/services/EldercarePage";
import LaundryPage from "./pages/services/LaundryPage";
import PropertyManagementPage from "./pages/services/PropertyManagementPage";
import ElectricianPage from './pages/services/ElectricianPage';
import PlumbingPage from './pages/services/PlumbingPage';
import AirConditioningPage from './pages/services/AirConditioningPage';
import GasTechnicianPage from './pages/services/GasTechnicianPage';
import DrywallPage from './pages/services/DrywallPage';
import CarpentryPage from './pages/services/CarpentryPage';
import HomeOrganizationPage from './pages/services/HomeOrganizationPage';
import EventEntertainmentPage from './pages/services/EventEntertainmentPage';
import DJPage from './pages/services/DJPage';
import PrivateChefPage from './pages/services/PrivateChefPage';
import CateringPage from './pages/services/CateringPage';
import PastryPage from './pages/services/PastryPage';
import PaintingPage from './pages/services/PaintingPage';
import WaterproofingPage from './pages/services/WaterproofingPage';
import ContractorPage from './pages/services/ContractorPage';
import AluminumPage from './pages/services/AluminumPage';
import GlassWorksPage from './pages/services/GlassWorksPage';
import LocksmithPage from './pages/services/LocksmithPage';
import MovingPage from './pages/services/MovingPage';
import PhotographerPage from './pages/services/PhotographerPage';
import EventDecorationPage from './pages/services/EventDecorationPage';
import PestControlPage from './pages/services/PestControlPage';
import HandymanPage from './pages/services/HandymanPage';
import MechanicPage from './pages/services/MechanicPage';
import MetalworkPage from './pages/services/MetalworkPage';
import DriverPage from './pages/services/DriverPage';

// Page de détails provider
import ProviderDetailPage from './pages/ProviderDetailPage';

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
              <Routes>
                {/* Page d'accueil */}
                <Route path="/" element={<HomePage />} />
                <Route path="/categories/:slug" element={<CategoryPage />} />
                
                {/* Pages principales */}
                <Route path="/become-provider" element={<BecomeProviderPage />} />
                
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