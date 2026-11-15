import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import LanguagesCheckboxGroup from '../common/LanguagesCheckboxGroup';
import { ACCOUNTANT_GROUPS, ACCOUNTANT_HOURS, ACCOUNTANT_QUALIFICATIONS_MAX } from '../../../data/accountant';

const AccountantForm = ({ serviceDetails, errors, handleServiceDetailsChange }) => {
  const { t } = useLanguage();

  const toggle = (field, value, checked) => {
    const current = serviceDetails[field] || [];
    handleServiceDetailsChange(field, checked ? [...current, value] : current.filter(v => v !== value));
  };

  const renderGroup = (group) => (
    <div className="input-group" key={group.field}>
      <label className={`auth-form-label${group.required ? ' required' : ''}`}>{t(group.titleKey)}</label>
      <div className="checkbox-group" data-field={group.field}>
        {group.options.map(option => (
          <label key={option.value} className="checkbox-item">
            <input
              type="checkbox"
              checked={serviceDetails[group.field]?.includes(option.value) || false}
              onChange={(e) => toggle(group.field, option.value, e.target.checked)}
            />
            {t(option.key)}
          </label>
        ))}
      </div>
      {errors[`serviceDetails.${group.field}`] && (
        <span className="error-text">{errors[`serviceDetails.${group.field}`]}</span>
      )}
    </div>
  );

  const required = ACCOUNTANT_GROUPS.filter(g => g.required);
  const optional = ACCOUNTANT_GROUPS.filter(g => !g.required);

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.accountant.title')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

        {required.map(renderGroup)}

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.accountant.qualificationsTitle')}</label>
          <textarea
            rows={3}
            maxLength={ACCOUNTANT_QUALIFICATIONS_MAX}
            value={serviceDetails.qualifications || ''}
            onChange={(e) => handleServiceDetailsChange('qualifications', e.target.value.slice(0, ACCOUNTANT_QUALIFICATIONS_MAX))}
            placeholder={t('serviceForm.accountant.qualificationsPlaceholder')}
            className="standard-input"
            data-field="qualifications"
            style={{ width: '100%', resize: 'vertical' }}
          />
          {errors['serviceDetails.qualifications'] && <span className="error-text">{errors['serviceDetails.qualifications']}</span>}
        </div>

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
          />
        </div>
      </div>

      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>

        {optional.map(renderGroup)}

        <div className="input-group">
          <label className="auth-form-label">{t('serviceForm.common.availabilityHours')}</label>
          <div className="checkbox-group" data-field="availability_hours">
            {ACCOUNTANT_HOURS.map(hour => (
              <label key={hour.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_hours?.includes(hour.value) || false}
                  onChange={(e) => toggle('availability_hours', hour.value, e.target.checked)}
                />
                {t(hour.key)}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountantForm;
