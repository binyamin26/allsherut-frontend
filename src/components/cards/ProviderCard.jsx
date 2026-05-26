import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ProviderCard = ({ provider, onOpenReviewModal }) => {
  console.log('🔍 ProviderCard:', {
    id: provider.id,
    city: provider.city,
    hourlyRate: provider.hourly_rate,
    price: provider.price
  });
  
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

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
  : 'https://homesherut-backend.onrender.com';

// 2. Création de la variable 'imageUrl' UNIQUE et SÉCURISÉE
// ✅ Ne rajouter baseUrl QUE si l'URL n'est pas déjà complète
const imageUrl = provider.profile_image 
  ? (provider.profile_image.startsWith('http') 
      ? provider.profile_image 
      : `https://homesherut-backend.onrender.com/${provider.profile_image.replace(/\\/g, '/').replace(/^\/+/, '')}`)
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
    <div className="card-horizontal-body">
      <div className="card-horizontal-image">
        {imageUrl ? (
          <img src={imageUrl} alt={provider.name || provider.full_name} className="provider-image"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
        ) : null}
        <div style={{
          display: imageUrl ? 'none' : 'flex',
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'linear-gradient(145deg, #e8eef5 0%, #d1dbe8 100%)',
          alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="50" fill="#d1dbe8"/>
            <circle cx="50" cy="38" r="18" fill="#8a9ab5"/>
            <ellipse cx="50" cy="85" rx="32" ry="28" fill="#8a9ab5"/>
          </svg>
        </div>
      </div>

      <div className="card-horizontal-info">
        <h3 className="provider-name">{provider.name || provider.full_name}</h3>
        <div className="rating-stars">
          {reviewsCount > 0 && formattedRating ? (
            <>
              <span className="rating-score">{formattedRating}</span>
              <span className="reviews-count">({reviewsCount} {t('card.reviews')})</span>
            </>
          ) : (
            <span className="reviews-count">0 {t('card.reviews')}</span>
          )}
        </div>
        <div className="price-experience-info">
          {hourlyRate ? (
            <div className="hourly-rate">
              <strong>₪{hourlyRate}</strong>
              <span>{t('card.perHour')}</span>
            </div>
          ) : (
            <div className="location-info">
              <span>{t('card.serviceArea')} </span>
              <strong style={{ color: '#1f2937' }}>{getCity()}</strong>
              {getNeighborhood() && <strong style={{ color: '#1f2937' }}> - {getNeighborhood()}</strong>}
            </div>
          )}
          <div className="experience-info">
            <strong>{experience}</strong>
            <span> {t('card.yearsExperience')}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="card-footer">
      <div className="action-buttons" dir={isRTL ? 'rtl' : 'ltr'}>
        <button className="contact-provider-btn" onClick={handleViewProfile}>
          <Phone size={15} />
          <span>{t('card.viewProfile')}</span>
        </button>
        <button className="review-action-btn" onClick={handleReviewClick}>
          <MessageCircle size={15} />
          <span>{t('card.leaveReview')}</span>
        </button>
      </div>
    </div>
  </div>
);
};

export default ProviderCard;