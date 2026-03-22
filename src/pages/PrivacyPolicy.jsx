import React from 'react';
import { Shield, Lock, Database, Eye, Mail, Globe, UserCheck, Clock, AlertCircle } from 'lucide-react';
import '../styles/pages/privacy-policy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page" dir="rtl">
      
      <main className="privacy-content">
        <div className="container">
          {/* Hero Section */}
          <section className="privacy-hero">
            <div className="hero-icon-wrapper">
              <Shield className="hero-icon" size={48} />
            </div>
            <h1 className="privacy-title">מדיניות פרטיות</h1>
            <p className="privacy-subtitle">
              אנו מחויבים להגנה על פרטיותכם. מסמך זה מפרט כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלכם.
            </p>
            <div className="last-updated">
              עדכון אחרון: {new Date().toLocaleDateString('he-IL')}
            </div>
          </section>

          {/* Section 1: Data Collection */}
          <section className="privacy-section">
            <div className="section-number">1</div>
            <div className="section-content">
              <h2 className="section-title">
                <Database size={24} />
                איזה מידע אנו אוספים
              </h2>
              
              <p className="section-text">
                אנו אוספים סוגים שונים של מידע בהתאם לסוג המשתמש ואופן השימוש בפלטפורמה.
              </p>

              <h3 className="subsection-title">מידע שנאסף מלקוחות:</h3>
              <div className="data-category">
                <ul className="privacy-list">
                  <li><strong>פרטים אישיים בסיסיים:</strong> שם מלא, כתובת דוא&quot;ל</li>
                  <li><strong>היסטוריית חיפושים:</strong> שירותים שחיפשתם, מיקומים שאינטרסים אתכם</li>
                  <li><strong>ביקורות שפרסמתם:</strong> תוכן הביקורות, דירוגים וזמן פרסום</li>
                  <li><strong>נתוני שימוש:</strong> כיצד אתם משתמשים באתר, דפים שבקרתם, זמני שימוש</li>
                </ul>
              </div>

              <h3 className="subsection-title">מידע שנאסף מנותני שירות (ספקים):</h3>
              <div className="data-category highlight">
                <ul className="privacy-list">
                  <li><strong>מידע אישי מלא:</strong> שם פרטי, משפחה, כתובת דוא&quot;ל, מספר טלפון</li>
                  <li><strong>מידע מקצועי:</strong> תיאור שירותים, מחירים, ניסיון מקצועי</li>
                  <li><strong>מסמכי הסמכה:</strong> תעודות, אישורי רישוי ומקצועיות (במידה ורלוונטי)</li>
                  <li><strong>אזורי פעילות:</strong> ערים, שכונות ורדיוס פעילות</li>
                  <li><strong>תמונות:</strong> תמונת פרופיל, תמונות עבודות קודמות</li>
                  <li><strong>מידע פיננסי:</strong> פרטי תשלום עבור מנוי (מנוהל דרך Tranzila)</li>
                  <li><strong>סטטיסטיקות:</strong> מספר צפיות בפרופיל, מספר פניות, דירוגים</li>
                </ul>
              </div>

              <h3 className="subsection-title">מידע טכני שנאסף אוטומטית:</h3>
              <ul className="privacy-list">
                <li>כתובת IP</li>
                <li>סוג דפדפן ומערכת הפעלה</li>
                <li>זמני גישה ודפים שבקרתם</li>
                <li>קבצי Cookie ונתוני Session</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Data Usage */}
          <section className="privacy-section">
            <div className="section-number">2</div>
            <div className="section-content">
              <h2 className="section-title">
                <Eye size={24} />
                כיצד אנו משתמשים במידע
              </h2>

              <p className="section-text">
                המידע שנאסף משמש אותנו למטרות הבאות בלבד:
              </p>

              <div className="usage-grid">
                <div className="usage-card">
                  <div className="usage-icon">
                    <UserCheck size={28} />
                  </div>
                  <h4>הפעלת השירות</h4>
                  <ul>
                    <li>יצירה וניהול חשבונות משתמש</li>
                    <li>התאמה בין לקוחות לנותני שירות</li>
                    <li>הצגת פרופילים ומידע רלוונטי</li>
                    <li>עיבוד ביקורות ודירוגים</li>
                  </ul>
                </div>

                <div className="usage-card">
                  <div className="usage-icon">
                    <Mail size={28} />
                  </div>
                  <h4>תקשורת</h4>
                  <ul>
                    <li>שליחת קודי אימות למייל</li>
                    <li>התראות על פניות חדשות</li>
                    <li>עדכונים על מנויים ותשלומים</li>
                    <li>תמיכה טכנית ושירות לקוחות</li>
                  </ul>
                </div>

                <div className="usage-card">
                  <div className="usage-icon">
                    <Database size={28} />
                  </div>
                  <h4>שיפור השירות</h4>
                  <ul>
                    <li>ניתוח דפוסי שימוש</li>
                    <li>שיפור חוויית משתמש</li>
                    <li>פיתוח תכונות חדשות</li>
                    <li>מניעת שימוש לרעה</li>
                  </ul>
                </div>

                <div className="usage-card">
                  <div className="usage-icon">
                    <Globe size={28} />
                  </div>
                  <h4>סטטיסטיקות</h4>
                  <ul>
                    <li>ניתוחים כלליים של השימוש</li>
                    <li>דוחות אנונימיים</li>
                    <li>מדדי ביצועים</li>
                    <li>מגמות בשוק</li>
                  </ul>
                </div>
              </div>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>התחייבות שלנו:</strong> אנו לעולם לא נמכור את המידע האישי שלכם לצדדים שלישיים למטרות שיווקיות.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Email Verification for Reviews */}
          <section className="privacy-section">
            <div className="section-number">3</div>
            <div className="section-content">
              <h2 className="section-title">
                <Mail size={24} />
                אימות דוא&quot;ל לביקורות
              </h2>

              <p className="section-text">
                במסגרת מערכת הביקורות שלנו, אנו דורשים אימות כתובת דוא&quot;ל לפני פרסום כל ביקורת. הנה כיצד זה עובד:
              </p>

              <div className="process-timeline">
                <div className="timeline-item">
                  <div className="timeline-marker">1</div>
                  <div className="timeline-content">
                    <h4>כתיבת ביקורת</h4>
                    <p>משתמש כותב ביקורת ומזין כתובת דוא&quot;ל</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker">2</div>
                  <div className="timeline-content">
                    <h4>קוד אימות</h4>
                    <p>מערכת שולחת קוד בן 6 ספרות לכתובת המייל</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker">3</div>
                  <div className="timeline-content">
                    <h4>אימות</h4>
                    <p>משתמש מזין את הקוד תוך 15 דקות</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker">4</div>
                  <div className="timeline-content">
                    <h4>פרסום</h4>
                    <p>הביקורת מתפרסמת מיידית לאחר אימות מוצלח</p>
                  </div>
                </div>
              </div>

              <h3 className="subsection-title">מדיניות אבטחה לקודי אימות:</h3>
              <ul className="privacy-list">
                <li><strong>תוקף מוגבל:</strong> כל קוד תקף ל-15 דקות בלבד</li>
                <li><strong>אחסון מאובטח:</strong> קודים מוצפנים במסד הנתונים</li>
                <li><strong>שימוש חד-פעמי:</strong> כל קוד יכול לשמש פעם אחת בלבד</li>
                <li><strong>מחיקה אוטומטית:</strong> קודים שפג תוקפם נמחקים אוטומטית מהמערכת</li>
                <li><strong>הגבלת שימוש:</strong> מייל אחד יכול לפרסם ביקורת אחת בלבד לכל נותן שירות</li>
              </ul>

              <div className="security-box">
                <Lock size={20} />
                <div>
                  <strong>אבטחת מייל:</strong> כתובות דוא&quot;ל שנשלחו לצורך אימות לא נמכרות ולא משותפות עם צדדים שלישיים. הן משמשות אך ורק לאימות הביקורת.
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Data Sharing */}
          <section className="privacy-section">
            <div className="section-number">4</div>
            <div className="section-content">
              <h2 className="section-title">
                <Globe size={24} />
                שיתוף מידע עם צדדים שלישיים
              </h2>

              <h3 className="subsection-title">מידע ציבורי של נותני שירות:</h3>
              <p className="section-text">
                המידע הבא של נותני שירות <strong>גלוי לציבור</strong> ונגיש לכל גולשי האתר:
              </p>
              <ul className="privacy-list highlight">
                <li>שם מלא</li>
                <li>תמונת פרופיל</li>
                <li>תיאור שירותים ומחירים</li>
                <li>אזורי פעילות</li>
                <li>ביקורות ודירוגים</li>
                <li>מספר טלפון (אופציונלי, לפי בחירת נותן השירות)</li>
              </ul>

              <div className="warning-box">
                <AlertCircle size={20} />
                <div>
                  <strong>שימו לב:</strong> נותני שירות - כל מידע שתבחרו לפרסם בפרופיל שלכם יהיה גלוי לכל גולשי האתר. היזהרו לא לפרסם מידע רגיש שאינכם רוצים לחשוף.
                </div>
              </div>

              <h3 className="subsection-title">שיתוף עם ספקי שירות:</h3>
              <p className="section-text">
                אנו משתפים מידע מוגבל עם ספקי שירות טכניים הבאים:
              </p>

              <div className="partner-box">
                <h4>Tranzila - עיבוד תשלומים</h4>
                <p>
                  מערכת Tranzila מעבדת את התשלומים עבור מנויי נותני השירות. 
                  <strong> אנו לא שומרים פרטי כרטיס אשראי </strong> - כל המידע הפיננסי מנוהל ישירות על ידי Tranzila בהתאם לתקני אבטחת PCI DSS.
                </p>
                <p className="small-text">מידע משותף: שם, כתובת דוא&quot;ל, סכום תשלום</p>
              </div>

              <h3 className="subsection-title">חובות חוקיות:</h3>
              <p className="section-text">
                אנו עשויים לחשוף מידע אישי במקרים הבאים:
              </p>
              <ul className="privacy-list">
                <li>צו שיפוטי או דרישה חוקית מרשויות אכיפת החוק</li>
                <li>הגנה על זכויות ורכוש AllSherut</li>
                <li>מניעת פעילות בלתי חוקית או חשודה</li>
                <li>הגנה על בטחונם של משתמשים אחרים</li>
              </ul>

              <div className="commitment-box">
                <Shield size={24} />
                <div>
                  <h4>ההתחייבות שלנו</h4>
                  <p>אנו <strong>לעולם לא נמכור</strong> את המידע האישי שלכם לחברות שיווק, מפרסמים או גורמים אחרים למטרות רווח.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Security */}
          <section className="privacy-section">
            <div className="section-number">5</div>
            <div className="section-content">
              <h2 className="section-title">
                <Lock size={24} />
                אבטחת מידע
              </h2>

              <p className="section-text">
                אנו נוקטים באמצעי אבטחה מתקדמים להגנה על המידע האישי שלכם:
              </p>

              <div className="security-features">
                <div className="security-feature">
                  <div className="feature-icon">
                    <Lock size={32} />
                  </div>
                  <h4>הצפנת סיסמאות</h4>
                  <p>כל הסיסמאות מוצפנות באמצעות אלגוריתם bcrypt מתקדם. אנו לא יכולים לראות את הסיסמה שלכם - רק אתם.</p>
                </div>

                <div className="security-feature">
                  <div className="feature-icon">
                    <Shield size={32} />
                  </div>
                  <h4>HTTPS מאובטח</h4>
                  <p>כל התקשורת בין הדפדפן שלכם לשרתים שלנו מוצפנת באמצעות פרוטוקול HTTPS עם תעודות SSL/TLS.</p>
                </div>

                <div className="security-feature">
                  <div className="feature-icon">
                    <Clock size={32} />
                  </div>
                  <h4>Tokens JWT</h4>
                  <p>אימות משתמשים מתבצע באמצעות JWT tokens עם תוקף מוגבל וחידוש אוטומטי מאובטח.</p>
                </div>

                <div className="security-feature">
                  <div className="feature-icon">
                    <Database size={32} />
                  </div>
                  <h4>הגנת מסדי נתונים</h4>
                  <p>מסדי הנתונים שלנו מוגנים בחומות אש, גיבויים שוטפים ובקרות גישה מחמירות.</p>
                </div>
              </div>

              <h3 className="subsection-title">הגנה מפני התקפות:</h3>
              <ul className="privacy-list">
                <li><strong>Rate Limiting:</strong> הגבלת מספר בקשות למניעת התקפות DDoS</li>
                <li><strong>הגנת CSRF:</strong> מניעת התקפות Cross-Site Request Forgery</li>
                <li><strong>SQL Injection:</strong> שימוש ב-Prepared Statements למניעת התקפות SQL</li>
                <li><strong>XSS Protection:</strong> סינון תוכן למניעת הזרקת קוד זדוני</li>
              </ul>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>חשוב:</strong> למרות כל מאמצי האבטחה, אף מערכת אינה חסינה לחלוטין. אנו ממליצים להשתמש בסיסמאות חזקות ייחודיות ולא לשתף אותן עם אף אחד.
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Cookies */}
          <section className="privacy-section">
            <div className="section-number">6</div>
            <div className="section-content">
              <h2 className="section-title">
                <Database size={24} />
                Cookies ומעקב
              </h2>

              <h3 className="subsection-title">סוגי Cookies שאנו משתמשים בהם:</h3>

              <div className="cookies-grid">
                <div className="cookie-type essential">
                  <h4>🔐 Cookies הכרחיים</h4>
                  <p className="type-label">נדרשים לתפקוד</p>
                  <ul>
                    <li>אימות משתמש (JWT tokens)</li>
                    <li>ניהול Session</li>
                    <li>העדפות אבטחה</li>
                  </ul>
                  <p className="small-text">לא ניתן לבטל - נדרשים להפעלת האתר</p>
                </div>

                <div className="cookie-type functional">
                  <h4>⚙️ Cookies פונקציונליים</h4>
                  <p className="type-label">משפרים חוויה</p>
                  <ul>
                    <li>זכירת העדפות משתמש</li>
                    <li>שפת ממשק</li>
                    <li>העדפות תצוגה</li>
                  </ul>
                  <p className="small-text">ניתן לבטל - השפעה על נוחות שימוש</p>
                </div>

                <div className="cookie-type analytics">
                  <h4>📊 Cookies אנליטיים</h4>
                  <p className="type-label">מדידת ביצועים</p>
                  <ul>
                    <li>ניתוח דפוסי גלישה</li>
                    <li>מדידת ביצועי דפים</li>
                    <li>שיפור חוויית משתמש</li>
                  </ul>
                  <p className="small-text">ניתן לבטל - עוזר לנו לשפר את האתר</p>
                </div>
              </div>

              <h3 className="subsection-title">ניהול Cookies:</h3>
              <p className="section-text">
                אתם יכולים לשלוט ב-Cookies דרך הגדרות הדפדפן שלכם. שימו לב שחסימת Cookies מסוימים עלולה להשפיע על תפקוד האתר.
              </p>

              <div className="browser-guide">
                <h4>איך לנהל Cookies בדפדפנים פופולריים:</h4>
                <ul className="privacy-list">
                  <li><strong>Chrome:</strong> הגדרות → פרטיות ואבטחה → Cookies</li>
                  <li><strong>Firefox:</strong> הגדרות → פרטיות ואבטחה → Cookies</li>
                  <li><strong>Safari:</strong> העדפות → פרטיות</li>
                  <li><strong>Edge:</strong> הגדרות → Cookies והרשאות אתר</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: User Rights (GDPR) */}
          <section className="privacy-section">
            <div className="section-number">7</div>
            <div className="section-content">
              <h2 className="section-title">
                <UserCheck size={24} />
                הזכויות שלכם
              </h2>

              <p className="section-text">
                בהתאם ל-GDPR (תקנת הגנת המידע האירופית) ולחוק הגנת הפרטיות הישראלי, יש לכם את הזכויות הבאות:
              </p>

              <div className="rights-grid">
                <div className="right-card">
                  <div className="right-icon">👁️</div>
                  <h4>זכות העיון</h4>
                  <p>לדעת איזה מידע אישי שלכם אנו מחזיקים ולקבל עותק ממנו</p>
                </div>

                <div className="right-card">
                  <div className="right-icon">✏️</div>
                  <h4>זכות התיקון</h4>
                  <p>לתקן מידע שגוי או לא מדויק שנמצא במערכת שלנו</p>
                </div>

                <div className="right-card">
                  <div className="right-icon">🗑️</div>
                  <h4>זכות המחיקה</h4>
                  <p>לבקש מחיקת המידע האישי שלכם (&quot;הזכות להישכח&quot;)</p>
                </div>

                <div className="right-card">
                  <div className="right-icon">📦</div>
                  <h4>זכות הניידות</h4>
                  <p>לקבל את המידע שלכם בפורמט מובנה וניתן לקריאה במכונה</p>
                </div>

                <div className="right-card">
                  <div className="right-icon">⛔</div>
                  <h4>זכות ההתנגדות</h4>
                  <p>להתנגד לעיבוד המידע שלכם במקרים מסוימים</p>
                </div>

                <div className="right-card">
                  <div className="right-icon">⏸️</div>
                  <h4>זכות ההגבלה</h4>
                  <p>לבקש הגבלה של עיבוד המידע שלכם בתנאים מסוימים</p>
                </div>
              </div>

              <h3 className="subsection-title">כיצד לממש את זכויותיכם:</h3>
              <p className="section-text">
                כדי לממש אחת מהזכויות האלו, פשוט צרו קשר עמנו במייל: 
                <strong> privacy@allsherut.com</strong>
              </p>
              <p className="section-text">
                נשיב לכם תוך 30 יום ממועד הפנייה ונעזור לכם לממש את זכויותיכם.
              </p>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>שימו לב:</strong> במקרים מסוימים, ייתכן שלא נוכל למחוק את המידע שלכם במלואו (למשל, אם אנו נדרשים לשמור אותו על פי חוק, או אם יש ביקורות ציבוריות שפרסמתם).
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Data Retention */}
          <section className="privacy-section">
            <div className="section-number">8</div>
            <div className="section-content">
              <h2 className="section-title">
                <Clock size={24} />
                משך זמן שמירת מידע
              </h2>

              <h3 className="subsection-title">תקופות שמירה:</h3>
              
              <div className="retention-table">
                <div className="retention-row header">
                  <div>סוג מידע</div>
                  <div>תקופת שמירה</div>
                  <div>סיבה</div>
                </div>

                <div className="retention-row">
                  <div><strong>פרטי חשבון פעיל</strong></div>
                  <div>כל עוד החשבון פעיל</div>
                  <div>תפעול השירות</div>
                </div>

                <div className="retention-row">
                  <div><strong>ביקורות שפורסמו</strong></div>
                  <div>ללא הגבלת זמן</div>
                  <div>שקיפות ציבורית</div>
                </div>

                <div className="retention-row">
                  <div><strong>היסטוריית תשלומים</strong></div>
                  <div>7 שנים</div>
                  <div>חובות חוקיות חשבונאיות</div>
                </div>

                <div className="retention-row">
                  <div><strong>קודי אימות מייל</strong></div>
                  <div>15 דקות</div>
                  <div>אבטחה ומחיקה אוטומטית</div>
                </div>

                <div className="retention-row">
                  <div><strong>לוגים טכניים</strong></div>
                  <div>90 יום</div>
                  <div>אבטחה ותמיכה טכנית</div>
                </div>

                <div className="retention-row">
                  <div><strong>חשבונות מבוטלים</strong></div>
                  <div>30 יום (גרייס פריוד)</div>
                  <div>אפשרות שחזור</div>
                </div>
              </div>

              <h3 className="subsection-title">מה קורה לאחר מחיקת חשבון:</h3>
              <ul className="privacy-list">
                <li><strong>מידע אישי:</strong> נמחק ללא אפשרות שחזור (למעט דרישות חוק)</li>
                <li><strong>ביקורות:</strong> נמחקות מהשרתים</li>
                <li><strong>תמונות:</strong> נמחקות מהשרתים</li>
                <li><strong>היסטוריית תשלומים:</strong> נשמרת למטרות חוקיות וחשבונאיות בלבד</li>
              </ul>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>חשוב לדעת:</strong> אנו נשמור מידע רק למשך הזמן הנדרש לביצוע המטרות שלשמן הוא נאסף, או כפי שנדרש על פי חוק.
                </div>
              </div>
            </div>
          </section>

       {/* Section 9: International Transfers */}
<section className="privacy-section">
  <div className="section-number">9</div>
  <div className="section-content">
    <h2 className="section-title">
      <Globe size={24} />
      העברות בינלאומיות
    </h2>

    <h3 className="subsection-title">מיקום שרתים:</h3>
    <p className="section-text">
      השרתים העיקריים שלנו ממוקמים בישראל. אנו משתמשים בספקי שירות ישראליים בלבד,
      הפועלים בהתאם לתקני אבטחת מידע מחמירים ולחוק הגנת הפרטיות הישראלי.
    </p>

    <h3 className="subsection-title">שירותי צד שלישי:</h3>
    <div className="service-box">
      <h4>Tranzila (ישראל)</h4>
      <p>
        Tranzila היא חברת עיבוד תשלומים ישראלית מוסמכת על ידי בנק ישראל ופועלת
        בהתאם לתקני אבטחת המידע הבינלאומיים PCI DSS.
      </p>
      <p>
        כל נתוני התשלום מנוהלים ישירות על ידי Tranzila בשרתים מאובטחים בישראל.
        אנו איננו שומרים מידע על כרטיסי אשראי בשרתים שלנו.
      </p>
      <p>
        Tranzila עומדת בדרישות החוק המקומי ומספקת הגנות מתקדמות על פרטיות המשתמשים.
      </p>
    </div>

    <h3 className="subsection-title">אמצעי הגנה חוקיים:</h3>
    <ul className="privacy-list">
      <li>עמידה מלאה בתקני PCI DSS הבינלאומיים</li>
      <li>שמירה על התאמה לחוק הגנת הפרטיות הישראלי</li>
      <li>העברת נתונים מאובטחת באמצעות הצפנת SSL ו-HTTPS</li>
      <li>בחירת ספקים ישראליים בעלי תקני אבטחה מוכרים</li>
    </ul>
  </div>
</section>


          {/* Section 10: Contact */}
          <section className="privacy-section">
            <div className="section-number">10</div>
            <div className="section-content">
              <h2 className="section-title">
                <Mail size={24} />
                יצירת קשר
              </h2>

              <p className="section-text">
                לשאלות, בקשות או דיווחים בנוגע למדיניות הפרטיות:
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <Mail size={28} />
                  </div>
                  <div className="method-content">
                    <h4>דוא&quot;ל</h4>
                    <p><strong>פרטיות ו-GDPR:</strong> privacy@allsherut.com</p>
                    <p><strong>תמיכה כללית:</strong> support@allsherut.com</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <UserCheck size={28} />
                  </div>
                  <div className="method-content">
                    <h4>ממונה על הגנת הפרטיות</h4>
                    <p>ניתן לפנות ישירות לממונה הפרטיות שלנו בכתובת: dpo@allsherut.com</p>
                  </div>
                </div>
              </div>

              <div className="response-time">
                <Clock size={20} />
                <p>אנו מתחייבים להשיב לכל פנייה תוך <strong>30 יום</strong> ממועד קבלתה.</p>
              </div>
            </div>
          </section>

          {/* Section 11: Policy Changes */}
          <section className="privacy-section">
            <div className="section-number">11</div>
            <div className="section-content">
              <h2 className="section-title">
                <AlertCircle size={24} />
                שינויים במדיניות
              </h2>

              <p className="section-text">
                אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת כדי לשקף שינויים בשירותים שלנו או בדרישות החוקיות.
              </p>

              <h3 className="subsection-title">כיצד נודיע לכם:</h3>
              <ul className="privacy-list">
                <li><strong>שינויים קטנים:</strong> עדכון התאריך בראש המסמך</li>
                <li><strong>שינויים מהותיים:</strong> שליחת הודעת דוא&quot;ל לכל המשתמשים הרשומים</li>
                <li><strong>שינויים משמעותיים:</strong> הצגת הודעה בולטת באתר + דרישת הסכמה מפורשת</li>
              </ul>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>המלצה:</strong> אנו ממליצים לבקר במדיניות הפרטיות מעת לעת כדי להישאר מעודכנים בשינויים.
                </div>
              </div>

              <h3 className="subsection-title">המשך שימוש:</h3>
              <p className="section-text">
                המשך שימוש בשירותים שלנו לאחר עדכון מדיניות הפרטיות מהווה הסכמה לתנאים המעודכנים.
              </p>
            </div>
          </section>

          {/* Footer Note */}
          <div className="privacy-footer-note">
            <Shield size={32} />
            <h3>ההתחייבות שלנו אליכם</h3>
            <p>
              אנו רואים בפרטיותכם ערך עליון ומתחייבים להגן עליה בכל האמצעים הטכנולוגיים והארגוניים העומדים לרשותנו. 
              המידע שלכם בטוח איתנו, ואנו לעולם לא נפר את האמון שנתתם בנו.
            </p>
            <p className="small-text">
              מסמך זה עודכן לאחרונה בתאריך: {new Date().toLocaleDateString('he-IL')}
            </p>
          </div>
        </div>
      </main>

    </div>
  );
};

export default PrivacyPolicy;