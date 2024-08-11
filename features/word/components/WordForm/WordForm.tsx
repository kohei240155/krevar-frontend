"use client"
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ContentEditable from 'react-contenteditable';
import { SketchPicker, ColorResult } from 'react-color';

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const wordHtml = (wordRef.current as unknown as HTMLElement)?.innerHTML || '';
      const response = await axios.post(`http://localhost:8080/api/word/${deckId}`, {
        original_text: wordHtml,
        translated_text: meaning,
        image_url: imageUrl,
        mastery_status_id: 1,
        last_practiced_date: new Date(),
        next_practice_date: new Date(),
        correct_count: 0,
        incorrect_count: 0,
        deck_id: deckId,
        nuance: nuance,
      });
      console.log("Word created successfully:", response.data);
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
      range.surroundContents(span);
    }
  };

  const handleColorChange = (color: ColorResult) => {
    setHighlightColor(color.hex);
  };

  const handleImageGenerate = () => {
    // 画像生成のロジックをここに追加
    console.log("Image generate button clicked");
    setIsImageGenerated(true);

    // Wordの背景色を保持するためにinnerHTMLを再設定
    const wordHtml = (wordRef.current as unknown as HTMLElement)?.innerHTML || '';
    setWord(wordHtml);
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target?.result as string;
            img.style.maxWidth = "100%";
            const range = window.getSelection()?.getRangeAt(0);
            if (range) {
              range.deleteContents();
              range.insertNode(img);
            }
          };
          reader.readAsDataURL(blob);
        }
        event.preventDefault();
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-left">Add Word</h1>
      <form onSubmit={handleSubmit}>
        {/* 単語を入力する欄 */}
        <div className="mb-4">
          <label htmlFor="word" className="block text-sm font-medium text-gray-700">Word:</label>
          <ContentEditable
            innerRef={wordRef as unknown as React.RefObject<HTMLElement>}
            html={word}
            onChange={(e) => setWord(e.target.value)}
            onPaste={handlePaste}
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
              style={{ height: '30px' }}
            >
              Apply
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
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
              >
                Image generate
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full mt-2 inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            {/* ニュアンスを入力する欄 */}
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
              <ContentEditable
                innerRef={wordRef as unknown as React.RefObject<HTMLElement>}
                html={word}
                onChange={(e) => setWord(e.target.value)}
                onPaste={handlePaste}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
              />
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