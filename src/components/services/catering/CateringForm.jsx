import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const CateringForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.catering.title')}</h3>

      <div className="form-section">
    <h4>{t('serviceForm.common.requiredFields')}</h4>

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
                    { value: 'חגיגה משפחתית', label: t('filters.chef.familyParty') },
                    { value: 'אירוסין', label: t('filters.chef.engagement') },
                    { value: 'סעודות שבת', label: t('filters.chef.shabbatMeals') }
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
  { value: 'פיצות', label: t('filters.chef.pizza') },
  { value: 'סושי', label: t('filters.chef.sushi') },
  { value: 'סלטים', label: t('filters.chef.salads') },
  { value: 'אסייתי', label: t('filters.chef.asian') },
  { value: 'פסטות', label: t('filters.chef.pasta') },
  { value: 'בשרי', label: t('filters.chef.meat') },
  { value: 'טבעוני / צמחוני', label: t('filters.chef.vegan') },
  { value: 'לא גלוטן', label: t('filters.chef.glutenFree') },
  { value: 'סלטי שבת', label: t('filters.chef.shabbatSalads') },
  { value: 'חלבי', label: t('filters.chef.halavi') },
  { value: 'חלות שבת', label: t('filters.chef.shabbatChallah') },
  { value: 'דגים מעושנים', label: t('filters.chef.smokedFish') },
  { value: 'הרינג', label: t('filters.chef.herring') }
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
  { value: 'כשרות הרב רובין', label: t('filters.chef.rabbiRubin') },
  { value: 'רבנות', label: t('filters.chef.rabbinate') },
  { value: 'רבנות מהדרין', label: t('filters.chef.rabbinateMethadrin') }
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
                      checked={serviceDetails.kosher_types?.includes('אחר') || false}
                      onChange={(e) => {
                        const current = serviceDetails.kosher_types || [];
                        const newTypes = e.target.checked
                          ? [...current, 'אחר']
                          : current.filter(v => v !== 'אחר');
                        handleServiceDetailsChange('kosher_types', newTypes);
                        if (!e.target.checked) handleServiceDetailsChange('kosher_other', '');
                      }}
                    />
                    {t('filters.chef.otherKosher')}
                  </label>
                  {serviceDetails.kosher_types?.includes('אחר') && (
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
    </div>
  );
};

export default CateringForm;
