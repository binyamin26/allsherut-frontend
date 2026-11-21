import { Star, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './RatingBreakdown.css';

// NB: toutes les classes contiennent "text-" pour survivre à l'override de AccessibilityWidget.
const RatingBreakdown = ({ reviews }) => {
  const { t } = useLanguage();
  const ratings = (reviews || [])
    .map((r) => parseFloat(r.rating))
    .filter((n) => !isNaN(n) && n >= 1 && n <= 5);
  if (ratings.length === 0) return null;

  const total = ratings.length;
  const avg = ratings.reduce((s, n) => s + n, 0) / total;
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: ratings.filter((n) => Math.round(n) === star).length,
  }));
  const satisfied = Math.round((counts[0].count + counts[1].count) / total * 100);

  const labelKey =
    avg >= 4.5 ? 'excellent' : avg >= 4 ? 'veryGood' : avg >= 3 ? 'good' : 'average';
  const ringPct = (avg / 5) * 100;

  return (
    <div className="text-ravg-card" dir="rtl">
      <div className="text-ravg-score-col">
        <div
          className="text-ravg-ring"
          style={{ background: `conic-gradient(#f59e0b ${ringPct}%, #e5e7eb 0)` }}
        >
          <div className="text-ravg-ring-inner">
            <span className="text-ravg-score">{avg.toFixed(1)}</span>
            <span className="text-ravg-outof">/ 5</span>
          </div>
        </div>
        <div className="text-ravg-label">{t(`provider.avg.${labelKey}`)}</div>
        <div className="text-ravg-based">{t('provider.avg.basedOn', { count: total })}</div>
      </div>

      <div className="text-ravg-bars-col">
        <div className="text-ravg-satisfied">
          <ThumbsUp size={16} />
          <span>{t('provider.avg.satisfied', { pct: satisfied })}</span>
        </div>
        {counts.map(({ star, count }) => {
          const pct = Math.round((count / total) * 100);
          return (
            <div className="text-ravg-row" key={star}>
              <span className="text-ravg-star-label">
                {star} <Star size={12} fill="#f59e0b" color="#f59e0b" strokeWidth={0} />
              </span>
              <div className="text-ravg-track">
                <div className="text-ravg-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-ravg-pct">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingBreakdown;
