import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

// Layout components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

// Import du Widget d'Accessibilité
import AccessibilityWidget from "./components/common/AccessibilityWidget";

// Pages principales
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import BecomeProviderPage from "./pages/BecomeProviderPage";

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
import PrivateChefPage from './pages/services/PrivateChefPage';
import PaintingPage from './pages/services/PaintingPage';
import WaterproofingPage from './pages/services/WaterproofingPage';
import ContractorPage from './pages/services/ContractorPage';
import AluminumPage from './pages/services/AluminumPage';
import GlassWorksPage from './pages/services/GlassWorksPage';
import LocksmithPage from './pages/services/LocksmithPage';

// Page de détails provider
import ProviderDetailPage from './pages/ProviderDetailPage';

// Composant de protection des routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

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
          גישה נדחתה
        </h2>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#6b7280',
          margin: 0 
        }}>
          עליך להתחבר כדי לגשת לעמוד זה
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
            חזור לדף הבית
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
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="app-container">
            <Header />
            
            <main className="main-content">
              <Routes>
                {/* Page d'accueil */}
                <Route path="/" element={<HomePage />} />
                
                {/* Pages principales */}
                <Route path="/become-provider" element={<BecomeProviderPage />} />
                
                {/* Pages de services spécifiques */}
                <Route path="/services/babysitting" element={<BabysittingPage />} />
                <Route path="/services/cleaning" element={<CleaningPage />} />
                <Route path="/services/gardening" element={<GardeningPage />} />
                <Route path="/services/petcare" element={<PetcarePage />} />
                <Route path="/services/tutoring" element={<TutoringPage />} />
                <Route path="/services/eldercare" element={<EldercarePage />} />
 <Route path="/services/laundry" element={<LaundryPage />} />
 <Route path="/services/property-management" element={<PropertyManagementPage />} />
  <Route path="/services/electrician" element={<ElectricianPage />} />     
     <Route path="/services/plumbing" element={<PlumbingPage />} />
                <Route path="/services/air-conditioning" element={<AirConditioningPage />} />
                <Route path="/services/gas-technician" element={<GasTechnicianPage />} />
                <Route path="/services/drywall" element={<DrywallPage />} />
<Route path="/services/carpentry" element={<CarpentryPage />} />
<Route path="/services/home-organization" element={<HomeOrganizationPage />} />
<Route path="/services/event-entertainment" element={<EventEntertainmentPage />} />
<Route path="/services/private-chef" element={<PrivateChefPage />} />
<Route path="/services/painting" element={<PaintingPage />} />
<Route path="/services/waterproofing" element={<WaterproofingPage />} />
<Route path="/services/contractor" element={<ContractorPage />} />
<Route path="/services/aluminum" element={<AluminumPage />} />
<Route path="/services/glass-works" element={<GlassWorksPage />} />
<Route path="/services/locksmith" element={<LocksmithPage />} />


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
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider> 
  );
}

export default App;