import { setCookie } from "cookies-next";
import { signIn, useSession, signOut } from "next-auth/react";

export const fetchDecks = async (
  userId: number,
  page: number,
  size: number,
  router: any
) => {
  const apiUrl = `http://localhost:8080/api/user/${userId}/deck?page=${page}&size=${size}`;
  const storedValue = window.localStorage.getItem("JWT");
  setCookie("JWT", storedValue, {
    maxAge: 3600,
    path: "/",
  });

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
    });

    // 401エラーが発生した場合はリダイレクト後に処理を終了
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      window.alert("ログインしてください。");
      signOut();
      router.push("/"); // ルートにリダイレクト
      return null; // 関数をここで終了
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching decks:", error);
    return null;
  }
};

export const updateDeck = async (
  deckId: number,
  deckName: string,
  userId: number,
  nativeLanguageId: number,
  learningLanguageId: number
) => {
  const apiUrl = `http://localhost:8080/api/deck/${deckId}`;
  try {
    const storedValue = window.localStorage.getItem("JWT");
    setCookie("JWT", storedValue, {
      maxAge: 3600,
      path: "/",
    });
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
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
  const apiUrl = `http://localhost:8080/api/deck/${deckId}`;
  try {
    const storedValue = window.localStorage.getItem("JWT");
    setCookie("JWT", storedValue, {
      maxAge: 3600,
      path: "/",
    });
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
  userId: number,
  nativeLanguageId: number,
  learningLanguageId: number
) => {
  const apiUrl = `http://localhost:8080/api/deck`;
  try {
    const storedValue = window.localStorage.getItem("JWT");
    setCookie("JWT", storedValue, {
      maxAge: 3600,
      path: "/",
    });
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        deckName,
        userId,
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
