"use client"
import styles from "./page.module.css";
import * as Deck from "../features/deck/components/Index";

export default function Home() {

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Deck.DeckList />
      </main>
    </div>
  );
}
