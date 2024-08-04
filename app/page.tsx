"use client"
import styles from "./page.module.css";
import Decks from "./decks/page";

export default function Home() {

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Decks />
      </main>
    </div>
  );
};