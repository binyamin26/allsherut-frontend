import React, { useState } from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import { useLanguage } from '../../context/LanguageContext';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setError('');
    setLoading(true);
    
    try {
      await onConfirm();
    } catch (err) {
      setError(err.message || t('modals.deleteAccount.error'));
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
            <AlertTriangle size={24} className="warning-icon" />
            <h2>{t('modals.deleteAccount.title')}</h2>
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
          <div className="warning-box">
            <AlertTriangle size={20} />
            <div>
              <h3>{t('modals.deleteAccount.warning')}</h3>
              <p>{t('modals.deleteAccount.willCause')}</p>
              <ul>
                <li>{t('modals.deleteAccount.profileDeleted')}</li>
                <li>{t('modals.deleteAccount.removedFromSearch')}</li>
                <li>{t('modals.deleteAccount.personalDataDeleted')}</li>
                <li>{t('modals.deleteAccount.subscriptionCancelled')}</li>
              </ul>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  {t('modals.deleteAccount.deleting')}
                </>
              ) : (
                <>
                  <Trash2 size={18} />
                  {t('modals.deleteAccount.deleteAccountPermanently')}
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

export default DeleteAccountModal;