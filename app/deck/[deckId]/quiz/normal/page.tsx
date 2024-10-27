import React from "react";
import QuizCard from "../../../../../features/routes/quiz/components/QuizCard";
import { fetchQuizData } from "../../../../../features/routes/quiz/utils/api";

interface QuizPageProps {
  params: { deckId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const QuizPage = async ({ params, searchParams }: QuizPageProps) => {
  const deckId = parseInt(params.deckId, 10);
  const deckName =
    (typeof searchParams.deckName === "string"
      ? searchParams.deckName
      : "Deck Name") || "Deck Name";
  const initialData = await fetchQuizData(deckId, false);
  console.log(initialData);

  return <QuizCard deckId={deckId} initialData={initialData} />;
};

export default QuizPage;
