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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculer la position du menu quand il s'ouvre
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

  // Recalculer sur scroll/resize
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
    onChange({ target: { name: name, value: option } });
    setIsOpen(false);
  };

  const menuContent = isOpen && createPortal(
    <ul 
      className="custom-dropdown-menu-portal"
      style={{
        position: 'fixed',
        top: menuPosition.top,
        left: menuPosition.left,
        width: menuPosition.width,
        zIndex: 99999
      }}
    >
      {options.map((option, index) => (
        <li
          key={index}
          className={`custom-dropdown-item ${value === option ? 'selected' : ''}`}
          onClick={() => handleSelect(option)}
        >
          {option}
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
          {value || placeholder}
        </span>
        <ChevronDown className={`dropdown-icon ${isOpen ? 'rotated' : ''}`} size={18} />
      </button>
      {menuContent}
    </div>
  );
};

export default CustomDropdown;