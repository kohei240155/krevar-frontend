"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Word } from "../types/word";
import WordItem from "./WordItem";
import * as Common from "../../../common/index";
import { fetchWords } from "../utils/api";
import { useUser } from "../../../../app/context/UserContext";

const WordList = ({ deckName }: { deckName: string }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalWords, setTotalWords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = parseInt(searchParams?.get("deckId") || "0", 10);
  const wordsPerPage = 10;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchWordsData(pageNumber);
  };

  const totalPages = Math.ceil(totalWords / wordsPerPage);

  const { userId } = useUser();

  const fetchWordsData = useCallback(
    async (page: number) => {
      try {
        const data = await fetchWords(userId, deckId, page, wordsPerPage);
        setWords(data.wordInfo);
        setTotalWords(data.wordInfo.length);
      } catch (error) {
        console.log("Error fetching words:", error);
      }
    },
    [userId, deckId]
  );

  useEffect(() => {
    fetchWordsData(currentPage);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPage, fetchWordsData, userId]);

  if (isLoading) {
    return <Common.LoadingIndicator />;
  }

  if (!Array.isArray(words) || totalWords === 0) {
    return (
      <Common.EmptyList
        title={deckName}
        message="No words to display."
        buttonText="Add Word"
        buttonAction={() => router.push(`/word/add?deckId=${deckId}`)}
        backButtonAction={() => router.push("/deck")}
      />
    );
  }

  return (
    <div className="p-5">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-left">{deckName}</h2>
        <ul className="space-y-4">
          {words.map((word) => (
            <WordItem
              key={word.id}
              word={word}
              onEditClick={() =>
                router.push(
                  `/word/edit/${word.id}?wordId=${word.id}&deckId=${deckId}`
                )
              }
            />
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          <Common.Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
        <button
          className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => router.push("/deck")}
        >
          Backward
        </button>
      </div>
    </div>
  );
};

export default WordList;
