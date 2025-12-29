import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const EldercareForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
    
    const careTypes = [
      { key: 'companionship', label: t('serviceForm.eldercare.careTypes.companionship') },
      { key: 'houseCleaning', label: t('serviceForm.eldercare.careTypes.houseCleaning') },
      { key: 'cooking', label: t('serviceForm.eldercare.careTypes.cooking') },
      { key: 'shopping', label: t('serviceForm.eldercare.careTypes.shopping') },
      { key: 'medication', label: t('serviceForm.eldercare.careTypes.medication') },
      { key: 'doctorVisits', label: t('serviceForm.eldercare.careTypes.doctorVisits') }
    ];

    const specialConditions = [
      { key: 'alzheimer', label: t('serviceForm.eldercare.conditions.alzheimer') },
      { key: 'parkinson', label: t('serviceForm.eldercare.conditions.parkinson') },
      { key: 'diabetes', label: t('serviceForm.eldercare.conditions.diabetes') },
      { key: 'mobility', label: t('serviceForm.eldercare.conditions.mobility') },
      { key: 'dementia', label: t('serviceForm.eldercare.conditions.dementia') }
    ];

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.eldercare.title')}</h3>
      
      <div className="form-section">
        {t('serviceForm.common.requiredFields')}
        
        <div className="input-group">
          <label>{t('serviceForm.eldercare.careTypesLabel')}</label>
          <div className="checkbox-group" data-field="careTypes">
            {careTypes.map(type => (
              <label key={type.key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.careTypes?.includes(type.key) || false}
                  onChange={(e) => {
                    const current = serviceDetails.careTypes || [];
                    const newTypes = e.target.checked 
                      ? [...current, type.key]
                      : current.filter(t => t !== type.key);
                    handleServiceDetailsChange('careTypes', newTypes);
                  }}
                />
                {type.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.careTypes'] && <span className="error-text">{errors['serviceDetails.careTypes']}</span>}
        </div>

        <div className="input-group">
          <label>{t('serviceForm.eldercare.certification')}</label>
          <input
            type="text"
             inputMode="numeric"
            value={serviceDetails.certification || ''}
            onChange={(e) => handleServiceDetailsChange('certification', e.target.value)}
            placeholder={t('serviceForm.eldercare.certificationPlaceholder')}
            className={`standard-input ${errors['serviceDetails.certification'] ? 'error' : ''}`}
            data-field="certification"
          />
          {errors['serviceDetails.certification'] && <span className="error-text">{errors['serviceDetails.certification']}</span>}
        </div>

<div className="input-group">
          <label>{t('serviceForm.eldercare.availability')}</label>
          <div className="checkbox-group" data-field="availability_hours">
            {[
              { value: 'בוקר', label: t('hours.morning') },
              { value: 'צהריים', label: t('hours.noon') },
              { value: 'אחר הצהריים', label: t('hours.afternoon') },
              { value: 'ערב', label: t('hours.evening') },
              { value: 'לילה', label: t('hours.night') },
              { value: '24/7', label: t('hours.twentyFourSeven') }
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
          <label>{t('serviceForm.eldercare.experience')}</label>
          <input
           type="text"
 inputMode="numeric"
 autoComplete="off"
            value={serviceDetails.experience || ''}
        onChange={(e) => {
  const numericValue = e.target.value.replace(/\D/g, '');
  handleServiceDetailsChange('experience', numericValue);
}}
            className={`standard-input ${errors['serviceDetails.experience'] ? 'error' : ''}`}
            data-field="experience"
          />
          {errors['serviceDetails.experience'] && <span className="error-text">{errors['serviceDetails.experience']}</span>}
        </div>

        <div className="input-group">
          <label>{t('serviceForm.eldercare.languages')}</label>
          <div className="checkbox-group" data-field="languages">
            {[
              { value: 'עברית', label: t('languages.hebrew') },
              { value: 'ערבית', label: t('languages.arabic') },
              { value: 'רוסית', label: t('languages.russian') },
              { value: 'אנגלית', label: t('languages.english') },
              { value: 'ספרדית', label: t('languages.spanish') },
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
        </div>

        <div className="input-group">
          <label>{t('filters.eldercare.administrativeHelp')}</label>
          <select
            value={serviceDetails.administrativeHelp || ''}
            onChange={(e) => handleServiceDetailsChange('administrativeHelp', e.target.value)}
            className="standard-input"
            data-field="administrativeHelp"
          >
            <option value="">{t('filters.noMatter')}</option>
            <option value="yes">{t('common.yes')}</option>
            <option value="no">{t('common.no')}</option>
          </select>
        </div>

        <div className="input-group">
          <label>{t('filters.eldercare.medicalAccompaniment')}</label>
          <select
            value={serviceDetails.medicalAccompaniment || ''}
            onChange={(e) => handleServiceDetailsChange('medicalAccompaniment', e.target.value)}
            className="standard-input"
            data-field="medicalAccompaniment"
          >
            <option value="">{t('filters.noMatter')}</option>
            <option value="yes">{t('common.yes')}</option>
            <option value="no">{t('common.no')}</option>
          </select>
        </div>

        <div className="input-group">
          <label>{t('filters.eldercare.vehicleForOutings')}</label>
          <select
            value={serviceDetails.vehicleForOutings || ''}
            onChange={(e) => handleServiceDetailsChange('vehicleForOutings', e.target.value)}
            className="standard-input"
            data-field="vehicleForOutings"
          >
            <option value="">{t('filters.noMatter')}</option>
            <option value="yes">{t('common.yes')}</option>
            <option value="no">{t('common.no')}</option>
          </select>
        </div>
      </div>

      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>
        
        <div className="input-group">
          <label>{t('serviceForm.eldercare.specialConditions')}</label>
          <div className="checkbox-group">
            {specialConditions.map(condition => (
              <label key={condition.key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.specialConditions?.includes(condition.key) || false}
                  onChange={(e) => {
                    const current = serviceDetails.specialConditions || [];
                    const newConditions = e.target.checked 
                      ? [...current, condition.key]
                      : current.filter(c => c !== condition.key);
                    handleServiceDetailsChange('specialConditions', newConditions);
                  }}
                />
                {condition.label}
              </label>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>{t('serviceForm.eldercare.languages')}</label>
          <input
            type="text"
            autoComplete="off"
            value={serviceDetails.languages || ''}
            onChange={(e) => handleServiceDetailsChange('languages', e.target.value)}
            placeholder={t('serviceForm.eldercare.languagesPlaceholder')}
            className="standard-input"
          />
        </div>
      </div>
    </div>
  );
};

export default EldercareForm;