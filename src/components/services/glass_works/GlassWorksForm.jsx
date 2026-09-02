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
                checked={serviceDetails.work_types?.includes('showers') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'showers']
                    : current.filter(t => t !== 'showers');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.glass.showerGlass')}
            </label>
            
            {serviceDetails.work_types?.includes('showers') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="shower_glass_types">
              {[
  { value: 'showerInstall', label: t('filters.glass.showerInstall') },
  { value: 'showerRepair', label: t('filters.glass.showerRepair') },
  { value: 'showerGlassReplacement', label: t('filters.glass.showerGlassReplacement') },
  { value: 'showerDoors', label: t('filters.glass.showerDoors') }
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
                checked={serviceDetails.work_types?.includes('homeGlass') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'homeGlass']
                    : current.filter(t => t !== 'homeGlass');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.glass.windowsDoors')}
            </label>
            
            {serviceDetails.work_types?.includes('homeGlass') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="windows_doors_glass_types">
            {[
  { value: 'windowReplacement', label: t('filters.glass.windowReplacement') },
  { value: 'doubleGlazing', label: t('filters.glass.doubleGlazing') },
  { value: 'reglazing', label: t('filters.glass.reglazing') },
  { value: 'interiorGlassDoors', label: t('filters.glass.interiorGlassDoors') },
  { value: 'glassPartitions', label: t('filters.glass.glassPartitions') }
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
                checked={serviceDetails.work_types?.includes('furniture') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'furniture']
                    : current.filter(t => t !== 'furniture');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.glass.kitchenHome')}
            </label>
            
            {serviceDetails.work_types?.includes('furniture') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="kitchen_home_glass_types">
        {[
  { value: 'kitchenBacksplash', label: t('filters.glass.kitchenBacksplash') },
  { value: 'glassShelves', label: t('filters.glass.glassShelves') },
  { value: 'glassTables', label: t('filters.glass.glassTables') },
  { value: 'bathroomMirrors', label: t('filters.glass.bathroomMirrors') },
  { value: 'decorativeMirrors', label: t('filters.glass.decorativeMirrors') }
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
                checked={serviceDetails.work_types?.includes('partitions') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'partitions']
                    : current.filter(t => t !== 'partitions');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.glass.specialSafety')}
            </label>
            
            {serviceDetails.work_types?.includes('partitions') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="special_safety_glass_types">
           {[
  { value: 'temperedGlass', label: t('filters.glass.temperedGlass') },
  { value: 'smartGlass', label: t('filters.glass.smartGlass') },
  { value: 'securityGlass', label: t('filters.glass.securityGlass') },
  { value: 'acousticGlass', label: t('filters.glass.acousticGlass') },
  { value: 'decorativeGlass', label: t('filters.glass.decorativeGlass') }
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
                checked={serviceDetails.work_types?.includes('repairs') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'repairs']
                    : current.filter(t => t !== 'repairs');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
          {t('serviceForm.glass.repairCustom')}
            </label>
            
            {serviceDetails.work_types?.includes('repairs') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="repair_custom_types">
          {[
  { value: 'scratchRepair', label: t('filters.glass.scratchRepair') },
  { value: 'glassPolishing', label: t('filters.glass.glassPolishing') },
  { value: 'customCutting', label: t('filters.glass.customCutting') }
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

export default GlassWorksForm;