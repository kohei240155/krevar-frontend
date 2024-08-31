export interface Deck {
    id: number;
    deckName: string;
    totalQuestions: number;
}
export interface DeckItemProps {
    deck: Deck;
    showOptions: number | null;
    onQuizClick: (deckId: number, deckName: string) => void;
    onOptionClick: (e: React.MouseEvent, deckId: number) => void;
    onOptionItemClick: (e: React.MouseEvent, option: string, deck: Deck) => void;
}

export interface DeckOptionsProps {
    deck: Deck;
    onOptionItemClick: (e: React.MouseEvent, option: string, deck: Deck) => void;
}

export interface DeckFormProps {
    onDeckCreated: () => void;
}

export interface DeckEditFormProps {
    deckId: string;
    deckName: string;
    onDeckUpdated: () => void;
}