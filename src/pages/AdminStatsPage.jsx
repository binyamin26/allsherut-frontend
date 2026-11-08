import { useState, useEffect } from 'react';
import apiService from '../services/api';

const PERIODS = [7, 30, 90];

const card = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 };
const th = { textAlign: 'left', padding: '6px 8px', fontWeight: 600, borderBottom: '1px solid #e5e7eb' };
const td = { padding: '6px 8px', borderBottom: '1px solid #f3f4f6' };

// Mini graphique en barres (SVG). series = [{date, <key>: n}]
const Bars = ({ series, k, color }) => {
  const max = Math.max(1, ...series.map(s => s[k]));
  const w = 100 / series.length;
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width: '100%', height: 120 }}>
      {series.map((s, i) => {
        const h = (s[k] / max) * 38;
        return (
          <rect key={s.date} x={i * w + w * 0.1} y={40 - h} width={w * 0.8} height={h} fill={color}>
            <title>{`${s.date} : ${s[k]}`}</title>
          </rect>
        );
      })}
    </svg>
  );
};

const Stat = ({ label, value }) => (
  <div style={card}>
    <div style={{ fontSize: 13, color: '#6b7280' }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
  </div>
);

const AdminStatsPage = () => {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    apiService.getAdminStats(days).then(res => {
      if (cancelled) return;
      if (res.success) { setData(res); setError(''); }
      else setError(res.message === 'Forbidden' ? 'Accès refusé : compte non admin.' : (res.message || 'Erreur'));
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [days]);

  const sum = (arr, k) => arr.reduce((a, s) => a + s[k], 0);

  return (
    <div dir="ltr" style={{ maxWidth: 1000, margin: '0 auto', padding: '100px 16px 40px', textAlign: 'left' }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Stats AllSherut (admin)</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {PERIODS.map(p => (
          <button key={p} onClick={() => setDays(p)}
            style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #d1d5db', cursor: 'pointer',
              background: days === p ? '#2563eb' : '#fff', color: days === p ? '#fff' : '#111' }}>
            {p} jours
          </button>
        ))}
      </div>

      {loading && <p>Chargement…</p>}
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      {data && !error && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            <Stat label="Leads aujourd'hui" value={data.totals.today} />
            <Stat label="Leads 7 jours" value={data.totals.last7} />
            <Stat label="Leads 30 jours" value={data.totals.last30} />
            <Stat label="Leads total" value={data.totals.allTime} />
            <Stat label="Appels / WhatsApp" value={`${data.totals.calls} / ${data.totals.whatsapp}`} />
            <Stat label="Avec n° client" value={data.totals.withPhone} />
          </div>

          <div style={{ ...card, marginTop: 16 }}>
            <b>Leads par jour</b> <span style={{ color: '#6b7280' }}>({sum(data.daily, 'total')} sur {days} jours)</span>
            <Bars series={data.daily} k="total" color="#2563eb" />
          </div>

          <div style={{ ...card, marginTop: 16 }}>
            <b>Nouveaux prestataires par jour</b> <span style={{ color: '#6b7280' }}>({sum(data.signups, 'providers')})</span>
            <Bars series={data.signups} k="providers" color="#16a34a" />
            <b>Nouveaux clients par jour</b> <span style={{ color: '#6b7280' }}>({sum(data.signups, 'clients')})</span>
            <Bars series={data.signups} k="clients" color="#f59e0b" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12, marginTop: 16 }}>
            <div style={card}>
              <b>Catégories les plus contactées ({days} j)</b>
              <table style={{ width: '100%', fontSize: 14, marginTop: 8, borderCollapse: 'collapse' }}>
                <tbody>
                  {data.byService.map(r => (
                    <tr key={r.service}><td style={td}>{r.service}</td><td style={{ ...td, textAlign: 'right' }}>{r.clicks}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={card}>
              <b>Prestataires les plus contactés ({days} j)</b>
              <table style={{ width: '100%', fontSize: 14, marginTop: 8, borderCollapse: 'collapse' }}>
                <tbody>
                  {data.topProviders.map(r => (
                    <tr key={r.id}>
                      <td style={td}>{r.name} <span style={{ color: '#6b7280' }}>· {r.service}</span></td>
                      <td style={{ ...td, textAlign: 'right' }}>{r.clicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ ...card, marginTop: 16 }}>
            <b>Profils</b>: {data.users.providers} comptes prestataires sur {data.users.total} utilisateurs ·{' '}
            {data.providerStatus.map(s => `${s.status}: ${s.n}`).join(' · ')}
          </div>

          <div style={{ ...card, marginTop: 16, overflowX: 'auto' }}>
            <b>25 derniers leads</b>
            <table style={{ width: '100%', fontSize: 13, marginTop: 8, borderCollapse: 'collapse' }}>
              <thead><tr><th style={th}>Date</th><th style={th}>Type</th><th style={th}>Prestataire</th><th style={th}>Catégorie</th><th style={th}>Tél. client</th></tr></thead>
              <tbody>
                {data.recent.map(r => (
                  <tr key={r.id}>
                    <td style={td}>{new Date(r.at).toLocaleString('fr-FR', { timeZone: 'Asia/Jerusalem' })}</td>
                    <td style={td}>{r.type}{r.source === 'recruitment' ? ' (recrut.)' : ''}</td>
                    <td style={td}>{r.provider || '—'}</td>
                    <td style={td}>{r.service || '—'}</td>
                    <td style={td}>{r.clientPhone || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminStatsPage;
