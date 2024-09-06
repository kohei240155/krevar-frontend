"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Common from "../../../common/index";
import DeckForm from "./DeckForm";
import { DeckEditorProps } from "../types/deck";

const DeckEditor: React.FC<DeckEditorProps> = ({
  deckId,
  deckName: initialDeckName,
}) => {
  const [deckName, setDeckName] = useState(initialDeckName);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/deck/${deckId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId: 1, deckName }),
      });
      if (response.ok) {
        toast.success("Deck updated successfully!");
        router.push("/deck");
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      toast.error("Error updating deck: " + error);
    }
  };

  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/deck/${deckId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Deck deleted successfully!");
        router.push("/deck");
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      toast.error("Error deleting deck: " + error);
    } finally {
      setIsModalOpen(false);
    }
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
