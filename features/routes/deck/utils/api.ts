import { redirect } from "next/navigation";
import { BASE_URL } from "../../../../utils/api/api";
import { DeckList } from "../types/deck";

/**
 * デッキ一覧を取得
 * @param page ページ番号
 * @param size ページサイズ
 * @param jwt JWTトークン
 * @returns デッキ一覧
 */
export const fetchDecks = async (page: number, size: number, jwt: string) => {
  const apiUrl = `${BASE_URL}/api/deck?page=${page}&size=${size}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status === 401) {
      console.error("Authentication error: Invalid JWT token");
      // TODO: ログイン画面遷移後の制御を確認する
      redirect("/login");
    }
    const deckList: DeckList = await response.json();
    return deckList;
  } catch (error) {
    console.error("Error fetching decks:", error);
    // TODO: ログイン画面遷移後の制御を確認する
    redirect("/login");
  }
};

/**
 * デッキ更新
 * @param deckId デッキID
 * @param deckName デッキ名
 * @param nativeLanguageId 母語ID
 * @param learningLanguageId 学習言語ID
 * @param jwt JWTトークン
 * @returns 更新結果
 */
export const updateDeck = async (
  deckId: number,
  deckName: string,
  nativeLanguageId: number,
  learningLanguageId: number,
  jwt: string
) => {
  const apiUrl = `${BASE_URL}/api/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      // credentials: "include",
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

/**
 * デッキ削除
 * @param deckId デッキID
 * @param jwt JWTトークン
 * @returns 削除結果
 */
export const deleteDeck = async (deckId: number, jwt: string) => {
  const apiUrl = `${BASE_URL}/api/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
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

/**
 * デッキ作成
 * @param deckName デッキ名
 * @param nativeLanguageId 母語ID
 * @param learningLanguageId 学習言語ID
 * @param jwt JWTトークン
 * @returns 作成結果
 */
export const createDeck = async (
  deckName: string,
  nativeLanguageId: number,
  learningLanguageId: number,
  jwt: string
) => {
  const apiUrl = `${BASE_URL}/api/deck`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      // credentials: "include",
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

/**
 * デッキ取得
 * @param deckId デッキID
 * @param jwt JWTトークン
 * @returns デッキ
 */
export const fetchDeck = async (deckId: number, jwt: string) => {
  const apiUrl = `${BASE_URL}/api/deck/${deckId}`;
  try {
    const response = await fetch(apiUrl, {
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
    console.error("Error fetching deck:", error);
    redirect("/login");
  }
};
