export interface QuizData {
  id: number;
  originalText: string;
  translatedText: string;
  nuanceText: string;
  imageUrl: string;
  leftQuizCount: number;
}

export interface Quiz {
  showTranslation: boolean;
  arrowColor: string;
  isArrowActive: boolean;
  isCorrect: boolean | null;
  isAllDone: boolean;
  isLoading: boolean;
  isResetting: boolean;
  quizData: QuizData | undefined;
}
