"use client";
import { useRouter } from "next/navigation";
import { UserSettingsFormProps } from "../types/userSettings";
import { useState, useEffect } from "react";
import * as Common from "../../../common/index";
import { fetchUserSettings, fetchLanguageList } from "../utils/api";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const UserSettingsForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [defaultNativeLanguageId, setDefaultNativeLanguageId] = useState(0);
  const [defaultLearningLanguageId, setDefaultLearningLanguageId] = useState(0);
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [highlightColor, setHighlightColor] = useState("#000000");
  const [languageList, setLanguageList] = useState([]);
  const [selectedNativeLanguage, setSelectedNativeLanguage] = useState<{
    languageId: number;
    languageName: string;
  } | null>(null);
  const [selectedLearningLanguage, setSelectedLearningLanguage] = useState<{
    languageId: number;
    languageName: string;
  } | null>(null);

  const fetchLanguageListData = async () => {
    const data = await fetchLanguageList();
    if (data) {
      setLanguageList(data);
    }
  };

  const fetchUserSettingsData = async (userId: number) => {
    const data = await fetchUserSettings(userId);
    if (data) {
      setDefaultNativeLanguageId(data.nativeLanguageId);
      setDefaultLearningLanguageId(data.learningLanguageId);
      setSubscriptionStatus(data.subscriptionStatus);
      setHighlightColor(data.highlightColor);
      setSelectedNativeLanguage(
        data.languageList?.find(
          (lang: { languageId: number }) =>
            lang.languageId === data.nativeLanguageId
        ) || null
      );
      setSelectedLearningLanguage(
        data.languageList?.find(
          (lang: { languageId: number }) =>
            lang.languageId === data.learningLanguageId
        ) || null
      );
    } else {
      console.log("Error fetching user settings");
    }
  };

  const getUserId = () => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      return storedUserId ? parseInt(storedUserId, 10) : 0;
    }
    return 0;
  };

  const [userId, setUserId] = useState(getUserId());

  useEffect(() => {
    setUserId(getUserId());
    fetchUserSettingsData(userId);
    fetchLanguageListData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [userId]); // userIdを依存配列に追加

  if (isLoading) {
    return <Common.LoadingIndicator />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative">
      <h1 className="text-2xl font-bold text-left mb-6">User Settings</h1>
      <form>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Native Language:
          </label>
          <Listbox
            value={selectedNativeLanguage}
            onChange={(value) => {
              setSelectedNativeLanguage(value);
            }}
          >
            <div className="relative mt-2">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <span className="block truncate">
                  {selectedNativeLanguage
                    ? selectedNativeLanguage.languageName
                    : "Select a language"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </span>
              </ListboxButton>
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {languageList.map(
                  (language: { languageId: number; languageName: string }) => (
                    <ListboxOption
                      key={language.languageId}
                      value={language}
                      className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                    >
                      <span className="block truncate font-normal group-data-[selected]:font-semibold">
                        {language.languageName}
                      </span>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                    </ListboxOption>
                  )
                )}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Learning Language:
          </label>
          <Listbox
            value={selectedLearningLanguage}
            onChange={(value) => {
              setSelectedLearningLanguage(value);
            }}
          >
            <div className="relative mt-2">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <span className="block truncate">
                  {selectedLearningLanguage
                    ? selectedLearningLanguage.languageName
                    : "Select a language"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </span>
              </ListboxButton>
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {languageList.map(
                  (language: { languageId: number; languageName: string }) => (
                    <ListboxOption
                      key={language.languageId}
                      value={language}
                      className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                    >
                      <span className="block truncate font-normal group-data-[selected]:font-semibold">
                        {language.languageName}
                      </span>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                    </ListboxOption>
                  )
                )}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <div className="mb-5">
          <label
            htmlFor="subscriptionStatus"
            className="block text-sm font-medium text-gray-700"
          >
            Subscription Status:
          </label>
          <input
            type="text"
            id="subscriptionStatus"
            value={subscriptionStatus}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            // onClick={() => onSubscriptionUpdate(subscriptionStatus)}
            className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Subscription
          </button>
        </div>
        <div className="mb-5">
          <label
            htmlFor="highlightColor"
            className="block text-sm font-medium text-gray-700"
          >
            Highlight Color:
          </label>
          <input
            type="color"
            id="highlightColor"
            value={highlightColor}
            onChange={(e) => setHighlightColor(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-between mb-2">
          <button
            type="button"
            onClick={() => router.push("/settings")}
            className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Backward
          </button>
          <button
            type="submit"
            className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSettingsForm;
