import React, { useEffect, useState, useCallback } from 'react'
import { HiArrowCircleRight } from "react-icons/hi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useRouter, useSearchParams } from 'next/navigation';
import { GiSpeaker } from "react-icons/gi";

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
    const [isNormalModeCorrect, setIsNormalModeCorrect] = useState<boolean | null>(null);
    const [isExtraModeCorrect, setIsExtraModeCorrect] = useState<boolean | null>(null); // Added
    const router = useRouter();
    const searchParams = useSearchParams();
    const deckName = searchParams.get('deckName') || 'Deck Name';
    const [todayNormalQuestionCount, setTodayNormalQuestionCount] = useState(0);
    const [todayExtraQuestionCount, setTodayExtraQuestionCount] = useState(0);
    const [currentWord, setCurrentWord] = useState<Word | null>(null);
    const [isAllDone, setIsAllDone] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加
    const [isResetting, setIsResetting] = useState(false); // 追加

    const fetchData = useCallback(async () => {
        const apiUrl = isExtraQuiz
            ? `http://localhost:8080/api/quiz/extra/${deckId}`
            : `http://localhost:8080/api/quiz/normal/${deckId}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log("Fetched data:", data);

            if (isExtraQuiz) {
                setTodayExtraQuestionCount(data.todayExtraQuestionCount);
            } else {
                setTodayNormalQuestionCount(data.todayNormalQuestionCount);
            }

            const question = isExtraQuiz ? data.extraQuestion : data.randomQuestion;
            if (question) {
                const formattedWord = {
                    id: question.id,
                    originalText: question.originalText,
                    translatedText: question.translatedText,
                    nuance: question.nuanceText,
                    imageUrl: question.imageUrl
                };
                setCurrentWord(formattedWord);
                setIsAllDone(false); // 新たな問題がある場合はAll Doneを解除
            } else {
                setIsAllDone(true); // 問題がない場合はAll Doneを設定
            }
        } catch (error) {
            console.error("Error fetching words:", error);
        }
    }, [deckId, isExtraQuiz]);

    const resetQuiz = useCallback(async () => {
        setIsLoading(true); // 追加
        setIsResetting(true); // 追加
        const apiUrl = `http://localhost:8080/api/quiz/extra/${deckId}/reset`;
        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log("Reset data:", data);
            setTodayExtraQuestionCount(data.todayExtraQuestionCount);
            const question = data.extraQuestion;
            if (question) {
                const formattedWord = {
                    id: question.id,
                    originalText: question.originalText,
                    translatedText: question.translatedText,
                    nuance: question.nuanceText,
                    imageUrl: question.imageUrl
                };
                setCurrentWord(formattedWord);
                setIsAllDone(false); // 新たな問題がある場合はAll Doneを解除
            } else {
                setIsAllDone(true); // 問題がない場合はAll Doneを設定
            }
        } catch (error) {
            console.error("Error resetting quiz:", error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                setIsResetting(false); // 追加
            }, 500); // 500ミリ秒の遅延を追加
        }
    }, [deckId]);

    useEffect(() => {
        const initializeState = () => {
            setWords([]);
            setShowTranslation(false);
            setArrowColor("text-gray-800");
            setIsArrowActive(false);
            setIsNormalModeCorrect(null);
            setIsExtraModeCorrect(null); // Added
            setIsAllDone(false); // クイズ開始時にAll Doneを解除
            setCurrentWord(null);
        };

        initializeState();
        fetchData();
        // ローディングをシミュレートするためのタイムアウト
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // 500ミリ秒後にローディングを終了
        return () => clearTimeout(timer);
    }, [deckId, isExtraQuiz, isResetting, fetchData]); // fetchDataを依存関係に追加

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="absolute top-0 mt-20 text-xl">Loading...</div>
            </div>
        );
    }

    if (isAllDone) {
        return (
            <div className="p-4">
                <div className="max-w-md mx-auto mt-1 p-6 bg-white rounded-lg shadow-md flex flex-col justify-between" style={{ height: '550px' }}>
                    <div className="flex-grow">
                        <div className={`flex justify-between items-center mb-4 pb-1 ${isExtraQuiz ? 'border-b border-blue-700' : 'border-b border-gray-700'}`}>
                            <h2 className="text-2xl font-bold text-left ml-4 truncate">{deckName}</h2>
                            <p className="text-gray-700 text-right mr-4 lg:mr-8 whitespace-nowrap">{`Left: ${isExtraQuiz ? todayExtraQuestionCount : todayNormalQuestionCount}`}</p>
                        </div>
                        <p className={`text-blue-800 text-center mt-4 text-3xl font-bold ${isExtraQuiz ? 'text-blue-800' : 'text-blue-800'}`}>All done!</p>
                    </div>
                    <div className="flex flex-col justify-center mt-4 space-y-4">
                        {isExtraQuiz && (
                            <button
                                type="button"
                                onClick={async () => {
                                    setIsAllDone(false);
                                    setIsLoading(true);
                                    await resetQuiz(); // 修正
                                }}
                                className="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                Reset
                            </button>
                        )}
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

    const handleKnowClick = () => {
        setShowTranslation(true);
        setArrowColor("text-green-700");
        setIsArrowActive(true);
        setIsNormalModeCorrect(true);
        if (isExtraQuiz) setIsExtraModeCorrect(true); // Added
    };

    const handleDontKnowClick = () => {
        setShowTranslation(true);
        setArrowColor("text-red-700");
        setIsArrowActive(true);
        setIsNormalModeCorrect(false);
        if (isExtraQuiz) setIsExtraModeCorrect(false); // Added
    }

    const handleNextClick = async () => {
        if ((isNormalModeCorrect !== null || isExtraModeCorrect !== null) && currentWord !== null) {
            const apiUrl = isExtraQuiz
                ? `http://localhost:8080/api/quiz/extra/answer/${currentWord.id}`
                : `http://localhost:8080/api/quiz/normal/answer/${currentWord.id}`;
            const body = isExtraQuiz
                ? { isExtraModeCorrect }
                : { isNormalModeCorrect };
            try {
                await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body) // 修正
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

            if (isExtraQuiz) {
                setTodayExtraQuestionCount(data.todayExtraQuestionCount);
            } else {
                setTodayNormalQuestionCount(data.todayNormalQuestionCount);
            }

            const question = isExtraQuiz ? data.extraQuestion : data.randomQuestion;
            if (question) {
                const formattedWord = {
                    id: question.id,
                    originalText: question.originalText,
                    translatedText: question.translatedText,
                    nuance: question.nuanceText,
                    imageUrl: question.imageUrl
                };
                setCurrentWord(formattedWord);
                setShowTranslation(false);
                setArrowColor("text-gray-800");
                setIsArrowActive(false);
                setIsNormalModeCorrect(null);
                setIsExtraModeCorrect(null); // Added
            } else if (isExtraQuiz ? data.todayExtraQuestionCount === 0 : data.todayNormalQuestionCount === 0) {
                setIsAllDone(true);
            }
        } catch (error) {
            console.error("Error fetching words:", error);
        }
    }

    const handleSpeakClick = () => {
        if (currentWord) {
            console.log('Current word:', currentWord.originalText); // デバッグ用ログ

            // 利用可能な音声のリストをログに出力
            const voices = speechSynthesis.getVoices();
            console.log('Available voices:', voices);

            const utterance = new SpeechSynthesisUtterance(currentWord.originalText);
            utterance.lang = 'en-US';
            utterance.onend = () => console.log('Speech has finished.');
            utterance.onerror = (event) => console.error('SpeechSynthesisUtterance.onerror', event);
            speechSynthesis.speak(utterance);
            console.log('Speech synthesis started'); // デバッグ用ログ
        } else {
            console.log('No current word available'); // デバッグ用ログ
        }
    };

    return (
        <div className="p-4">
            <div className="max-w-md mx-auto mt-1 p-6 bg-white rounded-lg shadow-md flex flex-col justify-between" style={{ height: '550px' }}>
                <div className="flex-grow">
                    <div className={`flex justify-between items-center mb-4 pb-1 ${isExtraQuiz ? 'border-b border-blue-700' : 'border-b border-gray-700'}`}>
                        <h2 className="text-2xl font-bold text-left ml-4 truncate">{deckName}</h2>
                        <p className="text-gray-700 text-right mr-4 lg:mr-8 whitespace-nowrap">{`Left: ${isExtraQuiz ? todayExtraQuestionCount : todayNormalQuestionCount}`}</p>
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
                        <GiSpeaker
                            onClick={handleSpeakClick}
                            className="absolute -top-16 right-14 text-5xl cursor-pointer text-gray-800"
                        />
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