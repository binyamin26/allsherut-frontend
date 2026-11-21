import { Star, Heart, Tag, Clock3, BadgeCheck, Sparkles } from 'lucide-react';
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
  const tone = toneOf(avg);
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
  const topPct = buckets[0].pct;

  return (
    <div className="text-ravg-card">
      <div className="text-ravg-header">
        <h3 className="text-ravg-title">{t('provider.avg.title')}</h3>
        {topPct >= 50 && (
          <span className="text-ravg-insight">
            <Sparkles size={15} />
            {t('provider.avg.insightTop', { pct: topPct })}
          </span>
        )}
      </div>

      <div className="text-ravg-body">
        <div className="text-ravg-hero">
          <div
            className={`text-ravg-ring text-ravg-ring-${tone}`}
            style={{ '--ravg-pct': `${(avg / 10) * 100}%` }}
          >
            <div className="text-ravg-ring-inner">
              <span className="text-ravg-score">{fmt(avg)}</span>
              <span className="text-ravg-outof">/ 10</span>
            </div>
          </div>
          <div className="text-ravg-label">{t(`provider.avg.${labelKey}`)}</div>
          <div className="text-ravg-stars" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => {
              const fill = Math.max(0, Math.min(1, filledStars - i));
              return (
                <span className="text-ravg-star" key={i}>
                  <Star size={20} color="#d1d5db" fill="#e5e7eb" strokeWidth={0} />
                  <span className="text-ravg-star-fill" style={{ width: `${fill * 100}%` }}>
                    <Star size={20} color="#f59e0b" fill="#f59e0b" strokeWidth={0} />
                  </span>
                </span>
              );
            })}
          </div>
          <div className="text-ravg-based">{t('provider.avg.basedOn', { count: total })}</div>
        </div>

        {criteria.length > 0 && (
          <div className="text-ravg-tiles">
            {criteria.map(({ key, value, Icon }) => (
              <div className="text-ravg-tile" key={key}>
                <div className={`text-ravg-tile-icon text-ravg-bg-${toneOf(value)}`}>
                  <Icon size={18} />
                </div>
                <div className="text-ravg-tile-main">
                  <span className="text-ravg-tile-name">{t(`review.categories.${key}`)}</span>
                  <span className="text-ravg-tile-score">
                    {fmt(value)}
                    <small>/10</small>
                  </span>
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
        )}
      </div>

      <div className="text-ravg-dist">
        <div className="text-ravg-subtitle">{t('provider.avg.distribution')}</div>
        <div className="text-ravg-stack" role="img" aria-label={t('provider.avg.distribution')}>
          {buckets
            .filter((b) => b.count > 0)
            .map((b) => (
              <div
                key={b.key}
                className={`text-ravg-seg text-ravg-tone-${b.tone}`}
                style={{ flexGrow: b.count }}
                title={`${t(`provider.avg.${b.key}`)}: ${b.count}`}
              />
            ))}
        </div>
        <div className="text-ravg-legend">
          {buckets.map(({ key, tone, pct, count }) => (
            <div className={`text-ravg-legend-item${count === 0 ? ' text-ravg-legend-empty' : ''}`} key={key}>
              <span className={`text-ravg-dot text-ravg-tone-${tone}`} />
              <span className="text-ravg-legend-label">{t(`provider.avg.${key}`)}</span>
              <span className="text-ravg-legend-val">
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
