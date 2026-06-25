import { useState } from 'react';
import { X, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import apiService from '../../services/api';

const CallLeadModal = ({ isOpen, onClose, providerPhone, providerName, serviceName, action }) => {
  const { t, isRTL } = useLanguage();
  const [clientPhone, setClientPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      <div className="modal-container" style={{ maxWidth: 400 }}>
        <div className="modal-header">
          <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Phone size={20} />
            {t('callLead.title')}
          </h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <p style={{ marginBottom: 20, color: '#374151', lineHeight: 1.6 }}>
            {t('callLead.message')}
          </p>

          <div className="input-group">
            <input
              type="tel"
              value={clientPhone}
              onChange={e => { setClientPhone(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder={t('callLead.phonePlaceholder')}
              className="form-input"
              dir="ltr"
              autoFocus
            />
            {error && (
              <p style={{ color: '#dc2626', fontSize: 13, marginTop: 6 }}>{error}</p>
            )}
          </div>

          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
              style={{ minWidth: 120 }}
            >
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
