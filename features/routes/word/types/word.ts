export interface WordInfo {
  deckName: string;
  totalWordCount: number;
  wordInfo: Word[];
}

export interface Word {
  id: number;
  originalText: string;
  translatedText: string;
  nuanceText: string;
  imageUrl: string;
  deckId: number;
}
