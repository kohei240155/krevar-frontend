"use client";

import { IoPerson } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { type Session } from "next-auth";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

const Header = ({ session }: { session: Session | null }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !event.composedPath().some(el => (el as HTMLElement).classList?.contains('dropdown'))) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center">
        <Link href="/" className="text-4xl font-bold">
          ▶ IRUKA
        </Link>
      </div>
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
      <ul className={`flex-col md:flex-row md:flex items-center space-x-8 ${isMenuOpen ? 'flex' : 'hidden'}`}>
        <li className="hover:text-blue-600 transition-colors duration-300">
          <Link href="/" className="text-lg">
            Deck List
          </Link>
        </li>
        <li className="hover:text-blue-600 transition-colors duration-300">
          <Link href="/decks/new" className="text-lg">
            Add Deck
          </Link>
        </li>
        <li className="hover:text-blue-600 transition-colors duration-300">
          <Link href="/statistic" className="text-lg">
            Statistic
          </Link>
        </li>
        {session ? (
          <li className="relative flex items-center space-x-2 dropdown">
            <IoPerson className="text-2xl" />
            <span>{session.user?.name}</span>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-40 w-48 bg-white shadow-lg dropdown">
                <li className="hover:bg-gray-100 transition-colors duration-300">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left"
                  >
                    Logout
                  </button>
                </li>
                <li className="hover:bg-gray-100 transition-colors duration-300">
                  <Link href="/information" className="block w-full px-4 py-2 text-left">
                    Information
                  </Link>
                </li>
              </ul>
            )}
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