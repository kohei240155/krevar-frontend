"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import * as Word from './../../../features/routes/word/components/index';

const WordListPage = () => {

  return (
    <div>
        <Word.WordList />
    </div>
  )
}

export default WordListPage;