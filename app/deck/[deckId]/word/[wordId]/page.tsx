"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LoadingIndicator } from "../../../../../features/common";
import WordEditForm from "../../../../../features/routes/word/components/WordEditForm";

const EditWordPage = () => {
  const { wordId } = useParams() as { wordId: string };

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId ? parseInt(storedUserId, 10) : 0);
  }, []);

  if (userId === null) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <WordEditForm wordId={wordId} userId={userId} />
    </div>
  );
};

export default EditWordPage;
