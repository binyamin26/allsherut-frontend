import React, { useState } from 'react';
import { AlertCircle, X, Clock } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import { useLanguage } from '../../context/LanguageContext';

const CancelSubscriptionModal = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setError('');
    setLoading(true);
    
    try {
      await onConfirm();
    } catch (err) {
      setError(err.message || t('modals.cancelSubscription.error'));
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content delete-account-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-content">
            <AlertCircle size={24} className="warning-icon" style={{ color: '#f59e0b' }} />
            <h2>{t('modals.cancelSubscription.title')}</h2>
          </div>
          <button 
            className="modal-close" 
            onClick={handleClose}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="warning-box" style={{ 
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderColor: '#f59e0b'
          }}>
            <Clock size={20} style={{ color: '#d97706' }} />
            <div>
              <h3 style={{ color: '#92400e' }}>{t('modals.cancelSubscription.willCancelAtEnd')}</h3>
              <p style={{ color: '#78350f' }}>
                {t('modals.cancelSubscription.accountContinues')}
              </p>
              <ul>
                <li>{t('modals.cancelSubscription.profileVisible')}</li>
                <li>{t('modals.cancelSubscription.continueReceiving')}</li>
                <li><strong>{t('modals.cancelSubscription.atEndDeleted')}</strong></li>
                <li>{t('modals.cancelSubscription.canCancelRequest')}</li>
              </ul>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  {t('modals.cancelSubscription.cancelling')}
                </>
              ) : (
                <>
                  <Clock size={18} />
                  {t('modals.cancelSubscription.confirmCancel')}
                </>
              )}
            </button>
            
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={loading}
            >
              {t('common.cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscriptionModal;