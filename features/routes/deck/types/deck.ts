export interface DeckList {
  deckInfo: DeckInfo[];
  userDeckCount: number;
}

export interface DeckInfo {
  id: number;
  deckName: string;
  nativeLanguageId: number;
  learningLanguageId: number;
  progress: number;
}
