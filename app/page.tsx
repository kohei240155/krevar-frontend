"use client"
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Decks from "./decks/page";
import Header from "../features/routes/layouts/components/Header";
import HomePage from "./home/page"; // Added

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/decks");
    }
  }, [status, router]);

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
};