// GÉNÉRÉ — catégorie "Sécurité, réseaux & maison intelligente" (6 services).
// Source unique des champs du formulaire d'inscription, des filtres et de l'affichage profil.
// Les valeurs stockées en base sont en hébreu (comme pour les autres services);
// les libellés visibles passent par les clés i18n `labelKey` (he/fr/en/ru dans src/locales).
//
// Structure d'un service : `workTypes` = types de travaux (champ `work_types`).
// Chaque type de travaux a un champ de détail conditionnel (`field`, nom en *_types pour
// être filtré par le défaut générique de backend/routes/search.js) qui ne s'affiche
// que lorsque ce type est coché, et qui est vidé quand il est décoché.

export const SECURITY_SERVICES = {
  "security_cameras": {
    "key": "security_cameras",
    "icon": "📹",
    "workTypes": [
      {
        "value": "התקנה בבית",
        "labelKey": "serviceForm.security_cameras.wt1",
        "field": "cameras_home_types",
        "details": [
          {
            "value": "מצלמות פנים",
            "labelKey": "serviceForm.security_cameras.d1_1"
          },
          {
            "value": "מצלמות חוץ",
            "labelKey": "serviceForm.security_cameras.d1_2"
          },
          {
            "value": "צפייה מהנייד",
            "labelKey": "serviceForm.security_cameras.d1_3"
          },
          {
            "value": "הקלטה ושמירת וידאו",
            "labelKey": "serviceForm.security_cameras.d1_4"
          }
        ]
      },
      {
        "value": "התקנה בעסק",
        "labelKey": "serviceForm.security_cameras.wt2",
        "field": "cameras_business_types",
        "details": [
          {
            "value": "חנויות ומשרדים",
            "labelKey": "serviceForm.security_cameras.d2_1"
          },
          {
            "value": "בניינים משותפים",
            "labelKey": "serviceForm.security_cameras.d2_2"
          },
          {
            "value": "מחסנים וחניונים",
            "labelKey": "serviceForm.security_cameras.d2_3"
          },
          {
            "value": "מערכות למספר אזורים",
            "labelKey": "serviceForm.security_cameras.d2_4"
          }
        ]
      },
      {
        "value": "מערכות מצלמות IP",
        "labelKey": "serviceForm.security_cameras.wt3",
        "field": "cameras_ip_types",
        "details": [
          {
            "value": "מצלמות IP",
            "labelKey": "serviceForm.security_cameras.d3_1"
          },
          {
            "value": "מצלמות PTZ",
            "labelKey": "serviceForm.security_cameras.d3_2"
          },
          {
            "value": "זיהוי חכם באמצעות AI",
            "labelKey": "serviceForm.security_cameras.d3_3"
          },
          {
            "value": "חיבור מרחוק דרך האינטרנט",
            "labelKey": "serviceForm.security_cameras.d3_4"
          }
        ]
      },
      {
        "value": "תיקון ותחזוקה",
        "labelKey": "serviceForm.security_cameras.wt4",
        "field": "cameras_repair_types",
        "details": [
          {
            "value": "תיקון מצלמות",
            "labelKey": "serviceForm.security_cameras.d4_1"
          },
          {
            "value": "תיקון מקליט",
            "labelKey": "serviceForm.security_cameras.d4_2"
          },
          {
            "value": "טיפול בתקלות תקשורת",
            "labelKey": "serviceForm.security_cameras.d4_3"
          },
          {
            "value": "שדרוג מערכת קיימת",
            "labelKey": "serviceForm.security_cameras.d4_4"
          }
        ]
      }
    ]
  },
  "security_alarms": {
    "key": "security_alarms",
    "icon": "🚨",
    "workTypes": [
      {
        "value": "התקנת אזעקות",
        "labelKey": "serviceForm.security_alarms.wt1",
        "field": "alarms_install_types",
        "details": [
          {
            "value": "אזעקה לבית",
            "labelKey": "serviceForm.security_alarms.d1_1"
          },
          {
            "value": "אזעקה לעסק",
            "labelKey": "serviceForm.security_alarms.d1_2"
          },
          {
            "value": "מערכת קווית",
            "labelKey": "serviceForm.security_alarms.d1_3"
          },
          {
            "value": "מערכת אלחוטית או היברידית",
            "labelKey": "serviceForm.security_alarms.d1_4"
          }
        ]
      },
      {
        "value": "גלאים ואמצעי התרעה",
        "labelKey": "serviceForm.security_alarms.wt2",
        "field": "alarms_detectors_types",
        "details": [
          {
            "value": "גלאי תנועה",
            "labelKey": "serviceForm.security_alarms.d2_1"
          },
          {
            "value": "גלאי פתיחת דלתות וחלונות",
            "labelKey": "serviceForm.security_alarms.d2_2"
          },
          {
            "value": "צופרים",
            "labelKey": "serviceForm.security_alarms.d2_3"
          },
          {
            "value": "גלאי עשן והצפה",
            "labelKey": "serviceForm.security_alarms.d2_4"
          }
        ]
      },
      {
        "value": "חיבור ושליטה מרחוק",
        "labelKey": "serviceForm.security_alarms.wt3",
        "field": "alarms_remote_types",
        "details": [
          {
            "value": "התראות לנייד",
            "labelKey": "serviceForm.security_alarms.d3_1"
          },
          {
            "value": "שליטה דרך אפליקציה",
            "labelKey": "serviceForm.security_alarms.d3_2"
          },
          {
            "value": "חיבור למוקד",
            "labelKey": "serviceForm.security_alarms.d3_3"
          },
          {
            "value": "שילוב עם בית חכם",
            "labelKey": "serviceForm.security_alarms.d3_4"
          }
        ]
      },
      {
        "value": "תיקון ותחזוקה",
        "labelKey": "serviceForm.security_alarms.wt4",
        "field": "alarms_repair_types",
        "details": [
          {
            "value": "תיקון תקלות",
            "labelKey": "serviceForm.security_alarms.d4_1"
          },
          {
            "value": "החלפת גלאים",
            "labelKey": "serviceForm.security_alarms.d4_2"
          },
          {
            "value": "החלפת מרכזת אזעקה",
            "labelKey": "serviceForm.security_alarms.d4_3"
          },
          {
            "value": "שדרוג מערכת קיימת",
            "labelKey": "serviceForm.security_alarms.d4_4"
          }
        ]
      }
    ]
  },
  "intercom_access": {
    "key": "intercom_access",
    "icon": "🔔",
    "workTypes": [
      {
        "value": "התקנת אינטרקום",
        "labelKey": "serviceForm.intercom_access.wt1",
        "field": "intercom_install_types",
        "details": [
          {
            "value": "אינטרקום לבניין",
            "labelKey": "serviceForm.intercom_access.d1_1"
          },
          {
            "value": "אינטרקום לבית פרטי",
            "labelKey": "serviceForm.intercom_access.d1_2"
          },
          {
            "value": "החלפת אינטרקום קיים",
            "labelKey": "serviceForm.intercom_access.d1_3"
          },
          {
            "value": "תיקון אינטרקום",
            "labelKey": "serviceForm.intercom_access.d1_4"
          }
        ]
      },
      {
        "value": "אינטרקום וידאו",
        "labelKey": "serviceForm.intercom_access.wt2",
        "field": "intercom_video_types",
        "details": [
          {
            "value": "מסך וידאו פנימי",
            "labelKey": "serviceForm.intercom_access.d2_1"
          },
          {
            "value": "זיהוי מבקרים באמצעות מצלמה",
            "labelKey": "serviceForm.intercom_access.d2_2"
          },
          {
            "value": "מענה דרך הטלפון",
            "labelKey": "serviceForm.intercom_access.d2_3"
          },
          {
            "value": "פתיחת דלת מרחוק",
            "labelKey": "serviceForm.intercom_access.d2_4"
          }
        ]
      },
      {
        "value": "בקרת כניסה",
        "labelKey": "serviceForm.intercom_access.wt3",
        "field": "intercom_access_types",
        "details": [
          {
            "value": "קודנים",
            "labelKey": "serviceForm.intercom_access.d3_1"
          },
          {
            "value": "כרטיסים וצ'יפים",
            "labelKey": "serviceForm.intercom_access.d3_2"
          },
          {
            "value": "זיהוי ביומטרי",
            "labelKey": "serviceForm.intercom_access.d3_3"
          },
          {
            "value": "ניהול הרשאות כניסה",
            "labelKey": "serviceForm.intercom_access.d3_4"
          }
        ]
      },
      {
        "value": "מנעולים חשמליים",
        "labelKey": "serviceForm.intercom_access.wt4",
        "field": "intercom_locks_types",
        "details": [
          {
            "value": "מנעול חשמלי",
            "labelKey": "serviceForm.intercom_access.d4_1"
          },
          {
            "value": "מנעול אלקטרומגנטי",
            "labelKey": "serviceForm.intercom_access.d4_2"
          },
          {
            "value": "פתיחת שערים",
            "labelKey": "serviceForm.intercom_access.d4_3"
          },
          {
            "value": "חיבור למערכת אינטרקום",
            "labelKey": "serviceForm.intercom_access.d4_4"
          }
        ]
      }
    ]
  },
  "networking": {
    "key": "networking",
    "icon": "🌐",
    "workTypes": [
      {
        "value": "תשתיות תקשורת",
        "labelKey": "serviceForm.networking.wt1",
        "field": "network_infra_types",
        "details": [
          {
            "value": "נקודות רשת RJ45",
            "labelKey": "serviceForm.networking.d1_1"
          },
          {
            "value": "כבילה Cat 6 / Cat 6A",
            "labelKey": "serviceForm.networking.d1_2"
          },
          {
            "value": "השחלת כבלים",
            "labelKey": "serviceForm.networking.d1_3"
          },
          {
            "value": "ארונות תקשורת",
            "labelKey": "serviceForm.networking.d1_4"
          }
        ]
      },
      {
        "value": "התקנת רשתות מחשבים",
        "labelKey": "serviceForm.networking.wt2",
        "field": "network_computer_types",
        "details": [
          {
            "value": "רשת לבית",
            "labelKey": "serviceForm.networking.d2_1"
          },
          {
            "value": "רשת למשרד",
            "labelKey": "serviceForm.networking.d2_2"
          },
          {
            "value": "רשת לעסק",
            "labelKey": "serviceForm.networking.d2_3"
          },
          {
            "value": "הרחבת רשת קיימת",
            "labelKey": "serviceForm.networking.d2_4"
          }
        ]
      },
      {
        "value": "התקנת ציוד רשת",
        "labelKey": "serviceForm.networking.wt3",
        "field": "network_equipment_types",
        "details": [
          {
            "value": "נתבים",
            "labelKey": "serviceForm.networking.d3_1"
          },
          {
            "value": "מתגי רשת",
            "labelKey": "serviceForm.networking.d3_2"
          },
          {
            "value": "מתגי PoE",
            "labelKey": "serviceForm.networking.d3_3"
          },
          {
            "value": "נקודות גישה Wi-Fi",
            "labelKey": "serviceForm.networking.d3_4"
          }
        ]
      },
      {
        "value": "תיקון ותחזוקת רשתות",
        "labelKey": "serviceForm.networking.wt4",
        "field": "network_repair_types",
        "details": [
          {
            "value": "תקלות אינטרנט ורשת",
            "labelKey": "serviceForm.networking.d4_1"
          },
          {
            "value": "בעיות Wi-Fi",
            "labelKey": "serviceForm.networking.d4_2"
          },
          {
            "value": "תיקון חיבורי רשת",
            "labelKey": "serviceForm.networking.d4_3"
          },
          {
            "value": "שדרוג תשתיות קיימות",
            "labelKey": "serviceForm.networking.d4_4"
          }
        ]
      }
    ]
  },
  "audio_systems": {
    "key": "audio_systems",
    "icon": "🔊",
    "workTypes": [
      {
        "value": "התקנת מערכות שמע לבית",
        "labelKey": "serviceForm.audio_systems.wt1",
        "field": "audio_home_types",
        "details": [
          {
            "value": "רמקולים שקועים בתקרה",
            "labelKey": "serviceForm.audio_systems.d1_1"
          },
          {
            "value": "רמקולים שקועים בקיר",
            "labelKey": "serviceForm.audio_systems.d1_2"
          },
          {
            "value": "מערכת שמע לסלון",
            "labelKey": "serviceForm.audio_systems.d1_3"
          },
          {
            "value": "שמע לגינה ולמרפסת",
            "labelKey": "serviceForm.audio_systems.d1_4"
          }
        ]
      },
      {
        "value": "התקנת מערכות שמע לעסק",
        "labelKey": "serviceForm.audio_systems.wt2",
        "field": "audio_business_types",
        "details": [
          {
            "value": "חנויות ומשרדים",
            "labelKey": "serviceForm.audio_systems.d2_1"
          },
          {
            "value": "בתי כנסת",
            "labelKey": "serviceForm.audio_systems.d2_2"
          },
          {
            "value": "מסעדות ובתי קפה",
            "labelKey": "serviceForm.audio_systems.d2_3"
          },
          {
            "value": "מערכות כריזה",
            "labelKey": "serviceForm.audio_systems.d2_4"
          }
        ]
      },
      {
        "value": "מערכות שמע למספר אזורים",
        "labelKey": "serviceForm.audio_systems.wt3",
        "field": "audio_multizone_types",
        "details": [
          {
            "value": "שליטה נפרדת בכל אזור",
            "labelKey": "serviceForm.audio_systems.d3_1"
          },
          {
            "value": "חיבור Bluetooth",
            "labelKey": "serviceForm.audio_systems.d3_2"
          },
          {
            "value": "חיבור Wi-Fi",
            "labelKey": "serviceForm.audio_systems.d3_3"
          },
          {
            "value": "מגברים",
            "labelKey": "serviceForm.audio_systems.d3_4"
          }
        ]
      },
      {
        "value": "תיקון ותחזוקת מערכות שמע",
        "labelKey": "serviceForm.audio_systems.wt4",
        "field": "audio_repair_types",
        "details": [
          {
            "value": "תיקון רמקולים",
            "labelKey": "serviceForm.audio_systems.d4_1"
          },
          {
            "value": "תיקון מגברים",
            "labelKey": "serviceForm.audio_systems.d4_2"
          },
          {
            "value": "טיפול בתקלות חיבור",
            "labelKey": "serviceForm.audio_systems.d4_3"
          },
          {
            "value": "שדרוג מערכת קיימת",
            "labelKey": "serviceForm.audio_systems.d4_4"
          }
        ]
      }
    ]
  },
  "smart_home": {
    "key": "smart_home",
    "icon": "🏠",
    "workTypes": [
      {
        "value": "בית חכם קווי",
        "labelKey": "serviceForm.smart_home.wt1",
        "field": "smart_wired_types",
        "details": [
          {
            "value": "התקנת תשתית קווית",
            "labelKey": "serviceForm.smart_home.d1_1"
          },
          {
            "value": "התקנת בקרי שליטה",
            "labelKey": "serviceForm.smart_home.d1_2"
          },
          {
            "value": "תכנות תרחישים",
            "labelKey": "serviceForm.smart_home.d1_3"
          },
          {
            "value": "שדרוג מערכת קיימת",
            "labelKey": "serviceForm.smart_home.d1_4"
          }
        ]
      },
      {
        "value": "בית חכם אלחוטי",
        "labelKey": "serviceForm.smart_home.wt2",
        "field": "smart_wireless_types",
        "details": [
          {
            "value": "התקנת מתגים חכמים",
            "labelKey": "serviceForm.smart_home.d2_1"
          },
          {
            "value": "התקנת חיישנים אלחוטיים",
            "labelKey": "serviceForm.smart_home.d2_2"
          },
          {
            "value": "שליטה דרך אפליקציה",
            "labelKey": "serviceForm.smart_home.d2_3"
          },
          {
            "value": "חיבור והגדרת רכזת",
            "labelKey": "serviceForm.smart_home.d2_4"
          }
        ]
      },
      {
        "value": "אוטומציה של הבית",
        "labelKey": "serviceForm.smart_home.wt3",
        "field": "smart_automation_types",
        "details": [
          {
            "value": "תאורה חכמה",
            "labelKey": "serviceForm.smart_home.d3_1"
          },
          {
            "value": "תריסים ווילונות חשמליים",
            "labelKey": "serviceForm.smart_home.d3_2"
          },
          {
            "value": "מיזוג אוויר",
            "labelKey": "serviceForm.smart_home.d3_3"
          },
          {
            "value": "תרחישים אוטומטיים",
            "labelKey": "serviceForm.smart_home.d3_4"
          }
        ]
      },
      {
        "value": "שילוב מערכות חכמות",
        "labelKey": "serviceForm.smart_home.wt4",
        "field": "smart_integration_types",
        "details": [
          {
            "value": "שילוב אזעקה",
            "labelKey": "serviceForm.smart_home.d4_1"
          },
          {
            "value": "שילוב מצלמות",
            "labelKey": "serviceForm.smart_home.d4_2"
          },
          {
            "value": "שילוב אינטרקום",
            "labelKey": "serviceForm.smart_home.d4_3"
          },
          {
            "value": "שליטה מרכזית במערכות",
            "labelKey": "serviceForm.smart_home.d4_4"
          }
        ]
      }
    ]
  }
};

export const SECURITY_SERVICE_KEYS = Object.keys(SECURITY_SERVICES);

export const isSecurityService = (serviceType) => serviceType in SECURITY_SERVICES;

export const SECURITY_AVAILABILITY_OPTIONS = [
  { value: 'בוקר', key: 'hours.morning' },
  { value: 'אחר הצהריים', key: 'hours.afternoon' },
  { value: 'ערב', key: 'hours.evening' },
  { value: '24/6', key: 'hours.twentyFourSix' },
];
