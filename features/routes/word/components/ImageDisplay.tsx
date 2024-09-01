import React from "react";
import Image from "next/image";
import { ImageDisplayProps } from "../types/word";

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="imageUrl"
        className="block text-sm font-medium text-gray-700"
      >
        Image:
      </label>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Word Image"
          width={500}
          height={300}
          className="mt-2 max-w-full h-auto rounded-md shadow-sm"
        />
      )}
    </div>
  );
};

export default ImageDisplay;
