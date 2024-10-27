"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface BackwardButtonProps {
  pageNumber: number | 1;
}

const BackwardButton: React.FC<BackwardButtonProps> = ({ pageNumber }) => {
  const router = useRouter();

  return (
    <button
      className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => router.push(`/deck/page/${pageNumber}`)}
    >
      Backward
    </button>
  );
};

export default BackwardButton;
