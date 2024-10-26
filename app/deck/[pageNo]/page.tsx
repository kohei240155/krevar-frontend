import React from "react";
import { Deck } from "../../../features/routes/deck/types/deck";
import DeckItem from "../../../features/routes/deck/components/DeckItem";
import { BASE_URL } from "../../../utils/api/api";
import { cookies } from "next/headers";
import * as Common from "../../../features/common/index";
import Pagination from "../../../features/common/components/Pagination";

interface DeckListProps {
  params: { pageNo: string };
}

export const fetchDecks = async (page: number, size: number) => {
  const apiUrl = `${BASE_URL}/api/deck?page=${page}&size=${size}`;
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
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching decks:", error);
    return { deckInfo: [], totalDeckCount: 0 };
  }
};

const DeckList = async ({ params }: DeckListProps) => {
  const currentPage = parseInt(params.pageNo) || 1;
  const { deckInfo, totalDeckCount } = await fetchDecks(currentPage - 1, 5);

  return (
    <div className="relative p-5">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-left">Deck List</h2>
        {deckInfo && deckInfo.length === 0 ? (
          <Common.EmptyList
            message="No decks to display."
            buttonText="Add Deck"
            backUrl="/"
            forwardUrl="/deck/add"
          />
        ) : (
          <>
            {deckInfo.map((deck: Deck) => (
              <div key={deck.id} className="mb-4">
                <DeckItem deck={deck} />
              </div>
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalDeckCount / 5)}
              paginateUrl="/deck"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DeckList;
