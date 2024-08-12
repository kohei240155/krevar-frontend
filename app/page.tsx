"use client"
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import styles from "./page.module.css";
import Decks from "./decks/page";
import Header from "./components/layouts/header/Header";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>; // 認証状態を確認中のローディング表示
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {status === "authenticated" ? (
          <Decks />
        ) : (
          <>
            <h1>Welcome to IRUKA - Vocabulary Memorization App</h1>
            <p>Please log in to view your decks.</p>
            <button onClick={() => signIn("google")}>Log in with Google</button>
          </>
        )}
      </main>
    </div>
  );
};