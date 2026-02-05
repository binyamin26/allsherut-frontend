import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

const CustomDropdown = ({ 
  name,
  options, 
  value, 
  onChange, 
  placeholder, 
  disabled,
  error 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  // Normaliser les options : supporter string[] ou {value, label}[]
  const normalizedOptions = options.map(opt => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

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
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    
    const updatePosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom,
          left: rect.left,
          width: rect.width
        });
      }
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange({ target: { name: name, value: option.value } });
    setIsOpen(false);
  };

  const menuContent = isOpen && createPortal(
    <ul 
      ref={menuRef}
      className="custom-dropdown-menu-portal"
      style={{
        position: 'fixed',
        top: menuPosition.top,
        left: menuPosition.left,
        width: menuPosition.width,
        zIndex: 99999
      }}
    >
      {normalizedOptions.map((option, index) => (
        <li
          key={index}
          className={`custom-dropdown-item ${value === option.value ? 'selected' : ''}`}
          onClick={() => handleSelect(option)}
        >
          {option.label}
        </li>
      ))}
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