"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

interface Deck {
    id: number;
    deckName: string;
}

const DeckList = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);
    const [showOptions, setShowOptions] = useState<number | null>(null);
    const router = useRouter();
    const optionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/decks")
            .then(response => response.json())
            .then(data => {
                setDecks(data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching decks:", error);
                setLoading(false);
            });

        const handleClickOutside = (event: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                setShowOptions(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }

    }, []);

    const handleDeckClick = (deckId: number) => {
        router.push(`/quiz/${deckId}`);
    };

    const handleOptionClick = (e: React.MouseEvent, deckId: number) => {
        e.stopPropagation();
        setShowOptions(deckId === showOptions ? null : deckId);
    }

    const handleOptionItemClick = (e: React.MouseEvent, option: string, deck: Deck) => {
        e.stopPropagation();
        console.log(`Option ${option} for deck with ID: ${deck.id}`);
        if (option === "settings") {
            router.push(`/decks/${deck.id}/settings?deckName=${encodeURIComponent(deck.deckName)}`);
        } else {
            router.push(`/${option}`);
        }
        setShowOptions(null);
    }

    if (loading) {
        return <p className="text-gray-500 text-center mt-4">Loading decks...</p>
    }

    return (
        <div className="p-4">
            <div className="max-w-2xl mx-auto mt-1 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-left">Deck List</h2>
                <ul className="space-y-4">
                    {decks.map(deck => (
                        <li
                            key={deck.id}
                            className="relative flex justify-between items-center p-4 bg-white rounded-lg shadow"
                        >
                            <span className="text-lg font-medium">{deck.deckName}</span>
                            <div className="flex items-center space-x-4"> {/* Increase the space between the buttons */}
                                <button
                                    onClick={() => handleDeckClick(deck.id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Quiz
                                </button>
                                <button
                                    onClick={(e) => handleOptionClick(e, deck.id)}
                                    className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-400 transition"
                                >
                                    &#8230;
                                </button>
                            </div>
                            {showOptions == deck.id && (
                                <div ref={optionsRef} className="absolute bottom-full right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 mb-2">
                                    <ul>
                                        <li
                                            onClick={(e) => handleOptionItemClick(e, "words/new", deck)}
                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        >
                                            Add New Word
                                        </li>
                                        <li
                                            onClick={(e) => handleOptionItemClick(e, "edit", deck)}
                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        >
                                            Edit Word
                                        </li>
                                        <li
                                            onClick={(e) => handleOptionItemClick(e, "settings", deck)}
                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        >
                                            Deck Settings
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DeckList;