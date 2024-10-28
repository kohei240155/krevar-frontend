import React, { useEffect, useRef } from "react";
import { Deck } from "../types/deck";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { IoList } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import { useRouter } from "next/navigation";

export interface DeckOptionsProps {
  deck: Deck;
  onClose: () => void;
}

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

const DeckOptions: React.FC<DeckOptionsProps> = ({ deck, onClose }) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOptionItemClick = (e: React.MouseEvent, option: string) => {
    e.stopPropagation();
    switch (option) {
      case "word-add":
        router.push(`/deck/${deck.id}/word/add`);
        break;
      case "word-list":
        router.push(`/deck/${deck.id}/word/page/1`);
        break;
      case "deck-settings":
        router.push(`/deck/${deck.id}`);
        break;
      case "extra-quiz":
        router.push(`/deck/${deck.id}/quiz/extra`);
        break;
      default:
        break;
    }
    onClose();
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <nav
      ref={menuRef}
      aria-label="Sidebar"
      className="absolute bottom-full w-48 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 mb-2 z-50"
    >
      <ul role="list" className="-mx-2 space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              onClick={(e) => handleOptionItemClick(e, item.action)}
              className={classNames(
                "text-gray-700 hover:bg-gray-50 hover:text-gray-700",
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
