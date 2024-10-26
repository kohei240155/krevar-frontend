export interface DeckInfo {
  deckInfo: Deck[];
}

export interface Deck {
  id: number;
  deckName: string;
  progress: number;
}
