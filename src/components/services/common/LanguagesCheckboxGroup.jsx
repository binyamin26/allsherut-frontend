import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

// Valeur stockée pour l'option « Autre » (slug ASCII stable, cohérent avec la
// migration des valeurs canoniques du repo France — voir scripts/migrate-canonical-values.mjs)
export const LANGUAGE_OTHER_VALUE = 'other';

const BASE_LANGUAGES = [
  { value: 'hebrew', key: 'languages.hebrew' },
  { value: 'russian', key: 'languages.russian' },
  { value: 'english', key: 'languages.english' },
  { value: 'french', key: 'languages.french' },
];

/**
 * Champ « langues parlées » partagé par tous les formulaires de service.
 * Rend les cases à cocher des langues + une case « Autre » qui ouvre un champ
 * libre stocké dans serviceDetails.languages_other.
 */
const LanguagesCheckboxGroup = ({
  serviceDetails,
  handleServiceDetailsChange,
  errors = {},
  includeSpanish = false,
}) => {
  const { t } = useLanguage();

  const options = includeSpanish
    ? [...BASE_LANGUAGES, { value: 'spanish', key: 'languages.spanish' }]
    : BASE_LANGUAGES;

  const selected = serviceDetails.languages || [];
  const otherChecked = selected.includes(LANGUAGE_OTHER_VALUE);

  const toggle = (value, checked) => {
    const current = serviceDetails.languages || [];
    const next = checked
      ? [...current, value]
      : current.filter((l) => l !== value);
    handleServiceDetailsChange('languages', next);
    if (value === LANGUAGE_OTHER_VALUE && !checked) {
      handleServiceDetailsChange('languages_other', '');
    }
  };

  return (
    <>
      <div className="checkbox-group" data-field="languages">
        {options.map((lang) => (
          <label key={lang.value} className="checkbox-item">
            <input
              type="checkbox"
              checked={selected.includes(lang.value)}
              onChange={(e) => toggle(lang.value, e.target.checked)}
            />
            {t(lang.key)}
          </label>
        ))}
        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={otherChecked}
            onChange={(e) => toggle(LANGUAGE_OTHER_VALUE, e.target.checked)}
          />
          {t('languages.other')}
        </label>
        {otherChecked && (
          <input
            type="text"
            className="standard-input"
            style={{ marginTop: '8px' }}
            placeholder={t('languages.otherPlaceholder')}
            value={serviceDetails.languages_other || ''}
            onChange={(e) => handleServiceDetailsChange('languages_other', e.target.value)}
          />
        )}
      </div>
      {errors['serviceDetails.languages'] && (
        <span className="error-text">{errors['serviceDetails.languages']}</span>
      )}
    </>
  );
};

export default LanguagesCheckboxGroup;
