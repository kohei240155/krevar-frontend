import React from "react";

import { BASE_URL } from "../../../../utils/api/api";
import { cookies } from "next/headers";
import Pagination from "../../../../features/common/components/Pagination";
import { redirect } from "next/navigation";
import { EmptyList } from "../../../../features/common";
import DeckItem from "../../../../features/routes/deck/components/DeckItem";
import { Deck, DeckInfo } from "../../../../features/routes/deck/types/deck";

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
      redirect("/login");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching decks:", error);
    redirect("/login");
  }
};

const DeckListPage = async ({ params }: DeckListProps) => {
  const currentPage = parseInt(params.pageNo) || 1;
  const data: DeckInfo = await fetchDecks(currentPage - 1, 5);

  return (
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
  );
};

export default DeckListPage;
