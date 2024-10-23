"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import * as Common from "../../../common/index";
import {
  fetchUserSettings,
  fetchLanguageList,
  updateUserSettings,
} from "../utils/api";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { SketchPicker } from "react-color";
import { ColorResult } from "react-color";
import { BASE_URL } from "../../../../utils/api/api";
interface Language {
  id: number;
  languageName: string;
}

const UserSettingsForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [nativeLanguageId, setNativeLanguageId] = useState(0);
  const [learningLanguageId, setLearningLanguageId] = useState(0);
  const [subscriptionStatus, setSubscriptionStatus] = useState(0);
  const [subscriptionId, setSubscriptionId] = useState(0);
  const [highlightColor, setHighlightColor] = useState("#000000");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const [languageList, setLanguageList] = useState<Language[]>([]);

  const [userName, setUserName] = useState("");

  const fetchUserSettingsData = useCallback(async (userId: number) => {
    const data = await fetchUserSettings(userId);
    if (data) {
      // バックエンドから取得したデータをステートに格納
      setUserName(data.name);
      setNativeLanguageId(data.defaultNativeLanguageId);
      setLearningLanguageId(data.defaultLearningLanguageId);
      setSubscriptionStatus(data.subscriptionStatusId);
      setSubscriptionId(data.subscriptionId);
      setHighlightColor(data.highlightColor);
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

  const getUserId = () => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId ? parseInt(storedUserId, 10) : 0;
  };

  const [userId, setUserId] = useState(getUserId());

  const getLanguageName = (id: number) => {
    const language = languageList.find((language) => language.id === id);
    return language ? language.languageName : "";
  };

  const handleColorChange = (color: ColorResult) => {
    setHighlightColor(color.hex);
  };

  useEffect(() => {
    setUserId(getUserId());
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

  const handleSave = () => {
    console.log("Save button clicked");
    updateUserSettings(nativeLanguageId, learningLanguageId, highlightColor);
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/cancel-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId, userId }),
        credentials: "include",
      });

      const data = await response.json();
      if (data.status === "canceled") {
        alert("Subscription has been canceled.");
      } else {
        alert("Failed to cancel subscription.");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
  };

  return (
    <div className="relative p-5">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md relative">
        <h1 className="text-2xl font-bold text-left mb-6">User Settings</h1>
        <div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              User Name:
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Default Native Language:
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
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Default Learning Language:
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
            <button
              onClick={handleCancelSubscription}
              type="button"
              className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Cancel Subscription
            </button>
          </div>
          <div className="mb-5">
            <label
              htmlFor="highlightColor"
              className="block text-sm font-medium text-gray-700"
            >
              Highlight Color:
            </label>
            <div className="flex items-center mt-2">
              <div
                onClick={() => setDisplayColorPicker(!displayColorPicker)}
                className="inline-flex items-center justify-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{
                  backgroundColor: highlightColor,
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                }}
              />
              <span className="ml-2 text-sm text-gray-700">
                {highlightColor}
              </span>
            </div>
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
              onClick={handleSave}
            >
              Save
            </button>
          </div>
          {displayColorPicker && (
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                top: "150px",
                left: "20px",
              }}
            >
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
                onClick={() => setDisplayColorPicker(false)}
              />
              <SketchPicker
                color={highlightColor}
                onChange={handleColorChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsForm;
