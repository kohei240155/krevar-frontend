import React from "react";

import { cookies } from "next/headers";
import { BASE_URL } from "../../../../../../utils/api/api";
import { redirect } from "next/navigation";
import {
  Word,
  WordInfo,
} from "../../../../../../features/routes/word/types/word";
import BackwardButton from "../../../../../../features/common/components/BackwardButton";
import { EmptyList, Pagination } from "../../../../../../features/common";
import WordItem from "../../../../../../features/routes/word/components/WordItem";
import ForwardButton from "../../../../../../features/routes/word/components/ForwardButton";

interface WordListProps {
  params: { deckId: string; page: string };
}

export const fetchWords = async (
  deckId: number,
  page: number,
  size: number
) => {
  const apiUrl = `${BASE_URL}/api/deck/${deckId}/words?page=${page}&size=${size}`;
  const cookieStore = cookies();
  const jwt = cookieStore.get("JWT")?.value;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching decks:", error);
    redirect("/login");
  }
};

const WordListPage = async ({ params }: WordListProps) => {
  const deckId = parseInt(params.deckId);
  const currentPage = parseInt(params.page) || 1;
  const data: WordInfo = await fetchWords(deckId, currentPage - 1, 5);
  return (
    <div>
      <div className="relative p-5">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-left">{data.deckName}</h2>
          {/* <p className="text-base mb-3 text-left">Deck: {data.deckName}</p> */}
          {data.wordInfo.length === 0 ? (
            <EmptyList
              message="No words to display."
              buttonText="Add Word"
              backUrl={`/deck/page/${currentPage}`}
              forwardUrl={`/deck/${deckId}/word/add`}
            />
          ) : (
            <>
              {data.wordInfo.map((word: Word) => (
                <div key={word.id} className="mb-4">
                  <WordItem word={word} deckId={deckId.toString()} />
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(data.totalWordCount / 5)}
                paginateUrl={`/deck/${deckId}/word/page`}
              />
              <div className="flex justify-between mt-4">
                <BackwardButton pageNumber={currentPage} />
                <ForwardButton
                  url={`/deck/${deckId}/word/add`}
                  label="Add Word"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordListPage;
