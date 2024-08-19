"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import googleIcon from "../../public/web_light_sq_ctn.svg";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleClose = () => {
    router.back(); // 前のページに戻る
  };

  return (
    <div className="p-5">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md h-72">
        <div className="flex justify-end">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
            onClick={handleClose}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-medium text-gray-900">▶IRUKA</h2>
          <h2 className="mt-5 text-lg font-medium text-gray-900">これからはイメージで単語を覚えよう！</h2>
          <p className="mt-2 text-sm text-gray-600">毎日継続することが重要です。</p>
        </div>
        {/* ボタンの配置を下に移動 */}
        <div className="mt-16 text-center">
          <button
            onClick={handleLogin("google")}
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 text-gray-600 bg-white border border-blue-300 hover:bg-blue-50 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg"
          >
            <svg className="w-5 h-5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
              <path d="M17.64 9.2045c0-.638-.057-1.252-.164-1.84H9v3.481h4.844c-.209 1.125-.82 2.08-1.744 2.72v2.26h2.82c1.65-1.52 2.59-3.76 2.59-6.32z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.47-.81 5.96-2.19l-2.82-2.26c-.79.53-1.79.85-2.89.85-2.22 0-4.1-1.5-4.77-3.51H2.54v2.2C4.03 16.98 6.36 18 9 18z" fill="#34A853"/>
              <path d="M4.23 10.89c-.18-.53-.28-1.09-.28-1.66s.1-1.13.28-1.66V5.36H2.54C1.92 6.59 1.5 8.02 1.5 9.5s.42 2.91 1.04 4.14l1.69-2.75z" fill="#FBBC05"/>
              <path d="M9 3.58c1.32 0 2.5.45 3.43 1.34l2.57-2.57C13.47 1.23 11.43 0 9 0 6.36 0 4.03 1.02 2.54 2.8l1.69 2.75C4.9 5.08 6.78 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;