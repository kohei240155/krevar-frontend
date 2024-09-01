"use client";
import { useEffect, useState } from "react";
import * as Common from "../../../common/components/index";
import { useRouter } from "next/navigation";
import DeckItem from "./DeckItem";
import { Deck } from "../types/deck";

const DeckList = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [showOptions, setShowOptions] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDecks, setTotalDecks] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const decksPerPage = 10;

  useEffect(() => {
    fetchDecks(currentPage);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchDecks(pageNumber);
  };

  const totalPages = Math.ceil(totalDecks / decksPerPage);

  const fetchDecks = (page: number) => {
    console.log("Fetching decks for page:", page);
    fetch(`http://localhost:8080/api/deck?page=${page - 1}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch decks");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        const formattedDecks = data.decks.map((item: any) => ({
          id: item.deck.id,
          deckName: item.deck.deckName,
          totalQuestions: item.totalQuestions,
        }));
        setDecks(formattedDecks);
        setTotalDecks(data.totalDecks);
      })
      .catch((error) => {
        console.log("Error fetching decks:", error);
      });
  };

  const handleQuizClick = (deckId: number, deckName: string) => {
    router.push(`/quiz/${deckId}?deckName=${encodeURIComponent(deckName)}`);
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
        buttonAction={() => router.push("/decks/new")}
        backButtonAction={() => router.push("/deck")}
      />
    );
  }

  const handleOptionItemClick = (
    e: React.MouseEvent,
    option: string,
    deck: Deck,
  ) => {
    e.stopPropagation();
    switch (option) {
      case "word-add":
        router.push(
          `/word/add?deckId=${deck.id}&deckName=${encodeURIComponent(deck.deckName)}`,
        );
        break;
      case "word-list":
        router.push(
          `/word/list?deckId=${deck.id}&deckName=${encodeURIComponent(deck.deckName)}`,
        );
        break;
      case "deck-settings":
        router.push(`/deck/edit/${deck.id}`);
        break;
      case "extra-quiz":
        router.push(`/quiz/${deck.id}?extra=true`);
        break;
      default:
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
