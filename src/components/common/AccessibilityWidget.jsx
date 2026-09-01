import React, { useState, useEffect } from 'react';
import { 
  Accessibility, 
  Eye, 
  Type, 
  Palette, 
  Volume2, 
  MousePointer, 
  RotateCcw,
  Minus,
  Plus,
  Pause,
  Play
} from 'lucide-react';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 100, // Défaut à 100% pour correspondre à votre taille naturelle
    contrast: 'normal',
    colorBlind: false,
    speechEnabled: false,
    animationsDisabled: false,
    cursorSize: 'normal',
    underlineLinks: false,
    readingGuide: false,
    invertColors: false,
    darkMode: false,
    keyboardNavigation: false,
    focusHighlight: false,
    readingMask: false
  });

  // Apply settings whenever they change
  useEffect(() => {
    applySettings();
  }, [settings]);

  const applySettings = () => {
    const root = document.documentElement;
    const body = document.body;
    
    // SOLUTION INTÉGRÉE - Utilise vos variables CSS existantes
    const scale = settings.fontSize / 100;
    root.style.setProperty('--accessibility-font-scale', `${scale}`);
    
    // Contrast
    if (settings.contrast === 'high') {
      body.classList.add('high-contrast');
      body.classList.remove('low-contrast');
    } else if (settings.contrast === 'low') {
      body.classList.add('low-contrast');
      body.classList.remove('high-contrast');
    } else {
      body.classList.remove('high-contrast', 'low-contrast');
    }
    
    // Color blind mode
    settings.colorBlind 
      ? body.classList.add('colorblind-mode') 
      : body.classList.remove('colorblind-mode');
    
    // Animations
    settings.animationsDisabled 
      ? body.classList.add('no-animations') 
      : body.classList.remove('no-animations');
    
    // Cursor size
    settings.cursorSize === 'large' 
      ? body.classList.add('large-cursor') 
      : body.classList.remove('large-cursor');
    
    // Underline links
    settings.underlineLinks 
      ? body.classList.add('underline-links') 
      : body.classList.remove('underline-links');
    
    // Reading guide
    settings.readingGuide 
      ? body.classList.add('reading-guide') 
      : body.classList.remove('reading-guide');
    
    // Invert colors
    settings.invertColors 
      ? body.classList.add('invert-colors') 
      : body.classList.remove('invert-colors');
    
    // Dark mode
    settings.darkMode 
      ? body.classList.add('dark-mode') 
      : body.classList.remove('dark-mode');

    // Keyboard navigation
    settings.keyboardNavigation 
      ? body.classList.add('keyboard-navigation') 
      : body.classList.remove('keyboard-navigation');

    // Focus highlight
    settings.focusHighlight 
      ? body.classList.add('focus-highlight') 
      : body.classList.remove('focus-highlight');

    // Reading mask
    settings.readingMask 
      ? body.classList.add('reading-mask') 
      : body.classList.remove('reading-mask');
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const adjustFontSize = (increment) => {
    const newSize = settings.fontSize + increment;
    const clampedSize = Math.max(80, Math.min(200, newSize));
    updateSetting('fontSize', clampedSize);
  };

  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 100, // Défaut à 100% pour correspondre à votre taille naturelle
      contrast: 'normal',
      colorBlind: false,
      speechEnabled: false,
      animationsDisabled: false,
      cursorSize: 'normal',
      underlineLinks: false,
      readingGuide: false,
      invertColors: false,
      darkMode: false,
      keyboardNavigation: false,
      focusHighlight: false,
      readingMask: false
    };
    setSettings(defaultSettings);
  };

  const speakText = (text) => {
    if (settings.speechEnabled && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  // Auto-read page content when speech is enabled
  useEffect(() => {
    if (settings.speechEnabled) {
      const handleClick = (e) => {
        const text = e.target.textContent || e.target.innerText;
        if (text && text.trim().length > 0) {
          speakText(text.trim().substring(0, 200));
        }
      };
      
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [settings.speechEnabled]);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.accessibility-widget')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <div className="accessibility-widget">
        {/* Widget Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="accessibility-btn"
          aria-label="Ouvrir le menu d'accessibilité"
          title="Accessibilité"
          type="button"
        >
          <Accessibility size={24} />
        </button>

        {/* Widget Panel */}
        {isOpen && (
          <div className="accessibility-panel" role="dialog" aria-label="Menu d'accessibilité">
            <div className="accessibility-header">
              <h3>{"Réglages d'accessibilité"}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="close-btn"
                aria-label="Fermer le menu d'accessibilité"
                type="button"
              >
                ×
              </button>
            </div>

            <div className="accessibility-content">
              {/* Font Size */}
              <div className="setting-group">
                <div className="setting-header">
                  <Type size={20} />
                  <span>Taille du texte</span>
                </div>
                <div className="font-controls">
                  <button
                    type="button"
                    onClick={() => adjustFontSize(-10)}
                    disabled={settings.fontSize <= 80}
                    className="font-btn"
                    aria-label="Réduire le texte"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-size-display">{settings.fontSize}%</span>
                  <button
                    type="button"
                    onClick={() => adjustFontSize(10)}
                    disabled={settings.fontSize >= 200}
                    className="font-btn"
                    aria-label="Agrandir le texte"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Contrast */}
              <div className="setting-group">
                <div className="setting-header">
                  <Eye size={20} />
                  <span>Contraste</span>
                </div>
                <div className="toggle-group">
                  <button
                    type="button"
                    className={settings.contrast === 'normal' ? 'active' : ''}
                    onClick={() => updateSetting('contrast', 'normal')}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    className={settings.contrast === 'high' ? 'active' : ''}
                    onClick={() => updateSetting('contrast', 'high')}
                  >
                    Élevé
                  </button>
                  <button
                    type="button"
                    className={settings.contrast === 'low' ? 'active' : ''}
                    onClick={() => updateSetting('contrast', 'low')}
                  >
                    Faible
                  </button>
                </div>
              </div>

              {/* Color Options */}
              <div className="setting-group">
                <div className="setting-header">
                  <Palette size={20} />
                  <span>Couleurs</span>
                </div>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.colorBlind}
                      onChange={(e) => updateSetting('colorBlind', e.target.checked)}
                    />
                    Mode daltonien
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.invertColors}
                      onChange={(e) => updateSetting('invertColors', e.target.checked)}
                    />
                    Inverser les couleurs
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={(e) => updateSetting('darkMode', e.target.checked)}
                    />
                    Mode nuit
                  </label>
                </div>
              </div>

              {/* Audio */}
              <div className="setting-group">
                <div className="setting-header">
                  <Volume2 size={20} />
                  <span>Audio</span>
                </div>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.speechEnabled}
                      onChange={(e) => updateSetting('speechEnabled', e.target.checked)}
                    />
                    Lecture vocale (cliquez sur un texte)
                  </label>
                </div>
                {settings.speechEnabled && (
                  <div className="speech-controls">
                    <button
                      type="button"
                      className="test-speech"
                      onClick={() => speakText('Bienvenue sur AllSherut - services à domicile professionnels')}
                    >
                      <Play size={14} />
                      Tester la voix
                    </button>
                    <button
                      type="button"
                      className="stop-speech"
                      onClick={() => speechSynthesis.cancel()}
                    >
                      <Pause size={14} />
                      Arrêter
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation & Interaction */}
              <div className="setting-group">
                <div className="setting-header">
                  <MousePointer size={20} />
                  <span>Navigation et interaction</span>
                </div>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.animationsDisabled}
                      onChange={(e) => updateSetting('animationsDisabled', e.target.checked)}
                    />
                    Désactiver les animations
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.cursorSize === 'large'}
                      onChange={(e) => updateSetting('cursorSize', e.target.checked ? 'large' : 'normal')}
                    />
                    Grand curseur
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.underlineLinks}
                      onChange={(e) => updateSetting('underlineLinks', e.target.checked)}
                    />
                    Souligner les liens
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.readingGuide}
                      onChange={(e) => updateSetting('readingGuide', e.target.checked)}
                    />
                    Guide de lecture
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.keyboardNavigation}
                      onChange={(e) => updateSetting('keyboardNavigation', e.target.checked)}
                    />
                    Navigation clavier améliorée
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.focusHighlight}
                      onChange={(e) => updateSetting('focusHighlight', e.target.checked)}
                    />
                    Mise en évidence du focus
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.readingMask}
                      onChange={(e) => updateSetting('readingMask', e.target.checked)}
                    />
                    Masque de lecture
                  </label>
                </div>
              </div>

              {/* Reset Button */}
              <div className="setting-group">
                <button
                  type="button"
                  onClick={resetSettings}
                  className="reset-btn"
                >
                  <RotateCcw size={16} />
                  Réinitialiser les réglages
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS Styles pour le widget */}
      <style>{`
     .accessibility-widget {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 10000;
  font-family: var(--font-primary);
}
        .accessibility-btn {
          width: 30px;
          height: 30px;
          border-radius: var(--radius-full);
          background: var(--primary-500);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-xl);
          transition: var(--transition-medium);
          outline: none;
        }

        .accessibility-btn:hover {
          background: var(--primary-600);
          transform: scale(1.05);
        }

        .accessibility-btn:focus {
          outline: 3px solid var(--accent-400);
          outline-offset: 2px;
        }
.accessibility-panel {
  position: absolute;
  bottom: 60px;
  left: 0;
  width: 380px;
  max-width: calc(100vw - 40px);
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
  border: 1px solid var(--neutral-200);
  direction: ltr;
  max-height: calc(100vh - 100px);
  overflow: hidden;
}

        .accessibility-header {
          padding: var(--space-5);
          border-bottom: 1px solid var(--neutral-200);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--neutral-50);
          border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
        }

        .accessibility-header h3 {
          margin: 0;
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--neutral-800);
        }

        .close-btn {
          background: none;
          border: none;
          font-size: var(--text-2xl);
          cursor: pointer;
          color: var(--neutral-500);
          padding: var(--space-1);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          transition: var(--transition-fast);
        }

        .close-btn:hover {
          color: var(--neutral-700);
          background: var(--neutral-100);
        }

        .accessibility-content {
          padding: var(--space-5);
          max-height: calc(100vh - 180px);
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--neutral-300) var(--neutral-100);
        }

        .accessibility-content::-webkit-scrollbar {
          width: 6px;
        }

        .accessibility-content::-webkit-scrollbar-track {
          background: var(--neutral-100);
        }

        .accessibility-content::-webkit-scrollbar-thumb {
          background: var(--neutral-300);
          border-radius: var(--radius-sm);
        }

        .setting-group {
          margin-bottom: var(--space-6);
        }

        .setting-group:last-child {
          margin-bottom: 0;
        }

        .setting-header {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-3);
          font-weight: 600;
          color: var(--neutral-700);
        }

        .font-controls {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          justify-content: center;
          background: var(--neutral-100);
          padding: var(--space-3);
          border-radius: var(--radius-xl);
        }

        .font-btn {
          background: var(--primary-500) !important;
          color: white !important;
          border: none !important;
          border-radius: var(--radius-md) !important;
          width: 36px !important;
          height: 36px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: var(--transition-fast) !important;
          touch-action: manipulation;
        }

        .font-btn:disabled {
          background: var(--neutral-300) !important;
          cursor: not-allowed !important;
        }

        .font-btn:hover:not(:disabled) {
          background: var(--primary-600) !important;
          transform: scale(1.05);
        }

        .font-btn:active:not(:disabled) {
          transform: scale(0.95);
        }

        .font-size-display {
          font-weight: 600;
          min-width: 50px;
          text-align: center;
          font-size: var(--text-base);
          color: var(--neutral-800);
        }

        .toggle-group {
          display: flex;
          gap: var(--space-1);
        }

        .toggle-group button {
          flex: 1;
          padding: var(--space-3) var(--space-2);
          border: 1px solid var(--neutral-300);
          background: white;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition-fast);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--neutral-700);
        }

        .toggle-group button:hover {
          border-color: var(--primary-400);
          background: var(--primary-50);
        }

        .toggle-group button.active {
          background: var(--primary-500);
          color: white;
          border-color: var(--primary-500);
        }

        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .checkbox-group label {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          cursor: pointer;
          padding: var(--space-3);
          border-radius: var(--radius-md);
          transition: var(--transition-fast);
          font-weight: 500;
          user-select: none;
          color: var(--neutral-700);
        }

        .checkbox-group label:hover {
          background: var(--neutral-50);
        }

        .checkbox-group input[type="checkbox"] {
          width: 20px;
          height: 20px;
          accent-color: var(--primary-500);
          cursor: pointer;
        }

        .speech-controls {
          margin-top: var(--space-3);
          display: flex;
          gap: var(--space-2);
        }

        .test-speech, .stop-speech {
          padding: var(--space-2) var(--space-3);
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          font-size: var(--text-sm);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: var(--space-2);
          transition: var(--transition-fast);
        }

        .test-speech {
          background: var(--accent-500);
          color: white;
        }

        .test-speech:hover {
          background: var(--accent-600);
        }

        .stop-speech {
          background: var(--warning);
          color: white;
        }

        .stop-speech:hover {
          background: #ea580c;
        }

        .reset-btn {
          width: 100%;
          padding: var(--space-4);
          background: var(--danger);
          color: white;
          border: none;
          border-radius: var(--radius-lg);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          font-weight: 600;
          transition: var(--transition-fast);
          font-size: var(--text-base);
        }

        .reset-btn:hover {
          background: #dc2626;
        }

     /* Mobile responsive */
@media (max-width: 480px) {
  .accessibility-widget {
    bottom: 10px;
    left: 10px;
    top: auto;
  }

       .accessibility-btn {
  width: 40px;
  height: 40px;

          .accessibility-panel {
            width: calc(100vw - 20px);
            left: -10px;
          }
        }
      `}</style>

      {/* CSS Global - Intégration parfaite avec votre architecture */}
      <style>{`
        /* Variable d'échelle pour la taille du texte */
        :root {
          --accessibility-font-scale: 1; /* Défaut 110% pour respecter la taille naturelle */
        }

        /* Protection du widget contre les modifications globales */
        .accessibility-widget,
        .accessibility-widget * {
          font-size: initial !important;
        }

        /* INTÉGRATION AVEC VOS CLASSES EXISTANTES */
        
        /* Classes utilitaires de tailles de texte - Utilise vos variables existantes */
        .text-xs:not(.accessibility-widget .text-xs) { 
          font-size: calc(var(--text-xs) * var(--accessibility-font-scale)) !important; 
        }
        .text-sm:not(.accessibility-widget .text-sm) { 
          font-size: calc(var(--text-sm) * var(--accessibility-font-scale)) !important; 
        }
        .text-base:not(.accessibility-widget .text-base) { 
          font-size: calc(var(--text-base) * var(--accessibility-font-scale)) !important; 
        }
        .text-lg:not(.accessibility-widget .text-lg) { 
          font-size: calc(var(--text-lg) * var(--accessibility-font-scale)) !important; 
        }
        .text-xl:not(.accessibility-widget .text-xl) { 
          font-size: calc(var(--text-xl) * var(--accessibility-font-scale)) !important; 
        }
        .text-2xl:not(.accessibility-widget .text-2xl) { 
          font-size: calc(var(--text-2xl) * var(--accessibility-font-scale)) !important; 
        }
        .text-3xl:not(.accessibility-widget .text-3xl) { 
          font-size: calc(var(--text-3xl) * var(--accessibility-font-scale)) !important; 
        }
        .text-4xl:not(.accessibility-widget .text-4xl) { 
          font-size: calc(var(--text-4xl) * var(--accessibility-font-scale)) !important; 
        }
        .text-5xl:not(.accessibility-widget .text-5xl) { 
          font-size: calc(var(--text-5xl) * var(--accessibility-font-scale)) !important; 
        }
        .text-6xl:not(.accessibility-widget .text-6xl) { 
          font-size: calc(var(--text-6xl) * var(--accessibility-font-scale)) !important; 
        }

        /* Titres HTML avec vos variables */
        body h1:not(.accessibility-widget h1):not(.homepage h1) {
          font-size: calc(var(--text-5xl) * var(--accessibility-font-scale)) !important;
        }
        body h2:not(.accessibility-widget h2):not(.homepage h2) {
          font-size: calc(var(--text-4xl) * var(--accessibility-font-scale)) !important;
        }
        body h3:not(.accessibility-widget h3) { 
          font-size: calc(var(--text-2xl) * var(--accessibility-font-scale)) !important; 
        }
        body h4:not(.accessibility-widget h4) { 
          font-size: calc(var(--text-xl) * var(--accessibility-font-scale)) !important; 
        }
        body h5:not(.accessibility-widget h5) { 
          font-size: calc(var(--text-lg) * var(--accessibility-font-scale)) !important; 
        }
        body h6:not(.accessibility-widget h6) { 
          font-size: calc(var(--text-base) * var(--accessibility-font-scale)) !important; 
        }

        /* Classes spéciales de votre typography.css */
        .hero-title:not(.accessibility-widget .hero-title):not(.homepage .hero-title) {
          font-size: calc(var(--text-6xl) * var(--accessibility-font-scale)) !important;
        }
        .hero-description:not(.accessibility-widget .hero-description) {
          font-size: calc(var(--text-xl) * var(--accessibility-font-scale)) !important;
        }
        .section-title:not(.accessibility-widget .section-title):not(.homepage .section-title) {
          font-size: calc(var(--text-4xl) * var(--accessibility-font-scale)) !important;
        }
        .service-name:not(.accessibility-widget .service-name) { 
          font-size: calc(var(--text-2xl) * var(--accessibility-font-scale)) !important; 
        }
        .service-description:not(.accessibility-widget .service-description) { 
          font-size: calc(var(--text-base) * var(--accessibility-font-scale)) !important; 
        }
        .feature-title:not(.accessibility-widget .feature-title) { 
          font-size: calc(var(--text-2xl) * var(--accessibility-font-scale)) !important; 
        }
        .feature-description:not(.accessibility-widget .feature-description) { 
          font-size: calc(var(--text-base) * var(--accessibility-font-scale)) !important; 
        }

        /* CORRECTION SPÉCIFIQUE pour gradient-text et background-clip */
        /* Ces éléments héritent de la taille de leur parent avec l'échelle appliquée */
        .gradient-text:not(.accessibility-widget .gradient-text),
        body *[style*="background-clip: text"]:not(.accessibility-widget *),
        body *[style*="backgroundClip"]:not(.accessibility-widget *) {
          font-size: inherit !important;
        }
        
        /* Application de l'échelle aux parents contenant du gradient-text */
        .hero-title:not(.accessibility-widget .hero-title):not(.homepage .hero-title),
        .section-title:not(.accessibility-widget .section-title):not(.homepage .section-title),
        h1:not(.accessibility-widget h1):not(.homepage h1),
        h2:not(.accessibility-widget h2):not(.homepage h2) {
          font-size: calc(var(--text-6xl) * var(--accessibility-font-scale)) !important;
        }

        /* Ajustement spécifique pour les h2 avec gradient */
        h2:not(.accessibility-widget h2):not(.homepage h2) {
          font-size: calc(var(--text-4xl) * var(--accessibility-font-scale)) !important;
        }

        /* Éléments de texte génériques */
        body p:not(.accessibility-widget p),
        body span:not(.accessibility-widget span):not(.gradient-text):not([class*="text-"]),
        body div:not(.accessibility-widget div):not(.accessibility-widget):not([class*="text-"]),
        body a:not(.accessibility-widget a):not([class*="text-"]),
        body li:not(.accessibility-widget li),
        body td:not(.accessibility-widget td),
        body th:not(.accessibility-widget th),
        body label:not(.accessibility-widget label),
        body button:not(.accessibility-widget button):not([class*="text-"]),
        body input:not(.accessibility-widget input),
        body textarea:not(.accessibility-widget textarea) {
          font-size: calc(var(--text-base) * var(--accessibility-font-scale)) !important;
        }

        /* Classes d'accessibilité */
        .high-contrast {
          filter: contrast(200%) brightness(1.1) !important;
        }

        .low-contrast {
          filter: contrast(50%) !important;
        }

        .colorblind-mode {
          filter: grayscale(100%) !important;
        }

        .no-animations * {
          animation-duration: 0.001ms !important;
          animation-delay: 0.001ms !important;
          transition-duration: 0.001ms !important;
          transition-delay: 0.001ms !important;
          scroll-behavior: auto !important;
        }

        .large-cursor * {
          cursor: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' stroke='%23fff' stroke-width='1' d='M13.64 21.97c-.21 0-.42-.08-.59-.24l-2.05-2.05-2.05 2.05c-.16.16-.4.24-.64.24-.24 0-.48-.08-.64-.24-.35-.35-.35-.93 0-1.28l2.05-2.05-2.05-2.05c-.35-.35-.35-.93 0-1.28.35-.35.93-.35 1.28 0l2.05 2.05 2.05-2.05c.35-.35.93-.35 1.28 0 .35.35.35.93 0 1.28l-2.05 2.05 2.05 2.05c.35.35.35.93 0 1.28-.17.16-.38.24-.59.24z'/%3E%3C/svg%3E"), auto !important;
        }

        .underline-links a {
          text-decoration: underline !important;
          text-underline-offset: 4px !important;
        }

        .reading-guide {
          line-height: 2.2 !important;
          letter-spacing: 1.5px !important;
          word-spacing: 4px !important;
        }

        .invert-colors {
          filter: invert(1) hue-rotate(180deg) !important;
        }

        .dark-mode {
          background-color: var(--neutral-900) !important;
          color: var(--neutral-100) !important;
        }

        .keyboard-navigation *:focus {
          outline: 3px solid var(--accent-400) !important;
          outline-offset: 2px !important;
          border-radius: var(--radius-sm) !important;
        }

        .focus-highlight *:focus {
          background-color: rgba(16, 185, 129, 0.2) !important;
          outline: 2px solid var(--accent-400) !important;
          outline-offset: 1px !important;
        }

        .reading-mask {
          position: relative;
        }

        .reading-mask::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.8) 0%,
            transparent 40%,
            transparent 60%,
            rgba(0, 0, 0, 0.8) 100%
          );
          pointer-events: none;
          z-index: 9998;
        }

        /* Mode sombre pour le widget */
        .dark-mode .accessibility-panel {
          background-color: var(--neutral-800) !important;
          border-color: var(--neutral-700) !important;
          color: var(--neutral-100) !important;
        }

        .dark-mode .accessibility-header {
          background-color: var(--neutral-900) !important;
          border-color: var(--neutral-700) !important;
        }

        .dark-mode .accessibility-header h3 {
          color: var(--neutral-100) !important;
        }

        .dark-mode .setting-header {
          color: var(--neutral-100) !important;
        }

        .dark-mode .font-controls {
          background-color: var(--neutral-700) !important;
        }

        .dark-mode .font-size-display {
          color: var(--neutral-100) !important;
        }

        .dark-mode .toggle-group button {
          background-color: var(--neutral-700) !important;
          border-color: var(--neutral-600) !important;
          color: var(--neutral-100) !important;
        }

        .dark-mode .toggle-group button:hover {
          background-color: var(--neutral-600) !important;
        }

        .dark-mode .toggle-group button.active {
          background-color: var(--primary-500) !important;
        }

        .dark-mode .checkbox-group label {
          color: var(--neutral-100) !important;
        }

        .dark-mode .checkbox-group label:hover {
          background-color: var(--neutral-700) !important;
        }

        /* Préférences système */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media print {
          .accessibility-widget {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default AccessibilityWidget;