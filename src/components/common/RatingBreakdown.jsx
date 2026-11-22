import { Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './RatingBreakdown.css';

// Notes sur 10. Toutes les classes contiennent "text-" pour survivre à l'override de AccessibilityWidget.
const CRITERIA = [
  { key: 'quality', field: 'quality_rating' },
  { key: 'price', field: 'price_rating' },
  { key: 'availability', field: 'availability_rating' },
  { key: 'professionalism', field: 'professionalism_rating' },
];

// Répartition façon Amazon/Trustpilot : 5 paliers (2 points chacun), du meilleur au plus bas.
const BANDS = [
  { label: '9–10', min: 9, max: 10, tone: 'good' },
  { label: '7–8', min: 7, max: 8.99, tone: 'mid' },
  { label: '5–6', min: 5, max: 6.99, tone: 'bad' },
  { label: '3–4', min: 3, max: 4.99, tone: 'bad' },
  { label: '1–2', min: 0, max: 2.99, tone: 'bad' },
];

const MIN_RELIABLE = 3; // en dessous, on signale que la note est provisoire

const average = (nums) => (nums.length ? nums.reduce((s, n) => s + n, 0) / nums.length : null);
const toNum = (v) => {
  const n = parseFloat(v);
  return isNaN(n) || n <= 0 ? null : n;
};
// Un arrondi ne doit jamais afficher "10" si la moyenne réelle est inférieure à 10.
const fmt = (n) => {
  const r = Math.round(n * 10) / 10;
  return String(r >= 10 && n < 10 ? 9.9 : r);
};

const RatingBreakdown = ({ reviews }) => {
  const { t } = useLanguage();
  const list = reviews || [];
  const ratings = list.map((r) => toNum(r.rating)).filter((n) => n !== null);
  if (ratings.length === 0) return null;

  const total = ratings.length;
  const avg = average(ratings);
  const labelKey = avg >= 9 ? 'excellent' : avg >= 8 ? 'veryGood' : avg >= 6.5 ? 'good' : 'average';
  const filledStars = avg / 2; // 10 → 5 étoiles
  const satisfiedPct = Math.round((ratings.filter((n) => n >= 9).length / total) * 100);

  const criteria = CRITERIA.map(({ key, field }) => ({
    key,
    value: average(list.map((r) => toNum(r[field])).filter((n) => n !== null)),
  })).filter((c) => c.value !== null);

  const bands = BANDS.map((b) => {
    const count = ratings.filter((n) => n >= b.min && n <= b.max).length;
    return { ...b, count, pct: Math.round((count / total) * 100) };
  });

  return (
    <div className="text-ravg-card">
      <h3 className="text-ravg-title">{t('provider.avg.title')}</h3>

      <div className="text-ravg-body">
        <div className="text-ravg-hero">
          <div className="text-ravg-ring" style={{ '--ravg-pct': `${(avg / 10) * 100}%` }}>
            <div className="text-ravg-ring-inner">
              <span className="text-ravg-score">{fmt(avg)}</span>
              <span className="text-ravg-outof">/10</span>
            </div>
          </div>
          <div className="text-ravg-stars" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => {
              const fill = Math.max(0, Math.min(1, filledStars - i));
              return (
                <span className="text-ravg-star" key={i}>
                  <Star size={22} color="#e2e8f0" fill="#e2e8f0" strokeWidth={0} />
                  <span className="text-ravg-star-fill" style={{ width: `${fill * 100}%` }}>
                    <Star size={22} color="#f5b301" fill="#f5b301" strokeWidth={0} />
                  </span>
                </span>
              );
            })}
          </div>
          <div className="text-ravg-label">{t(`provider.avg.${labelKey}`)}</div>
          <div className="text-ravg-based">{t('provider.avg.basedOn', { count: total })}</div>
          {total < MIN_RELIABLE && <div className="text-ravg-note">{t('provider.avg.fewReviews')}</div>}
        </div>

        <div className="text-ravg-dist">
          <div className="text-ravg-subtitle">{t('provider.avg.distribution')}</div>
          <div className="text-ravg-rows">
            {bands.map(({ label, pct, count, tone }) => (
              <div className={`text-ravg-row${count === 0 ? ' text-ravg-row-empty' : ''}`} key={label}>
                <span className="text-ravg-row-label">{label}</span>
                <div className="text-ravg-track">
                  <div className={`text-ravg-fill text-ravg-tone-${tone}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-ravg-row-val">{pct}%</span>
              </div>
            ))}
          </div>
          {satisfiedPct > 0 && (
            <div className="text-ravg-satisfied">{t('provider.avg.satisfied', { pct: satisfiedPct })}</div>
          )}
        </div>
      </div>

      {criteria.length > 0 && (
        <div className="text-ravg-criteria">
          <div className="text-ravg-subtitle">{t('provider.avg.byCriteria')}</div>
          <div className="text-ravg-crit-grid">
            {criteria.map(({ key, value }) => (
              <div className="text-ravg-crit" key={key}>
                <div className="text-ravg-crit-head">
                  <span className="text-ravg-crit-name">{t(`review.categories.${key}`)}</span>
                  <span className="text-ravg-crit-score">{fmt(value)}</span>
                </div>
                <div className="text-ravg-track text-ravg-track-thin">
                  <div className="text-ravg-fill" style={{ width: `${value * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingBreakdown;
