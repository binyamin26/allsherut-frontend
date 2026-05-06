import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const PestControlForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.pest_control.title')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

        {/* AVAILABILITY HOURS */}
        <div className="input-group">
          <label className="auth-form-label required">{t('serviceFields.electrician.availability_hours')}</label>
          <div className="checkbox-group">
            {[
              { value: 'בוקר',   label: t('hours.morning') },
              { value: 'צהריים', label: t('hours.noon') },
              { value: 'ערב',    label: t('hours.evening') },
              { value: '24/7',   label: t('hours.twentyFourSeven') }
            ].map(option => (
              <label key={option.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(serviceDetails.availability_hours || []).includes(option.value)}
                  onChange={(e) => {
                    const current = serviceDetails.availability_hours || [];
                    let updated;
                    if (e.target.checked) {
                      if (option.value === '24/7') {
                        updated = ['24/7'];
                      } else {
                        updated = [...current.filter(v => v !== '24/7'), option.value];
                      }
                    } else {
                      updated = current.filter(v => v !== option.value);
                    }
                    handleServiceDetailsChange('availability_hours', updated);
                  }}
                />
                {option.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.availability_hours'] && <span className="error-text">{errors['serviceDetails.availability_hours']}</span>}
        </div>

        {/* PEST TYPES - categorized */}
        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.pest_control.pestTypes')}</label>

          {/* חרקים */}
          <div className="category-group">
            <h5 className="category-title">{t('serviceForm.pest_control.insects')}</h5>
            <div className="checkbox-group">
              {[
                { value: 'הדברת תיקנים', label: t('filters.pest_control.cockroaches') },
                { value: 'הדברת נמלים', label: t('filters.pest_control.ants') },
                { value: 'הדברת פשפשים', label: t('filters.pest_control.bedbugs') },
                { value: 'הדברת פרעושים', label: t('filters.pest_control.fleas') },
                { value: 'הדברת יתושים', label: t('filters.pest_control.mosquitoes') }
              ].map(type => (
                <label key={type.value} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={serviceDetails.pestTypes?.includes(type.value) || false}
                    onChange={(e) => {
                      const current = serviceDetails.pestTypes || [];
                      const newTypes = e.target.checked
                        ? [...current, type.value]
                        : current.filter(v => v !== type.value);
                      handleServiceDetailsChange('pestTypes', newTypes);
                    }}
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          {/* מכרסמים */}
          <div className="category-group">
            <h5 className="category-title">{t('serviceForm.pest_control.rodents')}</h5>
            <div className="checkbox-group">
              {[
                { value: 'הדברת חולדות', label: t('filters.pest_control.rats') },
                { value: 'הדברת עכברים', label: t('filters.pest_control.mice') }
              ].map(type => (
                <label key={type.value} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={serviceDetails.pestTypes?.includes(type.value) || false}
                    onChange={(e) => {
                      const current = serviceDetails.pestTypes || [];
                      const newTypes = e.target.checked
                        ? [...current, type.value]
                        : current.filter(v => v !== type.value);
                      handleServiceDetailsChange('pestTypes', newTypes);
                    }}
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          {/* יונים ובעלי חיים */}
          <div className="category-group">
            <h5 className="category-title">{t('serviceForm.pest_control.birdsAnimals')}</h5>
            <div className="checkbox-group">
              {[
                { value: 'הרחקת יונים', label: t('filters.pest_control.pigeons') },
                { value: 'רשתות נגד יונים', label: t('filters.pest_control.pigeonNets') },
                { value: 'הרחקת עטלפים', label: t('filters.pest_control.bats') },
                { value: 'הרחקת נחשים', label: t('filters.pest_control.snakes') }
              ].map(type => (
                <label key={type.value} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={serviceDetails.pestTypes?.includes(type.value) || false}
                    onChange={(e) => {
                      const current = serviceDetails.pestTypes || [];
                      const newTypes = e.target.checked
                        ? [...current, type.value]
                        : current.filter(v => v !== type.value);
                      handleServiceDetailsChange('pestTypes', newTypes);
                    }}
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          {errors['serviceDetails.pestTypes'] && <span className="error-text">{errors['serviceDetails.pestTypes']}</span>}
        </div>

        {/* CERTIFICATION - מדביר מוסמך */}
        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.pest_control.certification')}</label>
          <div className="category-group">
            <h5 className="category-title">{t('serviceForm.pest_control.certified')}</h5>
            <div className="checkbox-group">
              {[
                { value: 'yes', label: '✔️' },
                { value: 'no', label: '❌' }
              ].map(option => (
                <label key={option.value} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={serviceDetails.certified === option.value}
                    onChange={() => handleServiceDetailsChange('certified', option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          {errors['serviceDetails.certified'] && <span className="error-text">{errors['serviceDetails.certified']}</span>}
        </div>

        {/* WORK AT HEIGHT - עבודה בגובה */}
        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.pest_control.workAtHeight')}</label>
          <div className="checkbox-group">
            {[
              { value: 'yes', label: t('common.yes') },
              { value: 'no', label: t('common.no') }
            ].map(option => (
              <label key={option.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.worksAtHeight === option.value}
                  onChange={() => handleServiceDetailsChange('worksAtHeight', option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.worksAtHeight'] && <span className="error-text">{errors['serviceDetails.worksAtHeight']}</span>}
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

export default PestControlForm;
