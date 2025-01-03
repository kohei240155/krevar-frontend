"use client";

import React, { useState } from "react";
import { BASE_URL } from "../../utils/api/api";

/**
 *  サブスクリプション
 * @returns
 */
const SubscribeButton = ({ selectedPlan }: { selectedPlan: string }) => {
  const handleSubscription = async () => {
    try {
      // ログインしているユーザーIDをここで取得する想定
      const userId = "4";
      const response = await fetch(`${BASE_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId, plan: selectedPlan }), // 選択したプランをバックエンドに送信
      });

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
      className="mt-4 w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
    >
      購入
    </button>
  );
};

const SubscribePage = () => {
  return (
    <div className="relative p-5">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Upgrade to KREVAR
        </h1>
        <h2 className="text-2xl font-bold mb-12 text-center">
          Choose your plan
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="max-w-xs mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <p className="text-center text-gray-700 mb-4">Trial</p>
              <h3 className="text-2xl font-bold text-center text-blue-700 mb-4">
                ¥500
              </h3>
              <div className="text-center text-gray-700 mb-4">/month</div>
              <SubscribeButton selectedPlan="trial" />
            </div>
          </div>
          <div className="max-w-xs mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <p className="text-center text-gray-700 mb-4">Basic</p>
              <h3 className="text-2xl font-bold text-center text-blue-700 mb-4">
                ¥1300
              </h3>
              <div className="text-center text-gray-700 mb-4">/month</div>
              <SubscribeButton selectedPlan="basic" />
            </div>
          </div>
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <p className="text-center text-gray-700 mb-4">Pro</p>
              <h3 className="text-2xl font-bold text-center text-blue-700 mb-4">
                ¥2000
              </h3>
              <div className="text-center text-gray-700 mb-4">/month</div>
              <SubscribeButton selectedPlan="pro" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
