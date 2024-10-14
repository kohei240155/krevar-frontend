"use client";
import React, { useEffect, useState } from "react";
import * as Word from "./../../../features/routes/word/index";
import * as Common from "../../../features/common";

const AddWordPage = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId ? parseInt(storedUserId, 10) : 0);
  }, []);

  if (userId === null) {
    return <Common.LoadingIndicator />;
  }

  return (
    <div className="p-4">
      <Word.WordForm userId={userId} />
    </div>
  );
};

export default AddWordPage;
