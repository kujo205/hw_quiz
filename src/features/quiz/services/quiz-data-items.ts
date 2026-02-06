import type {
  TQuiz,
  TQuiz2,
  TQuizQuestion,
  TQuizDynamicQuestion,
  TStaticStep,
} from "@/features/quiz/types-and-schemas/index";

// Old format for backward compatibility
export const testQuizDynamicQuestions: TQuizQuestion[] = [
  {
    id: "preferred-language",
    order: 1,
    type: "single-select-question",
    texts: {
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
        label: { en: "Spanish", fr: "Espagnol", de: "Spanisch", es: "Español" },
        value: "es",
      },
    ],
    branches: [],
    defaultNextQuestionId: "gender-identity",
  },
  {
    id: "gender-identity",
    order: 2,
    type: "single-select-question-emoji",
    texts: {
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
    // РОЗГАЛУЖЕННЯ: Якщо Male — йдемо прямо на вік. Якщо Female/Other — на уточнююче питання.
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
    order: 3,
    type: "single-select-question",
    texts: {
      title: {
        en: "What is your main goal for reading?",
        fr: "Quel est votre objectif principal de lecture ?",
        de: "Was ist Ihre Hauptpriorität beim Lesen",
        es: "¿Cuál es tu objetivo principal de lectura?",
      },
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
    branches: [],
    defaultNextQuestionId: "age-group",
  },
  {
    id: "age-group",
    order: 4,
    type: "single-select-question",
    texts: {
      title: {
        en: "What is your age?",
        fr: "Quel est votre âge ?",
        de: "Wie alt bist du?",
        es: "¿Cuál es tu edad?",
      },
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
    branches: [],
    defaultNextQuestionId: "book-dislikes",
  },
  {
    id: "book-dislikes",
    order: 5,
    type: "multiple-select",
    texts: {
      title: {
        en: "What do you hate the most in a book?",
        fr: "Qu'est-ce que vous détestez le plus dans un livre ?",
        de: "Was hasst du am meisten an einem Buch?",
        es: "¿Qué es lo que más odias en un libro?",
      },
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
    branches: [],
    defaultNextQuestionId: "favorite-topics",
  },

  {
    id: "favorite-topics",
    order: 6,
    type: "bubble-select",
    texts: {
      title: {
        en: "What are your favorite topics?",
        fr: "Quels sont vos sujets préférés ?",
        de: "Was sind deine Lieblingsthemen?",
        es: "¿Cuáles son tus temas favoritos?",
      },
    },
    options: [
      {
        label: { en: "Action", fr: "Action", de: "Action", es: "Acción" },
        value: "action",
        emoji: "🏹",
      },
      {
        label: { en: "Romance", fr: "Romance", de: "Romantik", es: "Romance" },
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
    order: 7,
    type: "single-select-question",
    texts: {
      title: {
        en: "Which romance subgenre do you prefer?",
        fr: "Quel sous-genre de romance préférez-vous ?",
        de: "Welches Romantik-Subgenre bevorzugst du?",
        es: "¿Qué subgénero de romance prefieres?",
      },
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
    branches: [],
    defaultNextQuestionId: "loader",
  },
];
export const quizStaticSteps = {
  loader: {
    id: "loader",
    type: "loader",
    texts: {
      title: {
        en: "Finding collections for you...",
        fr: "Recherche de collections pour vous...",
        de: "Sammlungen für dich finden...",
        es: "Buscando colecciones para ti...",
      },
    },
    defaultNextQuestionId: "email",
  },
  email: {
    id: "email",
    type: "email",
    texts: {
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
  "thank-you": {
    id: "thank-you",
    type: "thank-you",
    texts: {
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
      downloadButton: {
        en: "Download my answers",
        fr: "Télécharger mes réponses",
        de: "Meine Antworten herunterladen",
        es: "Descargar mis respuestas",
      },
      retakeButton: {
        en: "Retake quiz",
        fr: "Recommencer le quiz",
        de: "Quiz wiederholen",
        es: "Repetir el quiz",
      },
    },
    defaultNextQuestionId: null,
  },
} satisfies TQuiz["staticSteps"];

// New QuizSchema2 format
export const testQuizDynamicQuestions2: TQuizDynamicQuestion[] = [
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
          label: { en: "Spanish", fr: "Espagnol", de: "Spanisch", es: "Español" },
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
          label: { en: "Romance", fr: "Romance", de: "Romantik", es: "Romance" },
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

export const quizStaticSteps2: TStaticStep[] = [
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

export const testQuiz2: TQuiz2 = {
  schemaVersion: "2.0",
  questions: testQuizDynamicQuestions2,
  staticSteps: quizStaticSteps2,
};
