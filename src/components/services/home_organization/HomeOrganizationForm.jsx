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
                checked={serviceDetails.work_types?.includes('general') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'general']
                    : current.filter(t => t !== 'general');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.homeOrg.generalOrganization')}
            </label>
            
            {serviceDetails.work_types?.includes('general') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="general_organization_types">
                 {[
  { value: 'fullHouse', label: t('filters.homeOrg.fullHome') },
  { value: 'rooms', label: t('filters.homeOrg.rooms') },
  { value: 'kitchen', label: t('filters.homeOrg.kitchen') },
  { value: 'kidsRoom', label: t('filters.homeOrg.kidsRoom') },
  { value: 'closets', label: t('filters.homeOrg.closets') },
  { value: 'bathroom', label: t('filters.homeOrg.bathroom') }
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
                checked={serviceDetails.work_types?.includes('sorting') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'sorting']
                    : current.filter(t => t !== 'sorting');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.homeOrg.sortingOrganization')}
            </label>
            
            {serviceDetails.work_types?.includes('sorting') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="sorting_types">
             {[
  { value: 'itemSorting', label: t('filters.homeOrg.itemSorting') },
  { value: 'clothesSorting', label: t('filters.homeOrg.clothesSorting') },
  { value: 'toySorting', label: t('filters.homeOrg.toySorting') },
  { value: 'donation', label: t('filters.homeOrg.donationPrep') }
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
                checked={serviceDetails.work_types?.includes('professional') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'professional']
                    : current.filter(t => t !== 'professional');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.homeOrg.professionalOrganization')}
            </label>
            
            {serviceDetails.work_types?.includes('professional') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="professional_organization_types">
                 {[
  { value: 'storageSolutions', label: t('filters.homeOrg.storageSolutions') },
  { value: 'smallSpaces', label: t('filters.homeOrg.smallSpaceOptimization') },
  { value: 'shelfDesign', label: t('filters.homeOrg.shelfDesign') }
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

export default HomeOrganizationForm;