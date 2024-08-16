import React, { useEffect, useState } from 'react'
import { HiArrowCircleRight } from "react-icons/hi";
import { useRouter, useSearchParams } from 'next/navigation';

interface Word {
    id: number;
    originalText: string;
    translatedText: string;
    nuance: string;
    imageUrl: string;
}

interface QuizCardProps {
    deckId: string;
    isExtraQuiz?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ deckId, isExtraQuiz = false }) => {
    const [words, setWords] = useState<Word[]>([]);
    const [showTranslation, setShowTranslation] = useState(false);
    const [arrowColor, setArrowColor] = useState("text-gray-800");
    const [isArrowActive, setIsArrowActive] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const deckName = searchParams.get('deckName') || 'Deck Name';
    const [correctWordCount, setCorrectWordCount] = useState(0);
    const [todayQuestionCount, setTodayQuestionCount] = useState(0);
    const [currentWord, setCurrentWord] = useState<Word | null>(null);
    const [isAllDone, setIsAllDone] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加

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

        const fetchData = async () => {
            const apiUrl = isExtraQuiz
                ? `http://localhost:8080/api/quiz/extra/${deckId}`
                : `http://localhost:8080/api/quiz/normal/${deckId}`;
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                console.log("Fetched data:", data);

                setCorrectWordCount(data.correctWordCount);
                setTodayQuestionCount(data.todayQuestionCount);

                if (data.randomQuestion) {
                    const formattedWord = {
                        id: data.randomQuestion.id,
                        originalText: data.randomQuestion.originalText,
                        translatedText: data.randomQuestion.translatedText,
                        nuance: data.randomQuestion.nuanceText,
                        imageUrl: data.randomQuestion.imageUrl
                    };
                    setCurrentWord(formattedWord);
                } else if (data.correctWordCount === data.todayQuestionCount) {
                    setIsAllDone(true);
                }
            } catch (error) {
                console.error("Error fetching words:", error);
            }
        };

        initializeState();
        fetchData();
        // ローディングをシミュレートするためのタイムアウト
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // 1秒後にローディングを終了
        return () => clearTimeout(timer);
    }, [deckId, isExtraQuiz]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="absolute top-0 mt-20 text-xl">Loading...</div>
            </div>
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
    }

    const handleNextClick = async () => {
        if (isCorrect !== null && currentWord !== null) {
            const apiUrl = `http://localhost:8080/api/quiz/answer/${currentWord.id}`;
            try {
                await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ isCorrect })
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
            const response = await fetch(fetchApiUrl);
            const data = await response.json();
            console.log("Fetched data:", data);
            setCorrectWordCount(data.correctWordCount);
            setTodayQuestionCount(data.todayQuestionCount);

            if (data.randomQuestion) {
                const formattedWord = {
                    id: data.randomQuestion.id,
                    originalText: data.randomQuestion.originalText,
                    translatedText: data.randomQuestion.translatedText,
                    nuance: data.randomQuestion.nuanceText,
                    imageUrl: data.randomQuestion.imageUrl
                };
                setCurrentWord(formattedWord);
                setShowTranslation(false);
                setArrowColor("text-gray-800");
                setIsArrowActive(false);
                setIsCorrect(null);
            } else if (data.correctWordCount === data.todayQuestionCount) {
                setIsAllDone(true);
            }
        } catch (error) {
            console.error("Error fetching words:", error);
        }
    }

    if (isAllDone) {
        return (
            <div className="p-4">
                <div className="max-w-md mx-auto mt-1 p-6 bg-white rounded-lg shadow-md flex flex-col justify-between" style={{ height: '550px' }}>
                    <div className="flex-grow">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-1">
                            <h2 className="text-2xl font-bold text-left ml-4">{deckName}</h2>
                            <p className="text-gray-700 text-right mr-4">{`${correctWordCount} / ${todayQuestionCount}`}</p>
                        </div>
                        <p className="text-blue-800 text-center mt-4 text-3xl font-bold">All done!</p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={() => router.push('/decks')}
                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Back to Decks
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="max-w-md mx-auto mt-1 p-6 bg-white rounded-lg shadow-md flex flex-col justify-between" style={{ height: '550px' }}>
                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-1">
                        <h2 className="text-2xl font-bold text-left ml-4">{deckName}</h2>
                        <p className="text-gray-700 text-right mr-8">{`${correctWordCount} / ${todayQuestionCount}`}</p>
                    </div>
                    {currentWord && (
                        <p className="text-2xl font-bold mb-6 text-left ml-4" dangerouslySetInnerHTML={{ __html: currentWord.originalText }}></p>
                    )}

                    {showTranslation && currentWord && (
                        <p className="text-xl text-left text-blue-700 font-semibold mb-6 ml-4" dangerouslySetInnerHTML={{ __html: currentWord.translatedText }}></p>
                    )}

                    {showTranslation && currentWord && (
                        <>
                            <p className="text-xl text-left text-gray-700 mb-6 ml-4">{currentWord.nuance}</p>
                            {currentWord.imageUrl && (
                                <div className="flex justify-center mb-6">
                                    <img src={currentWord.imageUrl} alt="Word Image" className="max-w-full h-auto" />
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="flex justify-center space-x-4 mt-4">
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
                        <HiArrowCircleRight
                            onClick={isArrowActive ? handleNextClick : undefined}
                            className={`absolute -top-16 right-0 text-5xl cursor-pointer ${arrowColor} ${isArrowActive ? '' : 'opacity-50 cursor-not-allowed'}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizCard;