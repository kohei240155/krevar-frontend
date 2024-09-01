export interface Word {
  id: number;
  originalText: string;
  translatedText: string;
  nuance: string;
  imageUrl: string;
}

export interface QuizCardProps {
  deckId: string;
  isExtraQuiz?: boolean;
}

export interface AllDoneCardProps {
  deckName: string;
  isExtraQuiz: boolean;
  todayExtraQuestionCount: number;
  todayNormalQuestionCount: number;
  setIsAllDone: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  resetQuiz: () => Promise<void>;
}
