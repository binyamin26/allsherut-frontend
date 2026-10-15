import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  // Avant le premier rendu (évite de voir le bas de page une fraction de seconde)
  useLayoutEffect(() => {
    if (hash) return; // les ancres (#services...) gèrent leur propre scroll
    toTop();
  }, [pathname, search, hash]);

  // Les pages sont chargées en lazy + données async : le contenu arrive après
  // le premier rendu et certains navigateurs restaurent alors une ancienne
  // position. On re-force le haut de page tant que l'utilisateur n'a pas scrollé.
  useEffect(() => {
    if (hash) return undefined;
    let userScrolled = false;
    const onUserScroll = () => { userScrolled = true; };
    window.addEventListener('wheel', onUserScroll, { passive: true });
    window.addEventListener('touchmove', onUserScroll, { passive: true });
    window.addEventListener('keydown', onUserScroll);

    const timers = [0, 100, 300, 800].map((delay) =>
      setTimeout(() => {
        if (!userScrolled && window.scrollY !== 0) toTop();
      }, delay)
    );

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('touchmove', onUserScroll);
      window.removeEventListener('keydown', onUserScroll);
    };
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
