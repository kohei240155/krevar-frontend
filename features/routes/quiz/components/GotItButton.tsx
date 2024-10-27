import React from "react";

interface GotItButtonProps {
  onClick: () => void;
}

const GotItButton: React.FC<GotItButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-40 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
  >
    Got It
  </button>
);

export default GotItButton;
