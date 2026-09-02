import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const PhotographerForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.photographer.title')}</h3>

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

          <div style={{ marginBottom: '20px' }}>
            <label className="checkbox-item" style={{ fontWeight: 'bold' }}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('eventTypes') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked
                    ? [...current, 'eventTypes']
                    : current.filter(v => v !== 'eventTypes');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('serviceForm.photographer.eventTypes')}
            </label>

            {serviceDetails.work_types?.includes('eventTypes') && (
              <div style={{ marginRight: '30px', marginTop: '10px' }}>
                <div className="checkbox-group" data-field="event_types">
                  {[
                    { value: 'barMitsva', label: t('filters.photographer.barMitsva') },
                    { value: 'batMitsva', label: t('filters.photographer.batMitsva') },
                    { value: 'wedding', label: t('filters.photographer.wedding') },
                    { value: 'engagement', label: t('filters.photographer.engagement') },
                    { value: 'haircut', label: t('filters.photographer.haircut') },
                    { value: 'photoShoot', label: t('filters.photographer.photoShoot') },
                    { value: 'privateEvents', label: t('filters.photographer.privateEvents') },
                    { value: 'britMila', label: t('filters.photographer.britMila') }
                  ].map(type => (
                    <label key={type.value} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={serviceDetails.event_types?.includes(type.value) || false}
                        onChange={(e) => {
                          const current = serviceDetails.event_types || [];
                          const newTypes = e.target.checked
                            ? [...current, type.value]
                            : current.filter(v => v !== type.value);
                          handleServiceDetailsChange('event_types', newTypes);
                        }}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
                {errors['serviceDetails.event_types'] && <span className="error-text">{errors['serviceDetails.event_types']}</span>}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label className="checkbox-item" style={{ fontWeight: 'bold' }}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('photoAlbum') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked
                    ? [...current, 'photoAlbum']
                    : current.filter(v => v !== 'photoAlbum');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('serviceForm.photographer.photoAlbum')}
            </label>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label className="checkbox-item" style={{ fontWeight: 'bold' }}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('magnet') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked
                    ? [...current, 'magnet']
                    : current.filter(v => v !== 'magnet');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('filters.photographer.magnet')}
            </label>
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
          <label className="auth-form-label required">{t('serviceForm.photographer.languages')}</label>
          <div className="checkbox-group" data-field="languages">
            {[
              { value: 'french', label: t('filters.photographer.languageFrench') },
              { value: 'russian', label: t('filters.photographer.languageRussian') },
              { value: 'spanish', label: t('filters.photographer.languageSpanish') },
              { value: 'hebrew', label: t('filters.photographer.languageHebrew') },
              { value: 'english', label: t('filters.photographer.languageEnglish') }
            ].map(lang => (
              <label key={lang.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.languages?.includes(lang.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.languages || [];
                    const newLangs = e.target.checked
                      ? [...current, lang.value]
                      : current.filter(v => v !== lang.value);
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

      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label">{t('serviceForm.photographer.additionalServices')}</label>
          <div className="checkbox-group" data-field="work_types_optional">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('cameraman') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked
                    ? [...current, 'cameraman']
                    : current.filter(v => v !== 'cameraman');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('filters.photographer.cameraman')}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerForm;
