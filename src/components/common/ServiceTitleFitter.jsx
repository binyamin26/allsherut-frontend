import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Adjusts .service-title font size so it never exceeds 2 lines.
 * Runs on route change and on window resize.
 * No changes needed in the 23 service pages.
 */
const ServiceTitleFitter = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const fitTitle = (el) => {
      // Reset any inline font-size set by a previous run
      el.style.fontSize = '';

      const style = getComputedStyle(el);
      const lineHeight =
        parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.3;
      const maxLines = 2;
      const minFontSize = 13; // px — never go below this

      let fontSize = parseFloat(style.fontSize);

      // Shrink 0.5px at a time until the text fits within maxLines
      while (
        el.scrollHeight > lineHeight * maxLines + 4 &&
        fontSize > minFontSize
      ) {
        fontSize -= 0.5;
        el.style.fontSize = `${fontSize}px`;
      }
    };

    const runFit = () => {
      document.querySelectorAll('.service-title').forEach(fitTitle);
    };

    // Small delay so the DOM has time to paint after route change
    const timer = setTimeout(runFit, 80);
    window.addEventListener('resize', runFit);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', runFit);
    };
  }, [pathname]);

  return null;
};

export default ServiceTitleFitter;
