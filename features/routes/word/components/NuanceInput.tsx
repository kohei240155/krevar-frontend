import React from "react";

export interface NuanceInputProps {
  nuance: string;
  setNuance: (value: string) => void;
}

const NuanceInput: React.FC<NuanceInputProps> = ({ nuance, setNuance }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="nuance"
        className="block text-sm font-medium text-gray-700"
      >
        Nuance:
      </label>
      <input
        type="text"
        id="nuance"
        value={nuance}
        onChange={(e) => setNuance(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
      />
    </div>
  );
};

export default NuanceInput;
