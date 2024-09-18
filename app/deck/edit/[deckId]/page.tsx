"use client";
import React from "react";
import * as Deck from "../../../../features/routes/deck/index";
import { useParams, useSearchParams } from "next/navigation";

const SettingsPage = () => {
  const params = useParams();
  const deckId = params?.deckId as number | undefined;
  const searchParams = useSearchParams();
  const deckName = searchParams?.get("deckName") || "";

  return (
    <div>
      <Deck.DeckEditor deckId={deckId as number} deckName={deckName} />
    </div>
  );
};

export default SettingsPage;
