import React from "react";
import { useRouter } from "next/navigation";
import { AllDoneCardProps } from "../types/quiz";

const AllDoneCard: React.FC<AllDoneCardProps> = ({
  deckName,
  isExtraQuiz,
  quizData,
  setIsAllDone,
  setIsLoading,
  resetQuiz,
}) => {
  const router = useRouter();

  return (
    <div className="p-5">
      <div
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col justify-between"
        style={{ minHeight: "550px" }}
      >
        <div className="flex-grow">
          <div
            className={`flex justify-between items-center mb-4 pb-1 ${isExtraQuiz ? "border-b border-blue-700" : "border-b border-gray-700"}`}
          >
            <h2 className="text-2xl font-bold text-left ml-4 truncate">
              {deckName}
            </h2>
            <p className="text-gray-700 text-right mr-4 lg:mr-8 whitespace-nowrap">{`Left: ${quizData?.leftQuizCount}`}</p>
          </div>
          <p
            className={`text-blue-800 text-center mt-4 text-3xl font-bold ${isExtraQuiz ? "text-blue-800" : "text-blue-800"}`}
          >
            All done!
          </p>
        </div>
        <div className="flex flex-col justify-center mt-4 space-y-4">
          {isExtraQuiz && (
            <button
              type="button"
              onClick={async () => {
                setIsAllDone(false);
                setIsLoading(true);
                await resetQuiz();
              }}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push("/deck")}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Decks
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllDoneCard;
