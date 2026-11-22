import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import AuthModal from './AuthModal';
import './AuthGate.css';

// Page affichée à un visiteur non connecté qui ouvre une page protégée (ex. /dashboard depuis un mail de relance).
// La fenêtre de connexion s'ouvre directement ; après connexion, ProtectedRoute affiche la page demandée.
// Classes en "text-" : elles survivent à l'override de taille de police d'AccessibilityWidget.
const AuthGate = () => {
  const { t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(true);

  return (
    <div className="text-gate-wrap">
      <div className="text-gate-card">
        <div className="text-gate-icon" aria-hidden="true">
          <Lock size={30} />
        </div>
        <h2 className="text-gate-title">{t('auth.gateTitle')}</h2>
        <p className="text-gate-sub">{t('auth.gateText')}</p>
        <div className="text-gate-actions">
          <button type="button" className="text-gate-btn" onClick={() => setShowAuthModal(true)}>
            {t('auth.login')}
          </button>
          <Link to="/" className="text-gate-link">
            {t('notFound.backHome')}
          </Link>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode="login" />
      )}
    </div>
  );
};

export default AuthGate;
