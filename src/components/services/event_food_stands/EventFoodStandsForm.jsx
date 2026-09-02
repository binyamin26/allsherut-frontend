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
              { value: 'sunday', label: t('days.sunday') },
              { value: 'monday', label: t('days.monday') },
              { value: 'tuesday', label: t('days.tuesday') },
              { value: 'wednesday', label: t('days.wednesday') },
              { value: 'thursday', label: t('days.thursday') },
              { value: 'friday', label: t('days.friday') },
              { value: 'allWeek', label: t('days.allWeek') }
            ].map(day => (
              <label key={day.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_days?.includes(day.value) || false}
                  onChange={() => handleExclusiveCheckbox('availability_days', day.value, 'allWeek', ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'])}
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
              { value: 'morning', label: t('hours.morning') },
              { value: 'afternoon', label: t('hours.afternoon') },
              { value: 'evening', label: t('hours.evening') },
              { value: 'all', label: t('hours.all') }
            ].map(hour => (
              <label key={hour.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_hours?.includes(hour.value) || false}
                  onChange={() => handleExclusiveCheckbox('availability_hours', hour.value, 'all', ['morning', 'afternoon', 'evening'])}
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
              { value: 'popcorn', label: t('filters.events.stand.popcorn') },
              { value: 'cottonCandy', label: t('filters.events.stand.cottonCandy') },
              { value: 'hotdog', label: t('filters.events.stand.hotdog') },
              { value: 'granita', label: t('filters.events.stand.granita') },
              { value: 'crepe', label: t('filters.events.stand.crepe') },
              { value: 'waffle', label: t('filters.events.stand.waffle') },
              { value: 'icecream', label: t('filters.events.stand.icecream') },
              { value: 'coffee', label: t('filters.events.stand.coffee') },
              { value: 'candy', label: t('filters.events.stand.candy') },
              { value: 'chocolate', label: t('filters.events.stand.chocolate') },
              { value: 'נאצ\'וס', label: t('filters.events.stand.nachos') },
              { value: 'burger', label: t('filters.events.stand.burger') },
              { value: 'pizza', label: t('filters.events.stand.pizza') }
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
        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.experience')}</label>
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
          {errors['serviceDetails.experience'] && <span className="error-text">{errors['serviceDetails.experience']}</span>}
        </div>
        <div className="input-group">
          <label className="auth-form-label required">{t('filters.common.languages')}</label>
          <div className="checkbox-group" data-field="languages">
            {[
              { value: 'hebrew', label: t('languages.hebrew') },
              { value: 'russian', label: t('languages.russian') },
              { value: 'english', label: t('languages.english') },
              { value: 'french', label: t('languages.french') }
            ].map(lang => (
              <label key={lang.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.languages?.includes(lang.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.languages || [];
                    const newLangs = e.target.checked
                      ? [...current, lang.value]
                      : current.filter(l => l !== lang.value);
                    handleServiceDetailsChange('languages', newLangs);
                  }}
                />
                {lang.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.languages'] && <span className="error-text">{errors['serviceDetails.languages']}</span>}
        </div>
      </div>
    </div>
  );
};

export default EventFoodStandsForm;
