"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Word {
  id: number;
  original_text: string;
  translated_text: string;
}

interface WordListProps {
  deckId: string;
}

const WordList: React.FC<WordListProps> = ({ deckId }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckName = searchParams.get('deckName') || '';

  useEffect(() => {
    fetch(`http://localhost:8080/api/word/deck/${deckId}`)
      .then(response => response.json())
      .then(data => {
        setWords(data);
        setLoading(false);
      })
      .catch(error => {
        console.log("Error fetching words:", error);
        setLoading(false);
      });
  }, [deckId]);

  const handleEditClick = (wordId: number) => {
    router.push(`/words/edit/${wordId}`);
  };

  if (loading) {
    return <p className="text-gray-500 text-center mt-4">Loading words...</p>;
  }

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto mt-1 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-left">Word List</h2>
        <h3 className="text-xl font-semibold mb-4 text-left">Deck Name:  {deckName}</h3>
        <ul className="space-y-4">
          {words.map(word => (
            <li
              key={word.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow h-18"
            >
              <div className="flex flex-col items-start space-y-2">
                <span className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: word.original_text }} />
                <span className="text-gray-600" dangerouslySetInnerHTML={{ __html: word.translated_text }} />
              </div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => handleEditClick(word.id)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WordList;