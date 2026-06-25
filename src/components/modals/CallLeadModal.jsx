import { useState } from 'react';
import { X, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import apiService from '../../services/api';

const CallLeadModal = ({ isOpen, onClose, providerPhone, providerName, serviceName, action }) => {
  const { t, isRTL } = useLanguage();
  const [clientPhone, setClientPhone] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setClientPhone('');
    setError('');
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

    apiService.followupWhatsApp(phone, '', providerName || '', serviceName || '').catch(() => {});

    reset();
    onClose();

    if (action === 'whatsapp') {
      const waNumber = `972${providerPhone?.replace(/^0/, '')}`;
      setTimeout(() => window.open(`https://wa.me/${waNumber}`, '_blank'), 100);
    } else {
      setTimeout(() => { window.location.href = `tel:${providerPhone}`; }, 100);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="modal-container review-modal" onClick={e => e.stopPropagation()}>

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

          <div className="input-group">
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
              }}
            />
            {error && (
              <p style={{ color: '#dc2626', fontSize: 13, margin: '4px 0 0' }}>{error}</p>
            )}
          </div>

          <div className="response-actions" style={{ marginTop: 24 }}>
            <button className="btn btn-primary" onClick={handleSubmit} style={{ minWidth: 120 }}>
              <Phone size={16} />
              {t('callLead.submit')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CallLeadModal;
