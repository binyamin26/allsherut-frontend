import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import CustomDropdown from '../../common/CustomDropdown';

const BabysittingForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();

  // ✅ REFS pour les champs numériques
  const ageRef = useRef(null);
  const experienceRef = useRef(null);

  // ✅ Forcer le reset des champs au montage SEULEMENT
  useEffect(() => {
    setTimeout(() => {
      if (ageRef.current) {
        ageRef.current.value = '';
        ageRef.current.setAttribute('autocomplete', 'off');
        ageRef.current.setAttribute('data-form-type', 'other');
      }
      if (experienceRef.current) {
        experienceRef.current.value = '';
        experienceRef.current.setAttribute('autocomplete', 'off');
        experienceRef.current.setAttribute('data-form-type', 'other');
      }
    }, 100);
  }, []); // ← SUPPRIMER TOUTE DÉPENDANCE

  // ❌ SUPPRIMER complètement le useEffect qui sync avec serviceDetails

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.babysitting.title')}</h3>
      
      <div className="form-section">
       <h4>{t('serviceForm.common.requiredFields')}</h4>
        
        {/* ✅ AGE */}
        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.age')}</label>
          <input
            ref={ageRef}
            type="text"
            inputMode="numeric"
            name={`babysitter-age-new-${Math.random()}`}
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '');
              handleServiceDetailsChange('age', numericValue);
            }}
            className={`standard-input ${errors['serviceDetails.age'] ? 'error' : ''}`}
            data-field="age"
            min="15"
          />
          {errors['serviceDetails.age'] && <span className="error-text">{errors['serviceDetails.age']}</span>}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.babysitting.ageGroups')}</label>
          <div className="checkbox-group" data-field="ageGroups">
            {[
              { value: 'age0to1', label: t('filters.babysitting.age0to1') },
              { value: 'age1to3', label: t('filters.babysitting.age1to3') },
              { value: 'age3to6', label: t('filters.babysitting.age3to6') },
              { value: 'age6plus', label: t('filters.babysitting.age6plus') }
            ].map(age => (
              <label key={age.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.ageGroups?.includes(age.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.ageGroups || [];
                    const newAges = e.target.checked 
                      ? [...current, age.value]
                      : current.filter(a => a !== age.value);
                    handleServiceDetailsChange('ageGroups', newAges);
                  }}
                />
                {age.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.ageGroups'] && <span className="error-text">{errors['serviceDetails.ageGroups']}</span>}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.availabilityDays')}</label>
          <div className="checkbox-group" data-field="availability_days">
            {[
              { value: 'sunday', label: t('days.sunday') },
              { value: 'monday', label: t('days.monday') },
              { value: 'tuesday', label: t('days.tuesday') },
              { value: 'wednesday', label: t('days.wednesday') },
              { value: 'thursday', label: t('days.thursday') },
              { value: 'friday', label: t('days.friday') },
              { value: 'allWeek', label: t('days.allWeek') }
            ].map(day => (
              <label key={day.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_days?.includes(day.value) || false}
                  onChange={() => handleExclusiveCheckbox('availability_days', day.value, 'allWeek', ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'])}
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
          <label className="auth-form-label required">{t('serviceForm.babysitting.babysittingTypes')}</label>
          <div className="checkbox-group" data-field="babysitting_types">
            {[
              { value: 'occasional', label: t('filters.babysitting.occasional') },
              { value: 'regular', label: t('filters.babysitting.regular') },
              { value: 'pickup', label: t('filters.babysitting.pickup') },
              { value: 'nightCare', label: t('filters.babysitting.nightCare') },
              { value: 'holidayCare', label: t('filters.babysitting.holidayCare') },
              { value: 'homework', label: t('filters.babysitting.homework') },
              { value: 'fullTime', label: t('filters.babysitting.fullTime') },
              { value: 'summerCamp', label: t('filters.babysitting.summerCamp') },
              { value: 'winterCamp', label: t('filters.babysitting.winterCamp') }
            ].map(type => (
              <label key={type.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.babysitting_types?.includes(type.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.babysitting_types || [];
                    const newTypes = e.target.checked 
                      ? [...current, type.value]
                      : current.filter(t => t !== type.value);
                    handleServiceDetailsChange('babysitting_types', newTypes);
                  }}
                />
                {type.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.babysitting_types'] && <span className="error-text">{errors['serviceDetails.babysitting_types']}</span>}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.babysitting.canTravelAlone')}</label>
         <CustomDropdown
  name="can_travel_alone"
  value={serviceDetails.can_travel_alone === true ? 'yes' : serviceDetails.can_travel_alone === false ? 'no' : ''}
  onChange={(e) => handleServiceDetailsChange('can_travel_alone', e.target.value === 'yes')}
  placeholder={t('serviceForm.common.select')}
  error={errors['serviceDetails.can_travel_alone']}
  options={[
    { value: 'yes', label: t('common.yes') },
    { value: 'no', label: t('common.no') }
  ]}
/>
          {errors['serviceDetails.can_travel_alone'] && <span className="error-text">{errors['serviceDetails.can_travel_alone']}</span>}
        </div>

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.babysitting.languages')}</label>
          <div className="checkbox-group" data-field="languages">
            {[
              { value: 'hebrew', label: t('languages.hebrew') },
              { value: 'russian', label: t('languages.russian') },
              { value: 'english', label: t('languages.english') },
              { value: 'spanish', label: t('languages.spanish') },
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

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.experience')}</label>
          <input
            ref={experienceRef}
            type="text"
            inputMode="numeric"
            name={`babysitter-exp-new-${Math.random()}`}
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '');
              handleServiceDetailsChange('experience', numericValue);
            }}
            className="standard-input"
            data-field="experience"
          />
          {errors['serviceDetails.experience'] && <span className="error-text">{errors['serviceDetails.experience']}</span>}
        </div>
      </div>

      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>

        <div className="input-group">
          <label>{t('serviceForm.babysitting.certifications')}</label>
          <CustomDropdown
  name="certifications"
  value={serviceDetails.certifications || ''}
  onChange={(e) => handleServiceDetailsChange('certifications', e.target.value)}
  placeholder={t('serviceForm.common.selectCertification')}
  options={[
    { value: 'certSpecialEd', label: t('filters.babysitting.certSpecialEd') },
    { value: 'certFirstAid', label: t('filters.babysitting.certFirstAid') },
    { value: 'certKindergarten', label: t('filters.babysitting.certKindergarten') }
  ]}
/>
        </div>

        <div className="input-group">
          <label>{t('serviceForm.babysitting.religiosity')}</label>
       <CustomDropdown
  name="religiosity"
  value={serviceDetails.religiosity || ''}
  onChange={(e) => handleServiceDetailsChange('religiosity', e.target.value)}
  placeholder={t('serviceForm.common.selectLevel')}
  options={[
    { value: '', label: t('filters.noMatter') },
    { value: 'secular', label: t('filters.religious.secular') },
    { value: 'traditional', label: t('filters.religious.traditional') },
    { value: 'religious', label: t('filters.religious.religious') },
    { value: 'orthodox', label: t('filters.religious.orthodox') }
  ]}
/>
        </div>
      </div>
    </div>
  );
};

export default BabysittingForm;