import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GeminiChat from "./components/GeminiChat";
import ArticleList from "./components/ArticleList";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chat">Disaster Prep Chat</Link>
            </li>
            <li>
              <Link to="/articles">Articles</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<GeminiChat />} />
          <Route path="/articles" element={<ArticleList />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h1>Welcome to Disaster Preparedness</h1>;
}

export default App;
