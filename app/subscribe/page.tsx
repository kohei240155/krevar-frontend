"use client";

import React, { useState } from "react";

const SubscribeButton = ({ selectedPlan }: { selectedPlan: string }) => {
  const handleSubscription = async () => {
    try {
      // ユーザーIDをメタデータとしてバックエンドに送信して、Checkoutセッションを作成
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

      // StripeのCheckoutページにリダイレクト
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <button onClick={handleSubscription} type="button">
      Subscribe to {selectedPlan} Plan
    </button>
  );
};

const SubscribePage = () => {
  const [selectedPlan, setSelectedPlan] = useState("basic"); // デフォルトはベーシックプラン

  return (
    <div>
      <h1>Subscribe to our Monthly Plans</h1>
      <p>以下のプランから選択してください。</p>
      <select
        value={selectedPlan}
        onChange={(e) => setSelectedPlan(e.target.value)}
      >
        <option value="basic">Basic Plan - 500円/月</option>
        <option value="premium">Premium Plan - 1000円/月</option>
        <option value="pro">Pro Plan - 1500円/月</option>
      </select>
      <SubscribeButton selectedPlan={selectedPlan} />
    </div>
  );
};

export default SubscribePage;
