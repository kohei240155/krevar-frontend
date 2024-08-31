import React from 'react';
import { DeckOptionsProps } from '../types/deck';

const DeckOptions: React.FC<DeckOptionsProps> = ({ deck, onOptionItemClick }) => {
    return (
        <div className="absolute bottom-full right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 mb-2">
            <ul>
                <li
                    onClick={(e) => onOptionItemClick(e, "words/new", deck)}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                    Add Word
                </li>
                <li
                    onClick={(e) => onOptionItemClick(e, "list", deck)}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                    Word List
                </li>
                <li
                    onClick={(e) => onOptionItemClick(e, "settings", deck)}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                    Edit Deck
                </li>
                <li
                    onClick={(e) => onOptionItemClick(e, "extra-quiz", deck)}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                    Extra Quiz
                </li>
            </ul>
        </div>
    );
};

export default DeckOptions;