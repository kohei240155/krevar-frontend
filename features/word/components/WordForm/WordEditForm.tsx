"use client";

import React, { useEffect, useState } from 'react';

interface WordEditFormProps {
  wordId: string;
}

const WordEditForm: React.FC<WordEditFormProps> = ({ wordId }) => {
  return (
    <div>WordEditForm for wordId: {wordId}</div>
  );
};

export default WordEditForm;