import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const ElectricianForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.electrician.title')}</h3>
      
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
          
          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('repairs') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'repairs']
                    : current.filter(t => t !== 'repairs');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.electrician.repairs')}
            </label>
            
            {serviceDetails.work_types?.includes('repairs') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="repair_types">
                 {[
  { value: 'shortCircuitRepair', label: t('filters.electrician.shortCircuitRepair') },
  { value: 'timerRepair', label: t('filters.electrician.timerRepair') },
  { value: 'panelRepair', label: t('filters.electrician.panelRepair') },
  { value: 'outletReplacement', label: t('filters.electrician.outletReplacement') },
  { value: 'spotlightRepair', label: t('filters.electrician.spotlightRepair') },
  { value: 'otherRepairs', label: t('filters.electrician.otherRepairs') },
  { value: 'stairwaySwitch', label: t('filters.electrician.stairwaySwitch') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.repair_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.repair_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('repair_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.repair_types'] && <span className="error-text">{errors['serviceDetails.repair_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('installations') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'installations']
                    : current.filter(t => t !== 'installations');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('serviceForm.electrician.installations')}
            </label>
            
            {serviceDetails.work_types?.includes('installations') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="installation_types">
               {[
  { value: 'ceilingFan', label: t('filters.electrician.ceilingFan') },
  { value: 'outletInstall', label: t('filters.electrician.outletInstall') },
  { value: 'newOutlet', label: t('filters.electrician.newOutlet') },
  { value: 'waterHeater', label: t('filters.electrician.waterHeater') },
  { value: 'switchInstall', label: t('filters.electrician.switchInstall') },
  { value: 'evCharger', label: t('filters.electrician.evCharger') },
  { value: 'shabbatTimer', label: t('filters.electrician.shabbatTimer') },
  { value: 'otherInstall', label: t('filters.electrician.otherInstall') },
  { value: 'evMeter', label: t('filters.electrician.evMeter') },
  { value: 'inductionCooktop', label: t('filters.electrician.inductionCooktop') },
  { value: 'bathroomHeater', label: t('filters.electrician.bathroomHeater') },
  { value: 'generator', label: t('filters.electrician.generator') },
  { value: 'ventaInstall', label: t('filters.electrician.ventaInstall') },
  { value: 'evEdge', label: t('filters.electrician.evEdge') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.installation_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.installation_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('installation_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.installation_types'] && <span className="error-text">{errors['serviceDetails.installation_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('largeElectricalWork') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'largeElectricalWork']
                    : current.filter(t => t !== 'largeElectricalWork');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.electrician.largeWork')}
            </label>
            
            {serviceDetails.work_types?.includes('largeElectricalWork') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="large_work_types">
                 {[
  { value: 'newInfrastructure', label: t('filters.electrician.newInfrastructure') },
  { value: 'replaceInfrastructure', label: t('filters.electrician.replaceInfrastructure') },
  { value: 'panelReplacement', label: t('filters.electrician.panelReplacement') },
  { value: 'grounding', label: t('filters.electrician.grounding') },
  { value: 'threePhase', label: t('filters.electrician.threePhase') },
  { value: 'inspection', label: t('filters.electrician.inspection') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.large_work_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.large_work_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('large_work_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.large_work_types'] && <span className="error-text">{errors['serviceDetails.large_work_types']}</span>}
              </div>
            )}
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

export default ElectricianForm;