export interface DeckInfo {
  deckInfo: Deck[];
  totalDeckCount: number;
}

export interface Deck {
  id: number;
  deckName: string;
  progress: number;
}
