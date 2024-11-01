"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ForwardButtonProps {
  url: string;
  label: string;
}

const ForwardButton: React.FC<ForwardButtonProps> = ({ url, label }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
  };

  return (
    <button
      onClick={handleClick}
      className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {label}
    </button>
  );
};

export default ForwardButton;
