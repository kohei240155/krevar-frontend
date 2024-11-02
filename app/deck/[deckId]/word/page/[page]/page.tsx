import React, { Suspense } from "react";

import { cookies } from "next/headers";
import {
  Word,
  WordInfo,
} from "../../../../../../features/routes/word/types/word";
import BackwardButton from "../../../../../../features/common/components/BackwardButton";
import {
  EmptyList,
  LoadingIndicator,
  Pagination,
} from "../../../../../../features/common";
import WordItem from "../../../../../../features/routes/word/components/WordItem";
import ForwardButton from "../../../../../../features/routes/word/components/ForwardButton";
import { fetchWords } from "../../../../../../features/routes/word/utils/api";

interface WordListProps {
  params: { deckId: string; page: string };
}

const WordListPage = async ({ params }: WordListProps) => {
  const deckId = parseInt(params.deckId);
  const currentPage = parseInt(params.page) || 1;
  const cookieStore = cookies();
  const jwt = cookieStore.get("JWT")?.value || "";
  const data: WordInfo = await fetchWords(deckId, currentPage - 1, 5, jwt);
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <div className="relative mt-1">
        <div className="max-w-2xl mx-auto p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-left">{data.deckName}</h2>
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
    </Suspense>
  );
};

export default WordListPage;
