import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  CheckCircle, 
  AlertCircle,
  MessageCircle,
  User,
  Smartphone,
  X,
  Mail
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ContactPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Raisons de contact avec traductions
  const contactReasons = [
    t('contact.reasons.general'),
    t('contact.reasons.technical'),
    t('contact.reasons.provider'),
    t('contact.reasons.payment'),
    t('contact.reasons.report'),
    t('contact.reasons.suggestion'),
    t('contact.reasons.premium'),
    t('contact.reasons.other')
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear global message
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid');
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.errors.subjectRequired');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired');
    }
    
    if (formData.phone && !/^05\d{8}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = t('contact.errors.phoneInvalid');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showSuccessAndRedirect = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      navigate('/');
    }, 8000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        showSuccessAndRedirect();
      } else {
        setMessage({ 
          type: 'error', 
          text: data.message || t('contact.errors.sendError')
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessage({ 
        type: 'error', 
        text: t('contact.errors.connectionError')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-16">
      <div className="container">
        {/* Hero Section */}
        <div className="contact-hero text-center mb-16">
          <div className="hero-content max-w-4xl mx-auto">
            <h1 className="hero-title mb-6">
              {t('contact.hero.title')} <span className="gradient-text">{t('contact.hero.titleAccent')}</span>
            </h1>
            <p className="hero-description">
              {t('contact.hero.description')}
              <br />
              {t('contact.hero.availability')}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <div className="form-card bg-white rounded-radius-2xl border-2 border-neutral-200 p-8 box-shadow-lg">
            <div className="form-header text-center mb-8">
              <div className="form-icon w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-radius-2xl flex items-center justify-center mx-auto mb-4 box-shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-weight-800 text-neutral-800 mb-2">
                {t('contact.form.title')}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('contact.form.subtitle')}
              </p>
            </div>

            {/* Status Message */}
            {message.text && (
              <div className={`message ${message.type} mb-6`}>
                <div className="message-content">
                  {message.type === 'success' ? 
                    <CheckCircle className="w-5 h-5" /> : 
                    <AlertCircle className="w-5 h-5" />
                  }
                  <span>{message.text}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name & Email Row */}
              <div className="form-row">
                <div className="input-group">
                  <label className="auth-form-label">{t('contact.form.name')} *</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      className={`profile-input ${errors.name ? 'error' : ''}`}
                      disabled={loading}
                    />
                    <User className="input-icon w-5 h-5" />
                  </div>
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="input-group">
                  <label className="auth-form-label">{t('contact.form.email')} *</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      className={`profile-input ${errors.email ? 'error' : ''}`}
                      disabled={loading}
                    />
                    <Mail className="input-icon w-5 h-5" />
                  </div>
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>

              {/* Phone & Subject Row */}
              <div className="form-row">
                <div className="input-group">
                  <label className="auth-form-label">{t('contact.form.phone')}</label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contact.form.phonePlaceholder')}
                      className={`profile-input ${errors.phone ? 'error' : ''}`}
                      disabled={loading}
                    />
                    <Smartphone className="input-icon w-5 h-5" />
                  </div>
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="input-group">
                  <label className="auth-form-label">{t('contact.form.subject')} *</label>
                  <div className="select-wrapper">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`modern-select ${errors.subject ? 'error' : ''}`}
                      disabled={loading}
                    >
                      <option value="">{t('contact.form.subjectPlaceholder')}</option>
                      {contactReasons.map((reason, index) => (
                        <option key={index} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>
                  {errors.subject && <span className="error-text">{errors.subject}</span>}
                </div>
              </div>

              {/* Message */}
              <div className="input-group">
                <label className="auth-form-label">{t('contact.form.message')} *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={6}
                  className={`profile-input ${errors.message ? 'error' : ''}`}
                  style={{ minHeight: '150px', resize: 'vertical' }}
                  disabled={loading}
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary btn-centered"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.form.send')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section - 🆕 6 FAQ AU LIEU DE 4 */}
        <div className="faq-section mt-20">
          <div className="faq-header text-center mb-12">
            <h2 className="text-4xl font-weight-800 text-neutral-800 mb-4">
              {t('contact.faq.title')} <span className="gradient-text">{t('contact.faq.titleAccent')}</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              {t('contact.faq.subtitle')}
            </p>
          </div>

          <div className="faq-grid grid grid-template-columns-repeat-auto-fit-minmax-400px-1fr gap-6 max-w-6xl mx-auto">
            <div className="faq-item bg-white p-6 rounded-radius-2xl border-2 border-neutral-200 transition-all duration-medium hover:transform-translateY-minus2px hover:box-shadow-md hover:border-primary-300">
              <h4 className="text-lg font-weight-700 text-neutral-800 mb-3">
                {t('contact.faq.provider.question')}
              </h4>
              <p className="text-base text-neutral-600 leading-relaxed">
                {t('contact.faq.provider.answer')}
              </p>
            </div>

            <div className="faq-item bg-white p-6 rounded-radius-2xl border-2 border-neutral-200 transition-all duration-medium hover:transform-translateY-minus2px hover:box-shadow-md hover:border-primary-300">
              <h4 className="text-lg font-weight-700 text-neutral-800 mb-3">
                {t('contact.faq.advantages.question')}
              </h4>
              <p className="text-base text-neutral-600 leading-relaxed">
                {t('contact.faq.advantages.answer')}
              </p>
            </div>

            <div className="faq-item bg-white p-6 rounded-radius-2xl border-2 border-neutral-200 transition-all duration-medium hover:transform-translateY-minus2px hover:box-shadow-md hover:border-primary-300">
              <h4 className="text-lg font-weight-700 text-neutral-800 mb-3">
                {t('contact.faq.fees.question')}
              </h4>
              <p className="text-base text-neutral-600 leading-relaxed">
                {t('contact.faq.fees.answer')}
              </p>
            </div>

            <div className="faq-item bg-white p-6 rounded-radius-2xl border-2 border-neutral-200 transition-all duration-medium hover:transform-translateY-minus2px hover:box-shadow-md hover:border-primary-300">
              <h4 className="text-lg font-weight-700 text-neutral-800 mb-3">
                {t('contact.faq.trial.question')}
              </h4>
              <p className="text-base text-neutral-600 leading-relaxed">
                {t('contact.faq.trial.answer')}
              </p>
            </div>

            <div className="faq-item bg-white p-6 rounded-radius-2xl border-2 border-neutral-200 transition-all duration-medium hover:transform-translateY-minus2px hover:box-shadow-md hover:border-primary-300">
              <h4 className="text-lg font-weight-700 text-neutral-800 mb-3">
                {t('contact.faq.howItWorks.question')}
              </h4>
              <p className="text-base text-neutral-600 leading-relaxed">
                {t('contact.faq.howItWorks.answer')}
              </p>
            </div>

            <div className="faq-item bg-white p-6 rounded-radius-2xl border-2 border-neutral-200 transition-all duration-medium hover:transform-translateY-minus2px hover:box-shadow-md hover:border-primary-300">
              <h4 className="text-lg font-weight-700 text-neutral-800 mb-3">
                {t('contact.faq.security.question')}
              </h4>
              <p className="text-base text-neutral-600 leading-relaxed">
                {t('contact.faq.security.answer')}
              </p>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="modal-overlay">
            <div className="modal-content success-modal">
              <div className="success-modal-header">
                <div className="success-icon">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
                <button 
                  className="modal-close-btn"
                  onClick={() => navigate('/')}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="success-modal-body">
                <h3 className="success-modal-title">
                  {t('contact.success.title')}
                </h3>
                <p className="success-modal-message">
                  {t('contact.success.message')}
                </p>
                <div className="success-modal-countdown">
                  <p>{t('contact.success.redirect')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;