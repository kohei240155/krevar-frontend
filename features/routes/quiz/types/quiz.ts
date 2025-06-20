export interface QuizInfo {
  deckName: string;
  leftQuizCount: number;
  quizData: Quiz;
}

export interface Quiz {
  id: number;
  originalText: string;
  translatedText: string;
  nuanceText: string;
  imageUrl: string;
  leftQuizCount: number;
}

// export interface Quiz {
//   deckName: string;
//   showTranslation: boolean;
//   arrowColor: string;
//   isArrowActive: boolean;
//   isCorrect: boolean | null;
//   isAllDone: boolean;
//   isLoading: boolean;
//   isResetting: boolean;
//   quizData: QuizData | undefined;
// }
