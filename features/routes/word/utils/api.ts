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

export const fetchWordData = async (wordId: number) => {
  const response = await fetch(`${BASE_URL}/api/word/${wordId}`, {
    credentials: "include",
  });
  return response.json();
};

export const createWord = async (wordData: any) => {
  const response = await fetch(`${BASE_URL}/api/word`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wordData),
  });
  return response.json();
};

export const updateWord = async (wordData: any) => {
  const response = await fetch(`${BASE_URL}/api/word`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(wordData),
  });
  return response.json();
};

export const deleteWord = async (wordId: number) => {
  const response = await fetch(`${BASE_URL}/api/word/${wordId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};

// export const fetchWords = async (
//   deckId: number,
//   page: number,
//   size: number
// ) => {
//   const storedValue = window.localStorage.getItem("JWT");
//   setCookie("JWT", storedValue, {
//     maxAge: 3600,
//     path: "/",
//   });
//   const response = await fetch(
//     `${BASE_URL}/api/deck/${deckId}/words?page=${page - 1}&size=${size}`,
//     {
//       method: "GET",
//       credentials: "include",
//     }
//   );
//   return response.json();
// };
