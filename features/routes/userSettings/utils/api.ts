import { BASE_URL } from "../../../../utils/api/api";
import { redirect } from "next/navigation";
import { LanguageList } from "../types/userSettings";

/**
 * ユーザー設定を取得
 * @param jwt JWT
 * @returns ユーザー設定
 */
export const fetchUserSettings = async (jwt: string) => {
  const apiUrl = `${BASE_URL}/api/user/settings`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      // credentials: "include",
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

/**
 * ユーザー設定を更新
 * @param nativeLanguageId 母語ID
 * @param learningLanguageId 学習言語ID
 * @param highlightColor ハイライト色
 * @param jwt JWT
 * @returns 更新結果
 */
export const updateUserSettings = async (
  nativeLanguageId: number,
  learningLanguageId: number,
  highlightColor: string,
  jwt: string
) => {
  const apiUrl = `${BASE_URL}/api/user/settings`;
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
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

/**
 * 言語一覧を取得
 * @param jwt JWT
 * @returns 言語一覧
 */
export const fetchLanguageList = async (jwt: string) => {
  const apiUrl = `${BASE_URL}/api/user/language-list`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      // TODO: ログイン画面遷移後の制御を確認する
      redirect("/login");
    }
    const data: LanguageList[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching language list:", error);
    // TODO: ログイン画面遷移後の制御を確認する
    redirect("/login");
  }
};
