"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Common from "../../../common/components/index";
import { WordListProps, Word } from '../types/word';

const WordList: React.FC<WordListProps> = ({ deckId }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalWords, setTotalWords] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckName = searchParams?.get('deckName') || ''; // 'searchParams' が 'null' でないことを確認

  const wordsPerPage = 10;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchWords(pageNumber);
  };

  const totalPages = Math.ceil(totalWords / wordsPerPage);
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const maxPageNumbersToShow = 5;
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);
    let startPage = Math.max(1, currentPage - halfMaxPageNumbersToShow);
    let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbersToShow);

    if (currentPage <= halfMaxPageNumbersToShow) {
      endPage = Math.min(totalPages, maxPageNumbersToShow);
    } else if (currentPage + halfMaxPageNumbersToShow >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
    }

    const pageNumbersToShow = pageNumbers.slice(startPage - 1, endPage);

    return (
      <>
        {startPage > 1 && (
          <>
            <button onClick={() => paginate(1)} className="px-4 py-2 mx-1 bg-gray-300 text-gray-600 rounded-md transition hover:bg-blue-700">1</button>
            {startPage > 2 && <span className="px-4 py-2 mx-1">...</span>}
          </>
        )}
        {pageNumbersToShow.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 mx-1 ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'} rounded-md transition hover:bg-blue-700`}
          >
            {number}
          </button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-4 py-2 mx-1">...</span>}
            <button onClick={() => paginate(totalPages)} className="px-4 py-2 mx-1 bg-gray-300 text-gray-600 rounded-md transition hover:bg-blue-700">{totalPages}</button>
          </>
        )}
      </>
    );
  };

  const fetchWords = useCallback((page: number) => {
    setLoading(true);
    fetch(`http://localhost:8080/api/word/deck/${deckId}?page=${page - 1}`, {
      credentials: 'include', // クッキーを含める
    })
      .then(response => response.json())
      .then(data => {
        setWords(data.words);
        setTotalWords(data.totalCount);
        setLoading(false);
      })
      .catch(error => {
        console.log("Error fetching words:", error);
        setLoading(false);
      });
  }, [deckId]);

  useEffect(() => {
    fetchWords(currentPage);
  }, [deckId, fetchWords, currentPage]); // 'currentPage' を依存配列に追加

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 1秒後にローディングを終了
    return () => clearTimeout(timer);
  }, []);

  const handleEditClick = (wordId: number) => {
    router.push(`/words/edit/${wordId}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleAddWordClick = () => {
    router.push('/words/new');
  };

  if (isLoading) {
    return <Common.LoadingIndicator />;
  }

  if (loading) {
    return <p className="text-gray-500 text-center mt-4">Loading words...</p>;
  }

  if (!words || words.length === 0) {
    return (
      <div className="p-4">
        <div className="max-w-2xl mx-auto mt-1 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-left">{deckName}</h2>
          <p className="text-gray-500 text-center mt-4 text-xl">No words to display.</p>
          <div className="flex justify-between mt-10">
            <button
              className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleBackClick}
            >
              Backward
            </button>
            <button
              className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleAddWordClick}
            >
              Add Word
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5" style={{ backgroundColor: '#f3f2ff' }}>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-left">{deckName}</h2>
        <ul className="space-y-4">
          {words.map(word => (
            <li
              key={word.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow h-18"
            >
              <div className="flex flex-col items-start space-y-2">
                <span className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: word.originalText }} />
                <span className="text-gray-600" dangerouslySetInnerHTML={{ __html: word.translatedText }} />
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => handleEditClick(word.id)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          {renderPageNumbers()}
        </div>
        <button
          className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleBackClick}
        >
          Backward
        </button>
      </div>
    </div>
  );
}

export default WordList;