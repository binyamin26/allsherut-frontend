import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const GlassWorksForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
  <h3>{t('serviceForm.glass.title')}</h3>
      
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
                checked={serviceDetails.work_types?.includes('זכוכית למקלחונים') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'זכוכית למקלחונים']
                    : current.filter(t => t !== 'זכוכית למקלחונים');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.glass.showerGlass')}
            </label>
            
            {serviceDetails.work_types?.includes('זכוכית למקלחונים') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="shower_glass_types">
              {[
  { value: 'התקנת מקלחון זכוכית', label: t('filters.glass.showerInstall') },
  { value: 'תיקון מקלחון', label: t('filters.glass.showerRepair') },
  { value: 'החלפת זכוכית במקלחון', label: t('filters.glass.showerGlassReplacement') },
  { value: 'דלתות מקלחת', label: t('filters.glass.showerDoors') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.shower_glass_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.shower_glass_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('shower_glass_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.shower_glass_types'] && <span className="error-text">{errors['serviceDetails.shower_glass_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('זכוכית לחלונות ודלתות') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'זכוכית לחלונות ודלתות']
                    : current.filter(t => t !== 'זכוכית לחלונות ודלתות');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.glass.windowsDoors')}
            </label>
            
            {serviceDetails.work_types?.includes('זכוכית לחלונות ודלתות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="windows_doors_glass_types">
            {[
  { value: 'החלפת זכוכית בחלון', label: t('filters.glass.windowReplacement') },
  { value: 'זכוכית מבודדת (Double)', label: t('filters.glass.doubleGlazing') },
  { value: 'זיגוג מחדש', label: t('filters.glass.reglazing') },
  { value: 'דלתות זכוכית פנימיות', label: t('filters.glass.interiorGlassDoors') },
  { value: 'מחיצות זכוכית', label: t('filters.glass.glassPartitions') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.windows_doors_glass_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.windows_doors_glass_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('windows_doors_glass_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.windows_doors_glass_types'] && <span className="error-text">{errors['serviceDetails.windows_doors_glass_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('זכוכית למטבח ובית') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'זכוכית למטבח ובית']
                    : current.filter(t => t !== 'זכוכית למטבח ובית');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.glass.kitchenHome')}
            </label>
            
            {serviceDetails.work_types?.includes('זכוכית למטבח ובית') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="kitchen_home_glass_types">
        {[
  { value: 'זכוכית למטבח (Backsplash)', label: t('filters.glass.kitchenBacksplash') },
  { value: 'מדפי זכוכית', label: t('filters.glass.glassShelves') },
  { value: 'שולחנות זכוכית', label: t('filters.glass.glassTables') },
  { value: 'מראות לחדר אמבטיה', label: t('filters.glass.bathroomMirrors') },
  { value: 'מראות דקורטיביות', label: t('filters.glass.decorativeMirrors') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.kitchen_home_glass_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.kitchen_home_glass_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('kitchen_home_glass_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.kitchen_home_glass_types'] && <span className="error-text">{errors['serviceDetails.kitchen_home_glass_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('זכוכית מיוחדת ובטיחות') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'זכוכית מיוחדת ובטיחות']
                    : current.filter(t => t !== 'זכוכית מיוחדת ובטיחות');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.glass.specialSafety')}
            </label>
            
            {serviceDetails.work_types?.includes('זכוכית מיוחדת ובטיחות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="special_safety_glass_types">
           {[
  { value: 'זכוכית מחוסמת (בטיחותית)', label: t('filters.glass.temperedGlass') },
  { value: 'זכוכית חכמה', label: t('filters.glass.smartGlass') },
  { value: 'זכוכית עמידה לפריצה', label: t('filters.glass.securityGlass') },
  { value: 'זכוכית אקוסטית (בידוד רעש)', label: t('filters.glass.acousticGlass') },
  { value: 'זכוכית צבעונית / מעוצבת', label: t('filters.glass.decorativeGlass') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.special_safety_glass_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.special_safety_glass_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('special_safety_glass_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.special_safety_glass_types'] && <span className="error-text">{errors['serviceDetails.special_safety_glass_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('שירותי תיקון והתאמה אישית') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'שירותי תיקון והתאמה אישית']
                    : current.filter(t => t !== 'שירותי תיקון והתאמה אישית');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
          {t('serviceForm.glass.repairCustom')}
            </label>
            
            {serviceDetails.work_types?.includes('שירותי תיקון והתאמה אישית') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="repair_custom_types">
          {[
  { value: 'תיקון שריטות וסדקים', label: t('filters.glass.scratchRepair') },
  { value: 'ליטוש זכוכית', label: t('filters.glass.glassPolishing') },
  { value: 'חיתוך זכוכית לפי מידה', label: t('filters.glass.customCutting') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.repair_custom_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.repair_custom_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('repair_custom_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.repair_custom_types'] && <span className="error-text">{errors['serviceDetails.repair_custom_types']}</span>}
              </div>
            )}
          </div>

          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
        </div>
      </div>
    </div>
  );
};

export default GlassWorksForm;