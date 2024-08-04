"use client"
import React from 'react'
import * as Deck from "../../../features/deck/components/Index";
import { useRouter } from 'next/navigation';

const NewDeck = () => {
  const router = useRouter();

  const handleDeckCreated = () => {
    router.push('/');
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">New Deck</h1>
      <Deck.NewDeckForm onDeckCreated={handleDeckCreated} />
    </div>
  )
}

export default NewDeck;