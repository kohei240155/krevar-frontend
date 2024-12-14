"use client";
import React from "react";
import DeckForm from "../../../features/routes/deck/components/DeckForm";

/**
 * デッキ編集ページ
 * @returns
 */
const DeckEditPage = () => {
  return <DeckForm isEditMode={true} />;
};

export default DeckEditPage;
