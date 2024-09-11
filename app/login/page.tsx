"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  useEffect(() => {
    // ログイン済みの場合はTOPページにリダイレクト
    if (status === "authenticated") {
      router.push("/deck");
    }
  }, [session, status, router]);

  const handleLogin = (provider: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    const result = await signIn(provider);

    // ログインに成功したらDeckListページにリダイレクト
    // if (result?.ok) {
    //   router.push("/deck");
    // } else {
    //   // エラーハンドリング
    //   alert(result?.error || "Login failed");
    // }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    if (isCreatingAccount) {
      // 新規ユーザー登録
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Account created successfully. Please log in.");
        setIsCreatingAccount(false);
      } else {
        alert("Failed to create account");
      }
    } else {
      // ログイン
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/deck");
      } else {
        // エラーハンドリング
        alert(result?.error || "Invalid credentials");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <Image
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            width={40}
            height={40}
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isCreatingAccount
              ? "Create an account"
              : "Sign in to your account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {isCreatingAccount
                    ? "Password (8 or more characters)"
                    : "Password"}
                </label>
                {!isCreatingAccount && (
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isCreatingAccount ? "Create an account" : "Sign In"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {isCreatingAccount ? (
              <a
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                href="#"
                onClick={() => setIsCreatingAccount(false)}
              >
                Sign in to your account
              </a>
            ) : (
              <>
                Not registered?{" "}
                <a
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  href="#"
                  onClick={() => setIsCreatingAccount(true)}
                >
                  Create an account
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
