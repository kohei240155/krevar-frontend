"use client"
import { useEffect, useState } from "react";

export default function SampleRequestPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/hello')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching message: ', error))
  });

  return (
    <div>
      <h1>Message from Backend</h1>
      <p>{message}</p>
    </div>
  );
}
