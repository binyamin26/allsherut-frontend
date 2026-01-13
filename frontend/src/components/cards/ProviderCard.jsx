import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ProviderCard = ({ provider, onOpenReviewModal }) => {
  console.log('🔍 ProviderCard:', {
    id: provider.id,
    city: provider.city,
    hourlyRate: provider.hourly_rate,
    price: provider.price
  });
  
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleViewProfile = () => {
    navigate(`/provider/${provider.provider_id || provider.providerId || provider.id}`);
  };

  const handleReviewClick = () => {
    console.log('🔍 Review click - providerId:', provider.providerId, 'provider_id:', provider.provider_id, 'id:', provider.id);
    onOpenReviewModal(provider.providerId || provider.provider_id || provider.id, provider.name || provider.full_name);
  };

  // Image URL
const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
const imageUrl = provider.profile_image 
  ? `${baseUrl}/${provider.profile_image.replace(/\\/g, '/').replace(/^\/+/, '')}` 
  : '';

  // Prix (seulement si > 0)
  const hourlyRate = (provider.hourly_rate && provider.hourly_rate > 0) 
    ? provider.hourly_rate 
    : (provider.price && provider.price > 0) 
      ? provider.price 
      : null;

  // Expérience
  const experience = provider.experience_years || provider.experience || 0;

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
    <div className="provider-card enhanced-card" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <div className="card-header">
        <div className="provider-image-wrapper">
         <img 
  src={imageUrl || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" font-size="30" text-anchor="middle" dy=".3em" fill="%236b7280"%3E👤%3C/text%3E%3C/svg%3E'}
  alt={provider.name || provider.full_name}
  className="provider-image"
  onError={(e) => {
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" font-size="30" text-anchor="middle" dy=".3em" fill="%236b7280"%3E👤%3C/text%3E%3C/svg%3E';
  }}
/>
        </div>

        <div className="provider-basic-info">
          <h3 className="provider-name">{provider.name || provider.full_name}</h3>
        </div>

        <div className="provider-rating">
          <div className="rating-stars">
            <Star size={14} fill="currentColor" className="text-yellow-400" />
            <span className="rating-score">{provider.average_rating || t('card.new')}</span>
            <span className="reviews-count">({provider.reviewsCount || provider.reviews_count || 0} {t('card.reviews')})</span>
          </div>
        </div>

        {/* Ville au-dessus si prix existe */}
        {hourlyRate && (
          <div className="provider-location">
            <div className="location-main">
              <span>{t('card.serviceArea')} </span>
              <strong style={{ color: '#1f2937' }}>{getCity()}</strong>
              {getNeighborhood() && (
                <span style={{ color: '#1f2937' }}><strong> - {getNeighborhood()}</strong></span>
              )}
            </div>
          </div>
        )}

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
              {getNeighborhood() && (
                <span style={{ color: '#1f2937' }}><strong> - {getNeighborhood()}</strong></span>
              )}
            </div>
          )}
          <div className="experience-info">
            <strong>{experience}</strong>
            <span> {t('card.yearsExperience')}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="action-buttons">
          <button 
            className="contact-provider-btn"
            onClick={handleViewProfile}
          >
            <Phone size={16} />
            <span>{t('card.viewProfile')}</span>
          </button>
          
          <button 
            className="review-action-btn"
            onClick={handleReviewClick}
          >
            <MessageCircle size={16} />
            <span>{t('card.leaveReview')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;