"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Word {
    id: number;
    originalText: string;
    translatedText: string;
    deckId:number;
}

const Quiz = () => {
    const router = useRouter();
    const { deckId } = useParams();
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
        setShowTranslation(false);
    };

    const handleDontKnowClick = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setShowTranslation(false);
    }

    const handleShowAnswerClick = () => {
        setShowTranslation(true);
    }

    if (words.length === 0) {
        return <p className="text-gray-500 text-center mt-4">Loading words...</p>
    }

    const currentWord = words[currentWordIndex];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full flex flex-col justify-between h-full">
                <div className="flex-grow flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-2 text-center">Deck Name</h2>
                        <p className="text-gray-700 mb-4 text-center">{`Question ${currentWordIndex + 1} of ${words.length}`}</p>
                        <p className="text-2xl font-bold mb-6 text-center">{currentWord.originalText}</p>

                        {/* 翻訳を表示 */}
                        {showTranslation && (
                            <p className="text-xl text-center text-blue-500 mb-6">{currentWord.translatedText}</p>
                        )}
                    </div>

                    {/* 答えボタン */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleShowAnswerClick}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                        >
                            答え
                        </button>
                    </div>

                    {/* わかる、わからないボタン */}
                    <div className="flex justify-center space-x-4 pb-6">
                        <button
                            onClick={handleKnowClick}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            わかる
                        </button>
                        <button
                            onClick={handleDontKnowClick}
                            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            わからない
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz;