import React, { useState, useRef, useEffect } from 'react';

// --- TEXTES EXACTS EN HÉBREU ---
const promoTexts = [
  "האם אתם נותני שירות ומחפשים להיחשף לקהל רחב יותר?",
  "AllSherut כאן כדי ללוות אתכם",
  "הרשמה פשוטה ומהירה",
  "בחרו את השירותים שאתם מציעים",
  "גשו לאזור האישי שלכם",
  "עדכנו את הפרטים שלכם בכל עת",
  "הפרופיל שלכם נשאר ברור ומעודכן",
  "הגדילו את החשיפה שלכם בהתאם לשירותים שאתם מציעים",
  "הגיעו ללקוחות שמחפשים באמת את השירות שלכם",
  "הלקוחות מדרגים את העבודה שלכם",
  "הביקורות מחזקות את האמינות שלכם",
  "מקום אחד לניהול כל הפעילות שלכם",
  "AllSherut משיקה את מבצע ההשקה",
  "הרשמה חינם לנותני שירות",
  "הצטרפו ל-AllSherut כבר עכשיו"
];

// --- STYLES CSS ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;800&display=swap');

  .promo-container {
      position: relative;
      width: 100%;
      height: 100%; 
      min-height: 600px;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      font-family: 'Heebo', sans-serif;
      color: #ffffff;
      direction: rtl; /* Important pour l'hébreu */
  }

  .promo-container.is-paused * {
      animation-play-state: paused !important;
  }

  /* --- ARRIÈRE-PLAN VIDÉO --- */
  .bg-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.15; 
      mix-blend-mode: screen;
      z-index: 0;
      pointer-events: none;
  }

  /* --- ANIMATION DE FOND (PRO & TECH) --- */
  .idle-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      overflow: hidden;
      pointer-events: none;
  }

  .tech-grid {
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background-image: 
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
      background-size: 60px 60px;
      transform: perspective(500px) rotateX(60deg);
      animation: gridMove 20s linear infinite;
  }

  @keyframes gridMove {
      0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
      100% { transform: perspective(500px) rotateX(60deg) translateY(60px); }
  }

  /* --- SCÈNE ET TEXTES (GLASSMORPHISM PREMIUM) --- */
  .scene {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
  }

  .text-card {
      position: absolute;
      padding: 50px 70px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 30px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      text-align: center;
      max-width: 900px;
      width: 85%;
      opacity: 0;
      transform: scale(0.95) translateY(20px);
      pointer-events: none;
  }

  .main-text {
      font-size: clamp(28px, 4vw, 56px);
      font-weight: 800;
      line-height: 1.3;
      background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0px 4px 15px rgba(59, 130, 246, 0.3);
  }

  .active-slide {
      animation: elegantReveal 3.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes elegantReveal {
      0% { opacity: 0; transform: scale(0.9) translateY(40px); filter: blur(8px); }
      15% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
      85% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
      100% { opacity: 0; transform: scale(1.05) translateY(-20px); filter: blur(4px); }
  }

  /* --- CONTRÔLES --- */
  .controls-container {
      position: absolute;
      bottom: 30px;
      left: 30px; /* Aligné à gauche car le site est en RTL */
      z-index: 2000;
      display: flex;
      gap: 15px;
      pointer-events: auto;
      direction: ltr; /* Garde les icônes dans le bon sens */
  }

  .control-btn {
      width: 54px;
      height: 54px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #ffffff;
      transition: all 0.3s ease;
  }
  
  .control-btn:hover { 
      transform: translateY(-2px); 
      background: rgba(255, 255, 255, 0.2);
      border-color: #60a5fa;
  }
  
  .control-btn svg { width: 22px; height: 22px; fill: currentColor; }

  /* Barre de progression */
  .progress-bar {
      position: absolute;
      bottom: 0;
      right: 0; /* Part de la droite en RTL */
      height: 4px;
      background: linear-gradient(90deg, #3b82f6, #60a5fa);
      z-index: 100;
      transition: width 0.1s linear;
  }
`;

const PromoVideo = ({ videoSrc = "/background.mp4", audioSrc = "/musique.mp3" }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  // Configuration de la durée
  const slideDuration = 3.5; // secondes par phrase
  const duration = promoTexts.length * slideDuration; // Temps total de la boucle

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

  // Gestion Play/Pause de la vidéo HTML
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPaused) {
        video.pause();
    } else {
        video.play().catch(e => console.log("Auto-play bloqué :", e));
    }
  }, [isPaused]);

  // Index actif (quelle phrase afficher)
  const activeSeq = Math.floor(currentTime / slideDuration);

  // Actions Boutons
  const toggleVideo = (e) => {
    e && e.stopPropagation(); 
    setIsPaused(prev => !prev);
  };

  const toggleSound = (e) => {
    e && e.stopPropagation();
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused || isMuted) {
          audio.play().catch(() => {});
          setIsMuted(false);
      } else {
          audio.pause();
          setIsMuted(true);
      }
    }
  };

  // Icônes SVG
  const IconPlay = () => <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
  const IconPause = () => <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
  const IconSoundOn = () => <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;
  const IconSoundOff = () => <svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>;

  return (
    <div className={`promo-container ${isPaused ? 'is-paused' : ''}`}>
      <style>{styles}</style>

      {/* ARRIÈRE-PLAN VIDÉO */}
      <video ref={videoRef} className="bg-video" autoPlay loop muted playsInline>
          <source src={videoSrc} type="video/mp4" />
      </video>
      
      {/* ANIMATION TECH DE FOND */}
      <div className="idle-layer">
          <div className="tech-grid"></div>
      </div>

      {/* MUSIQUE DE FOND */}
      <audio ref={audioRef} loop src={audioSrc}></audio>

      {/* SCÈNE DES TEXTES */}
      <div className="scene">
          {promoTexts.map((text, index) => {
             const isActive = activeSeq === index;
             if (!isActive) return null; // Optimisation : on ne rend que le composant actif

             return (
              <div key={index} className="text-card active-slide">
                  <div className="main-text">{text}</div>
              </div>
             );
          })}
      </div>

      {/* CONTRÔLES UI */}
      <div className="controls-container">
          <button className="control-btn" onClick={toggleVideo} title="Lecture/Pause">
             {isPaused ? <IconPlay /> : <IconPause />}
          </button>
          
          <button className="control-btn" onClick={toggleSound} title="Activer/Désactiver le son">
             {isMuted ? <IconSoundOff /> : <IconSoundOn />}
          </button>
      </div>

      {/* BARRE DE PROGRESSION */}
      <div className="progress-bar" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
    </div>
  );
};

export default PromoVideo;