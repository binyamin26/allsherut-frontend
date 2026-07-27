import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const EventFoodStandsForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.event_food_stands.title')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.availabilityDays')}</label>
          <div className="checkbox-group" data-field="availability_days">
            {[
              { value: 'ראשון', label: t('days.sunday') },
              { value: 'שני', label: t('days.monday') },
              { value: 'שלישי', label: t('days.tuesday') },
              { value: 'רביעי', label: t('days.wednesday') },
              { value: 'חמישי', label: t('days.thursday') },
              { value: 'שישי', label: t('days.friday') },
              { value: 'כל השבוע', label: t('days.allWeek') }
            ].map(day => (
              <label key={day.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_days?.includes(day.value) || false}
                  onChange={() => handleExclusiveCheckbox('availability_days', day.value, 'כל השבוע', ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'])}
                />
                {day.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.availability_days'] && <span className="error-text">{errors['serviceDetails.availability_days']}</span>}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.availabilityHours')}</label>
          <div className="checkbox-group" data-field="availability_hours">
            {[
              { value: 'בוקר', label: t('hours.morning') },
              { value: 'אחר הצהריים', label: t('hours.afternoon') },
              { value: 'ערב', label: t('hours.evening') },
              { value: 'הכל', label: t('hours.all') }
            ].map(hour => (
              <label key={hour.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_hours?.includes(hour.value) || false}
                  onChange={() => handleExclusiveCheckbox('availability_hours', hour.value, 'הכל', ['בוקר', 'אחר הצהריים', 'ערב'])}
                />
                {hour.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.availability_hours'] && <span className="error-text">{errors['serviceDetails.availability_hours']}</span>}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.event.foodStandTypes')}</label>
          <div className="checkbox-group" data-field="food_stand_types">
            {[
              { value: 'פופקורן', label: t('filters.events.stand.popcorn') },
              { value: 'ברבה פאפא', label: t('filters.events.stand.cottonCandy') },
              { value: 'הוט דוג', label: t('filters.events.stand.hotdog') },
              { value: 'גרניטה / סלאש', label: t('filters.events.stand.granita') },
              { value: 'קרפים', label: t('filters.events.stand.crepe') },
              { value: 'וופלים', label: t('filters.events.stand.waffle') },
              { value: 'גלידה', label: t('filters.events.stand.icecream') },
              { value: 'קפה', label: t('filters.events.stand.coffee') },
              { value: 'סוכריות', label: t('filters.events.stand.candy') },
              { value: 'שוקולד', label: t('filters.events.stand.chocolate') },
              { value: 'נאצ\'וס', label: t('filters.events.stand.nachos') },
              { value: 'המבורגרים', label: t('filters.events.stand.burger') },
              { value: 'פיצה', label: t('filters.events.stand.pizza') }
            ].map(type => (
              <label key={type.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.food_stand_types?.includes(type.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.food_stand_types || [];
                    const newTypes = e.target.checked
                      ? [...current, type.value]
                      : current.filter(t => t !== type.value);
                    handleServiceDetailsChange('food_stand_types', newTypes);
                  }}
                />
                {type.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.food_stand_types'] && <span className="error-text">{errors['serviceDetails.food_stand_types']}</span>}
        </div>
      </div>

      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label">{t('serviceForm.common.experience')}</label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={serviceDetails.experience || ''}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '');
              handleServiceDetailsChange('experience', numericValue);
            }}
            className="standard-input"
            data-field="experience"
          />
        </div>
      </div>
    </div>
  );
};

export default EventFoodStandsForm;
