import React, { useRef } from 'react';
import DeckOptions from './DeckOptions';

interface Deck {
    id: number;
    deckName: string;
    totalQuestions: number;
}

interface DeckItemProps {
    deck: Deck;
    showOptions: number | null;
    onDeckClick: (deckId: number, deckName: string) => void;
    onOptionClick: (e: React.MouseEvent, deckId: number) => void;
    onOptionItemClick: (e: React.MouseEvent, option: string, deck: Deck) => void;
    truncateDeckName: (name: string) => string;
}

const DeckItem: React.FC<DeckItemProps> = ({
    deck,
    showOptions,
    onDeckClick,
    onOptionClick,
    onOptionItemClick,
    truncateDeckName,
}) => {
    return (
        <li
            className="relative flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-lg shadow space-y-2 md:space-y-0 md:space-x-4 deck-list-item"
        >
            <div className="flex flex-col space-y-1 deck-info">
                <span className="text-xl font-medium">{truncateDeckName(deck.deckName)}</span>
                <span className="text-lg text-gray-600">Left: {deck.totalQuestions}</span>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0 deck-actions">
                <button
                    onClick={() => onDeckClick(deck.id, deck.deckName)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700"
                >
                    Quiz
                </button>
                <button
                    onClick={(e) => onOptionClick(e, deck.id)}
                    className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-400 transition"
                >
                    &#8230;
                </button>
            </div>
            {showOptions === deck.id && (
                <DeckOptions
                deck={deck}
                onOptionItemClick={onOptionItemClick}
                />
            )}
        </li>
    );
};

export default DeckItem;