export interface QuizData {
  id: number;
  originalText: string;
  translatedText: string;
  nuance: string;
  imageUrl: string;
  leftQuizCount: number;
}

export interface QuizCardProps {
  deckId: string;
  isExtraQuiz?: boolean;
}

export interface AllDoneCardProps {
  quizData: QuizData | undefined;
  deckName: string;
  isExtraQuiz: boolean;
  // leftQuizCount: number;
  setIsAllDone: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  resetQuiz: () => Promise<void>;
}
