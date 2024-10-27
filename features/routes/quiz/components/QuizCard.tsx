// features/routes/quiz/components/QuizCard.tsx
"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Quiz } from "../types/quiz";
import { fetchQuizData, resetQuizApi, submitAnswer } from "../utils/api";
import { LoadingIndicator } from "../../../common";
import AllDoneCard from "./AllDoneCard";
import Image from "next/image";
import { HiArrowCircleRight } from "react-icons/hi";
import { GiSpeaker } from "react-icons/gi";
import NoIdeaButton from "./NoIdeaButton";
import GotItButton from "./GotItButton";

export interface QuizCardProps {
  deckId: number;
  isExtraQuiz?: boolean;
  initialData: Quiz;
}

const formatImageUrl = (url: string) => {
  const fileName = url.split("/").pop();
  return `/images/testImages/${fileName}`;
};

const QuizCard: React.FC<QuizCardProps> = ({
  deckId,
  isExtraQuiz,
  initialData,
}) => {
  const [quizState, setQuizState] = useState<Quiz>({
    ...initialData,
    isLoading: false,
    isResetting: false,
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
    setQuizState((prev) => ({
      ...prev,
      quizData: initialData.quizData,
    }));
    if (!initialData.quizData) fetchData();
  }, [fetchData, initialData]);

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
        deckName={quizState.deckName}
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
        style={{ minHeight: "750px" }}
      >
        <div className="flex-grow">
          {/* ヘッダー */}
          <div
            className={`flex justify-between items-center mb-4 pb-1 border-b border-gray-700`}
          >
            {/* デッキ名 */}
            <h2 className="text-2xl font-bold text-left ml-4 truncate">
              {quizState.deckName}
            </h2>
            {/* 残りの問題数 */}
            <p className="text-gray-700 text-right mr-4 lg:mr-8 whitespace-nowrap">{`Left: ${quizState.quizData?.leftQuizCount}`}</p>
          </div>

          {quizState.quizData && (
            // 原文
            <p
              className="text-xl font-bold mb-6 text-left ml-4"
              dangerouslySetInnerHTML={{
                __html: quizState.quizData?.originalText || "",
              }}
            ></p>
          )}

          {quizState.showTranslation && quizState.quizData && (
            // 翻訳
            <p
              className="text-lg text-left text-gray-700 font-semibold mb-6 ml-4"
              dangerouslySetInnerHTML={{
                __html: quizState.quizData?.translatedText,
              }}
            ></p>
          )}

          {quizState.showTranslation && quizState.quizData && (
            <div>
              {/* ニュアンス */}
              <p className="text-xs text-left text-gray-700 mb-6 ml-4">
                {quizState.quizData.nuanceText}
              </p>
              {/* 画像 */}
              <div className="flex justify-center mb-6">
                <Image
                  src={formatImageUrl(quizState.quizData.imageUrl)}
                  alt="Word Image"
                  width={300}
                  height={300}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>

        <div className="max-w-md mx-auto relative mb-4">
          <div className="flex justify-end ml-48 md:ml-64">
            <div className="mr-1">
              {/* スピーカーボタン */}
              <GiSpeaker
                onClick={handleSpeakClick}
                className="text-5xl cursor-pointer text-gray-800"
              />
            </div>
            <div className="ml-1">
              {/* 矢印ボタン */}
              <HiArrowCircleRight
                onClick={quizState.isArrowActive ? handleNextClick : undefined}
                className={`text-5xl cursor-pointer ${quizState.arrowColor} ${quizState.isArrowActive ? "" : "opacity-50 cursor-not-allowed"}`}
              />
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex justify-between">
            <div className="mr-2">
              {/* 知らないボタン */}
              <NoIdeaButton onClick={handleDontKnowClick} />
            </div>
            <div className="ml-2">
              {/* 知っているボタン */}
              <GotItButton onClick={handleKnowClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
