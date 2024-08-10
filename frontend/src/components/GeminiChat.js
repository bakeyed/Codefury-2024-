import React, { useState } from "react";
import axios from "axios";

const GeminiChat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post("http://localhost:5000/chat", {
        question,
      });
      setResponse(result.data.response);
    } catch (error) {
      console.error("Error getting Gemini response:", error);
      setResponse("An error occurred while fetching the response.");
    }
    setIsLoading(false);
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
