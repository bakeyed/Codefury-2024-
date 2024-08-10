import React, { useState } from "react";

function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY; // Your OpenWeather API key
  const NEWS_API_KEY = process.env.REACT_APP_NEWSAPI_KEY; // Your NewsAPI key

  const fetchCoordinates = async () => {
    if (!location) {
      setError("Please enter a location.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          location
        )}&appid=${WEATHER_API_KEY}`
      );
      const data = await response.json();
      if (data.coord) {
        setCoords(data.coord);
        setError(null);
        fetchWeatherData(data.coord.lat, data.coord.lon);
        fetchNewsData(data.coord.lat, data.coord.lon);
      } else {
        setError("Location not found.");
      }
    } catch (error) {
      setError("Error fetching coordinates.");
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError("Error fetching weather data.");
    }
  };

  const fetchNewsData = async (lat, lon) => {
    const query = `natural disaster near ${location}`;
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&apiKey=${NEWS_API_KEY}`
      );
      const data = await response.json();
      setNewsData(data.articles);
      setError(null);
    } catch (error) {
      setError("Error fetching news data.");
    }
  };

  return (
    <div>
      <h2>Weather and News Information</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={fetchCoordinates}>Get Weather and News</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && (
        <div>
          <h3>Weather Details</h3>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Location: {weatherData.name}</p>
        </div>
      )}
      {newsData && (
        <div>
          <h3>Recent News</h3>
          {newsData.map((article, index) => (
            <div key={index}>
              <h4>{article.title}</h4>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Weather;
