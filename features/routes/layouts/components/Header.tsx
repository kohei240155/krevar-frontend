"use client";

import { IoPerson } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { IoList } from "react-icons/io5";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { BASE_URL } from "../../../../utils/api/api";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      // NextAuth の signOut でフロントエンドのセッション無効化
      await signOut({ callbackUrl: "/" });

      // バックエンド側のセッション無効化APIを呼び出す
      const response = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        !event
          .composedPath()
          .some((el) => (el as HTMLElement).classList?.contains("dropdown"))
      ) {
        setIsDropdownOpen(false);
      }
      if (
        isMenuOpen &&
        !event.composedPath().some((el) => {
          const element = el as HTMLElement;
          return (
            element.id === "navbar-multi-level" ||
            element.getAttribute?.("aria-controls") === "navbar-multi-level"
          );
        })
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isMenuOpen]);

  return (
    <header className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4 h-16">
        <Link
          href={session ? "/deck/page/1" : "/home"}
          className="text-4xl font-bold ml-0 text-gray-900"
        >
          ▶ KREVAR
        </Link>
        {!session ? (
          <Link href="/login">
            <button className="rounded-lg bg-blue-600 px-4 py-[7px] text-white hover:bg-blue-700">
              Login
            </button>
          </Link>
        ) : (
          <>
            <button
              data-collapse-toggle="navbar-multi-level"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-transform transform hover:scale-110"
              aria-controls="navbar-multi-level"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto z-50`}
              id="navbar-multi-level"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-start text-left">
                <li>
                  <Link
                    href="/deck/page/1"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={handleMenuClick}
                  >
                    <IoList className="inline-block mr-2 md:" />
                    Deck List
                  </Link>
                </li>
                <li>
                  <Link
                    href="/deck/add"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={handleMenuClick}
                  >
                    <MdOutlineLibraryAdd className="inline-block mr-2" />
                    Add Deck
                  </Link>
                </li>
                <li>
                  <Link
                    href="/statistic"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={handleMenuClick}
                  >
                    <BsGraphUpArrow className="inline-block mr-2" />
                    Statistic
                  </Link>
                </li>
                {session && (
                  <>
                    <li className="block md:hidden">
                      <Link
                        href="/how-to-use"
                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                        onClick={handleMenuClick}
                      >
                        <GoQuestion className="inline-block mr-2" />
                        How to use
                      </Link>
                    </li>
                    <li className="block md:hidden">
                      <Link
                        href="/user-settings"
                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                        onClick={handleMenuClick}
                      >
                        <IoSettingsOutline className="inline-block mr-2" />
                        User Settings
                      </Link>
                    </li>
                    <li className="block md:hidden">
                      <button
                        onClick={() => {
                          handleLogout();
                          handleMenuClick();
                        }}
                        className="block w-full py-2 px-3 text-left text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                      >
                        <IoLogOutOutline className="inline-block mr-2" />
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {session && (
                  <li className="relative items-center space-x-2 dropdown hidden md:flex">
                    <IoPerson className="text-2xl" />
                    <span>{session.user?.name}</span>
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
                    {isDropdownOpen && (
                      <ul className="absolute right-0 mt-40 w-48 bg-white shadow-lg dropdown">
                        <li className="hover:bg-gray-100 transition-colors duration-300">
                          <Link
                            href="/how-to-use"
                            className="block w-full px-4 py-2 text-left"
                            onClick={() => {
                              handleMenuClick();
                              setIsDropdownOpen(false);
                            }}
                          >
                            <GoQuestion className="inline-block mr-2" />
                            How to use
                          </Link>
                        </li>
                        <li className="hover:bg-gray-100 transition-colors duration-300">
                          <Link
                            href="/user-settings"
                            className="block w-full px-4 py-2 text-left"
                            onClick={() => {
                              handleMenuClick();
                              setIsDropdownOpen(false);
                            }}
                          >
                            <IoSettingsOutline className="inline-block mr-2" />
                            User Settings
                          </Link>
                        </li>
                        <li className="hover:bg-gray-100 transition-colors duration-300">
                          <button
                            onClick={() => {
                              handleLogout();
                              handleMenuClick();
                              setIsDropdownOpen(false);
                            }}
                            className="block w-full px-4 py-2 text-left"
                          >
                            <IoLogOutOutline className="inline-block mr-2" />
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
