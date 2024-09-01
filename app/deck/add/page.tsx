import React from "react";
import * as Deck from "../../../features/routes/deck/components/index";

const NewDeck = () => {
  return (
    <div className="p-4">
      <Deck.DeckCreation />
    </div>
  );
};

export default NewDeck;
