import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getAllCities } from '../../data/israelLocations';
import CustomDropdown from '../common/CustomDropdown';

const DAY_KEYS  = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const HOUR_KEYS = ['morning', 'afternoon', 'evening'];
const LANG_KEYS = ['hebrew', 'english', 'french'];

const ALL_CITIES = getAllCities();

const RecruitmentForm = ({ details, errors, onChange }) => {
  const { t } = useLanguage();

  const toggleArray = (field, value, exclusive = null) => {
    const current = details[field] || [];
    if (exclusive && value === exclusive) {
      onChange(field, current.includes(exclusive) ? [] : [exclusive]);
    } else {
      let next;
      if (current.includes(value)) {
        next = current.filter(v => v !== value);
      } else {
        next = [...current.filter(v => v !== exclusive), value];
      }
      onChange(field, next);
    }
  };

  const toggleAllWeek = () => {
    const current = details.availability_days || [];
    const isAllWeek = current.includes('all_week');
    onChange('availability_days', isAllWeek ? [] : ['all_week']);
  };

  const toggleDay = (key) => {
    const current = details.availability_days || [];
    // Si "all_week" est actif, on le retire et on sélectionne uniquement ce jour
    if (current.includes('all_week')) {
      onChange('availability_days', [key]);
    } else {
      const next = current.includes(key)
        ? current.filter(v => v !== key)
        : [...current, key];
      onChange('availability_days', next);
    }
  };

  const isAllWeek = (details.availability_days || []).includes('all_week');

  return (
    <div className="service-details-form">
      <h3>{t('recruitment.formTitle')}</h3>

      <div className="form-section">
        <h4>{t('serviceForm.common.requiredFields')}</h4>

        {/* 1. Type de contrat */}
        <div className="input-group">
          <label className="auth-form-label required">{t('recruitment.contractType')}</label>
          <div className="checkbox-group">
            {[
              { value: 'full_time', label: t('recruitment.fullTime') },
              { value: 'part_time', label: t('recruitment.partTime') },
              { value: 'one_time',  label: t('recruitment.oneTime') },
            ].map(opt => (
              <label key={opt.value} className="checkbox-item">
                <input type="radio" name="recruitment_contract_type"
                  checked={details.contract_type === opt.value}
                  onChange={() => onChange('contract_type', opt.value)} />
                {opt.label}
              </label>
            ))}
          </div>
          {errors?.['recruitment.contract_type'] && (
            <span className="error-text">{errors['recruitment.contract_type']}</span>
          )}
        </div>

        {/* 2. Rémunération */}
        <div className="input-group">
          <label className="auth-form-label required">{t('recruitment.salary')}</label>
          <input type="text"
            value={details.salary || ''}
            onChange={e => onChange('salary', e.target.value)}
            placeholder={t('recruitment.salaryPlaceholder')}
            className={`standard-input ${errors?.['recruitment.salary'] ? 'error' : ''}`} />
          {errors?.['recruitment.salary'] && (
            <span className="error-text">{errors['recruitment.salary']}</span>
          )}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('recruitment.paymentType')}</label>
          <div className="checkbox-group">
            {[
              { value: 'hourly',  label: t('recruitment.hourly') },
              { value: 'daily',   label: t('recruitment.daily') },
              { value: 'monthly', label: t('recruitment.monthly') },
            ].map(opt => (
              <label key={opt.value} className="checkbox-item">
                <input type="radio" name="recruitment_payment_type"
                  checked={details.payment_type === opt.value}
                  onChange={() => onChange('payment_type', opt.value)} />
                {opt.label}
              </label>
            ))}
          </div>
          {errors?.['recruitment.payment_type'] && (
            <span className="error-text">{errors['recruitment.payment_type']}</span>
          )}
        </div>

        {/* 3. Jours */}
        <div className="input-group">
          <label className="auth-form-label required">{t('recruitment.daysTitle')}</label>
          <div className="checkbox-group">
            {/* Toute la semaine */}
            <label className="checkbox-item">
              <input type="checkbox"
                checked={isAllWeek}
                onChange={toggleAllWeek} />
              {t('days.allWeek')}
            </label>
            {/* Jours individuels */}
            {DAY_KEYS.map(key => (
              <label key={key} className="checkbox-item">
                <input type="checkbox"
                  checked={!isAllWeek && (details.availability_days || []).includes(key)}
                  onChange={() => toggleDay(key)} />
                {t(`recruitment.day.${key}`)}
              </label>
            ))}
          </div>
          {errors?.['recruitment.availability_days'] && (
            <span className="error-text">{errors['recruitment.availability_days']}</span>
          )}
        </div>

        {/* 4. Heures */}
        <div className="input-group">
          <label className="auth-form-label required">{t('recruitment.hoursTitle')}</label>
          <div className="checkbox-group">
            {HOUR_KEYS.map(key => (
              <label key={key} className="checkbox-item">
                <input type="checkbox"
                  checked={(details.availability_hours || []).includes(key)}
                  onChange={() => toggleArray('availability_hours', key, 'all')} />
                {t(`recruitment.hour.${key}`)}
              </label>
            ))}
          </div>
          {errors?.['recruitment.availability_hours'] && (
            <span className="error-text">{errors['recruitment.availability_hours']}</span>
          )}
        </div>

        {/* 5. Expérience */}
        <div className="input-group">
          <label className="auth-form-label required">{t('recruitment.experienceRequired')}</label>
          <div className="checkbox-group">
            {[
              { value: 'beginner',       label: t('recruitment.expBeginner') },
              { value: '1_year',         label: t('recruitment.exp1year') },
              { value: '2_years',        label: t('recruitment.exp2years') },
              { value: '3_plus_years',   label: t('recruitment.exp3plus') },
            ].map(opt => (
              <label key={opt.value} className="checkbox-item">
                <input type="radio" name="recruitment_experience"
                  checked={details.experience_required === opt.value}
                  onChange={() => onChange('experience_required', opt.value)} />
                {opt.label}
              </label>
            ))}
          </div>
          {errors?.['recruitment.experience_required'] && (
            <span className="error-text">{errors['recruitment.experience_required']}</span>
          )}
        </div>

        {/* 6. Description */}
        <div className="input-group">
          <label className="auth-form-label required">{t('recruitment.description')}</label>
          <textarea
            value={details.description || ''}
            onChange={e => onChange('description', e.target.value)}
            placeholder={t('recruitment.descriptionPlaceholder')}
            className={`standard-input ${errors?.['recruitment.description'] ? 'error' : ''}`}
            rows={4} style={{ resize: 'vertical', minHeight: '100px' }} />
          {errors?.['recruitment.description'] && (
            <span className="error-text">{errors['recruitment.description']}</span>
          )}
        </div>
      </div>

      {/* Optionnel */}
      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>

        <div className="input-group">
          <label>{t('recruitment.languages')}</label>
          <div className="checkbox-group">
            {LANG_KEYS.map(key => (
              <label key={key} className="checkbox-item">
                <input type="checkbox"
                  checked={(details.languages_required || []).includes(key)}
                  onChange={() => toggleArray('languages_required', key)} />
                {t(`recruitment.lang.${key}`)}
              </label>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label className="checkbox-item" style={{ fontWeight: 500, gap: '8px' }}>
            <input type="checkbox"
              checked={details.driving_license || false}
              onChange={e => onChange('driving_license', e.target.checked)} />
            <span>{t('recruitment.drivingLicense')}</span>
          </label>
        </div>

        <div className="input-group">
          <label>{t('recruitment.jobCity')}</label>
          <CustomDropdown
            name="location_city"
            options={ALL_CITIES}
            value={details.location_city || ''}
            onChange={e => onChange('location_city', e.target.value)}
            placeholder={t('recruitment.jobCityPlaceholder')}
            searchable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default RecruitmentForm;
