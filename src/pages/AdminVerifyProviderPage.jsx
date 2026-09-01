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
          setError(data.message || 'Le lien n’est pas valide');
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
        setError('Erreur lors de la vérification du lien. Réessayez plus tard');
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
                <h2>Traitement de la demande...</h2>
              </>
            )}

            {status === 'approved' && (
              <>
                <div className="success-icon">
                  <CheckCircle size={64} />
                </div>
                <h2>Profil validé avec succès</h2>
                <p className="success-message">
                  {result?.providerName} est désormais affiché sur le site pour la catégorie &quot;{result?.serviceType}&quot;.
                </p>
              </>
            )}

            {status === 'rejected' && (
              <>
                <div className="error-icon">
                  <XCircle size={64} />
                </div>
                <h2>Profil refusé</h2>
                <p className="error-message">
                  {result?.providerName} ne sera pas affiché sur le site.
                </p>
              </>
            )}

            {status === 'alreadyProcessed' && (
              <>
                <AlertCircle className="mx-auto mb-4" size={48} />
                <h2>La demande a déjà été traitée</h2>
                <p className="text-neutral-600">
                  Le profil de {result?.providerName} a déjà été marqué comme {result?.status === 'verified' ? 'validé' : 'refusé'}.
                </p>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="error-icon">
                  <AlertCircle size={64} />
                </div>
                <h2>Erreur</h2>
                <p className="error-message">{error}</p>
              </>
            )}

            <div className="error-actions" style={{ marginTop: '24px' }}>
              <Link to="/" className="btn btn-secondary">
                <Home size={18} />
                Retour à l’accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVerifyProviderPage;
