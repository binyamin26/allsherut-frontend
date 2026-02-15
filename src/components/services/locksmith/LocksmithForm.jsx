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
          <label className="auth-form-label required">{t('serviceForm.common.age')}</label>
          <input
           type="text"
 inputMode="numeric"
 autoComplete="off"
            value={serviceDetails.age || ''}
        onChange={(e) => {
  const numericValue = e.target.value.replace(/\D/g, '');  // ← AJOUTE CETTE LIGNE
  handleServiceDetailsChange('age', numericValue);  // (ou 'experience', ou 'hourlyRate')
}}
            className={`standard-input ${errors['serviceDetails.age'] ? 'error' : ''}`}
            data-field="age"
            min="18"
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
  <label className="auth-form-label required">{t('serviceForm.common.availabilityDays')}</label>
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
          <label className="auth-form-label required">{t('serviceForm.common.availabilityHours')}</label>
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
          <label className="auth-form-label required">{t('serviceForm.common.workTypes')}</label>
          
          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('החלפת מנעולים') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'החלפת מנעולים']
                    : current.filter(t => t !== 'החלפת מנעולים');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.locksmith.lockReplacement')}
            </label>
            
            {serviceDetails.work_types?.includes('החלפת מנעולים') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="lock_replacement_types">
              {[
  { value: 'מנעול צילינדר', label: t('filters.locksmith.cylinderLock') },
  { value: 'מנעול ביטחון', label: t('filters.locksmith.securityLock') },
  { value: 'מנעול דלת כניסה', label: t('filters.locksmith.entranceLock') },
  { value: 'מנעול למשרד / חנות', label: t('filters.locksmith.officeLock') }
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
                checked={serviceDetails.work_types?.includes('פתיחת דלתות') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'פתיחת דלתות']
                    : current.filter(t => t !== 'פתיחת דלתות');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
        {t('serviceForm.locksmith.doorOpening')}
            </label>
            
            {serviceDetails.work_types?.includes('פתיחת דלתות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="door_opening_types">
             {[
  { value: 'פתיחת דלת ללא נזק', label: t('filters.locksmith.noDamageOpening') },
  { value: 'פתיחה חירום 24/7', label: t('filters.locksmith.emergency247') },
  { value: 'פתיחת כספת', label: t('filters.locksmith.safeOpening') },
  { value: 'שכפול מפתחות במקום', label: t('filters.locksmith.keyDuplication') }
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
                checked={serviceDetails.work_types?.includes('התקנת מערכות נעילה') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'התקנת מערכות נעילה']
                    : current.filter(t => t !== 'התקנת מערכות נעילה');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.locksmith.lockSystemInstallation')}
            </label>
            
            {serviceDetails.work_types?.includes('התקנת מערכות נעילה') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="lock_system_installation_types">
              {[
  { value: 'מנעולים חכמים', label: t('filters.locksmith.smartLocks') },
  { value: 'מערכת אינטרקום', label: t('filters.locksmith.intercom') },
  { value: 'קוד כניסה למשרדים', label: t('filters.locksmith.accessCode') },
  { value: 'מנעול אלקטרוני', label: t('filters.locksmith.electronicLock') }
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
                checked={serviceDetails.work_types?.includes('תיקון מנעולים ודלתות') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'תיקון מנעולים ודלתות']
                    : current.filter(t => t !== 'תיקון מנעולים ודלתות');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.locksmith.lockDoorRepair')}
            </label>
            
            {serviceDetails.work_types?.includes('תיקון מנעולים ודלתות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="lock_door_repair_types">
                {[
  { value: 'תיקון מנעול תקוע', label: t('filters.locksmith.stuckLockRepair') },
  { value: 'תיקון ציר דלת', label: t('filters.locksmith.hingeRepair') },
  { value: 'שיוף דלת שלא נסגרת', label: t('filters.locksmith.doorSanding') },
  { value: 'החלפת ידית דלת', label: t('filters.locksmith.handleReplacement') }
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
                checked={serviceDetails.work_types?.includes('שירותי ביטחון') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'שירותי ביטחון']
                    : current.filter(t => t !== 'שירותי ביטחון');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.locksmith.securityServices')}
            </label>
            
            {serviceDetails.work_types?.includes('שירותי ביטחון') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="security_services_types">
                 {[
  { value: 'שדרוג מערכת ביטחון', label: t('filters.locksmith.securityUpgrade') },
  { value: 'התקנת דלת ביטחון', label: t('filters.locksmith.securityDoorInstall') },
  { value: 'בדיקת פגיעות דלת', label: t('filters.locksmith.vulnerabilityCheck') },
  { value: 'שירות מסגרות מסחרי', label: t('filters.locksmith.commercialLocksmith') }
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
      </div>
    </div>
  );
};

export default LocksmithForm;