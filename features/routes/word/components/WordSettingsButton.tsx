"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface WordSettingsButtonProps {
  wordId: string;
  deckId: string;
}

const WordSettingsButton: React.FC<WordSettingsButtonProps> = ({
  wordId,
  deckId,
}) => {
  const router = useRouter();
  return (
    <button
      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
      onClick={() => router.push(`/deck/${deckId}/word/${wordId}`)}
    >
      Edit
    </button>
  );
};

export default WordSettingsButton;
