"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

  useEffect(() => {
    fetch(`http://localhost:8080/api/word/${deckId}`)
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
        <ul className="space-y-4">
          {words.map(word => (
            <li
              key={word.id}
              className="flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-lg shadow"
            >
              <div className="flex flex-col md:flex-row items-center space-x-4">
                <span className="text-lg font-medium">
                  {word.original_text && word.original_text.length > 20 ? word.original_text.substring(0, 20) + "..." : word.original_text || ""}
                </span>
                <span className="text-gray-600">
                  {word.translated_text && word.translated_text.length > 20 ? word.translated_text.substring(0, 20) + "..." : word.translated_text || ""}
                </span>
              </div>
              <button
                className="text-blue-500 hover:underline"
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