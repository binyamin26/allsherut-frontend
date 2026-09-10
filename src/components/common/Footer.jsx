import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { Mail, ChevronDown } from 'lucide-react'
import { buildServicePath, serviceTypeToKey } from '../../utils/langUtils'
import { VISIBLE_CATEGORY_DEFINITIONS, SERVICES_META } from '../../data/categories'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const INFO_LINKS = [
  { nameKey: 'footer.links.howItWorks', path: '/how-it-works' },
  { nameKey: 'footer.links.terms', path: '/terms' },
  { nameKey: 'footer.links.privacy', path: '/privacy' },
];

const Footer = () => {
  const { changeLanguage, currentLanguage, t } = useLanguage();
  const [openCategories, setOpenCategories] = useState(() => new Set());

  const toggleCategory = (id) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const languages = [
    { code: 'fr', flag: 'https://flagcdn.com/w40/fr.png', alt: 'Français' },
    { code: 'en', flag: 'https://flagcdn.com/w40/gb.png', alt: 'English' }
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

          {/* Services — accordéon par catégorie, tous les services, aucune donnée dupliquée */}
          <div className="footer-section">
            <h3>{t('footer.groups.services')}</h3>
            <div className="footer-accordion">
              {VISIBLE_CATEGORY_DEFINITIONS.map((cat) => {
                const isOpen = openCategories.has(cat.id);
                const categoryName = cat.names[currentLanguage] || cat.names.fr;
                return (
                  <div key={cat.id} className={`footer-accordion-item${isOpen ? ' is-open' : ''}`}>
                    <button
                      type="button"
                      className="footer-accordion-trigger"
                      aria-expanded={isOpen}
                      onClick={() => toggleCategory(cat.id)}
                    >
                      <span className="footer-accordion-label">
                        {categoryName}
                        <span className="footer-accordion-count">{cat.serviceIds.length}</span>
                      </span>
                      <ChevronDown size={16} className="footer-accordion-chevron" aria-hidden="true" />
                    </button>
                    <div className="footer-accordion-panel-wrap">
                      <div className="footer-accordion-panel-inner">
                        <div className="footer-accordion-links">
                          {cat.serviceIds.map((serviceId) => {
                            const meta = SERVICES_META[serviceId];
                            if (!meta) return null;
                            return (
                              <Link
                                key={serviceId}
                                to={buildServicePath(serviceTypeToKey(serviceId), currentLanguage)}
                                className="footer-link footer-sublink"
                                onClick={scrollToTop}
                              >
                                {t(meta.nameKey)}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/#services" className="footer-link footer-link-accent footer-view-all" onClick={scrollToTop}>
              {t('footer.viewAllServices')}
            </Link>
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
