"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DeckForm } from "../../../../features/routes/deck";
import { LoadingIndicator } from "../../../../features/common";

const SettingsPage = () => {
  const params = useParams();
  const deckId = params?.deckId as number | undefined;

  return (
    <div>
      <DeckForm deckId={deckId as number} isEditMode={true} />
    </div>
  );
};

export default SettingsPage;
