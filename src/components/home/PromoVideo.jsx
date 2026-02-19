import React, { useState, useRef, useEffect } from 'react';

// --- STYLES CSS AMÉLIORÉS (DESIGN PREMIUM & DYNAMIQUE) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');

  .promo-container {
      position: relative;
      width: 100%;
      height: 100%; 
      min-height: 600px;
      /* MESH GRADIENT ANIMÉ POUR PLUS DE VIE */
      background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #f1f5f9 100%);
      background-size: 400% 400%;
      animation: meshGradient 15s ease infinite;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      font-family: 'Montserrat', sans-serif;
      color: #0f172a;
  }

  @keyframes meshGradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
  }

  /* --- TEXT REVEAL ANIMATION (STYLE PR) --- */
  .text-reveal-container {
      overflow: hidden;
      margin-bottom: 8px;
  }

  .text-line {
      display: block;
      transform: translateY(110%);
      opacity: 0;
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
  }

  .active .text-line {
      transform: translateY(0);
      opacity: 1;
  }

  .delay-1 { transition-delay: 0.1s; }
  .delay-2 { transition-delay: 0.25s; }
  .delay-3 { transition-delay: 0.4s; }

  /* --- GLASSMORPHISM CARD --- */
  .glass-card {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
      z-index: 10;
      max-width: 80%;
      text-align: center;
  }

  .title-main {
      font-weight: 800;
      font-size: 3.5rem;
      letter-spacing: -0.02em;
      line-height: 1.1;
      text-transform: uppercase;
      margin: 0;
      background: linear-gradient(to right, #1e293b, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }

  /* --- FORMES GÉOMÉTRIQUES PREMIUM --- */
  .geo-shape {
      position: absolute;
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      z-index: 2;
      animation: floatOrganic 20s infinite ease-in-out;
  }

  @keyframes floatOrganic {
      0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
      33% { transform: translate(30px, -50px) rotate(10deg) scale(1.05); }
      66% { transform: translate(-20px, 20px) rotate(-5deg) scale(0.95); }
  }

  /* --- UI CONTROLS --- */
  .controls-container {
      position: absolute;
      bottom: 30px;
      right: 30px;
      display: flex;
      gap: 15px;
      z-index: 100;
  }

  .control-btn {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease;
  }

  .control-btn:hover {
      background: #fff;
      transform: scale(1.1);
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  }
`;

const PromoVideo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const duration = 5000; // 5s par slide

  const slidesContent = [
    { title: "Innovation", sub: "Redéfinir le futur" },
    { title: "Performance", sub: "L'excellence au quotidien" },
    { title: "Impact", sub: "Une vision globale" }
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesContent.length);
    }, duration);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div className={`promo-container ${isPaused ? 'is-paused' : ''}`}>
      <style>{styles}</style>
      
      {/* BACKGROUND ELEMENTS */}
      <div className="geo-shape" style={{ width: '300px', height: '300px', top: '-50px', left: '-50px', borderRadius: '50%' }}></div>
      <div className="geo-shape" style={{ width: '200px', height: '200px', bottom: '10%', right: '5%', borderRadius: '40px', animationDelay: '-5s' }}></div>

      {/* TEXT CONTENT WITH REVEAL ANIMATION */}
      <div className="glass-card active">
        <div className="text-reveal-container">
          <h1 className="title-main text-line delay-1">
            {slidesContent[currentSlide].title}
          </h1>
        </div>
        <div className="text-reveal-container">
          <p className="text-line delay-2" style={{ fontSize: '1.2rem', color: '#64748b', margin: 0 }}>
            {slidesContent[currentSlide].sub}
          </p>
        </div>
      </div>

      {/* UI CONTROLS */}
      <div className="controls-container">
        <div className="control-btn" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? '▶' : 'II'}
        </div>
      </div>
    </div>
  );
};

export default PromoVideo;