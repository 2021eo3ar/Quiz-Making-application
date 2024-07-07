import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/QuizPage.css";

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerClick = (index) => {
    setAnswers([...answers, index]);
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitResults();
    }
  };

  const submitResults = async () => {
    const username = localStorage.getItem('username');
    const result = answers;
    const attempts = questions.length;
    const points = score;
    const achieved = `${score} out of ${questions.length}`;

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/result`, { username, result, attempts, points, achieved });
      console.log('Result submission response:', response.data);
      navigate('/result');
    } catch (error) {
      console.error('Error submitting results:', error);
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{questions[currentQuestion].question}</h1>
      <ul>
        {questions[currentQuestion].options.map((option, index) => (
          <li key={index} onClick={() => handleAnswerClick(index)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizPage;
