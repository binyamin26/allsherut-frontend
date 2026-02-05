import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const PropertyManagementForm = ({ serviceDetails, errors, handleServiceDetailsChange }) => {
    const { t } = useLanguage();
    
   const longTermManagement = [
  { value: 'חיפוש ובדיקת שוכרים מתאימים', label: t('serviceForm.propertyManagement.longTerm.tenantSearch') },
  { value: 'חתימה על חוזה וניהול ערבויות', label: t('serviceForm.propertyManagement.longTerm.contracts') },
  { value: 'גביית שכ"ד והעברת תשלומים לבעל הדירה', label: t('serviceForm.propertyManagement.longTerm.rentCollection') },
  { value: 'בדיקת מצב הנכס לפני ואחרי תקופת השכירות', label: t('serviceForm.propertyManagement.longTerm.inspection') },
  { value: 'העברת חשבונות השירותים (מים, חשמל, גז) על שם השוכר החדש', label: t('serviceForm.propertyManagement.longTerm.utilities') }
];

const shortTermManagement = [
  { value: 'פרסום וניהול מודעות באתרים', label: t('serviceForm.propertyManagement.shortTerm.listings') },
  { value: 'ניהול הזמנות ותקשורת עם אורחים', label: t('serviceForm.propertyManagement.shortTerm.bookings') },
  { value: 'קבלת אורחים / מסירת מפתחות', label: t('serviceForm.propertyManagement.shortTerm.checkin') },
  { value: 'ניקיון בין השהיות', label: t('serviceForm.propertyManagement.shortTerm.cleaning') },
  { value: 'בדיקה תקופתית של הנכס', label: t('serviceForm.propertyManagement.shortTerm.inspection') },
  { value: 'תיקונים כלליים (חשמל, אינסטלציה, מזגן וכו׳)', label: t('serviceForm.propertyManagement.shortTerm.repairs') }
];

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.propertyManagement.title')}</h3>

<div className="form-section">
       <h4>{t('serviceForm.common.requiredFields')}</h4>

        <div className="input-group">
          <label>{t('serviceForm.common.experience')}</label>
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
          <label>{t('serviceForm.propertyManagement.managementTypesLabel')}</label>
          
          <div style={{marginBottom: '16px'}}>
            <div style={{fontWeight: '600', marginBottom: '8px', color: '#374151'}}>
              🏠 {t('serviceForm.propertyManagement.longTermTitle')}
            </div>
            <div className="checkbox-group" data-field="management_type">
              {longTermManagement.map((type) => (
               <label key={type.value} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={serviceDetails.management_type?.includes(type.value) || false}
                    onChange={(e) => {
                      const current = serviceDetails.management_type || [];
            const newTypes = e.target.checked
  ? [...current, type.value]
  : current.filter(t => t !== type.value);
                      handleServiceDetailsChange('management_type', newTypes);
                    }}
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{marginBottom: '16px'}}>
            <div style={{fontWeight: '600', marginBottom: '8px', color: '#374151'}}>
              🏖️ {t('serviceForm.propertyManagement.shortTermTitle')}
            </div>
          <div className="checkbox-group">
              {shortTermManagement.map((type) => (
                <label key={type.value} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={serviceDetails.management_type?.includes(type.value) || false}
                    onChange={(e) => {
                      const current = serviceDetails.management_type || [];
                      const newTypes = e.target.checked
                        ? [...current, type.value]
                        : current.filter(t => t !== type.value);
                      handleServiceDetailsChange('management_type', newTypes);
                    }}
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          {errors['serviceDetails.management_type'] && (
            <span className="error-text">{errors['serviceDetails.management_type']}</span>
          )}
        </div>
      {/* JOURS DE DISPONIBILITÉ */}
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
      { value: 'שבת', label: t('days.saturday') }
    ].map(day => (
      <label key={day.value} className="checkbox-item">
        <input
          type="checkbox"
          checked={serviceDetails.availability_days?.includes(day.value) || false}
          onChange={(e) => {
            const current = serviceDetails.availability_days || [];
            const newDays = e.target.checked 
              ? [...current, day.value]
              : current.filter(d => d !== day.value);
            handleServiceDetailsChange('availability_days', newDays);
          }}
        />
        {day.label}
      </label>
    ))}
  </div>
  {errors['serviceDetails.availability_days'] && <span className="error-text">{errors['serviceDetails.availability_days']}</span>}
</div>

{/* HEURES DE DISPONIBILITÉ */}
<div className="input-group">
  <label>{t('serviceForm.common.availabilityHours')}</label>
  <div className="checkbox-group" data-field="availability_hours">
    {[
      { value: 'בוקר', label: t('hours.morning') },
      { value: 'צהריים', label: t('hours.noon') },
      { value: 'אחר הצהריים', label: t('hours.afternoon') },
      { value: 'ערב', label: t('hours.evening') },
      { value: 'לילה', label: t('hours.night') }
    ].map(hour => (
      <label key={hour.value} className="checkbox-item">
        <input
          type="checkbox"
          checked={serviceDetails.availability_hours?.includes(hour.value) || false}
          onChange={(e) => {
            const current = serviceDetails.availability_hours || [];
            const newHours = e.target.checked 
              ? [...current, hour.value]
              : current.filter(h => h !== hour.value);
            handleServiceDetailsChange('availability_hours', newHours);
          }}
        />
        {hour.label}
      </label>
    ))}
  </div>
  {errors['serviceDetails.availability_hours'] && <span className="error-text">{errors['serviceDetails.availability_hours']}</span>}
</div>
      </div>
    </div>
  );
};

export default PropertyManagementForm;