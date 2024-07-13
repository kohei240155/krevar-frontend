"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import SampleRequestPage from "./samples/SampleRequestPage";
import LoginButton from "./components/LoginButton";
import DeckList from "./components/DeckList";

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
