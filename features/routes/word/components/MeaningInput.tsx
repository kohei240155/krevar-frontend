import React from "react";

interface MeaningInputProps {
  meaning: string;
  setMeaning: (value: string) => void;
}

const MeaningInput: React.FC<MeaningInputProps> = ({ meaning, setMeaning }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="meaning"
        className="block text-sm font-medium text-gray-700"
      >
        Meaning:
      </label>
      <input
        type="text"
        id="meaning"
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default MeaningInput;
