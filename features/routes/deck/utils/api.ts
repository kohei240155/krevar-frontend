import { redirect } from "next/navigation";
import { BASE_URL } from "../../../../utils/api/api";

export const fetchDecks = async (page: number, size: number, jwt: string) => {
  const apiUrl = `${BASE_URL}/api/deck?page=${page}&size=${size}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
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
    console.error("Error fetching decks:", error);
    redirect("/login");
  }
};

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
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
    return response.ok;
  } catch (error) {
    console.error("Error updating deck:", error);
    redirect("/login");
  }
};

export const deleteDeck = async (deckId: number) => {
  const apiUrl = `${BASE_URL}/api/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
    return response.ok;
  } catch (error) {
    console.error("Error deleting deck:", error);
    redirect("/login");
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
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
    return response.ok;
  } catch (error) {
    console.error("Error creating deck:", error);
    redirect("/login");
  }
};

export const fetchDeck = async (deckId: number) => {
  const apiUrl = `${BASE_URL}/api/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, { credentials: "include" });
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching deck:", error);
    redirect("/login");
  }
};
