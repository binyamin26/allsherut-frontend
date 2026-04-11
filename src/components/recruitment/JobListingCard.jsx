import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const DAY_ORDER = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

const JobListingCard = ({ listing }) => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const serviceLabel = t(`services.${listing.service_type}`, listing.service_type);
  const salaryDisplay = isRTL ? `₪${listing.salary}` : `${listing.salary} ₪`;
  const paymentLabel = t(PAYMENT_LABELS[listing.payment_type] || '');
  const expLabel = t(EXP_LABELS[listing.experience_required] || '');

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


  return (
    <div className="job-listing-row" dir={isRTL ? 'rtl' : 'ltr'}>

      <div className="job-listing-body">
        <h3 className="job-listing-title">{serviceLabel}</h3>

        <div className="job-listing-meta">
          <span className="job-meta-salary">
            💰 <strong>{salaryDisplay}</strong>
            {paymentLabel && <span className="job-meta-pay"> {paymentLabel}</span>}
          </span>
          {listing.location_city && (
            <>
              <span className="job-meta-sep"> · </span>
              <span className="job-meta-location">
                📍 {listing.location_city}{listing.location_area && listing.location_area !== 'כל העיר' ? `, ${listing.location_area}` : ''}
              </span>
            </>
          )}
        </div>

        {(scheduleDisplay || expLabel) && (
          <div className="job-listing-schedule">
            {expLabel && <span>{expLabel}</span>}
            {expLabel && scheduleDisplay && <span> · </span>}
            {scheduleDisplay && <span>{scheduleDisplay}</span>}
          </div>
        )}

        <div className="job-listing-publisher">
          {t('recruitment.card.postedBy')} : <strong>{listing.full_name}</strong>
        </div>
      </div>

      <div className="job-listing-action">
        <button
          className="job-voir-btn"
          onClick={() => navigate(`/recruitment/listing/${listing.id}`)}
        >
          {t('recruitment.card.viewOffer')}
        </button>
      </div>

    </div>
  );
};

export default JobListingCard;
