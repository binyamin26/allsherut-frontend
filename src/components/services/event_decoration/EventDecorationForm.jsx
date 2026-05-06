import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const EventDecorationForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.event_decoration.title')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

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
          <label className="auth-form-label required">{t('serviceForm.event_decoration.decorationTypes')}</label>
          <div className="checkbox-group" data-field="decoration_types">
            {[
              { value: 'קשתות ועיצוב בלונים', label: t('serviceForm.event_decoration.archBalloon') },
              { value: 'עיצוב שולחנות', label: t('serviceForm.event_decoration.tableDeco') },
              { value: 'עיצוב אולמות', label: t('serviceForm.event_decoration.hallDeco') },
              { value: 'קירות צילום ופינות צילום', label: t('serviceForm.event_decoration.photoWall') }
            ].map(type => (
              <label key={type.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.decoration_types?.includes(type.value) || false}
                  onChange={() => handleExclusiveCheckbox('decoration_types', type.value, null, [])}
                />
                {type.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.decoration_types'] && <span className="error-text">{errors['serviceDetails.decoration_types']}</span>}
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

export default EventDecorationForm;
