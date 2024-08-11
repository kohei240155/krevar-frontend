"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

interface Deck {
    id: number;
    deckName: string;
    dueToday: number;
}

const DeckList = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);
    const [showOptions, setShowOptions] = useState<number | null>(null);
    const router = useRouter();
    const optionsRef = useRef<HTMLDivElement>(null);

    const truncateDeckName = (name: string) => {
        return name.length > 20 ? name.substring(0, 20) + '...' : name;
    };

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
    } else if (option === "edit") {
        router.push(`/words/${deck.id}?deckName=${encodeURIComponent(deck.deckName)}`);
    } else {
        router.push(`/${option}`);
    }
    setShowOptions(null);
}

    if (loading) {
        return <p className="text-gray-500 text-center mt-4">Loading decks...</p>
    }

    if (decks.length === 0) {
        return (
            <div className="p-4">
                <div className="max-w-2xl mx-auto mt-1 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-left">Deck List</h2>
                    <p className="text-gray-500 text-center mt-4 text-xl">No decks to display.</p>
                    <div className="flex justify-center mt-10">
                        <button
                            className="w-1/2 inline-flex items-center justify-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => router.push('/decks/new')}
                        >
                            Add Deck
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="max-w-2xl mx-auto mt-1 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-left">Deck List</h2>
                <ul className="space-y-4">
                    {decks.map(deck => (
                        <li
                            key={deck.id}
                            className="relative flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-lg shadow space-y-2 md:space-y-0 md:space-x-4"
                        >
                            <div className="flex flex-col space-y-1">
                                <span className="text-xl font-medium">{truncateDeckName(deck.deckName)}</span>
                                <span className="text-lg text-gray-600">Today: {deck.dueToday}</span>
                            </div>
                            <div className="flex items-center space-x-4 mt-4 md:mt-0">
                                <button
                                    onClick={() => handleDeckClick(deck.id)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700"
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
                                            Add Word
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
                                            Edit Deck
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