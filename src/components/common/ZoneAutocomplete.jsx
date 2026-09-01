import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Layers, Loader } from 'lucide-react';
import apiService from '../../services/api';

// Champ de recherche débouncé pour les zones françaises (villes + départements).
// Interroge GET /api/location/fr/zones/search — jamais de liste statique côté navigateur.
const ZoneAutocomplete = ({
  onSelect,
  placeholder = 'Rechercher une ville ou un département...',
  resultTypes, // ex: ['city'] pour restreindre aux communes uniquement
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);

    const term = query.trim();
    if (term.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const zones = await apiService.searchFranceZones(term, 8);
      const filtered = resultTypes ? zones.filter(z => resultTypes.includes(z.type)) : zones;
      setResults(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query, resultTypes]);

  const handleSelect = (zone) => {
    onSelect(zone);
    setQuery('');
    setResults([]);
    setOpen(false);
  };

  return (
    <div className={`zone-autocomplete ${className}`} ref={wrapperRef}>
      <div className="zone-autocomplete-input-wrap">
        <Search size={18} className="zone-autocomplete-icon" />
        <input
          type="text"
          className="zone-autocomplete-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {loading && <Loader size={16} className="zone-autocomplete-loading animate-spin" />}
      </div>

      {open && query.trim().length >= 2 && (
        <ul className="modern-suggestions-dropdown zone-autocomplete-dropdown">
          {results.length === 0 && !loading && (
            <li className="modern-suggestion-item zone-autocomplete-empty">
              <span className="suggestion-content">
                <span className="suggestion-name">Aucun résultat</span>
              </span>
            </li>
          )}
          {results.map((zone) => (
            <li
              key={zone.type === 'department' ? `dept-${zone.code}` : `city-${zone.inseeCode}`}
              className="modern-suggestion-item"
              onClick={() => handleSelect(zone)}
            >
              {zone.type === 'department' ? (
                <>
                  <Layers size={18} className="suggestion-icon" />
                  <span className="suggestion-content">
                    <span className="suggestion-name">Tout le département — {zone.name} ({zone.code})</span>
                    {zone.communesCount > 0 && (
                      <span className="suggestion-details">{zone.communesCount} communes</span>
                    )}
                  </span>
                </>
              ) : (
                <>
                  <MapPin size={18} className="suggestion-icon" />
                  <span className="suggestion-content">
                    <span className="suggestion-name">{zone.name}</span>
                    <span className="suggestion-details">{zone.departmentName} ({zone.departmentCode})</span>
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ZoneAutocomplete;
