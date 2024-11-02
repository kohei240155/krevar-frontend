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
      className="relative rounded-lg flex flex-col md:flex-row justify-between items-center p-5 bg-white shadow-md space-y-2 md:space-y-0 md:space-x-4 deck-list-item"
      style={{
        height: "auto",
        minHeight: "120px",
        position: "relative",
        border: "1px solid #e0e0e0",
      }}
    >
      <div className="flex flex-col space-y-1 deck-info ml-2">
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
