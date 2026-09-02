import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const GardeningForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {

  const { t } = useLanguage();
  return (
    <div className="service-details-form">
     <h3>{t('serviceForm.gardening.title')}</h3>
   
   <div className="form-section">
    <h4>{t('serviceForm.common.requiredFields')}</h4>

        <div className="input-group">
      <label className="auth-form-label required">{t('filters.gardening.serviceTypes')}</label>
          <div className="checkbox-group" data-field="services">
          <label>{t('serviceForm.gardening.services')}</label>
<div className="checkbox-group" data-field="services">
 {[
  { value: 'pruning', label: t('filters.gardening.pruning') },
  { value: 'design', label: t('filters.gardening.design') },
  { value: 'planting', label: t('filters.gardening.planting') },
  { value: 'irrigation', label: t('filters.gardening.irrigation') },
  { value: 'fertilizing', label: t('filters.gardening.fertilizing') },
  { value: 'weeding', label: t('filters.gardening.weeding') },
  { value: 'generalMaintenance', label: t('filters.gardening.generalMaintenance') }
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
         <label className="auth-form-label required">{t('serviceForm.gardening.seasons')}</label>
<div className="checkbox-group" data-field="seasons">
{[
  { value: 'allYear', label: t('filters.gardening.allYear') },
  { value: 'spring', label: t('filters.gardening.spring') },
  { value: 'summer', label: t('filters.gardening.summer') },
  { value: 'autumn', label: t('filters.gardening.autumn') },
  { value: 'winter', label: t('filters.gardening.winter') }
].map(season => (
  <label key={season.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.seasons?.includes(season.value) || false}
      onChange={() => handleExclusiveCheckbox('seasons', season.value, 'allYear', ['spring', 'summer', 'autumn', 'winter'])}
    />
    {season.label}
  </label>
))}
</div>
          {errors['serviceDetails.seasons'] && <span className="error-text">{errors['serviceDetails.seasons']}</span>}
        </div>
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
        <label className="auth-form-label required">{t('serviceForm.gardening.equipment')}</label>
<div className="checkbox-group" data-field="equipment">
{[
  { value: 'lawnMower', label: t('filters.gardening.lawnMower') },
  { value: 'pruningShears', label: t('filters.gardening.pruningShears') },
  { value: 'waterPump', label: t('filters.gardening.waterPump') },
  { value: 'handTools', label: t('filters.gardening.handTools') },
  { value: 'fertilizerSpreader', label: t('filters.gardening.fertilizerSpreader') },
  { value: 'irrigationSystem', label: t('filters.gardening.irrigationSystem') }
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
        <label>{t('serviceForm.gardening.specializations')}</label>
<div className="checkbox-group">
 {[
  { value: 'gardenerTypeA', label: t('filters.gardening.gardenerTypeA') },
  { value: 'gardenerTypeB', label: t('filters.gardening.gardenerTypeB') },
  { value: 'agronomist', label: t('filters.gardening.agronomist') },
  { value: 'expertPruner', label: t('filters.gardening.expertPruner') }
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
  { value: 'wasteRemoval', label: t('filters.gardening.wasteRemoval') },
  { value: 'landscapeConsulting', label: t('filters.gardening.landscapeConsulting') }
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