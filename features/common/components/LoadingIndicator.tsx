import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="animate-spin h-10 w-10 border-4 border-gray-500 rounded-full border-t-transparent"></div>
    </div>
  );
};

export default LoadingIndicator;
