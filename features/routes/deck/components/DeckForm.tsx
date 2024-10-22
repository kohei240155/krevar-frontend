"use client";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { DeckFormProps } from "../types/deck";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useState } from "react";
import {
  fetchUserSettings,
  fetchLanguageList,
} from "../../userSettings/utils/api";
import * as Common from "../../../common/index";
import { updateDeck, deleteDeck, createDeck } from "../utils/api";

interface Language {
  id: number;
  languageName: string;
}

const DeckForm: React.FC<DeckFormProps> = ({
  deckNameValue,
  deckId,
  isEditMode,
  userId,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [languageList, setLanguageList] = useState<Language[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [nativeLanguageId, setNativeLanguageId] = useState(0);
  const [learningLanguageId, setLearningLanguageId] = useState(0);
  const [deckName, setDeckName] = useState(deckNameValue);

  const fetchUserSettingsData = useCallback(async (userId: number) => {
    const data = await fetchUserSettings(userId);
    if (data) {
      // バックエンドから取得したデータをステートに格納
      setNativeLanguageId(data.defaultNativeLanguageId);
      setLearningLanguageId(data.defaultLearningLanguageId);
      setUserName(data.name);
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

  const getLanguageName = (id: number) => {
    const language = languageList.find((language) => language.id === id);
    return language ? language.languageName : "";
  };

  useEffect(() => {
    fetchLanguageListData();
    fetchUserSettingsData(userId);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchUserSettingsData, fetchLanguageListData, userId]);

  if (isLoading) {
    return <Common.LoadingIndicator />;
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
      router.push("/deck");
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
      router.push("/deck");
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
      router.push("/deck");
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
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="deckName"
              className="block text-sm font-medium text-gray-700"
            >
              Deck Name:
            </label>
            <input
              type="text"
              id="deckName"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Native Language:
            </label>
            <Listbox value={nativeLanguageId} onChange={setNativeLanguageId}>
              <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <span className="block truncate">
                    {getLanguageName(nativeLanguageId)}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                  </span>
                </ListboxButton>
                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {languageList.map((language) => (
                    <ListboxOption
                      key={language.id}
                      value={language.id}
                      className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                    >
                      <span className="block truncate font-normal group-data-[selected]:font-semibold">
                        {language.languageName}
                      </span>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
          <div className="mb-10">
            <label className="block text-sm font-medium text-gray-700">
              Learning Language:
            </label>
            <Listbox
              value={learningLanguageId}
              onChange={setLearningLanguageId}
            >
              <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <span className="block truncate">
                    {getLanguageName(learningLanguageId)}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                  </span>
                </ListboxButton>
                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {languageList.map((language) => (
                    <ListboxOption
                      key={language.id}
                      value={language.id}
                      className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                    >
                      <span className="block truncate font-normal group-data-[selected]:font-semibold">
                        {language.languageName}
                      </span>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
          <div className="flex justify-between mb-2">
            <button
              type="button"
              onClick={() => router.push("/deck")}
              className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Backward
            </button>
            <button
              type="submit"
              className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditMode ? "Update" : "Register"}
            </button>
          </div>
        </form>
        {isModalOpen && (
          <Common.DeleteConfirmModal
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
