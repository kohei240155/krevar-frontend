"use client";
import React from "react";
import * as Word from "./../../../features/routes/word/components/index";
import { useSearchParams } from "next/navigation";

const WordListPage = () => {
  const searchParams = useSearchParams();
  const deckName = searchParams?.get("deckName") || "";

  return (
    <div>
      <Word.WordList deckName={deckName} />
    </div>
  );
};

export default WordListPage;
