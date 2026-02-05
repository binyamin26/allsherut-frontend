import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const ContractorForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
     <h3>{t('serviceForm.contractor.title')}</h3>
      
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
                checked={serviceDetails.work_types?.includes('עבודות שלד') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'עבודות שלד']
                    : current.filter(t => t !== 'עבודות שלד');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.contractor.structureWork')}
            </label>
            
            {serviceDetails.work_types?.includes('עבודות שלד') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="structure_work_types">
                 {[
  { value: 'בניית שלד', label: t('serviceForm.contractor.buildingFrame') },
  { value: 'יציקות בטון', label: t('serviceForm.contractor.concretePours') },
  { value: 'טפסנות', label: t('serviceForm.contractor.formwork') },
  { value: 'חיזוק מבנים', label: t('serviceForm.contractor.structuralReinforcement') },
  { value: 'בניית קירות בלוקים', label: t('serviceForm.contractor.blockWalls') },
  { value: 'הריסה ובנייה מחדש', label: t('serviceForm.contractor.demolitionRebuild') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.structure_work_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.structure_work_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('structure_work_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.structure_work_types'] && <span className="error-text">{errors['serviceDetails.structure_work_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('שיפוצים כלליים') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'שיפוצים כלליים']
                    : current.filter(t => t !== 'שיפוצים כלליים');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.contractor.generalRenovation')}
            </label>
            
            {serviceDetails.work_types?.includes('שיפוצים כלליים') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="general_renovation_types">
                {[
  { value: 'שיפוץ דירה מלא', label: t('serviceForm.contractor.fullApartmentReno') },
  { value: 'שיפוץ חדרים', label: t('serviceForm.contractor.roomRenovation') },
  { value: 'שיפוץ חדרי רחצה', label: t('serviceForm.contractor.bathroomReno') },
  { value: 'שיפוץ מטבח', label: t('serviceForm.contractor.kitchenReno') },
  { value: 'החלפת ריצוף', label: t('serviceForm.contractor.flooringReplacement') },
  { value: 'עבודות גבס', label: t('serviceForm.contractor.drywallWork') },
  { value: 'טיח ושפכטל', label: t('serviceForm.contractor.plasterWork') },
  { value: 'סגירת מרפסת', label: t('serviceForm.contractor.balconyEnclosure') },
  { value: 'צביעה מקצועית', label: t('serviceForm.contractor.professionalPainting') },
  { value: 'החלפת דלתות ומשקופים', label: t('serviceForm.contractor.doorFrameReplacement') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.general_renovation_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.general_renovation_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('general_renovation_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.general_renovation_types'] && <span className="error-text">{errors['serviceDetails.general_renovation_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('חשמל ואינסטלציה') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'חשמל ואינסטלציה']
                    : current.filter(t => t !== 'חשמל ואינסטלציה');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.contractor.electricPlumbing')}
            </label>
            
            {serviceDetails.work_types?.includes('חשמל ואינסטלציה') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="electric_plumbing_types">
                 {[
  { value: 'עבודות חשמל', label: t('serviceForm.contractor.electricalWork') },
  { value: 'החלפת לוח חשמל', label: t('serviceForm.contractor.panelReplacement') },
  { value: 'אינסטלציה כללית', label: t('serviceForm.contractor.generalPlumbing') },
  { value: 'החלפת צנרת', label: t('serviceForm.contractor.pipeReplacement') },
  { value: 'איתור ותיקון נזילות', label: t('serviceForm.contractor.leakDetection') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.electric_plumbing_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.electric_plumbing_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('electric_plumbing_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.electric_plumbing_types'] && <span className="error-text">{errors['serviceDetails.electric_plumbing_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('עבודות חוץ') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'עבודות חוץ']
                    : current.filter(t => t !== 'עבודות חוץ');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.contractor.exteriorWork')}
            </label>
            
            {serviceDetails.work_types?.includes('עבודות חוץ') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="exterior_work_types">
               {[
  { value: 'ריצוף חוץ', label: t('serviceForm.contractor.exteriorFlooring') },
  { value: 'בניית פרגולה', label: t('serviceForm.contractor.pergolaConstruction') },
  { value: 'חיפויי אבן / חיפויי קירות חוץ', label: t('serviceForm.contractor.stoneCladding') },
  { value: 'גידור', label: t('serviceForm.contractor.fencing') },
  { value: 'בניית שבילים בגינה', label: t('serviceForm.contractor.gardenPathways') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.exterior_work_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.exterior_work_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('exterior_work_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.exterior_work_types'] && <span className="error-text">{errors['serviceDetails.exterior_work_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('שיקום ותיקון חוץ') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'שיקום ותיקון חוץ']
                    : current.filter(t => t !== 'שיקום ותיקון חוץ');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.contractor.facadeRepair')}
            </label>
            
            {serviceDetails.work_types?.includes('שיקום ותיקון חוץ') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="facade_repair_types">
              {[
  { value: 'תיקון טיח חוץ', label: t('serviceForm.contractor.exteriorPlasterRepair') },
  { value: 'שיקום קירות חיצוניים', label: t('serviceForm.contractor.exteriorWallRestoration') },
  { value: 'איטום סדקים בקירות', label: t('serviceForm.contractor.wallCrackSealing') },
  { value: 'טיפול בנפילת טיח', label: t('serviceForm.contractor.fallingPlasterTreatment') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.facade_repair_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.facade_repair_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('facade_repair_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.facade_repair_types'] && <span className="error-text">{errors['serviceDetails.facade_repair_types']}</span>}
              </div>
            )}
          </div>

          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
        </div>
      </div>
    </div>
  );
};

export default ContractorForm;