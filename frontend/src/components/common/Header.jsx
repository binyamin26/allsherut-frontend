import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// Remplacer l'import actuel par :
import { Menu, X, Home, Users, Heart, BookOpen, UserCheck, Sparkles, Baby, LogOut, Shirt, Zap, Wrench, Wind, Flame, Package, Layers, Hammer, PartyPopper, ChefHat, Paintbrush, Droplets, HardHat, Frame, Square, Key, Leaf, PawPrint } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import AuthModal from '../auth/AuthModal'
import { useLanguage } from '../../context/LanguageContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')
  const [showMobileServices, setShowMobileServices] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useLanguage()

  // Services avec traductions
  const services = [
    { icon: <Baby className="w-5 h-5" />, nameKey: 'services.babysitting', descKey: 'services.babysitting.desc', href: '/services/babysitting' },
    { icon: <Sparkles className="w-5 h-5" />, nameKey: 'services.cleaning', descKey: 'services.cleaning.desc', href: '/services/cleaning' },
   { icon: <Leaf className="w-5 h-5" />, nameKey: 'services.gardening', descKey: 'services.gardening.desc', href: '/services/gardening' },
{ icon: <PawPrint className="w-5 h-5" />, nameKey: 'services.petcare', descKey: 'services.petcare.desc', href: '/services/petcare' },
    { icon: <BookOpen className="w-5 h-5" />, nameKey: 'services.tutoring', descKey: 'services.tutoring.desc', href: '/services/tutoring' },
    { icon: <UserCheck className="w-5 h-5" />, nameKey: 'services.eldercare', descKey: 'services.eldercare.desc', href: '/services/eldercare' },
    { icon: <Shirt className="w-5 h-5" />, nameKey: 'services.laundry', descKey: 'services.laundry.desc', href: '/services/laundry' },
    { icon: <Home className="w-5 h-5" />, nameKey: 'services.property_management', descKey: 'services.property_management.desc', href: '/services/property-management' },
    { icon: <Zap className="w-5 h-5" />, nameKey: 'services.electrician', descKey: 'services.electrician.desc', href: '/services/electrician' },
    { icon: <Wrench className="w-5 h-5" />, nameKey: 'services.plumbing', descKey: 'services.plumbing.desc', href: '/services/plumbing' },
    { icon: <Wind className="w-5 h-5" />, nameKey: 'services.air_conditioning', descKey: 'services.air_conditioning.desc', href: '/services/air-conditioning' },
    { icon: <Layers className="w-5 h-5" />, nameKey: 'services.drywall', descKey: 'services.drywall.desc', href: '/services/drywall' },
    { icon: <Flame className="w-5 h-5" />, nameKey: 'services.gas_technician', descKey: 'services.gas_technician.desc', href: '/services/gas-technician' },
    { icon: <Hammer className="w-5 h-5" />, nameKey: 'services.carpentry', descKey: 'services.carpentry.desc', href: '/services/carpentry' },
    { icon: <Package className="w-5 h-5" />, nameKey: 'services.home_organization', descKey: 'services.home_organization.desc', href: '/services/home-organization' },
    { icon: <PartyPopper className="w-5 h-5" />, nameKey: 'services.event_entertainment', descKey: 'services.event_entertainment.desc', href: '/services/event-entertainment' },
    { icon: <ChefHat className="w-5 h-5" />, nameKey: 'services.private_chef', descKey: 'services.private_chef.desc', href: '/services/private-chef' },
    { icon: <Paintbrush className="w-5 h-5" />, nameKey: 'services.painting', descKey: 'services.painting.desc', href: '/services/painting' },
    { icon: <Droplets className="w-5 h-5" />, nameKey: 'services.waterproofing', descKey: 'services.waterproofing.desc', href: '/services/waterproofing' },
    { icon: <HardHat className="w-5 h-5" />, nameKey: 'services.contractor', descKey: 'services.contractor.desc', href: '/services/contractor' },
    { icon: <Frame className="w-5 h-5" />, nameKey: 'services.aluminum', descKey: 'services.aluminum.desc', href: '/services/aluminum' },
    { icon: <Square className="w-5 h-5" />, nameKey: 'services.glass_works', descKey: 'services.glass_works.desc', href: '/services/glass-works' },
    { icon: <Key className="w-5 h-5" />, nameKey: 'services.locksmith', descKey: 'services.locksmith.desc', href: '/services/locksmith' }
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
    src="/images/logo-homesherut.png" 
    alt="HomeSherut" 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
</div>
            <div className="logo-text">
              <div className="logo-main">HomeSherut</div>
              <div className="logo-sub">{t('common.tagline')}</div>
            </div>
          </Link>

       <nav>
  <Link to="/" className="nav-link">{t('nav.home')}</Link>
  
  <div className="services-dropdown">  {/* ← CHANGÉ */}
 <div className="services-dropdown-trigger nav-link">
      {t('nav.services')}
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
    <div className="services-dropdown-menu">  {/* ← CHANGÉ */}
      {services.map((service, index) => (
        <Link key={index} to={service.href} className="services-dropdown-item" onClick={() => setIsMenuOpen(false)}>  {/* ← CHANGÉ */}
          <div className="dropdown-icon">{service.icon}</div>
          <div className="dropdown-content">
         <h4>{t(service.nameKey)}</h4>
            <p>{t(service.descKey)}</p>
          </div>
        </Link>
      ))}
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
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-button"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="space-y-4">
            {/* Navigation mobile */}
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              דף הבית
            </Link>
            
          <div className="space-y-2">
<div 
  className="nav-link" 
  style={{fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
  onClick={() => setShowMobileServices(!showMobileServices)}
>
    {t('nav.services')}
    <svg 
      className="w-4 h-4" 
      fill="currentColor" 
      viewBox="0 0 20 20"
      style={{transform: showMobileServices ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease'}}
    >
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </div>
  {showMobileServices && services.map((service, index) => (
                <Link key={index} to={service.href} className="dropdown-item" style={{marginRight: '16px'}} onClick={() => setIsMenuOpen(false)}>
                  <div className="dropdown-icon">{service.icon}</div>
                  <div className="dropdown-content">
                    <h4>{t(service.nameKey)}</h4>
            <p>{t(service.descKey)}</p>
                  </div>
                </Link>
              ))}
            </div>
            
            <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              צור קשר
            </Link>
            
            <div className="space-y-3" style={{paddingTop: '16px', borderTop: '1px solid #e5e7eb'}}>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 text-center">
{t('common.hello')} {user?.firstName}
                  </p>
                  <Link 
                    to="/dashboard"
                    className="cta-button" 
                    style={{width: '100%', display: 'block', textAlign: 'center'}}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    דשבורד
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    התנתק
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button 
                    onClick={handleRegisterClick}
                    className="cta-button" 
                    style={{width: '100%'}}
                  >
                    {t('auth.register')}
                  </button>
                  <button 
                    onClick={handleAuthClick}
                    className="cta-button" 
                    style={{width: '100%'}}
                  >
                    {t('auth.login')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

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