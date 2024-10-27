"use client";
import React, { useEffect, useState, useCallback } from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import { GiSpeaker } from "react-icons/gi";
import Image from "next/image";
import { Quiz } from "../../../../../features/routes/quiz/types/quiz";
import { LoadingIndicator } from "../../../../../features/common";
import AllDoneCard from "../../../../../features/routes/quiz/components/AllDoneCard";
import {
  fetchQuizData,
  submitAnswer,
  resetQuizApi,
} from "../../../../../features/routes/quiz/utils/api";
import NoIdeaButton from "../../../../../features/routes/quiz/components/NoIdeaButton";
import GotItButton from "../../../../../features/routes/quiz/components/GotItButton";

export interface QuizCardProps {
  deckId: number;
  isExtraQuiz?: boolean;
}

const formatImageUrl = (url: string) => {
  const fileName = url.split("/").pop();
  return `/images/testImages/${fileName}`;
};

const QuizCard: React.FC<QuizCardProps> = ({ deckId, isExtraQuiz }) => {
  const searchParams = useSearchParams();
  const deckName = searchParams?.get("deckName") || "Deck Name";

  const [quizState, setQuizState] = useState<Quiz>({
    showTranslation: false,
    arrowColor: "text-gray-800",
    isArrowActive: false,
    isCorrect: null,
    isAllDone: false,
    isLoading: true,
    isResetting: false,
    quizData: undefined,
  });

  const fetchData = useCallback(async () => {
    const data = await fetchQuizData(deckId, !!isExtraQuiz);
    setQuizState((prev) => ({
      ...prev,
      quizData: data,
      isLoading: false,
      isAllDone: data.leftQuizCount === 0,
    }));
  }, [deckId, isExtraQuiz]);

  const resetQuiz = useCallback(async () => {
    setQuizState((prev) => ({ ...prev, isLoading: true, isResetting: true }));
    const data = await resetQuizApi(deckId);
    setQuizState((prev) => ({
      ...prev,
      quizData: data,
      isLoading: false,
      isResetting: false,
    }));
    fetchData();
  }, [deckId, fetchData]);

  useEffect(() => {
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
      await submitAnswer(deckId, quizData.id, isCorrect, !!isExtraQuiz);
      const data = await fetchQuizData(deckId, !!isExtraQuiz);
      setQuizState((prev) => ({
        ...prev,
        quizData: data,
        isLoading: false,
        isArrowActive: false,
        arrowColor: "text-gray-800",
        isAllDone: data.leftQuizCount === 0,
        showTranslation: false,
        isCorrect: null,
        isResetting: false,
      }));
    }
  }, [quizState, deckId, isExtraQuiz]);

  const handleSpeakClick = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(
      quizState.quizData?.originalText
    );
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }, [quizState.quizData]);

  if (quizState.isLoading) {
    return <LoadingIndicator />;
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
            className={`flex justify-between items-center mb-4 pb-1 border-b border-gray-700`}
          >
            <h2 className="text-2xl font-bold text-left ml-4 truncate">
              {deckName}
            </h2>
            <p className="text-gray-700 text-right mr-4 lg:mr-8 whitespace-nowrap">{`Left: ${quizState.quizData?.leftQuizCount}`}</p>
          </div>
          {quizState.quizData && (
            <p
              className="text-xl font-bold mb-6 text-left ml-4"
              dangerouslySetInnerHTML={{
                __html: quizState.quizData?.originalText || "",
              }}
            ></p>
          )}

          {quizState.showTranslation && quizState.quizData && (
            <p
              className="text-lg text-left text-gray-700 font-semibold mb-6 ml-4"
              dangerouslySetInnerHTML={{
                __html: quizState.quizData?.translatedText,
              }}
            ></p>
          )}

          {quizState.showTranslation && quizState.quizData && (
            <>
              <p className="text-xs text-left text-gray-700 mb-6 ml-4">
                {quizState.quizData.nuanceText}
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
          <NoIdeaButton onClick={handleDontKnowClick} />
          <div className="relative">
            <GotItButton onClick={handleKnowClick} />
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
