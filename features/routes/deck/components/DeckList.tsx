"use client";
import { useState } from "react";
import * as Common from "../../../common/index";
import { useRouter } from "next/navigation";
import DeckItem from "./DeckItem";
import { Deck } from "../types/deck";

interface DeckListProps {
  data: Deck[];
}

const DeckList = ({ data }: DeckListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const handleQuizClick = (deckId: number, deckName: string) => {
    setIsLoading(true);
    router.push(`/quiz/normal/${deckId}`);
  };

  const handleOptionClick = (e: React.MouseEvent, deckId: number) => {
    e.stopPropagation();
    setShowOptions(deckId === showOptions ? null : deckId);
  };

  // if (isLoading) {
  //   return <Common.LoadingIndicator />;
  // }

  if (data.length === 0) {
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

  return (
    <div>
      <ul>
        {data.map((deck: Deck) => (
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
    </div>
  );
};

export default DeckList;
