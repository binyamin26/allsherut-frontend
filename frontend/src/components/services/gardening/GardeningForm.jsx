import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const GardeningForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
     <h3>{t('serviceForm.gardening.title')}</h3>
   
   <div className="form-section">
     {t('serviceForm.common.requiredFields')}

        <div className="input-group">
          <label>{t('serviceForm.common.experience')}</label>
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
      <label>{t('filters.gardening.serviceTypes')}</label>
          <div className="checkbox-group" data-field="services">
          <label>{t('serviceForm.gardening.services')}</label>
<div className="checkbox-group" data-field="services">
 {[
  { value: 'גיזום עצים ושיחים', label: t('filters.gardening.pruning') },
  { value: 'עיצוב גינה', label: t('filters.gardening.design') },
  { value: 'שתילת צמחים', label: t('filters.gardening.planting') },
  { value: 'השקיה', label: t('filters.gardening.irrigation') },
  { value: 'דישון', label: t('filters.gardening.fertilizing') },
  { value: 'ניכוש עשבים', label: t('filters.gardening.weeding') },
  { value: 'תחזוקה כללית', label: t('filters.gardening.generalMaintenance') }
].map(service => (
  <label key={service.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.services?.includes(service.value) || false}
      onChange={(e) => {
        const current = serviceDetails.services || [];
        const newServices = e.target.checked 
          ? [...current, service.value]
          : current.filter(s => s !== service.value);
        handleServiceDetailsChange('services', newServices);
      }}
    />
    {service.label}
  </label>
))}
</div>
          </div>
          {errors['serviceDetails.services'] && <span className="error-text">{errors['serviceDetails.services']}</span>}
        </div>

          <div className="input-group">
         <label>{t('serviceForm.gardening.rate')}</label>
<input
  type="text"
   inputMode="numeric"
   autoComplete="off"
  value={serviceDetails.rate || ''}
  onChange={(e) => handleServiceDetailsChange('rate', e.target.value)}
  placeholder={t('serviceForm.gardening.ratePlaceholder')}
  className={`standard-input ${errors['serviceDetails.rate'] ? 'error' : ''}`}
  data-field="rate"
/>
          {errors['serviceDetails.rate'] && <span className="error-text">{errors['serviceDetails.rate']}</span>}
        </div>

        <div className="input-group">
         <label>{t('serviceForm.gardening.seasons')}</label>
<div className="checkbox-group" data-field="seasons">
{[
  { value: 'כל השנה', label: t('filters.gardening.allYear') },
  { value: 'אביב', label: t('filters.gardening.spring') },
  { value: 'קיץ', label: t('filters.gardening.summer') },
  { value: 'סתיו', label: t('filters.gardening.autumn') },
  { value: 'חורף', label: t('filters.gardening.winter') }
].map(season => (
  <label key={season.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.seasons?.includes(season.value) || false}
      onChange={() => handleExclusiveCheckbox('seasons', season.value, 'כל השנה', ['אביב', 'קיץ', 'סתיו', 'חורף'])}
    />
    {season.label}
  </label>
))}
</div>
          {errors['serviceDetails.seasons'] && <span className="error-text">{errors['serviceDetails.seasons']}</span>}
        </div>
<div className="input-group">
          <label>{t('serviceForm.common.availabilityDays')}</label>
          <div className="checkbox-group" data-field="availability_days">
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
          {errors['serviceDetails.availability_days'] && <span className="error-text">{errors['serviceDetails.availability_days']}</span>}
        </div>

        <div className="input-group">
                   <label>{t('serviceForm.common.availabilityHours')}</label>
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
        <label>{t('serviceForm.gardening.equipment')}</label>
<div className="checkbox-group" data-field="equipment">
{[
  { value: 'מכסחת דשא', label: t('filters.gardening.lawnMower') },
  { value: 'מזמרות גיזום', label: t('filters.gardening.pruningShears') },
  { value: 'משאבת מים', label: t('filters.gardening.waterPump') },
  { value: 'כלים ידניים', label: t('filters.gardening.handTools') },
  { value: 'מפזר דשן', label: t('filters.gardening.fertilizerSpreader') },
  { value: 'מערכת השקיה', label: t('filters.gardening.irrigationSystem') }
].map(equipment => (
  <label key={equipment.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.equipment?.includes(equipment.value) || false}
      onChange={(e) => {
        const current = serviceDetails.equipment || [];
        const newEquipment = e.target.checked 
          ? [...current, equipment.value]
          : current.filter(eq => eq !== equipment.value);
        handleServiceDetailsChange('equipment', newEquipment);
      }}
    />
    {equipment.label}
  </label>
))}
</div>
          {errors['serviceDetails.equipment'] && <span className="error-text">{errors['serviceDetails.equipment']}</span>}
        </div>
      </div>

      <div className="form-section optional">
      <h4>{t('serviceForm.common.optionalFields')}</h4>
        
        <div className="input-group">
        <label>{t('serviceForm.gardening.specializations')}</label>
<div className="checkbox-group">
 {[
  { value: 'הכשרה גנן סוג א', label: t('filters.gardening.gardenerTypeA') },
  { value: 'הכשרה גנן סוג ב', label: t('filters.gardening.gardenerTypeB') },
  { value: 'אילני אגרונום', label: t('filters.gardening.agronomist') },
  { value: 'גוזם מומחה', label: t('filters.gardening.expertPruner') }
].map(spec => (
  <label key={spec.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.specializations?.includes(spec.value) || false}
      onChange={(e) => {
        const current = serviceDetails.specializations || [];
        const newSpecs = e.target.checked 
          ? [...current, spec.value]
          : current.filter(s => s !== spec.value);
        handleServiceDetailsChange('specializations', newSpecs);
      }}
    />
    {spec.label}
  </label>
))}
</div>
        </div>

        <div className="input-group">
         <label>{t('serviceForm.gardening.additionalServices')}</label>
<div className="checkbox-group">
  {[
  { value: 'פינוי פסולת גינה', label: t('filters.gardening.wasteRemoval') },
  { value: 'ייעוץ עיצוב נוף', label: t('filters.gardening.landscapeConsulting') }
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
      </div>
    </div>
  );
};

export default GardeningForm;