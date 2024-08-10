require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Gemini chat route
app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
      },
      history: [
        {
          role: "user",
          parts: [
            {
              text: "I have a PDF about disaster preparedness titled 'Disaster prep.pdf'. Please use this context for our conversation.",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Understood. I'll use the context of the 'Disaster prep.pdf' document for our conversation about disaster preparedness. How can I assist you with information from this document?",
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(question);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error in Gemini chat:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

// Serve static files
app.use("/articles", express.static(path.join(__dirname, "articles")));

// Route to get list of article filenames
app.get("/articles", (req, res) => {
  const articlesPath = path.join(__dirname, "articles");
  fs.readdir(articlesPath, (err, files) => {
    if (err) {
      console.error("Error reading articles directory:", err);
      return res.status(500).json({ error: "Unable to retrieve articles." });
    }
    // Filter files to include only .pdf or other file types you need
    const articles = files.filter((file) => file.endsWith(".pdf"));
    res.json(articles);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
