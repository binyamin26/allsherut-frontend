import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import CustomDropdown from '../../common/CustomDropdown';

const BabysittingForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  
  // ✅ REFS pour les champs numériques
  const ageRef = useRef(null);
  const experienceRef = useRef(null);
  const hourlyRateRef = useRef(null);
  
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
      if (hourlyRateRef.current) {
        hourlyRateRef.current.value = '';
        hourlyRateRef.current.setAttribute('autocomplete', 'off');
        hourlyRateRef.current.setAttribute('data-form-type', 'other');
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
          <label>{t('serviceForm.common.age')}</label>
          <input
            ref={ageRef}
            type="text"
             inputMode="numeric"
            name={`babysitter-age-new-${Math.random()}`}
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
           onChange={(e) => {
  const numericValue = e.target.value.replace(/\D/g, '');  // ← AJOUTE CETTE LIGNE
  handleServiceDetailsChange('age', numericValue);  // (ou 'experience', ou 'hourlyRate')
}}
            className={`standard-input ${errors['serviceDetails.age'] ? 'error' : ''}`}
            data-field="age"
            min="15"
          />
          {errors['serviceDetails.age'] && <span className="error-text">{errors['serviceDetails.age']}</span>}
        </div>

        {/* ✅ EXPERIENCE */}
        <div className="input-group">
          <label>{t('serviceForm.common.experience')}</label>
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
  handleServiceDetailsChange('experience', numericValue);  // ← 'experience' ici !
}}
            className={`standard-input ${errors['serviceDetails.experience'] ? 'error' : ''}`}
            data-field="experience"
          />
          {errors['serviceDetails.experience'] && <span className="error-text">{errors['serviceDetails.experience']}</span>}
        </div>

        <div className="input-group">
          <label>{t('serviceForm.babysitting.ageGroups')}</label>
          <div className="checkbox-group" data-field="ageGroups">
            {[
              { value: '0-1 שנה', label: t('filters.babysitting.age0to1') },
              { value: '1-3 שנים', label: t('filters.babysitting.age1to3') },
              { value: '3-6 שנים', label: t('filters.babysitting.age3to6') },
              { value: '6+ שנים', label: t('filters.babysitting.age6plus') }
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
          <label>{t('serviceForm.common.availabilityDays')}</label>
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
          <label>{t('serviceForm.common.availabilityHours')}</label>
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
          <label>{t('serviceForm.babysitting.babysittingTypes')}</label>
          <div className="checkbox-group" data-field="babysitting_types">
            {[
              { value: 'שמרטפות מזדמנת', label: t('filters.babysitting.occasional') },
              { value: 'שמרטפות קבועה בבית הלקוח', label: t('filters.babysitting.regular') },
              { value: 'הוצאה מהגן / מבית-הספר', label: t('filters.babysitting.pickup') },
              { value: 'שמירה בלילה', label: t('filters.babysitting.nightCare') },
              { value: 'שמירה בזמן חופשות', label: t('filters.babysitting.holidayCare') },
              { value: 'עזרה בשיעורי בית', label: t('filters.babysitting.homework') },
              { value: 'מטפלת במשרה מלאה', label: t('filters.babysitting.fullTime') },
              { value: 'קייטנת קיץ', label: t('filters.babysitting.summerCamp') },
              { value: 'קייטנת חורף', label: t('filters.babysitting.winterCamp') }
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
          <label>{t('serviceForm.babysitting.canTravelAlone')}</label>
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
          <label>{t('serviceForm.babysitting.languages')}</label>
          <div className="checkbox-group" data-field="languages">
            {[
              { value: 'עברית', label: t('languages.hebrew') },
              { value: 'ערבית', label: t('languages.arabic') },
              { value: 'רוסית', label: t('languages.russian') },
              { value: 'אנגלית', label: t('languages.english') },
              { value: 'ספרדית', label: t('languages.spanish') },
              { value: 'צרפתית', label: t('languages.french') }
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

        {/* ✅ HOURLY RATE */}
        <div className="input-group">
          <label>{t('serviceForm.babysitting.hourlyRate')}</label>
          <input
            ref={hourlyRateRef}
            type="text"
             inputMode="numeric"
            name={`babysitter-rate-new-${Math.random()}`}
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            onChange={(e) => handleServiceDetailsChange('hourlyRate', e.target.value)}
            placeholder={t('serviceForm.babysitting.hourlyRatePlaceholder')}
            className={`standard-input ${errors['serviceDetails.hourlyRate'] ? 'error' : ''}`}
            data-field="hourlyRate"
          />
          {errors['serviceDetails.hourlyRate'] && <span className="error-text">{errors['serviceDetails.hourlyRate']}</span>}
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
    { value: 'הכשרה בתחום החינוך המיוחד', label: t('filters.babysitting.certSpecialEd') },
    { value: 'קורס עזרה ראשונה', label: t('filters.babysitting.certFirstAid') },
    { value: 'ניסיון בגני ילדים או מעונות', label: t('filters.babysitting.certKindergarten') }
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
    { value: 'חילוני', label: t('filters.religious.secular') },
    { value: 'מסורתי', label: t('filters.religious.traditional') },
    { value: 'דתי', label: t('filters.religious.religious') },
    { value: 'חרדי', label: t('filters.religious.orthodox') }
  ]}
/>
        </div>
      </div>
    </div>
  );
};

export default BabysittingForm;