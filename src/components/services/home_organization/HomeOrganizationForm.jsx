import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const HomeOrganizationForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
     <h3>{t('serviceForm.homeOrg.title')}</h3>
      
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
      <label>{t('serviceForm.homeOrg.hourlyRate')}</label>
<input
 type="text"
autoComplete="off"
  value={serviceDetails.hourlyRate || ''}
onChange={(e) => {
  const numericValue = e.target.value.replace(/\D/g, '');
  handleServiceDetailsChange('hourlyRate', numericValue);  // ← 'hourlyRate' ici !
}}
  className={`standard-input ${errors['serviceDetails.hourlyRate'] ? 'error' : ''}`}
  data-field="hourlyRate"
  min="0"
/>
          {errors['serviceDetails.hourlyRate'] && <span className="error-text">{errors['serviceDetails.hourlyRate']}</span>}
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
                checked={serviceDetails.work_types?.includes('סידור כללי') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'סידור כללי']
                    : current.filter(t => t !== 'סידור כללי');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.homeOrg.generalOrganization')}
            </label>
            
            {serviceDetails.work_types?.includes('סידור כללי') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="general_organization_types">
                 {[
  { value: 'סידור בית מלא', label: t('filters.homeOrg.fullHome') },
  { value: 'סידור חדרים', label: t('filters.homeOrg.rooms') },
  { value: 'סידור מטבח', label: t('filters.homeOrg.kitchen') },
  { value: 'סידור חדר ילדים', label: t('filters.homeOrg.kidsRoom') },
  { value: 'סידור חדר ארונות / ארונות בגדים', label: t('filters.homeOrg.closets') },
  { value: 'סידור חדר אמבטיה', label: t('filters.homeOrg.bathroom') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.general_organization_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.general_organization_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('general_organization_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.general_organization_types'] && <span className="error-text">{errors['serviceDetails.general_organization_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('סידור + מיון') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'סידור + מיון']
                    : current.filter(t => t !== 'סידור + מיון');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.homeOrg.sortingOrganization')}
            </label>
            
            {serviceDetails.work_types?.includes('סידור + מיון') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="sorting_types">
             {[
  { value: 'מיון חפצים', label: t('filters.homeOrg.itemSorting') },
  { value: 'מיון בגדים', label: t('filters.homeOrg.clothesSorting') },
  { value: 'מיון צעצועים', label: t('filters.homeOrg.toySorting') },
  { value: 'הכנת חפצים למסירה / תרומה', label: t('filters.homeOrg.donationPrep') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.sorting_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.sorting_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('sorting_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.sorting_types'] && <span className="error-text">{errors['serviceDetails.sorting_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('ארגון מקצועי') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'ארגון מקצועי']
                    : current.filter(t => t !== 'ארגון מקצועי');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.homeOrg.professionalOrganization')}
            </label>
            
            {serviceDetails.work_types?.includes('ארגון מקצועי') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="professional_organization_types">
                 {[
  { value: 'יצירת פתרונות אחסון', label: t('filters.homeOrg.storageSolutions') },
  { value: 'אופטימיזציה של חללים קטנים', label: t('filters.homeOrg.smallSpaceOptimization') },
  { value: 'עיצוב וסידור מדפים', label: t('filters.homeOrg.shelfDesign') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.professional_organization_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.professional_organization_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('professional_organization_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.professional_organization_types'] && <span className="error-text">{errors['serviceDetails.professional_organization_types']}</span>}
              </div>
            )}
          </div>

          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
        </div>
      </div>
    </div>
  );
};

export default HomeOrganizationForm;