import { useState } from 'react';
import { Link2, Copy, Check, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ShareReviewLinkCard = ({ providerId }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!providerId) return null;

  const reviewLink = `https://allsherut.com/review/${providerId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reviewLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Clipboard API indisponible (contexte non sécurisé, permissions) - pas critique
    }
  };

  const handleWhatsappShare = () => {
    const message = t('dashboard.shareReview.whatsappMessage', { link: reviewLink });
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="share-review-card">
      <div className="share-review-header">
        <span className="share-review-icon-badge" aria-hidden="true">
          <Link2 size={18} />
        </span>
        <div className="share-review-heading">
          <h3 className="share-review-title">{t('dashboard.shareReview.title')}</h3>
          <p className="share-review-description">{t('dashboard.shareReview.description')}</p>
        </div>
      </div>

      <div className="share-review-link-pill">
        <input
          type="text"
          readOnly
          value={reviewLink}
          className="share-review-link-input"
          onFocus={(e) => e.target.select()}
        />
        <button
          type="button"
          className={`share-review-copy-btn${copied ? ' is-copied' : ''}`}
          onClick={handleCopy}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? t('dashboard.shareReview.copied') : t('dashboard.shareReview.copyButton')}</span>
        </button>
      </div>

      <button type="button" className="share-review-whatsapp-btn" onClick={handleWhatsappShare}>
        <MessageCircle size={18} />
        <span>{t('dashboard.shareReview.whatsappButton')}</span>
      </button>
    </div>
  );
};

export default ShareReviewLinkCard;
