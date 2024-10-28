import React from "react";
import { cookies } from "next/headers";
import { QuizInfo } from "../../../../../features/routes/quiz/types/quiz";
import { fetchQuizData } from "../../../../../features/routes/quiz/utils/api";
import AllDoneCard from "../../../../../features/routes/quiz/components/AllDoneCard";
import { QuizCard } from "../../../../../features/routes/quiz";

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
      />
    );
  }

  return (
    <div className="p-5">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col h-[750px]">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-4 pb-1 border-b border-gray-700">
          {/* デッキ名 */}
          <h2 className="text-2xl font-bold text-left ml-4 truncate">
            {data.deckName}
          </h2>
          {/* 残りの問題数 */}
          <p className="text-gray-700 text-right mr-4 lg:mr-8 whitespace-nowrap">{`Left: ${data.quizData?.leftQuizCount}`}</p>
        </div>

        <QuizCard
          deckId={deckId}
          quizData={data.quizData}
          isExtraQuiz={false}
        />
      </div>
    </div>
  );
};

export default QuizPage;
