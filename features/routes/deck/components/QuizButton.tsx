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
      className="px-4 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700"
      onClick={() => router.push(`/quiz/normal/${deckId}`)}
    >
      Quiz
    </button>
  );
};

export default QuizButton;
