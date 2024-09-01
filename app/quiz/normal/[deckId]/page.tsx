"use client";
import React from "react";
import * as Quiz from "../../../../features/routes/quiz/index";
import { useParams, useSearchParams } from "next/navigation";

const QuizPage = () => {
  const { deckId } = useParams() as { deckId: string };
  const isExtraQuiz = false;

  return (
    <div>
      <Quiz.QuizCard deckId={deckId} isExtraQuiz={isExtraQuiz} />
    </div>
  );
};

export default QuizPage;
