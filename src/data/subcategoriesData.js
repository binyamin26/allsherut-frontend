// Sous-catégories statiques pour tutoring et sports_activities
// Source: export BDD 2026-05-16

export const ALL_SUBCATEGORIES = [
  // Musique (1-7)
  { display_order: 1, name_he: 'פסנתר', name_en: 'Piano', name_fr: 'Piano', icon: '🎹' },
  { display_order: 2, name_he: 'גיטרה', name_en: 'Guitar', name_fr: 'Guitare', icon: '🎸' },
  { display_order: 3, name_he: 'כינור / ויולה / צ׳לו', name_en: 'Violin', name_fr: 'Violon / Alto / Violoncelle', icon: '🎻' },
  { display_order: 4, name_he: 'תופים / כלי הקשה', name_en: 'Drums', name_fr: 'Batterie / Percussions', icon: '🥁' },
  { display_order: 5, name_he: 'חליל, קלרינט, סקסופון, חצוצרה', name_en: 'Wind', name_fr: 'Flûte, Clarinette, Saxophone, Trompette', icon: '🎺' },
  { display_order: 6, name_he: 'נבל', name_en: 'Harp', name_fr: 'Harpe', icon: '🎼' },
  { display_order: 7, name_he: 'פיתוח קול / שירה', name_en: 'Voice', name_fr: 'Chant / Technique vocale', icon: '🎤' },
  // Arts visuels (10-16)
  { display_order: 10, name_he: 'ציור (שמן, אקריליק, צבעי מים)', name_en: 'Painting', name_fr: 'Peinture (huile, acrylique, aquarelle)', icon: '🎨' },
  { display_order: 11, name_he: 'רישום', name_en: 'Drawing', name_fr: 'Dessin', icon: '✏' },
  { display_order: 12, name_he: 'פיסול', name_en: 'Sculpture', name_fr: 'Sculpture', icon: '🗿' },
  { display_order: 13, name_he: 'צילום', name_en: 'Photography', name_fr: 'Photographie', icon: '📷' },
  { display_order: 14, name_he: 'גרפיקה / עיצוב חזותי', name_en: 'Design', name_fr: 'Graphisme / Design visuel', icon: '🖥' },
  { display_order: 15, name_he: 'קליגרפיה', name_en: 'Calligraphy', name_fr: 'Calligraphie', icon: '✒' },
  { display_order: 16, name_he: 'קרמיקה / פסיפס', name_en: 'Ceramics', name_fr: 'Céramique / Mosaïque', icon: '🏺' },
  // Danse (20-24)
  { display_order: 20, name_he: 'בלט קלאסי', name_en: 'Ballet', name_fr: 'Ballet classique', icon: '🩰' },
  { display_order: 21, name_he: 'מחול מודרני / עכשווי', name_en: 'Modern', name_fr: 'Danse moderne / contemporaine', icon: '💃' },
  { display_order: 22, name_he: 'מחול עממי', name_en: 'Folk', name_fr: 'Danse folklorique', icon: '🕺' },
  { display_order: 23, name_he: "ג׳אז / היפ הופ", name_en: 'Jazz', name_fr: 'Jazz / Hip-hop', icon: '♫' },
  { display_order: 24, name_he: 'ריקודים סלוניים', name_en: 'Ballroom', name_fr: 'Danses de salon', icon: '✨' },
  // Théâtre (30-33)
  { display_order: 30, name_he: 'משחק', name_en: 'Acting', name_fr: "Théâtre / Jeu d'acteur", icon: '🎭' },
  { display_order: 31, name_he: 'אילתור / מִים', name_en: 'Improv', name_fr: 'Improvisation / Mime', icon: '🎪' },
  { display_order: 32, name_he: 'מחזות זמר', name_en: 'Musical', name_fr: 'Comédie musicale', icon: '🎬' },
  { display_order: 33, name_he: 'דיבור בפני קהל / דקלום', name_en: 'Speaking', name_fr: 'Prise de parole / Déclamation', icon: '🎙' },
  // Langues (40-46) — tutoring uniquement
  { display_order: 40, name_he: 'אנגלית', name_en: 'English', name_fr: 'Anglais', icon: 'EN' },
  { display_order: 41, name_he: 'צרפתית', name_en: 'French', name_fr: 'Français', icon: 'FR' },
  { display_order: 42, name_he: 'ספרדית', name_en: 'Spanish', name_fr: 'Espagnol', icon: 'ES' },
  { display_order: 43, name_he: 'רוסית', name_en: 'Russian', name_fr: 'Russe', icon: 'RU' },
  { display_order: 44, name_he: 'ערבית', name_en: 'Arabic', name_fr: 'Arabe', icon: 'AR' },
  { display_order: 45, name_he: 'עברית', name_en: 'Hebrew', name_fr: 'Hébreu', icon: 'HE' },
  { display_order: 46, name_he: 'ספרות ותרבות', name_en: 'Literature', name_fr: 'Littérature et culture', icon: '📚' },
  { display_order: 47, name_he: 'סדנאות שיחה', name_en: 'Conversation', name_fr: 'Ateliers de conversation', icon: '💬' },
  // Artisanat (50-56)
  { display_order: 50, name_he: 'תפירה / סריגה / קרושה', name_en: 'Sewing', name_fr: 'Couture / Tricot / Crochet', icon: '🧶' },
  { display_order: 51, name_he: 'רקמה', name_en: 'Embroidery', name_fr: 'Broderie', icon: '🪡' },
  { display_order: 52, name_he: 'תכשיטנות', name_en: 'Jewelry', name_fr: 'Bijouterie', icon: '💍' },
  { display_order: 53, name_he: 'עץ / נגרות', name_en: 'Wood', name_fr: 'Travail du bois / Menuiserie', icon: '🪵' },
  { display_order: 54, name_he: 'יצירה חופשית', name_en: 'Free Art', name_fr: 'Création libre', icon: '✨' },
  { display_order: 55, name_he: 'ציור יצירה ודמיון', name_en: 'Painting crafts and imagination', name_fr: 'Peinture bricolage et imagination', icon: '🖌' },
  { display_order: 56, name_he: 'סדנאות יום הולדת יצירתיות', name_en: 'Creative birthday workshops', name_fr: 'Ateliers anniversaires créatifs', icon: '🎂' },
  // Technologie (60-64) — tutoring uniquement
  { display_order: 60, name_he: 'מחשבים / קידוד', name_en: 'Coding', name_fr: 'Informatique / Programmation', icon: '💻' },
  { display_order: 61, name_he: 'רובוטיקה', name_en: 'Robotics', name_fr: 'Robotique', icon: '🤖' },
  { display_order: 62, name_he: 'הדפסה תלת־ממדית', name_en: '3D Print', name_fr: 'Impression 3D', icon: '🖨' },
  { display_order: 63, name_he: 'אלקטרוניקה בסיסית', name_en: 'Electronics', name_fr: 'Électronique de base', icon: '⚡' },
  { display_order: 64, name_he: 'ניסויים מדעיים לילדים', name_en: 'Science', name_fr: 'Expériences scientifiques pour enfants', icon: '🔬' },
  // Cuisine (70-74)
  { display_order: 70, name_he: 'בישול', name_en: 'Cooking', name_fr: 'Cuisine', icon: '🍳' },
  { display_order: 71, name_he: 'אפייה', name_en: 'Baking', name_fr: 'Pâtisserie', icon: '🥖' },
  { display_order: 72, name_he: 'קונדיטוריה', name_en: 'Pastry', name_fr: 'Confiserie', icon: '🍰' },
  { display_order: 73, name_he: 'עיצוב עוגות', name_en: 'Cake decoration', name_fr: 'Décoration de gâteaux', icon: '🎂' },
  { display_order: 74, name_he: 'מגשי פירות', name_en: 'Fruit Platters', name_fr: 'Plateaux de fruits', icon: '🍓' },
  // Développement personnel (80-85)
  { display_order: 80, name_he: 'דיבור מול קהל', name_en: 'Public Speaking', name_fr: 'Prise de parole en public', icon: '🎤' },
  { display_order: 81, name_he: 'מנהיגות / העצמה אישית', name_en: 'Leadership', name_fr: 'Leadership / Développement personnel', icon: '💪' },
  { display_order: 82, name_he: 'מיינדפולנס / מדיטציה', name_en: 'Mindfulness', name_fr: 'Pleine conscience / Méditation', icon: '🧘' },
  { display_order: 83, name_he: 'ארגון וניהול זמן', name_en: 'Time management', name_fr: 'Organisation et gestion du temps', icon: '⏰' },
  { display_order: 84, name_he: 'טכניקות למידה', name_en: 'Learning techniques', name_fr: "Techniques d'apprentissage", icon: '📖' },
  { display_order: 85, name_he: 'שחמט', name_en: 'Chess', name_fr: 'Échecs', icon: '♟️' },
  // Sport (90-111)
  { display_order: 90, name_he: 'כדורגל', name_en: 'Football', name_fr: 'Football', icon: '⚽' },
  { display_order: 91, name_he: 'כדורסל', name_en: 'Basketball', name_fr: 'Basketball', icon: '🏀' },
  { display_order: 92, name_he: 'כדורעף', name_en: 'Volleyball', name_fr: 'Volleyball', icon: '🏐' },
  { display_order: 93, name_he: 'טניס', name_en: 'Tennis', name_fr: 'Tennis', icon: '🎾' },
  { display_order: 94, name_he: 'טניס שולחן', name_en: 'Table Tennis', name_fr: 'Tennis de table', icon: '🏓' },
  { display_order: 95, name_he: 'סקווש / בדמינטון', name_en: 'Squash / Badminton', name_fr: 'Squash / Badminton', icon: '🏸' },
  { display_order: 96, name_he: 'שחייה', name_en: 'Swimming', name_fr: 'Natation', icon: '🏊' },
  { display_order: 97, name_he: 'אתלטיקה', name_en: 'Athletics', name_fr: 'Athlétisme', icon: '🏃' },
  { display_order: 98, name_he: 'התעמלות קרקע / מכשירים', name_en: 'Gymnastics', name_fr: 'Gymnastique sol / agrès', icon: '🤸' },
  { display_order: 99, name_he: 'יוגה', name_en: 'Yoga', name_fr: 'Yoga', icon: '🧘' },
  { display_order: 100, name_he: "ג׳ודו", name_en: 'Judo', name_fr: 'Judo', icon: '🥋' },
  { display_order: 101, name_he: 'קראטה', name_en: 'Karate', name_fr: 'Karaté', icon: '🥋' },
  { display_order: 102, name_he: 'טאקוונדו', name_en: 'Taekwondo', name_fr: 'Taekwondo', icon: '🥋' },
  { display_order: 103, name_he: 'אייקידו', name_en: 'Aikido', name_fr: 'Aïkido', icon: '🥋' },
  { display_order: 104, name_he: 'היאבקות', name_en: 'Wrestling', name_fr: 'Lutte', icon: '🤼' },
  { display_order: 105, name_he: 'אומנויות לחימה משולבות', name_en: 'MMA', name_fr: 'Arts martiaux mixtes (MMA)', icon: '🥊' },
  { display_order: 106, name_he: 'קרב מגע', name_en: 'Krav Maga', name_fr: 'Krav Maga', icon: '💥' },
  { display_order: 107, name_he: 'קפוארה', name_en: 'Capoeira', name_fr: 'Capoeira', icon: '🎭' },
  { display_order: 108, name_he: 'טיפוס קירות', name_en: 'Climbing', name_fr: 'Escalade', icon: '🧗' },
  { display_order: 109, name_he: 'סקייטבורד / גלגיליות', name_en: 'Skateboard / Roller', name_fr: 'Skateboard / Roller', icon: '🛹' },
  { display_order: 110, name_he: 'אגרוף', name_en: 'Boxing', name_fr: 'Boxe', icon: '🥊' },
  { display_order: 111, name_he: 'רכיבה על אופניים', name_en: 'Cycling', name_fr: 'Cyclisme', icon: '🚴' },
  // Académique (200-223) — tutoring uniquement
  { display_order: 200, name_he: 'מתמטיקה', name_en: 'Mathematics', name_fr: 'Mathématiques', icon: '➗' },
  { display_order: 201, name_he: 'פיזיקה', name_en: 'Physics', name_fr: 'Physique', icon: '⚛️' },
  { display_order: 202, name_he: 'כימיה', name_en: 'Chemistry', name_fr: 'Chimie', icon: '🧪' },
  { display_order: 203, name_he: 'ביולוגיה', name_en: 'Biology', name_fr: 'Biologie', icon: '🧬' },
  { display_order: 204, name_he: 'מדעי המחשב', name_en: 'Computer Science', name_fr: 'Informatique', icon: '💾' },
  { display_order: 205, name_he: 'סטטיסטיקה והסתברות', name_en: 'Statistics', name_fr: 'Statistiques et probabilités', icon: '📊' },
  { display_order: 206, name_he: 'גיאומטריה', name_en: 'Geometry', name_fr: 'Géométrie', icon: '📐' },
  { display_order: 210, name_he: 'היסטוריה', name_en: 'History', name_fr: 'Histoire', icon: '📜' },
  { display_order: 211, name_he: 'גיאוגרפיה', name_en: 'Geography', name_fr: 'Géographie', icon: '🗺️' },
  { display_order: 212, name_he: 'אזרחות', name_en: 'Civics', name_fr: 'Éducation civique', icon: '🏛️' },
  { display_order: 213, name_he: 'כלכלה', name_en: 'Economics', name_fr: 'Économie', icon: '💹' },
  { display_order: 214, name_he: 'פסיכולוגיה', name_en: 'Psychology', name_fr: 'Psychologie', icon: '🧠' },
  { display_order: 215, name_he: 'סוציולוגיה', name_en: 'Sociology', name_fr: 'Sociologie', icon: '👥' },
  { display_order: 216, name_he: 'פילוסופיה', name_en: 'Philosophy', name_fr: 'Philosophie', icon: '🤔' },
  { display_order: 220, name_he: 'עברית / ספרות', name_en: 'Hebrew Literature', name_fr: 'Hébreu / Littérature', icon: '📖' },
  { display_order: 221, name_he: 'תנ״ך', name_en: 'Bible Studies', name_fr: 'Études bibliques', icon: '📕' },
  { display_order: 222, name_he: 'ערבית', name_en: 'Arabic', name_fr: 'Arabe', icon: '🇸🇦' },
  { display_order: 223, name_he: 'לשון עברית', name_en: 'Hebrew Language', name_fr: 'Langue hébraïque', icon: '✍️' },
];

export const TUTORING_SUBCATEGORIES = ALL_SUBCATEGORIES;

export const SPORTS_SUBCATEGORIES = ALL_SUBCATEGORIES.filter(s =>
  !(s.display_order >= 40 && s.display_order <= 47) &&
  !(s.display_order >= 60 && s.display_order <= 64) &&
  !(s.display_order >= 200 && s.display_order <= 223)
);
