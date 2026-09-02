import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const GasTechnicianForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
     <h3>{t('serviceForm.gas.title')}</h3>
      
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
                checked={serviceDetails.work_types?.includes('pipeInstallation') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'pipeInstallation']
                    : current.filter(t => t !== 'pipeInstallation');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.gas.installation')}
            </label>
            
            {serviceDetails.work_types?.includes('pipeInstallation') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="installation_types">
                 {[
  { value: 'gasPointInstall', label: t('filters.gas.gasPointInstall') },
  { value: 'stovetopInstall', label: t('filters.gas.stovetopInstall') },
  { value: 'pipeInstall', label: t('filters.gas.pipeInstall') },
  { value: 'grillInstall', label: t('filters.gas.grillInstall') },
  { value: 'waterHeaterInstall', label: t('filters.gas.waterHeaterInstall') },
  { value: 'hagaz', label: t('filters.gas.hagaz') },
  { value: 'newBuildingInfra', label: t('filters.gas.newBuildingInfra') },
  { value: 'businessServices', label: t('filters.gas.businessServices') }
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
                checked={serviceDetails.work_types?.includes('repairs') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'repairs']
                    : current.filter(t => t !== 'repairs');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.gas.repairs')}
            </label>
            
            {serviceDetails.work_types?.includes('repairs') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="repair_types">
                 {[
  { value: 'stovetopRepair', label: t('filters.gas.stovetopRepair') },
  { value: 'pipeRepair', label: t('filters.gas.pipeRepair') }
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

          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.gas.licenseType')}</label>
          <div className="checkbox-group" data-field="license_type">
            {[
              { value: 'licenseLevel1', label: t('serviceForm.gas.licenseLevel1') },
              { value: 'licenseLevel2', label: t('serviceForm.gas.licenseLevel2') }
            ].map(level => (
              <label key={level.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.license_type?.includes(level.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.license_type || [];
                    const newTypes = e.target.checked
                      ? [...current, level.value]
                      : current.filter(v => v !== level.value);
                    handleServiceDetailsChange('license_type', newTypes);
                  }}
                />
                {level.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.license_type'] && <span className="error-text">{errors['serviceDetails.license_type']}</span>}
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

export default GasTechnicianForm;