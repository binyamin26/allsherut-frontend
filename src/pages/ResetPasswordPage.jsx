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
        setError('טוקן איפוס לא תקין');
        setStep('error');
        return;
      }

      const response = await fetch(`/api/auth/verify-reset-token/${token}`);
      const data = await response.json();

      if (data.success) {
        setTokenValid(true);
        setStep('form');
      } else {
        setError(data.message || 'טוקן איפוס לא תקף או פג תוקף');
        setStep('error');
      }

    } catch (error) {
      console.error('Token verification error:', error);
      setError('שגיאה בבדיקת הטוקן. נסה שוב מאוחר יותר');
      setStep('error');
    }
  };

  // Validation simplifiée
  const validatePassword = (password) => {
    const errors = {};
    
    if (!password) {
      errors.newPassword = 'סיסמה נדרשת';
    } else if (password.length < 6) {
      errors.newPassword = 'הסיסמה חייבת להכיל לפחות 6 תווים';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'אישור סיסמה נדרש';
    } else if (password !== formData.confirmPassword) {
      errors.confirmPassword = 'הסיסמאות לא תואמות';
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
          confirmPassword: 'הסיסמאות לא תואמות'
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
  setSuccess('הסיסמה שונתה בהצלחה!');
  setStep('success');
  
  // Redirection simple après 3 secondes
  setTimeout(() => {
    navigate('/');
  }, 3000);
  
} else {
  setError(data.message || 'שגיאה בשינוי הסיסמה');
}

    } catch (error) {
      console.error('Reset password error:', error);
      setError('שגיאה בשינוי הסיסמה. נסה שוב מאוחר יותר');
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
              <h2>בודק טוקן איפוס...</h2>
              <p className="text-neutral-600">אנא המתן בזמן שאנחנו מוודאים את תקינות הקישור</p>
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
              <h2>שגיאה בטוקן האיפוס</h2>
              <p className="error-message">{error}</p>
              
              <div className="error-actions">
                <Link to="/" className="btn btn-secondary">
                  <Home size={18} />
                  חזרה לדף הבית
                </Link>
                <button 
                  onClick={() => navigate('/', { state: { showAuthModal: true } })}
                  className="btn btn-primary"
                >
                  בקש איפוס חדש
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
            <h2>הסיסמה שונתה בהצלחה!</h2>
            <p className="success-message">
              הסיסמה שלך שונתה בהצלחה. כעת תוכל להתחבר עם הסיסמה החדשה.
            </p>
            
            <div className="success-actions">
              <button 
                onClick={() => navigate('/')}
                className="btn btn-primary"
              >
                <Home size={18} />
                חזרה לדף הבית
              </button>
              
              <p className="text-sm text-neutral-600 mt-4">
                מעביר אוטומטית בעוד מספר שניות...
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
            <h1>איפוס סיסמה</h1>
            <p>הזן סיסמה חדשה לחשבון שלך</p>
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
              <label className="form-label">סיסמה חדשה</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="הזן סיסמה חדשה"
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
              <label className="form-label">אישור סיסמה חדשה</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="הזן שוב את הסיסמה החדשה"
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
                  משנה סיסמה...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  שנה סיסמה
                </>
              )}
            </button>

            {/* Back to Login */}
            <div className="form-footer">
              <p>
                נזכרת בסיסמה?{' '}
                <button 
                  type="button"
                  onClick={() => navigate('/', { state: { showAuthModal: true } })}
                  className="link-btn"
                >
                  התחבר כאן
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