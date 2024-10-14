"use client";
import React, { useEffect, useState } from "react";
import * as Word from "./../../../features/routes/word/index";
import { useSearchParams } from "next/navigation";
import * as Common from "../../../features/common";
const WordListPage = () => {
  const searchParams = useSearchParams();
  const deckName = searchParams?.get("deckName") || "";

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId ? parseInt(storedUserId, 10) : 0);
  }, []);

  if (userId === null) {
    return <Common.LoadingIndicator />; // userIdがロードされるまでの待機画面
  }

  return (
    <div>
      <Word.WordList deckName={deckName} userId={userId} />
    </div>
  );
};

export default WordListPage;
