import React from "react";

interface QuizHeaderContentProps {
  deckName: string;
  leftQuizCount: number;
}

const QuizHeaderContent: React.FC<QuizHeaderContentProps> = ({
  deckName,
  leftQuizCount,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 pb-1 border-b border-gray-700">
      {/* デッキ名 */}
      <h2 className="text-2xl font-bold text-left ml-4 truncate">{deckName}</h2>
      {/* 残りの問題数 */}
      <p className="text-gray-700 text-right mr-4 lg:mr-8 whitespace-nowrap">{`Left: ${leftQuizCount}`}</p>
    </div>
  );
};

export default QuizHeaderContent;
