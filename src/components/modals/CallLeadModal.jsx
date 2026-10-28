import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import apiService from '../../services/api';
import { formatWhatsAppNumber } from '../../utils/phoneUtils';

const CallLeadModal = ({ isOpen, onClose, providerId, providerPhone, providerWhatsapp, providerName, serviceName, action, source = 'service' }) => {
  const { t, isRTL } = useLanguage();
  const [clientPhone, setClientPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [viewport, setViewport] = useState(null);

  // Mobile keyboard: size the overlay to the visible viewport so the modal isn't pushed off-screen
  useEffect(() => {
    if (!isOpen || !window.visualViewport) return undefined;
    const vv = window.visualViewport;
    const update = () => setViewport({ top: vv.offsetTop, height: vv.height });
    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
    };
  }, [isOpen]);

  const reset = () => {
    setClientPhone('');
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    const phone = clientPhone.trim();
    if (!phone) {
      setError(t('callLead.required'));
      return;
    }

    setLoading(true);
    if (providerId) {
      apiService.logContactClick(providerId, action, source, phone).catch(() => {});
    }
    apiService.followupWhatsApp(phone, '', providerName || '', serviceName || '', action, providerPhone || '').catch(() => {});

    reset();
    onClose();

    if (action === 'whatsapp') {
      const waNumber = formatWhatsAppNumber(providerWhatsapp || providerPhone);
      setTimeout(() => window.open(`https://wa.me/${waNumber}`, '_blank'), 100);
    } else {
      setTimeout(() => { window.location.href = `tel:${providerPhone}`; }, 100);
    }
  };

  if (!isOpen) return null;

  const modal = (
    <div
      className="modal-overlay"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={viewport ? { top: viewport.top, bottom: 'auto', height: viewport.height, alignItems: 'center', padding: 12 } : undefined}
    >
      <div
        className="modal-container review-modal"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '100%', borderRadius: 'var(--radius-2xl)', overflowY: 'auto' }}
      >

        <div className="modal-header">
          <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Phone size={18} />
            {t('callLead.title')}
          </h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <p style={{ marginBottom: 20, color: 'var(--neutral-600)', lineHeight: 1.6 }}>
            {t('callLead.message')}
          </p>

          <input
            type="tel"
            value={clientPhone}
            onChange={e => { setClientPhone(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder={t('callLead.phonePlaceholder')}
            dir="ltr"
            autoFocus
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `2px solid ${error ? '#dc2626' : 'var(--neutral-200)'}`,
              borderRadius: 'var(--radius-xl)',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-primary)',
              outline: 'none',
              boxSizing: 'border-box',
              background: 'white',
            }}
          />
          {error && (
            <p style={{ color: '#dc2626', fontSize: 13, margin: '6px 0 0' }}>{error}</p>
          )}

          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
              style={{ minWidth: 140 }}
            >
              <Phone size={16} />
              {t('callLead.submit')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default CallLeadModal;
