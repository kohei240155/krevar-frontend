"use client";
import React, { useEffect, useState } from "react";
import * as Quiz from "../../../../features/routes/quiz/index";
import { useParams, useSearchParams } from "next/navigation";
import * as Common from "../../../../features/common";
const QuizPage = () => {
  const { deckId } = useParams() as { deckId: string };
  const isExtraQuiz = false;

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId ? parseInt(storedUserId, 10) : 0);
  }, []);

  if (userId === null) {
    return <Common.LoadingIndicator />; // userIdがロードされるまでの待機画面
  }

  return (
    <div>
      <Quiz.QuizCard
        deckId={parseInt(deckId, 10)}
        isExtraQuiz={isExtraQuiz}
        userId={userId}
      />
    </div>
  );
};

export default QuizPage;
