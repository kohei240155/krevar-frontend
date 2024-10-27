import React from "react";
import DeckForm from "../../../features/routes/deck/components/DeckForm";

const DeckAddPage = () => {
  return (
    <div className="p-4">
      <DeckForm deckId={0} isEditMode={false} />
    </div>
  );
};

export default DeckAddPage;
