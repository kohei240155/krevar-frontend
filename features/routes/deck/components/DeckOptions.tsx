import React from "react";
import { DeckOptionsProps } from "../types/deck";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { IoList } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";

const navigation = [
  {
    name: "Add Word",
    action: "word-add",
    icon: <MdOutlineLibraryAdd className="text-xl" />,
  },
  {
    name: "Word List",
    action: "word-list",
    icon: <IoList className="text-xl" />,
  },
  {
    name: "Edit Deck",
    action: "deck-settings",
    icon: <FaRegEdit className="text-xl" />,
  },
  {
    name: "Extra Quiz",
    action: "extra-quiz",
    icon: <MdOutlineQuiz className="text-xl" />,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const DeckOptions: React.FC<DeckOptionsProps> = ({
  deck,
  onOptionItemClick,
}) => {
  return (
    <nav
      aria-label="Sidebar"
      className="absolute bottom-full w-48 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 mb-2 z-50"
    >
      <ul role="list" className="-mx-2 space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              onClick={(e) => onOptionItemClick(e, item.action, deck)}
              className={classNames(
                "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 cursor-pointer"
              )}
            >
              <span className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DeckOptions;
