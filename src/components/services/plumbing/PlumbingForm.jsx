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
                checked={serviceDetails.work_types?.includes('blockages') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'blockages']
                    : current.filter(t => t !== 'blockages');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.plumbing.blockages')}
            </label>
            
            {serviceDetails.work_types?.includes('blockages') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="blockage_types">
                {[
  { value: 'homeBlockage', label: t('filters.plumbing.homeBlockage') },
  { value: 'submersiblePump', label: t('filters.plumbing.submersiblePump') },
  { value: 'buildingBlockage', label: t('filters.plumbing.buildingBlockage') }
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
                checked={serviceDetails.work_types?.includes('pipeRepair') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'pipeRepair']
                    : current.filter(t => t !== 'pipeRepair');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
         {t('serviceForm.plumbing.pipeRepair')}
            </label>
            
            {serviceDetails.work_types?.includes('pipeRepair') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="pipe_repair_types">
                 {[
  { value: 'malePipeRepair', label: t( 'filters.plumbing.malePipeRepair') },
  { value: 'homePipeDamage', label: t('filters.plumbing.homePipeDamage') },
  { value: 'buildingPipeDamage', label: t('filters.plumbing.buildingPipeDamage') },
  { value: 'pressureBoost', label: t('filters.plumbing.pressureBoost') },
  { value: 'gardenPipes', label: t('filters.plumbing.gardenPipes') },
  { value: 'otherPipeRepairs', label: t('filters.plumbing.otherPipeRepairs') },
  { value: 'sewerNonDestructive', label: t('filters.plumbing.sewerNonDestructive') },
  { value: 'leakDetection', label: t('filters.plumbing.leakDetection') }
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
                checked={serviceDetails.work_types?.includes('largeWork') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'largeWork']
                    : current.filter(t => t !== 'largeWork');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.plumbing.largeWork')}
            </label>
            
            {serviceDetails.work_types?.includes('largeWork') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="large_work_types">
                {[
  { value: 'homePipeReplacement', label: t('filters.plumbing.homePipeReplacement') },
  { value: 'buildingPipeReplacement', label: t('filters.plumbing.buildingPipeReplacement') },
  { value: 'newWaterPoints', label: t('filters.plumbing.newWaterPoints') },
  { value: 'homeSewerReplacement', label: t('filters.plumbing.homeSewerReplacement') },
  { value: 'buildingSewerReplacement', label: t('filters.plumbing.buildingSewerReplacement') },
  { value: 'newSewerLine', label: t('filters.plumbing.newSewerLine') },
  { value: 'gardenPipeReplacement', label: t('filters.plumbing.gardenPipeReplacement') },
  { value: 'pierInstallation', label: t('filters.plumbing.pierInstallation') }
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
                checked={serviceDetails.work_types?.includes('fixtureRepair') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'fixtureRepair']
                    : current.filter(t => t !== 'fixtureRepair');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
         {t('serviceForm.plumbing.fixtureInstallation')}
            </label>
            
            {serviceDetails.work_types?.includes('fixtureRepair') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="fixture_types">
               {[
  { value: 'waterBar', label: t('filters.plumbing.waterBar') },
  { value: 'concealedCistern', label: t('filters.plumbing.concealedCistern') },
  { value: 'faucets', label: t('filters.plumbing.faucets') },
  { value: 'toilets', label: t('filters.plumbing.toilets') },
  { value: 'waterFilters', label: t('filters.plumbing.waterFilters') },
  { value: 'garbageDisposal', label: t('filters.plumbing.garbageDisposal') },
  { value: 'disposalRepair', label: t('filters.plumbing.disposalRepair') },
  { value: 'sinks', label: t('filters.plumbing.sinks') },
  { value: 'dishwasherPrep', label: t('filters.plumbing.dishwasherPrep') },
  { value: 'showerBase', label: t('filters.plumbing.showerBase') },
  { value: 'otherFixtures', label: t('filters.plumbing.otherFixtures') },
  { value: 'toiletFlush', label: t('filters.plumbing.toiletFlush') },
  { value: 'bidet', label: t('filters.plumbing.bidet') },
  { value: 'wallMountedToilet', label: t('filters.plumbing.wallMountedToilet') },
  { value: 'checkValve', label: t('filters.plumbing.checkValve') },
  { value: 'underSinkSystems', label: t('filters.plumbing.underSinkSystems') },
  { value: 'solarHeaterInstall', label: t('filters.plumbing.solarHeaterInstall') },
  { value: 'solarHeaterRepair', label: t('filters.plumbing.solarHeaterRepair') }
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

export default PlumbingForm;