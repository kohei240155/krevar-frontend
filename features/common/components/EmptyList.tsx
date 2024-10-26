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

  const buttonAction = () => {
    router.push(forwardUrl);
  };

  const backButtonAction = () => {
    router.push(backUrl);
  };

  return (
    <div className="p-4">
      <p className="text-gray-500 text-center mt-4 text-xl">{message}</p>
      <div className="flex justify-between mt-32">
        <button
          className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={backButtonAction} // 修正: backButtonActionを使用
        >
          Backward
        </button>
        <button
          className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={buttonAction}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default EmptyList;
