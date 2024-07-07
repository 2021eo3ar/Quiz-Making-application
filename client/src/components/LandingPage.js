import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/LandingPage.css";

function LandingPage() {
  const [username, setUsername] = useState('');
  const [showAlert, setShowAlert] = useState(true); // State to control popup visibility
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (!username.trim()) {
      console.log(setShowAlert(true)); // Show popup if username is not entered
      return;
    }
    localStorage.setItem('username', username);
    navigate('/quiz');
  };

  const handleAdminPage = () => {
    navigate('/admin');
  };

  return (
    <div className="landing-container">
      <h1>Welcome to the Quiz Application</h1>
      <input
        type="text"
        placeholder="Enter username - it's Compulsory"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleStartQuiz} disabled={!username.trim()}>Start Quiz</button>
      <button onClick={handleAdminPage}>Admin Page</button>

      {/* Popup to show alert */}
      {showAlert && (
        <div className="popup">
          <div className="popup-content">
            <p>Please enter a username to start the quiz.</p>
            <button onClick={() => setShowAlert(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
