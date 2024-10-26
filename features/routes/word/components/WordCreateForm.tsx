"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ColorResult } from "react-color";
import { imageGenerationPrompt } from "../../../../prompts/promptForImage";
import { literaryAnalysisPrompt } from "../../../../prompts/promptForMeaning";
import * as Common from "../../../common/index";
import MeaningInput from "./MeaningInput";
import NuanceInput from "./NuanceInput";
import ImageDisplay from "./ImageDisplay";
import WordInput from "./WordInput";
import { createWord } from "../utils/api";

const WordForm = ({ userId }: { userId: number }) => {
  const searchParams = useSearchParams();
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
  const deckName = searchParams?.get("deckName") || "Deck Name";
  const deckId = searchParams?.get("deckId") || "0";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Common.LoadingIndicator />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const wordHtml =
        (wordRef.current as unknown as HTMLElement)?.innerHTML || "";
      const nuanceText = nuance.trim() !== "" ? nuance : "";
      const wordData = {
        userId: userId,
        originalText: wordHtml,
        translatedText: meaning,
        imageUrl: imageUrl,
        deckId: deckId,
        nuanceText: nuanceText,
      };
      await createWord(wordData);
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

      const gptResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: JSON.stringify(promptForMeaning) },
            ],
          }),
        }
      );

      const gptData = await gptResponse.json();
      const wordData = JSON.parse(gptData.choices[0].message.content);

      const promptForImage = imageGenerationPrompt.replacePlaceholders(
        wordHtml,
        highlightedText
      );

      const dalleResponse = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "dall-e-3",
            quality: "standard",
            style: "vivid",
            prompt: JSON.stringify(promptForImage),
            n: 1,
            size: "1024x1024",
          }),
        }
      );

      const dalleData = await dalleResponse.json();
      const imageUrl = dalleData.data[0].url;

      setMeaning(wordData.wordMeaning);
      setNuance(wordData.wordNuance);
      setImageUrl(imageUrl);

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

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-3 text-left">Add Word</h1>
      <p className="text-base mb-3 text-left">{deckName}</p>
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
            <button
              type="button"
              onClick={handleImageGenerate}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoadingGpt}
            >
              {isLoadingGpt && <Common.ButtonLoadingIndicator />}
              Image generate
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full mt-3 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoadingGpt}
            >
              Backward
            </button>
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
                onClick={() => router.push("/deck/1")}
                className="w-1/2 mr-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Backward
              </button>
              <button
                type="submit"
                className="w-1/2 ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default WordForm;
