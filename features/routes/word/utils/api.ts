import { redirect } from "next/navigation";
import { BASE_URL } from "../../../../utils/api/api";

export const fetchWords = async (
  deckId: number,
  page: number,
  size: number,
  jwt: string
) => {
  const apiUrl = `${BASE_URL}/api/deck/${deckId}/words?page=${page}&size=${size}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
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

export const fetchWordData = async (wordId: number, jwt: string) => {
  const response = await fetch(`${BASE_URL}/api/word/${wordId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.json();
};

export const createWord = async (wordData: any, jwt: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/word`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(wordData),
    });
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
    return response.json();
  } catch (error) {
    console.error("Error creating word:", error);
    redirect("/login");
  }
};

export const updateWord = async (wordData: any, jwt: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/word`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(wordData),
    });
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
    return response.json();
  } catch (error) {
    console.error("Error updating word:", error);
    redirect("/login");
  }
};

export const deleteWord = async (wordId: number, jwt: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/word/${wordId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
    return response.json();
  } catch (error) {
    console.error("Error deleting word:", error);
    redirect("/login");
  }
};
