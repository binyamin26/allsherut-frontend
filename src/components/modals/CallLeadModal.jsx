import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Phone, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import apiService from '../../services/api';

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '2px solid var(--neutral-200)',
  borderRadius: 'var(--radius-xl)',
  fontSize: 'var(--text-base)',
  fontFamily: 'var(--font-primary)',
  outline: 'none',
  boxSizing: 'border-box',
  background: 'white',
};

const inputErrorStyle = { ...inputStyle, border: '2px solid #dc2626' };

const CallLeadModal = ({ isOpen, onClose, providerPhone, providerName, serviceName, action }) => {
  const { t, isRTL } = useLanguage();
  const [step, setStep] = useState(1); // 1 = phone entry, 2 = OTP
  const [clientPhone, setClientPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setStep(1);
    setClientPhone('');
    setOtp('');
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSendOtp = async () => {
    const phone = clientPhone.trim();
    if (!phone) { setError(t('callLead.required')); return; }

    setLoading(true);
    setError('');
    try {
      const res = await apiService.sendOtp(phone);
      if (res.success) {
        setStep(2);
      } else {
        setError(t('callLead.invalidCode'));
      }
    } catch {
      setError(t('callLead.invalidCode'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const code = otp.trim();
    if (!code) { setError(t('callLead.invalidCode')); return; }

    setLoading(true);
    setError('');
    try {
      const res = await apiService.verifyOtp(clientPhone.trim(), code);
      if (res.success) {
        apiService.followupWhatsApp(clientPhone.trim(), '', providerName || '', serviceName || '').catch(() => {});
        reset();
        onClose();
        if (action === 'whatsapp') {
          const waNumber = `972${providerPhone?.replace(/^0/, '')}`;
          setTimeout(() => window.open(`https://wa.me/${waNumber}`, '_blank'), 100);
        } else {
          setTimeout(() => { window.location.href = `tel:${providerPhone}`; }, 100);
        }
      } else {
        setError(t('callLead.invalidCode'));
      }
    } catch {
      setError(t('callLead.invalidCode'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const modal = (
    <div className="modal-overlay" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="modal-container review-modal" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {step === 1 ? <Phone size={18} /> : <Shield size={18} />}
            {step === 1 ? t('callLead.title') : t('callLead.otpTitle')}
          </h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">

          {step === 1 && (
            <>
              <p style={{ marginBottom: 20, color: 'var(--neutral-600)', lineHeight: 1.6 }}>
                {t('callLead.message')}
              </p>
              <input
                type="tel"
                value={clientPhone}
                onChange={e => { setClientPhone(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                placeholder={t('callLead.phonePlaceholder')}
                dir="ltr"
                autoFocus
                style={error ? inputErrorStyle : inputStyle}
              />
              {error && <p style={{ color: '#dc2626', fontSize: 13, margin: '6px 0 0' }}>{error}</p>}
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={handleSendOtp} disabled={loading} style={{ minWidth: 140 }}>
                  <Phone size={16} />
                  {loading ? t('callLead.sending') : t('callLead.sendCode')}
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p style={{ marginBottom: 4, color: 'var(--neutral-600)', lineHeight: 1.6 }}>
                {t('callLead.otpMessage')}
              </p>
              <p style={{ fontWeight: 700, marginBottom: 20, direction: 'ltr', textAlign: 'center', fontSize: 18 }}>
                {clientPhone}
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleVerify()}
                placeholder={t('callLead.otpPlaceholder')}
                dir="ltr"
                autoFocus
                style={{ ...( error ? inputErrorStyle : inputStyle ), textAlign: 'center', fontSize: 24, letterSpacing: 8 }}
              />
              {error && <p style={{ color: '#dc2626', fontSize: 13, margin: '6px 0 0', textAlign: 'center' }}>{error}</p>}
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => { setStep(1); setOtp(''); setError(''); }}
                  disabled={loading}
                  style={{ fontSize: 13 }}
                >
                  {t('callLead.resend')}
                </button>
                <button className="btn btn-primary" onClick={handleVerify} disabled={loading} style={{ minWidth: 140 }}>
                  <Shield size={16} />
                  {loading ? t('callLead.verifying') : t('callLead.verify')}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default CallLeadModal;
