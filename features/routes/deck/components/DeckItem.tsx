import React from "react";
import { Deck } from "../types/deck";
import QuizButton from "./QuizButton";
import DeckSettingsButton from "./DeckSettingsButton";

export interface DeckItemProps {
  deck: Deck;
}

const DeckItem: React.FC<DeckItemProps> = ({ deck }) => {
  const truncateDeckName = (name: string) => {
    if (!name) return "";
    return name.length > 20 ? name.substring(0, 20) + "..." : name;
  };

  return (
    <li
      className="relative flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-lg shadow-md space-y-2 md:space-y-0 md:space-x-4 deck-list-item"
      style={{
        height: "auto",
        minHeight: "120px",
        position: "relative",
        border: "1px solid #e0e0e0",
      }}
    >
      <div
        className="absolute left-0 w-1 bg-gray-500"
        style={{
          height: "95%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>
      <div className="flex flex-col space-y-1 deck-info ml-2">
        <span className="text-xl font-medium">
          {truncateDeckName(deck.deckName)}
        </span>
        <span className="text-lg text-gray-600">Left: {deck.progress}</span>
      </div>
      <div className="flex items-center space-x-4 mt-4 ml-2 md:mt-0 deck-actions">
        <QuizButton deckId={deck.id.toString()} />
        <DeckSettingsButton deck={deck} />
      </div>
    </li>
  );
};

export default DeckItem;
