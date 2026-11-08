import { useState, useEffect, useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, Download, RefreshCw, Phone, MessageCircle } from 'lucide-react';
import apiService from '../services/api';
import { formatWhatsAppNumber } from '../utils/phoneUtils';
import fr from '../locales/fr/translation.json';
import '../styles/pages/admin-stats.css';

const PERIODS = [7, 30, 90];
const SERIES_CALLS = { key: 'calls', label: 'Appels', color: 'var(--s1)' };
const SERIES_WA = { key: 'whatsapp', label: 'WhatsApp', color: 'var(--s2)' };
const SERIES_PROV = { key: 'providers', label: 'Prestataires', color: 'var(--s1)' };
const SERIES_CLI = { key: 'clients', label: 'Clients', color: 'var(--s2)' };
const STATUS = {
  verified: { label: 'Vérifiés', color: '#0ca30c' },
  pending: { label: 'En attente', color: '#fab219' },
  rejected: { label: 'Rejetés', color: '#d03b3b' }
};

const nf = (n) => Number(n || 0).toLocaleString('fr-FR');
const sum = (arr, k) => arr.reduce((a, s) => a + s[k], 0);
const fmtDay = (d) => new Date(`${d}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
const serviceLabel = (slug) =>
  fr[`services.${slug}`] || String(slug || '—').replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());

function relTime(at) {
  const diff = (Date.now() - new Date(at).getTime()) / 1000;
  if (diff < 60) return "à l'instant";
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
  if (diff < 86400 * 7) return `il y a ${Math.floor(diff / 86400)} j`;
  return new Date(at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Graduations "propres" : 0..top en 4 intervalles (ou 2 si très petit)
function niceScale(max) {
  if (max <= 2) return { top: 2, ticks: [0, 1, 2] };
  const raw = max / 4;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 5, 10].map((m) => m * pow).find((s) => s >= raw);
  return { top: step * 4, ticks: [0, 1, 2, 3, 4].map((i) => i * step) };
}

const Delta = ({ cur, prev, days }) => {
  let dir = 'flat';
  let text = '—';
  if (prev > 0) {
    const pct = Math.round(((cur - prev) / prev) * 100);
    dir = pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat';
    text = `${pct > 0 ? '+' : ''}${pct} %`;
  } else if (cur > 0) {
    dir = 'up';
    text = 'Nouveau';
  }
  const Icon = dir === 'up' ? ArrowUpRight : dir === 'down' ? ArrowDownRight : Minus;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      <span className={`text-ui-delta is-${dir}`}><Icon size={14} />{text}</span>
      <span className="text-ui-small">vs {days} j précédents</span>
    </div>
  );
};

const Kpi = ({ label, value, children, hero }) => (
  <div className={`as-card as-kpi${hero ? ' as-kpi-hero' : ''}`}>
    <div className="text-ui-label">{label}</div>
    <div className={hero ? 'text-ui-hero' : 'text-ui-kpi'}>{value}</div>
    {children}
  </div>
);

const Legend = ({ items }) => (
  <div className="as-legend">
    {items.map((s) => (
      <span key={s.key} className="as-legend-item text-ui-small">
        <i className="as-dot" style={{ background: s.color }} />{s.label}
      </span>
    ))}
  </div>
);

// Colonnes empilées (SVG-free) avec infobulle au survol
const StackedColumns = ({ data, series, label }) => {
  const [hover, setHover] = useState(null);
  const totals = data.map((d) => series.reduce((a, s) => a + d[s.key], 0));
  const { top, ticks } = niceScale(Math.max(0, ...totals));
  const n = data.length;
  const allZero = totals.every((t) => t === 0);
  const tipLeft = hover === null ? 0 : Math.min(Math.max(((hover + 0.5) / n) * 100, 14), 86);

  return (
    <div className="as-chart" role="img" aria-label={label}>
      <div className="as-yaxis">
        {ticks.map((v) => (
          <span key={v} className="as-ytick text-ui-muted" style={{ bottom: `${(v / top) * 100}%` }}>{nf(v)}</span>
        ))}
      </div>
      <div className="as-plot" onMouseLeave={() => setHover(null)}>
        {ticks.slice(1).map((v) => (
          <div key={v} className="as-gridline" style={{ bottom: `${(v / top) * 100}%` }} />
        ))}
        <div className="as-cols">
          {data.map((d, i) => {
            const active = series.filter((s) => d[s.key] > 0);
            const topKey = active.length ? active[active.length - 1].key : null;
            return (
              <div key={d.date} className={`as-col${hover === i ? ' is-hover' : ''}`}
                onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} tabIndex={0}
                aria-label={`${fmtDay(d.date)} : ${series.map((s) => `${d[s.key]} ${s.label}`).join(', ')}`}>
                <div className="as-stack" style={{ height: `${(totals[i] / top) * 100}%` }}>
                  {series.map((s) => d[s.key] > 0 && (
                    <div key={s.key} className={`as-seg-bar${s.key === topKey ? ' top' : ''}`}
                      style={{ background: s.color, height: `${(d[s.key] / totals[i]) * 100}%` }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {allZero && <div className="as-empty text-ui-muted">Aucune donnée sur cette période</div>}
        {hover !== null && !allZero && (
          <div className="as-tip" style={{ left: `${tipLeft}%`, top: `calc(${(1 - totals[hover] / top) * 100}% - 8px)` }}>
            <div className="text-ui-tip as-tip-date"><span className="text-ui-tip">{fmtDay(data[hover].date)}</span></div>
            {series.map((s) => (
              <div key={s.key} className="text-ui-tip">
                <span className="text-ui-tip"><i className="as-dot" style={{ background: s.color, marginRight: 6 }} />{s.label}</span>
                <b className="text-ui-tip">{data[hover][s.key]}</b>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="as-xaxis">
        <span className="text-ui-muted">{fmtDay(data[0].date)}</span>
        <span className="text-ui-muted">{fmtDay(data[Math.floor((n - 1) / 2)].date)}</span>
        <span className="text-ui-muted">{fmtDay(data[n - 1].date)}</span>
      </div>
    </div>
  );
};

const DailyTable = ({ data, series }) => (
  <div className="as-table-wrap" style={{ maxHeight: 220, overflowY: 'auto' }}>
    <table className="as-table" style={{ minWidth: 0 }}>
      <thead><tr><th className="text-ui-head">Jour</th>{series.map((s) => <th key={s.key} className="text-ui-head">{s.label}</th>)}</tr></thead>
      <tbody>
        {[...data].reverse().map((d) => (
          <tr key={d.date}>
            <td className="text-ui-cell">{fmtDay(d.date)}</td>
            {series.map((s) => <td key={s.key} className="text-ui-cell">{d[s.key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const HBars = ({ rows, empty }) => {
  const max = Math.max(1, ...rows.map((r) => r.value));
  if (!rows.length) return <div className="text-ui-muted">{empty}</div>;
  return (
    <div className="as-rows">
      {rows.map((r) => (
        <div key={r.key} className="as-row">
          <span className="as-row-name text-ui-body" title={r.name}>{r.name}</span>
          <div className="as-track"><div className="as-fill" style={{ width: `${(r.value / max) * 100}%` }} /></div>
          <span className="as-row-val text-ui-body">{nf(r.value)}</span>
        </div>
      ))}
    </div>
  );
};

const phoneHref = (p) => `tel:${String(p).replace(/[^\d+]/g, '')}`;

function exportCsv(rows) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const head = ['Date', 'Type', 'Source', 'Prestataire', 'Catégorie', 'Téléphone client'];
  const lines = rows.map((r) => [
    new Date(r.at).toLocaleString('fr-FR', { timeZone: 'Asia/Jerusalem' }),
    r.type === 'call' ? 'Appel' : 'WhatsApp',
    r.source === 'recruitment' ? 'Recrutement' : 'Service',
    r.provider || '', serviceLabel(r.service), r.clientPhone || ''
  ].map(esc).join(';'));
  const blob = new Blob(['﻿' + [head.map(esc).join(';'), ...lines].join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `leads-allsherut-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

const LeadsTable = ({ recent }) => {
  const [type, setType] = useState('all');
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(15);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return recent.filter((r) =>
      (type === 'all' || r.type === type) &&
      (!needle || [r.provider, r.clientPhone, serviceLabel(r.service)].some((v) => String(v || '').toLowerCase().includes(needle)))
    );
  }, [recent, type, q]);

  const chips = [['all', 'Tous'], ['call', 'Appels'], ['whatsapp', 'WhatsApp']];
  return (
    <div className="as-card" style={{ marginTop: 14 }}>
      <div className="as-card-head">
        <div>
          <div className="text-ui-card-title">Derniers leads</div>
          <div className="text-ui-small">{nf(rows.length)} résultat{rows.length > 1 ? 's' : ''} · les 200 plus récents</div>
        </div>
        <div className="as-filters">
          {chips.map(([k, l]) => (
            <button key={k} className="as-chip text-ui-btn" aria-pressed={type === k} onClick={() => { setType(k); setShown(15); }}>{l}</button>
          ))}
          <input className="as-search text-ui-body" placeholder="Rechercher (nom, tél., catégorie)" value={q}
            onChange={(e) => { setQ(e.target.value); setShown(15); }} aria-label="Rechercher un lead" />
          <button className="as-btn text-ui-btn" onClick={() => exportCsv(rows)} disabled={!rows.length}>
            <Download size={14} />Exporter CSV
          </button>
        </div>
      </div>
      <div className="as-table-wrap">
        <table className="as-table">
          <thead>
            <tr>
              <th className="text-ui-head">Date</th><th className="text-ui-head">Type</th><th className="text-ui-head">Prestataire</th>
              <th className="text-ui-head">Catégorie</th><th className="text-ui-head">Client</th><th className="text-ui-head" />
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, shown).map((r) => (
              <tr key={r.id}>
                <td className="text-ui-cell" title={new Date(r.at).toLocaleString('fr-FR', { timeZone: 'Asia/Jerusalem' })}>{relTime(r.at)}</td>
                <td className="text-ui-cell">
                  <span className="as-badge text-ui-small">
                    {r.type === 'call' ? <Phone size={12} /> : <MessageCircle size={12} />}
                    {r.type === 'call' ? 'Appel' : 'WhatsApp'}{r.source === 'recruitment' ? ' · recrutement' : ''}
                  </span>
                </td>
                <td className="text-ui-cell">{r.provider || '—'}</td>
                <td className="text-ui-cell">{serviceLabel(r.service)}</td>
                <td className="text-ui-cell">
                  {r.clientPhone ? <a className="as-link text-ui-cell" href={phoneHref(r.clientPhone)}>{r.clientPhone}</a> : <span className="text-ui-muted">non renseigné</span>}
                </td>
                <td className="text-ui-cell">
                  {r.clientPhone && (
                    <a className="as-link text-ui-small" target="_blank" rel="noopener noreferrer"
                      href={`https://wa.me/${formatWhatsAppNumber(r.clientPhone)}`}>Relancer</a>
                  )}
                </td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={6} className="text-ui-muted" style={{ padding: 24, textAlign: 'center' }}>Aucun lead ne correspond.</td></tr>}
          </tbody>
        </table>
      </div>
      {rows.length > shown && (
        <div className="as-more"><button className="as-btn text-ui-btn" onClick={() => setShown((s) => s + 25)}>Afficher plus</button></div>
      )}
    </div>
  );
};

const AdminStatsPage = () => {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [tableView, setTableView] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    apiService.getAdminStats(days).then((res) => {
      if (cancelled) return;
      if (res.success) { setData(res); setError(''); }
      else setError(res.message === 'Forbidden' ? 'Accès refusé : ce compte n’est pas administrateur.' : (res.message || 'Erreur de chargement'));
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [days, reload]);

  const periodLeads = data ? sum(data.daily, 'total') : 0;
  const periodCalls = data ? sum(data.daily, 'calls') : 0;
  const periodWa = data ? sum(data.daily, 'whatsapp') : 0;
  const newProv = data ? sum(data.signups, 'providers') : 0;
  const newCli = data ? sum(data.signups, 'clients') : 0;
  const pct = (v, t) => (t ? Math.round((v / t) * 100) : 0);

  return (
    <div className="as-page">
      <div className="as-wrap">
        <div className="as-head">
          <div>
            <div className="text-ui-title">Tableau de bord</div>
            <div className="text-ui-sub">Leads, croissance et activité d’AllSherut</div>
          </div>
          <div className="as-tools">
            <div className="as-seg" role="group" aria-label="Période">
              {PERIODS.map((p) => (
                <button key={p} className="text-ui-btn" aria-pressed={days === p} onClick={() => setDays(p)}>{p} jours</button>
              ))}
            </div>
            <button className="as-btn text-ui-btn" onClick={() => setReload((r) => r + 1)} aria-label="Actualiser">
              <RefreshCw size={14} />Actualiser
            </button>
          </div>
        </div>

        {error && <div className="as-error text-ui-body">{error}</div>}

        {loading && !data && !error && (
          <div className="as-grid as-kpis">{[0, 1, 2, 3].map((i) => <div key={i} className="as-skel" />)}</div>
        )}

        {data && !error && (
          <div style={{ opacity: loading ? 0.6 : 1, transition: 'opacity .15s' }}>
            <div className="as-grid as-kpis">
              <Kpi hero label={`Leads · ${days} derniers jours`} value={nf(periodLeads)}>
                <Delta cur={periodLeads} prev={data.previous.leads} days={days} />
              </Kpi>
              <Kpi label="Clients uniques" value={nf(data.uniqueClients)}>
                <span className="text-ui-small">téléphones distincts</span>
              </Kpi>
              <Kpi label="Nouveaux prestataires" value={nf(newProv)}>
                <Delta cur={newProv} prev={data.previous.providers} days={days} />
              </Kpi>
              <Kpi label="Nouveaux clients" value={nf(newCli)}>
                <Delta cur={newCli} prev={data.previous.clients} days={days} />
              </Kpi>
            </div>

            <div className="as-grid as-two">
              <div className="as-card">
                <div className="as-card-head">
                  <div>
                    <div className="text-ui-card-title">Leads par jour</div>
                    <div className="text-ui-small">Contacts générés vers les prestataires</div>
                  </div>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Legend items={[SERIES_CALLS, SERIES_WA]} />
                    <button className="as-btn text-ui-btn" onClick={() => setTableView((v) => !v)}>
                      {tableView ? 'Voir le graphique' : 'Voir le tableau'}
                    </button>
                  </div>
                </div>
                {tableView
                  ? <DailyTable data={data.daily} series={[SERIES_CALLS, SERIES_WA]} />
                  : <StackedColumns data={data.daily} series={[SERIES_CALLS, SERIES_WA]} label={`Leads par jour sur ${days} jours`} />}
              </div>

              <div className="as-card">
                <div className="text-ui-card-title">Répartition</div>
                <div className="text-ui-small" style={{ marginBottom: 14 }}>Sur {days} jours</div>
                <div className="as-segbar" aria-hidden="true">
                  <span style={{ width: `${pct(periodCalls, periodLeads)}%`, background: 'var(--s1)' }} />
                  <span style={{ width: `${pct(periodWa, periodLeads)}%`, background: 'var(--s2)' }} />
                </div>
                <div className="as-stat-list">
                  <div className="as-stat-line"><span className="text-ui-body"><i className="as-dot" style={{ background: 'var(--s1)', marginRight: 8 }} />Appels</span><b className="text-ui-body">{nf(periodCalls)} · {pct(periodCalls, periodLeads)} %</b></div>
                  <div className="as-stat-line"><span className="text-ui-body"><i className="as-dot" style={{ background: 'var(--s2)', marginRight: 8 }} />WhatsApp</span><b className="text-ui-body">{nf(periodWa)} · {pct(periodWa, periodLeads)} %</b></div>
                  <div className="as-stat-line"><span className="text-ui-small">Aujourd’hui</span><b className="text-ui-body">{nf(data.totals.today)}</b></div>
                  <div className="as-stat-line"><span className="text-ui-small">7 derniers jours</span><b className="text-ui-body">{nf(data.totals.last7)}</b></div>
                  <div className="as-stat-line"><span className="text-ui-small">30 derniers jours</span><b className="text-ui-body">{nf(data.totals.last30)}</b></div>
                  <div className="as-stat-line"><span className="text-ui-small">Depuis le début</span><b className="text-ui-body">{nf(data.totals.allTime)}</b></div>
                  <div className="as-stat-line"><span className="text-ui-small">Avec n° client</span><b className="text-ui-body">{nf(data.totals.withPhone)} · {pct(data.totals.withPhone, data.totals.allTime)} %</b></div>
                </div>
              </div>
            </div>

            <div className="as-grid as-two-eq">
              <div className="as-card">
                <div className="text-ui-card-title">Catégories les plus contactées</div>
                <div className="text-ui-small" style={{ marginBottom: 14 }}>Leads sur {days} jours</div>
                <HBars empty="Aucun lead sur cette période"
                  rows={data.byService.map((r) => ({ key: r.service, name: serviceLabel(r.service), value: r.clicks }))} />
              </div>
              <div className="as-card">
                <div className="text-ui-card-title">Prestataires les plus contactés</div>
                <div className="text-ui-small" style={{ marginBottom: 6 }}>Leads sur {days} jours</div>
                {data.topProviders.length === 0 && <div className="text-ui-muted">Aucun lead sur cette période</div>}
                {data.topProviders.map((r, i) => (
                  <div key={r.id} className="as-rank">
                    <span className="as-rank-n text-ui-small">{i + 1}</span>
                    <div>
                      <div className="text-ui-body">{r.name}</div>
                      <div className="text-ui-muted">{serviceLabel(r.service)}</div>
                    </div>
                    <b className="text-ui-body">{nf(r.clicks)}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="as-grid as-two">
              <div className="as-card">
                <div className="as-card-head">
                  <div>
                    <div className="text-ui-card-title">Inscriptions par jour</div>
                    <div className="text-ui-small">Nouveaux comptes sur {days} jours</div>
                  </div>
                  <Legend items={[SERIES_PROV, SERIES_CLI]} />
                </div>
                <StackedColumns data={data.signups} series={[SERIES_PROV, SERIES_CLI]} label={`Inscriptions par jour sur ${days} jours`} />
              </div>
              <div className="as-card">
                <div className="text-ui-card-title">Prestataires</div>
                <div className="text-ui-small">{nf(data.users.providers)} comptes · {nf(data.users.total)} utilisateurs</div>
                <div className="as-stat-list">
                  {data.providerStatus.map((s) => (
                    <div key={s.status} className="as-stat-line">
                      <span className="text-ui-body"><i className="as-dot" style={{ background: (STATUS[s.status] || {}).color || 'var(--ink-3)', marginRight: 8 }} />{(STATUS[s.status] || {}).label || s.status}</span>
                      <b className="text-ui-body">{nf(s.n)}</b>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <LeadsTable recent={data.recent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStatsPage;
