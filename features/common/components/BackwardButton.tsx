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
      className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      onClick={() => router.push(`/deck/page/${pageNumber}`)}
    >
      Backward
    </button>
  );
};

export default BackwardButton;
