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
      className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
      Subscribe to {selectedPlan} Plan
    </button>
  );
};

const SubscribePage = () => {
  const [selectedPlan, setSelectedPlan] = useState("basic"); // デフォルトはベーシックプラン

  return (
    <div className="relative p-5">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Subscribe to our Monthly Plans
        </h1>
        <p className="mb-4 text-center">以下のプランから選択してください。</p>
        <select
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        >
          <option value="basic">Basic Plan - 500円/月</option>
          <option value="premium">Premium Plan - 1000円/月</option>
          <option value="pro">Pro Plan - 1500円/月</option>
        </select>
        <SubscribeButton selectedPlan={selectedPlan} />
      </div>
    </div>
  );
};

export default SubscribePage;
