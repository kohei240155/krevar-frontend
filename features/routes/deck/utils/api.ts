import { BASE_URL } from "../../../../utils/api/api";

export const updateDeck = async (
  deckId: number,
  deckName: string,
  nativeLanguageId: number,
  learningLanguageId: number
) => {
  const apiUrl = `${BASE_URL}/api/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        deckName,
        nativeLanguageId,
        learningLanguageId,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error updating deck:", error);
    return false;
  }
};

export const deleteDeck = async (deckId: number) => {
  const apiUrl = `${BASE_URL}/api/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      credentials: "include",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting deck:", error);
    return false;
  }
};

export const createDeck = async (
  deckName: string,
  nativeLanguageId: number,
  learningLanguageId: number
) => {
  const apiUrl = `${BASE_URL}/api/deck`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        deckName,
        nativeLanguageId,
        learningLanguageId,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error creating deck:", error);
    return false;
  }
};

export const fetchDeck = async (deckId: number) => {
  const apiUrl = `${BASE_URL}/api/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, { credentials: "include" });
    console.log(response);
    return response.json();
  } catch (error) {
    console.error("Error fetching deck:", error);
    return null;
  }
};
