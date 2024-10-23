import { setCookie } from "cookies-next";
import { BASE_URL } from "../../../../utils/api/api";

export const fetchUserSettings = async (userId: number) => {
  const apiUrl = `${BASE_URL}/api/settings`;
  try {
    const storedValue = window.localStorage.getItem("JWT");
    setCookie("JWT", storedValue, {
      maxAge: 3600,
      path: "/",
    });
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user settings:", error);
    return null;
  }
};

export const updateUserSettings = async (
  nativeLanguageId: number,
  learningLanguageId: number,
  highlightColor: string
) => {
  const apiUrl = `${BASE_URL}/api/settings`;
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
        nativeLanguageId,
        learningLanguageId,
        highlightColor,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error updating deck:", error);
    return false;
  }
};

export const fetchLanguageList = async () => {
  const apiUrl = `${BASE_URL}/api/user/language-list`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching language list:", error);
    return null;
  }
};
