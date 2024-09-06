import React from "react";
import DeckOptions from "./DeckOptions";
import { DeckItemProps } from "../types/deck";

const DeckItem: React.FC<DeckItemProps> = ({
  deck,
  showOptions,
  onQuizClick,
  onOptionClick,
  onOptionItemClick,
  progress,
}) => {
  const truncateDeckName = (name: string) => {
    if (!name) return "";
    return name.length > 20 ? name.substring(0, 20) + "..." : name;
  };

  return (
    <li className="relative flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-lg shadow space-y-2 md:space-y-0 md:space-x-4 deck-list-item">
      <div className="flex flex-col space-y-1 deck-info">
        <span className="text-xl font-medium">
          {truncateDeckName(deck.deckName)}
        </span>
        <span className="text-lg text-gray-600">Left: {progress}</span>
      </div>
      <div className="flex items-center space-x-4 mt-4 md:mt-0 deck-actions">
        <button
          onClick={() => onQuizClick(deck.id, deck.deckName)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700"
        >
          Quiz
        </button>
        <button
          onClick={(e) => onOptionClick(e, deck.id)}
          className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-400 transition"
        >
          &#8230;
        </button>
      </div>
      {showOptions === deck.id && (
        <DeckOptions deck={deck} onOptionItemClick={onOptionItemClick} />
      )}
    </li>
  );
};

export default DeckItem;
