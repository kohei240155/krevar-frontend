"use client";
import { useEffect, useRef, useState } from 'react';
import Pagination from './../../../common/components/Pagination';
import { useRouter } from 'next/navigation';
import DeckItem from './DeckItem';
import LoadingIndicator from '../../../common/components/LoadingIndicator';
import EmptyDeckList from './EmptyDeckList';

interface Deck {
    id: number;
    deckName: string;
    totalQuestions: number;
}

const DeckList = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [showOptions, setShowOptions] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const optionsRef = useRef<HTMLDivElement>(null);
    const [totalDecks, setTotalDecks] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const decksPerPage = 10;

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        fetchDecks(pageNumber);
    };

    const truncateDeckName = (name: string) => {
        if (!name) return '';
        return name.length > 20 ? name.substring(0, 20) + '...' : name;
    };

    const totalPages = Math.ceil(totalDecks / decksPerPage);
    const pageNumbers: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const fetchDecks = (page: number) => {
        console.log("Fetching decks for page:", page);
        fetch(`http://localhost:8080/api/decks?page=${page - 1}`, {
            method: 'GET',
            credentials: 'include', // クッキーを含める
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch decks');
            }
            return response.json();
        })
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

    const handleDeckClick = (deckId: number, deckName: string) => {
        router.push(`/quiz/${deckId}?deckName=${encodeURIComponent(deckName)}`);
    };

    const handleOptionClick = (e: React.MouseEvent, deckId: number) => {
        e.stopPropagation();
        setShowOptions(deckId === showOptions ? null : deckId);
    }

    useEffect(() => {
        fetchDecks(currentPage);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [currentPage]);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (decks.length === 0 && !isLoading) {
        return <EmptyDeckList />;
    }

    const handleOptionItemClick = (e: React.MouseEvent, option: string, deck: Deck) => {
        e.stopPropagation();
        switch (option) {
            case 'words/new':
                router.push(`/words/new?deckId=${deck.id}`);
                break;
            case 'list':
                router.push(`/words/list?deckId=${deck.id}`);
                break;
            case 'settings':
                router.push(`/decks/edit/${deck.id}`);
                break;
            case 'extra-quiz':
                router.push(`/quiz/${deck.id}?extra=true`);
                break;
            default:
                break;
        }
    };

    // DeckListコンポーネント内
    return (
        <div className="relative p-5">
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-left">Deck List</h2>
                <ul className="space-y-4">
                    {decks.map(deck => (
                        // DeckItemコンポーネントをここで使用
                        <DeckItem
                        key={deck.id}
                        deck={deck}
                        showOptions={showOptions}
                        onDeckClick={handleDeckClick}
                        onOptionClick={handleOptionClick}
                        onOptionItemClick={handleOptionItemClick}
                        truncateDeckName={truncateDeckName}
                        optionsRef={optionsRef}
                        />
                    ))}
                </ul>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            </div>
        </div>
);
}

export default DeckList;
