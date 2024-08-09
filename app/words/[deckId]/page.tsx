"use client"
import React from 'react'
import { useParams } from 'next/navigation'

const WordList = () => {
  const { deckId } = useParams();

  return (
    <div>
      <h1>Word List for Deck ID: {deckId}</h1>
      {/* 他のコンテンツ */}
    </div>
  )
}

export default WordList;