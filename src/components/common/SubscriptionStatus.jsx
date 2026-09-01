import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  CreditCard,
  Calendar,
  TrendingUp,
  Settings,
  Shield 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const SubscriptionStatus = ({ showDetails = true, compact = false }) => {
  const { user, apiCall } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données d'abonnement
  useEffect(() => {
    const loadSubscriptionStatus = async () => {
      if (user?.role !== 'provider') {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiCall('/subscriptions/status', 'GET');
        
        if (response.success) {
          setSubscriptionData(response.data);
        } else {
          // Cas où l'utilisateur n'a pas d'abonnement
          if (response.message.includes('Aucun abonnement') || response.code === 'NO_SUBSCRIPTION') {
            setSubscriptionData({
              hasSubscription: false,
              needsUpgrade: true
            });
          } else {
            setError(response.message);
          }
        }
      } catch (err) {
        console.error('Erreur lors du chargement de l’abonnement :', err);
        setError('Erreur lors du chargement des données d’abonnement');
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptionStatus();
  }, [user, apiCall]);

  // Ne rien afficher si pas prestataire
  if (user?.role !== 'provider') return null;

  // Loading state
  if (loading) {
    return (
      <div className={`subscription-status loading ${compact ? 'compact' : ''}`}>
        <LoadingSpinner size="small" />
        <span>Chargement du statut de l’abonnement...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`subscription-status error ${compact ? 'compact' : ''}`}>
        <XCircle size={20} />
        <span>{error}</span>
      </div>
    );
  }

  // Pas d'abonnement
  if (!subscriptionData?.hasSubscription) {
    return (
      <div className={`subscription-status no-subscription ${compact ? 'compact' : ''}`}>
        <div className="status-header">
          <AlertTriangle size={20} />
          <div className="status-info">
            <div className="status-title">
              <span className="plan-name">Aucun abonnement actif</span>
            </div>
            <div className="status-text">Souscrivez un abonnement pour recevoir des demandes de clients</div>
          </div>
        </div>
        {!compact && (
          <div className="status-actions">
            <Link to="/billing" className="btn btn-primary">
              <Crown size={16} />
              Souscrire un abonnement
            </Link>
          </div>
        )}
        {compact && (
          <Link to="/billing" className="upgrade-btn">
            <TrendingUp size={14} />
            Souscrire
          </Link>
        )}
      </div>
    );
  }

  const { subscription, isActive, daysRemaining, warnings } = subscriptionData;

  // Déterminer le style selon le statut
  const getStatusStyle = () => {
    if (!isActive) return 'expired';
    if (warnings?.expiringSoon) return 'warning';
    if (subscription.planType === 'trial') return 'trial';
    return 'active';
  };

  const getStatusIcon = () => {
    const statusStyle = getStatusStyle();
    switch (statusStyle) {
      case 'active': return <CheckCircle size={20} />;
      case 'trial': return <Clock size={20} />;
      case 'warning': return <AlertTriangle size={20} />;
      case 'expired': return <XCircle size={20} />;
      default: return <Crown size={20} />;
    }
  };

  const getStatusText = () => {
    if (!isActive) {
      return `L’abonnement a expiré il y a ${Math.abs(daysRemaining)} jours`;
    }
    
    if (subscription.planType === 'trial') {
      return daysRemaining > 0 
        ? `Essai gratuit - ${daysRemaining} jours restants`
        : 'L’essai gratuit se termine aujourd’hui';
    }

    if (warnings?.expiringSoon) {
      return `L’abonnement se termine dans ${daysRemaining} jours`;
    }

    return subscription.planType === 'monthly' ? 'Abonnement mensuel actif' : 'Abonnement annuel actif';
  };

  const getPlanDisplayName = () => {
    switch (subscription.planType) {
      case 'trial': return 'Essai gratuit';
      case 'monthly': return 'Mensuel';
      case 'yearly': return 'Annuel';
      default: return subscription.planType;
    }
  };

  const getStatusBadgeColor = () => {
    const statusStyle = getStatusStyle();
    switch (statusStyle) {
      case 'active': return 'accent';
      case 'trial': return 'primary';
      case 'warning': return 'warning';
      case 'expired': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <div className={`subscription-status ${getStatusStyle()} ${compact ? 'compact' : ''}`}>
      <div className="status-header">
        {getStatusIcon()}
        <div className="status-info">
          <div className="status-title">
            <span className="plan-name">{getPlanDisplayName()}</span>
            <span className={`status-badge ${getStatusBadgeColor()}`}>
              {subscription.status === 'active' ? 'Actif' : subscription.status}
            </span>
          </div>
          <div className="status-text">{getStatusText()}</div>
        </div>
      </div>

      {/* Détails étendus */}
      {showDetails && !compact && (
        <div className="status-details">
          <div className="detail-grid">
            <div className="detail-item">
              <Calendar size={16} />
              <div className="detail-content">
                <label>Se termine le :</label>
                <span>{new Date(subscription.expiresAt).toLocaleDateString('he-IL')}</span>
              </div>
            </div>

            {subscription.amountMonthly && (
              <div className="detail-item">
                <CreditCard size={16} />
                <div className="detail-content">
                  <label>Prix :</label>
                  <span>€{subscription.amountMonthly}/mois</span>
                </div>
              </div>
            )}

            {subscription.nextBillingDate && (
              <div className="detail-item">
                <TrendingUp size={16} />
                <div className="detail-content">
                  <label>Prochain prélèvement :</label>
                  <span>{new Date(subscription.nextBillingDate).toLocaleDateString('he-IL')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Actions selon le statut */}
          <div className="status-actions">
            {!isActive && (
              <Link to="/billing" className="btn btn-primary">
                <Crown size={16} />
                Renouveler l’abonnement
              </Link>
            )}

            {isActive && subscription.planType === 'trial' && daysRemaining <= 7 && (
              <Link to="/billing" className="btn btn-primary">
                <TrendingUp size={16} />
                Passer à un abonnement payant
              </Link>
            )}

            {isActive && warnings?.expiringSoon && subscription.planType !== 'trial' && (
              <Link to="/billing" className="btn btn-secondary">
                <CreditCard size={16} />
                Renouveler l’abonnement
              </Link>
            )}

            <Link to="/billing" className="btn btn-outline">
              <Settings size={16} />
              Gérer l’abonnement
            </Link>
          </div>
        </div>
      )}

      {/* Compact actions */}
      {compact && subscriptionData.needsUpgrade && (
        <Link to="/billing" className="upgrade-btn">
          <TrendingUp size={14} />
          Mettre à niveau
        </Link>
      )}
    </div>
  );
};

export default SubscriptionStatus;