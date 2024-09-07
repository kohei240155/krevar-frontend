"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import * as Common from "../../../common/index";
import { ColorResult } from "react-color";
import WordInput from "./WordInput";
import MeaningInput from "./MeaningInput";
import NuanceInput from "./NuanceInput";
import ImageDisplay from "./ImageDisplay";
import DeleteConfirmModal from "./../../../common/components/DeleteConfirmModal";
import { WordEditFormProps } from "../types/word";

const WordEditForm: React.FC<WordEditFormProps> = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [deckId, setDeckId] = useState("1");
  const [nuance, setNuance] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const wordId = searchParams?.get("wordId") || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wordRef = useRef<HTMLElement>(null);
  const [highlightColor, setHighlightColor] = useState("#ffff00");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useState("4")[0];

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
    const fetchWordData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/word/${userId}/${wordId}`,
          {
            credentials: "include",
          }
        );
        const wordData = await response.json();
        setWord(wordData.originalText);
        setMeaning(wordData.translatedText);
        setImageUrl(wordData.imageUrl);
        setDeckId(wordData.deckId);
        setNuance(wordData.nuanceText);
      } catch (error) {
        console.log("Error fetching word data:", error);
      }
    };

    fetchWordData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [wordId, userId]);

  if (isLoading) {
    return <Common.LoadingIndicator />;
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
      const response = await fetch(
        `http://localhost:8080/api/word/${userId}/${deckId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            originalText: wordHtml,
            translatedText: meaning,
            imageUrl: imageUrl,
            deckId: deckId,
            nuanceText: nuance,
          }),
        }
      );
      if (response.ok) {
        toast.success("Word updated successfully!");
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      toast.error("Error updating word: " + error);
    }
  };

  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/word/${userId}/${wordId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        toast.success("Word deleted successfully!");
        router.back();
      } else {
        toast.error("Error deleting word.");
      }
    } catch (error) {
      toast.error("Error deleting word: " + error);
    } finally {
      setIsModalOpen(false);
    }
  };

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
          />
          <MeaningInput meaning={meaning} setMeaning={setMeaning} />
          <NuanceInput nuance={nuance} setNuance={setNuance} />
          <ImageDisplay imageUrl={imageUrl} />
          <div className="flex justify-between mb-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              backward
            </button>
            <button
              type="submit"
              className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default WordEditForm;
