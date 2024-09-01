"use client";
import React from "react";
import * as Quiz from "../../../features/routes/quiz/index";
import { useParams, useSearchParams } from "next/navigation";

const QuizPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const deckId = Array.isArray(params.deckId)
    ? params.deckId[0]
    : params.deckId;
  const isExtraQuiz = searchParams.get("isExtraQuiz") === "true";

  return (
    <div>
      <Quiz.QuizCard deckId={deckId} isExtraQuiz={isExtraQuiz} />
    </div>
  );
};

export default QuizPage;
