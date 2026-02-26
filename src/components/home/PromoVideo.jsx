import React, { useState, useRef, useEffect } from 'react';

// ─── TEXTES + IMAGES DE FOND ───────────────────────────────────────────────
// bgImage  : chemin vers l'image (null = animation techno par défaut)
// isMarquee: garde le défilé de photos existant
// time     : durée d'affichage en secondes
const promoTexts = [
  {
    main: "האם אתם נותני שירות ומעוניינים להיחשף לקהל רחב יותר?",
    bgImage: "/artisan.jpg",
    time: 5
  },
  {
    main: "AllSherut עוזרת לכם לפתח את העסק שלכם.",
    bgImage: "/aide.jpg",
    time: 4
  },
  {
    main: "הרשמה פשוטה ומהירה אונליין.",
    bgImage: null,
    time: 4
  },
  {
    main: "בחרו את השירותים שלכם מתוך יותר מ־20 קטגוריות.",
    isMarquee: true,
    bgImage: null,
    time: 8
  },
  {
    main: "גשו לאזור האישי שלכם.",
    bgImage: "/dashboard.mp4",
    time: 4
  },
  {
    main: "עדכנו את הפרטים שלכם בכל עת.",
    bgImage: null,
    time: 4
  },
  {
    main: "הלקוחות מדרגים את העבודה שלכם. הביקורות מחזקות את האמינות שלכם.",
    bgImage: "/avis.jpg",
    time: 5
  },
  {
    main: "מבצע השקה: הרשמה חינם.",
    bgImage: "/gratos.jpg",
    time: 4
  },
  {
    main: "הצטרפו ל-AllSherut עוד היום והגדילו את החשיפה והנוכחות שלכם בשוק.",
    bgImage: null,
    time: 5
  }
];

const ANIM_CLASSES = ['impact-left', 'impact-right', 'impact-top', 'impact-zoom', 'impact-shrink'];

const MarqueeItem = ({ src }) => {
  if (!src) return null;
  return (
    <img
      src={src}
      className="marquee-media"
      alt="service"
      loading="eager"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://placehold.co/240x150/dbeafe/2563eb?text=AllSherut`;
      }}
    />
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;800;900&display=swap');

  .promo-container {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 600px;
    background: linear-gradient(160deg, #ffffff 0%, #eff6ff 40%, #dbeafe 75%, #bfdbfe 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-family: 'Heebo', sans-serif;
    direction: rtl;
  }

  @media (max-width: 768px) {
    .promo-container {
      min-height: 320px;
      height: 55vw;
      max-height: 480px;
    }
  }

  .promo-container.is-paused * {
    animation-play-state: paused !important;
  }

  /* ── IMAGE DE FOND PAR SLIDE ── */
  .slide-bg {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 1;
    pointer-events: none;
    transition: opacity 0.8s ease;
  }
  .slide-bg img {
    width: 100%; height: 100%;
    object-fit: contain;
    display: block;
  }
  /* Overlay dégradé pour garder le texte lisible */
  .slide-bg::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(
      160deg,
      rgba(255,255,255,0.55) 0%,
      rgba(239,246,255,0.45) 40%,
      rgba(219,234,254,0.40) 75%,
      rgba(191,219,254,0.50) 100%
    );
  }
  .slide-bg.hidden { opacity: 0; }
  .slide-bg.visible { opacity: 1; }

  .bg-video {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    opacity: 0.06;
    mix-blend-mode: multiply;
    z-index: 0;
    pointer-events: none;
  }

  /* ── BLOBS ── */
  .bg-blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
  .bb-1 {
    width:500px; height:500px;
    top:-150px; left:-100px;
    background: radial-gradient(circle, rgba(219,234,254,0.8) 0%, transparent 70%);
    animation: blobDrift 20s ease-in-out infinite;
  }
  .bb-2 {
    width:420px; height:420px;
    bottom:-120px; right:-80px;
    background: radial-gradient(circle, rgba(191,219,254,0.7) 0%, transparent 70%);
    animation: blobDrift 26s ease-in-out infinite reverse 5s;
  }
  @keyframes blobDrift {
    0%,100% { transform: translate(0,0) scale(1); }
    33%     { transform: translate(30px,-20px) scale(1.05); }
    66%     { transform: translate(-20px,30px) scale(0.97); }
  }

  /* ── COUCHE TECH (affiché seulement quand pas d'image de fond) ── */
  .idle-layer {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
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
      linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px);
    background-size: 70px 70px;
    transform: perspective(600px) rotateX(55deg);
    animation: gridMove 18s linear infinite;
  }
  @keyframes gridMove {
    0%   { transform: perspective(600px) rotateX(55deg) translateY(0); }
    100% { transform: perspective(600px) rotateX(55deg) translateY(70px); }
  }

  .pulse-circle {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 50%;
    animation: pulseExpand 7s infinite linear;
  }
  .pc-1 { width:280px; height:280px; border:2px solid rgba(59,130,246,0.22); animation-delay:0s; }
  .pc-2 { width:560px; height:560px; border:2px solid rgba(96,165,250,0.16); animation-delay:-2.3s; }
  .pc-3 { width:840px; height:840px; border:1.5px solid rgba(147,197,253,0.12); animation-delay:-4.6s; }
  @keyframes pulseExpand {
    0%   { transform:translate(-50%,-50%) scale(0.4); opacity:0; }
    40%  { opacity:1; }
    100% { transform:translate(-50%,-50%) scale(1.6); opacity:0; }
  }

  .geo-shape {
    position: absolute;
    background: rgba(255,255,255,0.8);
    border: 1.5px solid rgba(147,197,253,0.55);
    box-shadow: 0 8px 32px rgba(59,130,246,0.1), 0 2px 8px rgba(59,130,246,0.06);
    backdrop-filter: blur(8px);
    z-index: 2;
  }
  .gs-1 { width:110px; height:110px; top:12%; left:7%; border-radius:24px; animation:floatGeo 13s ease-in-out infinite; background:linear-gradient(135deg,rgba(255,255,255,0.95),rgba(219,234,254,0.8)); }
  .gs-2 { width:160px; height:160px; bottom:15%; right:6%; border-radius:50%; animation:floatGeo 16s ease-in-out infinite reverse; background:linear-gradient(135deg,rgba(219,234,254,0.85),rgba(191,219,254,0.6)); }
  .gs-3 { width:75px; height:75px; top:18%; right:12%; border-radius:16px; transform:rotate(30deg); animation:floatGeo 10s ease-in-out infinite 1.5s; }
  .gs-4 { width:50px; height:50px; bottom:25%; left:12%; border-radius:12px; transform:rotate(-20deg); animation:floatGeo 9s ease-in-out infinite 3s; }
  @keyframes floatGeo {
    0%,100% { transform: translateY(0) rotate(0deg); }
    50%     { transform: translateY(-35px) rotate(12deg); }
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
    mask-image:radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%);
    -webkit-mask-image:radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%);
    direction:ltr;
  }
  .marquee-layer.visible { opacity:0.88; }
  .marquee-row { display:flex; gap:20px; width:max-content; }
  .scroll-left  { animation:scroll 40s linear infinite; }
  .scroll-right { animation:scrollReverse 40s linear infinite; }
  @keyframes scroll        { 0%{transform:translateX(0)}    100%{transform:translateX(-50%)} }
  @keyframes scrollReverse { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
  .marquee-media {
    width:250px; height:155px;
    border-radius:18px;
    object-fit:cover;
    box-shadow:0 10px 30px rgba(59,130,246,0.15), 0 2px 8px rgba(0,0,0,0.06);
    border:2.5px solid rgba(255,255,255,0.95);
  }

  /* ── TEXTES ── */
  .scene {
    position:relative; z-index:10;
    width:100%; height:100%;
    display:flex; justify-content:center; align-items:center;
    pointer-events:none;
  }

  .text-card {
    position:absolute;
    padding:52px 72px;
    background: rgba(255,255,255,0.75);
    backdrop-filter:blur(28px) saturate(180%);
    -webkit-backdrop-filter:blur(28px) saturate(180%);
    border:1.5px solid rgba(147,197,253,0.45);
    border-top:1.5px solid rgba(255,255,255,0.98);
    border-left:1.5px solid rgba(255,255,255,0.98);
    border-radius:36px;
    box-shadow:
      0 24px 64px rgba(59,130,246,0.13),
      0 4px 16px rgba(59,130,246,0.07),
      inset 0 0 0 1px rgba(255,255,255,0.65);
    text-align:center;
    max-width:1100px; width:90%;
    opacity:0;
    transform:scale(0.95) translateY(20px);
    pointer-events:none;
  }

  @media (max-width: 768px) {
    .text-card { padding:26px 20px; border-radius:20px; width:88%; }
  }

  .main-text {
    font-size: clamp(28px, 5.5vw, 88px);
    font-weight: 900;
    line-height: 1.2;
    background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 35%, #0ea5e9 70%, #38bdf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
    filter: drop-shadow(0 2px 12px rgba(37,99,235,0.2));
  }

  .sub-text {
    display:block;
    font-size: clamp(18px, 3vw, 48px);
    font-weight:600;
    color:#3b82f6;
    margin-top:16px;
    opacity:0.85;
  }

  /* ── ANIMATIONS IMPACT ── */
  .impact-left        { animation: impactFromLeft  4s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-left-long   { animation: impactFromLeft  8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-left-5s     { animation: impactFromLeft  5s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-right       { animation: impactFromRight 4s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-right-long  { animation: impactFromRight 8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-right-5s    { animation: impactFromRight 5s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-top         { animation: impactFromTop   4s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-top-long    { animation: impactFromTop   8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-top-5s      { animation: impactFromTop   5s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-zoom        { animation: impactZoom      4s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-zoom-long   { animation: impactZoom      8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-zoom-5s     { animation: impactZoom      5s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-shrink      { animation: impactShrink    4s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-shrink-long { animation: impactShrink    8s cubic-bezier(0.16,1,0.3,1) forwards; }
  .impact-shrink-5s   { animation: impactShrink    5s cubic-bezier(0.16,1,0.3,1) forwards; }

  @keyframes impactFromLeft {
    0%   { opacity:0; transform:translateX(-150%) scaleX(1.5) skewX(-12deg); filter:blur(20px); }
    8%   { opacity:1; transform:translateX(7%) scaleX(0.94) skewX(3deg);    filter:blur(0); }
    12%  { transform:translateX(-2%) scaleX(1.02); }
    16%  { transform:translateX(0) scaleX(1) skewX(0); }
    80%  { opacity:1; transform:translateX(0) scale(1); }
    100% { opacity:0; transform:translateX(6%) scale(1.04); }
  }
  @keyframes impactFromRight {
    0%   { opacity:0; transform:translateX(150%) scaleX(1.5) skewX(12deg);  filter:blur(20px); }
    8%   { opacity:1; transform:translateX(-7%) scaleX(0.94) skewX(-3deg);  filter:blur(0); }
    12%  { transform:translateX(2%) scaleX(1.02); }
    16%  { transform:translateX(0) scaleX(1) skewX(0); }
    80%  { opacity:1; transform:translateX(0) scale(1); }
    100% { opacity:0; transform:translateX(-6%) scale(1.04); }
  }
  @keyframes impactFromTop {
    0%   { opacity:0; transform:translateY(-150%) scaleY(1.5) skewY(-6deg); filter:blur(20px); }
    8%   { opacity:1; transform:translateY(7%) scaleY(0.93) skewY(2deg);    filter:blur(0); }
    13%  { transform:translateY(-2%) scaleY(1.03); }
    17%  { transform:translateY(0) scaleY(1) skewY(0); }
    80%  { opacity:1; transform:scale(1); }
    100% { opacity:0; transform:translateY(-5%) scale(1.03); }
  }
  @keyframes impactZoom {
    0%   { opacity:0; transform:scale(5) rotate(10deg);    filter:blur(30px); }
    9%   { opacity:1; transform:scale(0.93) rotate(-2deg); filter:blur(0); }
    13%  { transform:scale(1.04) rotate(0.5deg); }
    17%  { transform:scale(1) rotate(0); }
    80%  { opacity:1; transform:scale(1); }
    100% { opacity:0; transform:scale(1.06);}
  }
  @keyframes impactShrink {
    0%   { opacity:0; transform:scale(0.02) rotate(-15deg); filter:blur(24px); }
    10%  { opacity:1; transform:scale(1.08) rotate(2deg);   filter:blur(0); }
    15%  { transform:scale(0.97) rotate(-0.5deg); }
    19%  { transform:scale(1) rotate(0); }
    80%  { opacity:1; transform:scale(1); }
    100% { opacity:0; transform:scale(0.95);}
  }

  /* ── CONTRÔLES ── */
  .controls-container {
    position:absolute;
    bottom:24px; left:24px;
    z-index:9999;
    display:flex; gap:12px;
    pointer-events:auto;
    touch-action:manipulation;
    direction:ltr;
  }
  @media (max-width:768px) {
    .controls-container { bottom:12px; left:12px; gap:8px; }
  }

  .control-btn {
    width:52px; height:52px;
    background:rgba(255,255,255,0.88);
    backdrop-filter:blur(12px);
    border:1.5px solid rgba(147,197,253,0.65);
    border-radius:50%;
    display:flex; justify-content:center; align-items:center;
    cursor:pointer;
    color:#2563eb;
    transition:all 0.25s cubic-bezier(0.4,0,0.2,1);
    box-shadow:0 4px 16px rgba(59,130,246,0.15);
    pointer-events:auto;
    touch-action:manipulation;
    -webkit-tap-highlight-color:transparent;
    user-select:none;
  }
  @media (max-width:768px) {
    .control-btn { width:42px; height:42px; }
    .control-btn svg { width:20px; height:20px; }
  }
  .control-btn:hover,
  .control-btn:active {
    transform:translateY(-3px) scale(1.08);
    background:rgba(219,234,254,0.97);
    border-color:#3b82f6;
    box-shadow:0 8px 24px rgba(59,130,246,0.28);
  }
  .control-btn svg { width:24px; height:24px; fill:currentColor; }

  /* ── BARRE DE PROGRESSION ── */
  .progress-bar {
    position:absolute;
    bottom:0; right:0;
    height:5px;
    background:linear-gradient(90deg, #2563eb, #38bdf8, #7dd3fc);
    background-size:200% 200%;
    animation:gradientShift 3s ease infinite;
    z-index:100;
    transition:width 0.1s linear;
    border-radius:0 0 0 4px;
  }
  @keyframes gradientShift {
    0%   { background-position:0% 50%; }
    50%  { background-position:100% 50%; }
    100% { background-position:0% 50%; }
  }
`;

// Retourne la classe d'animation adaptée à la durée de la slide
const getAnimClass = (baseClass, time) => {
  if (time >= 8) return `${baseClass}-long`;
  if (time >= 5) return `${baseClass}-5s`;
  return baseClass;
};

const PromoVideo = ({ videoSrc = "/background.mp4", audioSrc = "/musique.mp3", services = [] }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted,  setIsMuted]  = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef     = useRef(null);
  const audioRef     = useRef(null);
  const requestRef   = useRef(null);
  const startTimeRef = useRef(null);

  const defaultMedia = [
    '/images/babysite.png','/images/nikayon.jpg','/images/jardinage.jpg',
    '/images/chien.jpg','/images/tutoring.png','/images/eldercare.png',
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

  const animate = (time) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    if (!isPaused) {
      setCurrentTime(((time - startTimeRef.current) / 1000) % duration);
    } else {
      startTimeRef.current = time - (currentTime * 1000);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused, currentTime, duration]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    isPaused ? v.pause() : v.play().catch(() => {});
  }, [isPaused]);

  // Calcule quelle slide est active
  let accum = 0, activeSeq = 0;
  for (let i = 0; i < promoTexts.length; i++) {
    accum += promoTexts[i].time;
    if (currentTime < accum) { activeSeq = i; break; }
  }
  const activeSlide     = promoTexts[activeSeq];
  const isMarqueeActive = activeSlide?.isMarquee;
  const hasImage        = !!activeSlide?.bgImage;
  // L'animation techno s'affiche quand il n'y a pas d'image et pas de marquee
  const showIdleLayer   = !hasImage && !isMarqueeActive;

  const toggleVideo = () => setIsPaused(p => !p);
  const toggleSound = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused || isMuted) { a.play().catch(()=>{}); setIsMuted(false); }
    else { a.pause(); setIsMuted(true); }
  };

  const IconPlay     = () => <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
  const IconPause    = () => <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
  const IconSoundOn  = () => <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;
  const IconSoundOff = () => <svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>;

  return (
    <div className={`promo-container ${isPaused ? 'is-paused' : ''}`}>
      <style>{styles}</style>

      {/* Vidéo de fond subtile */}
      <video ref={videoRef} className="bg-video" autoPlay loop muted playsInline>
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Blobs décoratifs */}
      <div className="bg-blob bb-1"></div>
      <div className="bg-blob bb-2"></div>

      {/* ── IMAGE DE FOND PAR SLIDE ── */}
      {/* On render TOUTES les images mais on cache celles qui ne sont pas actives */}
      {promoTexts.map((slide, i) =>
        slide.bgImage ? (
          <div
            key={`bg-${i}`}
            className={`slide-bg ${activeSeq === i ? 'visible' : 'hidden'}`}
          >
            <img
              src={slide.bgImage}
              alt=""
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        ) : null
      )}

      {/* ── ANIMATION TECHNO (uniquement si pas d'image et pas de marquee) ── */}
      <div className={`idle-layer ${showIdleLayer ? 'visible' : 'hidden'}`}>
        <div className="tech-grid"></div>
        <div className="pulse-circle pc-1"></div>
        <div className="pulse-circle pc-2"></div>
        <div className="pulse-circle pc-3"></div>
        <div className="geo-shape gs-1"></div>
        <div className="geo-shape gs-2"></div>
        <div className="geo-shape gs-3"></div>
        <div className="geo-shape gs-4"></div>
      </div>

      {/* ── MARQUEE ── */}
      <div className={`marquee-layer ${isMarqueeActive ? 'visible' : ''}`}>
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

      <audio ref={audioRef} loop src={audioSrc}></audio>

      {/* ── TEXTES ── */}
      <div className="scene">
        {promoTexts.map((textObj, index) => {
          if (activeSeq !== index) return null;
          const base = ANIM_CLASSES[index % ANIM_CLASSES.length];
          const cls  = getAnimClass(base, textObj.time);
          return (
            <div key={index} className={`text-card ${cls}`}>
              <div className="main-text">{textObj.main}</div>
              {textObj.sub && <span className="sub-text">{textObj.sub}</span>}
            </div>
          );
        })}
      </div>

      {/* ── CONTRÔLES ── */}
      <div className="controls-container">
        <button
          className="control-btn"
          onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); toggleVideo(); }}
          title="Lecture/Pause"
        >
          {isPaused ? <IconPlay /> : <IconPause />}
        </button>
        <button
          className="control-btn"
          onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); toggleSound(); }}
          title="Son"
        >
          {isMuted ? <IconSoundOff /> : <IconSoundOn />}
        </button>
      </div>

      <div className="progress-bar" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
    </div>
  );
};

export default PromoVideo;