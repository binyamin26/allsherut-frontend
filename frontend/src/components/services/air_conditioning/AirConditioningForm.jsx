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
       <label>{t('serviceForm.common.age')}</label>
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
     <label>{t('serviceForm.common.experience')}</label>
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
     <label>{t('serviceForm.common.workTypes')}</label>
          
          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('התקנת מזגנים') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'התקנת מזגנים']
                    : current.filter(t => t !== 'התקנת מזגנים');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
  {t('serviceForm.airConditioning.installation')}
            </label>
            
            {serviceDetails.work_types?.includes('התקנת מזגנים') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="installation_types">
               {[
  { value: 'התקנת מזגן', key: 'filters.ac.acInstall' },
  { value: 'התקנת מיזוג מיני מרכזי', key: 'filters.ac.miniCentralInstall' },
  { value: 'התקנת מיזוג מרכזי', key: 'filters.ac.centralInstall' },
  { value: 'התקנת מזגן אינוורטר', key: 'filters.ac.inverterInstall' },
  { value: 'התקנת מזגן מולטי אינוורטר', key: 'filters.ac.multiInverterInstall' },
  { value: 'התקנת מזגן VRF', key: 'filters.ac.vrfInstall' }
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
                checked={serviceDetails.work_types?.includes('תיקון מזגנים') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'תיקון מזגנים']
                    : current.filter(t => t !== 'תיקון מזגנים');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
 {t('serviceForm.airConditioning.repair')}
            </label>
            
            {serviceDetails.work_types?.includes('תיקון מזגנים') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="repair_types">
                  {[
  { value: 'תיקון מזגן', key: 'filters.ac.acRepair' },
  { value: 'תיקון מזגן מעובש', key: 'filters.ac.moldyAcRepair' },
  { value: 'תיקון מיזוג מיני מרכזי', key: 'filters.ac.miniCentralRepair' },
  { value: 'תיקון דליפת גז במזגן', key: 'filters.ac.gasLeakRepair' },
  { value: 'תיקון מיזוג מרכזי', key: 'filters.ac.centralRepair' },
  { value: 'תיקון מזגן אינוורטר', key: 'filters.ac.inverterRepair' },
  { value: 'תיקון מזגן VRF', key: 'filters.ac.vrfRepair' },
  { value: 'ניקוי פילטרים', key: 'filters.ac.filterCleaning' },
  { value: 'תיקון צ\'ילרים', key: 'filters.ac.chillerRepair' },
  { value: 'טכנאי חדרי קירור', key: 'filters.ac.coldRoomTech' },
  { value: 'מילוי גז', key: 'filters.ac.gasRefill' }
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
                checked={serviceDetails.work_types?.includes('פירוק והרכבת מזגנים') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'פירוק והרכבת מזגנים']
                    : current.filter(t => t !== 'פירוק והרכבת מזגנים');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
  {t('serviceForm.airConditioning.disassembly')}
            </label>
            
            {serviceDetails.work_types?.includes('פירוק והרכבת מזגנים') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="disassembly_types">
                {[
  { value: 'פירוק והרכבת מזגן', key: 'filters.ac.acDisassembly' },
  { value: 'פירוק מיזוג מיני מרכזי', key: 'filters.ac.miniCentralDisassembly' },
  { value: 'פירוק מיזוג מרכזי', key: 'filters.ac.centralDisassembly' },
  { value: 'פירוק מזגן אינוורטר', key: 'filters.ac.inverterDisassembly' },
  { value: 'פירוק מזגן VRF', key: 'filters.ac.vrfDisassembly' }
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
      </div>
    </div>

  );
};

export default AirConditioningForm;