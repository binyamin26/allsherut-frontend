import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  Star, 
  Users, 
  User, 
  Building2,
  Crown,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Baby,
  Sparkles,
  TreePine,
  Dog,
  BookOpen,
  Heart
} from 'lucide-react';

const PricingPage = () => {
  const [selectedType, setSelectedType] = useState('individual'); // 'individual' or 'business'

  // Icônes pour les 6 services
  const serviceIcons = {
    babysitting: Baby,
    cleaning: Sparkles,
    gardening: TreePine,
    petcare: Dog,
    tutoring: BookOpen,
    eldercare: Heart
  };

  // Les 6 services disponibles
  const services = [
    { id: 'babysitting', name: 'בייביסיטר', icon: 'babysitting' },
    { id: 'cleaning', name: 'ניקיון', icon: 'cleaning' },
    { id: 'gardening', name: 'גינון', icon: 'gardening' },
    { id: 'petcare', name: 'שמירת חיות', icon: 'petcare' },
    { id: 'tutoring', name: 'שיעורים פרטיים', icon: 'tutoring' },
    { id: 'eldercare', name: 'עזרה לקשישים', icon: 'eldercare' }
  ];

  // Configuration des plans tarifaires
  const pricingPlans = {
    individual: {
      type: 'individual',
      title: 'תוכנית אישית',
      subtitle: 'מושלם לעצמאים ונותני שירות פרטיים',
      price: 19.90,
      icon: User,
      popular: false,
      features: [
        'פרופיל מקצועי מלא',
        'הצגה בתוצאות החיפוש',
        'קבלת פניות ישירות מלקוחות',
        'מערכת ניהול אישית',
        'גלריית תמונות והמלצות',
        'תמיכה טכנית מלאה',
        'אפשרות לקבל חוות דעת',
        'סטטיסטיקות וצפיות'
      ],
      advantages: [
        'התחל מיד ללא התחייבות',
        'ביטול בכל עת',
        'חודש ראשון חינם'
      ]
    },
    business: {
      type: 'business',
      title: 'תוכנית עסקית',
      subtitle: 'לחברות ונותני שירות מקצועיים',
      price: 49.90,
      icon: Building2,
      popular: true,
      features: [
        'כל היתרונות של התוכנית האישית',
        'הצגה מועדפת בתוצאות',
        'תג "חברה מאומתת"',
        'עד 5 פרופילים עובדים',
        'דף חברה מותאם אישית',
        'לוגו וברנדינג מלא',
        'תמיכה עדיפות VIP',
        'כלי ניהול צוות מתקדמים',
        'דוחות ואנליטיקה מתקדמת',
        'אפשרות לקידום ממומן'
      ],
      advantages: [
        'בולטות מקסימלית בפלטפורמה',
        'ניהול מרכזי של כל העובדים',
        'חודש ראשון חינם'
      ]
    }
  };

  const currentPlan = pricingPlans[selectedType];
  const ServiceIcon = currentPlan.icon;

  return (
    <div className="pricing-page">
      <div className="container">
        {/* Hero Header */}
        <div className="pricing-header">
          <h1 className="pricing-title">
            <Crown className="title-icon" />
            מחירון נותני שירותים
          </h1>
          <p className="pricing-subtitle">
            הצטרפו לפלטפורמה המובילה בישראל לשירותי בית מקצועיים
            <br />
            חודש ראשון חינם לכל החברים החדשים
          </p>
        </div>

        {/* Type Selector */}
        <div className="type-selector-container">
          <div className="type-selector">
            <button
              className={`type-btn ${selectedType === 'individual' ? 'active' : ''}`}
              onClick={() => setSelectedType('individual')}
            >
              <User size={20} />
              <span>עצמאי / פרטי</span>
            </button>
            <button
              className={`type-btn ${selectedType === 'business' ? 'active' : ''}`}
              onClick={() => setSelectedType('business')}
            >
              <Building2 size={20} />
              <span>חברה / עסק</span>
              <span className="popular-badge-small">פופולרי</span>
            </button>
          </div>
        </div>

        {/* Main Pricing Card */}
        <div className="pricing-card-container">
          <div className={`pricing-card-main ${currentPlan.popular ? 'popular' : ''}`}>
            {currentPlan.popular && (
              <div className="popularity-badge">
                <Star size={16} />
                הכי פופולרי
              </div>
            )}

            {/* Card Header */}
            <div className="plan-header-main">
              <div className="plan-icon-large">
                <ServiceIcon size={48} />
              </div>
              <h2 className="plan-title-large">{currentPlan.title}</h2>
              <p className="plan-subtitle-main">{currentPlan.subtitle}</p>
              
              <div className="price-display">
                <div className="price-main">
                  <span className="currency">₪</span>
                  <span className="amount">{currentPlan.price}</span>
                  <span className="period">/חודש</span>
                </div>
                <div className="price-note">חודש ראשון חינם</div>
              </div>
            </div>

            {/* Features List */}
            <div className="features-section">
              <h3 className="features-title">מה כלול בתוכנית?</h3>
              <ul className="features-list-main">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <div className="feature-icon">
                      <Check size={20} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advantages */}
            <div className="advantages-section">
              {currentPlan.advantages.map((advantage, index) => (
                <div key={index} className="advantage-item">
                  <Zap size={16} />
                  <span>{advantage}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link to="/dashboard" className="cta-button">
              <Crown size={20} />
              התחל עכשיו - חודש ראשון חינם
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-section">
          <h2 className="section-title">
            <Sparkles size={28} />
            השירותים הזמינים
          </h2>
          <p className="section-subtitle">
            מחיר אחיד לכל השירותים - בחרו את התחום שלכם והתחילו לקבל פניות
          </p>
          
          <div className="services-grid">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <div key={service.id} className="service-card">
                  <div className="service-icon-wrapper">
                    <Icon size={32} />
                  </div>
                  <h3 className="service-name">{service.name}</h3>
                  <div className="service-price">
                    <span className="service-price-amount">₪{currentPlan.price}</span>
                    <span className="service-price-period">/חודש</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="comparison-section">
          <h2 className="section-title">
            <TrendingUp size={28} />
            השוואת תוכניות
          </h2>
          
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="comparison-cell header-empty"></div>
              <div className="comparison-cell header-plan">
                <User size={24} />
                <span>אישית</span>
              </div>
              <div className="comparison-cell header-plan popular">
                <Building2 size={24} />
                <span>עסקית</span>
                <div className="popular-badge-tiny">מומלץ</div>
              </div>
            </div>

            {/* Price Row */}
            <div className="comparison-row">
              <div className="comparison-cell feature-name">מחיר חודשי</div>
              <div className="comparison-cell">₪19.90</div>
              <div className="comparison-cell highlight">₪49.90</div>
            </div>

            {/* Features Rows */}
            <div className="comparison-row">
              <div className="comparison-cell feature-name">פרופיל מקצועי</div>
              <div className="comparison-cell"><Check size={20} /></div>
              <div className="comparison-cell"><Check size={20} /></div>
            </div>

            <div className="comparison-row">
              <div className="comparison-cell feature-name">הצגה בחיפוש</div>
              <div className="comparison-cell"><Check size={20} /></div>
              <div className="comparison-cell"><Check size={20} /></div>
            </div>

            <div className="comparison-row">
              <div className="comparison-cell feature-name">תמיכה טכנית</div>
              <div className="comparison-cell">רגילה</div>
              <div className="comparison-cell highlight">VIP</div>
            </div>

            <div className="comparison-row">
              <div className="comparison-cell feature-name">מספר פרופילים</div>
              <div className="comparison-cell">1</div>
              <div className="comparison-cell highlight">עד 5</div>
            </div>

            <div className="comparison-row">
              <div className="comparison-cell feature-name">הצגה מועדפת</div>
              <div className="comparison-cell">-</div>
              <div className="comparison-cell"><Check size={20} /></div>
            </div>

            <div className="comparison-row">
              <div className="comparison-cell feature-name">תג מאומת</div>
              <div className="comparison-cell">-</div>
              <div className="comparison-cell"><Check size={20} /></div>
            </div>

            <div className="comparison-row">
              <div className="comparison-cell feature-name">דוחות מתקדמים</div>
              <div className="comparison-cell">-</div>
              <div className="comparison-cell"><Check size={20} /></div>
            </div>
          </div>
        </div>

        {/* FAQ / Benefits Section */}
        <div className="benefits-section">
          <h2 className="section-title">
            <Shield size={28} />
            למה להצטרף ל-HomeSherut?
          </h2>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <Users size={32} />
              </div>
              <h3>גישה ללקוחות פוטנציאליים</h3>
              <p>אלפי לקוחות מחפשים שירותים בכל יום. הפלטפורמה שלנו מחברת אתכם ישירות אליהם.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Shield size={32} />
              </div>
              <h3>אמינות ומקצועיות</h3>
              <p>מערכת חוות דעת והמלצות שמעניקה אמון ומוניטין לעסק שלכם.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Clock size={32} />
              </div>
              <h3>ניהול פשוט וקל</h3>
              <p>ממשק ידידותי שמאפשר לכם לנהל את הפרופיל והפניות בקלות.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <TrendingUp size={32} />
              </div>
              <h3>צמיחה עסקית</h3>
              <p>כלים וסטטיסטיקות שעוזרים לכם להבין את השוק ולהגדיל את העסק.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="final-cta">
          <h2 className="cta-title">מוכנים להתחיל?</h2>
          <p className="cta-text">
            הצטרפו עכשיו וקבלו חודש ראשון חינם
            <br />
            ללא התחייבות - ביטול בכל עת
          </p>
          <Link to="/dashboard" className="cta-button-large">
            <Crown size={24} />
            הרשמה והתחלה - חינם לחודש הראשון
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;