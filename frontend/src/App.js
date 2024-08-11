// src/App.js
import "./App.css"; // Import the CSS file
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GeminiChat from "./components/GeminiChat";
import Weather from "./components/Weather";

function App() {
  const { user, loginWithRedirect } = useAuth0();
  console.log("Current User", user);
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <div className="hamburger-menu">
            <input type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle" className="menu-icon">
              <div className="nav-icon"></div>
            </label>
            <div className="menu">
              <ul>
                <li>
                  <Link to="/" onClick={() => setActiveTab("tab1")}>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link to="/weather" onClick={() => setActiveTab("tab2")}>
                    NEWS
                  </Link>
                </li>
                <li>
                  <Link to="/chat" onClick={() => setActiveTab("tab3")}>
                    AI CHATBOT
                  </Link>
                </li>
                <li>
                  <a
                    href="https://sreerathnaieji.github.io/Natural-Disaster-contri-and-artic/"
                    rel="noopener noreferrer"
                    onClick={() => setActiveTab("tab4")}
                  >
                    ARTICLES
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="brand-title">
            <div>
              <h1>^ SafeHarbor ^</h1>
            </div>
          </div>
          <div className="contact">011-26701728-1078</div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<GeminiChat />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>

        <div id="weather-result"></div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to Disaster Preparedness</h1>
      <div id="tab1" className="content-section">
        <a
          href="https://ndma.gov.in/Natural-Hazards/Floods/Do-Donts"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flood">
            <div className="image_text">FLOOD</div>
          </div>
        </a>
        <a
          href="https://www.washington.edu/uwem/preparedness/know-your-hazards/earthquake/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="earthquake">
            <div className="image_text">EARTHQUAKE</div>
          </div>
        </a>
      </div>
      <div id="tab2" className="content-section">
        <a
          href="https://portal.ct.gov/deep/forestry/forest-fire/forest-fire-prevention-tips"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="fire">
            <div className="image_text">FOREST FIRE</div>
          </div>
        </a>
        <a
          href="https://emergency.yale.edu/be-prepared/hurricane"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="hurricane">
            <div className="image_text">HURRICANE</div>
          </div>
        </a>
      </div>
      <div id="tab3" className="content-section">
        <div className="largeimg">
          <div className="limgtext">
            <h1>
              "Training proves to be the key ingredient to handling any
              disaster."
            </h1>
            <br />
            <h4>
              --Walter Maddox, Mayor of Tuscaloosa -2013 Virginia Emergency
              Management Symposium
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
