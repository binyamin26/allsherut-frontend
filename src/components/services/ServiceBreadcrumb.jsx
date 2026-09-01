import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getCategoryForService } from '../../data/categories';

// Visible "Home > Category > Service" breadcrumb, shown on every /services/:slug page.
// Mirrors the .breadcrumb style already used on the provider detail page.
// (JSON-LD BreadcrumbList data lives in ../../utils/seoJsonLd.js — kept out of this
// component so the plain-JS prerender script can reuse it without a JSX loader.)
const ServiceBreadcrumb = ({ serviceId }) => {
  const { t, currentLanguage } = useLanguage();
  const category = getCategoryForService(serviceId);

  return (
    <div className="breadcrumb service-page-breadcrumb">
      <Link to="/">{t('provider.home', 'Accueil')}</Link>
      <span>/</span>
      {category && (
        <>
          <Link to={`/categories/${category.id}`}>
            {category.names?.[currentLanguage] || category.names?.he}
          </Link>
          <span>/</span>
        </>
      )}
      <span>{t(`services.${serviceId}.pageTitle`)}</span>
    </div>
  );
};

export default ServiceBreadcrumb;
