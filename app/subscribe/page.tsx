"use client";

import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const SubscribeButton = ({ selectedPlan }: { selectedPlan: string }) => {
  const handleSubscription = async () => {
    try {
      const userId = "12345"; // ログインしているユーザーIDをここで取得する想定
      const response = await fetch(
        "http://localhost:8080/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ userId, plan: selectedPlan }), // 選択したプランをバックエンドに送信
        }
      );

      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <button
      onClick={handleSubscription}
      type="button"
      className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
      購入
    </button>
  );
};

const SubscribePage = () => {
  const [selectedPlan, setSelectedPlan] = useState("basic"); // デフォルトはベーシックプラン

  return (
    <div className="relative p-5">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          最適なプランを見つける
        </h1>
        <h2 className="text-2xl font-bold mb-12 text-center text-blue-700">
          料金プラン
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="max-w-xs mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold text-center text-blue-700 mb-4">
                ¥980 /月
              </h3>
              <p className="text-center text-gray-500 mb-4">¥1078 (税込)</p>
              <p className="text-center text-gray-700 mb-4">ベーシックプラン</p>
              <SubscribeButton selectedPlan="basic" />
            </div>
          </div>
          <div className="max-w-xs mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold text-center text-blue-700 mb-4">
                ¥1980 /月
              </h3>
              <p className="text-center text-gray-500 mb-4">¥2178 (税込)</p>
              <p className="text-center text-gray-700 mb-4">バリュープラン</p>
              <SubscribeButton selectedPlan="premium" />
            </div>
          </div>
          <div className="max-w-xs mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold text-center text-blue-700 mb-4">
                ¥2980 /月
              </h3>
              <p className="text-center text-gray-500 mb-4">¥3278 (税込)</p>
              <p className="text-center text-gray-700 mb-4">プレミアムプラン</p>
              <SubscribeButton selectedPlan="pro" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
