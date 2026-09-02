import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const EventEquipmentRentalForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.event_equipment_rental.title')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.availabilityDays')}</label>
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
          <label className="auth-form-label required">{t('serviceForm.event.equipmentRentalTypes')}</label>

          <div style={{ marginBottom: '15px' }}>
            <label className="checkbox-item" style={{ fontWeight: '600' }}>
              <input
                type="checkbox"
                checked={serviceDetails.equipment_rental_types?.includes('foodMachines') || false}
                onChange={(e) => {
                  const current = serviceDetails.equipment_rental_types || [];
                  const newTypes = e.target.checked
                    ? [...current, 'foodMachines']
                    : current.filter(t => t !== 'foodMachines');
                  handleServiceDetailsChange('equipment_rental_types', newTypes);
                }}
              />
              {t('serviceForm.event.foodMachines')}
            </label>

            {serviceDetails.equipment_rental_types?.includes('foodMachines') && (
              <div style={{ marginRight: '30px', marginTop: '8px' }}>
                <div className="checkbox-group" data-field="food_machine_types">
                  {[
                    { value: 'popcorn', label: t('filters.events.popcorn') },
                    { value: 'cottonCandy', label: t('filters.events.cottonCandy') },
                    { value: 'slushie', label: t('filters.events.slushie') },
                    { value: 'waffle', label: t('filters.events.waffle') },
                    { value: 'granita', label: t('filters.events.granita') },
                    { value: 'softServe', label: t('filters.events.softServe') },
                    { value: 'milkshake', label: t('filters.events.milkshake') },
                    { value: 'juicer', label: t('filters.events.juicer') },
                    { value: 'hotdog', label: t('filters.events.hotdog') },
                    { value: 'crepe', label: t('filters.events.crepe') },
                    { value: 'chocolateFountain', label: t('filters.events.chocolateFountain') }
                  ].map(type => (
                    <label key={type.value} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.food_machine_types?.includes(type.value) || false}
                        onChange={(e) => {
                          const current = serviceDetails.food_machine_types || [];
                          const newTypes = e.target.checked
                            ? [...current, type.value]
                            : current.filter(t => t !== type.value);
                          handleServiceDetailsChange('food_machine_types', newTypes);
                        }}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.food_machine_types'] && <span className="error-text">{errors['serviceDetails.food_machine_types']}</span>}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label className="checkbox-item" style={{ fontWeight: '600' }}>
              <input
                type="checkbox"
                checked={serviceDetails.equipment_rental_types?.includes('inflatables') || false}
                onChange={(e) => {
                  const current = serviceDetails.equipment_rental_types || [];
                  const newTypes = e.target.checked
                    ? [...current, 'inflatables']
                    : current.filter(t => t !== 'inflatables');
                  handleServiceDetailsChange('equipment_rental_types', newTypes);
                }}
              />
              {t('serviceForm.event.inflatables')}
            </label>

            {serviceDetails.equipment_rental_types?.includes('inflatables') && (
              <div style={{ marginRight: '30px', marginTop: '8px' }}>
                <div className="checkbox-group" data-field="inflatable_game_types">
                  {[
                    { value: 'bouncyHouses', label: t('filters.events.bouncyHouses') },
                    { value: 'ג\'ימבורי', label: t('filters.events.gymboree') },
                    { value: 'gameStations', label: t('filters.events.gameStations') }
                  ].map(type => (
                    <label key={type.value} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.inflatable_game_types?.includes(type.value) || false}
                        onChange={(e) => {
                          const current = serviceDetails.inflatable_game_types || [];
                          const newTypes = e.target.checked
                            ? [...current, type.value]
                            : current.filter(t => t !== type.value);
                          handleServiceDetailsChange('inflatable_game_types', newTypes);
                        }}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.inflatable_game_types'] && <span className="error-text">{errors['serviceDetails.inflatable_game_types']}</span>}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label className="checkbox-item" style={{ fontWeight: '600' }}>
              <input
                type="checkbox"
                checked={serviceDetails.equipment_rental_types?.includes('effectMachines') || false}
                onChange={(e) => {
                  const current = serviceDetails.equipment_rental_types || [];
                  const newTypes = e.target.checked
                    ? [...current, 'effectMachines']
                    : current.filter(t => t !== 'effectMachines');
                  handleServiceDetailsChange('equipment_rental_types', newTypes);
                }}
              />
              {t('serviceForm.event.effectMachines')}
            </label>

            {serviceDetails.equipment_rental_types?.includes('effectMachines') && (
              <div style={{ marginRight: '30px', marginTop: '8px' }}>
                <div className="checkbox-group" data-field="effect_machine_types">
                  {[
                    { value: 'smokeMachine', label: t('filters.events.smokeMachine') },
                    { value: 'snowMachine', label: t('filters.events.snowMachine') },
                    { value: 'bubbleMachine', label: t('filters.events.bubbleMachine') }
                  ].map(type => (
                    <label key={type.value} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.effect_machine_types?.includes(type.value) || false}
                        onChange={(e) => {
                          const current = serviceDetails.effect_machine_types || [];
                          const newTypes = e.target.checked
                            ? [...current, type.value]
                            : current.filter(t => t !== type.value);
                          handleServiceDetailsChange('effect_machine_types', newTypes);
                        }}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.effect_machine_types'] && <span className="error-text">{errors['serviceDetails.effect_machine_types']}</span>}
              </div>
            )}
          </div>

          {errors['serviceDetails.equipment_rental_types'] && <span className="error-text">{errors['serviceDetails.equipment_rental_types']}</span>}
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

export default EventEquipmentRentalForm;
