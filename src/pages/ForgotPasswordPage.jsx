import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle, AlertCircle, Loader, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';


const API_BASE = import.meta.env.VITE_API_URL;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

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
    if (error) setError('');
    if (emailError) setEmailError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError(t('forgotPage.errorEmailRequired'));
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(t('forgotPage.errorEmailInvalid'));
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
          setError(t('forgotPage.errorNotFound'));
        } else if (response.status === 429) {
          setError(t('forgotPage.errorRateLimit'));
        } else {
          setError(data.message || t('forgotPage.errorSend'));
        }
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setError(t('forgotPage.errorServer'));
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

              <h1>{t('forgotPage.successTitle')}</h1>

              <div className="success-content">
                <p className="success-message">
                  {t('forgotPage.successMsg').replace('{email}', '')} <strong>{email}</strong>
                </p>

                <div className="success-instructions">
                  <h3>{t('forgotPage.whatNow')}</h3>
                  <ol>
                    <li>{t('forgotPage.step1')}</li>
                    <li>{t('forgotPage.step2')}</li>
                    <li>{t('forgotPage.step3')}</li>
                    <li>{t('forgotPage.step4')}</li>
                  </ol>
                </div>

                <div className="success-notes">
                  <p><strong>{t('forgotPage.noEmail')}</strong></p>
                  <ul>
                    <li>{t('forgotPage.checkSpam')}</li>
                    <li>{t('forgotPage.linkValid')}</li>
                    <li>{t('forgotPage.resendAfter')}</li>
                  </ul>
                </div>

                <div className="success-actions">
                  <Link to="/" className="btn btn-primary">
                    <Home size={18} />
                    {t('forgotPage.backHome')}
                  </Link>

                  <button
                    onClick={() => window.location.reload()}
                    className="btn btn-primary"
                  >
                    <Mail size={18} />
                    {t('forgotPage.sendAnother')}
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
            <h1>{t('forgotPage.title')}</h1>
            <p className="forgot-subtitle">
              {t('forgotPage.subtitle')}
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
                {t('forgotPage.emailLabel')}
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('forgotPage.emailPlaceholder')}
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
                  {t('forgotPage.sending')}
                </>
              ) : (
                <>
                  <ArrowRight size={18} />
                  {t('forgotPage.submitBtn')}
                </>
              )}
            </button>

            {/* Help text */}
            <div className="help-text">
              <p>{t('forgotPage.helpText')}</p>
            </div>

            {/* Back to login */}
            <div className="form-footer">
              <p>
                {t('forgotPage.rememberPassword')}{' '}
                <button
                  type="button"
                  onClick={() => navigate('/', { state: { showAuthModal: true } })}
                  className="link-btn"
                >
                  {t('forgotPage.loginHere')}
                </button>
              </p>
            </div>
          </form>

          {/* Additional help */}
          <div className="additional-help">
            <h3>{t('forgotPage.needHelp')}</h3>
            <p>
              {t('forgotPage.helpMore')}{' '}
              <Link to="/contact" className="link-btn">
                {t('forgotPage.contactUs')}
              </Link>{' '}
              {t('forgotPage.helpMore2')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
