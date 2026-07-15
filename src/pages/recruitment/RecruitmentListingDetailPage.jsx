import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FileText, Wallet, MapPin, Calendar, Clock, Award, Car, Languages, MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Reveal from '../../components/common/Reveal';
import CallLeadModal from '../../components/modals/CallLeadModal';
import apiService from '../../services/api';

const AVATAR_GRADIENTS = [
  'linear-gradient(145deg, #2563EB 0%, #1E3A8A 100%)',
  'linear-gradient(145deg, #0D9488 0%, #0F766E 100%)',
  'linear-gradient(145deg, #EA580C 0%, #C2410C 100%)',
  'linear-gradient(145deg, #7C3AED 0%, #5B21B6 100%)',
  'linear-gradient(145deg, #BE185D 0%, #9D174D 100%)',
  'linear-gradient(145deg, #0369A1 0%, #075985 100%)',
];

const getAvatarGradient = (name) => {
  if (!name) return AVATAR_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

const getInitial = (name) => (name ? (name.trim()[0] || '?').toUpperCase() : '?');

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const DAY_ORDER = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

const EXP_LABELS = {
  beginner:       'recruitment.card.expBeginner',
  '1_year':       'recruitment.card.exp1year',
  '2_years':      'recruitment.card.exp2years',
  '3_plus_years': 'recruitment.card.exp3plus',
};

const CONTRACT_LABELS = {
  full_time: 'recruitment.fullTime',
  part_time: 'recruitment.partTime',
  one_time:  'recruitment.oneTime',
};

const PAYMENT_LABELS = {
  hourly:  'recruitment.card.hourly',
  daily:   'recruitment.card.daily',
  monthly: 'recruitment.card.monthly',
};

/* ─ Mini card offres similaires ─ */
const SimilarCard = ({ listing, t, isRTL, onNavigate }) => {
  const serviceLabel  = t(`services.${listing.service_type}`, listing.service_type);
  const salaryDisplay = isRTL ? `₪${listing.salary}` : `${listing.salary} ₪`;
  const paymentLabel  = t(PAYMENT_LABELS[listing.payment_type] || '');
  const expLabel      = t(EXP_LABELS[listing.experience_required] || '');

  return (
    <div className="rdp-sim-card" onClick={onNavigate} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="rdp-sim-avatar" style={{ background: listing.profile_image ? undefined : getAvatarGradient(listing.full_name) }}>
        {listing.profile_image
          ? <img src={listing.profile_image} alt={listing.full_name} />
          : <span>{getInitial(listing.full_name)}</span>}
      </div>
      <h4 className="rdp-sim-title">{serviceLabel}</h4>
      <div className="rdp-sim-salary">
        <Wallet size={14} /> <strong>{salaryDisplay}</strong>
        {paymentLabel && <span className="rdp-sim-pay"> {paymentLabel}</span>}
      </div>
      {listing.location_city && <div className="rdp-sim-loc"><MapPin size={13} /> {listing.location_city}</div>}
      {expLabel && <span className="rdp-sim-exp">{expLabel}</span>}
      <div className="rdp-sim-action">{t('recruitment.card.viewOffer')}</div>
    </div>
  );
};

const RecruitmentListingDetailPage = () => {
  const { id }       = useParams();
  const { t, isRTL } = useLanguage();
  const navigate     = useNavigate();

  const [listing, setListing] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [callModal, setCallModal] = useState({ open: false, action: 'call' });

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/recruitment/listing/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setListing(data.data);
          fetch(`${API_BASE}/recruitment/${data.data.service_type}?limit=4`)
            .then(r2 => r2.json())
            .then(d2 => {
              if (d2.success)
                setSimilar((d2.data.listings || []).filter(l => l.id !== data.data.id).slice(0, 3));
            })
            .catch(() => {});
        } else {
          setError(t('recruitment.loadError'));
        }
      })
      .catch(() => setError(t('recruitment.loadError')))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="loading-spinner" />
    </div>
  );

  if (error || !listing) return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <p style={{ color: '#6b7280', marginBottom: '1rem' }}>{error || t('recruitment.loadError')}</p>
      <button
        onClick={() => navigate(-1)}
        style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', background: '#1A5490', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        {t('auth.back')}
      </button>
    </div>
  );

  /* ── Données calculées ── */
  const serviceSlug   = (listing.service_type || '').replace(/_/g, '-');
  const serviceLabel  = t(`services.${listing.service_type}`, listing.service_type);
  const salaryDisplay = isRTL ? `₪${listing.salary}` : `${listing.salary} ₪`;
  const paymentLabel  = t(PAYMENT_LABELS[listing.payment_type] || '');
  const expLabel      = t(EXP_LABELS[listing.experience_required] || '');
  const contractLabel = t(CONTRACT_LABELS[listing.contract_type] || '');

  const rawDays = listing.availability_days || [];
  let daysDisplay = '';
  if (rawDays.includes('all_week')) {
    daysDisplay = t('days.allWeek');
  } else {
    const sortedDays = [...rawDays].sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
    if (sortedDays.length === 1) {
      daysDisplay = t(`recruitment.day.${sortedDays[0]}`, sortedDays[0]);
    } else if (sortedDays.length > 1) {
      daysDisplay = `${t(`recruitment.day.${sortedDays[0]}`, sortedDays[0])} – ${t(`recruitment.day.${sortedDays[sortedDays.length - 1]}`, sortedDays[sortedDays.length - 1])}`;
    }
  }

  const hoursDisplay = (listing.availability_hours || []).includes('all')
    ? t('recruitment.hour.all')
    : (listing.availability_hours || []).map(h => t(`recruitment.hour.${h}`, h)).join(' / ');

  /* Phone / WhatsApp */
  const rawPhone = listing.phone || '';
  const telLink  = rawPhone ? `tel:${rawPhone}` : null;
  const waPhone  = rawPhone.startsWith('0') ? `972${rawPhone.slice(1)}` : rawPhone;
  const waLink   = rawPhone ? `https://wa.me/${waPhone}` : null;

  const memberSince = listing.created_at ? new Date(listing.created_at).getFullYear() : null;

  return (
    <div className="rdp-page" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Breadcrumb */}
      <nav className="recruitment-breadcrumb">
        <Link to="/">{t('nav.home')}</Link>
        <span>/</span>
        <Link to={`/recruitment/${serviceSlug}`}>{serviceLabel}</Link>
        <span>/</span>
        <span className="breadcrumb-current">{t('recruitment.detail.title')}</span>
      </nav>

      {/* ── HERO CARD ── */}
      <div className="rdp-hero-wrap">
        <div className="rdp-hero-card">

          <div className="rdp-hero-body">
            <Reveal as="h1" onLoad delay={0} direction="down" className="rdp-hero-title">{serviceLabel}</Reveal>
          </div>


        </div>
      </div>

      {/* ── LAYOUT 2 COLONNES ── */}
      <div className="rdp-layout">

        {/* Colonne gauche */}
        <div className="rdp-col-main">

          {/* Tous les champs du formulaire */}
          <div className="rdp-section">
            <h2 className="rdp-section-title">{t('recruitment.detail.jobDetails', 'פרטי המשרה')}</h2>
            <div className="rdp-details-grid">

              {contractLabel && (
                <div className="rdp-detail-row">
                  <span className="rdp-detail-icon"><FileText size={17} /></span>
                  <div className="rdp-detail-text">
                    <span className="rdp-detail-label">{t('recruitment.contractType')}</span>
                    <span className="rdp-detail-val">{contractLabel}</span>
                  </div>
                </div>
              )}

              {listing.salary && (
                <div className="rdp-detail-row">
                  <span className="rdp-detail-icon"><Wallet size={17} /></span>
                  <div className="rdp-detail-text">
                    <span className="rdp-detail-label">{t('recruitment.salary')}</span>
                    <span className="rdp-detail-val">
                      <strong>{salaryDisplay}</strong>
                      {paymentLabel && <span className="rdp-detail-sub"> · {paymentLabel}</span>}
                    </span>
                  </div>
                </div>
              )}

              {listing.location_city && (
                <div className="rdp-detail-row">
                  <span className="rdp-detail-icon"><MapPin size={17} /></span>
                  <div className="rdp-detail-text">
                    <span className="rdp-detail-label">{t('filters.location')}</span>
                    <span className="rdp-detail-val">
                      {listing.location_city}
                      {listing.location_area && listing.location_area !== 'כל העיר'
                        ? `, ${listing.location_area}`
                        : listing.location_area === 'כל העיר' ? ` (${t('dashboard.allCity', { city: '' }).trim()})` : ''}
                    </span>
                  </div>
                </div>
              )}

              {daysDisplay && (
                <div className="rdp-detail-row">
                  <span className="rdp-detail-icon"><Calendar size={17} /></span>
                  <div className="rdp-detail-text">
                    <span className="rdp-detail-label">{t('recruitment.daysTitle')}</span>
                    <span className="rdp-detail-val">{daysDisplay}</span>
                  </div>
                </div>
              )}

              {hoursDisplay && (
                <div className="rdp-detail-row">
                  <span className="rdp-detail-icon"><Clock size={17} /></span>
                  <div className="rdp-detail-text">
                    <span className="rdp-detail-label">{t('recruitment.hoursTitle')}</span>
                    <span className="rdp-detail-val">{hoursDisplay}</span>
                  </div>
                </div>
              )}

              {expLabel && (
                <div className="rdp-detail-row">
                  <span className="rdp-detail-icon"><Award size={17} /></span>
                  <div className="rdp-detail-text">
                    <span className="rdp-detail-label">{t('recruitment.experienceRequired')}</span>
                    <span className="rdp-detail-val">{expLabel}</span>
                  </div>
                </div>
              )}

              {!!listing.driving_license && (
                <div className="rdp-detail-row">
                  <span className="rdp-detail-icon"><Car size={17} /></span>
                  <div className="rdp-detail-text">
                    <span className="rdp-detail-label">{t('recruitment.drivingLicense')}</span>
                    <span className="rdp-detail-val">✓ {t('recruitment.detail.yes', 'כן')}</span>
                  </div>
                </div>
              )}

              {(listing.languages_required || []).length > 0 && (
                <div className="rdp-detail-row rdp-detail-row-chips">
                  <span className="rdp-detail-icon"><Languages size={17} /></span>
                  <span className="rdp-detail-label">{t('recruitment.detail.languages', 'שפות')}</span>
                  <div className="rdp-detail-chips">
                    {(listing.languages_required || []).map(l => (
                      <span key={l} className="rdp-req-chip">{t(`recruitment.lang.${l}`, l)}</span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {listing.description && (
            <div className="rdp-section">
              <h2 className="rdp-section-title">{t('recruitment.detail.description')}</h2>
              <p className="rdp-desc">{listing.description}</p>
            </div>
          )}

        </div>

        {/* Colonne droite — sticky */}
        <div className="rdp-col-side">
          <div className="rdp-recruiter-card">

            <div className="rdp-rec-avatar" style={{ background: listing.profile_image ? undefined : getAvatarGradient(listing.full_name) }}>
              {listing.profile_image
                ? <img src={listing.profile_image} alt={listing.full_name} />
                : <span className="text-rdp-av">{getInitial(listing.full_name)}</span>}
            </div>

            <div className="rdp-rec-info">
              <p className="rdp-rec-name">{listing.full_name}</p>
              <p className="rdp-rec-service">{serviceLabel}</p>
              {memberSince && (
                <p className="rdp-rec-since">
                  {t('recruitment.detail.memberSince', 'מגייס מאז')} {memberSince}
                </p>
              )}
            </div>

            {(telLink || waLink) && (
              <div className="rdp-rec-btns">
                {waLink && (
                  <button
                    type="button"
                    className="btn btn-success btn-full"
                    onClick={() => {
                      apiService.logContactClick(listing.provider_id, 'whatsapp', 'recruitment').catch(() => {});
                      setCallModal({ open: true, action: 'whatsapp' });
                    }}
                  >
                    <MessageCircle size={17} /> WhatsApp
                  </button>
                )}
                {telLink && (
                  <button
                    type="button"
                    className="btn btn-primary btn-full"
                    onClick={() => {
                      apiService.logContactClick(listing.provider_id, 'call', 'recruitment').catch(() => {});
                      setCallModal({ open: true, action: 'call' });
                    }}
                  >
                    <Phone size={17} /> {t('recruitment.detail.call')}
                  </button>
                )}
              </div>
            )}

          </div>
        </div>

      </div>

      {/* ── OFFRES SIMILAIRES ── */}
      {similar.length > 0 && (
        <div className="rdp-sim-section">
          <div className="rdp-sim-inner">
            <Reveal as="h2" direction="down" className="rdp-sim-heading">{t('recruitment.detail.similarOffers', 'מודעות דומות')}</Reveal>
            <div className="rdp-sim-grid">
              {similar.map((s, index) => (
                <Reveal as="div" key={s.id} delay={index * 100}>
                  <SimilarCard
                    listing={s}
                    t={t}
                    isRTL={isRTL}
                    onNavigate={() => navigate(`/recruitment/listing/${s.id}`)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── STICKY BAR MOBILE ── */}
      {(telLink || waLink) && (
        <div className="rdp-sticky-bar">
          {waLink && (
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                apiService.logContactClick(listing.provider_id, 'whatsapp', 'recruitment').catch(() => {});
                setCallModal({ open: true, action: 'whatsapp' });
              }}
            >
              <MessageCircle size={17} /> WhatsApp
            </button>
          )}
          {telLink && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                apiService.logContactClick(listing.provider_id, 'call', 'recruitment').catch(() => {});
                setCallModal({ open: true, action: 'call' });
              }}
            >
              <Phone size={17} /> {t('recruitment.detail.call')}
            </button>
          )}
        </div>
      )}

      <CallLeadModal
        isOpen={callModal.open}
        onClose={() => setCallModal({ open: false, action: 'call' })}
        providerPhone={rawPhone}
        providerName={listing.full_name}
        serviceName={`גיוס - ${serviceLabel}`}
        action={callModal.action}
      />

    </div>
  );
};

export default RecruitmentListingDetailPage;
