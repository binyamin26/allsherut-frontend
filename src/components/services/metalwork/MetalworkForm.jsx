import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const WORK_TYPES = [
  { value: 'סורגים',          key: 'serviceForm.metalwork.bars' },
  { value: 'מעקות',           key: 'serviceForm.metalwork.railings' },
  { value: 'גדרות',           key: 'serviceForm.metalwork.fences' },
  { value: 'גלריות',          key: 'serviceForm.metalwork.galleries' },
  { value: 'מרפסות תלויות',   key: 'serviceForm.metalwork.hangingBalconies' },
  { value: 'מדרגות',          key: 'serviceForm.metalwork.stairs' },
];

const HOURS = ['בוקר', 'אחר הצהריים', 'ערב', 'הכל'];

const MetalworkForm = ({ serviceDetails, errors, handleServiceDetailsChange }) => {
  const { t } = useLanguage();

  const toggleWorkType = (value) => {
    const current = serviceDetails.work_types || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    handleServiceDetailsChange('work_types', updated);
  };

  const toggleHour = (hour) => {
    const current = serviceDetails.availability_hours || [];
    const updated = current.includes(hour)
      ? current.filter(h => h !== hour)
      : [...current, hour];
    handleServiceDetailsChange('availability_hours', updated);
  };

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.metalwork.title')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.workTypes')}</label>
          <div className="checkbox-group" data-field="work_types">
            {WORK_TYPES.map(type => (
              <label key={type.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.work_types?.includes(type.value) || false}
                  onChange={() => toggleWorkType(type.value)}
                />
                {t(type.key)}
              </label>
            ))}
          </div>
          {errors['serviceDetails.work_types'] && (
            <span className="error-text">{errors['serviceDetails.work_types']}</span>
          )}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.availabilityHours')}</label>
          <div className="checkbox-group" data-field="availability_hours">
            {HOURS.map(hour => (
              <label key={hour} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_hours?.includes(hour) || false}
                  onChange={() => toggleHour(hour)}
                />
                {hour}
              </label>
            ))}
          </div>
          {errors['serviceDetails.availability_hours'] && (
            <span className="error-text">{errors['serviceDetails.availability_hours']}</span>
          )}
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
              { value: 'עברית', label: t('languages.hebrew') },
              { value: 'רוסית', label: t('languages.russian') },
              { value: 'אנגלית', label: t('languages.english') },
              { value: 'צרפתית', label: t('languages.french') }
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

export default MetalworkForm;
