import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, 
  CreditCard, 
  Calendar, 
  FileText,
  CheckCircle,
  AlertTriangle,
  Download,
  ArrowLeft,
  TrendingUp,
  Clock,
  Star,
  Shield,
  Mail,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SubscriptionStatus from '../components/common/SubscriptionStatus';

const BillingPage = () => {
  const { user, apiCall } = useAuth();
  const navigate = useNavigate();
  
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [billingHistory, setBillingHistory] = useState(null);
  const [pricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Redirect si pas prestataire
  useEffect(() => {
    if (user && user.role !== 'provider') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Charger données d'abonnement et historique
  useEffect(() => {
    const loadBillingData = async () => {
      if (user?.role !== 'provider') return;

      setLoading(true);
      try {
        // Charger statut abonnement
        const statusResponse = await apiCall('/subscriptions/status', 'GET');
        if (statusResponse.success) {
          setSubscriptionData(statusResponse.data);
        } else if (statusResponse.message.includes('לא נמצא מנוי')) {
          setSubscriptionData({ hasSubscription: false, needsUpgrade: true });
        }

        // Charger historique facturation
        const historyResponse = await apiCall('/subscriptions/billing-history', 'GET');
        if (historyResponse.success) {
          setBillingHistory(historyResponse.data);
        }

        // Charger tarifs
        const pricingResponse = await apiCall('/subscriptions/pricing', 'GET');
        if (pricingResponse.success) {
          setPricingData(pricingResponse.data.pricing);
        }

      } catch (err) {
        console.error('שגיאה בטעינת נתוני חיוב:', err);
        setError('שגיאה בטעינת נתוני החיוב');
      } finally {
        setLoading(false);
      }
    };

    loadBillingData();
  }, [user, apiCall]);

  // Simuler upgrade (remplacer par vraie intégration Stripe)
  const handleUpgrade = async (planType) => {
    setActionLoading(`upgrade-${planType}`);
    try {
      // TODO: Intégrer Stripe ici
      // Pour l'instant, simuler un succès
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockPaymentMethodId = 'pm_mock_' + Date.now();
      const mockStripeSubscriptionId = 'sub_mock_' + Date.now();
      
      const response = await apiCall('/subscriptions/upgrade', 'POST', {
        planType,
        paymentMethodId: mockPaymentMethodId,
        stripeSubscriptionId: mockStripeSubscriptionId
      });

      if (response.success) {
        setMessage({
          type: 'success',
          text: response.message
        });
        // Recharger les données
        window.location.reload();
      } else {
        setError(response.message || 'שגיאה בשדרוג המנוי');
      }
    } catch (err) {
      console.error('שגיאה בשדרוג מנוי:', err);
      setError('שגיאה בשדרוג המנוי');
    } finally {
      setActionLoading(null);
    }
  };

  // Annuler abonnement
  const handleCancelSubscription = async () => {
    if (!confirm('האם אתה בטוח שברצונך לבטל את המנוי? המנוי יישאר פעיל עד תאריך התפוגה.')) {
      return;
    }

    setActionLoading('cancel');
    try {
      const response = await apiCall('/subscriptions/cancel', 'POST', {
        reason: 'user_request'
      });

      if (response.success) {
        setMessage({
          type: 'success',
          text: response.message
        });
        // Recharger les données
        window.location.reload();
      } else {
        setError(response.message || 'שגיאה בביטול המנוי');
      }
    } catch (err) {
      console.error('שגיאה בביטול מנוי:', err);
      setError('שגיאה בביטול המנוי');
    } finally {
      setActionLoading(null);
    }
  };

  // Fonction pour formater la méthode de paiement
  const formatPaymentMethod = (method) => {
    switch (method) {
      case 'credit_card': return 'כרטיס אשראי';
      case 'bit': return 'Bit';
      case 'paypal': return 'PayPal';
      default: return method;
    }
  };

  // Fonction pour formater le statut de transaction
  const formatTransactionStatus = (status) => {
    switch (status) {
      case 'completed': return { text: 'הושלם', class: 'status-completed' };
      case 'pending': return { text: 'ממתין', class: 'status-pending' };
      case 'failed': return { text: 'נכשל', class: 'status-failed' };
      case 'refunded': return { text: 'הוחזר', class: 'status-refunded' };
      default: return { text: status, class: 'status-unknown' };
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" overlay text="טוען נתוני חיוב..." />;
  }

  return (
    <div className="billing-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            <ArrowLeft size={20} />
          </button>
          <div className="header-content">
            <h1 className="page-title">
              <CreditCard size={28} />
              חיוב ומנויים
            </h1>
            <p className="page-subtitle">
              נהל את המנוי שלך, צפה בהיסטוריית תשלומים ושדרג בכל עת
            </p>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className={`message ${message.type}`}>
            <div className="message-content">
              {message.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
              <span>{message.text}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="message error">
            <div className="message-content">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="billing-content">
          {/* Statut abonnement actuel */}
          <div className="billing-section">
            <h2 className="section-title">המנוי הנוכחי</h2>
            <SubscriptionStatus showDetails={true} />
          </div>

          {/* Plans disponibles */}
          <div className="billing-section">
            <h2 className="section-title">תוכניות זמינות</h2>
            {pricingData ? (
              <div className="pricing-cards">
                {/* Trial */}
                <div className="pricing-card trial">
                  <div className="plan-header">
                    <Clock size={24} />
                    <h3>{pricingData.trial.name}</h3>
                    <div className="price">
                      <span className="amount">₪{pricingData.trial.price}</span>
                      <span className="period">{pricingData.trial.duration}</span>
                    </div>
                  </div>
                  <ul className="features-list">
                    {pricingData.trial.features.map((feature, index) => (
                      <li key={index}>
                        <CheckCircle size={16} /> 
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="plan-status">
                    {subscriptionData?.subscription?.planType === 'trial' ? (
                      <span className="current-plan">התוכנית הנוכחית</span>
                    ) : (
                      <span className="completed">זמין לספקים חדשים</span>
                    )}
                  </div>
                </div>

                {/* Monthly */}
                <div className="pricing-card monthly">
                  <div className="plan-header">
                    <TrendingUp size={24} />
                    <h3>{pricingData.monthly.name}</h3>
                    <div className="price">
                      <span className="amount">₪{pricingData.monthly.price}</span>
                      <span className="period">{pricingData.monthly.duration}</span>
                    </div>
                  </div>
                  <ul className="features-list">
                    {pricingData.monthly.features.map((feature, index) => (
                      <li key={index}>
                        <CheckCircle size={16} /> 
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="plan-actions">
                    {subscriptionData?.subscription?.planType === 'monthly' ? (
                      <span className="current-plan">התוכנית הנוכחית</span>
                    ) : (
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleUpgrade('monthly')}
                        disabled={actionLoading === 'upgrade-monthly'}
                      >
                        {actionLoading === 'upgrade-monthly' ? (
                          <>
                            <LoadingSpinner size="small" />
                            מעבד...
                          </>
                        ) : (
                          <>
                            <Crown size={16} />
                            בחר תוכנית
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Yearly */}
                <div className="pricing-card yearly popular">
                  <div className="popularity-badge">
                    <Star size={16} />
                    הכי פופולרי
                  </div>
                  <div className="plan-header">
                    <Crown size={24} />
                    <h3>{pricingData.yearly.name}</h3>
                    <div className="price">
                      <span className="amount">₪{pricingData.yearly.price}</span>
                      <span className="period">{pricingData.yearly.duration}</span>
                    </div>
                    {pricingData.yearly.savings && (
                      <div className="savings">
                        חסוך ₪{pricingData.yearly.savings} ({pricingData.yearly.savingsPercent}%)
                      </div>
                    )}
                  </div>
                  <ul className="features-list">
                    {pricingData.yearly.features.map((feature, index) => (
                      <li key={index}>
                        <CheckCircle size={16} /> 
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="plan-actions">
                    {subscriptionData?.subscription?.planType === 'yearly' ? (
                      <span className="current-plan">התוכנית הנוכחית</span>
                    ) : (
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleUpgrade('yearly')}
                        disabled={actionLoading === 'upgrade-yearly'}
                      >
                        {actionLoading === 'upgrade-yearly' ? (
                          <>
                            <LoadingSpinner size="small" />
                            מעבד...
                          </>
                        ) : (
                          <>
                            <Crown size={16} />
                            בחר תוכנית
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="loading-placeholder">
                <LoadingSpinner size="medium" />
                <span>טוען תוכניות מנוי...</span>
              </div>
            )}
          </div>

          {/* Historique facturation */}
          {billingHistory && billingHistory.transactions && billingHistory.transactions.length > 0 && (
            <div className="billing-section">
              <h2 className="section-title">
                <FileText size={20} />
                היסטוריית חיובים
              </h2>
              
              <div className="billing-summary">
                <div className="summary-stats">
                  <div className="stat-item">
                    <span className="stat-label">סה&quot;כ מנויים:</span>
                    <span className="stat-value">{billingHistory.summary.totalSubscriptions}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">סה&quot;כ תשלומים:</span>
                    <span className="stat-value">{billingHistory.summary.totalTransactions}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">סה&quot;כ שולם:</span>
                    <span className="stat-value">₪{billingHistory.summary.totalPaid}</span>
                  </div>
                </div>
              </div>

              <div className="transactions-table">
                <div className="table-header">
                  <div className="header-cell">תאריך</div>
                  <div className="header-cell">סכום</div>
                  <div className="header-cell">אמצעי תשלום</div>
                  <div className="header-cell">סטטוס</div>
                  <div className="header-cell">פעולות</div>
                </div>
                
                {billingHistory.transactions.map((transaction) => {
                  const statusInfo = formatTransactionStatus(transaction.status);
                  return (
                    <div key={transaction.id} className="table-row">
                      <div className="cell date">
                        {new Date(transaction.created_at).toLocaleDateString('he-IL')}
                      </div>
                      <div className="cell amount">
                        ₪{transaction.amount}
                      </div>
                      <div className="cell payment-method">
                        {formatPaymentMethod(transaction.payment_method)}
                      </div>
                      <div className={`cell status ${statusInfo.class}`}>
                        {statusInfo.text === 'הושלם' && <CheckCircle size={14} />}
                        {statusInfo.text === 'ממתין' && <Clock size={14} />}
                        {statusInfo.text === 'נכשל' && <AlertTriangle size={14} />}
                        {statusInfo.text}
                      </div>
                      <div className="cell actions">
                        {transaction.status === 'completed' && (
                          <button className="btn btn-outline btn-sm">
                            <Download size={14} />
                            קבלה
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions et support */}
          <div className="billing-section">
            <h2 className="section-title">פעולות נוספות</h2>
            
            <div className="actions-grid">
              {/* Annulation */}
              {subscriptionData?.subscription && 
               subscriptionData.subscription.planType !== 'trial' && 
               subscriptionData.subscription.status === 'active' && (
                <div className="action-card danger">
                  <h4>ביטול מנוי</h4>
                  <p>בטל את המנוי שלך. המנוי יישאר פעיל עד תאריך התפוגה.</p>
                  <button 
                    className="btn btn-danger"
                    onClick={handleCancelSubscription}
                    disabled={actionLoading === 'cancel'}
                  >
                    {actionLoading === 'cancel' ? (
                      <>
                        <LoadingSpinner size="small" />
                        מבטל...
                      </>
                    ) : (
                      'בטל מנוי'
                    )}
                  </button>
                </div>
              )}

             <div className="action-card support">
  <h4>זקוק לעזרה?</h4>
  <p>צוות התמיכה שלנו כאן לעזור לך בכל שאלה או בעיה.</p>
  <div className="support-options">
    <button 
      onClick={() => navigate('/contact')} 
      className="btn btn-outline"
    >
      <Mail size={16} />
      שלח אימייל
    </button>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;