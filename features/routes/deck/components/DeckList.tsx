"use client";
import { useEffect, useState } from "react";
import * as Common from "../../../common/index";
import { useRouter } from "next/navigation";
import DeckItem from "./DeckItem";
import { Deck } from "../types/deck";
import { fetchDecks } from "../utils/api";

const DeckList = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [showOptions, setShowOptions] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDecks, setTotalDecks] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [userId, setUserId] = useState<number>(8);
  const decksPerPage = 10;

  const fetchDecksData = async (page: number, userId: number) => {
    const data = await fetchDecks(userId, page - 1, decksPerPage);
    if (data) {
      const formattedDecks = data.deckInfo.map((item: any) => ({
        id: item.id,
        deckName: item.deckName,
        progress: item.progress,
      }));
      setDecks(formattedDecks);
      setTotalDecks(data.deckInfo.length);
    } else {
      console.log("Error fetching decks");
    }
  };

  useEffect(() => {
    fetchDecksData(currentPage, userId);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPage, userId]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchDecksData(pageNumber, userId);
  };

  const totalPages = Math.ceil(totalDecks / decksPerPage);

  const handleQuizClick = (deckId: number, deckName: string) => {
    setIsLoading(true);
    router.push(`/quiz/normal/${deckId}`);
  };

  const handleOptionClick = (e: React.MouseEvent, deckId: number) => {
    e.stopPropagation();
    setShowOptions(deckId === showOptions ? null : deckId);
  };

  if (isLoading) {
    return <Common.LoadingIndicator />;
  }

  if (decks.length === 0 && !isLoading) {
    return (
      <Common.EmptyList
        title="Deck List"
        message="No decks to display."
        buttonText="Add Deck"
        buttonAction={() => router.push("/deck/add")}
        backButtonAction={() => router.push("/deck")}
      />
    );
  }

  const handleOptionItemClick = (
    e: React.MouseEvent,
    option: string,
    deck: Deck
  ) => {
    e.stopPropagation();
    setIsLoading(true); // ローディング状態を設定
    switch (option) {
      case "word-add":
        router.push(
          `/word/add?deckId=${deck.id}&deckName=${encodeURIComponent(deck.deckName)}`
        );
        break;
      case "word-list":
        router.push(
          `/word/list?deckId=${deck.id}&deckName=${encodeURIComponent(deck.deckName)}`
        );
        break;
      case "deck-settings":
        router.push(`/deck/edit/${deck.id}`);
        break;
      case "extra-quiz":
        router.push(`/quiz/extra/${deck.id}`);
        break;
      default:
        setIsLoading(false); // 無効なオプションの場合、ローディングを解除
        break;
    }
  };

  return (
    <div className="relative p-5">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-left">Deck List</h2>
        <ul className="space-y-4">
          {decks.map((deck) => (
            <DeckItem
              key={deck.id}
              deck={deck}
              showOptions={showOptions}
              onQuizClick={handleQuizClick}
              onOptionClick={handleOptionClick}
              onOptionItemClick={handleOptionItemClick}
              progress={deck.progress}
            />
          ))}
        </ul>
        <Common.Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default DeckList;
