import React from "react";
import { DeckInfo } from "../types/deck";
import QuizButton from "./QuizButton";
import DeckSettingsButton from "./DeckSettingsButton";

export interface DeckItemProps {
  deck: DeckInfo;
}

const DeckItem: React.FC<DeckItemProps> = ({ deck }) => {
  return (
    <li
      className="relative rounded-lg flex flex-col md:flex-row justify-between items-center p-5 bg-white shadow-md space-y-2 md:space-y-0 md:space-x-4 deck-list-item"
      style={{
        height: "auto",
        minHeight: "125px",
        position: "relative",
        border: "1px solid #e0e0e0",
      }}
    >
      <div className="flex flex-col space-y-1 deck-info ml-2">
        <span
          className="text-xl font-medium"
          style={{ wordBreak: "break-word" }}
        >
          {deck.deckName}
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
