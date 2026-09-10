import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import LanguagesCheckboxGroup from '../common/LanguagesCheckboxGroup';

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
          <label className="auth-form-label required">{t('serviceForm.event_decoration.decorationTypes')}</label>
          <div className="checkbox-group" data-field="decoration_types">
            {[
              { value: 'archBalloon', label: t('serviceForm.event_decoration.archBalloon') },
              { value: 'tableDeco', label: t('serviceForm.event_decoration.tableDeco') },
              { value: 'hallDeco', label: t('serviceForm.event_decoration.hallDeco') },
              { value: 'photoWall', label: t('serviceForm.event_decoration.photoWall') }
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
          <LanguagesCheckboxGroup
            serviceDetails={serviceDetails}
            handleServiceDetailsChange={handleServiceDetailsChange}
            errors={errors}
          />
        </div>
      </div>

      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>

        <div className="input-group">
          <div className="checkbox-group" data-field="magnets">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={!!serviceDetails.magnets}
                onChange={(e) => handleServiceDetailsChange('magnets', e.target.checked)}
              />
              {t('serviceForm.event_decoration.magnets')}
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDecorationForm;
