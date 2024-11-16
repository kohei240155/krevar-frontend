"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { QuizInfo } from "../types/quiz";
import { resetQuiz } from "../utils/api";

export interface AllDoneCardProps {
  quizData: QuizInfo;
  deckName: string;
  isExtraQuiz: boolean;
  deckId: number;
  jwt: string;
}

const AllDoneCard: React.FC<AllDoneCardProps> = ({
  deckName,
  isExtraQuiz,
  quizData,
  deckId,
  jwt,
}) => {
  const router = useRouter();

  return (
    <div className="p-5">
      <div
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col justify-between"
        style={{ minHeight: "750px" }}
      >
        <div className="flex-grow">
          <div
            className={`flex justify-between items-center mb-4 pb-1 border-b border-gray-700`}
          >
            <h2 className="text-2xl font-bold text-left ml-4 truncate">
              {deckName}
            </h2>
            <p className="text-gray-700 text-right mr-4 lg:mr-8 whitespace-nowrap">{`Left: ${quizData.leftQuizCount}`}</p>
          </div>
          <p className="text-gray-700 text-center mt-4 text-3xl font-bold">
            All done!
          </p>
        </div>
        <div className="flex flex-col justify-center mt-4 space-y-4">
          {isExtraQuiz && (
            <button
              type="button"
              onClick={async () => {
                await resetQuiz(deckId, jwt);
                router.refresh();
              }}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
            >
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push("/deck/page/1")}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Back to Decks
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllDoneCard;
