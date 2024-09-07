"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Word } from "../types/word";
import WordItem from "./WordItem";
import * as Common from "../../../common/index";

const WordList = ({ deckName }: { deckName: string }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalWords, setTotalWords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = searchParams?.get("deckId") || "";
  const userId = searchParams?.get("userId") || "4";
  const wordsPerPage = 10;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchWords(pageNumber);
  };

  const totalPages = Math.ceil(totalWords / wordsPerPage);

  const fetchWords = useCallback(
    (page: number) => {
      fetch(
        `http://localhost:8080/api/word/list/${userId}/${deckId}?page=${page - 1}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch words");
          }
          return response.json();
        })
        .then((data) => {
          setWords(data.wordInfo);
          setTotalWords(data.wordInfo.length);
        })
        .catch((error) => {
          console.log("Error fetching words:", error);
        });
    },
    [userId, deckId]
  );

  useEffect(() => {
    fetchWords(currentPage);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPage, fetchWords]);

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
    <div className="p-5" style={{ backgroundColor: "#f3f2ff" }}>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-left">{deckName}</h2>
        <ul className="space-y-4">
          {words.map((word) => (
            <WordItem
              key={word.id}
              word={word}
              onEditClick={() =>
                router.push(`/word/edit/${word.id}?wordId=${word.id}`)
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
