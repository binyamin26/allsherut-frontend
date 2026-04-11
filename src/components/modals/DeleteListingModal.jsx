import React, { useState } from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import { useLanguage } from '../../context/LanguageContext';

const DeleteListingModal = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-service-modal" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <div className="modal-icon warning">
            <AlertTriangle size={32} />
          </div>
          <h2>{t('recruitment.dashboard.deleteConfirm')}</h2>
          <button className="modal-close" onClick={onClose} disabled={loading}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="warning-box">
            <AlertTriangle size={20} />
            <div>
              <p>{t('recruitment.dashboard.deleteWarning')}</p>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={handleConfirm} className="btn btn-danger" disabled={loading}>
            {loading ? (
              <><LoadingSpinner size="small" />{t('recruitment.dashboard.deleting')}</>
            ) : (
              <><Trash2 size={18} />{t('recruitment.dashboard.delete')}</>
            )}
          </button>
          <button onClick={onClose} className="btn btn-secondary" disabled={loading}>
            {t('common.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteListingModal;
