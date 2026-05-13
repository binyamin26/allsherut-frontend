import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Home, Users, Heart, BookOpen, UserCheck, Sparkles, Baby, LogOut, Shirt, Zap, Wrench, Wind, Flame, Package, Layers, Hammer, PartyPopper, ChefHat, Paintbrush, Droplets, HardHat, Frame, Square, Key, Leaf, PawPrint, ChevronDown, Phone, Truck, Camera, Wand2, Bug, Cog, Activity, Dumbbell } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import AuthModal from '../auth/AuthModal'
import { useLanguage } from '../../context/LanguageContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')
  const [showMobileServices, setShowMobileServices] = useState(false)
  const [showMobileRecruitment, setShowMobileRecruitment] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  
  // Fermer le dropdown au clic extérieur
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLangDropdown && !event.target.closest('.header-language-dropdown')) {
        setShowLangDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLangDropdown]);

  const { t, changeLanguage, currentLanguage } = useLanguage()

  const languages = [
    { code: 'he', flag: 'https://flagcdn.com/w40/il.png', alt: 'עברית' },
    { code: 'en', flag: 'https://flagcdn.com/w40/gb.png', alt: 'English' },
    { code: 'fr', flag: 'https://flagcdn.com/w40/fr.png', alt: 'Français' },
    { code: 'ru', flag: 'https://flagcdn.com/w40/ru.png', alt: 'Русский' }
  ];

  // Services avec traductions
  const services = [
    { icon: <Wrench className="w-5 h-5" />, nameKey: 'services.plumbing', descKey: 'services.plumbing.desc', href: '/services/plumbing' },
    { icon: <Zap className="w-5 h-5" />, nameKey: 'services.electrician', descKey: 'services.electrician.desc', href: '/services/electrician' },
    { icon: <Key className="w-5 h-5" />, nameKey: 'services.locksmith', descKey: 'services.locksmith.desc', href: '/services/locksmith' },
    { icon: <Paintbrush className="w-5 h-5" />, nameKey: 'services.painting', descKey: 'services.painting.desc', href: '/services/painting' },
    { icon: <Wind className="w-5 h-5" />, nameKey: 'services.air_conditioning', descKey: 'services.air_conditioning.desc', href: '/services/air-conditioning' },
    { icon: <Layers className="w-5 h-5" />, nameKey: 'services.drywall', descKey: 'services.drywall.desc', href: '/services/drywall' },
    { icon: <Frame className="w-5 h-5" />, nameKey: 'services.aluminum', descKey: 'services.aluminum.desc', href: '/services/aluminum' },
    { icon: <Square className="w-5 h-5" />, nameKey: 'services.glass_works', descKey: 'services.glass_works.desc', href: '/services/glass-works' },
    { icon: <Flame className="w-5 h-5" />, nameKey: 'services.gas_technician', descKey: 'services.gas_technician.desc', href: '/services/gas-technician' },
    { icon: <Droplets className="w-5 h-5" />, nameKey: 'services.waterproofing', descKey: 'services.waterproofing.desc', href: '/services/waterproofing' },
    { icon: <Hammer className="w-5 h-5" />, nameKey: 'services.carpentry', descKey: 'services.carpentry.desc', href: '/services/carpentry' },
    { icon: <Cog className="w-5 h-5" />, nameKey: 'services.handyman', descKey: 'services.handyman.desc', href: '/services/handyman' },
    { icon: <HardHat className="w-5 h-5" />, nameKey: 'services.contractor', descKey: 'services.contractor.desc', href: '/services/contractor' },
    { icon: <Truck className="w-5 h-5" />, nameKey: 'services.moving', descKey: 'services.moving.desc', href: '/services/moving' },
    { icon: <Leaf className="w-5 h-5" />, nameKey: 'services.gardening', descKey: 'services.gardening.desc', href: '/services/gardening' },
    { icon: <Bug className="w-5 h-5" />, nameKey: 'services.pest_control', descKey: 'services.pest_control.desc', href: '/services/pest-control' },
    { icon: <Sparkles className="w-5 h-5" />, nameKey: 'services.cleaning', descKey: 'services.cleaning.desc', href: '/services/cleaning' },
    { icon: <Shirt className="w-5 h-5" />, nameKey: 'services.laundry', descKey: 'services.laundry.desc', href: '/services/laundry' },
    { icon: <Home className="w-5 h-5" />, nameKey: 'services.property_management', descKey: 'services.property_management.desc', href: '/services/property-management' },
    { icon: <Package className="w-5 h-5" />, nameKey: 'services.home_organization', descKey: 'services.home_organization.desc', href: '/services/home-organization' },
    { icon: <Wand2 className="w-5 h-5" />, nameKey: 'services.event_decoration', descKey: 'services.event_decoration.desc', href: '/services/event-decoration' },
    { icon: <PartyPopper className="w-5 h-5" />, nameKey: 'services.event_entertainment', descKey: 'services.event_entertainment.desc', href: '/services/event-entertainment' },
    { icon: <ChefHat className="w-5 h-5" />, nameKey: 'services.private_chef', descKey: 'services.private_chef.desc', href: '/services/private-chef' },
    { icon: <Camera className="w-5 h-5" />, nameKey: 'services.photographer', descKey: 'services.photographer.desc', href: '/services/photographer' },
    { icon: <BookOpen className="w-5 h-5" />, nameKey: 'services.tutoring', descKey: 'services.tutoring.desc', href: '/services/tutoring' },
    { icon: <Dumbbell className="w-5 h-5" />, nameKey: 'services.sports_activities', descKey: 'services.sports_activities.desc', href: '/services/sports-activities' },
    { icon: <Baby className="w-5 h-5" />, nameKey: 'services.babysitting', descKey: 'services.babysitting.desc', href: '/services/babysitting' },
    { icon: <PawPrint className="w-5 h-5" />, nameKey: 'services.petcare', descKey: 'services.petcare.desc', href: '/services/petcare' },
    { icon: <UserCheck className="w-5 h-5" />, nameKey: 'services.eldercare', descKey: 'services.eldercare.desc', href: '/services/eldercare' }
  ]

  const handleLogout = async () => {
    await logout()
    setIsMenuOpen(false)
    navigate('/')
  }

  const handleAuthClick = () => {
    setAuthModalMode('login')
    setShowAuthModal(true)
    setIsMenuOpen(false)
  }

  const handleRegisterClick = () => {
    setAuthModalMode('register')
    setShowAuthModal(true)
    setIsMenuOpen(false)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    navigate('/')
    setIsMenuOpen(false)
  }

  const handleNavClick = (path) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  return (
    <>
      <header>
        <div className="container">
          {/* Logo */}
          <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <div className="logo-icon">
  <img 
    src="/images/logo-homesherut2.png"   
    alt="AllSherut" 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
</div>
            <div className="logo-text">
              <div className="logo-main">AllSherut</div>
              <div className="logo-sub">{t('common.tagline')}</div>
            </div>
          </Link>
<nav>
  {/* Language dropdown - AVANT Accueil pour qu'il apparaisse entre Accueil et Services en RTL */}
  <div className="header-language-dropdown">
    <button 
      className="header-language-trigger"
      onClick={() => setShowLangDropdown(!showLangDropdown)}
    >
   <img 
  src={languages.find(l => l.code === currentLanguage)?.flag || 'https://flagcdn.com/w40/il.png'} 
  alt={currentLanguage || 'he'} 
/>
      <span className={`lang-arrow ${showLangDropdown ? 'open' : ''}`}>▼</span>
    </button>
    {showLangDropdown && (
      <div className="header-language-menu">
        {languages.filter(l => l.code !== currentLanguage).map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              changeLanguage(lang.code);
              setShowLangDropdown(false);
            }}
            className="header-language-option"
          >
            <img src={lang.flag} alt={lang.alt} />
          </button>
        ))}
      </div>
    )}
  </div>

  <Link to="/" className="nav-link">{t('nav.home')}</Link>
  
  <div className="services-dropdown">
    <div className="services-dropdown-trigger nav-link">
      {t('nav.services')}
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
    <div className="services-dropdown-menu">
   {services.map((service, index) => (
  <Link 
    key={index} 
    to={service.href} 
    className="services-dropdown-item"
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '12px'
    }}
    onClick={() => setIsMenuOpen(false)}
  >
    {currentLanguage === 'he' ? (
      <>
        <div style={{ flexShrink: 0 }}>{service.icon}</div>
        <div style={{ flexGrow: 1, textAlign: 'right' }}>
          <h4>{t(service.nameKey)}</h4>
          <p>{t(service.descKey)}</p>
        </div>
      </>
    ) : (
      <>
        <div style={{ flexGrow: 1, textAlign: 'left' }}>
          <h4>{t(service.nameKey)}</h4>
          <p>{t(service.descKey)}</p>
        </div>
        <div style={{ flexShrink: 0 }}>{service.icon}</div>
      </>
    )}
  </Link>
))}
    </div>
  </div>
  
  <div className="services-dropdown">
    <div className="services-dropdown-trigger nav-link">
      {t('nav.recruitment')}
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
    <div className="services-dropdown-menu">
      {services.map((service, index) => {
        const recruitHref = service.href.replace('/services/', '/recruitment/');
        return (
          <Link
            key={index}
            to={recruitHref}
            className="services-dropdown-item"
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}
            onClick={() => setIsMenuOpen(false)}
          >
            {currentLanguage === 'he' ? (
              <>
                <div style={{ flexShrink: 0 }}>{service.icon}</div>
                <div style={{ flexGrow: 1, textAlign: 'right' }}>
                  <h4>{t(service.nameKey)}</h4>
                </div>
              </>
            ) : (
              <>
                <div style={{ flexGrow: 1, textAlign: 'left' }}>
                  <h4>{t(service.nameKey)}</h4>
                </div>
                <div style={{ flexShrink: 0 }}>{service.icon}</div>
              </>
            )}
          </Link>
        );
      })}
    </div>
  </div>

  <Link to="/contact" className="nav-link">{t('nav.contact')}</Link>
</nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="user-menu">
                  <Link to="/dashboard" className="cta-button">
                    {t('nav.dashboard', 'דשבורד')}
                  </Link>
                </div>
                <button 
                  onClick={handleLogout}
                  className="cta-button"
                  title="התנתק"
                >
                  <LogOut className="w-4 h-4" />
                  {t('auth.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleRegisterClick}
                  className="cta-button"
                >
                  {t('auth.register')}
                </button>
                <button 
                  onClick={handleAuthClick}
                  className="cta-button"
                >
                  {t('auth.login')}
                </button>
              </div>
            )}
{/* Language dropdown MOBILE */}
            <div className="header-language-dropdown mobile-only">
              <button 
                className="header-language-trigger"
                onClick={() => setShowLangDropdown(!showLangDropdown)}
              >
                <img 
                  src={languages.find(l => l.code === currentLanguage)?.flag} 
                  alt={currentLanguage} 
                />
                <span className={`lang-arrow ${showLangDropdown ? 'open' : ''}`}>▼</span>
              </button>
              {showLangDropdown && (
                <div className="header-language-menu">
                  {languages.filter(l => l.code !== currentLanguage).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setShowLangDropdown(false);
                      }}
                      className="header-language-option"
                    >
                      <img src={lang.flag} alt={lang.alt} />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-button"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

      </header>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile drawer */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>

        {/* Drawer header */}
        <div className="mobile-drawer-header">
          <div className="mobile-drawer-logo">
            <div className="logo-icon">
              <img src="/images/logo-homesherut2.png" alt="AllSherut" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span className="logo-main">AllSherut</span>
          </div>
          <button className="mobile-drawer-close" onClick={() => setIsMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable nav content */}
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-nav">

            <Link to="/" className="mobile-drawer-link" onClick={() => setIsMenuOpen(false)}>
              <Home className="w-5 h-5" />
              <span>{t('nav.home')}</span>
            </Link>

            {/* Services accordion */}
            <div>
              <button
                className="mobile-drawer-link mobile-drawer-services-toggle"
                onClick={() => setShowMobileServices(!showMobileServices)}
              >
                <div className="drawer-link-left">
                  <Sparkles className="w-5 h-5" />
                  <span>{t('nav.services')}</span>
                </div>
                <ChevronDown className={`mobile-drawer-chevron ${showMobileServices ? 'open' : ''}`} />
              </button>

              {showMobileServices && (
                <div className="mobile-drawer-services-grid">
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      to={service.href}
                      className="mobile-drawer-service-item"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="mobile-service-icon">{service.icon}</div>
                      <span className="text-mobile-service">{t(service.nameKey)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recruitment accordion */}
            <div>
              <button
                className="mobile-drawer-link mobile-drawer-services-toggle"
                onClick={() => setShowMobileRecruitment(!showMobileRecruitment)}
              >
                <div className="drawer-link-left">
                  <Users className="w-5 h-5" />
                  <span>{t('nav.recruitment')}</span>
                </div>
                <ChevronDown className={`mobile-drawer-chevron ${showMobileRecruitment ? 'open' : ''}`} />
              </button>

              {showMobileRecruitment && (
                <div className="mobile-drawer-services-grid">
                  {services.map((service, index) => {
                    const recruitHref = service.href.replace('/services/', '/recruitment/');
                    return (
                      <Link
                        key={index}
                        to={recruitHref}
                        className="mobile-drawer-service-item"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="mobile-service-icon">{service.icon}</div>
                        <span className="text-mobile-service">{t(service.nameKey)}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link to="/contact" className="mobile-drawer-link" onClick={() => setIsMenuOpen(false)}>
              <Phone className="w-5 h-5" />
              <span>{t('nav.contact')}</span>
            </Link>

          </div>
        </div>

        {/* Auth section */}
        <div className="mobile-drawer-auth">
          {isAuthenticated ? (
            <>
              <p className="text-drawer-greeting">{t('common.hello')} {user?.firstName} 👋</p>
              <Link
                to="/dashboard"
                className="cta-button mobile-drawer-cta"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.dashboard', 'דשבורד')}
              </Link>
              <button onClick={handleLogout} className="mobile-drawer-logout">
                <LogOut className="w-4 h-4" />
                {t('auth.logout')}
              </button>
            </>
          ) : (
            <>
              <button onClick={handleRegisterClick} className="cta-button mobile-drawer-cta">
                {t('auth.register')}
              </button>
              <button onClick={handleAuthClick} className="mobile-drawer-login">
                {t('auth.login')}
              </button>
            </>
          )}
        </div>

        {/* Language section */}
        <div className="mobile-drawer-langs">
          <div className="mobile-drawer-langs-row">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`mobile-drawer-lang-btn ${currentLanguage === lang.code ? 'active' : ''}`}
              >
                <img src={lang.flag} alt={lang.alt} />
                <span className="text-lang-label">{lang.alt}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* AuthModal */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={authModalMode}
        />
      )}
    </>
  )
}

export default Header