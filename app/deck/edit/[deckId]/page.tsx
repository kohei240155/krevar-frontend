"use client";
import React, { useEffect, useState } from "react";
import * as Deck from "../../../../features/routes/deck/index";
import * as Common from "../../../../features/common";
import { useParams, useSearchParams } from "next/navigation";

const SettingsPage = () => {
  const params = useParams();
  const deckId = params?.deckId as number | undefined;
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
      <Deck.DeckForm
        deckId={deckId as number}
        deckNameValue={deckName}
        isEditMode={true}
      />
    </div>
  );
};

export default SettingsPage;
