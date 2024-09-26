"use client";

import React from "react";
import axios from "axios";
import { useState } from "react";

// クライアントコンポーネントとして定義
const SubscribeButton = () => {
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
          body: JSON.stringify({ userId }),
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
      Subscribe for 500円/month
    </button>
  );
};

const SubscribePage = () => {
  return (
    <div>
      <h1>Subscribe to our Monthly Plan</h1>
      <p>
        毎月500円の継続課金プランに登録するには、下記のボタンをクリックしてください。
      </p>
      <SubscribeButton />
    </div>
  );
};

export default SubscribePage;
