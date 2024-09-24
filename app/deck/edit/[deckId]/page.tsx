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
      <Deck.DeckForm
        deckId={deckId as number}
        deckNameValue={deckName}
        isEditMode={true}
      />
    </div>
  );
};

export default SettingsPage;
