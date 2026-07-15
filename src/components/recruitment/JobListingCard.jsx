import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Award, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const PAYMENT_LABELS = {
  hourly:  'recruitment.card.hourly',
  daily:   'recruitment.card.daily',
  monthly: 'recruitment.card.monthly',
};

const EXP_LABELS = {
  beginner:       'recruitment.card.expBeginner',
  '1_year':       'recruitment.card.exp1year',
  '2_years':      'recruitment.card.exp2years',
  '3_plus_years': 'recruitment.card.exp3plus',
};

const CONTRACT_LABELS = {
  full_time: 'recruitment.fullTime',
  part_time: 'recruitment.partTime',
  one_time:  'recruitment.oneTime',
};

const DAY_ORDER = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

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

const getInitial = (name) => (name ? (name.trim()[0] || '?') : '?');

const JobListingCard = ({ listing }) => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const salaryDisplay = isRTL ? `₪${listing.salary}` : `${listing.salary} ₪`;
  const paymentLabel = t(PAYMENT_LABELS[listing.payment_type] || '');
  const expLabel = t(EXP_LABELS[listing.experience_required] || '');
  const contractLabel = t(CONTRACT_LABELS[listing.contract_type] || '');

  // Jours : premier → dernier
  const days = listing.availability_days || [];
  let daysDisplay = '';
  if (days.includes('all_week')) {
    daysDisplay = t('days.allWeek');
  } else {
    const sortedDays = [...days].sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
    if (sortedDays.length === 1) {
      daysDisplay = t(`recruitment.day.short.${sortedDays[0]}`, sortedDays[0]);
    } else if (sortedDays.length > 1) {
      const first = t(`recruitment.day.short.${sortedDays[0]}`, sortedDays[0]);
      const last  = t(`recruitment.day.short.${sortedDays[sortedDays.length - 1]}`, sortedDays[sortedDays.length - 1]);
      daysDisplay = `${first}–${last}`;
    }
  }

  const hoursDisplay = (listing.availability_hours || []).includes('all')
    ? t('recruitment.hour.all')
    : (listing.availability_hours || []).map(h => t(`recruitment.hour.${h}`, h)).join('–');

  const scheduleDisplay = [daysDisplay, hoursDisplay].filter(Boolean).join(' · ');

  const imageUrl = listing.profile_image
    ? (listing.profile_image.startsWith('http')
        ? listing.profile_image
        : `https://homesherut-backend.fly.dev/${listing.profile_image.replace(/\\/g, '/').replace(/^\/+/, '')}`)
    : null;

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const goToListing = () => navigate(`/recruitment/listing/${listing.id}`);

  return (
    <div className="job-card" dir={isRTL ? 'rtl' : 'ltr'} onClick={goToListing}>
      <div className="job-card-avatar">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={listing.full_name}
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        )}
        <div
          className="job-card-avatar-fallback text-job-avatar"
          style={{ display: imageUrl ? 'none' : 'flex', background: getAvatarGradient(listing.full_name) }}
        >
          {getInitial(listing.full_name)}
        </div>
      </div>

      <div className="job-card-body">
        <div className="job-card-top">
          <h3 className="job-card-name">{listing.full_name}</h3>
          {contractLabel && (
            <span className={`job-badge job-badge-${listing.contract_type}`}>{contractLabel}</span>
          )}
        </div>

        <div className="job-card-meta">
          {listing.location_city && (
            <span className="job-meta-item">
              <MapPin size={14} />
              {listing.location_city}{listing.location_area && listing.location_area !== 'כל העיר' ? `, ${listing.location_area}` : ''}
            </span>
          )}
          {scheduleDisplay && (
            <span className="job-meta-item"><Calendar size={14} />{scheduleDisplay}</span>
          )}
          {expLabel && (
            <span className="job-meta-item"><Award size={14} />{expLabel}</span>
          )}
        </div>
      </div>

      <div className="job-card-action">
        <div className="job-salary">
          {salaryDisplay}
          {paymentLabel && <span className="job-salary-type">{paymentLabel}</span>}
        </div>
        <button className="job-voir-btn" onClick={goToListing}>
          {t('recruitment.card.viewOffer')}
          <ArrowIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export default JobListingCard;
