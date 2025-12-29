import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import serviceFieldsConfig from './../config/serviceFieldsConfig';

const ServiceDetailsEditor = ({ 
  serviceType, 
  serviceDetails, 
  isEditMode, 
  onFieldChange, 
  onArrayChange 
}) => {
  const { t, currentLanguage } = useLanguage();
  const { apiCall } = useAuth();
  const config = serviceFieldsConfig[serviceType];
  
  // État pour les matières tutoring chargées dynamiquement
  const [tutoringSubcategories, setTutoringSubcategories] = useState([]);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);

  // Charger les matières tutoring depuis la DB
  useEffect(() => {
    if (serviceType === 'tutoring') {
      const loadSubcategories = async () => {
        try {
          setLoadingSubcategories(true);
          const response = await apiCall('/services/5/subcategories', 'GET');
          if (response.success && response.data.subcategories) {
            setTutoringSubcategories(response.data.subcategories);
          }
        } catch (err) {
          console.error('Erreur chargement sous-catégories tutoring:', err);
        } finally {
          setLoadingSubcategories(false);
        }
      };
      loadSubcategories();
    }
  }, [serviceType, apiCall]);

  // Groupement des matières tutoring par catégorie
  const groupedTutoringSubjects = useMemo(() => {
    if (!tutoringSubcategories.length) return {};
    return {
      academic: { title: t('filters.tutoring.academicSubjects'), items: tutoringSubcategories.filter(s => s.display_order >= 200 && s.display_order <= 223) },
      music: { title: t('filters.tutoring.music'), items: tutoringSubcategories.filter(s => s.display_order >= 1 && s.display_order <= 7) },
      art: { title: t('filters.tutoring.art'), items: tutoringSubcategories.filter(s => s.display_order >= 10 && s.display_order <= 16) },
      dance: { title: t('filters.tutoring.dance'), items: tutoringSubcategories.filter(s => s.display_order >= 20 && s.display_order <= 24) },
      theater: { title: t('filters.tutoring.theater'), items: tutoringSubcategories.filter(s => s.display_order >= 30 && s.display_order <= 33) },
      languages: { title: t('filters.tutoring.languages'), items: tutoringSubcategories.filter(s => s.display_order >= 40 && s.display_order <= 46) },
      crafts: { title: t('filters.tutoring.crafts'), items: tutoringSubcategories.filter(s => s.display_order >= 50 && s.display_order <= 54) },
      tech: { title: t('filters.tutoring.tech'), items: tutoringSubcategories.filter(s => s.display_order >= 60 && s.display_order <= 64) },
      cooking: { title: t('filters.tutoring.cooking'), items: tutoringSubcategories.filter(s => s.display_order >= 70 && s.display_order <= 73) },
      personal: { title: t('filters.tutoring.personal'), items: tutoringSubcategories.filter(s => s.display_order >= 80 && s.display_order <= 84) },
      sports: { title: t('filters.tutoring.sports'), items: tutoringSubcategories.filter(s => s.display_order >= 90 && s.display_order <= 109) }
    };
  }, [tutoringSubcategories, t]);
  
  if (!config) {
    return <p>{t('dashboard.noServiceConfig')}</p>;
  }

  // Rendu spécial pour les matières tutoring
  const renderTutoringSubjects = (field) => {
    const value = serviceDetails?.[field.name] || [];

    // MODE LECTURE
    if (!isEditMode) {
      return (
        <div className="tags-list">
          {Array.isArray(value) && value.length > 0 
            ? value.join(', ')
            : <span>{t('dashboard.notSpecified')}</span>
          }
        </div>
      );
    }

    // MODE ÉDITION - Affichage groupé comme dans le formulaire d'inscription
    if (loadingSubcategories) {
      return <div style={{ padding: '1rem', color: '#64748b' }}>{t('filters.tutoring.loading')}</div>;
    }

    return (
      <div className="subjects-container">
        {Object.entries(groupedTutoringSubjects).map(([key, group]) => (
          group.items.length > 0 && (
            <div key={key} className="subject-category" style={{ marginBottom: '1rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: '#374151', fontWeight: '600', fontSize: '0.9rem' }}>
                {group.title}
              </h5>
              <div className="checkbox-grid">
                {group.items.map(subcat => (
                  <label key={subcat.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={value.includes(subcat.name_he)}
                      onChange={(e) => onArrayChange(field.name, subcat.name_he, e.target.checked)}
                    />
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span>{subcat.icon}</span>
                      <span>{subcat[`name_${currentLanguage}`] || subcat.name_he}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    );
  };

  const renderField = (field) => {
    // Cas spécial : matières tutoring
    if (serviceType === 'tutoring' && field.name === 'subjects') {
      return renderTutoringSubjects(field);
    }

    const value = serviceDetails?.[field.name];

    // MODE LECTURE
    if (!isEditMode) {
      if (field.type === 'json-array' || field.type === 'checkbox') {
        return (
          <div className="tags-list">
            {Array.isArray(value) && value.length > 0 
              ? value.join(', ')
              : <span>{t('dashboard.notSpecified')}</span>
            }
          </div>
        );
      }
      
      if (field.type === 'number') {
        return <span>{value || 0}</span>;
      }

      if (field.type === 'boolean-select') {
        return <span>{value ? t('common.yes') : t('common.no')}</span>;
      }

      if (field.type === 'select') {
        const selectedOption = field.options?.find(opt => 
          typeof opt === 'string' ? opt === value : opt.value === value
        );
        const displayValue = typeof selectedOption === 'string' ? selectedOption : selectedOption?.label;
        return <span>{displayValue || value || t('dashboard.notSpecified')}</span>;
      }

      if (field.type === 'text') {
        return <span>{value || t('dashboard.notSpecified')}</span>;
      }
      
      return <span>{value || t('dashboard.notSpecified')}</span>;
    }

    // MODE ÉDITION
    if (field.type === 'number') {
      return (
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onFieldChange(field.name, e.target.value)}
          className="form-input inline-edit"
          min="0"
        />
      );
    }

    if (field.type === 'text') {
      return (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onFieldChange(field.name, e.target.value)}
          className="form-input inline-edit"
        />
      );
    }

    if (field.type === 'boolean-select') {
      return (
        <select
          value={value === true ? 'yes' : value === false ? 'no' : ''}
          onChange={(e) => onFieldChange(field.name, e.target.value === 'yes')}
          className="form-input inline-edit"
        >
          <option value="">{t('common.select')}</option>
          <option value="yes">{t('common.yes')}</option>
          <option value="no">{t('common.no')}</option>
        </select>
      );
    }

    if (field.type === 'select') {
      return (
        <select
          value={value || ''}
          onChange={(e) => onFieldChange(field.name, e.target.value)}
          className="form-input inline-edit"
        >
          <option value="">{t('common.select')}</option>
          {field.options.map((opt, i) => {
            const optValue = typeof opt === 'string' ? opt : opt.value;
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            return <option key={i} value={optValue}>{optLabel}</option>;
          })}
        </select>
      );
    }

    if (field.type === 'json-array' || field.type === 'checkbox') {
      // ✅ Définir les options "tout sélectionner" pour chaque champ
      const selectAllOptions = {
        'availability_days': 'כל השבוע',
        'availability_hours': 'הכל',
        'availableDays': 'כל השבוע',
        'availableHours': 'הכל'
      };
      
      const selectAllOption = selectAllOptions[field.name];
      const hasSelectAll = selectAllOption && field.options.includes(selectAllOption);
      
      const handleCheckboxChange = (option, checked) => {
        if (!hasSelectAll) {
          // Pas de logique spéciale
          onArrayChange(field.name, option, checked);
          return;
        }
        
        const currentValues = value || [];
        
        if (option === selectAllOption) {
          // Si on coche "כל השבוע" ou "הכל" → décocher tous les autres
          if (checked) {
            // Décocher tous les autres d'abord
            currentValues.forEach(v => {
              if (v !== selectAllOption) {
                onArrayChange(field.name, v, false);
              }
            });
            // Puis cocher l'option "tout"
            setTimeout(() => onArrayChange(field.name, option, true), 0);
          } else {
            onArrayChange(field.name, option, false);
          }
        } else {
          // Si on coche un jour/heure spécifique → décocher "כל השבוע" ou "הכל"
          if (checked && currentValues.includes(selectAllOption)) {
            onArrayChange(field.name, selectAllOption, false);
            setTimeout(() => onArrayChange(field.name, option, true), 0);
          } else {
            onArrayChange(field.name, option, checked);
          }
        }
      };
      
      return (
        <div className="checkbox-grid">
          {field.options.map(option => (
            <label key={option} className="checkbox-item">
              <input
                type="checkbox"
                checked={(value || []).includes(option)}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              />
              {option}
            </label>
          ))}
        </div>
      );
    }

    return (
      <div style={{color: 'red', padding: '10px', background: '#fee'}}>
        <strong>⚠️ {t('dashboard.unsupportedFieldType')}:</strong> {field.type}
        <br />
        <small>{t('dashboard.field')}: {field.name}, {t('dashboard.value')}: {JSON.stringify(value)}</small>
      </div>
    );
  };

  return (
    <div className="info-section">
      <h3 className="section-title">{t('dashboard.serviceDetails')}</h3>
      <div className="service-specific-grid">
        {config.fields.map(field => (
          <div 
            key={field.name} 
            className={`professional-item ${field.type === 'json-array' || field.type === 'checkbox' || (serviceType === 'tutoring' && field.name === 'subjects') ? 'full-width' : ''}`}
          >
            <label>{t(field.label)}:</label>
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailsEditor;