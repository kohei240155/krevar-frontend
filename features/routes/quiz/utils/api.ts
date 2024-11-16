import { redirect } from "next/navigation";
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
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    redirect("/login");
  }
};

export const submitAnswer = async (
  deckId: number,
  wordId: number,
  isCorrect: boolean,
  isExtraQuiz: boolean,
  jwt: string
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
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
  } catch (error) {
    console.error("Error submitting answer:", error);
    redirect("/login");
  }
};

export const resetQuiz = async (deckId: number, jwt: string) => {
  const apiUrl = `${BASE_URL}/api/extra-quiz/reset/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: "PUT",
    });
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error resetting quiz:", error);
    redirect("/login");
  }
};
