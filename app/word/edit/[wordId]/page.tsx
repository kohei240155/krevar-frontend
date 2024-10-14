"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as Word from "./../../../../features/routes/word/index";
import * as Common from "../../../../features/common";

const EditWordPage = () => {
  const { wordId } = useParams() as { wordId: string };

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId ? parseInt(storedUserId, 10) : 0);
  }, []);

  if (userId === null) {
    return <Common.LoadingIndicator />;
  }

  return (
    <div>
      <Word.WordEditForm wordId={wordId} userId={userId} />
    </div>
  );
};

export default EditWordPage;
