"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface QuizButtonProps {
  deckId: string;
}

const QuizButton: React.FC<QuizButtonProps> = ({ deckId }) => {
  const router = useRouter();

  return (
    <button
      className="px-4 py-2 bg-gray-700 text-white rounded-md transition hover:bg-gray-800"
      onClick={() => router.push(`/deck/${deckId}/quiz/normal`)}
    >
      Quiz
    </button>
  );
};

export default QuizButton;
