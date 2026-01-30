import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, VolumeX, Pause, Play, Globe, CheckCircle, 
  ShieldCheck, Star, Zap, Briefcase, MousePointer, ExternalLink, Leaf
} from 'lucide-react';

// --- DESIGN CORRIGÉ (PREMIUM & SOBRE) ---
const cssStyles = `
/* --- Conteneur Principal --- */
.promo-container {
  position: relative;
  width: 100%;
  /* Ratio 16/9 standard, s'adapte à la largeur du parent */
  aspect-ratio: 16/9;
  /* Fond Blanc Pur pour la propreté */
  background: #ffffff; 
  /* Ombre portée douce pour le relief */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  /* Coins légèrement arrondis (moderne mais pas enfantin) */
  border-radius: 12px;
  overflow: hidden;
  direction: ltr;
  /* Police très lisible et pro */
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #1e293b; /* Gris très foncé (presque noir) pour le texte */
}

/* Adaptation mobile : On passe en format un peu plus carré pour l'occupation d'écran */
@media (max-width: 768px) {
  .promo-container {
    aspect-ratio: 4/5;
    border-radius: 0; /* Plein écran sur mobile souvent mieux */
  }
}

.promo-container.paused * {
  animation-play-state: paused !important;
}

/* --- Header --- */
.promo-header {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 50;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
}

.promo-lang-wrapper {
  pointer-events: auto;
}

/* --- Boutons UI (Discrets) --- */
.ui-btn-minimal {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e8f0;
  color: #334155;
  padding: 8px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.ui-btn-minimal:hover {
  background: #f8fafc;
  color: #0f172a;
}

.control-icon-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6); /* Fond sombre semi-transparent */
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(4px);
}

.control-icon-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.05);
}

.lang-menu {
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 120px;
  border: 1px solid #e2e8f0;
  pointer-events: auto;
}

.lang-option {
  padding: 10px 16px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.85rem;
  color: #475569;
}

.lang-option:hover {
  background-color: #f1f5f9;
}

/* --- Contrôles (Bas) --- */
.promo-controls {
  position: absolute;
  bottom: 24px;
  right: 24px;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 12px;
}

/* --- Scènes --- */
.promo-scene {
  display: none;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.8s ease-in-out;
  overflow: hidden;
  background: white; 
}

.promo-scene.active {
  display: flex;
  opacity: 1;
  z-index: 10;
}

/* --- Arrière-plans --- */
.scene-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Zoom lent et classe */
  animation: kenBurns 20s linear forwards; 
}

/* Overlay sombre pour texte blanc (lisibilité MAXIMALE) */
.overlay-dark {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6); 
}

/* Overlay léger pour texte noir */
.overlay-light {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.92);
}

/* --- Contenu & Typographie (CENTRÉ & LISIBLE) --- */
.scene-content {
  position: relative;
  z-index: 20;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px; /* Marges latérales */
}

/* Titre Principal : Grand, Gras, Impactant */
.scene-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #0f172a; /* Bleu Nuit Profond */
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.scene-title.white { color: white; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }

/* Sous-titre / Texte secondaire */
.scene-text {
  font-size: 1.5rem;
  color: #475569; /* Gris soutenu */
  font-weight: 500;
  max-width: 800px;
  line-height: 1.5;
}

.scene-text.white { color: rgba(255,255,255,0.9); text-shadow: 0 2px 4px rgba(0,0,0,0.5); }

/* Texte accentué (Marque) */
.text-brand {
  color: #2563eb; /* Bleu AllSherut */
}

/* --- Éléments Spécifiques --- */
.info-card {
  background: white;
  padding: 2rem 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  max-width: 600px;
  width: 90%;
}

.info-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
  color: #334155;
  margin-bottom: 12px;
  text-align: left;
}

/* --- Marquee (Défilement des photos) --- */
.marquee-container {
  position: absolute;
  inset: 0;
  background: #0f172a; /* Fond bleu nuit */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  transform: rotate(-3deg) scale(1.1); /* Petit style dynamique */
}

.marquee-row {
  display: flex;
  gap: 16px;
  width: max-content;
}

.scroll-left { animation: scroll 40s linear infinite; }
.scroll-right { animation: scrollReverse 40s linear infinite; }

.marquee-img {
  width: 240px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 0.3s;
}
.marquee-img:hover { opacity: 1; }

/* --- Bouton Final --- */
.btn-cta {
  background: #2563eb;
  color: white;
  padding: 16px 40px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
  transition: transform 0.2s;
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn-cta:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

/* --- Barre de progression --- */
.progress-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: rgba(0,0,0,0.1);
  z-index: 60;
}

.progress-bar {
  height: 100%;
  background: #2563eb;
  transition: width 0.1s linear;
}

/* --- Animations --- */
@keyframes kenBurns { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes scrollReverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

.anim-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; transform: translateY(20px); }
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }

@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
`;

const TRANSLATIONS = {
  fr: {
    // SCENE 1
    s1_title: "Vous êtes prestataire de services ?",
    s1_sub: "Vous cherchez à vous faire connaître ?",
    
    // SCENE 2
    s2_title: "AllSherut",
    s2_sub: "Est là pour vous accompagner",
    s2_badge: "Inscription simple et rapide",
    
    // SCENE 3
    s3_title: "Vous sélectionnez les services que vous proposez",
    s3_list: ["Plomberie", "Électricité", "Ménage", "Jardinage", "Travaux"], // PAS d'informatique
    
    // SCENE 4
    s4_title: "Accédez à votre espace personnel",
    s4_sub: "Modifiez vos informations à tout moment. Votre profil reste clair et à jour.",
    
    // SCENE 5
    s5_title: "Gagnez en visibilité selon vos services",
    s5_sub: "Touchez des clients réellement intéressés",
    
    // SCENE 6
    s6_title: "Les clients évaluent votre travail",
    s6_sub: "Les avis renforcent votre crédibilité",
    
    // SCENE 7 (MARQUEE)
    s7_overlay: "Plus de 20 catégories de services disponibles",
    s7_sub: "Un seul espace pour gérer votre activité",
    
    // SCENE 8
    s8_title: "AllSherut lance son offre de lancement",
    s8_sub: "Inscription gratuite pour les prestataires",
    
    // SCENE 9
    s9_title: "Rejoignez AllSherut dès maintenant",
    s9_cta: "AllSherut", // C'est le nom du bouton ou la fin
    s9_link: "www.allsherut.com"
  },
  // Je garde l'anglais simple au cas où, mais focus sur le FR demandé
  en: {
    s1_title: "Are you a service provider?",
    s1_sub: "Looking to get known?",
    s2_title: "AllSherut",
    s2_sub: "Is here to support you",
    s2_badge: "Simple and fast registration",
    s3_title: "Select the services you offer",
    s3_list: ["Plumbing", "Electrical", "Cleaning", "Gardening", "Works"],
    s4_title: "Access your personal space",
    s4_sub: "Update your info anytime. Your profile stays clear and up-to-date.",
    s5_title: "Gain visibility based on your services",
    s5_sub: "Reach clients who are genuinely interested",
    s6_title: "Clients rate your work",
    s6_sub: "Reviews boost your credibility",
    s7_overlay: "Over 20 service categories available",
    s7_sub: "One space to manage your activity",
    s8_title: "AllSherut launches its intro offer",
    s8_sub: "Free registration for providers",
    s9_title: "Join AllSherut now",
    s9_cta: "AllSherut",
    s9_link: "www.allsherut.com"
  }
};

const PromoVideo = ({ services = [], onRegisterClick }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [lang, setLang] = useState('fr');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const audioRef = useRef(null);
  
  // Séquençage précis basé sur le texte
  // 0: Intro (Vous êtes prestataire...)
  // 1: AllSherut est là (Inscription simple)
  // 2: Sélection services
  // 3: Espace perso
  // 4: Visibilité
  // 5: Avis
  // 6: "Plus de 20 catégories" (LE DÉFILÉ)
  // 7: Offre lancement
  // 8: Rejoignez (Fin)
  const sceneDurations = [4000, 3500, 4000, 5000, 4000, 4000, 6000, 4000, 6000]; 
  
  const totalDuration = sceneDurations.reduce((a, b) => a + b, 0);
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const elapsedPausedTimeRef = useRef(0);

  const t = TRANSLATIONS[lang];

  // Images pour le défilé (Fallback propre)
  const defaultImages = [
    '/images/plombier.jpg', '/images/electrician.jpg', '/images/peinture.jpg', 
    '/images/cleaning.jpg', '/images/mechanic.jpg', '/images/garden.jpg'
  ];
  const displayImages = services.length > 0 ? services.map(s => s.image) : defaultImages;
  const marqueeList = [...displayImages, ...displayImages, ...displayImages];

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      return;
    }
    const animate = () => {
      const now = Date.now();
      let totalElapsed = (now - startTimeRef.current - elapsedPausedTimeRef.current) % totalDuration;
      setProgress((totalElapsed / totalDuration) * 100);

      let accumulatedTime = 0;
      let newScene = 0;
      for (let i = 0; i < sceneDurations.length; i++) {
        accumulatedTime += sceneDurations[i];
        if (totalElapsed < accumulatedTime) {
          newScene = i; break;
        }
      }
      if (newScene !== currentScene) setCurrentScene(newScene);
      timerRef.current = requestAnimationFrame(animate);
    };
    timerRef.current = requestAnimationFrame(animate);
    return () => { if (timerRef.current) cancelAnimationFrame(timerRef.current); };
  }, [isPlaying, currentScene, totalDuration]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    } else {
      startTimeRef.current = Date.now() - (progress / 100 * totalDuration); 
      elapsedPausedTimeRef.current = 0; 
      setIsPlaying(true);
      if (!isMuted) audioRef.current?.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      if (!audioRef.current.muted && isPlaying) audioRef.current.play().catch(() => {});
    }
  };

  const openSite = () => window.open("https://allsherut.com", "_blank");

  return (
    <div className={`promo-container ${!isPlaying ? 'paused' : ''}`}>
      <style>{cssStyles}</style>
      <audio ref={audioRef} loop muted={isMuted}><source src="/musique.mp3" type="audio/mpeg" /></audio>

      {/* HEADER */}
      <div className="promo-header">
        <div className="promo-lang-wrapper">
          <button onClick={() => setShowLangMenu(!showLangMenu)} className="ui-btn-minimal">
            <Globe size={16} /> <span>{lang.toUpperCase()}</span>
          </button>
          {showLangMenu && (
            <div className="lang-menu">
              <button onClick={() => {setLang('fr'); setShowLangMenu(false)}} className="lang-option">Français</button>
              <button onClick={() => {setLang('en'); setShowLangMenu(false)}} className="lang-option">English</button>
            </div>
          )}
        </div>
      </div>

      {/* --- SCENE 1 : INTRO --- */}
      <div className={`promo-scene ${currentScene === 0 ? 'active' : ''}`}>
        <img src="/images/meeting.jpg" className="scene-bg-image" alt="" />
        <div className="overlay-dark"></div>
        <div className="scene-content">
           <h2 className="scene-title white anim-up">{t.s1_title}</h2>
           <p className="scene-text white anim-up delay-1">{t.s1_sub}</p>
        </div>
      </div>

      {/* --- SCENE 2 : ALLSHERUT EST LÀ --- */}
      <div className={`promo-scene ${currentScene === 1 ? 'active' : ''}`}>
        <div className="scene-content">
           <img src="/images/Logo moderne d'AllSherut avec sphère 3D.png" className="h-24 mb-6 anim-up" alt="Logo" />
           <h2 className="scene-title anim-up delay-1">{t.s2_title}</h2>
           <p className="scene-text anim-up delay-1">{t.s2_sub}</p>
           <div className="mt-6 px-6 py-2 bg-blue-50 text-blue-700 font-bold rounded-full anim-up delay-2">
             {t.s2_badge}
           </div>
        </div>
      </div>

      {/* --- SCENE 3 : SÉLECTION SERVICES --- */}
      <div className={`promo-scene ${currentScene === 2 ? 'active' : ''}`}>
         <img src="/images/tools.jpg" className="scene-bg-image" alt="" />
         <div className="overlay-dark"></div>
         <div className="scene-content">
            <h2 className="scene-title white anim-up">{t.s3_title}</h2>
            <div className="flex flex-wrap justify-center gap-3 mt-6 anim-up delay-1">
               {t.s3_list.map((s, i) => (
                  <span key={i} className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-lg font-bold border border-white/30">
                     {s}
                  </span>
               ))}
            </div>
         </div>
      </div>

      {/* --- SCENE 4 : ESPACE PERSONNEL --- */}
      <div className={`promo-scene ${currentScene === 3 ? 'active' : ''}`}>
         <div className="scene-content" style={{background: '#f8fafc'}}>
            <div className="info-card anim-up">
               <Briefcase size={40} className="text-blue-600 mb-4 mx-auto" />
               <h2 className="scene-title" style={{fontSize: '2rem'}}>{t.s4_title}</h2>
               <p className="scene-text">{t.s4_sub}</p>
            </div>
         </div>
      </div>

      {/* --- SCENE 5 : VISIBILITÉ --- */}
      <div className={`promo-scene ${currentScene === 4 ? 'active' : ''}`}>
         <img src="/images/map-city.jpg" className="scene-bg-image" alt="" />
         <div className="overlay-dark"></div>
         <div className="scene-content">
            <h2 className="scene-title white anim-up">{t.s5_title}</h2>
            <p className="scene-text white anim-up delay-1">{t.s5_sub}</p>
         </div>
      </div>

      {/* --- SCENE 6 : AVIS --- */}
      <div className={`promo-scene ${currentScene === 5 ? 'active' : ''}`}>
         <div className="scene-content">
            <h2 className="scene-title anim-up">{t.s6_title}</h2>
            <div className="flex gap-2 text-yellow-400 my-4 anim-up delay-1">
               {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={32} />)}
            </div>
            <p className="scene-text anim-up delay-1">{t.s6_sub}</p>
         </div>
      </div>

      {/* --- SCENE 7 : DÉFILÉ PHOTOS (LE MOMENT CLÉ) --- */}
      <div className={`promo-scene ${currentScene === 6 ? 'active' : ''}`}>
         <div className="marquee-container">
            <div className="marquee-row scroll-left">
               {marqueeList.map((src, i) => <img key={`l1-${i}`} src={src} className="marquee-img" alt="" onError={(e)=>e.target.style.display='none'} />)}
            </div>
            <div className="marquee-row scroll-right">
               {marqueeList.map((src, i) => <img key={`l2-${i}`} src={src} className="marquee-img" alt="" onError={(e)=>e.target.style.display='none'} />)}
            </div>
         </div>
         <div className="overlay-dark" style={{background:'rgba(0,0,0,0.7)'}}></div>
         <div className="scene-content">
            <h2 className="scene-title white anim-up" style={{fontSize: '3.5rem', textTransform: 'uppercase'}}>
               {t.s7_overlay}
            </h2>
            <p className="scene-text white anim-up delay-1" style={{fontSize: '1.2rem', marginTop: '1rem'}}>
               {t.s7_sub}
            </p>
         </div>
      </div>

      {/* --- SCENE 8 : OFFRE LANCEMENT --- */}
      <div className={`promo-scene ${currentScene === 7 ? 'active' : ''}`}>
         <div className="scene-content" style={{background: '#eff6ff'}}>
            <h2 className="scene-title text-brand anim-up">{t.s8_title}</h2>
            <p className="scene-text anim-up delay-1" style={{fontSize: '1.8rem', fontWeight: 'bold'}}>
               {t.s8_sub}
            </p>
         </div>
      </div>

      {/* --- SCENE 9 : FIN --- */}
      <div className={`promo-scene ${currentScene === 8 ? 'active' : ''}`}>
         <div className="scene-content">
            <img src="/images/Logo moderne d'AllSherut avec sphère 3D.png" className="h-28 mb-8 anim-up" alt="Logo" />
            <h2 className="scene-title anim-up">{t.s9_title}</h2>
            
            <button onClick={onRegisterClick} className="btn-cta anim-up delay-1">
               {t.s9_cta} <ExternalLink size={20} />
            </button>
            
            <div className="mt-8 text-gray-400 font-medium cursor-pointer hover:text-blue-600 transition-colors" onClick={openSite}>
               {t.s9_link}
            </div>
         </div>
      </div>

      {/* Footer UI */}
      <div className="progress-container"><div className="progress-bar" style={{width: `${progress}%`}}></div></div>
      <div className="promo-controls">
         <button onClick={toggleMute} className="control-icon-btn">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
         </button>
         <button onClick={togglePlay} className="control-icon-btn">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
         </button>
      </div>
    </div>
  );
};

export default PromoVideo;