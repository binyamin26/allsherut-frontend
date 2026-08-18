import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const EventEntertainmentForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
     <h3>{t('serviceForm.event.title')}</h3>

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
          <label className="auth-form-label required">{t('serviceForm.event.entertainmentTypes')}</label>
          <div className="checkbox-group" data-field="entertainment_types">
             {[
  { value: 'קוסם ילדים', label: t('filters.event.magician') },
  { value: 'קוסם', label: t('filters.event.magicianGeneral') },
  { value: 'ליצן ילדים', label: t('filters.event.clown') },
  { value: 'בלוני צורות', label: t('filters.event.balloonArtist') },
  { value: 'הפרחת בלונים / ניפוח בלונים במקום', label: t('filters.event.balloonRelease') },
  { value: 'דמויות ותחפושות', label: t('filters.event.characters') },
  { value: 'שעשועונים ומשחקי קבוצה', label: t('filters.event.groupGames') },
  { value: 'מופע בועות סבון', label: t('filters.event.bubbleShow') },
  { value: 'הפעלה מוזיקלית / ריקודים', label: t('filters.event.musicalActivity') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.entertainment_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.entertainment_types || [];
        const newTypes = e.target.checked
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('entertainment_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
          </div>
          {errors['serviceDetails.entertainment_types'] && <span className="error-text">{errors['serviceDetails.entertainment_types']}</span>}
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
          <label className="auth-form-label required">{t('filters.common.languages')}</label>
          <div className="checkbox-group" data-field="languages">
            {[
              { value: 'עברית', label: t('languages.hebrew') },
              { value: 'רוסית', label: t('languages.russian') },
              { value: 'אנגלית', label: t('languages.english') },
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
      </div>

      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>

        <div className="input-group">
          <label className="auth-form-label">{t('serviceForm.event.other')}</label>
          <div className="checkbox-group" data-field="other_types">
                {[
  { value: 'איפור פנים מקצועי', label: t('filters.event.facePainting') },
  { value: 'צילום מגנטים', label: t('filters.event.magnetPhoto') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.other_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.other_types || [];
        const newTypes = e.target.checked
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('other_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventEntertainmentForm;
