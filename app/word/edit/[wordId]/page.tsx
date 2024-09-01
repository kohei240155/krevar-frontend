"use client"; // クライアントコンポーネントとしてマーク

import React from "react";
import { useParams } from "next/navigation";
import * as Word from "./../../../../features/routes/word/components/index";

const EditWordPage = () => {
  const { wordId } = useParams() as { wordId: string };

  return (
    <div>
      <Word.WordEditForm wordId={wordId} />
    </div>
  );
};

export default EditWordPage;
