"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import * as Common from "../../../common/index";
import DeckForm from "./DeckForm";
import { createDeck } from "../utils/api";
import { useUser } from "../../../../app/context/UserContext";

const DeckCreation: React.FC = () => {
  const [deckName, setDeckName] = useState("");
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const success = await createDeck(deckName, userId);
    if (success) {
      toast.success("Deck created successfully!");
      router.push("/deck");
    } else {
      toast.error("Unexpected response from the server.");
    }
  };

  return (
    <DeckForm
      deckName={deckName}
      onDeckNameChange={setDeckName}
      onSubmit={handleSubmit}
      isEditMode={false}
    />
  );
};

export default DeckCreation;
