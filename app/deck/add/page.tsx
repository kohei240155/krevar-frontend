"use client";
import React, { useEffect, useState } from "react";
import * as Deck from "../../../features/routes/deck/index";
import * as Common from "../../../features/common";
const NewDeck = () => {
  // if (userId === null) {
  //   return <Common.LoadingIndicator />; // userIdがロードされるまでの待機画面
  // }

  return (
    <div className="p-4">
      <Deck.DeckForm deckNameValue="" deckId={0} isEditMode={false} />
    </div>
  );
};

export default NewDeck;
