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
          <label className="auth-form-label required">{t('serviceForm.common.availabilityHours')}</label>
          <div className="checkbox-group" data-field="availability_hours">
          {[
  { value: 'morning', label: t('hours.morning') },
  { value: 'afternoon', label: t('hours.afternoon') },
  { value: 'evening', label: t('hours.evening') },
  { value: 'all', label: t('hours.all') }
].map(hour => (
            <label key={hour.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.availability_hours?.includes(hour.value) || false}
      onChange={() => handleExclusiveCheckbox('availability_hours', hour.value, 'all', ['morning', 'afternoon', 'evening'])}
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
                checked={serviceDetails.work_types?.includes('design') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'design']
                    : current.filter(t => t !== 'design');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.drywall.designs')}
            </label>
            
            {serviceDetails.work_types?.includes('design') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="design_types">
                 {[
  { value: 'niches', label: t('filters.drywall.niches') },
  { value: 'tvUnit', label: t('filters.drywall.tvUnit') },
  { value: 'libraries', label: t('filters.drywall.libraries') },
  { value: 'shelves', label: t('filters.drywall.shelves') },
  { value: 'hiddenLighting', label: t('filters.drywall.hiddenLighting') },
  { value: 'roundedCornice', label: t('filters.drywall.roundedCornice') },
  { value: 'arches', label: t('filters.drywall.arches') },
  { value: 'floatingCeiling', label: t('filters.drywall.floatingCeiling') },
  { value: 'floatingWall', label: t('filters.drywall.floatingWall') }
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
                checked={serviceDetails.work_types?.includes('drywallWork') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'drywallWork']
                    : current.filter(t => t !== 'drywallWork');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.drywall.construction')}
            </label>
            
            {serviceDetails.work_types?.includes('drywallWork') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="construction_types">
                 {[
  { value: 'walls', label: t('filters.drywall.walls') },
  { value: 'ceilings', label: t('filters.drywall.ceilings') },
  { value: 'shelfConstruction', label: t('filters.drywall.shelfConstruction') },
  { value: 'acDropCeiling', label: t('filters.drywall.acDropCeiling') },
  { value: 'pipeCovering', label: t('filters.drywall.pipeCovering') },
  { value: 'cornice', label: t('filters.drywall.cornice') },
  { value: 'acousticInsulation', label: t('filters.drywall.acousticInsulation') }
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
            className="standard-input"
            data-field="experience"
          />
          {errors['serviceDetails.experience'] && <span className="error-text">{errors['serviceDetails.experience']}</span>}
        </div>
        <div className="input-group">
          <label className="auth-form-label required">{t('filters.common.languages')}</label>
          <div className="checkbox-group" data-field="languages">
            {[
              { value: 'hebrew', label: t('languages.hebrew') },
              { value: 'russian', label: t('languages.russian') },
              { value: 'english', label: t('languages.english') },
              { value: 'french', label: t('languages.french') }
            ].map(lang => (
              <label key={lang.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.languages?.includes(lang.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.languages || [];
                    const newLangs = e.target.checked
                      ? [...current, lang.value]
                      : current.filter(l => l !== lang.value);
                    handleServiceDetailsChange('languages', newLangs);
                  }}
                />
                {lang.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.languages'] && <span className="error-text">{errors['serviceDetails.languages']}</span>}
        </div>
      </div>
    </div>
  );
};

export default DrywallForm;