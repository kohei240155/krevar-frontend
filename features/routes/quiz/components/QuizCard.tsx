import React, { useEffect, useState, useCallback } from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import { GiSpeaker } from "react-icons/gi";
import Image from "next/image";
import { QuizCardProps, Word } from "../types/quiz";
import * as Common from "../../../common/index";
import AllDoneCard from "./AllDoneCard";

const formatImageUrl = (url: string) => {
  const fileName = url.split("/").pop();
  return `/images/testImages/${fileName}`;
};

const QuizCard: React.FC<QuizCardProps> = ({ deckId, isExtraQuiz }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [arrowColor, setArrowColor] = useState("text-gray-800");
  const [isArrowActive, setIsArrowActive] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const searchParams = useSearchParams();
  const deckName = searchParams?.get("deckName") || "Deck Name";
  const [todayQuestionCount, setTodayQuestionCount] = useState(0);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [isAllDone, setIsAllDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const userId = searchParams?.get("userId") || "4";

  const fetchData = useCallback(async () => {
    const apiUrl = isExtraQuiz
      ? `http://localhost:8080/api/user/${userId}/extra-quiz/deck/${deckId}`
      : `http://localhost:8080/api/user/${userId}/normal-quiz/deck/${deckId}`;
    try {
      const response = await fetch(apiUrl, {
        credentials: "include",
      });
      const data = await response.json();
      console.log("Fetched data:", data);

      setTodayQuestionCount(data.todayQuestionCount);

      const question = isExtraQuiz ? data.extraQuestion : data.randomQuestion;
      if (question) {
        const formattedWord = {
          id: question.id,
          originalText: question.originalText,
          translatedText: question.translatedText,
          nuance: question.nuanceText,
          imageUrl: question.imageUrl,
        };
        setCurrentWord(formattedWord);
        setIsAllDone(false);
      } else {
        setIsAllDone(true);
      }
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  }, [deckId, isExtraQuiz]);

  const resetQuiz = useCallback(async () => {
    setIsLoading(true);
    setIsResetting(true);
    const apiUrl = `http://localhost:8080/api/quiz/extra/${deckId}/reset`;
    try {
      const response = await fetch(apiUrl, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Reset data:", data);
      setTodayQuestionCount(data.todayQuestionCount);
      const question = data.question;
      if (question) {
        const formattedWord = {
          id: question.id,
          originalText: question.originalText,
          translatedText: question.translatedText,
          nuance: question.nuanceText,
          imageUrl: question.imageUrl,
        };
        setCurrentWord(formattedWord);
        setIsAllDone(false);
      } else {
        setIsAllDone(true);
      }
    } catch (error) {
      console.error("Error resetting quiz:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setIsResetting(false);
      }, 500);
    }
  }, [deckId]);

  useEffect(() => {
    const initializeState = () => {
      setWords([]);
      setShowTranslation(false);
      setArrowColor("text-gray-800");
      setIsArrowActive(false);
      setIsCorrect(null);
      setIsAllDone(false);
      setCurrentWord(null);
    };

    initializeState();
    fetchData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [deckId, isExtraQuiz, isResetting, fetchData]);

  if (isLoading) {
    return <Common.LoadingIndicator />;
  }

  if (isAllDone) {
    return (
      <AllDoneCard
        deckName={deckName}
        isExtraQuiz={!!isExtraQuiz}
        todayQuestionCount={todayQuestionCount}
        setIsAllDone={setIsAllDone}
        setIsLoading={setIsLoading}
        resetQuiz={resetQuiz}
      />
    );
  }

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
    if (isCorrect !== null && currentWord !== null) {
      const apiUrl = isExtraQuiz
        ? `http://localhost:8080/api/user/${userId}/extra-quiz/answer/${currentWord.id}`
        : `http://localhost:8080/api/user/${userId}/normal-quiz/answer/${currentWord.id}`;
      const body = { isCorrect };
      try {
        await fetch(apiUrl, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        console.log("Answer submitted");
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    }

    const fetchApiUrl = isExtraQuiz
      ? `http://localhost:8080/api/quiz/extra/${deckId}`
      : `http://localhost:8080/api/quiz/normal/${deckId}`;
    try {
      const response = await fetch(fetchApiUrl, {
        credentials: "include",
      });
      const data = await response.json();
      console.log("Fetched data:", data);

      setTodayQuestionCount(data.todayQuestionCount);

      const question = data.question;
      if (question) {
        const formattedWord = {
          id: question.id,
          originalText: question.originalText,
          translatedText: question.translatedText,
          nuance: question.nuanceText,
          imageUrl: question.imageUrl,
        };
        setCurrentWord(formattedWord);
        setShowTranslation(false);
        setArrowColor("text-gray-800");
        setIsArrowActive(false);
        setIsCorrect(null);
      } else if (
        isExtraQuiz
          ? data.todayExtraQuestionCount === 0
          : data.todayNormalQuestionCount === 0
      ) {
        setIsAllDone(true);
      }
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const handleSpeakClick = () => {
    if (currentWord) {
      const utterance = new SpeechSynthesisUtterance(currentWord.originalText);
      utterance.lang = "en-US";
      utterance.onend = () => console.log("Speech has finished.");
      utterance.onerror = (event) =>
        console.error("SpeechSynthesisUtterance.onerror", event);
      speechSynthesis.speak(utterance);
    }
  };

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
            <p className="text-gray-700 text-right mr-4 lg:mr-8 whitespace-nowrap">{`Left: ${todayQuestionCount}`}</p>
          </div>
          {currentWord && (
            <p
              className="text-2xl font-bold mb-6 text-left ml-4"
              dangerouslySetInnerHTML={{ __html: currentWord.originalText }}
            ></p>
          )}

          {showTranslation && currentWord && (
            <p
              className="text-xl text-left text-blue-700 font-semibold mb-6 ml-4"
              dangerouslySetInnerHTML={{ __html: currentWord.translatedText }}
            ></p>
          )}

          {showTranslation && currentWord && (
            <>
              <p className="text-xl text-left text-gray-700 mb-6 ml-4">
                {currentWord.nuance}
              </p>
              {currentWord.imageUrl && (
                <div className="flex justify-center mb-6">
                  <Image
                    src={formatImageUrl(currentWord.imageUrl)}
                    alt="Word Image"
                    width={500}
                    height={500}
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
              onClick={isArrowActive ? handleNextClick : undefined}
              className={`absolute -top-16 right-0 text-5xl cursor-pointer ${arrowColor} ${isArrowActive ? "" : "opacity-50 cursor-not-allowed"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
