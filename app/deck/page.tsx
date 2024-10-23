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
    <div className="relative p-5">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-left">Deck List</h2>
        <Deck.DeckList />
      </div>
    </div>
  );
};

export default Decks;
