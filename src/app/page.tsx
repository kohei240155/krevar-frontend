"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import SampleRequestPage from "./samples/SampleRequestPage";
import LoginButton from "./components/LoginButton";

export default function Home() {
  return (
    <div className={styles.container}>
      <header>
        <h1>Welcome to IRUKA</h1>
        <p>Your personal vocabulary memorization assistant.</p>
      </header>
      <main className={styles.main}>
        <LoginButton />
      </main>
      {/* <SampleRequestPage /> */}
    </div>
  );
}
