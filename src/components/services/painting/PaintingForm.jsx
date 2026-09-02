import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const PaintingForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
    <h3>{t('serviceForm.painting.title')}</h3>
      
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
          <label className="auth-form-label required">{t('serviceForm.common.workTypes')}</label>
          <div className="checkbox-group" data-field="work_types">
<div className="checkbox-group" data-field="work_types">
  {[
    { value: 'generalPainting', label: t('filters.painting.generalPainting') },
    { value: 'wallRepairs', label: t('filters.painting.wallRepairs') },
    { value: 'wallSmoothing', label: t('filters.painting.wallSmoothing') },
    { value: 'moistureMold', label: t('filters.painting.moistureMold') },
    { value: 'paintStripping', label: t('filters.painting.paintStripping') },
    { value: 'effectPainting', label: t('filters.painting.effectPainting') },
    { value: 'accentWall', label: t('filters.painting.accentWall') },
    { value: 'specialTextures', label: t('filters.painting.specialTextures') }
  ].map(type => (
    <label key={type.value} className="checkbox-item">
      <input
        type="checkbox"
        checked={serviceDetails.work_types?.includes(type.value) || false}
        onChange={(e) => {
          const current = serviceDetails.work_types || [];
          const newTypes = e.target.checked 
            ? [...current, type.value]
            : current.filter(t => t !== type.value);
          handleServiceDetailsChange('work_types', newTypes);
        }}
      />
      {type.label}
    </label>
  ))}
</div>
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

export default PaintingForm;