"use client";
import React, { useState } from "react";
import { Quiz } from "../types/quiz";
import { submitAnswer } from "../utils/api";
import Image from "next/image";
import { HiArrowCircleRight } from "react-icons/hi";
import { GiSpeaker } from "react-icons/gi";
import NoIdeaButton from "./NoIdeaButton";
import GotItButton from "./GotItButton";
import { useRouter } from "next/navigation";

export interface QuizCardProps {
  deckId: number;
  isExtraQuiz?: boolean;
  quizData: Quiz;
}

const formatImageUrl = (url: string) => {
  const fileName = url.split("/").pop();
  return `/images/testImages/${fileName}`;
};

const QuizCard: React.FC<QuizCardProps> = ({
  deckId,
  isExtraQuiz,
  quizData,
}) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [isArrowActive, setIsArrowActive] = useState(false);
  const [arrowColor, setArrowColor] = useState("text-gray-800");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const router = useRouter();

  const handleKnowClick = () => {
    setShowTranslation(true);
    setArrowColor("text-green-700");
    setIsArrowActive(true);
    setIsCorrect(true);
  };

  const handleDontKnowClick = () => {
    setShowTranslation(true);
    setArrowColor("text-red-700");
    setIsArrowActive(true);
    setIsCorrect(false);
  };

  const handleNextClick = async () => {
    if (isCorrect !== null) {
      await submitAnswer(deckId, quizData.id, isCorrect, !!isExtraQuiz);
      setShowTranslation(false);
      setIsArrowActive(false);
      setArrowColor("text-gray-800");
      setIsCorrect(null);
      router.refresh();
    }
  };

  const handleSpeakClick = () => {
    const utterance = new SpeechSynthesisUtterance(quizData.originalText);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-full ">
      {/* 問題文 */}
      <p
        className="text-xl font-bold text-left ml-4"
        dangerouslySetInnerHTML={{
          __html: quizData.originalText || "",
        }}
      ></p>
      <div>
        <div className="flex flex-col min-h-[500px]">
          {showTranslation && (
            <div>
              {/* 翻訳 */}
              <p
                className="text-lg text-left text-gray-700 font-semibold mb-6 ml-4"
                dangerouslySetInnerHTML={{
                  __html: quizData.translatedText || "",
                }}
              ></p>

              {/* ニュアンス */}
              <p className="text-xs text-left text-gray-700 mb-6 ml-4">
                {quizData.nuanceText || ""}
              </p>

              {/* 画像 */}
              <div className="flex justify-center mb-6">
                <Image
                  src={formatImageUrl(quizData.imageUrl)}
                  alt="Word Image"
                  width={300}
                  height={300}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="max-w-md mx-auto relative mb-4">
            <div className="flex justify-end ml-48 md:ml-64">
              <div className="mr-1">
                {/* スピーカー */}
                <GiSpeaker
                  onClick={handleSpeakClick}
                  className="text-5xl cursor-pointer text-gray-800"
                />
              </div>
              <div className="ml-1">
                {/* 矢印ボタン */}
                <HiArrowCircleRight
                  onClick={isArrowActive ? handleNextClick : undefined}
                  className={`text-5xl cursor-pointer ${arrowColor} ${isArrowActive ? "" : "opacity-50 cursor-not-allowed"}`}
                />
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between">
              <div className="mr-1">
                {/* No Idea ボタン */}
                <NoIdeaButton onClick={handleDontKnowClick} />
              </div>
              <div className="ml-2">
                {/* Got It ボタン */}
                <GotItButton onClick={handleKnowClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
