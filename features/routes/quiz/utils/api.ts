import { BASE_URL } from "../../../../utils/api/api";

export const fetchQuizData = async (
  deckId: number,
  isExtraQuiz: boolean,
  jwt: string
) => {
  const apiUrl = isExtraQuiz
    ? `${BASE_URL}/api/extra-quiz/deck/${deckId}`
    : `${BASE_URL}/api/normal-quiz/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return null;
  }
};

export const submitAnswer = async (
  deckId: number,
  wordId: number,
  isCorrect: boolean,
  isExtraQuiz: boolean
) => {
  const apiUrl = isExtraQuiz
    ? `${BASE_URL}/api/extra-quiz`
    : `${BASE_URL}/api/normal-quiz`;
  const body = {
    deckId,
    wordId,
    isCorrect,
  };
  try {
    await fetch(apiUrl, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
  }
};

export const resetQuiz = async (deckId: number) => {
  const apiUrl = `${BASE_URL}/api/extra-quiz/reset/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, {
      credentials: "include",
      method: "PUT",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error resetting quiz:", error);
    return null;
  }
};
