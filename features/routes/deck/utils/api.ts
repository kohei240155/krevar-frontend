export const fetchDecks = async (
  userId: number,
  page: number,
  size: number
) => {
  const apiUrl = `http://localhost:8080/api/user/${userId}/deck?page=${page}&size=${size}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching decks:", error);
    return null;
  }
};

export const updateDeck = async (
  deckId: string,
  deckName: string,
  userId: number
) => {
  const apiUrl = `http://localhost:8080/api/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId, deckName }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error updating deck:", error);
    return false;
  }
};

export const deleteDeck = async (deckId: string, userId: number) => {
  const apiUrl = `http://localhost:8080/api/user/${userId}/deck/${deckId}`;
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

export const createDeck = async (deckName: string, userId: number) => {
  const apiUrl = `http://localhost:8080/api/deck`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ deckName, userId }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error creating deck:", error);
    return false;
  }
};
