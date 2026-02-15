import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import CustomDropdown from '../../common/CustomDropdown';

const CleaningForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.cleaning.title')}</h3>
      
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
        <label className="auth-form-label required">{t('serviceForm.cleaning.legalStatus')}</label>
<CustomDropdown
  name="legalStatus"
  value={serviceDetails.legalStatus || ''}
  onChange={(e) => handleServiceDetailsChange('legalStatus', e.target.value)}
  placeholder={t('serviceForm.common.selectStatus')}
  error={errors['serviceDetails.legalStatus']}
  options={[
    { value: 'חברה', label: t('serviceForm.cleaning.company') },
    { value: 'עצמאי', label: t('serviceForm.cleaning.selfEmployed') }
  ]}
/>
       {errors['serviceDetails.legalStatus'] && <span className="error-text">{errors['serviceDetails.legalStatus']}</span>}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.experience')}</label>
          <input
            type="text"
            autoComplete="off"
            inputMode="numeric"
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
          <label className="auth-form-label required">{t('serviceForm.cleaning.hourlyRate')}</label>
<input
 type="text"
 autoComplete="off"
 inputMode="numeric"
  value={serviceDetails.hourlyRate || ''}
onChange={(e) => {
  const numericValue = e.target.value.replace(/\D/g, '');
  handleServiceDetailsChange('hourlyRate', numericValue);  // ← 'hourlyRate' ici !
}}
  className={`standard-input ${errors['serviceDetails.hourlyRate'] ? 'error' : ''}`}
  data-field="hourlyRate"
  min="0"
  placeholder={t('serviceForm.cleaning.hourlyRatePlaceholder')}
/>
          {errors['serviceDetails.hourlyRate'] && <span className="error-text">{errors['serviceDetails.hourlyRate']}</span>}
        </div>

        <div className="input-group">
     <label className="auth-form-label required">{t('serviceForm.cleaning.cleaningCategories')}</label>
          
          <div className="category-group">
         <h5 className="category-title">{t('serviceForm.cleaning.homeCleaning')}</h5>
<div className="checkbox-group">
  {[
    { value: 'ניקיון שוטף', label: t('filters.cleaning.regularCleaning') },
    { value: 'ניקיון פסח', label: t('filters.cleaning.passoverCleaning') },
    { value: 'ניקיון אחרי שיפוץ', label: t('filters.cleaning.postRenovation') },
    { value: 'ניקיון לדירות Airbnb', label: t('filters.cleaning.airbnb') }
  ].map(type => (
    <label key={type.value} className="checkbox-item">
      <input
        type="checkbox"
        checked={serviceDetails.cleaningTypes?.includes(type.value) || false}
        onChange={(e) => {
          const current = serviceDetails.cleaningTypes || [];
          const newTypes = e.target.checked 
            ? [...current, type.value]
            : current.filter(t => t !== type.value);
          handleServiceDetailsChange('cleaningTypes', newTypes);
        }}
      />
      {type.label}
    </label>
  ))}
</div>
          </div>

          <div className="category-group">
        <h5 className="category-title">{t('serviceForm.cleaning.officeCleaning')}</h5>
<div className="checkbox-group">
  {[
    { value: 'משרדים', label: t('filters.cleaning.offices') },
    { value: 'חנויות', label: t('filters.cleaning.stores') },
    { value: 'בניינים', label: t('filters.cleaning.buildings') },
    { value: 'מוסדות חינוך', label: t('filters.cleaning.educationalInstitutions') },
    { value: 'מפעלים', label: t('filters.cleaning.factories') }
  ].map(type => (
    <label key={type.value} className="checkbox-item">
      <input
        type="checkbox"
        checked={serviceDetails.cleaningTypes?.includes(type.value) || false}
        onChange={(e) => {
          const current = serviceDetails.cleaningTypes || [];
          const newTypes = e.target.checked 
            ? [...current, type.value]
            : current.filter(t => t !== type.value);
          handleServiceDetailsChange('cleaningTypes', newTypes);
        }}
      />
      {type.label}
    </label>
  ))}
</div>
          </div>

          <div className="category-group">
       <h5 className="category-title">{t('serviceForm.cleaning.specialCleaning')}</h5>
<div className="checkbox-group">
  {[
    { value: 'ניקוי חלונות', label: t('filters.cleaning.highWindows') },
    { value: 'ניקוי מזגן', label: t('filters.cleaning.acCleaning') },
    { value: 'ריסוס (נגד חרקים)', label: t('filters.cleaning.pestControl') },
    { value: 'ניקיון גגות רעפים', label: t('filters.cleaning.roofCleaning') },
    { value: 'ניקוי שטיחים וספות', label: t('filters.cleaning.carpetsSofas') },
    { value: 'ניקוי וילונות', label: t('filters.cleaning.curtains') },
    { value: 'ניקוי בלחץ מים (טרסות, חזיתות)', label: t('filters.cleaning.pressureWashing') },
    { value: 'חיטוי וניקיון אחרי נזק (שריפה / הצפה)', label: t('filters.cleaning.damageCleanup') }
  ].map(type => (
    <label key={type.value} className="checkbox-item">
      <input
        type="checkbox"
        checked={serviceDetails.cleaningTypes?.includes(type.value) || false}
        onChange={(e) => {
          const current = serviceDetails.cleaningTypes || [];
          const newTypes = e.target.checked 
            ? [...current, type.value]
            : current.filter(t => t !== type.value);
          handleServiceDetailsChange('cleaningTypes', newTypes);
        }}
      />
      {type.label}
    </label>
  ))}
</div>
          </div>

          <div className="category-group">
        <h5 className="category-title">{t('filters.cleaning.materialsProvided')}</h5>
<div className="checkbox-group">
  {[
    { value: 'yes', label: t('filters.cleaning.providesEquipment') },
    { value: 'no', label: t('filters.cleaning.noEquipment') },
    { value: 'partial', label: t('filters.cleaning.partialEquipment') }
  ].map(option => (
    <label key={option.value} className="checkbox-item">
      <input
        type="checkbox"
        checked={serviceDetails.materialsProvided === option.value}
        onChange={() => handleServiceDetailsChange('materialsProvided', option.value)}
      />
      {option.label}
    </label>
  ))}
</div>
          </div>

          <div className="category-group">
        <h5 className="category-title">{t('serviceForm.cleaning.additionalServices')}</h5>
<div className="checkbox-group">
  {[
    { value: 'ניקוי רכב בבית הלקוח', label: t('filters.cleaning.carCleaning') },
    { value: 'ניקוי פאנלים סולאריים', label: t('filters.cleaning.solarPanels') }
  ].map(type => (
    <label key={type.value} className="checkbox-item">
      <input
        type="checkbox"
        checked={serviceDetails.cleaningTypes?.includes(type.value) || false}
        onChange={(e) => {
          const current = serviceDetails.cleaningTypes || [];
          const newTypes = e.target.checked 
            ? [...current, type.value]
            : current.filter(t => t !== type.value);
          handleServiceDetailsChange('cleaningTypes', newTypes);
        }}
      />
      {type.label}
    </label>
  ))}
</div>
          </div>
          
          {errors['serviceDetails.cleaningTypes'] && <span className="error-text">{errors['serviceDetails.cleaningTypes']}</span>}
        </div>

     <div className="input-group">
<label className="auth-form-label required">{t('serviceForm.cleaning.availability')}</label>
  
  <div className="availability-subsection">
 <h5 className="subsection-title">{t('serviceForm.cleaning.frequency')}</h5>
<div className="checkbox-group">
  {[
    { value: 'חד פעמי', label: t('filters.cleaning.oneTime') },
    { value: 'שבועי', label: t('filters.cleaning.weekly') },
    { value: 'דו-שבועי', label: t('filters.cleaning.biweekly') },
    { value: 'חודשי', label: t('filters.cleaning.monthly') }
  ].map(freq => (
    <label key={freq.value} className="checkbox-item">
      <input
        type="checkbox"
        checked={serviceDetails.frequency === freq.value}
        onChange={() => handleServiceDetailsChange('frequency', freq.value)}
      />
      {freq.label}
    </label>
  ))}
</div>
    {errors['serviceDetails.frequency'] && <span className="error-text">{errors['serviceDetails.frequency']}</span>}
  </div>

  <div className="availability-subsection">
   <h5 className="subsection-title">{t('serviceForm.cleaning.days')}</h5>
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

  <div className="availability-subsection">
  <h5 className="subsection-title">{t('serviceForm.cleaning.hours')}</h5>
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
      </div>
    </div>
  );
};

export default CleaningForm;