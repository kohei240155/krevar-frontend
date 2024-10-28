import { BASE_URL } from "../../../../utils/api/api";
import { redirect } from "next/navigation";
export const fetchUserSettings = async () => {
  const apiUrl = `${BASE_URL}/api/user/settings`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user settings:", error);
    redirect("/login");
  }
};

export const updateUserSettings = async (
  nativeLanguageId: number,
  learningLanguageId: number,
  highlightColor: string
) => {
  const apiUrl = `${BASE_URL}/api/user/settings`;
  try {
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
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      redirect("/login");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching language list:", error);
    redirect("/login");
  }
};
