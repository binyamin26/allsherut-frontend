import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const WORK_TYPES = [
  { value: 'carMechanics',   key: 'serviceForm.mechanic.carMechanics' },
  { value: 'testPrep',     key: 'serviceForm.mechanic.testPrep' },
  { value: 'routineMaintenance', key: 'serviceForm.mechanic.routineMaintenance' },
  { value: 'computerDiagnostics',   key: 'serviceForm.mechanic.computerDiagnostics' },
  { value: 'batteries',         key: 'serviceForm.mechanic.batteries' },
  { value: 'airConditioning',   key: 'serviceForm.mechanic.airConditioning' },
  { value: 'alternator',       key: 'serviceForm.mechanic.alternator' },
  { value: 'engineRepairs',   key: 'serviceForm.mechanic.engineRepairs' },
  { value: 'radiatorCooling', key: 'serviceForm.mechanic.radiatorCooling' },
  { value: 'vehicleInspection', key: 'serviceForm.mechanic.vehicleInspection' },
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

export default MechanicForm;
