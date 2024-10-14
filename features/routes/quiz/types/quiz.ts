export interface QuizData {
  id: number;
  originalText: string;
  translatedText: string;
  nuanceText: string;
  imageUrl: string;
  leftQuizCount: number;
}

export interface QuizCardProps {
  deckId: number;
  isExtraQuiz?: boolean;
  userId: number;
}

export interface AllDoneCardProps {
  quizData: QuizData | undefined;
  deckName: string;
  isExtraQuiz: boolean;
  setIsAllDone: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  resetQuiz: () => Promise<void>;
}
