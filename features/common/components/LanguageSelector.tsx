import React from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Language {
  id: number;
  languageName: string;
}

interface LanguageSelectorProps {
  selectedLanguageId: number;
  onChange: (id: number) => void;
  languageList: Language[];
  label: string;
  getLanguageName: (id: number) => string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguageId,
  onChange,
  languageList,
  label,
  getLanguageName,
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Listbox value={selectedLanguageId} onChange={onChange}>
        <div className="relative mt-2">
          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <span className="block truncate">
              {getLanguageName(selectedLanguageId)}
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
  );
};

export default LanguageSelector;
