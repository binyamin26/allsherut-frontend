// src/components/search/FilterBar.jsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  MapPin,  
  Calendar, 
  Settings, 
  ChevronDown, 
  X,
  Search,
  Star
} from 'lucide-react';
import LocationSelector from '../LocationSelector';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  FILTER_CONFIG, 
  getFilterOptions, 
  getSectionTitle,
  getCommonDays,
  getCommonHours 
} from './../config/filterConfig';

const FilterBar = ({ 
  serviceType, 
  onFiltersChange, 
  activeFilters = {},
  onLocationChange,
  selectedLocation = {}
}) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(null);
  const [tempFilters, setTempFilters] = useState(activeFilters);

  // Comptage des filtres actifs par catégorie
  const getActiveCount = useCallback((category) => {
    switch (category) {
      case 'location':
        return selectedLocation.city ? 1 : 0;
      case 'price':
        return (activeFilters.minPrice || activeFilters.maxPrice) ? 1 : 0;
      case 'experience':
        return activeFilters.experience ? 1 : 0;
      case 'service':
        return Object.keys(activeFilters).filter(key => 
          !['minPrice', 'maxPrice', 'experience'].includes(key)
        ).length;
      case 'rating':
        return activeFilters.minRating ? 1 : 0;
      default:
        return 0;
    }
  }, [activeFilters, selectedLocation]);

  const handleFilterClick = useCallback((filterType) => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
  }, [activeFilter]);

  const closePanel = useCallback(() => {
    setActiveFilter(null);
  }, []);

  const applyFilters = useCallback(() => {
    onFiltersChange(tempFilters);
    closePanel();
  }, [tempFilters, onFiltersChange, closePanel]);

  const resetFilters = useCallback(() => {
    setTempFilters({});
    onFiltersChange({});
    onLocationChange({ city: '', neighborhood: '', fullLocation: '' });
    closePanel();
  }, [onFiltersChange, onLocationChange, closePanel]);

  return (
    <>
      {/* Barre de filtres horizontale */}
      <div className="filter-bar">
        <div className="filter-bar-container">
          
          {/* Filtre Localisation */}
          <button
            className={`filter-pill ${activeFilter === 'location' ? 'active' : ''}`}
            onClick={() => handleFilterClick('location')}
          >
            <MapPin size={16} />
            <span className="filter-pill-text">
              {selectedLocation.city || t('filters.location')}
            </span>
            {getActiveCount('location') > 0 && (
              <span className="filter-pill-badge">{getActiveCount('location')}</span>
            )}
            <ChevronDown size={14} className="filter-pill-arrow" />
          </button>

        {/* Filtre Prix - uniquement pour services avec tarif */}
          {['babysitting', 'cleaning', 'gardening', 'tutoring', 'home_organization'].includes(serviceType) && (
            <button
              className={`filter-pill ${activeFilter === 'price' ? 'active' : ''}`}
              onClick={() => handleFilterClick('price')}
            >
              <span style={{ fontSize: '16px', fontWeight: '600' }}>₪</span>
              <span className="filter-pill-text">
                {(activeFilters.minPrice || activeFilters.maxPrice) 
                  ? `₪${activeFilters.minPrice || 0}-${activeFilters.maxPrice || 500}` 
                  : t('filters.price')}
              </span>
              {getActiveCount('price') > 0 && (
                <span className="filter-pill-badge">{getActiveCount('price')}</span>
              )}
              <ChevronDown size={14} className="filter-pill-arrow" />
            </button>
          )}

          {/* Filtre Expérience */}
          <button
            className={`filter-pill ${activeFilter === 'experience' ? 'active' : ''}`}
            onClick={() => handleFilterClick('experience')}
          >
            <Calendar size={16} />
            <span className="filter-pill-text">
              {activeFilters.experience || t('filters.experience')}
            </span>
            {getActiveCount('experience') > 0 && (
              <span className="filter-pill-badge">{getActiveCount('experience')}</span>
            )}
            <ChevronDown size={14} className="filter-pill-arrow" />
          </button>

          {/* Filtre Étoiles */}
          <button
            className={`filter-pill ${activeFilter === 'rating' ? 'active' : ''}`}
            onClick={() => handleFilterClick('rating')}
          >
            <Star size={16} />
            <span className="filter-pill-text">
              {activeFilters.minRating 
                ? `${activeFilters.minRating}+ ${t('filters.stars')}` 
                : t('filters.rating')}
            </span>
            {activeFilters.minRating && (
              <span className="filter-pill-badge">1</span>
            )}
            <ChevronDown size={14} className="filter-pill-arrow" />
          </button>

          {/* Filtre Service Spécifique */}
          <button
            className={`filter-pill ${activeFilter === 'service' ? 'active' : ''}`}
            onClick={() => handleFilterClick('service')}
          >
            <Settings size={16} />
            <span className="filter-pill-text">{t('filters.advancedFilters')}</span>
            {getActiveCount('service') > 0 && (
              <span className="filter-pill-badge">{getActiveCount('service')}</span>
            )}
            <ChevronDown size={14} className="filter-pill-arrow" />
          </button>

          {/* Bouton Reset */}
          {(Object.keys(activeFilters).length > 0 || selectedLocation.city) && (
            <button
              className="filter-reset-btn"
              onClick={resetFilters}
            >
              <X size={16} />
              <span>{t('filters.clearAll')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Overlay pour mobile */}
      {activeFilter && (
        <div className="filter-overlay" onClick={closePanel} />
      )}

      {/* Panneaux de filtres */}
      {activeFilter && (
        <div className="filter-sidebar">
          <div className="filter-sidebar-header">
            <h3 className="filter-sidebar-title">
              {activeFilter === 'location' && t('filters.selectLocation')}
              {activeFilter === 'price' && t('filters.priceRange')}
              {activeFilter === 'experience' && t('filters.experienceLevel')}
              {activeFilter === 'rating' && t('filters.ratingFilter')}
              {activeFilter === 'service' && t('filters.advancedFilters')}
            </h3>
            <button 
              className="filter-sidebar-close"
              onClick={closePanel}
            >
              <X size={20} />
            </button>
          </div>

          <div className="filter-sidebar-content">
            {activeFilter === 'location' && (
              <LocationPanel 
                selectedLocation={selectedLocation}
                onLocationChange={onLocationChange}
              />
            )}

            {activeFilter === 'price' && (
              <PricePanel 
                minPrice={tempFilters.minPrice || 0}
                maxPrice={tempFilters.maxPrice || 500}
                onChange={(min, max) => setTempFilters(prev => ({
                  ...prev,
                  minPrice: min,
                  maxPrice: max
                }))}
              />
            )}

            {activeFilter === 'experience' && (
              <ExperiencePanel 
                selected={tempFilters.experience || ''}
                onChange={(value) => setTempFilters(prev => ({
                  ...prev,
                  experience: value
                }))}
              />
            )}

            {activeFilter === 'rating' && (
              <RatingPanel 
                selected={tempFilters.minRating || ''}
                onChange={(value) => setTempFilters(prev => ({
                  ...prev,
                  minRating: value
                }))}
              />
            )}

            {activeFilter === 'service' && (
              <ServicePanel 
                serviceType={serviceType}
                filters={tempFilters}
                onChange={setTempFilters}
              />
            )}
          </div>

          <div className="filter-sidebar-footer">
            <button 
              className="btn btn-secondary"
              onClick={() => {
                if (activeFilter === 'location') {
                  onLocationChange({ area: '', city: '', neighborhood: '', fullLocation: '' });
                } else if (activeFilter === 'price') {
                  const newFilters = { ...activeFilters, minPrice: undefined, maxPrice: undefined };
                  setTempFilters(newFilters);
                  onFiltersChange(newFilters);
                } else if (activeFilter === 'experience') {
                  const newFilters = { ...activeFilters, experience: undefined };
                  setTempFilters(newFilters);
                  onFiltersChange(newFilters);
                } else if (activeFilter === 'rating') {
                  const newFilters = { ...activeFilters, minRating: undefined };
                  setTempFilters(newFilters);
                  onFiltersChange(newFilters);
                } else if (activeFilter === 'service') {
                  setTempFilters({});
                  onFiltersChange({});
                }
              }}
            >
              {t('filters.clear')}
            </button>
            <button 
              className="btn btn-primary"
              onClick={applyFilters}
            >
              <Search size={16} />
              {t('filters.showResults')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANTS PANELS COMMUNS
// ═══════════════════════════════════════════════════════════════════════════

const PricePanel = ({ minPrice, maxPrice, onChange }) => {
  const { t } = useLanguage();
  
  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value);
    const isMin = e.target.name === 'min';
    if (isMin) {
      onChange(value, maxPrice);
    } else {
      onChange(minPrice, value);
    }
  };

  return (
    <div className="price-panel">
      <div className="price-display">
        <div className="price-value">
          <span className="price-label">{t('filters.minimum')}</span>
          <span className="price-amount">₪{minPrice}</span>
        </div>
        <div className="price-separator">-</div>
        <div className="price-value">
          <span className="price-label">{t('filters.maximum')}</span>
          <span className="price-amount">₪{maxPrice}</span>
        </div>
      </div>

      <div className="dual-range-slider">
        <div className="range-track">
          <div 
            className="range-fill"
            style={{
              left: `${(minPrice / 500) * 100}%`,
              width: `${((maxPrice - minPrice) / 500) * 100}%`
            }}
          />
        </div>
        <input
          type="range"
          name="min"
          min="0"
          max="500"
          value={minPrice}
          onChange={handleRangeChange}
          className="range-input range-min"
        />
        <input
          type="range"
          name="max"
          min="0"
          max="500"
          value={maxPrice}
          onChange={handleRangeChange}
          className="range-input range-max"
        />
      </div>

      <div className="price-presets">
        <button onClick={() => onChange(0, 100)}>₪0-100</button>
        <button onClick={() => onChange(100, 200)}>₪100-200</button>
        <button onClick={() => onChange(200, 300)}>₪200-300</button>
        <button onClick={() => onChange(300, 500)}>₪300+</button>
      </div>
    </div>
  );
};

const LocationPanel = ({ selectedLocation, onLocationChange }) => {
  return (
    <div className="location-panel">
      <LocationSelector 
        onLocationChange={onLocationChange}
        initialCity={selectedLocation.city}
        initialNeighborhood={selectedLocation.neighborhood}
        className="location-selector-panel"
      />
    </div>
  );
};

const ExperiencePanel = ({ selected, onChange }) => {
  const { t } = useLanguage();
  
  const options = [
    { value: '', label: t('filters.allLevels') },
    { value: '1-2', label: `1-2 ${t('filters.years')}` },
    { value: '3-5', label: `3-5 ${t('filters.years')}` },
    { value: '6+', label: `6+ ${t('filters.years')}` }
  ];

  return (
    <div className="experience-panel">
      {options.map(option => (
        <label key={option.value} className="experience-option">
          <input
            type="radio"
            name="experience"
            value={option.value}
            checked={selected === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="experience-option-content">
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

const RatingPanel = ({ selected, onChange }) => {
  const { t } = useLanguage();
  
  const options = [
    { value: '', label: t('filters.allRatings') },
    { value: 5, label: `5 ${t('filters.stars')}` },
    { value: 4, label: `4+ ${t('filters.stars')}` },
    { value: 3, label: `3+ ${t('filters.stars')}` },
    { value: 2, label: `2+ ${t('filters.stars')}` },
    { value: 1, label: `1+ ${t('filters.star')}` }
  ];

  return (
    <div className="rating-panel">
      {options.map(option => (
        <label key={option.value} className="rating-option">
          <input
            type="radio"
            name="rating"
            value={option.value}
            checked={selected === option.value}
            onChange={(e) => onChange(e.target.value === '' ? '' : parseInt(e.target.value))}
          />
          <div className="rating-option-content">
            <span>{option.label}</span>
            {option.value !== '' && (
              <div className="stars-display">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < option.value ? "currentColor" : "none"}
                    className={i < option.value ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANTS HELPERS RÉUTILISABLES
// ═══════════════════════════════════════════════════════════════════════════

// Composant générique pour section de checkboxes
const CheckboxSection = ({ title, options, filterKey, filters, onCheckboxChange }) => {
  const { t } = useLanguage();
  
  return (
    <div className="filter-section">
      <h4>{title}</h4>
      {options.map(opt => (
        <label key={opt.value} className="checkbox-option">
          <input
            type="checkbox"
            checked={filters[filterKey]?.includes(opt.value) || false}
            onChange={(e) => onCheckboxChange(filterKey, opt.value, e.target.checked)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
};

// Composant générique pour section de select
const SelectSection = ({ title, options, filterKey, filters, onFilterChange }) => {
  return (
    <div className="filter-section">
      <h4>{title}</h4>
      <select 
        value={filters[filterKey] || ''} 
        onChange={(e) => onFilterChange(filterKey, e.target.value)}
        className="filter-select"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

// Composant pour jours de disponibilité
const AvailabilityDaysSection = ({ filters, onExclusiveCheckbox, includeSaturday = false }) => {
  const { t } = useLanguage();
  const days = getCommonDays(t, includeSaturday);
  
  return (
    <div className="filter-section">
      <h4>{t('filters.common.availabilityDays')}</h4>
      {days.map(day => (
        <label key={day.value} className="checkbox-option">
          <input
            type="checkbox"
            checked={filters.availability_days?.includes(day.value) || false}
            onChange={() => onExclusiveCheckbox(
              'availability_days', 
              day.value, 
              t('days.allWeek'),
              days.filter(d => d.value !== t('days.allWeek')).map(d => d.value)
            )}
          />
          {day.label}
        </label>
      ))}
    </div>
  );
};

// Composant pour heures de disponibilité
const AvailabilityHoursSection = ({ filters, onExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const hours = getCommonHours(t);
  
  return (
    <div className="filter-section">
      <h4>{t('filters.common.availabilityHours')}</h4>
      {hours.map(hour => (
        <label key={hour.value} className="checkbox-option">
          <input
            type="checkbox"
            checked={filters.availability_hours?.includes(hour.value) || false}
            onChange={() => onExclusiveCheckbox(
              'availability_hours', 
              hour.value, 
              t('hours.all'),
              hours.filter(h => h.value !== t('hours.all')).map(h => h.value)
            )}
          />
          {hour.label}
        </label>
      ))}
    </div>
  );
};

// Composant pour filtre d'âge
const AgeRangeSection = ({ filters, onFilterChange }) => {
  const { t } = useLanguage();
  
  return (
    <div className="filter-section">
      <h4>{t('filters.common.age')}</h4>
      <div className="dual-range-inputs">
        <input
          type="number"
          placeholder={t('filters.minimum')}
          value={filters.minAge || ''}
          onChange={(e) => onFilterChange('minAge', e.target.value)}
          className="dual-range-input"
          min="18"
          max="70"
        />
        <span className="range-separator">-</span>
        <input
          type="number"
          placeholder={t('filters.maximum')}
          value={filters.maxAge || ''}
          onChange={(e) => onFilterChange('maxAge', e.target.value)}
          className="dual-range-input"
          min="18"
          max="70"
        />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SERVICE PANEL PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

const ServicePanel = ({ serviceType, filters, onChange }) => {
  const { t } = useLanguage();
  
  const handleFilterChange = (key, value) => {
    onChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCheckboxChange = (key, value, checked) => {
    const current = filters[key] || [];
    const newValues = checked 
      ? [...current, value]
      : current.filter(item => item !== value);
    handleFilterChange(key, newValues);
  };

  const handleExclusiveCheckbox = (field, value, allValue, allOptions) => {
    const current = filters[field] || [];
    
    if (value === allValue) {
      if (!current.includes(allValue)) {
        handleFilterChange(field, [allValue]);
      } else {
        handleFilterChange(field, []);
      }
    } else {
      let newValues;
      if (current.includes(value)) {
        newValues = current.filter(v => v !== value);
      } else {
        newValues = [...current.filter(v => v !== allValue), value];
      }
      handleFilterChange(field, newValues);
    }
  };

  // Fonction helper pour créer des options traduites
  const getOptions = (configKey) => getFilterOptions(serviceType, configKey, t);
  const getTitle = (sectionKey) => getSectionTitle(serviceType, sectionKey, t);

  // Rendu selon le type de service
  switch (serviceType) {
    case 'babysitting':
      return (
        <BabysittingFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'cleaning':
      return (
        <CleaningFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'gardening':
      return (
        <GardeningFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      );
      
    case 'petcare':
      return (
        <PetcareFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      );
      
    case 'tutoring':
      return (
        <TutoringFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      );
      
    case 'eldercare':
      return (
        <EldercareFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      );
      
    case 'laundry':
      return (
        <LaundryFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'electrician':
      return (
        <ElectricianFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'plumbing':
      return (
        <PlumbingFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'air_conditioning':
      return (
        <AirConditioningFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'gas_technician':
      return (
        <GasTechnicianFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'drywall':
      return (
        <DrywallFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'carpentry':
      return (
        <CarpentryFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'property_management':
      return (
        <PropertyManagementFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      );
      
    case 'home_organization':
      return (
        <HomeOrganizationFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'painting':
      return (
        <PaintingFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'private_chef':
      return (
        <PrivateChefFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'event_entertainment':
      return (
        <EventEntertainmentFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'waterproofing':
      return (
        <WaterproofingFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'contractor':
      return (
        <ContractorFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'aluminum':
      return (
        <AluminumFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'glass_works':
      return (
        <GlassWorksFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'locksmith':
      return (
        <LocksmithFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    default:
      return (
        <div className="service-panel">
          <p>{t('filters.noFiltersAvailable')}</p>
        </div>
      );
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANTS FILTRES PAR SERVICE
// ═══════════════════════════════════════════════════════════════════════════

// BABYSITTING
const BabysittingFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.babysitting;
  
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.ageGroups)}
        options={config.ageGroups.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="ageGroups"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      
      <AgeRangeSection filters={filters} onFilterChange={handleFilterChange} />
      
      <AvailabilityDaysSection 
        filters={filters} 
        onExclusiveCheckbox={handleExclusiveCheckbox}
      />
      
      <AvailabilityHoursSection 
        filters={filters} 
        onExclusiveCheckbox={handleExclusiveCheckbox}
      />
      
      <CheckboxSection 
        title={t(config.sectionTitles.babysittingTypes)}
        options={config.types.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="babysitting_types"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      
      <SelectSection 
        title={t(config.sectionTitles.canTravelAlone)}
        options={FILTER_CONFIG.common.yesNoOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="can_travel_alone"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <CheckboxSection 
        title={t(config.sectionTitles.languages)}
        options={config.languages.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="languages"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      
      <SelectSection 
        title={t(config.sectionTitles.certifications)}
        options={config.certifications.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="certifications"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <SelectSection 
        title={t(config.sectionTitles.religiousLevel)}
        options={config.religiousLevels.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="religiousLevel"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

// CLEANING
const CleaningFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.cleaning;
  
  return (
    <div className="service-panel">
      <div className="filter-category-section">
        <h4 className="filter-category-title">{t(config.sectionTitles.homeCleaning)}</h4>
        <div className="checkbox-grid">
          {config.homeCleaning.map(o => (
            <label key={o.value} className="checkbox-option">
              <input
                type="checkbox"
                checked={filters.cleaningTypes?.includes(o.value) || false}
                onChange={(e) => handleCheckboxChange('cleaningTypes', o.value, e.target.checked)}
              />
              {t(o.key)}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-category-section">
        <h4 className="filter-category-title">{t(config.sectionTitles.officeCleaning)}</h4>
        <div className="checkbox-grid">
          {config.officeCleaning.map(o => (
            <label key={o.value} className="checkbox-option">
              <input
                type="checkbox"
                checked={filters.cleaningTypes?.includes(o.value) || false}
                onChange={(e) => handleCheckboxChange('cleaningTypes', o.value, e.target.checked)}
              />
              {t(o.key)}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-category-section">
        <h4 className="filter-category-title">{t(config.sectionTitles.specialCleaning)}</h4>
        <div className="checkbox-grid">
          {config.specialCleaning.map(o => (
            <label key={o.value} className="checkbox-option">
              <input
                type="checkbox"
                checked={filters.cleaningTypes?.includes(o.value) || false}
                onChange={(e) => handleCheckboxChange('cleaningTypes', o.value, e.target.checked)}
              />
              {t(o.key)}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-category-section">
        <h4 className="filter-category-title">{t(config.sectionTitles.additionalServices)}</h4>
        <div className="checkbox-grid">
          {config.additionalServices.map(o => (
            <label key={o.value} className="checkbox-option">
              <input
                type="checkbox"
                checked={filters.cleaningTypes?.includes(o.value) || false}
                onChange={(e) => handleCheckboxChange('cleaningTypes', o.value, e.target.checked)}
              />
              {t(o.key)}
            </label>
          ))}
        </div>
      </div>

      <CheckboxSection 
        title={t(config.sectionTitles.frequency)}
        options={config.frequency.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="frequency"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />

      <SelectSection 
        title={t(config.sectionTitles.materialsProvided)}
        options={config.materialsOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="materialsProvided"
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <AvailabilityDaysSection 
        filters={filters} 
        onExclusiveCheckbox={handleExclusiveCheckbox}
        includeSaturday={true}
      />
      
      <AvailabilityHoursSection 
        filters={filters} 
        onExclusiveCheckbox={handleExclusiveCheckbox}
      />
    </div>
  );
};

// Les autres composants suivent le même pattern...
// Je vais créer des placeholders pour l'instant

const GardeningFilters = ({ filters, handleFilterChange, handleCheckboxChange }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.gardening;
  
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.services)}
        options={config.services.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="services"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.seasons)}
        options={config.seasons.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="seasons"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.equipment)}
        options={config.equipment.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="equipment"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.specializations)}
        options={config.specializations.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="specializations"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.additionalServices)}
        options={config.additionalServices.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="additionalServices"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

const PetcareFilters = ({ filters, handleFilterChange, handleCheckboxChange }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.petcare;
  
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.animalTypes)}
        options={config.animalTypes.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="animalTypes"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.dogSizes)}
        options={config.dogSizes.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="dogSizes"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <SelectSection 
        title={t(config.sectionTitles.careLocation)}
        options={config.locationOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="location"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.additionalServices)}
        options={config.additionalServices.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="additionalServices"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.facilities)}
        options={config.facilities.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="facilities"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.veterinaryServices)}
        options={config.veterinaryServices.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="veterinaryServices"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

const EldercareFilters = ({ filters, handleFilterChange, handleCheckboxChange }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.eldercare;
  
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.careTypes)}
        options={config.careTypes.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="careTypes"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.availability)}
        options={config.availability.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="availability"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.specificConditions)}
        options={config.specificConditions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="specificConditions"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <SelectSection 
        title={t(config.sectionTitles.administrativeHelp)}
        options={FILTER_CONFIG.common.yesNoOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="administrativeHelp"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <SelectSection 
        title={t(config.sectionTitles.medicalAccompaniment)}
        options={FILTER_CONFIG.common.yesNoOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="medicalAccompaniment"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <SelectSection 
        title={t(config.sectionTitles.vehicleForOutings)}
        options={FILTER_CONFIG.common.yesNoOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="vehicleForOutings"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

// TUTORING - avec chargement dynamique des sous-catégories
const TutoringFilters = ({ filters, handleFilterChange, handleCheckboxChange }) => {
const { t, currentLanguage } = useLanguage();
  const { apiCall } = useAuth();
  const config = FILTER_CONFIG.tutoring;
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const groupedSubcategories = useMemo(() => {
    if (!subcategories.length) return {};
    return {
      academic: { title: t('filters.tutoring.academicSubjects'), items: subcategories.filter(s => s.display_order >= 200 && s.display_order <= 223) },
      music: { title: t('filters.tutoring.music'), items: subcategories.filter(s => s.display_order >= 1 && s.display_order <= 7) },
      art: { title: t('filters.tutoring.art'), items: subcategories.filter(s => s.display_order >= 10 && s.display_order <= 16) },
      dance: { title: t('filters.tutoring.dance'), items: subcategories.filter(s => s.display_order >= 20 && s.display_order <= 24) },
      theater: { title: t('filters.tutoring.theater'), items: subcategories.filter(s => s.display_order >= 30 && s.display_order <= 33) },
      languages: { title: t('filters.tutoring.languages'), items: subcategories.filter(s => s.display_order >= 40 && s.display_order <= 46) },
      crafts: { title: t('filters.tutoring.crafts'), items: subcategories.filter(s => s.display_order >= 50 && s.display_order <= 54) },
      tech: { title: t('filters.tutoring.tech'), items: subcategories.filter(s => s.display_order >= 60 && s.display_order <= 64) },
      cooking: { title: t('filters.tutoring.cooking'), items: subcategories.filter(s => s.display_order >= 70 && s.display_order <= 73) },
      personal: { title: t('filters.tutoring.personal'), items: subcategories.filter(s => s.display_order >= 80 && s.display_order <= 84) },
      sports: { title: t('filters.tutoring.sports'), items: subcategories.filter(s => s.display_order >= 90 && s.display_order <= 109) }
    };
  }, [subcategories, t]);

  if (loading) {
    return (
      <div className="service-panel">
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
          <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>{t('filters.tutoring.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-panel">
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="service-panel">
      {Object.entries(groupedSubcategories).map(([key, group]) => (
        group.items.length > 0 && (
          <div key={key} className="filter-section" style={{ marginBottom: '1.5rem' }}>
            <h4>{group.title}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {group.items.map(subcat => (
                <label key={subcat.id} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.subjects?.includes(subcat.name_he) || false}
                    onChange={(e) => handleCheckboxChange('subjects', subcat.name_he, e.target.checked)}
                  />
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{subcat.icon}</span>
<span>{subcat[`name_${currentLanguage}`] || subcat.name_he}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        )
      ))}

      <CheckboxSection 
        title={t(config.sectionTitles.levels)}
        options={config.levels.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="levels"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />

      <SelectSection 
        title={t(config.sectionTitles.teachingMode)}
        options={config.teachingModes.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="teachingMode"
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <CheckboxSection 
        title={t(config.sectionTitles.specializations)}
        options={config.specializations.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="specializations"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

// Placeholders pour les autres services (même pattern)
const LaundryFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.laundry;
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.laundryTypes)}
        options={config.types.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="laundryTypes"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} includeSaturday={true} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <SelectSection 
        title={t(config.sectionTitles.pickupService)}
        options={FILTER_CONFIG.common.yesNoOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="pickupService"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

// Pour les services techniques (electrician, plumbing, etc.), le pattern est similaire
// avec les catégories hiérarchiques. Je vais créer un composant générique :

const TechnicalServiceFilters = ({ 
  filters, 
  handleFilterChange, 
  handleCheckboxChange, 
  handleExclusiveCheckbox,
  serviceConfig,
  filterMappings 
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="service-panel">
      {/* Work Types avec sous-catégories */}
      <div className="filter-section">
        <h4>{t(serviceConfig.sectionTitles.workTypes)}</h4>
   {serviceConfig.workTypes?.map(wt => (
          <div key={wt.value}>
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={filters.work_types?.includes(wt.value) || false}
                onChange={(e) => handleCheckboxChange('work_types', wt.value, e.target.checked)}
              />
              {t(wt.key)}
            </label>
            
            {/* Sous-catégories si le type principal est coché */}
            {filters.work_types?.includes(wt.value) && filterMappings[wt.value] && (
              <div className="filter-category-section" style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                <h4 className="filter-category-title">{t(filterMappings[wt.value].title)}</h4>
                <div className="checkbox-grid">
                  {filterMappings[wt.value].options.map(opt => (
                    <label key={opt.value} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={filters[filterMappings[wt.value].filterKey]?.includes(opt.value) || false}
                        onChange={(e) => handleCheckboxChange(filterMappings[wt.value].filterKey, opt.value, e.target.checked)}
                      />
                      {t(opt.key)}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AgeRangeSection filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};

// Implémentations spécifiques utilisant TechnicalServiceFilters
const ElectricianFilters = (props) => {
  const config = FILTER_CONFIG.electrician;
  const filterMappings = {
    'תיקונים': { title: config.sectionTitles.repairTypes, filterKey: 'repair_types', options: config.repairTypes },
    'התקנות': { title: config.sectionTitles.installationTypes, filterKey: 'installation_types', options: config.installationTypes },
    'עבודות חשמל גדולות': { title: config.sectionTitles.largeWorkTypes, filterKey: 'large_work_types', options: config.largeWorkTypes }
  };
  return <TechnicalServiceFilters {...props} serviceConfig={config} filterMappings={filterMappings} />;
};

const PlumbingFilters = (props) => {
  const config = FILTER_CONFIG.plumbing;
  const filterMappings = {
    'סתימות': { title: config.sectionTitles.blockageTypes, filterKey: 'blockage_types', options: config.blockageTypes },
    'תיקון צנרת': { title: config.sectionTitles.pipeRepairTypes, filterKey: 'pipe_repair_types', options: config.pipeRepairTypes },
    'עבודות גדולות': { title: config.sectionTitles.largeWorkTypes, filterKey: 'large_work_types', options: config.largeWorkTypes },
    'תיקון והתקנת אביזרי אינסטלציה': { title: config.sectionTitles.fixtureTypes, filterKey: 'fixture_types', options: config.fixtureTypes }
  };
  return <TechnicalServiceFilters {...props} serviceConfig={config} filterMappings={filterMappings} />;
};

const AirConditioningFilters = (props) => {
  const config = FILTER_CONFIG.air_conditioning;
  const filterMappings = {
    'התקנת מזגנים': { title: config.sectionTitles.installationTypes, filterKey: 'installation_types', options: config.installationTypes },
    'תיקון מזגנים': { title: config.sectionTitles.repairTypes, filterKey: 'repair_types', options: config.repairTypes },
    'פירוק והרכבת מזגנים': { title: config.sectionTitles.disassemblyTypes, filterKey: 'disassembly_types', options: config.disassemblyTypes }
  };
  return <TechnicalServiceFilters {...props} serviceConfig={config} filterMappings={filterMappings} />;
};

const GasTechnicianFilters = (props) => {
  const config = FILTER_CONFIG.gas_technician;
  const filterMappings = {
    'התקנת צנרת גז בבית': { title: config.sectionTitles.installationTypes, filterKey: 'installation_types', options: config.installationTypes },
    'תיקוני גז בבית': { title: config.sectionTitles.repairTypes, filterKey: 'repair_types', options: config.repairTypes }
  };
  return <TechnicalServiceFilters {...props} serviceConfig={config} filterMappings={filterMappings} />;
};

const DrywallFilters = (props) => {
  const config = FILTER_CONFIG.drywall;
  const filterMappings = {
    'עיצובים בגבס': { title: config.sectionTitles.designTypes, filterKey: 'design_types', options: config.designTypes },
    'עבודות גבס': { title: config.sectionTitles.constructionTypes, filterKey: 'construction_types', options: config.constructionTypes }
  };
  return <TechnicalServiceFilters {...props} serviceConfig={config} filterMappings={filterMappings} />;
};

// Autres services simplifiés
const CarpentryFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.carpentry;
  
  return (
    <div className="service-panel">
      {/* Work Types principaux */}
      <div className="filter-section">
        <h4>{t(config.sectionTitles.workTypes)}</h4>
        
        {/* בניית רהיטים */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('בניית רהיטים') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'בניית רהיטים', e.target.checked)}
            />
            {t('filters.carpentry.furnitureBuilding')}
          </label>
          
          {filters.work_types?.includes('בניית רהיטים') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.furnitureBuildingTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.furniture_building_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('furniture_building_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* תיקון רהיטים */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('תיקון רהיטים') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'תיקון רהיטים', e.target.checked)}
            />
            {t('filters.carpentry.furnitureRepair')}
          </label>
          
          {filters.work_types?.includes('תיקון רהיטים') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.furnitureRepairTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.furniture_repair_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('furniture_repair_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* עבודות נגרות אחרות */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('עבודות נגרות אחרות') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'עבודות נגרות אחרות', e.target.checked)}
            />
            {t('filters.carpentry.otherWork')}
          </label>
          
          {filters.work_types?.includes('עבודות נגרות אחרות') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.otherCarpentryTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.other_carpentry_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('other_carpentry_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* נגרות חוץ */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('נגרות חוץ') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'נגרות חוץ', e.target.checked)}
            />
            {t('filters.carpentry.outdoorCarpentry')}
          </label>
          
          {filters.work_types?.includes('נגרות חוץ') && (
            <div style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {/* פרגולות */}
              <div style={{ marginBottom: '10px' }}>
                <label className="checkbox-option" style={{ fontWeight: '500' }}>
                  <input
                    type="checkbox"
                    checked={filters.outdoor_carpentry_types?.includes('פרגולות') || false}
                    onChange={(e) => handleCheckboxChange('outdoor_carpentry_types', 'פרגולות', e.target.checked)}
                  />
                  {t('filters.carpentry.pergolas')}
                </label>
                {filters.outdoor_carpentry_types?.includes('פרגולות') && (
                  <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
                    {config.pergolaTypes.map(opt => (
                      <label key={opt.value} className="checkbox-option">
                        <input
                          type="checkbox"
                          checked={filters.pergola_types?.includes(opt.value) || false}
                          onChange={(e) => handleCheckboxChange('pergola_types', opt.value, e.target.checked)}
                        />
                        {t(opt.key)}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* דקים */}
              <div style={{ marginBottom: '10px' }}>
                <label className="checkbox-option" style={{ fontWeight: '500' }}>
                  <input
                    type="checkbox"
                    checked={filters.outdoor_carpentry_types?.includes('דקים') || false}
                    onChange={(e) => handleCheckboxChange('outdoor_carpentry_types', 'דקים', e.target.checked)}
                  />
                  {t('filters.carpentry.decks')}
                </label>
                {filters.outdoor_carpentry_types?.includes('דקים') && (
                  <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
                    {config.deckTypes.map(opt => (
                      <label key={opt.value} className="checkbox-option">
                        <input
                          type="checkbox"
                          checked={filters.deck_types?.includes(opt.value) || false}
                          onChange={(e) => handleCheckboxChange('deck_types', opt.value, e.target.checked)}
                        />
                        {t(opt.key)}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* גדרות */}
              <div style={{ marginBottom: '10px' }}>
                <label className="checkbox-option" style={{ fontWeight: '500' }}>
                  <input
                    type="checkbox"
                    checked={filters.outdoor_carpentry_types?.includes('גדרות ומחיצות עץ') || false}
                    onChange={(e) => handleCheckboxChange('outdoor_carpentry_types', 'גדרות ומחיצות עץ', e.target.checked)}
                  />
                  {t('filters.carpentry.fences')}
                </label>
                {filters.outdoor_carpentry_types?.includes('גדרות ומחיצות עץ') && (
                  <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
                    {config.fenceTypes.map(opt => (
                      <label key={opt.value} className="checkbox-option">
                        <input
                          type="checkbox"
                          checked={filters.fence_types?.includes(opt.value) || false}
                          onChange={(e) => handleCheckboxChange('fence_types', opt.value, e.target.checked)}
                        />
                        {t(opt.key)}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AgeRangeSection filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};
const PropertyManagementFilters = ({ filters, handleFilterChange, handleCheckboxChange }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.property_management;
  
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.fullYearRental)}
        options={config.fullYearRental.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="fullYearRental"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      
      <CheckboxSection 
        title={t(config.sectionTitles.shortTermRental)}
        options={config.shortTermRental.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="shortTermRental"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};
// HOME ORGANIZATION
const HomeOrganizationFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.home_organization;
  
  return (
    <div className="service-panel">
      <div className="filter-section">
        <h4>{t(config.sectionTitles.workTypes)}</h4>
        
        {/* סידור כללי */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('סידור כללי') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'סידור כללי', e.target.checked)}
            />
            {t('filters.organization.general')}
          </label>
          
          {filters.work_types?.includes('סידור כללי') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.generalOrganizationTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.general_organization_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('general_organization_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* סידור + מיון */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('סידור + מיון') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'סידור + מיון', e.target.checked)}
            />
            {t('filters.organization.sorting')}
          </label>
          
          {filters.work_types?.includes('סידור + מיון') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.sortingTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.sorting_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('sorting_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* ארגון מקצועי */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('ארגון מקצועי') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'ארגון מקצועי', e.target.checked)}
            />
            {t('filters.organization.professional')}
          </label>
          
          {filters.work_types?.includes('ארגון מקצועי') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.professionalOrganizationTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.professional_organization_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('professional_organization_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AgeRangeSection filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};

// PAINTING - pas de sous-catégories, juste une liste
const PaintingFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.painting;
  
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.workTypes)}
        options={config.workTypes.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="work_types"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />

      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AgeRangeSection filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};

// PRIVATE CHEF
const PrivateChefFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.private_chef;
  
  return (
    <div className="service-panel">
      <div className="filter-section">
        <h4>{t(config.sectionTitles.workTypes)}</h4>
        
        {/* סוג המטבח */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('סוג המטבח') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'סוג המטבח', e.target.checked)}
            />
            {t('filters.chef.cuisineType')}
          </label>
          
          {filters.work_types?.includes('סוג המטבח') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.cuisineTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.cuisine_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('cuisine_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* כשרות */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('כשרות') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'כשרות', e.target.checked)}
            />
            {t('filters.chef.kashrut')}
          </label>
          
          {filters.work_types?.includes('כשרות') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.kosherTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.kosher_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('kosher_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} includeSaturday={true} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
    </div>
  );
};
const EventEntertainmentFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.event_entertainment;
  
  return (
    <div className="service-panel">
      {/* Work Types principaux */}
      <div className="filter-section">
        <h4>{t(config.sectionTitles.workTypes)}</h4>
        
        {/* השכרת ציוד לאירועים */}
        <div>
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={filters.work_types?.includes('השכרת ציוד לאירועים') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'השכרת ציוד לאירועים', e.target.checked)}
            />
            {t('filters.events.equipmentRental')}
          </label>
          
          {filters.work_types?.includes('השכרת ציוד לאירועים') && (
            <div style={{ marginRight: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
              {/* מכונות מזון */}
              <div style={{ marginBottom: '1rem' }}>
                <label className="checkbox-option" style={{ fontWeight: '600' }}>
                  <input
                    type="checkbox"
                    checked={filters.equipment_rental_types?.includes('🍿 מכונות מזון') || false}
                    onChange={(e) => handleCheckboxChange('equipment_rental_types', '🍿 מכונות מזון', e.target.checked)}
                  />
                  {t('filters.events.foodMachines')}
                </label>
                {filters.equipment_rental_types?.includes('🍿 מכונות מזון') && (
                  <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
                    {config.foodMachineTypes.map(opt => (
                      <label key={opt.value} className="checkbox-option">
                        <input
                          type="checkbox"
                          checked={filters.food_machine_types?.includes(opt.value) || false}
                          onChange={(e) => handleCheckboxChange('food_machine_types', opt.value, e.target.checked)}
                        />
                        {t(opt.key)}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* מתנפחים ומשחקים */}
              <div style={{ marginBottom: '1rem' }}>
                <label className="checkbox-option" style={{ fontWeight: '600' }}>
                  <input
                    type="checkbox"
                    checked={filters.equipment_rental_types?.includes('🎪 השכרת מתנפחים ומשחקים') || false}
                    onChange={(e) => handleCheckboxChange('equipment_rental_types', '🎪 השכרת מתנפחים ומשחקים', e.target.checked)}
                  />
                  {t('filters.events.inflatables')}
                </label>
                {filters.equipment_rental_types?.includes('🎪 השכרת מתנפחים ומשחקים') && (
                  <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
                    {config.inflatableGameTypes.map(opt => (
                      <label key={opt.value} className="checkbox-option">
                        <input
                          type="checkbox"
                          checked={filters.inflatable_game_types?.includes(opt.value) || false}
                          onChange={(e) => handleCheckboxChange('inflatable_game_types', opt.value, e.target.checked)}
                        />
                        {t(opt.key)}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* מכונות אפקטים */}
              <div style={{ marginBottom: '1rem' }}>
                <label className="checkbox-option" style={{ fontWeight: '600' }}>
                  <input
                    type="checkbox"
                    checked={filters.equipment_rental_types?.includes('💨 מכונות אפקטים להשכרה') || false}
                    onChange={(e) => handleCheckboxChange('equipment_rental_types', '💨 מכונות אפקטים להשכרה', e.target.checked)}
                  />
                  {t('filters.events.effectMachines')}
                </label>
                {filters.equipment_rental_types?.includes('💨 מכונות אפקטים להשכרה') && (
                  <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
                    {config.effectMachineTypes.map(opt => (
                      <label key={opt.value} className="checkbox-option">
                        <input
                          type="checkbox"
                          checked={filters.effect_machine_types?.includes(opt.value) || false}
                          onChange={(e) => handleCheckboxChange('effect_machine_types', opt.value, e.target.checked)}
                        />
                        {t(opt.key)}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* סוגי ההפעלה */}
        <div>
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={filters.work_types?.includes('סוגי ההפעלה') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'סוגי ההפעלה', e.target.checked)}
            />
            {t('filters.events.entertainmentServices')}
          </label>
          
          {filters.work_types?.includes('סוגי ההפעלה') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
              {config.entertainmentTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.entertainment_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('entertainment_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>
        
        {/* אחר */}
        <div>
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={filters.work_types?.includes('אחר') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'אחר', e.target.checked)}
            />
            {t('filters.events.other')}
          </label>
          
          {filters.work_types?.includes('אחר') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
              {config.otherTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.other_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('other_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
    </div>
  );
};
// ALUMINUM
const AluminumFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.aluminum;
  
  return (
    <div className="service-panel">
      <div className="filter-section">
        <h4>{t(config.sectionTitles.workTypes)}</h4>
        
        {/* חלונות ודלתות */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('חלונות ודלתות') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'חלונות ודלתות', e.target.checked)}
            />
            {t('filters.aluminum.windowsDoors')}
          </label>
          
          {filters.work_types?.includes('חלונות ודלתות') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.windowsDoorsTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.windows_doors_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('windows_doors_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* פרגולות ואלומיניום חוץ */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('פרגולות ואלומיניום חוץ') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'פרגולות ואלומיניום חוץ', e.target.checked)}
            />
            {t('filters.aluminum.pergolas')}
          </label>
          
          {filters.work_types?.includes('פרגולות ואלומיניום חוץ') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.pergolasOutdoorTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.pergolas_outdoor_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('pergolas_outdoor_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* תיקונים ושירות */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('תיקונים ושירות') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'תיקונים ושירות', e.target.checked)}
            />
            {t('filters.aluminum.repairs')}
          </label>
          
          {filters.work_types?.includes('תיקונים ושירות') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.repairsServiceTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.repairs_service_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('repairs_service_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* חיפויי אלומיניום */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('חיפויי אלומיניום') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'חיפויי אלומיניום', e.target.checked)}
            />
            {t('filters.aluminum.cladding')}
          </label>
          
          {filters.work_types?.includes('חיפויי אלומיניום') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.claddingTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.cladding_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('cladding_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AgeRangeSection filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};

// CONTRACTOR
const ContractorFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.contractor;
  
  return (
    <div className="service-panel">
      <div className="filter-section">
        <h4>{t(config.sectionTitles.workTypes)}</h4>
        
        {/* עבודות שלד */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('עבודות שלד') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'עבודות שלד', e.target.checked)}
            />
            {t('filters.contractor.structureWork')}
          </label>
          
          {filters.work_types?.includes('עבודות שלד') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.structureWorkTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.structure_work_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('structure_work_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* שיפוצים כלליים */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('שיפוצים כלליים') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'שיפוצים כלליים', e.target.checked)}
            />
            {t('filters.contractor.generalRenovation')}
          </label>
          
          {filters.work_types?.includes('שיפוצים כלליים') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.generalRenovationTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.general_renovation_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('general_renovation_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* חשמל ואינסטלציה */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('חשמל ואינסטלציה') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'חשמל ואינסטלציה', e.target.checked)}
            />
            {t('filters.contractor.electricPlumbing')}
          </label>
          
          {filters.work_types?.includes('חשמל ואינסטלציה') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.electricPlumbingTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.electric_plumbing_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('electric_plumbing_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* עבודות חוץ */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('עבודות חוץ') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'עבודות חוץ', e.target.checked)}
            />
            {t('filters.contractor.exteriorWork')}
          </label>
          
          {filters.work_types?.includes('עבודות חוץ') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.exteriorWorkTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.exterior_work_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('exterior_work_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* שיקום ותיקון חוץ */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('שיקום ותיקון חוץ') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'שיקום ותיקון חוץ', e.target.checked)}
            />
            {t('filters.contractor.facadeRepair')}
          </label>
          
          {filters.work_types?.includes('שיקום ותיקון חוץ') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.facadeRepairTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.facade_repair_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('facade_repair_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AgeRangeSection filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};

// GLASS WORKS
const GlassWorksFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.glass_works;
  
  return (
    <div className="service-panel">
      <div className="filter-section">
        <h4>{t(config.sectionTitles.workTypes)}</h4>
        
        {/* זכוכית למקלחונים */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('זכוכית למקלחונים') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'זכוכית למקלחונים', e.target.checked)}
            />
            {t('filters.glass.showers')}
          </label>
          
          {filters.work_types?.includes('זכוכית למקלחונים') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.showerGlassTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.shower_glass_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('shower_glass_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* זכוכית לחלונות ודלתות */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('זכוכית לחלונות ודלתות') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'זכוכית לחלונות ודלתות', e.target.checked)}
            />
            {t('filters.glass.homeGlass')}
          </label>
          
          {filters.work_types?.includes('זכוכית לחלונות ודלתות') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.windowsDoorGlassTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.windows_doors_glass_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('windows_doors_glass_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* זכוכית למטבח ובית */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('זכוכית למטבח ובית') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'זכוכית למטבח ובית', e.target.checked)}
            />
            {t('filters.glass.furniture')}
          </label>
          
          {filters.work_types?.includes('זכוכית למטבח ובית') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.kitchenHomeGlassTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.kitchen_home_glass_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('kitchen_home_glass_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* זכוכית מיוחדת ובטיחות */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('זכוכית מיוחדת ובטיחות') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'זכוכית מיוחדת ובטיחות', e.target.checked)}
            />
            {t('filters.glass.partitions')}
          </label>
          
          {filters.work_types?.includes('זכוכית מיוחדת ובטיחות') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.specialSafetyGlassTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.special_safety_glass_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('special_safety_glass_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* שירותי תיקון והתאמה אישית */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('שירותי תיקון והתאמה אישית') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'שירותי תיקון והתאמה אישית', e.target.checked)}
            />
            {t('filters.glass.repairs')}
          </label>
          
          {filters.work_types?.includes('שירותי תיקון והתאמה אישית') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.repairCustomTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.repair_custom_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('repair_custom_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AgeRangeSection filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};

// LOCKSMITH
const LocksmithFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.locksmith;
  
  return (
    <div className="service-panel">
      <div className="filter-section">
        <h4>{t(config.sectionTitles.workTypes)}</h4>
        
        {/* החלפת מנעולים */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('החלפת מנעולים') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'החלפת מנעולים', e.target.checked)}
            />
            {t('filters.locksmith.lockReplacement')}
          </label>
          
          {filters.work_types?.includes('החלפת מנעולים') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.lockReplacementTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.lock_replacement_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('lock_replacement_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* פתיחת דלתות */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('פתיחת דלתות') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'פתיחת דלתות', e.target.checked)}
            />
            {t('filters.locksmith.emergencyOpening')}
          </label>
          
          {filters.work_types?.includes('פתיחת דלתות') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.doorOpeningTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.door_opening_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('door_opening_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* התקנת מערכות נעילה */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('התקנת מערכות נעילה') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'התקנת מערכות נעילה', e.target.checked)}
            />
            {t('filters.locksmith.advancedSystems')}
          </label>
          
          {filters.work_types?.includes('התקנת מערכות נעילה') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.lockSystemInstallationTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.lock_system_installation_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('lock_system_installation_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* תיקון מנעולים ודלתות */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('תיקון מנעולים ודלתות') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'תיקון מנעולים ודלתות', e.target.checked)}
            />
            {t('filters.locksmith.doorRepair')}
          </label>
          
          {filters.work_types?.includes('תיקון מנעולים ודלתות') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.lockDoorRepairTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.lock_door_repair_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('lock_door_repair_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* שירותי ביטחון */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('שירותי ביטחון') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'שירותי ביטחון', e.target.checked)}
            />
            {t('serviceForm.locksmith.securityServices')}
          </label>
          
          {filters.work_types?.includes('שירותי ביטחון') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.securityServicesTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.security_services_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('security_services_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AgeRangeSection filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};

// WATERPROOFING
const WaterproofingFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.waterproofing;
  
  return (
    <div className="service-panel">
      <div className="filter-section">
        <h4>{t(config.sectionTitles.workTypes)}</h4>
        
        {/* איטום גגות */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('roofWaterproofing') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'roofWaterproofing', e.target.checked)}
            />
            {t('filters.waterproofing.roofs')}
          </label>
          
          {filters.work_types?.includes('roofWaterproofing') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.roofWaterproofingTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.roof_waterproofing_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('roof_waterproofing_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* איטום קירות חיצוניים */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('wallWaterproofing') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'wallWaterproofing', e.target.checked)}
            />
            {t('filters.waterproofing.externalWalls')}
          </label>
          
          {filters.work_types?.includes('wallWaterproofing') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.wallWaterproofingTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.wall_waterproofing_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('wall_waterproofing_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* איטום מרפסות */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('balconyWaterproofing') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'balconyWaterproofing', e.target.checked)}
            />
            {t('filters.waterproofing.balconies')}
          </label>
          
          {filters.work_types?.includes('balconyWaterproofing') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.balconyWaterproofingTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.balcony_waterproofing_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('balcony_waterproofing_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* איטום חדרים רטובים */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('wetRoomWaterproofing') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'wetRoomWaterproofing', e.target.checked)}
            />
            {t('filters.waterproofing.wetRooms')}
          </label>
          
          {filters.work_types?.includes('wetRoomWaterproofing') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.wetRoomWaterproofingTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.wet_room_waterproofing_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('wet_room_waterproofing_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* איטום תת-קרקעי */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('undergroundWaterproofing') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'undergroundWaterproofing', e.target.checked)}
            />
            {t('filters.waterproofing.underground')}
          </label>
          
          {filters.work_types?.includes('undergroundWaterproofing') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.undergroundWaterproofingTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.underground_waterproofing_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('underground_waterproofing_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* בדיקות, אבחון וציוד */}
        <div style={{ marginBottom: '15px' }}>
          <label className="checkbox-option" style={{ fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={filters.work_types?.includes('inspectionEquipment') || false}
              onChange={(e) => handleCheckboxChange('work_types', 'inspectionEquipment', e.target.checked)}
            />
            {t('filters.waterproofing.inspection')}
          </label>
          
          {filters.work_types?.includes('inspectionEquipment') && (
            <div className="checkbox-grid" style={{ marginRight: '1.5rem', marginTop: '0.5rem' }}>
              {config.inspectionEquipmentTypes.map(opt => (
                <label key={opt.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.inspection_equipment_types?.includes(opt.value) || false}
                    onChange={(e) => handleCheckboxChange('inspection_equipment_types', opt.value, e.target.checked)}
                  />
                  {t(opt.key)}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AgeRangeSection filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};

export default FilterBar;