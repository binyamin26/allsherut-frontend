import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const VEHICLE_TYPES = [
  { value: '5 מקומות',           key: 'serviceForm.driver.seats5' },
  { value: '7 מקומות',           key: 'serviceForm.driver.seats7' },
  { value: '9 מקומות',           key: 'serviceForm.driver.seats9' },
  { value: 'מיניבוס (14-23 מושבים)', key: 'serviceForm.driver.minibus' },
  { value: 'אוטובוס (50-60 מושבים)', key: 'serviceForm.driver.bus' },
];

const SERVICE_TYPES = [
  { value: 'דרייבר', key: 'serviceForm.driver.privateDriver' },
  { value: 'מונית',  key: 'serviceForm.driver.taxi' },
];

const TRANSPORTATION_TYPES = [
  { value: 'הסעות לאירועים', key: 'serviceForm.driver.eventTransport' },
  { value: 'הסעות תלמידים',  key: 'serviceForm.driver.studentTransport' },
  { value: 'הסעות טיולים',   key: 'serviceForm.driver.tripTransport' },
  { value: 'הסעות לנתב"ג',  key: 'serviceForm.driver.airportTransport' },
];

const AVAILABILITY_HOURS = [
  { value: 'בוקר',           key: 'hours.morning' },
  { value: 'אחר הצהריים',    key: 'hours.afternoon' },
  { value: 'ערב',            key: 'hours.evening' },
  { value: 'לילה',           key: 'hours.night' },
  { value: '24/6',           key: 'hours.twentyFourSix' },
];

const LANGUAGES_OPTIONS = [
  { value: 'עברית',   key: 'languages.hebrew' },
  { value: 'רוסית',   key: 'languages.russian' },
  { value: 'אנגלית',  key: 'languages.english' },
  { value: 'צרפתית',  key: 'languages.french' },
];

const DriverForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.driver.title')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.availabilityHours')}</label>
          <div className="checkbox-group" data-field="availability_hours">
            {AVAILABILITY_HOURS.map(hour => (
              <label key={hour.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_hours?.includes(hour.value) || false}
                  onChange={() => handleExclusiveCheckbox('availability_hours', hour.value, '24/6', ['בוקר', 'אחר הצהריים', 'ערב', 'לילה'])}
                />
                {t(hour.key)}
              </label>
            ))}
          </div>
          {errors['serviceDetails.availability_hours'] && (
            <span className="error-text">{errors['serviceDetails.availability_hours']}</span>
          )}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.driver.serviceType')}</label>
          <div className="checkbox-group" data-field="service_type">
            {SERVICE_TYPES.map(type => (
              <label key={type.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.service_type === type.value}
                  onChange={() => handleServiceDetailsChange('service_type', serviceDetails.service_type === type.value ? '' : type.value)}
                />
                {t(type.key)}
              </label>
            ))}
          </div>
          {errors['serviceDetails.service_type'] && (
            <span className="error-text">{errors['serviceDetails.service_type']}</span>
          )}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.driver.transportationType')}</label>
          <div className="checkbox-group" data-field="transportation_type">
            {TRANSPORTATION_TYPES.map(type => (
              <label key={type.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.transportation_type?.includes(type.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.transportation_type || [];
                    const updated = e.target.checked
                      ? [...current, type.value]
                      : current.filter(v => v !== type.value);
                    handleServiceDetailsChange('transportation_type', updated);
                  }}
                />
                {t(type.key)}
              </label>
            ))}
          </div>
          {errors['serviceDetails.transportation_type'] && (
            <span className="error-text">{errors['serviceDetails.transportation_type']}</span>
          )}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.driver.vehicleType')}</label>
          <div className="checkbox-group" data-field="vehicle_type">
            {VEHICLE_TYPES.map(type => (
              <label key={type.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.vehicle_type?.includes(type.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.vehicle_type || [];
                    const updated = e.target.checked
                      ? [...current, type.value]
                      : current.filter(v => v !== type.value);
                    handleServiceDetailsChange('vehicle_type', updated);
                  }}
                />
                {t(type.key)}
              </label>
            ))}
          </div>
          {errors['serviceDetails.vehicle_type'] && (
            <span className="error-text">{errors['serviceDetails.vehicle_type']}</span>
          )}
        </div>
      </div>

      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label">{t('serviceForm.common.experience')}</label>
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
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('filters.common.languages')}</label>
          <div className="checkbox-group" data-field="languages">
            {LANGUAGES_OPTIONS.map(lang => (
              <label key={lang.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.languages?.includes(lang.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.languages || [];
                    const updated = e.target.checked
                      ? [...current, lang.value]
                      : current.filter(l => l !== lang.value);
                    handleServiceDetailsChange('languages', updated);
                  }}
                />
                {t(lang.key)}
              </label>
            ))}
          </div>
          {errors['serviceDetails.languages'] && <span className="error-text">{errors['serviceDetails.languages']}</span>}
        </div>
      </div>
    </div>
  );
};

export default DriverForm;
