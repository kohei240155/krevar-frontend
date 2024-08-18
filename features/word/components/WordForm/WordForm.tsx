"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContentEditable from 'react-contenteditable';
import { SketchPicker, ColorResult } from 'react-color';
import path from 'path';
import Image from 'next/image';
import { imageGenerationPrompt } from '../../../../prompts/promptForImage'; // 拡張子を削除
import { literaryAnalysisPrompt } from '../../../../prompts/promptForMeaning';

const WordForm = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [deckId, setDeckId] = useState('1');
  const router = useRouter();
  const wordRef = useRef('');
  const [highlightColor, setHighlightColor] = useState('#ffff00');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [nuance, setNuance] = useState('');
  const [isImageGenerated, setIsImageGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加

  useEffect(() => {
    // ローディングをシミュレートするためのタイムアト
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 1ィン終
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="absolute top-0 mt-20 text-xl">Loading...</div>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const wordHtml = (wordRef.current as unknown as HTMLElement)?.innerHTML || '';
      const nuanceText = nuance.trim() !== '' ? nuance : '';
      const response = await fetch(`http://localhost:8080/api/word/${deckId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalText: wordHtml,
          translatedText: meaning,
          imageUrl: imageUrl,
          deckId: deckId,
          nuanceText: nuanceText,
        }),
      });

      if (response.ok) {
        const imageResponse = await fetch('http://localhost:8080/api/word/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imagePath: imageUrl, // OpenAI APIで生成された画像のパスを渡す
            wordId: (await response.json()).id,
          }),
        });

        if (imageResponse.ok) {
          console.log("Word and image created successfully.");
        } else {
          console.error("Word created, but failed to upload image.");
        }
      } else {
        console.log("Word created successfully.");
      }

    } catch (error) {
      console.log("Error registering word:", error);
    }
  };

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.backgroundColor = highlightColor;
      span.dataset.highlighted = 'true'; // ハイライトされたことを示すデータ属性を追加

      // 既存のハイライトを削除
      const container = range.commonAncestorContainer;
      const parentElement = container.nodeType === 1 ? container : container.parentElement;
      const existingHighlights = (parentElement as HTMLElement)?.querySelectorAll('span[data-highlighted="true"]');
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
    try {
      const wordHtml = (wordRef.current as unknown as HTMLElement)?.innerHTML || '';
      console.log('Word HTML:', wordHtml); // デバッグ用ログ
      const highlightedText = (wordHtml.match(/<span[^>]*>(.*?)<\/span>/) || [])[1] || '';
      console.log('Highlighted text:', highlightedText); // デバッグ用ログ
      const promptForMeaning = literaryAnalysisPrompt.replacePlaceholders(wordHtml, highlightedText);

      const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: JSON.stringify(promptForMeaning) }
          ],
        }),
      });

      const gptData = await gptResponse.json();
      const wordData = JSON.parse(gptData.choices[0].message.content);

      const promptForImage = imageGenerationPrompt.replacePlaceholders(wordHtml, highlightedText);

      const dalleResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          quality: "standard",
          style: "vivid",
          prompt: JSON.stringify(promptForImage),
          n: 1,
          size: '1024x1024',
        }),
      });

      const dalleData = await dalleResponse.json();
      const imageUrl = dalleData.data[0].url;

      setMeaning(wordData.wordMeaning);
      setNuance(wordData.wordNuance);
      setImageUrl(imageUrl);

      setIsImageGenerated(true);
      setWord(wordHtml); // 装飾を保持するためにwordHtmlをセット
      console.log("Image and word data generated successfully.");
    } catch (error) {
      console.error("Error generating image and word data:", error);
    }
  };

  const handleReset = () => {
    const wordHtml = (wordRef.current as unknown as HTMLElement)?.innerHTML || '';
    const cleanedWord = wordHtml.replace(/<[^>]+>/g, ''); // HTMLタグを削除
    setWord(cleanedWord);
    if (wordRef.current) {
      (wordRef.current as unknown as HTMLElement).innerHTML = cleanedWord;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-left">Add Word</h1>
      <form onSubmit={handleSubmit}>
        {/* 単語を入力る欄 */}
        <div className="mb-4">
          <label htmlFor="word" className="block text-sm font-medium text-gray-700">Word:</label>
          <ContentEditable
            innerRef={wordRef as unknown as React.RefObject<HTMLElement>}
            html={word}
            onChange={(e) => setWord(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
          />
          <div className="relative mt-2 inline-flex items-center">
            <div
              onClick={() => setDisplayColorPicker(!displayColorPicker)}
              className="inline-flex items-center justify-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              style={{ backgroundColor: highlightColor, cursor: 'pointer', width: '30px', height: '30px' }}
            />
            <button
              type="button"
              onClick={handleHighlight}
              className="ml-2 inline-flex items-center justify-center px-2 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              style={{ height: '30px', width: '70px' }}
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="ml-2 inline-flex items-center justify-center px-2 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              style={{ height: '30px', width: '70px' }}
            >
              Reset
            </button>
            {displayColorPicker && (
              <div style={{ position: 'absolute', zIndex: 2, top: '100%', left: 0 }}>
                <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }} onClick={() => setDisplayColorPicker(false)} />
                <SketchPicker color={highlightColor} onChange={handleColorChange} />
              </div>
            )}
          </div>
        </div>
        {/* Image generate ボタン */}
        <div className="mb-4">
          {!isImageGenerated && (
            <>
              <button
                type="button"
                onClick={handleImageGenerate}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Image generate
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full mt-3 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Backward
              </button>
            </>
          )}
        </div>
        {isImageGenerated && (
          <>
            {/* 単語の意味を入力する欄 */}
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
            {/* ニュンスを力する欄 */}
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
            {/* イメージ画像を貼り付ける欄 */}
            <div className="mb-5">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image:</label>
              {imageUrl && <Image src={imageUrl} alt="Generated word image" className="mt-1 max-w-full" width={1024} height={1024} />}
            </div>
            <div className="flex justify-between mb-2">
              <button
                type="button"
                onClick={() => router.push('/decks')}
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
  )
}

export default WordForm;