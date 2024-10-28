import { Word } from "../types/word";
import WordSettingsButton from "./WordSettingsButton";

export interface WordItemProps {
  word: Word;
  deckId: string;
}

const WordItem: React.FC<WordItemProps> = ({ word, deckId }) => {
  const extractHighlightedText = (text: string) => {
    const match = text.match(/<span.*?>(.*?)<\/span>/);
    return match ? match[1] : text;
  };

  return (
    <li
      className="relative flex flex-row justify-between items-center p-3 pr-4 bg-white rounded-lg shadow-md space-x-4 word-list-item"
      style={{
        height: "auto",
        minHeight: "120px",
        position: "relative",
        border: "1px solid #e0e0e0",
      }}
    >
      <div
        className="absolute left-0 w-1 bg-gray-500"
        style={{
          height: "95%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>
      <div className="flex flex-col">
        <span className="text-lg font-medium">
          {extractHighlightedText(word.originalText)}
        </span>
        <span className="text-gray-600">{word.translatedText}</span>
      </div>
      <div className="pr-1">
        <WordSettingsButton wordId={word.id.toString()} deckId={deckId} />
      </div>
    </li>
  );
};

export default WordItem;
