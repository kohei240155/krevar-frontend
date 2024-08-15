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
    isExtraQuiz?: boolean; // Added
}

const QuizCard: React.FC<QuizCardProps> = ({ deckId, isExtraQuiz = false }) => { // Changed
    const [words, setWords] = useState<Word[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [arrowColor, setArrowColor] = useState("text-gray-800");
    const [isArrowActive, setIsArrowActive] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const deckName = searchParams.get('deckName') || 'Deck Name';

    useEffect(() => {
        const apiUrl = isExtraQuiz
            ? `http://localhost:8080/api/quiz/extra/${deckId}`
            : `http://localhost:8080/api/quiz/normal/${deckId}`;
        console.log(apiUrl);
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data); // デバッグ用ログ
                const formattedData = [{
                    id: data.id,
                    originalText: data.originalText,
                    translatedText: data.translatedText,
                    nuance: data.nuanceText,
                    imageUrl: data.imageUrl
                }];
                setWords(formattedData);
            })
            .catch(error => {
                console.error("Error fetching words:", error);
            });
    }, [deckId, isExtraQuiz]);

    const handleKnowClick = () => {
        setShowTranslation(true);
        setArrowColor("text-green-700");
        setIsArrowActive(true);
    };

    const handleDontKnowClick = () => {
        setShowTranslation(true);
        setArrowColor("text-red-700");
        setIsArrowActive(true);
    }

    const handleNextClick = () => {
        if (currentWordIndex + 1 === words.length) {
            setCurrentWordIndex(words.length); // インデックスを範囲外に設定
        } else {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
        setShowTranslation(false);
        setArrowColor("text-gray-800");
        setIsArrowActive(false);
    }

    if (words.length === 0) {
        console.log("Words array is empty"); // Added for debugging
        return (
            <div className="p-4">
                <div className="max-w-md mx-auto mt-1 p-6 bg-white rounded-lg shadow-md flex flex-col justify-between" style={{ height: '550px' }}>
                    <div className="flex-grow">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-1">
                            <h2 className="text-2xl font-bold text-left ml-4">{deckName}</h2>
                            <p className="text-gray-700 text-right mr-4">0 / 0</p>
                        </div>
                        <p className="text-blue-800 text-center mt-4 text-3xl font-bold">All done!</p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={() => router.push('/decks')}
                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Backward
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (currentWordIndex >= words.length) {
        console.log("Current word index is out of bounds"); // Added for debugging
        return (
            <div className="p-4">
                <div className="max-w-md mx-auto mt-1 p-6 bg-white rounded-lg shadow-md flex flex-col justify-between" style={{ height: '550px' }}>
                    <div className="flex-grow">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-1">
                            <h2 className="text-2xl font-bold text-left ml-4">{deckName}</h2>
                            <p className="text-gray-700 text-right mr-8">{`${words.length} / ${words.length}`}</p>
                        </div>
                        <p className="text-blue-800 text-center mt-4 text-3xl font-bold">All done!</p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={() => router.push('/decks')}
                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Backward
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentWord = words[currentWordIndex];

    return (
        <div className="p-4">
            <div className="max-w-md mx-auto mt-1 p-6 bg-white rounded-lg shadow-md flex flex-col justify-between" style={{ height: '550px' }}>
                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-1">
                        <h2 className="text-2xl font-bold text-left ml-4">{deckName}</h2>
                        <p className="text-gray-700 text-right mr-8">{`${currentWordIndex + 1} / ${words.length}`}</p>
                    </div>
                    {currentWord && (
                        <p className="text-2xl font-bold mb-6 text-left ml-4" dangerouslySetInnerHTML={{ __html: currentWord.originalText }}></p>
                    )}

                    {/* 翻訳を表示 */}
                    {showTranslation && currentWord && (
                        <p className="text-xl text-left text-blue-500 mb-6 ml-4" dangerouslySetInnerHTML={{ __html: currentWord.translatedText }}></p>
                    )}

                    {/* ニュアンスとイメージ画像を表示 */}
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

                {/* わかる、わからないボタン */}
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