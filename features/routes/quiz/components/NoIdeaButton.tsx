import React from "react";

interface NoIdeaButtonProps {
  onClick: () => void;
}

const NoIdeaButton: React.FC<NoIdeaButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-36 md:w-48 px-6 py-3 bg-white text-gray-700 border border-gray-700 rounded-lg hover:bg-gray-100 transition"
  >
    No Idea
  </button>
);

export default NoIdeaButton;
