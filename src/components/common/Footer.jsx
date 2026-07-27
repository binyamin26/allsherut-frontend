import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { buildServicePath } from '../../utils/langUtils'

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

  // Services organisés par catégories (serviceKey → URL localisée au moment du rendu)
  const serviceCategories = [
    {
      titleKey: 'footer.category.home',
      services: [
        { nameKey: 'services.cleaning', serviceKey: 'cleaning' },
        { nameKey: 'services.gardening', serviceKey: 'gardening' },
        { nameKey: 'services.petcare', serviceKey: 'petcare' },
        { nameKey: 'services.laundry', serviceKey: 'laundry' },
        { nameKey: 'services.property_management', serviceKey: 'property-management' },
        { nameKey: 'services.home_organization', serviceKey: 'home-organization' },
        { nameKey: 'services.pest_control', serviceKey: 'pest-control' }
      ]
    },
    {
      titleKey: 'footer.category.people',
      services: [
        { nameKey: 'services.babysitting', serviceKey: 'babysitting' },
        { nameKey: 'services.tutoring', serviceKey: 'tutoring' },
        { nameKey: 'services.sports_activities', serviceKey: 'sports-activities' },
        { nameKey: 'services.eldercare', serviceKey: 'eldercare' },
        { nameKey: 'services.driver', serviceKey: 'driver' }
      ]
    },
    {
      titleKey: 'footer.category.repairs',
      services: [
        { nameKey: 'services.electrician', serviceKey: 'electrician' },
        { nameKey: 'services.plumbing', serviceKey: 'plumbing' },
        { nameKey: 'services.air_conditioning', serviceKey: 'air-conditioning' },
        { nameKey: 'services.gas_technician', serviceKey: 'gas-technician' },
        { nameKey: 'services.drywall', serviceKey: 'drywall' },
        { nameKey: 'services.painting', serviceKey: 'painting' },
        { nameKey: 'services.carpentry', serviceKey: 'carpentry' },
        { nameKey: 'services.waterproofing', serviceKey: 'waterproofing' },
        { nameKey: 'services.aluminum', serviceKey: 'aluminum' },
        { nameKey: 'services.metalwork', serviceKey: 'metalwork' },
        { nameKey: 'services.glass_works', serviceKey: 'glass-works' },
        { nameKey: 'services.handyman', serviceKey: 'handyman' },
        { nameKey: 'services.mechanic', serviceKey: 'mechanic' },
        { nameKey: 'services.contractor', serviceKey: 'contractor' },
        { nameKey: 'services.locksmith', serviceKey: 'locksmith' },
        { nameKey: 'services.moving', serviceKey: 'moving' },
        { nameKey: 'services.photographer', serviceKey: 'photographer' }
      ]
    },
    {
      titleKey: 'footer.category.events',
      services: [
        { nameKey: 'services.event_entertainment', serviceKey: 'event-entertainment' },
        { nameKey: 'services.event_equipment_rental', serviceKey: 'event-equipment-rental' },
        { nameKey: 'services.event_food_stands', serviceKey: 'event-food-stands' },
        { nameKey: 'services.dj', serviceKey: 'dj' },
        { nameKey: 'services.private_chef', serviceKey: 'private-chef' },
        { nameKey: 'services.catering', serviceKey: 'catering' },
        { nameKey: 'services.pastry', serviceKey: 'pastry' },
        { nameKey: 'services.event_decoration', serviceKey: 'event-decoration' }
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
  const [openSection, setOpenSection] = useState(null);

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
           <div className="footer-logo-icon">
  <img 
    src="/images/logo-homesherut2.jpg"
    alt="AllSherut" 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
</div>
              <div className="footer-logo-text">
                <div className="footer-logo-main">AllSherut</div>
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

       {serviceCategories.map((category, catIndex) => (
            <div key={catIndex} className={`footer-section ${openSection === catIndex ? 'open' : ''}`}>
              <h3 onClick={() => setOpenSection(openSection === catIndex ? null : catIndex)}>
                {t(category.titleKey)}
                <ChevronDown size={18} className="footer-accordion-icon" />
              </h3>
              <div className="footer-links">
                {category.services.map((service, index) => (
                  <Link
                    key={index}
                    to={buildServicePath(service.serviceKey, currentLanguage)}
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
        <div className={`footer-section ${openSection === 'quick' ? 'open' : ''}`}>
            <h3 onClick={() => setOpenSection(openSection === 'quick' ? null : 'quick')}>
              {t('footer.quickLinks')}
              <ChevronDown size={18} className="footer-accordion-icon" />
            </h3>
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