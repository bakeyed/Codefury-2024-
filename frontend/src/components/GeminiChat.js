import React, { useState } from "react";
import axios from "axios";

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
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(
          `Server error: ${error.response.status} - ${
            error.response.data.error || "Unknown error"
          }`
        );
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from the server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Disaster Preparedness Chat</h2>
      <p>Ask questions about the 'Disaster prep.pdf' document</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about disaster preparedness"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Ask"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;
