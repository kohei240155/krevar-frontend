"use client";
import { useParams, useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import LanguageSelector from "../../../common/components/LanguageSelector";
import { createDeck, deleteDeck, fetchDeck, updateDeck } from "../utils/api";
import { useState, useCallback, useEffect, Suspense } from "react";
import {
  fetchLanguageList,
  fetchUserSettings,
} from "../../userSettings/utils/api";
import { DeleteConfirmModal, LoadingIndicator } from "../../../common";
import { Language } from "../../../common/types/types";
import { useForm } from "react-hook-form";
import { DeckInfo } from "../types/deck";
import {
  LanguageList,
  UserSettings,
} from "../../userSettings/types/userSettings";
import { useCookies } from "react-cookie";

export interface DeckFormProps {
  isEditMode: boolean;
}

const DeckForm: React.FC<DeckFormProps> = ({ isEditMode }) => {
  const router = useRouter();
  const params = useParams();
  // 言語一覧
  const [languageList, setLanguageList] = useState<Language[]>([]);
  // 削除確認モーダル
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 母語ID
  const [nativeLanguageId, setNativeLanguageId] = useState(0);
  // 学習言語ID
  const [learningLanguageId, setLearningLanguageId] = useState(0);
  // デッキ名
  const [deckName, setDeckName] = useState("");
  // デッキID
  const deckId = parseInt(params?.deckId as string, 10);
  // フォーム
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // JWTを取得
  const [cookies] = useCookies(["JWT"]);
  const jwt = cookies.JWT || "";

  // ユーザー設定を取得
  const fetchUserSettingsData = useCallback(async () => {
    const data: UserSettings = await fetchUserSettings(jwt);
    setNativeLanguageId(data.defaultNativeLanguageId);
    setLearningLanguageId(data.defaultLearningLanguageId);
  }, [jwt]);

  // 言語一覧を取得
  const fetchLanguageListData = useCallback(async () => {
    const data: LanguageList[] = await fetchLanguageList(jwt);
    if (data) {
      const formattedData = data.map(
        (language: { languageId: number; languageName: string }) => ({
          id: language.languageId,
          languageName: language.languageName,
        })
      );
      setLanguageList(formattedData);
    }
  }, [jwt]);

  // デッキデータを取得
  const fetchDeckData = useCallback(async () => {
    const data: DeckInfo = await fetchDeck(deckId, jwt);
    if (data) {
      setDeckName(data.deckName);
      setNativeLanguageId(data.nativeLanguageId);
      setLearningLanguageId(data.learningLanguageId);
    }
  }, [deckId, jwt]);

  // 言語名を取得
  const getLanguageName = (id: number) => {
    const language = languageList.find((language) => language.id === id);
    return language ? language.languageName : "";
  };

  useEffect(() => {
    // 言語一覧を取得
    fetchLanguageListData();

    if (isEditMode) {
      // デッキ編集モードの場合はデッキデータを取得
      fetchDeckData();
    } else {
      // デッキ作成モードの場合はユーザー設定を取得
      fetchUserSettingsData();
    }
  }, [fetchUserSettingsData, fetchLanguageListData, isEditMode, fetchDeckData]);

  const handleUpdate = async (event: React.FormEvent) => {
    // event.preventDefault();
    const success = await updateDeck(
      deckId,
      deckName,
      nativeLanguageId,
      learningLanguageId,
      jwt
    );
    if (success) {
      toast.success("Deck updated successfully!", {
        autoClose: 1500,
      });
      setTimeout(() => {
        window.location.href = "/deck/page/1";
      }, 1500);
    } else {
      toast.error("Unexpected response from the server.");
    }
  };

  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    const success = await deleteDeck(deckId, jwt);
    if (success) {
      toast.success("Deck deleted successfully!", {
        autoClose: 1500,
      });
      setTimeout(() => {
        window.location.href = "/deck/page/1";
      }, 1600);
    } else {
      toast.error("Unexpected response from the server.");
    }
    setIsModalOpen(false);
  };

  const handleCreate = async (event: React.FormEvent) => {
    // event.preventDefault();
    const success = await createDeck(
      deckName,
      nativeLanguageId,
      learningLanguageId,
      jwt
    );
    if (success) {
      toast.success("Deck created successfully!", {
        autoClose: 1500,
      });
      setTimeout(() => {
        window.location.href = "/deck/page/1";
      }, 1600);
    } else {
      toast.error("Unexpected response from the server.");
    }
  };

  const handleSubmitForm = async (data: any) => {
    if (isEditMode) {
      await handleUpdate(data);
    } else {
      await handleCreate(data);
    }
  };

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <div className="relative p-4">
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
          <form onSubmit={handleSubmit(handleSubmitForm)}>
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
                {...register("deckName", {
                  required: "Deck name is required",
                  minLength: {
                    value: 1,
                    message: "Deck name must be at least 1 character",
                  },
                  maxLength: {
                    value: 20,
                    message: "Deck name must be at most 20 characters",
                  },
                })}
                defaultValue={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-500 sm:text-sm"
              />
              {errors.deckName?.message && (
                <span className="text-red-500 text-sm">
                  {String(errors.deckName.message)}
                </span>
              )}
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
                onClick={() => router.push("/deck/page/1")}
                className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Backward
              </button>
              {/* 登録ボタン */}
              <button
                type="submit"
                className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
    </Suspense>
  );
};

export default DeckForm;
