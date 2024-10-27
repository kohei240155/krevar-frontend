"use client";
import React from "react";
import { useParams } from "next/navigation";
import DeckForm from "../../../features/routes/deck/components/DeckForm";

const DeckEditPage = () => {
  const params = useParams();
  const deckId = params?.deckId as number | undefined;

  return (
    <div className="p-4">
      <DeckForm deckId={deckId as number} isEditMode={true} />
    </div>
  );
};

export default DeckEditPage;
