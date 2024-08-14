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
    <header className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="text-4xl font-bold ml-0">
          ▶ IRUKA
        </Link>
        <button data-collapse-toggle="navbar-multi-level" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:hidden bg-gray-50 dark:bg-gray-800`} id="navbar-multi-level">
        <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg dark:border-gray-700">
          <li>
            <Link href="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Deck List</Link>
          </li>
          <li>
            <Link href="/decks/new" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Deck</Link>
          </li>
          <li>
            <Link href="/statistic" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Statistic</Link>
          </li>
          {session ? (
            <>
              <li>
                <Link href="/information" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Information</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </li>
            </>
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
      </div>
    </header>
  );
};

export default Header;