"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import googleIcon from "../../public/web_light_sq_ctn.svg";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    // ログイン済みの場合はTOPページにリダイレクト
    if (status === "authenticated") {
      redirect("/");
    }
  }, [session, status]);

  const handleLogin = (provider: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    const result = await signIn(provider);

    // ログインに成功したらTOPページにリダイレクト
    if (result) {
      redirect("/");
    }
  };

  const handleEmailLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) {
      setEmailError("Email is mandatory.");
    } else {
      setEmailError("");
      // Emailでのログイン処理をここに追加
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md" onSubmit={handleEmailLogin}>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleLogin("google")}
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 dark:hover:bg-[#4285F4]/30 me-2 mb-2"
          >
            <svg className="w-4 h-4 me-2 -ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
              <path d="M17.64 9.2045c0-.638-.057-1.252-.164-1.84H9v3.481h4.844c-.209 1.125-.82 2.08-1.744 2.72v2.26h2.82c1.65-1.52 2.59-3.76 2.59-6.32z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.47-.81 5.96-2.19l-2.82-2.26c-.79.53-1.79.85-2.89.85-2.22 0-4.1-1.5-4.77-3.51H2.54v2.2C4.03 16.98 6.36 18 9 18z" fill="#34A853"/>
              <path d="M4.23 10.89c-.18-.53-.28-1.09-.28-1.66s.1-1.13.28-1.66V5.36H2.54C1.92 6.59 1.5 8.02 1.5 9.5s.42 2.91 1.04 4.14l1.69-2.75z" fill="#FBBC05"/>
              <path d="M9 3.58c1.32 0 2.5.45 3.43 1.34l2.57-2.57C13.47 1.23 11.43 0 9 0 6.36 0 4.03 1.02 2.54 2.8l1.69 2.75C4.9 5.08 6.78 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button
            onClick={handleLogin("facebook")}
            type="button"
            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
          >
            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
              <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
            </svg>
            Continue with Facebook
          </button>
          <button
            onClick={handleLogin("apple")}
            type="button"
            className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
            <svg className="w-5 h-5 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
            </svg>
            Continue with Apple
          </button>
        </div>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {emailError && (
            <p className="mt-2 text-sm text-red-600">{emailError}</p>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Continue with email
        </button>
      </form>
    </div>
  );
};

export default LoginPage;