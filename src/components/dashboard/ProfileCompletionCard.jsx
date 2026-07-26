import { Check, Circle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const CRITERIA = [
  { key: 'photo', labelKey: 'dashboard.profileCompletion.itemPhoto' },
  { key: 'gallery', labelKey: 'dashboard.profileCompletion.itemGallery' },
  { key: 'experience', labelKey: 'dashboard.profileCompletion.itemExperience' },
  { key: 'description', labelKey: 'dashboard.profileCompletion.itemDescription' },
  { key: 'languages', labelKey: 'dashboard.profileCompletion.itemLanguages' }
];

// Chaque critère pèse 20% — pondération égale volontairement simple pour la V1.
const ProfileCompletionCard = ({ completed, reviewsCount }) => {
  const { t } = useLanguage();
  const doneCount = CRITERIA.filter(c => completed[c.key]).length;
  const percent = Math.round((doneCount / CRITERIA.length) * 100);

  if (percent === 100) {
    return (
      <div className="profile-completion-card profile-completion-card-done">
        <h3 className="profile-completion-title">{t('dashboard.profileCompletion.doneTitle')}</h3>
        <p className="profile-completion-subtitle">{t('dashboard.profileCompletion.doneSubtitle')}</p>
        <p className="profile-completion-tip">
          {reviewsCount > 0
            ? t('dashboard.profileCompletion.reviewsProgress', { count: reviewsCount })
            : t('dashboard.profileCompletion.getFirstReview')}
        </p>
        <p className="profile-completion-tip">{t('dashboard.profileCompletion.addMorePhotos')}</p>
      </div>
    );
  }

  return (
    <div className="profile-completion-card">
      <div className="profile-completion-header">
        <h3 className="profile-completion-title">{t('dashboard.profileCompletion.title')}</h3>
        <span className="profile-completion-percent">{percent}%</span>
      </div>

      <div className="profile-completion-bar-track">
        <div className="profile-completion-bar-fill" style={{ width: `${percent}%` }} />
      </div>

      <p className="profile-completion-subtitle">{t('dashboard.profileCompletion.subtitle')}</p>

      <ul className="profile-completion-checklist">
        {CRITERIA.map(c => (
          <li key={c.key} className={completed[c.key] ? 'done' : ''}>
            {completed[c.key] ? <Check size={16} /> : <Circle size={14} />}
            <span>{t(c.labelKey)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileCompletionCard;
