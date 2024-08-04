import React from 'react'
import * as Deck from "../../features/deck/components/Index";

const NewDeck = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">New Deck</h1>
      <Deck.DeckForm />
    </div>
  )
}

export default NewDeck;