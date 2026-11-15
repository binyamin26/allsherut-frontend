import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import LanguagesCheckboxGroup from '../common/LanguagesCheckboxGroup';

const WORK_TYPES = [
  { value: 'מכונאות רכב',   key: 'serviceForm.mechanic.carMechanics' },
  { value: 'הכנה לטסט',     key: 'serviceForm.mechanic.testPrep' },
  { value: 'טיפולים שוטפים', key: 'serviceForm.mechanic.routineMaintenance' },
  { value: 'בדיקות מחשב',   key: 'serviceForm.mechanic.computerDiagnostics' },
  { value: 'מצברים',         key: 'serviceForm.mechanic.batteries' },
  { value: 'מיזוג אוויר',   key: 'serviceForm.mechanic.airConditioning' },
  { value: 'אלטרנטור',       key: 'serviceForm.mechanic.alternator' },
  { value: 'תיקוני מנוע',   key: 'serviceForm.mechanic.engineRepairs' },
  { value: 'רדיאטור וקירור', key: 'serviceForm.mechanic.radiatorCooling' },
  { value: 'לקיחת רכב לטסט', key: 'serviceForm.mechanic.vehicleInspection' },
];

const HOURS = [
  { value: 'בוקר', key: 'hours.morning' },
  { value: 'אחר הצהריים', key: 'hours.afternoon' },
  { value: 'ערב', key: 'hours.evening' },
  { value: 'הכל', key: 'hours.all' },
];

const MechanicForm = ({ serviceDetails, errors, handleServiceDetailsChange }) => {
  const { t } = useLanguage();

  const toggleWorkType = (value) => {
    const current = serviceDetails.work_types || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    handleServiceDetailsChange('work_types', updated);
  };

  const toggleHour = (value) => {
    const current = serviceDetails.availability_hours || [];
    const updated = current.includes(value)
      ? current.filter(h => h !== value)
      : [...current, value];
    handleServiceDetailsChange('availability_hours', updated);
  };

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.mechanic.title')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.workTypes')}</label>
          <div className="checkbox-group" data-field="work_types">
            {WORK_TYPES.map(type => (
              <label key={type.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.work_types?.includes(type.value) || false}
                  onChange={() => toggleWorkType(type.value)}
                />
                {t(type.key)}
              </label>
            ))}
          </div>
          {errors['serviceDetails.work_types'] && (
            <span className="error-text">{errors['serviceDetails.work_types']}</span>
          )}
        </div>
        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.availabilityHours')}</label>
          <div className="checkbox-group" data-field="availability_hours">
            {HOURS.map(hour => (
              <label key={hour.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_hours?.includes(hour.value) || false}
                  onChange={() => toggleHour(hour.value)}
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
          <LanguagesCheckboxGroup
            serviceDetails={serviceDetails}
            handleServiceDetailsChange={handleServiceDetailsChange}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};

export default MechanicForm;
