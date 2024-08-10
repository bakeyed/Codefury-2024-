import React, { useState } from "react";
import axios from "axios";
import "./GeminiChat.css"; // We'll create this CSS file

const GeminiChat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await axios.post(
        "http://localhost:8000/chat",
        { question },
        {
          timeout: 30000, // 30 seconds timeout
        }
      );
      setResponse(result.data.response);
    } catch (error) {
      console.error("Error getting Gemini response:", error);
      if (error.response) {
        setError(
          `Server error: ${error.response.status} - ${
            error.response.data.error || "Unknown error"
          }`
        );
      } else if (error.request) {
        setError("No response received from the server. Please try again.");
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gemini-chat">
      <h2 className="chat-title">Relief-Connect</h2>
      <div className="chat-container">
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="chat-input"
          />
          <button type="submit" disabled={isLoading} className="chat-button">
            {isLoading ? "Loading..." : "Ask"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {response && (
          <div className="response-container">
            <h3 className="response-title">Response:</h3>
            <p className="response-text">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiChat;
