"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import LoginButton from "./components/elements/button/LoginButton";
import DeckList from "../features/deck/components/DeckList/DeckList";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Welcome to IRUKA</h1>
        <p>Your personal vocabulary memorization assistant.</p>
      </header>
      <main className={styles.main}>
        {loggedIn ? (
          <DeckList />
        ) : (
          <LoginButton onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
}
