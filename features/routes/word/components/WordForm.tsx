import Image from "next/image";
import ContentEditable from "react-contenteditable";
import { WordFormProps } from "../types/word";
import { ColorResult, SketchPicker } from "react-color";
import { useState } from "react";

const WordForm: React.FC<WordFormProps> = ({
  wordRef,
  word,
  setWord,
  meaning,
  setMeaning,
  nuance,
  setNuance,
  imageUrl,
  handleSubmit,
}) => {
  const [highlightColor, setHighlightColor] = useState("#ffff00");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.backgroundColor = highlightColor;
      range.surroundContents(span);
    }
  };

  const handleColorChange = (color: ColorResult) => {
    setHighlightColor(color.hex);
  };

  const handleReset = () => {
    const wordHtml =
      (wordRef.current as unknown as HTMLElement)?.innerHTML || "";
    const cleanedWord = wordHtml.replace(/<[^>]+>/g, "");
    setWord(cleanedWord);
    if (wordRef.current) {
      (wordRef.current as unknown as HTMLElement).innerHTML = cleanedWord;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-1">
        <label
          htmlFor="word"
          className="block text-sm font-medium text-gray-700"
        >
          Word:
        </label>
        <ContentEditable
          innerRef={wordRef}
          html={word}
          onChange={(e) => setWord(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="relative mt-1 mb-4 inline-flex items-center">
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
            style={{ position: "absolute", zIndex: 2, top: "100%", left: 0 }}
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Image:
        </label>
        {imageUrl && (
          <Image
            src={`/images/testImages/${imageUrl}`}
            alt="Word Image"
            width={500}
            height={300}
            className="mt-2 max-w-full h-auto rounded-md shadow-sm"
          />
        )}
      </div>
    </form>
  );
};

export default WordForm;
