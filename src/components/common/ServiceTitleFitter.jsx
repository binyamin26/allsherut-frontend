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
      const minFontSize = 11; // px — never go below this

      let fontSize = parseFloat(style.fontSize);

      const parent = el.parentElement;

      // Shrink 0.5px at a time until the text fits (vertically or horizontally)
      while (
        fontSize > minFontSize &&
        (el.scrollHeight > lineHeight * maxLines + 4 ||
          el.scrollWidth > el.offsetWidth + 2 ||
          (parent && el.offsetWidth > parent.offsetWidth))
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
