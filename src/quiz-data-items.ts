import type { TQuiz } from "@/features/quiz/types-and-schemas";

export const testQuizDynamicQuestions = [
  {
    id: "preferred-language",
    order: 1,
    type: "single-select",
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
        label: {
          en: "English",
          fr: "Anglais",
          de: "Englisch",
          es: "Inglés",
        },
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
        label: {
          en: "German",
          fr: "Allemand",
          de: "Deutsch",
          es: "Alemán",
        },
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
    branches: [],
    defaultNextQuestionId: "gender-identity",
  },
  {
    id: "gender-identity",
    order: 2,
    type: "single-select-image",
    texts: {
      title: {
        en: "What gender do you identify with?",
        fr: "Quel est votre genre ?",
        de: "Mit welchem Geschlecht identifizierst du dich?",
        es: "¿Con qué género te identificas?",
      },
      description: {
        en: "Please share how you identify.",
        fr: "Veuillez partager comment vous vous identifiez.",
        de: "Bitte teile uns mit, wie du dich identifizierst.",
        es: "Por favor, comparte cómo te identificas.",
      },
    },
    options: [
      {
        label: {
          en: "Female",
          fr: "Femme",
          de: "Weiblich",
          es: "Femenino",
        },
        value: "female",
      },
      {
        label: { en: "Male", fr: "Homme", de: "Männlich", es: "Masculino" },
        value: "male",
      },
      {
        label: { en: "Other", fr: "Autre", de: "Andere", es: "Otro" },
        value: "other",
      },
    ],
    branches: [],
    defaultNextQuestionId: "age-group",
  },
  {
    id: "age-group",
    order: 3,
    type: "single-select",
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
    ],
    branches: [
      {
        conditions: [
          { questionId: "age-group", operator: "EQUALS", value: "young" },
        ],
        logic: "AND",
        nextQuestionId: "book-dislikes",
      },
    ],
    defaultNextQuestionId: "book-dislikes",
  },
  {
    id: "book-dislikes",
    order: 4,
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
          en: "Lack of humor",
          fr: "Manque d'humour",
          de: "Mangel an Humor",
          es: "Falta de humor",
        },
        value: "no-humor",
      },
      {
        label: {
          en: "Slow pace",
          fr: "Rythme lent",
          de: "Langsames Tempo",
          es: "Ritmo lento",
        },
        value: "slow",
      },
    ],
    branches: [],
    defaultNextQuestionId: "favorite-topics",
  },
  {
    id: "favorite-topics",
    order: 5,
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
      },
      {
        label: {
          en: "Romance",
          fr: "Romance",
          de: "Romantik",
          es: "Romance",
        },
        value: "romance",
      },
      {
        label: {
          en: "Bad Boy",
          fr: "Mauvais garçon",
          de: "Bad Boy",
          es: "Chico malo",
        },
        value: "bad-boy",
      },
    ],
    branches: [],
    defaultNextQuestionId: "loader",
  },
] satisfies TQuiz["questions"];

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
      buttonText: { en: "Next", fr: "Suivant", de: "Weiter", es: "Siguiente" },
    },
  },
  "thank-you": {
    id: "thank-you",
    type: "thank-you",
    texts: {
      title: {
        en: "Thank you for supporting us!",
        fr: "Merci de nous soutenir !",
        de: "Vielen Dank für deine Unterstützung!",
        es: "¡Gracias por apoyarnos!",
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
  },
} satisfies TQuiz["staticSteps"];
