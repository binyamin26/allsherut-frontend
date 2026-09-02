import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const LocksmithForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
    <h3>{t('serviceForm.locksmith.title')}</h3>
      
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
                checked={serviceDetails.work_types?.includes('lockReplacement') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'lockReplacement']
                    : current.filter(t => t !== 'lockReplacement');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.locksmith.lockReplacement')}
            </label>
            
            {serviceDetails.work_types?.includes('lockReplacement') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="lock_replacement_types">
              {[
  { value: 'cylinderLock', label: t('filters.locksmith.cylinderLock') },
  { value: 'securityLock', label: t('filters.locksmith.securityLock') },
  { value: 'entranceLock', label: t('filters.locksmith.entranceLock') },
  { value: 'officeLock', label: t('filters.locksmith.officeLock') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.lock_replacement_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.lock_replacement_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('lock_replacement_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.lock_replacement_types'] && <span className="error-text">{errors['serviceDetails.lock_replacement_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('emergencyOpening') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'emergencyOpening']
                    : current.filter(t => t !== 'emergencyOpening');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
        {t('serviceForm.locksmith.doorOpening')}
            </label>
            
            {serviceDetails.work_types?.includes('emergencyOpening') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="door_opening_types">
             {[
  { value: 'noDamageOpening', label: t('filters.locksmith.noDamageOpening') },
  { value: 'emergency247', label: t('filters.locksmith.emergency247') },
  { value: 'safeOpening', label: t('filters.locksmith.safeOpening') },
  { value: 'keyDuplication', label: t('filters.locksmith.keyDuplication') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.door_opening_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.door_opening_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('door_opening_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.door_opening_types'] && <span className="error-text">{errors['serviceDetails.door_opening_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('advancedSystems') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'advancedSystems']
                    : current.filter(t => t !== 'advancedSystems');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.locksmith.lockSystemInstallation')}
            </label>
            
            {serviceDetails.work_types?.includes('advancedSystems') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="lock_system_installation_types">
              {[
  { value: 'smartLocks', label: t('filters.locksmith.smartLocks') },
  { value: 'intercom', label: t('filters.locksmith.intercom') },
  { value: 'accessCode', label: t('filters.locksmith.accessCode') },
  { value: 'electronicLock', label: t('filters.locksmith.electronicLock') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.lock_system_installation_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.lock_system_installation_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('lock_system_installation_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.lock_system_installation_types'] && <span className="error-text">{errors['serviceDetails.lock_system_installation_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('doorRepair') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'doorRepair']
                    : current.filter(t => t !== 'doorRepair');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.locksmith.lockDoorRepair')}
            </label>
            
            {serviceDetails.work_types?.includes('doorRepair') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="lock_door_repair_types">
                {[
  { value: 'stuckLockRepair', label: t('filters.locksmith.stuckLockRepair') },
  { value: 'hingeRepair', label: t('filters.locksmith.hingeRepair') },
  { value: 'doorSanding', label: t('filters.locksmith.doorSanding') },
  { value: 'handleReplacement', label: t('filters.locksmith.handleReplacement') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.lock_door_repair_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.lock_door_repair_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('lock_door_repair_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.lock_door_repair_types'] && <span className="error-text">{errors['serviceDetails.lock_door_repair_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('securityServices') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'securityServices']
                    : current.filter(t => t !== 'securityServices');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.locksmith.securityServices')}
            </label>
            
            {serviceDetails.work_types?.includes('securityServices') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="security_services_types">
                 {[
  { value: 'securityUpgrade', label: t('filters.locksmith.securityUpgrade') },
  { value: 'securityDoorInstall', label: t('filters.locksmith.securityDoorInstall') },
  { value: 'vulnerabilityCheck', label: t('filters.locksmith.vulnerabilityCheck') },
  { value: 'commercialLocksmith', label: t('filters.locksmith.commercialLocksmith') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.security_services_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.security_services_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('security_services_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.security_services_types'] && <span className="error-text">{errors['serviceDetails.security_services_types']}</span>}
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

export default LocksmithForm;