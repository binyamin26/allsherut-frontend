import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const DrywallForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
     <h3>{t('serviceForm.drywall.title')}</h3>
      
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
                checked={serviceDetails.work_types?.includes('עיצובים בגבס') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'עיצובים בגבס']
                    : current.filter(t => t !== 'עיצובים בגבס');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.drywall.designs')}
            </label>
            
            {serviceDetails.work_types?.includes('עיצובים בגבס') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="design_types">
                 {[
  { value: 'נישות גבס', label: t('filters.drywall.niches') },
  { value: 'מזנון גבס', label: t('filters.drywall.tvUnit') },
  { value: 'ספריות גבס', label: t('filters.drywall.libraries') },
  { value: 'כוורות גבס', label: t('filters.drywall.shelves') },
  { value: 'תאורה נסתרת בגבס', label: t('filters.drywall.hiddenLighting') },
  { value: 'קרניז גבס מעוגל', label: t('filters.drywall.roundedCornice') },
  { value: 'קשתות גבס', label: t('filters.drywall.arches') },
  { value: 'תקרה צפה', label: t('filters.drywall.floatingCeiling') },
  { value: 'קיר צף', label: t('filters.drywall.floatingWall') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.design_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.design_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('design_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.design_types'] && <span className="error-text">{errors['serviceDetails.design_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('עבודות גבס') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'עבודות גבס']
                    : current.filter(t => t !== 'עבודות גבס');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.drywall.construction')}
            </label>
            
            {serviceDetails.work_types?.includes('עבודות גבס') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="construction_types">
                 {[
  { value: 'בניית קירות גבס', label: t('filters.drywall.walls') },
  { value: 'בניית תקרות גבס', label: t('filters.drywall.ceilings') },
  { value: 'בניית מדפי גבס', label: t('filters.drywall.shelfConstruction') },
  { value: 'הנמכת תקרה למזגן', label: t('filters.drywall.acDropCeiling') },
  { value: 'חיפוי גבס לצנרת', label: t('filters.drywall.pipeCovering') },
  { value: 'בניית סינר\\קרניז גבס', label: t('filters.drywall.cornice') },
  { value: 'בידוד אקוסטי', label: t('filters.drywall.acousticInsulation') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.construction_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.construction_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('construction_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.construction_types'] && <span className="error-text">{errors['serviceDetails.construction_types']}</span>}
              </div>
            )}
          </div>

          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
        </div>
      </div>
    </div>
  );
};

export default DrywallForm;