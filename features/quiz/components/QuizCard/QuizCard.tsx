import React, { useEffect, useState } from 'react'

interface Word {
    id: number;
    original_text: string;
    translated_text: string;
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
        setShowTranslation(false);
    };

    const handleDontKnowClick = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setShowTranslation(false);
    }

    if (words.length === 0) {
        return <p className="text-gray-500 text-center mt-4">Loading words...</p>
    }

    const currentWord = words[currentWordIndex];

    return (
        <div className="p-4">
            <div className="max-w-2xl mx-auto mt-1 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Deck Name</h2>
                <p className="text-gray-700 mb-4 text-center">{`Question ${currentWordIndex + 1} of ${words.length}`}</p>
                <p className="text-2xl font-bold mb-6 text-center">{currentWord.original_text}</p>

                {/* 翻訳を表示 */}
                {showTranslation && (
                    <p className="text-xl text-center text-blue-500 mb-6">{currentWord.translated_text}</p>
                )}

                {/* わかる、わからないボタン */}
                <div className="flex justify-center space-x-4 pb-6">
                    <button
                        onClick={handleDontKnowClick}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        わからない
                    </button>
                    <button
                        onClick={handleKnowClick}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        わかる
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuizCard;