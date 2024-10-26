"use client";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import LanguageSelector from "../../../common/components/LanguageSelector";
import { createDeck, deleteDeck, fetchDeck, updateDeck } from "../utils/api";
import { useState, useCallback, useEffect } from "react";
import {
  fetchLanguageList,
  fetchUserSettings,
} from "../../userSettings/utils/api";
import { DeleteConfirmModal, LoadingIndicator } from "../../../common";
import { Language } from "../../../common/types/types";

export interface DeckFormProps {
  deckNameValue: string;
  deckId: number;
  isEditMode: boolean;
}

const DeckForm: React.FC<DeckFormProps> = ({
  deckNameValue,
  deckId,
  isEditMode,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [languageList, setLanguageList] = useState<Language[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nativeLanguageId, setNativeLanguageId] = useState(0);
  const [learningLanguageId, setLearningLanguageId] = useState(0);
  const [deckName, setDeckName] = useState(deckNameValue);

  const fetchUserSettingsData = useCallback(async () => {
    const data = await fetchUserSettings();
    if (data) {
      setNativeLanguageId(data.defaultNativeLanguageId);
      setLearningLanguageId(data.defaultLearningLanguageId);
    } else {
      console.log("Error fetching user settings");
    }
  }, []);

  const fetchLanguageListData = useCallback(async () => {
    const data = await fetchLanguageList();
    if (data) {
      const formattedData = data.map(
        (language: { languageId: number; languageName: string }) => ({
          id: language.languageId,
          languageName: language.languageName,
        })
      );
      setLanguageList(formattedData);
    }
  }, []);

  const fetchDeckData = useCallback(async () => {
    const data = await fetchDeck(deckId);
    console.log(data);
    if (data) {
      setDeckName(data.deckName);
      setNativeLanguageId(data.nativeLanguageId);
      setLearningLanguageId(data.learningLanguageId);
    }
  }, [deckId]);

  const getLanguageName = (id: number) => {
    const language = languageList.find((language) => language.id === id);
    return language ? language.languageName : "";
  };

  useEffect(() => {
    fetchLanguageListData();
    if (isEditMode) {
      fetchDeckData();
    } else {
      fetchUserSettingsData();
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchUserSettingsData, fetchLanguageListData, isEditMode, fetchDeckData]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const handleUpdate = async (event: React.FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    const success = await updateDeck(
      deckId,
      deckName,
      nativeLanguageId,
      learningLanguageId
    );
    if (success) {
      toast.success("Deck updated successfully!");
      router.push("/deck/1");
    } else {
      toast.error("Unexpected response from the server.");
    }
  };

  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    const success = await deleteDeck(deckId);
    if (success) {
      toast.success("Deck deleted successfully!");
      router.push("/deck/1");
    } else {
      toast.error("Unexpected response from the server.");
    }
    setIsModalOpen(false);
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const success = await createDeck(
      deckName,
      nativeLanguageId,
      learningLanguageId
    );
    if (success) {
      toast.success("Deck created successfully!");
      router.push("/deck/1");
    } else {
      toast.error("Unexpected response from the server.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    if (isEditMode) {
      handleUpdate(event);
    } else {
      handleCreate(event);
    }
  };

  return (
    <div className="relative p-5">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-left">
            {isEditMode ? "Edit Deck" : "Add Deck"}
          </h1>
          {isEditMode && (
            <button
              onClick={handleDelete}
              className="w-10 h-10 flex items-center justify-center rounded-full text-red-600 bg-white border border-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <FaTrash />
            </button>
          )}
        </div>

        {/* デッキ入力フォーム */}
        <form onSubmit={handleSubmit}>
          {/* デッキ名 */}
          <div className="mb-5">
            <label
              htmlFor="deckName"
              className="block text-sm font-medium text-gray-700"
            >
              Deck Name:
            </label>
            {/* デッキ名入力欄 */}
            <input
              type="text"
              id="deckName"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* 母語の選択欄 */}
          <LanguageSelector
            selectedLanguageId={nativeLanguageId}
            onChange={setNativeLanguageId}
            languageList={languageList}
            label="Native Language:"
            getLanguageName={getLanguageName}
          />

          {/* 学習言語の選択欄 */}
          <LanguageSelector
            selectedLanguageId={learningLanguageId}
            onChange={setLearningLanguageId}
            languageList={languageList}
            label="Learning Language:"
            getLanguageName={getLanguageName}
          />

          {/* ボタン */}
          <div className="flex justify-between mb-2">
            {/* 戻るボタン */}
            <button
              type="button"
              onClick={() => router.push("/deck/1")}
              className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Backward
            </button>
            {/* 登録ボタン */}
            <button
              type="submit"
              className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditMode ? "Update" : "Register"}
            </button>
          </div>
        </form>

        {/* 削除確認モーダル */}
        {isModalOpen && (
          <DeleteConfirmModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            onConfirmDelete={confirmDelete}
            targetWord="deck"
          />
        )}
      </div>
    </div>
  );
};

export default DeckForm;
