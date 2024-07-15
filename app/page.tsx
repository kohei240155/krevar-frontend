"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import LoginButton from "./components/elements/button/LoginButton";
import * as Deck from "../features/deck/Index";
import Header from "./components/layouts/header/Header";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  return (
    <div className={styles.container}>
      <header>
        <Header />
        <h1>Welcome to IRUKA</h1>
        <p>Your personal vocabulary memorization assistant.</p>
      </header>
      <main className={styles.main}>
        {loggedIn ? (
          <Deck.DeckList />
        ) : (
          <LoginButton onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
}
