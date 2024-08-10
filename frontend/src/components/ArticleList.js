import React, { useEffect, useState } from "react";
import axios from "axios";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div>
      <h2>Disaster Preparedness Articles</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a
              href={`http://localhost:8800/articles/${article}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
