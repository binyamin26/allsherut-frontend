import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';
import { FILTER_CONFIG } from '../../config/filterConfig';
import CustomDropdown from '../../common/CustomDropdown';

const TutoringForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
const { t, currentLanguage } = useLanguage();
    const { apiCall } = useAuth();
    
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openGroups, setOpenGroups] = useState({});

    const config = FILTER_CONFIG.tutoring;

    // Chargement des matières depuis la DB
    useEffect(() => {
        const loadSubcategories = async () => {
            try {
                setLoading(true);
                const response = await apiCall('/services/5/subcategories', 'GET');
                if (response.success && response.data.subcategories) {
                    setSubcategories(response.data.subcategories);
                    setError(null);
                } else {
                    throw new Error('Format de réponse invalide');
                }
            } catch (err) {
                console.error('Erreur chargement sous-catégories:', err);
                setError(t('filters.tutoring.loadError'));
            } finally {
                setLoading(false);
            }
        };
        loadSubcategories();
    }, [apiCall, t]);

    // Groupement des matières par catégorie
    const groupedSubcategories = useMemo(() => {
        if (!subcategories.length) return {};
        return {
            academic: { title: t('filters.tutoring.academicSubjects'), items: subcategories.filter(s => s.display_order >= 200 && s.display_order <= 223) },
            music: { title: t('filters.tutoring.music'), items: subcategories.filter(s => s.display_order >= 1 && s.display_order <= 7) },
            art: { title: t('filters.tutoring.art'), items: subcategories.filter(s => s.display_order >= 10 && s.display_order <= 16) },
            dance: { title: t('filters.tutoring.dance'), items: subcategories.filter(s => s.display_order >= 20 && s.display_order <= 24) },
            theater: { title: t('filters.tutoring.theater'), items: subcategories.filter(s => s.display_order >= 30 && s.display_order <= 33) },
            languages: { title: t('filters.tutoring.languages'), items: subcategories.filter(s => s.display_order >= 40 && s.display_order <= 47) },
            crafts: { title: t('filters.tutoring.crafts'), items: subcategories.filter(s => s.display_order >= 50 && s.display_order <= 54) },
            tech: { title: t('filters.tutoring.tech'), items: subcategories.filter(s => s.display_order >= 60 && s.display_order <= 64) },
            cooking: { title: t('filters.tutoring.cooking'), items: subcategories.filter(s => s.display_order >= 70 && s.display_order <= 74) },
            personal: { title: t('filters.tutoring.personal'), items: subcategories.filter(s => s.display_order >= 80 && s.display_order <= 89) },
            sports: { title: t('filters.tutoring.sports'), items: subcategories.filter(s => s.display_order >= 90 && s.display_order <= 119) }
        };
    }, [subcategories, t]);

    // Handler pour les checkboxes de matières
    const handleSubjectChange = (subjectName, checked) => {
        const current = serviceDetails.subjects || [];
        const newSubjects = checked 
            ? [...current, subjectName]
            : current.filter(s => s !== subjectName);
        handleServiceDetailsChange('subjects', newSubjects);
    };

    // Handler pour les checkboxes de niveaux
    const handleLevelChange = (levelValue, checked) => {
        const current = serviceDetails.levels || [];
        const newLevels = checked 
            ? [...current, levelValue]
            : current.filter(l => l !== levelValue);
        handleServiceDetailsChange('levels', newLevels);
    };

    // Handler pour les checkboxes de groupes d'âge
    const handleAgeGroupChange = (ageValue, checked) => {
        const current = serviceDetails.ageGroups || [];
        const newAgeGroups = checked
            ? [...current, ageValue]
            : current.filter(a => a !== ageValue);
        handleServiceDetailsChange('ageGroups', newAgeGroups);
    };

    // Handler pour les checkboxes de spécialisations
    const handleSpecializationChange = (specValue, checked) => {
        const current = serviceDetails.specializations || [];
        const newSpecs = checked 
            ? [...current, specValue]
            : current.filter(s => s !== specValue);
        handleServiceDetailsChange('specializations', newSpecs);
    };

    return (
        <div className="service-details-form">
            <h3>{t('serviceForm.tutoring.title')}</h3>
            
           <div className="form-section">
               <h4>{t('serviceForm.common.requiredFields')}</h4>*

               {/* ✅ AGE */}
        <div className="input-group">
          <label className="auth-form-label required">{t('serviceForm.common.age')}</label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={serviceDetails.age || ''}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '');
              handleServiceDetailsChange('age', numericValue);
            }}
            className={`standard-input ${errors['serviceDetails.age'] ? 'error' : ''}`}
            data-field="age"
          />
          {errors['serviceDetails.age'] && <span className="error-text">{errors['serviceDetails.age']}</span>}
        </div>

                {/* JOURS DE DISPONIBILITÉ */}
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

{/* HEURES DE DISPONIBILITÉ */}
<div className="input-group">
  <label className="auth-form-label required">{t('serviceForm.common.availabilityHours')}</label>
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
                
                {/* MATIÈRES - Chargées depuis la DB */}
                <div className="input-group">
                    <label className="auth-form-label required">{t('serviceForm.tutoring.subjectsLabel')}</label>
                    
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '1rem', color: '#64748b' }}>
                            <div className="loading-spinner" style={{ margin: '0 auto 0.5rem' }}></div>
                            <p>{t('filters.tutoring.loading')}</p>
                        </div>
                    ) : error ? (
                        <div style={{ textAlign: 'center', padding: '1rem', color: '#ef4444' }}>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <div className="subjects-container">
    {Object.entries(groupedSubcategories).map(([key, group]) => (
        group.items.length > 0 && (
           <div key={key} className="accordion-group">
                <button
                    type="button"
                    onClick={() => setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }))}
                    className="accordion-trigger"
                >
                    <span>{group.title}</span>
                    <span>{openGroups[key] ? '▲' : '▼'}</span>
                </button>
                {openGroups[key] && (
                    <div className="checkbox-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem', padding: '0.75rem 1rem', background: 'white' }}>
                        {group.items.map(subcat => (
                            <label key={subcat.id} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={serviceDetails.subjects?.includes(subcat.name_he) || false}
                                    onChange={(e) => handleSubjectChange(subcat.name_he, e.target.checked)}
                                />
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.58rem', fontWeight: 'bold', background: '#e5e7eb', borderRadius: '3px', padding: '1px 3px', minWidth: '1.6em', color: '#374151', letterSpacing: '0.04em' }}>{subcat.icon}</span>
                                    <span style={{ direction: 'rtl', unicodeBidi: 'isolate', display: 'inline-block' }}>{(subcat[`name_${currentLanguage}`] || subcat.name_he).replace(/‏/g, '')}</span>
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        )
    ))}
</div>
                    )}
                    {errors['serviceDetails.subjects'] && <span className="error-text">{errors['serviceDetails.subjects']}</span>}
                </div>

                {/* MODE D'ENSEIGNEMENT */}
                <div className="input-group">
                    <label className="auth-form-label required">{t('serviceForm.tutoring.teachingMode')}</label>
                    <CustomDropdown
    name="teachingMode"
    value={serviceDetails.teachingMode || ''}
    onChange={(e) => handleServiceDetailsChange('teachingMode', e.target.value)}
    placeholder={t('serviceForm.common.select')}
    error={errors['serviceDetails.teachingMode']}
    options={config.teachingModes.map(mode => ({
        value: mode.value,
        label: t(mode.key)
    }))}
/>
                    {errors['serviceDetails.teachingMode'] && <span className="error-text">{errors['serviceDetails.teachingMode']}</span>}
                </div>

            </div>

            <div className="form-section optional">
                <h4>{t('serviceForm.common.optionalFields')}</h4>

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

                {/* GROUPES D'ÂGE */}
                <div className="input-group">
                    <label className="auth-form-label">{t('filters.sports_activities.ageGroups')}</label>
                    <div className="checkbox-group" data-field="ageGroups">
                        {config.ageGroups.map(ag => (
                            <label key={ag.value} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={serviceDetails.ageGroups?.includes(ag.value) || false}
                                    onChange={(e) => handleAgeGroupChange(ag.value, e.target.checked)}
                                />
                                {t(ag.key)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* NIVEAUX */}
                <div className="input-group">
                    <label className="auth-form-label">{t('serviceForm.tutoring.levelsLabel')}</label>
                    <div className="checkbox-group" data-field="levels">
                        {config.levels.map(level => (
                            <label key={level.value} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={serviceDetails.levels?.includes(level.value) || false}
                                    onChange={(e) => handleLevelChange(level.value, e.target.checked)}
                                />
                                {t(level.key)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* TARIF HORAIRE */}
                <div className="input-group">
                    <label>{t('serviceForm.tutoring.hourlyRate')}</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        value={serviceDetails.hourlyRate || ''}
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(/\D/g, '');
                            handleServiceDetailsChange('hourlyRate', numericValue);
                        }}
                        className="standard-input"
                    />
                </div>

                {/* SPÉCIALISATIONS */}
                <div className="input-group">
                    <label>{t('filters.tutoring.specializations')}</label>
                    <div className="checkbox-group" data-field="specializations">
                        {config.specializations.map(spec => (
                            <label key={spec.value} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={serviceDetails.specializations?.includes(spec.value) || false}
                                    onChange={(e) => handleSpecializationChange(spec.value, e.target.checked)}
                                />
                                {t(spec.key)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* QUALIFICATIONS */}
                <div className="input-group">
                    <label>{t('serviceForm.tutoring.qualifications')}</label>
                    <input
                        type="text"
                        autoComplete="off"
                        value={serviceDetails.qualifications || ''}
                        onChange={(e) => handleServiceDetailsChange('qualifications', e.target.value)}
                        placeholder={t('serviceForm.tutoring.qualificationsPlaceholder')}
                        className="standard-input"
                    />
                </div>
            </div>
        </div>
    );
};

export default TutoringForm;