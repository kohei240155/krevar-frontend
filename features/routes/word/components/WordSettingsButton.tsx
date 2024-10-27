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
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      onClick={() => router.push(`/deck/${deckId}/word/${wordId}`)}
    >
      Edit
    </button>
  );
};

export default WordSettingsButton;
