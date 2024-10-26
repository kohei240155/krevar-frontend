import React from "react";
import { DeckForm } from "../../../features/routes/deck";

const NewDeck = () => {
  return (
    <div className="p-4">
      <DeckForm deckId={0} isEditMode={false} />
    </div>
  );
};

export default NewDeck;
