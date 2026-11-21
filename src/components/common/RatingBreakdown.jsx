import { Star, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './RatingBreakdown.css';

// Notes sur 10. Toutes les classes contiennent "text-" pour survivre à l'override de AccessibilityWidget.
const CRITERIA = [
  { key: 'quality', field: 'quality_rating' },
  { key: 'price', field: 'price_rating' },
  { key: 'availability', field: 'availability_rating' },
  { key: 'professionalism', field: 'professionalism_rating' },
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

const RatingBreakdown = ({ reviews }) => {
  const { t } = useLanguage();
  const ratings = (reviews || []).map((r) => toNum(r.rating)).filter((n) => n !== null);
  if (ratings.length === 0) return null;

  const total = ratings.length;
  const avg = average(ratings);
  const satisfied = Math.round((ratings.filter((n) => n >= 7).length / total) * 100);
  const labelKey = avg >= 9 ? 'excellent' : avg >= 8 ? 'veryGood' : avg >= 6.5 ? 'good' : 'average';

  const criteria = CRITERIA.map(({ key, field }) => ({
    key,
    value: average((reviews || []).map((r) => toNum(r[field])).filter((n) => n !== null)),
  })).filter((c) => c.value !== null);

  const buckets = BUCKETS.map((b) => {
    const count = ratings.filter((n) => n >= b.min && n <= b.max).length;
    return { ...b, count, pct: Math.round((count / total) * 100) };
  });

  return (
    <div className="text-ravg-card" dir="rtl">
      <div className="text-ravg-score-col">
        <div
          className="text-ravg-ring"
          style={{ background: `conic-gradient(#f59e0b ${(avg / 10) * 100}%, #e5e7eb 0)` }}
        >
          <div className="text-ravg-ring-inner">
            <span className="text-ravg-score">{avg.toFixed(1)}</span>
            <span className="text-ravg-outof">/ 10</span>
          </div>
        </div>
        <div className="text-ravg-label">{t(`provider.avg.${labelKey}`)}</div>
        <div className="text-ravg-based">{t('provider.avg.basedOn', { count: total })}</div>
        <div className="text-ravg-satisfied">
          <ThumbsUp size={14} />
          <span>{t('provider.avg.satisfied', { pct: satisfied })}</span>
        </div>
      </div>

      <div className="text-ravg-bars-col">
        {criteria.length > 0 && (
          <>
            <div className="text-ravg-subtitle">{t('provider.avg.byCriteria')}</div>
            {criteria.map(({ key, value }) => (
              <div className="text-ravg-row" key={key}>
                <span className="text-ravg-crit-label">{t(`review.categories.${key}`)}</span>
                <div className="text-ravg-track">
                  <div className="text-ravg-fill" style={{ width: `${value * 10}%` }} />
                </div>
                <span className="text-ravg-pct">
                  <Star size={11} fill="#f59e0b" color="#f59e0b" strokeWidth={0} /> {value.toFixed(1)}
                </span>
              </div>
            ))}
          </>
        )}

        <div className="text-ravg-subtitle text-ravg-subtitle-spaced">{t('provider.avg.distribution')}</div>
        {buckets.map(({ key, tone, pct, count }) => (
          <div className="text-ravg-row" key={key}>
            <span className="text-ravg-crit-label">{t(`provider.avg.${key}`)}</span>
            <div className="text-ravg-track">
              <div className={`text-ravg-fill text-ravg-tone-${tone}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-ravg-pct">{count} ({pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBreakdown;
