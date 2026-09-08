import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle, Loader, Home, Trash2 } from 'lucide-react';

const AdminVerifyProviderPage = () => {
  const { token } = useParams();

  // 'loading' | 'confirmReject' | 'processing' | 'approved' | 'deleted' | 'alreadyProcessed' | 'error'
  const [status, setStatus] = useState('loading');
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const runAction = useCallback(async () => {
    setStatus('processing');
    try {
      const response = await fetch(`/api/auth/verify-provider/${token}`, { method: 'POST' });
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
        setStatus('deleted');
      }
    } catch {
      setError('שגיאה באימות הקישור. נסה שוב מאוחר יותר');
      setStatus('error');
    }
  }, [token]);

  useEffect(() => {
    const loadPreview = async () => {
      try {
        const response = await fetch(`/api/auth/verify-provider/${token}`, { method: 'GET' });
        const data = await response.json();

        if (!data.success) {
          setError(data.message || 'הקישור אינו תקף');
          setStatus('error');
          return;
        }

        // fiche déjà supprimée / lien déjà utilisé
        if (data.data.notFound) {
          setResult({ status: 'deleted' });
          setStatus('alreadyProcessed');
          return;
        }

        if (data.data.alreadyProcessed) {
          setResult(data.data);
          setStatus('alreadyProcessed');
          return;
        }

        setPreview(data.data);

        // Approbation : un seul clic, comme avant
        if (data.data.action === 'approve') {
          runAction();
        } else {
          // Refus : on demande confirmation avant de supprimer
          setStatus('confirmReject');
        }
      } catch {
        setError('שגיאה באימות הקישור. נסה שוב מאוחר יותר');
        setStatus('error');
      }
    };

    loadPreview();
  }, [token, runAction]);

  return (
    <div className="reset-password-page">
      <div className="container">
        <div className="reset-card">
          <div className="text-center">
            {(status === 'loading' || status === 'processing') && (
              <>
                <Loader className="animate-spin mx-auto mb-4" size={48} />
                <h2>{status === 'processing' ? 'מבצע את הפעולה...' : 'טוען...'}</h2>
              </>
            )}

            {status === 'confirmReject' && preview && (
              <>
                <div className="error-icon">
                  <AlertCircle size={64} />
                </div>
                <h2>דחיית הפרופיל של {preview.providerName}</h2>
                <p className="error-message">
                  פעולה זו תמחק לצמיתות את הפרופיל עבור התחום &quot;{preview.serviceType}&quot;
                  {preview.willDeleteAccount
                    ? ' ואת חשבון המשתמש כולו (זהו התחום היחיד שלו). לא יישאר שום מידע.'
                    : ` (${preview.otherServices} תחומים נוספים של המשתמש יישמרו).`}
                  <br />
                  לא ניתן לבטל פעולה זו.
                </p>
                <div className="error-actions" style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn"
                    onClick={runAction}
                    style={{ background: '#dc2626', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Trash2 size={18} />
                    מחק לצמיתות
                  </button>
                  <Link to="/" className="btn btn-secondary">
                    ביטול
                  </Link>
                </div>
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

            {status === 'deleted' && (
              <>
                <div className="error-icon">
                  <XCircle size={64} />
                </div>
                <h2>הפרופיל נמחק</h2>
                <p className="error-message">
                  {result?.providerName} נמחק לצמיתות
                  {result?.accountDeleted
                    ? ' יחד עם חשבון המשתמש. לא נשמר שום מידע.'
                    : `, התחום "${result?.serviceType}" הוסר.`}
                </p>
              </>
            )}

            {status === 'alreadyProcessed' && (
              <>
                <AlertCircle className="mx-auto mb-4" size={48} />
                <h2>הבקשה כבר טופלה</h2>
                <p className="text-neutral-600">
                  {result?.providerName ? `הפרופיל של ${result.providerName} ` : 'הפרופיל '}
                  {result?.status === 'verified'
                    ? 'כבר סומן בעבר כמאושר.'
                    : 'כבר טופל (נדחה או נמחק).'}
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
