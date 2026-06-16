import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const DJForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.dj.title')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.availabilityDays')}</label>
          <div className="checkbox-group" data-field="availability_days">
            {[
              { value: 'ראשון', label: t('days.sunday') },
              { value: 'שני', label: t('days.monday') },
              { value: 'שלישי', label: t('days.tuesday') },
              { value: 'רביעי', label: t('days.wednesday') },
              { value: 'חמישי', label: t('days.thursday') },
              { value: 'שישי', label: t('days.friday') },
              { value: 'כל השבוע', label: t('days.allWeek') }
            ].map(day => (
              <label key={day.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_days?.includes(day.value) || false}
                  onChange={() => handleExclusiveCheckbox('availability_days', day.value, 'כל השבוע', ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'])}
                />
                {day.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.availability_days'] && <span className="error-text">{errors['serviceDetails.availability_days']}</span>}
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
          <label className="auth-form-label required">{t('serviceForm.dj.eventTypes')}</label>
          <div className="checkbox-group" data-field="dj_event_types">
            {[
              { value: 'חתונה', label: t('filters.chef.wedding') },
              { value: 'בר מצווה', label: t('filters.chef.barMitsva') },
              { value: 'בת מצווה', label: t('filters.chef.batMitsva') },
              { value: 'ברית מילה', label: t('filters.chef.britMila') },
              { value: 'שבע ברכות', label: t('filters.chef.shevaBrahot') },
              { value: 'יום הולדת / יום שנה', label: t('filters.chef.anniversary') },
              { value: 'אירוע עסקי', label: t('filters.chef.corporateEvent') },
              { value: 'מסיבה פרטית', label: t('filters.chef.privateParty') },
              { value: 'חגיגה משפחתית', label: t('filters.chef.familyParty') },
              { value: 'אירוסין', label: t('filters.chef.engagement') }
            ].map(type => (
              <label key={type.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.dj_event_types?.includes(type.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.dj_event_types || [];
                    const newTypes = e.target.checked
                      ? [...current, type.value]
                      : current.filter(t => t !== type.value);
                    handleServiceDetailsChange('dj_event_types', newTypes);
                  }}
                />
                {type.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.dj_event_types'] && <span className="error-text">{errors['serviceDetails.dj_event_types']}</span>}
        </div>
      </div>

      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>

        <div className="input-group">
          <div className="checkbox-group">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={serviceDetails.separated_dancing || false}
                onChange={(e) => handleServiceDetailsChange('separated_dancing', e.target.checked)}
              />
              {t('serviceFields.dj.separated_dancing')}
            </label>
          </div>
        </div>

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

export default DJForm;
