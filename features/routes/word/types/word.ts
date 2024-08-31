export interface Word {
    id: number;
    originalText: string;
    translatedText: string;
  }

export interface WordItemProps {
    word: Word;
    onEditClick: (wordId: number) => void;
  }