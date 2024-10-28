import React from "react";
import { fetchQuizData } from "../../../../../features/routes/quiz/utils/api";
import { cookies } from "next/headers";
import { QuizInfo } from "../../../../../features/routes/quiz/types/quiz";
import AllDoneCard from "../../../../../features/routes/quiz/components/AllDoneCard";
import QuizHeaderContent from "../../../../../features/routes/quiz/components/QuizHeaderContent";
import QuizMainContent from "../../../../../features/routes/quiz/components/QuizMainContent";

interface QuizPageProps {
  params: { deckId: string };
}

const QuizPage: React.FC<QuizPageProps> = async ({ params }) => {
  const deckId = parseInt(params.deckId, 10);
  const cookieStore = cookies();
  const jwt = cookieStore.get("JWT")?.value || "";
  const data: QuizInfo = await fetchQuizData(deckId, true, jwt);
  const isExtraQuiz = true;

  if (data.leftQuizCount === 0) {
    return (
      <AllDoneCard
        deckName={data.deckName}
        isExtraQuiz={isExtraQuiz}
        quizData={data}
        deckId={deckId}
      />
    );
  }

  return (
    <div className="p-5">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col h-[750px]">
        <QuizHeaderContent
          deckName={data.deckName}
          leftQuizCount={data.quizData?.leftQuizCount}
        />
        <QuizMainContent
          deckId={deckId}
          quizData={data.quizData}
          isExtraQuiz={isExtraQuiz}
        />
      </div>
    </div>
  );
};

export default QuizPage;
