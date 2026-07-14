import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, MapPin, ChevronDown, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import JobListingCard from '../../components/recruitment/JobListingCard';
import LocationSelector from '../../components/LocationSelector';
import Reveal from '../../components/common/Reveal';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const DAY_ORDER     = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const HOUR_OPTIONS  = ['morning', 'afternoon', 'evening', 'all'];
const LANG_OPTIONS  = ['hebrew', 'arabic', 'english', 'french', 'russian'];
const EXP_OPTIONS   = ['beginner', '1_year', '2_years', '3_plus_years'];
const PAYMENT_TYPES = ['hourly', 'daily', 'monthly'];

const INPUT_STYLE = {
  width: '100%', padding: '0.6rem 0.9rem',
  border: '1.5px solid #d1d5db', borderRadius: '8px',
  fontSize: '0.95rem', outline: 'none', marginTop: '0.4rem',
  color: '#374151', background: 'white',
};

const SECTION_TITLE = { fontWeight: 700, color: '#111827', margin: '0 0 0.1rem' };

/* ── Chips : composant hors du parent pour éviter remount ── */
const Chips = ({ options, selected, onToggle, labelFn, multi = true }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem' }}>
    {options.map(o => {
      const active = multi ? selected.includes(o) : selected === o;
      return (
        <button key={o} onClick={() => onToggle(o)} style={{
          padding: '0.4rem 0.95rem', borderRadius: '20px',
          border: `1.5px solid ${active ? '#1A5490' : '#d1d5db'}`,
          background: active ? '#1A5490' : 'white',
          color: active ? 'white' : '#374151',
          fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer',
          transition: 'all 0.15s',
        }}>
          {labelFn(o)}
        </button>
      );
    })}
  </div>
);

/* ── Sidebar : composant hors du parent pour éviter remount ── */
const FilterSidebar = ({ open, title, onClose, onReset, applyLabel, clearLabel, children }) => {
  if (!open) return null;
  return (
    <>
      <div className="filter-overlay" onClick={onClose} />
      <div className="filter-sidebar">
        <div className="filter-sidebar-header">
          <h3 className="filter-sidebar-title">{title}</h3>
          <button className="filter-sidebar-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="filter-sidebar-content">{children}</div>
        <div className="filter-sidebar-footer">
          <button className="btn btn-secondary" onClick={() => { onReset(); onClose(); }}>{clearLabel}</button>
          <button className="btn btn-primary" onClick={onClose}>{applyLabel}</button>
        </div>
      </div>
    </>
  );
};

/* ════════════════════════════════════════ */

const RecruitmentServicePage = () => {
  const { service: rawService } = useParams();
  const service = rawService?.replace(/-/g, '_');
  const { t, isRTL } = useLanguage();

  const [listings, setListings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [total, setTotal]         = useState(0);
  const [openPanel, setOpenPanel] = useState(null);

  // Filtre localisation
  const [selectedLocation, setSelectedLocation] = useState({ city: '', neighborhood: '', fullLocation: '' });

  // Autres filtres
  const [salaryMax,     setSalaryMax]     = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [daysFilter,    setDaysFilter]    = useState([]);
  const [hoursFilter,   setHoursFilter]   = useState([]);
  const [langFilter,    setLangFilter]    = useState('');
  const [expFilter,     setExpFilter]     = useState('');

  useEffect(() => { if (service) loadListings(); }, [service]);

  const loadListings = async () => {
    setLoading(true); setError(null);
    try {
      const res  = await fetch(`${API_BASE}/recruitment/${service}?limit=50&page=1`);
      const data = await res.json();
      if (data.success) {
        setListings(data.data?.listings || []);
        setTotal(data.data?.total || 0);
      } else { setError(t('recruitment.loadError')); }
    } catch { setError(t('recruitment.loadError')); }
    finally  { setLoading(false); }
  };

  const toggleDay  = useCallback((d) => setDaysFilter(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d]), []);
  const toggleHour = useCallback((h) => setHoursFilter(p => p.includes(h) ? p.filter(x => x !== h) : [...p, h]), []);
  const togglePay  = useCallback((v) => setPaymentFilter(c => c === v ? '' : v), []);
  const toggleLang = useCallback((v) => setLangFilter(c => c === v ? '' : v), []);
  const toggleExp  = useCallback((v) => setExpFilter(c => c === v ? '' : v), []);

  const handleLocationChange = useCallback((loc) => setSelectedLocation(loc), []);

  const resetLocation = useCallback(() => setSelectedLocation({ city: '', neighborhood: '', fullLocation: '' }), []);
  const resetFilters  = useCallback(() => {
    setSalaryMax(''); setPaymentFilter('');
    setDaysFilter([]); setHoursFilter([]); setLangFilter(''); setExpFilter('');
  }, []);
  const resetAll = useCallback(() => { resetLocation(); resetFilters(); setOpenPanel(null); }, [resetLocation, resetFilters]);

  const closePanel = useCallback(() => setOpenPanel(null), []);

  const locationCount = selectedLocation.city ? 1 : 0;
  const filtersCount  = (salaryMax ? 1 : 0) + (paymentFilter ? 1 : 0) +
                        daysFilter.length + hoursFilter.length + (langFilter ? 1 : 0) + (expFilter ? 1 : 0);
  const totalActive   = locationCount + filtersCount;

  const filtered = listings.filter(l => {
    if (salaryMax                     && Number(l.salary) > Number(salaryMax))                 return false;
    if (selectedLocation.city         && l.location_city !== selectedLocation.city)            return false;
    if (selectedLocation.neighborhood && l.location_area !== selectedLocation.neighborhood)    return false;
    if (paymentFilter && l.payment_type !== paymentFilter)                                     return false;
    if (langFilter    && !(l.languages_required || []).includes(langFilter))                   return false;
    if (expFilter     && l.experience_required !== expFilter)                                  return false;
    if (daysFilter.length  && !daysFilter.every(d  => (l.availability_days  || []).includes(d)))  return false;
    if (hoursFilter.length && !hoursFilter.every(h =>
      (l.availability_hours || []).includes(h) || (l.availability_hours || []).includes('all')
    )) return false;
    return true;
  });

  const serviceLabel = t(`services.${service}`, service);

  /* Labels traduits passés aux composants externes */
  const applyLabel = t('filters.apply');
  const clearLabel = t('filters.clearAll');

  return (
    <div className="recruitment-page" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Breadcrumb */}
      <nav className="recruitment-breadcrumb">
        <Link to="/">{t('nav.home')}</Link>
        <span>/</span>
        <Link to="#">{t('nav.recruitment')}</Link>
        <span>/</span>
        <span className="breadcrumb-current">{serviceLabel}</span>
      </nav>

      {/* Hero */}
      <div className="recruitment-hero">
        <div className="recruitment-hero-inner">
          <Reveal as="div" onLoad delay={0} className="recruitment-hero-badge">{t('recruitment.pageTitle')}</Reveal>
          <Reveal as="span" onLoad delay={100} className="text-recruitment-service">{serviceLabel}</Reveal>
          <Reveal as="p" onLoad delay={200} className="recruitment-hero-subtitle">{t('recruitment.pageSubtitle')} {serviceLabel}</Reveal>
          {!loading && (
            <Reveal as="span" onLoad delay={300} className="recruitment-hero-count">
              {total} {t(total === 1 ? 'recruitment.listing_one' : 'recruitment.listing_other')}
            </Reveal>
          )}
        </div>
      </div>

      {/* Barre de filtres */}
      <div className="filter-bar">
        <div className="filter-bar-container" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>

          <button className={`filter-pill ${openPanel === 'location' ? 'active' : ''}`}
            onClick={() => setOpenPanel(p => p === 'location' ? null : 'location')}>
            <MapPin size={16} />
            <span className="filter-pill-text">{selectedLocation.city || t('filters.location')}</span>
            {locationCount > 0 && <span className="filter-pill-badge">{locationCount}</span>}
            <ChevronDown size={14} className="filter-pill-arrow" />
          </button>

          <button className={`filter-pill ${openPanel === 'filters' ? 'active' : ''}`}
            onClick={() => setOpenPanel(p => p === 'filters' ? null : 'filters')}>
            <SlidersHorizontal size={16} />
            <span className="filter-pill-text">{t('filters.advancedFilters')}</span>
            {filtersCount > 0 && <span className="filter-pill-badge">{filtersCount}</span>}
            <ChevronDown size={14} className="filter-pill-arrow" />
          </button>

          {totalActive > 0 && (
            <button className="filter-reset-btn" onClick={resetAll}>
              <X size={16} /><span>{t('filters.clearAll')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Localisation */}
      <FilterSidebar
        open={openPanel === 'location'}
        title={t('filters.selectLocation')}
        onClose={closePanel}
        onReset={resetLocation}
        applyLabel={applyLabel}
        clearLabel={clearLabel}
      >
        <div className="location-panel">
          <LocationSelector
            onLocationChange={handleLocationChange}
            initialCity={selectedLocation.city}
            initialNeighborhood={selectedLocation.neighborhood}
            className="location-selector-panel"
          />
        </div>
      </FilterSidebar>

      {/* Sidebar Filtres */}
      <FilterSidebar
        open={openPanel === 'filters'}
        title={t('filters.advancedFilters')}
        onClose={closePanel}
        onReset={resetFilters}
        applyLabel={applyLabel}
        clearLabel={clearLabel}
      >
        {/* Salaire */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={SECTION_TITLE}>{t('recruitment.card.salary')}</p>
          <input type="number" min={0} style={INPUT_STYLE}
            value={salaryMax} onChange={e => setSalaryMax(e.target.value)}
            placeholder="לדוגמה: 100 ₪" />
        </div>

        {/* Type de paiement */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={SECTION_TITLE}>{t('recruitment.paymentType')}</p>
          <Chips options={PAYMENT_TYPES} selected={paymentFilter} multi={false}
            onToggle={togglePay} labelFn={v => t(`recruitment.card.${v}`)} />
        </div>

        {/* Jours */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={SECTION_TITLE}>{t('recruitment.daysTitle')}</p>
          <Chips options={DAY_ORDER} selected={daysFilter} multi={true}
            onToggle={toggleDay} labelFn={v => t(`recruitment.day.${v}`, v)} />
        </div>

        {/* Heures */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={SECTION_TITLE}>{t('recruitment.hoursTitle')}</p>
          <Chips options={HOUR_OPTIONS} selected={hoursFilter} multi={true}
            onToggle={toggleHour} labelFn={v => t(`recruitment.hour.${v}`, v)} />
        </div>

        {/* Langues */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={SECTION_TITLE}>{t('recruitment.languages')}</p>
          <Chips options={LANG_OPTIONS} selected={langFilter} multi={false}
            onToggle={toggleLang} labelFn={v => t(`recruitment.lang.${v}`, v)} />
        </div>

        {/* Niveau d'expérience */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={SECTION_TITLE}>{t('recruitment.experienceRequired')}</p>
          <Chips options={EXP_OPTIONS} selected={expFilter} multi={false}
            onToggle={toggleExp} labelFn={v => t(`recruitment.exp${v === 'beginner' ? 'Beginner' : v === '1_year' ? '1year' : v === '2_years' ? '2years' : '3plus'}`, v)} />
        </div>
      </FilterSidebar>

      {/* Contenu */}
      <div className="recruitment-content">
        {loading && <div className="recruitment-loading"><div className="loading-spinner" /><p>{t('recruitment.loading')}</p></div>}
        {!loading && error && (
          <div className="recruitment-error">
            <p>{error}</p>
            <button className="recruitment-retry-btn" onClick={loadListings}>{t('recruitment.retry')}</button>
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="recruitment-empty">
            <div className="recruitment-empty-icon">📋</div>
            <p>{t('recruitment.noListings')}</p>
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className="job-listings-list">
            {filtered.map(listing => <JobListingCard key={listing.id} listing={listing} />)}
          </div>
        )}
      </div>

    </div>
  );
};

export default RecruitmentServicePage;
