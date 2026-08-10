import { useLanguage } from '../../context/LanguageContext';
import { getFirstSentence } from '../../utils/textUtils';

// Short one-line lead-in shown under the H1 — the first natural sentence/clause of
// services.<id>.intro (see getFirstSentence), not the full paragraph. The full text
// still appears further down the page, inside <ServiceIntro>.
const ServiceHeaderSubtitle = ({ serviceId }) => {
  const { t } = useLanguage();
  const short = getFirstSentence(t(`services.${serviceId}.intro`, ''));

  if (!short) return null;

  return <p className="service-header-subtitle">{short}</p>;
};

export default ServiceHeaderSubtitle;
