import { setCookie } from "cookies-next";

export const fetchWordData = async (userId: number, wordId: number) => {
  const storedValue = window.localStorage.getItem("JWT");
  setCookie("JWT", storedValue, {
    maxAge: 3600,
    path: "/",
  });
  const response = await fetch(
    `http://localhost:8080/api/user/${userId}/word/${wordId}`,
    {
      credentials: "include",
    }
  );
  return response.json();
};

export const createWord = async (wordData: any) => {
  const storedValue = window.localStorage.getItem("JWT");
  setCookie("JWT", storedValue, {
    maxAge: 3600,
    path: "/",
  });
  const response = await fetch(`http://localhost:8080/api/word`, {
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
  const storedValue = window.localStorage.getItem("JWT");
  setCookie("JWT", storedValue, {
    maxAge: 3600,
    path: "/",
  });
  const response = await fetch(`http://localhost:8080/api/word`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(wordData),
  });
  return response.json();
};

export const deleteWord = async (userId: number, wordId: number) => {
  const storedValue = window.localStorage.getItem("JWT");
  setCookie("JWT", storedValue, {
    maxAge: 3600,
    path: "/",
  });
  const response = await fetch(
    `http://localhost:8080/api/word/${userId}/${wordId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  return response.json();
};

export const fetchWords = async (
  userId: number,
  deckId: number,
  page: number,
  size: number
) => {
  const storedValue = window.localStorage.getItem("JWT");
  setCookie("JWT", storedValue, {
    maxAge: 3600,
    path: "/",
  });
  const response = await fetch(
    `http://localhost:8080/api/user/${userId}/deck/${deckId}?page=${page - 1}&size=${size}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return response.json();
};
