"use client";

import { IoPerson } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { type Session } from "next-auth";
import { useState } from "react";

const Header = ({ session }: { session: Session | null }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center">
        <Link href="/" className="text-4xl font-bold">
          ▶ IRUKA
        </Link>
      </div>
      <ul className="flex items-center space-x-8">
        <li>
          <Link href="/decks/new" className="text-lg">
            Add Deck
          </Link>
        </li>
        <li>
          <Link href="/statistic" className="text-lg">
            Statistic
          </Link>
        </li>
        <li>
          <Link href="/information" className="text-lg">
            Information
          </Link>
        </li>
        {session ? (
          <li className="flex items-center space-x-2">
            <IoPerson className="text-2xl" />
            <span>{session.user?.name}</span>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          </li>
        ) : (
          <li>
            <Link href="/login">
              <button className="rounded-lg bg-blue-600 px-4 py-[7px] text-white hover:bg-blue-700">
                Login
              </button>
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;