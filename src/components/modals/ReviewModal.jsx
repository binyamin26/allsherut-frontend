import React, { useState } from 'react';
import { X, Star, User, Mail, MessageCircle, Send, Check, AlertCircle } from 'lucide-react';
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
    rating: 0,
    comment: '',
      displayNameOption: 'private'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleClose = () => {
  const wasSuccess = step === 'success';
  
  setStep('email-verification');
  setFormData({
    name: '',
    email: '',
    verificationCode: '',
    rating: 0,
    comment: '',
    displayNameOption: 'private'
  });
  setError('');
  setHoveredRating(0);
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

  const handleSendVerification = async () => {
    if (!validateEmailStep()) return;

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
                      'שגיאה בחיבור לשרת';
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
                        'שגיאה בחיבור לשרת';
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const handleSubmitReview = async () => {
 if (!formData.rating) {
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
        verificationCode: formData.verificationCode,
        providerId,
        serviceType,
        rating: formData.rating,
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
                      'שגיאה בחיבור לשרת';
  setError(errorMessage);
} finally {
      setLoading(false);
    }
  };

  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`star-btn ${i <= (hoveredRating || formData.rating) ? 'active' : ''}`}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => handleInputChange('rating', i)}
        >
          <Star size={32} fill={i <= (hoveredRating || formData.rating) ? 'currentColor' : 'none'} />
        </button>
      );
    }
    return stars;
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
  className="btn-verify"
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
                <div className="rating-section">
                <label className="form-label">{t('review.form.overallRating')}</label>
                  <div className="star-rating">
                    {renderStarRating()}
                  </div>
                <div className="rating-text">
  {formData.rating === 1 && t('review.rating.terrible')}
  {formData.rating === 2 && t('review.rating.bad')}
  {formData.rating === 3 && t('review.rating.okay')}
  {formData.rating === 4 && t('review.rating.good')}
  {formData.rating === 5 && t('review.rating.excellent')}
</div>
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
  onClick={() => setStep('verification-code')}
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