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
        fetch(`http://localhost:8080/api/decks/${deckId}/words`)
            .then(response => response.json())
            .then(data => {
                setWords(data);
            })
            .catch(error => {
                console.error("Error fetching words:", error);
            });
    }, []);

    const handleKnowClick = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    };

    const handleDontKnowClick = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }

    if (words.length === 0) {
        return <p>Loading words...</p>
    }

    const currentWord = words[currentWordIndex];

    return (
        <div>
            <h2>Quiz</h2>
            <p>{currentWord.originalText}</p>
            <button onClick={handleKnowClick}>わかる</button>
            <button onClick={handleDontKnowClick}>わからない</button>
        </div>
    )
}

export default Quiz;