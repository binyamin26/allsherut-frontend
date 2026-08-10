import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { Mail } from 'lucide-react'
import { buildServicePath } from '../../utils/langUtils'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// A short, curated set of popular services — enough for real internal linking
// without turning the footer into a sitemap. Every service still gets linked from
// its category page (and the sitemap), so nothing here is an SEO dead-end.
const FEATURED_SERVICES = [
  { nameKey: 'services.cleaning', serviceKey: 'cleaning' },
  { nameKey: 'services.babysitting', serviceKey: 'babysitting' },
  { nameKey: 'services.electrician', serviceKey: 'electrician' },
  { nameKey: 'services.plumbing', serviceKey: 'plumbing' },
  { nameKey: 'services.gardening', serviceKey: 'gardening' },
  { nameKey: 'services.eldercare', serviceKey: 'eldercare' },
  { nameKey: 'services.air_conditioning', serviceKey: 'air-conditioning' },
  { nameKey: 'services.handyman', serviceKey: 'handyman' },
];

const INFO_LINKS = [
  { nameKey: 'footer.links.howItWorks', path: '/how-it-works' },
  { nameKey: 'footer.links.terms', path: '/terms' },
  { nameKey: 'footer.links.privacy', path: '/privacy' },
];

const Footer = () => {
  const { changeLanguage, currentLanguage, t } = useLanguage();

  const languages = [
    { code: 'he', flag: 'https://flagcdn.com/w40/il.png', alt: 'עברית' },
    { code: 'en', flag: 'https://flagcdn.com/w40/gb.png', alt: 'English' },
    { code: 'fr', flag: 'https://flagcdn.com/w40/fr.png', alt: 'Français' },
    { code: 'ru', flag: 'https://flagcdn.com/w40/ru.png', alt: 'Русский' }
  ];

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
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

            <p className="footer-description">{t('footer.description')}</p>

            <a href="mailto:allsherutcontact@gmail.com" className="footer-contact-link">
              <Mail size={16} />
              <span>allsherutcontact@gmail.com</span>
            </a>

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

          {/* Services */}
          <div className="footer-section">
            <h3>{t('footer.groups.services')}</h3>
            <div className="footer-links">
              {FEATURED_SERVICES.map((service) => (
                <Link
                  key={service.serviceKey}
                  to={buildServicePath(service.serviceKey, currentLanguage)}
                  className="footer-link"
                  onClick={scrollToTop}
                >
                  {t(service.nameKey)}
                </Link>
              ))}
              <Link to="/#services" className="footer-link footer-link-accent" onClick={scrollToTop}>
                {t('footer.viewAllServices')}
              </Link>
            </div>
          </div>

          {/* For professionals */}
          <div className="footer-section">
            <h3>{t('footer.groups.professionals')}</h3>
            <div className="footer-links">
              <Link to="/how-it-works#providers" className="footer-link" onClick={scrollToTop}>
                {t('footer.professionals.howItWorks')}
              </Link>
              <Link to="/contact" className="footer-link" onClick={scrollToTop}>
                {t('footer.professionals.contact')}
              </Link>
            </div>
          </div>

          {/* Info */}
          <div className="footer-section">
            <h3>{t('footer.groups.info')}</h3>
            <div className="footer-links">
              {INFO_LINKS.map((link) => (
                <Link
                  key={link.path}
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