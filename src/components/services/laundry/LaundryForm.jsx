import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import CustomDropdown from '../../common/CustomDropdown';

const LaundryForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
   <h3>{t('serviceForm.laundry.title')}</h3>
   
   <div className="form-section">
     <h4>{t('serviceForm.common.requiredFields')}</h4>

        <div className="input-group">
         <label className="auth-form-label required">{t('serviceForm.laundry.serviceTypes')}</label>
<div className="checkbox-group" data-field="laundryTypes">
  {[
    { value: 'pickupDelivery', label: t('filters.laundry.pickupDelivery') },
    { value: 'dryCleaning', label: t('filters.laundry.dryCleaning') },
    { value: 'linens', label: t('filters.laundry.linens') },
    { value: 'industrial', label: t('filters.laundry.industrial') }
  ].map(type => (
    <label key={type.value} className="checkbox-item">
      <input
        type="checkbox"
        checked={serviceDetails.laundryTypes?.includes(type.value) || false}
        onChange={(e) => {
          const current = serviceDetails.laundryTypes || [];
          const newTypes = e.target.checked 
            ? [...current, type.value]
            : current.filter(t => t !== type.value);
          handleServiceDetailsChange('laundryTypes', newTypes);
        }}
      />
      {type.label}
    </label>
  ))}
</div>
          {errors['serviceDetails.laundryTypes'] && <span className="error-text">{errors['serviceDetails.laundryTypes']}</span>}
        </div>

        <div className="input-group">
       <label className="auth-form-label required">{t('serviceForm.laundry.availabilityHours')}</label>
          <div className="checkbox-group">
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
         <label>{t('serviceForm.laundry.pickupService')}</label>
<CustomDropdown
  name="pickupService"
  value={serviceDetails.pickupService || ''}
  onChange={(e) => handleServiceDetailsChange('pickupService', e.target.value)}
  placeholder={t('serviceForm.laundry.selectOption')}
  options={[
    { value: 'yes', label: t('serviceForm.laundry.providesPickup') },
    { value: 'no', label: t('serviceForm.laundry.noPickup') }
  ]}
/>
        </div>
      </div>
    </div>
  );
};

export default LaundryForm;