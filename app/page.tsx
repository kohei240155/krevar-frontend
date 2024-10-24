import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import Decks from "./deck/page";
import HomePage from "./home/page"; // Added
export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {status === "authenticated" ? <Decks /> : <HomePage />}
      </main>
    </div>
  );
}
