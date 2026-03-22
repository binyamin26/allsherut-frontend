import React from 'react';
import { FileText, Shield, Users, CreditCard, AlertCircle,AlertTriangle, Scale } from 'lucide-react';
import '../styles/pages/terms-of-service.css';

const TermsOfService = () => {
  return (
    <div className="terms-page" dir="rtl">
      
      <main className="terms-content">
        <div className="container">
          {/* Hero Section */}
          <section className="terms-hero">
            <div className="hero-icon-wrapper">
              <FileText className="hero-icon" size={48} />
            </div>
            <h1 className="terms-title">תנאי שימוש</h1>
            <p className="terms-subtitle">
              תנאי השימוש של פלטפורמת AllSherut - נא לקרוא בעיון לפני השימוש בשירות
            </p>
            <div className="last-updated">
              עדכון אחרון: {new Date().toLocaleDateString('he-IL')}
            </div>
          </section>

          {/* Section 1: Service Definition */}
          <section className="terms-section">
            <div className="section-number">1</div>
            <div className="section-content">
              <h2 className="section-title">
                <Shield size={24} />
                הגדרת השירות
              </h2>
              <p className="section-text">
                AllSherut היא פלטפורמה דיגיטלית המספקת שירותי התאמה בין לקוחות לבין נותני שירותים עצמאיים בתחומים שונים.
              </p>
              
              <h3 className="subsection-title">סוגי השירותים המוצעים בפלטפורמה:</h3>
              <ul className="terms-list">
                <li><strong>בייביסיטר</strong> - שירותי שמרטפות לילדים</li>
                <li><strong>ניקיון</strong> - שירותי ניקיון ביתי</li>
                <li><strong>גינון</strong> - שירותי גינון ותחזוקת גינות</li>
                <li><strong>שמירה על חיות מחמד</strong> - שירותי טיפול ושמירה על בעלי חיים</li>
                <li><strong>סיוע לימודי</strong> - שיעורים פרטיים ותמיכה אקדמית</li>
                <li><strong>סיוע לקשישים</strong> - שירותי טיפול ועזרה לאנשים מבוגרים</li>
             <li><strong>מכבסה וגיהוץ</strong> - שירותי כביסה מקצועיים</li>
                <li><strong>שירותי ניהול דירות מקצועיים</strong> - מנהלי נכסים מנוסים לניהול דירות להשכרה - מיועד לבעלי דירות שאינם גרים בקרבת הנכס</li>
             </ul>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>חשוב להבין:</strong> AllSherut משמשת כפלטפורמת התאמה בלבד. אנו לא מעסיקים את נותני השירותים ואינם אחראים לשירותים הניתנים.
                </div>
              </div>

              <h3 className="subsection-title">הבחנה בין סוגי משתמשים:</h3>
              <ul className="terms-list">
                <li><strong>לקוחות</strong> - שימוש חופשי וללא תשלום בכל השירותים</li>
                <li><strong>נותני שירות (ספקים)</strong> - דורשים מנוי חודשי לאחר תקופת ניסיון של 30 יום</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Registration and Accounts */}
          <section className="terms-section">
            <div className="section-number">2</div>
            <div className="section-content">
              <h2 className="section-title">
                <Users size={24} />
                הרשמה וחשבונות משתמש
              </h2>
              
            <h3 className="subsection-title">תנאים ליצירת חשבון:</h3>
<ul className="terms-list">
  <li>השימוש בפלטפורמה מותר מגיל 15 ומעלה</li>
  <li>משתמשים מתחת לגיל 18 נדרשים לאישור הורה או אפוטרופוס חוקי, בהתאם לחוק עבודת הנוער, תש״ג–1953</li>
  <li>מסירת מידע אמיתי, מדויק ומלא בעת ההרשמה</li>
  <li>כתובת דוא&quot;ל תקפה לצורך אימות חשבון</li>
  <li>אחריות מלאה על שמירת פרטי הזדהות (סיסמה)</li>
</ul>

              <h3 className="subsection-title">אבטחת חשבון:</h3>
              <ul className="terms-list">
                <li>המשתמש אחראי באופן בלעדי על כל פעילות המתבצעת בחשבונו</li>
                <li>חובה ליידע את AllSherut מיד במקרה של חשד לשימוש בלתי מורשה</li>
                <li>אין לשתף את פרטי החשבון עם צדדים שלישיים</li>
              </ul>

              <h3 className="subsection-title">זכות השעיה וביטול חשבונות:</h3>
              <p className="section-text">
                AllSherut שומרת לעצמה את הזכות להשעות או לבטל חשבונות במקרים הבאים:
              </p>
              <ul className="terms-list">
                <li>הפרה של תנאי שימוש אלו</li>
                <li>פעילות חשודה או מזיקה</li>
                <li>מתן מידע כוזב או מטעה</li>
                <li>ביצוע מעשי הונאה או ניסיון לכך</li>
                <li>פגיעה במשתמשים אחרים</li>
              </ul>
            </div>
          </section>

          {/* Section 3: For Providers */}
          <section className="terms-section">
            <div className="section-number">3</div>
            <div className="section-content">
              <h2 className="section-title">
                <CreditCard size={24} />
                תנאים לנותני שירות (ספקים)
              </h2>

              <h3 className="subsection-title">מבנה המנוי:</h3>
              <div className="highlight-box">
                <ul className="terms-list">
                  <li><strong>חודש ראשון</strong> - תקופת ניסיון בחינם ללא התחייבות</li>
                  <li><strong>מחודש השני ואילך</strong> - תשלום חודשי קבוע</li>
                  <li>ניתן לבטל את המנוי בכל עת</li>
                  <li>ביטול מנוי מתבצע בצורה מבוקרת עם הארכה עד תום התקופה ששולמה</li>
                </ul>
              </div>

              <div className="warning-box">
                <AlertTriangle size={20} />
                <div>
                  <strong>🔒 מדיניות תקופת הניסיון החינמית</strong>
                  <ul className="terms-list" style={{ marginTop: '0.5rem' }}>
                    <li>תקופת הניסיון החינמית ניתנת <strong>פעם אחת בלבד</strong> לכל כתובת אימייל ומספר טלפון</li>
                    <li>ניסיון להירשם מחדש עם אותו אימייל או מספר טלפון לא יזכה בתקופת ניסיון נוספת</li>
                    <li>מדיניות זו נועדה למנוע שימוש לרעה במערכת ולשמור על הוגנות</li>
                    <li>גם לאחר מחיקת חשבון, המערכת שומרת רישום (מוצפן) למניעת הונאה</li>
                  </ul>
                </div>
              </div>

              <h3 className="subsection-title">חובות נותני השירות:</h3>
              <ul className="terms-list">
                <li><strong>דיוק מידע</strong> - מסירת מידע מקצועי מדויק ועדכני</li>
                <li><strong>כישורים ורישיונות</strong> - החזקת כל האישורים הנדרשים לביצוע השירות</li>
                <li><strong>זמינות</strong> - עדכון שוטף של זמינות ואזורי פעילות</li>
                <li><strong>תגובה ללקוחות</strong> - מענה מקצועי ואדיב לפניות</li>
                <li><strong>שירות איכותי</strong> - מתן שירות ברמה מקצועית גבוהה</li>
              </ul>

              <h3 className="subsection-title">מדיניות ביטולים והחזרים:</h3>
              <ul className="terms-list">
                <li>ביטול תוך 14 יום מתחילת מנוי חדש מזכה בהחזר מלא</li>
                <li>ביטול לאחר תקופת הניסיון - החשבון יישאר פעיל עד תום התקופה ששולמה</li>
                <li>אין החזרים עבור חלק מתקופת מנוי</li>
                <li>מנוי שנתי מזכה בהנחה ולא ניתן להחזר יחסי</li>
              </ul>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>שימו לב:</strong> ביטול מנוי לא גורר מחיקה מיידית של החשבון. החשבון ימשיך לפעול עד תום התקופה ששולמה, ורק אז יימחק באופן אוטומטי.
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: For Clients */}
          <section className="terms-section">
            <div className="section-number">4</div>
            <div className="section-content">
              <h2 className="section-title">
                <Users size={24} />
                תנאים ללקוחות
              </h2>

              <h3 className="subsection-title">שימוש חופשי:</h3>
              <p className="section-text">
                לקוחות נהנים משימוש בלתי מוגבל וחינמי בכל שירותי הפלטפורמה ללא כל תשלום.
              </p>

              <h3 className="subsection-title">חיפוש ויצירת קשר:</h3>
              <ul className="terms-list">
                <li>חיפוש חופשי בין כלל נותני השירותים</li>
                <li>גישה למידע מלא על נותני השירותים</li>
                <li>יצירת קשר ישיר עם נותני שירותים</li>
                <li>אין הגבלה על מספר הפניות</li>
              </ul>

              <h3 className="subsection-title">איסורים:</h3>
              <ul className="terms-list">
                <li><strong>שימוש לרעה</strong> - פניות מטרידות או לא רלוונטיות</li>
                <li><strong>ספאם</strong> - שליחת הודעות המוניות או שיווקיות</li>
                <li><strong>איסוף מידע</strong> - שימוש אוטומטי לאיסוף נתונים</li>
                <li><strong>התחזות</strong> - יצירת פרופילים מזויפים</li>
              </ul>

              <div className="warning-box">
                <AlertCircle size={20} />
                <div>
                  <strong>אזהרה:</strong> שימוש לרעה בפלטפורמה עלול להוביל לחסימת חשבון מיידית ללא אזהרה מוקדמת.
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Review System */}
          <section className="terms-section">
            <div className="section-number">5</div>
            <div className="section-content">
              <h2 className="section-title">
                <FileText size={24} />
                מערכת הביקורות והדירוגים
              </h2>

              <h3 className="subsection-title">תהליך פרסום ביקורת:</h3>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <strong>כתיבת הביקורת</strong>
                    <p>הלקוח כותב את חוות דעתו על השירות שקיבל</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <strong>אימות דוא&quot;ל</strong>
                    <p>שליחת קוד אימות בן 6 סרות למייל</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <strong>פרסום מיידי</strong>
                    <p>הביקורת מתפרסמת מיד לאחר אימות המייל</p>
                  </div>
                </div>
              </div>

              <h3 className="subsection-title">כללי פרסום ביקורות:</h3>
              <ul className="terms-list">
                <li><strong>אימות חובה</strong> - כל ביקורת דורשת אימות דוא&quot;ל עם קוד בן 6 ספרות</li>
                <li><strong>פרסום מיידי</strong> - ביקורות מתפרסמות באופן מיידי לאחר אימות</li>
                <li><strong>ביקורת אחת לנותן שירות</strong> - כל כתובת מייל יכולה לפרסם ביקורת אחת בלבד לכל נותן שירות</li>
                <li><strong>תוקף קוד אימות</strong> - 15 דקות בלבד</li>
              </ul>

              <h3 className="subsection-title">איסורים במערכת הביקורות:</h3>
              <ul className="terms-list">
                <li>פרסום ביקורות כוזבות או מטעות</li>
                <li>ביקורות שכתובות על ידי נותן השירות עצמו או מטעמו</li>
                <li>שימוש בשפה פוגענית, מאיימת או בוטה</li>
                <li>פרסום מידע אישי של נותני שירות</li>
                <li>ביקורות שאינן קשורות לשירות שניתן</li>
              </ul>

              <h3 className="subsection-title">זכות תגובה לנותני שירות:</h3>
              <p className="section-text">
                נותני שירות רשאים להגיב לביקורות שפורסמו עליהם:
              </p>
              <ul className="terms-list">
                <li>תגובה אחת לכל ביקורת</li>
                <li>ללא הגבלת זמן מתן התגובה</li>
                <li>התגובה תוצג מתחת לביקורת</li>
                <li>אין אפשרות לעריכה לאחר פרסום התגובה</li>
              </ul>

              <h3 className="subsection-title">מדיניות נגד ספאם:</h3>
              <ul className="terms-list">
                <li>מייל אחד יכול לפרסם ביקורת אחת בלבד לכל נותן שירות</li>
                <li>קודי אימות תקפים ל-15 דקות בלבד</li>
                <li>ניקוי אוטומטי של קודים שפג תוקפם</li>
                <li>זיהוי וחסימת התנהגות חשודה</li>
              </ul>
            </div>
          </section>

          {/* Section 6: Payments */}
          <section className="terms-section">
            <div className="section-number">6</div>
            <div className="section-content">
              <h2 className="section-title">
                <CreditCard size={24} />
                תשלומים ומנויים
              </h2>

              <h3 className="subsection-title">מערכת התשלומים:</h3>
              <p className="section-text">
                כל התשלומים מתבצעים באמצעות מערכת Tranzila המאובטחת. AllSherut אינה שומרת פרטי אשראי של המשתמשים.
              </p>

              <h3 className="subsection-title">סוגי מנויים:</h3>
              <div className="pricing-info">
                <div className="pricing-plan">
                  <h4>מנוי חודשי</h4>
                  <ul>
                    <li>תשלום חודשי קבוע</li>
                    <li>ניתן לביטול בכל עת</li>
                    <li>חיוב אוטומטי בתחילת כל חודש</li>
                  </ul>
                </div>
                <div className="pricing-plan">
                  <h4>מנוי שנתי</h4>
                  <ul>
                    <li>תשלום חד פעמי לשנה</li>
                    <li>הנחה משמעותית לעומת מנוי חודשי</li>
                    <li>חיוב אוטומטי בתום השנה</li>
                  </ul>
                </div>
              </div>

              <h3 className="subsection-title">מדיניות חידוש אוטומטי:</h3>
              <ul className="terms-list">
                <li>מנויים מתחדשים באופן אוטומטי בתום התקופה</li>
                <li>שליחת התראות מייל 7 ו-3 ימים לפני תום תקופת ניסיון</li>
                <li>התראה על פקיעת מנוי במידה ותשלום נכשל</li>
                <li>ניתן לבטל חידוש אוטומטי בכל עת דרך לוח הבקרה</li>
              </ul>

              <h3 className="subsection-title">מדיניות החזרים:</h3>
              <ul className="terms-list">
                <li><strong>תקופת ניסיון</strong> - ללא חיוב, ללא צורך בהחזר</li>
                <li><strong>14 ימים ראשונים</strong> - החזר מלא במקרה של ביטול</li>
                <li><strong>לאחר 14 ימים</strong> - אין החזרים, אך השירות ימשך עד תום התקופה ששולמה</li>
                <li><strong>מנוי שנתי</strong> - אין החזר יחסי, המנוי ימשך עד תום השנה</li>
              </ul>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>חשוב לדעת:</strong> ביטול מנוי לא גורם למחיקה מיידית. תוכלו להמשיך להשתמש בכל השירותים עד תום התקופה ששולמה, ורק אז החשבון יימחק אוטומטית.
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Liability */}
          <section className="terms-section">
        <div className="section-number">7</div>
        <div className="section-content">
          <h2 className="section-title">
            <Shield size={24} />
            אחריות והגבלת אחריות - תנאים מפורטים
          </h2>

          <h3 className="subsection-title">תפקיד הפלטפורמה:</h3>
          <div className="highlight-box important">
            <p>
              <strong>AllSherut משמשת כפלטפורמת התאמה בלבד.</strong> אנו מספקים כלי לחיבור בין לקוחות לנותני שירותים עצמאיים, אך <strong>אינם מעסיקים אותם, לא משלמים להם משכורת, ואינם אחראים למעשיהם או למחדליהם</strong>.
            </p>
          </div>

          <h3 className="subsection-title">🚨 הצהרת אי-אחריות קריטית:</h3>
          <div className="warning-box critical">
            <AlertTriangle size={24} />
            <div>
              <p><strong>חשוב במיוחד לדעת:</strong></p>
              <p>
                AllSherut <strong>אינה אחראית בשום צורה</strong> לכל נזק, פגיעה, אובדן או תקרית הנגרמים על ידי או בקשר לנותני השירותים, לרבות אך לא רק:
              </p>
              <ul style={{ marginTop: 'var(--space-3)', paddingRight: 'var(--space-6)' }}>
                <li>פגיעות גוף, תקיפות מיניות, או כל פגיעה פיזית אחרת</li>
                <li>גניבות, שוד, או נזקים לרכוש</li>
                <li>הזנחה, רשלנות, או אי-ביצוע שירות כראוי</li>
                <li>מעשים פליליים או התנהגות בלתי הולמת</li>
                <li>נזקים נפשיים, רגשיים או פסיכולוגיים</li>
                <li>הדבקה במחלות או פגיעה בבריאות</li>
                <li>אובדן או נזק לחפצי ערך</li>
                <li>כל תוצאה ישירה או עקיפה הנובעת מהשירות שניתן</li>
              </ul>
              <p style={{ marginTop: 'var(--space-4)', fontWeight: '700' }}>
                כל יחסים חוזיים, אחריות משפטית, ותביעות הם בין הלקוח לנותן השירות בלבד. AllSherut אינה צד לכל מעשה או מחדל.
              </p>
            </div>
          </div>

          <h3 className="subsection-title">יחסי עבודה:</h3>
          <div className="info-box">
            <FileText size={20} />
            <div>
              <strong>הבהרה חשובה:</strong> נותני השירותים הרשומים בפלטפורמה הם <strong>קבלנים עצמאיים</strong> ולא עובדים של AllSherut. אין בינם לבין החברה יחסי עובד-מעסיק. AllSherut אינה:
              <ul style={{ marginTop: 'var(--space-2)', paddingRight: 'var(--space-6)' }}>
                <li>משלמת משכורות, ביטוח לאומי, או מס הכנסה עבור נותני השירותים</li>
                <li>מספקת הדרכה, הכשרה, או השגחה על עבודתם</li>
                <li>קובעת שעות עבודה, מתודות עבודה, או דרישות ביצוע</li>
                <li>מספקת ציוד, כלים, או חומרי עבודה</li>
              </ul>
            </div>
          </div>

          <h3 className="subsection-title">אי-אחריות לשירותים:</h3>
          <ul className="terms-list">
            <li>AllSherut <strong>לא בודקת</strong> את כישוריהם, רישיונותיהם, או עברם של נותני השירותים</li>
            <li>AllSherut <strong>לא מאמתת</strong> את זהותם, כתובתם, או תעודת הזהות שלהם</li>
            <li>AllSherut <strong>לא מפקחת</strong> על ביצוע השירותים בפועל</li>
            <li>AllSherut <strong>לא מבטיחה</strong> איכות, בטיחות, או מקצועיות</li>
            <li>AllSherut <strong>לא אחראית</strong> לתקינות ביטוחי אחריות מקצועית של הספקים</li>
            <li>אין לנו אפשרות לדעת על מעשיהם, התנהגותם, או כוונותיהם</li>
          </ul>

          <h3 className="subsection-title">יחסים חוזיים:</h3>
          <p className="section-text">
            <strong>כל הסכם לביצוע שירות נעשה ישירות בין הלקוח לנותן השירות.</strong> AllSherut אינה צד לחוזה זה, אינה ערבה לביצועו, ואינה נושאת באחריות כלשהי לתוצאותיו. הלקוח ונותן השירות הם האחראים הבלעדיים לכל הסכם, תנאי תשלום, או התחייבות ביניהם.
          </p>

          <h3 className="subsection-title">הגבלת אחריות מקסימלית:</h3>
          <div className="highlight-box important">
            <p><strong>במקרה בו בית משפט יקבע שיש ל-AllSherut אחריות כלשהי:</strong></p>
            <ul style={{ marginTop: 'var(--space-3)', paddingRight: 'var(--space-6)' }}>
              <li>האחריות המקסימלית מוגבלת לסכום ששולם עבור המנוי ב-12 החודשים האחרונים (ללקוחות - 0 ₪)</li>
              <li>לא תהיה אחריות לנזקים עקיפים, תוצאתיים, עונשיים, או מיוחדים</li>
              <li>לא תהיה אחריות לאובדן רווחים, נתונים, הזדמנויות עסקיות, או נזקים נפשיים</li>
              <li>הגבלת אחריות זו חלה גם אם AllSherut הוזהרה על אפשרות נזקים כאלה</li>
            </ul>
          </div>

          <h3 className="subsection-title">🛡️ המלצות בטיחות חשובות:</h3>
          <div className="warning-box">
            <Shield size={20} />
            <div>
              <strong>אנו ממליצים בחום:</strong>
              <ul style={{ marginTop: 'var(--space-2)', paddingRight: 'var(--space-6)' }}>
                <li><strong>ביצוע בדיקות רקע עצמאיות</strong> של נותני השירותים לפני העסקתם</li>
                <li><strong>בקשת תעודת זהות</strong> ואימות פרטים אישיים בפגישה הראשונה</li>
                <li><strong>בדיקת המלצות אמיתיות</strong> מלקוחות קודמים (מחוץ לפלטפורמה)</li>
                <li><strong>דרישת ביטוח אחריות מקצועית</strong> תקף מנותני השירותים</li>
                <li><strong>אי-השארת ילדים או אנשים מבוגרים לבד</strong> עם נותן שירות שלא הוכח אמינותו</li>
                <li><strong>התקנת מצלמות אבטחה</strong> בבית (בהתאם לחוק)</li>
                <li><strong>דיווח למשטרה</strong> על כל חשד לפעילות פלילית או חריגה</li>
                <li><strong>חתימה על הסכם עבודה בכתב</strong> עם נותן השירות</li>
                <li><strong>אי-מסירת מפתחות</strong> או גישה לבית ללא נוכחות</li>
              </ul>
              <p style={{ marginTop: 'var(--space-4)', fontWeight: '700', color: '#92400e' }}>
                זכרו: אתם האחראים הבלעדיים על בטיחותכם ובטיחות בני משפחתכם!
              </p>
            </div>
          </div>

          <h3 className="subsection-title">הליך דיווח על תקריות:</h3>
          <p className="section-text">
            במקרה של תקרית, תאונה, או פגיעה הקשורה לשירות שניתן:
          </p>
          <ol className="terms-list" style={{ counterReset: 'item', listStyle: 'none' }}>
            <li style={{ counterIncrement: 'item', position: 'relative' }}>
              <strong style={{ position: 'absolute', right: '-30px' }}>1.</strong>
              <strong>דווחו למשטרה מיד</strong> במקרה של מעשה פלילי או פגיעה חמורה
            </li>
            <li style={{ counterIncrement: 'item', position: 'relative' }}>
              <strong style={{ position: 'absolute', right: '-30px' }}>2.</strong>
              <strong>שמרו ראיות</strong> (תמונות, הודעות, תיעוד)
            </li>
            <li style={{ counterIncrement: 'item', position: 'relative' }}>
              <strong style={{ position: 'absolute', right: '-30px' }}>3.</strong>
              <strong>דווחו ל-AllSherut</strong> בדוא&quot;ל: incidents@AllSherut.co.il
            </li>
            <li style={{ counterIncrement: 'item', position: 'relative' }}>
              <strong style={{ position: 'absolute', right: '-30px' }}>4.</strong>
              <strong>פנו לעורך דין</strong> לקבלת ייעוץ משפטי
            </li>
          </ol>
          <p className="section-text">
            <strong>שימו לב:</strong> דיווח ל-AllSherut אינו מהווה הודאה באחריות ואינו מחייב אותנו בדבר. אנו עשויים להסיר את נותן השירות מהפלטפורמה, אך זו פעולה מנהלית בלבד ואינה מהווה הכרה באחריות.
          </p>

          <h3 className="subsection-title">זכויות ההגנה שלנו:</h3>
          <ul className="terms-list">
            <li>AllSherut שומרת לעצמה את הזכות לסרב לכל תביעה או דרישה</li>
            <li>אנו רשאים להסיר משתמשים מהפלטפורמה ללא הודעה מוקדמת</li>
            <li>אנו לא מחויבים לבצע בדיקות רקע או אימות זהות</li>
            <li>כל מידע בפלטפורמה מסופק &quot;כמות שהוא&quot; (AS-IS) ללא ערבויות</li>
          </ul>

          <h3 className="subsection-title">ויתור על תביעות:</h3>
          <div className="highlight-box important">
            <p>
              <strong>על ידי שימוש בפלטפורמה, אתם מוותרים על כל תביעה נגד AllSherut</strong> הנובעת מפעולות או מחדלים של נותני השירותים. אתם מסכימים ל<strong>פצות את AllSherut</strong> בגין כל נזק, הוצאה, או תביעה הנובעים משימוש שלכם בפלטפורמה או מקשר עם נותני שירותים.
            </p>
          </div>

          <div className="warning-box critical" style={{ marginTop: 'var(--space-8)' }}>
            <AlertTriangle size={24} />
            <div>
              <p style={{ fontSize: 'var(--text-lg)', fontWeight: '700', marginBottom: 'var(--space-3)' }}>
                ⚠️ אזהרה אחרונה וחשובה ביותר:
              </p>
              <p>
                שימוש בפלטפורמה מהווה <strong>הסכמה מפורשת</strong> לכל תנאי האחריות והגבלות האחריות המפורטים לעיל. <strong>אם אינכם מסכימים</strong> - אל תשתמשו בשירות. 
              </p>
              <p style={{ marginTop: 'var(--space-3)' }}>
                <strong>זכרו תמיד:</strong> AllSherut היא רק פלטפורמת חיבור. הבטיחות והאחריות המלאה הן שלכם!
              </p>
            </div>
          </div>
        </div>
      </section>

          {/* Section 8: Intellectual Property */}
          <section className="terms-section">
            <div className="section-number">8</div>
            <div className="section-content">
              <h2 className="section-title">
                <FileText size={24} />
                קניין רוחני
              </h2>

              <h3 className="subsection-title">זכויות AllSherut:</h3>
              <ul className="terms-list">
                <li>כל הזכויות בפלטפורמה, עיצוב, קוד ותוכן שייכים ל-AllSherut</li>
                <li>השם, הלוגו והמותג מוגנים בזכויות יוצרים</li>
                <li>אסור להעתיק, לשכפל או להפיץ חלקים מהפלטפורמה ללא אישור</li>
                <li>אסור להשתמש בשם או בלוגו של AllSherut למטרות מסחריות</li>
              </ul>

              <h3 className="subsection-title">זכויות המשתמשים:</h3>
              <ul className="terms-list">
                <li>משתמשים שומרים על זכויות היוצרים שלהם בתכנים שהם מעלים (תמונות, תיאורים)</li>
                <li>משתמשים מעניקים ל-AllSherut רישיון להשתמש בתכנים לצורך הפעלת השירות</li>
                <li>הרישיון כולל זכות להציג, להפיץ ולשנות תכנים לצורכי הפלטפורמה</li>
                <li>משתמשים מצהירים שיש להם את הזכות לפרסם את התכנים שהם מעלים</li>
              </ul>

              <h3 className="subsection-title">הפרות קניין רוחני:</h3>
              <p className="section-text">
                אם אתם סבורים שתכנים בפלטפורמה מפרים את זכויות היוצרים שלכם, אנא צרו קשר עמנו מיד. נחקור כל תלונה ונפעל בהתאם.
              </p>
            </div>
          </section>

          {/* Section 9: Termination */}
          <section className="terms-section">
            <div className="section-number">9</div>
            <div className="section-content">
              <h2 className="section-title">
                <AlertCircle size={24} />
                ביטול והסרת חשבון
              </h2>

              <h3 className="subsection-title">ביטול על ידי המשתמש:</h3>
              <p className="section-text">
                משתמשים יכולים לבטל את חשבונם בכל עת דרך לוח הבקרה האישי.
              </p>

              <h3 className="subsection-title">ביטול מנוי - תהליך מבוקר:</h3>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <strong>בקשת ביטול</strong>
                    <p>נותן השירות מבטל את המנוי דרך דף הניהול</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <strong>תקופת מעבר</strong>
                    <p>החשבון ממשיך לפעול עד תום התקופה ששולמה</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <strong>מחיקה אוטומטית</strong>
                    <p>החשבון נמחק אוטומטית ביום תום תוקף המנוי</p>
                  </div>
                </div>
              </div>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>יתרון:</strong> תהליך זה מאפשר לכם לבטל מנוי מבלי לאבד גישה מיידית. תוכלו להמשיך לקבל פניות ולנהל את הפרופיל עד תום התקופה ששולמה.
                </div>
              </div>

              <h3 className="subsection-title">אפשרות לביטול בקשת המחיקה:</h3>
              <p className="section-text">
                אם ביטלתם את המנוי וביקשתם מחיקת חשבון, תוכלו לבטל את הבקשה בכל עת לפני מועד המחיקה המתוכנן ולהמשיך את המנוי.
              </p>

              <h3 className="subsection-title">מחיקה מיידית:</h3>
              <p className="section-text">
                לקוחות ונותני שירות בתקופת ניסיון יכולים למחוק את חשבונם באופן מיידי דרך לוח הבקרה.
              </p>

              <h3 className="subsection-title">ביטול על ידי AllSherut:</h3>
              <p className="section-text">
                AllSherut רשאית להשעות או לבטל חשבונות במקרים של:
              </p>
              <ul className="terms-list">
                <li>הפרה של תנאי שימוש</li>
                <li>פעילות בלתי חוקית או פוגענית</li>
                <li>אי תשלום</li>
                <li>מתן מידע כוזב</li>
                <li>ניסיון לפגוע במערכת או במשתמשים אחרים</li>
              </ul>

              <h3 className="subsection-title">השלכות ביטול:</h3>
              <ul className="terms-list">
                <li>אובדן גישה לכל השירותים והנתונים</li>
                <li>מחיקת פרופיל, תכנים וכל הביקורות הקשורות אליו.</li>
                <li>אין אפשרות לשחזר נתונים לאחר מחיקה</li>
                <li>אין החזר כספי עבור תקופות מנוי שלא נוצלו</li>
              </ul>
            </div>
          </section>

          {/* Section 10: Applicable Law */}
          <section className="terms-section">
            <div className="section-number">10</div>
            <div className="section-content">
              <h2 className="section-title">
                <Scale size={24} />
                דין וסמכות שיפוט
              </h2>

              <h3 className="subsection-title">דין החל:</h3>
              <p className="section-text">
                תנאי שימוש אלה כפופים לדיני מדינת ישראל בלבד, ללא התייחסות לכללי ברירת הדין.
              </p>

              <h3 className="subsection-title">סמכות שיפוט:</h3>
              <p className="section-text">
                סמכות השיפוט הבלעדית בכל עניין הנוגע לתנאים אלה או לשימוש בשירות תהיה לבתי המשפט המוסמכים בישראל.
              </p>

              <h3 className="subsection-title">שפת המסמך:</h3>
              <p className="section-text">
                המסמך המחייב הוא זה בשפה העברית. כל תרגום לשפות אחרות הוא למטרות נוחות בלבד.
              </p>

              <h3 className="subsection-title">שינויים בתנאי השימוש:</h3>
              <ul className="terms-list">
                <li>AllSherut שומרת לעצמה את הזכות לעדכן תנאים אלה בכל עת</li>
                <li>שינויים מהותיים יובאו לידיעת המשתמשים במייל</li>
                <li>המשך שימוש בשירות לאחר שינויים מהווה הסכמה לתנאים המעודכנים</li>
                <li>תאריך העדכון האחרון יוצג בראש המסמך</li>
              </ul>

              <h3 className="subsection-title">פרידות הוראות:</h3>
              <p className="section-text">
                אם תיקבע על ידי בית משפט כי הוראה כלשהי בתנאים אלה אינה תקפה או בלתי ניתנת לאכיפה, שאר ההוראות יישארו בתוקפן המלא.
              </p>
            </div>
          </section>

          {/* Section 11: Fair Use */}
          <section className="terms-section">
            <div className="section-number">11</div>
            <div className="section-content">
              <h2 className="section-title">
                <Shield size={24} />
                שימוש הוגן והתחייבות המשתמשים
              </h2>
              <p className="section-text">
                המשתמש מתחייב להשתמש בפלטפורמה AllSherut באופן חוקי, הוגן וסביר בלבד. אין לבצע כל פעולה העלולה לפגוע במערכת, במשתמשים אחרים, או באבטחת האתר.
              </p>
              
              <h3 className="subsection-title">חל איסור מוחלט על:</h3>
              <ul className="terms-list">
                <li>חדירה לקוד האתר או ניסיון לעקוף אמצעי אבטחה</li>
                <li>שימוש בתוכנות או בוטים לצורך איסוף נתונים</li>
                <li>העברת מידע או תכנים המפרים זכויות יוצרים, פרטיות או כל דין</li>
              </ul>

              <p className="section-text">
                AllSherut שומרת לעצמה את הזכות לחסום או למחוק משתמשים הפועלים בניגוד להוראות אלו.
              </p>
            </div>
          </section>

          {/* Section 12: Force Majeure */}
          <section className="terms-section">
            <div className="section-number">12</div>
            <div className="section-content">
              <h2 className="section-title">
                <AlertTriangle size={24} />
                כוח עליון 
              </h2>
              <p className="section-text">
                AllSherut לא תישא באחריות לעיכוב, תקלה או מניעה במתן השירותים, הנגרמים כתוצאה מנסיבות שאינן בשליטתה, ובכלל זה:
              </p>
              
              <ul className="terms-list">
                <li>אסונות טבע</li>
                <li>מלחמות</li>
                <li>מגיפות</li>
                <li>שביתות</li>
                <li>תקלות תקשורת, שרתים או תוכנה</li>
                <li>מתקפות סייבר</li>
                <li>כל אירוע אחר המהווה כוח עליון</li>
              </ul>

              <p className="section-text">
                במקרים אלה, החברה תהיה רשאית לעכב או להפסיק את השירות באופן זמני, ללא חובת פיצוי.
              </p>
            </div>
          </section>

          {/* Section 13: User Content */}
          <section className="terms-section">
            <div className="section-number">13</div>
            <div className="section-content">
              <h2 className="section-title">
                <FileText size={24} />
                תוכן משתמשים
              </h2>
              <p className="section-text">
                כל מידע, תמונה, ביקורת, או תוכן אחר שהמשתמש מעלה לפלטפורמה הנו באחריותו הבלעדית. המשתמש מצהיר כי הוא בעל הזכויות החוקיות בתכנים שהעלה, וכי אינם מפרים זכויות יוצרים או פרטיות של צדדים שלישיים.
              </p>

              <h3 className="subsection-title">AllSherut רשאית להסיר, לערוך או לחסום תכנים שהועלו אם יש חשש כי הם:</h3>
              <ul className="terms-list">
                <li>שקריים, פוגעניים או מסיתים</li>
                <li>מפרים זכויות יוצרים או סימני מסחר</li>
                <li>כוללים לשון הרע או מידע אישי של אחרים</li>
              </ul>

              <p className="section-text">
                החברה אינה מחויבת להודיע למשתמש לפני הסרת התוכן.
              </p>
            </div>
          </section>

          {/* Section 14: Emails and Notifications */}
          <section className="terms-section">
            <div className="section-number">14</div>
            <div className="section-content">
              <h2 className="section-title">
                <AlertCircle size={24} />
                דיוור, עדכונים והתראות
              </h2>
              <p className="section-text">
                בעת ההרשמה לפלטפורמה, המשתמש מאשר קבלת הודעות מערכת, עדכונים והודעות הקשורות לפעילותו באתר. בנוסף, AllSherut רשאית לשלוח מדי פעם עדכונים על שינויים, חידושים או הודעות שירות.
              </p>

              <h3 className="subsection-title">הסרה מרשימת דיוור:</h3>
              <p className="section-text">
                המשתמש רשאי בכל עת להסיר את עצמו מרשימת הדיוור באמצעות לינק הסרה או פנייה בכתב. הודעות שירות חשובות יישלחו גם אם המשתמש הסיר עצמו מרשימת הדיוור הכללית.
              </p>
            </div>
          </section>

          {/* Section 15: External Links */}
          <section className="terms-section">
            <div className="section-number">15</div>
            <div className="section-content">
              <h2 className="section-title">
                <FileText size={24} />
                קישורים חיצוניים (Links)
              </h2>
              <p className="section-text">
                האתר עשוי לכלול קישורים לאתרים חיצוניים או צדדים שלישיים. AllSherut אינה אחראית לתוכן, לאמינות, לאבטחה או לחוקיות של אתרים אלו. הכללת קישור אינה מהווה המלצה, אישור או אחריות מכל סוג שהוא.
              </p>

              <div className="warning-box">
                <AlertCircle size={20} />
                <div>
                  <strong>שימו לב:</strong> הגלישה באתרים חיצוניים הינה על אחריות המשתמש בלבד.
                </div>
              </div>
            </div>
          </section>

          {/* Section 16: Privacy Policy */}
          <section className="terms-section">
            <div className="section-number">16</div>
            <div className="section-content">
              <h2 className="section-title">
                <Shield size={24} />
                מדיניות פרטיות
              </h2>
              <p className="section-text">
                מדיניות הפרטיות של AllSherut מהווה חלק בלתי נפרד מתנאי שימוש אלה. באמצעות השימוש באתר, המשתמש מאשר כי קרא והבין את מדיניות הפרטיות ומסכים לתנאיה.
              </p>
            </div>
          </section>

          {/* Section 17: Digital Notices */}
          <section className="terms-section">
            <div className="section-number">17</div>
            <div className="section-content">
              <h2 className="section-title">
                <FileText size={24} />
                הודעות והסכמות דיגיטליות
              </h2>
              <p className="section-text">
                כל פעולה, הודעה, או הסכמה שבוצעה דרך האתר, הדוא&quot;ל או מערכת הפלטפורמה תיחשב כהודעה בכתב לפי כל דין. שליחת הודעות דוא&quot;ל או מילוי טפסים באתר AllSherut מהווה ראיה להסכמה מדעת מצד המשתמש.
              </p>

              <div className="info-box">
                <AlertCircle size={20} />
                <div>
                  <strong>חשוב לדעת:</strong> הודעות שנשלחו על ידי AllSherut לכתובת הדוא&quot;ל שנמסרה בעת ההרשמה ייחשבו כהודעות שהתקבלו כדין בתוך 72 שעות ממועד שליחתן.
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="terms-section contact-section">
            <div className="section-content">
              <h2 className="section-title">
                <AlertCircle size={24} />
                יצירת קשר
              </h2>
              <p className="section-text">
                לשאלות, הבהרות או דיווח על הפרות תנאי השימוש, ניתן ליצור קשר עמנו בדרכים הבאות:
              </p>
              <div className="contact-info">
                <p><strong>דוא&quot;ל:</strong> legal@AllSherut.co.il</p>
                <p><strong>טלפון:</strong> 03-1234567</p>
                <p><strong>כתובת:</strong> רחוב הדוגמה 123, תל אביב</p>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="terms-footer-note">
            <p>
              <strong>שימו לב:</strong> תנאי שימוש אלה מהווים הסכם משפטי מחייב. אנא קראו אותם בעיון.
              המשך שימוש בפלטפורמה מהווה הסכמה מפורשת לכל התנאים המפורטים לעיל.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;