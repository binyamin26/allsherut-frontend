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
        setStatus('deleted');
      }
    } catch {
      setError('Erreur lors de la vérification du lien. Réessayez plus tard');
      setStatus('error');
    }
  }, [token]);

  useEffect(() => {
    const loadPreview = async () => {
      try {
        const response = await fetch(`/api/auth/verify-provider/${token}`, { method: 'GET' });
        const data = await response.json();

        if (!data.success) {
          setError(data.message || 'Le lien n’est pas valide');
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
        setError('Erreur lors de la vérification du lien. Réessayez plus tard');
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
                <h2>{status === 'processing' ? 'Opération en cours...' : 'Chargement...'}</h2>
              </>
            )}

            {status === 'confirmReject' && preview && (
              <>
                <div className="error-icon">
                  <AlertCircle size={64} />
                </div>
                <h2>Refus du profil de {preview.providerName}</h2>
                <p className="error-message">
                  Cette action supprimera définitivement le profil pour la catégorie &quot;{preview.serviceType}&quot;
                  {preview.willDeleteAccount
                    ? ' ainsi que le compte utilisateur entier (c’est sa seule catégorie). Aucune donnée ne sera conservée.'
                    : ` (${preview.otherServices} autre(s) catégorie(s) de l’utilisateur seront conservées).`}
                  <br />
                  Cette action est irréversible.
                </p>
                <div className="error-actions" style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn"
                    onClick={runAction}
                    style={{ background: '#dc2626', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Trash2 size={18} />
                    Supprimer définitivement
                  </button>
                  <Link to="/" className="btn btn-secondary">
                    Annuler
                  </Link>
                </div>
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

            {status === 'deleted' && (
              <>
                <div className="error-icon">
                  <XCircle size={64} />
                </div>
                <h2>Profil supprimé</h2>
                <p className="error-message">
                  {result?.providerName} a été supprimé définitivement
                  {result?.accountDeleted
                    ? ' avec le compte utilisateur. Aucune donnée n’a été conservée.'
                    : `, la catégorie "${result?.serviceType}" a été retirée.`}
                </p>
              </>
            )}

            {status === 'alreadyProcessed' && (
              <>
                <AlertCircle className="mx-auto mb-4" size={48} />
                <h2>La demande a déjà été traitée</h2>
                <p className="text-neutral-600">
                  {result?.providerName ? `Le profil de ${result.providerName} ` : 'Le profil '}
                  {result?.status === 'verified'
                    ? 'a déjà été marqué comme validé.'
                    : 'a déjà été traité (refusé ou supprimé).'}
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
