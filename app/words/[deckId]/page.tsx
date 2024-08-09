"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import * as Word from '../../../features/word/components/index'

const WordListPage = () => {
  const { deckId } = useParams() as { deckId: string };

  return (
    <div>
        <Word.WordList deckId={deckId} />
    </div>
  )
}

export default WordListPage;