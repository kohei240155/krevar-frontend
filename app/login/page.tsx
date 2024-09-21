"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";

const LoginPage = () => {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // 認証が成功したらJWTが取得できているか確認
    if (status === "authenticated" && session) {
      const fetchJWT = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/auth/google-login",
            {
              email: session.user?.email,
              name: session.user?.name,
              googleId: session.user?.id,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );

          if (response.status === 200) {
            const jwtToken = response.data.token; // JWTをレスポンスから取得
            localStorage.setItem("JWT", jwtToken); // ローカルストレージに保存
            localStorage.setItem("userId", response.data.userId); // ローカルストレージに保存
            console.log("ローカルストレージにJWTを保存しました。");
            router.push("/deck");
          } else {
            console.error("JWTの取得に失敗しました。");
          }
        } catch (error) {
          console.error("JWTの取得エラー", error);
        }
      };

      fetchJWT();
    }
  }, [status, session, router]);

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      // Google認証を行う
      await signIn("google", { redirect: false });
    } catch (error: any) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="relative p-5">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <div className="flex justify-center">Login with Google</div>
            <div className="mt-6 grid grid-cols-1 gap-4">
              <a
                href="#"
                onClick={handleLogin}
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  />
                </svg>
                <span className="text-sm font-semibold leading-6">Google</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
