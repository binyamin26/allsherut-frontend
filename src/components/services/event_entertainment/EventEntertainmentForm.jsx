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

        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.workTypes')}</label>
          
          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('השכרת ציוד לאירועים') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'השכרת ציוד לאירועים']
                    : current.filter(t => t !== 'השכרת ציוד לאירועים');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.event.equipmentRental')}
            </label>
            
            {serviceDetails.work_types?.includes('השכרת ציוד לאירועים') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="equipment_rental_types">
                  
                  <div style={{marginBottom: '15px'}}>
                    <label className="checkbox-item" style={{fontWeight: '600'}}>
                      <input
                        type="checkbox"
                        checked={serviceDetails.equipment_rental_types?.includes('🍿 מכונות מזון') || false}
                        onChange={(e) => {
                          const current = serviceDetails.equipment_rental_types || [];
                          const newTypes = e.target.checked 
                            ? [...current, '🍿 מכונות מזון']
                            : current.filter(t => t !== '🍿 מכונות מזון');
                          handleServiceDetailsChange('equipment_rental_types', newTypes);
                        }}
                      />
                     {t('serviceForm.event.foodMachines')}
                    </label>
                    
                    {serviceDetails.equipment_rental_types?.includes('🍿 מכונות מזון') && (
                      <div style={{marginRight: '30px', marginTop: '8px'}}>
                        <div className="checkbox-group" data-field="food_machine_types">
                        {[
  { value: 'מכונת פופקורן', label: t('filters.events.popcorn') },
  { value: 'מכונת סוכר-בורי', label: t('filters.events.cottonCandy') },
  { value: 'מכונת ברד', label: t('filters.events.slushie') },
  { value: 'מכונת וופל בלגי', label: t('filters.events.waffle') },
  { value: 'מכונת גרניטה וקפה בר', label: t('filters.events.granita') },
  { value: 'מכונת גלידה אמריקאית', label: t('filters.events.softServe') },
  { value: 'מכונת מילקשייק', label: t('filters.events.milkshake') },
  { value: 'מסחטת מיצים טריים', label: t('filters.events.juicer') },
  { value: 'מכונת נקניקיות', label: t('filters.events.hotdog') },
  { value: 'מחבת קרפים', label: t('filters.events.crepe') },
  { value: 'מזרקת שוקולד', label: t('filters.events.chocolateFountain') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.food_machine_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.food_machine_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('food_machine_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                        </div>
                        {errors['serviceDetails.food_machine_types'] && <span className="error-text">{errors['serviceDetails.food_machine_types']}</span>}
                      </div>
                    )}
                  </div>

                  <div style={{marginBottom: '15px'}}>
                    <label className="checkbox-item" style={{fontWeight: '600'}}>
                      <input
                        type="checkbox"
                        checked={serviceDetails.equipment_rental_types?.includes('🎪 השכרת מתנפחים ומשחקים') || false}
                        onChange={(e) => {
                          const current = serviceDetails.equipment_rental_types || [];
                          const newTypes = e.target.checked 
                            ? [...current, '🎪 השכרת מתנפחים ומשחקים']
                            : current.filter(t => t !== '🎪 השכרת מתנפחים ומשחקים');
                          handleServiceDetailsChange('equipment_rental_types', newTypes);
                        }}
                      />
                    {t('serviceForm.event.inflatables')}
                    </label>
                    
                    {serviceDetails.equipment_rental_types?.includes('🎪 השכרת מתנפחים ומשחקים') && (
                      <div style={{marginRight: '30px', marginTop: '8px'}}>
                        <div className="checkbox-group" data-field="inflatable_game_types">
                        {[
  { value: 'מתנפחים', label: t('filters.events.bouncyHouses') },
  { value: 'ג\'ימבורי', label: t('filters.events.gymboree') },
  { value: 'עמדות משחק', label: t('filters.events.gameStations') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.inflatable_game_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.inflatable_game_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('inflatable_game_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                        </div>
                        {errors['serviceDetails.inflatable_game_types'] && <span className="error-text">{errors['serviceDetails.inflatable_game_types']}</span>}
                      </div>
                    )}
                  </div>

                  <div style={{marginBottom: '15px'}}>
                    <label className="checkbox-item" style={{fontWeight: '600'}}>
                      <input
                        type="checkbox"
                        checked={serviceDetails.equipment_rental_types?.includes('💨 מכונות אפקטים להשכרה') || false}
                        onChange={(e) => {
                          const current = serviceDetails.equipment_rental_types || [];
                          const newTypes = e.target.checked 
                            ? [...current, '💨 מכונות אפקטים להשכרה']
                            : current.filter(t => t !== '💨 מכונות אפקטים להשכרה');
                          handleServiceDetailsChange('equipment_rental_types', newTypes);
                        }}
                      />
                     {t('serviceForm.event.effectMachines')}
                    </label>
                    
                    {serviceDetails.equipment_rental_types?.includes('💨 מכונות אפקטים להשכרה') && (
                      <div style={{marginRight: '30px', marginTop: '8px'}}>
                        <div className="checkbox-group" data-field="effect_machine_types">
                        {[
  { value: 'מכונת עשן', label: t('filters.events.smokeMachine') },
  { value: 'מכונת שלג', label: t('filters.events.snowMachine') },
  { value: 'מכונת בועות', label: t('filters.events.bubbleMachine') }
].map(type => (
  <label key={type.value} className="checkbox-item">
    <input
      type="checkbox"
      checked={serviceDetails.effect_machine_types?.includes(type.value) || false}
      onChange={(e) => {
        const current = serviceDetails.effect_machine_types || [];
        const newTypes = e.target.checked 
          ? [...current, type.value]
          : current.filter(t => t !== type.value);
        handleServiceDetailsChange('effect_machine_types', newTypes);
      }}
    />
    {type.label}
  </label>
))}
                        </div>
                        {errors['serviceDetails.effect_machine_types'] && <span className="error-text">{errors['serviceDetails.effect_machine_types']}</span>}
                      </div>
                    )}
                  </div>

                </div>
                {errors['serviceDetails.equipment_rental_types'] && <span className="error-text">{errors['serviceDetails.equipment_rental_types']}</span>}
              </div>
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('סוגי ההפעלה') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'סוגי ההפעלה']
                    : current.filter(t => t !== 'סוגי ההפעלה');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
            {t('serviceForm.event.entertainmentTypes')}
            </label>
            
            {serviceDetails.work_types?.includes('סוגי ההפעלה') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
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
            )}
          </div>

          <div style={{marginBottom: '20px'}}>
            <label className="checkbox-item" style={{fontWeight: 'bold'}}>
              <input
                type="checkbox"
                checked={serviceDetails.work_types?.includes('אחר') || false}
                onChange={(e) => {
                  const current = serviceDetails.work_types || [];
                  const newTypes = e.target.checked 
                    ? [...current, 'אחר']
                    : current.filter(t => t !== 'אחר');
                  handleServiceDetailsChange('work_types', newTypes);
                }}
              />
              {t('serviceForm.event.other')}
            </label>
            
            {serviceDetails.work_types?.includes('אחר') && (
              <div style={{marginRight: '30px', marginTop: '10px'}}>
                <div className="checkbox-group" data-field="other_types">
                {[
  { value: 'איפור פנים מקצועי', label: t('filters.event.facePainting') },
  { value: 'בלוני קשת', label: t('filters.event.balloonArch') },
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
                {errors['serviceDetails.other_types'] && <span className="error-text">{errors['serviceDetails.other_types']}</span>}
              </div>
            )}
          </div>

          {errors['serviceDetails.work_types'] && <span className="error-text">{errors['serviceDetails.work_types']}</span>}
        </div>
      </div>
    </div>
  );
};

export default EventEntertainmentForm;