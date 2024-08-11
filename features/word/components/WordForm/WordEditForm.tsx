"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';

interface WordEditFormProps {
  wordId: string;
}

const WordEditForm: React.FC<WordEditFormProps> = ({ wordId }) => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [deckId, setDeckId] = useState('1');
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchWordData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/word/${wordId}`);
        const wordData = response.data;
        setWord(wordData.original_text);
        setMeaning(wordData.translated_text);
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

  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/word/${wordId}`);
      toast.success("Word deleted successfully!");
      router.push('/words');
    } catch (error) {
      toast.error("Error deleting word: " + error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-left">Edit Word</h1>
        <button
          onClick={handleDelete}
          className="w-10 h-10 flex items-center justify-center rounded-full text-red-600 bg-white border border-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FaTrash />
        </button>
      </div>
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
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image:</label>
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
          onClick={() => router.back()}
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          backward
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Confirm to delete</h2>
          <p className="mb-4">Are you sure you want to delete this word?</p>
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="mr-4 px-4 py-2 bg-gray-300 rounded-md"
            >
              No
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WordEditForm;