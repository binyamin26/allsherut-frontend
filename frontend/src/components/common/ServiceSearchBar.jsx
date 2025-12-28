import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import searchableServices from '../../data/searchableServices';
import { useLanguage } from '../../context/LanguageContext';

const ServiceSearchBar = ({ style }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage(); // CORRIGÉ: currentLanguage au lieu de language

  // Fermer dropdown quand clic dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fonction pour obtenir le label selon la langue
  const getLabelByLanguage = (item) => {
    if (currentLanguage === 'en' && item.labelEn) return item.labelEn;
    if (currentLanguage === 'fr' && item.labelFr) return item.labelFr;
    if (currentLanguage === 'ru' && item.labelRu) return item.labelRu;
    return item.label; // Hébreu par défaut
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);

    if (value.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowerValue = value.toLowerCase();
    
    const matches = searchableServices.filter((item) => {
      // 1. Toujours chercher en hébreu
      const hebrewMatch = item.label.split(' ').some(word => word.startsWith(value));
      if (hebrewMatch) return true;

      // 2. Chercher en anglais
      if (item.labelEn) {
        const enMatch = item.labelEn.toLowerCase().split(' ').some(word => word.startsWith(lowerValue));
        if (enMatch) return true;
      }

      // 3. Chercher en français
      if (item.labelFr) {
        const frMatch = item.labelFr.toLowerCase().split(' ').some(word => word.startsWith(lowerValue));
        if (frMatch) return true;
      }

      // 4. Chercher en russe
      if (item.labelRu) {
        const ruMatch = item.labelRu.toLowerCase().split(' ').some(word => word.startsWith(lowerValue));
        if (ruMatch) return true;
      }

      return false;
    });

    setResults(matches.slice(0, 10));
    setIsOpen(true);
  };

  const handleSelect = (item) => {
    setQuery('');
    setIsOpen(false);
    navigate(item.href);
  };

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Afficher le label selon la langue active
  const getDisplayName = (item) => {
    return getLabelByLanguage(item);
  };

  return (
    <div className="service-search-wrapper" ref={wrapperRef} style={style}>
      <div className="service-search-input-container">
        <Search className="service-search-icon" size={20} />
        <input
          type="text"
          className="service-search-input"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
        />
      </div>

      {isOpen && results.length > 0 && (
        <ul className="service-search-dropdown">
          {results.map((item, index) => (
            <li
              key={`${item.label}-${index}`}
              className={`service-search-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleSelect(item)}
            >
              <span className="service-search-label">{getDisplayName(item)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceSearchBar;