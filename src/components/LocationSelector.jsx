import { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import ZoneAutocomplete from './common/ZoneAutocomplete';
import { useLanguage } from '../context/LanguageContext';

// Sélecteur de ville (mono-sélection) pour la recherche client — recherche par
// commune uniquement (pas de département côté client, pour rester simple).
// Conserve le contrat de sortie {city, neighborhood, fullLocation} existant
// (consommé par RecruitmentServicePage) et ajoute cityInsee/departmentCode
// pour le matching France (voir backend/routes/search.js).
const LocationSelector = ({
  onLocationChange,
  initialCity = '',
  className = '',
}) => {
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const { t } = useLanguage();

  const emit = (next) => {
    onLocationChange({
      city: next?.name || '',
      cityInsee: next?.inseeCode || '',
      departmentCode: next?.departmentCode || '',
      neighborhood: '',
      fullLocation: next?.name || '',
    });
  };

  const handleSelect = (zone) => {
    setSelectedCity(zone.name);
    emit(zone);
  };

  const handleClear = () => {
    setSelectedCity('');
    emit(null);
  };

  return (
    <div className={`location-selector ${className}`}>
      <div className="location-selector-header">
        <h3 className="location-selector-title">
          <MapPin size={20} className="location-icon" />
          {t('location.selectLocation')}
        </h3>
      </div>

      <div className="location-dropdowns-container">
        <div className="location-dropdowns">
          <div className="dropdown-group">
            <label>{t('location.city')}</label>
            <ZoneAutocomplete
              onSelect={handleSelect}
              resultTypes={['city']}
              placeholder={t('auth.selectCity')}
            />
          </div>
        </div>
      </div>

      {selectedCity && (
        <div className="selected-location-display">
          <div className="selected-location-label">{t('location.selected')}</div>
          <div className="selected-location-value">
            {selectedCity}
            <button type="button" className="clear-location-btn" onClick={handleClear} aria-label="Effacer">
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
