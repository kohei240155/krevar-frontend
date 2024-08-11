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
            className="w-full bg-red-600 text-white rounded-lg px-4 py-2"
          >
            Continue with Google
          </button>
          <button
            onClick={handleLogin("facebook")}
            type="button"
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2"
          >
            Continue with Facebook
          </button>
          <button
            onClick={handleLogin("apple")}
            type="button"
            className="w-full bg-black text-white rounded-lg px-4 py-2"
          >
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
          className="w-full bg-green-600 text-white rounded-lg px-4 py-2"
        >
          Continue with email
        </button>
      </form>
    </div>
  );
};

export default LoginPage;