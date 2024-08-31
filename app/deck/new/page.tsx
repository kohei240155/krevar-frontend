"use client"
import React from 'react'
import * as Deck from "../../../features/routes/deck/components/index";
import { useRouter } from 'next/navigation';

const NewDeck = () => {
  const router = useRouter();

  const handleDeckCreated = () => {
    router.push('/deck');
  }

  return (
    <div className="p-4">
      <Deck.DeckCreateForm onDeckCreated={handleDeckCreated} />
    </div>
  )
}

export default NewDeck;