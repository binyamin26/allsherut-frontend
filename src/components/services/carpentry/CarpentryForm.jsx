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
                checked={serviceDetails.work_types?.includes('furnitureBuilding') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'furnitureBuilding']
                    : current.filter(t => t !== 'furnitureBuilding');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.carpentry.furnitureBuilding')}
            </label>
            
            {serviceDetails.work_types?.includes('furnitureBuilding') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="furniture_building_types">
                 {[
  { value: 'wallClosets', label: t('filters.carpentry.wallClosets') },
  { value: 'slidingClosets', label: t('filters.carpentry.slidingClosets') },
  { value: 'bathroomCabinets', label: t('filters.carpentry.bathroomCabinets') },
  { value: 'bedroomFurniture', label: t('filters.carpentry.bedroomFurniture') },
  { value: 'tableBuilding', label: t('filters.carpentry.tableBuilding') },
  { value: 'chairBuilding', label: t('filters.carpentry.chairBuilding') },
  { value: 'tvUnitBuilding', label: t('filters.carpentry.tvUnitBuilding') },
  { value: 'libraryBuilding', label: t('filters.carpentry.libraryBuilding') },
  { value: 'customFurniture', label: t('filters.carpentry.customFurniture') },
  { value: 'shelfBuilding', label: t('filters.carpentry.shelfBuilding') },
  { value: 'walkInCloset', label: t('filters.carpentry.walkInCloset') },
  { value: 'woodenBed', label: t('filters.carpentry.woodenBed') },
  { value: 'kitchenFurniture', label: t('filters.carpentry.kitchenFurniture') }
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
                checked={serviceDetails.work_types?.includes('furnitureRepair') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'furnitureRepair']
                    : current.filter(t => t !== 'furnitureRepair');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.carpentry.furnitureRepair')}
            </label>
            
            {serviceDetails.work_types?.includes('furnitureRepair') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="furniture_repair_types">
             {[
  { value: 'repairWallClosets', label: t('serviceForm.carpentry.repairWallClosets') },
  { value: 'repairTable', label: t('serviceForm.carpentry.repairTable') },
  { value: 'repairChairs', label: t('serviceForm.carpentry.repairChairs') },
  { value: 'repairSlidingClosets', label: t('serviceForm.carpentry.repairSlidingClosets') },
  { value: 'repairBathroomCabinets', label: t('serviceForm.carpentry.repairBathroomCabinets') },
  { value: 'repairBedroomFurniture', label: t('serviceForm.carpentry.repairBedroomFurniture') },
  { value: 'repairTvUnit', label: t('serviceForm.carpentry.repairTvUnit') },
  { value: 'repairLibrary', label: t('serviceForm.carpentry.repairLibrary') },
  { value: 'repairOther', label: t('serviceForm.carpentry.repairOther') }
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
                checked={serviceDetails.work_types?.includes('otherWork') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'otherWork']
                    : current.filter(t => t !== 'otherWork');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
           {t('serviceForm.carpentry.otherWork')}
            </label>
            
            {serviceDetails.work_types?.includes('otherWork') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="other_carpentry_types">
              {[
  { value: 'wallCladding', label: t('serviceForm.carpentry.wallCladding') },
  { value: 'disassembly', label: t('serviceForm.carpentry.disassembly') },
  { value: 'doorFabrication', label: t('serviceForm.carpentry.doorFabrication') },
  { value: 'doorRepair', label: t('serviceForm.carpentry.doorRepair') },
  { value: 'doorRenovation', label: t('serviceForm.carpentry.doorRenovation') },
  { value: 'loft', label: t('serviceForm.carpentry.loft') },
  { value: 'stairs', label: t('serviceForm.carpentry.stairs') },
  { value: 'lattice', label: t('serviceForm.carpentry.lattice') },
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
                checked={serviceDetails.work_types?.includes('outdoorCarpentry') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'outdoorCarpentry']
                    : current.filter(t => t !== 'outdoorCarpentry');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
             {t('serviceForm.carpentry.outdoorCarpentry')}
            </label>
            
            {serviceDetails.work_types?.includes('outdoorCarpentry') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                
                <div style={{marginBottom: '15px'}}>
                  <label className="checkbox-item" style={{fontWeight: '600'}}>
                    <input
                      type="checkbox"
                      checked={serviceDetails.outdoor_carpentry_types?.includes('pergolas') || false}
                      onChange={(e) => {
                        const current = serviceDetails.outdoor_carpentry_types || [];
                        const newTypes = e.target.checked 
                          ? [...current, 'pergolas']
                          : current.filter(t => t !== 'pergolas');
                        handleServiceDetailsChange('outdoor_carpentry_types', newTypes);
                      }}
                    />
                    {t('serviceForm.carpentry.pergolas')}
                  </label>
                  
                  {serviceDetails.outdoor_carpentry_types?.includes('pergolas') && (
                    <div style={{marginRight: '30px', marginTop: '10px'}}>
                      <div className="checkbox-group" data-field="pergola_types">
                    {[
  { value: 'woodPergolas', label: t('serviceForm.carpentry.woodPergolas') },
  { value: 'shadePergolas', label: t('serviceForm.carpentry.shadePergolas') },
  { value: 'balconyEnclosure', label: t('serviceForm.carpentry.balconyEnclosure') }
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
                      checked={serviceDetails.outdoor_carpentry_types?.includes('decks') || false}
                      onChange={(e) => {
                        const current = serviceDetails.outdoor_carpentry_types || [];
                        const newTypes = e.target.checked 
                          ? [...current, 'decks']
                          : current.filter(t => t !== 'decks');
                        handleServiceDetailsChange('outdoor_carpentry_types', newTypes);
                      }}
                    />
                    {t('serviceForm.carpentry.decks')}
                  </label>
                  
                  {serviceDetails.outdoor_carpentry_types?.includes('decks') && (
                    <div style={{marginRight: '30px', marginTop: '10px'}}>
                      <div className="checkbox-group" data-field="deck_types">
                    {[
  { value: 'naturalWoodDecks', label: t('serviceForm.carpentry.naturalWoodDecks') },
  { value: 'compositeDecks', label: t('serviceForm.carpentry.compositeDecks') },
  { value: 'deckRenovation', label: t('serviceForm.carpentry.deckRenovation') }
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
                      checked={serviceDetails.outdoor_carpentry_types?.includes('fences') || false}
                      onChange={(e) => {
                        const current = serviceDetails.outdoor_carpentry_types || [];
                        const newTypes = e.target.checked 
                          ? [...current, 'fences']
                          : current.filter(t => t !== 'fences');
                        handleServiceDetailsChange('outdoor_carpentry_types', newTypes);
                      }}
                    />
                 {t('serviceForm.carpentry.fences')}
                  </label>
                  
                  {serviceDetails.outdoor_carpentry_types?.includes('fences') && (
                    <div style={{marginRight: '30px', marginTop: '10px'}}>
                      <div className="checkbox-group" data-field="fence_types">
                     {[
  { value: 'woodFences', label: t('serviceForm.carpentry.woodFences') },
  { value: 'gardenPartitions', label: t('serviceForm.carpentry.gardenPartitions') },
  { value: 'woodGates', label: t('serviceForm.carpentry.woodGates') }
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

export default CarpentryForm;