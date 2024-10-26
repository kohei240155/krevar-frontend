import { BASE_URL } from "../../../../utils/api/api";

// export const fetchDecks = async (page: number, size: number) => {
//   const apiUrl = `${BASE_URL}/api/deck?page=${page}&size=${size}`;

//   const cookieStore = cookies();
//   const jwt = cookieStore.get("JWT")?.value;

//   try {
//     const response = await fetch(apiUrl, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     });
//     if (response.status === 401) {
//       console.error("Authentication error: Invalid JWT token");
//       cookies().delete("JWT"); // JWTを削除
//       signOut();
//       redirect("/");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching decks:", error);
//     cookies().delete("JWT"); // JWTを削除
//     signOut();
//     redirect("/");
//   }
// };

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
    return response.ok;
  } catch (error) {
    console.error("Error updating deck:", error);
    return false;
  }
};

export const deleteDeck = async (deckId: number) => {
  const apiUrl = `${BASE_URL}/api/deck/${deckId}`;
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

export const createDeck = async (
  deckName: string,
  nativeLanguageId: number,
  learningLanguageId: number
) => {
  const apiUrl = `${BASE_URL}/api/deck/1`;
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
    return response.ok;
  } catch (error) {
    console.error("Error creating deck:", error);
    return false;
  }
};
