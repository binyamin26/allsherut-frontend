import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const PrivateChefForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.chef.title')}</h3>
      
      <div className="form-section">
    <h4>{t('serviceForm.common.requiredFields')}</h4>
        
        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.age')}</label>
          <input
           type="text"
 inputMode="numeric"
 autoComplete="off"
            value={serviceDetails.age || ''}
         onChange={(e) => {
  const numericValue = e.target.value.replace(/\D/g, '');  // ← AJOUTE CETTE LIGNE
  handleServiceDetailsChange('age', numericValue);  // (ou 'experience', ou 'hourlyRate')
}}
            className={`standard-input ${errors['serviceDetails.age'] ? 'error' : ''}`}
            data-field="age"
            min="18"
          />
          {errors['serviceDetails.age'] && <span className="error-text">{errors['serviceDetails.age']}</span>}
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
  handleServiceDetailsChange('experience', numericValue);  // ← 'experience' ici !
}}
            className={`standard-input ${errors['serviceDetails.experience'] ? 'error' : ''}`}
            data-field="experience"
          />
          {errors['serviceDetails.experience'] && <span className="error-text">{errors['serviceDetails.experience']}</span>}
        </div>

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

        {/* Type de prestataire */}
        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.chef.providerType')}</label>
          <div className="checkbox-group" data-field="provider_type">
            {[
              { value: 'טרייטר', label: t('filters.chef.caterer') },
              { value: 'שף פרטי', label: t('filters.chef.homeChef') }
            ].map(type => (
              <label key={type.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.provider_type?.includes(type.value) || false}
                  onChange={(e) => {
                    const current = serviceDetails.provider_type || [];
                    const newTypes = e.target.checked
                      ? [...current, type.value]
                      : current.filter(v => v !== type.value);
                    handleServiceDetailsChange('provider_type', newTypes);
                  }}
                />
                {type.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.provider_type'] && <span className="error-text">{errors['serviceDetails.provider_type']}</span>}
        </div>

        {/* Sections révélées quand un type de prestataire est sélectionné */}
        {serviceDetails.provider_type?.length > 0 && (
        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.workTypes')}</label>

          {/* Type d'événement */}
          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('סוג האירוע') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked
                    ? [...current, 'סוג האירוע']
                    : current.filter(v => v !== 'סוג האירוע');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('filters.chef.eventType')}
            </label>

            {serviceDetails.work_types?.includes('סוג האירוע') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="event_types">
                  {[
                    { value: 'חתונה', label: t('filters.chef.wedding') },
                    { value: 'בר מצווה', label: t('filters.chef.barMitsva') },
                    { value: 'בת מצווה', label: t('filters.chef.batMitsva') },
                    { value: 'ברית מילה', label: t('filters.chef.britMila') },
                    { value: 'פדיון הבן', label: t('filters.chef.pidyonHaben') },
                    { value: 'שבע ברכות', label: t('filters.chef.shevaBrahot') },
                    { value: 'יום הולדת / יום שנה', label: t('filters.chef.anniversary') },
                    { value: 'קידוש', label: t('filters.chef.kiddouch') },
                    { value: 'שבת חתן', label: t('filters.chef.shabbatHatan') },
                    { value: 'אירוע עסקי', label: t('filters.chef.corporateEvent') },
                    { value: 'מסיבה פרטית', label: t('filters.chef.privateParty') },
                    { value: 'חגיגה משפחתית', label: t('filters.chef.familyParty') }
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

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('סוג המטבח') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked
                    ? [...current, 'סוג המטבח']
                    : current.filter(v => v !== 'סוג המטבח');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.chef.cuisineTypes')}
            </label>

            {serviceDetails.work_types?.includes('סוג המטבח') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="cuisine_types">
             {[
  { value: 'פיצות', label: t('filters.chef.pizza') },
  { value: 'סושי', label: t('filters.chef.sushi') },
  { value: 'סלטים', label: t('filters.chef.salads') },
  { value: 'אסייתי', label: t('filters.chef.asian') },
  { value: 'פסטות', label: t('filters.chef.pasta') },
  { value: 'בשרי', label: t('filters.chef.meat') },
  { value: 'טבעוני / צמחוני', label: t('filters.chef.vegan') },
  { value: 'לא גלוטן', label: t('filters.chef.glutenFree') },
  { value: 'קינוחים', label: t('filters.chef.desserts') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.cuisine_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.cuisine_types || [];
        const newTypes = e.target.checked
          ? [...current, type.value]
          : current.filter(v => v !== type.value);
        handleServiceDetailsChange('cuisine_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.cuisine_types'] && <span className="error-text">{errors['serviceDetails.cuisine_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('כשרות') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked
                    ? [...current, 'כשרות']
                    : current.filter(v => v !== 'כשרות');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('serviceForm.chef.kosher')}
            </label>

            {serviceDetails.work_types?.includes('כשרות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="kosher_types">
                 {[
  { value: 'בד"ץ העדה החרדית', label: t('filters.chef.badatzEdaChareidis') },
  { value: 'בד"ץ בית יוסף', label: t('filters.chef.badatzBeitYosef') },
  { value: 'בד"ץ יורה דעה (ר׳ שלמה מחפוד)', label: t('filters.chef.badatzYoreDea') },
  { value: 'בד"ץ מחזיקי הדת – בעלז', label: t('filters.chef.badatzBelz') },
  { value: 'בד"ץ שארית ישראל', label: t('filters.chef.badatzSheerit') },
  { value: 'בד"ץ נתיבות כשרות', label: t('filters.chef.badatzNetivot') },
  { value: 'בד"ץ חוג חתם סופר בני ברק', label: t('filters.chef.badatzChatamBB') },
  { value: 'בד"ץ חוג חתם סופר פ״ת', label: t('filters.chef.badatzChatamPT') },
  { value: 'בד"ץ מקווה ישראל', label: t('filters.chef.badatzMikveh') },
  { value: 'בד"ץ רבני צפת', label: t('filters.chef.badatzTzfat') },
  { value: 'כשרות הרב לנדא', label: t('filters.chef.rabbiLanda') },
  { value: 'כשרות הרב רובין', label: t('filters.chef.rabbiRubin') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.kosher_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.kosher_types || [];
        const newTypes = e.target.checked
          ? [...current, type.value]
          : current.filter(v => v !== type.value);
        handleServiceDetailsChange('kosher_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                </div>
                {errors['serviceDetails.kosher_types'] && <span className="error-text">{errors['serviceDetails.kosher_types']}</span>}
              </div>
            )}
          </div>

          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
        </div>
        )}
      </div>
    </div>
  );
};

export default PrivateChefForm;