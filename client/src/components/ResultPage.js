import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/ResultPage.css";

function ResultPage() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/result`);
      setResults(response.data);
    };
    fetchResults();
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };
  const handleGoAdmin = () => {
    navigate('/admin');
  };


  return (
    <div className="result-container">
      <h1>Quiz Results</h1>
      {results.map((result, index) => (
        <div className="result-card" key={index}>
          <h2>{result.username}</h2>
          <p>Score: {result.points}</p>
          <p>Attempts: {result.attempts}</p>
          <p>Achieved: {result.achieved}</p>
        </div>
      ))}
      <button className="go-home-button" onClick={handleGoHome}>Go to Home</button>
      <button className="go-home-button" onClick={handleGoAdmin}>Go to Admin</button>
    </div>
  );
}

export default ResultPage;

