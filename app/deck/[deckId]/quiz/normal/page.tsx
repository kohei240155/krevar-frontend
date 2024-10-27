"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LoadingIndicator } from "../../../../../features/common";
import { QuizCard } from "../../../../../features/routes/quiz";

const NormalQuizPage = () => {
  const { deckId } = useParams() as { deckId: string };
  const isExtraQuiz = false;

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId ? parseInt(storedUserId, 10) : 0);
  }, []);

  if (userId === null) {
    return <LoadingIndicator />; // userIdがロードされるまでの待機画面
  }

  return (
    <div>
      <QuizCard
        deckId={parseInt(deckId, 10)}
        isExtraQuiz={isExtraQuiz}
        userId={userId}
      />
    </div>
  );
};

export default NormalQuizPage;
