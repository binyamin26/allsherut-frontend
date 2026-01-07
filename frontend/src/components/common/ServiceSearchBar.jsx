import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import searchableServices from '../../data/searchableServices';
import { FILTER_CONFIG } from './../config/filterConfig';
import { useLanguage } from '../../context/LanguageContext';

const SERVICE_URLS = {
  babysitting: '/services/babysitting',
  cleaning: '/services/cleaning',
  gardening: '/services/gardening',
  petcare: '/services/petcare',
  eldercare: '/services/eldercare',
  tutoring: '/services/tutoring',
  laundry: '/services/laundry',
  electrician: '/services/electrician',
  plumbing: '/services/plumbing',
  air_conditioning: '/services/air-conditioning',
  gas_technician: '/services/gas-technician',
  drywall: '/services/drywall',
  carpentry: '/services/carpentry',
  property_management: '/services/property-management',
  home_organization: '/services/home-organization',
  painting: '/services/painting',
  private_chef: '/services/private-chef',
  event_entertainment: '/services/event-entertainment',
  waterproofing: '/services/waterproofing',
  contractor: '/services/contractor',
  aluminum: '/services/aluminum',
  glass_works: '/services/glass-works',
  locksmith: '/services/locksmith'
};

const detectLanguage = (text) => {
  if (/[\u0590-\u05FF]/.test(text)) return 'he';
  if (/[\u0400-\u04FF]/.test(text)) return 'ru';
  return 'latin';
};

const ServiceSearchBar = ({ style }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();

  const filterConfigItems = useMemo(() => {
    const items = [];
    Object.entries(FILTER_CONFIG).forEach(([serviceType, serviceConfig]) => {
      if (serviceType === 'common') return;
      const href = SERVICE_URLS[serviceType];
      if (!href) return;
      Object.entries(serviceConfig).forEach(([key, values]) => {
        if (key === 'sectionTitles' || !Array.isArray(values)) return;
        values.forEach(item => {
          if (item.value && item.value !== '' && item.value !== 'yes' && item.value !== 'no') {
            items.push({
              label: item.value,
              href: href,
              type: 'filter'
            });
          }
        });
      });
    });
    return items;
  }, []);

  const allSearchableItems = useMemo(() => {
    return [...searchableServices, ...filterConfigItems];
  }, [filterConfigItems]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDisplayLabel = (item, detectedLang) => {
    if (detectedLang === 'he') return item.label;
    if (detectedLang === 'ru' && item.labelRu) return item.labelRu;
    if (detectedLang === 'latin') {
      if (currentLanguage === 'fr' && item.labelFr) return item.labelFr;
      if (currentLanguage === 'en' && item.labelEn) return item.labelEn;
      if (item.labelEn) return item.labelEn;
      if (item.labelFr) return item.labelFr;
    }
    return item.label;
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

  const detectedLang = detectLanguage(value);
  const lowerValue = value.toLowerCase();

  const matches = [];

  allSearchableItems.forEach((item) => {
    if (detectedLang === 'he') {
      if (item.label && item.label.split(' ').some(word => word.startsWith(value))) {
        matches.push({ ...item, displayLabel: item.label });
      }
    } else if (detectedLang === 'ru') {
      if (item.labelRu && item.labelRu.toLowerCase().split(' ').some(word => word.startsWith(lowerValue))) {
        matches.push({ ...item, displayLabel: item.labelRu });
      }
    } else if (detectedLang === 'latin') {
      const enMatch = item.labelEn && item.labelEn.toLowerCase().split(' ').some(word => word.startsWith(lowerValue));
      const frMatch = item.labelFr && item.labelFr.toLowerCase().split(' ').some(word => word.startsWith(lowerValue));
      
      if (enMatch) {
        matches.push({ ...item, displayLabel: item.labelEn });
      } else if (frMatch) {
        matches.push({ ...item, displayLabel: item.labelFr });
      }
    }
  });

  const uniqueMatches = [];
  const seen = new Set();
  matches.forEach(item => {
    const key = `${item.displayLabel}-${item.href}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueMatches.push(item);
    }
  });

  setResults(uniqueMatches.slice(0, 10));
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
              key={`${item.displayLabel}-${item.href}-${index}`}
              className={`service-search-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleSelect(item)}
            >
              <span className="service-search-label">{item.displayLabel}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceSearchBar;