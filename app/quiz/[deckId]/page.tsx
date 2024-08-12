"use client";
import React from 'react'
import * as Quiz from '../../../features/quiz/components/index';
import { useParams } from 'next/navigation';

const QuizPage = () => {
    const params = useParams();
    const deckId = Array.isArray(params.deckId) ? params.deckId[0] : params.deckId;
    const isExtraQuiz = params.isExtraQuiz === 'true';

    return (
        <div>
            <Quiz.QuizCard deckId={deckId} isExtraQuiz={isExtraQuiz} />
        </div>
    )
}

export default QuizPage;