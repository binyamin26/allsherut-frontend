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

          {/* Type d'événement */}
          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
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
              {t('filters.chef.eventType')}
            </label>

            {serviceDetails.work_types?.includes('eventTypes') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="event_types">
                  {[
                    { value: 'wedding', label: t('filters.chef.wedding') },
                    { value: 'barMitsva', label: t('filters.chef.barMitsva') },
                    { value: 'batMitsva', label: t('filters.chef.batMitsva') },
                    { value: 'britMila', label: t('filters.chef.britMila') },
                    { value: 'pidyonHaben', label: t('filters.chef.pidyonHaben') },
                    { value: 'shevaBrahot', label: t('filters.chef.shevaBrahot') },
                    { value: 'anniversary', label: t('filters.chef.anniversary') },
                    { value: 'kiddouch', label: t('filters.chef.kiddouch') },
                    { value: 'shabbatHatan', label: t('filters.chef.shabbatHatan') },
                    { value: 'corporateEvent', label: t('filters.chef.corporateEvent') },
                    { value: 'privateParty', label: t('filters.chef.privateParty') },
                    { value: 'familyParty', label: t('filters.chef.familyParty') },
                    { value: 'engagement', label: t('filters.chef.engagement') },
                    { value: 'shabbatMeals', label: t('filters.chef.shabbatMeals') }
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
            {t('serviceForm.common.cuisineTypes')}
            </label>

            {serviceDetails.work_types?.includes('סוג המטבח') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="cuisine_types">
             {[
  { value: 'pizza', label: t('filters.chef.pizza') },
  { value: 'sushi', label: t('filters.chef.sushi') },
  { value: 'salads', label: t('filters.chef.salads') },
  { value: 'asian', label: t('filters.chef.asian') },
  { value: 'pasta', label: t('filters.chef.pasta') },
  { value: 'meat', label: t('filters.chef.meat') },
  { value: 'vegan', label: t('filters.chef.vegan') },
  { value: 'glutenFree', label: t('filters.chef.glutenFree') },
  { value: 'desserts', label: t('filters.chef.desserts') },
  { value: 'shabbatSalads', label: t('filters.chef.shabbatSalads') },
  { value: 'halavi', label: t('filters.chef.halavi') },
  { value: 'shabbatChallah', label: t('filters.chef.shabbatChallah') },
  { value: 'smokedFish', label: t('filters.chef.smokedFish') },
  { value: 'herring', label: t('filters.chef.herring') }
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
              {t('serviceForm.common.kosher')}
            </label>

            {serviceDetails.work_types?.includes('כשרות') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="kosher_types">
                 {[
  { value: 'badatzEdaChareidis', label: t('filters.chef.badatzEdaChareidis') },
  { value: 'badatzBeitYosef', label: t('filters.chef.badatzBeitYosef') },
  { value: 'badatzYoreDea', label: t('filters.chef.badatzYoreDea') },
  { value: 'badatzBelz', label: t('filters.chef.badatzBelz') },
  { value: 'badatzSheerit', label: t('filters.chef.badatzSheerit') },
  { value: 'badatzNetivot', label: t('filters.chef.badatzNetivot') },
  { value: 'badatzChatamBB', label: t('filters.chef.badatzChatamBB') },
  { value: 'badatzChatamPT', label: t('filters.chef.badatzChatamPT') },
  { value: 'badatzMikveh', label: t('filters.chef.badatzMikveh') },
  { value: 'badatzTzfat', label: t('filters.chef.badatzTzfat') },
  { value: 'rabbiLanda', label: t('filters.chef.rabbiLanda') },
  { value: 'rabbiRubin', label: t('filters.chef.rabbiRubin') },
  { value: 'rabbinate', label: t('filters.chef.rabbinate') },
  { value: 'rabbinateMethadrin', label: t('filters.chef.rabbinateMethadrin') }
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
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={serviceDetails.kosher_types?.includes('other') || false}
                      onChange={(e) => {
                        const current = serviceDetails.kosher_types || [];
                        const newTypes = e.target.checked
                          ? [...current, 'other']
                          : current.filter(v => v !== 'other');
                        handleServiceDetailsChange('kosher_types', newTypes);
                        if (!e.target.checked) handleServiceDetailsChange('kosher_other', '');
                      }}
                    />
                    {t('filters.chef.otherKosher')}
                  </label>
                  {serviceDetails.kosher_types?.includes('other') && (
                    <input
                      type="text"
                      className="standard-input"
                      style={{ marginTop: '8px' }}
                      placeholder={t('filters.chef.otherKosherPlaceholder')}
                      value={serviceDetails.kosher_other || ''}
                      onChange={(e) => handleServiceDetailsChange('kosher_other', e.target.value)}
                    />
                  )}
                </div>
                {errors['serviceDetails.kosher_types'] && <span className="error-text">{errors['serviceDetails.kosher_types']}</span>}
              </div>
            )}
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
          <label className="auth-form-label required">{t('filters.common.languages')}</label>
          <div className="checkbox-group" data-field="languages">
            {[
              { value: 'hebrew', label: t('languages.hebrew') },
              { value: 'russian', label: t('languages.russian') },
              { value: 'english', label: t('languages.english') },
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
      </div>
    </div>
  );
};

export default PrivateChefForm;