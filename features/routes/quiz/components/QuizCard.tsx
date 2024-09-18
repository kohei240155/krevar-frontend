import React, { useEffect, useState, useCallback } from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import { GiSpeaker } from "react-icons/gi";
import Image from "next/image";
import { QuizCardProps, QuizData } from "../types/quiz";
import * as Common from "../../../common/index";
import AllDoneCard from "./AllDoneCard";
import { fetchQuizData, submitAnswer, resetQuizApi } from "../utils/api";

const formatImageUrl = (url: string) => {
  const fileName = url.split("/").pop();
  return `/images/testImages/${fileName}`;
};

const QuizCard: React.FC<QuizCardProps> = ({ deckId, isExtraQuiz }) => {
  const searchParams = useSearchParams();
  const deckName = searchParams?.get("deckName") || "Deck Name";

  const [quizState, setQuizState] = useState({
    showTranslation: false,
    arrowColor: "text-gray-800",
    isArrowActive: false,
    isCorrect: null as boolean | null,
    isAllDone: false,
    isLoading: true,
    isResetting: false,
    quizData: undefined as QuizData | undefined,
  });

  const getUserId = () => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId ? parseInt(storedUserId, 10) : 0;
  };

  const [userId, setUserId] = useState(getUserId());

  const fetchData = useCallback(async () => {
    const data = await fetchQuizData(deckId, userId, !!isExtraQuiz);
    setQuizState((prev) => ({
      ...prev,
      quizData: data,
      isLoading: false,
      isAllDone: data.leftQuizCount === 0,
    }));
  }, [deckId, isExtraQuiz, userId]);

  const resetQuiz = useCallback(async () => {
    setQuizState((prev) => ({ ...prev, isLoading: true, isResetting: true }));
    const data = await resetQuizApi(userId, deckId);
    setQuizState((prev) => ({
      ...prev,
      quizData: data,
      isLoading: false,
      isResetting: false,
    }));
    fetchData();
  }, [deckId, userId, fetchData]);

  useEffect(() => {
    setUserId(getUserId());
    fetchData();
  }, [fetchData]);

  const handleKnowClick = useCallback(() => {
    setQuizState((prev) => ({
      ...prev,
      showTranslation: true,
      arrowColor: "text-green-700",
      isArrowActive: true,
      isCorrect: true,
    }));
  }, []);

  const handleDontKnowClick = useCallback(() => {
    setQuizState((prev) => ({
      ...prev,
      showTranslation: true,
      arrowColor: "text-red-700",
      isArrowActive: true,
      isCorrect: false,
    }));
  }, []);

  const handleNextClick = useCallback(async () => {
    const { isCorrect, quizData } = quizState;
    if (isCorrect !== null && quizData) {
      await submitAnswer(userId, deckId, quizData.id, isCorrect, !!isExtraQuiz);
      const data = await fetchQuizData(deckId, userId, !!isExtraQuiz);
      setQuizState((prev) => ({
        ...prev,
        quizData: data,
        isLoading: false,
        isArrowActive: false,
        arrowColor: "text-gray-800",
        isAllDone: data.leftQuizCount === 0,
        showTranslation: false,
        isCorrect: null as boolean | null,
        isResetting: false,
      }));
    }
  }, [quizState, deckId, isExtraQuiz, userId]);

  const handleSpeakClick = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(
      quizState.quizData?.originalText
    );
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }, [quizState.quizData]);

  if (quizState.isLoading) {
    return <Common.LoadingIndicator />;
  }

  if (quizState.isAllDone) {
    return (
      <AllDoneCard
        deckName={deckName}
        isExtraQuiz={!!isExtraQuiz}
        quizData={quizState.quizData}
        setIsAllDone={(val) =>
          setQuizState((prev) => ({ ...prev, isAllDone: val }))
        }
        setIsLoading={(val) =>
          setQuizState((prev) => ({ ...prev, isLoading: val }))
        }
        resetQuiz={resetQuiz}
      />
    );
  }

  return (
    <div className="p-5">
      <div
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col justify-between"
        style={{ minHeight: "700px" }}
      >
        <div className="flex-grow">
          <div
            className={`flex justify-between items-center mb-4 pb-1 ${isExtraQuiz ? "border-b border-blue-700" : "border-b border-gray-700"}`}
          >
            <h2 className="text-2xl font-bold text-left ml-4 truncate">
              {deckName}
            </h2>
            <p className="text-gray-700 text-right mr-4 lg:mr-8 whitespace-nowrap">{`Left: ${quizState.quizData?.leftQuizCount}`}</p>
          </div>
          {quizState.quizData && (
            <p
              className="text-2xl font-bold mb-6 text-left ml-4"
              dangerouslySetInnerHTML={{
                __html: quizState.quizData?.originalText || "",
              }}
            ></p>
          )}

          {quizState.showTranslation && quizState.quizData && (
            <p
              className="text-xl text-left text-blue-700 font-semibold mb-6 ml-4"
              dangerouslySetInnerHTML={{
                __html: quizState.quizData?.translatedText,
              }}
            ></p>
          )}

          {quizState.showTranslation && quizState.quizData && (
            <>
              <p className="text-xl text-left text-gray-700 mb-6 ml-4">
                {quizState.quizData.nuance}
              </p>
              {quizState.quizData.imageUrl && (
                <div className="flex justify-center mb-6">
                  <Image
                    src={formatImageUrl(quizState.quizData.imageUrl)}
                    alt="Word Image"
                    width={300}
                    height={300}
                    className="max-w-full h-auto"
                  />
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex justify-center space-x-4 mt-11">
          <button
            onClick={handleDontKnowClick}
            className="w-40 px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-gray-100 transition"
          >
            No Idea
          </button>
          <div className="relative">
            <button
              onClick={handleKnowClick}
              className="w-40 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Got It
            </button>
            <GiSpeaker
              onClick={handleSpeakClick}
              className="absolute -top-16 right-14 text-5xl cursor-pointer text-gray-800"
            />
            <HiArrowCircleRight
              onClick={quizState.isArrowActive ? handleNextClick : undefined}
              className={`absolute -top-16 right-0 text-5xl cursor-pointer ${quizState.arrowColor} ${quizState.isArrowActive ? "" : "opacity-50 cursor-not-allowed"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
