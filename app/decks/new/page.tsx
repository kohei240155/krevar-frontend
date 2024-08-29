"use client"
import React from 'react'
import * as Deck from "../../../features/routes/deck/Index";
import { useRouter } from 'next/navigation';

const NewDeck = () => {
  const router = useRouter();

  const handleDeckCreated = () => {
    router.push('/');
  }

  return (
    <div className="p-4">
      <Deck.NewDeckForm onDeckCreated={handleDeckCreated} />
    </div>
  )
}

export default NewDeck;