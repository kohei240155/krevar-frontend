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

/**
 * デッキ一覧ページ
 * @param param0 ページ番号
 * @returns
 */
const DeckListPage = async ({ params }: DeckListProps) => {
  // ページ番号を取得
  const currentPage = parseInt(params.pageNo) || 1;

  // クッキーからJWTを取得
  const cookieStore = cookies();
  const jwt = cookieStore.get("JWT")?.value || "";

  // 1ページあたりの表示件数
  const DISPLAY_ITEMS_PER_PAGE = 10;

  // ページ番号を1ページ目からのインデックスに変換
  const pageIndex = currentPage - 1;

  // デッキ一覧を取得
  const deckList: DeckList = await fetchDecks(
    pageIndex,
    DISPLAY_ITEMS_PER_PAGE,
    jwt
  );

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <div className="relative mt-1">
        <div className="max-w-2xl mx-auto p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-left">Deck List</h2>
          {/* デッキリストが空の場合*/}
          {deckList.deckInfo.length === 0 ? (
            <EmptyList
              message="No decks to display."
              buttonText="Add Deck"
              backUrl="/deck/page/1"
              forwardUrl="/deck/add"
            />
          ) : (
            <div>
              {/* デッキリスト */}
              {deckList.deckInfo.map((deck: DeckInfo) => (
                <div key={deck.id} className="mb-4">
                  <DeckItem deck={deck} />
                </div>
              ))}
              {/* ページネーション */}
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  deckList.userDeckCount / DISPLAY_ITEMS_PER_PAGE
                )}
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
