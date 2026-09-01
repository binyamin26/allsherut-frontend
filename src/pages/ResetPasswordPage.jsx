import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  // États du composant
  const [step, setStep] = useState('verifying'); // 'verifying', 'form', 'success', 'error'
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // États du formulaire
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Vérifier token au montage
  useEffect(() => {
    verifyResetToken();
  }, [token]);

  const verifyResetToken = async () => {
    try {
      setStep('verifying');
      
      if (!token || token.length !== 64) {
        setError('Jeton de réinitialisation invalide');
        setStep('error');
        return;
      }

      const response = await fetch(`/api/auth/verify-reset-token/${token}`);
      const data = await response.json();

      if (data.success) {
        setTokenValid(true);
        setStep('form');
      } else {
        setError(data.message || 'Jeton de réinitialisation invalide ou expiré');
        setStep('error');
      }

    } catch (error) {
      console.error('Token verification error:', error);
      setError('Erreur lors de la vérification du jeton. Réessayez plus tard');
      setStep('error');
    }
  };

  // Validation simplifiée
  const validatePassword = (password) => {
    const errors = {};
    
    if (!password) {
      errors.newPassword = 'Mot de passe requis';
    } else if (password.length < 6) {
      errors.newPassword = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirmation du mot de passe requise';
    } else if (password !== formData.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation errors
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Validation temps réel pour confirm password
    if (name === 'confirmPassword' && formData.newPassword) {
      if (value !== formData.newPassword) {
        setValidationErrors(prev => ({
          ...prev,
          confirmPassword: 'Les mots de passe ne correspondent pas'
        }));
      } else {
        setValidationErrors(prev => ({
          ...prev,
          confirmPassword: ''
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const errors = validatePassword(formData.newPassword);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();


if (data.success) {
  setSuccess('Mot de passe modifié avec succès !');
  setStep('success');
  
  // Redirection simple après 3 secondes
  setTimeout(() => {
    navigate('/');
  }, 3000);
  
} else {
  setError(data.message || 'Erreur lors du changement de mot de passe');
}

    } catch (error) {
      console.error('Reset password error:', error);
      setError('Erreur lors du changement de mot de passe. Réessayez plus tard');
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (step === 'verifying') {
    return (
      <div className="reset-password-page">
        <div className="container">
          <div className="reset-card">
            <div className="text-center">
              <Loader className="animate-spin mx-auto mb-4" size={48} />
              <h2>Vérification du jeton de réinitialisation...</h2>
              <p className="text-neutral-600">Veuillez patienter pendant que nous vérifions la validité du lien</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (step === 'error') {
    return (
      <div className="reset-password-page">
        <div className="container">
          <div className="reset-card">
            <div className="text-center">
              <div className="error-icon">
                <AlertCircle size={64} />
              </div>
              <h2>Erreur de jeton de réinitialisation</h2>
              <p className="error-message">{error}</p>
              
              <div className="error-actions">
                <Link to="/" className="btn btn-secondary">
                  <Home size={18} />
                  Retour à l’accueil
                </Link>
                <button 
                  onClick={() => navigate('/', { state: { showAuthModal: true } })}
                  className="btn btn-primary"
                >
                  Demander une nouvelle réinitialisation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render success state
if (step === 'success') {
  return (
    <div className="reset-password-page">
      <div className="container">
        <div className="reset-card success-card">
          <div className="text-center">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h2>Mot de passe modifié avec succès !</h2>
            <p className="success-message">
              Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec le nouveau mot de passe.
            </p>
            
            <div className="success-actions">
              <button 
                onClick={() => navigate('/')}
                className="btn btn-primary"
              >
                <Home size={18} />
                Retour à l’accueil
              </button>
              
              <p className="text-sm text-neutral-600 mt-4">
                Redirection automatique dans quelques secondes...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  // Render form state
  return (
    <div className="reset-password-page">
      <div className="container">
        <div className="reset-card">
          <div className="reset-header">
            <div className="reset-icon">
              <Lock size={48} />
            </div>
            <h1>Réinitialisation du mot de passe</h1>
            <p>Saisissez un nouveau mot de passe pour votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="reset-form">
            {error && (
              <div className="error-message global-error">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {/* New Password Field */}
            <div className="input-group">
              <label className="form-label">Nouveau mot de passe</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Saisissez un nouveau mot de passe"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={validationErrors.newPassword ? 'error' : ''}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {validationErrors.newPassword && (
                <span className="error-text">{validationErrors.newPassword}</span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="input-group">
              <label className="form-label">Confirmation du nouveau mot de passe</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Saisissez à nouveau le nouveau mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={validationErrors.confirmPassword ? 'error' : ''}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <span className="error-text">{validationErrors.confirmPassword}</span>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={18} />
                  Modification du mot de passe...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  Modifier le mot de passe
                </>
              )}
            </button>

            {/* Back to Login */}
            <div className="form-footer">
              <p>
                Vous vous souvenez de votre mot de passe ?{' '}
                <button 
                  type="button"
                  onClick={() => navigate('/', { state: { showAuthModal: true } })}
                  className="link-btn"
                >
                  Connectez-vous ici
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;