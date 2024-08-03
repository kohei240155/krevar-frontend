"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import LoginButton from "./components/elements/button/LoginButton";
import * as Deck from "../features/deck/Index";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <main className={styles.main}>
        {/* {loggedIn ? (
          <Deck.DeckList />
        ) : (
          <LoginButton onLogin={handleLogin} />
        )} */}
        <Deck.DeckList />
      </main>
      <Footer />
    </div>
  );
}
