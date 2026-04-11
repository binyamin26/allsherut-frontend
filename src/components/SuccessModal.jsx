import React, { useEffect, useState } from 'react';
import { CheckCircle, Star, Gift, Users, Calendar, Phone } from 'lucide-react';
import './SuccessModal.css';
import { useLanguage } from './../context/LanguageContext';

const SuccessModal = ({ isOpen, onClose, userRole, userName, serviceType, seekingType = 'clients', isPremium = false }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Auto-close après 5 secondes (réduit de 8 à 5)
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const serviceLabel = t(`services.${serviceType}`, serviceType);
  const replace = (key) => t(key).replace('{userName}', userName).replace('{serviceType}', serviceLabel);

  const getWelcomeMessage = () => {
    if (seekingType === 'recruitment') {
      return {
        title: t('success.recruitment.title'),
        subtitle: replace('success.recruitment.subtitle'),
        benefits: [
          { icon: <Star size={20} />,        text: t('success.recruitment.benefit1') },
          { icon: <Phone size={20} />,        text: t('success.recruitment.benefit2') },
          { icon: <CheckCircle size={20} />,  text: t('success.recruitment.benefit3') },
          { icon: <Calendar size={20} />,     text: t('success.recruitment.benefit4') },
        ],
        profileReady: t('success.recruitment.profileReady'),
      };
    }
    if (seekingType === 'both') {
      return {
        title: t('success.both.title'),
        subtitle: replace('success.both.subtitle'),
        benefits: [
          { icon: <Star size={20} />,        text: t('success.both.benefit1') },
          { icon: <Users size={20} />,        text: t('success.both.benefit2') },
          { icon: <Phone size={20} />,        text: t('success.both.benefit3') },
          { icon: <Calendar size={20} />,     text: t('success.both.benefit4') },
        ],
        profileReady: t('success.both.profileReady'),
      };
    }
    // seekingType === 'clients' (default)
    return {
      title: t('success.title'),
      subtitle: replace('success.subtitle'),
      benefits: [
        { icon: <Star size={20} />,        text: t('success.benefits.professionalProfile') },
        { icon: <Users size={20} />,        text: t('success.benefits.localExposure') },
        { icon: <Phone size={20} />,        text: t('success.benefits.directContact') },
        { icon: <CheckCircle size={20} />,  text: t('success.benefits.ratingSystem') },
      ],
      profileReady: t('success.profileReady'),
    };
  };

  const welcomeData = getWelcomeMessage();

  return (
  <div className="success-modal-overlay" onClick={onClose}>
    {showConfetti && <div className="confetti-animation"></div>}
    
    <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="success-icon-container">
        <CheckCircle className="success-icon" size={60} />
      </div>

      <div className="success-content">
          <h1 className="success-title">{welcomeData.title}</h1>
          <p className="success-subtitle">{welcomeData.subtitle}</p>

          <div className="success-benefits">
       <h3>{t('success.whatYouGot')}</h3>
            <ul className="benefits-list">
              {welcomeData.benefits.map((benefit, index) => (
                <li key={index} className="benefit-item">
                  <span className="benefit-icon">{benefit.icon}</span>
                  <span className="benefit-text">{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="success-next-steps">
            <h4>{t('success.nextSteps')}</h4>
            <p>{welcomeData.profileReady}</p>
          </div>

          <div className="auto-close-timer">
            <p><small>{t('success.autoClose')}</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;