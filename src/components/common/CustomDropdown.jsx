import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';


const CustomDropdown = ({ 
  name,
  options, 
  value, 
  onChange, 
  placeholder, 
  disabled,
  error,
  searchable = true
}) => {
   const { t, direction } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0, openUpward: false });
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);

  // Normaliser les options : supporter string[] ou {value, label}[]
  const normalizedOptions = options.map(opt => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  // Filtrer les options selon la recherche
  const filteredOptions = searchTerm
    ? normalizedOptions.filter(opt => 
        opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opt.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : normalizedOptions;

  // Trouver le label pour la valeur actuelle
  const selectedOption = normalizedOptions.find(opt => opt.value === value);
  const displayLabel = selectedOption?.label || '';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current && 
        !wrapperRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const computePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const estimatedMenuHeight = Math.min(normalizedOptions.length * 44 + 8, 260);
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < estimatedMenuHeight && rect.top > estimatedMenuHeight;
    setMenuPosition({
      top: openUpward ? undefined : rect.bottom,
      bottom: openUpward ? window.innerHeight - rect.top : undefined,
      left: rect.left,
      width: rect.width,
      openUpward
    });
  };

  useEffect(() => {
    if (isOpen) {
      computePosition();
    }
    if (isOpen && searchable) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('scroll', computePosition, true);
    window.addEventListener('resize', computePosition);

    return () => {
      window.removeEventListener('scroll', computePosition, true);
      window.removeEventListener('resize', computePosition);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange({ target: { name: name, value: option.value } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const menuContent = isOpen && createPortal(
    <ul
      ref={menuRef}
      className="custom-dropdown-menu-portal"
      style={{
        position: 'fixed',
        top: menuPosition.top,
        bottom: menuPosition.bottom,
        left: menuPosition.left,
        width: menuPosition.width,
        zIndex: 99999
      }}
    >
      {searchable && normalizedOptions.length > 5 && (
        <li className="custom-dropdown-search" onClick={(e) => e.stopPropagation()}>
          <div className="dropdown-search-wrapper">
            <Search size={16} className="dropdown-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="dropdown-search-input"
              placeholder={t ? t('common.search') : 'חיפוש...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
                style={{ textAlign: 'start', direction: direction }}
            />
          </div>
        </li>
      )}
      {filteredOptions.length > 0 ? (
        filteredOptions.map((option, index) => (
          <li
            key={index}
            className={`custom-dropdown-item ${value === option.value ? 'selected' : ''}`}
            onClick={() => handleSelect(option)}
            style={{ textAlign: direction === 'ltr' ? 'left' : 'right', direction: direction }}
          >
            {option.label}
          </li>
        ))
      ) : (
        <li className="custom-dropdown-item no-results">
         {t ? t('search.noResults.title') : 'לא נמצאו תוצאות'}
        </li>
      )}
    </ul>,
    document.body
  );

  return (
    <div className="custom-dropdown-wrapper" ref={wrapperRef}>
      <button
        type="button"
        ref={triggerRef}
        className={`custom-dropdown-trigger ${isOpen ? 'open' : ''} ${error ? 'error' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        style={{ 
  textAlign: direction === 'ltr' ? 'left' : 'right', 
  direction: direction,
  flexDirection: direction === 'ltr' ? 'row' : 'row-reverse'
}}
      >
        <span className={value ? 'has-value' : 'placeholder'}>
          {displayLabel || placeholder}
        </span>
        <ChevronDown className={`dropdown-icon ${isOpen ? 'rotated' : ''}`} size={18} />
      </button>
      {menuContent}
    </div>
  );
};

export default CustomDropdown;