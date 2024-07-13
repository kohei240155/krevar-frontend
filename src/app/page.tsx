"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import SampleRequestPage from "./samples/SampleRequestPage";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Production Page</h1>
      <p>This is the main content of your application.</p>
      {/* <SampleRequestPage /> */}
    </div>
  );
}
