"use client";

import Image from "next/image";
import Link from "next/link";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const Header = ({ session }: { session: Session | null }) => {
  // const [isFixed, setIsFixed] = useState(true);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const footer = document.getElementById('footer');
  //     if (footer) {
  //       const footerRect = footer.getBoundingClientRect();
  //       const isFooterVisible = footerRect.top < window.innerHeight;
  //       setIsFixed(!isFooterVisible);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   }
  // }, []);

  return (
    // <header className={`flex items-center justify-between bg-white p-4 shadow-md ${isFixed ? 'fixed top-0 w-full z-10' : ''}`}>
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center">
        <Link href="/" className="text-4xl font-bold">
          ▶ IRUKA
        </Link>
      </div>
      <ul className="flex items-center space-x-8">
        <li>
          <Link href="/decks/new" className="text-lg">
            New Deck
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
          <>
            <li>
              <Image
                src={session.user?.image ?? ""}
                alt={session.user?.name ?? ""}
                width={40}
                height={40}
                className="rounded-full"
              />
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className="rounded-lg bg-blue-500 px-4 py-[7px] text-white hover:bg-gray-600"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">
              <button className="rounded-lg bg-blue-500 px-4 py-[7px] text-white hover:bg-blue-700">
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