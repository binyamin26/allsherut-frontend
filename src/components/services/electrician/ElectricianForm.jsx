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
                checked={serviceDetails.work_types?.includes('תיקונים') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'תיקונים']
                    : current.filter(t => t !== 'תיקונים');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.electrician.repairs')}
            </label>
            
            {serviceDetails.work_types?.includes('תיקונים') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="repair_types">
                 {[
  { value: 'תיקון קצר', label: t('filters.electrician.shortCircuitRepair') },
  { value: 'תיקון טיימר', label: t('filters.electrician.timerRepair') },
  { value: 'תיקון לוח חשמל', label: t('filters.electrician.panelRepair') },
  { value: 'החלפת שקעים', label: t('filters.electrician.outletReplacement') },
  { value: 'תיקון\\החלפת ספוטים', label: t('filters.electrician.spotlightRepair') },
  { value: 'תיקונים אחרים', label: t('filters.electrician.otherRepairs') },
  { value: 'החלפת אוטומט חדר מדרגות', label: t('filters.electrician.stairwaySwitch') }
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
                checked={serviceDetails.work_types?.includes('התקנות') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'התקנות']
                    : current.filter(t => t !== 'התקנות');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('serviceForm.electrician.installations')}
            </label>
            
            {serviceDetails.work_types?.includes('התקנות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="installation_types">
               {[
  { value: 'התקנת מאוורר תקרה', label: t('filters.electrician.ceilingFan') },
  { value: 'התקנת שקע חשמל', label: t('filters.electrician.outletInstall') },
  { value: 'התקנת נקודת חשמל חדשה', label: t('filters.electrician.newOutlet') },
  { value: 'התקנת אטמור', label: t('filters.electrician.waterHeater') },
  { value: 'התקנת מתג', label: t('filters.electrician.switchInstall') },
  { value: 'עמדת טעינה לרכב חשמלי', label: t('filters.electrician.evCharger') },
  { value: 'התקנת שעון שבת', label: t('filters.electrician.shabbatTimer') },
  { value: 'התקנות אחרות', label: t('filters.electrician.otherInstall') },
  { value: 'עמדת טעינה לרכב חשמלי של חברת EV-Meter', label: t('filters.electrician.evMeter') },
  { value: 'התקנות כיריים אינדוקציה', label: t('filters.electrician.inductionCooktop') },
  { value: 'התקנת תנור אמבטיה', label: t('filters.electrician.bathroomHeater') },
  { value: 'התקנת גנרטור לבית פרטי', label: t('filters.electrician.generator') },
  { value: 'התקנת ונטה', label: t('filters.electrician.ventaInstall') },
  { value: 'עמדת טעינה לרכב חשמלי EV-EDGE', label: t('filters.electrician.evEdge') }
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
                checked={serviceDetails.work_types?.includes('עבודות חשמל גדולות') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'עבודות חשמל גדולות']
                    : current.filter(t => t !== 'עבודות חשמל גדולות');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.electrician.largeWork')}
            </label>
            
            {serviceDetails.work_types?.includes('עבודות חשמל גדולות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="large_work_types">
                 {[
  { value: 'בניית תשתית חשמל בכל הבית', label: t('filters.electrician.newInfrastructure') },
  { value: 'החלפת תשתית חשמל בכל הבית', label: t('filters.electrician.replaceInfrastructure') },
  { value: 'החלפת לוח חשמל', label: t('filters.electrician.panelReplacement') },
  { value: 'הארקה', label: t('filters.electrician.grounding') },
  { value: 'החלפה לתלת פאזי', label: t('filters.electrician.threePhase') },
  { value: 'הכנה לביקורת עבור חברת חשמל', label: t('filters.electrician.inspection') }
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
      </div>
    </div>
  );
};

export default ElectricianForm;