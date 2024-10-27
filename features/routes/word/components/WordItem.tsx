import { Word } from "../types/word";
import WordSettingsButton from "./WordSettingsButton";

export interface WordItemProps {
  word: Word;
  deckId: string;
}

const WordItem: React.FC<WordItemProps> = ({ word, deckId }) => (
  <li
    className="relative flex flex-col md:flex-row justify-between items-center p-3 pr-4 bg-white rounded-lg shadow-md space-y-2 md:space-y-0 md:space-x-4 word-list-item"
    style={{
      height: "auto",
      minHeight: "120px",
      position: "relative",
      border: "1px solid #e0e0e0",
    }}
  >
    <div
      className="absolute left-0 w-1 bg-blue-400"
      style={{
        height: "95%",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    ></div>
    <div className="flex flex-col items-start space-y-2">
      <span
        className="text-lg font-medium"
        dangerouslySetInnerHTML={{ __html: word.originalText }}
      />
      <span className="text-gray-600">{word.translatedText}</span>
    </div>
    <WordSettingsButton wordId={word.id.toString()} deckId={deckId} />
  </li>
);

export default WordItem;
