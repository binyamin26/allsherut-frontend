import React, { useState } from 'react';
import { AlertCircle, X, Trash2 } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import { useLanguage } from '../../context/LanguageContext';

const DeleteServiceModal = ({ isOpen, onClose, onConfirm, serviceName, hasOtherServices }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(err.message || t('modals.deleteService.error'));
    } finally {
      setLoading(false);
    }
  };

  const getServiceDisplayName = (service) => {
    const serviceKeys = {
      babysitting: 'services.babysitting',
      cleaning: 'services.cleaning',
      gardening: 'services.gardening',
      petcare: 'services.petcare',
      tutoring: 'services.tutoring',
      eldercare: 'services.eldercare',
      electrician: 'services.electrician',
      plumbing: 'services.plumbing',
      air_conditioning: 'services.air_conditioning',
      gas_technician: 'services.gas_technician',
      drywall: 'services.drywall',
      carpentry: 'services.carpentry',
      home_organization: 'services.home_organization',
      event_entertainment: 'services.event_entertainment',
      private_chef: 'services.private_chef',
      painting: 'services.painting',
      waterproofing: 'services.waterproofing',
      contractor: 'services.contractor',
      aluminum: 'services.aluminum',
      glass_works: 'services.glass_works',
      locksmith: 'services.locksmith',
      property_management: 'services.property_management',
      laundry: 'services.laundry'
    };
    return t(serviceKeys[service], service);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-service-modal" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <div className="modal-icon warning">
            <AlertCircle size={32} />
          </div>
          <h2>{t('modals.deleteService.title')} {getServiceDisplayName(serviceName)}</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="warning-box">
            <AlertCircle size={20} />
            <div>
              <h3>{t('modals.deleteService.areYouSure')}</h3>
              <p>
                {t('modals.deleteService.willDelete')} <strong>{getServiceDisplayName(serviceName)}</strong> {t('modals.deleteService.fromAccount')}
              </p>
              {hasOtherServices ? (
                <ul className="warning-list">
                  <li>{t('modals.deleteService.otherServicesActive')}</li>
                  <li>{t('modals.deleteService.profileVisibleOthers')}</li>
                  <li>{t('modals.deleteService.serviceDataDeleted')}</li>
                  <li>{t('modals.deleteService.reviewsDeleted')}</li>
                </ul>
              ) : (
                <ul className="warning-list" style={{ color: '#dc2626' }}>
                  <li><strong>{t('modals.deleteService.lastService')}</strong></li>
                  <li>{t('modals.deleteService.accountWillBeDeleted')}</li>
                  <li>{t('modals.deleteService.allDataDeleted')}</li>
                  <li>{t('modals.deleteService.cantLogin')}</li>
                </ul>
              )}
            </div>
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button 
            onClick={handleConfirm}
            className="btn btn-danger"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" />
                {t('modals.deleteService.deleting')}
              </>
            ) : (
              <>
                <Trash2 size={18} />
                {hasOtherServices ? t('modals.deleteService.deleteThisOnly') : t('modals.deleteService.deleteAccountPermanently')}
              </>
            )}
          </button>
          
          <button 
            onClick={onClose}
            className="btn btn-secondary"
            disabled={loading}
          >
            {t('common.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteServiceModal;