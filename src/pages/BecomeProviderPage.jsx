import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Star,
  Clock,
  Shield,
  DollarSign,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Baby,
  Home,
  Scissors,
  PawPrint,
  BookOpen,
  User,
  Heart,
  Calendar,
  Phone,
  Wand2
} from 'lucide-react';
import AuthModal from '../components/auth/AuthModal';
import { useAuth } from '../context/AuthContext';
import Reveal from '../components/common/Reveal';

const BecomeProviderPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const services = [
    {
      key: 'babysitting',
      name: 'בייביסיטר',
      icon: Baby,
      description: 'טיפול בילדים ותינוקות',
      avgIncome: '₪35-80/שעה',
      demand: 'גבוה מאוד',
      flexibility: 'ערבים וסופ״ש',
      payingCustomer: 'ההורים משלמים',
      benefits: ['עבודה גמישה', 'שכר גבוה', 'עבודה עם ילדים', 'ביקוש גבוה'],
      color: 'from-pink-500 to-rose-600'
    },
    {
      key: 'cleaning',
      name: 'ניקיון',
      icon: Home,
      description: 'ניקיון בתים ומשרדים',
      avgIncome: '₪40-65/שעה',
      demand: 'גבוה',
      flexibility: 'כל השבוע',
      payingCustomer: 'אתה משלם (חודש חינם)',
      benefits: ['ביקוש קבוע', 'עבודה יציבה', 'שכר טוב', 'חודש חינם'],
      color: 'from-cyan-500 to-blue-600'
    },
    {
      key: 'gardening',
      name: 'גינון',
      icon: Scissors,
      description: 'עיצוב וטיפוח גינות',
      avgIncome: '₪50-90/שעה',
      demand: 'בינוני-גבוה',
      flexibility: 'בוקר וצהריים',
      payingCustomer: 'אתה משלם (חודש חינם)',
      benefits: ['שכר מעולה', 'עבודה בחוץ', 'יצירתיות', 'חודש חינם'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      key: 'petcare',
      name: 'שמירת חיות מחמד',
      icon: PawPrint,
      description: 'טיפול בכלבים וחתולים',
      avgIncome: '₪25-55/שעה',
      demand: 'בינוני',
      flexibility: 'גמיש מאוד',
      payingCustomer: 'אתה משלם (חודש חינם)',
      benefits: ['עבודה עם חיות', 'גמישות מלאה', 'קהילה חמה', 'חודש חינם'],
      color: 'from-orange-500 to-amber-600'
    },
    {
      key: 'tutoring',
      name: 'שיעורים פרטיים',
      icon: BookOpen,
      description: 'הוראה פרטית וחיזוק',
      avgIncome: '₪60-120/שעה',
      demand: 'גבוה מאוד',
      flexibility: 'אחה״צ וערבים',
      payingCustomer: 'אתה משלם (חודש חינם)',
      benefits: ['שכר הגבוה ביותר', 'עבודה אינטלקטואלית', 'השפעה חיובית', 'חודש חינם'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      key: 'eldercare',
      name: 'עזרה לקשישים',
      icon: User,
      description: 'טיפול וליווי קשישים',
      avgIncome: '₪45-75/שעה',
      demand: 'גבוה',
      flexibility: 'כל השבוע',
      payingCustomer: 'המשפחות משלמות',
      benefits: ['עבודה משמעותית', 'שכר יציב', 'קשר אנושי', 'הערכה רבה'],
      color: 'from-purple-500 to-violet-600'
    },
    {
      key: 'event_decoration',
      name: 'עיצוב אירועים',
      icon: Wand2,
      description: 'קשתות, עיצוב שולחנות ואולמות',
      avgIncome: '₪80-200/אירוע',
      demand: 'בינוני-גבוה',
      flexibility: 'סופ״ש ואירועים',
      payingCustomer: 'המשפחות משלמות',
      benefits: ['שכר גבוה לאירוע', 'עבודה יצירתית', 'ביקוש עונתי', 'הערכה רבה'],
      color: 'from-pink-500 to-fuchsia-600'
    },
    {
      key: 'pest_control',
      name: 'הדברה, ריסוס והרחקת מזיקים',
      icon: Heart,
      description: 'הדברת חרקים, מכרסמים והרחקת בעלי חיים',
      avgIncome: '₪200-800/טיפול',
      demand: 'גבוה',
      flexibility: 'ימי חול',
      payingCustomer: 'אתה משלם (חודש חינם)',
      benefits: ['שכר גבוה לביקור', 'ביקוש קבוע', 'עבודה עצמאית', 'חודש חינם'],
      color: 'from-lime-500 to-green-600'
    }
  ];

  const handleServiceSelect = (serviceKey) => {
    setSelectedService(serviceKey);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (user?.role === 'provider') {
      navigate('/dashboard');
    }
  };

  return (
    <div className="become-provider-page">
      {/* Hero Section */}
      <section className="provider-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <Reveal as="div" onLoad delay={0} className="hero-badge">
                <Award size={20} />
                <span>הצטרף לספקי השירות המובילים</span>
              </Reveal>

              <Reveal as="h1" onLoad delay={100} direction="down" className="hero-title">
                הפוך את הכישורים שלך
                <span className="text-gradient"> לעסק משתלם</span>
              </Reveal>

              <Reveal as="p" onLoad delay={200} className="hero-description">
                הצטרף ל-AllSherut והתחל להרוויח כסף מהכישורים שלך.
                אלפי לקוחות מחפשים ספקי שירות איכותיים כמוך.
              </Reveal>

              <Reveal as="div" onLoad delay={300} className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">10,000+</div>
                  <div className="stat-label">לקוחות פעילים</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">₪2,500</div>
                  <div className="stat-label">ממוצע חודשי</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">4.8★</div>
                  <div className="stat-label">דירוג ממוצע</div>
                </div>
              </Reveal>

              <Reveal as="div" onLoad delay={400} className="hero-actions">
                <button
                  className="btn btn-primary btn-large"
                  onClick={() => setShowAuthModal(true)}
                >
                  <ArrowRight size={20} />
                  התחל עכשיו - בחינם
                </button>
                <Link to="/about" className="btn btn-secondary btn-large">
                  איך זה עובד?
                </Link>
              </Reveal>
            </div>

            <Reveal as="div" onLoad delay={200} className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop"
                alt="ספק שירות מקצועי"
              />
              <div className="image-overlay">
                <div className="success-badge">
                  <CheckCircle size={24} />
                  <span>מאומתים ובטוחים</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-showcase">
        <div className="container">
          <div className="section-header">
            <Reveal as="h2" direction="down" className="section-title">בחר את התחום שלך</Reveal>
            <Reveal as="p" delay={100} className="section-subtitle">
              כל תחום מציע הזדמנויות רווח שונות. בחר את התחום שמתאים לך ביותר.
            </Reveal>
          </div>

          <div className="services-grid">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <Reveal
                  as="div"
                  key={service.key}
                  delay={(index % 4) * 100}
                  className={`service-card ${selectedService === service.key ? 'selected' : ''}`}
                  onClick={() => handleServiceSelect(service.key)}
                >
                  <div className={`service-header bg-gradient-to-br ${service.color}`}>
                    <ServiceIcon size={32} className="text-white" />
                    <h3 className="service-name">{service.name}</h3>
                  </div>

                  <div className="service-content">
                    <p className="service-description">{service.description}</p>

                    <div className="service-stats">
                      <div className="service-stat">
                        <DollarSign size={16} />
                        <span className="stat-label">הכנסה ממוצעת</span>
                        <span className="stat-value">{service.avgIncome}</span>
                      </div>

                      <div className="service-stat">
                        <TrendingUp size={16} />
                        <span className="stat-label">ביקוש</span>
                        <span className="stat-value">{service.demand}</span>
                      </div>

                      <div className="service-stat">
                        <Clock size={16} />
                        <span className="stat-label">גמישות</span>
                        <span className="stat-value">{service.flexibility}</span>
                      </div>
                    </div>

                    <div className="payment-info">
                      <div className={`payment-badge ${service.key === 'babysitting' ? 'free' : 'premium'}`}>
                        {service.payingCustomer}
                      </div>
                    </div>

                    <div className="service-benefits">
                      <h4>יתרונות:</h4>
                      <ul>
                        {service.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex}>
                            <CheckCircle size={14} />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      className="service-select-btn"
                      onClick={() => handleServiceSelect(service.key)}
                    >
                      <ArrowRight size={18} />
                      בחר שירות זה
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <div className="section-header">
            <Reveal as="h2" direction="down" className="section-title">למה לבחור ב-AllSherut?</Reveal>
            <Reveal as="p" delay={100} className="section-subtitle">
              אנחנו הפלטפורמה המובילה לספקי שירות בישראל
            </Reveal>
          </div>

          <div className="benefits-grid">
            <Reveal as="div" delay={0} className="benefit-card">
              <div className="benefit-icon">
                <Shield size={32} />
              </div>
              <h3>בטוח ומוגן</h3>
              <p>
                כל הספקים עוברים אימות זהות וביקורת.
                הלקוחות שלנו מאומתים ובטוחים.
              </p>
            </Reveal>

            <Reveal as="div" delay={100} className="benefit-card">
              <div className="benefit-icon">
                <Users size={32} />
              </div>
              <h3>קהילה תומכת</h3>
              <p>
                קבלת עזרה מקהילת ספקי השירות שלנו,
                עצות ותמיכה מקצועית.
              </p>
            </Reveal>

            <Reveal as="div" delay={200} className="benefit-card">
              <div className="benefit-icon">
                <DollarSign size={32} />
              </div>
              <h3>הכנסה יציבה</h3>
              <p>
                ממוצע של ₪2,500 בחודש לספקים פעילים.
                תשלומים מהירים וביטוחים.
              </p>
            </Reveal>

            <Reveal as="div" delay={0} className="benefit-card">
              <div className="benefit-icon">
                <Calendar size={32} />
              </div>
              <h3>גמישות מלאה</h3>
              <p>
                עבוד מתי שמתאים לך. אתה קובע את
                השעות, המחירים וזמינותך.
              </p>
            </Reveal>

            <Reveal as="div" delay={100} className="benefit-card">
              <div className="benefit-icon">
                <Star size={32} />
              </div>
              <h3>בניית מוניטין</h3>
              <p>
                מערכת ביקורות שעוזרת לך לבנות מוניטין
                ולהגדיל את ההכנסות שלך.
              </p>
            </Reveal>

            <Reveal as="div" delay={200} className="benefit-card">
              <div className="benefit-icon">
                <Phone size={32} />
              </div>
              <h3>תמיכה 24/7</h3>
              <p>
                תמיכה טכנית ומקצועית זמינה תמיד.
                אנחנו כאן כדי לעזור לך להצליח.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <Reveal as="h2" direction="down" className="section-title">איך זה עובד?</Reveal>
            <Reveal as="p" delay={100} className="section-subtitle">
              4 צעדים פשוטים להתחיל להרוויח כסף
            </Reveal>
          </div>

          <div className="steps-container">
            <Reveal as="div" delay={0} className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>הרשם בחינם</h3>
                <p>מלא פרטים בסיסיים ובחר את תחום השירות שלך</p>
              </div>
            </Reveal>

            <div className="step-connector">
              <ArrowRight size={24} />
            </div>

            <Reveal as="div" delay={100} className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>בנה פרופיל</h3>
                <p>הוסף תמונות, תיאור ופרטי זמינות. קבל אימות זהות.</p>
              </div>
            </Reveal>

            <div className="step-connector">
              <ArrowRight size={24} />
            </div>

            <Reveal as="div" delay={200} className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>קבל פניות</h3>
                <p>לקוחות יוכלו לראות אותך ולפנות אליך ישירות</p>
              </div>
            </Reveal>

            <div className="step-connector">
              <ArrowRight size={24} />
            </div>

            <Reveal as="div" delay={300} className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>התחל להרוויח</h3>
                <p>קבל תשלומים בטוחים ובנה מוניטין מקצועי</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories">
        <div className="container">
          <div className="section-header">
            <Reveal as="h2" direction="down" className="section-title">סיפורי הצלחה</Reveal>
            <Reveal as="p" delay={100} className="section-subtitle">
              ספקי שירות שהצליחו איתנו
            </Reveal>
          </div>

          <div className="stories-grid">
            <Reveal as="div" delay={0} className="story-card">
              <div className="story-header">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b647?w=80&h=80&fit=crop&crop=face"
                  alt="שרה"
                />
                <div>
                  <h4>שרה כהן</h4>
                  <p>בייביסיטר, תל אביב</p>
                </div>
              </div>
              <div className="story-content">
                <div className="story-rating">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} fill="#fbbf24" color="#fbbf24" size={16} />
                  ))}
                </div>
                <p>
                  &quot;בתוך 3 חודשים הפכתי ללקוחה קבועה של 8 משפחות.
                  AllSherut שינה לי את החיים!&quot;
                </p>
                <div className="story-stats">
                  <span>₪4,200 בחודש</span>
                  <span>127 ביקורות</span>
                </div>
              </div>
            </Reveal>

            <Reveal as="div" delay={100} className="story-card">
              <div className="story-header">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                  alt="דוד"
                />
                <div>
                  <h4>דוד לוי</h4>
                  <p>גינון, רמת גן</p>
                </div>
              </div>
              <div className="story-content">
                <div className="story-rating">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} fill="#fbbf24" color="#fbbf24" size={16} />
                  ))}
                </div>
                <p>
                  &quot;כגנן מקצועי, מצאתי כאן לקוחות איכות שמעריכים
                  את העבודה שלי ומשלמים הוגן.&quot;
                </p>
                <div className="story-stats">
                  <span>₪3,800 בחודש</span>
                  <span>95 ביקורות</span>
                </div>
              </div>
            </Reveal>

            <Reveal as="div" delay={200} className="story-card">
              <div className="story-header">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
                  alt="מירי"
                />
                <div>
                  <h4>מירי אבן</h4>
                  <p>ניקיון, בת ים</p>
                </div>
              </div>
              <div className="story-content">
                <div className="story-rating">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} fill="#fbbf24" color="#fbbf24" size={16} />
                  ))}
                </div>
                <p>
                  &quot;הפלטפורמה הכי מקצועית שעבדתי איתה.
                  לקוחות רציניים ותשלומים מהירים.&quot;
                </p>
                <div className="story-stats">
                  <span>₪2,900 בחודש</span>
                  <span>156 ביקורות</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <Reveal as="h2" direction="down" className="section-title">שאלות נפוצות</Reveal>
          </div>

          <div className="faq-grid">
            <Reveal as="div" delay={0} className="faq-item">
              <h4>כמה זה עולה להצטרף?</h4>
              <p>
                ההצטרפות חינמית לחלוטין. לבייביסיטר אין עמלה כלל - הלקוחות משלמים.
                לשירותים אחרים יש חודש חינם, ואז ₪49/חודש.
              </p>
            </Reveal>

            <Reveal as="div" delay={100} className="faq-item">
              <h4>כמה זמן לוקח לקבל לקוחות?</h4>
              <p>
                ספקים חדשים מקבלים בדרך כלל את הפנייה הראשונה תוך 48 שעות.
                עם פרופיל מלא ותמונות איכותיות - עוד יותר מהר.
              </p>
            </Reveal>

            <Reveal as="div" delay={200} className="faq-item">
              <h4>איך מקבלים תשלומים?</h4>
              <p>
                תשלומים מועברים ישירות לחשבון הבנק שלך כל יום ראשון.
                תשלום מהיר, בטוח ושקוף.
              </p>
            </Reveal>

            <Reveal as="div" delay={0} className="faq-item">
              <h4>מה אם לקוח לא מרוצה?</h4>
              <p>
                יש לנו מערכת בוררות מקצועית וביטוח מקיף.
                בעיות נפתרות תוך 24 שעות.
              </p>
            </Reveal>

            <Reveal as="div" delay={100} className="faq-item">
              <h4>איך בונים מוניטין?</h4>
              <p>
                עם כל עבודה מושלמת תקבל ביקורת. ביקורות חיוביות
                מעלות אותך בתוצאות החיפוש.
              </p>
            </Reveal>

            <Reveal as="div" delay={200} className="faq-item">
              <h4>אפשר לעבוד במספר תחומים?</h4>
              <p>
                כן! אפשר להציע מספר שירותים באותו חשבון.
                זה מגדיל את ההזדמנויות והלקוחות.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="container">
          <Reveal as="div" className="cta-content">
            <h2>מוכן להתחיל?</h2>
            <p>הצטרף עכשיו לאלפי ספקי השירות המצליחים שלנו</p>

            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>הרשמה בחינם ומהירה</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>תמיכה מקצועית 24/7</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={20} />
                <span>לקוחות איכותיים ומאומתים</span>
              </div>
            </div>

            <button
              className="btn btn-primary btn-xl"
              onClick={() => setShowAuthModal(true)}
            >
              <ArrowRight size={24} />
              התחל להרוויח עכשיו
            </button>

            <p className="cta-note">
              * ללא התחייבות, אפשר לבטל בכל עת
            </p>
          </Reveal>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          defaultMode="register"
          defaultRole="provider"
          preSelectedService={selectedService}
        />
      )}
    </div>
  );
};

export default BecomeProviderPage;