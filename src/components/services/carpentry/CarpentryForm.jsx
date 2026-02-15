import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const CarpentryForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.carpentry.title')}</h3>
      
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
  handleServiceDetailsChange('experience', numericValue);  // ← 'experience' ici !
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
                checked={serviceDetails.work_types?.includes('בניית רהיטים') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'בניית רהיטים']
                    : current.filter(t => t !== 'בניית רהיטים');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.carpentry.furnitureBuilding')}
            </label>
            
            {serviceDetails.work_types?.includes('בניית רהיטים') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="furniture_building_types">
                 {[
  { value: 'בניית ארונות קיר', label: t('filters.carpentry.wallClosets') },
  { value: 'בניית ארונות הזזה', label: t('filters.carpentry.slidingClosets') },
  { value: 'בניית ארונות אמבטיה', label: t('filters.carpentry.bathroomCabinets') },
  { value: 'בניית חדר שינה', label: t('filters.carpentry.bedroomFurniture') },
  { value: 'בניית שולחן', label: t('filters.carpentry.tableBuilding') },
  { value: 'בניית כסאות', label: t('filters.carpentry.chairBuilding') },
  { value: 'בניית מזנון', label: t('filters.carpentry.tvUnitBuilding') },
  { value: 'בניית ספריה', label: t('filters.carpentry.libraryBuilding') },
  { value: 'בניית רהיטים ייחודים', label: t('filters.carpentry.customFurniture') },
  { value: 'בניית מדפים', label: t('filters.carpentry.shelfBuilding') },
  { value: 'בניית חדר ארונות', label: t('filters.carpentry.walkInCloset') },
  { value: 'בניית מיטה מעץ', label: t('filters.carpentry.woodenBed') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.furniture_building_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.furniture_building_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('furniture_building_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.furniture_building_types'] && <span className="error-text">{errors['serviceDetails.furniture_building_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('תיקון רהיטים') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'תיקון רהיטים']
                    : current.filter(t => t !== 'תיקון רהיטים');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.carpentry.furnitureRepair')}
            </label>
            
            {serviceDetails.work_types?.includes('תיקון רהיטים') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="furniture_repair_types">
             {[
  { value: 'תיקון ארונות קיר', label: t('serviceForm.carpentry.repairWallClosets') },
  { value: 'תיקון שולחן', label: t('serviceForm.carpentry.repairTable') },
  { value: 'תיקון כסאות', label: t('serviceForm.carpentry.repairChairs') },
  { value: 'תיקון ארונות הזזה', label: t('serviceForm.carpentry.repairSlidingClosets') },
  { value: 'תיקון ארונות אמבטיה', label: t('serviceForm.carpentry.repairBathroomCabinets') },
  { value: 'תיקון חדר שינה', label: t('serviceForm.carpentry.repairBedroomFurniture') },
  { value: 'תיקון מזנון', label: t('serviceForm.carpentry.repairTvUnit') },
  { value: 'תיקון ספרייה', label: t('serviceForm.carpentry.repairLibrary') },
  { value: 'תיקון רהיטים אחרים', label: t('serviceForm.carpentry.repairOther') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.furniture_repair_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.furniture_repair_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('furniture_repair_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.furniture_repair_types'] && <span className="error-text">{errors['serviceDetails.furniture_repair_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('עבודות נגרות אחרות') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'עבודות נגרות אחרות']
                    : current.filter(t => t !== 'עבודות נגרות אחרות');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.carpentry.otherWork')}
            </label>
            
            {serviceDetails.work_types?.includes('עבודות נגרות אחרות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="other_carpentry_types">
              {[
  { value: 'חיפוי עץ לקיר', label: t('serviceForm.carpentry.wallCladding') },
  { value: 'פירוק והרכבת רהיטים', label: t('serviceForm.carpentry.disassembly') },
  { value: 'תיקון ובניית דלתות', label: t('serviceForm.carpentry.doorRepair') },
  { value: 'חידוש דלתות כניסה מעץ', label: t('serviceForm.carpentry.doorRenovation') },
  { value: 'בניית קומת גלריה', label: t('serviceForm.carpentry.loft') },
  { value: 'מדרגות עץ לבית', label: t('serviceForm.carpentry.stairs') },
  { value: 'משרביות מעץ', label: t('serviceForm.carpentry.lattice') },
  { value: 'בוצ\'ר עץ', label: t('serviceForm.carpentry.butcher') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.other_carpentry_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.other_carpentry_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('other_carpentry_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.other_carpentry_types'] && <span className="error-text">{errors['serviceDetails.other_carpentry_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('נגרות חוץ') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'נגרות חוץ']
                    : current.filter(t => t !== 'נגרות חוץ');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.carpentry.outdoorCarpentry')}
            </label>
            
            {serviceDetails.work_types?.includes('נגרות חוץ') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                
                <div style={{marginBottom: '15px'}}>
                  <label className="checkbox-item" style={{fontWeight: '600'}}>
                    <input
                      type="checkbox"
                      checked={serviceDetails.outdoor_carpentry_types?.includes('פרגולות') || false}
                      onChange={(e) => {
                        const current = serviceDetails.outdoor_carpentry_types || [];
                        const newTypes = e.target.checked 
                          ? [...current, 'פרגולות']
                          : current.filter(t => t !== 'פרגולות');
                        handleServiceDetailsChange('outdoor_carpentry_types', newTypes);
                      }}
                    />
                    {t('serviceForm.carpentry.pergolas')}
                  </label>
                  
                  {serviceDetails.outdoor_carpentry_types?.includes('פרגולות') && (
                    <div style={{marginRight: '30px', marginTop: '10px'}}>
                      <div className="checkbox-group" data-field="pergola_types">
                    {[
  { value: 'פרגולות עץ', label: t('serviceForm.carpentry.woodPergolas') },
  { value: 'פרגולות הצללה', label: t('serviceForm.carpentry.shadePergolas') },
  { value: 'סגירת מרפסת', label: t('serviceForm.carpentry.balconyEnclosure') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.pergola_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.pergola_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('pergola_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                      </div>
                      {errors['serviceDetails.pergola_types'] && <span className="error-text">{errors['serviceDetails.pergola_types']}</span>}
                    </div>
                  )}
                </div>

                <div style={{marginBottom: '15px'}}>
                  <label className="checkbox-item" style={{fontWeight: '600'}}>
                    <input
                      type="checkbox"
                      checked={serviceDetails.outdoor_carpentry_types?.includes('דקים') || false}
                      onChange={(e) => {
                        const current = serviceDetails.outdoor_carpentry_types || [];
                        const newTypes = e.target.checked 
                          ? [...current, 'דקים']
                          : current.filter(t => t !== 'דקים');
                        handleServiceDetailsChange('outdoor_carpentry_types', newTypes);
                      }}
                    />
                    {t('serviceForm.carpentry.decks')}
                  </label>
                  
                  {serviceDetails.outdoor_carpentry_types?.includes('דקים') && (
                    <div style={{marginRight: '30px', marginTop: '10px'}}>
                      <div className="checkbox-group" data-field="deck_types">
                    {[
  { value: 'דקים מעץ טבעי', label: t('serviceForm.carpentry.naturalWoodDecks') },
  { value: 'דק סינטטי (קומפוזיט)', label: t('serviceForm.carpentry.compositeDecks') },
  { value: 'שיקום / חידוש דקים', label: t('serviceForm.carpentry.deckRenovation') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.deck_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.deck_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('deck_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                      </div>
                      {errors['serviceDetails.deck_types'] && <span className="error-text">{errors['serviceDetails.deck_types']}</span>}
                    </div>
                  )}
                </div>

                <div style={{marginBottom: '15px'}}>
                  <label className="checkbox-item" style={{fontWeight: '600'}}>
                    <input
                      type="checkbox"
                      checked={serviceDetails.outdoor_carpentry_types?.includes('גדרות ומחיצות עץ') || false}
                      onChange={(e) => {
                        const current = serviceDetails.outdoor_carpentry_types || [];
                        const newTypes = e.target.checked 
                          ? [...current, 'גדרות ומחיצות עץ']
                          : current.filter(t => t !== 'גדרות ומחיצות עץ');
                        handleServiceDetailsChange('outdoor_carpentry_types', newTypes);
                      }}
                    />
                 {t('serviceForm.carpentry.fences')}
                  </label>
                  
                  {serviceDetails.outdoor_carpentry_types?.includes('גדרות ומחיצות עץ') && (
                    <div style={{marginRight: '30px', marginTop: '10px'}}>
                      <div className="checkbox-group" data-field="fence_types">
                     {[
  { value: 'גדרות עץ', label: t('serviceForm.carpentry.woodFences') },
  { value: 'מחיצות עץ לגינה', label: t('serviceForm.carpentry.gardenPartitions') },
  { value: 'שערי עץ', label: t('serviceForm.carpentry.woodGates') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.fence_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.fence_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('fence_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                      </div>
                      {errors['serviceDetails.fence_types'] && <span className="error-text">{errors['serviceDetails.fence_types']}</span>}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
        </div>
      </div>
    </div>
  );
};

export default CarpentryForm;