"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { WordListProps, Word } from '../types/word';
import WordItem from './WordItem';
import * as Common from "../../../common/components/index";
import EmptyDeckList from '../../../common/components/EmptyList';

const WordList: React.FC<WordListProps> = ({ deckId }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalWords, setTotalWords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckName = searchParams?.get('deckName') || '';

  const wordsPerPage = 10;
  const totalPages = Math.ceil(totalWords / wordsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchWords(pageNumber);
  };

  const fetchWords = useCallback((page: number) => {
    setLoading(true);
    fetch(`http://localhost:8080/api/word/deck/${deckId}?page=${page - 1}`, {
      credentials: 'include',
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
  }, [deckId, fetchWords, currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
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
      <EmptyDeckList
        title={deckName}
        message="No words to display."
        buttonText="Add Word"
        buttonAction={handleAddWordClick}
      />
    );
  }

  return (
    <div className="p-5" style={{ backgroundColor: '#f3f2ff' }}>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-left">{deckName}</h2>
        <ul className="space-y-4">
          {words.map(word => (
            <WordItem key={word.id} word={word} onEditClick={handleEditClick} />
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          <Common.Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
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