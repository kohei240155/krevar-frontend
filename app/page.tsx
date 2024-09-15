"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Decks from "./deck/page";
import HomePage from "./home/page"; // Added

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {status === "authenticated" ? (
          <Decks />
        ) : (
          <HomePage /> // Changed
        )}
      </main>
    </div>
  );
}
