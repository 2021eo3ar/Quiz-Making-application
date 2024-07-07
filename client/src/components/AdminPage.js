import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/AdminPage.css";

function AdminPage() {
  const [questions, setQuestions] = useState([]);
  const [newId, setNewId] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '']);
  const [newAnswer, setNewAnswer] = useState(0);
  const [results, setResults] = useState([]);
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

    const fetchResults = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/result`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchQuestions();
    fetchResults();
  }, []);

  const handleAddQuestion = async () => {
    const questionData = {
      id: newId,
      question: newQuestion,
      options: newOptions,
      answer: newAnswer
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/questions`, questionData);
      setQuestions([...questions, response.data]);
      setNewId('');
      setNewQuestion('');
      setNewOptions(['', '', '']);
      setNewAnswer(0);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/questions/${id}`);
        const updatedQuestions = questions.filter(question => question._id !== id);
        setQuestions(updatedQuestions);
    } catch (error) {
        console.error('Error deleting question:', error);
    }
};

  const handleDeleteResult = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/result/${id}`);
      const updatedResults = results.filter(result => result._id !== id);
      setResults(updatedResults);
    } catch (error) {
      console.error('Error deleting result:', error);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="admin-container">
      <h1>Admin Page</h1>
      
      <div className="question-section">
        <h2>Manage Questions</h2>
        <input 
          type="text" 
          value={newId} 
          onChange={(e) => setNewId(e.target.value)} 
          placeholder="Question ID" 
        />
        <input 
          type="text" 
          value={newQuestion} 
          onChange={(e) => setNewQuestion(e.target.value)} 
          placeholder="New Question" 
        />
        {newOptions.map((option, index) => (
          <input 
            key={index} 
            type="text" 
            value={option} 
            onChange={(e) => {
              const optionsCopy = [...newOptions];
              optionsCopy[index] = e.target.value;
              setNewOptions(optionsCopy);
            }} 
            placeholder={`Option ${index + 1}`} 
          />
        ))}
        <input 
          type="number" 
          value={newAnswer} 
          onChange={(e) => setNewAnswer(Number(e.target.value))} 
          placeholder="Enter the Index number of Options" 
        />
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>

      <div className="existing-questions">
        <h2>Existing Questions</h2>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <span>{question.id} - {question.question}</span>
              <button onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="result-section">
        <h2>Manage Results</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <span>{result.username}: {result.points} points</span>
              <button onClick={() => handleDeleteResult(result._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <button className="go-home-button" onClick={handleGoHome}>Go to Home</button>
    </div>
  );
}

export default AdminPage;
