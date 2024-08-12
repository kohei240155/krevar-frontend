import React, { useEffect, useState } from 'react'
import { HiArrowCircleRight } from "react-icons/hi";

interface Word {
    id: number;
    original_text: string;
    translated_text: string;
    nuance: string;
    image_url: string;
}

interface QuizCardProps {
    deckId: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ deckId }) => {
    const [words, setWords] = useState<Word[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/api/quiz/${deckId}`)
            .then(response => response.json())
            .then(data => {
                setWords(data);
            })
            .catch(error => {
                console.error("Error fetching words:", error);
            });
    }, [deckId]);

    const handleKnowClick = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setShowTranslation(true);
    };

    const handleDontKnowClick = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setShowTranslation(true);
    }

    if (words.length === 0) {
        return <p className="text-gray-500 text-center mt-4">Loading words...</p>
    }

    const currentWord = words[currentWordIndex];

    return (
        <div className="p-4">
            <div className="max-w-md mx-auto mt-1 p-6 bg-white rounded-lg shadow-md flex flex-col justify-between" style={{ height: '550px' }}>
                <div className="flex-grow">
                    <h2 className="text-2xl font-bold mb-2 text-left ml-4">Deck Name</h2>
                    <p className="text-gray-700 mb-4 text-left ml-4">{`${currentWordIndex + 1} / ${words.length}`}</p>
                    <p className="text-2xl font-bold mb-6 text-left ml-4" dangerouslySetInnerHTML={{ __html: currentWord.original_text }}></p>

                    {/* 翻訳を表示 */}
                    {showTranslation && (
                        <p className="text-xl text-left text-blue-500 mb-6 ml-4" dangerouslySetInnerHTML={{ __html: currentWord.translated_text }}></p>
                    )}

                    {/* ニュアンスとイメージ画像を表示 */}
                    {showTranslation && (
                        <>
                            <p className="text-xl text-center text-gray-700 mb-6">{currentWord.nuance}</p>
                            {currentWord.image_url && (
                                <div className="flex justify-center mb-6">
                                    <img src={currentWord.image_url} alt="Word Image" className="max-w-full h-auto" />
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
                        <HiArrowCircleRight className="absolute -top-16 right-0 text-5xl text-gray-800"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizCard;