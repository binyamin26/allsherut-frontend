import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

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
      </div>
    </div>
  );
};

export default MechanicForm;
