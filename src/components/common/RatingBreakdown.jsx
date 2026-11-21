import { Star, Heart, Tag, Clock3, BadgeCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './RatingBreakdown.css';

// Notes sur 10. Toutes les classes contiennent "text-" pour survivre à l'override de AccessibilityWidget.
const CRITERIA = [
  { key: 'quality', field: 'quality_rating', Icon: Heart },
  { key: 'price', field: 'price_rating', Icon: Tag },
  { key: 'availability', field: 'availability_rating', Icon: Clock3 },
  { key: 'professionalism', field: 'professionalism_rating', Icon: BadgeCheck },
];

const BUCKETS = [
  { key: 'bucketTop', min: 9, max: 10, tone: 'top' },
  { key: 'bucketGood', min: 7, max: 8.99, tone: 'good' },
  { key: 'bucketMid', min: 5, max: 6.99, tone: 'mid' },
  { key: 'bucketLow', min: 0, max: 4.99, tone: 'low' },
];

const average = (nums) => (nums.length ? nums.reduce((s, n) => s + n, 0) / nums.length : null);
const toNum = (v) => {
  const n = parseFloat(v);
  return isNaN(n) || n <= 0 ? null : n;
};
const fmt = (n) => String(Math.round(n * 10) / 10);
const toneOf = (v) => (v >= 9 ? 'top' : v >= 7 ? 'good' : v >= 5 ? 'mid' : 'low');

const RatingBreakdown = ({ reviews }) => {
  const { t } = useLanguage();
  const ratings = (reviews || []).map((r) => toNum(r.rating)).filter((n) => n !== null);
  if (ratings.length === 0) return null;

  const total = ratings.length;
  const avg = average(ratings);
  const labelKey = avg >= 9 ? 'excellent' : avg >= 8 ? 'veryGood' : avg >= 6.5 ? 'good' : 'average';
  const filledStars = avg / 2; // 10 → 5 étoiles

  const criteria = CRITERIA.map(({ key, field, Icon }) => ({
    key,
    Icon,
    value: average((reviews || []).map((r) => toNum(r[field])).filter((n) => n !== null)),
  })).filter((c) => c.value !== null);

  const buckets = BUCKETS.map((b) => {
    const count = ratings.filter((n) => n >= b.min && n <= b.max).length;
    return { ...b, count, pct: Math.round((count / total) * 100) };
  });

  return (
    <div className="text-ravg-card" dir="rtl">
      <div className="text-ravg-hero">
        <div className="text-ravg-badge">{fmt(avg)}</div>
        <div className="text-ravg-hero-info">
          <div className="text-ravg-label">{t(`provider.avg.${labelKey}`)}</div>
          <div className="text-ravg-stars" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => {
              const fill = Math.max(0, Math.min(1, filledStars - i));
              return (
                <span className="text-ravg-star" key={i}>
                  <Star size={18} color="#d1d5db" fill="#e5e7eb" strokeWidth={0} />
                  <span className="text-ravg-star-fill" style={{ width: `${fill * 100}%` }}>
                    <Star size={18} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
                  </span>
                </span>
              );
            })}
          </div>
          <div className="text-ravg-based">{t('provider.avg.basedOn', { count: total })}</div>
        </div>
      </div>

      {criteria.length > 0 && (
        <div className="text-ravg-section text-ravg-area-crit">
          <div className="text-ravg-subtitle">{t('provider.avg.byCriteria')}</div>
          <div className="text-ravg-crit-grid">
            {criteria.map(({ key, value, Icon }) => (
              <div className="text-ravg-crit" key={key}>
                <div className="text-ravg-crit-head">
                  <span className="text-ravg-crit-name">
                    <Icon size={16} />
                    {t(`review.categories.${key}`)}
                  </span>
                  <span className={`text-ravg-crit-score text-ravg-ink-${toneOf(value)}`}>{fmt(value)}</span>
                </div>
                <div className="text-ravg-track">
                  <div
                    className={`text-ravg-fill text-ravg-tone-${toneOf(value)}`}
                    style={{ width: `${value * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-ravg-section text-ravg-area-dist">
        <div className="text-ravg-subtitle">{t('provider.avg.distribution')}</div>
        <div className="text-ravg-dist">
          {buckets.map(({ key, tone, pct, count }) => (
            <div className={`text-ravg-row${count === 0 ? ' text-ravg-row-empty' : ''}`} key={key}>
              <span className="text-ravg-row-label">{t(`provider.avg.${key}`)}</span>
              <div className="text-ravg-track text-ravg-track-lg">
                <div className={`text-ravg-fill text-ravg-tone-${tone}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-ravg-row-count">
                <strong>{pct}%</strong> <em>({count})</em>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingBreakdown;
