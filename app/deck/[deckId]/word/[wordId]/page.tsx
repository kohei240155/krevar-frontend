"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import { ColorResult } from "react-color";
// import ImageDisplay from "../../../../../features/routes/word/components/ImageDisplay";
import {
  deleteWord,
  fetchWordData,
  updateWord,
} from "../../../../../features/routes/word/utils/api";
import {
  DeleteConfirmModal,
  LoadingIndicator,
} from "../../../../../features/common";
import WordInput from "../../../../../features/routes/word/components/WordInput";
import MeaningInput from "../../../../../features/routes/word/components/MeaningInput";
import NuanceInput from "../../../../../features/routes/word/components/NuanceInput";

export interface WordEditPageProps {
  userId: number;
  wordId: string;
}

const WordEditPage: React.FC<WordEditPageProps> = ({ userId }) => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [nuance, setNuance] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const wordId = parseInt(searchParams?.get("wordId") || "0", 10);
  const deckId = parseInt(searchParams?.get("deckId") || "0", 10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wordRef = useRef<HTMLElement>(null);
  const [highlightColor, setHighlightColor] = useState("#ffff00");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleReset = () => {
    const wordHtml =
      (wordRef.current as unknown as HTMLElement)?.innerHTML || "";
    const cleanedWord = wordHtml.replace(/<[^>]+>/g, "");
    setWord(cleanedWord);
    if (wordRef.current) {
      (wordRef.current as unknown as HTMLElement).innerHTML = cleanedWord;
    }
  };

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const wordData = await fetchWordData(wordId);
        setWord(wordData.originalText);
        setMeaning(wordData.translatedText);
        setImageUrl(wordData.imageUrl);
        setNuance(wordData.nuanceText);
      } catch (error) {
        console.log("Error fetching word data:", error);
      }
    };

    fetchWord();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [wordId, userId]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const wordHtml =
        (wordRef.current as unknown as HTMLElement)?.innerHTML || "";
      const wordData = {
        wordId: wordId,
        userId: userId,
        originalText: wordHtml,
        translatedText: meaning,
        nuanceText: nuance,
        deckId: deckId,
      };
      await updateWord(wordData);
      toast.success("Word updated successfully!");
    } catch (error) {
      toast.error("Error updating word: " + error);
    }
  };

  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteWord(wordId);
      toast.success("Word deleted successfully!");
      router.back();
    } catch (error) {
      toast.error("Error deleting word: " + error);
    } finally {
      setIsModalOpen(false);
    }
  };

  // const formatImageUrl = (url: string) => {
  //   const fileName = url.split("/").pop();
  //   return `/images/testImages/${fileName}`;
  // };

  return (
    <div className="p-5">
      <div className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-left">Edit Word</h1>
          <button
            onClick={handleDelete}
            className="w-10 h-10 flex items-center justify-center rounded-full text-red-600 bg-white border border-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <FaTrash />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <WordInput
            wordRef={wordRef}
            word={word}
            setWord={setWord}
            highlightColor={highlightColor}
            displayColorPicker={displayColorPicker}
            handleHighlight={handleHighlight}
            handleReset={handleReset}
            handleColorChange={handleColorChange}
            setDisplayColorPicker={setDisplayColorPicker}
            disabled={false}
          />
          <MeaningInput meaning={meaning} setMeaning={setMeaning} />
          <NuanceInput nuance={nuance} setNuance={setNuance} />
          {/* <ImageDisplay imageUrl={formatImageUrl(imageUrl)} /> */}
          <div className="flex justify-between mb-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              backward
            </button>
            <button
              type="submit"
              className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Update
            </button>
          </div>
        </form>

        <DeleteConfirmModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onConfirmDelete={confirmDelete}
          targetWord="word"
        />
      </div>
    </div>
  );
};

export default WordEditPage;
