import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { getAllCities, getNeighborhoodsByCity } from '../data/israelLocations';
import CustomDropdown from './common/CustomDropdown';

const LocationSelector = ({ 
  onLocationChange, 
  initialCity = '', 
  initialNeighborhood = '',
  className = '',
  showAreaFilter = false 
}) => {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(initialNeighborhood);
  const [availableCities, setAvailableCities] = useState(getAllCities());
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);

  useEffect(() => {
    if (selectedCity) {
      const neighborhoods = getNeighborhoodsByCity(selectedCity);
      setAvailableNeighborhoods(neighborhoods);
      if (selectedNeighborhood && !neighborhoods.includes(selectedNeighborhood)) {
        setSelectedNeighborhood('');
      }
    } else {
      setAvailableNeighborhoods([]);
      setSelectedNeighborhood('');
    }
  }, [selectedCity]);

  useEffect(() => {
    if (initialCity === '' && selectedCity !== '') {
      setSelectedCity('');
      setSelectedNeighborhood('');
    }
  }, [initialCity]);

  useEffect(() => {
    onLocationChange({
      area: selectedArea,
      city: selectedCity,
      neighborhood: selectedNeighborhood,
      fullLocation: getFullLocationString()
    });
  }, [selectedArea, selectedCity, selectedNeighborhood]);

  const getFullLocationString = () => {
    const parts = [];
    if (selectedNeighborhood) parts.push(selectedNeighborhood);
    if (selectedCity) parts.push(selectedCity);
    if (selectedArea && !selectedCity) parts.push(selectedArea);
    return parts.join(', ');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleNeighborhoodChange = (e) => {
    setSelectedNeighborhood(e.target.value);
  };

  return (
    <div className={`location-selector ${className}`}>
      <div className="location-selector-header">
        <h3 className="location-selector-title">
          <MapPin size={20} className="location-icon" />
          בחר מיקום
        </h3>
      </div>

      <div className="location-dropdowns-container">
        <div className="location-dropdowns">
          {/* Sélection de ville */}
          <div className="dropdown-group">
            <label>עיר:</label>
            <CustomDropdown
              name="city"
              options={availableCities}
              value={selectedCity}
              onChange={handleCityChange}
              placeholder="בחר עיר"
            />
          </div>

          {/* Sélection de quartier - CONDITIONNEL */}
          {selectedCity && availableNeighborhoods.length > 0 && (
            <div className="dropdown-group">
              <label>שכונה:</label>
              <CustomDropdown
                name="neighborhood"
                options={availableNeighborhoods}
                value={selectedNeighborhood}
                onChange={handleNeighborhoodChange}
                placeholder={`כל השכונות ב${selectedCity}`}
              />
            </div>
          )}
        </div>
      </div>

      {getFullLocationString() && (
        <div className="selected-location-display">
          <div className="selected-location-label">מיקום נבחר:</div>
          <div className="selected-location-value">{getFullLocationString()}</div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;