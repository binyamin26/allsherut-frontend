import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle, AlertCircle, Loader, Home } from 'lucide-react';


const API_BASE = import.meta.env.VITE_API_URL;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear errors when user starts typing
    if (error) setError('');
    if (emailError) setEmailError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!email.trim()) {
      setEmailError('כתובת אימייל נדרשת');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('כתובת אימייל לא תקינה');
      return;
    }

    setLoading(true);
    setError('');
    setEmailError('');

    try {
   const response = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        if (response.status === 404) {
          setError('כתובת האימייל לא נמצאה במערכת');
        } else if (response.status === 429) {
          setError('יותר מדי בקשות. נסה שוב בעוד 15 דקות');
        } else {
          setError(data.message || 'שגיאה בשליחת האימייל');
        }
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setError('שגיאה בחיבור לשרת. נסה שוב מאוחר יותר');
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className="forgot-password-page">
        <div className="container">
          <div className="forgot-card success-card">
            <div className="text-center">
              <div className="success-icon">
                <CheckCircle size={64} />
              </div>
              
              <h1>אימייל נשלח בהצלחה!</h1>
              
              <div className="success-content">
                <p className="success-message">
                  שלחנו לכתובת <strong>{email}</strong> אימייל עם קישור לאיפוס סיסמה.
                </p>
                
                <div className="success-instructions">
                  <h3>מה עכשיו?</h3>
                  <ol>
                    <li>בדק את תיבת האימייל שלך</li>
                    <li>חפש אימייל מ-HomeSherut</li>
                    <li>לחץ על הקישור באימייל</li>
                    <li>בחר סיסמה חדשה</li>
                  </ol>
                </div>
                
                <div className="success-notes">
                  <p><strong>לא רואה את האימייל?</strong></p>
                  <ul>
                    <li>בדק בתיקיית הספאם/זבל</li>
                    <li>הקישור תקף ל-24 שעות בלבד</li>
                    <li>אפשר לבקש אימייל חדש אחרי 15 דקות</li>
                  </ul>
                </div>
                
               // Dans ForgotPasswordPage.jsx
// Remplacez la section success-actions par :

<div className="success-actions">
  <Link to="/" className="btn btn-primary">
    <Home size={18} />
    חזרה לדף הבית
  </Link>
  
  <button 
    onClick={() => window.location.reload()}
    className="btn btn-primary"
  >
    <Mail size={18} />
    שלח אימייל נוסף
  </button>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form state
  return (
    <div className="forgot-password-page">
      <div className="container">
        <div className="forgot-card">
          {/* Header */}
          <div className="forgot-header">
            <div className="forgot-icon">
              <Mail size={48} />
            </div>
            <h1>שכחת סיסמה?</h1>
            <p className="forgot-subtitle">
              אין בעיה! הזן את כתובת האימייל שלך ונשלח לך קישור לאיפוס הסיסמה
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="forgot-form">
            {error && (
              <div className="error-message global-error">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="input-group">
              <label htmlFor="email" className="form-label">
                כתובת אימייל
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="הזן את כתובת האימייל שלך"
                  value={email}
                  onChange={handleEmailChange}
                  className={emailError ? 'error' : ''}
                  autoComplete="email"
                  autoFocus
                />
              </div>
              {emailError && (
                <span className="error-text">{emailError}</span>
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
                  שולח אימייל...
                </>
              ) : (
                <>
                  <ArrowRight size={18} />
                  שלח קישור לאיפוס סיסמה
                </>
              )}
            </button>

            {/* Help text */}
            <div className="help-text">
              <p>
                נשלח לך אימייל עם קישור לאיפוס הסיסמה. 
                הקישור יהיה תקף למשך 24 שעות.
              </p>
            </div>

            {/* Back to login */}
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

          {/* Additional help */}
          <div className="additional-help">
            <h3>זקוק לעזרה נוספת?</h3>
            <p>
              אם אתה לא זוכר את כתובת האימייל שלך או נתקל בבעיות,{' '}
              <Link to="/contact" className="link-btn">
                צור איתנו קשר
              </Link>{' '}
              ואנחנו נעזור לך.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;