import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const AluminumForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  return (
    <div className="service-details-form">
      {t('serviceForm.aluminum.title')}
      
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
                checked={serviceDetails.work_types?.includes('חלונות ודלתות') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'חלונות ודלתות']
                    : current.filter(t => t !== 'חלונות ודלתות');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
 {t('serviceForm.aluminum.windowsDoors')}
            </label>
            
            {serviceDetails.work_types?.includes('חלונות ודלתות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="windows_doors_types">
                  {[
  { value: 'התקנת חלונות אלומיניום', label: t('serviceForm.aluminum.installWindows') },
  { value: 'דלתות אלומיניום', label: t('serviceForm.aluminum.aluminumDoors') },
  { value: 'דלתות הזזה (ויטרינות)', label: t('serviceForm.aluminum.slidingDoors') },
  { value: 'דלתות כניסה מאלומיניום', label: t('serviceForm.aluminum.entryDoors') },
  { value: 'רשתות נגד יתושים', label: t('serviceForm.aluminum.mosquitoNets') },
  { value: 'תריסים ידניים', label: t('serviceForm.aluminum.manualShutters') },
  { value: 'תריסים חשמליים', label: t('serviceForm.aluminum.electricShutters') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.windows_doors_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.windows_doors_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('windows_doors_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.windows_doors_types'] && <span className="error-text">{errors['serviceDetails.windows_doors_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('פרגולות ואלומיניום חוץ') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'פרגולות ואלומיניום חוץ']
                    : current.filter(t => t !== 'פרגולות ואלומיניום חוץ');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
 {t('serviceForm.aluminum.pergolasOutdoor')}
            </label>
            
            {serviceDetails.work_types?.includes('פרגולות ואלומיניום חוץ') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="pergolas_outdoor_types">
             {[
  { value: 'פרגולות אלומיניום', label: t('serviceForm.aluminum.pergolas') },
  { value: 'סגירת מרפסות', label: t('serviceForm.aluminum.balconyEnclosure') },
  { value: 'חיפויי אלומיניום חיצוניים', label: t('serviceForm.aluminum.exteriorCladding') },
  { value: 'מעקות אלומיניום לגינה / מרפסות', label: t('serviceForm.aluminum.railings') }
].map(type => (
  <label key={type.value} className="checkbox-item">  
    <input
      type="checkbox"
      checked={serviceDetails.pergolas_outdoor_types?.includes(type.value) || false}  
      onChange={(e) => {
        const current = serviceDetails.pergolas_outdoor_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]  
          : current.filter(t => t !== type.value); 
        handleServiceDetailsChange('pergolas_outdoor_types', newTypes);
      }}
    />
    {type.label}  
  </label>
))}
                </div>
                {errors['serviceDetails.pergolas_outdoor_types'] && <span className="error-text">{errors['serviceDetails.pergolas_outdoor_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('תיקונים ושירות') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'תיקונים ושירות']
                    : current.filter(t => t !== 'תיקונים ושירות');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
 {t('serviceForm.aluminum.repairsService')}
            </label>
            
            {serviceDetails.work_types?.includes('תיקונים ושירות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="repairs_service_types">
{[
  { value: 'תיקון מנועי תריס חשמלי', label: t('serviceForm.aluminum.repairShutterMotor') },
  { value: 'תיקון מסילות', label: t('serviceForm.aluminum.repairTracks') },
  { value: 'תיקון גלגלים בחלונות', label: t('serviceForm.aluminum.repairWheels') },
  { value: 'החלפת ידיות / צירים', label: t('serviceForm.aluminum.replaceHandles') },
  { value: 'איטום וחידוש מסביב לחלונות', label: t('serviceForm.aluminum.sealingRenewal') },
  { value: 'תיקון תריסים ידניים', label: t('serviceForm.aluminum.repairManualShutters') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.repairs_service_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.repairs_service_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('repairs_service_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.repairs_service_types'] && <span className="error-text">{errors['serviceDetails.repairs_service_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('חיפויי אלומיניום') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'חיפויי אלומיניום']
                    : current.filter(t => t !== 'חיפויי אלומיניום');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
               {t('serviceForm.aluminum.cladding')}
            </label>
            
            {serviceDetails.work_types?.includes('חיפויי אלומיניום') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="cladding_types">
     {[
  { value: 'חיפוי צנרת / כיסוי צינורות', label: t('serviceForm.aluminum.pipeCovering') },
  { value: 'חיפוי מונים (חשמל / מים / גז)', label: t('serviceForm.aluminum.meterCovering') },
  { value: 'ארגזים דקורטיביים מאלומיניום', label: t('serviceForm.aluminum.decorativeBoxes') },
  { value: 'חיפוי קווי מזגן', label: t('serviceForm.aluminum.acLineCovering') },
  { value: 'הגנה למנוע מזגן חיצוני', label: t('serviceForm.aluminum.acMotorProtection') },
  { value: 'חיפוי קירות חוץ מאלומיניום', label: t('serviceForm.aluminum.wallCladding') },
  { value: 'חיפויים דקורטיביים', label: t('serviceForm.aluminum.decorativeCladding') },
  { value: 'חיפוי וארגזי תריס', label: t('serviceForm.aluminum.shutterBoxCladding') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.cladding_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.cladding_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('cladding_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.cladding_types'] && <span className="error-text">{errors['serviceDetails.cladding_types']}</span>}
              </div>
            )}
          </div>

          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
        </div>
      </div>
    </div>
  );
};

export default AluminumForm;