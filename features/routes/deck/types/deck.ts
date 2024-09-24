export interface Deck {
  id: number;
  deckName: string;
  totalQuestions: number;
  progress: number;
}
export interface DeckItemProps {
  deck: Deck;
  showOptions: number | null;
  onQuizClick: (deckId: number, deckName: string) => void;
  onOptionClick: (e: React.MouseEvent, deckId: number) => void;
  onOptionItemClick: (e: React.MouseEvent, option: string, deck: Deck) => void;
  progress: number;
}

export interface DeckOptionsProps {
  deck: Deck;
  onOptionItemClick: (e: React.MouseEvent, option: string, deck: Deck) => void;
}

export interface DeckEditorProps {
  deckId: number;
  deckName: string;
}

export interface DeckFormProps {
  deckNameValue: string;
  deckId: number;
  isEditMode: boolean;
}
