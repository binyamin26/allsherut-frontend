import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => {
  const { changeLanguage, currentLanguage, t } = useLanguage();

 const languages = [
    { code: 'he', flag: 'https://flagcdn.com/w40/il.png', alt: 'עברית' },
    { code: 'en', flag: 'https://flagcdn.com/w40/gb.png', alt: 'English' },
    { code: 'fr', flag: 'https://flagcdn.com/w40/fr.png', alt: 'Français' },
    { code: 'ru', flag: 'https://flagcdn.com/w40/ru.png', alt: 'Русский' }
  ];

  // Services organisés par catégories
  const serviceCategories = [
    {
      titleKey: 'footer.category.home',
      services: [
        { nameKey: 'services.cleaning', path: '/services/cleaning' },
        { nameKey: 'services.gardening', path: '/services/gardening' },
        { nameKey: 'services.petcare', path: '/services/petcare' },
        { nameKey: 'services.laundry', path: '/services/laundry' },
        { nameKey: 'services.property_management', path: '/services/property-management' },
        { nameKey: 'services.home_organization', path: '/services/home-organization' }
      ]
    },
    {
      titleKey: 'footer.category.people',
      services: [
        { nameKey: 'services.babysitting', path: '/services/babysitting' },
        { nameKey: 'services.tutoring', path: '/services/tutoring' },
        { nameKey: 'services.eldercare', path: '/services/eldercare' }
      ]
    },
    {
      titleKey: 'footer.category.repairs',
      services: [
        { nameKey: 'services.electrician', path: '/services/electrician' },
        { nameKey: 'services.plumbing', path: '/services/plumbing' },
        { nameKey: 'services.air_conditioning', path: '/services/air-conditioning' },
        { nameKey: 'services.gas_technician', path: '/services/gas-technician' },
        { nameKey: 'services.drywall', path: '/services/drywall' },
        { nameKey: 'services.painting', path: '/services/painting' },
        { nameKey: 'services.carpentry', path: '/services/carpentry' },
        { nameKey: 'services.waterproofing', path: '/services/waterproofing' },
        { nameKey: 'services.aluminum', path: '/services/aluminum' },
        { nameKey: 'services.glass_works', path: '/services/glass-works' },
        { nameKey: 'services.contractor', path: '/services/contractor' },
        { nameKey: 'services.locksmith', path: '/services/locksmith' }
      ]
    },
    {
      titleKey: 'footer.category.events',
      services: [
        { nameKey: 'services.event_entertainment', path: '/services/event-entertainment' },
        { nameKey: 'services.private_chef', path: '/services/private-chef' }
      ]
    }
  ]
const quickLinks = [
    { nameKey: 'footer.links.howItWorks', path: '/how-it-works' },
    // PAIEMENT DÉSACTIVÉ - RÉACTIVER QUAND SITE PAYANT
    // { nameKey: 'footer.links.pricing', path: '/pricing' },
    { nameKey: 'footer.links.support', path: '/contact' },
    { nameKey: 'footer.links.terms', path: '/terms' },
    { nameKey: 'footer.links.privacy', path: '/privacy' }
  ]

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
           <div className="footer-logo-icon">
  <img 
    src="/images/logo-homesherut.png" 
    alt="HomeSherut" 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
</div>
              <div className="footer-logo-text">
                <div className="footer-logo-main">HomeSherut</div>
                <div className="footer-logo-sub">{t('common.tagline')}</div>
              </div>
            </div>
        <div className="footer-language-flags">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`footer-flag-btn ${currentLanguage === lang.code ? 'active' : ''}`}
                  title={lang.alt}
                >
                  <img src={lang.flag} alt={lang.alt} />
                </button>
              ))}
            </div>
          </div>

          {/* Services par catégories */}
       {serviceCategories.map((category, catIndex) => (
            <div key={catIndex} className="footer-section">
              <h3>{t(category.titleKey)}</h3>
              <div className="footer-links">
                {category.services.map((service, index) => (
                  <Link 
                    key={index} 
                    to={service.path} 
                    className="footer-link"
                    onClick={scrollToTop}
                  >
                    {t(service.nameKey)}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Links */}
        <div className="footer-section">
            <h3>{t('footer.quickLinks')}</h3>
            <div className="footer-links">
              {quickLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.path} 
                  className="footer-link"
                  onClick={scrollToTop}
                >
                  {t(link.nameKey)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
       <div className="footer-copyright">
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;