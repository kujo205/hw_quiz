import type {
  TQuiz,
  TQuizDynamicQuestion,
  TStaticStep,
} from "@/features/quiz/types-and-schemas/index";
import { PREFERRED_LANGUAGE_QUESTION_ID } from "../constants";

export const testQuizDynamicQuestions: TQuizDynamicQuestion[] = [
  {
    id: PREFERRED_LANGUAGE_QUESTION_ID,
    dataModel: {
      type: "single-select",
      title: {
        en: "What is your preferred language?",
        fr: "Quelle est votre langue préférée ?",
        de: "Was ist deine bevorzugte Sprache?",
        es: "¿Cuál es tu idioma preferido?",
      },
      description: {
        en: "Choose language",
        fr: "Choisissez la langue",
        de: "Sprache wählen",
        es: "Elegir idioma",
      },
      options: [
        {
          label: { en: "English", fr: "Anglais", de: "Englisch", es: "Inglés" },
          value: "en",
        },
        {
          label: {
            en: "French",
            fr: "Français",
            de: "Französisch",
            es: "Francés",
          },
          value: "fr",
        },
        {
          label: { en: "German", fr: "Allemand", de: "Deutsch", es: "Alemán" },
          value: "de",
        },
        {
          label: {
            en: "Spanish",
            fr: "Espagnol",
            de: "Spanisch",
            es: "Español",
          },
          value: "es",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "gender-identity",
  },
  {
    id: "gender-identity",
    dataModel: {
      type: "single-select-question-emoji",
      title: {
        en: "What gender do you identify with?",
        fr: "Quel est votre genre ?",
        de: "Mit welchem Geschlecht identifizierst du dich?",
        es: "¿Con qué género te identificas?",
      },
      description: {
        en: "Please share how you identify yourself",
        fr: "Veuillez partager comment vous vous identifiez",
        de: "Bitte teile uns mit, wie du dich identifizierst",
        es: "Por favor, comparte cómo te identificas",
      },
      options: [
        {
          label: { en: "Female", fr: "Femme", de: "Weiblich", es: "Femenino" },
          emoji: "👩",
          value: "female",
        },
        {
          label: { en: "Male", fr: "Homme", de: "Männlich", es: "Masculino" },
          emoji: "👨",
          value: "male",
        },
        {
          label: { en: "Other", fr: "Autre", de: "Andere", es: "Otro" },
          emoji: "😉",
          value: "other",
        },
      ],
    },
    branches: [
      {
        conditions: [
          { questionId: "gender-identity", operator: "EQUALS", value: "male" },
        ],
        logic: "AND",
        nextQuestionId: "age-group",
      },
    ],
    defaultNextQuestionId: "reading-goals",
  },
  {
    id: "reading-goals",
    dataModel: {
      type: "single-select",
      title: {
        en: "What is your main goal for reading?",
        fr: "Quel est votre objectif principal de lecture ?",
        de: "Was ist Ihre Hauptpriorität beim Lesen",
        es: "¿Cuál es tu objetivo principal de lectura?",
      },
      options: [
        {
          label: {
            en: "Self-discovery",
            fr: "Découverte de soi",
            de: "Selbstfindung",
            es: "Autodescubrimiento",
          },
          value: "discovery",
        },
        {
          label: {
            en: "Escape from reality",
            fr: "Échapper à la réalité",
            de: "Flucht aus der Realität",
            es: "Escapar de la realidad",
          },
          value: "escape",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "age-group",
  },
  {
    id: "age-group",
    dataModel: {
      type: "single-select",
      title: {
        en: "What is your age?",
        fr: "Quel est votre âge ?",
        de: "Wie alt bist du?",
        es: "¿Cuál es tu edad?",
      },
      options: [
        {
          label: {
            en: "18-29 years",
            fr: "18-29 ans",
            de: "18-29 Jahre",
            es: "18-29 años",
          },
          value: "young",
        },
        {
          label: {
            en: "30-39 years",
            fr: "30-39 ans",
            de: "30-39 Jahre",
            es: "30-39 años",
          },
          value: "adult",
        },
        {
          label: {
            en: "40-49 years",
            fr: "40-49 ans",
            de: "40-49 Jahre",
            es: "40-49 años",
          },
          value: "middle-aged",
        },
        {
          label: { en: "50+", fr: "50+", de: "50+", es: "50+" },
          value: "senior",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "book-dislikes",
  },
  {
    id: "book-dislikes",
    dataModel: {
      type: "multiple-select",
      title: {
        en: "What do you hate the most in a book?",
        fr: "Qu'est-ce que vous détestez le plus dans un livre ?",
        de: "Was hasst du am meisten an einem Buch?",
        es: "¿Qué es lo que más odias en un libro?",
      },
      options: [
        {
          label: {
            en: "Lack of logic",
            fr: "Manque de logique",
            de: "Mangel an Logik",
            es: "Falta de lógica",
          },
          value: "no-logic",
        },
        {
          label: {
            en: "A slow speed",
            fr: "Un rythme lent",
            de: "Langsames Tempo",
            es: "Ritmo lento",
          },
          value: "slow",
        },
        {
          label: {
            en: "Lack of humor",
            fr: "Manque d'humour",
            de: "Mangel an Humor",
            es: "Falta de humor",
          },
          value: "no-humor",
        },
        {
          label: {
            en: "Way too generic ending",
            fr: "Fin trop générique",
            de: "Zu klischeehaftes Ende",
            es: "Final demasiado genérico",
          },
          value: "generic-ending",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "favorite-topics",
  },
  {
    id: "favorite-topics",
    dataModel: {
      type: "bubble-select",
      title: {
        en: "What are your favorite topics?",
        fr: "Quels sont vos sujets préférés ?",
        de: "Was sind deine Lieblingsthemen?",
        es: "¿Cuáles son tus temas favoritos?",
      },
      options: [
        {
          label: { en: "Action", fr: "Action", de: "Action", es: "Acción" },
          value: "action",
          emoji: "🏹",
        },
        {
          label: {
            en: "Romance",
            fr: "Romance",
            de: "Romantik",
            es: "Romance",
          },
          value: "romance",
          emoji: "❤️",
        },
        {
          label: {
            en: "Bad Boy",
            fr: "Bad Boy",
            de: "Bad Boy",
            es: "Chico Malo",
          },
          value: "bad-boy",
          emoji: "😈",
        },
        {
          label: {
            en: "Fantasy",
            fr: "Fantastique",
            de: "Fantasy",
            es: "Fantasía",
          },
          value: "fantasy",
          emoji: "🪄",
        },
        {
          label: {
            en: "Sci-Fi",
            fr: "Science-fiction",
            de: "Sci-Fi",
            es: "Ciencia ficción",
          },
          value: "sci-fi",
          emoji: "🚀",
        },
        {
          label: {
            en: "Mystery",
            fr: "Mystère",
            de: "Mystery",
            es: "Misterio",
          },
          value: "mystery",
          emoji: "🔍",
        },
        {
          label: {
            en: "Thriller",
            fr: "Thriller",
            de: "Thriller",
            es: "Thriller",
          },
          value: "thriller",
          emoji: "🔪",
        },
      ],
    },
    branches: [
      {
        conditions: [
          {
            questionId: "favorite-topics",
            operator: "CONTAINS",
            value: "romance",
          },
          {
            questionId: "favorite-topics",
            operator: "CONTAINS",
            value: "bad-boy",
          },
        ],
        logic: "OR",
        nextQuestionId: "romance-subgenre",
      },
    ],
    defaultNextQuestionId: "loader",
  },
  {
    id: "romance-subgenre",
    dataModel: {
      type: "single-select",
      title: {
        en: "Which romance subgenre do you prefer?",
        fr: "Quel sous-genre de romance préférez-vous ?",
        de: "Welches Romantik-Subgenre bevorzugst du?",
        es: "¿Qué subgénero de romance prefieres?",
      },
      options: [
        {
          label: {
            en: "Contemporary",
            fr: "Contemporain",
            de: "Modern",
            es: "Contemporáneo",
          },
          value: "contemporary",
        },
        {
          label: {
            en: "Historical",
            fr: "Historique",
            de: "Historisch",
            es: "Histórico",
          },
          value: "historical",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "loader",
  },
];

export const quizStaticSteps: TStaticStep[] = [
  {
    id: "loader",
    dataModel: {
      type: "loader",
      title: {
        en: "Finding collections for you...",
        fr: "Recherche de collections pour vous...",
        de: "Sammlungen für dich finden...",
        es: "Buscando colecciones para ti...",
      },
    },
    defaultNextQuestionId: "email",
  },
  {
    id: "email",
    dataModel: {
      type: "email",
      title: {
        en: "Email",
        fr: "E-mail",
        de: "E-Mail",
        es: "Correo electrónico",
      },
      description: {
        en: "Enter your email to get full access.",
        fr: "Entrez votre e-mail pour obtenir un accès complet.",
        de: "Geben Sie Ihre E-Mail-Adresse ein, um vollen Zugriff zu erhalten.",
        es: "Ingrese su correo electrónico para obtener acceso completo.",
      },
      placeholder: {
        en: "your@email.com",
        fr: "votre@email.com",
        de: "deine@email.de",
        es: "tu@correo.com",
      },
      errorText: {
        en: "Invalid email",
        fr: "E-mail invalide",
        de: "Ungültige E-Mail",
        es: "Correo no válido",
      },
    },
    defaultNextQuestionId: "thank-you",
  },
  {
    id: "thank-you",
    dataModel: {
      type: "thank-you",
      title: {
        en: "Thank you",
        fr: "Merci",
        de: "Vielen Dank",
        es: "¡Gracias!",
      },
      description: {
        en: "for supporting us and passing quiz! 🎉",
        fr: "de nous soutenir et d'avoir réussi le quiz ! 🎉",
        de: "für deine Unterstützung und das Bestehen des Quiz! 🎉",
        es: "por apoyarnos y completar el cuestionario. 🎉",
      },
      downloadButtonText: {
        en: "Download my answers",
        fr: "Télécharger mes réponses",
        de: "Meine Antworten herunterladen",
        es: "Descargar mis respuestas",
      },
      retakeButtonText: {
        en: "Retake quiz",
        fr: "Recommencer le quiz",
        de: "Quiz wiederholen",
        es: "Repetir el quiz",
      },
    },
    defaultNextQuestionId: null,
  },
];

export const tesTQuiz: TQuiz = {
  schemaVersion: "1.0",
  questions: testQuizDynamicQuestions,
  staticSteps: quizStaticSteps,
};

// AI-generated quiz with 10 steps (7 dynamic + 3 static)
export const aiGeneratedQuizDynamicQuestions: TQuizDynamicQuestion[] = [
  {
    id: "experience-level",
    dataModel: {
      type: "single-select",
      title: {
        en: "What is your experience level with technology?",
        fr: "Quel est votre niveau d'expérience avec la technologie?",
        de: "Wie ist Ihr Erfahrungslevel mit Technologie?",
        es: "¿Cuál es tu nivel de experiencia con la tecnología?",
      },
      description: {
        en: "Select your comfort level",
        fr: "Sélectionnez votre niveau de confort",
        de: "Wählen Sie Ihr Komfortniveau",
        es: "Selecciona tu nivel de comodidad",
      },
      options: [
        {
          label: {
            en: "Beginner",
            fr: "Débutant",
            de: "Anfänger",
            es: "Principiante",
          },
          value: "beginner",
        },
        {
          label: {
            en: "Intermediate",
            fr: "Intermédiaire",
            de: "Fortgeschritten",
            es: "Intermedio",
          },
          value: "intermediate",
        },
        {
          label: {
            en: "Advanced",
            fr: "Avancé",
            de: "Experte",
            es: "Avanzado",
          },
          value: "advanced",
        },
      ],
    },
    branches: [
      {
        conditions: [
          {
            questionId: "experience-level",
            operator: "EQUALS",
            value: "beginner",
          },
        ],
        logic: "AND",
        nextQuestionId: "learning-style",
      },
    ],
    defaultNextQuestionId: "work-focus",
  },
  {
    id: "learning-style",
    dataModel: {
      type: "single-select-question-emoji",
      title: {
        en: "How do you prefer to learn?",
        fr: "Comment préférez-vous apprendre?",
        de: "Wie lernen Sie am liebsten?",
        es: "¿Cómo prefieres aprender?",
      },
      description: {
        en: "Choose your preferred learning method",
        fr: "Choisissez votre méthode d'apprentissage préférée",
        de: "Wählen Sie Ihre bevorzugte Lernmethode",
        es: "Elige tu método de aprendizaje preferido",
      },
      options: [
        {
          label: { en: "Visual", fr: "Visuel", de: "Visuell", es: "Visual" },
          emoji: "👁️",
          value: "visual",
        },
        {
          label: {
            en: "Hands-on",
            fr: "Pratique",
            de: "Praktisch",
            es: "Práctico",
          },
          emoji: "✋",
          value: "hands-on",
        },
        {
          label: { en: "Reading", fr: "Lecture", de: "Lesen", es: "Lectura" },
          emoji: "📚",
          value: "reading",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "interests",
  },
  {
    id: "work-focus",
    dataModel: {
      type: "bubble-select",
      title: {
        en: "What areas do you work with?",
        fr: "Dans quels domaines travaillez-vous?",
        de: "In welchen Bereichen arbeiten Sie?",
        es: "¿En qué áreas trabajas?",
      },
      options: [
        {
          label: {
            en: "Frontend",
            fr: "Frontend",
            de: "Frontend",
            es: "Frontend",
          },
          value: "frontend",
          emoji: "🎨",
        },
        {
          label: { en: "Backend", fr: "Backend", de: "Backend", es: "Backend" },
          value: "backend",
          emoji: "⚙️",
        },
        {
          label: { en: "DevOps", fr: "DevOps", de: "DevOps", es: "DevOps" },
          value: "devops",
          emoji: "🚀",
        },
        {
          label: {
            en: "Data Science",
            fr: "Science des données",
            de: "Datenwissenschaft",
            es: "Ciencia de datos",
          },
          value: "data-science",
          emoji: "📊",
        },
        {
          label: { en: "Mobile", fr: "Mobile", de: "Mobil", es: "Móvil" },
          value: "mobile",
          emoji: "📱",
        },
      ],
    },
    branches: [
      {
        conditions: [
          { questionId: "work-focus", operator: "CONTAINS", value: "frontend" },
          { questionId: "work-focus", operator: "CONTAINS", value: "mobile" },
        ],
        logic: "OR",
        nextQuestionId: "ui-preferences",
      },
    ],
    defaultNextQuestionId: "interests",
  },
  {
    id: "ui-preferences",
    dataModel: {
      type: "single-select",
      title: {
        en: "What UI framework do you prefer?",
        fr: "Quel framework UI préférez-vous?",
        de: "Welches UI-Framework bevorzugen Sie?",
        es: "¿Qué framework de UI prefieres?",
      },
      options: [
        {
          label: { en: "React", fr: "React", de: "React", es: "React" },
          value: "react",
        },
        {
          label: { en: "Vue", fr: "Vue", de: "Vue", es: "Vue" },
          value: "vue",
        },
        {
          label: { en: "Angular", fr: "Angular", de: "Angular", es: "Angular" },
          value: "angular",
        },
        {
          label: { en: "Svelte", fr: "Svelte", de: "Svelte", es: "Svelte" },
          value: "svelte",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "interests",
  },
  {
    id: "interests",
    dataModel: {
      type: "multiple-select",
      title: {
        en: "What topics interest you most?",
        fr: "Quels sujets vous intéressent le plus?",
        de: "Welche Themen interessieren Sie am meisten?",
        es: "¿Qué temas te interesan más?",
      },
      options: [
        {
          label: { en: "AI/ML", fr: "IA/ML", de: "KI/ML", es: "IA/ML" },
          value: "ai-ml",
        },
        {
          label: {
            en: "Web Development",
            fr: "Développement Web",
            de: "Webentwicklung",
            es: "Desarrollo Web",
          },
          value: "web-dev",
        },
        {
          label: {
            en: "Cloud Computing",
            fr: "Cloud Computing",
            de: "Cloud Computing",
            es: "Computación en la Nube",
          },
          value: "cloud",
        },
        {
          label: {
            en: "Cybersecurity",
            fr: "Cybersécurité",
            de: "Cybersicherheit",
            es: "Ciberseguridad",
          },
          value: "security",
        },
        {
          label: {
            en: "Blockchain",
            fr: "Blockchain",
            de: "Blockchain",
            es: "Blockchain",
          },
          value: "blockchain",
        },
      ],
    },
    branches: [
      {
        conditions: [
          { questionId: "interests", operator: "CONTAINS", value: "ai-ml" },
        ],
        logic: "AND",
        nextQuestionId: "ai-experience",
      },
    ],
    defaultNextQuestionId: "time-commitment",
  },
  {
    id: "ai-experience",
    dataModel: {
      type: "single-select",
      title: {
        en: "Have you worked with AI/ML before?",
        fr: "Avez-vous déjà travaillé avec l'IA/ML?",
        de: "Haben Sie bereits mit KI/ML gearbeitet?",
        es: "¿Has trabajado con IA/ML antes?",
      },
      options: [
        {
          label: {
            en: "Yes, extensively",
            fr: "Oui, beaucoup",
            de: "Ja, ausgiebig",
            es: "Sí, extensivamente",
          },
          value: "yes-extensive",
        },
        {
          label: {
            en: "Some experience",
            fr: "Un peu d'expérience",
            de: "Etwas Erfahrung",
            es: "Algo de experiencia",
          },
          value: "some",
        },
        {
          label: {
            en: "No experience",
            fr: "Aucune expérience",
            de: "Keine Erfahrung",
            es: "Sin experiencia",
          },
          value: "none",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "time-commitment",
  },
  {
    id: "time-commitment",
    dataModel: {
      type: "single-select",
      title: {
        en: "How much time can you dedicate weekly?",
        fr: "Combien de temps pouvez-vous consacrer par semaine?",
        de: "Wie viel Zeit können Sie wöchentlich aufwenden?",
        es: "¿Cuánto tiempo puedes dedicar semanalmente?",
      },
      options: [
        {
          label: {
            en: "1-3 hours",
            fr: "1-3 heures",
            de: "1-3 Stunden",
            es: "1-3 horas",
          },
          value: "low",
        },
        {
          label: {
            en: "4-7 hours",
            fr: "4-7 heures",
            de: "4-7 Stunden",
            es: "4-7 horas",
          },
          value: "medium",
        },
        {
          label: {
            en: "8+ hours",
            fr: "8+ heures",
            de: "8+ Stunden",
            es: "8+ horas",
          },
          value: "high",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "loader",
  },
];

export const aiGeneratedQuiz: TQuiz = {
  schemaVersion: "1.0",
  questions: aiGeneratedQuizDynamicQuestions,
  staticSteps: quizStaticSteps,
};

// Valentine's Day themed quiz
export const valentinesDayQuizDynamicQuestions: TQuizDynamicQuestion[] = [
  {
    id: PREFERRED_LANGUAGE_QUESTION_ID,
    dataModel: {
      type: "single-select",
      title: {
        en: "What is your preferred language?",
        fr: "Quelle est votre langue préférée ?",
        de: "Was ist deine bevorzugte Sprache?",
        es: "¿Cuál es tu idioma preferido?",
      },
      description: {
        en: "Choose language",
        fr: "Choisissez la langue",
        de: "Sprache wählen",
        es: "Elegir idioma",
      },
      options: [
        {
          label: { en: "English", fr: "Anglais", de: "Englisch", es: "Inglés" },
          value: "en",
        },
        {
          label: {
            en: "French",
            fr: "Français",
            de: "Französisch",
            es: "Francés",
          },
          value: "fr",
        },
        {
          label: { en: "German", fr: "Allemand", de: "Deutsch", es: "Alemán" },
          value: "de",
        },
        {
          label: {
            en: "Spanish",
            fr: "Espagnol",
            de: "Spanisch",
            es: "Español",
          },
          value: "es",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "relationship-status",
  },
  {
    id: "relationship-status",
    dataModel: {
      type: "single-select-question-emoji",
      title: {
        en: "What's your relationship status?",
        fr: "Quel est votre statut relationnel ?",
        de: "Was ist dein Beziehungsstatus?",
        es: "¿Cuál es tu estado de relación?",
      },
      description: {
        en: "Tell us about your love life",
        fr: "Parlez-nous de votre vie amoureuse",
        de: "Erzähle uns von deinem Liebesleben",
        es: "Cuéntanos sobre tu vida amorosa",
      },
      options: [
        {
          label: { en: "Single", fr: "Célibataire", de: "Single", es: "Soltero/a" },
          emoji: "💔",
          value: "single",
        },
        {
          label: {
            en: "In a relationship",
            fr: "En couple",
            de: "In einer Beziehung",
            es: "En una relación",
          },
          emoji: "💑",
          value: "relationship",
        },
        {
          label: {
            en: "It's complicated",
            fr: "C'est compliqué",
            de: "Es ist kompliziert",
            es: "Es complicado",
          },
          emoji: "😕",
          value: "complicated",
        },
      ],
    },
    branches: [
      {
        conditions: [
          { questionId: "relationship-status", operator: "EQUALS", value: "single" },
        ],
        logic: "AND",
        nextQuestionId: "ideal-date",
      },
    ],
    defaultNextQuestionId: "love-language",
  },
  {
    id: "love-language",
    dataModel: {
      type: "bubble-select",
      title: {
        en: "What are your love languages?",
        fr: "Quels sont vos langages d'amour ?",
        de: "Was sind deine Liebessprachen?",
        es: "¿Cuáles son tus lenguajes de amor?",
      },
      options: [
        {
          label: {
            en: "Words of Affirmation",
            fr: "Mots d'affirmation",
            de: "Worte der Bestätigung",
            es: "Palabras de afirmación",
          },
          value: "words",
          emoji: "💬",
        },
        {
          label: {
            en: "Quality Time",
            fr: "Temps de qualité",
            de: "Qualitätszeit",
            es: "Tiempo de calidad",
          },
          value: "time",
          emoji: "⏰",
        },
        {
          label: {
            en: "Physical Touch",
            fr: "Contact physique",
            de: "Körperliche Berührung",
            es: "Contacto físico",
          },
          value: "touch",
          emoji: "🤗",
        },
        {
          label: {
            en: "Acts of Service",
            fr: "Actes de service",
            de: "Hilfsbereitschaft",
            es: "Actos de servicio",
          },
          value: "service",
          emoji: "🛠️",
        },
        {
          label: {
            en: "Receiving Gifts",
            fr: "Recevoir des cadeaux",
            de: "Geschenke erhalten",
            es: "Recibir regalos",
          },
          value: "gifts",
          emoji: "🎁",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "romantic-preferences",
  },
  {
    id: "ideal-date",
    dataModel: {
      type: "single-select",
      title: {
        en: "What's your ideal first date?",
        fr: "Quel est votre premier rendez-vous idéal ?",
        de: "Was ist dein ideales erstes Date?",
        es: "¿Cuál es tu primera cita ideal?",
      },
      options: [
        {
          label: {
            en: "Cozy coffee shop chat",
            fr: "Discussion dans un café cosy",
            de: "Gemütliches Café-Gespräch",
            es: "Charla en cafetería acogedora",
          },
          value: "coffee",
        },
        {
          label: {
            en: "Romantic dinner",
            fr: "Dîner romantique",
            de: "Romantisches Abendessen",
            es: "Cena romántica",
          },
          value: "dinner",
        },
        {
          label: {
            en: "Adventure activity",
            fr: "Activité d'aventure",
            de: "Abenteueraktivität",
            es: "Actividad de aventura",
          },
          value: "adventure",
        },
        {
          label: {
            en: "Movie night",
            fr: "Soirée cinéma",
            de: "Filmabend",
            es: "Noche de películas",
          },
          value: "movie",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "romantic-preferences",
  },
  {
    id: "romantic-preferences",
    dataModel: {
      type: "multiple-select",
      title: {
        en: "What do you value most in a relationship?",
        fr: "Qu'appréciez-vous le plus dans une relation ?",
        de: "Was schätzt du am meisten in einer Beziehung?",
        es: "¿Qué valoras más en una relación?",
      },
      options: [
        {
          label: {
            en: "Honesty",
            fr: "Honnêteté",
            de: "Ehrlichkeit",
            es: "Honestidad",
          },
          value: "honesty",
        },
        {
          label: {
            en: "Humor",
            fr: "Humour",
            de: "Humor",
            es: "Humor",
          },
          value: "humor",
        },
        {
          label: {
            en: "Trust",
            fr: "Confiance",
            de: "Vertrauen",
            es: "Confianza",
          },
          value: "trust",
        },
        {
          label: {
            en: "Communication",
            fr: "Communication",
            de: "Kommunikation",
            es: "Comunicación",
          },
          value: "communication",
        },
        {
          label: {
            en: "Adventure",
            fr: "Aventure",
            de: "Abenteuer",
            es: "Aventura",
          },
          value: "adventure",
        },
        {
          label: {
            en: "Stability",
            fr: "Stabilité",
            de: "Stabilität",
            es: "Estabilidad",
          },
          value: "stability",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "valentine-plans",
  },
  {
    id: "valentine-plans",
    dataModel: {
      type: "single-select-question-emoji",
      title: {
        en: "How do you celebrate Valentine's Day?",
        fr: "Comment célébrez-vous la Saint-Valentin ?",
        de: "Wie feierst du den Valentinstag?",
        es: "¿Cómo celebras el Día de San Valentín?",
      },
      description: {
        en: "Share your celebration style",
        fr: "Partagez votre style de célébration",
        de: "Teile deinen Feier-Stil",
        es: "Comparte tu estilo de celebración",
      },
      options: [
        {
          label: {
            en: "Romantic getaway",
            fr: "Escapade romantique",
            de: "Romantischer Ausflug",
            es: "Escapada romántica",
          },
          emoji: "✈️",
          value: "getaway",
        },
        {
          label: {
            en: "Candlelit dinner",
            fr: "Dîner aux chandelles",
            de: "Abendessen bei Kerzenlicht",
            es: "Cena a la luz de las velas",
          },
          emoji: "🕯️",
          value: "dinner",
        },
        {
          label: {
            en: "Cozy night in",
            fr: "Soirée cosy à la maison",
            de: "Gemütlicher Abend zuhause",
            es: "Noche acogedora en casa",
          },
          emoji: "🏠",
          value: "home",
        },
        {
          label: {
            en: "I don't celebrate",
            fr: "Je ne célèbre pas",
            de: "Ich feiere nicht",
            es: "No celebro",
          },
          emoji: "🤷",
          value: "none",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "gift-preferences",
  },
  {
    id: "gift-preferences",
    dataModel: {
      type: "bubble-select",
      title: {
        en: "What type of gifts do you prefer?",
        fr: "Quel type de cadeaux préférez-vous ?",
        de: "Welche Art von Geschenken bevorzugst du?",
        es: "¿Qué tipo de regalos prefieres?",
      },
      options: [
        {
          label: {
            en: "Flowers",
            fr: "Fleurs",
            de: "Blumen",
            es: "Flores",
          },
          value: "flowers",
          emoji: "💐",
        },
        {
          label: {
            en: "Chocolates",
            fr: "Chocolats",
            de: "Schokolade",
            es: "Chocolates",
          },
          value: "chocolates",
          emoji: "🍫",
        },
        {
          label: {
            en: "Jewelry",
            fr: "Bijoux",
            de: "Schmuck",
            es: "Joyas",
          },
          value: "jewelry",
          emoji: "💍",
        },
        {
          label: {
            en: "Experiences",
            fr: "Expériences",
            de: "Erlebnisse",
            es: "Experiencias",
          },
          value: "experiences",
          emoji: "🎭",
        },
        {
          label: {
            en: "Handmade gifts",
            fr: "Cadeaux faits main",
            de: "Handgemachte Geschenke",
            es: "Regalos hechos a mano",
          },
          value: "handmade",
          emoji: "🎨",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "romantic-movies",
  },
  {
    id: "romantic-movies",
    dataModel: {
      type: "single-select",
      title: {
        en: "What's your favorite romantic movie genre?",
        fr: "Quel est votre genre de film romantique préféré ?",
        de: "Was ist dein liebstes romantisches Filmgenre?",
        es: "¿Cuál es tu género de películas románticas favorito?",
      },
      options: [
        {
          label: {
            en: "Classic romance",
            fr: "Romance classique",
            de: "Klassische Romantik",
            es: "Romance clásica",
          },
          value: "classic",
        },
        {
          label: {
            en: "Romantic comedy",
            fr: "Comédie romantique",
            de: "Romantische Komödie",
            es: "Comedia romántica",
          },
          value: "romcom",
        },
        {
          label: {
            en: "Drama romance",
            fr: "Drame romantique",
            de: "Romantisches Drama",
            es: "Drama romántico",
          },
          value: "drama",
        },
        {
          label: {
            en: "Fantasy romance",
            fr: "Romance fantastique",
            de: "Fantasy-Romantik",
            es: "Romance de fantasía",
          },
          value: "fantasy",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "date-personality",
  },
  {
    id: "date-personality",
    dataModel: {
      type: "single-select-question-emoji",
      title: {
        en: "What's your dating personality?",
        fr: "Quelle est votre personnalité amoureuse ?",
        de: "Was ist deine Dating-Persönlichkeit?",
        es: "¿Cuál es tu personalidad en las citas?",
      },
      description: {
        en: "Choose what describes you best",
        fr: "Choisissez ce qui vous décrit le mieux",
        de: "Wähle, was dich am besten beschreibt",
        es: "Elige lo que mejor te describe",
      },
      options: [
        {
          label: {
            en: "Hopeless romantic",
            fr: "Grand romantique",
            de: "Hoffnungsloser Romantiker",
            es: "Romántico empedernido",
          },
          emoji: "😍",
          value: "romantic",
        },
        {
          label: {
            en: "Practical and realistic",
            fr: "Pratique et réaliste",
            de: "Praktisch und realistisch",
            es: "Práctico y realista",
          },
          emoji: "🤔",
          value: "practical",
        },
        {
          label: {
            en: "Spontaneous and fun",
            fr: "Spontané et amusant",
            de: "Spontan und lustig",
            es: "Espontáneo y divertido",
          },
          emoji: "🎉",
          value: "spontaneous",
        },
        {
          label: {
            en: "Thoughtful and caring",
            fr: "Attentionné et bienveillant",
            de: "Nachdenklich und fürsorglich",
            es: "Reflexivo y cariñoso",
          },
          emoji: "🥰",
          value: "caring",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "relationship-goals",
  },
  {
    id: "relationship-goals",
    dataModel: {
      type: "multiple-select",
      title: {
        en: "What are your relationship goals?",
        fr: "Quels sont vos objectifs relationnels ?",
        de: "Was sind deine Beziehungsziele?",
        es: "¿Cuáles son tus objetivos en una relación?",
      },
      options: [
        {
          label: {
            en: "Long-term commitment",
            fr: "Engagement à long terme",
            de: "Langfristige Bindung",
            es: "Compromiso a largo plazo",
          },
          value: "longterm",
        },
        {
          label: {
            en: "Building a family",
            fr: "Fonder une famille",
            de: "Familie gründen",
            es: "Formar una familia",
          },
          value: "family",
        },
        {
          label: {
            en: "Growing together",
            fr: "Grandir ensemble",
            de: "Gemeinsam wachsen",
            es: "Crecer juntos",
          },
          value: "growth",
        },
        {
          label: {
            en: "Having fun and enjoying life",
            fr: "S'amuser et profiter de la vie",
            de: "Spaß haben und das Leben genießen",
            es: "Divertirse y disfrutar la vida",
          },
          value: "fun",
        },
        {
          label: {
            en: "Emotional support",
            fr: "Soutien émotionnel",
            de: "Emotionale Unterstützung",
            es: "Apoyo emocional",
          },
          value: "support",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "perfect-evening",
  },
  {
    id: "perfect-evening",
    dataModel: {
      type: "single-select",
      title: {
        en: "Describe your perfect romantic evening",
        fr: "Décrivez votre soirée romantique parfaite",
        de: "Beschreibe deinen perfekten romantischen Abend",
        es: "Describe tu noche romántica perfecta",
      },
      options: [
        {
          label: {
            en: "Stargazing under the night sky",
            fr: "Observer les étoiles sous le ciel nocturne",
            de: "Sterne beobachten unter dem Nachthimmel",
            es: "Observar las estrellas bajo el cielo nocturno",
          },
          value: "stargazing",
        },
        {
          label: {
            en: "Dancing together at home",
            fr: "Danser ensemble à la maison",
            de: "Zusammen zu Hause tanzen",
            es: "Bailar juntos en casa",
          },
          value: "dancing",
        },
        {
          label: {
            en: "Cooking a meal together",
            fr: "Cuisiner un repas ensemble",
            de: "Zusammen ein Essen kochen",
            es: "Cocinar una comida juntos",
          },
          value: "cooking",
        },
        {
          label: {
            en: "Walk on the beach",
            fr: "Promenade sur la plage",
            de: "Spaziergang am Strand",
            es: "Paseo por la playa",
          },
          value: "beach",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "deal-breakers",
  },
  {
    id: "deal-breakers",
    dataModel: {
      type: "multiple-select",
      title: {
        en: "What are your relationship deal-breakers?",
        fr: "Quels sont vos critères rédhibitoires ?",
        de: "Was sind deine Beziehungs-Deal-Breaker?",
        es: "¿Cuáles son tus factores decisivos en una relación?",
      },
      options: [
        {
          label: {
            en: "Dishonesty",
            fr: "Malhonnêteté",
            de: "Unehrlichkeit",
            es: "Deshonestidad",
          },
          value: "dishonesty",
        },
        {
          label: {
            en: "Lack of ambition",
            fr: "Manque d'ambition",
            de: "Mangel an Ehrgeiz",
            es: "Falta de ambición",
          },
          value: "no-ambition",
        },
        {
          label: {
            en: "Poor communication",
            fr: "Mauvaise communication",
            de: "Schlechte Kommunikation",
            es: "Mala comunicación",
          },
          value: "poor-communication",
        },
        {
          label: {
            en: "Different values",
            fr: "Valeurs différentes",
            de: "Unterschiedliche Werte",
            es: "Valores diferentes",
          },
          value: "different-values",
        },
        {
          label: {
            en: "Lack of emotional availability",
            fr: "Manque de disponibilité émotionnelle",
            de: "Mangel an emotionaler Verfügbarkeit",
            es: "Falta de disponibilidad emocional",
          },
          value: "emotional-unavailable",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "love-songs",
  },
  {
    id: "love-songs",
    dataModel: {
      type: "single-select-question-emoji",
      title: {
        en: "What's your love song vibe?",
        fr: "Quel est votre style de chanson d'amour ?",
        de: "Was ist deine Liebeslied-Stimmung?",
        es: "¿Cuál es tu vibra de canción de amor?",
      },
      description: {
        en: "Pick your music mood",
        fr: "Choisissez votre ambiance musicale",
        de: "Wähle deine Musikstimmung",
        es: "Elige tu estado de ánimo musical",
      },
      options: [
        {
          label: {
            en: "Classic love ballads",
            fr: "Ballades d'amour classiques",
            de: "Klassische Liebesballaden",
            es: "Baladas de amor clásicas",
          },
          emoji: "🎵",
          value: "ballads",
        },
        {
          label: {
            en: "Upbeat romantic pop",
            fr: "Pop romantique entraînant",
            de: "Fröhlicher romantischer Pop",
            es: "Pop romántico alegre",
          },
          emoji: "🎶",
          value: "pop",
        },
        {
          label: {
            en: "Soulful R&B",
            fr: "R&B émouvant",
            de: "Gefühlvolles R&B",
            es: "R&B conmovedor",
          },
          emoji: "🎤",
          value: "rnb",
        },
        {
          label: {
            en: "Indie love songs",
            fr: "Chansons d'amour indie",
            de: "Indie-Liebeslieder",
            es: "Canciones de amor indie",
          },
          emoji: "🎸",
          value: "indie",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "couple-activities",
  },
  {
    id: "couple-activities",
    dataModel: {
      type: "bubble-select",
      title: {
        en: "What activities do you enjoy as a couple?",
        fr: "Quelles activités aimez-vous faire en couple ?",
        de: "Welche Aktivitäten genießt du als Paar?",
        es: "¿Qué actividades disfrutas en pareja?",
      },
      options: [
        {
          label: {
            en: "Traveling",
            fr: "Voyager",
            de: "Reisen",
            es: "Viajar",
          },
          value: "traveling",
          emoji: "✈️",
        },
        {
          label: {
            en: "Cooking together",
            fr: "Cuisiner ensemble",
            de: "Zusammen kochen",
            es: "Cocinar juntos",
          },
          value: "cooking",
          emoji: "👨‍🍳",
        },
        {
          label: {
            en: "Outdoor adventures",
            fr: "Aventures en plein air",
            de: "Outdoor-Abenteuer",
            es: "Aventuras al aire libre",
          },
          value: "outdoor",
          emoji: "🏞️",
        },
        {
          label: {
            en: "Movie marathons",
            fr: "Marathons de films",
            de: "Film-Marathons",
            es: "Maratones de películas",
          },
          value: "movies",
          emoji: "🎬",
        },
        {
          label: {
            en: "Gaming together",
            fr: "Jouer ensemble",
            de: "Zusammen spielen",
            es: "Jugar juntos",
          },
          value: "gaming",
          emoji: "🎮",
        },
        {
          label: {
            en: "Fitness activities",
            fr: "Activités sportives",
            de: "Fitness-Aktivitäten",
            es: "Actividades de fitness",
          },
          value: "fitness",
          emoji: "💪",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "conflict-resolution",
  },
  {
    id: "conflict-resolution",
    dataModel: {
      type: "single-select",
      title: {
        en: "How do you handle conflicts in a relationship?",
        fr: "Comment gérez-vous les conflits dans une relation ?",
        de: "Wie gehst du mit Konflikten in einer Beziehung um?",
        es: "¿Cómo manejas los conflictos en una relación?",
      },
      options: [
        {
          label: {
            en: "Talk it out immediately",
            fr: "En parler immédiatement",
            de: "Sofort darüber sprechen",
            es: "Hablarlo inmediatamente",
          },
          value: "immediate",
        },
        {
          label: {
            en: "Take time to cool off first",
            fr: "Prendre le temps de se calmer d'abord",
            de: "Erst Zeit nehmen, um sich zu beruhigen",
            es: "Tomar tiempo para calmarse primero",
          },
          value: "cooloff",
        },
        {
          label: {
            en: "Find a compromise",
            fr: "Trouver un compromis",
            de: "Einen Kompromiss finden",
            es: "Encontrar un compromiso",
          },
          value: "compromise",
        },
        {
          label: {
            en: "Seek advice from others",
            fr: "Demander conseil aux autres",
            de: "Rat von anderen suchen",
            es: "Buscar consejo de otros",
          },
          value: "advice",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "future-vision",
  },
  {
    id: "future-vision",
    dataModel: {
      type: "single-select-question-emoji",
      title: {
        en: "What's your vision for your romantic future?",
        fr: "Quelle est votre vision de votre avenir romantique ?",
        de: "Was ist deine Vision für deine romantische Zukunft?",
        es: "¿Cuál es tu visión de tu futuro romántico?",
      },
      description: {
        en: "Think about your ideal future",
        fr: "Pensez à votre avenir idéal",
        de: "Denke an deine ideale Zukunft",
        es: "Piensa en tu futuro ideal",
      },
      options: [
        {
          label: {
            en: "Marriage and forever",
            fr: "Mariage et pour toujours",
            de: "Ehe und für immer",
            es: "Matrimonio y para siempre",
          },
          emoji: "💍",
          value: "marriage",
        },
        {
          label: {
            en: "Committed partnership",
            fr: "Partenariat engagé",
            de: "Engagierte Partnerschaft",
            es: "Pareja comprometida",
          },
          emoji: "💑",
          value: "partnership",
        },
        {
          label: {
            en: "Taking it one day at a time",
            fr: "Un jour à la fois",
            de: "Von Tag zu Tag",
            es: "Un día a la vez",
          },
          emoji: "🌅",
          value: "day-by-day",
        },
        {
          label: {
            en: "Open to possibilities",
            fr: "Ouvert aux possibilités",
            de: "Offen für Möglichkeiten",
            es: "Abierto a posibilidades",
          },
          emoji: "🌟",
          value: "open",
        },
      ],
    },
    branches: [],
    defaultNextQuestionId: "loader",
  },
];

export const valentinesDayQuiz: TQuiz = {
  schemaVersion: "1.0",
  questions: valentinesDayQuizDynamicQuestions,
  staticSteps: quizStaticSteps,
};
