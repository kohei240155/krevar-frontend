"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from "next-auth/react";

interface Deck {
    id: number;
    deckName: string;
    totalQuestions: number;
}

const DeckList = () => {
    const { data: session } = useSession();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [showOptions, setShowOptions] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const optionsRef = useRef<HTMLDivElement>(null);
    const [totalDecks, setTotalDecks] = useState(0); // totalDecksの状態を追加
    const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加

    const decksPerPage = 10;

    const fetchDecks = (page: number) => {
        console.log("Fetching decks for page:", page);
        fetch(`http://localhost:8080/api/decks?page=${page - 1}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${(session?.user as any)?.accessToken}`, // 修正: 型アサーションを追加
                "X-CSRF-Token": (session as any)?.csrfToken, // 修正: 型アサーションを追加
            },
        })
            .then(response => response.json())
            .then(data => {
                const formattedDecks = data.decks.map((item: any) => ({
                    id: item.deck.id,
                    deckName: item.deck.deckName,
                    totalQuestions: item.totalQuestions,
                }));
                setDecks(formattedDecks);
                setTotalDecks(data.totalDecks);
            })
            .catch(error => {
                console.log("Error fetching decks:", error);
            });
    };

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        fetchDecks(pageNumber); // 修正: fetchDecks関数を定義
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [currentPage, session]);

    const truncateDeckName = (name: string) => {
        return name.length > 20 ? name.substring(0, 20) + '...' : name;
    };

    const totalPages = Math.ceil(totalDecks / decksPerPage); // 修正: decks.length -> totalDecks
    const pageNumbers: number[] = []; // 型を明示的に指定

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        const maxPageNumbersToShow = 5;
        const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);
        let startPage = Math.max(1, currentPage - halfMaxPageNumbersToShow);
        let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbersToShow);

        if (currentPage <= halfMaxPageNumbersToShow) {
            endPage = Math.min(totalPages, maxPageNumbersToShow);
        } else if (currentPage + halfMaxPageNumbersToShow >= totalPages) {
            startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
        }

        const pageNumbersToShow = pageNumbers.slice(startPage - 1, endPage);

        return (
            <>
                {startPage > 1 && (
                    <>
                        <button onClick={() => paginate(1)} className="px-4 py-2 mx-1 bg-gray-300 text-gray-600 rounded-md transition hover:bg-blue-700">1</button>
                        {startPage > 2 && <span className="px-4 py-2 mx-1">...</span>}
                    </>
                )}
                {pageNumbersToShow.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 mx-1 ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'} rounded-md transition hover:bg-blue-700`}
                    >
                        {number}
                    </button>
                ))}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="px-4 py-2 mx-1">...</span>}
                        <button onClick={() => paginate(totalPages)} className="px-4 py-2 mx-1 bg-gray-300 text-gray-600 rounded-md transition hover:bg-blue-700">{totalPages}</button>
                    </>
                )}
            </>
        );
    };

    const handleDeckClick = (deckId: number, deckName: string) => {
        router.push(`/quiz/${deckId}?deckName=${encodeURIComponent(deckName)}`);
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
        } else if (option === "list") {
            router.push(`/words/${deck.id}?deckName=${encodeURIComponent(deck.deckName)}`);
        } else if (option === "extra-quiz") {
            router.push(`/quiz/${deck.id}?deckName=${encodeURIComponent(deck.deckName)}&isExtraQuiz=true`); // 修
        } else {
            router.push(`/${option}`);
        }
        setShowOptions(null);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                setShowOptions(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [optionsRef]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="absolute top-0 mt-20 text-xl">Loading...</div>
            </div>
        );
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
        <div className="relative p-5">
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-left">Deck List</h2>
                <ul className="space-y-4">
                    {decks.map(deck => (
                        <li
                            key={deck.id}
                            className="relative flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-lg shadow space-y-2 md:space-y-0 md:space-x-4 deck-list-item"
                        >
                            <div className="flex flex-col space-y-1 deck-info">
                                <span className="text-xl font-medium">{truncateDeckName(deck.deckName)}</span>
                                <span className="text-lg text-gray-600">Left: {deck.totalQuestions}</span>
                            </div>
                            <div className="flex items-center space-x-4 mt-4 md:mt-0 deck-actions">
                                <button
                                    onClick={() => handleDeckClick(deck.id, deck.deckName)}
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
                                            onClick={(e) => handleOptionItemClick(e, "list", deck)}
                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        >
                                            Word List
                                        </li>
                                        <li
                                            onClick={(e) => handleOptionItemClick(e, "settings", deck)}
                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        >
                                            Edit Deck
                                        </li>
                                        <li
                                            onClick={(e) => handleOptionItemClick(e, "extra-quiz", deck)}
                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        >
                                            Extra Quiz
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center mt-4">
                    {renderPageNumbers()}
                </div>
            </div>
        </div>
    )
}

export default DeckList;