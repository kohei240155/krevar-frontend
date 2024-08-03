import React from 'react'
import * as Word from "../../features/word/components/index";

const NewDeck = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">New Deck</h1>
      <Word.WordForm />
    </div>
  )
}

export default NewDeck;