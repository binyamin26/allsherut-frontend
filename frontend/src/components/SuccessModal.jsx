import React, { useEffect, useState } from 'react';
import { CheckCircle, Star, Gift, Users, Calendar, Phone } from 'lucide-react';
import './SuccessModal.css';
import { useLanguage } from './../context/LanguageContext';

const SuccessModal = ({ isOpen, onClose, userRole, userName, serviceType, isPremium = false }) => {
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

  // Message uniquement pour les prestataires (les clients ne s'inscrivent jamais)
  const getWelcomeMessage = () => {
  return {
    title: t('success.title'),
 subtitle: t('success.subtitle').replace('{userName}', userName).replace('{serviceType}', t(`services.${serviceType}`)),
    benefits: [
      // { icon: <Gift size={20} />, text: t('success.benefits.freeMonth') },
      { icon: <Star size={20} />, text: t('success.benefits.professionalProfile') },
      { icon: <Users size={20} />, text: t('success.benefits.localExposure') },
      { icon: <Phone size={20} />, text: t('success.benefits.directContact') },
      { icon: <CheckCircle size={20} />, text: t('success.benefits.ratingSystem') }
    ]
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
            <p>{t('success.profileReady')}</p>
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