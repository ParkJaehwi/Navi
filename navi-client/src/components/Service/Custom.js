import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Service/Custom.scss";
const questions = [
  {
    id: 1,
    question: "여행을 떠나는 목적이 무엇인가요?",
    options: [
      { id: 1, text: "일상의 스트레스를 풀어주는 여유로운 시간", scores: { A0101: 1, A0202: 1 } },
      { id: 2, text: "매력적인 장소와 문화를 탐험하는 기회", scores: { A0201: 1, A0205: 1, A0203: 1 } },
      { id: 3, text: "지식과 예술을 직접 경험하는 기회", scores: { A0204: 1, A0206: 1 } },
      { id: 4, text: "다양한 체험을 통해 활력을 얻는 순간", scores: { A0302: 1, A0303: 1, A0304: 1 } },
    ],
  },
  {
    id: 2,
    question: "어떤 장소를 좋아하나요?",
    options: [
      { id: 1, text: "편안하고 힐링하는 장소", scores: { A0101: 1, A0202: 1 } },
      { id: 2, text: "탐험적이고 교육적인 장소", scores: { A0201: 1, A0205: 1, A0203: 1 } },
      { id: 3, text: "예술적이고 문화적인 장소", scores: { A0204: 1, A0206: 1 } },
      { id: 4, text: "활동적이고 모험적인 장소", scores: { A0302: 1, A0303: 1, A0304: 1 } },
    ],
  },
  {
    id: 3,
    question: "어떤 분위기를 좋아하나요?",
    options: [
      { id: 1, text: "일상에서 벗어나 여유롭고 느긋한 분위기", scores: { A0101: 1, A0202: 1 } },
      { id: 2, text: "역사적 고요함과 현대적 활력이 어우러진 분위기", scores: { A0201: 1, A0205: 1, A0203: 1 } },
      { id: 3, text: "창의적이며 세련되고 정적인 분위기", scores: { A0204: 1, A0206: 1 } },
      { id: 4, text: "자유롭고 활기차며 역동적인 분위기", scores: { A0302: 1, A0303: 1, A0304: 1 } },
    ],
  },
  {
    id: 4,
    question: "여행지에서 가장 중요하게 생각하는 요소는 무엇인가요?",
    options: [
      { id: 1, text: "평화로운 휴식이나 조용한 휴양을 추구", scores: { A0101: 1, A0202: 1 } },
      { id: 2, text: "다양한 문화를 통해 지식을 얻을 수 있는 경험", scores: { A0201: 1, A0205: 1, A0203: 1 } },
      { id: 3, text: "예술과 역사적 가치를 통한 시각적 경험", scores: { A0204: 1, A0206: 1 } },
      { id: 4, text: "신체적 도전과 스릴을 즐기며 남기는 추억", scores: { A0302: 1, A0303: 1, A0304: 1 } },
    ],
  },
  {
    id: 5,
    question: "여행을 통해 배우고 싶은 점은 무엇인가요?",
    options: [
      { id: 1, text: "심리적, 신체적 안정 및 자기 인식과 성장", scores: { A0101: 1, A0202: 1 } },
      { id: 2, text: "다양한 문화 경험과 외적인 지식 습득", scores: { A0201: 1, A0205: 1, A0203: 1 } },
      { id: 3, text: "예술적 표현을 통한 창의성과 영감", scores: { A0204: 1, A0206: 1 } },
      { id: 4, text: "적극적인 활동을 통한 도전정신", scores: { A0302: 1, A0303: 1, A0304: 1 } },
    ],
  },
];

const Custom = ({ isDarkMode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [scores, setScores] = useState({});
  const navigate = useNavigate();

  const handleAnswerSelection = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = option.id;
    setAnswers(updatedAnswers);

    const updatedScores = { ...scores };
    for (const [category, score] of Object.entries(option.scores)) {
      updatedScores[category] = (updatedScores[category] || 0) + score;
    }
    setScores(updatedScores);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const resultDisplay = calculateResult(scores);
      navigate("/Navi", { state: { mostFrequentOption: resultDisplay, score: 1 } });
    }
  };

  const calculateResult = (scores) => {
    const maxScore = Math.max(...Object.values(scores));
    const topCategories = Object.entries(scores)
      .filter(([, score]) => score === maxScore)
      .map(([category]) => category);
    return topCategories;
  };

  return (
    <div className={`Custom ${isDarkMode ? "dark-mode" : ""}`}>
      {currentQuestionIndex < questions.length ? (
        <div>
          <h2 className={`question ${isDarkMode ? "dark-mode" : ""}`}>{questions[currentQuestionIndex].question}</h2>
          <div className={`radio_container ${isDarkMode ? "dark-mode" : ""}`}>
            {questions[currentQuestionIndex].options.map((option) => (
              <div key={option.id} className={`select ${isDarkMode ? "dark-mode" : ""}`}>
                <input
                  type="radio"
                  id={`question-${questions[currentQuestionIndex].id}-option-${option.id}`}
                  name={`question-${questions[currentQuestionIndex].id}`}
                  value={option.id}
                  onChange={() => handleAnswerSelection(option)}
                  checked={answers[currentQuestionIndex] === option.id}
                  className={`radio-button ${isDarkMode ? "dark-mode" : ""}`} // 추가된 클래스
                />
                <label
                  for="select"
                  htmlFor={`question-${questions[currentQuestionIndex].id}-option-${option.id}`}
                  className={`radio-label ${isDarkMode ? "dark-mode" : ""}`} // 추가된 클래스
                >
                  {option.text}
                </label>
              </div>
            ))}
          </div>
          <button onClick={handleNextQuestion} className={`customBtn ${isDarkMode ? "dark-mode" : ""}`}>
            {currentQuestionIndex === questions.length - 1 ? "결과 보기" : "다음"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Custom;
