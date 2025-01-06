"use client";
import React from "react";
import { useRouter } from "next/navigation";

export interface EmptyListProps {
  message: string;
  buttonText: string;
  backUrl: string;
  forwardUrl: string;
}

const EmptyList: React.FC<EmptyListProps> = ({
  message,
  buttonText,
  backUrl,
  forwardUrl,
}) => {
  const router = useRouter();

  // 進むボタン押下時の処理
  const forwardButtonAction = () => {
    router.push(forwardUrl);
  };

  // 戻るボタン押下時の処理
  const backButtonAction = () => {
    router.push(backUrl);
  };

  return (
    <>
      <div className="p-4 bg-white shadow-md rounded-lg">
        {/* 表示対象がない旨を伝えるメッセージ */}
        <p className="text-gray-500 text-center mt-14 text-xl">{message}</p>
        {/* 戻るボタン */}
        <div className="flex justify-between mt-28">
          {backUrl && (
            <button
              className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={backButtonAction}
            >
              Backward
            </button>
          )}
          {/* 進むボタン */}
          <button
            className={`${
              backUrl ? "flex-1 max-w-[45%]" : "w-[90%] mx-auto"
            } inline-flex items-center justify-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
            onClick={forwardButtonAction}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default EmptyList;
