"use client";

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import ContentEditable from 'react-contenteditable';
import { SketchPicker, ColorResult } from 'react-color';
import Image from 'next/image';

interface WordEditFormProps {
  wordId: string;
}

const WordEditForm: React.FC<WordEditFormProps> = ({ wordId }) => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [deckId, setDeckId] = useState('1');
  const [nuance, setNuance] = useState(''); // Added for nuance
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wordRef = useRef('');
  const [highlightColor, setHighlightColor] = useState('#ffff00');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加

  const handleReset = () => {
    const wordHtml = (wordRef.current as unknown as HTMLElement)?.innerHTML || '';
    const cleanedWord = wordHtml.replace(/<[^>]+>/g, ''); // HTMLタグを削除
    setWord(cleanedWord);
    if (wordRef.current) {
      (wordRef.current as unknown as HTMLElement).innerHTML = cleanedWord;
    }
  };

  useEffect(() => {
    const fetchWordData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/word/${wordId}`);
        const wordData = response.data;
        setWord(wordData.originalText);
        setMeaning(wordData.translatedText);
        setImageUrl(wordData.imageUrl);
        setDeckId(wordData.deckId);
        setNuance(wordData.nuanceText); // Added for nuance
      } catch (error) {
        console.log("Error fetching word data:", error);
      }
    };

    fetchWordData();
    // ーディングをシミュレートするためのタイムアウト
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 1秒後にローディングを終了
    return () => clearTimeout(timer);
  }, [wordId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="absolute top-0 mt-20 text-xl">Loading...</div>
      </div>
    );
  }

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.backgroundColor = highlightColor;
      range.surroundContents(span);
    }
  };

  const handleColorChange = (color: ColorResult) => {
    setHighlightColor(color.hex);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const wordHtml = (wordRef.current as unknown as HTMLElement)?.innerHTML || '';
      const response = await axios.put(`http://localhost:8080/api/word/${wordId}`, {
        originalText: wordHtml,
        translatedText: meaning,
        imageUrl: imageUrl,
        deckId: deckId,
        nuanceText: nuance,
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
    <div className="p-5">
      <div className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md relative">
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
            <ContentEditable
              innerRef={wordRef as unknown as React.RefObject<HTMLElement>}
              html={word}
              onChange={(e) => setWord(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
            />
            <div className="relative mt-2 inline-flex items-center">
              <div
                onClick={() => setDisplayColorPicker(!displayColorPicker)}
                className="inline-flex items-center justify-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{ backgroundColor: highlightColor, cursor: 'pointer', width: '30px', height: '30px' }}
              />
              <button
                type="button"
                onClick={handleHighlight}
                className="ml-2 inline-flex items-center justify-center px-2 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{ height: '30px', width: '70px' }}
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="ml-2 inline-flex items-center justify-center px-2 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                style={{ height: '30px', width: '70px' }}
              >
                Reset
              </button>
              {displayColorPicker && (
                <div style={{ position: 'absolute', zIndex: 2, top: '100%', left: 0 }}>
                  <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }} onClick={() => setDisplayColorPicker(false)} />
                  <SketchPicker color={highlightColor} onChange={handleColorChange} />
                </div>
              )}
            </div>
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
          {/* ニュアンス入力する欄 */}
          <div className="mb-4">
            <label htmlFor="nuance" className="block text-sm font-medium text-gray-700">Nuance:</label>
            <input
              type="text"
              id="nuance"
              value={nuance}
              onChange={(e) => setNuance(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* イメージ画像を表示する欄 */}
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image:</label>
            {imageUrl && (
              <Image src={imageUrl} alt="Word Image" width={500} height={300} className="mt-2 max-w-full h-auto rounded-md shadow-sm" />
            )}
          </div>
          <div className="flex justify-between mb-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              backward
            </button>
            <button
              type="submit"
              className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </div>
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
    </div>
  );
};

export default WordEditForm;