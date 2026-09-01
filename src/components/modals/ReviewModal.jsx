import React, { useState } from 'react';
import { X, User, Mail, MessageCircle, Send, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const ReviewModal = ({ isOpen, onClose, providerId, providerName, serviceType }) => {
  const { apiCall } = useAuth();
  const { t } = useLanguage();
  
 const [step, setStep] = useState('email-verification'); // 'email-verification' | 'verification-code' | 'review-form' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    verificationCode: '',
    qualityRating: 0,
    priceRating: 0,
    availabilityRating: 0,
    professionalismRating: 0,
    comment: '',
    displayNameOption: 'private'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
  const wasSuccess = step === 'success';

  setStep('email-verification');
  setFormData({
    name: '',
    email: '',
    verificationCode: '',
    qualityRating: 0,
    priceRating: 0,
    availabilityRating: 0,
    professionalismRating: 0,
    comment: '',
    displayNameOption: 'private'
  });
  setError('');
  onClose();
  
  if (wasSuccess) {
    window.location.reload();
  }
};

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

const validateEmailStep = () => {
  console.log('Validation email - valeur:', JSON.stringify(formData.email), 'longueur:', formData.email.length);
 if (!formData.name.trim()) {
  setError(t('review.errors.nameRequired'));
  return false;
}
if (!formData.email.trim()) {
  setError(t('review.errors.emailRequired'));
  return false;
}
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
  setError(t('review.errors.emailInvalid'));
  return false;
}
    return true;
  };

  const ADMIN_BYPASS_EMAIL = 'binou.ben26@gmail.com';

  const handleSendVerification = async () => {
    if (!validateEmailStep()) return;

    // Compte admin : publication directe sans code de vérification par email
    if (formData.email.trim().toLowerCase() === ADMIN_BYPASS_EMAIL) {
      setStep('review-form');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Email envoyé:', JSON.stringify(formData.email), 'Length:', formData.email.length);
      const response = await apiCall('/reviews/send-verification', 'POST', {
        name: formData.name,
      email: formData.email.trim(),
        providerId,
        serviceType
      });

      if (response.success) {
        setStep('verification-code');
      } else {
       setError(response.message || t('review.errors.sendError'));
      }
   } catch (error) {
  // Extraire le message d'erreur spécifique
  const errorMessage = error?.response?.data?.message || 
                      error?.message || 
                      'Erreur de connexion au serveur';
  setError(errorMessage);
} finally {
      setLoading(false);
    }
  };

const handleVerifyCode = async () => {
 if (!formData.verificationCode.trim()) {
  setError(t('review.errors.codeRequired'));
  return;
}

  setLoading(true);
  setError('');

  try {
    const response = await apiCall('/reviews/verify-code', 'POST', {
      email: formData.email,
      verificationCode: formData.verificationCode,
      providerId,
      serviceType
    });

    if (response.success) {
      setStep('review-form');
    } else {
      // Afficher le message d'erreur spécifique du backend
    setError(response.message || t('review.errors.codeInvalid'));
    }
  } catch (error) {
    // Essayer d'extraire le message d'erreur du backend
    const errorMessage = error?.response?.data?.message || 
                        error?.message || 
                        'Erreur de connexion au serveur';
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const computedGlobal = (() => {
    const scores = [
      formData.qualityRating,
      formData.priceRating,
      formData.availabilityRating,
      formData.professionalismRating
    ].filter(n => n > 0);
    if (scores.length === 0) return null;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Number.isInteger(avg) ? avg.toString() : avg.toFixed(1);
  })();

  const handleSubmitReview = async () => {
    const { qualityRating, priceRating, availabilityRating, professionalismRating } = formData;
    if (!qualityRating && !priceRating && !availabilityRating && !professionalismRating) {
      setError(t('review.errors.ratingRequired'));
      return;
    }
    if (!formData.comment.trim()) {
      setError(t('review.errors.commentRequired'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiCall('/reviews/create', 'POST', {
        email: formData.email,
        name: formData.name,
        verificationCode: formData.verificationCode,
        providerId,
        serviceType,
        qualityRating: qualityRating || null,
        priceRating: priceRating || null,
        availabilityRating: availabilityRating || null,
        professionalismRating: professionalismRating || null,
        comment: formData.comment,
        displayNameOption: formData.displayNameOption
      });

 if (response.success) {
  setStep('success');
        // Optionally show success message or refresh provider data
      } else {
     setError(response.message || t('review.errors.createError'));
      }
  } catch (error) {
  // Extraire le message d'erreur spécifique
  const errorMessage = error?.response?.data?.message || 
                      error?.message || 
                      'Erreur de connexion au serveur';
  setError(errorMessage);
} finally {
      setLoading(false);
    }
  };

  const renderCategoryRating = (field, labelKey) => {
    const value = formData[field];
    return (
      <div className="category-rating-row">
        <span className="category-rating-label">{t(labelKey)}</span>
        <div className="category-rating-buttons">
          {[1,2,3,4,5,6,7,8,9,10].map(n => (
            <button
              key={n}
              type="button"
              disabled={loading}
              className={`rating-number-btn${value === n ? ' active' : ''}`}
              onClick={() => handleInputChange(field, n)}
            >
              {n}
            </button>
          ))}
          {value > 0 && <span className="category-score-badge">{value}/10</span>}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="review-modal">
        <div className="modal-header">
   <h2 className="modal-title">
  {step === 'email-verification' && t('review.modal.titleEmail')}
  {step === 'verification-code' && t('review.modal.titleVerification')}
  {step === 'review-form' && `${t('review.modal.titleRating')} ${providerName}`}
  {step === 'success' && t('review.modal.titleSuccess')}
</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          {/* Step 1: Email Verification */}
          {step === 'email-verification' && (
            <div className="email-verification-step">
              <div className="step-description">
                <div className="info-box">
                  <AlertCircle size={20} />
               <p>{t('review.modal.emailDescription')}</p>
                </div>
              </div>

              <div className="auth-form">
                <div className="input-group">
                <label className="form-label">{t('review.form.fullName')}</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={t('review.form.fullNamePlaceholder')}
                      className="standard-input"
                      disabled={loading}
                    />
                    <User className="input-icon" size={18} />
                  </div>
                </div>

                <div className="input-group">
                 <label className="form-label">{t('review.form.email')}</label>
                  <div className="input-wrapper">
                 <input
  type="email"
  value={formData.email}
  onChange={(e) => handleInputChange('email', e.target.value)}
  onKeyDown={(e) => e.key === 'Enter' && handleSendVerification()}
placeholder={t('review.form.emailPlaceholder')}
  className="standard-input"
  disabled={loading}
/>
                    <Mail className="input-icon" size={18} />
                  </div>
                </div>

                {error && (
                  <div className="error-message">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <button
                  className="btn-primary btn-full"
                  onClick={handleSendVerification}
                  disabled={loading}
                >
                {loading ? t('review.form.sending') : t('review.form.sendCode')}
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Verification Code */}
          {step === 'verification-code' && (
            <div className="verification-code-step">
              <div className="step-description">
                <div className="success-box">
                  <Check size={20} />
               <p>
  {t('review.modal.codeSentTo')} <strong>{formData.email}</strong>
  <br />
  {t('review.modal.enterCode')}
</p>
                </div>
              </div>

              <div className="auth-form">
                <div className="input-group">
              <label className="form-label">{t('review.form.verificationCode')}</label>
                  <div className="input-wrapper">
                   <input
  type="text"
  value={formData.verificationCode}
  onChange={(e) => handleInputChange('verificationCode', e.target.value)}
  onKeyDown={(e) => e.key === 'Enter' && handleVerifyCode()}
placeholder={t('review.form.codePlaceholder')}
  className="standard-input verification-input"
  disabled={loading}
  maxLength={6}
/>
                  </div>
                </div>

                {error && (
                  <div className="error-message">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <div className="step-navigation">
           <button
  className="btn-back-green"
  onClick={() => setStep('email-verification')}
  disabled={loading}
>
  {t('common.back')}
</button>
  <button
  className="btn-primary"
  style={{ padding: '16px 32px', borderRadius: '12px', minHeight: '56px' }}
  onClick={handleVerifyCode}
  disabled={loading}
>
                {loading ? t('review.form.verifying') : t('review.form.verifyCode')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review Form */}
          {step === 'review-form' && (
            <div className="review-form-step">
              <div className="provider-info">
               <h3>{t('review.form.rateProvider')} {providerName}</h3>
<p>{t('review.form.rateDescription')}</p>
              </div>

              <div className="auth-form">
                <div className="rating-categories-section">
                  <label className="form-label">{t('review.form.categoriesTitle')}</label>
                  {renderCategoryRating('qualityRating',        'review.form.qualityRating')}
                  {renderCategoryRating('priceRating',          'review.form.priceRating')}
                  {renderCategoryRating('availabilityRating',   'review.form.availabilityRating')}
                  {renderCategoryRating('professionalismRating','review.form.professionalismRating')}
                  {computedGlobal && (
                    <div className="global-score-preview">
                      <span>{t('review.form.globalScore')}</span>
                      <strong className="global-score-value">{computedGlobal}/10</strong>
                    </div>
                  )}
                </div>

             <div className="input-group">
<label className="form-label">{t('review.form.detailedReview')}</label>
  <textarea
    value={formData.comment}
    onChange={(e) => handleInputChange('comment', e.target.value)}
placeholder={t('review.form.reviewPlaceholder')}
    className="review-textarea"
    rows={4}
    disabled={loading}
  />
</div>

{/* AJOUTER CETTE NOUVELLE SECTION ICI */}
<div className="input-group">
 <label className="form-label">{t('review.form.displayNameLabel')}</label>
  <div className="display-name-options">
    <label className="radio-option">
      <input
        type="radio"
        name="displayName"
        value="private"
        checked={formData.displayNameOption === 'private'}
        onChange={(e) => handleInputChange('displayNameOption', e.target.value)}
        disabled={loading}
      />
    <span>{t('review.form.displayPrivate')}</span>
    </label>
    
    <label className="radio-option">
      <input
        type="radio"
        name="displayName"
        value="firstname"
        checked={formData.displayNameOption === 'firstname'}
        onChange={(e) => handleInputChange('displayNameOption', e.target.value)}
        disabled={loading}
      />
    <span>{t('review.form.displayFirstName')}</span>
    </label>

    <label className="radio-option">
  <input
    type="radio"
    name="displayName"
    value="full"
    checked={formData.displayNameOption === 'full'}
    onChange={(e) => handleInputChange('displayNameOption', e.target.value)}
    disabled={loading}
  />
 <span>{t('review.form.displayFull')}</span>
</label>
    
    <label className="radio-option">
      <input
        type="radio"
        name="displayName"
        value="anonymous"
        checked={formData.displayNameOption === 'anonymous'}
        onChange={(e) => handleInputChange('displayNameOption', e.target.value)}
        disabled={loading}
      />
     <span>{t('review.form.displayAnonymous')}</span>
    </label>
  </div>
</div>

                {error && (
                  <div className="error-message">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <div className="step-navigation">
                <button
  className="btn-back-green"
  onClick={() => setStep(formData.email.trim().toLowerCase() === ADMIN_BYPASS_EMAIL ? 'email-verification' : 'verification-code')}
  disabled={loading}
>
  {t('common.back')}
</button>
                  <button
                    className="btn-primary"
                    onClick={handleSubmitReview}
                    disabled={loading}
                  >
                  {loading ? t('review.form.saving') : t('review.form.publishReview')}
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
      
      {/* Step 4: Success */}
{step === 'success' && (
  <div className="success-step">
    <div className="success-box" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'var(--space-8)' }}>
      <div style={{ 
        width: '80px', 
        height: '80px', 
        borderRadius: '50%', 
        background: 'linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 'var(--space-4)'
      }}>
        <Check size={40} color="white" />
      </div>
      <h3 style={{ 
        fontSize: 'var(--text-xl)', 
        fontWeight: '700', 
        color: 'var(--accent-700)',
        marginBottom: 'var(--space-3)'
      }}>
      {t('review.success.title')}
      </h3>
      <p style={{ 
        fontSize: 'var(--text-base)', 
        color: 'var(--neutral-600)',
        lineHeight: '1.6'
      }}>
       {t('review.success.message1')}
  <br />
  {t('review.success.message2')}
</p>
    </div>
    
    <button
      className="btn-primary btn-full"
      onClick={handleClose}
      style={{ marginTop: 'var(--space-6)' }}
    >
      {t('common.close')}
    </button>
  </div>
)}  </div>
      </div>
    </div>
  );
};

export default ReviewModal;