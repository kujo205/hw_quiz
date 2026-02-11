import { redirect } from "next/navigation";

export default function Home() {
  /**
   * Redirect to some quiz directly
   * NOTE: for demo purposes only
   */
  redirect("/quiz/valentines-day/1");
}
