"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Word {
    id: number;
    originalText: string;
}

const Quiz = () => {
    const router = useRouter();
    const [deckId, setDeckId] = useState(2);
    const [words, setWords] = useState<Word[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

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
    };

    const handleDontKnowClick = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }

    if (words.length === 0) {
        return <p className="text-gray-500 text-center mt-4">Loading words...</p>
    }

    const currentWord = words[currentWordIndex];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Quiz</h2>
            <p className="text-xl text-center mb-6">{currentWord.originalText}</p>
            <button
                onClick={handleKnowClick}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
            >
                わかる
            </button>
            <button
                onClick={handleDontKnowClick}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
            >
                わからない
            </button>
        </div>
    )
}

export default Quiz;