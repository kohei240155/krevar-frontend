"use client";

import React from "react";
import { ButtonLoadingIndicator } from "../../../common";

interface ImageGenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const ImageGenerateButton: React.FC<ImageGenerateButtonProps> = ({
  onClick,
  isLoading,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      disabled={isLoading}
    >
      {isLoading && <ButtonLoadingIndicator />}
      Image generate
    </button>
  );
};

export default ImageGenerateButton;
