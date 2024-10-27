import React, { Suspense } from "react";

import { cookies } from "next/headers";
import Pagination from "../../../../features/common/components/Pagination";
import { EmptyList } from "../../../../features/common";
import DeckItem from "../../../../features/routes/deck/components/DeckItem";
import { Deck, DeckInfo } from "../../../../features/routes/deck/types/deck";
import LoadingIndicator from "../../../../features/common/components/LoadingIndicator";
import { fetchDecks } from "../../../../features/routes/deck/utils/api";

interface DeckListProps {
  params: { pageNo: string };
}

const DeckListPage = async ({ params }: DeckListProps) => {
  const currentPage = parseInt(params.pageNo) || 1;
  const cookieStore = cookies();
  const jwt = cookieStore.get("JWT")?.value || "";
  const data: DeckInfo = await fetchDecks(currentPage - 1, 5, jwt);

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <div className="relative p-5">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-left">Deck List</h2>
          {data.deckInfo.length === 0 ? (
            <EmptyList
              message="No decks to display."
              buttonText="Add Deck"
              backUrl="/"
              forwardUrl="/deck/add"
            />
          ) : (
            <>
              {data.deckInfo.map((deck: Deck) => (
                <div key={deck.id} className="mb-4">
                  <DeckItem deck={deck} />
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(data.totalDeckCount / 5)}
                paginateUrl="/deck/page"
              />
            </>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default DeckListPage;
