"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Common from "../../../common/index";
import DeckForm from "./DeckForm";
import { DeckEditorProps } from "../types/deck";
import { updateDeck, deleteDeck } from "../utils/api";
import { useUser } from "../../../../app/context/UserContext";

const DeckEditor: React.FC<DeckEditorProps> = ({
  deckId,
  deckName: initialDeckName,
}) => {
  const [deckName, setDeckName] = useState(initialDeckName);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { userId } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Common.LoadingIndicator />;
  }

  const handleUpdate = async (event: React.FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    const success = await updateDeck(deckId, deckName, userId);
    if (success) {
      toast.success("Deck updated successfully!");
      router.push("/deck");
    } else {
      toast.error("Unexpected response from the server.");
    }
  };

  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    const success = await deleteDeck(deckId);
    if (success) {
      toast.success("Deck deleted successfully!");
      router.push("/deck");
    } else {
      toast.error("Unexpected response from the server.");
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <DeckForm
        deckName={deckName}
        onDeckNameChange={setDeckName}
        onSubmit={handleUpdate}
        isEditMode={true}
        onDelete={handleDelete}
      />
      <Common.DeleteConfirmModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirmDelete={confirmDelete}
        targetWord="deck"
      />
    </>
  );
};

export default DeckEditor;
