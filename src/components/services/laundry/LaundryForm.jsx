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

     {/* ✅ AGE */}
        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.age')}</label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={serviceDetails.age || ''}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '');
              handleServiceDetailsChange('age', numericValue);
            }}
            className={`standard-input ${errors['serviceDetails.age'] ? 'error' : ''}`}
            data-field="age"
          />
          {errors['serviceDetails.age'] && <span className="error-text">{errors['serviceDetails.age']}</span>}
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
            className={`standard-input ${errors['serviceDetails.experience'] ? 'error' : ''}`}
            data-field="experience"
          />
          {errors['serviceDetails.experience'] && <span className="error-text">{errors['serviceDetails.experience']}</span>}
        </div>
        
        <div className="input-group">
         <label className="auth-form-label required">{t('serviceForm.laundry.serviceTypes')}</label>
<div className="checkbox-group" data-field="laundryTypes">
  {[
    { value: 'גיהוץ בבית הלקוח', label: t('filters.laundry.ironingAtHome') },
    { value: 'איסוף והחזרת כביסה (שירות משלוחים)', label: t('filters.laundry.pickupDelivery') },
    { value: 'ניקוי יבש / שירות מכבסה', label: t('filters.laundry.dryCleaning') },
    { value: 'כביסת מצעים, מגבות, וילונות', label: t('filters.laundry.linens') },
    { value: 'כביסה תעשייתית (מלונות, מסעדות)', label: t('filters.laundry.industrial') }
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
         <label className="auth-form-label required">{t('serviceForm.laundry.availabilityDays')}</label>
          <div className="checkbox-group">
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
        </div>

        <div className="input-group">
       <label className="auth-form-label required">{t('serviceForm.laundry.availabilityHours')}</label>
          <div className="checkbox-group">
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