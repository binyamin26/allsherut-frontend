import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const DJForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.dj.title')}</h3>

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
          <label className="auth-form-label required">{t('serviceForm.dj.eventTypes')}</label>
          <div className="checkbox-group" data-field="dj_event_types">
            {[
              { value: 'wedding', label: t('filters.chef.wedding') },
              { value: 'barMitsva', label: t('filters.chef.barMitsva') },
              { value: 'batMitsva', label: t('filters.chef.batMitsva') },
              { value: 'britMila', label: t('filters.chef.britMila') },
              { value: 'shevaBrahot', label: t('filters.chef.shevaBrahot') },
              { value: 'anniversary', label: t('filters.chef.anniversary') },
              { value: 'corporateEvent', label: t('filters.chef.corporateEvent') },
              { value: 'privateParty', label: t('filters.chef.privateParty') },
              { value: 'familyParty', label: t('filters.chef.familyParty') },
              { value: 'engagement', label: t('filters.chef.engagement') }
            ].map(type => (
              <label key={type.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.dj_event_types?.includes(type.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.dj_event_types || [];
                    const newTypes = e.target.checked
                      ? [...current, type.value]
                      : current.filter(t => t !== type.value);
                    handleServiceDetailsChange('dj_event_types', newTypes);
                  }}
                />
                {type.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.dj_event_types'] && <span className="error-text">{errors['serviceDetails.dj_event_types']}</span>}
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

      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label">{t('serviceFields.dj.separated_dancing')}</label>
          <div className="checkbox-group">
            <label className="checkbox-item">
              <input
                type="radio"
                name="separated_dancing"
                checked={serviceDetails.separated_dancing === true}
                onChange={() => handleServiceDetailsChange('separated_dancing', true)}
              />
              {t('common.yes')}
            </label>
            <label className="checkbox-item">
              <input
                type="radio"
                name="separated_dancing"
                checked={serviceDetails.separated_dancing === false}
                onChange={() => handleServiceDetailsChange('separated_dancing', false)}
              />
              {t('common.no')}
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DJForm;
