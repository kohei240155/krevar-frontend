"use client";
import React, { useState, useEffect } from "react";
import * as Deck from "../../features/routes/deck";
import * as Common from "../../features/common";

const Decks = () => {
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
      <Deck.DeckList userId={userId} />
    </div>
  );
};

export default Decks;
