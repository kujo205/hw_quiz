import type {
  TQuiz,
  TQuizDynamicQuestion,
  TStaticStep,
} from "@/features/quiz/types-and-schemas/index";

export const testQuizDynamicQuestions: TQuizDynamicQuestion[] = [
  {
    id: "preferred-language",
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
