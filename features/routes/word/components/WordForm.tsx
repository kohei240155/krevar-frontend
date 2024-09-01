import Image from "next/image";
import ContentEditable from "react-contenteditable";

interface WordFormProps {
    wordRef: React.RefObject<HTMLElement>;
    word: string;
    setWord: (value: string) => void;
    meaning: string;
    setMeaning: (value: string) => void;
    nuance: string;
    setNuance: (value: string) => void;
    imageUrl: string;
  }

  const WordForm: React.FC<WordFormProps> = ({
    wordRef,
    word,
    setWord,
    meaning,
    setMeaning,
    nuance,
    setNuance,
    imageUrl,
  }) => (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="word" className="block text-sm font-medium text-gray-700">Word:</label>
        <ContentEditable
          innerRef={wordRef}
          html={word}
          onChange={(e) => setWord(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="meaning" className="block text-sm font-medium text-gray-700">Meaning:</label>
        <input
          type="text"
          id="meaning"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="nuance" className="block text-sm font-medium text-gray-700">Nuance:</label>
        <input
          type="text"
          id="nuance"
          value={nuance}
          onChange={(e) => setNuance(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image:</label>
        {imageUrl && (
          <Image src={`/images/testImages/${imageUrl}`} alt="Word Image" width={500} height={300} className="mt-2 max-w-full h-auto rounded-md shadow-sm" />
        )}
      </div>
    </form>
  );

export default WordForm;