import React, { Suspense } from "react";

import { cookies } from "next/headers";
import Pagination from "../../../../features/common/components/Pagination";
import { EmptyList } from "../../../../features/common";
import DeckItem from "../../../../features/routes/deck/components/DeckItem";
import {
  DeckInfo,
  DeckList,
} from "../../../../features/routes/deck/types/deck";
import LoadingIndicator from "../../../../features/common/components/LoadingIndicator";
import { fetchDecks } from "../../../../features/routes/deck/utils/api";

interface DeckListProps {
  params: { pageNo: string };
}

const DeckListPage = async ({ params }: DeckListProps) => {
  // ページ番号を取得
  const currentPage = parseInt(params.pageNo) || 1;

  // クッキーからJWTを取得
  const cookieStore = cookies();
  const jwt = cookieStore.get("JWT")?.value || "";

  // デッキ一覧を取得
  const deckList: DeckList = await fetchDecks(currentPage - 1, 5, jwt);

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <div className="relative mt-1">
        <div className="max-w-2xl mx-auto p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-left">Deck List</h2>
          {deckList.deckInfo.length === 0 ? (
            <EmptyList
              message="No decks to display."
              buttonText="Add Deck"
              backUrl="/deck/page/1"
              forwardUrl="/deck/add"
            />
          ) : (
            <div>
              {deckList.deckInfo.map((deck: DeckInfo) => (
                <div key={deck.id} className="mb-4">
                  <DeckItem deck={deck} />
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(deckList.userDeckCount / 5)}
                paginateUrl="/deck/page"
              />
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default DeckListPage;
