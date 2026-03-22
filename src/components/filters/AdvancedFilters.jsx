import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Filter, ChevronDown, X, Search, CheckCircle } from 'lucide-react';
import { getServiceFilters, validateServiceFilters } from '../../pages/services/serviceFiltersConfig';
import { useLanguage } from '../../context/LanguageContext';

const AdvancedFilters = ({ 
  serviceType, 
  onFiltersChange, 
  initialFilters = {},
  className = '' 
}) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [filterConfig, setFilterConfig] = useState({ required: {}, optional: {} });

  // Chargement configuration filtres par service
  const memoizedFilterConfig = useMemo(() => {
    if (!serviceType) return { required: {}, optional: {} };
    
    try {
      const config = getServiceFilters(serviceType);
      console.log(`[AdvancedFilters] Configuration chargée pour ${serviceType}:`, {
        required: Object.keys(config.required).length,
        optional: Object.keys(config.optional).length
      });
      return config;
    } catch (error) {
      console.error(`[AdvancedFilters] Erreur chargement config ${serviceType}:`, error);
      return { required: {}, optional: {} };
    }
  }, [serviceType]);

  useEffect(() => {
    setFilterConfig(memoizedFilterConfig);
  }, [memoizedFilterConfig]);

  // Synchronisation avec initialFilters
  useEffect(() => {
    const hasChanged = JSON.stringify(activeFilters) !== JSON.stringify(initialFilters);
    if (hasChanged) {
      console.log('[AdvancedFilters] Synchronisation avec initialFilters:', initialFilters);
      setActiveFilters(initialFilters);
    }
  }, [initialFilters]);

  // Gestion des changements de filtres
  const handleFilterChange = useCallback((filterKey, value, isMultiple = false) => {
    setActiveFilters(prevFilters => {
      let newFilters;
      
      if (isMultiple) {
        const currentValues = prevFilters[filterKey] || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        
        if (newValues.length === 0) {
          const { [filterKey]: removed, ...rest } = prevFilters;
          newFilters = rest;
        } else {
          newFilters = { ...prevFilters, [filterKey]: newValues };
        }
      } else {
        if (!value || value === '') {
          const { [filterKey]: removed, ...rest } = prevFilters;
          newFilters = rest;
        } else {
          newFilters = { ...prevFilters, [filterKey]: value };
        }
      }

      const isValid = !serviceType || validateServiceFilters(serviceType, newFilters);
      if (isValid) {
        setTimeout(() => {
          console.log('[AdvancedFilters] Filtres mis à jour:', newFilters);
          onFiltersChange?.(newFilters);
        }, 100);
        return newFilters;
      } else {
        console.warn('[AdvancedFilters] Filtres invalides ignorés:', newFilters);
        return prevFilters;
      }
    });
  }, [serviceType, onFiltersChange]);

  // Reset des filtres
  const resetFilters = useCallback(() => {
    console.log('[AdvancedFilters] Reset des filtres');
    setActiveFilters({});
    onFiltersChange?.({});
  }, [onFiltersChange]);

  // Comptage des filtres actifs
  const activeFiltersCount = useMemo(() => {
    return Object.values(activeFilters).filter(value => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'string') return value.trim() !== '';
      if (typeof value === 'boolean') return value;
      if (typeof value === 'object' && value !== null) {
        return (value.min !== undefined && value.min !== '') || 
               (value.max !== undefined && value.max !== '');
      }
      return value != null && value !== '';
    }).length;
  }, [activeFilters]);

  // Fermeture du modal mobile
  const handleMobileClose = useCallback(() => {
    setIsExpanded(false);
  }, []);

  // Rendu des différents types de filtres
  const renderFilter = useCallback((filterKey, filterConfig, isRequired = false) => {
  const { label, type, options, min, max, unit, placeholder } = filterConfig;
  const currentValue = activeFilters[filterKey];

  switch (type) {
    // ✨ NOUVEAU CAS - Pour gérer les catégories du service cleaning
    case 'checkbox-categorized':
      return (
        <div key={filterKey} className="filter-group">
          <label className="filter-group-title">
            {label}
            {isRequired && <span className="text-danger">*</span>}
          </label>
          
          {/* Itération sur les catégories */}
          {Object.entries(filterConfig.categories).map(([categoryName, categoryOptions]) => (
            <div key={categoryName} className="filter-category-section">
              <h5 className="filter-category-title">{categoryName}</h5>
              <div className="checkbox-grid">
                {categoryOptions.map(option => (
                  <div key={option} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`${filterKey}-${option}`}
                      checked={currentValue?.includes?.(option) || false}
                      onChange={() => handleFilterChange(filterKey, option, true)}
                      className="checkbox-input"
                    />
                    <label htmlFor={`${filterKey}-${option}`} className="checkbox-label">
                      <div className="checkbox-custom">
                        <CheckCircle size={14} />
                      </div>
                      <span>{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
      
      case 'select':
        return (
          <div key={filterKey} className="filter-group">
            <label className="filter-group-title">
              {label}
              {isRequired && <span className="text-danger">*</span>}
            </label>
            <div className="select-with-icon">
              <select
                value={currentValue || ''}
                onChange={(e) => handleFilterChange(filterKey, e.target.value)}
              >
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'range':
        return (
          <div key={filterKey} className="filter-group">
            <label className="filter-group-title">
              {label}
              {isRequired && <span className="text-danger">*</span>}
            </label>
            <div className="dual-range-inputs">
              <input
                type="number"
                placeholder={`${t('filters.minimum')} ${unit || ''}`}
                value={currentValue?.min || ''}
                onChange={(e) => handleFilterChange(filterKey, { 
                  ...currentValue, 
                  min: e.target.value 
                })}
                className="dual-range-input"
                min={min}
                max={max}
              />
              <span className="range-separator">-</span>
              <input
                type="number"
                placeholder={`${t('filters.maximum')} ${unit || ''}`}
                value={currentValue?.max || ''}
                onChange={(e) => handleFilterChange(filterKey, { 
                  ...currentValue, 
                  max: e.target.value 
                })}
                className="dual-range-input"
                min={min}
                max={max}
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div key={filterKey} className="filter-group">
            <label className="filter-group-title">
              {label}
              {isRequired && <span className="text-danger">*</span>}
            </label>
            <div className="text-filter">
              <input
                type="text"
                placeholder={placeholder}
                value={currentValue || ''}
                onChange={(e) => handleFilterChange(filterKey, e.target.value)}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [activeFilters, handleFilterChange]);

  // Déclenchement de la recherche
  const handleSearch = useCallback(() => {
    console.log('[AdvancedFilters] Recherche déclenchée avec filtres:', activeFilters);
    setIsExpanded(false);
    onFiltersChange?.(activeFilters);
  }, [activeFilters, onFiltersChange]);

  return (
    <div className={`advanced-filters ${className}`}>
      {/* Overlay mobile */}
      {isExpanded && (
        <div 
          className="filters-overlay" 
          onClick={handleMobileClose}
          style={{ display: 'none' }}
        />
      )}

      {/* Toggle Button */}
      <div className="filters-toggle">
        <div 
          className={`filters-toggle-content ${isExpanded ? 'active' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Filter size={18} className="filters-toggle-icon" />
          <span className="filters-toggle-text">{t('filters.advancedFilters')}</span>
          {activeFiltersCount > 0 && (
            <span className="filters-count-badge">{activeFiltersCount}</span>
          )}
          <ChevronDown 
            size={16} 
            className={`filters-chevron ${isExpanded ? 'active' : ''}`} 
          />
        </div>

        {activeFiltersCount > 0 && (
          <button 
            onClick={resetFilters}
            className="filters-reset-btn"
          >
            <X size={16} />
            <span>{t('filters.clearAll')}</span>
          </button>
        )}
      </div>

      {/* Panel de filtres */}
      <div className={`filters-content ${isExpanded ? 'expanded' : ''}`}>
        <div className="filters-inner">
          {/* Header mobile */}
          <div className="filters-mobile-header" style={{ display: 'none' }}>
            <h3 className="mobile-filters-title">{t('filters.advancedFilters')}</h3>
            <button 
              onClick={handleMobileClose} 
              className="mobile-filters-close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Filtres requis du service */}
          {(filterConfig.required && Object.keys(filterConfig.required).length > 0) && (
            <div className="filters-section">
              <h4 className="filters-section-title">{t('filters.requiredFeatures')}</h4>
              <div className="filters-grid">
                {Object.entries(filterConfig.required).map(([filterKey, config]) =>
                  renderFilter(filterKey, config, true)
                )}
              </div>
            </div>
          )}

          {/* Filtres optionnels du service */}
          {(filterConfig.optional && Object.keys(filterConfig.optional).length > 0) && (
            <div className="filters-section">
              <h4 className="filters-section-title">{t('filters.optionalFeatures')}</h4>
              <div className="filters-grid">
                {Object.entries(filterConfig.optional).map(([filterKey, config]) =>
                  renderFilter(filterKey, config, false)
                )}
              </div>
            </div>
          )}

          {/* Message si pas de filtres */}
          {(!filterConfig.required || Object.keys(filterConfig.required).length === 0) && 
           (!filterConfig.optional || Object.keys(filterConfig.optional).length === 0) && (
            <div className="filters-section">
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem', 
                color: '#64748b',
                direction: 'rtl'
              }}>
                <Filter size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>
                  {t('filters.noFilters')}
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  {t('filters.noFiltersSoon')}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="filter-actions">
            <div className="filter-actions-left">
              {activeFiltersCount > 0 && (
                <span className="filter-count">
                  {t('filters.activeFilters', { count: activeFiltersCount })}
                </span>
              )}
            </div>
            
            <div className="filter-actions-right">
              <button 
                onClick={resetFilters}
                className="filter-btn filter-btn-reset"
                disabled={activeFiltersCount === 0}
              >
                <X size={16} />
                {t('filters.resetFilters')}
              </button>
              
              <button 
                onClick={handleSearch}
                className="filter-btn filter-btn-apply"
              >
                <Search size={16} />
                {activeFiltersCount > 0
                  ? t('filters.searchWithFilters', { count: activeFiltersCount })
                  : t('filters.search')
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;