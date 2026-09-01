import { MapPin } from 'lucide-react';
import ZoneAutocomplete from './ZoneAutocomplete';

// Zone shape (partagée frontend/backend) :
// { coverageType: 'city'|'department', departmentCode, departmentName,
//   cityInseeCode?, cityName?, label }
// Le profil chargé depuis le backend renvoie `city` (libellé) au lieu de `label`
// (voir User.getWorkingAreas) — zoneLabel() gère les deux formes.
const zoneKey = (zone) => `${zone.coverageType}:${zone.departmentCode}:${zone.cityInseeCode || ''}`;
const zoneLabel = (zone) => zone.label || zone.city || '';

const zoneFromSuggestion = (suggestion) => {
  if (suggestion.type === 'department') {
    return {
      coverageType: 'department',
      departmentCode: suggestion.code,
      departmentName: suggestion.name,
      label: `Tout le département — ${suggestion.name} (${suggestion.code})`,
    };
  }
  return {
    coverageType: 'city',
    departmentCode: suggestion.departmentCode,
    departmentName: suggestion.departmentName,
    cityInseeCode: suggestion.inseeCode,
    cityName: suggestion.name,
    label: suggestion.name,
  };
};

// Champ contrôlé "Zones d'intervention" : recherche + liste de zones sélectionnées.
// Utilisé à l'identique dans l'inscription prestataire (AuthModal) et l'édition
// de profil (DashboardPage).
const WorkingAreasField = ({ value = [], onChange, error }) => {
  const handleSelect = (suggestion) => {
    const zone = zoneFromSuggestion(suggestion);
    const key = zoneKey(zone);
    if (value.some(z => zoneKey(z) === key)) return; // déjà sélectionnée
    onChange([...value, zone]);
  };

  const handleRemove = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="working-areas-field">
      <ZoneAutocomplete onSelect={handleSelect} />

      {value.length > 0 && (
        <div className="selected-areas">
          <h5>Vos zones d&apos;intervention ({value.length})</h5>
          <div className="selected-areas-list">
            {value.map((zone, index) => (
              <span key={zoneKey(zone)} className="area-tag">
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  aria-label="Supprimer cette zone"
                >
                  ×
                </button>
                <MapPin size={14} />
                {zoneLabel(zone)}
              </span>
            ))}
          </div>
        </div>
      )}

      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default WorkingAreasField;
