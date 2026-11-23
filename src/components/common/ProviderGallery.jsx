import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const SWIPE_THRESHOLD = 50;

const ProviderGallery = ({ images }) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  // Ratio réel (largeur/hauteur) de chaque photo, connu une fois chargée : sert à aligner les lignes
  const [ratios, setRatios] = useState({});

  const isOpen = activeIndex !== null;
  const total = images.length;

  const showPrev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const showNext = () => setActiveIndex((i) => (i + 1) % total);
  const close = () => setActiveIndex(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, total]);

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > SWIPE_THRESHOLD) showPrev();
    else if (deltaX < -SWIPE_THRESHOLD) showNext();
    setTouchStartX(null);
  };

  if (total === 0) return null;

  return (
    <>
      {/* Lignes justifiées : chaque photo garde ses proportions, chaque ligne a la même hauteur, bords alignés */}
      <div className="provider-gallery-rows">
        {images.map((url, i) => {
          const ratio = ratios[url] || 4 / 3;
          return (
            <button
              key={url}
              type="button"
              className="provider-gallery-thumb"
              style={{ flexGrow: ratio * 100, flexBasis: `calc(var(--gallery-row-height) * ${ratio})`, '--photo-ratio': ratio }}
              onClick={() => setActiveIndex(i)}
            >
              <img
                src={url}
                alt={t('provider.gallery.imageAlt', { index: i + 1 })}
                loading="lazy"
                onLoad={(e) => {
                  const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                  if (w && h) setRatios((prev) => (prev[url] === w / h ? prev : { ...prev, [url]: w / h }));
                }}
              />
            </button>
          );
        })}
      </div>

      {isOpen && createPortal(
        <div
          className="provider-lightbox-overlay"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="provider-lightbox-close"
            onClick={close}
            aria-label={t('provider.gallery.close')}
          >
            <X size={22} />
          </button>

          <span className="provider-lightbox-text-counter">
            {t('provider.gallery.counter', { current: activeIndex + 1, total })}
          </span>

          {total > 1 && (
            <button
              type="button"
              className="provider-lightbox-nav provider-lightbox-nav-prev"
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              aria-label={t('provider.gallery.previous')}
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <div
            className="provider-lightbox-stage"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={images[activeIndex]}
              alt={t('provider.gallery.imageAlt', { index: activeIndex + 1 })}
              className="provider-lightbox-image"
            />
          </div>

          {total > 1 && (
            <button
              type="button"
              className="provider-lightbox-nav provider-lightbox-nav-next"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              aria-label={t('provider.gallery.next')}
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>,
        document.body
      )}
    </>
  );
};

export default ProviderGallery;
