"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ColorResult } from "react-color";
import { imageGenerationPrompt } from "../../../../../prompts/promptForImage";
import { literaryAnalysisPrompt } from "../../../../../prompts/promptForMeaning";
import MeaningInput from "../../../../../features/routes/word/components/MeaningInput";
import NuanceInput from "../../../../../features/routes/word/components/NuanceInput";
import ImageDisplay from "../../../../../features/routes/word/components/ImageDisplay";
import WordInput from "../../../../../features/routes/word/components/WordInput";
import { useParams } from "next/navigation";
import { createWord } from "../../../../../features/routes/word/utils/api";
import { LoadingIndicator } from "../../../../../features/common";
import { toast } from "react-toastify";
import { GoQuestion } from "react-icons/go";
import Modal from "../../../../../features/routes/word/components/Modal";
import { fetchDeck } from "../../../../../features/routes/deck/utils/api";
import ImageGenerateButton from "../../../../../features/routes/word/components/ImageGenerateButton";
import BackwardButton from "../../../../../features/routes/word/components/BackwardButton";
import { DeckInfo } from "../../../../../features/routes/deck/types/deck";

/**
 * 単語登録ページ
 */
const WordCreatePage = () => {
  const [deckName, setDeckName] = useState("");
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const wordRef = useRef<HTMLElement>(null);
  const [highlightColor, setHighlightColor] = useState("#ffff00");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [nuance, setNuance] = useState("");
  const [isImageGenerated, setIsImageGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGpt, setIsLoadingGpt] = useState(false);
  const params = useParams();
  const deckId = params?.deckId as unknown as number | undefined;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const jwt =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("JWT="))
      ?.split("=")[1] || "";

  const fetchDeckData = useCallback(async () => {
    const data: DeckInfo = await fetchDeck(deckId as number, jwt);
    setDeckName(data.deckName);
  }, [deckId, jwt]);

  useEffect(() => {
    fetchDeckData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchDeckData]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const wordHtml =
        (wordRef.current as unknown as HTMLElement)?.innerHTML || "";
      const nuanceText = nuance.trim() !== "" ? nuance : "";
      const wordData = {
        originalText: wordHtml,
        translatedText: meaning,
        imageUrl: imageUrl,
        deckId: deckId,
        nuanceText: nuanceText,
      };
      await createWord(wordData, jwt);
    } catch (error) {
      console.error("Error submitting word:", error);
    }
  };

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.backgroundColor = highlightColor;
      span.dataset.highlighted = "true";

      const container = range.commonAncestorContainer;
      const parentElement =
        container.nodeType === 1 ? container : container.parentElement;
      const existingHighlights = (
        parentElement as HTMLElement
      )?.querySelectorAll('span[data-highlighted="true"]');
      existingHighlights?.forEach((highlight) => {
        const parent = highlight.parentNode;
        while (highlight.firstChild) {
          parent?.insertBefore(highlight.firstChild, highlight);
        }
        parent?.removeChild(highlight);
      });

      range.surroundContents(span);
    }
  };

  const handleColorChange = (color: ColorResult) => {
    setHighlightColor(color.hex);
  };

  const handleImageGenerate = async () => {
    setIsLoadingGpt(true);
    try {
      const wordHtml =
        (wordRef.current as unknown as HTMLElement)?.innerHTML || "";
      console.log("Word HTML:", wordHtml);
      const highlightedText =
        (wordHtml.match(/<span[^>]*>(.*?)<\/span>/) || [])[1] || "";
      console.log("Highlighted text:", highlightedText);
      const promptForMeaning = literaryAnalysisPrompt.replacePlaceholders(
        wordHtml,
        highlightedText
      );

      // const gptResponse = await fetch(
      //   "https://api.openai.com/v1/chat/completions",
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       model: "gpt-4o-mini",
      //       messages: [
      //         { role: "system", content: "You are a helpful assistant." },
      //         { role: "user", content: JSON.stringify(promptForMeaning) },
      //       ],
      //     }),
      //   }
      // );

      // const gptData = await gptResponse.json();
      // const wordData = JSON.parse(gptData.choices[0].message.content);

      const promptForImage = imageGenerationPrompt.replacePlaceholders(
        wordHtml,
        highlightedText
      );

      // const dalleResponse = await fetch(
      //   "https://api.openai.com/v1/images/generations",
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       model: "dall-e-3",
      //       quality: "standard",
      //       style: "vivid",
      //       prompt: JSON.stringify(promptForImage),
      //       n: 1,
      //       size: "1024x1024",
      //     }),
      //   }
      // );

      // const dalleData = await dalleResponse.json();
      // const imageUrl = dalleData.data[0].url;

      // setMeaning(wordData.wordMeaning);
      // setNuance(wordData.wordNuance);
      setMeaning("テスト意味");
      setNuance("テストニュアンス");
      setImageUrl("https://example.com/image.jpg");

      setIsImageGenerated(true);
      setWord(wordHtml);
      console.log("Image and word data generated successfully.");
    } catch (error) {
      console.error("Error generating image and word data:", error);
    } finally {
      setIsLoadingGpt(false);
    }
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

  const handlePaste = (event: React.ClipboardEvent) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));
  };

  const handleSuccessToast = () => {
    toast.success("Word added successfully!", {
      autoClose: 1500,
    });
    setTimeout(() => {
      window.location.href = "/deck/page/1";
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-3 text-left align-middle">
          Add Word
        </h1>
        <GoQuestion
          onClick={() => setIsModalOpen(true)}
          className="mb-3 text-2xl"
        />
      </div>
      <p className="text-base mb-3 text-left">{deckName}</p>
      <Modal open={isModalOpen} setOpen={setIsModalOpen} />
      <form onSubmit={handleSubmit}>
        <WordInput
          wordRef={wordRef as React.RefObject<HTMLElement>}
          word={word}
          setWord={setWord}
          highlightColor={highlightColor}
          displayColorPicker={displayColorPicker}
          handleHighlight={handleHighlight}
          handleReset={handleReset}
          handleColorChange={handleColorChange}
          setDisplayColorPicker={setDisplayColorPicker}
          disabled={isLoadingGpt}
        />
        {!isImageGenerated && (
          <>
            <ImageGenerateButton
              onClick={handleImageGenerate}
              isLoading={isLoadingGpt}
            />
            <BackwardButton pageNumber={1} />
          </>
        )}
        {isImageGenerated && (
          <>
            <MeaningInput meaning={meaning} setMeaning={setMeaning} />
            <NuanceInput nuance={nuance} setNuance={setNuance} />
            <ImageDisplay imageUrl={imageUrl} />
            <div className="flex justify-between mb-2">
              <button
                type="button"
                onClick={handleSuccessToast}
                className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Backward
              </button>
              <button
                type="submit"
                className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Register
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default WordCreatePage;
