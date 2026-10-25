import { Component } from 'react';
import { useLocation } from 'react-router-dom';

// Filet de sécurité : si un composant plante pendant le rendu, React démonte TOUTE l'arborescence
// et le visiteur voit une page blanche. Cette frontière affiche à la place un message clair
// avec un bouton pour recharger. Volontairement sans hooks ni CSS externe : elle doit fonctionner
// même si le contexte de langue, le routeur ou les feuilles de style sont la cause du problème.
const TEXTS = {
  he: { title: 'משהו השתבש', body: 'אירעה שגיאה בטעינת הדף. נסו לרענן את הדף.', reload: 'רענון הדף', home: 'לדף הבית', dir: 'rtl' },
  fr: { title: 'Un problème est survenu', body: "Une erreur est survenue lors de l'affichage de la page. Essayez de la recharger.", reload: 'Recharger la page', home: "Retour à l'accueil", dir: 'ltr' },
  en: { title: 'Something went wrong', body: 'An error occurred while displaying this page. Please try reloading it.', reload: 'Reload page', home: 'Back to home', dir: 'ltr' },
  ru: { title: 'Что-то пошло не так', body: 'При отображении страницы произошла ошибка. Попробуйте обновить страницу.', reload: 'Обновить страницу', home: 'На главную', dir: 'ltr' },
};

const getTexts = () => {
  try {
    const lang = localStorage.getItem('homesherut_language');
    if (TEXTS[lang]) return TEXTS[lang];
  } catch { /* storage indisponible */ }
  return TEXTS.he;
};

const buttonStyle = {
  padding: '10px 22px',
  borderRadius: '10px',
  border: '1px solid #1d4ed8',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
};

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info?.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const texts = getTexts();
    return (
      <div
        role="alert"
        dir={texts.dir}
        style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', textAlign: 'center' }}
      >
        <div style={{ maxWidth: '460px' }}>
          <div aria-hidden="true" style={{ fontSize: '48px', marginBottom: '12px' }}>⚠️</div>
          <h1 style={{ fontSize: '24px', margin: '0 0 8px', color: '#0f172a' }}>{texts.title}</h1>
          <p style={{ fontSize: '16px', margin: '0 0 24px', color: '#475569', lineHeight: 1.5 }}>{texts.body}</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => window.location.reload()} style={{ ...buttonStyle, background: '#1d4ed8', color: '#fff' }}>
              {texts.reload}
            </button>
            <a href="/" style={{ ...buttonStyle, background: '#fff', color: '#1d4ed8' }}>{texts.home}</a>
          </div>
        </div>
      </div>
    );
  }
}

// Variante pour les routes : se réinitialise quand l'URL change, pour qu'une page en erreur
// n'empêche pas de naviguer vers une autre (le header et le footer restent utilisables).
export const RouteErrorBoundary = ({ children }) => {
  const { pathname } = useLocation();
  return <ErrorBoundary key={pathname}>{children}</ErrorBoundary>;
};

export default ErrorBoundary;
