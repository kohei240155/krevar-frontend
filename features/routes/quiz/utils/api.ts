export const fetchQuizData = async (
  deckId: string,
  userId: string,
  isExtraQuiz: boolean
) => {
  const apiUrl = isExtraQuiz
    ? `http://localhost:8080/api/user/${userId}/extra-quiz/deck/${deckId}`
    : `http://localhost:8080/api/user/${userId}/normal-quiz/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return null;
  }
};

export const submitAnswer = async (
  userId: string,
  deckId: string,
  wordId: number,
  isCorrect: boolean,
  isExtraQuiz: boolean
) => {
  const apiUrl = isExtraQuiz
    ? `http://localhost:8080/api/extra-quiz`
    : `http://localhost:8080/api/normal-quiz`;
  const body = {
    userId: parseInt(userId, 10),
    deckId: parseInt(deckId, 10),
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
    console.log("Answer submitted");
  } catch (error) {
    console.error("Error submitting answer:", error);
  }
};

export const resetQuizApi = async (deckId: string) => {
  const apiUrl = `http://localhost:8080/api/extra-quiz/${deckId}/reset`;
  try {
    const response = await fetch(apiUrl, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error resetting quiz:", error);
    return null;
  }
};
