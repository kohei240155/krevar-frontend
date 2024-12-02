"use client";
import React, { useState } from "react";
import DeckOptions from "./DeckOptions";
import { DeckInfo } from "../types/deck";

interface DeckSettingsButtonProps {
  deck: DeckInfo;
}

const DeckSettingsButton: React.FC<DeckSettingsButtonProps> = ({ deck }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleDeckSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleCloseOptions = () => {
    setIsOptionsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleDeckSettingsClick}
        className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-400 transition"
      >
        &#8230;
      </button>
      {isOptionsOpen && (
        <DeckOptions deck={deck} onClose={handleCloseOptions} />
      )}
    </div>
  );
};

export default DeckSettingsButton;
