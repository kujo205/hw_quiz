import { redirect } from "next/navigation";
import { DEFAULT_INITIAL_STEP, QUIZ_IDS } from "@/features/quiz/constants";

export default function Home() {
  /**
   * Redirect to demo quiz
   * NOTE: for demo purposes only
   */
  redirect(`/quiz/${QUIZ_IDS.TEST}/${DEFAULT_INITIAL_STEP}`);
}
