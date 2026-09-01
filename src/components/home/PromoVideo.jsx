import React, { useState, useRef, useEffect } from 'react';

const promoTranslations = {
  fr: [
    { main: "Vous proposez des services et cherchez à développer votre clientèle ?", bgImage: "/artisan.jpg", time: 4 },
    { main: "AllSherut vous aide à développer votre activité.", bgImage: "/aide.jpg", time: 4 },
    { main: "Inscription simple et rapide en ligne.", bgVideo: "/arshama.mp4", bgFallback: "/images/electrician.jpg", time: 5 },
    { main: "Plus de 20 catégories de services réunies sur une seule plateforme.", isMarquee: true, time: 7 },
    { main: "Accédez facilement à votre espace personnel.", bgVideo: "/dashboard.mp4", bgFallback: "/images/nikayon.jpg", time: 5 },
    { main: "Mettez à jour vos informations à tout moment.", bgVideo: "/idkounpratim.mp4", bgFallback: "/images/jardinage.jpg", time: 6 },
    { main: "Les clients évaluent votre travail. Les avis renforcent votre crédibilité.", bgImage: "/avis.jpg", time: 5 },
    { main: "Offre de lancement\u00a0: inscription gratuite.", bgImage: "/gratos.jpg", time: 4 },
    { main: "Rejoignez AllSherut dès aujourd'hui et augmentez votre visibilité.", bgImage: "/itstarfou.jpg", time: 5 },
  ],
  en: [
    { main: "Do you offer services and want to grow your client base?", bgImage: "/artisan.jpg", time: 4 },
    { main: "AllSherut helps you grow your business.", bgImage: "/aide.jpg", time: 4 },
    { main: "Simple and fast online registration.", bgVideo: "/arshama.mp4", bgFallback: "/images/electrician.jpg", time: 5 },
    { main: "Over 20 service categories on a single platform.", isMarquee: true, time: 7 },
    { main: "Easily access your personal dashboard.", bgVideo: "/dashboard.mp4", bgFallback: "/images/nikayon.jpg", time: 5 },
    { main: "Update your information at any time.", bgVideo: "/idkounpratim.mp4", bgFallback: "/images/jardinage.jpg", time: 6 },
    { main: "Clients rate your work. Reviews build your credibility.", bgImage: "/avis.jpg", time: 5 },
    { main: "Launch offer: free registration.", bgImage: "/gratos.jpg", time: 4 },
    { main: "Join AllSherut today and boost your visibility.", bgImage: "/itstarfou.jpg", time: 5 },
  ],
};

const ANIM_CLASSES = ['impact-left', 'impact-right', 'impact-top', 'impact-zoom', 'impact-shrink'];

// iOS Safari crashes when <video> elements are used alongside <audio> + heavy CSS animations
// (WebKit content process OOM). Skip video entirely on iOS; show tech idle layer instead.
const isIOS = typeof navigator !== 'undefined' && (
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
);

const MarqueeItem = ({ src }) => {
  if (!src) return null;
  return (
    <img
      src={src}
      className="marquee-media"
      alt="service"
      loading="lazy"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://placehold.co/200x200/dbeafe/2563eb?text=AllSherut`;
      }}
    />
  );
};

const getAnimClass = (baseClass, time) => {
  if (time >= 8) return `${baseClass}-long`;
  if (time >= 5) return `${baseClass}-5s`;
  return baseClass;
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;800;900&display=swap');

  .promo-container {
    position: relative;
    width: 100%;
    aspect-ratio: 9/16;
    max-width: 420px;
    margin: 0 auto;
    background: linear-gradient(180deg, #060c1f 0%, #0d1b3e 50%, #060c1f 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-family: 'Heebo', sans-serif;
    direction: ltr;
    container-type: inline-size;
    border-radius: 16px;
  }

  @media (max-width: 520px) {
    .promo-container {
      max-width: 85vw;
      border-radius: 12px;
    }
  }

  /* ── IMAGE DE FOND ── */
  .slide-bg {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 1;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .slide-bg img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    transform-origin: center center;
  }
  .slide-bg.visible img {
    animation: kenBurns 7s ease-out forwards;
  }
  @keyframes kenBurns {
    0%   { transform: scale(1); }
    100% { transform: scale(1.1); }
  }
  .slide-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0,0,0,0.1) 0%,
      rgba(0,0,0,0.0) 30%,
      rgba(6,12,31,0.7) 65%,
      rgba(6,12,31,0.95) 100%
    );
  }
  .slide-bg.hidden { opacity: 0; }
  .slide-bg.visible { opacity: 1; }

  /* ── VIDÉO SLIDE (letterbox 16:9 dans 9:16) ── */
  .slide-video-wrap {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    transition: opacity 1s ease;
    overflow: hidden;
  }
  .slide-video-wrap.hidden  { opacity: 0; }
  .slide-video-wrap.visible { opacity: 1; }
  /* slide-video-blur supprimé — remplacé par le dégradé ::after pour économiser la RAM iOS */
  .slide-video-main {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
    max-height: 56%;
    object-fit: contain;
    border-radius: 6px;
    box-shadow: 0 0 80px rgba(0,0,0,0.7);
  }
  .slide-video-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(6,12,31,0.0) 40%, rgba(6,12,31,0.75) 75%, rgba(6,12,31,0.96) 100%);
    pointer-events: none;
  }

  .bg-ambient {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }
  .blob-1 {
    position: absolute;
    width: 350px; height: 350px;
    top: -100px; left: -120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%);
    animation: blobDrift 22s ease-in-out infinite;
  }
  .blob-2 {
    position: absolute;
    width: 300px; height: 300px;
    bottom: 100px; right: -80px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%);
    animation: blobDrift 28s ease-in-out infinite reverse 6s;
  }
  @keyframes blobDrift {
    0%,100% { transform: translate(0,0) scale(1); }
    33%     { transform: translate(15px,-12px) scale(1.04); }
    66%     { transform: translate(-12px,15px) scale(0.97); }
  }

  /* ── PARTICULES ── */
  .particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 3;
    animation: floatUp linear infinite;
  }
  @keyframes floatUp {
    0%   { transform: translateY(0) translateX(0); opacity: 0; }
    8%   { opacity: 1; }
    92%  { opacity: 0.4; }
    100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
  }

  /* ── IDLE TECH ── */
  .idle-layer {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    pointer-events: none;
    transition: opacity 0.8s ease;
  }
  .idle-layer.hidden  { opacity: 0; }
  .idle-layer.visible { opacity: 1; }
  .tech-grid {
    position: absolute;
    width: 200%; height: 200%;
    top: -50%; left: -50%;
    background-image:
      linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px);
    background-size: 55px 55px;
    transform: perspective(600px) rotateX(55deg);
    animation: gridMove 18s linear infinite;
  }
  @keyframes gridMove {
    0%   { transform: perspective(600px) rotateX(55deg) translateY(0); }
    100% { transform: perspective(600px) rotateX(55deg) translateY(55px); }
  }
  .pulse-circle {
    position: absolute;
    top: 50%; left: 50%;
    border-radius: 50%;
    animation: pulseExpand 7s infinite linear;
  }
  .pc-1 { width:180px; height:180px; border:1px solid rgba(59,130,246,0.25);  animation-delay:0s; }
  .pc-2 { width:360px; height:360px; border:1px solid rgba(96,165,250,0.18);  animation-delay:-2.3s; }
  .pc-3 { width:560px; height:560px; border:1px solid rgba(147,197,253,0.12); animation-delay:-4.6s; }
  @keyframes pulseExpand {
    0%   { transform:translate(-50%,-50%) scale(0.4); opacity:0; }
    40%  { opacity:1; }
    100% { transform:translate(-50%,-50%) scale(1.7); opacity:0; }
  }

  /* ── MARQUEE ── */
  .marquee-layer {
    position: absolute;
    top:-20%; left:-20%;
    width:140%; height:140%;
    display:flex; flex-direction:column; justify-content:center; gap:36px;
    transform:rotate(-5deg);
    z-index:2;
    opacity:0;
    transition:opacity 1s cubic-bezier(0.4,0,0.2,1);
    pointer-events:none;
    mask-image:radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%);
-webkit-mask-image:radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%);
    direction:ltr;
  }
  .marquee-layer.visible { opacity:0.88; }
  .marquee-row { display:flex; gap:20px; width:max-content; backface-visibility:hidden; }
  .scroll-left  { animation:scroll 40s linear infinite; }
  .scroll-right { animation:scrollReverse 40s linear infinite; }
  @keyframes scroll        { 0%{transform:translateX(0)}    100%{transform:translateX(-50%)} }
  @keyframes scrollReverse { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
  .marquee-media {
    width:250px; height:155px;
    border-radius:18px;
    object-fit:cover;
    box-shadow:0 10px 30px rgba(59,130,246,0.15);
    border:2.5px solid rgba(255,255,255,0.9);
    will-change:transform;
  }

  /* ── TEXTE EN BAS ── */
  .scene {
    position: absolute;
    z-index: 20;
    bottom: 16%;
    left: 0;
    right: 0;
    padding: 0 24px;
    pointer-events: none;
  }

  .text-card {
    opacity: 0;
    pointer-events: none;
  }

  /* Ligne lumineuse */
  .glow-line {
    height: 2px;
    width: 0;
    border-radius: 2px;
    background: linear-gradient(90deg, transparent, #38bdf8 40%, #2563eb 70%, transparent);
    margin-bottom: 14px;
  }
  .glow-line.active {
    animation: lineSlide 0.5s 0.1s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  @keyframes lineSlide {
    from { width: 0; opacity: 0; }
    to   { width: 100%; opacity: 1; }
  }

  .text-label {
    display: block;
    font-size: clamp(9px, 2.8vw, 13px) !important;;
    font-weight: 700;
    color: #38bdf8;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 8px;
    opacity: 0.85;
  }

  .text-main {
    font-size: clamp(26px, 6vw, 44px);
    font-weight: 900;
    line-height: 1.25;
    color: #ffffff;
    text-align: left;
    text-shadow:
      0 2px 24px rgba(14,165,233,0.4),
      0 0 80px rgba(37,99,235,0.25);
    letter-spacing: -0.01em;
    max-width: 90%;
    margin-right: auto;
  }

  /* ── ANIMATIONS TEXTE ── */
  .impact-left      { animation: txtLeft   4s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-left-5s   { animation: txtLeft   5s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-left-long { animation: txtLeft   8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-right      { animation: txtRight  4s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-right-5s   { animation: txtRight  5s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-right-long { animation: txtRight  8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-top      { animation: txtUp    4s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-top-5s   { animation: txtUp    5s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-top-long { animation: txtUp    8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-zoom      { animation: txtZoom  4s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-zoom-5s   { animation: txtZoom  5s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-zoom-long { animation: txtZoom  8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-shrink      { animation: txtDown  4s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-shrink-5s   { animation: txtDown  5s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-shrink-long { animation: txtDown  8s cubic-bezier(0.16,1,0.3,1) forwards; }

  @keyframes txtLeft {
    0%   { opacity:0; transform:translateX(-60px); }
    12%  { opacity:1; transform:translateX(5px); }
    18%  { transform:translateX(-1px); }
    23%  { transform:translateX(0); }
    100% { opacity:1; transform:translateX(0); }
  }
  @keyframes txtRight {
    0%   { opacity:0; transform:translateX(60px); }
    12%  { opacity:1; transform:translateX(-5px); }
    18%  { transform:translateX(1px); }
    23%  { transform:translateX(0); }
    100% { opacity:1; transform:translateX(0); }
  }
  @keyframes txtUp {
    0%   { opacity:0; transform:translateY(40px); }
    12%  { opacity:1; transform:translateY(-4px); }
    18%  { transform:translateY(1px); }
    23%  { transform:translateY(0); }
    100% { opacity:1; transform:translateY(0); }
  }
  @keyframes txtZoom {
    0%   { opacity:0; transform:scale(1.3); }
    12%  { opacity:1; transform:scale(0.98); }
    18%  { transform:scale(1.01); }
    23%  { transform:scale(1); }
    100% { opacity:1; transform:scale(1); }
  }
  @keyframes txtDown {
    0%   { opacity:0; transform:translateY(-40px) scale(0.95); }
    12%  { opacity:1; transform:translateY(3px) scale(1.01); }
    18%  { transform:translateY(-1px) scale(1); }
    23%  { transform:translateY(0) scale(1); }
    100% { opacity:1; transform:translateY(0) scale(1); }
  }

  @keyframes logoAppear {
    0%   { opacity: 0; transform: scale(0.6) translateY(12px); }
    100% { opacity: 0.95; transform: scale(1) translateY(0); }
  }

  /* ── ANIMATION LIGNE PAR LIGNE ── */
  @keyframes promoFadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .text-promo-line {
    display: block;
    opacity: 0;
    animation: promoFadeInUp 0.6s ease forwards;
  }

  /* ── OVERLAY TAP TO START ── */
  .tap-overlay {
    position: absolute;
    inset: 0;
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(6,12,31,0.55);
    cursor: pointer;
    gap: 12px;
  }
  .tap-pulse {
    position: absolute;
    width: 90px; height: 90px;
    border-radius: 50%;
    border: 2px solid rgba(56,189,248,0.6);
    animation: tapPulse 1.6s ease-out infinite;
  }
  @keyframes tapPulse {
    0%   { transform: scale(0.8); opacity: 0.9; }
    100% { transform: scale(1.8); opacity: 0; }
  }
  .tap-icon {
    font-size: 44px;
    color: #fff;
    text-shadow: 0 0 24px rgba(56,189,248,0.8);
    position: relative;
    z-index: 1;
  }
  .tap-label {
    font-size: 16px !important;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    letter-spacing: 0.05em;
    position: relative;
    z-index: 1;
  }

  /* ── SÉLECTEUR DE LANGUE ── */
  .text-promo-lang {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 150;
    display: flex;
    gap: 5px;
  }
  .text-promo-lang-btn {
    height: 28px;
    padding: 0 9px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(15,30,80,0.6) 0%, rgba(14,165,233,0.25) 100%);
    border: 1px solid rgba(56,189,248,0.28);
    color: rgba(255,255,255,0.55);
    font-size: 11px !important;
    font-weight: 800;
    letter-spacing: 0.06em;
    cursor: pointer;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all 0.22s ease;
    outline: none;
    line-height: 1;
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: 'Heebo', sans-serif;
  }
  .text-promo-lang-btn:hover {
    background: linear-gradient(135deg, rgba(30,58,150,0.75) 0%, rgba(14,165,233,0.5) 100%);
    border-color: rgba(56,189,248,0.55);
    color: rgba(255,255,255,0.85);
    transform: scale(1.06);
  }
  .text-promo-lang-btn.text-promo-lang-active {
    background: linear-gradient(135deg, rgba(30,64,175,0.92) 0%, rgba(14,165,233,0.72) 100%);
    border-color: rgba(56,189,248,0.9);
    color: #e0f2fe;
    box-shadow: 0 2px 12px rgba(14,165,233,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
  }

  /* ── BARRE DE PROGRESSION ── */
  .progress-bar {
    position: absolute;
    bottom: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, #1d4ed8, #38bdf8, #7dd3fc);
    z-index: 100;
    transition: width 0.1s linear;
    border-radius: 0 2px 0 0;
    box-shadow: 0 0 8px rgba(56,189,248,0.6);
  }

  /* ── BOUTONS DE CONTRÔLE ── */
  .promo-controls {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 150;
    display: flex;
    gap: 8px;
  }
  .text-promo-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(30,58,120,0.75) 0%, rgba(14,165,233,0.45) 100%);
    border: 1px solid rgba(56,189,248,0.45);
    color: #e0f2fe;
    font-size: 15px !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: background 0.25s, transform 0.15s, box-shadow 0.25s, border-color 0.25s;
    outline: none;
    padding: 0;
    line-height: 1;
    box-shadow: 0 2px 12px rgba(14,165,233,0.25), inset 0 1px 0 rgba(255,255,255,0.12);
  }
  .text-promo-btn:hover {
    background: linear-gradient(135deg, rgba(30,64,175,0.9) 0%, rgba(14,165,233,0.7) 100%);
    border-color: rgba(56,189,248,0.8);
    box-shadow: 0 4px 20px rgba(14,165,233,0.45), inset 0 1px 0 rgba(255,255,255,0.18);
    transform: scale(1.1);
  }
  .text-promo-btn:active {
    transform: scale(0.93);
    box-shadow: 0 1px 6px rgba(14,165,233,0.2);
  }
  .text-promo-btn svg {
    width: 16px;
    height: 16px;
    display: block;
    filter: drop-shadow(0 0 4px rgba(56,189,248,0.6));
  }
`;

const SlideVideo = ({ src, isActive, playing, preload = "none", poster }) => {
  const ref = useRef(null);

  // Release iOS video buffer on unmount — prevents the OOM crash on slide transition
  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.pause();
        ref.current.removeAttribute('src');
        ref.current.load();
      }
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    if (isActive) {
      ref.current.currentTime = 0;
      if (playing) ref.current.play().catch(() => {});
    } else {
      ref.current.pause();
    }
  }, [isActive]);

  useEffect(() => {
    if (!ref.current || !isActive) return;
    if (playing) ref.current.play().catch(() => {});
    else ref.current.pause();
  }, [playing]);

  return (
    <div className={`slide-video-wrap ${isActive ? 'visible' : 'hidden'}`}>
      <video ref={ref} className="slide-video-main" src={src} loop muted playsInline preload={preload} poster={poster} />
    </div>
  );
};

const particles = [
  { size: 2, left: '10%', dur: 12, delay: 0,   color: 'rgba(255,255,255,0.5)' },
  { size: 3, left: '25%', dur: 18, delay: -4,  color: 'rgba(255,255,255,0.5)' },
  { size: 1, left: '40%', dur: 14, delay: -8,  color: 'rgba(255,255,255,0.5)' },
  { size: 2, left: '55%', dur: 20, delay: -2,  color: 'rgba(255,255,255,0.5)' },
  { size: 3, left: '70%', dur: 16, delay: -6,  color: 'rgba(96,165,250,0.7)'  },
  { size: 1, left: '82%', dur: 13, delay: -10, color: 'rgba(255,255,255,0.5)' },
  { size: 2, left: '16%', dur: 22, delay: -3,  color: 'rgba(147,197,253,0.6)' },
  { size: 2, left: '60%', dur: 17, delay: -7,  color: 'rgba(255,255,255,0.5)' },
];

const LANG_LABELS = { fr: 'FR', en: 'EN' };
const LANG_ORDER  = ['fr', 'en'];

const PromoVideoVertical = ({ videoSrc = "/background.mp4", audioSrc = "/musique.mp3", services = [] }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [started, setStarted]         = useState(false);
  const [isPlaying, setIsPlaying]     = useState(true);
  const [isMuted, setIsMuted]         = useState(false);
  const [promoLang, setPromoLang]     = useState('fr');
  const audioRef       = useRef(null);
  const requestRef     = useRef(null);
  const startTimeRef   = useRef(null);
  const currentTimeRef = useRef(0);
  const pausedAtRef    = useRef(0);
  const lastUpdateRef  = useRef(0);

  const promoTexts = promoTranslations[promoLang] || promoTranslations.fr;
  const isRTL      = false;

  const defaultMedia = [
    '/images/babysite.jpg','/images/nikayon.jpg','/images/jardinage.jpg',
    '/images/chien.jpg','/images/tutoring.png','/images/eldercare.jpg',
    '/images/plombier.jpg','/images/clim.png','/images/gaz.jpg'
  ];
  const displayMedia      = services.length > 0 ? services.map(s => s.image || s) : defaultMedia;
  const marqueeListTop    = [...displayMedia,...displayMedia,...displayMedia];
  const mid               = Math.floor(displayMedia.length / 2);
  const shifted           = [...displayMedia.slice(mid),...displayMedia.slice(0,mid)];
  const marqueeListMiddle = [...shifted,...shifted,...shifted];
  const reversed          = [...displayMedia].reverse();
  const marqueeListBottom = [...reversed,...reversed,...reversed];

  const duration = promoTexts.reduce((a, c) => a + c.time, 0);

  const handleLangChange = (e, lang) => {
    e.stopPropagation();
    setPromoLang(lang);
  };

  const animate = (ts) => {
    if (!startTimeRef.current) startTimeRef.current = ts - pausedAtRef.current * 1000;
    const elapsed = ((ts - startTimeRef.current) / 1000) % duration;
    currentTimeRef.current = elapsed;
    // Throttle state updates to ~4x/sec to avoid 60 re-renders/sec on iOS
    if (ts - lastUpdateRef.current > 250) {
      lastUpdateRef.current = ts;
      setCurrentTime(elapsed);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!started) return;
    if (audioRef.current) audioRef.current.play().catch(() => {});
    startTimeRef.current = null;
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [started]);

  const handleStart = () => {
    if (audioRef.current) audioRef.current.play().catch(() => {});
    setStarted(true);
  };

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      pausedAtRef.current = currentTimeRef.current;
      cancelAnimationFrame(requestRef.current);
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      startTimeRef.current = null;
      requestRef.current = requestAnimationFrame(animate);
      audioRef.current?.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMute = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  let accum = 0, activeSeq = 0;
  for (let i = 0; i < promoTexts.length; i++) {
    accum += promoTexts[i].time;
    if (currentTime < accum) { activeSeq = i; break; }
  }
  const activeSlide     = promoTexts[activeSeq];
  const isMarqueeActive = !!activeSlide?.isMarquee;
  const hasImage        = !!activeSlide?.bgImage;
  const hasVideo        = !!activeSlide?.bgVideo;
  // On iOS, video elements are suppressed — treat those slides as idle-layer slides
  const showIdleLayer   = !hasImage && !hasVideo && !isMarqueeActive;

  return (
    <div className="promo-container">
      <style>{styles}</style>

      {/* Ambient background */}
      <div className="bg-ambient">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
      </div>

      {/* Particules */}
      {particles.map((p, i) => (
        <div key={i} className="particle" style={{
          width: p.size, height: p.size,
          left: p.left, bottom: '-10px',
          background: p.color,
          animationDuration: `${p.dur}s`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}

      {/* Images de fond (Ken Burns) */}
      {promoTexts.map((slide, i) =>
        slide.bgImage ? (
          <div key={`bg-${i}`} className={`slide-bg ${activeSeq === i ? 'visible' : 'hidden'}`}>
            <img src={slide.bgImage} alt="" onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
        ) : null
      )}

      {/* Vidéos letterbox — préchargement désactivé sur iOS pour économiser la RAM */}
      {promoTexts.map((slide, i) => {
        if (!slide.bgVideo) return null;
        const isActive = activeSeq === i;
        const nextSeq = (activeSeq + 1) % promoTexts.length;
        const isPreloading = !isIOS && !isActive && i === nextSeq;
        if (!isActive && !isPreloading) return null;
        return (
          <SlideVideo
            key={`vid-${i}`}
            src={slide.bgVideo}
            isActive={isActive}
            playing={isActive && isPlaying}
            preload={isPreloading ? "auto" : "none"}
            poster={slide.bgFallback}
          />
        );
      })}

      {/* Idle tech */}
      <div className={`idle-layer ${showIdleLayer ? 'visible' : 'hidden'}`}>
        <div className="tech-grid"></div>
        <div className="pulse-circle pc-1"></div>
        <div className="pulse-circle pc-2"></div>
        <div className="pulse-circle pc-3"></div>
      </div>

      {/* Marquee — only mounted when the marquee slide is active to avoid iOS memory crash */}
      {isMarqueeActive && (
        <div className="marquee-layer visible">
          <div className="marquee-row scroll-left">
            {marqueeListTop.map((src,i) => <MarqueeItem key={`t-${i}`} src={src}/>)}
          </div>
          <div className="marquee-row scroll-right">
            {marqueeListMiddle.map((src,i) => <MarqueeItem key={`m-${i}`} src={src}/>)}
          </div>
          <div className="marquee-row scroll-left">
            {marqueeListBottom.map((src,i) => <MarqueeItem key={`b-${i}`} src={src}/>)}
          </div>
        </div>
      )}

      <audio ref={audioRef} loop src={audioSrc} preload="none" />

      {/* Sélecteur de langue — visible dès le début */}
      <div className="text-promo-lang">
        {LANG_ORDER.map(lang => (
          <button
            key={lang}
            className={`text-promo-lang-btn${promoLang === lang ? ' text-promo-lang-active' : ''}`}
            onClick={(e) => handleLangChange(e, lang)}
          >
            {LANG_LABELS[lang]}
          </button>
        ))}
      </div>

      {/* Boutons play/pause + mute — visibles après démarrage */}
      {started && (
        <div className="promo-controls">
          <button className="text-promo-btn" onClick={handlePlayPause} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="5" y="4" width="4" height="16" rx="1.5"/>
                <rect x="15" y="4" width="4" height="16" rx="1.5"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4.75a.75.75 0 0 0-1.2.6v13.3a.75.75 0 0 0 1.2.6l10.4-6.65a.75.75 0 0 0 0-1.2L6 4.75z"/>
              </svg>
            )}
          </button>
          <button className="text-promo-btn" onClick={handleMute} title={isMuted ? 'Activer le son' : 'Couper le son'}>
            {isMuted ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 4.07a.75.75 0 0 0-1.2-.6L7.08 7H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3.08l4.72 3.53A.75.75 0 0 0 13 19.93V4.07z"/>
                <line x1="17" y1="9" x2="22" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="22" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 4.07a.75.75 0 0 0-1.2-.6L7.08 7H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3.08l4.72 3.53A.75.75 0 0 0 13 19.93V4.07z"/>
                <path d="M17.5 8.5a5.5 5.5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                <path d="M20 6a9 9 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Texte EN BAS */}
      <div className="scene" dir={isRTL ? 'rtl' : 'ltr'}>
        {promoTexts.map((textObj, index) => {
          if (activeSeq !== index) return null;
          const base = ANIM_CLASSES[index % ANIM_CLASSES.length];
          const cls  = getAnimClass(base, textObj.time);
          const isLast = index === promoTexts.length - 1;
          return (
            <div key={`${index}-${activeSeq}`}>
              <div className="glow-line active" style={isLast ? {margin:'0 auto'} : {}}></div>
              <div className={`text-card ${cls}`}>
                <div className="text-main" style={isLast ? {textAlign:'center', margin:'0 auto'} : isRTL ? {textAlign:'right'} : {}}>
                  {(() => {
                    const words = textObj.main.split(' ');
                    const half  = Math.ceil(words.length / 2);
                    const lines = words.length <= 4
                      ? [textObj.main]
                      : [words.slice(0, half).join(' '), words.slice(half).join(' ')];
                    return lines.map((line, li) => (
                      <span key={li} className="text-promo-line" style={{ animationDelay: `${0.3 + li * 0.5}s` }}>
                        {line}
                      </span>
                    ));
                  })()}
                </div>
              </div>
            </div>
          );
        })}
      {activeSeq === promoTexts.length - 1 && (
        <div style={{display:'flex', justifyContent:'center', marginTop:'20px', animation:'logoAppear 0.8s cubic-bezier(0.16,1,0.3,1) forwards'}}>
          <img src="/icon-192.jpg" alt="" style={{height:'120px', width:'120px', borderRadius:'50%', opacity:0.95, boxShadow:'0 0 32px rgba(56,189,248,0.6)'}} />
        </div>
      )}
      </div>

      <div className="progress-bar" style={{ width: `${(currentTime / duration) * 100}%` }} />

      {/* Overlay tap-to-start pour iOS Safari */}
      {!started && (
        <div className="tap-overlay" onClick={handleStart}>
          <div className="tap-pulse"></div>
          <span className="tap-icon">▶</span>
          <span className="tap-label">Appuyez pour commencer</span>
        </div>
      )}
    </div>
  );
};

export default PromoVideoVertical;// rebuild Thu May 7 2026 - iOS crash fix v2: disable video on iOS (isIOS guard), cleanup src on unmount, preload=none on audio+video
