import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const DoulaForm = ({ serviceDetails, errors, handleServiceDetailsChange }) => {
  const { t } = useLanguage();

  const workTypes = [
    { value: 'הכנה ללידה', label: t('serviceForm.doula.workTypes.birthPreparation') },
    { value: 'ליווי בלידה', label: t('serviceForm.doula.workTypes.birthSupport') },
    { value: 'ליווי לאחר לידה', label: t('serviceForm.doula.workTypes.postpartumSupport') },
    { value: 'תמיכה בהנקה', label: t('serviceForm.doula.workTypes.breastfeedingSupport') },
  ];

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.doula.title')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.availabilityHours')}</label>
          <div className="checkbox-group" data-field="availability_hours">
            {[
              { value: 'morning', label: t('hours.morning') },
              { value: 'afternoon', label: t('hours.afternoon') },
              { value: 'evening', label: t('hours.evening') },
              { value: 'night', label: t('hours.night') },
              { value: '24/7', label: t('hours.twentyFourSeven') },
            ].map(hour => (
              <label key={hour.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_hours?.includes(hour.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.availability_hours || [];
                    const newHours = e.target.checked
                      ? [...current, hour.value]
                      : current.filter(h => h !== hour.value);
                    handleServiceDetailsChange('availability_hours', newHours);
                  }}
                />
                {hour.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.availability_hours'] && <span className="error-text">{errors['serviceDetails.availability_hours']}</span>}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.workTypes')}</label>
          <div className="checkbox-group" data-field="work_types">
            {workTypes.map(type => (
              <label key={type.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.work_types?.includes(type.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.work_types || [];
                    const newTypes = e.target.checked
                      ? [...current, type.value]
                      : current.filter(v => v !== type.value);
                    handleServiceDetailsChange('work_types', newTypes);
                  }}
                />
                {type.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
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
              { value: 'spanish', label: t('languages.spanish') },
              { value: 'french', label: t('languages.french') },
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

export default DoulaForm;
