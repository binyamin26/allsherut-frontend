import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const AluminumForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  return (
    <div className="service-details-form">
    <h3>{t('serviceForm.aluminum.title')}</h3>
      
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
                checked={serviceDetails.work_types?.includes('windowsDoors') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'windowsDoors']
                    : current.filter(t => t !== 'windowsDoors');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
 {t('serviceForm.aluminum.windowsDoors')}
            </label>
            
            {serviceDetails.work_types?.includes('windowsDoors') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="windows_doors_types">
                  {[
  { value: 'installWindows', label: t('serviceForm.aluminum.installWindows') },
  { value: 'aluminumDoors', label: t('serviceForm.aluminum.aluminumDoors') },
  { value: 'slidingDoors', label: t('serviceForm.aluminum.slidingDoors') },
  { value: 'entryDoors', label: t('serviceForm.aluminum.entryDoors') },
  { value: 'mosquitoNets', label: t('serviceForm.aluminum.mosquitoNets') },
  { value: 'manualShutters', label: t('serviceForm.aluminum.manualShutters') },
  { value: 'electricShutters', label: t('serviceForm.aluminum.electricShutters') }
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
                checked={serviceDetails.work_types?.includes('pergolas') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'pergolas']
                    : current.filter(t => t !== 'pergolas');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
 {t('serviceForm.aluminum.pergolasOutdoor')}
            </label>
            
            {serviceDetails.work_types?.includes('pergolas') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="pergolas_outdoor_types">
             {[
  { value: 'aluminumPergolas', label: t('serviceForm.aluminum.pergolas') },
  { value: 'balconyEnclosure', label: t('serviceForm.aluminum.balconyEnclosure') },
  { value: 'exteriorCladding', label: t('serviceForm.aluminum.exteriorCladding') },
  { value: 'railings', label: t('serviceForm.aluminum.railings') }
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
                checked={serviceDetails.work_types?.includes('repairs') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'repairs']
                    : current.filter(t => t !== 'repairs');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
 {t('serviceForm.aluminum.repairsService')}
            </label>
            
            {serviceDetails.work_types?.includes('repairs') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="repairs_service_types">
{[
  { value: 'repairShutterMotor', label: t('serviceForm.aluminum.repairShutterMotor') },
  { value: 'repairTracks', label: t('serviceForm.aluminum.repairTracks') },
  { value: 'repairWheels', label: t('serviceForm.aluminum.repairWheels') },
  { value: 'replaceHandles', label: t('serviceForm.aluminum.replaceHandles') },
  { value: 'sealingRenewal', label: t('serviceForm.aluminum.sealingRenewal') },
  { value: 'repairManualShutters', label: t('serviceForm.aluminum.repairManualShutters') }
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
                checked={serviceDetails.work_types?.includes('cladding') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'cladding']
                    : current.filter(t => t !== 'cladding');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
               {t('serviceForm.aluminum.cladding')}
            </label>
            
            {serviceDetails.work_types?.includes('cladding') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="cladding_types">
     {[
  { value: 'pipeCovering', label: t('serviceForm.aluminum.pipeCovering') },
  { value: 'meterCovering', label: t('serviceForm.aluminum.meterCovering') },
  { value: 'decorativeBoxes', label: t('serviceForm.aluminum.decorativeBoxes') },
  { value: 'acLineCovering', label: t('serviceForm.aluminum.acLineCovering') },
  { value: 'acMotorProtection', label: t('serviceForm.aluminum.acMotorProtection') },
  { value: 'wallCladding', label: t('serviceForm.aluminum.wallCladding') },
  { value: 'decorativeCladding', label: t('serviceForm.aluminum.decorativeCladding') },
  { value: 'shutterBoxCladding', label: t('serviceForm.aluminum.shutterBoxCladding') }
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

export default AluminumForm;