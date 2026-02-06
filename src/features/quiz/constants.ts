/**
 * Quiz system constants
 */

/**
 * Special question ID for language preference selection
 */
export const PREFERRED_LANGUAGE_QUESTION_ID = "preferred-language";

/**
 * Default quiz loader duration in milliseconds
 */
export const DEFAULT_LOADER_DURATION_MS = 5000;

/**
 * Default CSV filename for quiz results download
 */
export const QUIZ_RESULTS_CSV_FILENAME = "quiz_results.csv";

/**
 * Quiz IDs for available quizzes
 */
export const QUIZ_IDS = {
  TEST: "test-quiz",
  TEST_AI: "test-quiz-created-by-ai",
} as const;

/**
 * Default initial step ID for new quizzes
 */
export const DEFAULT_INITIAL_STEP = "1";

/**
 * Static step types that don't count as quiz questions
 */
export const STATIC_STEP_TYPES = ["loader", "email", "thank-you"] as const;
