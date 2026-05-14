import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const HandymanForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();

  const toggleWorkType = (value) => {
    const current = serviceDetails.work_types || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    handleServiceDetailsChange('work_types', updated);
  };

  const toggleSubType = (field, value) => {
    const current = serviceDetails[field] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    handleServiceDetailsChange(field, updated);
  };

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.handyman.title')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.availabilityHours')}</label>
          <div className="checkbox-group" data-field="availability_hours">
            {[
              { value: 'בוקר', label: t('hours.morning') },
              { value: 'אחר הצהריים', label: t('hours.afternoon') },
              { value: 'ערב', label: t('hours.evening') },
              { value: 'הכל', label: t('hours.all') }
            ].map(hour => (
              <label key={hour.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_hours?.includes(hour.value) || false}
                  onChange={() => handleExclusiveCheckbox('availability_hours', hour.value, 'הכל', ['בוקר', 'אחר הצהריים', 'ערב'])}
                />
                {hour.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.availability_hours'] && (
            <span className="error-text">{errors['serviceDetails.availability_hours']}</span>
          )}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.handyman.workTypesTitle')}</label>

          {/* 🔧 תיקונים כלליים */}
          <div style={{ marginBottom: '20px' }}>
            <label className="checkbox-item" style={{ fontWeight: 'bold' }}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('תיקונים כלליים') || false}
                onChange={() => toggleWorkType('תיקונים כלליים')}
              />
              {t('serviceForm.handyman.generalRepairs')}
            </label>
            {serviceDetails.work_types?.includes('תיקונים כלליים') && (
              <div style={{ marginRight: '30px', marginTop: '10px' }}>
                <div className="checkbox-group" data-field="general_repairs_types">
                  {[
                    { value: 'תיקונים קטנים בבית', key: 'serviceForm.handyman.smallRepairs' },
                    { value: 'תחזוקה שוטפת', key: 'serviceForm.handyman.regularMaintenance' }
                  ].map(item => (
                    <label key={item.value} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.general_repairs_types?.includes(item.value) || false}
                        onChange={() => toggleSubType('general_repairs_types', item.value)}
                      />
                      {t(item.key)}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.general_repairs_types'] && (
                  <span className="error-text">{errors['serviceDetails.general_repairs_types']}</span>
                )}
              </div>
            )}
          </div>

          {/* 🪛 התקנות והרכבות */}
          <div style={{ marginBottom: '20px' }}>
            <label className="checkbox-item" style={{ fontWeight: 'bold' }}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('התקנות והרכבות') || false}
                onChange={() => toggleWorkType('התקנות והרכבות')}
              />
              {t('serviceForm.handyman.installations')}
            </label>
            {serviceDetails.work_types?.includes('התקנות והרכבות') && (
              <div style={{ marginRight: '30px', marginTop: '10px' }}>
                <div className="checkbox-group" data-field="installations_types">
                  {[
                    { value: 'התקנת טלוויזיה', key: 'serviceForm.handyman.tvInstall' },
                    { value: 'התקנת מדפים', key: 'serviceForm.handyman.shelvesInstall' },
                    { value: 'התקנת וילונות', key: 'serviceForm.handyman.curtainsInstall' },
                    { value: 'הרכבת רהיטים', key: 'serviceForm.handyman.furnitureAssembly' }
                  ].map(item => (
                    <label key={item.value} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.installations_types?.includes(item.value) || false}
                        onChange={() => toggleSubType('installations_types', item.value)}
                      />
                      {t(item.key)}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.installations_types'] && (
                  <span className="error-text">{errors['serviceDetails.installations_types']}</span>
                )}
              </div>
            )}
          </div>

          {/* 🚪 דלתות ורהיטים */}
          <div style={{ marginBottom: '20px' }}>
            <label className="checkbox-item" style={{ fontWeight: 'bold' }}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('דלתות ורהיטים') || false}
                onChange={() => toggleWorkType('דלתות ורהיטים')}
              />
              {t('serviceForm.handyman.doorsAndFurniture')}
            </label>
            {serviceDetails.work_types?.includes('דלתות ורהיטים') && (
              <div style={{ marginRight: '30px', marginTop: '10px' }}>
                <div className="checkbox-group" data-field="doors_furniture_types">
                  {[
                    { value: 'תיקון דלתות', key: 'serviceForm.handyman.doorRepair' },
                    { value: 'תיקון רהיטים', key: 'serviceForm.handyman.furnitureRepair' }
                  ].map(item => (
                    <label key={item.value} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.doors_furniture_types?.includes(item.value) || false}
                        onChange={() => toggleSubType('doors_furniture_types', item.value)}
                      />
                      {t(item.key)}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.doors_furniture_types'] && (
                  <span className="error-text">{errors['serviceDetails.doors_furniture_types']}</span>
                )}
              </div>
            )}
          </div>

          {/* 💡 עבודות קלות בבית */}
          <div style={{ marginBottom: '20px' }}>
            <label className="checkbox-item" style={{ fontWeight: 'bold' }}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('עבודות קלות בבית') || false}
                onChange={() => toggleWorkType('עבודות קלות בבית')}
              />
              {t('serviceForm.handyman.lightWork')}
            </label>
            {serviceDetails.work_types?.includes('עבודות קלות בבית') && (
              <div style={{ marginRight: '30px', marginTop: '10px' }}>
                <div className="checkbox-group" data-field="light_work_types">
                  {[
                    { value: 'החלפת מנורות', key: 'serviceForm.handyman.lampReplacement' },
                    { value: 'תיקונים קלים', key: 'serviceForm.handyman.lightRepairs' }
                  ].map(item => (
                    <label key={item.value} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.light_work_types?.includes(item.value) || false}
                        onChange={() => toggleSubType('light_work_types', item.value)}
                      />
                      {t(item.key)}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.light_work_types'] && (
                  <span className="error-text">{errors['serviceDetails.light_work_types']}</span>
                )}
              </div>
            )}
          </div>

          {/* 🪜 תליות וסידור */}
          <div style={{ marginBottom: '20px' }}>
            <label className="checkbox-item" style={{ fontWeight: 'bold' }}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('תליות וסידור') || false}
                onChange={() => toggleWorkType('תליות וסידור')}
              />
              {t('serviceForm.handyman.hangingAndOrganizing')}
            </label>
            {serviceDetails.work_types?.includes('תליות וסידור') && (
              <div style={{ marginRight: '30px', marginTop: '10px' }}>
                <div className="checkbox-group" data-field="hanging_types">
                  {[
                    { value: 'תליית תמונות', key: 'serviceForm.handyman.pictureHanging' },
                    { value: 'תליית אביזרים', key: 'serviceForm.handyman.accessoryHanging' }
                  ].map(item => (
                    <label key={item.value} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.hanging_types?.includes(item.value) || false}
                        onChange={() => toggleSubType('hanging_types', item.value)}
                      />
                      {t(item.key)}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.hanging_types'] && (
                  <span className="error-text">{errors['serviceDetails.hanging_types']}</span>
                )}
              </div>
            )}
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

export default HandymanForm;
