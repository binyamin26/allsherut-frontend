import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import LanguagesCheckboxGroup from '../common/LanguagesCheckboxGroup';
import { SECURITY_SERVICES, SECURITY_AVAILABILITY_OPTIONS } from '../../../data/securityServices';

// Formulaire commun aux 6 services de la catégorie Sécurité / Réseaux / Maison intelligente.
// Le contenu (types de travaux + détails conditionnels) vient de data/securityServices.js.
const SecurityServiceForm = ({ serviceType, serviceDetails, errors, handleServiceDetailsChange }) => {
  const { t } = useLanguage();
  const service = SECURITY_SERVICES[serviceType];
  if (!service) return null;

  const toggleValue = (field, value, checked) => {
    const current = serviceDetails[field] || [];
    handleServiceDetailsChange(
      field,
      checked ? [...current, value] : current.filter(v => v !== value)
    );
  };

  const toggleWorkType = (workType, checked) => {
    toggleValue('work_types', workType.value, checked);
    // Décocher un type de travaux vide son détail : il ne doit pas rester enregistré comme compétence
    if (!checked) handleServiceDetailsChange(workType.field, []);
  };

  const selectedWorkTypes = serviceDetails.work_types || [];

  return (
    <div className="service-details-form">
      <h3>{t(`serviceForm.${serviceType}.title`)}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.availabilityHours')}</label>
          <div className="checkbox-group" data-field="availability_hours">
            {SECURITY_AVAILABILITY_OPTIONS.map(hour => (
              <label key={hour.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_hours?.includes(hour.value) || false}
                  onChange={(e) => toggleValue('availability_hours', hour.value, e.target.checked)}
                />
                {t(hour.key)}
              </label>
            ))}
          </div>
          {errors['serviceDetails.availability_hours'] && <span className="error-text">{errors['serviceDetails.availability_hours']}</span>}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.workTypes')}</label>
          <div className="checkbox-group" data-field="work_types">
            {service.workTypes.map(workType => (
              <label key={workType.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedWorkTypes.includes(workType.value)}
                  onChange={(e) => toggleWorkType(workType, e.target.checked)}
                />
                {t(workType.labelKey)}
              </label>
            ))}
          </div>
          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
        </div>

        {service.workTypes
          .filter(workType => selectedWorkTypes.includes(workType.value))
          .map(workType => (
            <div className="input-group" key={workType.field}>
              <label className="auth-form-label required">{t(workType.labelKey)}</label>
              <div className="checkbox-group" data-field={workType.field}>
                {workType.details.map(detail => (
                  <label key={detail.value} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={serviceDetails[workType.field]?.includes(detail.value) || false}
                      onChange={(e) => toggleValue(workType.field, detail.value, e.target.checked)}
                    />
                    {t(detail.labelKey)}
                  </label>
                ))}
              </div>
              {errors[`serviceDetails.${workType.field}`] && <span className="error-text">{errors[`serviceDetails.${workType.field}`]}</span>}
            </div>
          ))}

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.experience')}</label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={serviceDetails.experience || ''}
            onChange={(e) => handleServiceDetailsChange('experience', e.target.value.replace(/\D/g, ''))}
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
            includeSpanish
          />
        </div>
      </div>
    </div>
  );
};

export default SecurityServiceForm;
