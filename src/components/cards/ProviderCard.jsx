import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Eye, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import apiService from '../../services/api';
import CallLeadModal from '../modals/CallLeadModal';

const AVATAR_GRADIENTS = [
  'linear-gradient(145deg, #2563EB 0%, #1E3A8A 100%)',
  'linear-gradient(145deg, #0D9488 0%, #0F766E 100%)',
  'linear-gradient(145deg, #EA580C 0%, #C2410C 100%)',
  'linear-gradient(145deg, #7C3AED 0%, #5B21B6 100%)',
  'linear-gradient(145deg, #BE185D 0%, #9D174D 100%)',
  'linear-gradient(145deg, #0369A1 0%, #075985 100%)',
];

const getAvatarGradient = (name) => {
  if (!name) return AVATAR_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

const getInitial = (name) => {
  if (!name) return '?';
  return name.trim()[0] || '?';
};

const ProviderCard = ({ provider, onOpenReviewModal }) => {
  console.log('🔍 ProviderCard:', {
    id: provider.id,
    city: provider.city,
    hourlyRate: provider.hourly_rate,
    price: provider.price
  });
  
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [callModal, setCallModal] = useState({ open: false, action: 'call' });

  const handleViewProfile = () => {
    navigate(`/provider/${provider.provider_id || provider.providerId || provider.id}`);
  };

  const handleReviewClick = () => {
    console.log('🔍 Review click - providerId:', provider.providerId, 'provider_id:', provider.provider_id, 'id:', provider.id);
    onOpenReviewModal(provider.providerId || provider.provider_id || provider.id, provider.name || provider.full_name);
  };

// 1. Définition sécurisée de l'URL de base du serveur
const baseUrl = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'https://homesherut-backend.fly.dev';

// 2. Création de la variable 'imageUrl' UNIQUE et SÉCURISÉE
// ✅ Ne rajouter baseUrl QUE si l'URL n'est pas déjà complète
const imageUrl = provider.profile_image 
  ? (provider.profile_image.startsWith('http') 
      ? provider.profile_image 
      : `https://homesherut-backend.fly.dev/${provider.profile_image.replace(/\\/g, '/').replace(/^\/+/, '')}`)
  : null;

// 🔍 Log de contrôle (Ligne 36 de votre console)
console.log("ID:", provider.id, "Image calculée:", imageUrl);

// SUPPRIMEZ la ligne 'const fullImageUrl = imagePath...' qui faisait planter le site

  // Prix (seulement si > 0)
  const hourlyRate = (provider.hourly_rate && provider.hourly_rate > 0) 
    ? provider.hourly_rate 
    : (provider.price && provider.price > 0) 
      ? provider.price 
      : null;

  // Expérience
  const experience = provider.experience_years || provider.experience || 0;

  const reviewsCount = provider.reviewsCount || provider.reviews_count || 0;

  const formatRating = (rating) => {
    const num = parseFloat(rating);
    if (!rating || isNaN(num) || num === 0) return null;
    const rounded = Math.round(num * 100) / 100;
    if (rounded % 1 === 0) return String(rounded);
    return rounded.toFixed(2).replace(/0+$/, '');
  };
  const formattedRating = formatRating(provider.average_rating);

  // Ville avec logique כל ישראל
  const getCity = () => {
    const city = provider.city || provider.location?.city || provider.location || '';
    if (city === 'כל ישראל' || city === 'ישראל') {
      return 'כל ישראל';
    }
    return city;
  };

  // Neighborhood (ne pas afficher si כל ישראל)
  const getNeighborhood = () => {
    const neighborhood = provider.neighborhood || provider.location?.area || '';
    if (neighborhood === 'כל ישראל' || neighborhood === 'כל העיר') {
      return null;
    }
    return neighborhood;
  };

 return (
  <div className="provider-card enhanced-card" dir={isRTL ? 'rtl' : 'ltr'}>
    <div className="card-vertical-body">
      <div className="card-avatar">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={provider.name || provider.full_name}
            className="provider-avatar-img"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        <div
          className="text-avatar-initials"
          style={{
            display: imageUrl ? 'none' : 'flex',
            background: getAvatarGradient(provider.name || provider.full_name),
          }}
        >
          {getInitial(provider.name || provider.full_name)}
        </div>
      </div>

      <div className="card-vertical-info">
        <h3 className="provider-name">{provider.name || provider.full_name}</h3>
        <div className="rating-stars">
          {reviewsCount > 0 && formattedRating ? (
            <>
              <span className="rating-lbl">{t('card.ratingLabel')}</span>
              <span className="rating-num">{formattedRating}</span>
              <svg width="17" height="17" viewBox="0 0 13 13" fill="#f59e0b" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0, filter: 'drop-shadow(0 1px 2px rgba(245,158,11,0.4))'}}>
                <polygon points="6.5,0.5 7.558,5.044 12.207,4.646 8.212,7.056 10.027,11.354 6.5,8.3 2.973,11.354 4.788,7.056 0.793,4.646 5.442,5.044" />
              </svg>
              <span className="rating-dot">·</span>
              <span className="reviews-count">{reviewsCount} {t('card.reviews')}</span>
            </>
          ) : (
            <span className="reviews-count no-rating">—</span>
          )}
        </div>
        <div className="location-info">
          <MapPin size={12} strokeWidth={2} />
          <strong>{getCity()}</strong>
          {getNeighborhood() && <strong> · {getNeighborhood()}</strong>}
        </div>
      </div>
    </div>

    <div className="card-footer">
      <div className="action-buttons" dir={isRTL ? 'rtl' : 'ltr'}>
        <button className="contact-provider-btn" onClick={handleViewProfile}>
          <Eye size={15} />
          <span>{t('card.viewProfile')}</span>
        </button>
        <button className="call-provider-btn" onClick={() => {
          const providerId = provider.provider_id || provider.providerId || provider.id;
          if (provider.phone) {
            apiService.logContactClick(providerId, 'call').catch(() => {});
            setCallModal({ open: true, action: 'call' });
          }
        }}>
          <Phone size={15} />
          <span>{t('card.contact')}</span>
        </button>
      </div>
    </div>

    <CallLeadModal
      isOpen={callModal.open}
      onClose={() => setCallModal({ open: false, action: 'call' })}
      providerPhone={provider.phone}
      providerName={provider.name || provider.full_name}
      serviceName={provider.serviceLabel || provider.service_name || provider.serviceName || provider.service_type || provider.serviceType || ''}
      action={callModal.action}
    />
  </div>
);
};

export default ProviderCard;