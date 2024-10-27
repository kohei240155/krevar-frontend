"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Deck } from "../types/deck";
import DeckOptions from "./DeckOptions";
import { useState } from "react";

interface DeckSettingsButtonProps {
  deck: Deck;
}

const DeckSettingsButton: React.FC<DeckSettingsButtonProps> = ({ deck }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleDeckSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOptionsOpen(!isOptionsOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={handleDeckSettingsClick}
        className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-400 transition"
      >
        &#8230;
      </button>
      {isOptionsOpen && <DeckOptions deck={deck} />}
    </div>
  );
};

export default DeckSettingsButton;
