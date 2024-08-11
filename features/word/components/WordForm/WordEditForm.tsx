"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface WordEditFormProps {
  wordId: string;
}

const WordEditForm: React.FC<WordEditFormProps> = ({ wordId }) => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [deckId, setDeckId] = useState('1');
  const router = useRouter();

  useEffect(() => {
    const fetchWordData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/word/${wordId}`);
        const wordData = response.data;
        setWord(wordData.original_text);
        setMeaning(wordData.translated_text);
        setOriginalImageUrl(wordData.original_image_url);
        setImageUrl(wordData.image_url);
        setDeckId(wordData.deck_id);
      } catch (error) {
        console.log("Error fetching word data:", error);
      }
    };

    fetchWordData();
  }, [wordId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/word/${wordId}`, {
        original_text: word,
        translated_text: meaning,
        original_image_url: originalImageUrl,
        image_url: imageUrl,
        deck_id: deckId,
      });
      if (response.status === 200) {
        toast.success("Word updated successfully!");
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      toast.error("Error updating word: " + error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-left">Edit Word</h1>
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
        {/* 元画像を貼り付ける欄 */}
        <div className="mb-4">
          <label htmlFor="originalImageUrl" className="block text-sm font-medium text-gray-700">Original Image URL:</label>
          <input
            type="text"
            id="originalImageUrl"
            value={originalImageUrl}
            onChange={(e) => setOriginalImageUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* イメージ画像を貼り付ける欄 */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-2">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          backward
        </button>
      </form>
    </div>
  );
};

export default WordEditForm;