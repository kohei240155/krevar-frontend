import React from "react";
import * as Deck from "../../../features/routes/deck/index";

const NewDeck = () => {
  return (
    <div className="p-4">
      <Deck.DeckForm deckNameValue="" deckId={0} isEditMode={false} />
    </div>
  );
};

export default NewDeck;
