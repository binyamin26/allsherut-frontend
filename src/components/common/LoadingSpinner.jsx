import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'medium', 
  text = 'Chargement...', 
  overlay = false,
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const containerClasses = {
    small: 'gap-2 text-sm',
    medium: 'gap-3 text-base',
    large: 'gap-4 text-lg',
    xlarge: 'gap-6 text-xl'
  };

  const spinnerContent = (
    <div className={`loading-spinner ${containerClasses[size]} ${className}`}>
      <Loader 
        className={`animate-spin text-primary-500 ${sizeClasses[size]}`}
        size={size === 'small' ? 16 : size === 'medium' ? 32 : size === 'large' ? 48 : 64}
      />
      {text && <span className="loading-text">{text}</span>}
    </div>
  );

  if (overlay) {
    return (
      <div className="loading-overlay">
        <div className="loading-overlay-content">
          {spinnerContent}
        </div>
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;