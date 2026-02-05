import React, { useState, useRef, useEffect } from 'react';

// --- STYLES CSS ---
const styles = `
  /* --- CONFIGURATION GLOBALE --- */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');

  .promo-container {
      position: relative;
      width: 100%;
      height: 100%; 
      min-height: 600px;
      /* DÉGRADÉ LUMINEUX & PRO */
      
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      font-family: 'Montserrat', sans-serif;
      color: #1e293b;
  }

  .promo-container.is-paused * {
      animation-play-state: paused !important;
  }

  /* --- ARRIÈRE-PLAN VIDÉO (Subtil) --- */
  .bg-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.05; 
      mix-blend-mode: multiply;
      z-index: 0;
      filter: grayscale(100%);
      pointer-events: none; /* IMPORTANT: Ne bloque pas les clics */
  }

  /* --- ANIMATION "IDLE" (Carte Blanche - Pro & Design) --- */
  .idle-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0;
      transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      pointer-events: none; /* IMPORTANT: Clics traversants */
  }

  .idle-layer.visible {
      opacity: 1;
  }

  .tech-grid {
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background-image: 
          linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
      background-size: 60px 60px;
      transform: perspective(500px) rotateX(60deg);
      animation: gridMove 20s linear infinite;
  }

  @keyframes gridMove {
      0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
      100% { transform: perspective(500px) rotateX(60deg) translateY(60px); }
  }

  /* Cercles concentriques "Pulse" */
  .pulse-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid rgba(59, 130, 246, 0.15);
      border-radius: 50%;
      animation: pulseExpand 8s infinite linear;
  }

  .pc-1 { width: 300px; height: 300px; animation-delay: 0s; }
  .pc-2 { width: 500px; height: 500px; animation-delay: -2s; border-color: rgba(139, 92, 246, 0.1); }
  .pc-3 { width: 700px; height: 700px; animation-delay: -4s; }

  @keyframes pulseExpand {
      0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
  }

  /* Formes géométriques flottantes */
  .geo-shape {
      position: absolute;
      background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.2));
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.5);
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
      border-radius: 20px;
      z-index: 2;
  }

  .gs-1 { width: 80px; height: 80px; top: 20%; left: 15%; animation: floatGeo 12s ease-in-out infinite; border-radius: 12px; }
  .gs-2 { width: 120px; height: 120px; bottom: 25%; right: 10%; animation: floatGeo 15s ease-in-out infinite reverse; border-radius: 50%; }
  .gs-3 { width: 60px; height: 60px; top: 15%; right: 20%; animation: floatGeo 10s ease-in-out infinite 1s; transform: rotate(45deg); border-radius: 8px; }

  @keyframes floatGeo {
      0% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-30px) rotate(10deg); }
      100% { transform: translateY(0) rotate(0deg); }
  }

  /* --- MARQUEE (DÉFILÉ CONTINU) --- */
  .marquee-layer {
      position: absolute;
      top: -20%;
      left: -20%;
      width: 140%;
      height: 140%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 40px;
      transform: rotate(-6deg); 
      z-index: 2;
      opacity: 0;
      transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none; /* CRUCIAL: Empêche de bloquer les boutons */
      mask-image: radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%);
      -webkit-mask-image: radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%);
      direction: ltr; 
  }

  .marquee-layer.visible {
      opacity: 0.8;
  }

  .marquee-row {
      display: flex;
      gap: 24px;
      width: max-content;
  }

  .scroll-left { animation: scroll 50s linear infinite; }
  .scroll-right { animation: scrollReverse 50s linear infinite; }

  @keyframes scroll { 
      0% { transform: translateX(0); } 
      100% { transform: translateX(-50%); } 
  }
  @keyframes scrollReverse { 
      0% { transform: translateX(-50%); } 
      100% { transform: translateX(0); } 
  }

  .marquee-media {
      width: 220px;
      height: 140px;
      border-radius: 16px;
      object-fit: cover;
      background: white;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      border: 4px solid #ffffff;
      transition: transform 0.3s ease;
  }

  /* --- TEXTES & SCÈNE (GLASSMORPHISM CLAIR) --- */
  .scene {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none; /* CRUCIAL */
  }

  .text-card {
      position: absolute;
      padding: 50px 70px;
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.9);
      border-radius: 30px;
      box-shadow: 
          0 20px 50px rgba(0,0,0,0.08),
          0 1px 3px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 900px;
      width: 85%;
      opacity: 0;
      transform: scale(0.95) translateY(20px);
      pointer-events: none; /* CRUCIAL */
  }

  .main-text {
      font-size: clamp(32px, 5vw, 64px);
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
  }

  .sub-text {
      display: block;
      font-size: clamp(16px, 2vw, 24px);
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin-top: 10px;
  }

  /* --- SÉQUENCAGE --- */
  .active-slide {
      animation: elegantReveal 3.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .active-slide-long {
      animation: elegantRevealLong 9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes elegantReveal {
      0% { opacity: 0; transform: scale(0.9) translateY(40px); filter: blur(8px); }
      15% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
      85% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
      100% { opacity: 0; transform: scale(1.05) translateY(-20px); filter: blur(4px); }
  }

  @keyframes elegantRevealLong {
      0% { opacity: 0; transform: scale(0.9) translateY(40px); filter: blur(8px); }
      5% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
      95% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
      100% { opacity: 0; transform: scale(1.05) translateY(-20px); filter: blur(4px); }
  }

  /* --- CONTRÔLES --- */
  .controls-container {
      position: absolute;
      bottom: 30px;
      right: 30px;
      z-index: 2000; /* Z-INDEX AUGMENTÉ AU MAX */
      display: flex;
      gap: 15px;
      pointer-events: auto; /* S'assure que les clics sont acceptés */
  }

  .control-btn {
      width: 54px;
      height: 54px;
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.8);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #334155;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative; 
      z-index: 2001; /* Z-INDEX SUPÉRIEUR */
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      pointer-events: auto;
  }
  
  .control-btn:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      color: #2563eb;
      border-color: #bfdbfe;
  }
  
  .control-btn svg { width: 22px; height: 22px; fill: currentColor; }

  /* Menu Langue */
  .lang-menu {
      position: absolute;
      bottom: 70px;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      min-width: 120px;
      border: 1px solid rgba(0,0,0,0.05);
      animation: slideUp 0.2s ease-out;
      z-index: 3000; /* Toujours au dessus */
      pointer-events: auto;
  }
  
  @keyframes slideUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
  }

  .lang-option {
      padding: 10px 16px;
      color: #334155;
      font-weight: 600;
      cursor: pointer;
      border-radius: 10px;
      font-size: 14px;
      transition: background 0.2s;
      white-space: nowrap;
      text-align: left;
  }
  .lang-option:hover { background: #f1f5f9; color: #2563eb; }

  .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      width: 0%;
      z-index: 100;
      transition: width 0.1s linear;
  }
`;

// --- DONNÉES DE TRADUCTION ---
const translations = {
  fr: {
      1: { main: "Prestataire de services ?", sub: "Boostez votre visibilité" },
      2: { main: "AllSherut", sub: "Votre partenaire croissance" },
      3: { main: "Inscription Rapide", sub: "En moins de 2 minutes" },
      4: { main: "Vos Services", sub: "Sélectionnez vos compétences" },
      5: { main: "+20 Catégories", sub: "Un espace unique pour tout gérer" },
      6: { main: "Espace Pro", sub: "Tableau de bord intuitif" },
      7: { main: "Nouveaux Clients", sub: "Développez votre clientèle" },
      8: { main: "Offre Spéciale", sub: "Inscription 100% Gratuite" },
      9: { main: "Rejoignez-nous", sub: "allsherut.com" }
  },
  he: {
      1: { main: "אתם נותני שירות?", sub: "רוצים להגדיל חשיפה?" },
      2: { main: "AllSherut", sub: "השותף שלכם לצמיחה" },
      3: { main: "הרשמה מהירה", sub: "תוך פחות מ-2 דקות" },
      4: { main: "השירותים שלכם", sub: "בחרו את תחומי ההתמחות" },
      5: { main: "+20 קטגוריות", sub: "מקום אחד לניהול העסק" },
      6: { main: "אזור אישי", sub: "לוח בקרה מתקדם" },
      7: { main: "לקוחות חדשים", sub: "הגדילו את מעגל הלקוחות" },
      8: { main: "מבצע השקה", sub: "הרשמה חינם כרגע" },
      9: { main: "הצטרפו אלינו", sub: "allsherut.com" }
  },
  en: {
      1: { main: "Service Provider?", sub: "Boost your visibility" },
      2: { main: "AllSherut", sub: "Your growth partner" },
      3: { main: "Fast Sign Up", sub: "In less than 2 minutes" },
      4: { main: "Your Services", sub: "Select your skills" },
      5: { main: "+20 Categories", sub: "One hub to manage it all" },
      6: { main: "Pro Dashboard", sub: "Intuitive interface" },
      7: { main: "New Customers", sub: "Expand your reach" },
      8: { main: "Launch Offer", sub: "100% Free Registration" },
      9: { main: "Join Us", sub: "allsherut.com" }
  },
  ru: {
      1: { main: "Поставщик услуг?", sub: "Увеличьте свою видимость" },
      2: { main: "AllSherut", sub: "Ваш партнер по росту" },
      3: { main: "Быстрая регистрация", sub: "Менее чем за 2 минуты" },
      4: { main: "Ваши услуги", sub: "Выберите свои навыки" },
      5: { main: "+20 Категорий", sub: "Единый центр управления" },
      6: { main: "Личный кабинет", sub: "Интуитивный интерфейс" },
      7: { main: "Новые клиенты", sub: "Расширьте свою базу" },
      8: { main: "Спецпредложение", sub: "Бесплатная регистрация" },
      9: { main: "Присоединяйтесь", sub: "allsherut.com" }
  }
};

const MarqueeItem = ({ src }) => {
    if (!src) return null;
    const isVideo = typeof src === 'string' && src.match(/\.(mp4|webm|mov)$/i);
  
    if (isVideo) {
      return <video src={src} className="marquee-media" autoPlay loop muted playsInline />;
    }
    
   return (
    <img 
      src={src} 
      className="marquee-media" 
      alt="service"
      loading="eager"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://placehold.co/240x150/f1f5f9/cbd5e1?text=Service`;
      }}
    />
  );
};

const PromoVideo = ({ videoSrc = "/background.mp4", services = [] }) => {
  const [lang, setLang] = useState('fr');
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 33; 

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);
  const langMenuRef = useRef(null); 

  // Images par défaut
  const defaultMedia = [
    '/images/babysite.png', '/images/nikayon.jpg', '/images/jardinage.jpg',
    '/images/chien.jpg', '/images/tutoring.png', '/images/eldercare.png',
    '/images/plombier.jpg', '/images/clim.png', '/images/gaz.jpg'
  ];
  
  const displayMedia = services.length > 0 ? services.map(s => s.image || s) : defaultMedia;

  const marqueeListTop = [...displayMedia, ...displayMedia, ...displayMedia, ...displayMedia];
  const midIndex = Math.floor(displayMedia.length / 2);
  const shiftedMedia = [...displayMedia.slice(midIndex), ...displayMedia.slice(0, midIndex)];
  const marqueeListMiddle = [...shiftedMedia, ...shiftedMedia, ...shiftedMedia, ...shiftedMedia];
  const reversedMedia = [...displayMedia].reverse();
  const marqueeListBottom = [...reversedMedia, ...reversedMedia, ...reversedMedia, ...reversedMedia];

  // Gestion animation Frame
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
  }, [isPaused, currentTime]); 

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPaused) {
        video.pause();
    } else {
        video.play().catch(e => console.log("Auto-play prevented or handled:", e));
    }
  }, [isPaused]);

  // --- GESTION DU CLIC À L'EXTÉRIEUR DU MENU LANGUE ---
  useEffect(() => {
      const handleClickOutside = (event) => {
          if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
              setShowLangMenu(false);
          }
      };

      if (showLangMenu) {
          document.addEventListener('mousedown', handleClickOutside);
      }
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [showLangMenu]);


  const getActiveSequence = (time) => {
     if (time < 3.5) return 1;
     if (time < 7.0) return 2;
     if (time < 10.5) return 3;
     if (time < 14.0) return 4;
     if (time < 22.0) return 5; 
     if (time < 25.5) return 6;
     if (time < 29.0) return 7;
     if (time < 32.5) return 8;
     return 9; 
  };

  const activeSeq = getActiveSequence(currentTime);
  
  const isServicesSlide = activeSeq === 5;

  const toggleVideo = (e) => {
    e && e.stopPropagation(); 
    setIsPaused(prev => !prev);
  };

  const toggleSound = (e) => {
    e && e.stopPropagation();
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
          audio.play().catch(() => {});
          setIsMuted(false);
      } else {
          audio.pause();
          setIsMuted(true);
      }
    }
  };

  const handleLangChange = (e, newLang) => {
      e.stopPropagation();
      setLang(newLang);
      setShowLangMenu(false);
  };

  const IconPlay = () => <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
  const IconPause = () => <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
  const IconSoundOn = () => <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;
  const IconSoundOff = () => <svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>;
  const IconLang = () => <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>;

  return (
    <div className={`promo-container ${isPaused ? 'is-paused' : ''}`} dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <style>{styles}</style>

      {/* 1. ARRIÈRE-PLAN VIDÉO */}
      <video ref={videoRef} className="bg-video" autoPlay loop muted playsInline>
          <source src={videoSrc} type="video/mp4" />
      </video>
      
      {/* 2. NOUVELLE ANIMATION "IDLE" */}
      <div className={`idle-layer ${!isServicesSlide ? 'visible' : ''}`}>
          <div className="tech-grid"></div>
          <div className="pulse-circle pc-1"></div>
          <div className="pulse-circle pc-2"></div>
          <div className="pulse-circle pc-3"></div>
          
          <div className="geo-shape gs-1"></div>
          <div className="geo-shape gs-2"></div>
          <div className="geo-shape gs-3"></div>
      </div>

      {/* 3. MARQUEE MULTI-DIRECTIONNEL */}
      <div className={`marquee-layer ${isServicesSlide ? 'visible' : ''}`}>
          <div className="marquee-row scroll-left">
              {marqueeListTop.map((src, i) => <MarqueeItem key={`top-${i}`} src={src} />)}
          </div>
          <div className="marquee-row scroll-right">
              {marqueeListMiddle.map((src, i) => <MarqueeItem key={`mid-${i}`} src={src} />)}
          </div>
          <div className="marquee-row scroll-left">
              {marqueeListBottom.map((src, i) => <MarqueeItem key={`bot-${i}`} src={src} />)}
          </div>
      </div>

      <audio ref={audioRef} loop src="/musique.mp3"></audio>

      {/* 4. SCÈNE TEXTE */}
      <div className="scene">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => {
             const isActive = activeSeq === id;
             const animClass = isActive ? (id === 5 ? 'active-slide-long' : 'active-slide') : '';
             
             return (
              <div key={id} className={`text-card ${animClass}`}>
                  <div className="main-text">{translations[lang][id].main}</div>
                  <span className="sub-text">{translations[lang][id].sub}</span>
              </div>
             );
          })}
      </div>

      {/* CONTRÔLES UI */}
      <div className="controls-container">
          <button className="control-btn" onClick={toggleVideo} title="Lecture/Pause">
             {isPaused ? <IconPlay /> : <IconPause />}
          </button>
          
          <button className="control-btn" onClick={toggleSound} title="Son">
             {isMuted ? <IconSoundOff /> : <IconSoundOn />}
          </button>
          
          {/* Utilisation de div car contient des éléments interactifs, mais stylé comme un bouton */}
          <div className="control-btn" ref={langMenuRef} onClick={(e) => { e.stopPropagation(); setShowLangMenu(!showLangMenu); }} title="Langue">
              <IconLang />
              {showLangMenu && (
                  <div className="lang-menu">
                      <div className="lang-option" onClick={(e) => handleLangChange(e, 'he')}>עברית</div>
                      <div className="lang-option" onClick={(e) => handleLangChange(e, 'fr')}>Français</div>
                      <div className="lang-option" onClick={(e) => handleLangChange(e, 'en')}>English</div>
                      <div className="lang-option" onClick={(e) => handleLangChange(e, 'ru')}>Русский</div>
                  </div>
              )}
          </div>
      </div>

      <div className="progress-bar" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
    </div>
  );
};

export default PromoVideo;