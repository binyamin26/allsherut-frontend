import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
const AirConditioningForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  
  return (
    <div className="service-details-form">
  <h3>{t('serviceForm.airConditioning.title')}</h3>
      
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
                checked={serviceDetails.work_types?.includes('installation') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'installation']
                    : current.filter(t => t !== 'installation');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
  {t('serviceForm.airConditioning.installation')}
            </label>
            
            {serviceDetails.work_types?.includes('installation') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="installation_types">
               {[
  { value: 'acInstall', key: 'filters.ac.acInstall' },
  { value: 'miniCentralInstall', key: 'filters.ac.miniCentralInstall' },
  { value: 'centralInstall', key: 'filters.ac.centralInstall' },
  { value: 'inverterInstall', key: 'filters.ac.inverterInstall' },
  { value: 'multiInverterInstall', key: 'filters.ac.multiInverterInstall' },
  { value: 'vrfInstall', key: 'filters.ac.vrfInstall' }
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
    {t(type.key)}
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
                checked={serviceDetails.work_types?.includes('repair') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'repair']
                    : current.filter(t => t !== 'repair');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
 {t('serviceForm.airConditioning.repair')}
            </label>
            
            {serviceDetails.work_types?.includes('repair') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="repair_types">
                  {[
  { value: 'acRepair', key: 'filters.ac.acRepair' },
  { value: 'moldyAcRepair', key: 'filters.ac.moldyAcRepair' },
  { value: 'miniCentralRepair', key: 'filters.ac.miniCentralRepair' },
  { value: 'gasLeakRepair', key: 'filters.ac.gasLeakRepair' },
  { value: 'centralRepair', key: 'filters.ac.centralRepair' },
  { value: 'inverterRepair', key: 'filters.ac.inverterRepair' },
  { value: 'vrfRepair', key: 'filters.ac.vrfRepair' },
  { value: 'filterCleaning', key: 'filters.ac.filterCleaning' },
  { value: 'תיקון צ\'ילרים', key: 'filters.ac.chillerRepair' },
  { value: 'coldRoomTech', key: 'filters.ac.coldRoomTech' },
  { value: 'gasRefill', key: 'filters.ac.gasRefill' }
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
                      {t(type.key)}
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
                checked={serviceDetails.work_types?.includes('disassembly') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'disassembly']
                    : current.filter(t => t !== 'disassembly');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
  {t('serviceForm.airConditioning.disassembly')}
            </label>
            
            {serviceDetails.work_types?.includes('disassembly') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="disassembly_types">
                {[
  { value: 'acDisassembly', key: 'filters.ac.acDisassembly' },
  { value: 'miniCentralDisassembly', key: 'filters.ac.miniCentralDisassembly' },
  { value: 'centralDisassembly', key: 'filters.ac.centralDisassembly' },
  { value: 'inverterDisassembly', key: 'filters.ac.inverterDisassembly' },
  { value: 'vrfDisassembly', key: 'filters.ac.vrfDisassembly' }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.disassembly_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.disassembly_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('disassembly_types', newTypes);
      }}
    />
    {t(type.key)}
  </label>
))}
                </div>
                {errors['serviceDetails.disassembly_types'] && <span className="error-text">{errors['serviceDetails.disassembly_types']}</span>}
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

export default AirConditioningForm;