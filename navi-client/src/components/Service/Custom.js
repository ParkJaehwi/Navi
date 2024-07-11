import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
    { id: 1, question: "문항 1", options: [1, 2, 3] },
    { id: 2, question: "문항 2", options: [1, 2, 3] },
    { id: 3, question: "문항 3", options: [1, 2, 3] },
    { id: 4, question: "문항 4", options: [1, 2, 3] },
    { id: 5, question: "문항 5", options: [1, 2, 3] },
];

const Custom = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const navigate = useNavigate();

    const handleAnswerSelection = (answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = answer;
        setAnswers(updatedAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const result = calculateResult(answers);
            navigate("/Navi", { state: result });
        }
    };

    const calculateResult = (answers) => {
        const counts = answers.reduce((acc, answer) => {
            acc[answer] = (acc[answer] || 0) + 1;
            return acc;
        }, {});

        let maxCount = 0;
        let mostFrequentOption = null;

        for (const [option, count] of Object.entries(counts)) {
            if (count > maxCount) {
                maxCount = count;
                mostFrequentOption = Number(option);
            }
        }

        return {
            mostFrequentOption,
            score: maxCount
        };
    };

    return (
        <div>
            {currentQuestionIndex < questions.length ? (
                <div>
                    <h2>{questions[currentQuestionIndex].question}</h2>
                    <div>
                        {questions[currentQuestionIndex].options.map((option) => (
                            <div key={option}>
                                <input
                                    type="radio"
                                    id={`question-${questions[currentQuestionIndex].id}-option-${option}`}
                                    name={`question-${questions[currentQuestionIndex].id}`}
                                    value={option}
                                    onChange={() => handleAnswerSelection(option)}
                                    checked={answers[currentQuestionIndex] === option}
                                />
                                <label htmlFor={`question-${questions[currentQuestionIndex].id}-option-${option}`}>
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleNextQuestion}>
                        {currentQuestionIndex === questions.length - 1 ? '결과 보기' : '다음'}
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default Custom;