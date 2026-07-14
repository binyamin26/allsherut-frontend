import { useEffect, useRef, useState } from 'react';

/**
 * Reveal — anime son contenu en fondu + léger déplacement, de deux façons :
 * - par défaut : déclenché par IntersectionObserver quand l'élément entre dans
 *   l'écran (scroll reveal) — utile pour tout ce qui est sous la ligne de flottaison.
 * - `onLoad` : déclenché immédiatement au montage, sans observer — pour l'effet
 *   d'entrée en cascade des éléments déjà visibles au chargement (hero, etc.).
 *
 * `delay` (ms) décale le déclenchement pour créer la cascade entre plusieurs Reveal.
 */
const Reveal = ({
  children,
  as: Tag = 'div',
  onLoad = false,
  delay = 0,
  direction = 'up',
  className = '',
  style,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (onLoad) {
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [onLoad]);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${direction} ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
