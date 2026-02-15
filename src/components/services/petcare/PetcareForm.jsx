import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import CustomDropdown from '../../common/CustomDropdown';

const PetcareForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
    <h3>{t('serviceForm.petcare.title')}</h3>
      
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
      <label className="auth-form-label required">{t('serviceForm.petcare.animalTypes')}</label>
<div className="checkbox-group" data-field="animalTypes">
  {[
    { value: 'כלבים', label: t('filters.petcare.dogs') },
    { value: 'חתולים', label: t('filters.petcare.cats') },
    { value: 'ציפורים', label: t('filters.petcare.birds') },
    { value: 'מכרסמים קטנים', label: t('filters.petcare.smallRodents') },
    { value: 'דגים', label: t('filters.petcare.fish') },
    { value: 'זוחלים', label: t('filters.petcare.reptiles') }
  ].map(animal => (
    <label key={animal.value} className="checkbox-item">
      <input
        type="checkbox"
        checked={serviceDetails.animalTypes?.includes(animal.value) || false}
        onChange={(e) => {
          const current = serviceDetails.animalTypes || [];
          const newTypes = e.target.checked 
            ? [...current, animal.value]
            : current.filter(a => a !== animal.value);
          handleServiceDetailsChange('animalTypes', newTypes);
        }}
      />
      {animal.label}
    </label>
  ))}
</div>
          {errors['serviceDetails.animalTypes'] && <span className="error-text">{errors['serviceDetails.animalTypes']}</span>}
        </div>
{serviceDetails.animalTypes?.includes('כלבים') && (
  <div className="input-group">
    <label className="auth-form-label required">{t('serviceForm.petcare.dogSizes')}</label>
    <div className="checkbox-group" data-field="dogSizes">
      {[
        { size: 'קטן', weight: 'עד 10 ק״ג', label: t('filters.petcare.smallDog') },
        { size: 'בינוני', weight: '10–25 ק״ג', label: t('filters.petcare.mediumDog') },
        { size: 'גדול', weight: '25–40 ק״ג', label: t('filters.petcare.largeDog') },
        { size: 'ענק', weight: 'מעל 40 ק״ג', label: t('filters.petcare.giantDog') }
      ].map(({ size, weight, label }) => (
        <label key={size} className="checkbox-item">
          <input
            type="checkbox"
            checked={serviceDetails.dogSizes?.includes(size) || false}
            onChange={(e) => {
              const current = serviceDetails.dogSizes || [];
              const newSizes = e.target.checked 
                ? [...current, size]
                : current.filter(s => s !== size);
              handleServiceDetailsChange('dogSizes', newSizes);
            }}
          />
          {label} / {weight}
        </label>
      ))}
    </div>
    {errors['serviceDetails.dogSizes'] && <span className="error-text">{errors['serviceDetails.dogSizes']}</span>}
  </div>
)}

        <div className="input-group">
        <label className="auth-form-label required">{t('serviceForm.petcare.location')}</label>
<CustomDropdown
  name="location"
  value={serviceDetails.location || ''}
  onChange={(e) => handleServiceDetailsChange('location', e.target.value)}
  placeholder={t('serviceForm.petcare.selectLocation')}
  error={errors['serviceDetails.location']}
  options={[
    { value: 'בבית הלקוח', label: t('filters.petcare.clientHome') },
    { value: 'בבית המטפל', label: t('filters.petcare.caregiverHome') },
    { value: 'שניהם', label: t('filters.common.both') }
  ]}
/>
          {errors['serviceDetails.location'] && <span className="error-text">{errors['serviceDetails.location']}</span>}
        </div>

        <div className="input-group">
          <label>{t('serviceForm.petcare.experience')}</label>
<input
 type="text"
 inputMode="numeric"
 autoComplete="off"
  value={serviceDetails.experience || ''}
onChange={(e) => {
  const numericValue = e.target.value.replace(/\D/g, '');
  handleServiceDetailsChange('experience', numericValue);  // ← 'experience' ici !
}}
  className={`standard-input ${errors['serviceDetails.experience'] ? 'error' : ''}`}
  data-field="experience"
/>
          {errors['serviceDetails.experience'] && <span className="error-text">{errors['serviceDetails.experience']}</span>}
        </div>
        {/* JOURS DE DISPONIBILITÉ */}
<div className="input-group">
  <label className="auth-form-label required">{t('serviceForm.common.availabilityDays')}</label>
  <div className="checkbox-group" data-field="availability_days">
    {[
      { value: 'ראשון', label: t('days.sunday') },
      { value: 'שני', label: t('days.monday') },
      { value: 'שלישי', label: t('days.tuesday') },
      { value: 'רביעי', label: t('days.wednesday') },
      { value: 'חמישי', label: t('days.thursday') },
      { value: 'שישי', label: t('days.friday') },
      { value: 'שבת', label: t('days.saturday') }
    ].map(day => (
      <label key={day.value} className="checkbox-item">
        <input
          type="checkbox"
          checked={serviceDetails.availability_days?.includes(day.value) || false}
          onChange={(e) => {
            const current = serviceDetails.availability_days || [];
            const newDays = e.target.checked 
              ? [...current, day.value]
              : current.filter(d => d !== day.value);
            handleServiceDetailsChange('availability_days', newDays);
          }}
        />
        {day.label}
      </label>
    ))}
  </div>
  {errors['serviceDetails.availability_days'] && <span className="error-text">{errors['serviceDetails.availability_days']}</span>}
</div>

{/* HEURES DE DISPONIBILITÉ */}
<div className="input-group">
  <label className="auth-form-label required">{t('serviceForm.common.availabilityHours')}</label>
  <div className="checkbox-group" data-field="availability_hours">
    {[
      { value: 'בוקר', label: t('hours.morning') },
      { value: 'צהריים', label: t('hours.noon') },
      { value: 'אחר הצהריים', label: t('hours.afternoon') },
      { value: 'ערב', label: t('hours.evening') },
      { value: 'לילה', label: t('hours.night') }
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
      </div>

      <div className="form-section optional">
       <h4>{t('serviceForm.common.optionalFields')}</h4>
        
        <div className="input-group">
         <label>{t('serviceForm.petcare.additionalServices')}</label>
<div className="checkbox-group">
  {[
    { value: 'הליכת כלבים', label: t('filters.petcare.dogWalking') },
    { value: 'רחצה וטיפוח', label: t('filters.petcare.bathingGrooming') },
    { value: 'אילוף בסיסי', label: t('filters.petcare.basicTraining') },
    { value: 'מתן תרופות', label: t('filters.petcare.medicationAdmin') },
    { value: 'האכלה בזמן השמירה', label: t('filters.petcare.feeding') },
    { value: 'ניקוי ארגז חול / כלוב / אקווריום', label: t('filters.petcare.cleaning') },
    { value: 'עדכון תמונות לבעלים', label: t('filters.petcare.photoUpdates') },
    { value: 'שהייה ביום בלבד', label: t('filters.petcare.daytimeOnly') },
    { value: 'לינה ללילה', label: t('filters.petcare.overnight') }
  ].map(service => (
    <label key={service.value} className="checkbox-item">
      <input
        type="checkbox"
        checked={serviceDetails.additionalServices?.includes(service.value) || false}
        onChange={(e) => {
          const current = serviceDetails.additionalServices || [];
          const newServices = e.target.checked 
            ? [...current, service.value]
            : current.filter(s => s !== service.value);
          handleServiceDetailsChange('additionalServices', newServices);
        }}
      />
      {service.label}
    </label>
  ))}
</div>
        </div>

        <div className="input-group">
         <label className="auth-form-label required">{t('serviceForm.petcare.facilities')}</label>
<div className="checkbox-group">
  {[
    { value: 'גינה מגודרת', label: t('filters.petcare.fencedGarden') },
    { value: 'חצר גדולה', label: t('filters.petcare.largeYard') },
    { value: 'מזגן', label: t('filters.petcare.airConditioning') }
  ].map(facility => (
    <label key={facility.value} className="checkbox-item">
      <input
        type="checkbox"
        checked={serviceDetails.facilities?.includes(facility.value) || false}
        onChange={(e) => {
          const current = serviceDetails.facilities || [];
          const newFacilities = e.target.checked 
            ? [...current, facility.value]
            : current.filter(f => f !== facility.value);
          handleServiceDetailsChange('facilities', newFacilities);
        }}
      />
      {facility.label}
    </label>
  ))}
</div>
        </div>

        <div className="input-group">
        <label>{t('serviceForm.petcare.veterinaryServices')}</label>
<div className="checkbox-group">
  {[
    { value: 'ביקור וטרינר', label: t('filters.petcare.vetVisit') },
    { value: 'טיפול בסיסי', label: t('filters.petcare.basicCare') }
  ].map(service => (
    <label key={service.value} className="checkbox-item">
      <input
        type="checkbox"
        checked={serviceDetails.veterinaryServices?.includes(service.value) || false}
        onChange={(e) => {
          const current = serviceDetails.veterinaryServices || [];
          const newServices = e.target.checked 
            ? [...current, service.value]
            : current.filter(s => s !== service.value);
          handleServiceDetailsChange('veterinaryServices', newServices);
        }}
      />
      {service.label}
    </label>
  ))}
</div>
        </div>
      </div>
    </div>
  );
};

export default PetcareForm;