import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle, Loader, Home } from 'lucide-react';

const AdminVerifyProviderPage = () => {
  const { token } = useParams();

  const [status, setStatus] = useState('loading'); // 'loading', 'approved', 'rejected', 'alreadyProcessed', 'error'
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyProvider = async () => {
      try {
        const response = await fetch(`/api/auth/verify-provider/${token}`, {
          method: 'POST'
        });
        const data = await response.json();

        if (!data.success) {
          setError(data.message || 'הקישור אינו תקף');
          setStatus('error');
          return;
        }

        setResult(data.data);

        if (data.data.alreadyProcessed) {
          setStatus('alreadyProcessed');
        } else if (data.data.action === 'approve') {
          setStatus('approved');
        } else {
          setStatus('rejected');
        }
      } catch (err) {
        console.error('Provider verification error:', err);
        setError('שגיאה באימות הקישור. נסה שוב מאוחר יותר');
        setStatus('error');
      }
    };

    verifyProvider();
  }, [token]);

  return (
    <div className="reset-password-page">
      <div className="container">
        <div className="reset-card">
          <div className="text-center">
            {status === 'loading' && (
              <>
                <Loader className="animate-spin mx-auto mb-4" size={48} />
                <h2>מעבד את הבקשה...</h2>
              </>
            )}

            {status === 'approved' && (
              <>
                <div className="success-icon">
                  <CheckCircle size={64} />
                </div>
                <h2>הפרופיל אושר בהצלחה</h2>
                <p className="success-message">
                  {result?.providerName} מוצג כעת באתר עבור התחום &quot;{result?.serviceType}&quot;.
                </p>
              </>
            )}

            {status === 'rejected' && (
              <>
                <div className="error-icon">
                  <XCircle size={64} />
                </div>
                <h2>הפרופיל נדחה</h2>
                <p className="error-message">
                  {result?.providerName} לא יוצג באתר.
                </p>
              </>
            )}

            {status === 'alreadyProcessed' && (
              <>
                <AlertCircle className="mx-auto mb-4" size={48} />
                <h2>הבקשה כבר טופלה</h2>
                <p className="text-neutral-600">
                  הפרופיל של {result?.providerName} כבר סומן בעבר כ-{result?.status === 'verified' ? 'מאושר' : 'נדחה'}.
                </p>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="error-icon">
                  <AlertCircle size={64} />
                </div>
                <h2>שגיאה</h2>
                <p className="error-message">{error}</p>
              </>
            )}

            <div className="error-actions" style={{ marginTop: '24px' }}>
              <Link to="/" className="btn btn-secondary">
                <Home size={18} />
                חזרה לדף הבית
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVerifyProviderPage;
