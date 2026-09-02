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
                checked={serviceDetails.work_types?.includes('structureWork') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'structureWork']
                    : current.filter(t => t !== 'structureWork');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.contractor.structureWork')}
            </label>
            
            {serviceDetails.work_types?.includes('structureWork') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="structure_work_types">
                 {[
  { value: 'buildingFrame', label: t('serviceForm.contractor.buildingFrame') },
  { value: 'concretePours', label: t('serviceForm.contractor.concretePours') },
  { value: 'formwork', label: t('serviceForm.contractor.formwork') },
  { value: 'structuralReinforcement', label: t('serviceForm.contractor.structuralReinforcement') },
  { value: 'blockWalls', label: t('serviceForm.contractor.blockWalls') },
  { value: 'demolitionRebuild', label: t('serviceForm.contractor.demolitionRebuild') }
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
                checked={serviceDetails.work_types?.includes('generalRenovation') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'generalRenovation']
                    : current.filter(t => t !== 'generalRenovation');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.contractor.generalRenovation')}
            </label>
            
            {serviceDetails.work_types?.includes('generalRenovation') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="general_renovation_types">
                {[
  { value: 'fullApartmentReno', label: t('serviceForm.contractor.fullApartmentReno') },
  { value: 'roomRenovation', label: t('serviceForm.contractor.roomRenovation') },
  { value: 'bathroomReno', label: t('serviceForm.contractor.bathroomReno') },
  { value: 'kitchenReno', label: t('serviceForm.contractor.kitchenReno') },
  { value: 'flooringReplacement', label: t('serviceForm.contractor.flooringReplacement') },
  { value: 'drywallWork', label: t('serviceForm.contractor.drywallWork') },
  { value: 'plasterWork', label: t('serviceForm.contractor.plasterWork') },
  { value: 'balconyEnclosure', label: t('serviceForm.contractor.balconyEnclosure') },
  { value: 'professionalPainting', label: t('serviceForm.contractor.professionalPainting') },
  { value: 'doorFrameReplacement', label: t('serviceForm.contractor.doorFrameReplacement') }
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
                checked={serviceDetails.work_types?.includes('electricPlumbing') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'electricPlumbing']
                    : current.filter(t => t !== 'electricPlumbing');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.contractor.electricPlumbing')}
            </label>
            
            {serviceDetails.work_types?.includes('electricPlumbing') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="electric_plumbing_types">
                 {[
  { value: 'electricalWork', label: t('serviceForm.contractor.electricalWork') },
  { value: 'panelReplacement', label: t('serviceForm.contractor.panelReplacement') },
  { value: 'generalPlumbing', label: t('serviceForm.contractor.generalPlumbing') },
  { value: 'pipeReplacement', label: t('serviceForm.contractor.pipeReplacement') },
  { value: 'leakDetection', label: t('serviceForm.contractor.leakDetection') }
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
                checked={serviceDetails.work_types?.includes('exteriorWork') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'exteriorWork']
                    : current.filter(t => t !== 'exteriorWork');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.contractor.exteriorWork')}
            </label>
            
            {serviceDetails.work_types?.includes('exteriorWork') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="exterior_work_types">
               {[
  { value: 'exteriorFlooring', label: t('serviceForm.contractor.exteriorFlooring') },
  { value: 'pergolaConstruction', label: t('serviceForm.contractor.pergolaConstruction') },
  { value: 'stoneCladding', label: t('serviceForm.contractor.stoneCladding') },
  { value: 'fencing', label: t('serviceForm.contractor.fencing') },
  { value: 'gardenPathways', label: t('serviceForm.contractor.gardenPathways') }
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
                checked={serviceDetails.work_types?.includes('facadeRepair') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'facadeRepair']
                    : current.filter(t => t !== 'facadeRepair');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.contractor.facadeRepair')}
            </label>
            
            {serviceDetails.work_types?.includes('facadeRepair') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="facade_repair_types">
              {[
  { value: 'exteriorPlasterRepair', label: t('serviceForm.contractor.exteriorPlasterRepair') },
  { value: 'exteriorWallRestoration', label: t('serviceForm.contractor.exteriorWallRestoration') },
  { value: 'wallCrackSealing', label: t('serviceForm.contractor.wallCrackSealing') },
  { value: 'fallingPlasterTreatment', label: t('serviceForm.contractor.fallingPlasterTreatment') }
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

export default ContractorForm;