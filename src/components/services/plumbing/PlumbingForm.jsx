import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const PlumbingForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
     <h3>{t('serviceForm.plumbing.title')}</h3>
      
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
                checked={serviceDetails.work_types?.includes('סתימות') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'סתימות']
                    : current.filter(t => t !== 'סתימות');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.plumbing.blockages')}
            </label>
            
            {serviceDetails.work_types?.includes('סתימות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="blockage_types">
                {[
  { value: 'פתיחת סתימה בבית', label: t('filters.plumbing.homeBlockage') },
  { value: 'משאבה טבולה', label: t('filters.plumbing.submersiblePump') },
  { value: 'פתיחת סתימה בבנין', label: t('filters.plumbing.buildingBlockage') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.blockage_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.blockage_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('blockage_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.blockage_types'] && <span className="error-text">{errors['serviceDetails.blockage_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('תיקון צנרת') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'תיקון צנרת']
                    : current.filter(t => t !== 'תיקון צנרת');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
         {t('serviceForm.plumbing.pipeRepair')}
            </label>
            
            {serviceDetails.work_types?.includes('תיקון צנרת') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="pipe_repair_types">
                 {[
  { value: 'תיקון צנרת גברית', label: t( 'filters.plumbing.malePipeRepair') },
  { value: 'תיקון נזקי צנרת בבית', label: t('filters.plumbing.homePipeDamage') },
  { value: 'תיקון נזקי צנרת בבניין', label: t('filters.plumbing.buildingPipeDamage') },
  { value: 'הגברת לחץ מים', label: t('filters.plumbing.pressureBoost') },
  { value: 'תיקון צנרת בגינה', label: t('filters.plumbing.gardenPipes') },
  { value: 'תיקוני צנרת אחרים', label: t('filters.plumbing.otherPipeRepairs') },
  { value: 'תיקון צנרת ביוב ללא הרס', label: t('filters.plumbing.sewerNonDestructive') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.pipe_repair_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.pipe_repair_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('pipe_repair_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.pipe_repair_types'] && <span className="error-text">{errors['serviceDetails.pipe_repair_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('עבודות גדולות') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'עבודות גדולות']
                    : current.filter(t => t !== 'עבודות גדולות');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.plumbing.largeWork')}
            </label>
            
            {serviceDetails.work_types?.includes('עבודות גדולות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="large_work_types">
                {[
  { value: 'החלפת צנרת בבית', label: t('filters.plumbing.homePipeReplacement') },
  { value: 'החלפת צנרת בבניין', label: t('filters.plumbing.buildingPipeReplacement') },
  { value: 'התקנת נקודות מים חדשות', label: t('filters.plumbing.newWaterPoints') },
  { value: 'החלפת קו ביוב בבית', label: t('filters.plumbing.homeSewerReplacement') },
  { value: 'החלפת קו ביוב בבניין', label: t('filters.plumbing.buildingSewerReplacement') },
  { value: 'הקמת קו ביוב חדש', label: t('filters.plumbing.newSewerLine') },
  { value: 'החלפת צנרת בגינה', label: t('filters.plumbing.gardenPipeReplacement') },
  { value: 'התקנת מזח', label: t('filters.plumbing.pierInstallation') }
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

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('תיקון והתקנת אביזרי אינסטלציה') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'תיקון והתקנת אביזרי אינסטלציה']
                    : current.filter(t => t !== 'תיקון והתקנת אביזרי אינסטלציה');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
         {t('serviceForm.plumbing.fixtureInstallation')}
            </label>
            
            {serviceDetails.work_types?.includes('תיקון והתקנת אביזרי אינסטלציה') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="fixture_types">
               {[
  { value: 'התקנת בר מים', label: t('filters.plumbing.waterBar') },
  { value: 'ניאגרה סמויה', label: t('filters.plumbing.concealedCistern') },
  { value: 'ברזים', label: t('filters.plumbing.faucets') },
  { value: 'ניאגרות ואסלות', label: t('filters.plumbing.toilets') },
  { value: 'מסנני מים', label: t('filters.plumbing.waterFilters') },
  { value: 'התקנת טוחן אשפה', label: t('filters.plumbing.garbageDisposal') },
  { value: 'תיקון טוחן אשפה', label: t('filters.plumbing.disposalRepair') },
  { value: 'כיורים', label: t('filters.plumbing.sinks') },
  { value: 'הכנה למדיח כלים', label: t('filters.plumbing.dishwasherPrep') },
  { value: 'אגנית למקלחון', label: t('filters.plumbing.showerBase') },
  { value: 'אביזרים אחרים', label: t('filters.plumbing.otherFixtures') },
  { value: 'סילוקית לאסלה', label: t('filters.plumbing.toiletFlush') },
  { value: 'התקנת בידה', label: t('filters.plumbing.bidet') },
  { value: 'אסלה תלויה', label: t('filters.plumbing.wallMountedToilet') },
  { value: 'אל חוזר לשעון מים', label: t('filters.plumbing.checkValve') },
  { value: 'התקנת מערכות מים תת כיוריות', label: t('filters.plumbing.underSinkSystems') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.fixture_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.fixture_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('fixture_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.fixture_types'] && <span className="error-text">{errors['serviceDetails.fixture_types']}</span>}
              </div>
            )}
          </div>

          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
        </div>
      </div>
    </div>
  );
};

export default PlumbingForm;