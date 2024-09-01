import React from "react";
import { ColorResult, SketchPicker } from "react-color";
import ContentEditable from "react-contenteditable";

interface WordInputProps {
  wordRef: React.RefObject<HTMLElement>;
  word: string;
  setWord: (value: string) => void;
  highlightColor: string;
  displayColorPicker: boolean;
  handleHighlight: () => void;
  handleReset: () => void;
  handleColorChange: (color: ColorResult) => void;
  setDisplayColorPicker: (value: boolean) => void;
}

const WordInput: React.FC<WordInputProps> = ({
  wordRef,
  word,
  setWord,
  highlightColor,
  displayColorPicker,
  handleHighlight,
  handleReset,
  handleColorChange,
  setDisplayColorPicker,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="word" className="block text-sm font-medium text-gray-700">
        Word:
      </label>
      <ContentEditable
        innerRef={wordRef as unknown as React.RefObject<HTMLElement>}
        html={word}
        onChange={(e) => setWord(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
      />
      <div className="relative mt-2 inline-flex items-center">
        <div
          onClick={() => setDisplayColorPicker(!displayColorPicker)}
          className="inline-flex items-center justify-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          style={{
            backgroundColor: highlightColor,
            cursor: "pointer",
            width: "30px",
            height: "30px",
          }}
        />
        <button
          type="button"
          onClick={handleHighlight}
          className="ml-2 inline-flex items-center justify-center px-2 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          style={{ height: "30px", width: "70px" }}
        >
          Apply
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="ml-2 inline-flex items-center justify-center px-2 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          style={{ height: "30px", width: "70px" }}
        >
          Reset
        </button>
        {displayColorPicker && (
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              top: "100%",
              left: 0,
            }}
          >
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              onClick={() => setDisplayColorPicker(false)}
            />
            <SketchPicker color={highlightColor} onChange={handleColorChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WordInput;
