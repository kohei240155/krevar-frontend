import { WordItemProps } from "../types/word";

  const WordItem: React.FC<WordItemProps> = ({ word, onEditClick }) => (
    <li
      key={word.id}
      className="flex justify-between items-center p-4 bg-white rounded-lg shadow h-18"
    >
      <div className="flex flex-col items-start space-y-2">
        <span className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: word.originalText }} />
        <span className="text-gray-600" dangerouslySetInnerHTML={{ __html: word.translatedText }} />
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        onClick={() => onEditClick(word.id)}
      >
        Edit
      </button>
    </li>
  );

export default WordItem;