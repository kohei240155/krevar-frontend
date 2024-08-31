export interface Word {
    id: number;
    originalText: string;
    translatedText: string;
  }

export interface WordListProps {
    deckId: string;
  }