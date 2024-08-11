"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const WordForm = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [deckId, setDeckId] = useState('1');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/word/${deckId}`, {
        original_text: word,
        translated_text: meaning,
        image_url: imageUrl,
        mastery_status_id: 1,
        last_practiced_date: new Date(),
        next_practice_date: new Date(),
        correct_count: 0,
        incorrect_count: 0,
        deck_id: deckId,
      });
      console.log("Word created successfully:", response.data);
    } catch (error) {
      console.log("Error registering word:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-left">Add Word</h1>
      <form onSubmit={handleSubmit}>
        {/* 単語を入力する欄 */}
        <div className="mb-4">
          <label htmlFor="word" className="block text-sm font-medium text-gray-700">Word:</label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* 単語の意味を入力する欄 */}
        <div className="mb-4">
          <label htmlFor="meaning" className="block text-sm font-medium text-gray-700">Meaning:</label>
          <input
            type="text"
            id="meaning"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* イメージ画像を貼り付ける欄 */}
        <div className="mb-5">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-between mb-2">
          <button
            type="button"
            onClick={() => router.push('/decks')}
            className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Backward
          </button>
          <button
            type="submit"
            className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
              Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default WordForm;