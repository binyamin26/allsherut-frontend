import React, { useState } from 'react';
import { X, Star, User, MessageCircle, Send, AlertCircle, Lightbulb } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ResponseModal = ({ isOpen, onClose, reviewData }) => {
  const { createProviderResponse } = useAuth();
  
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setResponseText('');
    setError('');
    onClose();
  };

  const handleResponseChange = (value) => {
    setResponseText(value);
    if (error) setError('');
  };

  const validateResponse = () => {
    const trimmedText = responseText.trim();
    
    if (!trimmedText) {
      setError('Une réponse est requise');
      return false;
    }
    
    if (trimmedText.length < 10) {
      setError('La réponse doit contenir au moins 10 caractères');
      return false;
    }
    
    if (trimmedText.length > 1000) {
      setError('La réponse ne peut pas dépasser 1000 caractères');
      return false;
    }
    
    return true;
  };

  const handleSubmitResponse = async () => {
    if (!validateResponse()) return;

    setLoading(true);
    setError('');

    try {
      const result = await createProviderResponse(reviewData.id, responseText.trim());

      if (result.success) {
        // Appel du callback de succès
        if (reviewData.onResponseSuccess) {
          reviewData.onResponseSuccess();
        }
        handleClose();
      } else {
        setError(result.message || 'Erreur lors de la création de la réponse');
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map(star => (
      <Star
        key={star}
        size={16}
        fill={star <= rating ? '#fbbf24' : 'none'}
        color={star <= rating ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  if (!isOpen || !reviewData) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container review-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            Répondre à l’avis
          </h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          {/* Affichage de l’avis d’origine */}
          <div className="original-review-section">
            <div className="info-box">
              <MessageCircle size={20} />
              <div>
                <p><strong>L’avis que vous avez reçu :</strong></p>
              </div>
            </div>

            <div className="review-display">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    <User size={18} />
                  </div>
                  <div className="reviewer-details">
                    <h4>{reviewData.reviewerName || 'Client'}</h4>
                    <div className="review-rating">
                      {renderStars(reviewData.rating)}
                      <span className="rating-text">({reviewData.rating}/5)</span>
                    </div>
                  </div>
                </div>
                <div className="review-date">
                  {new Date(reviewData.createdAt).toLocaleDateString('he-IL')}
                </div>
              </div>

              {reviewData.title && (
                <div className="review-title">
                  <h5>{reviewData.title}</h5>
                </div>
              )}

              <div className="review-comment">
                <p>{reviewData.comment}</p>
              </div>
            </div>
          </div>

          {/* Consignes pour une réponse professionnelle */}
          <div className="response-guidelines">
            <div className="info-box">
              <Lightbulb size={20} />
              <div>
                <p><strong>Conseils pour une réponse professionnelle :</strong></p>
                <ul style={{ margin: '8px 0 0 0', paddingRight: '20px' }}>
                  <li>Remerciez le client pour le temps consacré à la rédaction de l’avis</li>
                  <li>Répondez aux points spécifiques mentionnés</li>
                  <li>Si nécessaire, expliquez ou clarifiez certains points</li>
                  <li>Gardez un ton professionnel et positif</li>
                  <li>Invitez les futurs clients à vous contacter</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formulaire de réponse */}
          <div className="response-form">
            <div className="input-group">
              <label className="form-label">Votre réponse</label>
              <textarea
                value={responseText}
                onChange={(e) => handleResponseChange(e.target.value)}
                placeholder="Rédigez ici votre réponse à l’avis... Répondez aux points soulevés par le client et remerciez-le pour son retour"
                className="review-textarea"
                rows={6}
                disabled={loading}
              />
              <div className="character-count">
                <span className={responseText.length > 1000 ? 'text-danger' : 'text-muted'}>
                  {responseText.length}/1000 caractères
                </span>
                {responseText.trim().length > 0 && responseText.trim().length < 10 && (
                  <span className="text-warning"> • au moins 10 caractères requis</span>
                )}
              </div>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="response-actions">
              <button
                className="btn btn-secondary"
                onClick={handleClose}
                disabled={loading}
              >
                Annuler
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmitResponse}
                disabled={loading || !responseText.trim() || responseText.trim().length < 10}
              >
                {loading ? 'Envoi...' : 'Publier la réponse'}
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;