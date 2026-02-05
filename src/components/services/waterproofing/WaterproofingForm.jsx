import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const WaterproofingForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
    
    const roofTypes = [
      { key: 'bituminousSheets', label: t('serviceForm.waterproofing.roofTypes.bituminousSheets') },
      { key: 'hotAsphalt', label: t('serviceForm.waterproofing.roofTypes.hotAsphalt') },
      { key: 'polyurethane', label: t('serviceForm.waterproofing.roofTypes.polyurethane') },
      { key: 'tileRoof', label: t('serviceForm.waterproofing.roofTypes.tileRoof') },
      { key: 'maintenance', label: t('serviceForm.waterproofing.roofTypes.maintenance') }
    ];

    const wallTypes = [
      { key: 'waterPenetration', label: t('serviceForm.waterproofing.wallTypes.waterPenetration') },
      { key: 'exteriorRestoration', label: t('serviceForm.waterproofing.wallTypes.exteriorRestoration') },
      { key: 'crackSealing', label: t('serviceForm.waterproofing.wallTypes.crackSealing') },
      { key: 'dampnessTreatment', label: t('serviceForm.waterproofing.wallTypes.dampnessTreatment') }
    ];

    const balconyTypes = [
      { key: 'beforeTiling', label: t('serviceForm.waterproofing.balconyTypes.beforeTiling') },
      { key: 'leakRepair', label: t('serviceForm.waterproofing.balconyTypes.leakRepair') },
      { key: 'tilingAndSealing', label: t('serviceForm.waterproofing.balconyTypes.tilingAndSealing') }
    ];

    const wetRoomTypes = [
      { key: 'bathroom', label: t('serviceForm.waterproofing.wetRoomTypes.bathroom') },
      { key: 'shower', label: t('serviceForm.waterproofing.wetRoomTypes.shower') },
      { key: 'toilet', label: t('serviceForm.waterproofing.wetRoomTypes.toilet') },
      { key: 'beforeRenovation', label: t('serviceForm.waterproofing.wetRoomTypes.beforeRenovation') }
    ];

    const undergroundTypes = [
      { key: 'basements', label: t('serviceForm.waterproofing.undergroundTypes.basements') },
      { key: 'foundations', label: t('serviceForm.waterproofing.undergroundTypes.foundations') },
      { key: 'undergroundWalls', label: t('serviceForm.waterproofing.undergroundTypes.undergroundWalls') }
    ];

    const inspectionTypes = [
      { key: 'leakDetection', label: t('serviceForm.waterproofing.inspectionTypes.leakDetection') },
      { key: 'moistureTests', label: t('serviceForm.waterproofing.inspectionTypes.moistureTests') },
      { key: 'thermalImaging', label: t('serviceForm.waterproofing.inspectionTypes.thermalImaging') }
    ];

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.waterproofing.title')}</h3>
      
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
              { value: 'sunday', label: t('days.sunday') },
              { value: 'monday', label: t('days.monday') },
              { value: 'tuesday', label: t('days.tuesday') },
              { value: 'wednesday', label: t('days.wednesday') },
              { value: 'thursday', label: t('days.thursday') },
              { value: 'friday', label: t('days.friday') },
              { value: 'allWeek', label: t('days.allWeek') }
            ].map(day => (
              <label key={day.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_days?.includes(day.value) || false}
                  onChange={() => handleExclusiveCheckbox('availability_days', day.value, 'allWeek', ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'])}
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
          <label>{t('serviceForm.common.workTypes')}</label>
          
          {/* Roof Waterproofing */}
          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('roofWaterproofing') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'roofWaterproofing']
                    : current.filter(t => t !== 'roofWaterproofing');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('serviceForm.waterproofing.workTypes.roofWaterproofing')}
            </label>
            
            {serviceDetails.work_types?.includes('roofWaterproofing') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="roof_waterproofing_types">
                  {roofTypes.map(type => (
                    <label key={type.key} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.roof_waterproofing_types?.includes(type.key) || false}
                        onChange={(e) => {
                          const current = serviceDetails.roof_waterproofing_types || [];
                          const newTypes = e.target.checked 
                            ? [...current, type.key]
                            : current.filter(t => t !== type.key);
                          handleServiceDetailsChange('roof_waterproofing_types', newTypes);
                        }}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.roof_waterproofing_types'] && <span className="error-text">{errors['serviceDetails.roof_waterproofing_types']}</span>}
              </div>
            )}
          </div>

          {/* Exterior Walls Waterproofing */}
          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('wallWaterproofing') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'wallWaterproofing']
                    : current.filter(t => t !== 'wallWaterproofing');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('serviceForm.waterproofing.workTypes.wallWaterproofing')}
            </label>
            
            {serviceDetails.work_types?.includes('wallWaterproofing') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="wall_waterproofing_types">
                  {wallTypes.map(type => (
                    <label key={type.key} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.wall_waterproofing_types?.includes(type.key) || false}
                        onChange={(e) => {
                          const current = serviceDetails.wall_waterproofing_types || [];
                          const newTypes = e.target.checked 
                            ? [...current, type.key]
                            : current.filter(t => t !== type.key);
                          handleServiceDetailsChange('wall_waterproofing_types', newTypes);
                        }}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.wall_waterproofing_types'] && <span className="error-text">{errors['serviceDetails.wall_waterproofing_types']}</span>}
              </div>
            )}
          </div>

          {/* Balcony Waterproofing */}
          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('balconyWaterproofing') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'balconyWaterproofing']
                    : current.filter(t => t !== 'balconyWaterproofing');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('serviceForm.waterproofing.workTypes.balconyWaterproofing')}
            </label>
            
            {serviceDetails.work_types?.includes('balconyWaterproofing') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="balcony_waterproofing_types">
                  {balconyTypes.map(type => (
                    <label key={type.key} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.balcony_waterproofing_types?.includes(type.key) || false}
                        onChange={(e) => {
                          const current = serviceDetails.balcony_waterproofing_types || [];
                          const newTypes = e.target.checked 
                            ? [...current, type.key]
                            : current.filter(t => t !== type.key);
                          handleServiceDetailsChange('balcony_waterproofing_types', newTypes);
                        }}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.balcony_waterproofing_types'] && <span className="error-text">{errors['serviceDetails.balcony_waterproofing_types']}</span>}
              </div>
            )}
          </div>

          {/* Wet Rooms Waterproofing */}
          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('wetRoomWaterproofing') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'wetRoomWaterproofing']
                    : current.filter(t => t !== 'wetRoomWaterproofing');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('serviceForm.waterproofing.workTypes.wetRoomWaterproofing')}
            </label>
            
            {serviceDetails.work_types?.includes('wetRoomWaterproofing') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="wet_room_waterproofing_types">
                  {wetRoomTypes.map(type => (
                    <label key={type.key} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.wet_room_waterproofing_types?.includes(type.key) || false}
                        onChange={(e) => {
                          const current = serviceDetails.wet_room_waterproofing_types || [];
                          const newTypes = e.target.checked 
                            ? [...current, type.key]
                            : current.filter(t => t !== type.key);
                          handleServiceDetailsChange('wet_room_waterproofing_types', newTypes);
                        }}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.wet_room_waterproofing_types'] && <span className="error-text">{errors['serviceDetails.wet_room_waterproofing_types']}</span>}
              </div>
            )}
          </div>

          {/* Underground Waterproofing */}
          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('undergroundWaterproofing') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'undergroundWaterproofing']
                    : current.filter(t => t !== 'undergroundWaterproofing');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('serviceForm.waterproofing.workTypes.undergroundWaterproofing')}
            </label>
            
            {serviceDetails.work_types?.includes('undergroundWaterproofing') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="underground_waterproofing_types">
                  {undergroundTypes.map(type => (
                    <label key={type.key} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.underground_waterproofing_types?.includes(type.key) || false}
                        onChange={(e) => {
                          const current = serviceDetails.underground_waterproofing_types || [];
                          const newTypes = e.target.checked 
                            ? [...current, type.key]
                            : current.filter(t => t !== type.key);
                          handleServiceDetailsChange('underground_waterproofing_types', newTypes);
                        }}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.underground_waterproofing_types'] && <span className="error-text">{errors['serviceDetails.underground_waterproofing_types']}</span>}
              </div>
            )}
          </div>

          {/* Inspection & Equipment */}
          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('inspectionEquipment') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'inspectionEquipment']
                    : current.filter(t => t !== 'inspectionEquipment');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('serviceForm.waterproofing.workTypes.inspectionEquipment')}
            </label>
            
            {serviceDetails.work_types?.includes('inspectionEquipment') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="inspection_equipment_types">
                  {inspectionTypes.map(type => (
                    <label key={type.key} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.inspection_equipment_types?.includes(type.key) || false}
                        onChange={(e) => {
                          const current = serviceDetails.inspection_equipment_types || [];
                          const newTypes = e.target.checked 
                            ? [...current, type.key]
                            : current.filter(t => t !== type.key);
                          handleServiceDetailsChange('inspection_equipment_types', newTypes);
                        }}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.inspection_equipment_types'] && <span className="error-text">{errors['serviceDetails.inspection_equipment_types']}</span>}
              </div>
            )}
          </div>

          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
        </div>
      </div>
    </div>
  );
};

export default WaterproofingForm;