import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const MovingForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.moving.title')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

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
            className={`standard-input ${errors['serviceDetails.experience'] ? 'error' : ''}`}
            data-field="experience"
          />
          {errors['serviceDetails.experience'] && <span className="error-text">{errors['serviceDetails.experience']}</span>}
        </div>

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
          {errors['serviceDetails.availability_hours'] && <span className="error-text">{errors['serviceDetails.availability_hours']}</span>}
        </div>

        <div className="input-group">
          <div className="checkbox-group" data-field="avoda_ivrit">
            <label className="checkbox-item" style={{ fontWeight: 'bold' }}>
              <input
                type="checkbox"
                checked={serviceDetails.avoda_ivrit === 'עבודה עברית'}
                onChange={(e) =>
                  handleServiceDetailsChange('avoda_ivrit', e.target.checked ? 'עבודה עברית' : '')
                }
              />
              {t('serviceForm.moving.avodaIvrit')}
            </label>
          </div>
        </div>
      </div>

      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>

        <div className="input-group">
          <div className="checkbox-group" data-field="packing_materials">
            <label className="checkbox-item" style={{ fontWeight: 'bold' }}>
              <input
                type="checkbox"
                checked={serviceDetails.packing_materials === 'כן'}
                onChange={(e) =>
                  handleServiceDetailsChange('packing_materials', e.target.checked ? 'כן' : '')
                }
              />
              {t('serviceForm.moving.packingMaterials')}
            </label>
          </div>
        </div>

        <div className="input-group">
          <div className="checkbox-group" data-field="crane_services">
            <label className="checkbox-item" style={{ fontWeight: 'bold' }}>
              <input
                type="checkbox"
                checked={serviceDetails.crane_services === 'כן'}
                onChange={(e) =>
                  handleServiceDetailsChange('crane_services', e.target.checked ? 'כן' : '')
                }
              />
              {t('serviceForm.moving.craneServices')}
            </label>
          </div>
        </div>

        <div className="input-group">
          <div className="checkbox-group" data-field="cardboard_supply">
            <label className="checkbox-item" style={{ fontWeight: 'bold' }}>
              <input
                type="checkbox"
                checked={serviceDetails.cardboard_supply === 'כן'}
                onChange={(e) =>
                  handleServiceDetailsChange('cardboard_supply', e.target.checked ? 'כן' : '')
                }
              />
              {t('serviceForm.moving.cardboardSupply')}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingForm;
