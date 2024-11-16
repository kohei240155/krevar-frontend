import React from "react";
import { cookies } from "next/headers";
import { QuizInfo } from "../../../../../features/routes/quiz/types/quiz";
import { fetchQuizData } from "../../../../../features/routes/quiz/utils/api";
import AllDoneCard from "../../../../../features/routes/quiz/components/AllDoneCard";
import QuizMainContent from "../../../../../features/routes/quiz/components/QuizMainContent";
import QuizHeaderContent from "../../../../../features/routes/quiz/components/QuizHeaderContent";
import { LoadingIndicator } from "../../../../../features/common";
import { Suspense } from "react";

interface QuizPageProps {
  params: { deckId: string };
}

const QuizPage: React.FC<QuizPageProps> = async ({ params }) => {
  const deckId = parseInt(params.deckId, 10);
  const cookieStore = cookies();
  const jwt = cookieStore.get("JWT")?.value || "";
  const data: QuizInfo = await fetchQuizData(deckId, false, jwt);

  if (data.leftQuizCount === 0) {
    return (
      <AllDoneCard
        deckName={data.deckName}
        isExtraQuiz={false}
        quizData={data}
        deckId={deckId}
        jwt={jwt}
      />
    );
  }

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <div className="p-5">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col h-[750px]">
          <QuizHeaderContent
            deckName={data.deckName}
            leftQuizCount={data.quizData?.leftQuizCount}
          />
          <QuizMainContent
            deckId={deckId}
            quizData={data.quizData}
            isExtraQuiz={false}
            jwt={jwt}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default QuizPage;
