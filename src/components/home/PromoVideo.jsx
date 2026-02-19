import React, { useState, useRef, useEffect } from 'react';

const promoTexts = [
  { main: "האם אתם נותני שירות ומחפשים להיחשף לקהל רחב יותר?", sub: "", time: 4 },
  { main: "AllSherut כאן כדי ללוות אתכם", sub: "", time: 4 },
  { main: "הרשמה פשוטה ומהירה", sub: "", time: 4 },
  { main: "בחרו את השירותים שאתם מציעים", sub: "", time: 4 },
  { main: "+20 קטגוריות", sub: "מקום אחד לניהול העסק", isMarquee: true, time: 8 },
  { main: "גשו לאזור האישי שלכם", sub: "", time: 4 },
  { main: "עדכנו את הפרטים שלכם בכל עת", sub: "", time: 4 },
  { main: "הפרופיל שלכם נשאר ברור ומעודכן", sub: "", time: 4 },
  { main: "הגדילו את החשיפה שלכם בהתאם לשירותים שאתם מציעים", sub: "", time: 4 },
  { main: "הגיעו ללקוחות שמחפשים באמת את השירות שלכם", sub: "", time: 4 },
  { main: "הלקוחות מדרגים את העבודה שלכם", sub: "", time: 4 },
  { main: "הביקורות מחזקות את האמינות שלכם", sub: "", time: 4 },
  { main: "מקום אחד לניהול כל הפעילות שלכם", sub: "", time: 4 },
  { main: "AllSherut משיקה את מבצע ההשקה", sub: "", time: 4 },
  { main: "הרשמה חינם לנותני שירות", sub: "", time: 4 },
  { main: "הצטרפו ל-AllSherut כבר עכשיו", sub: "", time: 4 }
];

// Direction d'entrée aléatoire pour chaque slide
const DIRECTIONS = [
  { from: 'translateX(-120%) scale(0.6)', glitch: true },
  { from: 'translateX(120%) scale(0.6)', glitch: false },
  { from: 'translateY(-120%) scale(0.5)', glitch: true },
  { from: 'translateY(120%) scale(0.5)', glitch: false },
  { from: 'scale(3) rotate(8deg)', glitch: true },
  { from: 'scale(0) rotate(-12deg)', glitch: false },
];

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
         e.target.src = `https://placehold.co/240x150/1e293b/60a5fa?text=AllSherut`;
       }}
     />
   );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;800;900&display=swap');

  /* ============================================================
     CONTAINER — responsive height
     ============================================================ */
  .promo-container {
      position: relative;
      width: 100%;
      height: 100%; 
      min-height: 600px;
      background: linear-gradient(135deg, #1a1a4e 0%, #2d1b5e 20%, #0d3b6e 40%, #1a4a3a 60%, #3d1a2e 80%, #1e3a5f 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      font-family: 'Heebo', sans-serif;
      color: #ffffff;
      direction: rtl; 
  }

  /* ── MOBILE : hauteur réduite ── */
  @media (max-width: 768px) {
    .promo-container {
      min-height: 320px;   /* ← Change cette valeur pour ajuster sur mobile */
      height: 50vw;        /* ← Ou utilise un % de la largeur d'écran */
      max-height: 480px;
    }
  }

  .promo-container.is-paused * {
      animation-play-state: paused !important;
  }

  /* --- ARRIÈRE-PLAN VIDÉO --- */
  .bg-video {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      opacity: 0.15; 
      mix-blend-mode: screen;
      z-index: 0;
      pointer-events: none;
  }

  /* --- FOND TECH --- */
  .idle-layer {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 1;
      overflow: hidden;
      pointer-events: none;
      transition: opacity 1s ease;
  }
  .idle-layer.hidden { opacity: 0.2; }

  /* Dégradé animé tournant */
.color-wheel {
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: conic-gradient(
        rgba(99, 20, 180, 0.4)   0deg,
        rgba(20, 100, 220, 0.4)  60deg,
        rgba(0, 180, 160, 0.35)  120deg,
        rgba(220, 60, 80, 0.3)   180deg,
        rgba(240, 140, 20, 0.25) 240deg,
        rgba(40, 200, 120, 0.3)  300deg,
        rgba(99, 20, 180, 0.4)   360deg
    );
    animation: spinWheel 18s linear infinite;
    z-index: 0;
    filter: blur(60px);
}
@keyframes spinWheel {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

  .tech-grid {
      position: absolute;
      width: 200%; height: 200%;
      top: -50%; left: -50%;
      background-image: 
          linear-gradient(rgba(96, 165, 250, 0.35), transparent 1px),
          linear-gradient(90deg, rgba(96, 165, 250, 0.35)1px, transparent 1px);
      background-size: 80px 80px;
      transform: perspective(500px) rotateX(60deg);
      animation: gridMove 15s linear infinite;
  }
  @keyframes gridMove {
      0%   { transform: perspective(500px) rotateX(60deg) translateY(0); }
      100% { transform: perspective(500px) rotateX(60deg) translateY(80px); }
  }

  .pulse-circle {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      border: 2px solid rgba(59,130,246,0.3);
      border-radius: 50%;
      animation: pulseExpand 6s infinite linear;
  }
  .pc-1 { width:300px; height:300px; animation-delay:0s; }
  .pc-2 { width:600px; height:600px; animation-delay:-2s; border-color:rgba(139,92,246,0.2); }
  .pc-3 { width:900px; height:900px; animation-delay:-4s; }
  @keyframes pulseExpand {
      0%   { transform:translate(-50%,-50%) scale(0.5); opacity:0; }
      50%  { opacity:1; }
      100% { transform:translate(-50%,-50%) scale(1.5); opacity:0; }
  }

  .geo-shape {
      position: absolute;
      background: linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02));
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 8px 32px rgba(31,38,135,0.3);
      border-radius: 20px;
      z-index: 2;
  }
  .gs-1 { width:100px;height:100px;top:15%;left:10%;animation:floatGeo 12s ease-in-out infinite;border-radius:16px; }
  .gs-2 { width:150px;height:150px;bottom:20%;right:8%;animation:floatGeo 15s ease-in-out infinite reverse;border-radius:50%; }
  .gs-3 { width:80px;height:80px;top:20%;right:15%;animation:floatGeo 10s ease-in-out infinite 1s;transform:rotate(45deg);border-radius:12px; }
  @keyframes floatGeo {
      0%   { transform:translateY(0) rotate(0deg); }
      50%  { transform:translateY(-40px) rotate(15deg); }
      100% { transform:translateY(0) rotate(0deg); }
  }

  /* --- MARQUEE --- */
  .marquee-layer {
      position: absolute;
      top:-20%;left:-20%;
      width:140%;height:140%;
      display:flex;flex-direction:column;justify-content:center;gap:40px;
      transform:rotate(-6deg);
      z-index:2;
      opacity:0;
      transition:opacity 1s cubic-bezier(0.4,0,0.2,1);
      pointer-events:none;
      mask-image:radial-gradient(circle,rgba(0,0,0,1) 30%,rgba(0,0,0,0) 80%);
      -webkit-mask-image:radial-gradient(circle,rgba(0,0,0,1) 30%,rgba(0,0,0,0) 80%);
      direction:ltr;
  }
  .marquee-layer.visible { opacity:0.85; }
  .marquee-row { display:flex;gap:24px;width:max-content; }
  .scroll-left  { animation:scroll 40s linear infinite; }
  .scroll-right { animation:scrollReverse 40s linear infinite; }
  @keyframes scroll         { 0%{transform:translateX(0)}    100%{transform:translateX(-50%)} }
  @keyframes scrollReverse  { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
  .marquee-media {
      width:260px;height:160px;border-radius:20px;object-fit:cover;
      box-shadow:0 15px 35px rgba(0,0,0,0.4);
      border:3px solid rgba(255,255,255,0.1);
  }

  /* ============================================================
     TEXTES — TAILLE ++
     ============================================================
     ► Pour changer la taille du texte principal : modifie clamp(60px, 7.5vw, 110px)
         - 1er chiffre = taille min (mobile)
         - 2e chiffre  = taille fluide (adaptatif)
         - 3e chiffre  = taille max (grand écran)
     ► Pour le sous-titre : clamp(28px, 3.5vw, 52px)
  */
  .scene {
      position:relative;z-index:10;
      width:100%;height:100%;
      display:flex;justify-content:center;align-items:center;
      pointer-events:none;
  }

  .text-card {
      position:absolute;
      padding:60px 80px;
      background: rgba(30, 58, 100, 0.55);
      backdrop-filter:blur(25px) saturate(200%);
      -webkit-backdrop-filter:blur(25px) saturate(200%);
      border:1px solid rgba(255,255,255,0.15);
      border-top:1px solid rgba(255,255,255,0.3);
      border-left:1px solid rgba(255,255,255,0.3);
      border-radius:40px;
      box-shadow:0 30px 60px rgba(0,0,0,0.5),inset 0 0 20px rgba(255,255,255,0.05);
      text-align:center;
      max-width:1200px;width:90%;
      opacity:0;
      transform:scale(0.95) translateY(20px);
      pointer-events:none;
  }

  /* ── MOBILE : padding réduit ── */
  @media (max-width: 768px) {
    .text-card {
      padding: 28px 24px;
      border-radius: 24px;
      width: 88%;
    }
  }

  .main-text {
      font-size: clamp(38px, 7.5vw, 110px); /* ← MODIFIE ICI pour la taille principale */
      font-weight: 900;
      line-height: 1.15;
      background: linear-gradient(to right,#ffffff 0%,#93c5fd 50%,#3b82f6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0px 10px 30px rgba(59,130,246,0.4);
      letter-spacing: -0.02em;
  }

  .sub-text {
      display:block;
      font-size: clamp(20px, 3.5vw, 52px); /* ← MODIFIE ICI pour la taille du sous-titre */
      font-weight:600;
      color:#94a3b8;
      margin-top:20px;
      text-shadow:0px 4px 10px rgba(0,0,0,0.5);
  }

  /* ============================================================
     ANIMATIONS IMPACT — texte qui déboule de nulle part
     ============================================================ */

  /* Slide depuis la gauche, ultra-rapide */
  .impact-left {
    animation: impactFromLeft 4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .impact-left-long {
    animation: impactFromLeft 8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes impactFromLeft {
    0%   { opacity:0; transform: translateX(-150%) scaleX(1.5) skewX(-12deg); filter: blur(20px); }
    8%   { opacity:1; transform: translateX(8%) scaleX(0.94) skewX(3deg);    filter: blur(0); }
    11%  { transform: translateX(-3%) scaleX(1.03); }
    14%  { transform: translateX(0) scaleX(1) skewX(0); }
    80%  { opacity:1; transform: translateX(0) scale(1); }
    92%  { opacity:1; transform: translateX(-2%) scale(1.01); }
    100% { opacity:0; transform: translateX(8%) scale(1.05); filter: blur(6px); }
}
@keyframes impactFromRight {
    0%   { opacity:0; transform: translateX(150%) scaleX(1.5) skewX(12deg); filter: blur(20px); }
    8%   { opacity:1; transform: translateX(-8%) scaleX(0.94) skewX(-3deg); filter: blur(0); }
    11%  { transform: translateX(3%) scaleX(1.03); }
    14%  { transform: translateX(0) scaleX(1) skewX(0); }
    80%  { opacity:1; transform: translateX(0) scale(1); }
    100% { opacity:0; transform: translateX(-8%) scale(1.05); filter: blur(6px); }
}
@keyframes impactFromTop {
    0%   { opacity:0; transform: translateY(-150%) scaleY(1.5) skewY(-6deg); filter: blur(20px); }
    8%   { opacity:1; transform: translateY(8%) scaleY(0.93) skewY(2deg);    filter: blur(0); }
    12%  { transform: translateY(-3%) scaleY(1.04); }
    16%  { transform: translateY(0) scaleY(1) skewY(0); }
    80%  { opacity:1; transform: scale(1); }
    100% { opacity:0; transform: translateY(-6%) scale(1.04); filter: blur(6px); }
}
@keyframes impactZoom {
    0%   { opacity:0; transform: scale(5) rotate(10deg); filter: blur(30px); }
    8%   { opacity:1; transform: scale(0.93) rotate(-2deg); filter: blur(0); }
    12%  { transform: scale(1.04) rotate(0.5deg); }
    16%  { transform: scale(1) rotate(0); }
    80%  { opacity:1; transform: scale(1); }
    100% { opacity:0; transform: scale(1.07); filter: blur(6px); }
}
@keyframes impactShrink {
    0%   { opacity:0; transform: scale(0.02) rotate(-15deg); filter: blur(24px); }
    10%  { opacity:1; transform: scale(1.08) rotate(2deg); filter: blur(0); }
    14%  { transform: scale(0.97) rotate(-0.5deg); }
    18%  { transform: scale(1) rotate(0); }
    80%  { opacity:1; transform: scale(1); }
    100% { opacity:0; transform: scale(0.95); filter: blur(6px); }
}

  /* ============================================================
     CONTRÔLES — FIX MOBILE (touch-action + z-index élevé)
     ============================================================ */
  .controls-container {
      position: absolute;
      bottom: 30px;
      left: 30px;
      z-index: 9999;           /* ← élevé pour passer au-dessus de tout */
      display: flex;
      gap: 15px;
      pointer-events: auto;    /* ← explicitement activé */
      touch-action: manipulation; /* ← fix tactile mobile */
      direction: ltr;
  }

  @media (max-width: 768px) {
    .controls-container {
      bottom: 14px;
      left: 14px;
      gap: 10px;
    }
  }

  .control-btn {
      width: 60px;
      height: 60px;
      background: rgba(30, 58, 100, 0.55);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #ffffff;
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
      box-shadow: 0 10px 20px rgba(0,0,0,0.3);
      pointer-events: auto;       /* ← redondant mais important */
      touch-action: manipulation; /* ← fix tactile mobile */
      -webkit-tap-highlight-color: transparent; /* ← supprime flash gris sur iOS */
      user-select: none;
  }

  @media (max-width: 768px) {
    .control-btn {
      width: 48px;
      height: 48px;
    }
  }

  .control-btn:hover,
  .control-btn:active {
      transform: translateY(-4px) scale(1.05);
      background: rgba(59,130,246,0.3);
      border-color: #60a5fa;
      box-shadow: 0 15px 25px rgba(59,130,246,0.4);
  }
  .control-btn svg { width:26px;height:26px;fill:currentColor; }

  /* Barre de progression */
  .progress-bar {
      position: absolute;
      bottom: 0; right: 0;
      height: 6px;
      background: linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899);
      background-size: 200% 200%;
      animation: gradientShift 3s ease infinite;
      z-index: 100;
      transition: width 0.1s linear;
  }
  @keyframes gradientShift {
      0%   { background-position:0% 50%; }
      50%  { background-position:100% 50%; }
      100% { background-position:0% 50%; }
  }
`;

// Mapping index → classe d'animation (cycle parmi 5 styles)
const ANIM_CLASSES = ['impact-left', 'impact-right', 'impact-top', 'impact-zoom', 'impact-shrink'];

const PromoVideo = ({ videoSrc = "/background.mp4", audioSrc = "/musique.mp3", services = [] }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted]   = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef    = useRef(null);
  const audioRef    = useRef(null);
  const requestRef  = useRef(null);
  const startTimeRef = useRef(null);

  const defaultMedia = [
    '/images/babysite.png','/images/nikayon.jpg','/images/jardinage.jpg',
    '/images/chien.jpg','/images/tutoring.png','/images/eldercare.png',
    '/images/plombier.jpg','/images/clim.png','/images/gaz.jpg'
  ];
  const displayMedia  = services.length > 0 ? services.map(s => s.image || s) : defaultMedia;
  const marqueeListTop = [...displayMedia,...displayMedia,...displayMedia];
  const midIndex = Math.floor(displayMedia.length / 2);
  const shiftedMedia = [...displayMedia.slice(midIndex),...displayMedia.slice(0,midIndex)];
  const marqueeListMiddle = [...shiftedMedia,...shiftedMedia,...shiftedMedia];
  const reversedMedia = [...displayMedia].reverse();
  const marqueeListBottom = [...reversedMedia,...reversedMedia,...reversedMedia];

  const duration = promoTexts.reduce((acc, curr) => acc + curr.time, 0);

  const animate = (time) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    if (!isPaused) {
      const elapsed = (time - startTimeRef.current) / 1000;
      const loopedTime = elapsed % duration;
      setCurrentTime(loopedTime);
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
    const video = videoRef.current;
    if (!video) return;
    if (isPaused) { video.pause(); }
    else { video.play().catch(e => console.log("Auto-play bloqué :", e)); }
  }, [isPaused]);

  let accum = 0, activeSeq = 0;
  for (let i = 0; i < promoTexts.length; i++) {
    accum += promoTexts[i].time;
    if (currentTime < accum) { activeSeq = i; break; }
  }

  const isMarqueeActive = promoTexts[activeSeq]?.isMarquee;

  const toggleVideo = (e) => { e?.stopPropagation(); setIsPaused(prev => !prev); };
  const toggleSound = (e) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused || isMuted) { audio.play().catch(()=>{}); setIsMuted(false); }
    else { audio.pause(); setIsMuted(true); }
  };

  const IconPlay    = () => <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
  const IconPause   = () => <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
  const IconSoundOn = () => <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;
  const IconSoundOff= () => <svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>;

  return (
    <div className={`promo-container ${isPaused ? 'is-paused' : ''}`}>
      <style>{styles}</style>

      <video ref={videoRef} className="bg-video" autoPlay loop muted playsInline>
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className={`idle-layer ${isMarqueeActive ? 'hidden' : ''}`}>
        <div className="tech-grid"></div>
        <div className="pulse-circle pc-1"></div>
        <div className="pulse-circle pc-2"></div>
        <div className="pulse-circle pc-3"></div>
        <div className="geo-shape gs-1"></div>
        <div className="geo-shape gs-2"></div>
        <div className="geo-shape gs-3"></div>
      </div>

      <div className={`marquee-layer ${isMarqueeActive ? 'visible' : ''}`}>
        <div className="marquee-row scroll-left">
          {marqueeListTop.map((src,i) => <MarqueeItem key={`top-${i}`} src={src}/>)}
        </div>
        <div className="marquee-row scroll-right">
          {marqueeListMiddle.map((src,i) => <MarqueeItem key={`mid-${i}`} src={src}/>)}
        </div>
        <div className="marquee-row scroll-left">
          {marqueeListBottom.map((src,i) => <MarqueeItem key={`bot-${i}`} src={src}/>)}
        </div>
      </div>

      <audio ref={audioRef} loop src={audioSrc}></audio>

      <div className="scene">
        {promoTexts.map((textObj, index) => {
          if (activeSeq !== index) return null;
          // Chaque phrase a sa propre direction d'impact (cycle)
          const baseClass = ANIM_CLASSES[index % ANIM_CLASSES.length];
          const animClass = textObj.isMarquee ? `${baseClass}-long` : baseClass;
          return (
            <div key={index} className={`text-card ${animClass}`}>
              <div className="main-text">{textObj.main}</div>
              {textObj.sub && <span className="sub-text">{textObj.sub}</span>}
            </div>
          );
        })}
      </div>

      {/* CONTRÔLES — pointer-events + touch-action fixés */}
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
          title="Activer/Désactiver le son"
        >
          {isMuted ? <IconSoundOff /> : <IconSoundOn />}
        </button>
      </div>

      <div className="progress-bar" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
    </div>
  );
};

export default PromoVideo;